/* Jet Bridge — Vanilla JS + jQuery
   React-хуки заменены так:
   - useState(menuOpen)      → класс .is-open + текст кнопки
   - useState(lang)          → переменная currentLang + data-атрибуты
   - useState(form/errors)   → значения input + классы .is-visible
   - useEffect(scroll)       → $(scroller).on('scroll') / $(window).on('resize')
*/

const TRANSLATIONS = {
  ru: {
    langCurrent: 'RU',
    langOther: 'kz',
    menu: 'меню',
    close: 'Закрыть',
    nav: [
      { label: 'О компании' },
      { label: 'Этапы' },
      { label: 'Приемущества' },
      { label: 'B2B-направления' },
      { label: 'Тарифы' },
      { label: 'Что доставляем' },
      { label: 'Контакты' },
    ],
    heroTitleLead: 'JET ',
    heroTitleBrand: 'Bridge',
    heroTitleRest: '— доставка из ОАЭ\nв Казахстан за 5-7 дней',
    heroSubtitle: 'Посылки, техника, запчасти и грузы для бизнеса.\nВсё под ключ: склад, трекинг, таможня.',
    calcCost: 'Рассчитать стоимость',
    viewTariffLead: 'Ознакомиться с',
    viewTariffWord: 'тарифом',
    aboutTitle: 'О компании JetBridge',
    aboutText:
      'JetBridge — это международная логистическая компания, предоставляющая авиа-доставку из ОАЭ в Казахстан “под ключ”. Мы обеспечиваем полный цикл: от приёмки и консолидации груза на собственном складе в Дубае до оформления всех документов и доставки получателю в РК. Работаем как с частными клиентами, так и с бизнесом: оформляем контракты, инвойсы, HS-коды и сопровождаем ВЭД.\nНаш подход — это скорость, прозрачность и технологичность. Благодаря цифровым инструментам клиент всегда знает, где находится его груз, сколько он стоит и когда будет доставлен.',
    advantagesTitle: 'Наши ключевые преимущества — в каждом этапе логистики',
    advantages: [
      { title: 'Быстрая доставка за 5–7 дней', text: 'Авиа-отправка из ОАЭ без задержек и перегрузок! Вы точно знаете когда получите ваш груз' },
      { title: 'Цифровой сервис без звонков и ожиданий', text: 'Заявка, трекинг, уведомления — всё онлайн, в личном кабинете' },
      { title: 'Гибкие тарифы для B2C и B2B', text: 'Лояльный подход\nк каждому клиенту!' },
      { title: 'Полное таможенное оформление и ВЭД', text: 'Берём на себя документы, инвойсы, страхование' },
      { title: 'Собственный склад в Дубае', text: 'Принимаем, проверяем, фотографируем, упаковываем и объединяем грузы.' },
    ],
    tariffsTitle: 'Технологии, которые работают на вас',
    leaveRequest: 'Оставить заявку',
    tariffs: [
      { title: 'Мини\nпосылка', text: 'Для личных заказов, запчастей, косметики, документов и др.\n\n• Все включено: склад, трекинг, таможня\n• Удобно для маркетплейсов\n• Вес: до 10 кг\n\nЦена: от $8 за отправление\nСрок: 5-7 дней' },
      { title: 'Стандартная\nдоставка', text: 'Для личных и бизнес заказов, техники, косметики, документов, запчастей и др.\n\n• Все включено: склад, трекинг, таможня\n• Удобно для маркетплейсов\n• Вес: до 50 кг\n\nЦена: от $8 за отправление\nСрок: 5-7 дней' },
      { title: 'Крупный\nгруз / партия', text: 'Для личных и бизнес заказов, техники, косметики, документов, запчастей и др.\n\n• Все включено: склад, трекинг, таможня\n• Удобно для маркетплейсов\n• Вес: от 100 г\n\nЦена: от $8 за отправление\nСрок: 5-7 дней' },
    ],
    howTitle: 'Как работает JetBridge',
    howText: 'От заявки до получения — весь процесс под контролем. Мы берём на себя всю логистику, склад, документы и доставку. Вам нужно только отправить груз — остальное сделаем мы.',
    contactUs: 'Связаться с нами',
    steps: [
      { title: 'Заявка онлайн', text: 'Вы заполняете форму или пишете в ватсап — быстро и без звонков' },
      { title: 'Приёмка\nв Дубае', text: 'Груз поступает на наш склад, проверяется, фотографируется и готовится к отправке' },
      { title: 'Отправка АВИА Доставкой', text: 'Мы отправляем ваш груз ближайшим рейсом в РК. Включено: трекинг и экспортное оформление' },
      { title: 'Доставка\nи получение', text: 'Оформляем таможню, сообщаем статус и передаём груз получателю в Алмате. Возможна доставка по всей территории Казахстана.' },
    ],
    cargoTitle: 'Что мы доставляем',
    cargo: [
      { tag: 'Электроника и техника', title: 'смартфоны, ноутбуки, аксессуары' },
      { tag: 'Запчасти и комплектующие', title: 'автозапчасти, шины, техмодули' },
      { tag: 'Одежда, обувь и косметика', title: 'одежда, обувь, текстиль, бьюти-продукты' },
      { tag: 'Медицинские и автотовары', title: 'медприборы, автоаксессуары' },
    ],
    reviewsTitle: 'отзывы',
    reviews: [
      { name: 'Арман С. Алматы', text: 'Привезли ноутбук из Дубая за 6 дней, всё чётко, с фото, трекингом и оповещениями. Очень доволен! Привезли ноутбук из Дубая за 6 дней, всё чётко, с фото, трекингом и оповещениями. Очень доволен!' },
      { name: 'Асель Б., директор ТОО', text: 'Работаем по ВЭД с компанией больше года. Надежные партнёры по логистике, всё по договору. Очень ценим стабильность и прозрачность в этом партнёрстве.' },
      { name: 'Арман С. Алматы', text: 'Привезли ноутбук из Дубая за 6 дней, всё чётко, с фото, трекингом и оповещениями. Очень доволен! Привезли ноутбук из Дубая за 6 дней, всё чётко, с фото, трекингом и оповещениями. Очень доволен!' },
      { name: 'Асель Б., директор ТОО', text: 'Работаем по ВЭД с компанией больше года. Надежные партнёры по логистике, всё по договору. Очень ценим стабильность и прозрачность в этом партнёрстве.' },
      { name: 'Арман С. Алматы', text: 'Привезли ноутбук из Дубая за 6 дней, всё чётко, с фото, трекингом и оповещениями. Очень доволен! Привезли ноутбук из Дубая за 6 дней, всё чётко, с фото, трекингом и оповещениями. Очень доволен!' },
      { name: 'Асель Б., директор ТОО', text: 'Работаем по ВЭД с компанией больше года. Надежные партнёры по логистике, всё по договору. Очень ценим стабильность и прозрачность в этом партнёрстве.' },
    ],
    formTitle: 'Оставить заявку',
    formSubtitle: 'Заполните форму — и мы свяжемся с вами\nв ближайшее время',
    name: 'Имя',
    phone: 'Ваш телефон',
    weight: 'Вес груза (кг)',
    sendRequest: 'Отправить заявку',
    consentBefore: 'Нажимая на “Отправить заявку”, соглашаюсь с условиями ',
    consentLink: 'Политики обработки персональных данных',
    consentAfter: '',
    privacyTitle: 'Политика обработки персональных данных',
    privacyText: 'Мы обрабатываем ваши имя, телефон и сведения о грузе только для связи по заявке и организации доставки. Данные не передаются третьим лицам, кроме партнёров, необходимых для выполнения услуги.',
    privacyClose: 'Понятно',
    formSuccess: 'Заявка отправлена. Мы свяжемся с вами в ближайшее время.',
    nameError: 'Укажите имя',
    phoneError: 'Укажите корректный телефон',
    weightError: 'Укажите вес груза',
    contactsTitle: 'Контакты',
    office: 'Адрес офиса',
    officeValue: 'Дубай, UAE',
    phoneLabel: 'телефон',
    phoneValue: '+7 777 777 77 77',
    emailLabel: 'Email',
    emailValue: 'info@mediapeace.com',
    socials: 'Мессенджеры и социальные сети',
    footerNote: '© Jet Bridge. Авиа-доставка из ОАЭ в Казахстан.',
  },
  kz: {
    langCurrent: 'KZ',
    langOther: 'ru',
    menu: 'мәзір',
    close: 'Жабу',
    nav: [
      { label: 'Компания туралы' },
      { label: 'Кезеңдер' },
      { label: 'Артықшылықтар' },
      { label: 'B2B-бағыттар' },
      { label: 'Тарифтер' },
      { label: 'Не жеткіземіз' },
      { label: 'Байланыс' },
    ],
    heroTitleLead: 'JET ',
    heroTitleBrand: 'Bridge',
    heroTitleRest: '— БАӘ-ден жеткізу\nҚазақстанға 5-7 күнде',
    heroSubtitle: 'Сәлемдемелер, техника, қосалқы бөлшектер және бизнес жүктері.\nБарлығы кілтпен: қойма, трекинг, кеден.',
    calcCost: 'Құнын есептеу',
    viewTariffLead: 'Тарифпен',
    viewTariffWord: 'танысу',
    aboutTitle: 'JetBridge компаниясы туралы',
    aboutText:
      'JetBridge — БАӘ-ден Қазақстанға “кілтпен” авиажеткізуді ұсынатын халықаралық логистикалық компания. Біз толық циклді қамтамасыз етеміз: Дубайдағы өз қоймамызда жүкті қабылдау мен шоғырландырудан бастап, барлық құжаттарды рәсімдеуге және ҚР-дағы алушыға жеткізуге дейін. Жеке клиенттермен де, бизнеспен де жұмыс істейміз: келісімшарттар, инвойстар, HS-кодтарды рәсімдейміз және СЭҚ-ты сүйемелдейміз.\nБіздің тәсіл — жылдамдық, ашықтық және технологиялылық. Цифрлық құралдардың арқасында клиент жүгі қайда екенін, қанша тұратынын және қашан жеткізілетінін әрқашан біледі.',
    advantagesTitle: 'Негізгі артықшылықтарымыз — логистиканың әр кезеңінде',
    advantages: [
      { title: '5–7 күнде жылдам жеткізу', text: 'БАӘ-ден кідіріссіз және ауыстырып тиеусіз авиажөнелту! Жүгіңізді қашан алатыныңызды нақты білесіз' },
      { title: 'Қоңыраусыз және күтусіз цифрлық сервис', text: 'Өтінім, трекинг, хабарламалар — барлығы онлайн, жеке кабинетте' },
      { title: 'B2C және B2B үшін икемді тарифтер', text: 'Әр клиентке\nадал тәсіл!' },
      { title: 'Толық кедендік рәсімдеу және СЭҚ', text: 'Құжаттарды, инвойстарды, сақтандыруды өзімізге аламыз' },
      { title: 'Дубайдағы өз қоймамыз', text: 'Қабылдаймыз, тексереміз, суретке түсіреміз, қаптаймыз және жүктерді біріктіреміз.' },
    ],
    tariffsTitle: 'Сіз үшін жұмыс істейтін технологиялар',
    leaveRequest: 'Өтінім қалдыру',
    tariffs: [
      { title: 'Мини\nсәлемдеме', text: 'Жеке тапсырыстар, бөлшектер, косметика, құжаттар және т.б.\n\n• Барлығы кіреді: қойма, трекинг, кеден\n• Маркетплейстерге ыңғайлы\n• Салмағы: 10 кг-ға дейін\n\nБағасы: жөнелту үшін $8-ден\nМерзімі: 5-7 күн' },
      { title: 'Стандарт\nжеткізу', text: 'Жеке және бизнес тапсырыстар, техника, косметика, құжаттар, бөлшектер және т.б.\n\n• Барлығы кіреді: қойма, трекинг, кеден\n• Маркетплейстерге ыңғайлы\n• Салмағы: 50 кг-ға дейін\n\nБағасы: жөнелту үшін $8-ден\nМерзімі: 5-7 күн' },
      { title: 'Ірі\nжүк / партия', text: 'Жеке және бизнес тапсырыстар, техника, косметика, құжаттар, бөлшектер және т.б.\n\n• Барлығы кіреді: қойма, трекинг, кеден\n• Маркетплейстерге ыңғайлы\n• Салмағы: 100 г-нан\n\nБағасы: жөнелту үшін $8-ден\nМерзімі: 5-7 күн' },
    ],
    howTitle: 'JetBridge қалай жұмыс істейді',
    howText: 'Өтінімнен алуға дейін — бүкіл процесс бақылауда. Логистиканы, қойманы, құжаттарды және жеткізуді өзімізге аламыз. Сізге тек жүкті жіберу керек — қалғанын біз жасаймыз.',
    contactUs: 'Бізбен байланысу',
    steps: [
      { title: 'Онлайн өтінім', text: 'Форманы толтырасыз немесе WhatsApp-қа жазасыз — жылдам және қоңыраусыз' },
      { title: 'Дубайда\nқабылдау', text: 'Жүк қоймамызға түседі, тексеріледі, суретке түсіріледі және жөнелтуге дайындалады' },
      { title: 'АВИА жеткізумен жөнелту', text: 'Жүгіңізді ҚР-ға жақын рейспен жібереміз. Кіреді: трекинг және экспорттық рәсімдеу' },
      { title: 'Жеткізу\nжәне алу', text: 'Кеденді рәсімдейміз, мәртебені хабарлаймыз және жүкті Алматыдағы алушыға береміз. Қазақстан бойынша жеткізу мүмкін.' },
    ],
    cargoTitle: 'Не жеткіземіз',
    cargo: [
      { tag: 'Электроника және техника', title: 'смартфондар, ноутбуктер, аксессуарлар' },
      { tag: 'Бөлшектер мен жиынтықтар', title: 'автобөлшектер, шиналар, техмодульдер' },
      { tag: 'Киім, аяқ киім және косметика', title: 'киім, аяқ киім, тоқыма, бьюти-өнімдер' },
      { tag: 'Медициналық және автотауарлар', title: 'медқұралдар, автоаксессуарлар' },
    ],
    reviewsTitle: 'пікірлер',
    reviews: [
      { name: 'Арман С. Алматы', text: 'Ноутбукты Дубайдан 6 күнде әкелді, бәрі нақты: фото, трекинг және хабарламалар. Өте ризамын!' },
      { name: 'Әсел Б., ЖШС директоры', text: 'Компаниямен СЭҚ бойынша бір жылдан астам жұмыс істейміз. Логистикадағы сенімді серіктестер, бәрі шарт бойынша.' },
      { name: 'Арман С. Алматы', text: 'Ноутбукты Дубайдан 6 күнде әкелді, бәрі нақты: фото, трекинг және хабарламалар. Өте ризамын!' },
      { name: 'Әсел Б., ЖШС директоры', text: 'Компаниямен СЭҚ бойынша бір жылдан астам жұмыс істейміз. Логистикадағы сенімді серіктестер, бәрі шарт бойынша.' },
      { name: 'Арман С. Алматы', text: 'Ноутбукты Дубайдан 6 күнде әкелді, бәрі нақты: фото, трекинг және хабарламалар. Өте ризамын!' },
      { name: 'Әсел Б., ЖШС директоры', text: 'Компаниямен СЭҚ бойынша бір жылдан астам жұмыс істейміз. Логистикадағы сенімді серіктестер, бәрі шарт бойынша.' },
    ],
    formTitle: 'Өтінім қалдыру',
    formSubtitle: 'Форманы толтырыңыз — біз сізбен\nжақын арада хабарласамыз',
    name: 'Аты',
    phone: 'Телефоныңыз',
    weight: 'Жүк салмағы (кг)',
    sendRequest: 'Өтінім жіберу',
    consentBefore: '“Өтінім жіберу” батырмасын басу арқылы ',
    consentLink: 'дербес деректерді өңдеу саясатының',
    consentAfter: ' шарттарына келісемін',
    privacyTitle: 'Дербес деректерді өңдеу саясаты',
    privacyText: 'Атыңызды, телефоныңызды және жүк туралы мәліметтерді тек өтінім бойынша байланысу және жеткізуді ұйымдастыру үшін өңдейміз.',
    privacyClose: 'Түсінікті',
    formSuccess: 'Өтінім жіберілді. Жақын арада сізбен хабарласамыз.',
    nameError: 'Атыңызды көрсетіңіз',
    phoneError: 'Дұрыс телефон енгізіңіз',
    weightError: 'Жүк салмағын көрсетіңіз',
    contactsTitle: 'Байланыс',
    office: 'Кеңсе мекенжайы',
    officeValue: 'Дубай, UAE',
    phoneLabel: 'телефон',
    phoneValue: '+7 777 777 77 77',
    emailLabel: 'Email',
    emailValue: 'info@mediapeace.com',
    socials: 'Мессенджерлер мен әлеуметтік желілер',
    footerNote: '© Jet Bridge. БАӘ-ден Қазақстанға авиажеткізу.',
  },
};

