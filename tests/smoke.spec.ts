import { test, expect, devices } from "@playwright/test";

// ───────────────────────── Existing portfolio (now /about and /en) ─────────────────────────
test.describe("portfolio (about / en)", () => {
  test("Arabic portfolio at /about loads with RTL and hero visible", async ({ page }) => {
    await page.goto("/about");
    await expect(page.locator("html")).toHaveAttribute("lang", "ar");
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await expect(page.locator("#top h1")).toBeVisible();
    await expect(page.locator("#results")).toBeVisible();
    await expect(page.locator("#projects")).toBeVisible();
  });

  test("English portfolio declares lang=en dir=ltr on its subtree", async ({ page }) => {
    await page.goto("/en");
    await expect(page.locator('div[lang="en"][dir="ltr"]').first()).toBeVisible();
    await expect(page.locator("#top h1")).toBeVisible();
  });

  test("language switch navigates between /about and /en", async ({ page }) => {
    await page.goto("/about");
    await page.getByRole("link", { name: "English" }).first().click();
    await expect(page).toHaveURL(/\/en$/);
    await page.getByRole("link", { name: "العربية" }).first().click();
    await expect(page).toHaveURL(/\/about$/);
  });

  test("mobile menu opens, is keyboard-escapable, and closes", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/en");
    const menuButton = page.getByRole("button", { name: "Open menu" });
    await menuButton.click();
    const menu = page.locator("#mobile-menu");
    await expect(menu).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden();
  });

  test("project case study page loads and back link works", async ({ page }) => {
    await page.goto("/en/projects/omnia");
    await expect(page.locator("h1")).toContainText("OMNIA");
    await page.getByRole("link", { name: "Back to Projects" }).first().click();
    await expect(page).toHaveURL(/\/en#projects$/);
  });

  test("Arabic project page links back to /about#projects", async ({ page }) => {
    await page.goto("/projects/omnia");
    const back = page.locator('a[href="/about#projects"]').first();
    await expect(back).toBeVisible();
  });

  test("project filter buttons are keyboard accessible", async ({ page }) => {
    await page.goto("/en");
    const cybersecurityFilter = page.getByRole("button", { name: "Cybersecurity", exact: true });
    await cybersecurityFilter.click();
    await expect(cybersecurityFilter).toHaveAttribute("aria-pressed", "true");
  });

  test("320px viewport has no horizontal overflow on the English portfolio", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 700 });
    await page.goto("/en");
    const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
    expect(hasOverflow).toBe(false);
  });

  test("Teaching Approach and Technical Skills sections no longer exist", async ({ page }) => {
    await page.goto("/en");
    await expect(page.getByRole("heading", { name: "Teaching Approach", exact: false })).toHaveCount(0);
    await expect(page.getByRole("heading", { name: "Technical Skills" })).toHaveCount(0);
  });

  test("BTEC academic-level section shows all three levels", async ({ page }) => {
    await page.goto("/en");
    await expect(page.getByRole("heading", { name: "Experience Teaching the Full BTEC IT Curriculum" })).toBeVisible();
    await expect(page.locator("#btec-levels")).toContainText("Grade 10");
    await expect(page.locator("#btec-levels")).toContainText("Grade 11");
    await expect(page.locator("#btec-levels")).toContainText("Tawjihi");
  });

  test("AI experience section is present", async ({ page }) => {
    await page.goto("/en");
    await expect(page.getByRole("heading", { name: "Experience Using AI Systems and Models" })).toBeVisible();
  });

  test("Work Samples section lists teaching material files with valid links", async ({ page }) => {
    await page.goto("/en");
    const section = page.locator("#work-samples");
    await expect(section).toBeVisible();
    const firstViewLink = section.getByRole("link", { name: "View File" }).first();
    const href = await firstViewLink.getAttribute("href");
    expect(href).toMatch(/^\/documents\/teaching-materials\/.+\.pdf$/);
    const response = await page.request.get(href!);
    expect(response.status()).toBe(200);
  });

  test("Instagram follower and reach statistics reach final values with reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/en");
    const statistics = page.locator("#statistics");
    await statistics.waitFor({ state: "visible" });
    await statistics.scrollIntoViewIfNeeded();
    await expect(statistics).toContainText("10,400");
    await expect(statistics).toContainText("850,000");
  });

  test("statistics counters animate on a mobile viewport via natural scroll", async ({ browser }) => {
    test.setTimeout(45000);
    const context = await browser.newContext({ ...devices["iPhone 13"] });
    const page = await context.newPage();
    await page.goto("/en");
    const height = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < height; y += 900) {
      await page.evaluate((y) => window.scrollTo(0, y), y);
      await page.waitForTimeout(30);
    }
    const statistics = page.locator("#statistics");
    await expect(statistics).toContainText("10,400");
    await expect(statistics).toContainText("850,000");
    await expect(statistics).toContainText("3");
    await context.close();
  });

  test("hero profile photograph is rendered", async ({ page }) => {
    await page.goto("/en");
    const portrait = page.locator("#top img");
    await expect(portrait).toBeVisible();
    await expect(portrait).toHaveAttribute("alt", /Ahmad/);
  });

  test("student result gallery remains populated", async ({ page }) => {
    await page.goto("/en");
    const results = page.locator("#results img");
    await expect(results.first()).toBeVisible();
    expect(await results.count()).toBeGreaterThan(10);
  });
});

