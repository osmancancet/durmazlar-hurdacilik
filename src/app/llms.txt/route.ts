import { hrefFor } from "@/config/routes";
import { SITE } from "@/config/site";
import { PROVINCES, areaHref, districtsOf } from "@/content/areas";
import { BLOG_POSTS, blogPostHref } from "@/content/blog";
import { FAQ } from "@/content/faq";
import { MATERIAL_GROUPS } from "@/content/materials";
import { SERVICES } from "@/content/services";

/*
 * /llms.txt — yapay zekâ asistanları için sitenin özeti (llmstxt.org biçimi).
 *
 * ChatGPT, Perplexity, Gemini gibi araçlar bir işletme hakkında soru
 * yanıtlarken sayfaları tek tek gezmek yerine bu dosyayı okuyabilir.
 * İçerik elle yazılmaz; sitenin kendi içerik dosyalarından derleme anında
 * üretilir. Telefon, adres, hizmet veya malzeme değiştiğinde burası da
 * kendiliğinden güncellenir — iki kaynak birbirinden kopamaz.
 */

export const dynamic = "force-static";

const abs = (path: string) => `${SITE.url}${path}`;

function build(): string {
  const lines: string[] = [];
  const push = (...rows: string[]) => lines.push(...rows);

  push(
    `# ${SITE.name}`,
    "",
    `> ${SITE.address.district} / ${SITE.address.city} merkezli endüstriyel hurda alımı, tesis sökümü ve ikinci el makine-ekipman satışı yapan işletme. ${SITE.serviceAreas.join(", ")} illerinde hizmet verir. Fotoğraf üzerinden aynı gün ön fiyat verir; ödeme kantar tartımından sonra yapılır, kantar fişi elden teslim edilir.`,
    "",
    "## İşletme bilgileri",
    "",
    `- Ad: ${SITE.name}`,
    `- Adres: ${SITE.address.street}, ${SITE.address.postalCode} ${SITE.address.district} / ${SITE.address.city}, ${SITE.address.country}`,
    `- Koordinat: ${SITE.geo.latitude}, ${SITE.geo.longitude}`,
    `- Google Haritalar: ${SITE.googleMapsUrl}`,
    ...SITE.contacts.map(
      (contact) =>
        `- Telefon / WhatsApp (${contact.name}): ${contact.display} — https://wa.me/${contact.raw}`,
    ),
    ...(SITE.email ? [`- E-posta: ${SITE.email}`] : []),
    `- Çalışma saatleri: ${SITE.hours.weekdays.tr} ${SITE.hours.weekdayHours}; ${SITE.hours.sunday.tr} ${SITE.hours.sundayHours.tr}`,
    `- Hizmet verilen iller: ${SITE.serviceAreas.join(", ")}`,
    `- Düzenli gidilen ilçeler: ${SITE.serviceDistricts.join(", ")}`,
    `- Kuruluş: ${SITE.foundingDate.slice(0, 4)}`,
    `- Site dilleri: Türkçe, İngilizce, Rusça, Arapça`,
    "",
    "## Hizmetler",
    "",
    ...SERVICES.map(
      (service) =>
        `- [${service.title.tr}](${abs(hrefFor("services", "tr"))}#${service.id}): ${service.summary.tr} Kapsam: ${service.bullets.tr.join("; ")}.`,
    ),
    "",
    "## Alınan malzemeler",
    "",
    ...MATERIAL_GROUPS.map(
      (group) =>
        `- ${group.title.tr}: ${group.items
          .map((item) => `${item.name.tr} (${item.note.tr})`)
          .join("; ")}`,
    ),
    `- Ayrıntı: ${abs(hrefFor("materials", "tr"))}`,
    "",
    "## Sık sorulan sorular",
    "",
    ...FAQ.flatMap((item) => [`### ${item.question.tr}`, "", item.answer.tr, ""]),
    "## Bölge sayfaları",
    "",
    ...PROVINCES().flatMap((province) => [
      `- [${province.title}](${abs(areaHref(province.slug))}): ${province.description}`,
      ...districtsOf(province.slug).map(
        (district) =>
          `  - [${district.title}](${abs(areaHref(district.slug))}): ${district.description}`,
      ),
    ]),
    "",
    "## Rehber yazıları",
    "",
    ...BLOG_POSTS.map(
      (post) => `- [${post.title}](${abs(blogPostHref(post.slug))}): ${post.description}`,
    ),
    "",
    "## Ana sayfalar",
    "",
    `- [Ana sayfa](${abs(hrefFor("home", "tr"))})`,
    `- [Hizmetler](${abs(hrefFor("services", "tr"))})`,
    `- [Aldığımız malzemeler](${abs(hrefFor("materials", "tr"))})`,
    `- [Galeri](${abs(hrefFor("gallery", "tr"))})`,
    `- [Hakkımızda](${abs(hrefFor("about", "tr"))})`,
    `- [İletişim](${abs(hrefFor("contact", "tr"))})`,
    "",
    "## Optional",
    "",
    `- [English version](${abs(hrefFor("home", "en"))}): industrial scrap purchasing, plant dismantling and used machinery sales in Soma, Manisa (Türkiye).`,
    `- [Site haritası](${abs("/sitemap.xml")})`,
    "",
  );

  return lines.join("\n");
}

export function GET() {
  return new Response(build(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
