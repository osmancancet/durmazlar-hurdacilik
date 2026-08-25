"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { PhoneIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { UI } from "@/content/ui";
import type { Locale } from "@/lib/i18n";
import { CONTACTS, EXTERNAL_LINK_PROPS, telHref, waHref } from "@/lib/whatsapp";

/**
 * İki yetkiliden birini seçtiren açılır liste.
 *
 * İşletmede iki kişi var ve ikisi de aynı işi yapıyor; site birini öne
 * çıkarmıyor. Bunun bir bedeli var — her temasa bir dokunuş ekliyor — o
 * yüzden liste elden geldiğince ucuz tutuldu: tek tık açılıyor, iki seçenek
 * var, isim ve numara aynı satırda, karar için okunacak başka bir şey yok.
 *
 * NEDEN <details>?
 * Sitenin ana dönüşüm yolu WhatsApp butonu. Bu liste JavaScript'e bağlı bir
 * açılır menü olsaydı, wa.me bağlantıları menü açılana kadar DOM'a hiç
 * girmezdi: JavaScript'in çalışmadığı durumda buton ölü kalır, arama
 * motorları da bağlantıları göremezdi. Yerel <details>/<summary> ile
 * bağlantılar her zaman belgede duruyor, klavye ve ekran okuyucu desteği
 * tarayıcıdan geliyor. JavaScript yalnızca ek konfor için: dışarı tıklayınca
 * ve Esc ile kapanma. (SSS listesi de aynı gerekçeyle <details> kullanıyor.)
 */
export function ContactMenu({
  /** Sohbete önceden yazılacak metin. */
  message,
  /** "whatsapp" -> wa.me, "tel" -> tıkla-ara. */
  mode = "whatsapp",
  locale,
  /** Menüyü açan butonun görünümü. */
  children,
  className = "",
  /** Liste butonun sağına mı soluna mı hizalansın. */
  align = "start",
  /** Yukarı doğru açılsın (sayfa altındaki butonlar için). */
  up = false,
}: {
  message?: string;
  mode?: "whatsapp" | "tel";
  locale: Locale;
  children: ReactNode;
  /**
   * Ek sınıflar.
   *
   * DİKKAT: buraya konum sınıfı (`fixed`, `absolute`, `sticky`) VERİLMEZ.
   * Bileşenin kökü açılır listeyi hizalayabilmek için `relative` taşıyor;
   * ikisi aynı elemanda çakışınca hangisinin kazandığı sınıf sırasına değil
   * üretilen CSS'in sırasına bağlı kalır. Konumlandırma gerekiyorsa bu
   * bileşeni konumlandırılmış bir kabın içine koyun.
   */
  className?: string;
  align?: "start" | "end";
  up?: boolean;
}) {
  const ref = useRef<HTMLDetailsElement | null>(null);

  /*
   * İlerlemeli iyileştirme: dışarı tıklama ve Esc kapatır. JavaScript
   * çalışmazsa liste yine açılıp kapanır, yalnızca bu kolaylıklar olmaz.
   */
  useEffect(() => {
    const details = ref.current;
    if (!details) return;

    const onPointerDown = (event: PointerEvent) => {
      if (details.open && !details.contains(event.target as Node)) {
        details.open = false;
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && details.open) {
        details.open = false;
        details.querySelector("summary")?.focus();
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const Icon = mode === "tel" ? PhoneIcon : WhatsAppIcon;

  return (
    <details ref={ref} className={`group relative ${className}`}>
      <summary
        className="cursor-pointer list-none [&::-webkit-details-marker]:hidden"
        aria-label={UI.chooseContact[locale]}
      >
        {children}
      </summary>

      <div
        className={`absolute z-50 min-w-[15rem] border border-zinc bg-paper-raised shadow-[0_8px_28px_rgba(15,18,53,0.16)] ${
          up ? "bottom-full mb-2" : "top-full mt-2"
        } ${align === "end" ? "end-0" : "start-0"}`}
      >
        <p className="label border-b border-zinc px-4 py-2.5">
          {UI.chooseContact[locale]}
        </p>

        {CONTACTS.map((contact) => (
          <a
            key={contact.id}
            href={mode === "tel" ? telHref(contact) : waHref(contact, message)}
            {...(mode === "whatsapp" ? EXTERNAL_LINK_PROPS : {})}
            onClick={() => {
              if (ref.current) ref.current.open = false;
            }}
            className="flex items-center gap-3 border-b border-zinc px-4 py-3 text-start transition-colors last:border-b-0 hover:bg-paper-deep"
          >
            <Icon
              className={`size-4 shrink-0 ${
                mode === "tel" ? "text-brand" : "text-whatsapp"
              }`}
            />
            <span className="min-w-0">
              <span className="block font-display text-sm font-bold text-ink">
                {contact.name}
              </span>
              <span className="tabular block font-mono text-xs text-steel">
                {contact.display}
              </span>
            </span>
          </a>
        ))}
      </div>
    </details>
  );
}
