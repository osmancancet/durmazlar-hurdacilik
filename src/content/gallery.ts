import type { Localized } from "@/lib/i18n";

/**
 * Galeri — sahada çekilmiş 24 fotoğraf.
 *
 * `file` alanı public/images/<file>.webp ve public/images/thumbs/<file>.webp
 * dosyalarına karşılık gelir; ikisi de scripts/optimize-images.mjs ile üretilir.
 * `width`/`height` gerçek ölçülerdir — ızgara yüklenirken sayfa zıplamasın diye.
 */

export type GalleryCategory = "hurda" | "ekipman" | "boru-profil" | "saha";

export type GalleryItem = {
  file: string;
  category: GalleryCategory;
  title: Localized;
  description: Localized;
  width: number;
  height: number;
};

export const GALLERY_CATEGORIES: {
  id: GalleryCategory | "tumu";
  label: Localized;
}[] = [
  { id: "tumu", label: {
      tr: "Tümü",
      en: "All",
      ru: "Все",
      ar: "الكل",
    },
  },
  { id: "hurda", label: {
      tr: "Hurda Metal",
      en: "Scrap Metal",
      ru: "Металлолом",
      ar: "خردة معدنية",
    },
  },
  { id: "ekipman", label: {
      tr: "Makine ve Ekipman",
      en: "Machinery",
      ru: "Машины и оборудование",
      ar: "آلات ومعدات",
    },
  },
  { id: "boru-profil", label: {
      tr: "Boru ve Profil",
      en: "Pipe & Profile",
      ru: "Трубы и профиль",
      ar: "أنابيب ومقاطع",
    },
  },
  { id: "saha", label: {
      tr: "Sahamız",
      en: "Our Yard",
      ru: "Наша площадка",
      ar: "ساحتنا",
    },
  },
];

