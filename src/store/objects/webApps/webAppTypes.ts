import {IObjectInitial, IObjectState} from '../objectsTypes';

type WebAppObjectInitial = Omit<IObjectInitial, 'office_id'>;

export interface IWebApp extends WebAppObjectInitial {
  ip_address: string;
  domain_name?: string;
}

export interface IWebAppState extends IObjectState {
  webApps: IWebApp[];
  allWebApps: IWebApp[];
  webAppById: IWebApp;
}

export interface IWebAppErrors {
  attacker_model_error: string;
  work_type_error: string;
  ip_address_error: string;
  test_method_error: string;
}
