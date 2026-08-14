# Durmazlar Hurdacılık — Web Sitesi

Soma / Manisa merkezli endüstriyel hurda ve ikinci el ekipman işletmesi için
iki dilli (Türkçe + İngilizce), WhatsApp odaklı kurumsal site.

Next.js 16 + TypeScript + Tailwind CSS 4 ile yazıldı ve **statik** olarak
dışa aktarılıyor: `npm run build` sonrası çıkan `out/` klasörü herhangi bir
hostinge olduğu gibi atılabilir. Sunucu, veritabanı veya aylık altyapı
maliyeti yok.

---

## En sık ihtiyaç duyacağınız üç işlem

### 1. WhatsApp numarasını değiştirmek

Tek dosya: **`src/config/site.ts`**

```ts
phone: {
  raw: "905340882679",          // wa.me adresleri bunu kullanır (yalnız rakam)
  display: "+90 534 088 26 79", // ekranda görünen biçim
  e164: "+905340882679",        // tıkla-ara bağlantısı
},
```

Üçünü de güncelleyin. Bu değişiklik; kayan WhatsApp butonunu, mobil alt
çubuğu, başlıktaki butonu, tüm hizmet/malzeme/galeri butonlarını, teklif
formunu, altbilgiyi ve Google'a gönderilen işletme bilgisini aynı anda
günceller. Sitede başka hiçbir yere numara yazılmamıştır.

Adres, çalışma saatleri ve hizmet verilen iller de aynı dosyadadır.

### 2. Yeni fotoğraf eklemek

1. Ham fotoğrafı bu klasörün **bir üstüne** (diğer ham fotoğrafların yanına) koyun.
2. `scripts/optimize-images.mjs` içindeki `MAP` listesine bir satır ekleyin.
   Dosya adı **uzantısıyla ve boşluklarıyla birlikte** yazılır:
   ```js
   ["PHOTO-2026-08-08-15-10-01.jpg", "yeni-urun-1"],
   ```
3. `npm run images` çalıştırın. Büyük (1600px) ve küçük (640px) WebP
   sürümleri `public/images/` altına yazılır.
4. Galeride görünmesi için `src/content/gallery.ts` dosyasına kaydını ekleyin
   (başlık, açıklama, kategori ve gerçek en/boy ölçüsü — ölçüyü betiğin
   çıktısı size söyler).

### 3. Yayına almak

```bash
npm run build     # out/ klasörünü üretir
```

`out/` klasörünün **içeriğini** sunucunuza yükleyin:

- **Netlify / Vercel / Cloudflare Pages:** klasörü sürükleyip bırakın.
- **cPanel / paylaşımlı hosting:** içeriği `public_html` altına kopyalayın.
- **GitHub Pages:** `out/` klasörünü yayınlayın.

Yayına almadan önce `src/config/site.ts` içindeki `url` alanını kendi alan
adınızla değiştirin — site haritası, canonical adresler ve sosyal medya
önizlemeleri bu adresi kullanır.

---

## Komutlar

| Komut | Ne yapar |
|---|---|
| `npm run dev` | Geliştirme sunucusu |
| `npm run build` | Statik siteyi `out/` klasörüne üretir |
| `npm run images` | Ham fotoğrafları optimize edip `public/images/` altına yazar |
| `npm test` | Playwright test takımını çalıştırır (aşağıya bakın) |
| `npm run lint` | Kod denetimi |

---

## Testler

```bash
npm test
```

166 test, iki tarayıcıda koşar: masaüstü (Chromium) ve iPhone 13 (WebKit —
gerçek Safari motoru). İlk çalıştırmadan önce tarayıcıları indirin:

```bash
npx playwright install chromium webkit
```

Testler geliştirme sunucusunu değil, **yayına çıkacak `out/` klasörünü**
sürer ve her koşuda projeyi yeniden derler — böylece bayat bir çıktı
yanlışlıkla "geçti" diyemez ve yalnızca export sırasında ortaya çıkan
hatalar da yakalanır.

Beklenen değerler `src/content/*` ve `src/lib/messages.ts` dosyalarından
**içe aktarılır**, teste elle kopyalanmaz: bir hizmetin adını değiştirdiğinizde
test o yeni adı doğrular, eski kopyayı değil.

