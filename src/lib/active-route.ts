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
} {
  const segments = pathname.split("/").filter(Boolean);
  const [maybeLocale, maybeSlug] = segments;

  const locale = maybeLocale && isLocale(maybeLocale) ? maybeLocale : DEFAULT_LOCALE;

  const route =
    ROUTES.find((candidate) => candidate.slug[locale] === (maybeSlug ?? "")) ??
    ROUTES[0];

  return { locale, route };
}
