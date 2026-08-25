import type { Localized } from "@/lib/i18n";

/** Butonlar, etiketler ve tekrar eden kısa metinler. */
export const UI = {
  whatsappWrite: { tr: "WhatsApp'tan Yazın", en: "Message on WhatsApp" },
  whatsappShort: { tr: "WhatsApp", en: "WhatsApp" },
  call: { tr: "Ara", en: "Call" },
  callNow: { tr: "Hemen Arayın", en: "Call Now" },
  getQuote: { tr: "Teklif Alın", en: "Get a Quote" },
  askPrice: { tr: "Fiyat Sor", en: "Ask Price" },
  askAbout: { tr: "Bu Ürünü Sor", en: "Ask About This" },
  sendPhotos: { tr: "Fotoğraf Gönderin", en: "Send Photos" },
  detail: { tr: "Detay", en: "Details" },
  allServices: { tr: "Tüm Hizmetler", en: "All Services" },
  allPhotos: { tr: "Tüm Fotoğraflar", en: "All Photos" },
  menu: { tr: "Menü", en: "Menu" },
  close: { tr: "Kapat", en: "Close" },
  previous: { tr: "Önceki", en: "Previous" },
  next: { tr: "Sonraki", en: "Next" },
  videoSection: {
    tr: "Havadan saha görüntüleri",
    en: "Aerial views of the yard",
  },
  playVideo: { tr: "Videoyu oynat", en: "Play video" },
  scrollDown: { tr: "Aşağı kaydırın", en: "Scroll down" },
  address: { tr: "Adres", en: "Address" },
  phone: { tr: "Telefon", en: "Phone" },
  workingHours: { tr: "Çalışma Saatleri", en: "Working Hours" },
  serviceArea: { tr: "Hizmet Bölgesi", en: "Service Area" },
  openInMaps: { tr: "Haritada Aç", en: "Open in Maps" },
  quickContact: { tr: "Hızlı İletişim", en: "Quick Contact" },
  writeNow: { tr: "Hemen yazın", en: "Message us" },
} as const satisfies Record<string, Localized>;

/** Sayfa başlıkları ve giriş metinleri. */
export const PAGE_HEADERS = {
  services: {
    eyebrow: { tr: "Ne Yapıyoruz", en: "What We Do" },
    title: { tr: "Hizmetlerimiz", en: "Our Services" },
    lead: {
      tr: "Hurdanın tartılıp ödenmesinden komple tesisin sökülüp sahadan kaldırılmasına kadar, işin tamamını tek elden yürütüyoruz.",
      en: "From weighing and paying for a load of scrap to dismantling an entire plant and clearing the site, we handle the whole job in-house.",
    },
  },
  materials: {
    eyebrow: { tr: "Ne Alıyoruz", en: "What We Buy" },
    title: { tr: "Aldığımız Malzemeler", en: "Materials We Buy" },
    lead: {
      tr: "Aşağıdaki listede olmayan bir malzemeniz varsa yine de sorun — hurdanın çoğu kalemi karışık gelir, ayrıştırmayı biz yaparız.",
      en: "If what you have is not on this list, ask anyway — most scrap arrives mixed, and the sorting is our job, not yours.",
    },
  },
  gallery: {
    eyebrow: { tr: "Sahamızdan", en: "From Our Yard" },
    title: { tr: "Galeri", en: "Gallery" },
    lead: {
      tr: "Sahamızda bulunan hurda ve ekipmandan kareler. İlgilendiğiniz bir parça varsa fotoğrafın altındaki butondan doğrudan sorabilirsiniz.",
      en: "Snapshots of the scrap and equipment in our yard. If a piece interests you, the button under each photo asks about it directly.",
    },
  },
  about: {
    eyebrow: { tr: "Biz Kimiz", en: "Who We Are" },
    title: { tr: "Hakkımızda", en: "About Us" },
    lead: {
      tr: "Soma'da, sanayinin içinde çalışan bir hurda ve ikinci el ekipman işletmesiyiz.",
      en: "We are a scrap and used-equipment business working inside Soma's industrial district.",
    },
  },
  contact: {
    eyebrow: { tr: "Bize Ulaşın", en: "Get in Touch" },
    title: { tr: "İletişim", en: "Contact" },
    lead: {
      tr: "En hızlı yol WhatsApp. Fotoğrafı gönderin, fiyatı konuşalım.",
      en: "WhatsApp is the fastest route. Send a photo and let's talk price.",
    },
  },
} as const;

