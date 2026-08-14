import type { Localized, LocalizedList } from "@/lib/i18n";

export type ServiceId =
  | "hurda-alimi"
  | "makine-satisi"
  | "tesis-sokumu"
  | "konteyner";

export type Service = {
  id: ServiceId;
  /** Kart ve bölüm ikonları — components/ui/Icons.tsx içindeki anahtar. */
  icon: "recycle" | "gear" | "crane" | "truck";
  title: Localized;
  /** Kartlarda görünen kısa özet. */
  summary: Localized;
  /** Hizmetler sayfasındaki uzun anlatım. */
  description: LocalizedList;
  /** Kapsam maddeleri. */
  bullets: LocalizedList;
  /** public/images altındaki görsel adı (uzantısız). */
  image: string;
};

export const SERVICES: Service[] = [
  {
    id: "hurda-alimi",
    icon: "recycle",
    image: "konstruksiyon-profil-1",
    title: {
      tr: "Endüstriyel Hurda Alımı",
      en: "Industrial Scrap Purchasing",
    },
    summary: {
      tr: "Fabrika, şantiye ve atölyelerden her tonajda demir, çelik ve renkli metal hurdası alıyoruz.",
      en: "We buy ferrous and non-ferrous scrap of any tonnage from factories, construction sites and workshops.",
    },
    description: {
      tr: [
        "Üretim artığı talaş ve sactan, komple hat sökümüne kadar her ölçekte hurda alımı yapıyoruz. Sahanızı görmeden fiyat vermiyoruz: WhatsApp'tan gönderdiğiniz birkaç fotoğraf çoğu zaman ön fiyat için yeterli oluyor, kesin teklif ise yerinde keşifle veriliyor.",
        "Tartım, anlaşılan kantarda ve sizin gözetiminizde yapılır. Kantar fişi ve tüm evrak elden teslim edilir; ödeme tartı sonrası gerçekleşir.",
      ],
      en: [
        "We purchase scrap at every scale, from production offcuts and turnings to the dismantling of a complete line. We do not quote blind: a few photos sent over WhatsApp are usually enough for an indicative price, and the firm offer follows an on-site survey.",
        "Weighing takes place at the agreed weighbridge with you present. The weighbridge ticket and all paperwork are handed over, and payment is made once weighing is complete.",
      ],
    },
    bullets: {
      tr: [
        "Demir, çelik, bakır, alüminyum, pirinç, paslanmaz ve kurşun alımı",
        "Üretim artığı talaş, sac fire ve profil kırpıntısı için düzenli sözleşmeli alım",
        "Fotoğraf üzerinden ön fiyat, saha keşfiyle kesin teklif",
        "Şeffaf kantar tartımı ve tartı sonrası ödeme",
      ],
      en: [
        "Purchase of iron, steel, copper, aluminium, brass, stainless and lead",
        "Contracted recurring collection for turnings, sheet offcuts and profile trimmings",
        "Indicative price from photos, firm offer after an on-site survey",
        "Transparent weighbridge weighing and payment upon weighing",
      ],
    },
  },
  {
    id: "makine-satisi",
    icon: "gear",
    image: "konveyor-tamburu-1",
    title: {
      tr: "İkinci El Makine ve Ekipman Satışı",
      en: "Used Machinery & Equipment Sales",
    },
    summary: {
      tr: "Sahamızda çalışır durumda veya yedek parçalık konveyör, redüktör, motor, tank ve kasa bulunur.",
      en: "Our yard stocks conveyors, gearboxes, motors, tanks and truck bodies — working units and spare-part donors.",
    },
    description: {
      tr: [
        "Söktüğümüz tesislerden çıkan ekipmanın bir kısmı hurdaya gitmeden ikinci el olarak değerlendirilebiliyor. Konveyör tamburları ve redüktörler, elektrik motorları, büyük çaplı borular, platform ızgaraları, tank ve tanker gövdeleri, damper kasalar sahamızda hazır bekliyor.",
        "Her parça çalışır durumda değildir; hangisinin çalıştığını, hangisinin yedek parça için uygun olduğunu açıkça söyleriz. Aradığınız parçanın ölçüsünü WhatsApp'tan yazın, stokta varsa fotoğrafını ve fiyatını aynı gün gönderelim.",
      ],
      en: [
        "Part of the equipment recovered from the plants we dismantle is good enough for a second life instead of the furnace. Conveyor drums and gearboxes, electric motors, large-diameter pipe, platform grating, tank and tanker shells and tipper bodies are all in stock in our yard.",
        "Not every item is a runner — we tell you plainly which units work and which are only good for parts. Send us the dimensions you need over WhatsApp and, if we have it, you get photos and a price the same day.",
      ],
    },
    bullets: {
      tr: [
        "Konveyör tamburu, redüktör, elektrik motoru ve tahrik grupları",
        "Tank, silo, tanker gövdesi ve damper kasa",
        "Büyük çaplı çelik boru, profil, sac ve platform ızgarası",
        "Aradığınız parça stokta yoksa gelen tesislerden haber veriyoruz",
      ],
      en: [
        "Conveyor drums, gearboxes, electric motors and drive assemblies",
        "Tanks, silos, tanker shells and tipper bodies",
        "Large-diameter steel pipe, profiles, plate and platform grating",
        "If a part is not in stock we flag it when an incoming plant has one",
      ],
    },
  },
  {
    id: "tesis-sokumu",
    icon: "crane",
    image: "celik-kafes-kiris-2",
    title: {
      tr: "Tesis Sökümü ve Demontaj",
      en: "Plant Dismantling & Demolition",
    },
    summary: {
      tr: "Fabrika, hangar, tank ve çelik konstrüksiyonun kesimi, sökümü ve sahadan tahliyesi.",
      en: "Cutting, dismantling and clearance of factories, hangars, tanks and steel structures.",
    },
    description: {
      tr: [
        "Kapanan veya yenilenen tesislerde çelik konstrüksiyon, hat ekipmanı, tank ve boru sistemlerinin sökümünü üstleniyoruz. Kesim, sökme, yükleme ve nakliye tek elden yürütülür; saha size boşaltılmış olarak teslim edilir.",
        "Çalışmaya başlamadan önce iş programını ve saha güvenlik kurallarını birlikte belirliyoruz. Ekibimiz baret, gözlük ve emniyet kemeri dahil kişisel koruyucu donanımla çalışır; sıcak işlem yapılacak bölgelerde yangın önlemi alınır.",
      ],
      en: [
        "For plants that are closing or being refitted, we take on the dismantling of steel structures, line equipment, tanks and pipework. Cutting, dismantling, loading and haulage are handled by one team, and the site is handed back cleared.",
        "Before work starts we agree the schedule and the site safety rules with you. Our crew works in full personal protective equipment including helmets, eye protection and harnesses, and fire precautions are put in place wherever hot work is carried out.",
      ],
    },
    bullets: {
      tr: [
        "Çelik hangar, çatı makası ve taşıyıcı konstrüksiyon sökümü",
        "Tank, silo, kazan ve boru hattı demontajı",
        "Üretim hattı ve konveyör sistemlerinin sökülüp taşınması",
        "Oksijen kesim, plazma kesim ve vinçli indirme",
        "Söküm sonrası saha temizliği ve hurdanın tahliyesi",
      ],
      en: [
        "Dismantling of steel hangars, roof trusses and load-bearing structures",
        "Demolition of tanks, silos, boilers and pipelines",
        "Removal and relocation of production lines and conveyor systems",
        "Oxy-fuel cutting, plasma cutting and crane-assisted lowering",
        "Site clean-up and scrap clearance once the work is done",
      ],
    },
  },
  {
    id: "konteyner",
    icon: "truck",
    image: "celik-boru-2",
    title: {
      tr: "Araç ve Konteyner Temini",
      en: "Container Supply & Haulage",
    },
    summary: {
      tr: "Sahanıza konteyner bırakıyor, dolduğunda kepçe ve kamyonla yükleyip tartıya götürüyoruz.",
      en: "We drop a container at your site, then load it with a grab and truck and take it to the weighbridge.",
    },
    description: {
      tr: [
        "Hurdanız bir seferde çıkmıyorsa sahanıza konteyner bırakıyoruz; siz doldurdukça değiştiriyoruz. Tek seferlik büyük çıkışlarda ise kepçe, forklift ve kamyon aynı gün sahaya geliyor.",
        "Yükleme sırasında sahanızın zarar görmemesi için giriş yolu, manevra alanı ve zemin durumunu önceden konuşuyoruz. Nakliye ve yükleme masrafı teklifin içindedir; sonradan ek kalem çıkmaz.",
      ],
      en: [
        "If your scrap accumulates over time we leave a container on site and swap it as you fill it. For a single large clearance, the grab, forklift and truck arrive on the same day.",
        "To avoid damage during loading we agree the access road, turning space and ground conditions in advance. Haulage and loading are included in the quoted price — no extra line items appear afterwards.",
      ],
    },
    bullets: {
      tr: [
        "Sahaya konteyner bırakma ve dolduğunda değiştirme",
        "Kepçe, forklift ve vinçli yükleme desteği",
        "Kantarlı nakliye — tartı fişi elden teslim",
        "Manisa, Balıkesir, İzmir ve Kütahya genelinde hizmet",
      ],
      en: [
        "Container drop-off and swap-out as it fills",
        "Loading support with grab, forklift and crane",
        "Weighbridge haulage — the ticket is handed to you",
        "Service across Manisa, Balıkesir, İzmir and Kütahya",
      ],
    },
  },
];
