import { FAQ } from "@/content/faq";
import type { Locale } from "@/lib/i18n";

/**
 * SSS listesi.
 *
 * Yerli <details>/<summary> kullanılır: JavaScript gerekmez, klavye ve ekran
 * okuyucu desteği tarayıcıdan gelir ve içerik ilk boyamada HTML'de bulunur —
 * arama motorları için de değerli.
 *
 * Açılma göstergesi olarak ok yerine +/− işareti: belge dilinde daha sessiz
 * ve hangi satırın açık olduğu tek bakışta okunuyor.
 */
export function FaqAccordion({ locale }: { locale: Locale }) {
  return (
    <div className="border-t border-zinc">
      {FAQ.map((item, index) => (
        <details key={item.question.tr} className="group border-b border-zinc">
          <summary className="flex cursor-pointer list-none items-baseline gap-4 py-5 text-left [&::-webkit-details-marker]:hidden">
            <span className="tabular shrink-0 font-mono text-xs font-medium text-oxide">
              {String(index + 1).padStart(2, "0")}
            </span>

            <span className="flex-1 font-semibold text-ink transition-colors group-hover:text-oxide">
              {item.question[locale]}
            </span>

            <span
              aria-hidden
              className="shrink-0 font-mono text-lg leading-none text-steel"
            >
              <span className="group-open:hidden">+</span>
              <span className="hidden group-open:inline">−</span>
            </span>
          </summary>

          <p className="measure pb-6 pl-[2.5rem] leading-relaxed text-pretty text-steel">
            {item.answer[locale]}
          </p>
        </details>
      ))}
    </div>
  );
}
