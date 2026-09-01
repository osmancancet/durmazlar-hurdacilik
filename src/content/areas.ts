import type { RouteKey } from "@/config/routes";
import type { Locale } from "@/lib/i18n";

/**
 * BÖLGE SAYFALARI — YALNIZCA TÜRKÇE
 *
 * Yerel arama il değil YER adıyla yapılıyor: "kırkağaç hurdacı", "bigadiç
 * hurda alımı", "aliağa tesis sökümü". Tek bir "hizmet bölgelerimiz"
 * sayfası bu sorguların hiçbirini karşılamaz; her yerin kendi sayfası
 * karşılar. Bu dosya o sayfaların içeriğidir.
 *
 * ⚠ EN BÜYÜK RİSK: KAPI SAYFASI (doorway page)
 *
 * Aynı metnin yer adı değiştirilerek yirmi kez basıldığı sayfalar Google'ın
 * açıkça cezalandırdığı şeydir — sıralama getirmez, siteyi aşağı çeker.
 * Bu yüzden buradaki her kaydın `lead`, `profile`, `materials`, `logistics`
 * ve `faq` alanları O YERE ÖZGÜ yazılmıştır: ilçenin gerçek sanayi profili,
 * oradan gerçekten çıkan hurda kalemleri, Soma'ya olan konumu.
 *
 * YENİ BÖLGE EKLERKEN KURAL: o yer hakkında söyleyecek somut bir şeyiniz
 * yoksa sayfa AÇMAYIN. Adı, bağlı olduğu il sayfasının `alsoCovers`
 * listesine yazın — orada bir satır olarak durur, içi boş bir sayfa olarak
 * değil.
 *
 * İçerik kuralı (rehberle aynı): fiyat rakamı, kapasite, referans müşteri
 * adı ve belge numarası GEÇMEZ.
 */

export type Area = {
  /** Adres parçası: /tr/hurdaci/<slug>/ */
  slug: string;
  /** Yerin adı — başlıklarda ve listelerde geçtiği hâli. */
  name: string;
  /** İl sayfası mı, ilçe sayfası mı. Kırıntı yolunun derinliğini belirler. */
  kind: "il" | "ilce";
  /** Bağlı olduğu il. İl sayfalarında kendi adıdır. */
  province: string;
  /** Bağlı olduğu il sayfasının slug'ı — ilçe sayfalarında dolu. */
  provinceSlug?: string;
  /** `<title>`; marka şablonu 23 karakter ekliyor, 39'u geçmemeli. */
  seoTitle: string;
  /** Sayfadaki H1. */
  title: string;
  description: string;
  /** Konum ve Soma'dan erişim — her sayfada farklı. */
  lead: string;
  /** Bölgenin sanayi profili ve oradan çıkan hurda. */
  profile: string[];
  /** O bölgeden en sık çıkan kalemler. */
  materials: string[];
  /** Nakliye, tonaj ve süre — bölgeye göre değişir. */
  logistics: string;
  faq: { question: string; answer: string }[];
  /** İl sayfalarında: kendi sayfası olmayan ama gidilen ilçeler. */
  alsoCovers?: string[];
  /** İlgili rehber yazıları (slug). */
  posts?: string[];
  /** İlgili site sayfaları. */
  related?: RouteKey[];
};

/** Bölge sayfaları yalnızca bu dilde yayımlanır. */
export const AREA_LOCALE: Locale = "tr";

/** Bölgelerin kök adresi. Sonunda / vardır (next.config trailingSlash). */
export const AREA_BASE = "/tr/hurdaci/";

export function areaIndexHref(): string {
  return AREA_BASE;
}

export function areaHref(slug: string): string {
  return `${AREA_BASE}${slug}/`;
}

export function areaBySlug(slug: string): Area | undefined {
  return AREAS.find((area) => area.slug === slug);
}

/** Bir ilin kendi sayfası olan ilçeleri — il sayfası bunları listeler. */
export function districtsOf(provinceSlug: string): Area[] {
  return AREAS.filter((area) => area.provinceSlug === provinceSlug);
}

export const PROVINCES = (): Area[] => AREAS.filter((a) => a.kind === "il");
export const DISTRICTS = (): Area[] => AREAS.filter((a) => a.kind === "ilce");

