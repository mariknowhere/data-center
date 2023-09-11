export const OBJECTS_ROUTES = {
  FULL_URL: `${process.env.REACT_APP_API_URI}/api/v1/objects`,
  URL: 'objects',
  BASE: 'base',
};

export enum OBJECT_TYPES {
  Base = 'base',
  WebApp = 'web_app',
  API = 'api',
  MobileApp = 'mobile_app',
  NetworkDevice = 'network_device',
  Server = 'server',
  ARM = 'arm',
  WiFi = 'wifi',
  SocialEngineering = 'social_engineering',
  DesktopApp = 'desktop_app',
  SourceCode = 'source_code',
  External = 'external_ip',
  Internal = 'internal_ip',
  Other = 'other',
}

export enum OBJECTS_TITLES {
  BASE = 'Все объекты',
  WEB_APPS = 'Веб-приложения',
  API = 'API',
  MOBILE_APPS = 'Мобильные приложения',
  NETWORK_DEVICES = 'Сетевые устройства',
  SERVERS = 'Серверы',
  ARM = 'АРМ',
  WIFI = 'Wi-Fi',
  SOCIAL_ENGINEERING = 'Социальные инженерии',
  DESKTOP_APPS = 'Десктопные приложения',
  SOURCE_CODES = 'Исходные коды',
  EXTERNALS = 'Внешние IP адреса',
  INTERNALS = 'Внутренние IP адреса',
  OTHERS = 'Другие объекты',
}

export enum OBJECT_TITLES {
  WEB_APP = 'веб-приложение',
  API = 'API',
  MOBILE_APP = 'мобильное приложение',
  NETWORK_DEVICE = 'сетевое устройство',
  SERVER = 'сервер',
  ARM = 'АРМ',
  WIFI = 'Wi-Fi',
  SOCIAL_ENGINEERING = 'социальная инженерия',
  DESKTOP_APP = 'десктопное приложение',
  SOURCE_CODE = 'исходный код',
  EXTERNAL = 'внешний IP адрес',
  INTERNAL = 'внутренний IP адрес',
  OTHER = 'другой объект',
}

export const baseHeadCells = [
  {
    id: 'checked',
    checked: true,
    image: false,
  },
  {
    id: 'object_type',
    text: 'Тип объекта',
  },
  {
    id: 'inf_system_id',
    text: 'Имя информационной системы или офиса',
  },
  {
    id: 'ip_address',
    text: 'IP Адрес',
  },
  {
    id: 'app_name',
    text: 'Название',
  },
  {
    id: 'ssid',
    text: 'SSID',
  },
  {
    id: 'engineering_type',
    text: 'Вид',
  },
  {
    id: 'platform_type',
    text: 'Платформа',
  },
  {
    id: 'bssid',
    text: 'BSSID',
  },
  {
    id: 'success_criterion',
    text: 'Критерий успеха',
  },
  {
    id: 'test_method',
    text: 'Метод тестирования',
  },
  {
    id: 'attacker_model',
    text: 'Модель атакующего',
  },
  {
    id: 'work_type',
    text: 'Вид работ',
  },
];

export const webAppHeadCells = [
  {
    id: 'checked',
    checked: true,
    image: false,
  },
  {
    id: 'inf_system_id',
    text: 'Имя информационной системы',
  },
  {
    id: 'ip_address',
    text: 'IP Адрес',
  },
  {
    id: 'domain_name',
    text: 'Доменное имя',
  },
  {
    id: 'test_method',
    text: 'Метод тестирования',
  },
  {
    id: 'attacker_model',
    text: 'Модель атакующего',
  },
  {
    id: 'work_type',
    text: 'Вид работ',
  },
  {
    id: 'additional_info',
    text: 'Доп. информация',
  },
];

export const apiHeadCells = [
  {
    id: 'checked',
    checked: true,
    image: false,
  },
  {
    id: 'inf_system_id',
    text: 'Имя информационной системы',
  },
  {
    id: 'ip_address',
    text: 'IP Адрес',
  },
  {
    id: 'domain_name',
    text: 'Доменное имя',
  },
  {
    id: 'test_method',
    text: 'Метод тестирования',
  },
  {
    id: 'attacker_model',
    text: 'Модель атакующего',
  },
  {
    id: 'work_type',
    text: 'Вид работ',
  },
  {
    id: 'additional_info',
    text: 'Доп. информация',
  },
];

