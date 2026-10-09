/**
 * Owner-confirmed commercial facts (2026-10-09). Single source of truth for every page, schema node and test that states a
 * price or what the card includes. Do not add services, discounts, packages, durations, refund or payment terms here
 * unless the owner has confirmed them.
 */
export const services = {
  card: {
    priceJOD: 85,
    /** Report review is a benefit of the card, not a separate paid service. */
    reportReviewIncluded: true,
  },
  privateLessons: {
    inPersonPerHourJOD: 35,
    onlinePerHourJOD: 25,
  },
  currency: "JOD",
} as const;

export const cardName = "بطاقة أحمد دومي التعليمية — BTEC IT";
export const lessonsPath = "/btec-it/private-lessons";
