import { SITE } from "@/config/site";

/**
 * Marka işareti.
 *
 * Monogram, çelik plakadan oksijenle kesilmiş bir parçayı andırır: köşeleri
 * pahlanmış (chamfered) kare, içinde negatif D. Sahada kesilen her sac
 * parçasının köşesi böyle pahlanır — işaret, işin kendi imalatından geliyor.
 *
 * Kelime markası Archivo 800 ile sıkı aralıklı; altında mono künye satırı,
 * kantar fişi sesini markaya taşır.
 */

export function Monogram({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      aria-hidden
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Pahlanmış kare — kesilmiş sac parçası */}
      <path
        d="M0 7.5 7.5 0H32.5L40 7.5V32.5L32.5 40H7.5L0 32.5V7.5Z"
        fill="currentColor"
      />
      {/* Negatif D — plakadan oyulmuş gibi */}
      <path
        d="M13 11.5H20.4C25.9 11.5 29.5 15 29.5 20S25.9 28.5 20.4 28.5H13V11.5ZM17.6 15.6V24.4H20.2C22.9 24.4 24.7 22.6 24.7 20S22.9 15.6 20.2 15.6H17.6Z"
        fill="var(--color-paper)"
      />
    </svg>
  );
}

export function Wordmark({
  /** Dar alanlarda alt künye satırı gizlenir. */
  compact = false,
  className = "",
}: {
  compact?: boolean;
  className?: string;
}) {
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <Monogram className="size-9 shrink-0 text-ink" />

      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.0625rem] leading-none font-extrabold tracking-[-0.035em] text-ink">
          DURMAZLAR
        </span>

        {!compact && (
          <span className="mt-1.5 font-mono text-[0.5625rem] leading-none font-medium tracking-[0.2em] text-steel">
            HURDACILIK · SOMA
          </span>
        )}
      </span>

      <span className="sr-only">{SITE.name}</span>
    </span>
  );
}
