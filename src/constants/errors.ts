export const EMPTY_ERROR_MESSAGE = '';

export const GENERAL_ERROR_MESSAGES = {
  FILE_EMPTY: 'Не выбран файл.',
  IP: 'Некорректный формат IP.',
  POPUP_EMPTY: 'Выберите один из вариантов.',
  NUMBER_NEGATIVE: 'Значение не может быть отрицательным.',
  NUMBER_ZERO: 'Значение не может быть 0.',
  FIELD_EMPTY: 'Поле не может быть пустым.',
};

export const PROJECTS_ERROR_MESSAGES = {
  DATE_LENGTH: 'Выберите дату.',
  NAME_BUSY: 'Название проекта занято.',
  START_DATE: '«Дата начала» позже чем «дата окончания».',
  END_DATE: '«Дата окончания» раньше чем «дата начала».',
  CUSTOMER_EMPTY: 'Вы не выбрали заказчика.',
};

export const OBJECT_ERROR_MESSAGE = {
  INF_SYSTEM_BUSY: 'Имя информационной системы занято.',
  INF_SYSTEM: 'Название информационной системы не существует.',
  OFFICE_NAME_BUSY: 'Имя офиса занято.',
  OFFICE_NAME: 'Название офиса не существует.',
  SOURCE_CODE_ID_BUSY: 'Идентификатор кода занят.',
  WEB_INTERFACE_URL_BUSY: 'Адрес веб-интерфейса занят.',
  SERVER_NAME: 'Имя сервера занято.',
  MOBILE_APP: 'Имя приложения занято.',
  PERIMETER: 'Название периметра несуществует.',
  PERIMETER_RANGE_IP: 'Диапазон IP-адресов занят.',
  WIFI_NAME: 'Имя Wi-Fi занят.',
  BSSID_BUSY: '«BSSID» занят.',
  TEST_METHOD_EMPTY: 'Выберите «Greybox» или «Blackbox».',
};

export const CUSTOMER_ERROR_MESSAGES = {
  NAME_BUSY: 'Имя заказчика занято.',
  INN: '«ИНН» должно иметь 12 символов.',
  INN_BUSY: 'ИНН занят.',
  TYPE_EMPTY: '«Тип» не выбран.',
};

export const AUTH_ERROR_MESSAGES = {
  PASSWORD_LENGTH: 'Недостаточно символов (от 6).',
  USERNAME_LENGTH: 'Некорректная электронная почта.',
};

export const VULN_ERROR_MESSAGES = {
  SVSS_SCORE: 'Значение некорректно (от 1 до 10).',
  NAME_BUSY: 'Название уязвимости занято.',
  CVE_ID: 'Значение CVE некорректно.',
  CVSS: 'Не выбраны все CVSS параметры.',
  AC_EMPTY: '«Attack Vector» не выбран.',
  AV_EMPTY: '«Attack Complexity» не выбран.',
  PR_EMPTY: '«Privileges Required» не выбран.',
  UI_EMPTY: '«User Interaction» не выбран.',
  S_EMPTY: '«Scope» не выбран.',
  C_EMPTY: '«Confidentiality» не выбран.',
  I_EMPTY: '«Integrity» не выбран.',
  A_EMPTY: '«Availability» не выбран.',
};

export const ANALYTICS_ERROR_MESSAGES = {
  NAME: 'Название проекта не существует.',
  OBJECT_TYPE_EMPTY: 'Выберите тип объектов.',
};

export const ROLES_ERROR_MESSAGES = {
  TEAMLEAD_EMPTY: 'Вы не выбрали тимлида!',
  MANAGER_EMPTY: 'Вы не выбрали менеджера!',
  PENTESTER_EMPTY: 'Вы не выбрали пентестера!',
  OBJECTS_EMPTY: 'Вы не выбрали объекты!',
};
