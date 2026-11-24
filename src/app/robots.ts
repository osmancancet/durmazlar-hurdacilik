import type { MetadataRoute } from "next";
import { SITE } from "@/config/site";

export const dynamic = "force-static";

/*
 * Yapay zekâ arama botları ADIYLA izinli.
 *
 * `*` kuralı zaten herkese izin veriyor; adları ayrıca yazmanın sebebi
 * niyeti açık etmek. İleride biri genel kuralı daraltırsa ("/" yerine
 * belirli klasörler), ChatGPT / Perplexity / Gemini / Copilot
 * aramalarında görünürlük sessizce kaybolmasın. Bu işletmenin müşterisi
 * giderek "Soma'da hurda kim alır" sorusunu asistana soruyor; asistanın
 * yanıtında yer almak için sitenin okunabilir olması şart.
 */
const AI_SEARCH_BOTS = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: AI_SEARCH_BOTS, allow: "/" },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
