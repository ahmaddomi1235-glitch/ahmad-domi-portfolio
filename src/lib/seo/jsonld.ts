/**
 * JSON-LD builders. Rules we hold ourselves to:
 *  - only schema.org types that the page genuinely is (no decorative types);
 *  - every Ahmad-authored page references the same Person @id;
 *  - never emit reviews, ratings, awards, credentials, FAQPage, availability, stock status or Pearson affiliation;
 *  - never emit prices: the owner chose not to publish them, so no Offer / priceSpecification / price / priceCurrency exists anywhere.
 */
import {
  SITE_URL,
  absoluteUrl,
  accounts,
  alternateNames,
  brand,
  defaultDescription,
  knowsAbout,
  profileImage,
  sameAs,
} from "@/config/site";
import { profile } from "@/content/profile";

export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export type Crumb = { name: string; path: string };

export function personNode() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: brand.nameEn,
    alternateName: [brand.nameAr, ...alternateNames],
    url: `${SITE_URL}/`,
    image: profileImage,
    jobTitle: brand.jobTitleEn,
    description:
      "BTEC IT instructor in Jordan. Explains BTEC IT units — cybersecurity, artificial intelligence, data modelling and IT project management — in Arabic, with English technical terms.",
    address: { "@type": "PostalAddress", addressLocality: "Irbid", addressCountry: "JO" },
    knowsLanguage: ["ar", "en"],
    knowsAbout,
    alumniOf: { "@type": "CollegeOrUniversity", name: profile.education.institution.en },
    affiliation: { "@type": "Organization", name: "Asas Educational Platform" },
    sameAs,
  };
}

export function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: brand.siteName,
    alternateName: brand.full,
    description: defaultDescription,
    inLanguage: "ar",
    publisher: { "@id": PERSON_ID },
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/search?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbNode(crumbs: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

export function graph(...nodes: unknown[]) {
  return { "@context": "https://schema.org", "@graph": nodes.filter(Boolean) };
}

export function homeGraph() {
  return graph(websiteNode(), personNode());
}

export function profilePageGraph(locale: "ar" | "en") {
  const path = locale === "ar" ? "/about" : "/en";
  return graph(
    {
      "@type": "ProfilePage",
      "@id": `${absoluteUrl(path)}#profilepage`,
      url: absoluteUrl(path),
      name: locale === "ar" ? "عن أحمد دومي" : "About Ahmad Domi",
      inLanguage: locale,
      isPartOf: { "@id": WEBSITE_ID },
      mainEntity: { "@id": PERSON_ID },
    },
    personNode(),
  );
}

export type ArticleInput = {
  path: string;
  headline: string;
  description: string;
  modified: string;
  crumbs: Crumb[];
  /** Name of the concept the article defines, when it defines one. */
  about?: { name: string; alternateName?: string };
  sources?: { name: string; url?: string }[];
  video?: VideoInput;
};

export type VideoInput = {
  youtubeId: string;
  name: string;
  description: string;
  uploadDate: string;
  durationSeconds: number;
  chapters?: { t: number; title: string }[];
};

function isoDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `PT${h ? `${h}H` : ""}${m ? `${m}M` : ""}${s || (!h && !m) ? `${s}S` : ""}`;
}

export function videoNode(v: VideoInput, pageUrl: string) {
  return {
    "@type": "VideoObject",
    name: v.name,
    description: v.description,
    thumbnailUrl: [`https://i.ytimg.com/vi/${v.youtubeId}/hqdefault.jpg`],
    uploadDate: v.uploadDate,
    duration: isoDuration(v.durationSeconds),
    contentUrl: `https://www.youtube.com/watch?v=${v.youtubeId}`,
    embedUrl: `https://www.youtube-nocookie.com/embed/${v.youtubeId}`,
    inLanguage: "ar",
    author: { "@id": PERSON_ID },
    mainEntityOfPage: pageUrl,
    ...(v.chapters?.length
      ? {
          hasPart: v.chapters.map((c, i) => ({
            "@type": "Clip",
            name: c.title,
            startOffset: c.t,
            endOffset: v.chapters![i + 1]?.t ?? v.durationSeconds,
            url: `https://www.youtube.com/watch?v=${v.youtubeId}&t=${c.t}s`,
          })),
        }
      : {}),
  };
}

export function articleGraph(a: ArticleInput) {
  const url = absoluteUrl(a.path);
  return graph(
    {
      "@type": "TechArticle",
      "@id": `${url}#article`,
      headline: a.headline,
      description: a.description,
      url,
      inLanguage: "ar",
      dateModified: a.modified,
      author: { "@id": PERSON_ID },
      publisher: { "@id": PERSON_ID },
      isPartOf: { "@id": WEBSITE_ID },
      mainEntityOfPage: url,
      image: profileImage,
      ...(a.about
        ? { about: { "@type": "DefinedTerm", name: a.about.name, ...(a.about.alternateName ? { alternateName: a.about.alternateName } : {}) } }
        : {}),
      ...(a.sources?.length ? { citation: a.sources.map((s) => ({ "@type": "CreativeWork", name: s.name, ...(s.url ? { url: s.url } : {}) })) } : {}),
    },
    breadcrumbNode(a.crumbs),
    a.video ? videoNode(a.video, url) : null,
    personNode(),
  );
}

