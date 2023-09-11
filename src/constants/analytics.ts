import { ILink } from '../components/tabs/TabsTypes';

export const ANALYTIC_ROUTES = {
  VULNS_REPORT: `${process.env.REACT_APP_API_URI}/api/v1/generate_report_vulnerabilities`,
  PROJECT_REPORT: `${process.env.REACT_APP_API_URI}/api/v1/generate_report_project`,
  UPLOAD_EXCEL: `${process.env.REACT_APP_API_URI}/api/v1/upload_excel/`,
};

export const analyticTabLinks: ILink[] = [
  {
    name: 'Отчёт по уязвимостям',
    tabId: 'export-vulns',
  },
  {
    name: 'Отчёт по проекту',
    tabId: 'export-project',
  },
  {
    name: 'Импорт',
    tabId: 'import',
  },
];

export const analyticLogicTypes = [
  {
    text: 'Все подходящие объекты',
    type: 'or',
    id: 1,
  },
  {
    text: 'Точное совпадения',
    type: 'and',
    id: 2,
  },
];
