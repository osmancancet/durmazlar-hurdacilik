"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ArrowRightIcon, CloseIcon, WhatsAppIcon } from "@/components/ui/Icons";
import {
  GALLERY_CATEGORIES,
  type GalleryCategory,
  type GalleryItem,
} from "@/content/gallery";
import { UI } from "@/content/ui";
import type { Locale } from "@/lib/i18n";
import { galleryMessage } from "@/lib/messages";
import { EXTERNAL_LINK_PROPS, waHref } from "@/lib/whatsapp";

/**
 * Plaka ızgarası + lightbox.
 *
 * Eşit kartlardan oluşan katalog ızgarası değil: her üçüncü plaka geniş
 * yerleşir, böylece sayfa ölçek kazanır ve fotoğraflar tek tip görünmez.
 * Her plakanın altında mono künye (indeks · başlık · kategori) ve o
 * fotoğrafın adını taşıyan kendi WhatsApp bağlantısı vardır.
 *
 * Izgara yalnızca küçük resimleri (thumbs/, ~60 KB) yükler; 1600px sürüm
 * sadece lightbox açılınca istenir.
 */
export function GalleryGrid({
  items,
  locale,
  showFilters = true,
  /** Künyedeki indeks numarasının başlangıcı. */
  startIndex = 1,
}: {
  items: GalleryItem[];
  locale: Locale;
  showFilters?: boolean;
  startIndex?: number;
}) {
  const [category, setCategory] = useState<GalleryCategory | "tumu">("tumu");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const visible =
    category === "tumu"
      ? items
      : items.filter((item) => item.category === category);

  const close = useCallback(() => setOpenIndex(null), []);

  const step = useCallback(
    (direction: 1 | -1) =>
      setOpenIndex((current) =>
        current === null
          ? null
          : (current + direction + visible.length) % visible.length,
      ),
    [visible.length],
  );

  useEffect(() => {
    if (openIndex === null) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex, close, step]);

  const active = openIndex === null ? null : visible[openIndex];

  const categoryLabel = (id: GalleryCategory) =>
    GALLERY_CATEGORIES.find((option) => option.id === id)?.label[locale] ?? "";

  return (
    <>
      {showFilters && (
        <div className="mb-12 flex flex-wrap items-center gap-x-6 gap-y-3 border-y border-zinc py-4">
          {GALLERY_CATEGORIES.map((option) => {
            const selected = option.id === category;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => {
                  setCategory(option.id);
                  setOpenIndex(null);
                }}
                aria-pressed={selected}
                className={`font-mono text-xs font-medium tracking-[0.1em] uppercase transition-colors ${
                  selected
                    ? "text-oxide underline underline-offset-[6px]"
                    : "text-steel hover:text-ink"
                }`}
              >
                {option.label[locale]}
              </button>
            );
          })}
        </div>
      )}

      <ul className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-6">
        {visible.map((item, index) => {
          /*
           * Ritim satır düzeyinde kurulur, satır içinde değil: iki büyük
           * plakalı satırlar ile üç küçük plakalı satırlar dönüşümlü gelir
           * (5'lik döngü). Bir satırdaki plakaların genişliği ve en-boy
           * oranı aynı olduğu için satırlar hizalı kalır — sayfa hem
           * çeşitleniyor hem tırtıklanmıyor.
           */
          const wide = index % 5 < 2;
          return (
            <li
              key={item.file}
              className={wide ? "lg:col-span-3" : "lg:col-span-2"}
            >
              <figure>
                <button
                  type="button"
                  onClick={() => setOpenIndex(index)}
                  className={`plate group relative block w-full overflow-hidden ${
                    wide ? "aspect-3/2" : "aspect-3/2 lg:aspect-4/3"
                  }`}
                  aria-label={`${item.title[locale]} — ${
                    locale === "tr" ? "büyüt" : "enlarge"
                  }`}
                >
                  <Image
                    src={`/images/thumbs/${item.file}.webp`}
                    alt={item.title[locale]}
                    fill
                    sizes={
                      wide
                        ? "(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
                        : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    }
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </button>

                <figcaption className="mt-3 border-t border-zinc pt-3">
                  <p className="flex items-baseline gap-2.5">
                    <span className="tabular shrink-0 font-mono text-xs font-medium text-oxide">
                      {String(startIndex + index).padStart(2, "0")}
                    </span>
                    <span className="font-semibold text-ink">
                      {item.title[locale]}
                    </span>
                  </p>

                  <p className="mt-1.5 text-sm leading-relaxed text-steel">
                    {item.description[locale]}
                  </p>

                  <div className="mt-3 flex items-center justify-between gap-4">
                    <span className="label">{categoryLabel(item.category)}</span>

                    <a
                      href={waHref(
                        galleryMessage(locale, item.title[locale], item.file),
                      )}
                      {...EXTERNAL_LINK_PROPS}
                      aria-label={`${item.title[locale]} — ${UI.askAbout[locale]}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-whatsapp underline-offset-4 hover:underline"
                    >
                      <WhatsAppIcon className="size-[0.9rem]" />
                      {UI.askAbout[locale]}
                    </a>
                  </div>
                </figcaption>
              </figure>
            </li>
          );
        })}
      </ul>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.title[locale]}
          className="fixed inset-0 z-60 flex flex-col bg-paper"
          onClick={close}
        >
          <div className="flex items-center justify-between gap-4 border-b border-zinc px-5 py-3 md:px-8">
            <span className="tabular font-mono text-xs font-medium text-steel">
              {String(startIndex + openIndex!).padStart(2, "0")} /{" "}
              {String(startIndex + visible.length - 1).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={close}
              aria-label={UI.close[locale]}
              className="grid size-9 place-items-center border border-zinc text-ink transition-colors hover:border-ink"
            >
              <CloseIcon className="size-5" />
            </button>
          </div>

          <div
            className="relative flex min-h-0 flex-1 items-center justify-center px-4 py-6"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label={UI.previous[locale]}
              className="absolute left-2 z-10 grid size-11 place-items-center border border-zinc bg-paper text-ink transition-colors hover:border-ink md:left-6"
            >
              <ArrowRightIcon className="size-5 rotate-180" />
            </button>

            <Image
              src={`/images/${active.file}.webp`}
              alt={active.title[locale]}
              width={active.width}
              height={active.height}
              sizes="100vw"
              priority
              className="max-h-full w-auto max-w-full border border-zinc object-contain"
            />

            <button
              type="button"
              onClick={() => step(1)}
              aria-label={UI.next[locale]}
              className="absolute right-2 z-10 grid size-11 place-items-center border border-zinc bg-paper text-ink transition-colors hover:border-ink md:right-6"
            >
              <ArrowRightIcon className="size-5" />
            </button>
          </div>

          <div
            className="flex flex-col gap-4 border-t border-zinc px-5 py-5 md:flex-row md:items-end md:justify-between md:px-8"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="measure">
              <span className="label">{categoryLabel(active.category)}</span>
              <h2 className="display mt-2 text-xl">{active.title[locale]}</h2>
              <p className="mt-1.5 leading-relaxed text-steel">
                {active.description[locale]}
              </p>
            </div>

            <a
              href={waHref(
                galleryMessage(locale, active.title[locale], active.file),
              )}
              {...EXTERNAL_LINK_PROPS}
              className="inline-flex shrink-0 items-center justify-center gap-2.5 bg-whatsapp px-6 py-3 text-sm font-semibold text-paper transition-colors hover:bg-whatsapp-bright hover:text-ink"
            >
              <WhatsAppIcon className="size-4" />
              {UI.askAbout[locale]}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
