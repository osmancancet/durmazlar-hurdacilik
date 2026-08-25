import type { Localized } from "@/lib/i18n";

export type Material = {
  id: string;
  name: Localized;
  /** Kabul edilen biçim / not — listede ikinci satır olarak görünür. */
  note: Localized;
};

export type MaterialGroup = {
  id: string;
  icon: "recycle" | "gear" | "crane" | "truck" | "bolt" | "layers";
  title: Localized;
  intro: Localized;
  items: Material[];
};

export const MATERIAL_GROUPS: MaterialGroup[] = [
  {
    id: "demir-celik",
    icon: "layers",
    title: {
      tr: "Demir ve Çelik Hurdası",
      en: "Ferrous Scrap",
      ru: "Лом чёрных металлов",
      ar: "خردة الحديد والصلب",
    },
    intro: {
      tr: "En çok işlem gördüğümüz grup. Karışık gelen yükler sahamızda ayrıştırılır, siz kalem kalem ayırmak zorunda değilsiniz.",
      en: "Our highest-volume group. Mixed loads are sorted in our yard — you do not have to separate them yourself.",
      ru: "Самая крупная наша группа. Смешанные партии сортируются у нас на площадке — вам не нужно разбирать их по позициям.",
      ar: "المجموعة الأكثر تداولاً لدينا. تُفرز الحمولات المختلطة في ساحتنا، ولا حاجة لأن تفرزوها صنفاً صنفاً.",
    },
    items: [
      {
        id: "hurda-demir",
        name: {
          tr: "Hurda Demir",
          en: "Scrap Iron",
          ru: "Стальной лом",
          ar: "حديد خردة",
        },
        note: {
          tr: "Karışık, ağır ve hafif hurda; ekstra ayrıştırma gerekmez",
          en: "Mixed, heavy and light scrap; no pre-sorting required",
          ru: "Смешанный, тяжёлый и лёгкий лом; дополнительная сортировка не нужна",
          ar: "خردة مختلطة وثقيلة وخفيفة؛ لا تحتاج فرزاً إضافياً",
        },
      },
      {
        id: "celik-konstruksiyon",
        name: {
          tr: "Çelik Konstrüksiyon",
          en: "Structural Steel",
          ru: "Стальные конструкции",
          ar: "هياكل فولاذية",
        },
        note: {
          tr: "Çatı makası, kolon, kiriş, hangar iskeleti",
          en: "Roof trusses, columns, beams, hangar frames",
          ru: "Стропильные фермы, колонны, балки, каркас ангара",
          ar: "جمالونات أسقف وأعمدة وعوارض وهياكل حظائر",
        },
      },
      {
        id: "sac",
        name: {
          tr: "Sac ve Sac Fire",
          en: "Plate & Sheet Offcuts",
          ru: "Лист и обрезь листа",
          ar: "صاج وقصاصات صاج",
        },
        note: {
          tr: "Siyah sac, galvaniz sac, kesim artığı",
          en: "Black plate, galvanised sheet, cutting offcuts",
          ru: "Чёрный лист, оцинкованный лист, обрезь раскроя",
          ar: "صاج أسود وصاج مجلفن وبقايا القصّ",
        },
      },
      {
        id: "profil",
        name: {
          tr: "Profil ve Köşebent",
          en: "Profiles & Angle Iron",
          ru: "Профиль и уголок",
          ar: "مقاطع وزوايا",
        },
        note: {
          tr: "NPU, NPI, IPE, HEA, kutu profil, lama",
          en: "Channels, I-beams, box sections, flat bar",
          ru: "NPU, NPI, IPE, HEA, квадратный профиль, полоса",
          ar: "NPU وNPI وIPE وHEA ومقاطع مربعة وشرائح",
        },
      },
      {
        id: "talas",
        name: {
          tr: "Çelik ve Döküm Talaşı",
          en: "Steel & Cast Turnings",
          ru: "Стальная и чугунная стружка",
          ar: "نشارة صلب وحديد زهر",
        },
        note: {
          tr: "Torna, freze ve işleme artığı — sözleşmeli düzenli alım",
          en: "Machining swarf — available on a recurring contract",
          ru: "Токарная, фрезерная и станочная стружка — регулярный вывоз по договору",
          ar: "نشارة خراطة وتفريز وتشغيل — استلام دوري بعقد",
        },
      },
      {
        id: "dokum",
        name: {
          tr: "Döküm ve Pik",
          en: "Cast Iron",
          ru: "Чугун и литьё",
          ar: "حديد زهر ومسبوكات",
        },
        note: {
          tr: "Makine gövdesi, motor bloğu, kalıp, radyatör",
          en: "Machine housings, engine blocks, moulds, radiators",
          ru: "Станины, блоки двигателей, штампы, радиаторы",
          ar: "أجسام آلات وكتل محركات وقوالب ومشعّات",
        },
      },
    ],
  },
  {
    id: "renkli-metal",
    icon: "bolt",
    title: {
      tr: "Renkli Metal ve Değerli Hurda",
      en: "Non-Ferrous & High-Value",
      ru: "Цветные и ценные металлы",
      ar: "معادن غير حديدية وخردة ثمينة",
    },
    intro: {
      tr: "Renkli metalde fiyat, kalitesine ve temizliğine göre kalem kalem belirlenir. Miktarı ve türünü yazın, güncel fiyatı paylaşalım.",
      en: "Non-ferrous prices are set item by item according to grade and cleanliness. Tell us the type and quantity and we will share today's price.",
      ru: "Цена на цветные металлы определяется по каждой позиции — по сорту и чистоте. Напишите вид и количество, и мы назовём актуальную цену.",
      ar: "سعر المعادن غير الحديدية يُحدَّد لكل صنف حسب جودته ونظافته. اكتبوا النوع والكمية ونعطيكم السعر الحالي.",
    },
    items: [
      {
        id: "bakir",
        name: {
          tr: "Bakır",
          en: "Copper",
          ru: "Медь",
          ar: "نحاس",
        },
        note: {
          tr: "Kırmızı bakır, bara, boru, sargı teli, soyulmuş kablo",
          en: "Bright copper, busbar, tube, winding wire, stripped cable",
          ru: "Красная медь, шина, труба, обмоточный провод, зачищенный кабель",
          ar: "نحاس أحمر وقضبان وأنابيب وأسلاك لفّ وكابل مقشّر",
        },
      },
      {
        id: "aluminyum",
        name: {
          tr: "Alüminyum",
          en: "Aluminium",
          ru: "Алюминий",
          ar: "ألمنيوم",
        },
        note: {
          tr: "Profil, blok, jant, radyatör, sac ve talaş",
          en: "Extrusion, ingot, wheels, radiators, sheet and turnings",
          ru: "Профиль, блоки, диски, радиаторы, лист и стружка",
          ar: "مقاطع وكتل وجنوط ومشعّات وصاج ونشارة",
        },
      },
      {
        id: "pirinc",
        name: {
          tr: "Pirinç",
          en: "Brass",
          ru: "Латунь",
          ar: "نحاس أصفر",
        },
        note: {
          tr: "Armatür, vana, radyatör peteği, talaş",
          en: "Fittings, valves, radiator cores, turnings",
          ru: "Арматура, задвижки, радиаторные сердцевины, стружка",
          ar: "حنفيات ومحابس وخلايا مشعّات ونشارة",
        },
      },
      {
        id: "paslanmaz",
        name: {
          tr: "Paslanmaz Çelik",
          en: "Stainless Steel",
          ru: "Нержавеющая сталь",
          ar: "ستانلس ستيل",
        },
        note: {
          tr: "304 ve 316 kalite; tank, boru, sac ve ekipman",
          en: "Grades 304 and 316; tanks, pipe, sheet and equipment",
          ru: "Марки 304 и 316: ёмкости, трубы, лист и оборудование",
          ar: "درجتا 304 و316؛ خزانات وأنابيب وصاج ومعدات",
        },
      },
      {
        id: "kursun",
        name: {
          tr: "Kurşun",
          en: "Lead",
          ru: "Свинец",
          ar: "رصاص",
        },
        note: {
          tr: "Akü, levha, karşı ağırlık ve kablo kılıfı",
          en: "Batteries, sheet, counterweights and cable sheathing",
          ru: "Аккумуляторы, листы, противовесы и кабельная оболочка",
          ar: "بطاريات وألواح وأثقال موازنة وأغلفة كابلات",
        },
      },
      {
        id: "cinko-krom",
        name: {
          tr: "Çinko, Krom ve Nikel Alaşımları",
          en: "Zinc, Chrome & Nickel Alloys",
          ru: "Цинк, хром и никелевые сплавы",
          ar: "الزنك والكروم وسبائك النيكل",
        },
        note: {
          tr: "Galvaniz artığı, alaşımlı parça ve ısıl işlem hurdası",
          en: "Galvanising residue, alloyed parts and heat-treatment scrap",
          ru: "Оцинкованная обрезь, легированные детали и лом после термообработки",
          ar: "بقايا الجلفنة وقطع مسبوكة وخردة معالجة حرارياً",
        },
      },
    ],
  },
  {
    id: "makine-ekipman",
    icon: "gear",
    title: {
      tr: "Makine ve Ekipman",
      en: "Machinery & Equipment",
      ru: "Машины и оборудование",
      ar: "آلات ومعدات",
    },
    intro: {
      tr: "Çalışır durumdaki ekipman hurda fiyatının üzerinde değerlenir. Hurdaya vermeden önce bir sorun.",
      en: "Working equipment is worth more than its scrap value. Ask us before you send it to the furnace.",
      ru: "Работающее оборудование стоит дороже лома. Спросите нас, прежде чем сдавать его в переплавку.",
      ar: "المعدات الصالحة للعمل تُقيَّم بأعلى من سعر الخردة. اسألونا قبل أن تسلّموها كخردة.",
    },
    items: [
      {
        id: "elektrik-motoru",
        name: {
          tr: "Elektrik Motoru ve Jeneratör",
          en: "Electric Motors & Generators",
          ru: "Электродвигатели и генераторы",
          ar: "محركات كهربائية ومولدات",
        },
        note: {
          tr: "Her güçte; bakır sargılı motorlar ayrı değerlendirilir",
          en: "Any rating; copper-wound motors are valued separately",
          ru: "Любой мощности; двигатели с медной обмоткой оцениваются отдельно",
          ar: "بجميع القدرات؛ المحركات ذات اللفّ النحاسي تُقيَّم على حدة",
        },
      },
      {
        id: "reduktor",
        name: {
          tr: "Redüktör ve Tahrik Grubu",
          en: "Gearboxes & Drive Units",
          ru: "Редукторы и приводы",
          ar: "علب تروس ومجموعات إدارة",
        },
        note: {
          tr: "Konveyör tahriki, dişli kutusu, kaplin",
          en: "Conveyor drives, gear housings, couplings",
          ru: "Приводы конвейеров, коробки передач, муфты",
          ar: "إدارة سيور وعلب تروس ووصلات",
        },
      },
      {
        id: "konveyor",
        name: {
          tr: "Konveyör Tamburu ve Bant",
          en: "Conveyor Drums & Belting",
          ru: "Барабаны и ленты конвейеров",
          ar: "أسطوانات وسيور ناقلة",
        },
        note: {
          tr: "Kaplamalı tambur, rulo, şasi ve taşıyıcı makara",
          en: "Lagged drums, rollers, frames and idlers",
          ru: "Футерованные барабаны, ролики, рамы и роликоопоры",
          ar: "أسطوانات مكسوّة وبكرات وشاسيهات وبكرات حمل",
        },
      },
      {
        id: "trafo",
        name: {
          tr: "Trafo ve Pano",
          en: "Transformers & Switchgear",
          ru: "Трансформаторы и щиты",
          ar: "محوّلات ولوحات",
        },
        note: {
          tr: "Kuru tip ve yağlı trafo, dağıtım panosu",
          en: "Dry and oil-filled transformers, distribution boards",
          ru: "Сухие и масляные трансформаторы, распределительные щиты",
          ar: "محوّلات جافة وزيتية ولوحات توزيع",
        },
      },
      {
        id: "kompresor-pompa",
        name: {
          tr: "Kompresör ve Pompa",
          en: "Compressors & Pumps",
          ru: "Компрессоры и насосы",
          ar: "ضواغط ومضخات",
        },
        note: {
          tr: "Vidalı ve pistonlu kompresör, santrifüj pompa",
          en: "Screw and piston compressors, centrifugal pumps",
          ru: "Винтовые и поршневые компрессоры, центробежные насосы",
          ar: "ضواغط لولبية وترددية ومضخات طرد مركزي",
        },
      },
      {
        id: "is-makinesi",
        name: {
          tr: "İş Makinesi Parçaları",
          en: "Heavy Equipment Parts",
          ru: "Запчасти спецтехники",
          ar: "قطع معدات ثقيلة",
        },
        note: {
          tr: "Kepçe, paletli aksam, hidrolik silindir, diferansiyel",
          en: "Buckets, track assemblies, hydraulic rams, differentials",
          ru: "Ковши, гусеничная ходовая, гидроцилиндры, редукторы мостов",
          ar: "أكفّ وأجزاء جنزير وأسطوانات هيدروليكية وتروس تفاضلية",
        },
      },
    ],
  },
  {
    id: "kablo-boru",
    icon: "recycle",
    title: {
      tr: "Kablo, Boru ve Platform",
      en: "Cable, Pipe & Platform",
      ru: "Кабель, трубы и площадки",
      ar: "كابلات وأنابيب ومنصات",
    },
    intro: {
      tr: "Uzun ve hacimli malzemede kesim ve yükleme bize ait. Sahada yatan boruyu siz taşımak zorunda değilsiniz.",
      en: "For long and bulky material, cutting and loading are on us. You do not have to move the pipe lying in your yard.",
      ru: "Резка и погрузка длинномеров и объёмных изделий — на нас. Вам не придётся самим двигать лежащую на площадке трубу.",
      ar: "القصّ والتحميل للمواد الطويلة والضخمة علينا. لستم مضطرين لنقل الأنبوب الملقى في الموقع بأنفسكم.",
    },
    items: [
      {
        id: "bakir-kablo",
        name: {
          tr: "Bakır ve Alüminyum Kablo",
          en: "Copper & Aluminium Cable",
          ru: "Медный и алюминиевый кабель",
          ar: "كابلات نحاس وألمنيوم",
        },
        note: {
          tr: "Enerji kablosu, makaralı kablo, soyulmuş veya kılıflı",
          en: "Power cable, drummed cable, stripped or sheathed",
          ru: "Силовой кабель, кабель в бухтах, зачищенный или в оболочке",
          ar: "كابلات طاقة وكابلات على بكرات، مقشّرة أو بغلاف",
        },
      },
      {
        id: "celik-halat",
        name: {
          tr: "Çelik Halat ve Zincir",
          en: "Wire Rope & Chain",
          ru: "Стальной канат и цепь",
          ar: "حبال فولاذية وسلاسل",
        },
        note: {
          tr: "Vinç halatı, maden halatı, sapan ve zincir",
          en: "Crane rope, mining rope, slings and chain",
          ru: "Крановые и шахтные канаты, стропы и цепи",
          ar: "حبال رافعات ومناجم وأحزمة رفع وسلاسل",
        },
      },
      {
        id: "buyuk-boru",
        name: {
          tr: "Büyük Çaplı Boru",
          en: "Large-Diameter Pipe",
          ru: "Труба большого диаметра",
          ar: "أنابيب كبيرة القطر",
        },
        note: {
          tr: "Spiral kaynaklı, dikişli ve dikişsiz çelik boru",
          en: "Spiral-welded, welded and seamless steel pipe",
          ru: "Спиралешовные, прямошовные и бесшовные стальные трубы",
          ar: "أنابيب فولاذية ملحومة حلزونياً وطولياً وأنابيب بلا لحام",
        },
      },
      {
        id: "izgara",
        name: {
          tr: "Platform Izgarası",
          en: "Platform Grating",
          ru: "Решётчатый настил площадки",
          ar: "مشبّك منصات",
        },
        note: {
          tr: "Galvaniz ızgara, baskül sac, merdiven basamağı",
          en: "Galvanised grating, checker plate, stair treads",
          ru: "Оцинкованный настил, рифлёный лист, ступени лестниц",
          ar: "مشبّك مجلفن وصاج مضلّع ودرجات سلالم",
        },
      },
      {
        id: "iskele",
        name: {
          tr: "İskele ve Kalıp Sistemi",
          en: "Scaffolding & Formwork",
          ru: "Леса и опалубка",
          ar: "سقالات وأنظمة قوالب",
        },
        note: {
          tr: "Cephe iskelesi, dikme, kalıp paneli",
          en: "Façade scaffolding, props, formwork panels",
          ru: "Фасадные леса, стойки, щиты опалубки",
          ar: "سقالات واجهات وقوائم وألواح قوالب",
        },
      },
    ],
  },
  {
    id: "arac-kasa",
    icon: "truck",
    title: {
      tr: "Araç, Kasa ve Tank",
      en: "Vehicles, Bodies & Tanks",
      ru: "Техника, кузова и ёмкости",
      ar: "مركبات وصناديق وخزانات",
    },
    intro: {
      tr: "Hurdaya ayrılan araç ve üst yapılar için trafik ve hurda belgesi süreçlerinde yönlendirme yapıyoruz.",
      en: "For vehicles and superstructures being scrapped, we guide you through the registration and scrappage paperwork.",
      ru: "По списываемой технике и надстройкам подсказываем, как оформить документы для ГИБДД и утилизации.",
      ar: "نرشدكم في إجراءات وثائق المرور وشهادة الخردة للمركبات والهياكل العلوية المخصصة للتخريد.",
    },
    items: [
      {
        id: "damper-kasa",
        name: {
          tr: "Damper ve Kamyon Kasası",
          en: "Tipper & Truck Bodies",
          ru: "Самосвальные и бортовые кузова",
          ar: "صناديق قلاّبة وصناديق شاحنات",
        },
        note: {
          tr: "Havuz tipi damper, sabit kasa, treyler şasi",
          en: "Bathtub tippers, fixed bodies, trailer chassis",
          ru: "Ковшовые самосвальные кузова, бортовые кузова, рамы полуприцепов",
          ar: "صناديق قلاّبة حوضية وصناديق ثابتة وشاسيهات مقطورات",
        },
      },
      {
        id: "tanker",
        name: {
          tr: "Tank ve Tanker Gövdesi",
          en: "Tank & Tanker Shells",
          ru: "Ёмкости и корпуса цистерн",
          ar: "خزانات وأجسام صهاريج",
        },
        note: {
          tr: "Akaryakıt tankeri, su ve kimyasal tankı, silo",
          en: "Fuel tankers, water and chemical tanks, silos",
          ru: "Топливные цистерны, ёмкости для воды и химии, силосы",
          ar: "صهاريج وقود وخزانات مياه وكيماويات وصوامع",
        },
      },
      {
        id: "lastik-jant",
        name: {
          tr: "Jant ve Aks Grubu",
          en: "Wheels & Axles",
          ru: "Диски и мосты",
          ar: "جنوط ومجموعات محاور",
        },
        note: {
          tr: "Çelik jant, aks, poyra, fren kampanası",
          en: "Steel wheels, axles, hubs, brake drums",
          ru: "Стальные диски, мосты, ступицы, тормозные барабаны",
          ar: "جنوط فولاذية ومحاور وصرر وطنابير فرامل",
        },
      },
      {
        id: "komple-tesis",
        name: {
          tr: "Komple Tesis ve Fabrika Hurdası",
          en: "Complete Plant & Factory Scrap",
          ru: "Лом целых производств",
          ar: "خردة منشآت ومصانع كاملة",
        },
        note: {
          tr: "Anahtar teslim söküm dahil — hizmetler sayfasına bakın",
          en: "Turnkey dismantling included — see the services page",
          ru: "Включая демонтаж под ключ — см. страницу услуг",
          ar: "بما في ذلك التفكيك الشامل — انظروا صفحة الخدمات",
        },
      },
    ],
  },
];

