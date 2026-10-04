/**
 * Knowledge-base content model.
 *
 * Every node is a JSON object under /content/<collection>/. Only `status: "published"` nodes are routed,
 * sitemapped, searchable or linked. `visibility: "PAID"` nodes can never be published.
 *
 * This file (and the other files in lib/kb that scripts import) uses relative imports with `.ts` extensions
 * and erasable TypeScript only, so Node can execute it directly for the content scripts.
 */

export const AUTHOR_ID = "ahmad-domi";

export type Visibility = "PUBLIC" | "PUBLIC_SUMMARY" | "PAID";
export type Status = "draft" | "reviewed" | "published";

export type NodeType =
  | "Unit"
  | "LearningAim"
  | "Criterion"
  | "Concept"
  | "Comparison"
  | "Question"
  | "AssignmentGuide"
  | "GlossaryTerm"
  | "Video"
  | "EducationalResource"
  | "Tool"
  | "Product";

/**
 * Where the explanation comes from. `official-pearson` content must carry `officialSource`;
 * `general-knowledge` content cannot be published until a human sets `needsVerification: false`.
 */
export type SourceType =
  | "ahmad-booklet"
  | "ahmad-unit-book"
  | "ahmad-video"
  | "official-pearson"
  | "general-knowledge"
  | "tool-source";

export type SourceRef = {
  kind: "pdf" | "video" | "web" | "code";
  label: string;
  /** e.g. page range, video timestamp range, repository path */
  ref?: string;
  url?: string;
};

export type OfficialSource = {
  publisher: string;
  document: string;
  url?: string;
  /** Short quotation only (<= 25 words), attributed. */
  quote?: string;
};

export type Term = { ar: string; en: string };

export type Block =
  | { t: "p"; text: string }
  | { t: "h2"; text: string }
  | { t: "h3"; text: string }
  | { t: "ul"; items: string[] }
  | { t: "ol"; items: string[] }
  | { t: "table"; head: string[]; rows: string[][]; caption?: string }
  | { t: "callout"; kind: "tip" | "warning" | "example" | "note"; title?: string; text: string }
  | { t: "terms"; items: Term[] };

export type NodeBase = {
  id: string;
  type: NodeType;
  title_ar: string;
  title_en: string;
  slug: string;
  summary: string;
  unit: string | null;
  learningAim: string | null;
  criterion: string | null;
  concepts: string[];
  questions: string[];
  sourceType: SourceType;
  sourceReferences: SourceRef[];
  youtubeId: string | null;
  author: string;
  lastReviewed: string;
  visibility: Visibility;
  related: string[];
  officialSource: OfficialSource | null;
  status: Status;
  needsVerification?: boolean;
  /** Free text: who has/has not reviewed this node (shown nowhere publicly, used by the validator & reports). */
  reviewState?: string;
  aliases?: string[];
};

export type ConceptNode = NodeBase & {
  type: "Concept" | "Comparison";
  order: number;
  /** 2–4 sentences, answers the question immediately. */
  shortAnswer: string;
  /** Why this matters in BTEC (assessment-relevance), written as Ahmad's explanation. */
  whyBtec: string;
  terminology: Term[];
  /** Equivalent phrasings answered by this one page (grouped intents — no duplicate pages). */
  questionsAnswered: string[];
  body: Block[];
  videos: string[];
  /** Show the BTEC IT Card pointer (only where commercially appropriate). */
  cardCta: boolean;
  /** Internal only: a mapping taken from Ahmad's own material, never rendered as an official Learning Aim. */
  learningAimHint?: { letter: string; from: string; needsVerification: true };
};

export type UnitNode = NodeBase & {
  type: "Unit";
  order: number;
  description: string;
  /** Unit overview as Ahmad's booklet presents it. Not Pearson wording; not rendered as official Learning Aims. */
  axes: { label: string; title_ar: string; summary_ar: string }[];
  axesSource: string;
  intro: Block[];
  resourceIds: string[];
  cardId: string | null;
  /** Topics that exist in the unit but have no source-backed page yet (shown honestly as "قيد الإعداد"). */
  comingSoon: string[];
};

export type GlossaryNode = NodeBase & {
  type: "GlossaryTerm";
  term_ar: string;
  term_en: string;
  definition_ar: string;
  conceptId: string | null;
};

export type VideoNode = NodeBase & {
  type: "Video";
  youtubeId: string;
  originalTitle: string;
  conceptTitle_ar: string;
  /** seconds */
  duration: number;
  uploadDate: string;
  playlistId: string | null;
  unitId: string | null;
  conceptIds: string[];
  hasTranscript: boolean;
  availability: "public" | "unavailable";
  chapters: { t: number; title: string }[];
  lessonLabel?: string;
};

export type ResourceNode = NodeBase & {
  type: "EducationalResource";
  materialId: string;
  kind: "booklet" | "unit-book" | "explanation" | "worksheet";
};

export type ToolNode = NodeBase & {
  type: "Tool";
  url: string;
  description: string;
};

export type ProductNode = NodeBase & {
  type: "Product";
  description: string;
  audience: string[];
  includes: { unit: string; title_ar: string; priceJOD: number | null }[];
  support: string[];
  howToGet: { label: string; url: string }[];
  /** Prices are recorded but hidden until a human confirms they are current and sets this to true. */
  showPrice: boolean;
  currency: "JOD";
  reportReview: "included" | "not-included" | "unknown";
  excluded: string[];
};

export type KbNode = ConceptNode | UnitNode | GlossaryNode | VideoNode | ResourceNode | ToolNode | ProductNode;

export type Issue = { level: "error" | "warn"; id: string; message: string; file?: string };

export const FILLER_OPENINGS = ["في عالم", "في ظل التطور", "في عصرنا", "مع التطور", "في زمن"];
