import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { SITE } from "@/config/site";
import { HOME, UI } from "@/content/ui";
import type { Locale } from "@/lib/i18n";
import { sendPhotosMessage } from "@/lib/messages";
import { telHref } from "@/lib/whatsapp";

/**
 * Her sayfanın sonundaki çağrı.
 *
 * Sayfanın tek koyu alanı burası; kartvizitin ön yüzünün lacivert→mavi
 * degradesi buraya ayrıldı. Seyrek kullanıldığı için durak noktası olarak
 * çalışıyor, ekstra süse gerek kalmıyor.
 *
 * `on-brand` sınıfı, koyu zeminde odak halkasını beyaza çeviriyor — marka
 * mavisi bu degradenin üzerinde 1.62:1, görünmez olurdu.
 */
export function CtaBand({ locale }: { locale: Locale }) {
  return (
    <section className="brand-gradient on-brand px-5 py-20 md:px-8 lg:py-28">
      <div className="mx-auto grid max-w-[84rem] gap-10 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-20">
        <div className="measure">
          <h2 className="display text-[2rem] text-paper sm:text-[2.75rem]">
            {HOME.ctaBand.title[locale]}
          </h2>
          {/* Çelik grisi lacivert üzerinde 9.18:1 — koyu zeminin ikincil sesi. */}
          <p className="mt-5 text-lg leading-relaxed text-pretty text-zinc">
            {HOME.ctaBand.text[locale]}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <WhatsAppButton message={sendPhotosMessage(locale)} size="lg">
            {UI.sendPhotos[locale]}
          </WhatsAppButton>

          <a
            href={telHref()}
            className="tabular border border-zinc/60 px-6 py-3.5 font-mono text-sm font-medium text-paper transition-colors hover:border-paper"
          >
            {SITE.phone.display}
          </a>
        </div>
      </div>
    </section>
  );
}
