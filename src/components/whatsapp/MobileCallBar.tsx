import { PhoneIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { UI } from "@/content/ui";
import { generalMessage } from "@/lib/messages";
import { EXTERNAL_LINK_PROPS, telHref, waHref } from "@/lib/whatsapp";
import type { Locale } from "@/lib/i18n";

/**
 * Mobilde ekranın altına sabitlenen aksiyon çubuğu.
 *
 * Hurda sektöründe trafiğin ezici çoğunluğu telefondan gelir; kullanıcının
 * sayfanın neresinde olursa olsun tek dokunuşla yazabilmesi veya arayabilmesi
 * en yüksek dönüşümlü öğedir. Yalnızca md altında görünür.
 */
export function MobileCallBar({ locale }: { locale: Locale }) {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-zinc bg-paper-raised md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <a
        href={waHref(generalMessage(locale))}
        {...EXTERNAL_LINK_PROPS}
        className="flex items-center justify-center gap-2 bg-whatsapp py-3.5 text-sm font-semibold text-paper"
      >
        <WhatsAppIcon className="size-4" />
        {UI.whatsappShort[locale]}
      </a>

      <a
        href={telHref()}
        className="flex items-center justify-center gap-2 py-3.5 text-sm font-semibold text-ink"
      >
        <PhoneIcon className="size-4 text-brand" />
        {UI.call[locale]}
      </a>
    </div>
  );
}
