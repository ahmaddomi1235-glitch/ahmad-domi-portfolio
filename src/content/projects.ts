export type LocalizedText = { ar: string; en: string };
export type LocalizedList = { ar: string[]; en: string[] };

export type ProjectCategory = "education" | "ai-business" | "cybersecurity";

export type CaseStudy = {
  overview: LocalizedText;
  problem: LocalizedText;
  howItWorks: LocalizedText;
  role: LocalizedText;
  implemented: LocalizedList;
  status: LocalizedText;
};

export type Project = {
  slug: string;
  title: LocalizedText;
  /** Optional search-result title when the display title would compete with another page (e.g. a tool page). */
  seoTitle?: LocalizedText;
  category: ProjectCategory;
  categoryLabel: LocalizedText;
  /** Functional description shown on the project card — what it does, not what it's "for". */
  summary: LocalizedText;
  /** One-sentence contribution line shown on the card. */
  contribution: LocalizedText;
  featured: boolean;
  liveUrl?: string;
  privateProject?: boolean;
  detailsPending?: boolean;
  technologies: string[];
  caseStudy?: CaseStudy;
  subsystems?: { slug: string; name: string; role: LocalizedText }[];
};

const categoryLabels: Record<ProjectCategory, LocalizedText> = {
  education: { ar: "تقنية تعليمية", en: "Education Technology" },
  "ai-business": { ar: "الذكاء الاصطناعي والأعمال", en: "AI & Business" },
  cybersecurity: { ar: "الأمن السيبراني", en: "Cybersecurity" },
};

