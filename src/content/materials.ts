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
    title: { tr: "Demir ve Çelik Hurdası", en: "Ferrous Scrap" },
    intro: {
      tr: "En çok işlem gördüğümüz grup. Karışık gelen yükler sahamızda ayrıştırılır, siz kalem kalem ayırmak zorunda değilsiniz.",
      en: "Our highest-volume group. Mixed loads are sorted in our yard — you do not have to separate them yourself.",
    },
    items: [
      {
        id: "hurda-demir",
        name: { tr: "Hurda Demir", en: "Scrap Iron" },
        note: {
          tr: "Karışık, ağır ve hafif hurda; ekstra ayrıştırma gerekmez",
          en: "Mixed, heavy and light scrap; no pre-sorting required",
        },
      },
      {
        id: "celik-konstruksiyon",
        name: { tr: "Çelik Konstrüksiyon", en: "Structural Steel" },
        note: {
          tr: "Çatı makası, kolon, kiriş, hangar iskeleti",
          en: "Roof trusses, columns, beams, hangar frames",
        },
      },
      {
        id: "sac",
        name: { tr: "Sac ve Sac Fire", en: "Plate & Sheet Offcuts" },
        note: {
          tr: "Siyah sac, galvaniz sac, kesim artığı",
          en: "Black plate, galvanised sheet, cutting offcuts",
        },
      },
      {
        id: "profil",
        name: { tr: "Profil ve Köşebent", en: "Profiles & Angle Iron" },
        note: {
          tr: "NPU, NPI, IPE, HEA, kutu profil, lama",
          en: "Channels, I-beams, box sections, flat bar",
        },
      },
      {
        id: "talas",
        name: { tr: "Çelik ve Döküm Talaşı", en: "Steel & Cast Turnings" },
        note: {
          tr: "Torna, freze ve işleme artığı — sözleşmeli düzenli alım",
          en: "Machining swarf — available on a recurring contract",
        },
      },
      {
        id: "dokum",
        name: { tr: "Döküm ve Pik", en: "Cast Iron" },
        note: {
          tr: "Makine gövdesi, motor bloğu, kalıp, radyatör",
          en: "Machine housings, engine blocks, moulds, radiators",
        },
      },
    ],
  },
  {
    id: "renkli-metal",
    icon: "bolt",
    title: { tr: "Renkli Metal ve Değerli Hurda", en: "Non-Ferrous & High-Value" },
    intro: {
      tr: "Renkli metalde fiyat, kalitesine ve temizliğine göre kalem kalem belirlenir. Miktarı ve türünü yazın, güncel fiyatı paylaşalım.",
      en: "Non-ferrous prices are set item by item according to grade and cleanliness. Tell us the type and quantity and we will share today's price.",
    },
    items: [
      {
        id: "bakir",
        name: { tr: "Bakır", en: "Copper" },
        note: {
          tr: "Kırmızı bakır, bara, boru, sargı teli, soyulmuş kablo",
          en: "Bright copper, busbar, tube, winding wire, stripped cable",
        },
      },
      {
        id: "aluminyum",
        name: { tr: "Alüminyum", en: "Aluminium" },
        note: {
          tr: "Profil, blok, jant, radyatör, sac ve talaş",
          en: "Extrusion, ingot, wheels, radiators, sheet and turnings",
        },
      },
      {
        id: "pirinc",
        name: { tr: "Pirinç", en: "Brass" },
        note: {
          tr: "Armatür, vana, radyatör peteği, talaş",
          en: "Fittings, valves, radiator cores, turnings",
        },
      },
      {
        id: "paslanmaz",
        name: { tr: "Paslanmaz Çelik", en: "Stainless Steel" },
        note: {
          tr: "304 ve 316 kalite; tank, boru, sac ve ekipman",
          en: "Grades 304 and 316; tanks, pipe, sheet and equipment",
        },
      },
      {
        id: "kursun",
        name: { tr: "Kurşun", en: "Lead" },
        note: {
          tr: "Akü, levha, karşı ağırlık ve kablo kılıfı",
          en: "Batteries, sheet, counterweights and cable sheathing",
        },
      },
      {
        id: "cinko-krom",
        name: { tr: "Çinko, Krom ve Nikel Alaşımları", en: "Zinc, Chrome & Nickel Alloys" },
        note: {
          tr: "Galvaniz artığı, alaşımlı parça ve ısıl işlem hurdası",
          en: "Galvanising residue, alloyed parts and heat-treatment scrap",
        },
      },
    ],
  },
  {
    id: "makine-ekipman",
    icon: "gear",
    title: { tr: "Makine ve Ekipman", en: "Machinery & Equipment" },
    intro: {
      tr: "Çalışır durumdaki ekipman hurda fiyatının üzerinde değerlenir. Hurdaya vermeden önce bir sorun.",
      en: "Working equipment is worth more than its scrap value. Ask us before you send it to the furnace.",
    },
    items: [
      {
        id: "elektrik-motoru",
        name: { tr: "Elektrik Motoru ve Jeneratör", en: "Electric Motors & Generators" },
        note: {
          tr: "Her güçte; bakır sargılı motorlar ayrı değerlendirilir",
          en: "Any rating; copper-wound motors are valued separately",
        },
      },
      {
        id: "reduktor",
        name: { tr: "Redüktör ve Tahrik Grubu", en: "Gearboxes & Drive Units" },
        note: {
          tr: "Konveyör tahriki, dişli kutusu, kaplin",
          en: "Conveyor drives, gear housings, couplings",
        },
      },
      {
        id: "konveyor",
        name: { tr: "Konveyör Tamburu ve Bant", en: "Conveyor Drums & Belting" },
        note: {
          tr: "Kaplamalı tambur, rulo, şasi ve taşıyıcı makara",
          en: "Lagged drums, rollers, frames and idlers",
        },
      },
      {
        id: "trafo",
        name: { tr: "Trafo ve Pano", en: "Transformers & Switchgear" },
        note: {
          tr: "Kuru tip ve yağlı trafo, dağıtım panosu",
          en: "Dry and oil-filled transformers, distribution boards",
        },
      },
      {
        id: "kompresor-pompa",
        name: { tr: "Kompresör ve Pompa", en: "Compressors & Pumps" },
        note: {
          tr: "Vidalı ve pistonlu kompresör, santrifüj pompa",
          en: "Screw and piston compressors, centrifugal pumps",
        },
      },
      {
        id: "is-makinesi",
        name: { tr: "İş Makinesi Parçaları", en: "Heavy Equipment Parts" },
        note: {
          tr: "Kepçe, paletli aksam, hidrolik silindir, diferansiyel",
          en: "Buckets, track assemblies, hydraulic rams, differentials",
        },
      },
    ],
  },
  {
    id: "kablo-boru",
    icon: "recycle",
    title: { tr: "Kablo, Boru ve Platform", en: "Cable, Pipe & Platform" },
    intro: {
      tr: "Uzun ve hacimli malzemede kesim ve yükleme bize ait. Sahada yatan boruyu siz taşımak zorunda değilsiniz.",
      en: "For long and bulky material, cutting and loading are on us. You do not have to move the pipe lying in your yard.",
    },
    items: [
      {
        id: "bakir-kablo",
        name: { tr: "Bakır ve Alüminyum Kablo", en: "Copper & Aluminium Cable" },
        note: {
          tr: "Enerji kablosu, makaralı kablo, soyulmuş veya kılıflı",
          en: "Power cable, drummed cable, stripped or sheathed",
        },
      },
      {
        id: "celik-halat",
        name: { tr: "Çelik Halat ve Zincir", en: "Wire Rope & Chain" },
        note: {
          tr: "Vinç halatı, maden halatı, sapan ve zincir",
          en: "Crane rope, mining rope, slings and chain",
        },
      },
      {
        id: "buyuk-boru",
        name: { tr: "Büyük Çaplı Boru", en: "Large-Diameter Pipe" },
        note: {
          tr: "Spiral kaynaklı, dikişli ve dikişsiz çelik boru",
          en: "Spiral-welded, welded and seamless steel pipe",
        },
      },
      {
        id: "izgara",
        name: { tr: "Platform Izgarası", en: "Platform Grating" },
        note: {
          tr: "Galvaniz ızgara, baskül sac, merdiven basamağı",
          en: "Galvanised grating, checker plate, stair treads",
        },
      },
      {
        id: "iskele",
        name: { tr: "İskele ve Kalıp Sistemi", en: "Scaffolding & Formwork" },
        note: {
          tr: "Cephe iskelesi, dikme, kalıp paneli",
          en: "Façade scaffolding, props, formwork panels",
        },
      },
    ],
  },
  {
    id: "arac-kasa",
    icon: "truck",
    title: { tr: "Araç, Kasa ve Tank", en: "Vehicles, Bodies & Tanks" },
    intro: {
      tr: "Hurdaya ayrılan araç ve üst yapılar için trafik ve hurda belgesi süreçlerinde yönlendirme yapıyoruz.",
      en: "For vehicles and superstructures being scrapped, we guide you through the registration and scrappage paperwork.",
    },
    items: [
      {
        id: "damper-kasa",
        name: { tr: "Damper ve Kamyon Kasası", en: "Tipper & Truck Bodies" },
        note: {
          tr: "Havuz tipi damper, sabit kasa, treyler şasi",
          en: "Bathtub tippers, fixed bodies, trailer chassis",
        },
      },
      {
        id: "tanker",
        name: { tr: "Tank ve Tanker Gövdesi", en: "Tank & Tanker Shells" },
        note: {
          tr: "Akaryakıt tankeri, su ve kimyasal tankı, silo",
          en: "Fuel tankers, water and chemical tanks, silos",
        },
      },
      {
        id: "lastik-jant",
        name: { tr: "Jant ve Aks Grubu", en: "Wheels & Axles" },
        note: {
          tr: "Çelik jant, aks, poyra, fren kampanası",
          en: "Steel wheels, axles, hubs, brake drums",
        },
      },
      {
        id: "komple-tesis",
        name: { tr: "Komple Tesis ve Fabrika Hurdası", en: "Complete Plant & Factory Scrap" },
        note: {
          tr: "Anahtar teslim söküm dahil — hizmetler sayfasına bakın",
          en: "Turnkey dismantling included — see the services page",
        },
      },
    ],
  },
];

/** Teklif formundaki malzeme seçim etiketleri — gruplardan türetilir. */
export const QUOTE_MATERIAL_OPTIONS: Localized[] = [
  { tr: "Hurda demir", en: "Scrap iron" },
  { tr: "Çelik konstrüksiyon", en: "Structural steel" },
  { tr: "Sac ve profil", en: "Plate & profiles" },
  { tr: "Bakır", en: "Copper" },
  { tr: "Alüminyum", en: "Aluminium" },
  { tr: "Pirinç", en: "Brass" },
  { tr: "Paslanmaz", en: "Stainless" },
  { tr: "Kablo", en: "Cable" },
  { tr: "Elektrik motoru", en: "Electric motors" },
  { tr: "Makine / ekipman", en: "Machinery" },
  { tr: "Araç / kasa", en: "Vehicle / body" },
  { tr: "Komple tesis", en: "Complete plant" },
];
