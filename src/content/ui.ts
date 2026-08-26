import type { Localized } from "@/lib/i18n";

/** Butonlar, etiketler ve tekrar eden kısa metinler. */
export const UI = {
  whatsappWrite: {
    tr: "WhatsApp'tan Yazın",
    en: "Message on WhatsApp",
    ru: "Написать в WhatsApp",
    ar: "راسلنا على واتساب",
  },
  whatsappShort: {
    tr: "WhatsApp",
    en: "WhatsApp",
    ru: "WhatsApp",
    ar: "واتساب",
  },
  call: {
    tr: "Ara",
    en: "Call",
    ru: "Позвонить",
    ar: "اتصال",
  },
  callUs: {
    tr: "Bizi Arayın",
    en: "Call Us",
    ru: "Позвоните нам",
    ar: "اتصلوا بنا",
  },
  callNow: {
    tr: "Hemen Arayın",
    en: "Call Now",
    ru: "Позвонить сейчас",
    ar: "اتصلوا الآن",
  },
  getQuote: {
    tr: "Teklif Alın",
    en: "Get a Quote",
    ru: "Запросить цену",
    ar: "اطلب عرض سعر",
  },
  askPrice: {
    tr: "Fiyat Sor",
    en: "Ask Price",
    ru: "Узнать цену",
    ar: "اسأل عن السعر",
  },
  askAbout: {
    tr: "Bu Ürünü Sor",
    en: "Ask About This",
    ru: "Спросить об этом",
    ar: "استفسر عن هذا",
  },
  sendPhotos: {
    tr: "Fotoğraf Gönderin",
    en: "Send Photos",
    ru: "Отправить фото",
    ar: "أرسلوا الصور",
  },
  detail: {
    tr: "Detay",
    en: "Details",
    ru: "Подробнее",
    ar: "التفاصيل",
  },
  allServices: {
    tr: "Tüm Hizmetler",
    en: "All Services",
    ru: "Все услуги",
    ar: "كل الخدمات",
  },
  allPhotos: {
    tr: "Tüm Fotoğraflar",
    en: "All Photos",
    ru: "Все фотографии",
    ar: "كل الصور",
  },
  skipToContent: {
    tr: "İçeriğe geç",
    en: "Skip to content",
    ru: "Перейти к содержимому",
    ar: "تخطَّ إلى المحتوى",
  },
  language: {
    tr: "Dil",
    en: "Language",
    ru: "Язык",
    ar: "اللغة",
  },
  menu: {
    tr: "Menü",
    en: "Menu",
    ru: "Меню",
    ar: "القائمة",
  },
  close: {
    tr: "Kapat",
    en: "Close",
    ru: "Закрыть",
    ar: "إغلاق",
  },
  previous: {
    tr: "Önceki",
    en: "Previous",
    ru: "Назад",
    ar: "السابق",
  },
  next: {
    tr: "Sonraki",
    en: "Next",
    ru: "Далее",
    ar: "التالي",
  },
  videoSection: {
    tr: "Havadan saha görüntüleri",
    en: "Aerial views of the yard",
    ru: "Съёмка площадки с воздуха",
    ar: "لقطات جوية للساحة",
  },
  playVideo: {
    tr: "Videoyu oynat",
    en: "Play video",
    ru: "Воспроизвести видео",
    ar: "تشغيل الفيديو",
  },
  chooseContact: {
    tr: "Kiminle görüşeceksiniz?",
    en: "Who would you like to reach?",
    ru: "С кем связаться?",
    ar: "بمن تودّون التواصل؟",
  },
  scrollDown: {
    tr: "Aşağı kaydırın",
    en: "Scroll down",
    ru: "Прокрутите вниз",
    ar: "مرّر للأسفل",
  },
  address: {
    tr: "Adres",
    en: "Address",
    ru: "Адрес",
    ar: "العنوان",
  },
  phone: {
    tr: "Telefon",
    en: "Phone",
    ru: "Телефон",
    ar: "الهاتف",
  },
  email: {
    tr: "E-posta",
    en: "Email",
    ru: "Эл. почта",
    ar: "البريد الإلكتروني",
  },
  workingHours: {
    tr: "Çalışma Saatleri",
    en: "Working Hours",
    ru: "Часы работы",
    ar: "ساعات العمل",
  },
  serviceArea: {
    tr: "Hizmet Bölgesi",
    en: "Service Area",
    ru: "Регион обслуживания",
    ar: "نطاق الخدمة",
  },
  openInMaps: {
    tr: "Haritada Aç",
    en: "Open in Maps",
    ru: "Открыть на карте",
    ar: "افتح على الخريطة",
  },
  quickContact: {
    tr: "Hızlı İletişim",
    en: "Quick Contact",
    ru: "Быстрая связь",
    ar: "تواصل سريع",
  },
  writeNow: {
    tr: "Hemen yazın",
    en: "Message us",
    ru: "Напишите нам",
    ar: "راسلونا الآن",
  },
} as const satisfies Record<string, Localized>;