export const mobileAppHeadCells = [
  {
    id: 'checked',
    checked: true,
    image: false,
  },
  {
    id: 'inf_system_id',
    text: 'Имя информационной системы',
  },
  {
    id: 'app_name',
    text: 'Название',
  },
  {
    id: 'platform_type',
    text: 'Платформа',
  },
  {
    id: 'test_method',
    text: 'Метод тестирования',
  },
  {
    id: 'additional_info',
    text: 'Доп. информация',
  },
];

export const networkDeviceHeadCells = [
  {
    id: 'checked',
    checked: true,
    image: false,
  },
  {
    id: 'inf_system_id',
    text: 'Имя информационной системы или офиса',
  },
  {
    id: 'app_name',
    text: 'IP Адрес',
  },
  {
    id: 'network_device_name',
    text: 'Сетевое имя устройства',
  },
  {
    id: 'platform_type',
    text: 'Назначение',
  },
  {
    id: 'test_method',
    text: 'Метод тестирования',
  },
  {
    id: 'attacker_model',
    text: 'Модель атакующего',
  },
  {
    id: 'work_type',
    text: 'Вид работ',
  },
  {
    id: 'additional_info',
    text: 'Доп. информация',
  },
];

export const serverHeadCells = [
  {
    id: 'checked',
    checked: true,
    image: false,
  },
  {
    id: 'inf_system_id',
    text: 'Имя информационной системы или офиса',
  },
  {
    id: 'ip_address',
    text: 'IP Адрес',
  },
  {
    id: 'network_device_name',
    text: 'Сетевое имя устройства',
  },
  {
    id: 'assignment',
    text: 'Назначение',
  },
  {
    id: 'test_method',
    text: 'Метод тестирования',
  },
  {
    id: 'attacker_model',
    text: 'Модель атакующего',
  },
  {
    id: 'work_type',
    text: 'Вид работ',
  },
  {
    id: 'additional_info',
    text: 'Доп. информация',
  },
];

export const armHeadCells = [
  {
    id: 'checked',
    checked: true,
    image: false,
  },
  {
    id: 'inf_system_id',
    text: 'Имя информационной системы или офиса',
  },
  {
    id: 'ip_address',
    text: 'IP Адрес',
  },
  {
    id: 'network_device_name',
    text: 'Сетевое имя устройства',
  },
  {
    id: 'test_method',
    text: 'Метод тестирования',
  },
  {
    id: 'attacker_model',
    text: 'Модель атакующего',
  },
  {
    id: 'work_type',
    text: 'Вид работ',
  },
  {
    id: 'additional_info',
    text: 'Доп. информация',
  },
];

export const wifiHeadCells = [
  {
    id: 'checked',
    checked: true,
    image: false,
  },
  {
    id: 'office_id',
    text: 'Название офиса',
  },
  {
    id: 'ssid',
    text: 'SSID',
  },
  {
    id: 'bssid',
    text: 'BSSID',
  },
  {
    id: 'test_method',
    text: 'Метод тестирования',
  },
  {
    id: 'attacker_model',
    text: 'Модель атакующего',
  },
  {
    id: 'additional_info',
    text: 'Доп. информация',
  },
];

export const socialEngineeringHeadCells = [
  {
    id: 'checked',
    checked: true,
    image: false,
  },
  {
    id: 'office_id',
    text: 'Название офиса',
  },
  {
    id: 'engineering_type',
    text: 'Вид',
  },
  {
    id: 'success_criterion',
    text: 'Критерий успеха',
  },
  {
    id: 'additional_info',
    text: 'Доп. информация',
  },
];

export const desktopAppHeadCells = [
  {
    id: 'checked',
    checked: true,
    image: false,
  },
  {
    id: 'inf_system_id',
    text: 'Имя информационной системы',
  },
  {
    id: 'app_name',
    text: 'Название',
  },
  {
    id: 'platform_type',
    text: 'Платформа',
  },
  {
    id: 'test_method',
    text: 'Метод тестирования',
  },
  {
    id: 'additional_info',
    text: 'Доп. информация',
  },
];

export const sourceCodeHeadCells = [
  {
    id: 'checked',
    checked: true,
    image: false,
  },
  {
    id: 'inf_system_id',
    text: 'Имя информационной системы',
  },
  {
    id: 'programming_language',
    text: 'Язык программирования',
  },
  {
    id: 'number_rows',
    text: 'Кол-во строк кода приложения',
  },
];

