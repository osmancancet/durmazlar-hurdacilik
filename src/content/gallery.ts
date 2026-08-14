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
  { id: "tumu", label: { tr: "Tümü", en: "All" } },
  { id: "hurda", label: { tr: "Hurda Metal", en: "Scrap Metal" } },
  { id: "ekipman", label: { tr: "Makine ve Ekipman", en: "Machinery" } },
  { id: "boru-profil", label: { tr: "Boru ve Profil", en: "Pipe & Profile" } },
  { id: "saha", label: { tr: "Sahamız", en: "Our Yard" } },
];

export const GALLERY: GalleryItem[] = [
  {
    file: "tanker-govdesi-1",
    category: "ekipman",
    width: 1600,
    height: 1200,
    title: { tr: "Akaryakıt Tankeri Gövdesi", en: "Fuel Tanker Shell" },
    description: {
      tr: "Söküme gelen akaryakıt tankeri gövdesi; bölmeli, üst kapaklı çelik tank.",
      en: "A fuel tanker shell received for dismantling — compartmented steel tank with top hatches.",
    },
  },
  {
    file: "buyuk-cap-boru-1",
    category: "boru-profil",
    width: 1600,
    height: 1200,
    title: { tr: "Büyük Çaplı Spiral Boru", en: "Large-Diameter Spiral Pipe" },
    description: {
      tr: "Metrelerce uzunlukta, geniş çaplı spiral kaynaklı çelik borular.",
      en: "Metres-long, wide-bore spiral-welded steel pipes.",
    },
  },
  {
    file: "celik-konstruksiyon-kasa-1",
    category: "hurda",
    width: 1600,
    height: 1200,
    title: { tr: "Çelik Konstrüksiyon Kasa", en: "Fabricated Steel Bin" },
    description: {
      tr: "Takviye kaburgalı, kalın sactan imal edilmiş ağır hizmet tipi kasa.",
      en: "Heavy-duty bin fabricated from thick plate with reinforcing ribs.",
    },
  },
  {
    file: "elek-sac-kasa-1",
    category: "ekipman",
    width: 1536,
    height: 2048,
    title: { tr: "Delikli Elek Sacı ve Şut", en: "Perforated Screen Plate & Chute" },
    description: {
      tr: "Eleme hattından çıkan delikli sac tabanlı besleme şutu.",
      en: "Feed chute with a perforated screen deck, recovered from a screening line.",
    },
  },
  {
    file: "konveyor-sasi-1",
    category: "ekipman",
    width: 1536,
    height: 2048,
    title: { tr: "Konveyör Şasisi ve Platform", en: "Conveyor Frame & Walkway" },
    description: {
      tr: "Izgara platformlu konveyör şasileri ve taşıyıcı gruplar.",
      en: "Conveyor frames with grated walkways and carrying assemblies.",
    },
  },
  {
    file: "celik-kafes-kiris-1",
    category: "hurda",
    width: 1600,
    height: 1200,
    title: { tr: "Çelik Kafes Kiriş", en: "Steel Lattice Truss" },
    description: {
      tr: "Söküm sahasından gelen kafes kirişler ve kepçe paleti aksamı.",
      en: "Lattice trusses and excavator track components from a dismantling site.",
    },
  },
  {
    file: "celik-kafes-kiris-2",
    category: "hurda",
    width: 1536,
    height: 2048,
    title: { tr: "Kafes Kiriş İstifi", en: "Stacked Lattice Trusses" },
    description: {
      tr: "Tesis sökümünden çıkan, boyalı çelik kafes kiriş istifi.",
      en: "A stack of painted steel lattice trusses from a plant dismantling job.",
    },
  },
  {
    file: "konveyor-tamburu-1",
    category: "ekipman",
    width: 1600,
    height: 1200,
    title: { tr: "Konveyör Tamburu", en: "Conveyor Drum" },
    description: {
      tr: "Kaplamalı tahrik tamburları, sehpaları ve yatakları ile birlikte.",
      en: "Lagged drive drums complete with their stands and bearings.",
    },
  },
  {
    file: "kirici-merdane-1",
    category: "ekipman",
    width: 1600,
    height: 1200,
    title: { tr: "Kırıcı Merdane Dişleri", en: "Roller Crusher Teeth" },
    description: {
      tr: "Dişli kırıcı merdanenin yakın çekimi — aşınma parçaları görünür durumda.",
      en: "Close-up of a toothed crusher roller with its wear parts visible.",
    },
  },
  {
    file: "kirici-merdane-2",
    category: "ekipman",
    width: 1536,
    height: 2048,
    title: { tr: "Merdaneli Kırıcı Ünitesi", en: "Roller Crusher Unit" },
    description: {
      tr: "Besleme haznesi ve merdane grubuyla komple kırıcı ünitesi.",
      en: "Complete crusher unit with feed hopper and roller assembly.",
    },
  },
  {
    file: "konveyor-tamburu-2",
    category: "ekipman",
    width: 1600,
    height: 1200,
    title: { tr: "Tambur ve Redüktör Grubu", en: "Drums & Gearboxes" },
    description: {
      tr: "Kaplamalı konveyör tamburları ve üzerlerindeki redüktörler.",
      en: "Lagged conveyor drums with their gearboxes still mounted.",
    },
  },
  {
    file: "konveyor-sasi-2",
    category: "ekipman",
    width: 1600,
    height: 1200,
    title: { tr: "Konveyör Bant Hattı", en: "Conveyor Belt Line" },
    description: {
      tr: "Taşıyıcı makaraları takılı, uzun konveyör bant şasileri.",
      en: "Long conveyor belt frames with their idler rollers still fitted.",
    },
  },
  {
    file: "saha-genel-1",
    category: "saha",
    width: 1536,
    height: 2048,
    title: { tr: "Sahamızdan Genel Görünüm", en: "General View of Our Yard" },
    description: {
      tr: "Kablo makaraları, çelik halat, redüktörler ve kamyon kasalarıyla saha.",
      en: "The yard with cable drums, wire rope, gearboxes and truck bodies.",
    },
  },
  {
    file: "maden-delici-1",
    category: "ekipman",
    width: 1600,
    height: 1200,
    title: { tr: "Maden Delici Makinesi", en: "Mining Drill Rig" },
    description: {
      tr: "Yeraltı maden deliciler — bumu, kabini ve hidrolik aksamıyla.",
      en: "Underground drill rig with its boom, cabin and hydraulic assemblies.",
    },
  },
  {
    file: "paslanmaz-tank-1",
    category: "ekipman",
    width: 1536,
    height: 2048,
    title: { tr: "Paslanmaz Çelik Tank", en: "Stainless Steel Tanks" },
    description: {
      tr: "Ayaklı, kapaklı paslanmaz çelik depolama tankları.",
      en: "Stainless steel storage tanks on legs with access hatches.",
    },
  },
  {
    file: "helezon-konveyor-1",
    category: "ekipman",
    width: 1536,
    height: 2048,
    title: { tr: "Helezon Konveyör", en: "Screw Conveyor" },
    description: {
      tr: "Oluklu gövdeli helezon konveyör; yanında vinç palanga grupları.",
      en: "Trough-bodied screw conveyor, with hoist assemblies alongside.",
    },
  },
  {
    file: "sac-izgara-1",
    category: "hurda",
    width: 1600,
    height: 1200,
    title: { tr: "Baklavalı Sac ve Izgara", en: "Checker Plate & Grating" },
    description: {
      tr: "Platform sökümünden çıkan baklavalı sac ve galvaniz ızgara istifi.",
      en: "Checker plate and galvanised grating stripped from platforms.",
    },
  },
  {
    file: "platform-izgarasi-1",
    category: "hurda",
    width: 1600,
    height: 1200,
    title: { tr: "Platform Izgarası", en: "Platform Grating" },
    description: {
      tr: "Galvaniz platform ızgaraları ve merdiven basamakları.",
      en: "Galvanised platform grating panels and stair treads.",
    },
  },
  {
    file: "sondaj-borusu-1",
    category: "boru-profil",
    width: 1600,
    height: 1200,
    title: { tr: "Sondaj Boru Takımı", en: "Drill Rod Set" },
    description: {
      tr: "Dişli bağlantılı sondaj boruları ve tij takımları.",
      en: "Threaded drill rods and pipe strings.",
    },
  },
  {
    file: "celik-boru-1",
    category: "boru-profil",
    width: 1600,
    height: 1200,
    title: { tr: "Çelik Boru İstifi", en: "Steel Pipe Stock" },
    description: {
      tr: "Orta çaplı, dişli uçlu çelik borular — beton saha üzerinde istiflenmiş.",
      en: "Medium-bore threaded-end steel pipe, stacked on the concrete apron.",
    },
  },
  {
    file: "motor-reduktor-1",
    category: "ekipman",
    width: 1200,
    height: 1600,
    title: { tr: "Dizel Motor ve Redüktör", en: "Diesel Engines & Gearboxes" },
    description: {
      tr: "Turbolu dizel motorlar, redüktörler ve dişli gruplarıyla tahrik ünitesi.",
      en: "Turbocharged diesel engines, gearboxes and gear assemblies.",
    },
  },
  {
    file: "celik-sac-1",
    category: "hurda",
    width: 1600,
    height: 1200,
    title: { tr: "Kalın Çelik Sac Levha", en: "Heavy Steel Plate" },
    description: {
      tr: "Büyük ebatlı kalın sac levhalar; arkada döner fırın gövdesi.",
      en: "Large heavy-gauge steel plates, with a rotary kiln shell behind.",
    },
  },
  {
    file: "celik-boru-2",
    category: "boru-profil",
    width: 1200,
    height: 1600,
    title: { tr: "Büyük Çaplı Boru Stoğu", en: "Large-Bore Pipe Stock" },
    description: {
      tr: "Yükleyiciyle taşınan geniş çaplı çelik boru stoğu.",
      en: "Large-bore steel pipe stock, handled with a wheel loader.",
    },
  },
  {
    file: "konstruksiyon-profil-1",
    category: "hurda",
    width: 1600,
    height: 1200,
    title: { tr: "Konstrüksiyon Profil İstifi", en: "Structural Profile Stack" },
    description: {
      tr: "Boyalı çelik kiriş ve profiller — çatı konstrüksiyonu sökümünden.",
      en: "Painted steel beams and profiles from a roof structure teardown.",
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
