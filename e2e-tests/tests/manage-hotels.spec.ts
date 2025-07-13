import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:3000";

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);

  // get the sign in button
  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  await page.locator("[name=email]").fill("1@1.com");
  await page.locator("[name=password]").fill("123456");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("Sign in successful!")).toBeVisible();
});

test("Should allow users to add a hotels", async ({ page }) => {
  await page.goto(`${UI_URL}/add-hotel`);

  await page.locator("[name='name']").fill("Test Hotel");
  await page.locator("[name='city']").fill("Test Hotel");
  await page.locator("[name='country']").fill("Test Hotel");
  await page
    .locator("[name='description']")
    .fill("This is description for test users");
  await page.locator("[name='pricePerNight']").fill("100");
  await page.selectOption('select[name="starRating"]', "3");
  await page.getByText("Budget").click();
  await page.getByLabel("Free Wi-Fi").check();
  await page.getByLabel("Parking").check();

  await page.locator(`[name="adultCount]`).fill("2");
  await page.locator(`[name="childCount]`).fill("4");
});