export const externalHeadCells = [
  {
    id: 'checked',
    checked: true,
    image: false,
  },
  {
    id: 'inf_system_id',
    text: 'Имя информационной системы',
  },
  {
    id: 'ip_address',
    text: 'Внешний IP адрес',
  },
  {
    id: 'additional_info',
    text: 'Доп. информация',
  },
];

export const internalHeadCells = [
  {
    id: 'checked',
    checked: true,
    image: false,
  },
  {
    id: 'inf_system_id',
    text: 'Имя информационной системы',
  },
  {
    id: 'ip_address',
    text: 'Внутренний IP адрес',
  },
  {
    id: 'additional_info',
    text: 'Доп. информация',
  },
];

export const otherHeadCells = [
  {
    id: 'checked',
    checked: true,
    image: false,
  },
  {
    id: 'inf_system_id',
    text: 'Имя информационной системы или офиса',
  },
  {
    id: 'ip_address',
    text: 'IP адрес',
  },
  {
    id: 'additional_info',
    text: 'Доп. информация',
  },
];


export const objectTypeList = [
  { value: 'web_app', label: 'Веб-приложение' },
  { value: 'api', label: 'API' },
  { value: 'mobile_app', label: 'Мобильное приложение' },
  { value: 'network_device', label: 'Сетевое устройство' },
  { value: 'server', label: 'Сервер' },
  { value: 'arm', label: 'АРМ' },
  { value: 'wifi', label: 'Wi-Fi' },
  { value: 'social_engineering', label: 'Социальная инженерия' },
  { value: 'desktop_app', label: 'Десктопное приложение' },
  { value: 'source_code', label: 'Исходный код' },
  { value: 'external_ip', label: 'Внешний IP адрес' },
  { value: 'internal_ip', label: 'Внутренний IP адрес' },
  { value: 'other', label: 'Другой объект' },
];

export const prepareObjectTypeToRu: { [index: string]: string } = {
  'web_app': 'Веб-приложение',
  'api': 'API',
  'mobile_app': 'Мобильное приложение',
  'network_device': 'Сетевое устройство',
  'server': 'Сервер',
  'arm': 'АРМ',
  'wifi': 'Wi-Fi',
  'social_engineering': 'Социальная инженерия',
  'desktop_app': 'Десктопное приложение',
  'source_code': 'Исходный код',
  'external_ip': 'Внешний IP адрес',
  'internal_ip': 'Внутренний IP адрес',
  'other': 'Другой объект',
};


export const mobilePlatformPopupItems = [
  {
    text: 'Android',
    value: 'android',
    id: 1,
  },
  {
    text: 'IOS',
    value: 'ios',
    id: 2,
  },
];

export const prepareMobilePlatformToEng: { [index: string]: string } = {
  'Android': 'android',
  'IOS': 'ios',
};

export const prepareMobilePlatformToRu: { [index: string]: string } = {
  'android': 'Android',
  'ios': 'IOS',
};

export const mobilePlatformList = [
  { value: 'android', label: 'Android' },
  { value: 'ios', label: 'IOS' },
];


export const attackerModelPopupItems = [
  {
    text: 'Внешний',
    value: 'external',
    id: 1,
  },
  {
    text: 'Внутренний',
    value: 'internal',
    id: 2,
  },
];

export const prepareAttackerModelToEng: { [index: string]: string } = {
  'Внешний': 'external',
  'Внутренний': 'internal',
};

export const prepareAttackerModelToRu: { [index: string]: string } = {
  'external': 'Внешний',
  'internal': 'Внутренний',
};

export const attackerModelList = [
  { value: 'external', label: 'Внешний' },
  { value: 'internal', label: 'Внутренний' },
];


export const workTypePopupItems = [
  {
    text: 'Автоматическое сканирование',
    value: 'automatic_scanning',
    id: 1,
  },
  {
    text: 'Анализ защищенности (без эксплуатации)',
    value: 'security_analysis',
    id: 2,
  },
  {
    text: 'Пентест (с эксплуатацией)',
    value: 'pentest',
    id: 3,
  },
];

export const prepareWorkTypeToEng: { [index: string]: string } = {
  'Автоматическое сканирование': 'automatic_scanning',
  'Анализ защищенности (без эксплуатации)': 'security_analysis',
  'Пентест (с эксплуатацией)': 'pentest',
};

