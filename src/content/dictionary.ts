export type Dictionary = {
  meta: {
    title: string;
    description: string;
  };
  skipToContent: string;
  nav: {
    home: string;
    experience: string;
    studentResults: string;
    workSamples: string;
    educationalContent: string;
    projects: string;
    certifications: string;
    contact: string;
    downloadCv: string;
    menuOpen: string;
    menuClose: string;
    langSwitch: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    ctaTeaching: string;
    ctaProjects: string;
    ctaCv: string;
    portraitAlt: string;
  };
  professionalSummary: {
    kicker: string;
    heading: string;
    facts: { label: string; value: string }[];
  };
  teachingExperience: {
    kicker: string;
    heading: string;
    intro: string;
    paragraph2: string;
  };
  btecLevels: {
    kicker: string;
    heading: string;
    description: string;
    paragraph2: string;
    closingNote: string;
    levels: { title: string; description: string }[];
  };
  statistics: {
    kicker: string;
    heading: string;
    followersLabel: string;
    followersQualifier: string;
    followersNote: string;
    outcomesValue: string;
    outcomesLabel: string;
    outcomesNote: string;
    levelsLabel: string;
    levelsNote: string;
  };
  studentResults: {
    kicker: string;
    heading: string;
    description: string;
    groupResults: string;
    groupMessages: string;
    lightbox: { close: string; next: string; prev: string; counterTemplate: string };
  };
  workSamples: {
    kicker: string;
    heading: string;
    description: string;
    paragraph2: string;
    viewFile: string;
    download: string;
  };
  educationalContent: {
    kicker: string;
    heading: string;
    description: string;
    paragraph2: string;
    audienceNote: string;
    youtube: { title: string; desc: string };
    instagram: { title: string; desc: string };
    externalLinkNote: string;
  };
  aiExperience: {
    kicker: string;
    heading: string;
    description: string;
    paragraph2: string;
    capabilities: string[];
  };
  projectsSection: {
    kicker: string;
    heading: string;
    description: string;
    filters: { all: string; education: string; aiBusiness: string; cybersecurity: string };
    liveSite: string;
    projectDetails: string;
    backToProjects: string;
    privateProject: string;
    detailsOnRequest: string;
    detailsPending: string;
    myContributionLabel: string;
    technologiesLabel: string;
    overviewLabel: string;
    problemLabel: string;
    howItWorksLabel: string;
    roleLabel: string;
    implementedLabel: string;
    statusLabel: string;
  };
  certifications: {
    kicker: string;
    heading: string;
  };
  education: {
    kicker: string;
    heading: string;
    educationLabel: string;
    graduatedLabel: string;
    achievementLabel: string;
  };
  professionalProfile: {
    kicker: string;
    heading: string;
    paragraphs: string[];
    facts: {
      locationLabel: string;
      roleLabel: string;
      educationLabel: string;
      areasLabel: string;
      languagesLabel: string;
      areasValue: string;
    };
  };
  contact: {
    kicker: string;
    heading: string;
    description: string;
    emailLabel: string;
    phoneLabel: string;
    locationLabel: string;
    socialLabel: string;
  };
  footer: {
    rightsTemplate: string;
  };
  common: {
    backToTop: string;
    externalLink: string;
    reducedMotionNote: string;
  };
};
