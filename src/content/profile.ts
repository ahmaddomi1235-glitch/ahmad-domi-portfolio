// Verified facts only. Source: AHMAD_DOMI_ATS_CV_Template.pdf and the approved
// content brief. See CONTENT_INVENTORY.md for sourcing notes.

export const profile = {
  name: {
    ar: "أحمد رائد أحمد دومي",
    en: "Ahmad Raed Ahmad Domi",
  },
  shortName: {
    ar: "أحمد دومي",
    en: "Ahmad Domi",
  },
  location: {
    ar: "إربد، الأردن",
    en: "Irbid, Jordan",
  },
  email: "ahmaddomi1235@gmail.com",
  phone: "+962775320592",
  phoneDisplay: "+962 775 320 592",
  social: {
    linkedin: "https://linkedin.com/in/ahmad-domi",
    github: "https://github.com/ahmaddomi1235-glitch",
    youtube: "https://www.youtube.com/@AhmadDomi-r7r",
    instagram: "https://www.instagram.com/ahmaddomiedu",
  },
  cvUrl: "/documents/Ahmad-Domi-CV.pdf" as string | null,
  cvFileName: "Ahmad-Domi-CV.pdf",
  education: {
    degree: { ar: "بكالوريوس الأمن السيبراني", en: "Bachelor of Cybersecurity" },
    institution: { ar: "جامعة آل البيت", en: "Al al-Bayt University" },
    graduation: "2026",
  },
  achievements: [
    { ar: "المركز السابع على مستوى المملكة في مسابقة للأمن السيبراني بنظام CTF.", en: "Ranked 7th nationwide in a Cybersecurity CTF." },
    { ar: "بناء عدة منصات في مجال الأمن السيبراني.", en: "Built multiple cybersecurity platforms." },
    { ar: "المشاركة في مؤتمرات ومجتمعات تقنية متخصصة في الأمن السيبراني.", en: "Participated in cybersecurity conferences and technical communities." },
  ],
  languages: [
    { name: { ar: "العربية", en: "Arabic" }, level: { ar: "اللغة الأم", en: "Native" } },
    { name: { ar: "الإنجليزية", en: "English" }, level: { ar: "متوسط متقدم (B2)", en: "B2" } },
  ],
  experience: [
    {
      id: "asas",
      org: { ar: "منصة أساس التعليمية", en: "Asas Educational Platform" },
      role: { ar: "مدرب BTEC IT", en: "BTEC IT Instructor" },
      duration: { ar: "8 أشهر", en: "8 months" },
      points: {
        ar: [
          "تدريس مواد BTEC IT.",
          "إعداد ملخصات ومراجعات.",
          "إعداد مختبرات وتمارين عملية.",
          "تطوير مواد تعليمية للطلبة.",
        ],
        en: [
          "Taught BTEC IT subjects.",
          "Prepared summaries and revision materials.",
          "Prepared practical labs and exercises.",
          "Developed educational materials for students.",
        ],
      },
    },
    {
      id: "freelance",
      org: { ar: "تدريب حر", en: "Freelance Instruction" },
      role: { ar: "مدرب BTEC IT مستقل", en: "Freelance BTEC IT Instructor" },
      duration: { ar: "سنة ونصف", en: "1.5 years" },
      points: {
        ar: [
          "تقديم تدريب خاص للطلبة.",
          "تقديم إرشاد أكاديمي.",
          "إعداد مواد مراجعة.",
          "متابعة متطلبات المشاريع والتقييمات.",
        ],
        en: [
          "Provided private instruction to students.",
          "Provided academic mentoring.",
          "Prepared revision materials.",
          "Tracked project and assessment requirements.",
        ],
      },
    },
  ],
  certifications: [
    { name: "CEH", category: { ar: "أمن سيبراني هجومي", en: "Offensive Security" } },
    { name: "eJPTv2", category: { ar: "اختبار اختراق", en: "Penetration Testing" } },
    { name: "CCNA", category: { ar: "شبكات", en: "Networking" } },
    {
      name: { ar: "برنامج المركز الوطني للأمن السيبراني", en: "National Cyber Security Center Training Program" },
      category: { ar: "أمن سيبراني", en: "Cybersecurity" },
    },
    { name: "Cisco Cybersecurity Essentials", category: { ar: "أساسيات الأمن السيبراني", en: "Cybersecurity Fundamentals" } },
    { name: "CryptoHack", category: { ar: "تشفير", en: "Cryptography" } },
  ],
  skillCategories: [
    {
      title: { ar: "الأمن والدفاع", en: "Security & Defense" },
      items: ["Security Engineering", "Detection Engineering", "Offensive Security", "AWS Security"],
    },
    {
      title: { ar: "أدوات اختبار الاختراق", en: "Penetration Testing Tools" },
      items: ["Nmap", "Metasploit"],
    },
    {
      title: { ar: "البرمجة والأنظمة", en: "Programming & Systems" },
      items: ["Python", "FastAPI", "React", "TypeScript", "PySide6", "C++"],
    },
    {
      title: { ar: "البنية التحتية والبيانات", en: "Infrastructure & Data" },
      items: ["Docker", "PostgreSQL", "SQLite", "Linux", "Windows"],
    },
  ],
};

export type Profile = typeof profile;
