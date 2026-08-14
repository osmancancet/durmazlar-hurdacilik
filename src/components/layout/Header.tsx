"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Wordmark } from "@/components/brand/Wordmark";
import { CloseIcon, MenuIcon } from "@/components/ui/Icons";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { ROUTES, hrefFor } from "@/config/routes";
import { SITE } from "@/config/site";
import { UI } from "@/content/ui";
import { resolveActiveRoute } from "@/lib/active-route";
import { LOCALES, type Locale } from "@/lib/i18n";
import { generalMessage } from "@/lib/messages";
import { telHref } from "@/lib/whatsapp";

/**
 * Başlık.
 *
 * Sadeleştirildi: tek aksiyon (WhatsApp) + dil. Telefon numarası, kalabalık
 * yapmamak için üst künye şeridine taşındı — orada mono yazıyla, veri olarak
 * duruyor. Kaydırıldığında künye şeridi kapanır, başlık ince bir çizgiye iner.
 */
export function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const { route: activeRoute } = resolveActiveRoute(pathname);

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const navLinks = ROUTES.filter((route) => route.inNav);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-paper/95 backdrop-blur-sm">
      {/* Künye şeridi — konum ve telefon, veri olarak. */}
      <div
        className={`overflow-hidden border-b border-zinc transition-all duration-300 ${
          scrolled ? "max-h-0 opacity-0" : "max-h-12 opacity-100"
        }`}
      >
        <div className="mx-auto flex max-w-[84rem] items-center justify-between px-5 py-2.5 md:px-8">
          <span className="label">
            {SITE.address.district} / {SITE.address.city}
          </span>
          <a
            href={telHref()}
            className="tabular font-mono text-xs font-medium tracking-wide text-ink transition-colors hover:text-oxide"
          >
            {SITE.phone.display}
          </a>
        </div>
      </div>

      <div className="border-b border-zinc">
        <div className="mx-auto flex max-w-[84rem] items-center gap-6 px-5 py-3.5 md:px-8">
          <Link href={hrefFor("home", locale)} className="shrink-0">
            <Wordmark />
          </Link>

          <nav className="ml-auto hidden items-center gap-7 lg:flex">
            {navLinks.map((route) => {
              const active = route.key === activeRoute.key;
              return (
                <Link
                  key={route.key}
                  href={hrefFor(route.key, locale)}
                  aria-current={active ? "page" : undefined}
                  className={`relative py-1 text-sm font-semibold whitespace-nowrap transition-colors ${
                    active
                      ? "text-ink after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:bg-oxide"
                      : "text-steel hover:text-ink"
                  }`}
                >
                  {route.label[locale]}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-3 lg:ml-0">
            <LanguageSwitcher locale={locale} />

            <span className="hidden sm:block">
              <WhatsAppButton message={generalMessage(locale)} size="sm">
                {UI.whatsappWrite[locale]}
              </WhatsAppButton>
            </span>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label={UI.menu[locale]}
              aria-expanded={menuOpen}
              aria-controls="mobil-menu"
              className="grid size-9 place-items-center border border-zinc text-ink transition-colors hover:border-ink lg:hidden"
            >
              <MenuIcon className="size-5" />
            </button>
          </div>
        </div>
      </div>

      {/*
        Mobil tam ekran menü.

        Kapalıyken `visibility: hidden` uygulanır — yalnızca opacity ile
        gizlemek yetmez: görünmeyen bağlantılar sekme sırasında kalır ve
        ekran okuyucu onları okur. `visibility` bunların üçünü birden keser.
        `inert` de destekleyen tarayıcılarda aynı garantiyi pekiştirir.
      */}
      <div
        id="mobil-menu"
        inert={!menuOpen}
        aria-label={UI.menu[locale]}
        className={`fixed inset-0 z-50 bg-paper transition-[opacity,visibility] duration-200 lg:hidden ${
          menuOpen
            ? "visible opacity-100"
            : "invisible pointer-events-none opacity-0"
        }`}
      >
        <div className="flex items-center justify-between border-b border-zinc px-5 py-3.5">
          <Wordmark />
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label={UI.close[locale]}
            className="grid size-9 place-items-center border border-zinc text-ink"
          >
            <CloseIcon className="size-5" />
          </button>
        </div>

        <nav className="flex flex-col px-5">
          {navLinks.map((route, position) => {
            const active = route.key === activeRoute.key;
            return (
              <Link
                key={route.key}
                href={hrefFor(route.key, locale)}
                onClick={() => setMenuOpen(false)}
                aria-current={active ? "page" : undefined}
                className="flex items-baseline gap-4 border-b border-zinc py-5"
              >
                <span className="tabular font-mono text-xs text-oxide">
                  {String(position + 1).padStart(2, "0")}
                </span>
                <span
                  className={`display text-2xl ${
                    active ? "text-oxide" : "text-ink"
                  }`}
                >
                  {route.label[locale]}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="space-y-4 px-5 pt-8">
          <WhatsAppButton message={generalMessage(locale)} size="lg" fullWidth>
            {UI.whatsappWrite[locale]}
          </WhatsAppButton>

          <a
            href={telHref()}
            className="tabular flex w-full items-center justify-center border border-zinc px-6 py-3.5 font-mono text-sm font-medium text-ink"
          >
            {SITE.phone.display}
          </a>
        </div>
      </div>
    </header>
  );
}

/**
 * TR ↔ EN geçişi.
 * Bulunulan sayfanın karşılığına gider (örn. /tr/galeri/ → /en/gallery/),
 * ana sayfaya düşmez.
 */
function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const { route } = resolveActiveRoute(pathname);

  return (
    <div className="flex items-center gap-1.5 font-mono text-xs font-medium">
      {LOCALES.map((candidate, position) => {
        const active = candidate === locale;
        return (
          <span key={candidate} className="flex items-center gap-1.5">
            {position > 0 && <span className="text-zinc">/</span>}
            <Link
              href={hrefFor(route.key, candidate)}
              hrefLang={candidate}
              aria-current={active ? "true" : undefined}
              className={`uppercase transition-colors ${
                active ? "text-ink" : "text-steel-light hover:text-ink"
              }`}
            >
              {candidate}
            </Link>
          </span>
        );
      })}
    </div>
  );
}
