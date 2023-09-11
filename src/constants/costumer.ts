export const CUSTOMER_ROUTES = {
  FULL_URL: `${process.env.REACT_APP_API_URI}/api/v1/customers`,
  RESTORE: 'restore',
};

export const customerHeadCells = [
  {
    id: 'checked',
    checked: true,
    image: false,
  },
  {
    id: 'customer_name',
    text: 'Имя заказчика',
  },
  {
    id: 'inn',
    text: 'ИНН',
  },
  {
    id: 'number_employees',
    text: 'Количество сотрудников',
  },
  {
    id: 'customer_type',
    text: 'Тип заказчика',
  },
];

export const customerTypePopupItems = [
  {
    text: 'Государственный',
    value: 'state',
    id: 1,
  },
  {
    text: 'Финансовый сектор',
    value: 'financial_sector',
    id: 2,
  },
  {
    text: 'Медицина',
    value: 'medical',
    id: 3,
  },
  {
    text: 'Производство',
    value: 'manufacturing',
    id: 4,
  },
  {
    text: 'Добыча',
    value: 'mining',
    id: 5,
  },
  {
    text: 'Ретейл',
    value: 'retail',
    id: 6,
  },
  {
    text: 'Другое',
    value: 'other',
    id: 7,
  },
];

export const prepareCustomerTypeToEng: { [index: string]: string } = {
  'Государственный': 'state',
  'Финансовый сектор': 'financial_sector',
  'Медицина': 'medical',
  'Производство': 'manufacturing',
  'Добыча': 'mining',
  'Ретейл': 'retail',
  'Другое': 'other',
};

export const prepareCustomerTypeToRu: { [index: string]: string } = {
  'state': 'Государственный',
  'financial_sector': 'Финансовый сектор',
  'medical': 'Медицина',
  'manufacturing': 'Производство',
  'mining': 'Добыча',
  'retail': 'Ретейл',
  'other': 'Другое',
};

export const customerTypes = [
  { value: 'state', label: 'Государственный' },
  { value: 'financial_sector', label: 'Финансовый сектор' },
  { value: 'medical', label: 'Медицина' },
  { value: 'manufacturing', label: 'Производство' },
  { value: 'mining', label: 'Добыча' },
  { value: 'retail', label: 'Ретейл' },
  { value: 'other', label: 'Другое' },
];