/** Teklif formundaki malzeme seçim etiketleri — gruplardan türetilir. */
export const QUOTE_MATERIAL_OPTIONS: Localized[] = [
  { tr: "Hurda demir", en: "Scrap iron", ru: "Стальной лом", ar: "حديد خردة" },
  { tr: "Çelik konstrüksiyon", en: "Structural steel", ru: "Стальные конструкции", ar: "هياكل فولاذية" },
  { tr: "Sac ve profil", en: "Plate & profiles", ru: "Лист и профиль", ar: "صاج ومقاطع" },
  { tr: "Bakır", en: "Copper", ru: "Медь", ar: "نحاس" },
  { tr: "Alüminyum", en: "Aluminium", ru: "Алюминий", ar: "ألمنيوم" },
  { tr: "Pirinç", en: "Brass", ru: "Латунь", ar: "نحاس أصفر" },
  { tr: "Paslanmaz", en: "Stainless", ru: "Нержавейка", ar: "ستانلس" },
  { tr: "Kablo", en: "Cable", ru: "Кабель", ar: "كابلات" },
  { tr: "Elektrik motoru", en: "Electric motors", ru: "Электродвигатель", ar: "محرك كهربائي" },
  { tr: "Makine / ekipman", en: "Machinery", ru: "Машины / оборудование", ar: "آلات / معدات" },
  { tr: "Araç / kasa", en: "Vehicle / body", ru: "Техника / кузов", ar: "مركبة / صندوق" },
  { tr: "Komple tesis", en: "Complete plant", ru: "Целое производство", ar: "منشأة كاملة" },
];