/** Sayfa başlıkları ve giriş metinleri. */
export const PAGE_HEADERS = {
  services: {
    eyebrow: {
      tr: "Ne Yapıyoruz",
      en: "What We Do",
      ru: "Чем мы занимаемся",
      ar: "ماذا نفعل",
    },
    title: {
      tr: "Hizmetlerimiz",
      en: "Our Services",
      ru: "Наши услуги",
      ar: "خدماتنا",
    },
    lead: {
      tr: "Hurdanın tartılıp ödenmesinden komple tesisin sökülüp sahadan kaldırılmasına kadar, işin tamamını tek elden yürütüyoruz.",
      en: "From weighing and paying for a load of scrap to dismantling an entire plant and clearing the site, we handle the whole job in-house.",
      ru: "От взвешивания и оплаты партии лома до демонтажа целого завода и расчистки площадки — всю работу ведём своими силами.",
      ar: "من وزن الخردة ودفع ثمنها إلى تفكيك منشأة كاملة وإخلاء الموقع، ننفّذ العمل كله بأيدينا.",
    },
  },
  materials: {
    eyebrow: {
      tr: "Ne Alıyoruz",
      en: "What We Buy",
      ru: "Что мы покупаем",
      ar: "ماذا نشتري",
    },
    title: {
      tr: "Aldığımız Malzemeler",
      en: "Materials We Buy",
      ru: "Что мы покупаем",
      ar: "المواد التي نشتريها",
    },
    lead: {
      tr: "Aşağıdaki listede olmayan bir malzemeniz varsa yine de sorun — hurdanın çoğu kalemi karışık gelir, ayrıştırmayı biz yaparız.",
      en: "If what you have is not on this list, ask anyway — most scrap arrives mixed, and the sorting is our job, not yours.",
      ru: "Если вашего материала нет в списке, всё равно спросите: лом чаще всего приходит смешанным, а сортировка — наша работа, не ваша.",
      ar: "إذا لم تجدوا مادتكم في القائمة فاسألونا على أي حال — فالخردة تصل مختلطة غالباً، والفرز مهمتنا لا مهمتكم.",
    },
  },
  gallery: {
    eyebrow: {
      tr: "Sahamızdan",
      en: "From Our Yard",
      ru: "С нашей площадки",
      ar: "من ساحتنا",
    },
    title: {
      tr: "Galeri",
      en: "Gallery",
      ru: "Галерея",
      ar: "معرض الصور",
    },
    lead: {
      tr: "Sahamızda bulunan hurda ve ekipmandan kareler. İlgilendiğiniz bir parça varsa fotoğrafın altındaki butondan doğrudan sorabilirsiniz.",
      en: "Snapshots of the scrap and equipment in our yard. If a piece interests you, the button under each photo asks about it directly.",
      ru: "Снимки лома и оборудования с нашей площадки. Если что-то заинтересовало, спросите прямо кнопкой под фотографией.",
      ar: "لقطات من الخردة والمعدات في ساحتنا. إن لفتت قطعة انتباهكم فاسألوا عنها مباشرة عبر الزر أسفل الصورة.",
    },
  },
  about: {
    eyebrow: {
      tr: "Biz Kimiz",
      en: "Who We Are",
      ru: "Кто мы",
      ar: "من نحن",
    },
    title: {
      tr: "Hakkımızda",
      en: "About Us",
      ru: "О нас",
      ar: "من نحن",
    },
    lead: {
      tr: "Soma'da, sanayinin içinde çalışan bir hurda ve ikinci el ekipman işletmesiyiz.",
      en: "We are a scrap and used-equipment business working inside Soma's industrial district.",
      ru: "Мы — предприятие по скупке лома и продаже б/у оборудования, работающее в промзоне Сомы.",
      ar: "نحن منشأة لشراء الخردة وبيع المعدات المستعملة، نعمل داخل المنطقة الصناعية في صوما.",
    },
  },
  contact: {
    eyebrow: {
      tr: "Bize Ulaşın",
      en: "Get in Touch",
      ru: "Свяжитесь с нами",
      ar: "تواصلوا معنا",
    },
    title: {
      tr: "İletişim",
      en: "Contact",
      ru: "Контакты",
      ar: "اتصل بنا",
    },
    lead: {
      tr: "En hızlı yol WhatsApp. Fotoğrafı gönderin, fiyatı konuşalım.",
      en: "WhatsApp is the fastest route. Send a photo and let's talk price.",
      ru: "Быстрее всего — WhatsApp. Пришлите фото, обсудим цену.",
      ar: "أسرع طريق هو واتساب. أرسلوا الصورة ولنتحدث في السعر.",
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
      ru: "Скупка лома · Демонтаж · Продажа оборудования",
      ar: "شراء الخردة · تفكيك المنشآت · بيع المعدات",
    },
    title: {
      tr: "Endüstriyel Hurda ve İkinci El Ekipmanda Doğru Adres",
      en: "The Right Address for Industrial Scrap and Used Equipment",
      ru: "Надёжный партнёр по промышленному лому и б/у оборудованию",
      ar: "العنوان الصحيح للخردة الصناعية والمعدات المستعملة",
    },
    lead: {
      tr: "Fabrika, şantiye ve atölyelerden her tonajda hurda alıyor; tesis sökümünü baştan sona üstleniyoruz. Sahamızda satılık makine ve ekipman da bulunur.",
      en: "We buy scrap of any tonnage from factories, sites and workshops, and take on plant dismantling from start to finish. Our yard also stocks machinery and equipment for sale.",
      ru: "Покупаем лом любого тоннажа с заводов, строек и мастерских и берём демонтаж под ключ. На площадке также есть машины и оборудование на продажу.",
      ar: "نشتري الخردة بأي تونّاج من المصانع والمواقع والورش، ونتولّى تفكيك المنشآت من البداية إلى النهاية. كما تتوفر في ساحتنا آلات ومعدات للبيع.",
    },
    note: {
      tr: "Fiyat sormak için fotoğraf yeterli — WhatsApp'tan gönderin.",
      en: "A photo is enough to get a price — send it over WhatsApp.",
      ru: "Для цены достаточно фотографии — пришлите её в WhatsApp.",
      ar: "صورة واحدة تكفي لمعرفة السعر — أرسلوها عبر واتساب.",
    },
  },

  /**
   * Künye şeridi — hero'nun altındaki bilgi plakası.
   * Bu ifadeleri kendi çalışma şeklinize göre düzenleyin.
   */
  specs: [
    {
      label: {
        tr: "Hizmet Bölgesi",
        en: "Service Area",
        ru: "Регион обслуживания",
        ar: "نطاق الخدمة",
      },
      value: {
        tr: "4 il",
        en: "4 provinces",
        ru: "4 провинции",
        ar: "4 ولايات",
      },
      note: {
        tr: "Manisa · Balıkesir · İzmir · Kütahya",
        en: "Manisa · Balıkesir · İzmir · Kütahya",
        ru: "Маниса · Балыкесир · Измир · Кютахья",
        ar: "مانيسا · باليكسير · إزمير · كوتاهيا",
      },
    },
    {
      label: {
        tr: "Tonaj",
        en: "Tonnage",
        ru: "Тоннаж",
        ar: "التونّاج",
      },
      value: {
        tr: "Sınırsız",
        en: "No limit",
        ru: "Без ограничений",
        ar: "بلا حدود",
      },
      note: {
        tr: "Tek kamyon yükünden komple tesis sökümüne",
        en: "From a single truckload to a full plant teardown",
        ru: "От одной машины до демонтажа целого завода",
        ar: "من حمولة شاحنة واحدة إلى تفكيك منشأة كاملة",
      },
    },
    {
      label: {
        tr: "Keşif",
        en: "Survey",
        ru: "Выезд",
        ar: "المعاينة",
      },
      value: {
        tr: "Yerinde",
        en: "On site",
        ru: "На объекте",
        ar: "في الموقع",
      },
      note: {
        tr: "Tonajı büyük işlerde görmeden fiyat vermeyiz",
        en: "For larger jobs we never quote without seeing it",
        ru: "При больших объёмах мы не называем цену, не увидев материал",
        ar: "في الأعمال الكبيرة لا نُسعّر دون رؤية",
      },
    },
    {
      label: {
        tr: "Ödeme",
        en: "Payment",
        ru: "Оплата",
        ar: "الدفع",
      },
      value: {
        tr: "Tartı sonrası",
        en: "After weighing",
        ru: "После взвешивания",
        ar: "بعد الوزن",
      },
      note: {
        tr: "Kantar fişi elden teslim edilir",
        en: "The weighbridge ticket is handed to you",
        ru: "Весовой талон передаётся вам на руки",
        ar: "يُسلَّم إيصال الوزن باليد",
      },
    },
  ],

  servicesSection: {
    eyebrow: {
      tr: "Hizmetlerimiz",
      en: "Our Services",
      ru: "Наши услуги",
      ar: "خدماتنا",
    },
    title: {
      tr: "Dört Ana Başlıkta Çalışıyoruz",
      en: "Four Lines of Work",
      ru: "Четыре направления работы",
      ar: "نعمل في أربعة مجالات رئيسية",
    },
    lead: {
      tr: "Hangisi size uyuyorsa doğrudan o başlıktan yazın; mesajınız konusuyla birlikte bize ulaşsın.",
      en: "Message us straight from whichever one fits — your enquiry arrives with its subject already attached.",
      ru: "Напишите прямо из подходящего раздела — тема запроса придёт к нам вместе с сообщением.",
      ar: "اكتبوا مباشرة من القسم المناسب، فيصلنا استفساركم ومعه موضوعه.",
    },
  },

  processSection: {
    eyebrow: {
      tr: "Nasıl İlerliyor",
      en: "How It Works",
      ru: "Как это работает",
      ar: "كيف تسير الأمور",
    },
    title: {
      tr: "Fotoğraftan Ödemeye Dört Adım",
      en: "From Photo to Payment in Four Steps",
      ru: "От фото до оплаты — четыре шага",
      ar: "من الصورة إلى الدفع في أربع خطوات",
    },
    steps: [
      {
        title: {
          tr: "Fotoğrafı Gönderin",
          en: "Send a Photo",
          ru: "Пришлите фото",
          ar: "أرسلوا الصورة",
        },
        text: {
          tr: "WhatsApp'tan malzemenin birkaç fotoğrafını ve konumunu iletin. Çoğu iş için bu kadarı yeterli.",
          en: "Send a few photos of the material and your location over WhatsApp. For most jobs that is all we need.",
          ru: "WhatsApp",
          ar: "واتساب",
        },
      },
      {
        title: {
          tr: "Ön Fiyatı Alın",
          en: "Get an Indicative Price",
          ru: "Получите ориентировочную цену",
          ar: "احصلوا على سعر مبدئي",
        },
        text: {
          tr: "Malzemenin türüne ve tahmini tonajına göre aynı gün ön fiyat söylüyoruz.",
          en: "Based on the type and estimated tonnage we give you an indicative price the same day.",
          ru: "По виду материала и примерному тоннажу мы называем ориентировочную цену в тот же день.",
          ar: "نعطيكم سعراً مبدئياً في اليوم نفسه حسب نوع المادة والتونّاج التقريبي.",
        },
      },
      {
        title: {
          tr: "Keşif ve Yükleme",
          en: "Survey & Loading",
          ru: "Выезд и погрузка",
          ar: "المعاينة والتحميل",
        },
        text: {
          tr: "Anlaşırsak ekip sahaya gelir; gerekiyorsa keser, söker ve yükler.",
          en: "Once agreed, our crew comes to site and cuts, dismantles and loads as needed.",
          ru: "При согласии бригада приезжает на объект: режет, демонтирует и грузит.",
          ar: "عند الاتفاق يأتي الفريق إلى الموقع؛ يقصّ ويفكّك ويحمّل عند اللزوم.",
        },
      },
      {
        title: {
          tr: "Tartı ve Ödeme",
          en: "Weighing & Payment",
          ru: "Взвешивание и оплата",
          ar: "الوزن والدفع",
        },
        text: {
          tr: "Kantarda tartılır, fiş elinize verilir ve ödeme tartı sonrası yapılır.",
          en: "The load is weighed, you receive the ticket, and payment follows the weighing.",
          ru: "Груз взвешивается на весах, талон передаётся вам, оплата — после взвешивания.",
          ar: "يُوزن على الميزان، ويُسلَّم إليكم الإيصال، ويتم الدفع بعد الوزن.",
        },
      },
    ],
  },

  gallerySection: {
    eyebrow: {
      tr: "Sahamızdan",
      en: "From Our Yard",
      ru: "С нашей площадки",
      ar: "من ساحتنا",
    },
    title: {
      tr: "Ne Aldığımızı Görün",
      en: "See What We Handle",
      ru: "Посмотрите, с чем мы работаем",
      ar: "شاهدوا ما نتعامل معه",
    },
    lead: {
      tr: "Bu fotoğraflar sahamızdan. Aradığınız bir parça varsa aynı yerden sorabilirsiniz.",
      en: "These photos are from our own yard. If you are after a particular part, ask right there.",
      ru: "Эти фотографии — с нашей площадки. Если ищете конкретную деталь, спросите прямо отсюда.",
      ar: "هذه الصور من ساحتنا. إن كنتم تبحثون عن قطعة بعينها فاسألوا من هنا مباشرة.",
    },
  },

  ctaBand: {
    title: {
      tr: "Hurdanız mı var, ekipman mı arıyorsunuz?",
      en: "Got scrap to sell, or looking for equipment?",
      ru: "Есть лом или ищете оборудование?",
      ar: "لديكم خردة أم تبحثون عن معدات؟",
    },
    text: {
      tr: "İki durumda da cevap bir mesaj uzağınızda. Fotoğrafı atın, gerisini konuşalım.",
      en: "Either way the answer is one message away. Send a photo and we will take it from there.",
      ru: "В обоих случаях ответ — на расстоянии одного сообщения. Пришлите фото, остальное обсудим.",
      ar: "في الحالتين الجواب على بُعد رسالة واحدة. أرسلوا الصورة ولنتحدث في الباقي.",
    },
  },
} as const;

