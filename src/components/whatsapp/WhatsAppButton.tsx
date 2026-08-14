import { EXTERNAL_LINK_PROPS, waHref } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/Icons";

type Variant = "solid" | "outline" | "quiet";
type Size = "sm" | "md" | "lg";

/*
 * Yeşil, sayfadaki tek AKSİYON rengidir. Kâğıt zeminde saturasyonu biraz
 * düşürülmüş bir yeşil (#128C4A) kullanılır: parlak WhatsApp yeşili açık
 * zeminde bağırır ve belge dilini bozar. Marka tanınırlığı ikon ve metinle
 * zaten sağlanıyor.
 */
const VARIANTS: Record<Variant, string> = {
  solid: "bg-whatsapp text-paper hover:bg-whatsapp-bright hover:text-ink",
  outline: "border border-whatsapp text-whatsapp hover:bg-whatsapp hover:text-paper",
  quiet: "text-whatsapp underline-offset-4 hover:underline",
};

const SIZES: Record<Size, string> = {
  sm: "px-3.5 py-2 text-[0.8125rem] gap-2",
  md: "px-5 py-2.5 text-sm gap-2.5",
  lg: "px-7 py-3.5 text-base gap-3",
};

const ICON_SIZES: Record<Size, string> = {
  sm: "size-[0.9rem]",
  md: "size-4",
  lg: "size-5",
};

type Props = {
  /** Sohbete önceden yazılacak metin — lib/messages.ts'ten gelir. */
  message: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  /** Ekran okuyucular için, görünen metinden daha açıklayıcı bir etiket. */
  ariaLabel?: string;
  className?: string;
  fullWidth?: boolean;
};

/**
 * Sitedeki tüm WhatsApp aksiyonlarının tek kaynağı.
 *
 * NOT: Görünüm değişebilir, `waHref(message)` çağrısı değişmez — bağlantı
 * ve ön doldurulmuş mesaj mantığı tasarımdan bağımsızdır.
 */
export function WhatsAppButton({
  message,
  children,
  variant = "solid",
  size = "md",
  ariaLabel,
  className = "",
  fullWidth = false,
}: Props) {
  const isQuiet = variant === "quiet";

  return (
    <a
      href={waHref(message)}
      {...EXTERNAL_LINK_PROPS}
      aria-label={ariaLabel}
      className={`inline-flex items-center justify-center font-semibold whitespace-nowrap transition-colors duration-150 ${
        VARIANTS[variant]
      } ${isQuiet ? "gap-2 text-sm" : SIZES[size]} ${
        fullWidth ? "w-full" : ""
      } ${className}`}
    >
      <WhatsAppIcon className={`${ICON_SIZES[size]} shrink-0`} />
      <span>{children}</span>
    </a>
  );
}