/** Ana sayfa metinleri. */
export const HOME = {
  hero: {
    // Konum zaten üst künye şeridinde yazıyor; burada tekrar etmek yerine
    // işin ne olduğunu söylüyoruz.
    eyebrow: {
      tr: "Hurda alımı · Tesis sökümü · Ekipman satışı",
      en: "Scrap purchasing · Dismantling · Equipment sales",
    },
    title: {
      tr: "Endüstriyel Hurda ve İkinci El Ekipmanda Doğru Adres",
      en: "The Right Address for Industrial Scrap and Used Equipment",
    },
    lead: {
      tr: "Fabrika, şantiye ve atölyelerden her tonajda hurda alıyor; tesis sökümünü baştan sona üstleniyoruz. Sahamızda satılık makine ve ekipman da bulunur.",
      en: "We buy scrap of any tonnage from factories, sites and workshops, and take on plant dismantling from start to finish. Our yard also stocks machinery and equipment for sale.",
    },
    note: {
      tr: "Fiyat sormak için fotoğraf yeterli — WhatsApp'tan gönderin.",
      en: "A photo is enough to get a price — send it over WhatsApp.",
    },
  },

  /**
   * Künye şeridi — hero'nun altındaki bilgi plakası.
   * Bu ifadeleri kendi çalışma şeklinize göre düzenleyin.
   */
  specs: [
    {
      label: { tr: "Hizmet Bölgesi", en: "Service Area" },
      value: { tr: "4 il", en: "4 provinces" },
      note: {
        tr: "Manisa · Balıkesir · İzmir · Kütahya",
        en: "Manisa · Balıkesir · İzmir · Kütahya",
      },
    },
    {
      label: { tr: "Tonaj", en: "Tonnage" },
      value: { tr: "Sınırsız", en: "No limit" },
      note: {
        tr: "Tek kamyon yükünden komple tesis sökümüne",
        en: "From a single truckload to a full plant teardown",
      },
    },
    {
      label: { tr: "Keşif", en: "Survey" },
      value: { tr: "Yerinde", en: "On site" },
      note: {
        tr: "Tonajı büyük işlerde görmeden fiyat vermeyiz",
        en: "For larger jobs we never quote without seeing it",
      },
    },
    {
      label: { tr: "Ödeme", en: "Payment" },
      value: { tr: "Tartı sonrası", en: "After weighing" },
      note: {
        tr: "Kantar fişi elden teslim edilir",
        en: "The weighbridge ticket is handed to you",
      },
    },
  ],

  servicesSection: {
    eyebrow: { tr: "Hizmetlerimiz", en: "Our Services" },
    title: { tr: "Dört Ana Başlıkta Çalışıyoruz", en: "Four Lines of Work" },
    lead: {
      tr: "Hangisi size uyuyorsa doğrudan o başlıktan yazın; mesajınız konusuyla birlikte bize ulaşsın.",
      en: "Message us straight from whichever one fits — your enquiry arrives with its subject already attached.",
    },
  },

  processSection: {
    eyebrow: { tr: "Nasıl İlerliyor", en: "How It Works" },
    title: { tr: "Fotoğraftan Ödemeye Dört Adım", en: "From Photo to Payment in Four Steps" },
    steps: [
      {
        title: { tr: "Fotoğrafı Gönderin", en: "Send a Photo" },
        text: {
          tr: "WhatsApp'tan malzemenin birkaç fotoğrafını ve konumunu iletin. Çoğu iş için bu kadarı yeterli.",
          en: "Send a few photos of the material and your location over WhatsApp. For most jobs that is all we need.",
        },
      },
      {
        title: { tr: "Ön Fiyatı Alın", en: "Get an Indicative Price" },
        text: {
          tr: "Malzemenin türüne ve tahmini tonajına göre aynı gün ön fiyat söylüyoruz.",
          en: "Based on the type and estimated tonnage we give you an indicative price the same day.",
        },
      },
      {
        title: { tr: "Keşif ve Yükleme", en: "Survey & Loading" },
        text: {
          tr: "Anlaşırsak ekip sahaya gelir; gerekiyorsa keser, söker ve yükler.",
          en: "Once agreed, our crew comes to site and cuts, dismantles and loads as needed.",
        },
      },
      {
        title: { tr: "Tartı ve Ödeme", en: "Weighing & Payment" },
        text: {
          tr: "Kantarda tartılır, fiş elinize verilir ve ödeme tartı sonrası yapılır.",
          en: "The load is weighed, you receive the ticket, and payment follows the weighing.",
        },
      },
    ],
  },

  gallerySection: {
    eyebrow: { tr: "Sahamızdan", en: "From Our Yard" },
    title: { tr: "Ne Aldığımızı Görün", en: "See What We Handle" },
    lead: {
      tr: "Bu fotoğraflar sahamızdan. Aradığınız bir parça varsa aynı yerden sorabilirsiniz.",
      en: "These photos are from our own yard. If you are after a particular part, ask right there.",
    },
  },

  ctaBand: {
    title: {
      tr: "Hurdanız mı var, ekipman mı arıyorsunuz?",
      en: "Got scrap to sell, or looking for equipment?",
    },
    text: {
      tr: "İki durumda da cevap bir mesaj uzağınızda. Fotoğrafı atın, gerisini konuşalım.",
      en: "Either way the answer is one message away. Send a photo and we will take it from there.",
    },
  },
} as const;