/** Hakkımızda sayfası metinleri. */
export const ABOUT = {
  story: {
    title: {
      tr: "Sahada Büyüyen Bir İş",
      en: "A Business Built in the Yard",
      ru: "Дело, выросшее на площадке",
      ar: "عمل نشأ في الساحة",
    },
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
      ru: [
        "Durmazlar Hurdacılık — предприятие по приёму лома и продаже б/у оборудования, работающее в самом сердце промзоны Сомы. Шахты, тепловая электростанция и промышленные объекты региона регулярно списывают тяжёлое оборудование: конвейерные линии, дробилки, ёмкости, стальные конструкции. Мы годами покупаем этот материал, сортируем его и даём ему ход.",
        "У каждой позиции на нашей площадке есть история: часть привезена с объектов, которые мы демонтировали сами, часть ждёт нового владельца как б/у. Отправить в переплавку то, что должно быть переплавлено, а рабочее — тому, кто им воспользуется: в этом самая ценная часть нашей работы.",
        "Мы беремся за работу любого масштаба — от одной машины до демонтажа целого завода. Больших и малых заказов для нас нет; разница лишь в том, что на крупные мы обязательно выезжаем сами.",
      ],
      ar: [
        "Durmazlar Hurdacılık منشأة لشراء الخردة وبيع المعدات المستعملة تعمل في قلب المنطقة الصناعية في صوما. فالمناجم ومحطة الطاقة الحرارية والمنشآت الصناعية في المنطقة تتخلّص بانتظام من مواد ثقيلة كخطوط السيور والكسّارات والخزانات والهياكل الفولاذية. ونحن نشتري هذه المواد منذ سنوات ونفرزها ونعيد تقييمها.",
        "لكل قطعة ترونها في ساحتنا تاريخ: بعضها جاء من منشآت فكّكناها بأنفسنا، وبعضها ينتظر مالكاً جديداً كمعدة مستعملة. أن نرسل ما يستحق الصهر إلى الفرن، وما زال صالحاً إلى من سيستخدمه — هذا أثمن ما في هذا العمل.",
        "نعمل بكل الأحجام، من حمولة شاحنة صغيرة إلى تفكيك مصنع كامل. لا فرق عندنا بين عمل كبير وصغير؛ الفارق الوحيد أننا نأتي لنرى الموقع بأنفسنا في الأعمال الكبيرة.",
      ],
    },
  },

  principles: {
    title: {
      tr: "Çalışma Prensiplerimiz",
      en: "How We Work",
      ru: "Наши принципы работы",
      ar: "مبادئ عملنا",
    },
    items: [
      {
        title: {
          tr: "Görmeden fiyat vermeyiz",
          en: "We do not quote blind",
          ru: "Мы не называем цену вслепую",
          ar: "لا نُسعّر دون رؤية",
        },
        text: {
          tr: "Fotoğraf üzerinden ön fiyat söyleriz ama kesin rakam için malzemeyi görmek gerekir. Sonradan düşürülen fiyat, kimsenin işine yaramaz.",
          en: "We will give an indicative figure from photos, but a firm price needs the material in front of us. A price revised downwards later serves nobody.",
          ru: "По фотографиям мы даём ориентир, но твёрдая цена требует увидеть материал. Снижённая задним числом цена никому не нужна.",
          ar: "نعطي سعراً مبدئياً من الصور، لكن السعر النهائي يتطلب رؤية المادة. السعر الذي يُخفَّض لاحقاً لا يفيد أحداً.",
        },
      },
      {
        title: {
          tr: "Tartı ortada yapılır",
          en: "Weighing happens in the open",
          ru: "Взвешивание — при вас",
          ar: "الوزن يتم أمام أعينكم",
        },
        text: {
          tr: "Kantar tartımı sizin gözetiminizde olur, fiş elinize verilir. Tartıyı görmediğiniz bir işlemi kabul etmeyin — bizde de etmeyin.",
          en: "Weighing takes place with you watching and the ticket goes into your hand. Never accept a deal whose weighing you did not see — not from us either.",
          ru: "Взвешивание проходит под вашим наблюдением, талон передаётся вам. Никогда не соглашайтесь на сделку, где вы не видели весов — и у нас тоже.",
          ar: "يجري الوزن تحت إشرافكم ويُسلَّم إليكم الإيصال. لا تقبلوا معاملة لم تشهدوا وزنها — ولا حتى معنا.",
        },
      },
      {
        title: {
          tr: "Sahayı boş bırakırız",
          en: "We leave the site clear",
          ru: "Площадку сдаём чистой",
          ar: "نترك الموقع خالياً",
        },
        text: {
          tr: "Söküm işlerinde kesim artığı, cıvata ve moloz sahada kalmaz. İş bittiğinde alan kullanılabilir durumda teslim edilir.",
          en: "On dismantling jobs, offcuts, bolts and rubble do not stay behind. When the work is done the area is handed back ready to use.",
          ru: "После демонтажа на площадке не остаётся обрези, болтов и строительного мусора. По окончании работ участок сдаётся пригодным к использованию.",
          ar: "بعد أعمال التفكيك لا تبقى بقايا قصّ أو مسامير أو أنقاض في الموقع. عند انتهاء العمل تُسلَّم المساحة صالحة للاستخدام.",
        },
      },
      {
        title: {
          tr: "Güvenlik pazarlık konusu değil",
          en: "Safety is not negotiable",
          ru: "Безопасность не обсуждается",
          ar: "السلامة ليست محل تفاوض",
        },
        text: {
          tr: "Ekip kişisel koruyucu donanımla çalışır; sıcak işlem yapılan yerde yangın önlemi alınır. Tesisinizin kendi güvenlik kurallarına da uyarız.",
          en: "Our crew works in personal protective equipment and fire precautions are taken wherever hot work happens. We also follow your own site safety rules.",
          ru: "Бригада работает в СИЗ; там, где ведутся огневые работы, принимаются противопожарные меры. Мы соблюдаем и внутренние правила безопасности вашего предприятия.",
          ar: "يعمل الفريق بمعدات الوقاية الشخصية، وتُتخذ احتياطات الحريق في مواقع الأعمال الساخنة. كما نلتزم بقواعد السلامة الخاصة بمنشأتكم.",
        },
      },
    ],
  },

  environment: {
    title: {
      tr: "Geri Dönüşüm ve Çevre",
      en: "Recycling & the Environment",
      ru: "Переработка и экология",
      ar: "إعادة التدوير والبيئة",
    },
    paragraphs: {
      tr: [
        "Hurda metal, sonu olmayan bir malzemedir: eritilip yeniden üretilebilir ve bu, cevherden çelik üretmeye kıyasla çok daha az enerji harcar. Sahamızdan çıkan her ton, o kadar cevherin yerin altında kalması demek.",
        "Bu yüzden ayrıştırmaya önem veriyoruz. Demir, renkli metal, kablo ve ekipman ayrı ayrı değerlendiriliyor; kullanılabilir durumdaki makine ise eritilmeden yeni bir sahaya gidiyor.",
      ],
      en: [
        "Scrap metal is a material without an end: it can be melted and made again, using far less energy than producing steel from ore. Every tonne that leaves our yard is that much ore left in the ground.",
        "That is why sorting matters to us. Ferrous metal, non-ferrous, cable and equipment are each handled separately, and machinery still fit for work goes to a new site instead of the furnace.",
      ],
      ru: [
        "Металлолом — материал без конца: его можно переплавить и произвести заново, и это требует куда меньше энергии, чем выплавка стали из руды. Каждая тонна, уходящая с нашей площадки, — это столько же руды, оставшейся под землёй.",
        "Поэтому мы придаём значение сортировке. Чёрный металл, цветные металлы, кабель и оборудование оцениваются отдельно; а машина, которая ещё работает, отправляется на новую площадку, минуя печь.",
      ],
      ar: [
        "الخردة المعدنية مادة لا تنتهي: يمكن صهرها وإنتاجها من جديد، وهذا يستهلك طاقة أقل بكثير من إنتاج الصلب من الخام. كل طنّ يخرج من ساحتنا يعني بقاء ذلك القدر من الخام تحت الأرض.",
        "لذلك نولي الفرز أهمية. فالحديد والمعادن غير الحديدية والكابلات والمعدات تُقيَّم كلٌّ على حدة؛ أما الآلة الصالحة للعمل فتذهب إلى موقع جديد دون أن تُصهر.",
      ],
    },
  },
} as const;

