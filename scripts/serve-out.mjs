/**
 * `out/` klasörünü servis eden küçük statik sunucu — bağımlılığı yok.
 *
 * Testler geliştirme sunucusunu değil, gerçekten yayına çıkacak statik
 * çıktıyı sürer. Böylece yalnızca export sırasında ortaya çıkan hatalar da
 * (eksik sayfa, bozuk görsel yolu, üretilmeyen sitemap) yakalanır.
 *
 *   node scripts/serve-out.mjs [port]
 */
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { dirname, extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(dirname(fileURLToPath(import.meta.url))), "out");
const PORT = Number(process.argv[2] ?? process.env.PORT ?? 4173);

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".woff2": "font/woff2",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
};

async function resolve(urlPath) {
  // ".." ile out/ dışına çıkılmasını engelle.
  const safe = normalize(decodeURIComponent(urlPath.split("?")[0])).replace(
    /^(\.\.[/\\])+/,
    "",
  );
  const target = join(ROOT, safe);
  if (!target.startsWith(ROOT)) return null;

  try {
    const info = await stat(target);
    // Dizin istendiğinde index.html'e düş (trailingSlash: true çıktısı).
    if (info.isDirectory()) return join(target, "index.html");
    return target;
  } catch {
    // Uzantısız yol: /tr/galeri -> /tr/galeri/index.html
    try {
      await stat(join(target, "index.html"));
      return join(target, "index.html");
    } catch {
      return null;
    }
  }
}

const server = createServer(async (request, response) => {
  const url = request.url ?? "/";

  /*
   * Vercel ölçümleme uçları.
   *
   * Yayında `/_vercel/insights/*` ve `/_vercel/speed-insights/*` yollarını
   * Vercel'in kendi altyapısı karşılıyor; `out/` klasöründe karşılıkları yok.
   * Bu sunucu onları 404 dönseydi, sayfada hata olmadığını denetleyen
   * testler sahte biçimde kırılırdı — ölçümleme yüzünden, sitenin kendi
   * hatası yüzünden değil. Boş bir 204 ile yayındaki davranış taklit edilir.
   */
  if (url.startsWith("/_vercel/")) {
    response.writeHead(204);
    response.end();
    return;
  }

  const file = await resolve(url);

  if (!file) {
    const notFound = join(ROOT, "404.html");
    try {
      response.writeHead(404, { "content-type": TYPES[".html"] });
      response.end(await readFile(notFound));
    } catch {
      response.writeHead(404, { "content-type": TYPES[".txt"] });
      response.end("404");
    }
    return;
  }

  try {
    const body = await readFile(file);
    const type = TYPES[extname(file)] ?? "application/octet-stream";

    /*
     * Byte-range desteği — video için şart.
     *
     * Tarayıcı bir <video> içinde ileri sararken tüm dosyayı değil, istediği
     * aralığı ister. Sunucu 206 yerine 200 dönerse arama güvenilmez çalışır
     * ve videoyu süren testler sahte biçimde başarısız olur. Vercel bunu
     * kendiliğinden yapıyor; testlerin sürdüğü bu sunucunun da yapması
     * gerekiyor ki test ortamı yayınla aynı davransın.
     */
    const range = request.headers.range;
    const match = /^bytes=(\d*)-(\d*)$/.exec(range ?? "");

    if (match) {
      const start = match[1] ? Number(match[1]) : 0;
      const end = match[2] ? Number(match[2]) : body.length - 1;

      if (start >= body.length || end >= body.length || start > end) {
        response.writeHead(416, { "content-range": `bytes */${body.length}` });
        response.end();
        return;
      }

      response.writeHead(206, {
        "content-type": type,
        "content-range": `bytes ${start}-${end}/${body.length}`,
        "accept-ranges": "bytes",
        "content-length": end - start + 1,
        "cache-control": "no-store",
      });
      response.end(body.subarray(start, end + 1));
      return;
    }

    response.writeHead(200, {
      "content-type": type,
      "accept-ranges": "bytes",
      "content-length": body.length,
      "cache-control": "no-store",
    });
    response.end(body);
  } catch {
    response.writeHead(500);
    response.end("500");
  }
});

server.listen(PORT, () => {
  console.log(`Statik çıktı servis ediliyor: http://localhost:${PORT}`);
});