/** Hakkımızda sayfası metinleri. */
export const ABOUT = {
  story: {
    title: { tr: "Sahada Büyüyen Bir İş", en: "A Business Built in the Yard" },
    paragraphs: {
      tr: [
        "Durmazlar Hurdacılık, Soma'da sanayinin tam içinde çalışan bir hurda alım ve ikinci el ekipman işletmesidir. Bölgedeki madenler, termik santral ve sanayi tesisleri; konveyör hatları, kırıcılar, tanklar ve çelik konstrüksiyon gibi ağır malzemeyi düzenli olarak elden çıkarır. Biz de yıllardır bu malzemeyi alıyor, ayrıştırıyor ve değerlendiriyoruz.",
        "Sahamızda gördüğünüz her parçanın bir geçmişi var: bir kısmı sökümünü bizzat yaptığımız tesislerden geldi, bir kısmı ikinci el olarak yeni sahibini bekliyor. Hurdaya gitmesi gerekeni hurdaya, çalışır durumda olanı kullanacak kişiye yönlendirmek işin en kıymetli tarafı.",
        "Küçük bir kamyon yükünden komple fabrika sökümüne kadar her ölçekte iş yapıyoruz. İşin büyüğü küçüğü yok; olan tek fark, büyük işlerde sahaya gelip görmemiz.",
      ],
      en: [
        "Durmazlar Hurdacılık is a scrap buying and used-equipment business working right inside Soma's industrial district. The mines, power plant and industrial facilities in this region regularly retire heavy material — conveyor lines, crushers, tanks and structural steel. For years we have been buying that material, sorting it and putting it back to use.",
        "Every item in our yard has a history: some of it came from plants we dismantled ourselves, and some is waiting for a second owner. Sending what should be melted to the furnace, and what still runs to someone who will use it — that is the most valuable part of this work.",
        "We take on jobs at every scale, from a single truckload to a complete factory teardown. No job is too small; the only difference is that for the larger ones we come and see the site first.",
      ],
    },
  },

  principles: {
    title: { tr: "Çalışma Prensiplerimiz", en: "How We Work" },
    items: [
      {
        title: { tr: "Görmeden fiyat vermeyiz", en: "We do not quote blind" },
        text: {
          tr: "Fotoğraf üzerinden ön fiyat söyleriz ama kesin rakam için malzemeyi görmek gerekir. Sonradan düşürülen fiyat, kimsenin işine yaramaz.",
          en: "We will give an indicative figure from photos, but a firm price needs the material in front of us. A price revised downwards later serves nobody.",
        },
      },
      {
        title: { tr: "Tartı ortada yapılır", en: "Weighing happens in the open" },
        text: {
          tr: "Kantar tartımı sizin gözetiminizde olur, fiş elinize verilir. Tartıyı görmediğiniz bir işlemi kabul etmeyin — bizde de etmeyin.",
          en: "Weighing takes place with you watching and the ticket goes into your hand. Never accept a deal whose weighing you did not see — not from us either.",
        },
      },
      {
        title: { tr: "Sahayı boş bırakırız", en: "We leave the site clear" },
        text: {
          tr: "Söküm işlerinde kesim artığı, cıvata ve moloz sahada kalmaz. İş bittiğinde alan kullanılabilir durumda teslim edilir.",
          en: "On dismantling jobs, offcuts, bolts and rubble do not stay behind. When the work is done the area is handed back ready to use.",
        },
      },
      {
        title: { tr: "Güvenlik pazarlık konusu değil", en: "Safety is not negotiable" },
        text: {
          tr: "Ekip kişisel koruyucu donanımla çalışır; sıcak işlem yapılan yerde yangın önlemi alınır. Tesisinizin kendi güvenlik kurallarına da uyarız.",
          en: "Our crew works in personal protective equipment and fire precautions are taken wherever hot work happens. We also follow your own site safety rules.",
        },
      },
    ],
  },

  environment: {
    title: { tr: "Geri Dönüşüm ve Çevre", en: "Recycling & the Environment" },
    paragraphs: {
      tr: [
        "Hurda metal, sonu olmayan bir malzemedir: eritilip yeniden üretilebilir ve bu, cevherden çelik üretmeye kıyasla çok daha az enerji harcar. Sahamızdan çıkan her ton, o kadar cevherin yerin altında kalması demek.",
        "Bu yüzden ayrıştırmaya önem veriyoruz. Demir, renkli metal, kablo ve ekipman ayrı ayrı değerlendiriliyor; kullanılabilir durumdaki makine ise eritilmeden yeni bir sahaya gidiyor.",
      ],
      en: [
        "Scrap metal is a material without an end: it can be melted and made again, using far less energy than producing steel from ore. Every tonne that leaves our yard is that much ore left in the ground.",
        "That is why sorting matters to us. Ferrous metal, non-ferrous, cable and equipment are each handled separately, and machinery still fit for work goes to a new site instead of the furnace.",
      ],
    },
  },
} as const;