/** İletişim sayfası metinleri. */
export const CONTACT = {
  formTitle: {
    tr: "Teklif Formu",
    en: "Quote Request",
    ru: "Форма запроса цены",
    ar: "نموذج طلب عرض سعر",
  },
  formLead: {
    tr: "Aşağıyı doldurun; bilgiler düzenli bir mesaj hâlinde WhatsApp'ta açılsın. Doğrudan yazmayı tercih ederseniz sağdaki butonu kullanın.",
    en: "Fill this in and the details open as a tidy WhatsApp message. If you would rather just write, use the button on the right.",
    ru: "Заполните форму — данные откроются аккуратным сообщением в WhatsApp. Если хотите написать сразу, используйте кнопку справа.",
    ar: "املأوا النموذج لتُفتح البيانات كرسالة مرتبة في واتساب. وإن فضّلتم الكتابة مباشرة فاستخدموا الزر على اليمين.",
  },
  fields: {
    name: {
      tr: "Ad Soyad",
      en: "Full name",
      ru: "Имя и фамилия",
      ar: "الاسم الكامل",
    },
    phone: {
      tr: "Telefon",
      en: "Phone",
      ru: "Телефон",
      ar: "الهاتف",
    },
    location: {
      tr: "Şehir / İlçe",
      en: "City / district",
      ru: "Город / район",
      ar: "المدينة / المنطقة",
    },
    materials: {
      tr: "Malzeme türü",
      en: "Material type",
      ru: "Вид материала",
      ar: "نوع المادة",
    },
    materialsHint: {
      tr: "Birden fazla seçebilirsiniz",
      en: "You can pick more than one",
      ru: "Можно выбрать несколько",
      ar: "يمكنكم اختيار أكثر من واحد",
    },
    quantity: {
      tr: "Yaklaşık miktar",
      en: "Approximate quantity",
      ru: "Примерное количество",
      ar: "الكمية التقريبية",
    },
    quantityPlaceholder: {
      tr: "örn. 15 ton",
      en: "e.g. 15 tonnes",
      ru: "напр. 15 тонн",
      ar: "مثال: 15 طناً",
    },
    contact: {
      tr: "Kiminle görüşmek istersiniz?",
      en: "Who would you like to speak with?",
      ru: "С кем вы хотите поговорить?",
      ar: "مع من تودّون التحدث؟",
    },
    /*
     * Seçim yalnızca WhatsApp yolunu ilgilendirir: mesaj o kişinin sohbetinde
     * açılır. E-posta tek bir kutuya düştüğü için orada bir anlamı yok —
     * yıldız işareti bu yüzden koşullu, notu da yanında duruyor.
     */
    contactNote: {
      tr: "WhatsApp'tan gönderecekseniz gerekli.",
      en: "Required if you send over WhatsApp.",
      ru: "Нужно, если отправляете в WhatsApp.",
      ar: "مطلوب إذا كنتم سترسلون عبر واتساب.",
    },
    dismantling: {
      tr: "Yerinde söküm gerekiyor mu?",
      en: "Is on-site dismantling needed?",
      ru: "Нужен ли демонтаж на месте?",
      ar: "هل التفكيك في الموقع مطلوب؟",
    },
    yes: {
      tr: "Evet",
      en: "Yes",
      ru: "Да",
      ar: "نعم",
    },
    no: {
      tr: "Hayır",
      en: "No",
      ru: "Нет",
      ar: "لا",
    },
    note: {
      tr: "Eklemek istedikleriniz",
      en: "Anything else",
      ru: "Что ещё добавить",
      ar: "ما تودّون إضافته",
    },
    notePlaceholder: {
      tr: "Erişim, zemin, forklift durumu vb.",
      en: "Access, ground conditions, forklift availability…",
      ru: "Подъезд, состояние грунта, наличие погрузчика и т. п.",
      ar: "الدخول وحالة الأرضية وتوفر الرافعة الشوكية وغيرها",
    },
  },
  submit: {
    tr: "WhatsApp'ta Aç",
    en: "Open in WhatsApp",
    ru: "Открыть в WhatsApp",
    ar: "افتح في واتساب",
  },
  submitEmail: {
    tr: "E-posta ile Gönder",
    en: "Send by Email",
    ru: "Отправить по почте",
    ar: "أرسل بالبريد الإلكتروني",
  },
  submitHint: {
    tr: "Form bilgilerinizi hazır bir mesaja dönüştürür — WhatsApp sohbetinde ya da e-posta uygulamanızda. İki durumda da göndermeden önce mesajı görüp düzenleyebilirsiniz.",
    en: "The form turns your details into a ready message — either in WhatsApp or in your email app. Either way you can review and edit it before sending.",
    ru: "Форма превращает ваши данные в готовое сообщение — в WhatsApp или в вашей почтовой программе. В обоих случаях перед отправкой его можно прочитать и изменить.",
    ar: "يحوّل النموذج بياناتكم إلى رسالة جاهزة — في واتساب أو في تطبيق بريدكم. في الحالتين يمكنكم مراجعتها وتعديلها قبل الإرسال.",
  },
  errors: {
    name: {
      tr: "Adınızı yazın.",
      en: "Please enter your name.",
      ru: "Укажите ваше имя.",
      ar: "اكتبوا اسمكم.",
    },
    phone: {
      tr: "Geçerli bir telefon numarası yazın.",
      en: "Please enter a valid phone number.",
      ru: "Введите корректный номер телефона.",
      ar: "اكتبوا رقم هاتف صحيحاً.",
    },
    contact: {
      tr: "WhatsApp'tan göndermek için görüşmek istediğiniz kişiyi seçin.",
      en: "To send over WhatsApp, please choose who to speak with.",
      ru: "Чтобы отправить в WhatsApp, выберите, с кем связаться.",
      ar: "للإرسال عبر واتساب، اختاروا الشخص الذي تودّون التحدث إليه.",
    },
    /** Eksik alan varsa formun başında beliren özet başlığı. */
    summary: {
      tr: "Formda eksik var",
      en: "There is a problem with the form",
      ru: "В форме есть незаполненное",
      ar: "النموذج به نقص",
    },
  },
  photoHint: {
    title: {
      tr: "Fotoğraf göndermek en hızlısı",
      en: "Photos are the fastest route",
      ru: "Фото — самый быстрый путь",
      ar: "إرسال الصور هو الأسرع",
    },
    text: {
      tr: "Malzemenin fotoğrafını WhatsApp'tan atarsanız çoğu durumda aynı gün ön fiyat söyleyebiliriz. Siteye dosya yüklemenize gerek yok.",
      en: "If you send photos of the material over WhatsApp we can usually give an indicative price the same day. No need to upload anything here.",
      ru: "Если пришлёте фото материала в WhatsApp, чаще всего мы назовём ориентировочную цену в тот же день. Ничего загружать на сайт не нужно.",
      ar: "إذا أرسلتم صور المادة عبر واتساب فغالباً ما نعطيكم سعراً مبدئياً في اليوم نفسه. لا حاجة لرفع أي ملف على الموقع.",
    },
  },
} as const;

