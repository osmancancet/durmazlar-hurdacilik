import { PageHero } from "@/components/pages/PageHero";
import { CtaBand } from "@/components/ui/CtaBand";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { MATERIAL_GROUPS } from "@/content/materials";
import { PAGE_HEADERS, UI } from "@/content/ui";
import type { Locale } from "@/lib/i18n";
import { materialMessage, sendPhotosMessage } from "@/lib/messages";
import { EXTERNAL_LINK_PROPS, waHref } from "@/lib/whatsapp";

/**
 * Aldığımız malzemeler — sitenin künye tablosu.
 *
 * Tasarımın en çok kazandığı sayfa: her kalem bir satır, her satır kendi
 * fiyat sorgusu. Kart yok; sınıfa göre gruplanmış gerçek bir şartname
 * tablosu var.
 */
export function MaterialsPage({ locale }: { locale: Locale }) {
  const header = PAGE_HEADERS.materials;
  const totalItems = MATERIAL_GROUPS.reduce(
    (sum, group) => sum + group.items.length,
    0,
  );

  return (
    <>
      <PageHero
        label={header.eyebrow[locale]}
        title={header.title[locale]}
        lead={header.lead[locale]}
        aside={
          <dl className="lg:w-40">
            <dt className="label">{locale === "tr" ? "Kalem" : "Items"}</dt>
            <dd className="tabular mt-2 font-display text-3xl font-bold text-ink">
              {totalItems}
            </dd>
            <dt className="label mt-6">
              {locale === "tr" ? "Grup" : "Groups"}
            </dt>
            <dd className="tabular mt-2 font-display text-3xl font-bold text-ink">
              {MATERIAL_GROUPS.length}
            </dd>
          </dl>
        }
      />

      {/* Fiyat notu — uyarı kutusu değil, sayfanın başındaki bir dipnot. */}
      <Section ruled={false} className="py-10 lg:py-12">
        {/* Sol kenar şeridi kartvizitin arka yüzünden gelen aygıt. */}
        <div className="relative grid gap-6 pl-6 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
          <span
            aria-hidden
            className="brand-gradient absolute inset-y-0 left-0 w-[3px]"
          />
          <div className="measure">
            <p className="label">{locale === "tr" ? "Not" : "Note"}</p>
            <p className="mt-2 leading-relaxed text-ink-soft">
              {locale === "tr"
                ? "Hurda fiyatları borsaya ve malzemenin kalitesine göre değiştiği için sitede sabit rakam yayınlamıyoruz. Elinizdekini yazın ya da fotoğrafını gönderin — o günkü fiyatı söyleyelim."
                : "Scrap prices move with the market and the grade of the material, so we do not publish fixed figures here. Tell us what you have or send a photo, and we will give you the price for that day."}
            </p>
          </div>

          <WhatsAppButton
            message={sendPhotosMessage(locale)}
            size="md"
            className="shrink-0"
          >
            {UI.sendPhotos[locale]}
          </WhatsAppButton>
        </div>
      </Section>

      {MATERIAL_GROUPS.map((group, groupIndex) => (
        <Section
          key={group.id}
          id={group.id}
          tone={groupIndex % 2 === 1 ? "raised" : "paper"}
        >
          <div className="grid gap-10 lg:grid-cols-[18rem_1fr] lg:gap-16">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <span className="tabular font-mono text-sm font-medium text-brand">
                {String(groupIndex + 1).padStart(2, "0")}
              </span>
              <h2 className="display mt-3 text-[1.625rem] sm:text-[2rem]">
                {group.title[locale]}
              </h2>
              <p className="mt-4 leading-relaxed text-pretty text-steel">
                {group.intro[locale]}
              </p>
            </div>

            <ul className="border-t border-ink">
              {group.items.map((item, index) => (
                <Reveal key={item.id} delay={Math.min(index * 0.04, 0.2)}>
                  <li className="grid grid-cols-[auto_1fr_auto] items-baseline gap-x-5 gap-y-1 border-b border-zinc py-4">
                    <span className="tabular font-mono text-xs text-steel-light">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <h3 className="font-semibold text-ink">
                      {item.name[locale]}
                    </h3>

                    <a
                      href={waHref(materialMessage(locale, item.name[locale]))}
                      {...EXTERNAL_LINK_PROPS}
                      aria-label={`${item.name[locale]} — ${UI.askPrice[locale]}`}
                      className="row-span-2 inline-flex min-h-6 items-center gap-1.5 self-center py-1 text-sm font-semibold whitespace-nowrap text-whatsapp underline-offset-4 hover:underline"
                    >
                      <WhatsAppIcon className="size-[0.9rem]" />
                      {UI.askPrice[locale]}
                    </a>

                    <p className="col-start-2 text-sm leading-relaxed text-steel">
                      {item.note[locale]}
                    </p>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </Section>
      ))}

      <CtaBand locale={locale} />
    </>
  );
}
