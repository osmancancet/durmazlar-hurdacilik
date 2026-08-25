import { PhoneIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { ContactMenu } from "@/components/whatsapp/ContactMenu";
import { UI } from "@/content/ui";
import { generalMessage } from "@/lib/messages";
import type { Locale } from "@/lib/i18n";

/**
 * Mobilde ekranın altına sabitlenen aksiyon çubuğu.
 *
 * Hurda sektöründe trafiğin ezici çoğunluğu telefondan gelir; kullanıcının
 * sayfanın neresinde olursa olsun tek dokunuşla yazabilmesi veya arayabilmesi
 * en yüksek dönüşümlü öğedir. Yalnızca md altında görünür.
 *
 * İki yetkili olduğu için dokunuş doğrudan aramıyor, önce kişiyi seçtiriyor.
 * Dört düğmeyi (2 kanal × 2 kişi) yan yana dizmek yerine iki sütun korundu:
 * çubuk okunur kalıyor, seçim yukarı doğru açılıyor.
 */
export function MobileCallBar({ locale }: { locale: Locale }) {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-zinc bg-paper-raised md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ContactMenu message={generalMessage(locale)} locale={locale} up>
        <span className="flex w-full cursor-pointer items-center justify-center gap-2 bg-whatsapp py-3.5 text-sm font-semibold text-paper">
          <WhatsAppIcon className="size-4" />
          {UI.whatsappShort[locale]}
        </span>
      </ContactMenu>

      <ContactMenu mode="tel" locale={locale} align="end" up>
        <span className="flex w-full cursor-pointer items-center justify-center gap-2 py-3.5 text-sm font-semibold text-ink">
          <PhoneIcon className="size-4 text-brand" />
          {UI.call[locale]}
        </span>
      </ContactMenu>
    </div>
  );
}
