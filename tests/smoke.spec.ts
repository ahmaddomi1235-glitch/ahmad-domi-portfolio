import { test, expect } from "@playwright/test";

test.describe("homepage", () => {
  test("Arabic homepage loads with RTL and hero visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("lang", "ar");
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await expect(page.locator("#top h1")).toBeVisible();
    await expect(page.locator("#results")).toBeVisible();
    await expect(page.locator("#projects")).toBeVisible();
  });

  test("English homepage loads with LTR", async ({ page }) => {
    await page.goto("/en");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
    await expect(page.locator("#top h1")).toBeVisible();
  });

  test("language switch navigates between ar and en", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "English" }).first().click();
    await expect(page).toHaveURL(/\/en$/);
    await page.getByRole("link", { name: "العربية" }).first().click();
    await expect(page).toHaveURL(/\/$/);
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

  test("project filter buttons are keyboard accessible", async ({ page }) => {
    await page.goto("/en");
    const cybersecurityFilter = page.getByRole("button", { name: "Cybersecurity", exact: true });
    await cybersecurityFilter.click();
    await expect(cybersecurityFilter).toHaveAttribute("aria-pressed", "true");
  });

  test("no console errors on homepage", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    await page.goto("/");
    await page.waitForTimeout(500);
    expect(errors).toEqual([]);
  });

  test("320px viewport has no horizontal overflow", async ({ page }) => {
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

  test("Instagram follower statistic reaches 11,000 with reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/en");
    const statistics = page.locator("#statistics");
    await statistics.waitFor({ state: "visible" });
    await statistics.scrollIntoViewIfNeeded();
    await expect(statistics).toContainText("11,000");
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
