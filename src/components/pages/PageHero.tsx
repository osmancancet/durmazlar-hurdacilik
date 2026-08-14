import type { ReactNode } from "react";

/**
 * Alt sayfaların ortak üst bölümü.
 *
 * Fotoğrafın üstüne yazı yazmak yerine kâğıt üzerinde bir başlık bloğu:
 * solda mono künye, sağda başlık ve giriş. Fotoğraf, sayfanın kendi
 * akışında plaka olarak gelir.
 */
export function PageHero({
  label,
  title,
  lead,
  aside,
}: {
  label: string;
  title: string;
  lead: string;
  /** Sağa hizalanan ek bilgi (ör. indeks, künye). */
  aside?: ReactNode;
}) {
  return (
    <section className="border-b border-zinc px-5 pt-32 pb-14 md:px-8 lg:pt-40 lg:pb-20">
      <div className="mx-auto max-w-[84rem]">
        <div className="grid gap-10 lg:grid-cols-[10rem_1fr_auto] lg:gap-12">
          <p className="label lg:pt-4">{label}</p>

          <div className="measure">
            <h1 className="display text-[2.5rem] sm:text-[3.25rem] lg:text-[4rem]">
              {title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-pretty text-steel">
              {lead}
            </p>
          </div>

          {aside && <div className="lg:pt-3">{aside}</div>}
        </div>
      </div>
    </section>
  );
}