// ───────────────────────── Entity home & knowledge base ─────────────────────────
test.describe("entity home", () => {
  test("home states who Ahmad Domi is in the initial HTML (no JS needed)", async ({ request }) => {
    const html = await (await request.get("/")).text();
    expect(html).toContain('<html lang="ar" dir="rtl"');
    expect(html).toContain("مدرّس BTEC IT في الأردن");
    expect(html).toContain("Ahmad Domi");
    expect(html).toContain('rel="canonical" href="https://ahmaddomiedu.com"'); // Next serialises the bare root without a trailing slash (equivalent URL)
    expect(html).not.toMatch(/name="robots" content="[^"]*noindex/);
  });

  test("home renders, has one H1, links to units and official accounts", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.getByRole("link", { name: "تصفّح قاعدة معرفة BTEC IT" })).toBeVisible();
    await expect(page.locator('a[rel~="me"][href*="youtube.com/@AhmadDomiedu"]').first()).toBeVisible();
    await expect(page.locator('a[rel~="me"][href*="instagram.com/ahmaddomiedu"]').first()).toBeVisible();
  });

  test("no console errors on home or a concept page", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    await page.goto("/");
    await page.goto("/btec-it/cyber-security/threat-vulnerability-risk");
    await page.waitForTimeout(500);
    expect(errors).toEqual([]);
  });

  test("320px viewport has no horizontal overflow on knowledge pages", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 700 });
    for (const path of ["/", "/btec-it", "/btec-it/cyber-security/threat-vulnerability-risk", "/btec-calculator", "/btec-it/glossary", "/videos", "/btec-it-card"]) {
      await page.goto(path);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow, `${path} overflows by ${overflow}px`).toBeLessThanOrEqual(1);
    }
  });

  test("skip link targets main content", async ({ page }) => {
    await page.goto("/btec-it");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "تخطَّ إلى المحتوى الرئيسي" });
    await expect(skip).toBeFocused();
    await expect(page.locator("#main-content")).toHaveCount(1);
  });
});

test.describe("concept page", () => {
  const path = "/btec-it/cyber-security/threat-vulnerability-risk";

  test("has short answer, breadcrumb, terminology, author and valid JSON-LD", async ({ page, request }) => {
    await page.goto(path);
    await expect(page.locator("h1")).toContainText("الفرق بين التهديد والثغرة والمخاطرة");
    await expect(page.getByRole("heading", { name: "الجواب المختصر" })).toBeVisible();
    await expect(page.getByRole("navigation", { name: "مسار التنقل" })).toContainText("الأمن السيبراني");
    await expect(page.getByRole("heading", { name: "المصطلحات: عربي ↔ English" })).toBeVisible();
    await expect(page.locator('a[rel="author"][href="/about"]')).toBeVisible();

    const html = await (await request.get(path)).text();
    const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
    expect(blocks).toHaveLength(1);
    const graph = blocks[0]["@graph"] as { "@type": string; "@id"?: string }[];
    const types = graph.map((n) => n["@type"]);
    expect(types).toEqual(expect.arrayContaining(["TechArticle", "BreadcrumbList", "VideoObject", "Person"]));
    const crumbs = graph.find((n) => n["@type"] === "BreadcrumbList") as unknown as { itemListElement: { name: string }[] };
    expect(crumbs.itemListElement.map((i) => i.name)).toEqual(["الرئيسية", "BTEC IT", "الأمن السيبراني", "الفرق بين التهديد والثغرة والمخاطرة"]);
    expect(html).toContain('rel="canonical" href="https://ahmaddomiedu.com/btec-it/cyber-security/threat-vulnerability-risk"');
  });

  test("the lesson video is embedded via youtube-nocookie and chapters are listed", async ({ page }) => {
    await page.goto(path);
    await expect(page.locator('iframe[src^="https://www.youtube-nocookie.com/embed/qVjvVT-YxEk"]')).toHaveCount(1);
    expect(await page.locator('ol:has(a[href*="&t="]) li').count()).toBeGreaterThan(5);
  });

  test("unknown unit/concept slugs return 404", async ({ request }) => {
    expect((await request.get("/btec-it/cyber-security/no-such-concept")).status()).toBe(404);
    expect((await request.get("/btec-it/no-such-unit")).status()).toBe(404);
  });
});