export const AREAS: Area[] = [
  /* ---------------------------------------------------------------- *
   * MANİSA
   * ---------------------------------------------------------------- */
  {
    slug: "manisa",
    name: "Manisa",
    kind: "il",
    province: "Manisa",
    seoTitle: "Manisa Hurdacı ve Hurda Alımı",
    title: "Manisa'da hurda alımı ve tesis sökümü",
    description:
      "Manisa genelinde endüstriyel hurda alımı, tesis sökümü ve ikinci el makine alım satımı. Soma merkezli ekibimizle Akhisar, Kırkağaç, Turgutlu, Salihli ve Manisa OSB'de çalışıyoruz.",
    lead: "Merkezimiz Manisa'nın kuzeyinde, Soma'da. Bu ilin sanayisini uzaktan değil içinden tanıyoruz: kömür havzasından çıkan ağır çeliği de, organize sanayideki üretim artığını da aynı hafta içinde alıyoruz.",
    profile: [
      "Manisa, Ege'nin en çok üreten illerinden biri ve çıkan hurda da bu çeşitliliği taşıyor. Manisa Organize Sanayi Bölgesi elektronik ve beyaz eşya üretiminin merkezlerinden biri; buradan düzenli olarak sac fire, profil kırpıntısı, kablo ve ambalaj metali çıkıyor. Bu tür üretim artığı için sözleşmeli ve tarihli alım yapıyoruz — yığın büyümeden, üretimi aksatmadan.",
      "İlin kuzeyi ise bambaşka bir hurda üretiyor. Soma linyit havzasında konveyör hattı, kırma-eleme tesisi ve ağır çelik konstrüksiyon; Turgutlu'da kiremit-tuğla fabrikalarının fırın ve taşıma hatları; Akhisar'da zeytinyağı ve salamura tesislerinin paslanmaz ekipmanı. Üçü de farklı iş, farklı ekipman ve farklı değerleme gerektiriyor.",
    ],
    materials: [
      "Üretim artığı sac fire, talaş ve profil kırpıntısı — OSB tesislerinden düzenli alım",
      "Konveyör hattı, tambur, redüktör ve kırma-eleme ekipmanı",
      "Paslanmaz tank, boru ve gıda tesisi ekipmanı",
      "Tarım makinesi, römork şasisi ve sulama borusu",
      "Elektrik motoru, kablo, trafo ve pano hurdası",
      "Komple tesis sökümünden çıkan ağır çelik konstrüksiyon",
    ],
    logistics:
      "Manisa'nın kuzey ilçeleri bizim için günlük mesafe; Soma'dan aynı gün çıkıyoruz. Merkez, Turgutlu ve Salihli tarafında ise bir seferi dolduracak yükleri tercih ediyoruz — bu, ton başına nakliyeyi düşürdüğü için doğrudan size veriyoruz. Kesim, söküm, kepçe, vinç ve nakliye teklifin içindedir.",
    faq: [
      {
        question: "Manisa OSB'deki fabrikalardan düzenli alım yapıyor musunuz?",
        answer:
          "Yapıyoruz. Üretim artığı talaş, sac fire ve profil kırpıntısı için tarihli ve sözleşmeli alım kuruyoruz: yığın belli bir seviyeye geldiğinde ya da anlaşılan gün geldiğinde kamyon sahaya gelir, tartı sizin gözetiminizde yapılır.",
      },
      {
        question: "Manisa'nın hangi ilçelerine geliyorsunuz?",
        answer:
          "Soma, Kırkağaç, Akhisar, Turgutlu, Salihli, Kula ve Gördes'te düzenli çalışıyoruz. Gölmarmara, Demirci ve Selendi tarafına da gidiyoruz. Listede olmayan bir yerdeyseniz konumunuzu yazın — gelip gelemeyeceğimizi aynı gün söyleyelim.",
      },
    ],
    alsoCovers: ["Gölmarmara", "Demirci", "Selendi", "Şehzadeler", "Yunusemre"],
    posts: [
      "soma-hurda-fiyatlari-nasil-belirlenir",
      "fabrika-ve-tesis-sokumu-nasil-yapilir",
    ],
    related: ["services", "materials"],
  },
  {
    slug: "soma",
    name: "Soma",
    kind: "ilce",
    province: "Manisa",
    provinceSlug: "manisa",
    seoTitle: "Soma Hurdacı — Hurda Alımı",
    title: "Soma'da hurdacı: sahamız burada",
    description:
      "Soma'da hurda alımı, maden ve santral ekipmanı sökümü, ikinci el makine satışı. Hürriyet Mahallesi'ndeki sahamıza yükünüzü getirin ya da fotoğrafını gönderin, aynı gün fiyat alın.",
    lead: "Sahamız Soma'da, Hürriyet Mahallesi Rüzgar Sokak'ta. Yani buradaki işlerde nakliye mesafesi neredeyse yok — bu, ton başına maliyeti düşürdüğü için Soma'daki yükler için verdiğimiz rakam çevre ilçelere göre daha güçlü çıkıyor.",
    profile: [
      "Soma bir linyit havzası ve buradan çıkan hurda genel sanayi hurdasına benzemiyor: kalın cidarlı, ağır ve çoğu zaman hâlâ bir işe yarayan parçalar. Kömür ocaklarından ve hazırlama tesislerinden konveyör tamburu, bant şasisi, titreşimli elek, kırıcı merdane, redüktör ve hidrolik ünite çıkıyor. Bunların bir bölümü hurda değil, ikinci el ekipman olarak değerlenmesi gereken parçalar.",
      "İlçedeki küçük sanayi sitesi, atölyeler ve inşaat sahaları da düzenli hurda üretiyor: torna talaşı, sac fire, profil kırpıntısı, hurda araç ve çatı sacı. Sahamıza kendiniz getirebileceğiniz miktarlar için sabit bir alt sınırımız yok; kantar tartımı sizin gözetiminizde yapılır, fiş elinize verilir.",
    ],
    materials: [
      "Konveyör tamburu, bant şasisi ve taşıyıcı konstrüksiyon",
      "Titreşimli elek, elek sacı, kırıcı merdane ve kırma-eleme parçaları",
      "Sondaj borusu, muhafaza borusu ve maden delici uçları",
      "Ray, platform ızgarası, kafes kiriş ve kaynaklı kiriş",
      "Redüktör, elektrik motoru, hidrolik ünite ve pompa",
      "Torna talaşı, sac fire, profil kırpıntısı ve hurda araç",
    ],
    logistics:
      "Soma içinde yerinde alım için mesafe engeli yok; keşfe aynı gün geliyoruz. Küçük miktarları sahamıza kendiniz getirebilir, tartıyı birlikte yapabiliriz. Kesim, söküm, kepçe ve vinç gerektiren işlerde ekipmanla geliyoruz ve bunların hepsi teklifin içinde.",
    faq: [
      {
        question: "Sahanıza yükümü kendim getirebilir miyim?",
        answer:
          "Getirebilirsiniz. Hürriyet Mahallesi, Rüzgar Sokak No: 11, Soma. Sabit bir alt sınırımız yok. Tartı sizin gözetiminizde yapılır, kantar fişi elinize verilir ve ödeme tartı sonrası gerçekleşir.",
      },
      {
        question: "Maden sahasından çıkan ekipmanı toplu alıyor musunuz?",
        answer:
          "Alıyoruz. Konveyör hattı, kırma-eleme tesisi ya da komple bir sahanın ekipmanı toplu değerlendirilebilir. Keşifte çalışır ekipman ile hurdayı ayırıp iki kalemi ayrı yazıyoruz — çalışır bir redüktörü hurda tonajına yazmak sahibinin zararına olur.",
      },
      {
        question: "Soma'da ikinci el ekipman satışınız var mı?",
        answer:
          "Var. Sahamızda konveyör tamburu, redüktör, elektrik motoru, tank, damper kasa ve büyük çaplı boru bulunuyor. Hepsi çalışır durumda değildir; hangisinin çalıştığını, hangisinin yedek parçalık olduğunu açıkça söyleriz.",
      },
    ],
    posts: [
      "maden-ve-termik-santral-hurdasi",
      "soma-hurda-fiyatlari-nasil-belirlenir",
      "hurda-kantar-tartimi-ve-odeme",
    ],
    related: ["gallery", "contact"],
  },
  {
    slug: "kirkagac",
    name: "Kırkağaç",
    kind: "ilce",
    province: "Manisa",
    provinceSlug: "manisa",
    seoTitle: "Kırkağaç Hurdacı ve Hurda Alımı",
    title: "Kırkağaç'ta hurda alımı",
    description:
      "Kırkağaç'ta hurda demir, tarım makinesi, sulama borusu ve hurda araç alımı. Soma'ya komşu ilçe olduğumuz için keşfe aynı gün geliyoruz; kesim, yükleme ve nakliye teklife dahil.",
    lead: "Kırkağaç, Soma'nın kuzey komşusu — aramızda yarım saatlik bir yol var. Bu yüzden buradaki işlerde \"ne zaman gelirsiniz\" sorusunun cevabı çoğu zaman aynı gün oluyor.",
    profile: [
      "Kırkağaç ağırlıklı olarak bir tarım ilçesi ve çıkan hurdanın büyük bölümü de tarımdan geliyor: ömrünü doldurmuş traktör ve römork, biçerdöver parçaları, sulama borusu ve pompa, silo ve depo çatı sacı. Bunlar dağınık ve hafif göründükleri için sahipleri çoğu zaman değerini küçümsüyor; oysa bir sulama tesisatı ya da eski bir römork şasisi tek başına ciddi tonaj tutar.",
      "İlçedeki küçük sanayi ve atölyelerden ise torna talaşı, sac fire, kaynak artığı ve elektrik motoru çıkıyor. Demiryolu hattı üzerinde bir ilçe olması nedeniyle zaman zaman ray, travers bağlantı elemanı ve ağır çelik de geliyor.",
    ],
    materials: [
      "Traktör, römork ve tarım makinesi hurdası",
      "Sulama borusu, pompa ve motopomp",
      "Silo, depo çatı sacı ve galvaniz konstrüksiyon",
      "Torna talaşı, sac fire ve atölye artığı",
      "Elektrik motoru, kablo ve pano hurdası",
      "Hurda araç ve üst yapı",
    ],
    logistics:
      "Soma'ya komşu olduğumuz için Kırkağaç günlük çalışma alanımız. Yerinde alım için sabit bir tonaj eşiğimiz yok; dağınık duran tarım hurdasını toplamak için kepçe ve kamyonla geliyoruz. Küçük miktarları Soma'daki sahamıza kendiniz de getirebilirsiniz.",
    faq: [
      {
        question: "Kırkağaç'a keşfe ne zaman gelebiliyorsunuz?",
        answer:
          "Genellikle aynı gün ya da ertesi gün. Soma'ya komşu olduğumuz için Kırkağaç bizim için günlük mesafe; fotoğraf gönderdikten sonra saha keşfi için gün vermemiz uzun sürmüyor.",
      },
      {
        question: "Tarlada dağınık duran hurdayı da alıyor musunuz?",
        answer:
          "Alıyoruz. Dağınık duran tarım hurdasını toplamak için kepçe ve kamyonla geliyoruz; toplama, yükleme ve nakliye verdiğimiz teklifin içindedir, ayrıca bir masraf çıkarmıyoruz.",
      },
    ],
    posts: ["soma-hurda-fiyatlari-nasil-belirlenir", "makineniz-hurda-mi-ikinci-el-mi"],
    related: ["materials", "contact"],
  },
  {
    slug: "akhisar",
    name: "Akhisar",
    kind: "ilce",
    province: "Manisa",
    provinceSlug: "manisa",
    seoTitle: "Akhisar Hurdacı ve Hurda Alımı",
    title: "Akhisar'da hurda alımı ve tesis sökümü",
    description:
      "Akhisar'da endüstriyel hurda alımı: zeytin ve gıda tesislerinden paslanmaz tank ve boru, OSB'den üretim artığı, tarım makinesi hurdası. Keşif, kesim, yükleme ve nakliye tek elden.",
    lead: "Akhisar, Manisa'nın en büyük ilçelerinden biri ve kendi organize sanayi bölgesi olan bir üretim merkezi. Soma'dan yaklaşık bir saatlik yol; burada hem tesis sökümü hem düzenli üretim artığı alımı yapıyoruz.",
    profile: [
      "Akhisar zeytin ve tütünle bilinir ve bu, çıkan hurdanın karakterini doğrudan belirliyor. Zeytinyağı fabrikaları, salamura ve işleme tesisleri paslanmaz ağırlıklı ekipman kullanıyor: tank, karıştırıcı, boru hattı, pres ve elek. Paslanmaz, karışık demir yığınına girdiğinde değerinin çok altında satılan bir kalem — bu yüzden bu tesislerdeki işlerde ayrıştırmayı sahada yapıyoruz.",
      "Akhisar Organize Sanayi Bölgesi'ndeki tesislerden ise klasik üretim artığı geliyor: sac fire, profil kırpıntısı, talaş, ambalaj metali ve kablo. Bunlar için tarihli ve sözleşmeli alım kuruyoruz. İlçenin tarım tarafından da traktör, römork, sulama tesisatı ve depo konstrüksiyonu çıkıyor.",
    ],
    materials: [
      "Paslanmaz tank, karıştırıcı, boru ve gıda tesisi ekipmanı",
      "Zeytinyağı ve salamura tesislerinden pres, elek ve pompa",
      "OSB tesislerinden sac fire, profil kırpıntısı ve talaş",
      "Elektrik motoru, redüktör ve pano hurdası",
      "Tarım makinesi, römork ve sulama tesisatı",
      "Depo ve sundurma çelik konstrüksiyonu",
    ],
    logistics:
      "Akhisar'a düzenli gidiyoruz; keşif için gün vermek birkaç günü geçmiyor. OSB'deki tesisler için tarihli alım kuruyoruz — üretim aksamadan, yığın büyümeden. Kesim, söküm, kepçe, vinç ve nakliye teklifin içindedir.",
    faq: [
      {
        question: "Paslanmaz ekipmanı ayrı mı değerlendiriyorsunuz?",
        answer:
          "Ayrı değerlendiriyoruz ve bu, gıda tesislerinde en önemli maddedir. Paslanmaz karışık demir yığınına girdiğinde en düşük kalemden değerlenir. Sökümü sahada ayrıştırarak yapıyoruz ve paslanmaz kalemini teklifte ayrı yazıyoruz.",
      },
      {
        question: "Akhisar OSB'de sözleşmeli alım yapıyor musunuz?",
        answer:
          "Yapıyoruz. Üretim artığı talaş, sac fire ve profil kırpıntısı için anlaşılan gün ya da anlaşılan doluluk seviyesinde kamyon geliyor. Tartı sizin gözetiminizde yapılır, evrak muhasebenizin isteyeceği biçimde düzenlenir.",
      },
    ],
    posts: [
      "fabrika-ve-tesis-sokumu-nasil-yapilir",
      "hurda-metal-ayristirma-rehberi",
    ],
    related: ["services", "materials"],
  },
  {
    slug: "turgutlu",
    name: "Turgutlu",
    kind: "ilce",
    province: "Manisa",
    provinceSlug: "manisa",
    seoTitle: "Turgutlu Hurda Alımı ve Söküm",
    title: "Turgutlu'da hurda alımı ve fabrika sökümü",
    description:
      "Turgutlu'da kiremit-tuğla fabrikalarından fırın arabası, konveyör ve çelik konstrüksiyon; sanayiden üretim artığı alımı. Söküm, kesim, yükleme ve nakliye tek elden.",
    lead: "Turgutlu, kiremit ve tuğla sanayisiyle bilinen bir üretim ilçesi. Buradaki hurdanın çoğu bir fırın hattının ya da taşıma sisteminin parçası — yani sökülmesi gereken, yığın hâlinde beklemeyen hurda.",
    profile: [
      "Kiremit-tuğla tesislerinde en çok yenilenen şey taşıma ve pişirme hattıdır: fırın arabası ve şasisi, vagonet, ray, konveyör bandı taşıyıcıları, kurutma odası konstrüksiyonu ve baca-kanal sacı. Bunlar ısıya çalışmış, ağır ve çoğu zaman yerine sabitlenmiş parçalar; kesim ve vinç olmadan sahadan çıkmazlar. İşin bu tarafı bizde: kesim, söküm ve yükleme teklifin içinde.",
      "İlçedeki döküm ve metal işleme atölyeleri ile makine imalatçılarından ise talaş, sac fire, döküm artığı ve ıskarta parça çıkıyor. Bu tür düzenli üretim artığı için tarihli alım kuruyoruz; yığın büyüyüp saha işgal etmeden alınır.",
    ],
    materials: [
      "Fırın arabası, vagonet ve ray hattı",
      "Konveyör taşıyıcı, tambur ve redüktör",
      "Kurutma odası ve baca-kanal sacı",
      "Döküm artığı, talaş ve ıskarta parça",
      "Elektrik motoru, pano ve kablo hurdası",
      "Ağır çelik konstrüksiyon ve platform",
    ],
    logistics:
      "Turgutlu, Soma'ya göre daha uzak bir mesafede; burada bir seferi dolduracak yükler ya da söküm işleri daha mantıklı çalışıyor. Söz konusu bir hat sökümüyse mesafe belirleyici olmuyor — ekip ve ekipmanla geliyoruz.",
    faq: [
      {
        question: "Fabrika içindeki hattı üretim dururken mi söküyorsunuz?",
        answer:
          "Programı sizin üretiminize göre kuruyoruz. Keşifte hangi bölümün ne zaman boşalacağı yazılır ve söküm o pencereye göre planlanır; kalacak hatlar da aynı belgede işaretlenir ki iş sırasında karar vermek zorunda kalınmasın.",
      },
      {
        question: "Isıya çalışmış çelik hurdanın değeri düşer mi?",
        answer:
          "Isıl geçmiş, çelik hurdasının kalemini değiştirmez; belirleyici olan kalınlık, temizlik ve içinde refrakter, tuğla veya beton kalıntısı olup olmamasıdır. Bunlar ayrılabildiği ölçüde ton başına rakam yükselir.",
      },
    ],
    posts: ["fabrika-ve-tesis-sokumu-nasil-yapilir", "makineniz-hurda-mi-ikinci-el-mi"],
    related: ["services", "gallery"],
  },
  {
    slug: "salihli",
    name: "Salihli",
    kind: "ilce",
    province: "Manisa",
    provinceSlug: "manisa",
    seoTitle: "Salihli Hurdacı ve Hurda Alımı",
    title: "Salihli'de hurda alımı",
    description:
      "Salihli'de gıda ve tarım tesislerinden paslanmaz ekipman, jeotermal sera hatlarından boru ve konstrüksiyon, sanayiden üretim artığı alımı. Keşif ve nakliye bizden.",
    lead: "Salihli, tarımı ve sanayisi iç içe geçmiş bir ilçe: bir yanda gıda işleme tesisleri, öbür yanda jeotermal kaynaklı seracılık ve maden-mermer işletmeleri. Çıkan hurda da bu üçünün karışımı.",
    profile: [
      "Gıda ve tarımsal işleme tesislerinden paslanmaz tank, boru, elek ve pompa çıkıyor; un, yem ve kurutma tesislerinde ise elevatör, helezon konveyör, siklon ve depo silosu. Bunların bir bölümü çalışır durumda sökülüyor ve ikinci el olarak değerlenmesi gerekiyor — hurda tonajına yazıldığında sahibinin parası yığının içinde eriyor.",
      "Jeotermal seracılıkta kullanılan boru hatları, ısı değiştirici ve sera konstrüksiyonu da düzenli hurda üretiyor. Mermer ve maden işletmelerinden ise kırma-eleme parçaları, konveyör ve iş makinesi kovası geliyor.",
    ],
    materials: [
      "Paslanmaz tank, boru, elek ve gıda tesisi ekipmanı",
      "Elevatör, helezon konveyör, siklon ve depo silosu",
      "Jeotermal boru hattı ve ısı değiştirici",
      "Sera konstrüksiyonu ve galvaniz profil",
      "Kırma-eleme parçaları ve iş makinesi kovası",
      "Elektrik motoru, redüktör ve pompa",
    ],
    logistics:
      "Salihli, Soma'dan bakınca ilin öbür ucunda; burada bir seferi dolduracak yükleri ve söküm işlerini tercih ediyoruz. Tonajı büyük işlerde mesafe belirleyici olmuyor — keşfe geliyoruz ve kesin teklifi sahada veriyoruz.",
    faq: [
      {
        question: "Salihli'ye tek kamyonluk yük için de geliyor musunuz?",
        answer:
          "Geliyoruz, ama bu mesafede yükün bir kamyonu doldurması ton başına belirgin biçimde daha iyi bir rakam çıkarır. Elinizdeki miktar azsa yine de yazın; yakın tarihte o bölgeye çıkan bir seferimiz varsa birleştirebiliyoruz.",
      },
      {
        question: "Çalışır durumdaki tesis ekipmanını ayrı mı alıyorsunuz?",
        answer:
          "Ayrı alıyoruz. Çalışır bir pompa, redüktör ya da paslanmaz tank hurda tonaj fiyatının üzerinde ikinci el olarak değerlenir. Keşifte hangi kalemin çalışır durumda olduğunu ayrıca belirtiyoruz.",
      },
    ],
    posts: ["makineniz-hurda-mi-ikinci-el-mi", "hurda-metal-ayristirma-rehberi"],
    related: ["materials", "services"],
  },
  {
    slug: "kula",
    name: "Kula",
    kind: "ilce",
    province: "Manisa",
    provinceSlug: "manisa",
    seoTitle: "Kula Hurdacı ve Hurda Alımı",
    title: "Kula'da hurda alımı",
    description:
      "Kula'da atölye ve fabrika hurdası, deri-tekstil tesislerinden kazan ve makine, tarım hurdası alımı. Fotoğrafını gönderin, aynı gün ön fiyat söyleyelim.",
    lead: "Kula, uzun yıllar deri ve tekstil üretimiyle anılmış bir ilçe. Bugün o tesislerin bir bölümü kapanmış ya da küçülmüş durumda — geride kalan makine ve kazan dairesi ekipmanı hâlâ ciddi bir değer taşıyor.",
    profile: [
      "Kapanmış ya da hat değiştirmiş deri ve tekstil tesislerinden buhar kazanı, boru hattı, dolap ve tambur makineleri, elektrik motoru ve pano çıkıyor. Bu tür sahalarda en sık yapılan hata, hâlâ çalışan ya da yedek parçası aranan makineleri hurda tonajına yazmak. Keşifte bu ayrımı yapıp iki kalemi ayrı yazıyoruz.",
      "İlçenin tarım tarafından ise traktör, römork, sulama tesisatı ve depo sacı geliyor. Jeotermal kaynakların kullanıldığı işletmelerde boru hattı ve ısı değiştirici de düzenli hurda üretiyor.",
    ],
    materials: [
      "Buhar kazanı, boru hattı ve kazan dairesi ekipmanı",
      "Deri ve tekstil makineleri, tambur ve dolaplar",
      "Elektrik motoru, pano, kablo ve trafo",
      "Traktör, römork ve tarım makinesi hurdası",
      "Depo sacı, galvaniz profil ve konstrüksiyon",
      "Jeotermal boru ve ısı değiştirici",
    ],
    logistics:
      "Kula, Soma'dan uzak bir ilçe; burada söküm işleri ve bir seferi dolduracak yükler çalışıyor. Komple bir tesisin boşaltılması söz konusuysa mesafe engel değil — ekip, kesim ekipmanı ve kamyonla geliyoruz.",
    faq: [
      {
        question: "Kapanmış bir fabrikanın tamamını alıyor musunuz?",
        answer:
          "Alıyoruz. Komple tesis sökümünde makine, hat ve konstrüksiyon birlikte değerlendirilir; çalışır ekipman ile hurda ayrı kalemler olarak yazılır. Saha, kalıntısı kaldırılmış hâlde teslim edilir.",
      },
      {
        question: "Eski makinelerin çalışıp çalışmadığını nasıl anlıyorsunuz?",
        answer:
          "Keşifte yerinde bakıyoruz; etiketi okunabilen ve gövdesi sağlam olan makineler ikinci el olarak değerlenir. Etiketi silinmiş bir makine ancak tahminle değerlenir ve tahmin daima aşağı yönlüdür — bu yüzden etiketleri sökmeyin.",
      },
    ],
    posts: ["makineniz-hurda-mi-ikinci-el-mi", "fabrika-ve-tesis-sokumu-nasil-yapilir"],
    related: ["services", "contact"],
  },
  {
    slug: "gordes",
    name: "Gördes",
    kind: "ilce",
    province: "Manisa",
    provinceSlug: "manisa",
    seoTitle: "Gördes Hurdacı ve Hurda Alımı",
    title: "Gördes'te hurda alımı",
    description:
      "Gördes'te maden sahalarından kırma-eleme ve konveyör ekipmanı, iş makinesi parçaları ve tarım hurdası alımı. Kesim, yükleme ve nakliye teklife dahil.",
    lead: "Gördes, zeolit madenciliğiyle bilinen bir ilçe. Maden sahası olan her yerde olduğu gibi burada da çıkan hurdanın karakteri ağır: aşınma parçaları, taşıma hatları ve iş makinesi ekipmanı.",
    profile: [
      "Açık ocak ve kırma-eleme tesislerinden kırıcı merdane, çene astarı, titreşimli elek ve elek sacı, konveyör tamburu ve bant şasisi çıkıyor. Bunlar aşınma parçası olduğu için çoğu zaman yarı ömürlü sökülüyor: aşınmış bir merdane hurdadır ama gövdesi sağlam bir elek kasası başka bir sahada kullanılabilir. Ayrımı görmeden yapmak mümkün değil, bu yüzden burada saha keşfi neredeyse zorunlu.",
      "İş makinesi tarafından kova, kepçe dişi, palet ve şasi parçaları geliyor. İlçenin tarım ve orman işletmelerinden ise römork, sulama tesisatı ve depo sacı çıkıyor.",
    ],
    materials: [
      "Kırıcı merdane, çene astarı ve kırma-eleme parçaları",
      "Titreşimli elek, elek sacı ve kasası",
      "Konveyör tamburu, bant şasisi ve redüktör",
      "İş makinesi kovası, kepçe dişi ve palet",
      "Ağır çelik konstrüksiyon ve platform ızgarası",
      "Römork, tarım makinesi ve depo sacı",
    ],
    logistics:
      "Gördes'e keşif ve alım için gidiyoruz; maden sahalarındaki işlerde tonaj yüksek olduğu için mesafe belirleyici olmuyor. Kesim, kepçe, vinç ve nakliye teklifin içindedir.",
    faq: [
      {
        question: "Aşınmış maden ekipmanının değeri var mı?",
        answer:
          "Var. Aşınma parçaları kalın cidarlı olduğu için küçük görünen bir parça bile ciddi tonaj tutar. Gövdesi ve mili sağlam olan parçalarda ayrıca yeniden kullanılabilirlik değerlendirilir.",
      },
      {
        question: "Maden sahasında kesim yapabiliyor musunuz?",
        answer:
          "Yapıyoruz. Kesim, söküm, kepçe ve vinç verdiğimiz teklifin içinde; sahaya kendi ekibimiz ve ekipmanımızla geliyoruz.",
      },
    ],
    posts: ["maden-ve-termik-santral-hurdasi", "soma-hurda-fiyatlari-nasil-belirlenir"],
    related: ["gallery", "materials"],
  },

  /* ---------------------------------------------------------------- *
   * BALIKESİR
   * ---------------------------------------------------------------- */
  {
    slug: "balikesir",
    name: "Balıkesir",
    kind: "il",
    province: "Balıkesir",
    seoTitle: "Balıkesir Hurdacı ve Hurda Alımı",
    title: "Balıkesir'de hurda alımı ve tesis sökümü",
    description:
      "Balıkesir genelinde endüstriyel hurda alımı ve tesis sökümü. Savaştepe, Sındırgı, Bigadiç ve Dursunbey Soma'ya komşu mesafede; maden, tarım ve sanayi hurdası alıyoruz.",
    lead: "Balıkesir, Soma'nın kuzey komşusu. İlin güney ilçeleri — Savaştepe, Sındırgı, Bigadiç, Dursunbey — bizim için günlük mesafe; oralarda çalışmak için özel bir sefer kurmamız gerekmiyor.",
    profile: [
      "Balıkesir'in güneyi bir madencilik kuşağı. Bigadiç bor işletmeleri, Sındırgı'daki maden sahaları ve Dursunbey çevresindeki linyit ocakları ağır ekipman kullanıyor: konveyör hatları, kırma-eleme tesisleri, kalın sac, ray ve iş makinesi parçaları. Bu tür işlerde çıkan tonaj yüksek ve ekipmanın bir bölümü hâlâ kullanılabilir durumda oluyor.",
      "İlin tarım ve hayvancılıkta güçlü olması ise başka bir hurda kalemi üretiyor: yem fabrikaları, süt işleme tesisleri, sulama sistemleri, silo ve ahır konstrüksiyonu. Gıda tesislerinde paslanmaz ağırlıklı ekipman çıkıyor ve bunun ayrı değerlenmesi gerekiyor.",
    ],
    materials: [
      "Maden sahalarından konveyör, kırma-eleme ve ağır çelik",
      "Kalın sac, ray, platform ızgarası ve kaynaklı kiriş",
      "Paslanmaz tank, boru ve gıda tesisi ekipmanı",
      "Yem, un ve süt tesislerinden elevatör, siklon ve silo",
      "Traktör, römork, sulama tesisatı ve tarım makinesi",
      "Elektrik motoru, redüktör, hidrolik ünite ve pompa",
    ],
    logistics:
      "İlin güney ilçelerine aynı gün çıkabiliyoruz. Balıkesir merkez, Bandırma ve kuzey ilçelerinde ise bir seferi dolduracak yükleri ve söküm işlerini tercih ediyoruz. Kesim, söküm, kepçe, vinç ve nakliye teklifin içindedir.",
    faq: [
      {
        question: "Balıkesir'in hangi ilçelerine geliyorsunuz?",
        answer:
          "Savaştepe, Sındırgı, Bigadiç ve Dursunbey düzenli çalıştığımız yerler; İvrindi ve Balıkesir merkeze de gidiyoruz. Tonajı büyük işlerde ilin kuzeyine de çıkıyoruz — konumunuzu yazın, aynı gün cevap verelim.",
      },
      {
        question: "Maden sahasındaki komple ekipmanı alıyor musunuz?",
        answer:
          "Alıyoruz. Konveyör hattı, kırma-eleme tesisi veya komple bir sahanın ekipmanı toplu değerlendirilebilir. Çalışır ekipman ile hurdayı keşifte ayırıp iki kalemi ayrı yazıyoruz.",
      },
    ],
    alsoCovers: ["İvrindi", "Balıkesir Merkez", "Bandırma", "Kepsut"],
    posts: ["maden-ve-termik-santral-hurdasi", "fabrika-ve-tesis-sokumu-nasil-yapilir"],
    related: ["services", "materials"],
  },
  {
    slug: "savastepe",
    name: "Savaştepe",
    kind: "ilce",
    province: "Balıkesir",
    provinceSlug: "balikesir",
    seoTitle: "Savaştepe Hurdacı — Hurda Alımı",
    title: "Savaştepe'de hurda alımı",
    description:
      "Savaştepe'de hurda demir, tarım makinesi, hurda araç ve atölye artığı alımı. Soma'ya en yakın Balıkesir ilçesi olduğu için keşfe aynı gün geliyoruz.",
    lead: "Savaştepe, Soma'ya en yakın Balıkesir ilçesi ve aramızdaki karayolu doğrudan. Buradaki işlerde nakliye mesafesi kısa olduğu için verdiğimiz rakam da güçlü çıkıyor.",
    profile: [
      "Savaştepe ağırlıklı olarak tarım ve hayvancılık ilçesi. Çıkan hurdanın büyük bölümü buradan geliyor: ömrünü doldurmuş traktör ve römork, sulama tesisatı, yem hazırlama ekipmanı, ahır ve depo konstrüksiyonu, galvaniz çatı sacı. Dağınık duran bu tür hurda tek başına az görünür ama toplandığında ciddi tonaj tutar.",
      "İlçe merkezindeki atölye ve tamirhanelerden torna talaşı, sac fire, kaynak artığı ve hurda araç parçası çıkıyor. Karayolu üzerinde olması nedeniyle hurdaya ayrılacak araç ve üst yapı işleri de düzenli geliyor.",
    ],
    materials: [
      "Traktör, römork ve tarım makinesi hurdası",
      "Sulama tesisatı, boru ve pompa",
      "Ahır, depo ve sundurma konstrüksiyonu, galvaniz çatı sacı",
      "Torna talaşı, sac fire ve atölye artığı",
      "Hurda araç, damper kasa ve üst yapı",
      "Elektrik motoru ve kablo hurdası",
    ],
    logistics:
      "Soma'ya en yakın Balıkesir ilçesi olduğu için Savaştepe günlük çalışma alanımız; keşfe aynı gün ya da ertesi gün geliyoruz. Küçük miktarlar için Soma'daki sahamıza kendiniz de getirebilirsiniz.",
    faq: [
      {
        question: "Savaştepe'ye ne kadar sürede gelebiliyorsunuz?",
        answer:
          "Genellikle aynı gün. Savaştepe Soma'ya en yakın Balıkesir ilçesi; fotoğraf gönderdikten sonra keşif için gün vermemiz uzun sürmüyor.",
      },
      {
        question: "Hurdaya ayrılacak aracın evraklarında yardımcı oluyor musunuz?",
        answer:
          "Hangi belgelerin gerektiği konusunda yönlendirme yapıyoruz. İşlemler resmî kurumlar üzerinden yürüdüğü için süreç boyunca ne yapmanız gerektiğini adım adım anlatıyoruz.",
      },
    ],
    posts: ["soma-hurda-fiyatlari-nasil-belirlenir", "hurda-kantar-tartimi-ve-odeme"],
    related: ["materials", "contact"],
  },
  {
    slug: "sindirgi",
    name: "Sındırgı",
    kind: "ilce",
    province: "Balıkesir",
    provinceSlug: "balikesir",
    seoTitle: "Sındırgı Hurdacı ve Hurda Alımı",
    title: "Sındırgı'da hurda alımı ve maden ekipmanı",
    description:
      "Sındırgı'da maden sahalarından konveyör, kırma-eleme ve ağır çelik hurdası; tarım ve atölye hurdası alımı. Kesim, yükleme ve nakliye teklife dahil.",
    lead: "Sındırgı, Soma'nın kuzeybatısında; madencilik ve termal kaynaklarıyla bilinen bir ilçe. Buradaki işlerin çoğu maden sahalarından geliyor ve tonajı yüksek oluyor.",
    profile: [
      "Maden sahalarından ve hazırlama tesislerinden çıkan ekipman ağır: kırıcı merdane, titreşimli elek, konveyör tamburu ve bant şasisi, sondaj borusu, kalın sac ve ağır çelik konstrüksiyon. Bu kalemlerin bir bölümü kullanılabilir durumda söküldüğü için hurda tonajına yazılmadan önce ayrı değerlendirilmesi gerekiyor.",
      "İlçenin tarım ve hayvancılık tarafından traktör, römork, sulama tesisatı ve depo konstrüksiyonu; termal tesislerinden ise boru hattı, kazan ve ısı değiştirici çıkıyor.",
    ],
    materials: [
      "Kırıcı merdane, titreşimli elek ve kırma-eleme parçaları",
      "Konveyör tamburu, bant şasisi ve redüktör",
      "Sondaj borusu, muhafaza borusu ve delici uçlar",
      "Kalın sac, ray ve ağır çelik konstrüksiyon",
      "Boru hattı, kazan ve ısı değiştirici",
      "Traktör, römork ve tarım makinesi hurdası",
    ],
    logistics:
      "Sındırgı Soma'ya komşu mesafede; keşif için gün vermek birkaç günü geçmiyor. Maden sahalarındaki işlerde kesim ekipmanı, kepçe ve vinçle geliyoruz; hepsi teklifin içinde.",
    faq: [
      {
        question: "Maden sahasındaki hurdayı yerinde mi tartıyorsunuz?",
        answer:
          "Tartı, anlaşılan kantarda ve sizin gözetiminizde yapılır. Birden fazla sefer çıkan işlerde her sefer ayrı tartılır ve ayrı fişlenir; toplam, elinizdeki fişlerin toplamıdır.",
      },
      {
        question: "Sondaj borusunu kesilmiş hâlde mi almanız gerekiyor?",
        answer:
          "Gerekmiyor ve kesmemeniz daha iyi. Kalın cidarlı borular bütün hâlde ve ölçüsü belliyken daha iyi değerlenir; kesilip karışık hurdaya karıştığında değerinin altında satılır.",
      },
    ],
    posts: ["maden-ve-termik-santral-hurdasi", "hurda-kantar-tartimi-ve-odeme"],
    related: ["gallery", "services"],
  },
  {
    slug: "bigadic",
    name: "Bigadiç",
    kind: "ilce",
    province: "Balıkesir",
    provinceSlug: "balikesir",
    seoTitle: "Bigadiç Hurda Alımı ve Söküm",
    title: "Bigadiç'te hurda alımı ve tesis sökümü",
    description:
      "Bigadiç'te maden ve konsantratör tesislerinden konveyör, kırma-eleme, kalın sac ve iş makinesi hurdası alımı. Ağır tonaj işlerinde ekip ve ekipmanla geliyoruz.",
    lead: "Bigadiç, bor madenleriyle bilinen bir ilçe ve buradaki açık ocak işletmeleri ağır ekipman kullanıyor. Çıkan hurdanın karakteri buna göre: kalın, ağır ve aşınmış.",
    profile: [
      "Açık ocak ve konsantratör tesislerinden konveyör hatları, kırma-eleme ekipmanı, titreşimli elek, silo ve bunker sacı, ağır çelik konstrüksiyon ve iş makinesi parçaları çıkıyor. Bu tesislerde ekipman aşınma nedeniyle düzenli yenilendiği için hurda bir defalık değil, süreklilik taşıyan bir akış oluyor — bu tür sahalar için tarihli ve sözleşmeli alım kuruyoruz.",
      "Aşınmış kalemler kalın cidarlı olduğu için tonajı yüksek; küçük görünen bir merdane ya da astar bile ciddi ağırlık tutar. Kesim ve yükleme gerektiren bu işlere kendi ekibimiz ve ekipmanımızla geliyoruz.",
    ],
    materials: [
      "Konveyör hattı, tambur, bant şasisi ve redüktör",
      "Kırıcı merdane, çene astarı ve aşınma plakaları",
      "Titreşimli elek, elek sacı ve kasası",
      "Silo, bunker sacı ve kalın cidarlı konstrüksiyon",
      "İş makinesi kovası, kepçe dişi ve palet",
      "Hidrolik ünite, pompa ve elektrik motoru",
    ],
    logistics:
      "Bigadiç, Soma'ya komşu mesafede ve buradaki işler genellikle yüksek tonajlı; birden fazla sefer çıkan işlerde her sefer ayrı tartılır ve ayrı fişlenir. Kesim, kepçe, vinç ve nakliye teklifin içindedir.",
    faq: [
      {
        question: "Sürekli hurda çıkan bir tesisiz, düzenli alım yapıyor musunuz?",
        answer:
          "Yapıyoruz. Anlaşılan gün ya da anlaşılan doluluk seviyesinde kamyon sahaya gelir; her sefer ayrı tartılır ve fişlenir. Bu düzen, yığının saha işgal etmesini ve iş güvenliği riski oluşturmasını da engelliyor.",
      },
      {
        question: "Aşınma plakaları ve astarlar ayrı mı değerlenir?",
        answer:
          "Kalınlığı ve alaşımı nedeniyle bu parçalar sıradan sac hurdasından ayrı konuşulur. Sökülürken bunları ayrı bir yığına almak, karışık yükte kaybolmalarını önler.",
      },
    ],
    posts: ["maden-ve-termik-santral-hurdasi", "soma-hurda-fiyatlari-nasil-belirlenir"],
    related: ["services", "gallery"],
  },
  {
    slug: "dursunbey",
    name: "Dursunbey",
    kind: "ilce",
    province: "Balıkesir",
    provinceSlug: "balikesir",
    seoTitle: "Dursunbey Hurdacı ve Hurda Alımı",
    title: "Dursunbey'de hurda alımı",
    description:
      "Dursunbey'de kereste tesislerinden bıçkı hattı ve kazan, maden sahalarından ağır çelik, tarım hurdası alımı. Keşif, kesim ve nakliye tek elden.",
    lead: "Dursunbey, orman ürünleri ve keresteciliğiyle bilinen, aynı zamanda linyit çıkarılan bir ilçe. İkisi de kendine özgü bir hurda üretiyor.",
    profile: [
      "Kereste ve orman ürünleri tesislerinden bıçkı ve testere hatları, taşıma konveyörleri, kurutma fırını ve buhar kazanı, siklon ve toz toplama tesisatı çıkıyor. Bu tesislerde en çok yenilenen kalem taşıma ve kurutma tarafı; sökümü kesim ve vinç gerektiriyor.",
      "Linyit ocaklarından ve hazırlama tesislerinden ise konveyör, elek, kırıcı parçaları ve ağır çelik konstrüksiyon geliyor. İlçenin tarım tarafından traktör, römork ve depo konstrüksiyonu çıkıyor.",
    ],
    materials: [
      "Bıçkı ve testere hattı, taşıma konveyörü",
      "Buhar kazanı, kurutma fırını ve boru hattı",
      "Siklon, toz toplama tesisatı ve fan",
      "Konveyör, elek ve kırıcı parçaları",
      "Ağır çelik konstrüksiyon ve platform",
      "Traktör, römork ve depo konstrüksiyonu",
    ],
    logistics:
      "Dursunbey'e düzenli gidiyoruz; söküm gerektiren işlerde ekip ve kesim ekipmanıyla geliyoruz. Bir seferi dolduracak yüklerde ton başına rakam belirgin biçimde yükseliyor.",
    faq: [
      {
        question: "Kazan ve boru hattını siz mi söküyorsunuz?",
        answer:
          "Biz söküyoruz. Ama kapalı hacimlerde ilk adım kesim değil, izolasyondur: basınçlı hatlar boşaltılmadan ve içinde kalan akışkan alınmadan hiçbir gövdeye kesme aleti değmez. Bu adım teklifin ve programın içinde yazılıdır.",
      },
      {
        question: "Ahşap ve metal karışık yükleri alıyor musunuz?",
        answer:
          "Ayrıştırmayı biz yapıyoruz. Ancak ahşap, beton ve toprak tartıda ağırlık yapar, değerde ağırlık yapmaz — mümkün olduğunca ayrılmış bir yük her zaman daha iyi bir rakam getirir.",
      },
    ],
    posts: ["fabrika-ve-tesis-sokumu-nasil-yapilir", "hurda-metal-ayristirma-rehberi"],
    related: ["services", "materials"],
  },

  /* ---------------------------------------------------------------- *
   * İZMİR
   * ---------------------------------------------------------------- */
  {
    slug: "izmir",
    name: "İzmir",
    kind: "il",
    province: "İzmir",
    seoTitle: "İzmir Hurdacı ve Hurda Alımı",
    title: "İzmir'de hurda alımı ve tesis sökümü",
    description:
      "İzmir'de endüstriyel hurda alımı ve tesis sökümü. Kınık ve Bergama Soma'ya komşu mesafede; Aliağa, Dikili ve sanayi bölgelerinde söküm ve toplu alım yapıyoruz.",
    lead: "İzmir'in kuzey ilçeleri — Kınık ve Bergama — Soma'ya komşu; oralara günlük çıkıyoruz. İlin sanayi merkezlerinde ise söküm ve bir seferi dolduracak toplu alım işleri yapıyoruz.",
    profile: [
      "İzmir, Ege'nin sanayi merkezi ve hurda akışının da vardığı yer. Aliağa demir-çelik ve gemi geri dönüşüm bölgesiyle Türkiye'nin en büyük hurda tüketim noktalarından biri; çevre illerden toplanan hurdanın önemli bölümü buraya gidiyor. Bizim buradaki işimiz o zincirin öbür ucunda: sanayi tesislerinden hurda alımı, hat ve tesis sökümü.",
      "İlin kuzeyi ise bambaşka: Kınık'ta linyit ocakları, Bergama'da tarım, gıda ve madencilik, Dikili'de jeotermal seracılık. Bu ilçelerden çıkan hurda maden ve tarım ekipmanı ağırlıklı ve Soma'daki sahamıza en yakın işler bunlar.",
    ],
    materials: [
      "Sanayi tesislerinden üretim artığı sac fire, talaş ve profil",
      "Hat ve tesis sökümünden ağır çelik konstrüksiyon",
      "Maden sahalarından konveyör, elek ve kırma-eleme ekipmanı",
      "Paslanmaz tank, boru ve gıda tesisi ekipmanı",
      "Jeotermal boru hattı, sera konstrüksiyonu ve galvaniz profil",
      "Elektrik motoru, redüktör, trafo ve kablo",
    ],
    logistics:
      "Kınık ve Bergama'ya aynı gün çıkabiliyoruz. Aliağa, Dikili ve güney ilçelerinde ise söküm işleri ve bir seferi dolduracak yükler çalışıyor. Kesim, söküm, kepçe, vinç ve nakliye teklifin içindedir.",
    faq: [
      {
        question: "İzmir'in hangi ilçelerine geliyorsunuz?",
        answer:
          "Kınık ve Bergama düzenli çalıştığımız yerler — Soma'ya komşular. Aliağa ve Dikili tarafındaki sanayi sahalarında da çalışıyoruz. Tonajı büyük işler için İzmir merkez ve çevresine de çıkıyoruz.",
      },
      {
        question: "Aliağa'ya yakın olmanız fiyatı etkiliyor mu?",
        answer:
          "Hurdanın gittiği yere yakınlık nakliye maliyetini düşürür ve bu, teklifte size yansır. Ama belirleyici olan tek şey bu değil: yükün cinsi, ayrıştırılmış olup olmaması ve sahaya erişim de aynı ölçüde etkili.",
      },
    ],
    alsoCovers: ["Aliağa", "Dikili", "Kemalpaşa", "Menemen", "Çiğli"],
    posts: ["fabrika-ve-tesis-sokumu-nasil-yapilir", "soma-hurda-fiyatlari-nasil-belirlenir"],
    related: ["services", "materials"],
  },
  {
    slug: "kinik",
    name: "Kınık",
    kind: "ilce",
    province: "İzmir",
    provinceSlug: "izmir",
    seoTitle: "Kınık Hurdacı ve Hurda Alımı",
    title: "Kınık'ta hurda alımı",
    description:
      "Kınık'ta maden ekipmanı, konveyör, tarım makinesi ve atölye hurdası alımı. Soma'ya komşu İzmir ilçesi olduğu için keşfe aynı gün geliyoruz.",
    lead: "Kınık, Soma'ya en yakın İzmir ilçesi. Aramızdaki mesafe kısa olduğu için buradaki işlerde hem hızlı geliyoruz hem de nakliye yükü düşük kaldığı için rakam güçlü çıkıyor.",
    profile: [
      "Kınık'ta linyit ocakları ve hazırlama tesisleri var; buradan konveyör tamburu ve şasisi, elek, kırıcı parçaları, redüktör ve ağır çelik konstrüksiyon çıkıyor. Soma havzasıyla aynı tip ekipman olduğu için bu parçaları tanıyoruz — hangisinin çalışır durumda olduğunu, hangisinin yedek parçalık olduğunu ayırt etmek burada zor değil.",
      "İlçenin tarım tarafından traktör, römork, sulama tesisatı ve depo sacı; atölyelerden ise talaş, sac fire ve kaynak artığı geliyor.",
    ],
    materials: [
      "Konveyör tamburu, bant şasisi ve redüktör",
      "Elek, elek sacı ve kırıcı parçaları",
      "Ağır çelik konstrüksiyon, bunker ve silo sacı",
      "Traktör, römork ve sulama tesisatı",
      "Torna talaşı, sac fire ve atölye artığı",
      "Elektrik motoru, kablo ve pano hurdası",
    ],
    logistics:
      "Soma'ya komşu olduğumuz için Kınık günlük çalışma alanımız; keşfe aynı gün ya da ertesi gün geliyoruz. Küçük miktarları Soma'daki sahamıza kendiniz de getirebilirsiniz.",
    faq: [
      {
        question: "Kınık'a yerinde alıma geliyor musunuz?",
        answer:
          "Geliyoruz. Kınık Soma'ya en yakın İzmir ilçesi; yerinde alım için sabit bir tonaj eşiğimiz yok. Kesim, yükleme ve nakliye teklifin içindedir.",
      },
      {
        question: "Maden ekipmanının çalışır olup olmadığını nasıl belirliyorsunuz?",
        answer:
          "Keşifte yerinde bakıyoruz. Etiketi okunabilen, mili ve gövdesi sağlam ekipman ikinci el olarak değerlenir; aşınmış ve gövdesi çökmüş olanlar hurda tonajına yazılır. Ayrımı açıkça söylüyoruz.",
      },
    ],
    posts: ["maden-ve-termik-santral-hurdasi", "makineniz-hurda-mi-ikinci-el-mi"],
    related: ["gallery", "contact"],
  },
  {
    slug: "bergama",
    name: "Bergama",
    kind: "ilce",
    province: "İzmir",
    provinceSlug: "izmir",
    seoTitle: "Bergama Hurdacı ve Hurda Alımı",
    title: "Bergama'da hurda alımı",
    description:
      "Bergama'da gıda ve tarım tesislerinden paslanmaz ekipman, maden sahalarından ağır çelik, sanayiden üretim artığı alımı. Kesim, yükleme ve nakliye teklife dahil.",
    lead: "Bergama, Soma'ya yakın İzmir ilçelerinden; tarımı, gıda işleme tesisleri ve madenciliğiyle üç farklı hurda kaynağı bir arada. Buraya düzenli çıkıyoruz.",
    profile: [
      "Gıda ve tarımsal işleme tesislerinden paslanmaz tank, boru, elek, pompa ve pres çıkıyor. Pamuk ve tekstil geçmişi olan tesislerden ise makine, kazan dairesi ekipmanı ve boru hattı geliyor. Paslanmaz ve renkli metallerin bu tür sahalarda ayrı toplanması, karışık yüke göre belirgin biçimde daha iyi bir rakam getiriyor.",
      "Maden sahalarından konveyör, kırma-eleme parçaları, iş makinesi kovası ve ağır çelik konstrüksiyon çıkıyor. İlçenin sanayi sitesi ve atölyelerinden ise talaş, sac fire, profil kırpıntısı ve hurda araç geliyor.",
    ],
    materials: [
      "Paslanmaz tank, boru, elek ve gıda tesisi ekipmanı",
      "Kazan, boru hattı ve tekstil makinesi hurdası",
      "Konveyör, kırma-eleme parçaları ve iş makinesi kovası",
      "Ağır çelik konstrüksiyon ve depo sacı",
      "Talaş, sac fire ve profil kırpıntısı",
      "Elektrik motoru, redüktör, kablo ve trafo",
    ],
    logistics:
      "Bergama'ya düzenli gidiyoruz; keşif için gün vermek birkaç günü geçmiyor. Söküm gerektiren işlerde ekip ve kesim ekipmanıyla geliyoruz; hepsi teklifin içinde.",
    faq: [
      {
        question: "Gıda tesisindeki paslanmazı ayrı mı alıyorsunuz?",
        answer:
          "Ayrı alıyoruz ve bu, gıda tesislerinde en önemli maddedir. Paslanmaz karışık demir yığınına girdiğinde en düşük kalemden değerlenir; sökümü ayrıştırarak yapıyoruz ve teklifte ayrı kalem olarak yazıyoruz.",
      },
      {
        question: "Bergama'da ikinci el ekipman da alıyor musunuz?",
        answer:
          "Alıyoruz. Çalışır durumdaki elektrik motoru, redüktör, pompa ve paslanmaz tank hurda tonaj fiyatının üzerinde değerlenir. Emin değilseniz hurdaya yazmadan önce fotoğrafını gönderin.",
      },
    ],
    posts: ["hurda-metal-ayristirma-rehberi", "makineniz-hurda-mi-ikinci-el-mi"],
    related: ["materials", "services"],
  },
  {
    slug: "aliaga",
    name: "Aliağa",
    kind: "ilce",
    province: "İzmir",
    provinceSlug: "izmir",
    seoTitle: "Aliağa Hurda Alımı ve Tesis Sökümü",
    title: "Aliağa'da hurda alımı ve tesis sökümü",
    description:
      "Aliağa ve çevresindeki sanayi tesislerinden hurda alımı, hat ve tesis sökümü. Ağır çelik konstrüksiyon, boru hattı ve ekipman için keşif, kesim ve nakliye tek elden.",
    lead: "Aliağa, Türkiye'nin demir-çelik ve gemi geri dönüşüm merkezi — yani hurdanın vardığı yer. Bizim buradaki işimiz zincirin öbür ucunda: sanayi tesislerinden hurda alımı ve söküm.",
    profile: [
      "Bölgedeki sanayi ve petrokimya tesislerinden hat yenileme ve kapasite değişikliklerinde ciddi tonajda hurda çıkıyor: boru hattı ve destekleri, kablo tavası, ağır çelik konstrüksiyon, tank ve kazan gövdeleri, pompa, motor ve redüktör. Bu tür sahalarda iş güvenliği ve sıralama her şeyden önce geliyor — enerji kesilip kilitlenmeden, basınçlı hatlar boşaltılmadan ve kalıntı alınmadan hiçbir gövdeye kesme aleti değmiyor.",
      "Aliağa'nın hurda tüketiminin merkezi olması, bu bölgede toplanan malzemenin nakliye mesafesini kısaltıyor. Nakliyede kısalan maliyet teklifte size yansıyor; ama tek belirleyici bu değil — cins, ayrıştırma ve sahaya erişim aynı ölçüde etkili.",
    ],
    materials: [
      "Boru hattı, destek ve kablo tavası",
      "Tank, kazan ve silo gövdeleri",
      "Ağır çelik konstrüksiyon, platform ve merdiven",
      "Pompa, elektrik motoru, redüktör ve hidrolik ünite",
      "Paslanmaz boru, tank ve ekipman",
      "Kablo, trafo ve pano hurdası",
    ],
    logistics:
      "Aliağa'daki işler ağırlıklı olarak söküm ve toplu alım; bunlarda mesafe belirleyici olmuyor, ekip ve ekipmanla geliyoruz. Birden fazla sefer çıkan işlerde her sefer ayrı tartılır ve ayrı fişlenir.",
    faq: [
      {
        question: "İçinde kalıntı olan tank ve boru hattını nasıl söküyorsunuz?",
        answer:
          "Sökümün ilk adımı kesim değil izolasyondur: enerji kesilip kilitlenir, basınçlı hatlar boşaltılır, yağ ve kimyasal kalıntısı alınır. İçeriği bilinmeyen bir hacim, bilinene kadar kapalı kalır. Bu adımlar keşifte yazılır ve programın içindedir.",
      },
      {
        question: "Sökümden sonra saha nasıl teslim ediliyor?",
        answer:
          "Kalıntısı kaldırılmış hâlde. Bunun teklifte yazılı olması önemlidir; yazılı değilse sonradan kaldırma masrafı saha sahibine kalır. Teklif netleştikten sonra ek kalem çıkarmıyoruz.",
      },
    ],
    posts: ["fabrika-ve-tesis-sokumu-nasil-yapilir", "hurda-kantar-tartimi-ve-odeme"],
    related: ["services", "contact"],
  },
  {
    slug: "dikili",
    name: "Dikili",
    kind: "ilce",
    province: "İzmir",
    provinceSlug: "izmir",
    seoTitle: "Dikili Hurdacı ve Hurda Alımı",
    title: "Dikili'de hurda alımı",
    description:
      "Dikili'de jeotermal boru hattı, sera konstrüksiyonu, tarım ve tesisat hurdası alımı. Söküm, kesim, yükleme ve nakliye teklife dahil.",
    lead: "Dikili, jeotermal kaynakları ve seracılığıyla öne çıkan bir sahil ilçesi. Buradan çıkan hurda çoğunlukla tesisat ve konstrüksiyon ağırlıklı: boru, profil ve galvaniz.",
    profile: [
      "Jeotermal ısıtma hatları ve sera işletmeleri düzenli hurda üretiyor: çelik ve galvaniz boru hattı, ısı değiştirici, pompa, sera taşıyıcı konstrüksiyonu ve galvaniz profil. Bu kalemler dağınık ve hafif göründükleri için değeri küçümsenir; oysa bir sera konstrüksiyonu ya da bir ısıtma hattı toplandığında ciddi tonaj tutar.",
      "İlçenin tarım ve turizm tesislerinden ise mutfak ekipmanı, paslanmaz tezgâh, kazan, klima santrali ve alüminyum doğrama çıkıyor. Alüminyum doğramada cam çıtası ve lastik fitil ayrılabildiği ölçüde rakam yükseliyor.",
    ],
    materials: [
      "Jeotermal boru hattı, ısı değiştirici ve pompa",
      "Sera taşıyıcı konstrüksiyonu ve galvaniz profil",
      "Alüminyum doğrama, sac ve profil",
      "Paslanmaz tezgâh ve mutfak ekipmanı",
      "Kazan, klima santrali ve tesisat borusu",
      "Tarım makinesi ve sulama tesisatı",
    ],
    logistics:
      "Dikili'ye söküm işleri ve bir seferi dolduracak yükler için geliyoruz. Sera ve tesisat sökümünde toplama, kesim ve yükleme bizde; hepsi teklifin içinde.",
    faq: [
      {
        question: "Sera konstrüksiyonunu siz mi söküyorsunuz?",
        answer:
          "Biz söküyoruz. Söküm, kesim, toplama, yükleme ve nakliye verdiğimiz teklifin içindedir; teklif netleştikten sonra ek kalem çıkarmıyoruz.",
      },
      {
        question: "Alüminyum doğramayı camıyla birlikte alıyor musunuz?",
        answer:
          "Alıyoruz, ama cam, lastik fitil ve demir vida alüminyumun değerini düşürür. Ayrılabildiği ölçüde ayrılması doğrudan sizin lehinize; ayıramıyorsanız da ayrıştırmayı sahamızda biz yapıyoruz.",
      },
    ],
    posts: ["hurda-metal-ayristirma-rehberi", "soma-hurda-fiyatlari-nasil-belirlenir"],
    related: ["materials", "contact"],
  },

  /* ---------------------------------------------------------------- *
   * KÜTAHYA
   * ---------------------------------------------------------------- */
  {
    slug: "kutahya",
    name: "Kütahya",
    kind: "il",
    province: "Kütahya",
    seoTitle: "Kütahya Hurdacı ve Hurda Alımı",
    title: "Kütahya'da hurda alımı ve tesis sökümü",
    description:
      "Kütahya genelinde endüstriyel hurda alımı ve tesis sökümü. Simav ve Gediz tarafında düzenli çalışıyoruz; maden, seramik ve sanayi tesislerinden toplu alım yapıyoruz.",
    lead: "Kütahya, Soma'dan bakınca doğu komşusu. Buradaki işlerde tek kamyonluk yüklerden çok, birkaç sefer çıkaracak tonajlı işler ve tesis sökümü mantıklı çalışıyor.",
    profile: [
      "Kütahya seramik ve manyezit üretimiyle bilinen bir il; ayrıca Tavşanlı-Tunçbilek hattında linyit havzası ve termik santral var. Seramik tesislerinden fırın arabası, taşıma konveyörü, kalıp ve ağır çelik konstrüksiyon; maden ve santral sahalarından konveyör hatları, elek, kırıcı parçaları ve kalın sac çıkıyor.",
      "İlin batısında, Simav ve Gediz tarafında jeotermal kaynaklı ısıtma ve seracılık yaygın; buradan boru hattı, ısı değiştirici ve sera konstrüksiyonu geliyor. Tarım tarafından ise traktör, römork, sulama tesisatı ve depo sacı çıkıyor.",
    ],
    materials: [
      "Fırın arabası, taşıma konveyörü ve seramik tesisi ekipmanı",
      "Maden ve santral sahalarından konveyör, elek ve kırıcı parçaları",
      "Kalın sac, ray ve ağır çelik konstrüksiyon",
      "Jeotermal boru hattı, ısı değiştirici ve sera konstrüksiyonu",
      "Elektrik motoru, redüktör, fan ve pompa",
      "Traktör, römork ve tarım makinesi hurdası",
    ],
    logistics:
      "Kütahya, Soma'dan uzak bir mesafede; burada bir seferi dolduracak yükler ve söküm işleri çalışıyor. Tonajı büyük işlerde mesafe engel değil — ekip, kesim ekipmanı ve kamyonla geliyoruz.",
    faq: [
      {
        question: "Kütahya'ya tek kamyonluk yük için de geliyor musunuz?",
        answer:
          "Bu mesafede yükün bir kamyonu doldurması ton başına belirgin biçimde daha iyi bir rakam çıkarır. Miktarınız azsa yine de yazın; o bölgeye yakın tarihte çıkan bir seferimiz varsa birleştirebiliyoruz.",
      },
      {
        question: "Kütahya'nın hangi ilçelerine geliyorsunuz?",
        answer:
          "Simav ve Gediz düzenli çalıştığımız yerler; Kütahya merkez, Tavşanlı ve Emet tarafına da tonajlı işler ve söküm için geliyoruz.",
      },
    ],
    alsoCovers: ["Kütahya Merkez", "Tavşanlı", "Emet", "Altıntaş"],
    posts: ["fabrika-ve-tesis-sokumu-nasil-yapilir", "maden-ve-termik-santral-hurdasi"],
    related: ["services", "materials"],
  },
  {
    slug: "simav",
    name: "Simav",
    kind: "ilce",
    province: "Kütahya",
    provinceSlug: "kutahya",
    seoTitle: "Simav Hurdacı ve Hurda Alımı",
    title: "Simav'da hurda alımı",
    description:
      "Simav'da jeotermal boru hattı, kazan, sera konstrüksiyonu, maden ve tarım hurdası alımı. Söküm, kesim ve nakliye teklife dahil.",
    lead: "Simav, jeotermal ısıtmasıyla bilinen bir ilçe; ayrıca çevresinde maden ve orman işletmeleri var. Çıkan hurdanın büyük bölümü boru hattı ve konstrüksiyon ağırlıklı.",
    profile: [
      "Jeotermal ısıtma şebekesi ve seralar düzenli olarak boru hattı, ısı değiştirici, pompa ve vana hurdası üretiyor. Bu hatlarda kullanılan boru ve armatürlerin bir bölümü pirinç ve paslanmaz — karışık demir yığınına girdiklerinde değerinin çok altında satılan kalemler. Bunları ayrı toplamak doğrudan sizin lehinize.",
      "Maden ve orman işletmelerinden ise konveyör, elek, kırıcı parçaları, bıçkı hattı ve ağır çelik konstrüksiyon çıkıyor. Tarım tarafından traktör, römork ve sulama tesisatı geliyor.",
    ],
    materials: [
      "Jeotermal boru hattı, ısı değiştirici ve pompa",
      "Pirinç vana, armatür ve tesisat parçaları",
      "Sera konstrüksiyonu ve galvaniz profil",
      "Konveyör, elek ve kırıcı parçaları",
      "Bıçkı hattı ve orman ürünleri tesisi ekipmanı",
      "Traktör, römork ve orman işletme ekipmanı",
    ],
    logistics:
      "Simav'a söküm işleri ve bir seferi dolduracak yükler için geliyoruz. Hat sökümünde toplama, kesim ve yükleme bizde; hepsi teklifin içinde.",
    faq: [
      {
        question: "Pirinç vana ve armatürleri ayrı mı almalıyım?",
        answer:
          "Ayrı verirseniz belirgin biçimde daha iyi fiyat alırsınız. Pirinç, karışık demir yükünde en düşük kalemden değerlenir. Krom kaplı olanlar dışarıdan gümüş görünür; çizildiğinde altındaki sarı renk çıkar.",
      },
      {
        question: "Simav'a keşfe geliyor musunuz?",
        answer:
          "Geliyoruz. Tonajı büyük işlerde ve söküm gerektiren hatlarda saha keşfi yapıp kesin teklifi yerinde veriyoruz.",
      },
    ],
    posts: ["hurda-metal-ayristirma-rehberi", "makineniz-hurda-mi-ikinci-el-mi"],
    related: ["materials", "services"],
  },
  {
    slug: "gediz",
    name: "Gediz",
    kind: "ilce",
    province: "Kütahya",
    provinceSlug: "kutahya",
    seoTitle: "Gediz Hurdacı ve Hurda Alımı",
    title: "Gediz'de hurda alımı",
    description:
      "Gediz'de tuğla-kiremit tesislerinden fırın ve taşıma hattı, jeotermal tesisat, tarım ve atölye hurdası alımı. Keşif, kesim ve nakliye tek elden.",
    lead: "Gediz, jeotermal kaynakları ve tuğla-kiremit üretimiyle bilinen bir ilçe. Buradan çıkan hurdanın çoğu bir fırın hattının, bir tesisatın ya da bir tarım işletmesinin parçası.",
    profile: [
      "Tuğla-kiremit tesislerinden fırın arabası ve şasisi, vagonet, ray, taşıma konveyörü, kurutma odası konstrüksiyonu ve baca sacı çıkıyor. Bu parçalar ısıya çalışmış, ağır ve yerine sabitlenmiş oluyor; kesim ve vinç olmadan sahadan çıkmıyorlar.",
      "Jeotermal ısıtma ve kaplıca tesislerinden boru hattı, ısı değiştirici, kazan ve pompa geliyor. Tarım tarafından ise traktör, römork, sulama tesisatı ve depo sacı çıkıyor.",
    ],
    materials: [
      "Fırın arabası, vagonet, ray ve taşıma konveyörü",
      "Kurutma odası konstrüksiyonu ve baca sacı",
      "Jeotermal boru hattı, kazan, ısı değiştirici ve pompa",
      "Traktör, römork ve sulama tesisatı",
      "Kalıp, ıskarta parça ve döküm artığı",
      "Elektrik motoru, redüktör ve fan hurdası",
    ],
    logistics:
      "Gediz'e söküm işleri ve bir seferi dolduracak yükler için geliyoruz. Fırın hattı gibi kesim gerektiren işlerde ekip ve ekipmanla geliyoruz; hepsi teklifin içinde.",
    faq: [
      {
        question: "Fırın hattını üretim dururken mi söküyorsunuz?",
        answer:
          "Programı sizin üretiminize göre kuruyoruz. Keşifte hangi bölümün ne zaman boşalacağı ve hangi hatların kalacağı yazılır; söküm o pencereye göre planlanır.",
      },
      {
        question: "Gediz'e en az ne kadar tonajdan sonra geliyorsunuz?",
        answer:
          "Sabit bir eşiğimiz yok, ama bu mesafede yükün bir kamyonu doldurması ton başına daha iyi bir rakam çıkarır. Miktarınız azsa da yazın — o bölgeye yakın tarihte çıkan bir seferimiz varsa birleştiriyoruz.",
      },
    ],
    posts: ["fabrika-ve-tesis-sokumu-nasil-yapilir", "hurda-kantar-tartimi-ve-odeme"],
    related: ["services", "materials"],
  },
];
