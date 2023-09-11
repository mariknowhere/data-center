import {IEntityResponse, IState} from '../storeTypes';

export enum AnalyticsTypes {
  GET_VULNS_REPORT = 'analytics/getVulnsReport',
  GET_PROJECT_REPORT = 'analytics/getProjectReport',
  UPLOAD_EXCEL = 'analytics/uploadExcel',
}

export interface IAnalyticsErrors {
  object_types_error: string;
  start_date_error: string;
  end_date_error: string;
  num_employees_error: string;
  project_name_error: string;
  screenshots_error: string;
  excel_file_error: string;
}

export interface IAnalyticsState extends Omit<IState, 'count'>, IEntityResponse {
  errors: IAnalyticsErrors;
}

export interface IGetVulnsReport {
  object_types: string;
  start_date: string;
  end_date: string;
  logic_type: string;
  num_employees?: number | null;
  risk_level?: string;
  work_type?: string;
  attacker_model?: string;
  test_method?: string;
}

export interface IUploadExcel {
  excel_file: any;
  screenshots : any;
}



export interface IObjectType {
  web_app: boolean;
  api: boolean;
  mobile_app: boolean;
  network_device: boolean;
  server: boolean;
  arm: boolean;
  wifi: boolean;
  social_engineering: boolean;
  desktop_app: boolean;
  source_code: boolean;
  internal_ip: boolean;
  external_ip: boolean;
  other: boolean;
}

export interface IRiskLevel {
  critical: boolean;
  high: boolean;
  medium: boolean;
  low: boolean;
  info: boolean;
}

export interface ITestMethod {
  blackbox: boolean;
  greybox: boolean;
}

export interface IAttackerModel {
  external: boolean;
  internal: boolean;
}

export interface IWorkType {
  instrument_scan: boolean;
  security_analysis: boolean;
  pentest: boolean;
}



export interface IGetProjectReportRequest {
  name: string;
}

export interface IReport {
  msg: string;
}

export interface IReportResponse extends IEntityResponse {
  report : IReport;
}