test.describe("phase 2A pages", () => {
  const newPages = [
    "/btec-it/it-project-management/project-methodologies",
    "/btec-it/it-project-management/project-planning",
    "/btec-it/it-project-management/project-execution-monitoring-closure",
    "/btec-it/assessment",
    "/btec-it/assessment/report-writing-principles",
  ];

  test("new pages render, are in the sitemap and have one canonical", async ({ request }) => {
    const xml = await (await request.get("/sitemap.xml")).text();
    for (const p of newPages) {
      const res = await request.get(p);
      expect(res.status()).toBe(200);
      expect(await res.text()).toContain(`rel="canonical" href="https://ahmaddomiedu.com${p}"`);
      expect(xml).toContain(`<loc>https://ahmaddomiedu.com${p}</loc>`);
    }
  });

  test("cyber-security unit shows the official Unit 11 structure (codes only), clearly labelled", async ({ page }) => {
    await page.goto("/btec-it/cyber-security");
    const official = page.locator("#official");
    await expect(official).toContainText("البنية الرسمية");
    await expect(official).toContainText("A.P1");
    await expect(official).toContainText("CD.D2");
    await expect(official).toContainText("الوحدة 11");
    await expect(page.locator("#axes")).toContainText("أحمد دومي");
  });

  test("a concept with an official aim separates official structure from Ahmad's explanation", async ({ page }) => {
    await page.goto("/btec-it/cyber-security/hacker-types");
    await expect(page.getByRole("heading", { name: "الربط الرسمي مقابل شرح أحمد دومي" })).toBeVisible();
  });

  test("the report-writing page is a general summary and links to no private file", async ({ request }) => {
    const html = await (await request.get("/btec-it/assessment/report-writing-principles")).text();
    expect(html).toContain("ملخص مبادئ عام");
    expect(html).not.toMatch(/\.docx|sources\/|\/private/);
  });
});

test.describe("search (Arabic ↔ English)", () => {
  test("Arabic 'مخاطرة' finds the Threat/Vulnerability/Risk page; English 'threat' finds the Arabic term", async ({ page }) => {
    await page.goto("/search");
    const box = page.getByRole("searchbox", { name: "ابحث في قاعدة المعرفة" });
    await box.fill("مخاطرة");
    await expect(page.getByRole("link", { name: /الفرق بين التهديد والثغرة والمخاطرة/ }).first()).toBeVisible();
    await box.fill("threat");
    await expect(page.getByRole("link", { name: /التهديد/ }).first()).toBeVisible();
    await box.fill("PMD");
    await expect(page.getByText("لا توجد نتائج", { exact: false })).toBeVisible(); // no P/M/D page published yet — honest empty state
  });

  test("search page is noindex", async ({ request }) => {
    const html = await (await request.get("/search")).text();
    expect(html).toMatch(/name="robots" content="[^"]*noindex/);
  });
});