export const GALLERY: GalleryItem[] = [
  {
    file: "tanker-govdesi-1",
    category: "ekipman",
    width: 1600,
    height: 1200,
    title: {
      tr: "Akaryakıt Tankeri Gövdesi",
      en: "Fuel Tanker Shell",
      ru: "Корпус топливной цистерны",
      ar: "جسم صهريج وقود",
    },
    description: {
      tr: "Söküme gelen akaryakıt tankeri gövdesi; bölmeli, üst kapaklı çelik tank.",
      en: "A fuel tanker shell received for dismantling — compartmented steel tank with top hatches.",
      ru: "Корпус топливной цистерны, поступивший на демонтаж: секционный стальной бак с верхними люками.",
      ar: "جسم صهريج وقود وصل للتفكيك؛ خزان فولاذي مقسّم بفتحات علوية.",
    },
  },
  {
    file: "buyuk-cap-boru-1",
    category: "boru-profil",
    width: 1600,
    height: 1200,
    title: {
      tr: "Büyük Çaplı Spiral Boru",
      en: "Large-Diameter Spiral Pipe",
      ru: "Спиральная труба большого диаметра",
      ar: "أنبوب حلزوني كبير القطر",
    },
    description: {
      tr: "Metrelerce uzunlukta, geniş çaplı spiral kaynaklı çelik borular.",
      en: "Metres-long, wide-bore spiral-welded steel pipes.",
      ru: "Стальные трубы спиральной сварки большого диаметра, длиной в несколько метров.",
      ar: "أنابيب فولاذية ملحومة حلزونياً، واسعة القطر وبطول عدة أمتار.",
    },
  },
  {
    file: "celik-konstruksiyon-kasa-1",
    category: "hurda",
    width: 1600,
    height: 1200,
    title: {
      tr: "Çelik Konstrüksiyon Kasa",
      en: "Fabricated Steel Bin",
      ru: "Кузов из стальной конструкции",
      ar: "صندوق من هيكل فولاذي",
    },
    description: {
      tr: "Takviye kaburgalı, kalın sactan imal edilmiş ağır hizmet tipi kasa.",
      en: "Heavy-duty bin fabricated from thick plate with reinforcing ribs.",
      ru: "Кузов тяжёлого типа из толстого листа с усиливающими рёбрами.",
      ar: "صندوق للخدمة الشاقة مصنوع من صاج سميك مع أضلاع تقوية.",
    },
  },
  {
    file: "elek-sac-kasa-1",
    category: "ekipman",
    width: 1536,
    height: 2048,
    title: {
      tr: "Delikli Elek Sacı ve Şut",
      en: "Perforated Screen Plate & Chute",
      ru: "Перфорированный грохотный лист и лоток",
      ar: "صاج غربلة مثقّب ومزلق",
    },
    description: {
      tr: "Eleme hattından çıkan delikli sac tabanlı besleme şutu.",
      en: "Feed chute with a perforated screen deck, recovered from a screening line.",
      ru: "Загрузочный лоток с перфорированным дном, снятый с грохотной линии.",
      ar: "مزلق تغذية بقاعدة صاج مثقّب من خط الغربلة.",
    },
  },
  {
    file: "konveyor-sasi-1",
    category: "ekipman",
    width: 1536,
    height: 2048,
    title: {
      tr: "Konveyör Şasisi ve Platform",
      en: "Conveyor Frame & Walkway",
      ru: "Рама конвейера и площадка",
      ar: "شاسيه سير ناقل ومنصة",
    },
    description: {
      tr: "Izgara platformlu konveyör şasileri ve taşıyıcı gruplar.",
      en: "Conveyor frames with grated walkways and carrying assemblies.",
      ru: "Рамы конвейеров с решётчатыми площадками и опорные узлы.",
      ar: "شاسيهات سيور ناقلة بمنصات مشبّكة ومجموعات حاملة.",
    },
  },
  {
    file: "celik-kafes-kiris-1",
    category: "hurda",
    width: 1600,
    height: 1200,
    title: {
      tr: "Çelik Kafes Kiriş",
      en: "Steel Lattice Truss",
      ru: "Стальная решётчатая ферма",
      ar: "جمالون فولاذي شبكي",
    },
    description: {
      tr: "Söküm sahasından gelen kafes kirişler ve kepçe paleti aksamı.",
      en: "Lattice trusses and excavator track components from a dismantling site.",
      ru: "Решётчатые фермы и элементы гусеничной ходовой, привезённые с объекта демонтажа.",
      ar: "جمالونات شبكية وأجزاء جنزير من موقع التفكيك.",
    },
  },
  {
    file: "celik-kafes-kiris-2",
    category: "hurda",
    width: 1536,
    height: 2048,
    title: {
      tr: "Kafes Kiriş İstifi",
      en: "Stacked Lattice Trusses",
      ru: "Штабель решётчатых ферм",
      ar: "رصّة جمالونات شبكية",
    },
    description: {
      tr: "Tesis sökümünden çıkan, boyalı çelik kafes kiriş istifi.",
      en: "A stack of painted steel lattice trusses from a plant dismantling job.",
      ru: "Штабель окрашенных стальных решётчатых ферм с демонтажа завода.",
      ar: "رصّة جمالونات فولاذية مطلية من تفكيك منشأة.",
    },
  },
  {
    file: "konveyor-tamburu-1",
    category: "ekipman",
    width: 1600,
    height: 1200,
    title: {
      tr: "Konveyör Tamburu",
      en: "Conveyor Drum",
      ru: "Барабан конвейера",
      ar: "أسطوانة سير ناقل",
    },
    description: {
      tr: "Kaplamalı tahrik tamburları, sehpaları ve yatakları ile birlikte.",
      en: "Lagged drive drums complete with their stands and bearings.",
      ru: "Футерованные приводные барабаны вместе с опорами и подшипниками.",
      ar: "أسطوانات إدارة مكسوّة مع حواملها ومحاملها.",
    },
  },
  {
    file: "kirici-merdane-1",
    category: "ekipman",
    width: 1600,
    height: 1200,
    title: {
      tr: "Kırıcı Merdane Dişleri",
      en: "Roller Crusher Teeth",
      ru: "Зубья валковой дробилки",
      ar: "أسنان أسطوانة الكسّارة",
    },
    description: {
      tr: "Dişli kırıcı merdanenin yakın çekimi — aşınma parçaları görünür durumda.",
      en: "Close-up of a toothed crusher roller with its wear parts visible.",
      ru: "Крупный план зубчатого валка дробилки — изнашиваемые элементы на виду.",
      ar: "لقطة قريبة لأسطوانة كسّارة مسنّنة، وأجزاء التآكل ظاهرة.",
    },
  },
  {
    file: "kirici-merdane-2",
    category: "ekipman",
    width: 1536,
    height: 2048,
    title: {
      tr: "Merdaneli Kırıcı Ünitesi",
      en: "Roller Crusher Unit",
      ru: "Валковая дробильная установка",
      ar: "وحدة كسّارة أسطوانية",
    },
    description: {
      tr: "Besleme haznesi ve merdane grubuyla komple kırıcı ünitesi.",
      en: "Complete crusher unit with feed hopper and roller assembly.",
      ru: "Дробильная установка в сборе с загрузочным бункером и валковым узлом.",
      ar: "وحدة كسّارة كاملة مع قادوس التغذية ومجموعة الأسطوانات.",
    },
  },
  {
    file: "konveyor-tamburu-2",
    category: "ekipman",
    width: 1600,
    height: 1200,
    title: {
      tr: "Tambur ve Redüktör Grubu",
      en: "Drums & Gearboxes",
      ru: "Барабаны с редукторами",
      ar: "مجموعة أسطوانات وعلب تروس",
    },
    description: {
      tr: "Kaplamalı konveyör tamburları ve üzerlerindeki redüktörler.",
      en: "Lagged conveyor drums with their gearboxes still mounted.",
      ru: "Футерованные барабаны конвейеров с установленными на них редукторами.",
      ar: "أسطوانات سيور مكسوّة وعلب التروس المركّبة عليها.",
    },
  },
  {
    file: "konveyor-sasi-2",
    category: "ekipman",
    width: 1600,
    height: 1200,
    title: {
      tr: "Konveyör Bant Hattı",
      en: "Conveyor Belt Line",
      ru: "Линия ленточного конвейера",
      ar: "خط سير ناقل",
    },
    description: {
      tr: "Taşıyıcı makaraları takılı, uzun konveyör bant şasileri.",
      en: "Long conveyor belt frames with their idler rollers still fitted.",
      ru: "Длинные рамы ленточных конвейеров с установленными роликоопорами.",
      ar: "شاسيهات سيور ناقلة طويلة مركّب عليها بكرات الحمل.",
    },
  },
  {
    file: "saha-genel-1",
    category: "saha",
    width: 1536,
    height: 2048,
    title: {
      tr: "Sahamızdan Genel Görünüm",
      en: "General View of Our Yard",
      ru: "Общий вид площадки",
      ar: "منظر عام من ساحتنا",
    },
    description: {
      tr: "Kablo makaraları, çelik halat, redüktörler ve kamyon kasalarıyla saha.",
      en: "The yard with cable drums, wire rope, gearboxes and truck bodies.",
      ru: "Площадка с кабельными барабанами, стальными канатами, редукторами и кузовами грузовиков.",
      ar: "الساحة ببكرات الكابلات والحبال الفولاذية وعلب التروس وصناديق الشاحنات.",
    },
  },
  {
    file: "maden-delici-1",
    category: "ekipman",
    width: 1600,
    height: 1200,
    title: {
      tr: "Maden Delici Makinesi",
      en: "Mining Drill Rig",
      ru: "Шахтная бурильная машина",
      ar: "آلة حفر مناجم",
    },
    description: {
      tr: "Yeraltı maden deliciler — bumu, kabini ve hidrolik aksamıyla.",
      en: "Underground drill rig with its boom, cabin and hydraulic assemblies.",
      ru: "Подземные бурильные установки со стрелой, кабиной и гидравликой.",
      ar: "حفّارات مناجم تحت الأرض بذراعها وكابينتها وأجزائها الهيدروليكية.",
    },
  },
  {
    file: "paslanmaz-tank-1",
    category: "ekipman",
    width: 1536,
    height: 2048,
    title: {
      tr: "Paslanmaz Çelik Tank",
      en: "Stainless Steel Tanks",
      ru: "Ёмкость из нержавеющей стали",
      ar: "خزان ستانلس ستيل",
    },
    description: {
      tr: "Ayaklı, kapaklı paslanmaz çelik depolama tankları.",
      en: "Stainless steel storage tanks on legs with access hatches.",
      ru: "Резервуары хранения из нержавеющей стали на опорах, с крышками.",
      ar: "خزانات تخزين من الستانلس ستيل بأرجل وأغطية.",
    },
  },
  {
    file: "helezon-konveyor-1",
    category: "ekipman",
    width: 1536,
    height: 2048,
    title: {
      tr: "Helezon Konveyör",
      en: "Screw Conveyor",
      ru: "Шнековый конвейер",
      ar: "ناقل حلزوني",
    },
    description: {
      tr: "Oluklu gövdeli helezon konveyör; yanında vinç palanga grupları.",
      en: "Trough-bodied screw conveyor, with hoist assemblies alongside.",
      ru: "Шнековый конвейер с жёлобчатым корпусом; рядом крановые тали.",
      ar: "ناقل حلزوني بجسم مجرى؛ بجانبه مجموعات بكرات رافعة.",
    },
  },
  {
    file: "sac-izgara-1",
    category: "hurda",
    width: 1600,
    height: 1200,
    title: {
      tr: "Baklavalı Sac ve Izgara",
      en: "Checker Plate & Grating",
      ru: "Рифлёный лист и решётчатый настил",
      ar: "صاج معيّن ومشبّك",
    },
    description: {
      tr: "Platform sökümünden çıkan baklavalı sac ve galvaniz ızgara istifi.",
      en: "Checker plate and galvanised grating stripped from platforms.",
      ru: "Штабель рифлёного листа и оцинкованного настила с демонтажа площадок.",
      ar: "رصّة صاج معيّن ومشبّك مجلفن من تفكيك المنصات.",
    },
  },
  {
    file: "platform-izgarasi-1",
    category: "hurda",
    width: 1600,
    height: 1200,
    title: {
      tr: "Platform Izgarası",
      en: "Platform Grating",
      ru: "Решётчатый настил площадки",
      ar: "مشبّك منصات",
    },
    description: {
      tr: "Galvaniz platform ızgaraları ve merdiven basamakları.",
      en: "Galvanised platform grating panels and stair treads.",
      ru: "Оцинкованные настилы площадок и ступени лестниц.",
      ar: "مشبّكات منصات مجلفنة ودرجات سلالم.",
    },
  },
  {
    file: "sondaj-borusu-1",
    category: "boru-profil",
    width: 1600,
    height: 1200,
    title: {
      tr: "Sondaj Boru Takımı",
      en: "Drill Rod Set",
      ru: "Комплект буровых труб",
      ar: "طقم أنابيب حفر",
    },
    description: {
      tr: "Dişli bağlantılı sondaj boruları ve tij takımları.",
      en: "Threaded drill rods and pipe strings.",
      ru: "Буровые трубы с резьбовыми соединениями и комплекты штанг.",
      ar: "أنابيب حفر بوصلات لولبية وأطقم قضبان.",
    },
  },
  {
    file: "celik-boru-1",
    category: "boru-profil",
    width: 1600,
    height: 1200,
    title: {
      tr: "Çelik Boru İstifi",
      en: "Steel Pipe Stock",
      ru: "Штабель стальных труб",
      ar: "رصّة أنابيب فولاذية",
    },
    description: {
      tr: "Orta çaplı, dişli uçlu çelik borular — beton saha üzerinde istiflenmiş.",
      en: "Medium-bore threaded-end steel pipe, stacked on the concrete apron.",
      ru: "Стальные трубы среднего диаметра с резьбовыми концами, уложенные на бетонной площадке.",
      ar: "أنابيب فولاذية متوسطة القطر بأطراف لولبية، مرصوصة على أرضية خرسانية.",
    },
  },
  {
    file: "motor-reduktor-1",
    category: "ekipman",
    width: 1600,
    height: 1200,
    title: {
      tr: "Dizel Motor ve Redüktör",
      en: "Diesel Engines & Gearboxes",
      ru: "Дизельный двигатель и редуктор",
      ar: "محرك ديزل وعلبة تروس",
    },
    description: {
      tr: "Turbolu dizel motorlar, redüktörler ve dişli gruplarıyla tahrik ünitesi.",
      en: "Turbocharged diesel engines, gearboxes and gear assemblies.",
      ru: "Приводной агрегат: турбодизели, редукторы и зубчатые передачи.",
      ar: "وحدة إدارة بمحركات ديزل توربينية وعلب تروس ومجموعات مسنّنات.",
    },
  },
  {
    file: "celik-sac-1",
    category: "hurda",
    width: 1600,
    height: 1200,
    title: {
      tr: "Kalın Çelik Sac Levha",
      en: "Heavy Steel Plate",
      ru: "Толстый стальной лист",
      ar: "ألواح صاج فولاذي سميك",
    },
    description: {
      tr: "Büyük ebatlı kalın sac levhalar; arkada döner fırın gövdesi.",
      en: "Large heavy-gauge steel plates, with a rotary kiln shell behind.",
      ru: "Крупноформатные толстые листы; на заднем плане корпус вращающейся печи.",
      ar: "ألواح صاج سميك بمقاسات كبيرة؛ وخلفها جسم فرن دوّار.",
    },
  },
  {
    file: "celik-boru-2",
    category: "boru-profil",
    width: 1200,
    height: 1600,
    title: {
      tr: "Büyük Çaplı Boru Stoğu",
      en: "Large-Bore Pipe Stock",
      ru: "Запас труб большого диаметра",
      ar: "مخزون أنابيب كبيرة القطر",
    },
    description: {
      tr: "Yükleyiciyle taşınan geniş çaplı çelik boru stoğu.",
      en: "Large-bore steel pipe stock, handled with a wheel loader.",
      ru: "Запас стальных труб большого диаметра, перемещаемый погрузчиком.",
      ar: "مخزون أنابيب فولاذية واسعة القطر يجري نقله باللودر.",
    },
  },
  {
    file: "konstruksiyon-profil-1",
    category: "hurda",
    width: 1600,
    height: 1200,
    title: {
      tr: "Konstrüksiyon Profil İstifi",
      en: "Structural Profile Stack",
      ru: "Штабель конструкционного профиля",
      ar: "رصّة مقاطع إنشائية",
    },
    description: {
      tr: "Boyalı çelik kiriş ve profiller — çatı konstrüksiyonu sökümünden.",
      en: "Painted steel beams and profiles from a roof structure teardown.",
      ru: "Окрашенные стальные балки и профили с демонтажа кровельных конструкций.",
      ar: "عوارض ومقاطع فولاذية مطلية من تفكيك هياكل الأسقف.",
    },
  },

  /* — İkinci parti — */

  {
    file: "beyaz-tank-1",
    category: "ekipman",
    width: 1600,
    height: 1200,
    title: {
      tr: "Beyaz Depo Tankları",
      en: "White Storage Tanks",
      ru: "Белые резервуары хранения",
      ar: "خزانات تخزين بيضاء",
    },
    description: {
      tr: "Ayaklı yatay depolama tankları; arkada saha ve Soma ovası.",
      en: "Horizontal storage tanks on saddles, with the yard and Soma plain behind.",
      ru: "Горизонтальные резервуары на опорах; за ними площадка и Сомская равнина.",
      ar: "خزانات تخزين أفقية بأرجل؛ وخلفها الساحة وسهل صوما.",
    },
  },
  {
    file: "is-makinesi-kovasi-1",
    category: "ekipman",
    width: 1600,
    height: 1200,
    title: {
      tr: "İş Makinesi Kovaları",
      en: "Excavator Buckets",
      ru: "Ковши спецтехники",
      ar: "أكفّ معدات ثقيلة",
    },
    description: {
      tr: "Sıra hâlinde dizilmiş ekskavatör kovaları ve bağlantı pimleri.",
      en: "A row of excavator buckets with their linkage pins.",
      ru: "Выстроенные в ряд ковши экскаваторов и соединительные пальцы.",
      ar: "أكفّ حفّارات مصفوفة في صفّ مع مسامير التوصيل.",
    },
  },
  {
    file: "konveyor-tamburu-3",
    category: "ekipman",
    width: 1600,
    height: 1200,
    title: {
      tr: "Konveyör Tamburu Stoğu",
      en: "Conveyor Drum Stock",
      ru: "Запас конвейерных барабанов",
      ar: "مخزون أسطوانات سيور",
    },
    description: {
      tr: "Kaplamalı ve düz tamburlar, yatak grupları ve mavi sehpalarıyla.",
      en: "Lagged and plain drums with their bearing units and blue frames.",
      ru: "Футерованные и гладкие барабаны с подшипниковыми узлами и синими опорами.",
      ar: "أسطوانات مكسوّة وملساء مع مجموعات المحامل والحوامل الزرقاء.",
    },
  },
  {
    file: "konveyor-tamburu-4",
    category: "ekipman",
    width: 1600,
    height: 1200,
    title: {
      tr: "Tahrik Tamburu Grubu",
      en: "Drive Drum Assemblies",
      ru: "Группа приводных барабанов",
      ar: "مجموعة أسطوانات إدارة",
    },
    description: {
      tr: "Sehpalarına monteli tahrik tamburları; arkada konveyör konstrüksiyonu.",
      en: "Drive drums mounted on their frames, with conveyor structure behind.",
      ru: "Приводные барабаны, смонтированные на опорах; на заднем плане конструкция конвейера.",
      ar: "أسطوانات إدارة مركّبة على حواملها؛ وخلفها هيكل السير الناقل.",
    },
  },
  {
    file: "titresimli-elek-1",
    category: "ekipman",
    width: 1600,
    height: 1200,
    title: {
      tr: "Titreşimli Elek Gövdesi",
      en: "Vibrating Screen Body",
      ru: "Корпус вибрационного грохота",
      ar: "جسم غربال هزّاز",
    },
    description: {
      tr: "Cıvatalı elek gövdesi ve yay yatakları — kömür hazırlama hattından.",
      en: "Bolted screen body with spring mounts, from a coal preparation line.",
      ru: "Болтовой корпус грохота и пружинные опоры с линии углеподготовки.",
      ar: "جسم غربال مربوط بمسامير ومحامل زنبركية من خط تجهيز الفحم.",
    },
  },
  {
    file: "titresimli-elek-2",
    category: "ekipman",
    width: 1600,
    height: 1200,
    title: {
      tr: "Titreşimli Elek Ünitesi",
      en: "Vibrating Screen Unit",
      ru: "Вибрационная грохотная установка",
      ar: "وحدة غربال هزّاز",
    },
    description: {
      tr: "Komple elek ünitesi; arkada eleme hattı ve santral bacası.",
      en: "A complete screen unit, with the screening line and power plant stack behind.",
      ru: "Грохотная установка в сборе; на заднем плане линия грохочения и труба электростанции.",
      ar: "وحدة غربلة كاملة؛ وخلفها خط الغربلة ومدخنة المحطة.",
    },
  },
  {
    file: "celik-halat-1",
    category: "hurda",
    width: 1536,
    height: 2048,
    title: {
      tr: "Çelik Halat Makaraları",
      en: "Wire Rope Drums",
      ru: "Барабаны со стальным канатом",
      ar: "بكرات حبال فولاذية",
    },
    description: {
      tr: "Ahşap makaralara sarılı vinç ve maden halatları.",
      en: "Crane and mining wire rope wound on wooden drums.",
      ru: "Крановые и шахтные канаты, намотанные на деревянные барабаны.",
      ar: "حبال رافعات ومناجم ملفوفة على بكرات خشبية.",
    },
  },
  {
    file: "sondaj-borusu-2",
    category: "boru-profil",
    width: 1600,
    height: 1200,
    title: {
      tr: "Sondaj Tij Takımı",
      en: "Drill Rod Set",
      ru: "Комплект буровых штанг",
      ar: "طقم قضبان حفر",
    },
    description: {
      tr: "Dişli bağlantılı sondaj tijleri, beton saha üzerinde istiflenmiş.",
      en: "Threaded drill rods stacked on the concrete apron.",
      ru: "Буровые штанги с резьбовыми соединениями, уложенные на бетонной площадке.",
      ar: "قضبان حفر بوصلات لولبية مرصوصة على أرضية خرسانية.",
    },
  },
  {
    file: "ray-1",
    category: "boru-profil",
    width: 1600,
    height: 1200,
    title: {
      tr: "Vinç ve Demiryolu Rayı",
      en: "Crane & Railway Rail",
      ru: "Крановый и железнодорожный рельс",
      ar: "قضبان رافعات وسكك",
    },
    description: {
      tr: "Ağır kesitli ray profilleri; yanında boru ve mil stoğu.",
      en: "Heavy-section rail profiles, alongside pipe and shaft stock.",
      ru: "Рельсовые профили тяжёлого сечения; рядом запас труб и валов.",
      ar: "مقاطع قضبان ثقيلة؛ بجانبها مخزون أنابيب وأعمدة.",
    },
  },
  {
    file: "celik-sac-2",
    category: "hurda",
    width: 1600,
    height: 1200,
    title: {
      tr: "Kalın Sac Levha Stoğu",
      en: "Heavy Plate Stock",
      ru: "Запас толстого листа",
      ar: "مخزون ألواح صاج سميك",
    },
    description: {
      tr: "Büyük ebatlı kalın çelik levhalar; arkada hurda sahası ve ekskavatör.",
      en: "Large heavy-gauge steel plates, with the scrap yard and excavator behind.",
      ru: "Крупноформатные толстые стальные листы; на заднем плане площадка лома и экскаватор.",
      ar: "ألواح فولاذية سميكة بمقاسات كبيرة؛ وخلفها ساحة الخردة وحفّارة.",
    },
  },
  {
    file: "muhafaza-borusu-1",
    category: "boru-profil",
    width: 1200,
    height: 1600,
    title: {
      tr: "Muhafaza Borusu Takımı",
      en: "Casing Pipe Set",
      ru: "Комплект обсадных труб",
      ar: "طقم أنابيب تغليف",
    },
    description: {
      tr: "Dişli uçlu muhafaza boruları, boy boy ayrılmış hâlde.",
      en: "Threaded-end casing pipes, sorted by length.",
      ru: "Обсадные трубы с резьбовыми концами, рассортированные по длине.",
      ar: "أنابيب تغليف بأطراف لولبية مفروزة حسب الطول.",
    },
  },
  {
    file: "celik-mil-1",
    category: "boru-profil",
    width: 1600,
    height: 1200,
    title: {
      tr: "Çelik Yuvarlak Mil",
      en: "Solid Round Bar",
      ru: "Круглый стальной вал",
      ar: "عمود فولاذي مستدير",
    },
    description: {
      tr: "Döküm numarası etiketli dolu çelik miller ve yuvarlak çubuklar.",
      en: "Solid steel shafts and round bar, still carrying their heat-number tags.",
      ru: "Сплошные стальные валы и круглый прокат с бирками номера плавки.",
      ar: "أعمدة فولاذية مصمتة وقضبان مستديرة تحمل بطاقات رقم الصبّة.",
    },
  },
  {
    file: "hidrolik-unite-1",
    category: "ekipman",
    width: 1600,
    height: 1200,
    title: {
      tr: "Hidrolik Güç Ünitesi",
      en: "Hydraulic Power Unit",
      ru: "Гидравлическая станция",
      ar: "وحدة قدرة هيدروليكية",
    },
    description: {
      tr: "Elektrik motorlu hidrolik ünite ve vinç tamburu, hortumlarıyla birlikte.",
      en: "Motor-driven hydraulic unit and winch drum, complete with hoses.",
      ru: "Гидростанция с электродвигателем и лебёдочный барабан вместе со шлангами.",
      ar: "وحدة هيدروليكية بمحرك كهربائي وأسطوانة ونش مع خراطيمها.",
    },
  },
  {
    file: "sondaj-borusu-3",
    category: "boru-profil",
    width: 1200,
    height: 1600,
    title: {
      tr: "Dişli Uçlu Sondaj Borusu",
      en: "Threaded Drill Pipe",
      ru: "Буровая труба с резьбой",
      ar: "أنبوب حفر بأطراف لولبية",
    },
    description: {
      tr: "Kalın cidarlı sondaj boruları; erkek ve dişi dişleri görünür durumda.",
      en: "Heavy-wall drill pipe with pin and box threads clearly visible.",
      ru: "Толстостенные буровые трубы; наружная и внутренняя резьба на виду.",
      ar: "أنابيب حفر سميكة الجدار؛ الأسنان الذكرية والأنثوية ظاهرة.",
    },
  },
  {
    file: "romork-sasi-1",
    category: "hurda",
    width: 1600,
    height: 1200,
    title: {
      tr: "Römork Şasisi",
      en: "Trailer Chassis",
      ru: "Рама полуприцепа",
      ar: "شاسيه مقطورة",
    },
    description: {
      tr: "Lastikleri takılı römork şasisi; çevresinde profil ve sac hurdası.",
      en: "A trailer chassis on its wheels, surrounded by profile and plate scrap.",
      ru: "Рама полуприцепа с колёсами; вокруг лом профиля и листа.",
      ar: "شاسيه مقطورة بإطاراتها؛ وحولها خردة مقاطع وصاج.",
    },
  },
  {
    file: "celik-sac-3",
    category: "hurda",
    width: 1600,
    height: 1200,
    title: {
      tr: "Sac Levha ve Treyler Aksı",
      en: "Steel Plate & Trailer Axle",
      ru: "Листовой прокат и ось прицепа",
      ar: "ألواح صاج ومحور مقطورة",
    },
    description: {
      tr: "Kalın sac levhaların üzerinde fren kampanalı treyler aksı.",
      en: "A trailer axle with brake drums resting on heavy steel plate.",
      ru: "Ось прицепа с тормозными барабанами поверх штабеля толстых листов.",
      ar: "محور مقطورة بطنابير فرامل فوق ألواح صاج سميكة.",
    },
  },
  {
    file: "kaynakli-kiris-1",
    category: "hurda",
    width: 1200,
    height: 1600,
    title: {
      tr: "Kaynaklı Çelik Kiriş",
      en: "Fabricated Steel Girder",
      ru: "Сварная стальная балка",
      ar: "عارضة فولاذية ملحومة",
    },
    description: {
      tr: "Bulonlu bağlantı plakalı kaynaklı kirişler — tesis sökümünden.",
      en: "Welded girders with bolted connection plates, from a plant teardown.",
      ru: "Сварные балки с болтовыми накладками — с демонтажа завода.",
      ar: "عوارض ملحومة بألواح وصل مبرشمة من تفكيك منشأة.",
    },
  },
  {
    file: "buyuk-cap-boru-2",
    category: "boru-profil",
    width: 1600,
    height: 1200,
    title: {
      tr: "Büyük Çaplı Boru İstifi",
      en: "Large-Bore Pipe Stack",
      ru: "Штабель труб большого диаметра",
      ar: "رصّة أنابيب كبيرة القطر",
    },
    description: {
      tr: "Kalın cidarlı geniş çaplı borular; arkada konstrüksiyon ve damper kasa.",
      en: "Heavy-wall large-bore pipe, with structural steel and tipper bodies behind.",
      ru: "Толстостенные трубы большого диаметра; за ними конструкции и самосвальный кузов.",
      ar: "أنابيب واسعة القطر سميكة الجدار؛ وخلفها هياكل وصندوق قلاّب.",
    },
  },
  {
    file: "galvaniz-profil-1",
    category: "hurda",
    width: 1600,
    height: 1200,
    title: {
      tr: "Galvaniz Profil ve Raf Ayağı",
      en: "Galvanised Profiles & Rack Legs",
      ru: "Оцинкованный профиль и стойки стеллажей",
      ar: "مقاطع مجلفنة وقوائم رفوف",
    },
    description: {
      tr: "Delikli galvaniz profiller ve raf ayakları, ayrıştırılmayı bekliyor.",
      en: "Perforated galvanised profiles and rack legs waiting to be sorted.",
      ru: "Перфорированные оцинкованные профили и стойки стеллажей ждут сортировки.",
      ar: "مقاطع مجلفنة مثقّبة وقوائم رفوف بانتظار الفرز.",
    },
  },
  {
    file: "kesilmis-boru-1",
    category: "boru-profil",
    width: 1200,
    height: 1600,
    title: {
      tr: "Kesilmiş Çelik Boru",
      en: "Cut Steel Pipe",
      ru: "Резаная стальная труба",
      ar: "أنابيب فولاذية مقصوصة",
    },
    description: {
      tr: "Nakliye boyuna kesilmiş büyük çaplı borular ve alüminyum kırpıntı.",
      en: "Large-bore pipe cut to haulage length, with aluminium trimmings.",
      ru: "Трубы большого диаметра, порезанные под транспортную длину, и алюминиевая обрезь.",
      ar: "أنابيب كبيرة القطر مقصوصة لطول النقل وقصاصات ألمنيوم.",
    },
  },
  {
    file: "celik-profil-1",
    category: "hurda",
    width: 1600,
    height: 1200,
    title: {
      tr: "Çelik I ve H Profil",
      en: "Steel I & H Beams",
      ru: "Стальной двутавр I и H",
      ar: "مقاطع فولاذية I و H",
    },
    description: {
      tr: "Çeşitli kesitlerde I ve H profiller, boy boy yelpaze hâlinde dizilmiş.",
      en: "I- and H-section beams of various sizes, fanned out by length.",
      ru: "Двутавры I и H разных сечений, разложенные веером по длинам.",
      ar: "مقاطع I و H بمقاطع مختلفة مرتّبة على شكل مروحة حسب الطول.",
    },
  },
  {
    file: "kalin-cidarli-boru-1",
    category: "boru-profil",
    width: 1600,
    height: 1200,
    title: {
      tr: "Kalın Cidarlı Boru Parçası",
      en: "Heavy-Wall Pipe Sections",
      ru: "Толстостенный отрезок трубы",
      ar: "قطعة أنبوب سميك الجدار",
    },
    description: {
      tr: "Boyalı, kalın cidarlı boru parçaları — hat sökümünden çıkma.",
      en: "Painted heavy-wall pipe sections recovered from a pipeline teardown.",
      ru: "Окрашенные толстостенные отрезки труб с демонтажа линии.",
      ar: "قطع أنابيب مطلية سميكة الجدار من تفكيك خط.",
    },
  },
  {
    file: "celik-halat-2",
    category: "hurda",
    width: 1200,
    height: 1600,
    title: {
      tr: "Çelik Halat Stoğu",
      en: "Wire Rope Stock",
      ru: "Запас стального каната",
      ar: "مخزون حبال فولاذية",
    },
    description: {
      tr: "Farklı çaplarda çelik halat makaraları ve çözülmüş halat yığını.",
      en: "Wire rope drums in assorted diameters, with loose rope alongside.",
      ru: "Барабаны стального каната разных диаметров и размотанный канат.",
      ar: "بكرات حبال فولاذية بأقطار مختلفة وكومة حبال مفكوكة.",
    },
  },
];

/**
 * Ana sayfadaki galeri önizlemesi.
 *
 * Tam beş plaka: ızgaranın ritmi (2 geniş + 3 dar) tam iki satır oluşturur,
 * altta yarım kalan satır kalmaz.
 */
const PREVIEW_ORDER = [
  "konveyor-tamburu-1",
  "tanker-govdesi-1",
  "paslanmaz-tank-1",
  "platform-izgarasi-1",
  "buyuk-cap-boru-1",
] as const;

export const GALLERY_PREVIEW = PREVIEW_ORDER.map(
  (file) => GALLERY.find((item) => item.file === file)!,
);
