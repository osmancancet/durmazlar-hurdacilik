import type { ReactNode } from "react";

/**
 * Bölüm kabuğu.
 *
 * Kart yok, dolgu yok, gölge yok. Bölümler birbirinden yalnızca saç teli
 * çinko çizgiyle ve boşlukla ayrılır — teknik dosya mantığı.
 */
export function Section({
  children,
  className = "",
  id,
  tone = "paper",
  /** Üstte ayraç çizgisi. Ardışık bölümlerde ritmi kurar. */
  ruled = true,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "paper" | "raised" | "deep";
  ruled?: boolean;
}) {
  const tones = {
    paper: "bg-paper",
    raised: "bg-paper-raised",
    deep: "bg-paper-deep",
  } as const;

  return (
    <section
      id={id}
      className={`${tones[tone]} ${
        ruled ? "border-t border-zinc" : ""
      } px-5 py-16 md:px-8 lg:py-24 ${className}`}
    >
      <div className="mx-auto max-w-[84rem]">{children}</div>
    </section>
  );
}

/**
 * Bölüm başlığı — indeks sütunu solda, içerik sağda.
 *
 * `index` yalnızca gerçekten bir sıra veya indeks bildirdiğinde verilir;
 * süs amaçlı numaralandırma yapılmaz.
 */
export function SectionHeading({
  label,
  title,
  lead,
  index,
  action,
}: {
  label?: string;
  title: string;
  lead?: string;
  index?: string;
  /** Başlığın sağına hizalanan bağlantı veya buton. */
  action?: ReactNode;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-[10rem_1fr] lg:gap-10">
      <div className="flex items-baseline gap-3 lg:flex-col lg:gap-2">
        {index && (
          <span className="tabular font-mono text-sm font-medium text-brand">
            {index}
          </span>
        )}
        {label && <span className="label">{label}</span>}
      </div>

      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-5">
        <div className="measure">
          <h2 className="display text-[2rem] sm:text-[2.5rem] lg:text-[3rem]">
            {title}
          </h2>

          {lead && (
            <p className="mt-4 text-lg leading-relaxed text-pretty text-steel">
              {lead}
            </p>
          )}
        </div>

        {action}
      </div>
    </div>
  );
}

/** Saç teli ayraç. Bol boşlukla kullanılır; sıkışık sütun yapılmaz. */
export function Rule({ className = "" }: { className?: string }) {
  return <hr className={`border-0 border-t border-zinc ${className}`} />;
}
