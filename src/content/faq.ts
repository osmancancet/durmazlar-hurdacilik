import type { Localized } from "@/lib/i18n";

export type FaqItem = { question: Localized; answer: Localized };

export const FAQ: FaqItem[] = [
  {
    question: {
      tr: "Fiyatı nasıl öğrenebilirim?",
      en: "How do I find out the price?",
      ru: "Как узнать цену?",
      ar: "كيف أعرف السعر؟",
    },
    answer: {
      tr: "En hızlısı WhatsApp'tan birkaç fotoğraf göndermek. Malzemenin türünü, yaklaşık tonajını ve bulunduğu yeri yazın; aynı gün ön fiyat söyleyelim. Büyük işlerde kesin fiyat için sahaya gelip görmemiz gerekir.",
      en: "The quickest way is to send a few photos over WhatsApp. Tell us the type of material, roughly how much there is and where it is, and we will give an indicative price the same day. For larger jobs a firm price needs an on-site visit.",
      ru: "Быстрее всего — прислать несколько фотографий в WhatsApp. Напишите вид материала, примерный тоннаж и местоположение, и мы в тот же день назовём ориентировочную цену. Для крупных объёмов точная цена даётся после выезда на место.",
      ar: "أسرع طريقة هي إرسال بضع صور عبر واتساب. اكتبوا نوع المادة والتونّاج التقريبي والموقع، ونعطيكم سعراً مبدئياً في اليوم نفسه. أما في الأعمال الكبيرة فالسعر النهائي يتطلب معاينة في الموقع.",
    },
  },
  {
    question: {
      tr: "En az ne kadar hurda alıyorsunuz?",
      en: "Is there a minimum quantity?",
      ru: "Какой минимальный объём вы принимаете?",
      ar: "ما الحد الأدنى للكمية التي تشترونها؟",
    },
    answer: {
      tr: "Sabit bir alt sınırımız yok. Küçük miktarları sahamıza getirebilirsiniz; nakliyeli alım için ise yükün bir kamyonu doldurması genelde daha mantıklı oluyor. Emin değilseniz sorun, birlikte bakalım.",
      en: "There is no fixed minimum. You can bring smaller amounts to our yard; for collection with haulage it usually makes more sense once the load fills a truck. If you are unsure, just ask and we will look at it together.",
      ru: "Жёсткого минимума нет. Небольшие партии можно привезти к нам на площадку; если нужен вывоз, обычно разумнее, чтобы груз заполнял машину. Не уверены — напишите, разберёмся вместе.",
      ar: "لا يوجد حد أدنى ثابت. يمكنكم إحضار الكميات الصغيرة إلى ساحتنا؛ أما إذا كان النقل مطلوباً فالأفضل عادةً أن تملأ الحمولة شاحنة. إن لم تكونوا متأكدين فاسألونا ونرى معاً.",
    },
  },
  {
    question: {
      tr: "Malzemeyi ayrıştırmam gerekiyor mu?",
      en: "Do I have to sort the material first?",
      ru: "Нужно ли сортировать материал?",
      ar: "هل يجب أن أفرز المواد؟",
    },
    answer: {
      tr: "Hayır. Karışık gelen yükleri sahamızda biz ayrıştırıyoruz. Yalnız bakır, alüminyum gibi renkli metaller ayrı verildiğinde daha iyi fiyat alırsınız — çünkü karışık yükte tamamı en düşük kalemden değerlenir.",
      en: "No. We sort mixed loads in our own yard. That said, non-ferrous metals like copper and aluminium fetch a better price when kept separate, because in a mixed load everything is valued at the lowest grade.",
      ru: "Нет. Смешанные партии мы сортируем сами на площадке. Но за цветные металлы — медь, алюминий — вы получите больше, если сдадите их отдельно: в смешанном грузе всё оценивается по самой низкой позиции.",
      ar: "لا. نحن نفرز الحمولات المختلطة في ساحتنا. لكن المعادن غير الحديدية كالنحاس والألمنيوم تحقق سعراً أفضل إذا سُلّمت منفصلة، لأن الحمولة المختلطة تُقيَّم كلها بسعر أدنى صنف فيها.",
    },
  },
  {
    question: {
      tr: "Ödeme ne zaman ve nasıl yapılıyor?",
      en: "When and how is payment made?",
      ru: "Когда и как производится оплата?",
      ar: "متى وكيف يتم الدفع؟",
    },
    answer: {
      tr: "Ödeme, kantar tartımı tamamlandıktan sonra yapılır. Tartı sizin gözetiminizde gerçekleşir ve kantar fişi elinize verilir; ödeme şeklini işin büyüklüğüne göre birlikte belirleriz.",
      en: "Payment is made once weighing at the weighbridge is complete. The weighing takes place with you present and the ticket is handed to you; the payment method is agreed together according to the size of the job.",
      ru: "Оплата производится после завершения взвешивания. Взвешивание проходит в вашем присутствии, весовой талон передаётся вам на руки; форму оплаты определяем вместе, в зависимости от объёма работ.",
      ar: "يتم الدفع بعد اكتمال الوزن على الميزان. يجري الوزن بحضوركم ويُسلَّم إليكم إيصال الوزن، ونحدد معاً طريقة الدفع بحسب حجم العمل.",
    },
  },
  {
    question: {
      tr: "Söküm ve yükleme masrafı bana mı ait?",
      en: "Do I pay for dismantling and loading?",
      ru: "Демонтаж и погрузка за мой счёт?",
      ar: "هل تكاليف التفكيك والتحميل على عاتقي؟",
    },
    answer: {
      tr: "Hayır. Kesim, söküm, kepçe, vinç ve nakliye verdiğimiz teklifin içindedir. Teklif netleştikten sonra ek kalem çıkarmayız; çıkacak bir durum varsa işe başlamadan söyleriz.",
      en: "No. Cutting, dismantling, grab and crane work and haulage are all included in the quote. Once the offer is agreed we do not add line items later; if something could change it, we tell you before starting.",
      ru: "Нет. Резка, демонтаж, погрузчик, кран и перевозка входят в наше предложение. После согласования цены дополнительных статей не появляется; если что-то может измениться, мы говорим об этом до начала работ.",
      ar: "لا. القصّ والتفكيك واللودر والونش والنقل كلها مشمولة في عرضنا. بعد الاتفاق على العرض لا نضيف بنوداً جديدة، وإن طرأ ما يستدعي ذلك نُخبركم قبل بدء العمل.",
    },
  },
  {
    question: {
      tr: "Hangi bölgelere geliyorsunuz?",
      en: "Which areas do you cover?",
      ru: "В какие регионы вы выезжаете?",
      ar: "إلى أي المناطق تأتون؟",
    },
    answer: {
      tr: "Merkezimiz Soma / Manisa. Düzenli olarak Manisa, Balıkesir, İzmir ve Kütahya genelinde çalışıyoruz. Tonajı büyük işler için bu illerin dışına da çıkabiliyoruz — konumunuzu yazın, bakalım.",
      en: "We are based in Soma, Manisa, and work regularly across Manisa, Balıkesir, İzmir and Kütahya. For larger tonnages we can travel beyond those provinces too — send us your location and we will see.",
      ru: "Наша база — Сома, провинция Маниса. Регулярно работаем по Манисе, Балыкесиру, Измиру и Кютахье. При больших объёмах выезжаем и за пределы этих провинций — напишите, где вы находитесь.",
      ar: "مقرنا في صوما بولاية مانيسا. نعمل بانتظام في مانيسا وباليكسير وإزمير وكوتاهيا. وفي الأعمال الكبيرة يمكننا الخروج خارج هذه الولايات أيضاً — اكتبوا لنا موقعكم ونرى.",
    },
  },
  {
    question: {
      tr: "İkinci el ekipman satışınız var mı?",
      en: "Do you sell used equipment?",
      ru: "Продаёте ли вы б/у оборудование?",
      ar: "هل تبيعون معدات مستعملة؟",
    },
    answer: {
      tr: "Evet. Sahamızda konveyör tamburu, redüktör, elektrik motoru, tank, damper kasa ve büyük çaplı boru gibi parçalar bulunuyor. Hepsi çalışır durumda değildir; hangisinin çalıştığını, hangisinin yedek parçalık olduğunu açıkça söyleriz.",
      en: "Yes. Our yard holds conveyor drums, gearboxes, electric motors, tanks, tipper bodies and large-diameter pipe among other things. Not all of it runs — we tell you plainly which units work and which are only good for parts.",
      ru: "Да. На площадке есть барабаны конвейеров, редукторы, электродвигатели, ёмкости, самосвальные кузова и трубы большого диаметра. Не всё на ходу — мы прямо говорим, что работает, а что годится только на запчасти.",
      ar: "نعم. تتوفر في ساحتنا أسطوانات سيور وعلب تروس ومحركات كهربائية وخزانات وصناديق قلاّبات وأنابيب كبيرة القطر. ليست كلها صالحة للتشغيل، ونقول بوضوح أيها يعمل وأيها يصلح كقطع غيار.",
    },
  },
  {
    question: {
      tr: "Hurda aracımın evraklarını siz mi hallediyorsunuz?",
      en: "Do you handle the paperwork for scrapped vehicles?",
      ru: "Оформляете ли вы документы на списываемую технику?",
      ar: "هل تتولّون أوراق المركبة المخصصة للخردة؟",
    },
    answer: {
      tr: "Hurdaya ayrılacak araç ve üst yapılarda hangi belgelerin gerektiği konusunda yönlendirme yapıyoruz. İşlemler resmî kurumlar üzerinden yürüdüğü için süreç boyunca ne yapmanız gerektiğini adım adım anlatırız.",
      en: "We guide you on which documents are needed for vehicles and superstructures being scrapped. Since the process runs through official bodies, we walk you through what you need to do at each step.",
      ru: "Мы подсказываем, какие документы нужны для списания техники и надстроек. Оформление идёт через государственные органы, поэтому мы шаг за шагом объясняем, что вам нужно сделать.",
      ar: "نرشدكم إلى المستندات المطلوبة للمركبات والهياكل العلوية المخصصة للخردة. وبما أن الإجراءات تتم عبر الجهات الرسمية، نشرح لكم خطوة بخطوة ما ينبغي عليكم فعله.",
    },
  },
];
