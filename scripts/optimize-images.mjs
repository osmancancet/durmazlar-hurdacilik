/**
 * Ham WhatsApp fotoğraflarını web için optimize eder ve anlamlı adlarla public/images'a yazar.
 *
 *   npm run images
 *
 * Her kaynak için iki çıktı üretilir:
 *   public/images/<ad>.webp         1600px  — lightbox / hero
 *   public/images/thumbs/<ad>.webp   640px  — galeri ızgarası
 *
 * Yeni fotoğraf eklemek için: ham dosyayı üst klasöre atın, aşağıdaki MAP
 * listesine bir satır ekleyin ve `npm run images` çalıştırın.
 */
import { mkdir, readdir, readFile, stat, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const RAW = dirname(ROOT); // ham .jpeg dosyalarının bulunduğu üst klasör
const OUT = join(ROOT, "public", "images");
const THUMBS = join(OUT, "thumbs");

const FULL_WIDTH = 1600;
const THUMB_WIDTH = 640;
const FULL_QUALITY = 74;
const THUMB_QUALITY = 68;

/**
 * Hafif renk uyumlama.
 *
 * Fotoğraflar farklı saatlerde telefonla çekildi; kimi öğle güneşinde sert
 * ve doygun, kimi gölgede soluk. Açık kâğıt zeminde bu fark yan yana
 * durunca göze çarpıyor. Amaç fotoğrafları "filtrelemek" değil, 24'ünü aynı
 * dosyanın parçası gibi göstermek: doygunluk bir tık aşağı, parlaklık çok
 * hafif yukarı.
 *
 * Ham dosyalara dokunulmaz — çıktı her zaman onlardan yeniden
 * üretilir. Geri almak için bu bayrağı false yapmak yeterli.
 */
const GRADE = true;
const GRADE_SETTINGS = { saturation: 0.9, brightness: 1.02 };

/** Ortak boru hattı: EXIF yönü, ölçek, uyumlama, WebP. */
function pipeline(input, width) {
  let image = sharp(input)
    .rotate() // EXIF yönünü uygula
    .resize({ width, withoutEnlargement: true });

  if (GRADE) image = image.modulate(GRADE_SETTINGS);

  return image;
}

/**
 * [ham dosya adı (uzantısıyla birlikte), hedef ad]
 *
 * Uzantı ve boşluklar dosya adında aynen yazılır — saha fotoğrafları hem
 * "WhatsApp Image ....jpeg" hem "PHOTO-....jpg" biçiminde geliyor ve
 * macOS kopyaları " 2", " 3" ekliyor. Tahmin etmek yerine tam adı tutmak
 * tek doğru yol.
 */
const MAP = [
  // — İlk parti (WhatsApp'tan gelen 24 kare) —
  ["WhatsApp Image 2026-08-08 at 14.46.02.jpeg", "tanker-govdesi-1"],
  ["WhatsApp Image 2026-08-08 at 14.46.03.jpeg", "buyuk-cap-boru-1"],
  ["WhatsApp Image 2026-08-08 at 14.46.09.jpeg", "celik-konstruksiyon-kasa-1"],
  ["WhatsApp Image 2026-08-08 at 14.46.10.jpeg", "elek-sac-kasa-1"],
  ["WhatsApp Image 2026-08-08 at 14.46.19.jpeg", "konveyor-sasi-1"],
  ["WhatsApp Image 2026-08-08 at 14.46.20.jpeg", "celik-kafes-kiris-1"],
  ["WhatsApp Image 2026-08-08 at 14.46.21.jpeg", "celik-kafes-kiris-2"],
  ["WhatsApp Image 2026-08-08 at 14.46.22.jpeg", "konveyor-tamburu-1"],
  ["WhatsApp Image 2026-08-08 at 14.46.23.jpeg", "kirici-merdane-1"],
  ["WhatsApp Image 2026-08-08 at 14.46.24.jpeg", "kirici-merdane-2"],
  ["WhatsApp Image 2026-08-08 at 14.46.42.jpeg", "konveyor-tamburu-2"],
  ["WhatsApp Image 2026-08-08 at 14.46.48.jpeg", "konveyor-sasi-2"],
  ["WhatsApp Image 2026-08-08 at 14.46.50.jpeg", "saha-genel-1"],
  ["WhatsApp Image 2026-08-08 at 14.46.51.jpeg", "maden-delici-1"],
  ["WhatsApp Image 2026-08-08 at 14.46.52.jpeg", "paslanmaz-tank-1"],
  ["WhatsApp Image 2026-08-08 at 14.46.53.jpeg", "helezon-konveyor-1"],
  ["WhatsApp Image 2026-08-08 at 14.46.54.jpeg", "sac-izgara-1"],
  ["WhatsApp Image 2026-08-08 at 14.46.58.jpeg", "platform-izgarasi-1"],
  ["WhatsApp Image 2026-08-08 at 14.46.59.jpeg", "sondaj-borusu-1"],
  ["WhatsApp Image 2026-08-08 at 14.47.15.jpeg", "celik-boru-1"],
  ["WhatsApp Image 2026-08-08 at 14.47.16.jpeg", "motor-reduktor-1"],
  ["WhatsApp Image 2026-08-08 at 14.47.17.jpeg", "celik-sac-1"],
  ["WhatsApp Image 2026-08-08 at 14.47.18.jpeg", "celik-boru-2"],
  ["WhatsApp Image 2026-08-08 at 14.47.19.jpeg", "konstruksiyon-profil-1"],

  // — İkinci parti (PHOTO-* olarak eklenen 23 kare) —
  ["PHOTO-2026-08-08-14-46-22.jpg", "beyaz-tank-1"],
  ["PHOTO-2026-08-08-14-46-22 2.jpg", "is-makinesi-kovasi-1"],
  ["PHOTO-2026-08-08-14-46-22 4.jpg", "konveyor-tamburu-3"],
  ["PHOTO-2026-08-08-14-46-23.jpg", "konveyor-tamburu-4"],
  ["PHOTO-2026-08-08-14-46-23 3.jpg", "titresimli-elek-1"],
  ["PHOTO-2026-08-08-14-46-24 2.jpg", "titresimli-elek-2"],
  ["PHOTO-2026-08-08-14-46-24 3.jpg", "celik-halat-1"],
  ["PHOTO-2026-08-08-14-46-59.jpg", "sondaj-borusu-2"],
  ["PHOTO-2026-08-08-14-47-15.jpg", "ray-1"],
  ["PHOTO-2026-08-08-14-47-15 3.jpg", "celik-sac-2"],
  ["PHOTO-2026-08-08-14-47-16.jpg", "muhafaza-borusu-1"],
  ["PHOTO-2026-08-08-14-47-16 2.jpg", "celik-mil-1"],
  ["PHOTO-2026-08-08-14-47-16 4.jpg", "hidrolik-unite-1"],
  ["PHOTO-2026-08-08-14-47-16 5.jpg", "sondaj-borusu-3"],
  ["PHOTO-2026-08-08-14-47-17.jpg", "romork-sasi-1"],
  ["PHOTO-2026-08-08-14-47-17 2.jpg", "celik-sac-3"],
  ["PHOTO-2026-08-08-14-47-17 4.jpg", "kaynakli-kiris-1"],
  ["PHOTO-2026-08-08-14-47-17 5.jpg", "buyuk-cap-boru-2"],
  ["PHOTO-2026-08-08-14-47-17 6.jpg", "galvaniz-profil-1"],
  ["PHOTO-2026-08-08-14-47-18.jpg", "kesilmis-boru-1"],
  ["PHOTO-2026-08-08-14-47-18 2.jpg", "celik-profil-1"],
  ["PHOTO-2026-08-08-14-47-18 3.jpg", "kalin-cidarli-boru-1"],
  ["PHOTO-2026-08-08-14-47-18 5.jpg", "celik-halat-2"],
];

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`;

async function dirSize(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  let total = 0;
  for (const entry of entries) {
    if (entry.isFile()) total += (await stat(join(dir, entry.name))).size;
  }
  return total;
}

await mkdir(THUMBS, { recursive: true });

// Galeri verisinin gerçek dosyalarla eşleştiğini doğrulayabilmek için
// oluşan boyut oranlarını da toplayalım.
const manifest = [];
let processed = 0;

for (const [srcFile, dstName] of MAP) {
  const src = join(RAW, srcFile);
  let input;
  try {
    input = await readFile(src);
  } catch {
    console.warn(`  atlandı (bulunamadı): ${srcFile}`);
    continue;
  }

  const full = await pipeline(input, FULL_WIDTH)
    .webp({ quality: FULL_QUALITY })
    .toBuffer({ resolveWithObject: true });

  const thumb = await pipeline(input, THUMB_WIDTH)
    .webp({ quality: THUMB_QUALITY })
    .toBuffer({ resolveWithObject: true });

  await writeFile(join(OUT, `${dstName}.webp`), full.data);
  await writeFile(join(THUMBS, `${dstName}.webp`), thumb.data);

  manifest.push({
    name: dstName,
    width: full.info.width,
    height: full.info.height,
  });
  processed += 1;
  console.log(
    `  ✓ ${dstName.padEnd(24)} ${String(full.info.width).padStart(4)}×${String(
      full.info.height,
    ).padEnd(4)}  ${kb(full.info.size).padStart(7)}  (thumb ${kb(thumb.info.size)})`,
  );
}

// Galeri bileşeni CLS yaşamasın diye gerçek en/boy oranlarını dosyaya yazıyoruz.
await writeFile(
  join(OUT, "manifest.json"),
  `${JSON.stringify(manifest, null, 2)}\n`,
);

console.log(`\n${processed} görsel işlendi.`);
console.log(`Büyük görseller : ${kb(await dirSize(OUT))}`);
console.log(`Küçük resimler  : ${kb(await dirSize(THUMBS))}`);
