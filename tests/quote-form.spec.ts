import { expect, test } from "@playwright/test";
import { hrefFor } from "@/config/routes";
import { SITE } from "@/config/site";
import { CONTACT } from "@/content/ui";
import { quoteMessage, quoteSubject } from "@/lib/messages";
import { mailtoParts, stubWhatsApp, waText } from "./helpers";

/**
 * Formda kiminle görüşüleceği de seçilir (işletmede iki yetkili var).
 * Numara testte elle yazılmaz; config/site.ts'ten gelir.
 */
const SECILEN = SITE.contacts[0];

async function kisiSec(page: import("@playwright/test").Page) {
  await page.getByRole("button", { name: SECILEN.name }).click();
}

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
  await kisiSec(page);

  const popupPromise = context.waitForEvent("page");
  await page.getByRole("button", { name: CONTACT.submit.tr }).click();
  const popup = await popupPromise;

  // Mesaj seçilen yetkilinin numarasına gitmeli.
  expect(popup.url()).toContain(`wa.me/${SECILEN.raw}`);

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
  await kisiSec(page);

  const popupPromise = context.waitForEvent("page");
  await page.getByRole("button", { name: CONTACT.submit.tr }).click();
  const popup = await popupPromise;

  const message = waText(popup.url());
  expect(message).toContain("Ayşe Demir");
  // Boş bırakılan alan başlıkları mesajda görünmemeli.
  expect(message).not.toContain(CONTACT.fields.location.tr);
  expect(message).not.toContain(CONTACT.fields.note.tr);
});

/*
 * Hata geri bildirimi.
 *
 * Alan altına yazılan uyarı tek başına yetmiyor: uzun formda ekran okuyucu
 * kullanan kişi neyin eksik olduğunu göremiyor, mobilde uyarı ekranın
 * dışında kalabiliyor. Formun başındaki özet her hatayı kendi alanına
 * bağlar ve gönderim başarısız olunca odağı üzerine alır.
 */
test("eksik gönderimde hata özeti belirir ve odağı alır", async ({ page }) => {
  await page.goto(CONTACT_PATH);

  await page.getByRole("button", { name: CONTACT.submit.tr }).click();

  // Next.js kendi yönlendirme duyurucusunu da role="alert" ile ekler;
  // özet, formun içindekiyle seçilir.
  const summary = page.locator('form [role="alert"]');
  await expect(summary).toBeVisible();
  await expect(summary).toContainText(CONTACT.errors.summary.tr);
  await expect(summary).toBeFocused();

  // Her hata, kendi alanına giden bir bağlantı taşır.
  await expect(
    summary.getByRole("link", { name: CONTACT.errors.name.tr }),
  ).toHaveAttribute("href", "#quote-name");
  await expect(
    summary.getByRole("link", { name: CONTACT.errors.phone.tr }),
  ).toHaveAttribute("href", "#quote-phone");
});

test("alandan çıkınca doğrulanır, düzeltilince uyarı kalkar", async ({
  page,
}) => {
  await page.goto(CONTACT_PATH);

  // Geçersiz numara yazıp alandan çıkmak, gönderimi beklemeden uyarır.
  await page.fill("#quote-phone", "123");
  await page.locator("#quote-phone").blur();

  const error = page.locator("#quote-phone-error");
  await expect(error).toHaveText(CONTACT.errors.phone.tr);
  await expect(page.locator("#quote-phone")).toHaveAttribute(
    "aria-invalid",
    "true",
  );

  // Düzeltmeye başlayınca uyarı hemen kalkar.
  await page.fill("#quote-phone", "05321112233");
  await expect(error).toHaveCount(0);
});

test("hata düzeltildikten sonra form gönderilir", async ({ page, context }) => {
  await stubWhatsApp(page);
  await page.goto(CONTACT_PATH);

  await page.getByRole("button", { name: CONTACT.submit.tr }).click();
  await expect(page.locator('form [role="alert"]')).toBeVisible();

  await page.fill("#quote-name", "Ayşe Demir");
  await page.fill("#quote-phone", "05321112233");
  await kisiSec(page);
  await expect(page.locator('form [role="alert"]')).toHaveCount(0);

  const popupPromise = context.waitForEvent("page");
  await page.getByRole("button", { name: CONTACT.submit.tr }).click();
  const popup = await popupPromise;

  expect(waText(popup.url())).toContain("Ayşe Demir");
});

/*
 * E-posta yolu.
 *
 * Site statik olduğu için form sunucuya POST etmez; alanlar `mailto:`
 * adresine dönüşür ve kullanıcının kendi e-posta uygulamasında taslak
 * olarak açılır. Bağlantı gerçekten DOM'da durduğu için burada tıklamayı
 * taklit etmeye gerek yok: üretilen adres doğrudan okunup doğrulanır.
 *
 * Doğrulanan üç şey: adres doğru kutuya gidiyor, gövde WhatsApp'takiyle
 * birebir aynı metin, ve yetkili seçimi bu yolda İSTENMİYOR (tek bir
 * gelen kutusuna düştüğü için orada bir anlamı yok).
 */

const epostaBaglantisi = (page: import("@playwright/test").Page) =>
  page.getByRole("link", { name: CONTACT.submitEmail.tr });

test("e-posta bağlantısı doğru alıcı, konu ve gövdeyi taşır", async ({
  page,
}) => {
  await page.goto(CONTACT_PATH);

  const values = {
    name: "Ahmet Yılmaz",
    phone: "0532 111 22 33",
    location: "Akhisar / Manisa",
    materials: ["Hurda demir"],
    quantity: "15 ton",
    dismantling: "evet" as const,
    note: "Fabrika içinde, forklift mevcut.",
  };

  await page.fill("#quote-name", values.name);
  await page.fill("#quote-phone", values.phone);
  await page.fill("#quote-location", values.location);
  await page.fill("#quote-quantity", values.quantity);
  await page
    .getByRole("button", { name: values.materials[0], exact: true })
    .click();
  await page
    .getByRole("button", { name: CONTACT.fields.yes.tr, exact: true })
    .click();
  await page.fill("#quote-note", values.note);

  const href = await epostaBaglantisi(page).getAttribute("href");
  const { to, subject, body } = mailtoParts(href!);

  expect(to).toBe(SITE.email);
  expect(subject).toBe(quoteSubject("tr", values));
  // Gövde, WhatsApp mesajıyla aynı kaynaktan gelir — iki kanal ayrışmasın.
  expect(body).toBe(quoteMessage("tr", values));
});

test("e-posta yolu yetkili seçimi istemez", async ({ page }) => {
  await page.goto(CONTACT_PATH);

  await page.fill("#quote-name", "Ayşe Demir");
  await page.fill("#quote-phone", "05321112233");

  // Yetkili SEÇİLMEDEN tıklanıyor: gidiş engellenmemeli.
  await epostaBaglantisi(page).click();

  await expect(page.locator('form [role="alert"]')).toHaveCount(0);
  await expect(page.getByText(CONTACT.errors.contact.tr)).toHaveCount(0);
});

test("eksik form e-posta yolunda da durdurulur", async ({ page }) => {
  await page.goto(CONTACT_PATH);

  await epostaBaglantisi(page).click();

  const summary = page.locator('form [role="alert"]');
  await expect(summary).toBeVisible();
  await expect(page.locator("#quote-name-error")).toHaveText(
    CONTACT.errors.name.tr,
  );
  // Sayfa hâlâ formun üzerinde: mailto tetiklenmemiş olmalı.
  await expect(page).toHaveURL(new RegExp(`${CONTACT_PATH}$`));
});