| Dosya | Neyi güvenceye alıyor |
|---|---|
| `tests/smoke.spec.ts` | 12 sayfa açılıyor, tek `h1`, konsol hatası ve 404 kaynak yok |
| `tests/whatsapp.spec.ts` | **En kritik.** Her bağlantı doğru numaraya gidiyor; hizmet, malzeme ve galeri butonları bağlamına ait mesajı taşıyor |
| `tests/quote-form.spec.ts` | Doğrulama çalışıyor; dolu form doğru çok satırlı mesajı üretiyor; boş alanlar mesaja girmiyor |
| `tests/i18n.spec.ts` | TR↔EN her sayfada karşılığına gidiyor (ana sayfaya düşmüyor), `lang` ve hreflang doğru |
| `tests/gallery.spec.ts` | Filtreler, lightbox, klavye (ok tuşları / ESC), plaka başına WhatsApp |
| `tests/seo.spec.ts` | Başlık uzunluğu, açıklama, canonical, JSON-LD geçerliliği, sitemap, robots |
| `tests/mobile.spec.ts` | Alt aksiyon çubuğu, menü, yatay taşma yok, dokunma hedefleri |

Testler **davranışı** doğrular, görsel sınıf adlarına bağlanmaz — tasarımı
değiştirdiğinizde kırılmazlar.

---

## Sayfa yapısı

| Türkçe | İngilizce |
|---|---|
| `/tr/` | `/en/` |
| `/tr/hizmetler/` | `/en/services/` |
| `/tr/aldigimiz-malzemeler/` | `/en/materials/` |
| `/tr/galeri/` | `/en/gallery/` |
| `/tr/hakkimizda/` | `/en/about/` |
| `/tr/iletisim/` | `/en/contact/` |

Kök adres (`/`) Türkçe sürüme yönlendirir. Dil değiştirici, bulunduğunuz
sayfanın diğer dildeki karşılığına gider.

Adresleri değiştirmek isterseniz tek yer: **`src/config/routes.ts`**. Menü,
site haritası ve dil değiştirici hepsi bu dosyadan beslenir.

---

## WhatsApp nasıl kurgulandı

WhatsApp bu sitede bir "iletişim seçeneği" değil, **birincil dönüşüm yolu**.
Her buton, bulunduğu bağlama özel ön doldurulmuş mesajla açılır; böylece
müşteri "Merhaba" yazıp beklemez, siz de ilk mesajda konuyu görürsünüz.

| Nerede | Açılan mesaj |
|---|---|
| Hizmet satırı | `"Tesis Sökümü ve Demontaj" hizmetiniz hakkında bilgi almak istiyorum.` |
| Malzeme satırı | `"Hurda Demir" için güncel fiyat bilgisi alabilir miyim?` |
| Galeri plakası | Fotoğrafın adı **ve doğrudan bağlantısı** mesaja eklenir |
| Teklif formu | Ad, telefon, konum, malzeme, tonaj ve not — düzenli bir özet |
| Kayan buton / mobil çubuk | Genel bilgi talebi |

Mesaj metinleri: **`src/lib/messages.ts`**. Adres üretimi: `src/lib/whatsapp.ts`
— sitede elle yazılmış tek bir `wa.me` bağlantısı yoktur.

**Teklif formu e-posta göndermez.** Girilen bilgileri biçimli bir WhatsApp
mesajına çevirip sohbeti açar. Bu yüzden arkada sunucu gerekmez ve mesaj
gönderilmeden önce müşteri tarafından görülüp düzenlenebilir.

---

## Tasarım sistemi — "Çelik Belge"

Site, sahanın dramatize edilmiş reklamı değil **belgelenmiş teknik dosyası**
olarak kurgulandı. Bu işin belgesi kantar fişidir: numaralı, tablo hâlinde,
daktilo yazısıyla basılmış bir slip. Bütün görsel kararlar buradan çıkıyor —
kart, gölge ve yuvarlak köşe yerine saç teli çizgiler, plakalar ve künyeler.

### Renk (`src/app/globals.css`)

| Jeton | Değer | Rol |
|---|---|---|
| `paper` | `#EFF1F1` | Çinko eğilimli soğuk kırık beyaz — zemin |
| `ink` | `#14181B` | Metin ve tek koyu bölüm (CTA bandı) |
| `steel` | `#5B6770` | İkincil metin |
| `zinc` | `#C6CCD0` | Saç teli çizgiler, plaka çerçeveleri |
| `oxide` | `#A8401F` | **Yapı** rengi: bölüm numaraları, etiketler, ince çizgiler |
| `whatsapp` | `#0D733B` | **Aksiyon** rengi: yalnızca WhatsApp butonları |

**Oksit için düşük alan kuralı:** pas kırmızısı asla büyük dolu buton olmaz.
Kırmızı ile yeşil karşıt renklerdir; ikisi aynı görsel rolde yarışsa sayfa
dağılırdı. Yeşil aksiyon, oksit yapı rengidir.

