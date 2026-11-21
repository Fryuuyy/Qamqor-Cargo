const API = '/api';
const translations = {
  kk: {
    'brand.title':'Qamqor Cargo — жүк логистикасы','brand.label':'Жүк қозғалысы',
    'nav.dashboard':'Бақылау тақтасы','nav.transportations':'Тасымалдар','nav.planning':'Жүк жоспарлау','nav.rates':'Ақпарат және тарифтер','nav.settings':'Баптаулар','nav.aria':'Негізгі навигация',
    'language.label':'Интерфейс тілі',
    'auth.login':'Кіру','auth.register':'Тіркелу','auth.logout':'Жүйеден шығу','auth.fullName':'Аты-жөні','auth.email':'Электрондық пошта','auth.password':'Құпиясөз','auth.noAccount':'Аккаунтыңыз жоқ па?','auth.haveAccount':'Аккаунтыңыз бар ма?',
    'dashboard.eyebrow':'QAMQOR CARGO · ЛОГИСТИКА ПЛАТФОРМАСЫ','dashboard.metricsAria':'Өтінімдер жиынтығы','dashboard.title':'Тасымал','dashboard.titleAccent':'шолуы','dashboard.subtitle':'Өтінімдер, бағыттар мен мәртебелер бір жерде.','dashboard.online':'Жүйе қолжетімді',
    'dashboard.heroKicker':'Сенімді тасымал · Қазақстан бойынша','dashboard.heroTitle':'Жүгіңіз межелі жерге сенімді жетсін','dashboard.heroText':'Бағытты жоспарлаңыз, өтінім жіберіңіз және жеткізу барысын жеке кабинеттен бақылаңыз.','dashboard.createShipment':'Тасымалды жоспарлау','dashboard.emptyTitle':'Алғашқы тасымалды жоспарлаңыз',
    'metrics.total':'Барлық өтінім','metrics.inTransit':'Жолдағы жүк','metrics.delivered':'Жеткізілген','metrics.pending':'Қаралуда',
    'card.shipmentInfo.kicker':'Соңғы тасымал','card.shipmentInfo.title':'Жүк туралы ақпарат','card.tracking.kicker':'Нақты мәртебе','card.tracking.title':'Жүкті бақылау','card.route.kicker':'Жөнелту бағыты','card.route.title':'Бағыт деректері','card.vehicle.kicker':'ЖЕТКІЗУДІ БАҚЫЛАУ','card.vehicle.title':'Тасымал мониторингі',
    'tracking.empty':'Жаңа өтінім жасалған соң, оның мәртебесі мен бағыты осында көрінеді.','tracking.latest':'Соңғы өтінім','tracking.from':'Бастапқы қала','tracking.to':'Жеткізу қаласы',
    'route.originPlaceholder':'Жөнелту қаласы','route.destinationPlaceholder':'Жеткізу қаласы','route.from':'Қайдан','route.to':'Қайда',
    'vehicle.workflowTitle':'Бақылау өтінім мәртебесімен жүргізіледі','vehicle.workflowText':'Жеткізу барысы соңғы өтінім дерегінен алынады.','vehicle.telemetryNote':'Көлік датчиктері қосылмаған. Орналасу орны мен нақты уақыт телеметриясы көрсетілмейді.','vehicle.openShipments':'Тасымалдар тізімін ашу',
    'transportations.eyebrow':'ТАСЫМАЛДАРЫҢЫЗ','transportations.subtitle':'Өтінімдерді қарап, жеткізу мәртебесін сүзгі арқылы таңдаңыз.','transportations.filter':'Мәртебе','filter.all':'Барлық мәртебе',
    'actions.refresh':'Жаңарту','actions.openTransportations':'Тасымалдарды ашу','actions.cancel':'Өтінімді тоқтату','actions.save':'Сақтау','actions.status':'Мәртебені өзгерту','actions.optionalNote':'Ескерту (міндетті емес)',
    'planning.eyebrow':'ТАСЫМАЛДЫ ҰЙЫМДАСТЫРУ','planning.subtitle':'Өтінім жасаңыз: көлік түрі мен құны деректер қаралғаннан кейін нақтыланады.','planning.asideTitle':'3 қадамда тасымалды жоспарлаңыз','planning.asideText':'Маршрут пен жүк мәліметтерін енгізіп, өтінімді жіберіңіз.','planning.stepOne':'Маршрут пен жүк деректерін енгізіңіз','planning.stepTwo':'Өтінімді жіберіңіз','planning.stepThree':'Мәртебесін бақылаңыз','planning.formKicker':'ЖАҢА ӨТІНІМ','planning.formTitle':'Тасымал деректері','planning.formText':'Жіберілген өтінім нөмірі мен мәртебесі тасымалдар тізімінде сақталады.','planning.loginTitle':'Өтінім үшін жүйеге кіріңіз','planning.loginText':'Жүк тасымалына өтінім жіберу және оны бақылау үшін тіркеліңіз немесе жүйеге кіріңіз.','planning.listKicker':'САҚТАЛҒАН ӨТІНІМДЕР','planning.listTitle':'Жоспарланған тасымалдар','planning.adminKicker':'ӘКІМШІ БАСҚАРУЫ','planning.adminTitle':'Барлық клиент өтінімдері',
    'form.origin':'Қай қаладан','form.destination':'Қай қалаға','form.cargoType':'Жүк түрі','form.choose':'Таңдаңыз','form.weight':'Жүк салмағы (кг)','form.date':'Тасымалдау күні','form.phone':'Байланыс телефоны','form.comment':'Қосымша ақпарат','form.submit':'Өтінім жіберу','form.originPlaceholder':'Мысалы, Алматы','form.destinationPlaceholder':'Мысалы, Астана','form.weightPlaceholder':'500','form.phonePlaceholder':'+7 700 000 00 00','form.commentPlaceholder':'Жүк пен жеткізу туралы мәліметтер',
    'cargo.furniture':'Жиһаз','cargo.building':'Құрылыс материалдары','cargo.food':'Азық-түлік','cargo.appliances':'Тұрмыстық техника','cargo.other':'Басқа',
    'rates.eyebrow':'ҚЫЗМЕТТЕР МЕН ТӨЛЕМ','rates.subtitle':'Бағытқа, жүкке және тасымал шарттарына қарай жеке есеп жасалады.','rates.quoteKicker':'ЖЕКЕ ҰСЫНЫС','rates.quoteTitle':'Тасымал құны өтінімнен кейін есептеледі','rates.quoteText':'Баға бағытқа, жүк түрі мен салмағына және қажетті көлікке байланысты. Дәл ұсынысты өтініміңізді қарап шыққаннан кейін береміз.','rates.requestQuote':'Баға сұрау',
    'rates.cardOneTitle':'Қалааралық жеткізу','rates.cardOneText':'Қазақстан ішіндегі қалалар арасында жүк тасымалы.','rates.cardOneDetail':'Құны бағыт пен жүкке байланысты',
    'rates.cardTwoTitle':'Жүкке сай көлік','rates.cardTwoText':'Көлік түрі жүктің өлшемі, салмағы және сипатына қарай таңдалады.','rates.cardTwoDetail':'Таңдау өтінімді қарағанда нақтыланады',
    'rates.cardThreeTitle':'Жеткізу мәртебесі','rates.cardThreeText':'Жеке кабинетте өтінімнің күйі мен маршрут мәліметтері сақталады.','rates.cardThreeDetail':'Мәртебені онлайн қараңыз',
    'rates.disclaimer':'Нақты тариф интерфейсте алдын ала белгіленбеген: баға менеджер өтінімді қарап, деректерді растаған соң ұсынылады.',
    'settings.eyebrow':'ЖЕКЕ ПАРАМЕТРЛЕР','settings.subtitle':'Тіл таңдауыңыз осы құрылғыда сақталады.','settings.languageKicker':'ТІЛ ТАҢДАУ','settings.languageTitle':'Интерфейс тілі','settings.languageText':'Қазақша немесе орысша тілді таңдаңыз. Таңдау автоматты түрде сақталады.','settings.savedNote':'Таңдау осы құрылғыда сақталды.','settings.accountKicker':'ПАЙДАЛАНУШЫ','settings.accountTitle':'Аккаунт мәліметтері','settings.accountText':'Токен браузердің ағымдағы сеансында сақталады. Жүйеден шығу кезінде осы құрылғыдағы токен жойылады.','settings.guestName':'Қонақ пайдаланушы','settings.guestRole':'Жүйеге кірмеген','settings.adminRole':'Әкімші','settings.customerRole':'Тапсырыс беруші',
    'footer.caption':'Жүк тасымалын жоспарлау және бақылау платформасы',
    'empty.requests':'Әзірге тасымал өтінімі жоқ. Жаңа жоспар жасап бастаңыз.','empty.login':'Тасымалдарыңызды көру үшін жүйеге кіріңіз.','empty.filter':'Бұл мәртебе бойынша өтінім жоқ.','empty.admin':'Қарауға арналған өтінім жоқ.',
    'labels.request':'Өтінім нөмірі','labels.created':'Жасалған күні','labels.customer':'Клиент','labels.phone':'Телефон','labels.cargo':'Жүк','labels.weight':'Салмағы','labels.date':'Жеткізу күні','labels.note':'Әкімші ескертпесі',
    'status.pending':'Күтілуде','status.confirmed':'Расталды','status.in_transit':'Жолда','status.delivered':'Жеткізілді','status.cancelled':'Бас тартылды',
    'toast.loginOk':'Жүйеге сәтті кірдіңіз.','toast.registerOk':'Тіркелу сәтті аяқталды.','toast.logout':'Жүйеден шықтыңыз.','toast.requestCreated':'Өтінім қабылданды: {number}','toast.requestCancelled':'Өтінімнен бас тартылды.','toast.statusUpdated':'Өтінім мәртебесі жаңартылды.','toast.statusRequired':'Жаңа мәртебені таңдаңыз.','toast.loginRequired':'Алдымен жүйеге кіріңіз.','toast.duplicateEmail':'Бұл email тіркелген.','toast.invalidCredentials':'Email немесе құпиясөз қате.','toast.emailInvalid':'Электрондық пошта пішімін тексеріңіз.','toast.required':'Міндетті өрістерді толтырыңыз.','toast.requestFailed':'Сұрау орындалмады. Қайталап көріңіз.','toast.cancelConfirm':'Осы өтінімнен бас тартқыңыз келе ме?','toast.sameRoute':'Жөнелту және жеткізу қалалары әртүрлі болуы керек.','toast.datePast':'Тасымалдау күні бүгіннен ерте болмауы керек.','toast.invalidStatus':'Бұл мәртебеге ауысу мүмкін емес.','toast.unauthorized':'Бұл әрекетке рұқсат жоқ.',
    'modal.close':'Жабу','auth.haveAccount':'Аккаунтыңыз бар ма?'
  },
  ru: {
    'brand.title':'Qamqor Cargo — грузовая логистика','brand.label':'Движение груза',
    'nav.dashboard':'Панель управления','nav.transportations':'Перевозки','nav.planning':'Планирование','nav.rates':'Информация и тарифы','nav.settings':'Настройки','nav.aria':'Основная навигация',
    'language.label':'Язык интерфейса',
    'auth.login':'Войти','auth.register':'Регистрация','auth.logout':'Выйти из аккаунта','auth.fullName':'Имя и фамилия','auth.email':'Электронная почта','auth.password':'Пароль','auth.noAccount':'Нет аккаунта?','auth.haveAccount':'Уже есть аккаунт?',
    'dashboard.eyebrow':'QAMQOR CARGO · ЛОГИСТИЧЕСКАЯ ПЛАТФОРМА','dashboard.metricsAria':'Сводка по заявкам','dashboard.title':'Обзор','dashboard.titleAccent':'перевозок','dashboard.subtitle':'Заявки, маршруты и статусы — в одном месте.','dashboard.online':'Система доступна',
    'dashboard.heroKicker':'Надёжные перевозки · по Казахстану','dashboard.heroTitle':'Доставляем ваш груз с заботой','dashboard.heroText':'Укажите маршрут, отправьте заявку и следите за доставкой в личном кабинете.','dashboard.createShipment':'Запланировать перевозку','dashboard.emptyTitle':'Создайте первую перевозку',
    'metrics.total':'Всего заявок','metrics.inTransit':'В пути','metrics.delivered':'Доставлено','metrics.pending':'На рассмотрении',
    'card.shipmentInfo.kicker':'Последняя перевозка','card.shipmentInfo.title':'Информация о грузе','card.tracking.kicker':'Текущий статус','card.tracking.title':'Отслеживание груза','card.route.kicker':'Маршрут доставки','card.route.title':'Данные маршрута','card.vehicle.kicker':'МОНИТОРИНГ ДОСТАВКИ','card.vehicle.title':'Мониторинг перевозки',
    'tracking.empty':'Статус и маршрут появятся здесь после создания первой заявки.','tracking.latest':'Последняя заявка','tracking.from':'Город отправления','tracking.to':'Город доставки',
    'route.originPlaceholder':'Город отправления','route.destinationPlaceholder':'Город доставки','route.from':'Откуда','route.to':'Куда',
    'vehicle.workflowTitle':'Контроль по данным заявки','vehicle.workflowText':'Ход доставки отображается по последнему статусу заявки.','vehicle.telemetryNote':'Датчики транспорта не подключены. Геопозиция и телеметрия в реальном времени недоступны.','vehicle.openShipments':'Открыть список перевозок',
    'transportations.eyebrow':'ВАШИ ПЕРЕВОЗКИ','transportations.subtitle':'Просматривайте заявки и фильтруйте их по статусу доставки.','transportations.filter':'Статус','filter.all':'Все статусы',
    'actions.refresh':'Обновить','actions.openTransportations':'Открыть перевозки','actions.cancel':'Отменить заявку','actions.save':'Сохранить','actions.status':'Изменить статус','actions.optionalNote':'Комментарий (необязательно)',
    'planning.eyebrow':'ОРГАНИЗАЦИЯ ПЕРЕВОЗКИ','planning.subtitle':'Создайте заявку: тип транспорта и стоимость уточним после проверки данных.','planning.asideTitle':'Оформите перевозку за 3 шага','planning.asideText':'Укажите маршрут и груз, затем отправьте заявку.','planning.stepOne':'Введите маршрут и параметры груза','planning.stepTwo':'Отправьте заявку','planning.stepThree':'Следите за статусом','planning.formKicker':'НОВАЯ ЗАЯВКА','planning.formTitle':'Детали перевозки','planning.formText':'После отправки номер заявки и её статус появятся в списке перевозок.','planning.loginTitle':'Войдите, чтобы оставить заявку','planning.loginText':'Зарегистрируйтесь или войдите, чтобы заказать перевозку и следить за её ходом.','planning.listKicker':'СОХРАНЁННЫЕ ЗАЯВКИ','planning.listTitle':'Запланированные перевозки','planning.adminKicker':'УПРАВЛЕНИЕ АДМИНИСТРАТОРА','planning.adminTitle':'Заявки клиентов',
    'form.origin':'Откуда','form.destination':'Куда','form.cargoType':'Тип груза','form.choose':'Выберите','form.weight':'Вес груза (кг)','form.date':'Дата перевозки','form.phone':'Контактный телефон','form.comment':'Дополнительная информация','form.submit':'Отправить заявку','form.originPlaceholder':'Например, Алматы','form.destinationPlaceholder':'Например, Астана','form.weightPlaceholder':'500','form.phonePlaceholder':'+7 700 000 00 00','form.commentPlaceholder':'Детали о грузе и доставке',
    'cargo.furniture':'Мебель','cargo.building':'Строительные материалы','cargo.food':'Продукты питания','cargo.appliances':'Бытовая техника','cargo.other':'Другое',
    'rates.eyebrow':'УСЛУГИ И ОПЛАТА','rates.subtitle':'Стоимость рассчитывается индивидуально с учётом маршрута, груза и условий перевозки.','rates.quoteKicker':'ИНДИВИДУАЛЬНОЕ ПРЕДЛОЖЕНИЕ','rates.quoteTitle':'Стоимость рассчитывается после заявки','rates.quoteText':'Цена зависит от маршрута, типа и веса груза, а также необходимого транспорта. Подготовим точное предложение после рассмотрения заявки.','rates.requestQuote':'Запросить стоимость',
    'rates.cardOneTitle':'Междугородняя доставка','rates.cardOneText':'Перевозка грузов между городами Казахстана.','rates.cardOneDetail':'Стоимость зависит от маршрута и груза',
    'rates.cardTwoTitle':'Подходящий транспорт','rates.cardTwoText':'Тип транспорта выбирается с учётом размеров, веса и особенностей груза.','rates.cardTwoDetail':'Вариант уточняется при рассмотрении заявки',
    'rates.cardThreeTitle':'Статус доставки','rates.cardThreeText':'В личном кабинете сохраняются статус заявки и сведения о маршруте.','rates.cardThreeDetail':'Проверяйте статус онлайн',
    'rates.disclaimer':'Фиксированные тарифы в интерфейсе не указаны: стоимость предложит менеджер после проверки данных заявки.',
    'settings.eyebrow':'ЛИЧНЫЕ ПАРАМЕТРЫ','settings.subtitle':'Выбранный язык сохранится на этом устройстве.','settings.languageKicker':'ВЫБОР ЯЗЫКА','settings.languageTitle':'Язык интерфейса','settings.languageText':'Выберите казахский или русский. Настройка сохранится автоматически.','settings.savedNote':'Выбор сохранён на этом устройстве.','settings.accountKicker':'ПОЛЬЗОВАТЕЛЬ','settings.accountTitle':'Данные аккаунта','settings.accountText':'Токен хранится в текущем сеансе браузера. При выходе он удаляется с этого устройства.','settings.guestName':'Гость','settings.guestRole':'Не выполнен вход','settings.adminRole':'Администратор','settings.customerRole':'Клиент',
    'footer.caption':'Платформа планирования и отслеживания грузоперевозок',
    'empty.requests':'Перевозок пока нет. Создайте первую заявку в разделе планирования.','empty.login':'Войдите, чтобы увидеть свои перевозки.','empty.filter':'Для выбранного статуса заявок нет.','empty.admin':'Нет заявок для рассмотрения.',
    'labels.request':'Номер заявки','labels.created':'Создана','labels.customer':'Клиент','labels.phone':'Телефон','labels.cargo':'Груз','labels.weight':'Вес','labels.date':'Дата доставки','labels.note':'Комментарий администратора',
    'status.pending':'Ожидает','status.confirmed':'Подтверждена','status.in_transit':'В пути','status.delivered':'Доставлена','status.cancelled':'Отменена',
    'toast.loginOk':'Вы вошли в систему.','toast.registerOk':'Регистрация завершена.','toast.logout':'Вы вышли из аккаунта.','toast.requestCreated':'Заявка принята: {number}','toast.requestCancelled':'Заявка отменена.','toast.statusUpdated':'Статус заявки обновлён.','toast.statusRequired':'Выберите новый статус.','toast.loginRequired':'Сначала войдите в систему.','toast.duplicateEmail':'Этот email уже зарегистрирован.','toast.invalidCredentials':'Неверный email или пароль.','toast.emailInvalid':'Проверьте формат электронной почты.','toast.required':'Заполните обязательные поля.','toast.requestFailed':'Не удалось выполнить запрос. Попробуйте ещё раз.','toast.cancelConfirm':'Отменить эту заявку?','toast.sameRoute':'Города отправления и доставки должны различаться.','toast.datePast':'Дата перевозки не может быть раньше сегодняшнего дня.','toast.invalidStatus':'Переход к этому статусу невозможен.','toast.unauthorized':'Недостаточно прав для этого действия.',
    'modal.close':'Закрыть','auth.haveAccount':'Уже есть аккаунт?'
  }
};
const state = {
  token: sessionStorage.getItem('access_token'),
  user: null,
  language: ['kk','ru'].includes(localStorage.getItem('qamqor_language')) ? localStorage.getItem('qamqor_language') : 'kk',
  authMode: 'login',
  requests: []
};
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const transitions = { pending:['confirmed','cancelled'], confirmed:['in_transit','cancelled'], in_transit:['delivered'], delivered:[], cancelled:[] };
let toastTimer;

