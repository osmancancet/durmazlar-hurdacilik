import Image from "next/image";
import { SITE } from "@/config/site";

/**
 * Marka işareti — kurumsal kimlik paketinden.
 *
 * Dosyalar `public/brand/` altında ve kimliğin kendi SVG'leridir; burada
 * yeniden çizilmez, renklendirilmez, oranı bozulmaz. Kimliğin kuralları:
 *
 *   - Eni/boyu ayrı ayrı değiştirilmez, her zaman orantılı ölçeklenir.
 *   - Renk değiştirilmez; koyu zemin için hazır BEYAZ varyantı kullanılır.
 *   - Yazılı logo ekranda 90 pikselin altına indirilmez.
 *   - Çevresinde amblemin yarısı kadar boş alan bırakılır.
 *
 * Inline SVG yerine <Image> tercih edildi: logo hem başlıkta hem altbilgide,
 * yani her sayfada iki kez görünüyor. Gömülseydi 12 sayfanın HTML'ine ~16'şar
 * KB eklenirdi; dosya olarak istendiğinde tarayıcı tek sefer indirip tüm site
 * boyunca önbellekten veriyor.
 */

/** Yatay logonun kendi oranı (viewBox 689 × 167). */
const YATAY_RATIO = 689 / 167;

export function Wordmark({
  /** Dar alanlarda yalnızca amblem gösterilir. */
  compact = false,
  /** Koyu (lacivert) zeminde kimliğin beyaz varyantı kullanılır. */
  variant = "renkli",
  /** Logonun yüksekliği (px). Yatayda genişlik bundan türetilir. */
  height = 36,
  /** Başlıktaki logo ilk boyamada görünür; öncelikli yüklenir. */
  priority = false,
  className = "",
}: {
  compact?: boolean;
  variant?: "renkli" | "beyaz";
  height?: number;
  priority?: boolean;
  className?: string;
}) {
  const beyaz = variant === "beyaz";

  if (compact) {
    return (
      <span className={`inline-flex items-center ${className}`}>
        <Image
          src={beyaz ? "/brand/ikon-beyaz.svg" : "/brand/ikon.svg"}
          alt={SITE.name}
          width={height}
          height={height}
          priority={priority}
        />
      </span>
    );
  }

  /*
   * 90 piksel alt sınırı kimliğin kuralı. Bu yükseklikte genişlik zaten
   * ~148 piksel; sınır yine de kodda dursun ki ileride biri yüksekliği
   * küçültürken farkında olmadan kuralı çiğnemesin.
   */
  const width = Math.round(height * YATAY_RATIO);

  return (
    <span className={`inline-flex items-center ${className}`}>
      <Image
        src={beyaz ? "/brand/logo-yatay-beyaz.svg" : "/brand/logo-yatay.svg"}
        alt={SITE.name}
        width={width}
        height={height}
        priority={priority}
        style={{ minWidth: 90 }}
      />
    </span>
  );
}