/** `aboutName` = the topic a hub covers (e.g. the unit). Without it the collection is about its author, which is only right for portfolio-style lists. */
export function collectionGraph(opts: { path: string; name: string; description: string; crumbs: Crumb[]; items?: { name: string; path: string }[]; aboutName?: string }) {
  const url = absoluteUrl(opts.path);
  return graph(
    {
      "@type": "CollectionPage",
      "@id": `${url}#page`,
      url,
      name: opts.name,
      description: opts.description,
      inLanguage: "ar",
      isPartOf: { "@id": WEBSITE_ID },
      about: opts.aboutName ? { "@type": "Thing", name: opts.aboutName } : { "@id": PERSON_ID },
      author: { "@id": PERSON_ID },
      ...(opts.items?.length
        ? {
            mainEntity: {
              "@type": "ItemList",
              itemListElement: opts.items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, url: absoluteUrl(it.path) })),
            },
          }
        : {}),
    },
    breadcrumbNode(opts.crumbs),
  );
}

export function glossaryGraph(terms: { slug: string; ar: string; en: string; definition: string }[], crumbs: Crumb[]) {
  const url = absoluteUrl("/btec-it/glossary");
  return graph(
    {
      "@type": "DefinedTermSet",
      "@id": `${url}#set`,
      url,
      name: "مصطلحات BTEC IT (عربي — English)",
      inLanguage: "ar",
      author: { "@id": PERSON_ID },
      hasDefinedTerm: terms.map((t) => ({
        "@type": "DefinedTerm",
        "@id": `${url}#${t.slug}`,
        name: t.ar,
        alternateName: t.en,
        description: t.definition,
        inDefinedTermSet: { "@id": `${url}#set` },
      })),
    },
    breadcrumbNode(crumbs),
  );
}

export function calculatorGraph(crumbs: Crumb[]) {
  const url = absoluteUrl("/btec-calculator");
  return graph(
    {
      "@type": "WebApplication",
      "@id": `${url}#app`,
      name: "حاسبة معدل BTEC (التوجيهي الأردني)",
      alternateName: "BTEC grade calculator — Jordan Tawjihi",
      url,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any (web browser)",
      inLanguage: "ar",
      isAccessibleForFree: true,
      creator: { "@id": PERSON_ID },
    },
    breadcrumbNode(crumbs),
    personNode(),
  );
}

export function videosGraph(videos: { youtubeId: string; name: string; description: string; uploadDate: string; durationSeconds: number }[], crumbs: Crumb[]) {
  const url = absoluteUrl("/videos");
  return graph(
    {
      "@type": "CollectionPage",
      "@id": `${url}#page`,
      url,
      name: "فيديوهات أحمد دومي لـ BTEC IT",
      inLanguage: "ar",
      isPartOf: { "@id": WEBSITE_ID },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: videos.map((v, i) => ({ "@type": "ListItem", position: i + 1, item: videoNode(v, url) })),
      },
    },
    breadcrumbNode(crumbs),
  );
}

export type CardSchemaInput = {
  name: string;
  description: string;
  crumbs: Crumb[];
};

/** Product description only: no Offer, no price (owner decision), no availability, no reviews or ratings. */
export function cardGraph(c: CardSchemaInput) {
  const url = absoluteUrl("/btec-it-card");
  const base = {
    "@type": "WebPage",
    "@id": `${url}#page`,
    url,
    name: c.name,
    description: c.description,
    inLanguage: "ar",
    isPartOf: { "@id": WEBSITE_ID },
    author: { "@id": PERSON_ID },
    about: { "@id": `${url}#product` },
  };
  const product = {
    "@type": "Product",
    "@id": `${url}#product`,
    name: c.name,
    description: c.description,
    url,
    brand: { "@type": "Brand", name: brand.siteName },
    manufacturer: { "@id": PERSON_ID },
    category: "Educational course material (BTEC IT)",
    inLanguage: "ar",
  };
  return graph(base, product, breadcrumbNode(c.crumbs), personNode());
}

export type ServiceSchemaInput = {
  path: string;
  name: string;
  description: string;
  serviceType: string;
  crumbs: Crumb[];
};

export function serviceGraph(s: ServiceSchemaInput) {
  const url = absoluteUrl(s.path);
  return graph(
    {
      "@type": "WebPage",
      "@id": `${url}#page`,
      url,
      name: s.name,
      description: s.description,
      inLanguage: "ar",
      isPartOf: { "@id": WEBSITE_ID },
      author: { "@id": PERSON_ID },
      about: { "@id": `${url}#service` },
    },
    {
      "@type": "Service",
      "@id": `${url}#service`,
      name: s.name,
      description: s.description,
      serviceType: s.serviceType,
      url,
      inLanguage: "ar",
      provider: { "@id": PERSON_ID },
    },
    breadcrumbNode(s.crumbs),
    personNode(),
  );
}

export { accounts };
