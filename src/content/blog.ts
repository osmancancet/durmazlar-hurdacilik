import type { RouteKey } from "@/config/routes";
import type { Locale } from "@/lib/i18n";

/**
 * REHBER YAZILARI — YALNIZCA TÜRKÇE
 *
 * Sitenin geri kalanı dört dilli; burası değil. Nedeni SEO'nun kendisi:
 * bu yazılar "soma hurdacı", "soma hurda fiyatları", "kırkağaç hurda alan
 * yerler" gibi YEREL Türkçe aramalar için yazıldı. Aynı metinleri Rusça ve
 * Arapçaya çevirmek dört kat içerik üretmez — hiçbir pazarın aramadığı üç kopya
 * üretir ve sitenin ortalama içerik kalitesini düşürür.
 *
 * Bu yüzden rehber `/tr/blog/` altında yaşar, yalnızca Türkçe üretilir,
 * hreflang karşılıkları YOKTUR (kendi kendine canonical verir) ve site
 * haritasına da yalnızca Türkçe adresiyle girer. Altbilgideki bağlantı bloğu
 * da yalnızca Türkçe sayfalarda basılır.
 *
 * İÇERİK KURALI: buradaki hiçbir cümle uydurulmadı. Fiyat rakamı, kuruluş
 * yılı, kapasite, belge numarası, müşteri sayısı GEÇMEZ — hurda fiyatı
 * haftalık değişir, yazıya rakam yazmak bir ay içinde siteyi yalancı çıkarır.
 * Anlatılan şey rakam değil, fiyatın nasıl oluştuğu ve işin nasıl yürüdüğü.
 */

export type BlogSection = {
  heading: string;
  paragraphs: string[];
  /** İsteğe bağlı madde listesi — paragrafların ardından basılır. */
  bullets?: string[];
};

export type BlogPost = {
  slug: string;
  /**
   * `<title>` etiketi. Kök düzendeki şablon " | Durmazlar Hurdacılık"
   * (23 karakter) ekliyor ve Google ~60 karakterden sonrasını kesiyor —
   * bu yüzden 39 karakteri geçmemeli. Sayfadaki H1 daha uzun olabilir.
   */
  seoTitle: string;
  /** Sayfadaki H1 ve rehber listesindeki başlık. */
  title: string;
  /** Arama sonucunda görünen açıklama. */
  description: string;
  /** Künye etiketi — yazının hangi konu kümesine ait olduğu. */
  eyebrow: string;
  /** İlk yayın ve son güncelleme tarihi (ISO). */
  published: string;
  updated: string;
  /** Giriş paragrafı — listede de özet olarak kullanılır. */
  lead: string;
  sections: BlogSection[];
  /** Yazının sonundaki sorular; sayfa başına FAQPage verisi üretir. */
  faq?: { question: string; answer: string }[];
  /** İlgili site sayfaları — iç bağlantı. */
  related?: RouteKey[];
  /**
   * İlgili bölge sayfaları (`src/content/areas.ts` slug'ları).
   *
   * Rehber yazısı okuyan kişi çoğu zaman kendi bölgesini arıyor; yazının
   * sonundan doğrudan oraya bağlanmak, ziyaretçiyi de arama motorunu da
   * doğru sayfaya götürüyor.
   */
  areas?: string[];
};

/** Rehber yalnızca bu dilde yayımlanır. */
export const BLOG_LOCALE: Locale = "tr";

/** Rehberin kök adresi. Sonunda / vardır (next.config trailingSlash). */
export const BLOG_BASE = "/tr/blog/";

export function blogIndexHref(): string {
  return BLOG_BASE;
}

export function blogPostHref(slug: string): string {
  return `${BLOG_BASE}${slug}/`;
}

export function postBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