let currentLang = 'ru';
let menuOpen = false;

function readPath(dict, path) {
  return path.split('.').reduce(function (acc, key) {
    return acc == null ? undefined : acc[key];
  }, dict);
}

function applyLanguage(lang) {
  currentLang = lang;
  const dict = TRANSLATIONS[lang];
  $('html').attr('lang', lang);

  $('[data-i18n]').each(function () {
    const value = readPath(dict, $(this).attr('data-i18n'));
    if (value != null) {
      $(this).text(value);
    }
  });

  $('[data-i18n-placeholder]').each(function () {
    const value = readPath(dict, $(this).attr('data-i18n-placeholder'));
    if (value != null) {
      $(this).attr('placeholder', value);
    }
  });

  // Кнопка меню сохраняет текущее состояние open/close
  $('#menu-btn span').text(menuOpen ? dict.close : dict.menu);
}

function updateReviewEdges() {
  const $scroller = $('#reviews-scroller');
  const node = $scroller.get(0);
  if (!node) return;

  const atStart = node.scrollLeft <= 8;
  const atEnd = node.scrollLeft + node.clientWidth >= node.scrollWidth - 8;

  $('#reviews-prev')
    .toggleClass('is-dimmed', atStart)
    .prop('disabled', atStart);
  $('#reviews-next')
    .toggleClass('is-dimmed', atEnd)
    .prop('disabled', atEnd);
}