function t(key, variables={}) {
  const text = (translations[state.language] && translations[state.language][key]) || translations.kk[key] || key;
  return text.replace(/\{(\w+)\}/g, (_, name) => variables[name] === undefined ? '' : String(variables[name]));
}
function escapeHtml(value='') {
  return String(value).replace(/[&<>"']/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
}
function cargoLabel(value='') {
  const labels = {
    'Жиһаз':'cargo.furniture','Мебель':'cargo.furniture',
    'Құрылыс материалдары':'cargo.building','Строительные материалы':'cargo.building',
    'Азық-түлік':'cargo.food','Продукты питания':'cargo.food',
    'Тұрмыстық техника':'cargo.appliances','Бытовая техника':'cargo.appliances',
    'Басқа':'cargo.other','Другое':'cargo.other'
  };
  const key = labels[String(value)];
  return key ? t(key) : String(value);
}
function toast(message, error=false) {
  const el = $('#toast');
  el.textContent = message;
  el.classList.toggle('error', error);
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 3400);
}
function toastKey(key, error=false, vars={}) { toast(t(key, vars), error); }
function renderLanguage() {
  document.documentElement.lang = state.language;
  document.title = t('brand.title');
  $$('[data-i18n]').forEach((element) => {
    const key = element.dataset.i18n;
    element.textContent = t(key);
  });
  $$('[data-i18n-placeholder]').forEach((element) => {
    element.placeholder = t(element.dataset.i18nPlaceholder);
  });
  $$('[data-i18n-aria]').forEach((element) => {
    element.setAttribute('aria-label', t(element.dataset.i18nAria));
  });
  $('#languageSelect').value = state.language;
  $('#settingsLanguageSelect').value = state.language;
  updateAuthLabels();
}
function setLanguage(language) {
  if (!translations[language]) return;
  state.language = language;
  localStorage.setItem('qamqor_language', language);
  renderLanguage();
  renderData();
}
function localDateValue(date=new Date()) {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0,10);
}
async function api(path, options={}) {
  const headers = {...(options.headers || {})};
  if (options.body && !headers['Content-Type']) headers['Content-Type'] = 'application/json';
  if (state.token) headers.Authorization = 'Bearer ' + state.token;
  let response;
  try {
    response = await fetch(API + path, {...options, headers});
  } catch {
    throw new Error('network_error');
  }
  let data = {};
  try { data = await response.json(); } catch {}
  if (!response.ok) {
    if (response.status === 401 && state.token) logout(false);
    throw new Error(typeof data.detail === 'string' ? data.detail : 'request_failed');
  }
  return data;
}
function saveSession(data) {
  state.token = data.access_token;
  state.user = data.user;
  sessionStorage.setItem('access_token', state.token);
  sessionStorage.setItem('user', JSON.stringify(state.user));
  renderSession();
  refreshRequests();
}
function logout(showMessage=true) {
  state.token = null;
  state.user = null;
  state.requests = [];
  sessionStorage.removeItem('access_token');
  sessionStorage.removeItem('user');
  renderSession();
  renderData();
  if (showMessage) toastKey('toast.logout');
}
function renderSession() {
  const logged = Boolean(state.user);
  $('#guestActions').classList.toggle('hidden', logged);
  $('#accountButton').classList.toggle('hidden', !logged);
  $('#requestGuest').classList.toggle('hidden', logged);
  $('#requestForm').classList.toggle('hidden', !logged);
  $('#adminRequestsWrap').classList.toggle('hidden', !logged || state.user.role !== 'admin');
  $('#settingsLogin').classList.toggle('hidden', logged);
  $('#settingsLogout').classList.toggle('hidden', !logged);
  $('#profileLabel').textContent = logged ? state.user.full_name.split(' ')[0] : '';
  $('#settingsName').textContent = logged ? state.user.full_name : t('settings.guestName');
  $('#settingsRole').textContent = logged ? t(state.user.role === 'admin' ? 'settings.adminRole' : 'settings.customerRole') : t('settings.guestRole');
  $('#settingsEmail').textContent = logged ? state.user.email : '';
}
function openAuth(mode) {
  state.authMode = mode;
  const isRegister = mode === 'register';
  $('#authModal').classList.remove('hidden');
  $('#registerNameWrap').classList.toggle('hidden', !isRegister);
  $('#registerPhoneWrap').classList.toggle('hidden', !isRegister);
  $('#authForm [name="full_name"]').required = isRegister;
  $('#authForm [name="phone"]').required = isRegister;
  $('#modalTitle').textContent = t(isRegister ? 'auth.register' : 'auth.login');
  $('#authSubmit').textContent = t(isRegister ? 'auth.register' : 'auth.login');
  $('#authSwitch').innerHTML = '<span data-i18n="' + (isRegister ? 'auth.haveAccount' : 'auth.noAccount') + '">' + escapeHtml(t(isRegister ? 'auth.haveAccount' : 'auth.noAccount')) + '</span> <button type="button" id="switchAuth">' + escapeHtml(t(isRegister ? 'auth.login' : 'auth.register')) + '</button>';
  $('#authForm').reset();
  const passwordInput = $('#authForm [name="password"]');
  passwordInput.autocomplete = isRegister ? 'new-password' : 'current-password';
  setTimeout(() => $('#authForm [name="email"]').focus(), 0);
}
function closeAuth() { $('#authModal').classList.add('hidden'); }
function apiErrorMessage(error) {
  const messages = {
    email_already_registered:'toast.duplicateEmail',
    invalid_email_or_password:'toast.invalidCredentials',
    authentication_required:'toast.loginRequired',
    invalid_token:'toast.loginRequired',
    user_not_found:'toast.loginRequired',
    origin_and_destination_must_differ:'toast.sameRoute',
    request_cannot_be_cancelled_in_current_status:'toast.invalidStatus',
    invalid_status_filter:'toast.invalidStatus',
    network_error:'toast.requestFailed',
    request_failed:'toast.requestFailed'
  };
  if (error.message.startsWith('invalid_status_transition:')) return t('toast.invalidStatus');
  if (messages[error.message]) return t(messages[error.message]);
  if (error.message === 'admin_required') return t('toast.unauthorized');
  return t('toast.requestFailed');
}
async function submitAuth(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const values = new FormData(form);
  const payload = {email:values.get('email'), password:values.get('password')};
  const isRegister = state.authMode === 'register';
  const endpoint = isRegister ? '/auth/register' : '/auth/login';
  if (isRegister) {
    payload.full_name = values.get('full_name');
    payload.phone = values.get('phone');
  }
  try {
    const result = await api(endpoint, {method:'POST', body:JSON.stringify(payload)});
    saveSession(result);
    closeAuth();
    toastKey(isRegister ? 'toast.registerOk' : 'toast.loginOk');
  } catch (error) {
    toast(apiErrorMessage(error), true);
  }
}
function statusBadge(status) {
  return '<span class="status ' + escapeHtml(status) + '">' + escapeHtml(t('status.' + status)) + '</span>';
}
function requestCard(item, admin=false) {
  const requestId = Number(item.id);
  const route = escapeHtml(item.origin) + ' <span aria-hidden="true">→</span> ' + escapeHtml(item.destination);
  const details = '<div class="request-details"><h3>' + escapeHtml(item.request_number) + ' · ' + route + '</h3>' +
    '<p>' + escapeHtml(t('labels.cargo')) + ': ' + escapeHtml(cargoLabel(item.cargo_type)) + ' · ' + escapeHtml(t('labels.weight')) + ': ' + escapeHtml(item.weight_kg) + ' кг · ' + escapeHtml(t('labels.date')) + ': ' + escapeHtml(item.transport_date) + '</p>' +
    '<p>' + (admin ? escapeHtml(t('labels.customer')) + ': ' + escapeHtml(item.customer_name || '') + ' · ' : '') + escapeHtml(t('labels.phone')) + ': ' + escapeHtml(item.phone) + '</p>' +
    (item.comment ? '<p>' + escapeHtml(item.comment) + '</p>' : '') +
    (item.admin_note ? '<p>' + escapeHtml(t('labels.note')) + ': ' + escapeHtml(item.admin_note) + '</p>' : '') + '</div>';
  let controls = '<div class="request-controls">' + statusBadge(item.status);
  if (admin) {
    const options = (transitions[item.status] || []).map((next) => '<option value="' + next + '">' + escapeHtml(t('status.' + next)) + '</option>').join('');
    controls += '<select data-status="' + requestId + '" aria-label="' + escapeHtml(t('actions.status')) + '"><option value="">' + escapeHtml(t('actions.status')) + '</option>' + options + '</select>' +
      '<input data-note="' + requestId + '" maxlength="1000" placeholder="' + escapeHtml(t('actions.optionalNote')) + '" aria-label="' + escapeHtml(t('actions.optionalNote')) + '">' +
      '<button class="btn btn-primary" type="button" data-update="' + requestId + '">' + escapeHtml(t('actions.save')) + '</button>';
  } else if (state.user && ['pending','confirmed'].includes(item.status)) {
    controls += '<button class="btn btn-outline" type="button" data-cancel="' + requestId + '">' + escapeHtml(t('actions.cancel')) + '</button>';
  }
  controls += '</div>';
  return '<article class="request-card' + (admin ? ' request-card-admin' : '') + '">' + details + controls + '</article>';
}
function requestSummary(item) {
  if (!item) return '<div class="summary-empty-state"><span class="summary-empty-icon" aria-hidden="true">↗</span><div><strong>' + escapeHtml(t('dashboard.emptyTitle')) + '</strong><p>' + escapeHtml(state.user ? t('empty.requests') : t('empty.login')) + '</p></div><button class="btn btn-outline" type="button" data-navigate="planning">' + escapeHtml(t('dashboard.createShipment')) + '<span aria-hidden="true">→</span></button></div>';
  return '<div class="shipment-cargo-row"><div><small>' + escapeHtml(t('labels.cargo')) + '</small><strong>' + escapeHtml(cargoLabel(item.cargo_type)) + '</strong></div><div><small>' + escapeHtml(t('labels.weight')) + '</small><strong>' + escapeHtml(item.weight_kg) + ' кг</strong></div></div>' +
    '<div class="summary-meta"><div><small>' + escapeHtml(t('labels.request')) + '</small><strong>' + escapeHtml(item.request_number) + '</strong></div><div><small>' + escapeHtml(t('labels.date')) + '</small><strong>' + escapeHtml(item.transport_date) + '</strong></div>' + statusBadge(item.status) + '</div>';
}
function trackingMarkup(item) {
  if (!item) return '<p class="tracking-empty">' + escapeHtml(t('tracking.empty')) + '</p>';
  return '<div class="tracking-content"><div class="tracking-number-row"><div><small>' + escapeHtml(t('tracking.latest')) + '</small><strong>' + escapeHtml(item.request_number) + '</strong></div>' + statusBadge(item.status) + '</div>' +
    '<div class="tracking-route"><div><small>' + escapeHtml(t('tracking.from')) + '</small><strong>' + escapeHtml(item.origin) + '</strong></div><div><small>' + escapeHtml(t('tracking.to')) + '</small><strong>' + escapeHtml(item.destination) + '</strong></div></div></div>';
}
function renderData() {
  const rows = state.requests;
  const latest = rows[0] || null;
  $('#metricTotal').textContent = String(rows.length);
  $('#metricTransit').textContent = String(rows.filter((item) => item.status === 'in_transit').length);
  $('#metricDelivered').textContent = String(rows.filter((item) => item.status === 'delivered').length);
  $('#metricPending').textContent = String(rows.filter((item) => item.status === 'pending').length);
  $('#dashboardLatest').innerHTML = requestSummary(latest);
  $('#trackingDetails').innerHTML = trackingMarkup(latest);
  $('#routeOrigin').textContent = latest ? latest.origin : '—';
  $('#routeDestination').textContent = latest ? latest.destination : '—';
  $('#mapOrigin').textContent = latest ? latest.origin : t('route.originPlaceholder');
  $('#mapDestination').textContent = latest ? latest.destination : t('route.destinationPlaceholder');
  const customerRows = rows.filter((item) => !state.user || state.user.role !== 'admin' || item.customer_id === state.user.id);
  const planningList = $('#planningRequests');
  const transportList = $('#transportationsList');
  const filter = $('#transportStatusFilter').value;
  const shown = filter === 'all' ? customerRows : customerRows.filter((item) => item.status === filter);
  const emptyKey = !state.user ? 'empty.login' : (customerRows.length ? 'empty.filter' : 'empty.requests');
  const markup = shown.length ? shown.map((item) => requestCard(item, false)).join('') : '<p class="empty-state panel">' + escapeHtml(t(emptyKey)) + '</p>';
  planningList.innerHTML = customerRows.length ? customerRows.map((item) => requestCard(item, false)).join('') : '<p class="empty-state">' + escapeHtml(t(state.user ? 'empty.requests' : 'empty.login')) + '</p>';
  transportList.innerHTML = markup;
  $('#transportResultsCount').textContent = String(shown.length);
  const adminRows = state.user && state.user.role === 'admin' ? rows : [];
  $('#adminRequests').innerHTML = adminRows.length ? adminRows.map((item) => requestCard(item, true)).join('') : '<p class="empty-state">' + escapeHtml(t('empty.admin')) + '</p>';
}
async function refreshRequests() {
  if (!state.token || !state.user) {
    state.requests = [];
    renderData();
    return;
  }
  try {
    const result = state.user.role === 'admin' ? await api('/requests/admin/all') : await api('/requests/my');
    state.requests = Array.isArray(result.items) ? result.items : [];
    renderData();
  } catch (error) {
    toast(apiErrorMessage(error), true);
  }
}
async function submitRequest(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const values = new FormData(form);
  const payload = Object.fromEntries(values.entries());
  payload.weight_kg = Number(payload.weight_kg);
  payload.comment = String(payload.comment || '').trim() || null;
  try {
    const result = await api('/requests', {method:'POST', body:JSON.stringify(payload)});
    form.reset();
    $('#requestForm [name="transport_date"]').min = localDateValue();
    toastKey('toast.requestCreated', false, {number:result.request_number});
    await refreshRequests();
  } catch (error) {
    toast(apiErrorMessage(error), true);
  }
}
async function cancelRequest(id) {
  if (!window.confirm(t('toast.cancelConfirm'))) return;
  try {
    await api('/requests/' + encodeURIComponent(id) + '/cancel', {method:'POST'});
    toastKey('toast.requestCancelled');
    await refreshRequests();
  } catch (error) {
    toast(apiErrorMessage(error), true);
  }
}
async function updateRequest(id) {
  const status = $('[data-status="' + id + '"]').value;
  if (!status) {
    toastKey('toast.statusRequired', true);
    return;
  }
  const noteInput = $('[data-note="' + id + '"]');
  const admin_note = noteInput.value.trim() || null;
  try {
    await api('/requests/' + encodeURIComponent(id) + '/status', {method:'PATCH', body:JSON.stringify({status, admin_note})});
    toastKey('toast.statusUpdated');
    await refreshRequests();
  } catch (error) {
    toast(apiErrorMessage(error), true);
  }
}
function goToScreen(name, updateHash=true) {
  const screen = document.querySelector('[data-screen="' + name + '"]');
  if (!screen) name = 'dashboard';
  $$('.screen').forEach((element) => element.classList.toggle('is-active', element.dataset.screen === name));
  $$('.nav-link').forEach((element) => {
    const active = element.dataset.view === name;
    element.classList.toggle('is-active', active);
    if (active) element.setAttribute('aria-current', 'page');
    else element.removeAttribute('aria-current');
  });
  if (updateHash && location.hash !== '#' + name) history.pushState(null, '', '#' + name);
  window.scrollTo({top:0,behavior:'smooth'});
}
function screenFromHash() {
  const name = location.hash.replace(/^#/, '');
  return document.querySelector('[data-screen="' + name + '"]') ? name : 'dashboard';
}
function openSettings() { goToScreen('settings'); }
function updateAuthLabels() {
  if (!$('#authModal')) return;
  const isRegister = state.authMode === 'register';
  $('#authSwitch').innerHTML = '<span>' + escapeHtml(t(isRegister ? 'auth.haveAccount' : 'auth.noAccount')) + '</span> <button type="button" id="switchAuth">' + escapeHtml(t(isRegister ? 'auth.login' : 'auth.register')) + '</button>';
  if (!$('#authModal').classList.contains('hidden')) {
    $('#modalTitle').textContent = t(isRegister ? 'auth.register' : 'auth.login');
    $('#authSubmit').textContent = t(isRegister ? 'auth.register' : 'auth.login');
    $('#authSwitch').innerHTML = '<span>' + escapeHtml(t(isRegister ? 'auth.haveAccount' : 'auth.noAccount')) + '</span> <button type="button" id="switchAuth">' + escapeHtml(t(isRegister ? 'auth.login' : 'auth.register')) + '</button>';
  }
  if (state.user) {
    $('#settingsName').textContent = state.user.full_name;
    $('#settingsRole').textContent = t(state.user.role === 'admin' ? 'settings.adminRole' : 'settings.customerRole');
  }
}
function bindEvents() {
  $$('.nav-link').forEach((link) => link.addEventListener('click', (event) => {
    event.preventDefault();
    goToScreen(link.dataset.view);
  }));
  $$('[data-navigate]').forEach((button) => button.addEventListener('click', () => goToScreen(button.dataset.navigate)));
  $('#languageSelect').addEventListener('change', (event) => setLanguage(event.target.value));
  $('#settingsLanguageSelect').addEventListener('change', (event) => setLanguage(event.target.value));
  $('#accountButton').addEventListener('click', openSettings);
  $('#loginOpen').addEventListener('click', () => openAuth('login'));
  $('#registerOpen').addEventListener('click', () => openAuth('register'));
  $('#requestLoginButton').addEventListener('click', () => openAuth('login'));
  $('#requestRegisterButton').addEventListener('click', () => openAuth('register'));
  $('#settingsLogin').addEventListener('click', () => openAuth('login'));
  $('#settingsLogout').addEventListener('click', () => logout());
  $('#modalClose').addEventListener('click', closeAuth);
  $('#authModal').addEventListener('click', (event) => {
    if (event.target.dataset.close === 'true') closeAuth();
    if (event.target.id === 'switchAuth') openAuth(state.authMode === 'register' ? 'login' : 'register');
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !$('#authModal').classList.contains('hidden')) closeAuth();
  });
  $('#authForm').addEventListener('submit', submitAuth);
  $('#requestForm').addEventListener('submit', submitRequest);
  $('#refreshTransportations').addEventListener('click', refreshRequests);
  $('#refreshPlanning').addEventListener('click', refreshRequests);
  $('#transportStatusFilter').addEventListener('change', renderData);
  document.addEventListener('click', (event) => {
    const cancel = event.target.closest('[data-cancel]');
    if (cancel) cancelRequest(cancel.dataset.cancel);
    const update = event.target.closest('[data-update]');
    if (update) updateRequest(update.dataset.update);
  });
  const date = $('#requestForm [name="transport_date"]');
  date.min = localDateValue();
  window.addEventListener('popstate', () => goToScreen(screenFromHash(), false));
  window.addEventListener('hashchange', () => goToScreen(screenFromHash(), false));
}
async function init() {
  bindEvents();
  renderLanguage();
  goToScreen(screenFromHash(), false);
  if (state.token) {
    try {
      state.user = await api('/auth/me');
      sessionStorage.setItem('user', JSON.stringify(state.user));
      renderSession();
      await refreshRequests();
    } catch {
      logout(false);
    }
  } else {
    renderSession();
    renderData();
  }
}
document.addEventListener('DOMContentLoaded', init);
