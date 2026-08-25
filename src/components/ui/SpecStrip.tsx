/**
 * Künye şeridi — makine üzerindeki bilgi plakası gibi.
 *
 * Rozet, ikon veya onay işareti yok: alan adı üstte mono etiket, değeri
 * altta. Dört gerçeği yan yana, saç teli çizgilerle ayrılmış hâlde verir.
 */
export function SpecStrip({
  items,
  className = "",
}: {
  items: { label: string; value: string; note?: string }[];
  className?: string;
}) {
  return (
    <dl
      className={`grid grid-cols-1 border-t border-zinc sm:grid-cols-2 lg:grid-cols-4 ${className}`}
    >
      {items.map((item) => (
        <div
          key={item.label}
          className="border-b border-zinc px-0 py-5 sm:border-e sm:px-6 sm:first:ps-0 sm:last:border-e-0 lg:py-6"
        >
          <dt className="label">{item.label}</dt>
          <dd className="tabular mt-2 font-display text-xl font-bold text-ink">
            {item.value}
          </dd>
          {item.note && (
            <p className="mt-1.5 text-sm leading-relaxed text-steel">
              {item.note}
            </p>
          )}
        </div>
      ))}
    </dl>
  );
}
