import { ROUTES, type Route } from "@/config/routes";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/lib/i18n";

/**
 * Adres çubuğundaki yoldan aktif dili ve sayfayı çözer.
 *
 * Menüdeki aktif bağlantıyı işaretlemek ve dil değiştiricinin *aynı sayfanın*
 * diğer dildeki karşılığını bulabilmesi için kullanılır — böylece dil
 * değiştiren kullanıcı ana sayfaya düşmez.
 */
export function resolveActiveRoute(pathname: string): {
  locale: Locale;
  route: Route;
  /**
   * Adres gerçekten kayıt defterindeki bir sayfaya mı denk geldi?
   *
   * Rehber (/tr/blog/...) kayıt defterinde YOK — dört dilli değil. Orada
   * `route` yine ana sayfaya düşer (dil değiştirici bir yere gitmek
   * zorunda), ama `matched` false olur. Menüde ana sayfayı "açık sayfa"
   * diye işaretlememizi engelleyen şey bu ayrım.
   */
  matched: boolean;
} {
  const segments = pathname.split("/").filter(Boolean);
  const [maybeLocale, maybeSlug] = segments;

  const locale = maybeLocale && isLocale(maybeLocale) ? maybeLocale : DEFAULT_LOCALE;

  const route = ROUTES.find(
    (candidate) => candidate.slug[locale] === (maybeSlug ?? ""),
  );

  return { locale, route: route ?? ROUTES[0], matched: Boolean(route) };
}