/** Altbilgi metinleri. */
export const FOOTER = {
  blurb: {
    tr: "Soma / Manisa merkezli endüstriyel hurda alımı, tesis sökümü ve ikinci el makine satışı. Fotoğrafınızı gönderin, aynı gün fiyat konuşalım.",
    en: "Industrial scrap purchasing, plant dismantling and used machinery sales based in Soma / Manisa. Send a photo and we will talk price the same day.",
    ru: "Приём промышленного лома, демонтаж производств и продажа б/у техники. База — Сома, провинция Маниса. Пришлите фото, и в тот же день обсудим цену.",
    ar: "شراء الخردة الصناعية وتفكيك المنشآت وبيع الآلات المستعملة، ومقرنا صوما / مانيسا. أرسلوا صورتكم ونتحدث في السعر في اليوم نفسه.",
  },
  pages: {
    tr: "Sayfalar",
    en: "Pages",
    ru: "Страницы",
    ar: "الصفحات",
  },
  services: {
    tr: "Hizmetler",
    en: "Services",
    ru: "Услуги",
    ar: "الخدمات",
  },
  rights: {
    tr: "Tüm hakları saklıdır",
    en: "All rights reserved",
    ru: "Все права защищены",
    ar: "جميع الحقوق محفوظة",
  },
} as const satisfies Record<string, Localized>;

