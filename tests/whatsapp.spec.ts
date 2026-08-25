import { expect, test } from "@playwright/test";
import { hrefFor } from "@/config/routes";
import { SITE } from "@/config/site";
import { GALLERY } from "@/content/gallery";
import { MATERIAL_GROUPS } from "@/content/materials";
import { SERVICES } from "@/content/services";
import { LOCALES } from "@/lib/i18n";
import {
  galleryMessage,
  materialMessage,
  serviceMessage,
} from "@/lib/messages";
import { ALL_PAGES, waHrefs, waText } from "./helpers";

/**
 * Sitenin en kritik davranışı.
 *
 * WhatsApp burada bir "iletişim seçeneği" değil, birincil dönüşüm yolu.
 * Her butonun doğru numaraya gitmesi ve bulunduğu bağlama ait mesajı
 * taşıması işin özü — bu testler bozulursa site amacını kaybeder.
 *
 * Beklenen mesajlar lib/messages.ts'ten üretilir; testte elle yazılmaz.
 */

test.describe("her sayfadaki bağlantılar", () => {
  for (const { path } of ALL_PAGES) {
    test(`${path} — numara ve mesaj`, async ({ page }) => {
      await page.goto(path);

      const hrefs = await waHrefs(page);
      expect(hrefs.length, `${path} en az bir WhatsApp bağlantısı`).toBeGreaterThan(0);

      /*
       * İki yetkili var; her bağlantı ikisinden birine gitmeli. Numaralar
       * yine tek kaynaktan (config/site.ts) geliyor — testte elle yazılmaz.
       */
      const gecerli = SITE.contacts.map((contact) => `wa.me/${contact.raw}`);

      for (const href of hrefs) {
        expect(
          gecerli.some((parca) => href.includes(parca)),
          `${href} tanınmayan bir numaraya gidiyor`,
        ).toBe(true);
        // Boş mesajla açılan bir buton kalmamalı.
        expect(waText(href).length, `${href} mesajı boş`).toBeGreaterThan(0);
      }

      // Her iki yetkili de sunulmalı — biri unutulmuş olmasın.
      for (const parca of gecerli) {
        expect(
          hrefs.some((href) => href.includes(parca)),
          `${path} sayfasında ${parca} hiç geçmiyor`,
        ).toBe(true);
      }
    });
  }
});

test.describe("bağlama özel mesajlar", () => {
  for (const locale of LOCALES) {
    test(`hizmet butonları (${locale})`, async ({ page }) => {
      await page.goto(hrefFor("services", locale));
      const messages = (await waHrefs(page)).map(waText);

      for (const service of SERVICES) {
        const expected = serviceMessage(locale, service.title[locale]);
        expect(
          messages,
          `"${service.title[locale]}" hizmetinin mesajı`,
        ).toContain(expected);
      }
    });

    test(`malzeme satırları (${locale})`, async ({ page }) => {
      await page.goto(hrefFor("materials", locale));
      const messages = (await waHrefs(page)).map(waText);

      for (const group of MATERIAL_GROUPS) {
        for (const item of group.items) {
          const expected = materialMessage(locale, item.name[locale]);
          expect(
            messages,
            `"${item.name[locale]}" kaleminin fiyat sorgusu`,
          ).toContain(expected);
        }
      }
    });

    test(`galeri plakaları (${locale})`, async ({ page }) => {
      await page.goto(hrefFor("gallery", locale));
      const messages = (await waHrefs(page)).map(waText);

      for (const item of GALLERY) {
        const expected = galleryMessage(locale, item.title[locale], item.file);
        expect(messages, `"${item.title[locale]}" görselinin mesajı`).toContain(
          expected,
        );

        // Mesaj, o fotoğrafın adresini de taşımalı: işletme neyin
        // sorulduğunu tıklamadan görebilsin.
        expect(expected).toContain(`/images/${item.file}.webp`);
      }
    });
  }
});

test("tıkla-ara bağlantıları tek kaynaktan gelir", async ({ page }) => {
  await page.goto(hrefFor("contact", "tr"));

  const telHrefs = await page
    .locator('a[href^="tel:"]')
    .evaluateAll((links) =>
      links.map((link) => link.getAttribute("href") ?? ""),
    );

  expect(telHrefs.length).toBeGreaterThan(0);

  const gecerliTel = SITE.contacts.map((contact) => `tel:${contact.e164}`);
  for (const href of telHrefs) {
    expect(gecerliTel).toContain(href);
  }

  // İki yetkilinin de numarası sayfada bulunmalı.
  for (const tel of gecerliTel) {
    expect(telHrefs).toContain(tel);
  }
});

test("WhatsApp bağlantıları yeni sekmede güvenli açılır", async ({ page }) => {
  await page.goto(hrefFor("home", "tr"));

  const attributes = await page
    .locator('a[href*="wa.me"]')
    .evaluateAll((links) =>
      links.map((link) => ({
        target: link.getAttribute("target"),
        rel: link.getAttribute("rel") ?? "",
      })),
    );

  for (const attribute of attributes) {
    expect(attribute.target).toBe("_blank");
    expect(attribute.rel).toContain("noopener");
  }
});
