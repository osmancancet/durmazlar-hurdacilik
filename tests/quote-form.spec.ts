import { expect, test } from "@playwright/test";
import { hrefFor } from "@/config/routes";
import { CONTACT } from "@/content/ui";
import { quoteMessage } from "@/lib/messages";
import { stubWhatsApp, waText } from "./helpers";

/**
 * Teklif formu.
 *
 * Form e-posta göndermez; alanları biçimli bir WhatsApp mesajına çevirip
 * sohbeti açar. Doğrulanması gereken iki şey var: geçersiz giriş geçmemeli
 * ve geçerli giriş, messages.ts'in ürettiği metnin birebir aynısını
 * üretmeli.
 */

const CONTACT_PATH = hrefFor("contact", "tr");

test("boş form gönderilemez ve iki alanı işaretler", async ({ page }) => {
  await page.goto(CONTACT_PATH);

  await page.getByRole("button", { name: CONTACT.submit.tr }).click();

  await expect(page.locator("#quote-name-error")).toHaveText(
    CONTACT.errors.name.tr,
  );
  await expect(page.locator("#quote-phone-error")).toHaveText(
    CONTACT.errors.phone.tr,
  );

  // Alanlar erişilebilirlik açısından da geçersiz işaretlenmeli.
  await expect(page.locator("#quote-name")).toHaveAttribute(
    "aria-invalid",
    "true",
  );
});

test("geçersiz telefon reddedilir", async ({ page }) => {
  await page.goto(CONTACT_PATH);

  await page.fill("#quote-name", "Ahmet Yılmaz");
  await page.fill("#quote-phone", "123");
  await page.getByRole("button", { name: CONTACT.submit.tr }).click();

  await expect(page.locator("#quote-phone-error")).toBeVisible();
  await expect(page.locator("#quote-name-error")).toHaveCount(0);
});

test("dolu form doğru WhatsApp mesajını üretir", async ({ page, context }) => {
  await stubWhatsApp(page);
  await page.goto(CONTACT_PATH);

  const values = {
    name: "Ahmet Yılmaz",
    phone: "0532 111 22 33",
    location: "Akhisar / Manisa",
    materials: ["Hurda demir", "Çelik konstrüksiyon"],
    quantity: "15 ton",
    dismantling: "evet" as const,
    note: "Fabrika içinde, forklift mevcut.",
  };

  await page.fill("#quote-name", values.name);
  await page.fill("#quote-phone", values.phone);
  await page.fill("#quote-location", values.location);
  await page.fill("#quote-quantity", values.quantity);

  for (const material of values.materials) {
    await page.getByRole("button", { name: material, exact: true }).click();
  }

  await page
    .getByRole("button", { name: CONTACT.fields.yes.tr, exact: true })
    .click();
  await page.fill("#quote-note", values.note);

  const popupPromise = context.waitForEvent("page");
  await page.getByRole("button", { name: CONTACT.submit.tr }).click();
  const popup = await popupPromise;

  const message = waText(popup.url());
  expect(message).toBe(quoteMessage("tr", values));

  // Çok satırlı yapı korunmalı: her alan kendi satırında.
  expect(message.split("\n").length).toBeGreaterThanOrEqual(8);
  expect(message).toContain(values.name);
  expect(message).toContain(values.phone);
  expect(message).toContain("Hurda demir, Çelik konstrüksiyon");
});

test("seçilmeyen alanlar mesaja hiç girmez", async ({ page, context }) => {
  await stubWhatsApp(page);
  await page.goto(CONTACT_PATH);

  // Yalnızca zorunlu alanlar dolduruluyor.
  await page.fill("#quote-name", "Ayşe Demir");
  await page.fill("#quote-phone", "05321112233");

  const popupPromise = context.waitForEvent("page");
  await page.getByRole("button", { name: CONTACT.submit.tr }).click();
  const popup = await popupPromise;

  const message = waText(popup.url());
  expect(message).toContain("Ayşe Demir");
  // Boş bırakılan alan başlıkları mesajda görünmemeli.
  expect(message).not.toContain(CONTACT.fields.location.tr);
  expect(message).not.toContain(CONTACT.fields.note.tr);
});
