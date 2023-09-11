export const VULNS_ROUTES = {
  URL: 'vulns',
  UPLOAD_SCREENSHOTS: 'upload_screenshots',
  DELETE_SCREENSHOTS: 'delete_screenshots',
  DELETE_SCREENSHOT: 'delete_screen',
  SCREENSHOTS: 'screenshots',
};

export const vulnHeadCells = [
  {
    id: 'checked',
    checked: true,
    image: false,
  },
  {
    id: 'name',
    text: 'Название',
  },
  {
    id: 'cve_id',
    text: 'СVE ID',
  },
  {
    id: 'cwe_id',
    text: 'СWE ID',
  },
  {
    id: 'location',
    text: 'Расположение',
  },
  {
    id: 'description',
    text: 'Описание',
  },
  {
    id: 'negative_consequences',
    text: 'Негативные последствия',
  },
  {
    id: 'procedure_exploiting',
    text: 'Порядок эксплуатации',
  },
  {
    id: 'recommendations',
    text: 'Рекомендация',
  },
];



export const prepareAttackVector: { [index: string]: number } = {
  'AV:N': 0.85,
  'AV:A': 0.62,
  'AV:L': 0.55,
  'AV:P': 0.2,
};

export const prepareAttackVectorToFull: { [index: string]: string } = {
  'AV:N': 'None (N)',
  'AV:A': 'Adjacent (A)',
  'AV:L': 'Local (L)',
  'AV:P': 'Physical (P)',
};

export const prepareAttackComplexity: { [index: string]: number } = {
  'AC:L': 0.77,
  'AC:H': 0.44,
};

export const prepareAttackComplexityToFull: { [index: string]: string } = {
  'AC:L': 'Low (L)',
  'AC:H': 'High (H)',
};

export const preparePrivilegesRequiredToFull: { [index: string]: string } = {
  'PR:N': 'None (N)',
  'PR:L': 'Low (L)',
  'PR:H': 'High (H)',
};

export const prepareUserInteraction: { [index: string]: number } = {
  'UI:N': 0.85,
  'UI:R': 0.62,
};

export const prepareUserInteractionToFull: { [index: string]: string } = {
  'UI:N': 'None (N)',
  'UI:R': 'Required (R)',
};

export const prepareOtherCVSS: { [index: string]: number } = {
  'H': 0.56,
  'L': 0.22,
  'N': 0,
};

export const prepareOtherCVSSToFull: { [index: string]: string } = {
  'C:H': 'High (H)',
  'C:L': 'Low (L)',
  'C:N': 'None (N)',

  'I:H': 'High (H)',
  'I:L': 'Low (L)',
  'I:N': 'None (N)',

  'A:H': 'High (H)',
  'A:L': 'Low (L)',
  'A:N': 'None (N)',
};

export const prepareScopeToFull: { [index: string]: string } = {
  'S:U': 'Unchanged (U)',
  'S:C': 'Changed (C)',
};



export const attackVectorPopupItems = [
  {
    text: 'Network (N)',
    value: 'AV:N',
    id: 1,
  },
  {
    text: 'Adjacent (A)',
    value: 'AV:A',
    id: 2,
  },
  {
    text: 'Local (L)',
    value: 'AV:L',
    id: 3,
  },
  {
    text: 'Physical (P)',
    value: 'AV:P',
    id: 4,
  },
];

export const attackComplexityPopupItems = [
  {
    text: 'Low (L)',
    value: 'AC:L',
    id: 1,
  },
  {
    text: 'High (H)',
    value: 'AC:H',
    id: 2,
  },
];

export const privilegesRequiredPopupItems = [
  {
    text: 'None (N)',
    value: 'PR:N',
    id: 1,
  },
  {
    text: 'Low (L)',
    value: 'PR:L',
    id: 2,
  },
  {
    text: 'High (H)',
    value: 'PR:H',
    id: 3,
  },
];

export const userInteractionPopupItems = [
  {
    text: 'None (N)',
    value: 'UI:N',
    id: 1,
  },
  {
    text: 'Required (R)',
    value: 'UI:R',
    id: 2,
  },
];

export const scopePopupItems = [
  {
    text: 'Unchanged (U)',
    value: 'S:U',
    id: 1,
  },
  {
    text: 'Changed (C)',
    value: 'S:C',
    id: 2,
  },
];

export const confidentialityPopupItems = [
  {
    text: 'None (N)',
    value: 'N',
    id: 1,
  },
  {
    text: 'Low (L)',
    value: 'L',
    id: 2,
  },
  {
    text: 'High (H)',
    value: 'H',
    id: 3,
  },
];

export const integrityPopupItems = [
  {
    text: 'None (N)',
    value: 'N',
    id: 1,
  },
  {
    text: 'Low (L)',
    value: 'L',
    id: 2,
  },
  {
    text: 'High (H)',
    value: 'H',
    id: 3,
  },
];

export const availabilityPopupItems = [
  {
    text: 'None (N)',
    value: 'N',
    id: 1,
  },
  {
    text: 'Low (L)',
    value: 'L',
    id: 2,
  },
  {
    text: 'High (H)',
    value: 'H',
    id: 3,
  },
];



export const negativeConsequencesTypes = [
  { value: 'violation of confidentiality', label: 'Нарушение конфиденциальности' },
  { value: 'integrity violation', label: 'Нарушение целостности' },
  { value: 'violation of accessibility', label: 'Нарушение доступности' },
  { value: 'remote code execution', label: 'Удаленное выполнение кода' },
  { value: 'compromising accounts', label: 'Компрометация аккаунтов' },
];

export const prepareNegativeConsequencesToRu: { [index: string]: string } = {
  'violation of confidentiality': 'Нарушение конфиденциальности',
  'integrity violation': 'Нарушение целостности',
  'violation of accessibility': 'Нарушение доступности',
  'remote code execution': 'Удаленное выполнение кода',
  'compromising accounts': 'Компрометация аккаунтов',
};



export const riskLevelPopupItems = [
  {
    value: 'critical',
    text: 'Критический',
    id: 1,
  },
  {
    value: 'high',
    text: 'Высокий',
    id: 2,
  },
  {
    value: 'medium',
    text: 'Средний',
    id: 3,
  },
  {
    value: 'low',
    text: 'Низкий',
    id: 4,
  },
  {
    value: 'info',
    text: 'Информационный',
    id: 5,
  },
];

export const prepareRiskLevelToRu: { [index: string]: string } = {
  'critical': 'Критический',
  'high': 'Высокий',
  'medium': 'Средний',
  'low': 'Низкий',
  'info': 'Информационный',
};

export const riskLevelList = [
  { value: 'critical', label: 'Критический' },
  { value: 'high', label: 'Высокий' },
  { value: 'medium', label: 'Средний' },
  { value: 'low', label: 'Низкий' },
  { value: 'info', label: 'Информационный' },
];



export const prepareVulnType: { [index: string]: string } = {
  'webApp': 'web_app',
  'api': 'api',
  'mobileApp': 'mobile_app',
  'networkDevice': 'network_device',
  'server': 'server',
  'arm': 'arm',
  'wifi': 'wifi',
  'socialEngineering': 'social_engineering',
  'desktopApp': 'desktop_app',
  'sourceCode': 'source_code',
  'external': 'external_ip',
  'internal': 'internal_ip',
  'other': 'other',
};