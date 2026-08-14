import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { SITE } from "@/config/site";
import { HOME, UI } from "@/content/ui";
import type { Locale } from "@/lib/i18n";
import { sendPhotosMessage } from "@/lib/messages";
import { telHref } from "@/lib/whatsapp";

/**
 * Her sayfanın sonundaki çağrı.
 *
 * Fotoğraf üzerine kurulu gösterişli bir band değil: mürekkep zeminde sakin
 * bir kapanış plakası. Sayfanın tek koyu alanı burası olduğu için doğal
 * olarak durak noktası oluşturuyor — ekstra süse gerek kalmıyor.
 */
export function CtaBand({ locale }: { locale: Locale }) {
  return (
    <section className="bg-ink px-5 py-20 md:px-8 lg:py-28">
      <div className="mx-auto grid max-w-[84rem] gap-10 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-20">
        <div className="measure">
          <h2 className="display text-[2rem] text-paper sm:text-[2.75rem]">
            {HOME.ctaBand.title[locale]}
          </h2>
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
            className="tabular border border-steel px-6 py-3.5 font-mono text-sm font-medium text-paper transition-colors hover:border-paper"
          >
            {SITE.phone.display}
          </a>
        </div>
      </div>
    </section>
  );
}
