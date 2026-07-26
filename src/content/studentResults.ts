// Published images live in public/images/student-results/. Originals are kept,
// untouched, in images_source/ (git-ignored). See ASSET_PRIVACY_REVIEW.md for
// the full per-file review — one image was withheld because it exposed a
// student's phone number, photo, and name together; the rest are published
// as provided. Alt text and captions intentionally do not restate any
// student's name, even where one appears in the screenshot itself.

export type StudentResultCategory = "result" | "message";

export type StudentResult = {
  id: string;
  image: string;
  width: number;
  height: number;
  alt: { ar: string; en: string };
  caption: { ar: string; en: string };
  category: StudentResultCategory;
};

export const studentResults: StudentResult[] = [
  {
    id: "result-01",
    image: "/images/student-results/result-01.jpg",
    width: 1179,
    height: 1600,
    category: "result",
    alt: {
      ar: "رسالة من طالب يشارك نتيجة مشروع ويشكر على المتابعة.",
      en: "Message from a student sharing a project result and thanking the instructor for support.",
    },
    caption: {
      ar: "رسالة شكر من طالب بعد نتيجة مشروع.",
      en: "Thank-you message from a student after a project result.",
    },
  },
  {
    id: "result-02",
    image: "/images/student-results/result-02.jpg",
    width: 1264,
    height: 880,
    category: "result",
    alt: { ar: "رسالة من طالب يذكر حصوله على تقدير Distinction ويشكر على الشرح.", en: "Message from a student reporting a Distinction grade and thanking the instructor for the explanation." },
    caption: { ar: "طالب يشارك حصوله على تقدير Distinction.", en: "A student reports a Distinction grade." },
  },
  {
    id: "result-03",
    image: "/images/student-results/result-03.jpg",
    width: 1134,
    height: 1600,
    category: "result",
    alt: { ar: "رسالة من طالب يذكر حصوله على تقدير Distinction بعد استيفاء معايير المهمة.", en: "Message from a student reporting a Distinction grade after meeting the task's assessment criteria." },
    caption: { ar: "طالب يشارك نتيجة مهمة استوفت جميع المعايير.", en: "A student reports a task that met all assessment criteria." },
  },
  {
    id: "result-04",
    image: "/images/student-results/result-04.jpg",
    width: 1264,
    height: 1446,
    category: "result",
    alt: { ar: "رسالة من طالب يذكر حصوله على تقدير Distinction في مادة البرمجة.", en: "Message from a student reporting a Distinction grade in the Programming subject." },
    caption: { ar: "طالب يشارك نتيجة Distinction في البرمجة.", en: "A student reports a Distinction grade in Programming." },
  },
  {
    id: "result-05",
    image: "/images/student-results/result-05.jpg",
    width: 1264,
    height: 714,
    category: "result",
    alt: { ar: "رسالة من طالب يذكر حصوله على تقدير Distinction في مادة الذكاء الاصطناعي.", en: "Message from a student reporting a Distinction grade in the Artificial Intelligence subject." },
    caption: { ar: "طالب يشارك نتيجة Distinction في الذكاء الاصطناعي.", en: "A student reports a Distinction grade in Artificial Intelligence." },
  },
  {
    id: "result-06",
    image: "/images/student-results/result-06.jpg",
    width: 1264,
    height: 1119,
    category: "result",
    alt: { ar: "رسالة من طالب يذكر حصوله على تقدير Distinction في واجب برمجة.", en: "Message from a student reporting a Distinction grade on a programming assignment." },
    caption: { ar: "طالب يشارك نتيجة Distinction في واجب برمجة.", en: "A student reports a Distinction grade on a programming assignment." },
  },
  {
    id: "result-07",
    image: "/images/student-results/result-07.jpg",
    width: 1264,
    height: 1125,
    category: "message",
    alt: { ar: "رسالة شكر عامة من طالب دون ذكر تقدير محدد.", en: "General thank-you message from a student, without a specific grade mentioned." },
    caption: { ar: "رسالة شكر من طالب.", en: "A thank-you message from a student." },
  },
  {
    id: "result-08",
    image: "/images/student-results/result-08.jpg",
    width: 1264,
    height: 708,
    category: "result",
    alt: { ar: "رسالة من طالب يذكر أن تقدير Distinction تأكد بعد مراجعة مسألة تتعلق بفحص الانتحال.", en: "Message from a student reporting that a Distinction grade was confirmed after a plagiarism-check issue was resolved." },
    caption: { ar: "طالب يشارك تأكيد تقدير Distinction بعد مراجعة فحص الانتحال.", en: "A student reports a confirmed Distinction grade after a plagiarism-check review." },
  },
  {
    id: "result-09",
    image: "/images/student-results/result-09.jpg",
    width: 1264,
    height: 1263,
    category: "result",
    alt: { ar: "رسالة من طالب يذكر حصوله على تقدير Distinction في البرمجة ويشكر على الشرح.", en: "Message from a student reporting a Distinction grade in Programming and thanking the instructor for the explanation." },
    caption: { ar: "طالب يشارك نتيجة Distinction في البرمجة.", en: "A student reports a Distinction grade in Programming." },
  },
  {
    id: "result-10",
    image: "/images/student-results/result-10.jpg",
    width: 1264,
    height: 942,
    category: "result",
    alt: { ar: "رسالة من طالب يذكر حصوله على تقدير Distinction.", en: "Message from a student reporting a Distinction grade." },
    caption: { ar: "طالب يشارك نتيجة Distinction.", en: "A student reports a Distinction grade." },
  },
  {
    id: "result-11",
    image: "/images/student-results/result-11.jpg",
    width: 1264,
    height: 996,
    category: "result",
    alt: { ar: "رسالة من طالب يذكر حصوله على تقدير Distinction في مادة الذكاء الاصطناعي.", en: "Message from a student reporting a Distinction grade in Artificial Intelligence." },
    caption: { ar: "طالب يشارك نتيجة Distinction في الذكاء الاصطناعي.", en: "A student reports a Distinction grade in Artificial Intelligence." },
  },
  {
    id: "result-12",
    image: "/images/student-results/result-12.jpg",
    width: 1264,
    height: 1384,
    category: "result",
    alt: { ar: "رسالة من طالب يذكر حصوله على تقدير Distinction ويشكر على المتابعة.", en: "Message from a student reporting a Distinction grade and thanking the instructor for support." },
    caption: { ar: "طالب يشارك نتيجة Distinction.", en: "A student reports a Distinction grade." },
  },
  {
    id: "result-13",
    image: "/images/student-results/result-13.jpg",
    width: 1264,
    height: 836,
    category: "result",
    alt: { ar: "رسالة صوتية ونصية من طالب يذكر حصوله على تقدير Distinction في البرمجة والذكاء الاصطناعي وإدارة المشاريع.", en: "Voice and text message from a student reporting Distinction grades across Programming, AI, and Project Management." },
    caption: { ar: "طالب يشارك نتائج Distinction في ثلاث مواد.", en: "A student reports Distinction grades across three subjects." },
  },
  {
    id: "result-14",
    image: "/images/student-results/result-14.jpg",
    width: 1264,
    height: 827,
    category: "result",
    alt: { ar: "رسالة من طالب يذكر حصوله على تقدير Distinction في مهمة تصميم موقع.", en: "Message from a student reporting a Distinction grade on a website design task." },
    caption: { ar: "طالب يشارك نتيجة Distinction في مهمة تصميم موقع.", en: "A student reports a Distinction grade on a website task." },
  },
  {
    id: "result-15",
    image: "/images/student-results/result-15.jpg",
    width: 1264,
    height: 1566,
    category: "result",
    alt: { ar: "رسالة شكر من طالب يذكر حصوله على تقدير Distinction ويثني على أسلوب الشرح.", en: "Thank-you message from a student reporting a Distinction grade and commenting positively on the teaching approach." },
    caption: { ar: "طالب يشارك نتيجة Distinction ويشكر على أسلوب الشرح.", en: "A student reports a Distinction grade and thanks the instructor for the teaching approach." },
  },
  {
    id: "result-16",
    image: "/images/student-results/result-16.jpg",
    width: 1264,
    height: 829,
    category: "result",
    alt: { ar: "رسالة من طالب يذكر حصوله على تقدير Distinction في مادة الأمن السيبراني.", en: "Message from a student reporting a Distinction grade in the Cybersecurity subject." },
    caption: { ar: "طالب يشارك نتيجة Distinction في الأمن السيبراني.", en: "A student reports a Distinction grade in Cybersecurity." },
  },
];