/** İletişim sayfası metinleri. */
export const CONTACT = {
  formTitle: { tr: "Teklif Formu", en: "Quote Request" },
  formLead: {
    tr: "Aşağıyı doldurun; bilgiler düzenli bir mesaj hâlinde WhatsApp'ta açılsın. Doğrudan yazmayı tercih ederseniz sağdaki butonu kullanın.",
    en: "Fill this in and the details open as a tidy WhatsApp message. If you would rather just write, use the button on the right.",
  },
  fields: {
    name: { tr: "Ad Soyad", en: "Full name" },
    phone: { tr: "Telefon", en: "Phone" },
    location: { tr: "Şehir / İlçe", en: "City / district" },
    materials: { tr: "Malzeme türü", en: "Material type" },
    materialsHint: {
      tr: "Birden fazla seçebilirsiniz",
      en: "You can pick more than one",
    },
    quantity: { tr: "Yaklaşık miktar", en: "Approximate quantity" },
    quantityPlaceholder: { tr: "örn. 15 ton", en: "e.g. 15 tonnes" },
    dismantling: { tr: "Yerinde söküm gerekiyor mu?", en: "Is on-site dismantling needed?" },
    yes: { tr: "Evet", en: "Yes" },
    no: { tr: "Hayır", en: "No" },
    note: { tr: "Eklemek istedikleriniz", en: "Anything else" },
    notePlaceholder: {
      tr: "Erişim, zemin, forklift durumu vb.",
      en: "Access, ground conditions, forklift availability…",
    },
  },
  submit: { tr: "WhatsApp'ta Aç", en: "Open in WhatsApp" },
  submitHint: {
    tr: "Form e-posta göndermez; bilgileri WhatsApp mesajına dönüştürür. Göndermeden önce mesajı görüp düzenleyebilirsiniz.",
    en: "This form sends no email; it turns your details into a WhatsApp message. You can review and edit it before sending.",
  },
  errors: {
    name: { tr: "Adınızı yazın.", en: "Please enter your name." },
    phone: {
      tr: "Geçerli bir telefon numarası yazın.",
      en: "Please enter a valid phone number.",
    },
    /** Eksik alan varsa formun başında beliren özet başlığı. */
    summary: {
      tr: "Formda eksik var",
      en: "There is a problem with the form",
    },
  },
  photoHint: {
    title: { tr: "Fotoğraf göndermek en hızlısı", en: "Photos are the fastest route" },
    text: {
      tr: "Malzemenin fotoğrafını WhatsApp'tan atarsanız çoğu durumda aynı gün ön fiyat söyleyebiliriz. Siteye dosya yüklemenize gerek yok.",
      en: "If you send photos of the material over WhatsApp we can usually give an indicative price the same day. No need to upload anything here.",
    },
  },
} as const;
