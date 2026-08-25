"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Wordmark } from "@/components/brand/Wordmark";
import { CloseIcon, GlobeIcon, MenuIcon, PhoneIcon } from "@/components/ui/Icons";
import { ContactMenu } from "@/components/whatsapp/ContactMenu";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { ROUTES, hrefFor } from "@/config/routes";
import { SITE } from "@/config/site";
import { UI } from "@/content/ui";
import { resolveActiveRoute } from "@/lib/active-route";
import {
  LOCALES,
  LOCALE_LABEL,
  LOCALE_NAME,
  type Locale,
} from "@/lib/i18n";
import { generalMessage } from "@/lib/messages";
import { CONTACTS, telHref } from "@/lib/whatsapp";

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
    <>
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
          {/*
            Burada açılır menü KULLANILMAZ: künye şeridi kaydırmada
            kapanabilsin diye `overflow-hidden` taşıyor ve açılan listeyi
            kırpıyordu. Zaten bir veri şeridi — iki numara doğrudan yazılır.
            Dar ekranda gizlenir; mobilde alt aksiyon çubuğu bu işi görüyor.
          */}
          <span className="hidden items-center gap-3 sm:flex">
            <PhoneIcon className="size-3.5 text-brand" />
            {CONTACTS.map((contact, position) => (
              <span key={contact.id} className="flex items-center gap-3">
                {position > 0 && (
                  <span aria-hidden className="text-zinc">
                    |
                  </span>
                )}
                <a
                  href={telHref(contact)}
                  className="tabular inline-flex min-h-6 items-center font-mono text-xs font-medium tracking-wide text-ink transition-colors hover:text-brand"
                >
                  <span className="sr-only">{contact.name} — </span>
                  {contact.display}
                </a>
              </span>
            ))}
          </span>
        </div>
      </div>

      <div className="border-b border-zinc">
        <div className="mx-auto flex max-w-[84rem] items-center gap-6 px-5 py-3.5 md:px-8">
          <Link href={hrefFor("home", locale)} className="shrink-0 py-1">
            <Wordmark priority />
          </Link>

          <nav className="ms-auto hidden items-center gap-7 lg:flex">
            {navLinks.map((route) => {
              const active = route.key === activeRoute.key;
              return (
                <Link
                  key={route.key}
                  href={hrefFor(route.key, locale)}
                  aria-current={active ? "page" : undefined}
                  className={`relative py-1 text-sm font-semibold whitespace-nowrap transition-colors ${
                    active
                      ? "text-ink after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:bg-brand"
                      : "text-steel hover:text-ink"
                  }`}
                >
                  {route.label[locale]}
                </Link>
              );
            })}
          </nav>

          <div className="ms-auto flex items-center gap-3 lg:ms-0">
            <LanguageSwitcher locale={locale} />

            <span className="hidden sm:block">
              <WhatsAppButton
                message={generalMessage(locale)}
                locale={locale}
                size="sm"
                align="end"
              >
                {UI.whatsappWrite[locale]}
              </WhatsAppButton>
            </span>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label={UI.menu[locale]}
              aria-expanded={menuOpen}
              aria-controls="mobil-menu"
              className="tap grid size-9 place-items-center border border-zinc text-ink transition-colors hover:border-ink lg:hidden"
            >
              <MenuIcon className="size-5" />
            </button>
          </div>
        </div>
      </div>

      </header>

      {/*
        Mobil tam ekran menü.

        DİKKAT — bu blok <header>'ın DIŞINDA durur.

        Başlıkta `backdrop-blur-sm` var ve `backdrop-filter`, içindeki
        `position: fixed` öğeler için kapsayıcı blok oluşturur. Menü başlığın
        içindeyken `inset-0` viewport'a değil başlık kutusuna göre çözülüyordu:
        panel 390×81 piksele sıkışıyor, arka planı sayfanın tamamını
        örtemiyor ve satırlar taşıp üst üste biniyordu.

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
            className="tap grid size-9 place-items-center border border-zinc text-ink"
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
                <span className="tabular font-mono text-xs text-brand">
                  {String(position + 1).padStart(2, "0")}
                </span>
                <span
                  className={`display text-2xl ${
                    active ? "text-brand" : "text-ink"
                  }`}
                >
                  {route.label[locale]}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="space-y-4 px-5 pt-8">
          <WhatsAppButton
            message={generalMessage(locale)}
            locale={locale}
            size="lg"
            fullWidth
          >
            {UI.whatsappWrite[locale]}
          </WhatsAppButton>

          <ContactMenu mode="tel" locale={locale} className="w-full">
            <span className="flex w-full cursor-pointer items-center justify-center gap-2.5 border border-zinc px-6 py-3.5 text-sm font-semibold text-ink">
              <PhoneIcon className="size-4 text-brand" />
              {UI.callUs[locale]}
            </span>
          </ContactMenu>
        </div>
      </div>
    </>
  );
}

/**
 * Dil değiştirici — dört dil.
 *
 * Bulunulan sayfanın karşılığına gider (örn. /tr/galeri/ → /ru/galereya/),
 * ana sayfaya düşmez.
 *
 * Dört kısaltmayı yan yana dizmek dar ekranda başlığı taşırıyordu; bunun
 * yerine açılır liste kullanılıyor. İletişim listesiyle aynı gerekçeyle
 * <details>: bağlantılar her zaman belgede duruyor, JavaScript çalışmasa da
 * dil değiştirilebiliyor ve arama motoru dört sürümü de görüyor.
 */
function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const { route } = resolveActiveRoute(pathname);
  const ref = useRef<HTMLDetailsElement | null>(null);

  useEffect(() => {
    const details = ref.current;
    if (!details) return;
    const onPointerDown = (event: PointerEvent) => {
      if (details.open && !details.contains(event.target as Node)) {
        details.open = false;
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") details.open = false;
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <details ref={ref} className="relative">
      <summary
        aria-label={UI.language[locale]}
        className="flex min-h-8 cursor-pointer list-none items-center gap-1 px-1.5 font-mono text-xs font-medium text-ink transition-colors hover:text-brand [&::-webkit-details-marker]:hidden"
      >
        {LOCALE_LABEL[locale]}
        <GlobeIcon className="size-3.5" />
      </summary>

      <div className="absolute end-0 top-full z-50 mt-2 min-w-[9rem] border border-zinc bg-paper-raised shadow-[0_8px_28px_rgba(15,18,53,0.16)]">
        {LOCALES.map((candidate) => {
          const active = candidate === locale;
          return (
            <Link
              key={candidate}
              href={hrefFor(route.key, candidate)}
              hrefLang={candidate}
              lang={candidate}
              aria-current={active ? "true" : undefined}
              onClick={() => {
                if (ref.current) ref.current.open = false;
              }}
              className={`flex items-center justify-between gap-3 border-b border-zinc px-4 py-2.5 text-sm transition-colors last:border-b-0 hover:bg-paper-deep ${
                active ? "font-semibold text-ink" : "text-steel"
              }`}
            >
              <span>{LOCALE_NAME[candidate]}</span>
              <span className="font-mono text-xs text-steel-light">
                {LOCALE_LABEL[candidate]}
              </span>
            </Link>
          );
        })}
      </div>
    </details>
  );
}
