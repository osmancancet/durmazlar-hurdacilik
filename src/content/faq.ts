import type { Localized } from "@/lib/i18n";

export type FaqItem = { question: Localized; answer: Localized };

export const FAQ: FaqItem[] = [
  {
    question: {
      tr: "Fiyatı nasıl öğrenebilirim?",
      en: "How do I find out the price?",
    },
    answer: {
      tr: "En hızlısı WhatsApp'tan birkaç fotoğraf göndermek. Malzemenin türünü, yaklaşık tonajını ve bulunduğu yeri yazın; aynı gün ön fiyat söyleyelim. Büyük işlerde kesin fiyat için sahaya gelip görmemiz gerekir.",
      en: "The quickest way is to send a few photos over WhatsApp. Tell us the type of material, roughly how much there is and where it is, and we will give an indicative price the same day. For larger jobs a firm price needs an on-site visit.",
    },
  },
  {
    question: {
      tr: "En az ne kadar hurda alıyorsunuz?",
      en: "Is there a minimum quantity?",
    },
    answer: {
      tr: "Sabit bir alt sınırımız yok. Küçük miktarları sahamıza getirebilirsiniz; nakliyeli alım için ise yükün bir kamyonu doldurması genelde daha mantıklı oluyor. Emin değilseniz sorun, birlikte bakalım.",
      en: "There is no fixed minimum. You can bring smaller amounts to our yard; for collection with haulage it usually makes more sense once the load fills a truck. If you are unsure, just ask and we will look at it together.",
    },
  },
  {
    question: {
      tr: "Malzemeyi ayrıştırmam gerekiyor mu?",
      en: "Do I have to sort the material first?",
    },
    answer: {
      tr: "Hayır. Karışık gelen yükleri sahamızda biz ayrıştırıyoruz. Yalnız bakır, alüminyum gibi renkli metaller ayrı verildiğinde daha iyi fiyat alırsınız — çünkü karışık yükte tamamı en düşük kalemden değerlenir.",
      en: "No. We sort mixed loads in our own yard. That said, non-ferrous metals like copper and aluminium fetch a better price when kept separate, because in a mixed load everything is valued at the lowest grade.",
    },
  },
  {
    question: {
      tr: "Ödeme ne zaman ve nasıl yapılıyor?",
      en: "When and how is payment made?",
    },
    answer: {
      tr: "Ödeme, kantar tartımı tamamlandıktan sonra yapılır. Tartı sizin gözetiminizde gerçekleşir ve kantar fişi elinize verilir; ödeme şeklini işin büyüklüğüne göre birlikte belirleriz.",
      en: "Payment is made once weighing at the weighbridge is complete. The weighing takes place with you present and the ticket is handed to you; the payment method is agreed together according to the size of the job.",
    },
  },
  {
    question: {
      tr: "Söküm ve yükleme masrafı bana mı ait?",
      en: "Do I pay for dismantling and loading?",
    },
    answer: {
      tr: "Hayır. Kesim, söküm, kepçe, vinç ve nakliye verdiğimiz teklifin içindedir. Teklif netleştikten sonra ek kalem çıkarmayız; çıkacak bir durum varsa işe başlamadan söyleriz.",
      en: "No. Cutting, dismantling, grab and crane work and haulage are all included in the quote. Once the offer is agreed we do not add line items later; if something could change it, we tell you before starting.",
    },
  },
  {
    question: {
      tr: "Hangi bölgelere geliyorsunuz?",
      en: "Which areas do you cover?",
    },
    answer: {
      tr: "Merkezimiz Soma / Manisa. Düzenli olarak Manisa, Balıkesir, İzmir ve Kütahya genelinde çalışıyoruz. Tonajı büyük işler için bu illerin dışına da çıkabiliyoruz — konumunuzu yazın, bakalım.",
      en: "We are based in Soma, Manisa, and work regularly across Manisa, Balıkesir, İzmir and Kütahya. For larger tonnages we can travel beyond those provinces too — send us your location and we will see.",
    },
  },
  {
    question: {
      tr: "İkinci el ekipman satışınız var mı?",
      en: "Do you sell used equipment?",
    },
    answer: {
      tr: "Evet. Sahamızda konveyör tamburu, redüktör, elektrik motoru, tank, damper kasa ve büyük çaplı boru gibi parçalar bulunuyor. Hepsi çalışır durumda değildir; hangisinin çalıştığını, hangisinin yedek parçalık olduğunu açıkça söyleriz.",
      en: "Yes. Our yard holds conveyor drums, gearboxes, electric motors, tanks, tipper bodies and large-diameter pipe among other things. Not all of it runs — we tell you plainly which units work and which are only good for parts.",
    },
  },
  {
    question: {
      tr: "Hurda aracımın evraklarını siz mi hallediyorsunuz?",
      en: "Do you handle the paperwork for scrapped vehicles?",
    },
    answer: {
      tr: "Hurdaya ayrılacak araç ve üst yapılarda hangi belgelerin gerektiği konusunda yönlendirme yapıyoruz. İşlemler resmî kurumlar üzerinden yürüdüğü için süreç boyunca ne yapmanız gerektiğini adım adım anlatırız.",
      en: "We guide you on which documents are needed for vehicles and superstructures being scrapped. Since the process runs through official bodies, we walk you through what you need to do at each step.",
    },
  },
];