test.describe("calculator", () => {
  test("computes a specialty average from U/P/M/D grades using the ported rules", async ({ page }) => {
    await page.goto("/btec-calculator");
    await page.getByLabel("التخصص").selectOption({ label: "تكنولوجيا المعلومات" });
    // Tawjihi IT: cyber 120h, programming 90h, project management 90h, AI 60h — grade everything D (=100)
    const groups = page.locator('fieldset:has(legend:has-text("نتيجة"))');
    const n = await groups.count();
    expect(n).toBe(4);
    for (let i = 0; i < n; i++) await groups.nth(i).getByText("D", { exact: true }).click();
    await expect(page.getByText("35.00").first()).toBeVisible(); // 100/100 × 35
  });

  test("calculator page documents the rules and their (unconfirmed) source", async ({ page }) => {
    await page.goto("/btec-calculator");
    await expect(page.getByText("مصدر القواعد وحدودها")).toBeVisible();
    await expect(page.getByText("ليست", { exact: false }).first()).toBeVisible();
  });
});

test.describe("technical SEO endpoints", () => {
  test("sitemap lists only canonical https URLs on the production host and excludes /search", async ({ request }) => {
    const xml = await (await request.get("/sitemap.xml")).text();
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    expect(locs.length).toBeGreaterThan(40);
    for (const l of locs) expect(l.startsWith("https://ahmaddomiedu.com")).toBe(true);
    expect(locs).toContain("https://ahmaddomiedu.com/");
    expect(locs).toContain("https://ahmaddomiedu.com/btec-it-card");
    expect(locs.some((l) => l.includes("/search"))).toBe(false);
    expect(new Set(locs).size).toBe(locs.length);
  });

  test("robots.txt allows crawling and points at the sitemap", async ({ request }) => {
    const txt = await (await request.get("/robots.txt")).text();
    expect(txt).toContain("Allow: /");
    expect(txt).not.toMatch(/Disallow:\s*\/\s*$/m);
    expect(txt).toContain("Sitemap: https://ahmaddomiedu.com/sitemap.xml");
  });

  test("llms.txt is plain text and lists the published concepts", async ({ request }) => {
    const res = await request.get("/llms.txt");
    expect(res.headers()["content-type"]).toContain("text/plain");
    const txt = await res.text();
    expect(txt).toContain("Ahmad Domi");
    expect(txt).toContain("/btec-it/cyber-security/threat-vulnerability-risk");
  });

  test("404 page is useful and returns HTTP 404", async ({ page }) => {
    const res = await page.goto("/definitely-not-a-page");
    expect(res?.status()).toBe(404);
    await expect(page.getByRole("heading", { name: "لم نجد هذه الصفحة" })).toBeVisible();
    await expect(page.getByRole("link", { name: "تصفّح وحدات BTEC IT" })).toBeVisible();
  });

  test("/ar redirects permanently to /", async ({ request }) => {
    const res = await request.get("/ar", { maxRedirects: 0 });
    expect(res.status()).toBe(308);
    expect(res.headers()["location"]).toMatch(/\/$/);
  });

  test("www host redirects to the apex canonical host", async ({ request }) => {
    const res = await request.get("/btec-it", { maxRedirects: 0, headers: { host: "www.ahmaddomiedu.com" } });
    expect(res.status()).toBe(308);
    expect(res.headers()["location"]).toBe("https://ahmaddomiedu.com/btec-it");
  });

  test("legacy ahmaddomiporfolio.vercel.app host redirects permanently to the canonical domain, other hosts do not", async ({ request }) => {
    const res = await request.get("/btec-it/glossary", { maxRedirects: 0, headers: { host: "ahmaddomiporfolio.vercel.app" } });
    expect(res.status()).toBe(308);
    expect(res.headers()["location"]).toBe("https://ahmaddomiedu.com/btec-it/glossary");
    expect((await request.get("/btec-it/glossary", { maxRedirects: 0 })).status()).toBe(200);
  });

  test("security headers are set", async ({ request }) => {
    const h = (await request.get("/")).headers();
    expect(h["x-content-type-options"]).toBe("nosniff");
    expect(h["referrer-policy"]).toBe("strict-origin-when-cross-origin");
    expect(h["x-powered-by"]).toBeUndefined();
  });
});