export const prepareWorkTypeToRu: { [index: string]: string } = {
  'automatic_scanning': 'Автоматическое сканирование',
  'security_analysis': 'Анализ защищенности (без эксплуатации)',
  'pentest': 'Пентест (с эксплуатацией)',
};

export const workTypeList = [
  { value: 'automatic_scanning', label: 'Автоматическое сканирование' },
  { value: 'security_analysis', label: 'Анализ защищенности (без эксплуатации)' },
  { value: 'pentest', label: 'Пентест (с эксплуатацией)' },
];


export const desktopPlatformPopupItems = [
  {
    text: 'Windows',
    value: 'windows',
    id: 1,
  },
  {
    text: 'Linux',
    value: 'linux',
    id: 2,
  },
  {
    text: 'Mac',
    value: 'mac',
    id: 3,
  },
];

export const prepareDesktopPlatformToEng: { [index: string]: string } = {
  'Windows': 'windows',
  'Linux': 'linux',
  'Mac': 'mac',
};

export const prepareDesktopPlatformToRu: { [index: string]: string } = {
  'windows': 'Windows',
  'linux': 'Linux',
  'mac': 'Mac',
};

export const desktopPlatformList = [
  { value: 'windows', label: 'Windows' },
  { value: 'linux', label: 'Linux' },
  { value: 'mac', label: 'Mac' },
];


export const selectGropPopupItems = [
  {
    text: 'Отсутствует',
    value: 'none',
    id: 1,
  },
  {
    text: 'Офис',
    value: 'office',
    id: 2,
  },
  {
    text: 'Инф. система',
    value: 'inf_system',
    id: 3,
  },
];

export const programmingLanguageList = [
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'csharp', label: 'C#' },
  { value: 'cplusplus', label: 'C++' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'php', label: 'PHP' },
  { value: 'swift', label: 'Swift' },
  { value: 'kotlin', label: 'Kotlin' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
  { value: 'perl', label: 'Perl' },
  { value: 'sql', label: 'SQL' },
  { value: 'r', label: 'R' },
  { value: 'matlab', label: 'MATLAB' },
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
  { value: 'objectivec', label: 'Objective-C' },
  { value: 'shell', label: 'Shell' },
  { value: 'powershell', label: 'PowerShell' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'scala', label: 'Scala' },
  { value: 'lua', label: 'Lua' },
  { value: 'dart', label: 'Dart' },
  { value: 'cobol', label: 'COBOL' },
  { value: 'fortran', label: 'Fortran' },
  { value: 'ada', label: 'Ada' },
  { value: 'pascal', label: 'Pascal' },
  { value: 'lisp', label: 'Lisp' },
  { value: 'vhdl', label: 'VHDL' },
  { value: 'assembly', label: 'Assembly' },
  { value: 'other', label: 'Other' },
];

export const prepareProgrammingLanguageToRu = {
  'python': 'Python',
  'java': 'Java',
  'csharp': 'C#',
  'cplusplus': 'C++',
  'javascript': 'JavaScript',
  'php': 'PHP',
  'swift': 'Swift',
  'kotlin': 'Kotlin',
  'ruby': 'Ruby',
  'go': 'Go',
  'rust': 'Rust',
  'perl': 'Perl',
  'sql': 'SQL',
  'r': 'R',
  'matlab': 'MATLAB',
  'html': 'HTML',
  'css': 'CSS',
  'objectivec': 'Objective-C',
  'shell': 'Shell',
  'powershell': 'PowerShell',
  'typescript': 'TypeScript',
  'scala': 'Scala',
  'lua': 'Lua',
  'dart': 'Dart',
  'cobol': 'COBOL',
  'fortran': 'Fortran',
  'ada': 'Ada',
  'pascal': 'Pascal',
  'lisp': 'Lisp',
  'vhdl': 'VHDL',
  'assembly': 'Assembly',
  'other': 'Other',
};