Tüm metin/zemin kombinasyonları **WCAG AA**'yı geçer (en düşük 4.54:1).
Marka yeşili `#25D366` kâğıt zeminde AA'yı geçemediği için koyultuldu;
parlak sürüm yalnızca hover'da kullanılıyor.

### Tipografi

| Rol | Yüz | Kullanım |
|---|---|---|
| Başlık | **Archivo** 700/800 | Köşeli sonlu grotesk, sıkı harf aralığı |
| Gövde | **Source Sans 3** | Küçük puntoda okunaklı, Türkçe'de güçlü |
| Veri | **IBM Plex Mono** | Etiketler, telefon, tonaj, künyeler, indeksler |

Üçü de `latin-ext` alt kümesiyle `next/font` üzerinden derleme anında
projeye gömülür — tarayıcı harici bir sunucuya istek atmaz, Türkçe
karakterler eksiksizdir.

### Yardımcı sınıflar

`.display`, `.label`, `.plate`, `.measure`, `.tabular` sınıfları
`@layer components` içinde tanımlıdır. Bu **önemli**: katmansız yazılsalardı
aynı özgüllükteki Tailwind yardımcıları (`text-paper` gibi) kaybeder ve
koyu zeminde başlıklar görünmez olurdu.

### Logo

`src/components/brand/Wordmark.tsx` — inline SVG. Monogram, çelik plakadan
oksijenle kesilmiş bir parçayı andırır: köşeleri pahlanmış kare, içinde
negatif D. Tek dosyadan değiştirilebilir.

---

## İçeriği düzenlemek

Tüm metinler `src/content/` altındadır ve Türkçesi ile İngilizcesi **yan yana**
durur; birini değiştirirken diğerini unutmak zorlaşır.

```ts
title: { tr: "Endüstriyel Hurda Alımı", en: "Industrial Scrap Purchasing" },
```

| Dosya | İçerik |
|---|---|
| `services.ts` | Dört hizmetin başlığı, anlatımı ve maddeleri |
| `materials.ts` | Alınan malzeme grupları ve kalemleri |
| `gallery.ts` | 47 fotoğrafın başlık, açıklama ve kategorisi |
| `faq.ts` | Sık sorulan sorular |
| `ui.ts` | Buton etiketleri, sayfa başlıkları, ana sayfa ve hakkımızda metinleri |

### Gözden geçirmeniz önerilen ifadeler

Aşağıdakiler sektörde alışılmış ifadelerdir; kendi çalışma şeklinize
uymuyorsa düzenleyin:

- Ana sayfadaki künye şeridi — `HOME.specs` (`ui.ts`): "4 il", "Sınırsız
  tonaj", "Yerinde keşif", "Tartı sonrası ödeme"
- Süreç adımlarındaki "aynı gün ön fiyat" ifadeleri — `HOME.processSection`
  ve `faq.ts`
- Çalışma saatleri ve hizmet verilen iller — `src/config/site.ts`

Sitede **fiyat rakamı yayınlanmıyor**; hurda fiyatları borsaya bağlı
değiştiği için ziyaretçi güncel fiyat sormaya yönlendiriliyor.

---

## Teknik notlar

- **Statik export.** Sunucu tarafı özellik kullanılmaz; her sayfa derleme
  anında HTML'e dönüşür.
- **Görseller** derleme öncesi `sharp` ile WebP'ye çevrilir ve hafifçe
  renk uyumlanır (fotoğraflar farklı saatlerde çekildiği için). Uyumlamayı
  kapatmak için `scripts/optimize-images.mjs` içindeki `GRADE = false`.
  Ham `.jpeg` dosyalarına hiç dokunulmaz.
- Galeri ızgarası yalnızca 640px küçük resimleri yükler; 1600px sürüm
  sadece lightbox açılınca istenir.
- **Harici JavaScript kütüphanesi yok.** Lightbox, akordeon, kaydırma
  animasyonları ve dil altyapısı elle yazıldı.
- **Erişilebilirlik:** klavye ile tam gezinme, görünür odak halkası,
  betimleyici `aria-label`'lar, "içeriğe geç" bağlantısı,
  `prefers-reduced-motion` desteği. Mobil menü kapalıyken `visibility` ve
  `inert` ile sekme sırasından tamamen çıkarılır.
- **SEO:** sayfa+dil bazlı başlık/açıklama, TR↔EN hreflang, canonical,
  `sitemap.xml`, `robots.txt` ve `LocalBusiness` yapılandırılmış verisi.
- JavaScript kapalıysa kaydırma animasyonları devre dışı kalır ve tüm içerik
  görünür olur.
- Site tek temaya (açık) bilinçli olarak bağlıdır: belge estetiği kâğıt
  üzerinde kurulur, koyu sürümü tezi zayıflatırdı.
