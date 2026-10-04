/**
 * App-facing, build-time queries over the knowledge base. Everything returned here is `published` and passed
 * validation — drafts and PAID nodes are unreachable from the site by construction.
 */
import { loadAllNodes } from "./load.ts";
import { validateNodes } from "./validate.ts";
import { normalizeArabic } from "./normalize.ts";
import type {
  ConceptNode,
  GlossaryNode,
  KbNode,
  ProductNode,
  ResourceNode,
  ToolNode,
  UnitNode,
  VideoNode,
} from "./types.ts";
import { teachingMaterials, type TeachingMaterial } from "@/content/teachingMaterials";

type Store = {
  all: KbNode[];
  published: KbNode[];
  byId: Map<string, KbNode>;
};

let cache: Store | null = null;

function store(): Store {
  if (cache) return cache;
  const { nodes } = loadAllNodes();
  const issues = validateNodes(nodes);
  const errors = issues.filter((i) => i.level === "error");
  if (errors.length) {
    throw new Error(`Content validation failed:\n${errors.map((e) => `  - [${e.id}] ${e.message}`).join("\n")}`);
  }
  const published = nodes.filter((n) => n.status === "published" && n.visibility !== "PAID");
  cache = { all: nodes, published, byId: new Map(published.map((n) => [n.id, n])) };
  return cache;
}

function ofType<T extends KbNode>(...types: KbNode["type"][]): T[] {
  return store().published.filter((n) => types.includes(n.type)) as T[];
}

export const getNode = (id: string): KbNode | undefined => store().byId.get(id);

export const getUnits = (): UnitNode[] => ofType<UnitNode>("Unit").sort((a, b) => a.order - b.order);
export const getUnit = (slug: string): UnitNode | undefined => getUnits().find((u) => u.slug === slug);
export const getUnitById = (id: string): UnitNode | undefined => getUnits().find((u) => u.id === id);

export const getConcepts = (): ConceptNode[] => ofType<ConceptNode>("Concept", "Comparison");
export const getConceptsOfUnit = (unitId: string): ConceptNode[] =>
  getConcepts()
    .filter((c) => c.unit === unitId)
    .sort((a, b) => a.order - b.order);
export const getConcept = (unitSlug: string, slug: string): ConceptNode | undefined => {
  const unit = getUnit(unitSlug);
  return unit ? getConceptsOfUnit(unit.id).find((c) => c.slug === slug) : undefined;
};

export const getGlossary = (): GlossaryNode[] =>
  ofType<GlossaryNode>("GlossaryTerm").sort((a, b) => a.term_en.localeCompare(b.term_en));

export const getVideos = (): VideoNode[] => ofType<VideoNode>("Video");
export const getVideosOfConcept = (c: ConceptNode): VideoNode[] =>
  c.videos.map((id) => store().byId.get(id) as VideoNode | undefined).filter((v): v is VideoNode => !!v);
export const getVideosOfUnit = (unitId: string): VideoNode[] => getVideos().filter((v) => v.unitId === unitId);

export const getTool = (id: string): ToolNode | undefined => store().byId.get(id) as ToolNode | undefined;
export const getProduct = (id: string): ProductNode | undefined => store().byId.get(id) as ProductNode | undefined;

export type Resource = ResourceNode & { material: TeachingMaterial };
export function getResources(): Resource[] {
  return ofType<ResourceNode>("EducationalResource")
    .map((r) => {
      const material = teachingMaterials.find((m) => m.id === r.materialId);
      return material ? { ...r, material } : null;
    })
    .filter((r): r is Resource => r !== null);
}
export const getResourcesOfUnit = (unitId: string): Resource[] =>
  getResources().filter((r) => r.unit === unitId || (r.related ?? []).includes(unitId));

export function unitSlugOf(unitId: string | null): string {
  const u = unitId ? getUnitById(unitId) : undefined;
  return u?.slug ?? "";
}

export function urlFor(n: KbNode): string {
  switch (n.type) {
    case "Unit":
      return `/btec-it/${n.slug}`;
    case "Concept":
    case "Comparison":
      return `/btec-it/${unitSlugOf(n.unit)}/${n.slug}`;
    case "GlossaryTerm":
      return `/btec-it/glossary#${n.slug}`;
    case "Video":
      return `/videos#${n.youtubeId}`;
    case "Tool":
      return n.url;
    case "Product":
      return "/btec-it-card";
    case "EducationalResource":
      return `/resources#${n.slug}`;
  }
}

export function relatedConcepts(c: ConceptNode): ConceptNode[] {
  return c.related.map((id) => store().byId.get(id)).filter((n): n is ConceptNode => !!n && (n.type === "Concept" || n.type === "Comparison"));
}

/** Concepts that link *to* this one (back-links), for "ترتبط بهذا المفهوم" without extra authoring. */
export function linkedFrom(c: ConceptNode): ConceptNode[] {
  return getConcepts().filter((o) => o.id !== c.id && o.related.includes(c.id));
}

export type QuestionEntry = { question: string; conceptId: string; unitSlug: string; conceptSlug: string; shortAnswer: string; unitTitle: string; conceptTitle: string };
export function getQuestionIndex(): QuestionEntry[] {
  const out: QuestionEntry[] = [];
  for (const c of getConcepts()) {
    const unit = getUnitById(c.unit ?? "");
    for (const q of c.questionsAnswered) {
      out.push({
        question: q,
        conceptId: c.id,
        unitSlug: unit?.slug ?? "",
        conceptSlug: c.slug,
        shortAnswer: c.shortAnswer,
        unitTitle: unit?.title_ar ?? "",
        conceptTitle: c.title_ar,
      });
    }
  }
  return out;
}

/** Resolve a title for an inline [[id]] link. */
export function linkLabel(id: string): string | undefined {
  const n = store().byId.get(id);
  if (!n) return undefined;
  return n.title_ar;
}

// ── search index ─────────────────────────────────────────────────────────────────────────────
export type SearchDoc = {
  id: string;
  u: string; // url
  y: string; // type label (Arabic)
  t: string; // title ar
  e: string; // title en
  s: string; // summary
  k: string; // normalized keyword haystack
};

const TYPE_LABEL: Record<string, string> = {
  Unit: "وحدة",
  Concept: "مفهوم",
  Comparison: "مقارنة",
  GlossaryTerm: "مصطلح",
  Video: "فيديو",
  Tool: "أداة",
  Product: "بطاقة",
  EducationalResource: "ملف تعليمي",
};

export function buildSearchIndex(): SearchDoc[] {
  const docs: SearchDoc[] = [];
  for (const n of store().published) {
    if (n.type === "Product" && !n.title_ar) continue;
    const words: string[] = [n.title_ar, n.title_en, ...(n.aliases ?? [])];
    if (n.type === "Concept" || n.type === "Comparison") {
      for (const t of n.terminology) words.push(t.ar, t.en);
      words.push(...n.questionsAnswered);
    }
    if (n.type === "GlossaryTerm") words.push(n.term_ar, n.term_en, n.definition_ar);
    if (n.type === "Video") words.push(n.originalTitle, n.conceptTitle_ar);
    if (n.type === "Unit") words.push(...n.axes.map((a) => a.title_ar));
    docs.push({
      id: n.id,
      u: urlFor(n),
      y: TYPE_LABEL[n.type] ?? n.type,
      t: n.title_ar,
      e: n.title_en,
      s: n.summary,
      k: normalizeArabic(words.join(" ")),
    });
  }
  return docs;
}

export function allPublishedNodes(): KbNode[] {
  return store().published;
}