document.documentElement.classList.add('js-ready');

$(function () {
  const revealSelector = [
    '.hero-copy',
    '.hero-actions',
    '.about-copy',
    '.about-image',
    '.advantages-title',
    '.advantages-card',
    '.tariffs-title',
    '.tariffs-card',
    '.how-intro',
    '.how-card',
    '.cargo-title',
    '.cargo-visual',
    '.reviews .section-title',
    '.reviews-card',
    '.form-inner',
    '.contacts .section-title',
    '.contacts-map',
    '.contacts-col',
  ].join(', ');

  $(revealSelector).addClass('reveal');

  $('.tariffs-grid .tariffs-card, .how-bottom .how-card, .advantages-canvas .advantages-card, .reviews-scroller .reviews-card').each(function (index) {
    this.style.setProperty('--d', (index % 4) * 90 + 'ms');
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-inview');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.18, rootMargin: '0px 0px -48px 0px' },
    );

    $('.reveal').each(function () {
      observer.observe(this);
    });
  } else {
    $('.reveal').addClass('is-inview');
  }

  requestAnimationFrame(function () {
    $('.hero .reveal').addClass('is-inview');
  });

  // Меню: аналог useState(menuOpen)
  $('#menu-btn').on('click', function () {
    menuOpen = !menuOpen;
    $('#navbar').toggleClass('is-open', menuOpen).attr('aria-hidden', !menuOpen);
    $('#menu-btn span').text(menuOpen ? TRANSLATIONS[currentLang].close : TRANSLATIONS[currentLang].menu);
  });

  $('#navbar a').on('click', function () {
    menuOpen = false;
    $('#navbar').removeClass('is-open').attr('aria-hidden', true);
    $('#menu-btn span').text(TRANSLATIONS[currentLang].menu);
  });

  // Язык: аналог LanguageContext
  $('#lang-toggle').on('click', function () {
    applyLanguage(currentLang === 'ru' ? 'kz' : 'ru');
  });

  function reviewStep() {
    const $card = $('#reviews-scroller .reviews-card').first();
    if (!$card.length) return 280;
    const gap = parseFloat($('#reviews-scroller').css('gap')) || 16;
    return $card.outerWidth() + gap;
  }

  $('#reviews-prev').on('click', function () {
    $('#reviews-scroller').get(0).scrollBy({ left: -reviewStep(), behavior: 'smooth' });
  });

  $('#reviews-next').on('click', function () {
    $('#reviews-scroller').get(0).scrollBy({ left: reviewStep(), behavior: 'smooth' });
  });

  $('#reviews-scroller').on('scroll', updateReviewEdges);
  $(window).on('resize', updateReviewEdges);
  updateReviewEdges();

  $('#request-form').on('input', 'input', function () {
    $(this).siblings('small').removeClass('is-visible');
    $('#form-success').removeClass('is-visible');
  });

  // Форма: аналог useState(values/errors/sent)
  $('#request-form').on('submit', function (event) {
    event.preventDefault();
    const name = $.trim($('#field-name').val());
    const phone = $.trim($('#field-phone').val());
    const weight = $.trim($('#field-weight').val());
    let valid = true;

    $('#error-name').toggleClass('is-visible', !name);
    if (!name) valid = false;

    const phoneOk = /^\+?[\d\s()-]{7,}$/.test(phone);
    $('#error-phone').toggleClass('is-visible', !phoneOk);
    if (!phoneOk) valid = false;

    const weightOk = weight !== '' && Number(weight) > 0;
    $('#error-weight').toggleClass('is-visible', !weightOk);
    if (!weightOk) valid = false;

    if (!valid) return;

    this.reset();
    $('.request-form small').removeClass('is-visible');
    $('#form-success').addClass('is-visible');
  });

  // Модалка политики
  $('#privacy-open').on('click', function () {
    $('#privacy-modal').addClass('is-open').removeAttr('hidden');
  });

  function closePrivacy() {
    $('#privacy-modal').removeClass('is-open').attr('hidden', true);
  }

  $('#privacy-close').on('click', closePrivacy);

  $('#privacy-modal').on('click', function (event) {
    if (event.target === this) closePrivacy();
  });

  $(document).on('keydown', function (event) {
    if (event.key !== 'Escape') return;

    if ($('#privacy-modal').hasClass('is-open')) {
      closePrivacy();
      return;
    }

    if (menuOpen) {
      menuOpen = false;
      $('#navbar').removeClass('is-open').attr('aria-hidden', true);
      $('#menu-btn span').text(TRANSLATIONS[currentLang].menu);
    }
  });
});