export const projects: Project[] = [
  {
    slug: "btec-grade-calculator",
    title: { ar: "حاسبة معدل أساس BTEC", en: "Asas BTEC Grade Calculator" },
    seoTitle: { ar: "دراسة حالة مشروع: حاسبة معدل أساس BTEC", en: "Project case study: Asas BTEC Grade Calculator" },
    category: "education",
    categoryLabel: categoryLabels.education,
    summary: {
      ar: "طورت حاسبة معدل أساس لتمكين طلبة BTEC من إدخال نتائجهم وحساب معدلهم من خلال واجهة ويب واضحة. يركز المشروع على تنفيذ عملية الحساب بصورة منظمة وتقليل الأخطاء التي قد تحدث عند حساب النتائج يدويًا.",
      en: "I developed the Asas BTEC Grade Calculator to allow BTEC students to enter their results and calculate their academic average through a clear web interface. The project organizes the calculation process and reduces errors associated with manual calculation.",
    },
    contribution: {
      ar: "صممت وطورت الواجهة ومنطق الحساب بالكامل.",
      en: "I designed and built the interface and the calculation logic end to end.",
    },
    featured: true,
    liveUrl: "https://asasbtec.vercel.app/",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    caseStudy: {
      overview: {
        ar: "أداة ويب تساعد طلبة BTEC على حساب معدلهم الأكاديمي وفهمه من خلال تجربة واضحة وسهلة الاستخدام.",
        en: "A web-based tool that helps BTEC students calculate and understand their academic average through a clear, accessible interface.",
      },
      problem: {
        ar: "يحتاج الطالب إلى جمع نتائجه وحساب المعدل وفق القيم المستخدمة في البرنامج، وقد يؤدي الحساب اليدوي إلى أخطاء أو صعوبة في متابعة النتيجة.",
        en: "A student needs to collect their results and calculate an average using the grading values the program uses, and manual calculation can introduce errors or make it hard to track the result.",
      },
      howItWorks: {
        ar: "يدخل الطالب نتائجه لكل وحدة عبر الواجهة، وتقوم الأداة بتحويل كل نتيجة إلى القيمة المقابلة لها ضمن نظام تقييم BTEC، ثم تجمع هذه القيم وتحسب المعدل تلقائيًا وتعرضه للطالب مباشرة دون خطوات إضافية.",
        en: "The student enters their results for each unit through the interface. The tool converts each result into its corresponding value under the BTEC grading system, then totals those values, calculates the average automatically, and displays the result immediately.",
      },
      role: {
        ar: "صممت وطورت واجهة الموقع ومنطق إدخال النتائج وحساب المعدل وعرض النتيجة للمستخدم.",
        en: "I designed and built the site's interface, the result-entry logic, the average calculation, and the result display.",
      },
      implemented: {
        ar: ["واجهة إدخال النتائج لكل وحدة", "منطق تحويل النتائج إلى قيم البرنامج", "حساب المعدل تلقائيًا", "عرض النتيجة النهائية للطالب"],
        en: ["A per-unit result entry interface", "Logic converting results into program grading values", "Automatic average calculation", "Display of the final result to the student"],
      },
      status: { ar: "متاحة للاستخدام", en: "Live and available for use" },
    },
  },
  {
    slug: "omnia",
    title: { ar: "OMNIA", en: "OMNIA" },
    category: "ai-business",
    categoryLabel: categoryLabels["ai-business"],
    summary: {
      ar: "أعمل على تطوير OMNIA، وهي منصة متعددة المستأجرين تستخدم الذكاء الاصطناعي لإدارة محادثات العملاء ومعرفة الشركة والمتابعات والمهام التشغيلية. بدأ المشروع كنظام رد تلقائي، ثم توسع ليشمل فهم سياق الشركة والمشاركة في تنفيذ العمليات اليومية.",
      en: "I am developing OMNIA, a multi-tenant platform that uses AI to manage customer conversations, company knowledge, follow-ups, and daily operational tasks. The project began as an automated reply system and expanded to include company-specific context and support for daily operational tasks.",
    },
    contribution: {
      ar: "صممت بنية المنصة متعددة المستأجرين وطورت تدفق معالجة الرسائل من الاستقبال إلى الرد.",
      en: "I designed the multi-tenant platform architecture and built the message-processing flow from intake to reply.",
    },
    featured: true,
    technologies: ["Next.js", "TypeScript", "Python", "FastAPI"],
    caseStudy: {
      overview: {
        ar: "منصة عمليات أعمال مدعومة بالذكاء الاصطناعي تدير المحادثات والمعرفة والمتابعات لعدة شركات ضمن بنية واحدة.",
        en: "An AI-powered business operations platform that manages conversations, knowledge, and follow-ups for multiple companies within one architecture.",
      },
      problem: {
        ar: "تتعامل الشركات مع الرسائل ومعلومات العملاء والمتابعات والمهام من خلال أدوات منفصلة، كما أن أنظمة الرد التقليدية لا تفهم معرفة كل شركة أو سياق عملياتها.",
        en: "Companies handle messages, customer information, follow-ups, and tasks through separate tools, and traditional auto-reply systems don't understand a company's specific knowledge or operational context.",
      },
      howItWorks: {
        ar: "يرسل العميل رسالة عبر قناة مرتبطة بالمنصة، ويستقبل مزوّد الخدمة هذا الحدث ويمرره إلى نظام استقبال الويب هوك. تحدد المنصة الشركة الصحيحة المرتبطة بهذه المحادثة، وتسترجع طبقة المعرفة المعلومات الخاصة بتلك الشركة، ثم يستخدم محرك الذكاء الاصطناعي هذا السياق لتوليد رد أو إجراء مناسب، وترسل خدمة الرد الاستجابة عبر القناة نفسها. عند الحاجة، يمكن إنشاء متابعة أو مهمة مرتبطة بالمحادثة.",
        en: "A customer sends a message through an integrated channel, the provider forwards the event, and a webhook receives it. The platform resolves the correct company tied to that conversation, the knowledge layer retrieves information specific to that company, and the AI engine uses this context to generate an appropriate reply or action. The reply service sends the response back through the same channel, and a follow-up or task can be created from the conversation when needed.",
      },
      role: {
        ar: "صممت بنية المنصة متعددة المستأجرين، وطورت تدفق استقبال الرسائل ومعالجة الويب هوك وربط الرسالة بالشركة الصحيحة واسترجاع المعرفة وتشغيل نموذج الذكاء الاصطناعي وإرسال الرد.",
        en: "I designed the multi-tenant platform architecture and built the message-intake flow — webhook processing, resolving the message to the correct company, knowledge retrieval, running the AI model, and sending the reply.",
      },
      implemented: {
        ar: [
          "بنية متعددة المستأجرين تفصل بيانات ومعرفة كل شركة",
          "معالجة ويب هوك لاستقبال رسائل Instagram",
          "طبقة استرجاع معرفة خاصة بكل شركة",
          "عرض يومي (Today) للمهام والأولويات",
          "مهام ومتابعات (Missions & Follow-ups)",
          "مستشار أعمال (Business Advisor) يقترح إجراءات",
        ],
        en: [
          "A multi-tenant architecture that separates each company's data and knowledge",
          "Webhook processing for incoming Instagram messages",
          "A company-specific knowledge retrieval layer",
          "A daily Today view for tasks and priorities",
          "Missions and follow-ups",
          "A Business Advisor that suggests actions",
        ],
      },
      status: {
        ar: "قيد التطوير النشط — تم تنفيذ مسار تكامل مراسلة فعلي متكامل بين الطرفين عبر Instagram.",
        en: "Active development — a real, end-to-end messaging integration via Instagram has been implemented.",
      },
    },
  },
  {
    slug: "aegis-athena",
    title: { ar: "Aegis Athena", en: "Aegis Athena" },
    category: "cybersecurity",
    categoryLabel: categoryLabels.cybersecurity,
    summary: {
      ar: "طورت Aegis Athena كمنصة تجمع عدة أنظمة أمنية في واجهة تشغيل ومراقبة واحدة. تتضمن المنصة واجهة مركزية لتشغيل الأنظمة ومتابعة حالتها، إلى جانب Auto Defense System وSecurity Chat Fixer وHoneyBot.",
      en: "I built Aegis Athena as a platform that brings several security systems together under one launch-and-monitoring interface. It includes a central shell for running and tracking system status, alongside Auto Defense System, Security Chat Fixer, and HoneyBot.",
    },
    contribution: {
      ar: "صممت الواجهة المركزية وطورت الأنظمة الفرعية الثلاثة.",
      en: "I designed the central shell and built all three subsystems.",
    },
    featured: true,
    technologies: ["React", "TypeScript", "Tauri", "Python", "FastAPI", "PySide6"],
    subsystems: [
      { slug: "auto-defense-system", name: "Auto Defense System", role: { ar: "دفاع الأصول والاستجابة", en: "Asset defense & response" } },
      { slug: "security-chat-fixer", name: "Security Chat Fixer", role: { ar: "تحليل وإصلاح ثغرات الكود", en: "Code vulnerability analysis & repair" } },
      { slug: "honeybot", name: "HoneyBot", role: { ar: "الخداع الأمني والاستدراج", en: "Security deception & decoys" } },
    ],
    caseStudy: {
      overview: {
        ar: "منصة تجمع عدة أنظمة أمنية مستقلة تحت واجهة تشغيل ومراقبة موحّدة.",
        en: "A platform that brings several independent security systems together under one unified launch-and-monitoring shell.",
      },
      problem: {
        ar: "تشغيل عدة أدوات أمنية بصورة منفصلة يجعل مراقبة حالتها والتنقل بينها وإدارة سير العمل أكثر تعقيدًا.",
        en: "Running several security tools separately makes it harder to monitor their status, switch between them, and manage the overall workflow.",
      },
      howItWorks: {
        ar: "تقوم الواجهة المركزية (Platform Shell) بتشغيل وإيقاف كل نظام فرعي والتحقق من حالته الصحية، وتعرض حالة الأنظمة ومؤشراتها في لوحة واحدة. يتولى Auto Defense System فحص الأصول والدفاع عنها، ويتولى Security Chat Fixer تحليل الكود المصدري واكتشاف الثغرات والمساعدة في إصلاحها، ويتولى HoneyBot نشر أصول ومصائد خداعية ومراقبة تفاعل المهاجمين معها. توفر الواجهة المركزية سطح تحكم واحد لهذه الأنظمة الثلاثة.",
        en: "The central Platform Shell starts and stops each subsystem and checks its health, displaying system status and metrics in one dashboard. Auto Defense System handles asset scanning and defense, Security Chat Fixer handles source-code vulnerability analysis and repair assistance, and HoneyBot handles deploying decoy assets and honeypots and monitoring attacker interaction with them. The shell provides one control surface for all three systems.",
      },
      role: {
        ar: "صممت وطورت المنصة المركزية وربطت الأنظمة الفرعية بآلية تشغيل ومراقبة موحدة، كما عملت على تطوير مكونات الأنظمة الأمنية نفسها.",
        en: "I designed and built the central platform and connected the subsystems through a unified launch-and-monitoring mechanism, and also worked on the security systems' own components.",
      },
      implemented: {
        ar: ["مشغّل مركزي للأنظمة الثلاثة", "لوحة تحكم موحّدة لعرض الحالة", "فحص الصحة التشغيلية لكل نظام", "تشغيل وإيقاف الأنظمة من واجهة واحدة"],
        en: ["A central launcher for all three systems", "A unified dashboard showing system status", "Health checks for each system", "Startup and shutdown of systems from one interface"],
      },
      status: { ar: "قيد التطوير النشط", en: "Active development" },
    },
  },
  {
    slug: "auto-defense-system",
    title: { ar: "Auto Defense System (ADS)", en: "Auto Defense System (ADS)" },
    category: "cybersecurity",
    categoryLabel: categoryLabels.cybersecurity,
    summary: {
      ar: "نظام لإدارة الأصول الأمنية وتشغيل الفحوصات وتسجيل النتائج وحساب درجات الخطورة وإصدار التوصيات وإدارة الموافقات والأوامر الدفاعية والتقارير.",
      en: "A system for managing security assets, running scans, recording findings, scoring risk, issuing recommendations, and managing approvals, defensive commands, and reports.",
    },
    contribution: {
      ar: "طورت منطق الفحص وتقييم المخاطر وسير عمل الموافقات.",
      en: "I built the scanning logic, the risk-scoring model, and the approval workflow.",
    },
    featured: false,
    technologies: ["React", "TypeScript", "Tauri", "Python", "FastAPI"],
    caseStudy: {
      overview: {
        ar: "منصة دفاع عن أصول المؤسسة تجمع بين الفحص الأمني وإدارة النتائج وتقييم المخاطر وسير عمل الموافقات.",
        en: "An asset-defense platform that combines security scanning, findings management, risk assessment, and an approval workflow.",
      },
      problem: {
        ar: "تحتاج فرق الأمن إلى رؤية موحّدة لحالة الأصول والمخاطر مع مسار موافقة واضح قبل تنفيذ أي إجراء دفاعي.",
        en: "Security teams need a unified view of asset risk with a clear approval path before any defensive action is executed.",
      },
      howItWorks: {
        ar: "يبدأ سير العمل بتسجيل الأصل وإضافته إلى مجموعة، ثم تعيين سياسة دفاعية له. بعد ذلك يشغَّل الفحص وتُسجَّل نتائجه، وتُحسب درجة الخطورة بناءً على هذه النتائج، وتُصدر توصيات مرتبطة بها. عند الحاجة إلى إجراء دفاعي، يُطلب من مسؤول الأمن الموافقة عبر مركز الموافقات قبل تنفيذ الأمر، وتُسجَّل كل خطوة في سجل تدقيق ثابت.",
        en: "The workflow starts by registering an asset and adding it to a group, then assigning it a defense policy. A scan is run and its findings recorded, a risk score is calculated from those findings, and related recommendations are issued. When a defensive action is needed, it goes through the approval center for sign-off before execution, and every step is recorded in an append-only audit trail.",
      },
      role: {
        ar: "صممت وطورت منطق الفحص وتقييم المخاطر وسير عمل الموافقات وربطها بسجل التدقيق.",
        en: "I designed and built the scanning logic, the risk-scoring model, the approval workflow, and its connection to the audit trail.",
      },
      implemented: {
        ar: [
          "تسجيل الأصول ومجموعات الأصول",
          "سياسات دفاع قابلة للتخصيص",
          "تشغيل الفحص الأمني وتسجيل النتائج",
          "حساب درجة الخطورة وإصدار التوصيات",
          "مركز موافقات قبل تنفيذ الأوامر الدفاعية",
          "سجل تدقيق غير قابل للتعديل",
        ],
        en: [
          "Asset registration and asset groups",
          "Configurable defense policies",
          "Security scanning and findings recording",
          "Risk scoring and recommendations",
          "An approval center before defensive commands run",
          "An append-only audit trail",
        ],
      },
      status: { ar: "قيد التطوير النشط", en: "Active development" },
    },
  },
  {
    slug: "security-chat-fixer",
    title: { ar: "Security Chat Fixer (SCF)", en: "Security Chat Fixer (SCF)" },
    category: "cybersecurity",
    categoryLabel: categoryLabels.cybersecurity,
    summary: {
      ar: "أداة لتحليل مشاريع البرمجة واكتشاف الثغرات وشرحها واقتراح تعديلات على الكود ثم التحقق من التعديل وإصدار تقرير.",
      en: "A tool that analyzes code projects, detects vulnerabilities, explains them, suggests code changes, verifies the fix, and produces a report.",
    },
    contribution: {
      ar: "طورت سير عمل الفحص والإصلاح وربطته بواجهة الاستخدام.",
      en: "I built the scan-and-repair workflow and connected it to the user interface.",
    },
    featured: false,
    technologies: ["React", "TypeScript", "Tauri", "Python", "FastAPI"],
    caseStudy: {
      overview: {
        ar: "منتج أمني محلي أولاً يعتمد على الذكاء الاصطناعي لاكتشاف الثغرات البرمجية وشرحها والمساعدة في إصلاحها والتحقق من الإصلاح.",
        en: "A local-first, AI-assisted tool for identifying, explaining, repairing, and verifying software vulnerabilities.",
      },
      problem: {
        ar: "اكتشاف الثغرات البرمجية لا يكفي وحده؛ يحتاج المطورون إلى شرح مفهوم للثغرة ومسار واضح للإصلاح والتحقق.",
        en: "Finding vulnerabilities is not enough on its own — developers need an understandable explanation and a clear path to repair and verification.",
      },
      howItWorks: {
        ar: "يبدأ المستخدم باختيار المشروع، فتُفحص الشيفرة المصدرية وتُكتشف الثغرات المحتملة. تُشرح كل ثغرة بلغة واضحة، ثم تُقترح تعديلات على الكود لمعالجتها. تُراجع الرقعة المقترحة قبل تطبيقها، ويُتحقق من صحة الصياغة والسلوك بعد التعديل، ثم يُنشأ تقرير يلخص الثغرات والإصلاحات.",
        en: "The user selects a project, and the source code is scanned for potential vulnerabilities. Each finding is explained in plain language, and code changes are suggested to address it. The proposed patch is reviewed before being applied, syntax and behavior are verified after the change, and a report summarizing the vulnerabilities and fixes is generated.",
      },
      role: {
        ar: "طورت سير عمل الفحص والتحليل والإصلاح والتحقق، وربطت واجهة الاستخدام بخدمات التحليل والتقارير.",
        en: "I built the scan, analysis, repair, and verification workflow, and connected the interface to the analysis and reporting services.",
      },
      implemented: {
        ar: [
          "فحص وتحليل ثغرات يركّز على بايثون",
          "شرح الثغرات بلغة واضحة",
          "اقتراح تعديلات على الكود ومراجعتها",
          "التحقق من صحة الصياغة بعد الإصلاح",
          "شروحات ثنائية اللغة (عربي وإنجليزي)",
          "تقرير يلخص النتائج والإصلاحات",
        ],
        en: [
          "Python-focused vulnerability scanning and analysis",
          "Plain-language explanations of findings",
          "Suggested code changes with review before applying",
          "Syntax validation after repair",
          "Bilingual Arabic and English explanations",
          "A report summarizing findings and fixes",
        ],
      },
      status: { ar: "قيد التطوير النشط", en: "Active development" },
    },
  },
  {
    slug: "honeybot",
    title: { ar: "HoneyBot — Athena Honeypot", en: "HoneyBot — Athena Honeypot" },
    category: "cybersecurity",
    categoryLabel: categoryLabels.cybersecurity,
    summary: {
      ar: "منصة خداع أمني لإنشاء أصول وهمية ونشر حساسات ومصائد رقمية وتسجيل تفاعل المهاجمين وتحليل الأحداث ودعم الاستجابة للحوادث.",
      en: "A deception platform that generates decoy assets, deploys sensors and honeypots, logs attacker interaction, analyzes events, and supports incident response.",
    },
    contribution: {
      ar: "طورت مستشعرات الاستدراج ومحرك ربط الأحداث والحملات.",
      en: "I built the deception sensors and the event/campaign correlation engine.",
    },
    featured: false,
    technologies: ["PySide6", "Python", "FastAPI"],
    caseStudy: {
      overview: {
        ar: "منصة خداع أمني لتوليد أصول وهمية واقعية ونشر حساسات ومراقبة نشاط المهاجمين ودعم الاستجابة للحوادث.",
        en: "A cybersecurity deception platform for generating realistic decoy assets, deploying sensors, observing attacker activity, and supporting incident response.",
      },
      problem: {
        ar: "تحتاج فرق الأمن إلى رؤية مبكرة لسلوك المهاجمين قبل وصولهم إلى الأصول الحقيقية.",
        en: "Security teams need early visibility into attacker behavior before it reaches real assets.",
      },
      howItWorks: {
        ar: "يبدأ الإعداد بتحديد ملف الشركة والبيانات المرتبطة بها، ثم تُنشأ أصول وهمية واقعية مثل ملفات ومجلدات وهمية، وتُنشر مصيدة أو مستشعر (مثل SSH tarpit أو مستشعر SMB أو مستشعر حقن SQL على الويب). تُجمَع أحداث التهديد وتُربَط ضمن جلسات وحملات، ويُحلَّل السلوك الناتج، ثم تُنشأ تنبيهات وتقارير حوادث تدعم فريق الاستجابة.",
        en: "Setup begins by defining a company profile and its related data, then realistic decoy assets such as fake files and folders are generated, and a sensor is deployed (such as an SSH tarpit, an SMB sensor, or a web SQL-injection sensor). Threat events are collected and correlated into sessions and campaigns, the resulting behavior is analyzed, and alerts and incident reports are generated to support the response team.",
      },
      role: {
        ar: "صممت وطورت مستشعرات الاستدراج ومحرك ربط الأحداث والتحليل السلوكي.",
        en: "I designed and built the deception sensors and the event-correlation and behavior-analysis engine.",
      },
      implemented: {
        ar: [
          "توليد مستندات ومجلدات ومشاركات وهمية",
          "نشر مستشعرات (SSH Tarpit، SMB، حقن SQL على الويب)",
          "استيعاب أحداث التهديد وربط الجلسات",
          "تحليل الحملات وملفات السلوك",
          "ربط بمصفوفة MITRE ATT&CK",
          "تنبيهات وتقارير حوادث",
        ],
        en: [
          "Fake documents, folders, and shares",
          "Sensor deployments (SSH tarpit, SMB, web SQL injection)",
          "Threat event ingestion and session correlation",
          "Campaign analysis and behavior profiles",
          "MITRE ATT&CK mapping",
          "Alerts and incident reports",
        ],
      },
      status: { ar: "قيد التطوير النشط", en: "Active development" },
    },
  },
  {
    slug: "domiexploit",
    title: { ar: "DomiExploit", en: "DomiExploit" },
    category: "cybersecurity",
    categoryLabel: categoryLabels.cybersecurity,
    summary: {
      ar: "طورت DomiExploit كأداة تساعد في مرحلة الاستطلاع واختيار اختبارات الاختراق المناسبة داخل الشبكات المصرح بفحصها. يُدخل المستخدم عنوان IP، فتستخدم الأداة Nmap لفحص المنافذ والخدمات المفتوحة، ثم تحلل النتائج وتقترح عشرة سيناريوهات أو وحدات مناسبة من Metasploit مع تقدير لمدى ملاءمة وفعالية كل اقتراح.",
      en: "I developed DomiExploit as an assistant for reconnaissance and penetration-test selection inside authorized networks. The user enters a target IP address, the tool uses Nmap to identify open ports and services, and then analyzes the results to suggest ten relevant Metasploit modules or testing scenarios with an estimated relevance and expected effectiveness.",
    },
    contribution: {
      ar: "صممت سير العمل وربطت فحص Nmap بتحليل النتائج ومطابقتها مع Metasploit.",
      en: "I designed the workflow and connected Nmap scanning to result analysis and Metasploit matching.",
    },
    featured: false,
    technologies: ["Python", "Nmap", "Metasploit"],
    caseStudy: {
      overview: {
        ar: "أداة مساعدة لاختبار الاختراق تربط نتائج فحص المنافذ بوحدات Metasploit المناسبة. مخصصة للاستخدام في الشبكات المصرح باختبارها فقط.",
        en: "A penetration-testing assistant that connects port-scan results to relevant Metasploit modules, intended for use in authorized networks only.",
      },
      problem: {
        ar: "بعد فحص جهاز أو خادم، يحتاج المختبر إلى مراجعة المنافذ والخدمات المكتشفة والبحث يدويًا عن وحدات Metasploit المرتبطة بها. يختصر المشروع هذه المرحلة من خلال تحليل نتيجة الفحص وتقديم اقتراحات مرتبة.",
        en: "After scanning a system, a penetration tester normally needs to review the discovered ports and services and manually search for related Metasploit modules. The project reduces this manual step by analyzing the scan results and presenting ranked suggestions.",
      },
      howItWorks: {
        ar: "يبدأ الاستخدام بإدخال عنوان IP لجهاز داخل شبكة مصرح بفحصها. تشغّل الأداة Nmap للتعرف على المنافذ المفتوحة والخدمات والإصدارات المتاحة. بعد ذلك تحلل البيانات المكتشفة وتطابقها مع سيناريوهات أو وحدات موجودة في Metasploit، ثم تعرض عشرة اقتراحات مرتبة مع تقدير لدرجة الملاءمة والفعالية المتوقعة لكل اقتراح.",
        en: "Usage begins by entering the IP address of a device inside an authorized network. The tool runs Nmap to identify open ports, services, and available version information. It then analyzes the discovered data and matches it against existing Metasploit scenarios or modules, presenting ten ranked suggestions with an estimated relevance and expected effectiveness for each.",
      },
      role: {
        ar: "صممت منطق سير العمل، وربطت فحص Nmap بمرحلة تحليل النتائج، وطورت آلية مطابقة المنافذ والخدمات مع وحدات Metasploit وترتيب الاقتراحات.",
        en: "I designed the workflow logic, connected Nmap scanning to the result-analysis stage, and developed the mechanism that matches discovered ports and services with relevant Metasploit modules and ranks the suggestions.",
      },
      implemented: {
        ar: [
          "إدخال عنوان IP وتشغيل فحص Nmap",
          "تحليل المنافذ والخدمات المكتشفة",
          "مطابقة النتائج مع وحدات Metasploit",
          "ترتيب عشرة اقتراحات حسب الملاءمة والفعالية المتوقعة",
        ],
        en: [
          "IP address entry and Nmap scan execution",
          "Analysis of discovered ports and services",
          "Matching results against Metasploit modules",
          "Ranking ten suggestions by relevance and expected effectiveness",
        ],
      },
      status: { ar: "قيد التطوير — للاستخدام في الشبكات المصرح باختبارها فقط", en: "In development — intended for use in authorized networks only" },
    },
  },
  {
    slug: "securemonitor",
    title: { ar: "SecureMonitor", en: "SecureMonitor" },
    category: "cybersecurity",
    categoryLabel: categoryLabels.cybersecurity,
    summary: {
      ar: "أداة مراقبة أمنية لسطح المكتب تراقب نشاط النظام وتساعد في رصد السلوك المشبوه على أنظمة لينكس وويندوز.",
      en: "A desktop security monitoring tool that watches system activity and helps flag suspicious behavior on Linux and Windows.",
    },
    contribution: {
      ar: "طورت منطق المراقبة والكشف.",
      en: "I built the monitoring and detection logic.",
    },
    featured: false,
    technologies: ["Python"],
  },
  {
    slug: "digital-immune-system-iot",
    title: { ar: "نظام مناعة رقمي لخوادم إنترنت الأشياء", en: "Digital Immune System for IoT Servers" },
    category: "cybersecurity",
    categoryLabel: categoryLabels.cybersecurity,
    summary: {
      ar: "نظام كشف تسلل يركّز على بروتوكول MQTT، مع مراقبة لحظية وكشف قائم على القواعد والشذوذ واستجابة آلية.",
      en: "An intrusion detection system focused on the MQTT protocol, with real-time monitoring, rule- and anomaly-based detection, and automated response.",
    },
    contribution: {
      ar: "طورت منطق مراقبة حركة MQTT والاستجابة الآلية.",
      en: "I built the MQTT traffic monitoring and automated response logic.",
    },
    featured: false,
    technologies: ["Python", "MQTT"],
  },
];

/** A project page is indexable only when it has a real case study; otherwise it is a "in preparation" stub (thin, noindex, not in the sitemap). */
export function isIndexableProject(p: Project): boolean {
  return !p.detailsPending && !!p.caseStudy;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);
