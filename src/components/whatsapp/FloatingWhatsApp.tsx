"use client";

import { useEffect, useState } from "react";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { ContactMenu } from "@/components/whatsapp/ContactMenu";
import { UI } from "@/content/ui";
import { generalMessage } from "@/lib/messages";
import type { Locale } from "@/lib/i18n";

/**
 * Sağ altta sabit duran WhatsApp erişimi.
 *
 * Yuvarlak "balon" yerine köşeli bir etiket: sayfanın belge dili yuvarlak
 * kalkan biçimlerini kaldırmıyor. Nabız animasyonu da kaldırıldı — sürekli
 * hareket eden bir öğe belgeselliği bozuyor ve dikkat çekmek için gereken
 * kontrast zaten yeşilin kendisinde var.
 *
 * Sayfanın en üstünde görünmez (hero'daki asıl çağrı oradadır); mobilde alt
 * aksiyon çubuğu devreye girdiği için gizlenir.
 */
export function FloatingWhatsApp({ locale }: { locale: Locale }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /*
   * Konumlandırma ContactMenu'ye DEĞİL, onu saran kaba verilir.
   *
   * ContactMenu kendi kökünde `relative` taşıyor — açılır listeyi kendine
   * göre konumlandırabilmesi için gerekli. Buraya `fixed` sınıfı da
   * geçirilince ikisi aynı elemanda çakışıyor ve `relative` kazanıyordu:
   * buton sabitlenmek yerine sayfa akışında kalıyor, `end-6` de onu ekranın
   * soluna (x = -24px) itiyordu. Kap ayrı olunca her sınıf kendi işini yapar.
   */
  return (
    <div
      className={`fixed end-6 bottom-6 z-40 hidden transition-all duration-300 md:block ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <ContactMenu
        message={generalMessage(locale)}
        locale={locale}
        align="end"
        up
      >
        <span
          aria-label={UI.whatsappWrite[locale]}
          className="inline-flex cursor-pointer items-center gap-2.5 bg-whatsapp px-5 py-3.5 text-sm font-semibold text-paper shadow-[0_2px_16px_rgba(15,18,53,0.18)] transition-colors hover:bg-whatsapp-bright hover:text-ink"
        >
          <WhatsAppIcon className="size-4 shrink-0" />
          {UI.whatsappWrite[locale]}
        </span>
      </ContactMenu>
    </div>
  );
}