/**
 * Yazılar. Sıra listede göründükleri sıradır — en çok aranan konu başta.
 */
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "soma-hurda-fiyatlari-nasil-belirlenir",
    seoTitle: "Soma'da Hurda Fiyatı Nasıl Belirlenir",
    title: "Soma'da hurda fiyatı nasıl belirlenir?",
    description:
      "Soma ve çevresinde hurda fiyatını belirleyen dört şey: malzemenin cinsi, ayrıştırılmış olup olmaması, tonajı ve bulunduğu yer. Fiyatınızı neyin yükselttiğini adım adım anlattık.",
    eyebrow: "Fiyatlandırma",
    published: "2026-09-01",
    updated: "2026-09-01",
    lead: "Hurda fiyatı tek bir rakam değildir. Aynı gün, aynı ilçede, aynı tonajda iki yükün fiyatı birbirinden ayrılabilir — çünkü fiyat, malzemenin ne olduğu kadar hangi hâlde olduğuyla da belirlenir. Aşağıda, size verilen teklifin nasıl oluştuğunu kalem kalem açıklıyoruz.",
    sections: [
      {
        heading: "Fiyatı belirleyen dört şey",
        paragraphs: [
          "Bir yüke fiyat verilirken bakılan şeyler her seferinde aynıdır. Bunları bilmek, telefonda ne anlatmanız gerektiğini de bilmeniz demektir.",
        ],
        bullets: [
          "Cins — demir ve çelik ile bakır, alüminyum, pirinç, paslanmaz arasında kat kat fark vardır. Renkli metaller ayrı değerlenir.",
          "Temizlik ve ayrıştırma — beton, ahşap, lastik, yağ ve toprak kalıntısı taşıyan yük, tartıda ağır gelir ama değerde ağır basmaz.",
          "Tonaj — yükün bir kamyonu doldurup doldurmadığı nakliyenin ton başına maliyetini doğrudan değiştirir.",
          "Konum ve erişim — sahaya kamyon girip giremediği, vinç veya kepçe gerekip gerekmediği, kesim yapılıp yapılmayacağı teklifin içinde yer alır.",
        ],
      },
      {
        heading: "Neden telefonda kesin rakam söylenmiyor?",
        paragraphs: [
          "Hurda fiyatı borsaya bağlı hareket eder ve hafta içinde değişebilir. Bu yüzden bir sitede yazan sabit rakam, yazıldığı günden birkaç hafta sonra doğruyu söylemez. İnternette \"güncel hurda fiyat listesi\" diye duran sayfaların çoğu bu yüzden eskidir.",
          "İkinci sebep, malzemeyi görmeden verilen rakamın iki tarafı da bağlamamasıdır. Görmeden yüksek rakam söyleyip saha görüldüğünde düşürmek yaygın bir yöntemdir; biz bunu yapmıyoruz. WhatsApp'tan gönderdiğiniz birkaç fotoğrafla aynı gün gerçekçi bir ön fiyat söyleriz, kesin teklif ise yerinde keşiften sonra verilir ve keşiften sonra düşmez.",
        ],
      },
      {
        heading: "Fiyatınızı yükselten şeyler",
        paragraphs: [
          "Aynı yükü daha iyi bir rakama satmanın yolu çoğu zaman büyük bir iş değil, birkaç küçük tedbirdir.",
        ],
        bullets: [
          "Bakır, alüminyum ve pirinci ayrı biriktirin. Karışık yükte her şey en düşük kalemden değerlenir.",
          "Kablo, elektrik motoru ve trafo gibi kalemleri demir yığınına atmayın; bunlar kendi başına ayrı değerlenir.",
          "Beton, ahşap kalıp ve toprağı mümkün olduğunca ayırın — tartıda görünen ağırlık, ödenen ağırlık değildir.",
          "Yükü bir seferde toplayın. İki yarım kamyon yerine bir dolu kamyon, ton başına nakliyeyi düşürür.",
          "Fotoğrafı gündüz ışığında ve uzaktan çekin: yığının tamamı bir karede görünsün, sonra yakın çekim ekleyin.",
        ],
      },
      {
        heading: "Fiyatınızı düşüren şeyler",
        paragraphs: [
          "Bunlar teklifi düşürdüğü için değil, işin maliyetini artırdığı için fiyata yansır. Baştan bilinirse sürpriz olmaz.",
        ],
        bullets: [
          "Kamyonun yanaşamadığı, elle taşıma gerektiren saha",
          "Kesim gerektiren büyük gövdeler — tank, kazan, konstrüksiyon",
          "İçinde yağ, akışkan veya kimyasal kalmış ekipman",
          "Yağmur altında beklemiş, çamurlanmış talaş ve sac fire",
        ],
      },
      {
        heading: "En hızlı yol: fotoğraf gönderin",
        paragraphs: [
          "Soma, Kırkağaç, Savaştepe, Kınık ve çevresinde çalışan bir işletme olarak günlük fiyatı biz takip ediyoruz. Elinizdeki yükün fotoğrafını, yaklaşık tonajını ve bulunduğu yeri WhatsApp'tan gönderin — aynı gün ön fiyat söyleyelim. Tonajı büyük işlerde sahaya gelip görür, kesin teklifi yerinde veririz.",
        ],
      },
    ],
    faq: [
      {
        question: "Hurda fiyatları ne sıklıkla değişiyor?",
        answer:
          "Demir ve çelik fiyatı borsaya bağlı hareket eder ve hafta içinde değişebilir. Bu yüzden birkaç hafta önce alınmış bir teklifi bugünkü fiyat olarak kabul etmeyin; satmadan önce güncel rakamı bir kez daha sorun.",
      },
      {
        question: "Fotoğrafa bakarak verilen fiyat bağlayıcı mı?",
        answer:
          "Fotoğraf üzerinden verilen rakam ön fiyattır ve yükün fotoğrafta göründüğü gibi olması hâlinde geçerlidir. Kesin teklif, saha keşfinden sonra verilir. Keşiften sonra verilen teklifin içine sonradan kalem eklenmez.",
      },
      {
        question: "Az miktarda hurdanın da fiyatı sorulur mu?",
        answer:
          "Sorulur. Sabit bir alt sınırımız yok. Küçük miktarları Soma'daki sahamıza getirebilirsiniz; nakliyeli alımda ise yükün bir kamyonu doldurması ton başına daha iyi bir rakam çıkarır.",
      },
    ],
    related: ["materials", "contact"],
    areas: ["soma", "kirkagac", "savastepe", "kinik"],
  },
  {
    slug: "soma-hurdaci-secerken-nelere-dikkat-etmeli",
    seoTitle: "Soma'da Hurdacı Seçerken Nelere Bakın",
    title: "Soma'da hurdacı seçerken nelere dikkat etmeli?",
    description:
      "Kantar şeffaf mı, teklife nakliye dahil mi, evrakı kim düzenliyor? Soma ve çevresinde hurdacıyla çalışmadan önce sorulması gereken yedi soru ve doğru cevapların nasıl göründüğü.",
    eyebrow: "Çalışma Usulü",
    published: "2026-09-01",
    updated: "2026-09-01",
    lead: "Hurda satışında anlaşmazlığın çıktığı yer neredeyse hiçbir zaman fiyat değildir; tartı, teklifin kapsamı ve ödemenin zamanıdır. Aşağıdaki yedi soruyu işe başlamadan önce sorarsanız, üçü de baştan çözülmüş olur.",
    sections: [
      {
        heading: "1. Tartı nerede ve kimin gözetiminde yapılıyor?",
        paragraphs: [
          "Bu, listedeki en önemli sorudur. Tartının hangi kantarda yapılacağı işe başlamadan konuşulmalı ve tartı sırasında siz ya da bir görevliniz orada olmalıdır. Kantar fişi elinize verilmelidir. Tartıyı görmediğiniz bir işte, sonradan konuşulacak bir şey kalmaz.",
        ],
      },
      {
        heading: "2. Teklifin içinde ne var, ne yok?",
        paragraphs: [
          "\"Ton başına şu kadar\" cümlesi tek başına bir teklif değildir. Kesim, söküm, kepçe, vinç ve nakliyenin kime ait olduğu net olmalı. Bu kalemler teklifin içinde değilse, iyi görünen bir rakam iş bittiğinde kötü bir hesaba dönüşür.",
          "Bizim verdiğimiz teklifte kesim, söküm, kepçe, vinç ve nakliye dahildir. Teklif netleştikten sonra ek kalem çıkarmıyoruz; işi değiştirecek bir durum varsa başlamadan söylüyoruz.",
        ],
      },
      {
        heading: "3. Ödeme ne zaman yapılıyor?",
        paragraphs: [
          "Ödemenin tartıdan sonra mı, yük gittikten günler sonra mı yapılacağı baştan yazılı olmalı. Tartı biter bitmez ödeme yapılan bir düzen, iki taraf için de en temizidir; ödeme ileri bir tarihe atılıyorsa bunun sebebi açıkça söylenebilmelidir.",
        ],
      },
      {
        heading: "4. Evrakı kim düzenliyor?",
        paragraphs: [
          "Kurumsal bir satıcıysanız muhasebenizin isteyeceği belgeler bellidir. Hurdaya ayrılan araç ve üst yapılarda ise iş resmî kurumlar üzerinden yürür. Karşınızdaki işletme hangi belgenin nereden alınacağını adım adım anlatabiliyorsa, o işi daha önce yapmış demektir.",
        ],
      },
      {
        heading: "5. Sahayı görmeden fiyat veriyor mu?",
        paragraphs: [
          "Görmeden yüksek rakam söylemek, kamyon sahaya geldiğinde pazarlığı yeniden açmanın yaygın bir yoludur. Ciddi bir teklif, fotoğrafla ön fiyat + keşifle kesin fiyat sırasını izler. Telefonda hemen en yüksek rakamı söyleyen tarafa değil, ne göreceğini soran tarafa güvenin.",
        ],
      },
      {
        heading: "6. Saha nasıl teslim ediliyor?",
        paragraphs: [
          "Özellikle tesis sökümünde iş, hurda kamyona yüklendiğinde bitmez. Sahanın süpürülmüş, kalıntısı kaldırılmış hâlde teslim edilip edilmeyeceği baştan konuşulmalıdır. Sonradan kaldırılan her yığın sizin masrafınız olur.",
        ],
      },
      {
        heading: "7. Nereye kadar geliyor?",
        paragraphs: [
          "Yakındaki bir işletme, uzaktan gelen bir ekibe göre nakliyede avantajlıdır ve bu avantaj fiyata yansır. Merkezimiz Soma; Manisa, Balıkesir, İzmir ve Kütahya genelinde düzenli çalışıyoruz. Kırkağaç, Savaştepe, Sındırgı, Kınık, Bergama ve Akhisar tarafı bizim için günlük mesafedir.",
        ],
      },
    ],
    faq: [
      {
        question: "Hurdacıdan yazılı teklif istenir mi?",
        answer:
          "İstenir ve istenmelidir. Tonaj tahmini, ton başına fiyat, hangi kalemlerin dahil olduğu ve ödemenin zamanı bir mesajda yazılıysa iki taraf da neyi kabul ettiğini bilir. WhatsApp yazışması da bu iş için yeterli bir kayıttır.",
      },
      {
        question: "Küçük bir atölye için de saha keşfi yapılıyor mu?",
        answer:
          "Yapılıyor. Keşif yalnızca büyük tesisler için değil; kesim veya vinç gerekip gerekmediğini, kamyonun yanaşıp yanaşamadığını görmek küçük sahalarda da teklifi netleştirir.",
      },
    ],
    related: ["services", "about", "contact"],
    areas: ["soma", "manisa", "balikesir"],
  },
  {
    slug: "hurda-metal-ayristirma-rehberi",
    seoTitle: "Hurda Metal Ayrıştırma Rehberi",
    title: "Hurda metal ayrıştırma rehberi: hangi metal nasıl tanınır?",
    description:
      "Demir, bakır, alüminyum, pirinç ve paslanmaz nasıl ayırt edilir? Mıknatıs testinden renk ve ağırlık farkına, hurdanızı satmadan önce yapabileceğiniz ayrıştırmanın pratik rehberi.",
    eyebrow: "Malzeme Bilgisi",
    published: "2026-09-01",
    updated: "2026-09-01",
    lead: "Karışık gelen yükü biz sahamızda ayrıştırıyoruz — bu sizin işiniz değil. Ama şunu bilin: karışık bir yükte her şey en düşük kalemden değerlenir. Renkli metalleri ayırmak, çoğu zaman yarım günlük bir işin karşılığını fazlasıyla verir. Aşağıda hangi metalin nasıl tanındığını anlattık.",
    sections: [
      {
        heading: "Önce mıknatıs: demir mi, değil mi?",
        paragraphs: [
          "Ayrıştırmanın ilk adımı en basitidir. Sıradan bir mıknatıs demir ve çeliği çeker; bakır, alüminyum, pirinç ve kurşunu çekmez. Bu tek hareket yığını ikiye böler: siyah metaller (demir-çelik) ve renkli metaller.",
          "İstisnası paslanmazdır. Bazı paslanmaz kaliteleri mıknatısı zayıf tutar, bazıları hiç tutmaz. Mıknatısın zayıf tuttuğu parlak gri bir malzeme görüyorsanız onu ayrı bir yere koyun, karar vermeyin — fotoğrafını gönderin.",
        ],
      },
      {
        heading: "Bakır",
        paragraphs: [
          "Kızıl-kahve rengiyle tanınır; yüzeyi zamanla koyulaşır, nemde yeşil bir tabaka bağlar. Elektrik motoru sargısı, kablo içi, trafo, kazan boruları ve tesisat borusu en sık gelen kalemlerdir.",
          "Bakır, hurdanın en değerli kalemlerinden biridir ve demir yığınının içinde kaybolduğunda bu değeri tamamen kaybeder. Kablo, motor ve sargılı parçaları ayrı bir kutuda toplayın.",
        ],
      },
      {
        heading: "Alüminyum",
        paragraphs: [
          "Açık gri, mat ve belirgin biçimde hafiftir — aynı büyüklükteki demir parçanın yanında elde tuttuğunuzda fark anlaşılır. Doğrama profil, radyatör, jant, motor bloğu, sac ve mutfak ekipmanı olarak gelir.",
          "Alüminyumun içinde kalan demir vida, cam veya plastik değeri düşürür. Doğrama profilde lastik fitil ve cam çıtası ayrılabiliyorsa ayrılsın.",
        ],
      },
      {
        heading: "Pirinç",
        paragraphs: [
          "Sarımsı, bakırdan daha açık ve altına yakın bir rengi vardır; ağırdır. Musluk, vana, rakor, kilit göbeği, radyatör peteği ve tesisat armatürleri pirinç olarak gelir. Krom kaplı olanlar dışarıdan gümüş görünür — çizildiğinde altındaki sarı renk çıkar.",
        ],
      },
      {
        heading: "Paslanmaz",
        paragraphs: [
          "Parlak gri, ağır ve paslanmaz. Gıda ve kimya tesislerinden tank, boru, karıştırıcı, elek ve tezgâh olarak çıkar. Galvaniz kaplı sacla karıştırılması çok yaygındır: galvaniz sac mıknatısı güçlü tutar ve yüzeyinde çiçek deseni vardır; paslanmazda o desen yoktur.",
        ],
      },
      {
        heading: "Kablo ve elektrik motoru",
        paragraphs: [
          "Kablo, kesitine ve içindeki iletkenin bakır mı alüminyum mu olduğuna göre değerlenir. Kesilmiş bir uçtan bakmak yeterlidir: kızıl olan bakır, gri olan alüminyumdur.",
          "Elektrik motoru bütün hâlde alınır; içindeki sargı bakırdır ve gövdesi dökümdür. Motoru sökmeye çalışmayın — çalışır durumdaki bir motor, çoğu zaman hurda değerinin üzerinde ikinci el ekipman olarak değerlenir.",
        ],
      },
      {
        heading: "Ayrıştıramadığınız yerde durun",
        paragraphs: [
          "Emin olamadığınız bir parçayı zorla bir kalemin içine koymayın. Ayrı bir köşeye alın, fotoğrafını çekin, gönderin. Karışık yükleri zaten sahamızda biz ayrıştırıyoruz; amacınız yükü mükemmel ayırmak değil, değerli kalemlerin düşük kalemin içinde kaybolmasını engellemek.",
        ],
      },
    ],
    faq: [
      {
        question: "Hurdayı ayrıştırmak zorunda mıyım?",
        answer:
          "Zorunda değilsiniz. Karışık gelen yükleri sahamızda biz ayrıştırıyoruz. Yalnızca bakır, alüminyum ve pirinç gibi renkli metaller ayrı verildiğinde daha iyi fiyat alırsınız — karışık yükte tamamı en düşük kalemden değerlenir.",
      },
      {
        question: "Galvaniz sac ile paslanmaz nasıl ayırt edilir?",
        answer:
          "Galvaniz sac mıknatısı güçlü tutar ve yüzeyinde çiçeğe benzeyen bir kaplama deseni bulunur. Paslanmazda bu desen yoktur ve mıknatıs ya hiç tutmaz ya da çok zayıf tutar.",
      },
      {
        question: "Kabloyu soymam gerekir mi?",
        answer:
          "Gerekmez. Kablo, kesiti ve iletkeninin cinsine göre olduğu gibi değerlenir. Kabloyu yakarak soymak ise hem yasak hem de tehlikelidir; iletkene de zarar verdiği için değeri düşürür.",
      },
    ],
    related: ["materials", "contact"],
    areas: ["akhisar", "bergama", "simav"],
  },
  {
    slug: "fabrika-ve-tesis-sokumu-nasil-yapilir",
    seoTitle: "Fabrika ve Tesis Sökümü Nasıl Yapılır",
    title: "Fabrika ve tesis sökümü nasıl yapılır?",
    description:
      "Keşiften saha teslimine kadar tesis sökümünün adımları: değerleme, iş güvenliği, enerji ve akışkanların kesilmesi, söküm sırası ve sahanın nasıl teslim edildiği. Soma ve çevresinde tesis sökümü.",
    eyebrow: "Tesis Sökümü",
    published: "2026-09-01",
    updated: "2026-09-01",
    lead: "Bir tesisin sökülmesi, hurdanın kamyona yüklenmesinden ibaret değildir. Sıra yanlış kurulduğunda iş hem uzar hem tehlikeli hâle gelir. Aşağıda bir söküm işinin baştan sona nasıl yürüdüğünü, hangi adımda neyin konuşulması gerektiğiyle birlikte anlattık.",
    sections: [
      {
        heading: "1. Keşif: neyin sökülmediği de yazılır",
        paragraphs: [
          "İş, sahayı görmekle başlar. Keşifte yalnızca sökülecekler değil, KALACAKLAR da tespit edilir: duracak bir duvar, kullanılmaya devam edecek bir hat, sökülmeyecek bir trafo. Bunlar baştan yazılmazsa iş sırasında karar vermek zorunda kalınır ve yanlış karar geri alınamaz.",
          "Keşifte ayrıca kamyonun nereye kadar girebildiği, vinç kurulabilecek bir alan olup olmadığı ve komşu yapılarla mesafe not edilir. Teklifin içindeki nakliye ve ekipman kalemi buradan çıkar.",
        ],
      },
      {
        heading: "2. Değerleme: hurda mı, ikinci el mi?",
        paragraphs: [
          "Bir tesisin içindeki her şey hurda değildir. Çalışır durumdaki bir redüktör, elektrik motoru, konveyör tamburu, hidrolik ünite ya da tank; hurda tonaj fiyatının üzerinde ikinci el ekipman olarak değerlenir. Bunları hurdaya karıştırmak, sahibinin parasını yığının içinde eritmektir.",
          "Bu yüzden söküm teklifi tek bir ton fiyatı olarak değil, ayrılan kalemlerle birlikte konuşulur. Hangi parçanın çalışır durumda olduğunu, hangisinin yalnızca yedek parçalık olduğunu açıkça söyleriz.",
        ],
      },
      {
        heading: "3. Enerjinin ve akışkanların kesilmesi",
        paragraphs: [
          "Sökümün ilk fiziksel adımı kesim değil, izolasyondur. Elektrik beslemesi kesilip kilitlenmeden, basınçlı hatlar boşaltılmadan, yağ ve kimyasal kalıntısı alınmadan hiçbir gövdeye kesme aleti değmez.",
          "Tank ve kazan gibi kapalı hacimlerde bu adım atlanamaz: içinde kalan artık, kesim sırasında en ciddi kaza sebebidir. İçeriği bilinmeyen bir hacim, bilinene kadar kapalı kalır.",
        ],
      },
      {
        heading: "4. Söküm sırası: yukarıdan aşağıya, dıştan içe",
        paragraphs: [
          "Söküm, yapıyı taşıyan elemanlar en sonda kalacak şekilde ilerler. Önce boru hatları, kablo tavaları, kaplama ve ekipman; sonra ikincil çelik; en sonda taşıyıcı konstrüksiyon. Ters sıra, yapının kontrolsüz göçmesi demektir.",
          "Kesim ve parçalama, kamyona sığacak ve kantarda düzgün istiflenebilecek boyda yapılır. Bu, nakliyede kamyon başına taşınan tonajı doğrudan artırır — yani sahibinin eline geçen rakamı da.",
        ],
      },
      {
        heading: "5. Tartı, evrak ve ödeme",
        paragraphs: [
          "Çıkan malzeme anlaşılan kantarda ve sizin gözetiminizde tartılır. Kantar fişi ve evrak elden teslim edilir; ödeme tartı sonrası yapılır. Birden fazla sefer çıkan işlerde her sefer ayrı tartılır ve ayrı fişlenir — toplam, sizin elinizdeki fişlerin toplamıdır.",
        ],
      },
      {
        heading: "6. Sahanın teslimi",
        paragraphs: [
          "İş, saha temizlenip teslim edildiğinde biter. Kalan kalıntının kaldırılıp kaldırılmayacağı teklifte yazılı olmalıdır; yazılı değilse sonradan kaldırma masrafı saha sahibine kalır. Kesim, söküm, kepçe, vinç ve nakliyeyi teklifin içinde veriyoruz ve teklif netleştikten sonra ek kalem çıkarmıyoruz.",
        ],
      },
    ],
    faq: [
      {
        question: "Tesis sökümünde ödemeyi kim kime yapar?",
        answer:
          "Çıkacak hurdanın değeri söküm maliyetini aşıyorsa ödeme size yapılır; bu, sanayi tesislerinde en sık karşılaşılan durumdur. Değer düşükse ya da iş ağırlıklı olarak yıkımsa hesap tersine dönebilir. Hangi durumda olduğunuz keşiften sonra net olarak söylenir.",
      },
      {
        question: "Söküm ne kadar sürer?",
        answer:
          "Süre tonajdan çok erişime bağlıdır: kamyonun yanaşabildiği, vinç kurulabilen bir sahada iş belirgin biçimde hızlanır. Keşiften sonra gün olarak bir süre verilir ve işe başlamadan önce sizinle paylaşılır.",
      },
      {
        question: "Sökümden çıkan çalışır ekipmanı ayrı satabilir miyim?",
        answer:
          "Satabilirsiniz ve çoğu zaman daha doğrusu budur. Keşifte hangi kalemlerin çalışır durumda olduğunu ayrıca belirtiyoruz; bu parçaları ister kendiniz satın, ister ikinci el değeriyle teklife dahil edelim.",
      },
    ],
    related: ["services", "gallery", "contact"],
    areas: ["aliaga", "turgutlu", "kula", "izmir"],
  },
  {
    /*
     * Bu yazı bir zamanlar coğrafyayı anlatıyordu ("hangi ilçelere
     * geliyoruz"). O iş artık /tr/hurdaci/ altındaki bölge sayfalarının —
     * ikisi aynı sorguyu hedefleseydi kendi sayfalarımız birbiriyle
     * yarışırdı (keyword cannibalization). Yazı bu yüzden coğrafyayı
     * bırakıp mesafenin FİYATA nasıl döndüğünü anlatıyor; bölge listesi
     * için dizine bağlanıyor.
     */
    slug: "hurdada-nakliye-mesafe-ve-tonaj",
    seoTitle: "Hurdada Nakliye, Mesafe ve Tonaj",
    title: "Nakliye, mesafe ve tonaj hurda fiyatını nasıl etkiler?",
    description:
      "Aynı yük, aynı gün, iki farklı ilçede neden farklı fiyat alır? Nakliyenin kimin üzerinde olduğu, kamyonun dolup dolmadığı ve sahaya erişim teklifi nasıl değiştirir?",
    eyebrow: "Lojistik",
    published: "2026-09-01",
    updated: "2026-09-01",
    lead: "Hurdada mesafe doğrudan fiyattır. Nakliyeye harcanmayan para yükün rakamına gider; harcanan para da bir yerden çıkar. Bu yazı, size verilen teklifin lojistik tarafını açıklıyor — hangi durumda kamyonun size geldiğini, hangi durumda gelmediğini.",
    sections: [
      {
        heading: "Nakliye kimin üzerinde?",
        paragraphs: [
          "Verdiğimiz teklifin içinde kesim, söküm, kepçe, vinç ve nakliye vardır. Yani yükü kamyona koymak ve sahadan çıkarmak bizim işimiz; siz yalnızca yükün başında olursunuz. Teklif netleştikten sonra bu kalemler için ayrıca bir masraf çıkarmıyoruz.",
          "Bu, sektörde her yerde böyle değil. \"Ton başına şu kadar\" diye başlayan bir konuşmada nakliyenin, kesimin ve vincin kime ait olduğu sorulmazsa, iyi görünen bir rakam iş bittiğinde kötü bir hesaba dönüşebilir. Teklifi alırken bu dört kalemi tek tek sorun.",
        ],
      },
      {
        heading: "Kamyonun dolması neden bu kadar önemli?",
        paragraphs: [
          "Nakliyenin maliyeti mesafeye göre değil, sefere göre oluşur: yarım dolu bir kamyon da dolu bir kamyon kadar yakıt yakar, aynı sürücüyü ve aynı günü harcar. Bu maliyet toplam tonaja bölündüğü için yarım yük, ton başına iki katı nakliye demektir.",
          "Pratik sonucu şu: iki yarım kamyon yerine bir dolu kamyon çıkarmak, elinize geçen rakamı doğrudan yükseltir. Yükünüz azsa ve acele etmiyorsanız, o bölgeye çıkan bir seferimizle birleştirebiliyoruz — konumunuzu yazın, yakın tarihte bir seferimiz varsa söyleyelim.",
        ],
      },
      {
        heading: "Mesafe: günlük bölge, seferlik bölge",
        paragraphs: [
          "Merkezimiz Soma. Buradan bakınca hizmet bölgemiz iki kuşağa ayrılıyor. Komşu ilçeler — Kırkağaç, Savaştepe, Kınık, Sındırgı, Bigadiç gibi — günlük mesafede: keşfe aynı gün ya da ertesi gün çıkabiliyoruz ve tek kamyonluk yükler için bile gelmek mantıklı oluyor.",
          "Daha uzak ilçelerde ise iş bir sefer planına dönüşüyor. Orada tek kamyonluk yükler yerine bir seferi dolduracak tonaj ya da söküm işleri çalışıyor. Söz konusu bir tesis sökümüyse mesafe zaten belirleyici olmuyor — ekip ve ekipmanla gidiliyor.",
          "Hangi ilçede ne yaptığımızı ve oralarda ne tür hurda çıktığını bölge sayfalarında tek tek yazdık.",
        ],
      },
      {
        heading: "Sahaya erişim: mesafeden bile önemli",
        paragraphs: [
          "Teklifi mesafeden daha çok etkileyen şey çoğu zaman sahanın kendisidir. Kamyonun yükün yanına kadar yanaşabildiği bir sahayla, malzemenin elle yüz metre taşınması gereken bir saha arasındaki fark, iki ilçe arasındaki farktan büyüktür.",
        ],
        bullets: [
          "Kamyon yükün yanına yanaşabiliyor mu?",
          "Vinç veya kepçe kurulacak düz bir alan var mı?",
          "Yük, kamyona sığacak boyda mı — yoksa kesim mi gerekiyor?",
          "Sahaya giriş için izin, randevu ya da belirli bir saat penceresi var mı?",
          "Yükün üstünde beton, toprak ya da ahşap kalıntısı var mı?",
        ],
      },
      {
        heading: "Fotoğrafta ne göstermeli?",
        paragraphs: [
          "Bu üç şeyi tek mesajda gönderirseniz aynı gün gerçekçi bir rakam söyleyebiliriz: yığının tamamının göründüğü uzak bir kare, malzemenin cinsinin anlaşıldığı bir yakın kare, ve kamyonun nereye kadar girebildiğini gösteren bir kare. Üçüncüsü çoğu zaman unutuluyor ama teklifi en çok değiştiren o.",
        ],
      },
    ],
    faq: [
      {
        question: "Nakliye ücreti fiyattan düşülüyor mu?",
        answer:
          "Hayır. Nakliye, kesim, söküm, kepçe ve vinç verdiğimiz teklifin içindedir. Size söylenen rakam bu kalemler düşülmeden önceki rakam değil; elinize geçecek rakamdır.",
      },
      {
        question: "Az miktarda hurda için de kamyon gönderiyor musunuz?",
        answer:
          "Sabit bir alt sınırımız yok. Komşu ilçelerde küçük yükler için de geliyoruz; uzak ilçelerde ise yükün bir kamyonu doldurması ton başına belirgin biçimde daha iyi bir rakam çıkarır. Miktarınız azsa yine de yazın — o bölgeye çıkan bir seferimizle birleştirebiliyoruz.",
      },
      {
        question: "Yükü ben getirsem daha mı iyi fiyat alırım?",
        answer:
          "Küçük miktarlarda evet, çünkü sefer maliyeti ortadan kalkar. Soma'daki sahamıza getirebilirsiniz; tartı sizin gözetiminizde yapılır ve kantar fişi elinize verilir.",
      },
    ],
    related: ["services", "contact"],
    areas: ["manisa", "balikesir", "izmir", "kutahya"],
  },
  {
    slug: "maden-ve-termik-santral-hurdasi",
    seoTitle: "Maden ve Termik Santral Hurdası",
    title: "Maden ve termik santral hurdası: Soma'da ne çıkıyor?",
    description:
      "Konveyör tamburu ve şasisi, titreşimli elek, kırıcı merdane, sondaj borusu, ray, redüktör ve hidrolik ünite. Soma'daki maden ve santral sahalarından çıkan hurdanın nasıl değerlendirildiği.",
    eyebrow: "Sektör",
    published: "2026-09-01",
    updated: "2026-09-01",
    lead: "Soma'nın hurdası genel sanayi hurdasına benzemez. Buradan çıkan malzemenin büyük bölümü maden ve enerji sahalarından gelir: kalın cidarlı, ağır ve çoğu zaman hâlâ bir işe yarayan parçalar. Bu yüzden değerlemesi de farklı yapılır.",
    sections: [
      {
        heading: "Konveyör hattı",
        paragraphs: [
          "Bir bant hattı söküldüğünde ortaya birkaç ayrı kalem çıkar ve bunları tek bir ton fiyatına yazmak sahibinin zararınadır. Tambur, kaplaması sağlamsa ikinci el olarak değerlenir; şasi ve taşıyıcı konstrüksiyon çelik hurdasıdır; redüktör ve elektrik motoru çalışır durumdaysa ayrı bir kalemdir.",
        ],
        bullets: [
          "Konveyör tamburu — kaplama durumu ve mil ölçüsü değeri belirler",
          "Konveyör şasisi ve taşıyıcı konstrüksiyon",
          "Redüktör ve elektrik motoru — çalışır olanlar ikinci el değerlenir",
          "Helezon konveyör ve besleyiciler",
        ],
      },
      {
        heading: "Kırma-eleme tesisi",
        paragraphs: [
          "Kırıcı merdane, titreşimli elek, elek sacı ve kasası; bunlar aşınma parçası oldukları için çoğu zaman yarı ömürlü çıkarlar. Aşınmış bir merdane hurdadır, ama gövdesi sağlam bir elek kasası başka bir sahada kullanılabilir. Ayrımı görmeden yapmak mümkün değildir — bu yüzden bu kalemlerde saha keşfi neredeyse zorunludur.",
        ],
      },
      {
        heading: "Sondaj ve delici ekipman",
        paragraphs: [
          "Sondaj borusu, muhafaza borusu ve maden delici uçları hem çelik kalitesi hem de kullanılabilirlik açısından ayrı değerlenir. Kalın cidarlı borular, kesilip sıradan hurdaya karıştırıldığında değerinin altında satılır; bütün hâlde ölçüsüyle birlikte fotoğraflanmalıdır.",
        ],
      },
      {
        heading: "Ray, platform ve ağır konstrüksiyon",
        paragraphs: [
          "Ray, platform ızgarası, kafes kiriş ve kaynaklı kiriş; maden sahalarının en çok çıkan ağır kalemleridir. Bunlar kesim gerektirir ve kesim maliyeti teklifin içindedir. Ray özellikle kesitine göre değerlenir, karışık demir hurdasıyla aynı kaleme yazılmaz.",
        ],
      },
      {
        heading: "Tank, silo ve hidrolik",
        paragraphs: [
          "Yakıt ve su tankları, silolar, hidrolik üniteler ve tanker gövdeleri. Bu grupta ilk soru içeriğidir: içinde yakıt, yağ veya kimyasal kalmış bir hacim boşaltılıp temizlenmeden kesilmez. Paslanmaz tanklar ise gövdesi sağlamsa hurda değil, ikinci el ekipman olarak konuşulmalıdır.",
        ],
      },
      {
        heading: "Sahamızda ne var?",
        paragraphs: [
          "Aldığımız malzemenin bir bölümü sahamızda ikinci el olarak duruyor: konveyör tamburu, redüktör, elektrik motoru, tank, damper kasa ve büyük çaplı boru. Hepsi çalışır durumda değil; hangisinin çalıştığını, hangisinin yedek parçalık olduğunu açıkça söylüyoruz. Galeride sahadan fotoğraflar var; ilgilendiğiniz parçayı WhatsApp'tan sorabilirsiniz.",
        ],
      },
    ],
    faq: [
      {
        question: "Maden sahasından çıkan ekipmanı toplu alıyor musunuz?",
        answer:
          "Alıyoruz. Konveyör hattı, kırma-eleme tesisi veya komple bir sahanın ekipmanı toplu değerlendirilebilir. Bu tür işlerde çalışır ekipman ile hurdayı ayırmak sahibinin lehinedir; keşifte bu ayrımı yapıp iki kalemi ayrı yazıyoruz.",
      },
      {
        question: "Aşınmış kırıcı merdanenin değeri var mı?",
        answer:
          "Aşınmış merdane çelik hurdası olarak değerlenir ve ağırlığı nedeniyle küçük görünen bir parça bile ciddi tonaj tutar. Gövdesi ve mili sağlamsa yeniden kaplanabilir olup olmadığına da bakılır.",
      },
    ],
    related: ["gallery", "materials", "contact"],
    areas: ["soma", "bigadic", "gordes", "sindirgi"],
  },
  {
    slug: "hurda-kantar-tartimi-ve-odeme",
    seoTitle: "Hurda Kantar Tartımı ve Ödeme",
    title: "Kantar tartımı ve ödeme: hurda satarken neye dikkat edilir?",
    description:
      "Dara, brüt ve net ne demek? Kantar fişinde ne yazar, tartıda kim bulunur, ödeme ne zaman yapılır? Hurda satışında anlaşmazlığın çıktığı yeri baştan kapatan pratik rehber.",
    eyebrow: "Süreç",
    published: "2026-09-01",
    updated: "2026-09-01",
    lead: "Hurda satışında tartışma çıkacaksa, neredeyse her zaman kantarda çıkar. Oysa üç kavramı ve tek bir kuralı bilmek bu tartışmayı baştan bitirir: tartıda bulunun, fişi alın.",
    sections: [
      {
        heading: "Dara, brüt, net",
        paragraphs: [
          "Kamyon önce boş tartılır — bu dara'dır. Yüklendikten sonra tekrar tartılır, bu brüt ağırlıktır. İkisinin farkı net ağırlıktır ve ödemesi yapılan da budur.",
          "Kritik nokta: daranın ne zaman alındığı. Dara, o seferin başında ve aynı kamyon için alınmalıdır. Başka bir seferin darası ya da tahmini bir dara, doğrudan sizin tonajınızdan düşer.",
        ],
      },
      {
        heading: "Kantar fişinde ne olmalı",
        paragraphs: [
          "Fiş, işin tek kalıcı kaydıdır. Üzerinde tarih ve saat, plaka, dara, brüt ve net ağırlık bulunmalıdır. Birden fazla sefer çıkan işlerde her sefer ayrı fişlenir; toplam tonaj sizin elinizdeki fişlerin toplamıdır, sözlü bir rakam değil.",
        ],
      },
      {
        heading: "Tartıda kim bulunur?",
        paragraphs: [
          "Siz ya da görevlendirdiğiniz biri. Tartının hangi kantarda yapılacağı işe başlamadan konuşulur ve tartı sizin gözetiminizde yapılır. Bu, güvensizlik değil usuldür: gören iki taraf da sonradan aynı rakamı konuşur.",
        ],
      },
      {
        heading: "Ödeme ne zaman?",
        paragraphs: [
          "Ödeme, tartım tamamlandıktan sonra yapılır. İşin büyüklüğüne göre ödeme şeklini birlikte belirleriz. Ödemenin ileri bir tarihe atıldığı bir düzen size teklif ediliyorsa, sebebini ve tarihini yazılı isteyin.",
        ],
      },
      {
        heading: "Kurumsal satışta evrak",
        paragraphs: [
          "Şirket olarak satış yapıyorsanız muhasebenizin isteyeceği belgeler bellidir ve tartı fişiyle birlikte düzenlenir. Hurdaya ayrılacak araç ve üst yapılarda ise süreç resmî kurumlar üzerinden yürür; hangi belgenin nereden alınacağı konusunda adım adım yönlendirme yapıyoruz.",
        ],
      },
    ],
    faq: [
      {
        question: "Kantar fişini kim saklamalı?",
        answer:
          "Her iki taraf da bir nüsha saklar. Fişin aslı ya da nüshası satıcıya elden teslim edilmelidir; ödeme hesabı bu belge üzerinden yapılır.",
      },
      {
        question: "Yük çamurlu veya ıslaksa tartıyı etkiler mi?",
        answer:
          "Etkiler. Su, toprak ve çamur brüt ağırlığa girer ama metal değildir; bu yüzden ıslak ve çamurlu yüklerde ton fiyatı bu payı karşılayacak şekilde konuşulur. Yükü yağmurda açıkta bekletmemek doğrudan sizin lehinizedir.",
      },
    ],
    related: ["about", "contact"],
    areas: ["soma", "savastepe"],
  },
  {
    slug: "makineniz-hurda-mi-ikinci-el-mi",
    seoTitle: "Makineniz Hurda mı, İkinci El mi?",
    title: "Makineniz hurda mı, ikinci el mi?",
    description:
      "Çalışır durumdaki bir makine, hurda tonaj fiyatının üzerinde değerlenir. Hangi ekipman ikinci el sayılır, nasıl fotoğraflanır, etiket bilgisi neden önemli? Değeri yığının içinde kaybetmemek için rehber.",
    eyebrow: "Değerleme",
    published: "2026-09-01",
    updated: "2026-09-01",
    lead: "Bir makineyi hurdaya vermek, onu ağırlığı üzerinden satmak demektir. Oysa aynı makine çalışıyorsa ya da başkasına yedek parça oluyorsa, ağırlığının çok üzerinde bir karşılığı olabilir. Aradaki farkı belirleyen şey, çoğu zaman yalnızca birkaç fotoğraf ve bir etiket.",
    sections: [
      {
        heading: "Fark nereden çıkıyor?",
        paragraphs: [
          "Hurda, ağırlıkla değerlenir: cinsi ve tonajı belli, sonuç bir çarpma işlemidir. İkinci el ekipman ise ihtiyaçla değerlenir — o parçayı arayan biri varsa değeri ağırlığından bağımsızdır.",
          "Bu yüzden bir tesis boşaltılırken en pahalı hata, çalışır ekipmanı hurda yığınına atmaktır. Yığına giren bir redüktör, artık bir redüktör değil; birkaç yüz kilo dökümdür.",
        ],
      },
      {
        heading: "Hangi ekipman ikinci el olarak değerlenir?",
        paragraphs: [
          "Sahamızda ikinci el olarak duran kalemler, hangi tür ekipmanın bu şekilde değerlendiğini de gösteriyor:",
        ],
        bullets: [
          "Elektrik motoru ve redüktör — mili ve gövdesi sağlam olanlar",
          "Konveyör tamburu — kaplaması ve yatakları duruyorsa",
          "Hidrolik ünite, pompa ve silindir",
          "Tank, paslanmaz tank ve silo — gövdesi delinmemişse",
          "Damper kasa, römork şasisi, tanker gövdesi",
          "Büyük çaplı ve kalın cidarlı boru — kesilmemiş, ölçüsü belli olanlar",
        ],
      },
      {
        heading: "Nasıl fotoğraflanır?",
        paragraphs: [
          "Değerlemenin tamamı çoğu zaman fotoğraflardan yapılır. Üç kare çoğu ekipman için yeterlidir: tamamı görünecek şekilde uzaktan bir genel kare, ölçünün anlaşılacağı bir yandan kare, ve etiketin okunduğu bir yakın kare.",
          "Yanına bir metre ya da tanıdık bir nesne koymak ölçüyü anlatır. Gündüz ışığında ve yığından ayrılmış hâlde çekilen fotoğraf, yığının içinde çekilenden daha iyi bir rakam getirir.",
        ],
      },
      {
        heading: "Etiketi silmeyin",
        paragraphs: [
          "Motor, redüktör ve pompaların üzerindeki bilgi etiketi — güç, devir, çevrim oranı, seri numarası — parçanın kimliğidir. Etiketi okunabilen bir ekipman aranabilir, eşleştirilebilir ve satılabilir; okunamayan bir ekipman ise ancak tahminle değerlenir ve tahmin daima aşağı yönlüdür.",
        ],
      },
      {
        heading: "Emin değilseniz sorun",
        paragraphs: [
          "Çalışıp çalışmadığını bilmediğiniz bir ekipmanı hurdaya yazmadan önce fotoğrafını gönderin. Hangi parçanın çalışır durumda, hangisinin yedek parçalık olduğunu açıkça söylüyoruz — kendi sahamızdaki ekipman için de aynı şeyi yapıyoruz.",
        ],
      },
    ],
    faq: [
      {
        question: "Çalışmayan bir motorun ikinci el değeri olur mu?",
        answer:
          "Olabilir. Sargısı yanmış bir motor sarılarak kullanılabilir, gövdesi ve rulman yuvaları sağlamsa yedek parça olarak değerlenir. Bu yüzden çalışmayan motoru da hurdaya yazmadan önce sorun.",
      },
      {
        question: "İkinci el ekipman satışı da yapıyor musunuz?",
        answer:
          "Evet. Sahamızda konveyör tamburu, redüktör, elektrik motoru, tank, damper kasa ve büyük çaplı boru gibi parçalar bulunuyor. Hepsi çalışır durumda değildir; hangisinin çalıştığını, hangisinin yedek parçalık olduğunu açıkça söyleriz.",
      },
    ],
    related: ["gallery", "services", "contact"],
    areas: ["soma", "kula", "salihli"],
  },
];