/** Sayfa içi küçük etiketler — daha önce bileşenlerde satır içi duruyordu. */
export const LABELS = {
  enlarge: {
    tr: "büyüt",
    en: "enlarge",
    ru: "увеличить",
    ar: "تكبير",
  },
  onThisPage: {
    tr: "Sayfa içeriği",
    en: "On this page",
    ru: "Содержание страницы",
    ar: "محتوى الصفحة",
  },
  contents: {
    tr: "İçindekiler",
    en: "Contents",
    ru: "Содержание",
    ar: "المحتويات",
  },
  service: {
    tr: "Hizmet",
    en: "Service",
    ru: "Услуга",
    ar: "خدمة",
  },
  scope: {
    tr: "Kapsam",
    en: "Scope",
    ru: "Что входит",
    ar: "نطاق العمل",
  },
  items: {
    tr: "Kalem",
    en: "Items",
    ru: "Позиций",
    ar: "بند",
  },
  groups: {
    tr: "Grup",
    en: "Groups",
    ru: "Групп",
    ar: "مجموعة",
  },
  note: {
    tr: "Not",
    en: "Note",
    ru: "Примечание",
    ar: "ملاحظة",
  },
  form: {
    tr: "Form",
    en: "Form",
    ru: "Форма",
    ar: "نموذج",
  },
  needEquipment: {
    tr: "Ekipman Arıyorum",
    en: "I Need Equipment",
    ru: "Ищу оборудование",
    ar: "أبحث عن معدات",
  },
  basedIn: {
    tr: "Merkez",
    en: "Based in",
    ru: "База",
    ar: "المقر",
  },
  story: {
    tr: "Hikâye",
    en: "Story",
    ru: "История",
    ar: "الحكاية",
  },
  howWeWork: {
    tr: "Nasıl çalışırız",
    en: "How we work",
    ru: "Как мы работаем",
    ar: "كيف نعمل",
  },
  recycling: {
    tr: "Geri dönüşüm",
    en: "Recycling",
    ru: "Переработка",
    ar: "إعادة التدوير",
  },
  faqLabel: {
    tr: "Sık sorulanlar",
    en: "FAQ",
    ru: "Частые вопросы",
    ar: "الأسئلة الشائعة",
  },
  faqTitle: {
    tr: "Merak Edilenler",
    en: "Questions We Are Asked Often",
    ru: "Что чаще всего спрашивают",
    ar: "أسئلة تُطرح كثيراً",
  },
  plates: {
    tr: "Kayıt",
    en: "Plates",
    ru: "Снимков",
    ar: "صورة",
  },
} as const satisfies Record<string, Localized>;
