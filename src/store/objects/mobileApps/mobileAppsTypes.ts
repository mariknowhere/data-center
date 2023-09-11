import {IObjectInitial, IObjectState} from '../objectsTypes';

type MobileAppObjectInitial = Omit<IObjectInitial, 'office_id' | 'work_type' | 'attacker_model'>;

export interface IMobileApp extends MobileAppObjectInitial {
  app_name: string;
  platform_type: string;
}

export interface IMobileAppState extends IObjectState {
  mobileApps: IMobileApp[];
  allMobileApps: IMobileApp[];
  mobileAppById: IMobileApp;
}

export interface IMobileAppErrors {
  app_name_error: string;
  platform_error: string;
  test_method_error: string;
}
