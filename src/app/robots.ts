import type { MetadataRoute } from "next";
import { SITE_URL } from "@/config/site";

/**
 * Open to all crawlers. No crawler-specific rules: allowing a bot does not guarantee indexing, retrieval, training or
 * citation, and blocking is not needed — there is nothing private on this host (paid material is never published).
 * /search is noindex via its meta robots tag (it must stay crawlable for that tag to be seen).
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
