"use client";

import { useState } from "react";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { CONTACT } from "@/content/ui";
import { QUOTE_MATERIAL_OPTIONS } from "@/content/materials";
import { quoteMessage, type QuoteFormValues } from "@/lib/messages";
import { waHref } from "@/lib/whatsapp";
import type { Locale } from "@/lib/i18n";

/**
 * Teklif formu — sunucusuz.
 *
 * Site statik olarak yayınlandığı için arkada bir uç nokta yok. Form e-posta
 * göndermez; alanları biçimli bir WhatsApp mesajına çevirip sohbeti açar.
 * Kullanıcı tanıdık bir form doldurur, işletme ise WhatsApp'ta hazır bir özet
 * görür — ve kullanıcı mesajı göndermeden önce görüp düzeltebilir.
 *
 * Görsel dil: doldurulan bir fiş. Alanlar kutu değil, alt çizgili satırlar;
 * etiketler mono. Böylece form sayfanın belge diline yabancı durmuyor.
 */

const FIELD =
  "w-full border-0 border-b border-zinc bg-transparent px-0 py-2.5 text-ink placeholder-steel-light transition-colors focus:border-oxide focus:outline-none";

// Türkiye numaraları: 05xx…, +905xx…, 5xx… ve aralarındaki boşluk/tire biçimleri.
const PHONE_PATTERN = /^(\+?90[\s-]?)?0?\s?5\d{2}[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/;

export function WhatsAppQuoteForm({ locale }: { locale: Locale }) {
  const [values, setValues] = useState<QuoteFormValues>({
    name: "",
    phone: "",
    location: "",
    materials: [],
    quantity: "",
    dismantling: "",
    note: "",
  });

  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  const setField = <K extends keyof QuoteFormValues>(
    key: K,
    value: QuoteFormValues[K],
  ) => setValues((previous) => ({ ...previous, [key]: value }));

  const toggleMaterial = (label: string) =>
    setValues((previous) => ({
      ...previous,
      materials: previous.materials.includes(label)
        ? previous.materials.filter((item) => item !== label)
        : [...previous.materials, label],
    }));

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const nextErrors: typeof errors = {};
    if (!values.name.trim()) nextErrors.name = CONTACT.errors.name[locale];
    if (!PHONE_PATTERN.test(values.phone.trim()))
      nextErrors.phone = CONTACT.errors.phone[locale];

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    window.open(
      waHref(quoteMessage(locale, values)),
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-9">
      <div className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
        <div>
          <label htmlFor="quote-name" className="label">
            {CONTACT.fields.name[locale]} <span className="text-oxide">*</span>
          </label>
          <input
            id="quote-name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(event) => setField("name", event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "quote-name-error" : undefined}
            className={`${FIELD} mt-1`}
          />
          {errors.name && (
            <p id="quote-name-error" className="mt-2 text-sm text-oxide">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="quote-phone" className="label">
            {CONTACT.fields.phone[locale]} <span className="text-oxide">*</span>
          </label>
          <input
            id="quote-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="05XX XXX XX XX"
            value={values.phone}
            onChange={(event) => setField("phone", event.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "quote-phone-error" : undefined}
            className={`${FIELD} tabular mt-1 font-mono`}
          />
          {errors.phone && (
            <p id="quote-phone-error" className="mt-2 text-sm text-oxide">
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="quote-location" className="label">
            {CONTACT.fields.location[locale]}
          </label>
          <input
            id="quote-location"
            type="text"
            value={values.location}
            onChange={(event) => setField("location", event.target.value)}
            className={`${FIELD} mt-1`}
          />
        </div>

        <div>
          <label htmlFor="quote-quantity" className="label">
            {CONTACT.fields.quantity[locale]}
          </label>
          <input
            id="quote-quantity"
            type="text"
            placeholder={CONTACT.fields.quantityPlaceholder[locale]}
            value={values.quantity}
            onChange={(event) => setField("quantity", event.target.value)}
            className={`${FIELD} tabular mt-1`}
          />
        </div>
      </div>

      <fieldset>
        <legend className="label">
          {CONTACT.fields.materials[locale]}{" "}
          <span className="normal-case">
            — {CONTACT.fields.materialsHint[locale]}
          </span>
        </legend>
        <div className="mt-3 flex flex-wrap gap-x-2 gap-y-2">
          {QUOTE_MATERIAL_OPTIONS.map((option) => {
            const label = option[locale];
            const active = values.materials.includes(label);
            return (
              <button
                key={label}
                type="button"
                onClick={() => toggleMaterial(label)}
                aria-pressed={active}
                className={`border px-3.5 py-2 text-sm transition-colors ${
                  active
                    ? "border-ink bg-ink font-semibold text-paper"
                    : "border-zinc text-steel hover:border-ink hover:text-ink"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className="label">
          {CONTACT.fields.dismantling[locale]}
        </legend>
        <div className="mt-3 flex gap-2">
          {(["evet", "hayir"] as const).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() =>
                setField(
                  "dismantling",
                  values.dismantling === option ? "" : option,
                )
              }
              aria-pressed={values.dismantling === option}
              className={`border px-6 py-2 text-sm transition-colors ${
                values.dismantling === option
                  ? "border-ink bg-ink font-semibold text-paper"
                  : "border-zinc text-steel hover:border-ink hover:text-ink"
              }`}
            >
              {option === "evet"
                ? CONTACT.fields.yes[locale]
                : CONTACT.fields.no[locale]}
            </button>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="quote-note" className="label">
          {CONTACT.fields.note[locale]}
        </label>
        <textarea
          id="quote-note"
          rows={3}
          placeholder={CONTACT.fields.notePlaceholder[locale]}
          value={values.note}
          onChange={(event) => setField("note", event.target.value)}
          className={`${FIELD} mt-1 resize-y`}
        />
      </div>

      <div className="space-y-3 border-t border-zinc pt-7">
        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-3 bg-whatsapp px-7 py-3.5 font-semibold text-paper transition-colors hover:bg-whatsapp-bright hover:text-ink sm:w-auto"
        >
          <WhatsAppIcon className="size-5" />
          {CONTACT.submit[locale]}
        </button>
        <p className="measure text-sm leading-relaxed text-steel">
          {CONTACT.submitHint[locale]}
        </p>
      </div>
    </form>
  );
}
