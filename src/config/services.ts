/**
 * Owner-confirmed commercial facts. PRICES ARE DELIBERATELY NOT PUBLISHED (owner decision, 2026-10-09): there is no price,
 * rate, currency or amount in this file, so no page, schema node, llms.txt line or search-index entry can render one.
 * Add a number here only after the owner reverses that decision (and then update the price-leak tests).
 */
export const services = {
  card: {
    /** Report review is a benefit of the card, not a separate paid service. */
    reportReviewIncluded: true,
  },
  privateLessons: {
    formats: ["أونلاين", "وجاهي"] as const,
  },
} as const;

export const cardName = "بطاقة أحمد دومي التعليمية — BTEC IT";
export const lessonsPath = "/btec-it/private-lessons";

/** Neutral call to action used wherever a price used to be. */
export const priceInquiryCta = "للاستفسار عن الأسعار وتفاصيل الاشتراك أو حجز الدروس، تواصل مع أحمد دومي.";
