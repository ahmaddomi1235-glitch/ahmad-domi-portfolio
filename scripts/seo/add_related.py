# -*- coding: utf-8 -*-
"""Adds curated, semantically justified `related` links (two-way in the UI via linkedFrom). Idempotent."""
import glob, io, json, os
ROOT = os.path.join(os.path.dirname(__file__), "..", "..")
LINKS = {
 # cyber security
 "threat-vulnerability-risk": ["risk-management-matrix-and-strategies", "system-vulnerability-types", "threat-analysis-method", "what-is-cyber-security"],
 "what-is-cyber-security": ["why-data-is-the-target", "defence-in-depth"],
 "internal-vs-external-threats": ["insider-threats", "external-threats"],
 "phishing": ["social-engineering", "two-factor-authentication"],
 "malware-types": ["antivirus-software", "what-attackers-can-do"],
 "authentication-methods": ["two-factor-authentication", "strong-passwords"],
 "firewalls": ["network-vulnerabilities", "tcp-ip-model-and-ports"],
 "encryption-basics": ["vpn-and-https", "data-states"],
 "network-types": ["network-topologies", "network-components"],
 "ip-addressing-ipv4-ipv6-nat": ["subnetting-and-routing", "dns-and-dhcp"],
 "software-updates-patching": ["software-vulnerabilities"],
 "cyber-legal-responsibilities": ["data-protection-gdpr", "computer-misuse"],
 # AI
 "ai-vs-machine-learning-vs-deep-learning": ["types-of-ai", "supervised-vs-unsupervised-learning", "neural-networks-uses-and-limits"],
 "supervised-vs-unsupervised-learning": ["classification-vs-regression", "k-means-clustering"],
 "k-means-clustering": ["pca-dimensionality-reduction", "knn-anomaly-detection"],
 "bayesian-methods": ["logistic-regression", "predictive-analytics"],
 "pca-dimensionality-reduction": ["preparing-data-for-ai-models"],
 "iot-devices-as-ai-data-sources": ["emerging-technology-risks", "ai-privacy", "smart-assistant-data-pipeline"],
 "ide-vs-jupyter-notebook": ["programming-languages-for-ai", "ide-and-maintainability"],
 "programming-languages-for-ai": ["choosing-a-programming-language"],
 "train-validation-test-sets": ["decision-trees", "preparing-data-for-ai-models"],
 "ai-bias": ["sample-size-and-bias"],
 "protecting-ai-data": ["backup-and-storage", "defence-in-depth"],
 # data modelling
 "data-vs-information": ["data-quality", "what-is-data-modelling"],
 "data-quality": ["data-accuracy-and-age", "data-reliability-checks", "data-cleaning-steps"],
 "pivot-tables": ["sorting-and-filtering", "dashboard-from-data"],
 "spreadsheet-macros": ["workbook-structure-and-import", "goal-seek-what-if"],
 "workbook-structure-and-import": ["data-formats-csv-json-xml"],
 "data-validation-spreadsheets": ["app-input-validation"],
 "chart-types": ["misleading-charts", "dashboard-design-rules"],
 # project management
 "project-resource-management": ["project-planning", "project-manager-responsibilities"],
 "effective-project-meetings": ["professional-conduct-in-project-teams", "project-stakeholders"],
 "feasibility-study-and-alternatives": ["project-initiation-document", "risk-management-matrix-and-strategies"],
 "project-execution-monitoring-closure": ["project-monitoring-indicators", "project-closure-and-lessons-learned"],
 "project-lifecycle": ["project-methodologies", "project-planning"],
 # programming
 "procedural-programming": ["programming-paradigms", "object-oriented-programming", "event-driven-programming"],
 "compiler-vs-interpreter": ["programming-language-types", "runtime-vs-development-requirements"],
 "programming-language-comparison-criteria": ["choosing-a-programming-language", "programming-language-types"],
 "embedded-device-programming": ["programming-language-types", "runtime-vs-development-requirements"],
 # applications
 "choosing-app-platform": ["mobile-operating-systems", "mobile-vs-desktop-apps"],
 "mobile-navigation-elements": ["app-usability", "interface-design-principles"],
 "ux-vs-ui": ["interface-design-principles", "app-usability"],
 # web
 "seo-basics": ["website-performance-factors", "website-basic-requirements"],
 "creativity-in-web-design": ["website-design-principles", "website-types-by-purpose"],
 # assessment
 "report-formatting-and-emphasis": ["report-writing-principles", "report-consistency-and-repetition"],
 "report-introduction-and-conclusion": ["report-writing-principles", "linking-paragraphs"],
 "pass-merit-distinction": ["report-writing-principles", "explain-level-p-writing", "analyse-level-m-writing", "evaluate-level-d-writing"],
 "explain-level-p-writing": ["analyse-level-m-writing"],
 "analyse-level-m-writing": ["evaluate-level-d-writing"],
}
files = {}
for f in glob.glob(os.path.join(ROOT, "content", "concepts", "*", "*.json")):
    d = json.load(io.open(f, encoding="utf-8")); files[d["id"]] = (f, d)
added = 0
for a, targets in LINKS.items():
    f, d = files[a]
    changed = False
    for t in targets:
        assert t in files, (a, t)
        if t != a and t not in d["related"] and a not in files[t][1]["related"]:
            d["related"].append(t); added += 1; changed = True
    if changed:
        io.open(f, "w", encoding="utf-8", newline="").write(json.dumps(d, ensure_ascii=False, indent=2) + ("\n" if io.open(f, encoding="utf-8", newline="").read().endswith("\n") else ""))
print("related links added:", added)
