import Image from "next/image";
import type { ReactNode } from "react";

/**
 * Fotoğraf plakası — teknik rapordaki resim plakası gibi.
 *
 * Çerçevesi tek saç teli çizgi, altında mono künye. Kart değildir: dolgu,
 * gölge ve yuvarlak köşe yoktur. Sahanın tozlu telefon fotoğrafları bu
 * çerçevede belge gibi durur, reklam görseli gibi değil.
 */
export function Plate({
  src,
  alt,
  /** Künyenin solundaki indeks — galeride sıra numarası, hizmette künye kodu. */
  index,
  caption,
  meta,
  ratio = "4/3",
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  action,
  className = "",
}: {
  src: string;
  alt: string;
  index?: string;
  caption?: string;
  meta?: string;
  ratio?: "4/3" | "3/4" | "16/9" | "3/2";
  priority?: boolean;
  sizes?: string;
  /** Künyenin sağına düşen aksiyon (ör. WhatsApp bağlantısı). */
  action?: ReactNode;
  className?: string;
}) {
  const ratios = {
    "4/3": "aspect-4/3",
    "3/4": "aspect-3/4",
    "16/9": "aspect-16/9",
    "3/2": "aspect-3/2",
  } as const;

  return (
    <figure className={className}>
      <div className={`plate relative overflow-hidden ${ratios[ratio]}`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>

      {(caption || index || action) && (
        <figcaption className="mt-3 flex items-start justify-between gap-4 border-t border-zinc pt-3">
          <div className="min-w-0">
            <p className="flex items-baseline gap-2.5">
              {index && (
                <span className="tabular shrink-0 font-mono text-xs font-medium text-oxide">
                  {index}
                </span>
              )}
              {caption && (
                <span className="text-sm font-semibold text-ink">{caption}</span>
              )}
            </p>
            {meta && (
              <p className="mt-1 text-sm leading-relaxed text-steel">{meta}</p>
            )}
          </div>

          {action && <div className="shrink-0">{action}</div>}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * Tam genişlik fotoğraf plakası — ızgarayı kıran bölüm geçişi.
 * Sayfada seyrek kullanılır; her kullanımı bir "bölüm değişti" işaretidir.
 */
export function FullBleedPlate({
  src,
  alt,
  caption,
  priority = false,
}: {
  src: string;
  alt: string;
  caption?: string;
  priority?: boolean;
}) {
  return (
    <figure className="border-y border-zinc">
      <div className="relative aspect-3/2 w-full sm:aspect-16/9 lg:aspect-[2.4/1]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="100vw"
          priority={priority}
          className="object-cover"
        />
      </div>

      {caption && (
        <figcaption className="mx-auto max-w-[84rem] px-5 py-3 md:px-8">
          <span className="label">{caption}</span>
        </figcaption>
      )}
    </figure>
  );
}