export const socialEngineeringList = [
  { value: 'phishing', label: 'Фишинг (Phishing)' },
  { value: 'spear_phishing', label: 'Целевой фишинг (Spear Phishing)' },
  { value: 'voice_phishing', label: 'Голосовой фишинг (Vishing, Voice Phishing)' },
  { value: 'smishing', label: 'Смишинг (Smishing, SMS-фишинг)' },
  { value: 'whale_phishing', label: '«Китобойный» фишинг (Whale Phishing)' },
  { value: 'clone_phishing', label: 'Клон-фишинг (Clone Phishing)' },
  { value: 'scareware', label: 'Scareware (пугалка)' },
  { value: 'baiting', label: 'Baiting (приманка)' },
  { value: 'water_holing', label: 'Water-Holing («водопой»)' },
  { value: 'pretexting_attack', label: 'Pretexting attack (атака с предлогом)' },
  { value: 'quid_pro_quo', label: 'Quid pro quo («услуга за услугу»)' },
  { value: 'honey_trap', label: 'Honey Trap, Honey Pot («медовая ловушка»)' },
  { value: 'tailgating', label: 'Tailgating(«задняя дверь»)' },
  { value: 'rogue_attack', label: 'Rogue Attack (мошенническая атака)' },
  { value: 'diversion_theft', label: 'Кража с диверсией (Diversion Theft)' },
  { value: 'other', label: 'Иное' },
];

export const prepareSocialEngineeringTypesToRu = {
  'phishing': 'Фишинг (Phishing)',
  'spear_phishing': 'Целевой фишинг (Spear Phishing)',
  'voice_phishing': 'Голосовой фишинг (Vishing, Voice Phishing)',
  'smishing': 'Смишинг (Smishing, SMS-фишинг)',
  'whale_phishing': '«Китобойный» фишинг (Whale Phishing)',
  'clone_phishing': 'Клон-фишинг (Clone Phishing)',
  'scareware': 'Scareware (пугалка)',
  'baiting': 'Baiting (приманка)',
  'water_holing': 'Water-Holing («водопой»)',
  'pretexting_attack': 'Pretexting attack (атака с предлогом)',
  'quid_pro_quo': 'Quid pro quo («услуга за услугу»)',
  'honey_trap': 'Honey Trap, Honey Pot («медовая ловушка»)',
  'tailgating': 'Tailgating(«задняя дверь»)',
  'rogue_attack': 'Rogue Attack (мошенническая атака)',
  'diversion_theft': 'Кража с диверсией (Diversion Theft)',
  'other': 'Иное',
};

export const objectTypeItems = [
  {
    text: 'Веб-приложение',
    value: 'web_app',
    id: 1,
  },
  {
    text: 'API',
    value: 'api',
    id: 2,
  },
  {
    text: 'Мобильное приложение',
    value: 'mobile_app',
    id: 3,
  },
  {
    text: 'Сетевое устройство',
    value: 'network_device',
    id: 4,
  },
  {
    text: 'Сервер',
    value: 'server',
    id: 5,
  },
  {
    text: 'АРМ',
    value: 'arm',
    id: 6,
  },
  {
    text: 'Wi-Fi',
    value: 'wifi',
    id: 7,
  },
  {
    text: 'Социальная инженерия',
    value: 'social_engineering',
    id: 8,
  },
  {
    text: 'Десктопное приложение',
    value: 'desktop_app',
    id: 9,
  },
  {
    text: 'Исходный код',
    value: 'source_code',
    id: 10,
  },
  {
    text: 'Внешний IP адрес',
    value: 'external_ip',
    id: 11,
  },
  {
    text: 'Внутренний IP адрес',
    value: 'internal_ip',
    id: 12,
  },
  {
    text: 'Другой объект',
    value: 'other',
    id: 13,
  },
];

export const prepareObjectTypesForChangeModalToRu: { [index: string]: string } = {
  'web_app': 'веб-приложение',
  'api': 'API',
  'mobile_app': 'мобильное приложение',
  'network_device': 'сетевое устройство',
  'server': 'сервер',
  'arm': 'АРМ',
  'wifi': 'Wi-Fi',
  'social_engineering': 'социальную инженерию',
  'desktop_app': 'десктопное приложение',
  'source_code': 'исходный код',
  'external_ip': 'внешний IP адрес',
  'internal_ip': 'внутренний IP адрес',
  'other': 'другой объект',
};

export const prepareObjectTypesForResetModalToRu: { [index: string]: string } = {
  'web_app': 'веб-приложения',
  'api': 'API',
  'mobile_app': 'мобильного приложения',
  'network_device': 'сетевого устройства',
  'server': 'сервера',
  'arm': 'АРМ',
  'wifi': 'Wi-Fi',
  'social_engineering': 'социальной инженерии',
  'desktop_app': 'десктопного приложения',
  'source_code': 'исходного кода',
  'external_ip': 'внешнего IP адреса',
  'internal_ip': 'внутреннего IP адреса',
  'other': 'другого объекта',
};