test.describe("paid-content boundary", () => {
  test("the card page does not publish card content or claim assignment answers, and hides prices by default", async ({ request }) => {
    const html = await (await request.get("/btec-it-card")).text();
    expect(html).toContain("لا يُنشر على هذا الموقع");
    expect(html).not.toMatch(/Offer"|"@type":"Product"/);
    expect(html).not.toContain("85 د.أ");
  });
});

test.describe("phase 2B coverage and leak boundary", () => {
  const pages = [
    "/btec-it/cyber-security/firewalls",
    "/btec-it/cyber-security/tcp-ip-model-and-ports",
    "/btec-it/data-modelling/pivot-tables",
    "/btec-it/programming/compiler-vs-interpreter",
    "/btec-it/artificial-intelligence/train-validation-test-sets",
    "/btec-it/introduction-to-applications/ux-vs-ui",
    "/btec-it/website-development/seo-basics",
    "/btec-it/it-project-management/gantt-chart-and-critical-path",
    "/btec-it/assessment/command-verbs-explain-analyse-evaluate",
  ];

  test("sample pages from every unit render, are in the sitemap, and expose no source IDs", async ({ request }) => {
    const xml = await (await request.get("/sitemap.xml")).text();
    for (const p of pages) {
      const res = await request.get(p);
      expect(res.status(), p).toBe(200);
      const html = await res.text();
      expect(html).toContain(`rel="canonical" href="https://ahmaddomiedu.com${p}"`);
      expect(xml).toContain(`<loc>https://ahmaddomiedu.com${p}</loc>`);
      expect(html).not.toMatch(/src-\d{3}|sourceIds|registryRef/);
    }
  });

  test("search index and llms.txt do not leak source IDs or local paths", async ({ request }) => {
    for (const u of ["/search-index.json", "/llms.txt"]) {
      const t = await (await request.get(u)).text();
      expect(t, u).not.toMatch(/src-\d{3}|sourceIds|registryRef|C:\Users|Downloads|شغل/);
    }
  });
});

test.describe("phase 2C merged pages", () => {
  const moves: [string, string][] = [
    ["/btec-it/programming/git-version-control", "/btec-it/programming/ide-and-maintainability"],
    ["/btec-it/artificial-intelligence/cloud-platforms-for-ai", "/btec-it/artificial-intelligence/ai-tools-and-frameworks"],
    ["/btec-it/data-modelling/online-data-sources-privacy", "/btec-it/data-modelling/data-sources"],
  ];
  for (const [from, to] of moves) {
    test(`${from} permanently redirects to its parent`, async ({ request }) => {
      const res = await request.get(from, { maxRedirects: 0 });
      expect(res.status()).toBe(308);
      expect(res.headers()["location"]).toBe(to);
      expect((await request.get(to)).status()).toBe(200);
    });
  }
});

test.describe("phase 4 SEO", () => {
  test("each indexable page has a unique title, one H1 and a canonical (sampled across types)", async ({ page }) => {
    const paths = [
      "/",
      "/btec-it",
      "/btec-it/cyber-security",
      "/btec-it/cyber-security/threat-vulnerability-risk",
      "/btec-it/assessment/pass-merit-distinction",
      "/btec-calculator",
      "/btec-it-card",
    ];
    const titles = new Set<string>();
    for (const p of paths) {
      await page.goto(p);
      const title = await page.title();
      expect(title.length).toBeGreaterThan(20);
      expect(titles.has(title)).toBe(false);
      titles.add(title);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
    }
  });

  test("the Threat/Vulnerability/Risk title is intent-first and carries BTEC context", async ({ page }) => {
    await page.goto("/btec-it/cyber-security/threat-vulnerability-risk");
    const title = await page.title();
    expect(title.startsWith("الفرق بين التهديد والثغرة والمخاطرة")).toBe(true);
    expect(title).toContain("BTEC IT");
    expect(title.endsWith("أحمد دومي")).toBe(true);
  });

  test("project stubs without a case study are noindex and out of the sitemap", async ({ page, request }) => {
    await page.goto("/projects/securemonitor");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    const xml = await (await request.get("/sitemap.xml")).text();
    expect(xml).not.toContain("/projects/securemonitor");
    expect(xml).toContain("/projects/omnia");
  });

  test("unit hubs surface questions, glossary terms and assessment help", async ({ page }) => {
    await page.goto("/btec-it/cyber-security");
    await expect(page.locator("#questions")).toBeVisible();
    await expect(page.locator("#terms")).toBeVisible();
    await expect(page.locator("#writing a[href='/btec-it/assessment']")).toBeVisible();
  });
});
