import type { Page } from "@playwright/test";
import { ROUTES, hrefFor, type RouteKey } from "@/config/routes";
import { LOCALES, type Locale } from "@/lib/i18n";

/**
 * Testlerin ortak yardımcıları.
 *
 * Beklenen değerler elle yazılmaz; hepsi src/ içindeki gerçek kaynaklardan
 * türetilir. İçerik değişince testler kendiliğinden onu doğrular, bayat
 * kopyaları değil.
 */

/** 12 sayfa: 6 rota × 2 dil. */
export const ALL_PAGES: { locale: Locale; key: RouteKey; path: string }[] =
  LOCALES.flatMap((locale) =>
    ROUTES.map((route) => ({
      locale,
      key: route.key,
      path: hrefFor(route.key, locale),
    })),
  );

/** Bir wa.me bağlantısındaki ön doldurulmuş mesajı çözer. */
export function waText(href: string): string {
  const url = new URL(href);
  return url.searchParams.get("text") ?? "";
}

/** Sayfadaki tüm WhatsApp bağlantılarının href'leri. */
export async function waHrefs(page: Page): Promise<string[]> {
  return page
    .locator('a[href*="wa.me"]')
    .evaluateAll((links) =>
      links.map((link) => (link as HTMLAnchorElement).href),
    );
}

/**
 * Sayfa hatalarını toplar: konsol hataları, yakalanmamış istisnalar ve
 * 400+ dönen istekler. Dinleyiciler goto'dan ÖNCE bağlanmalı.
 */
export function watchForProblems(page: Page) {
  const problems: string[] = [];

  page.on("console", (message) => {
    if (message.type() === "error") problems.push(`konsol: ${message.text()}`);
  });

  page.on("pageerror", (error) => {
    problems.push(`istisna: ${error.message}`);
  });

  page.on("response", (response) => {
    if (response.status() >= 400) {
      problems.push(`${response.status()}: ${new URL(response.url()).pathname}`);
    }
  });

  return problems;
}

/**
 * WhatsApp alan adlarını ağdan keser.
 *
 * Butona gerçekten tıklayan testler, dış bir servise bağımlı olmasın diye
 * kullanılır: adres yine üretilir ve okunur, ama istek dışarı çıkmaz.
 */
export async function stubWhatsApp(page: Page) {
  await page.context().route(/wa\.me|whatsapp\.com/, (route) =>
    route.fulfill({
      status: 200,
      contentType: "text/html",
      body: "<html><body>stub</body></html>",
    }),
  );
}
