import {IObjectInitial, IObjectState} from '../objectsTypes';

type DesktopAppObjectInitial = Omit<IObjectInitial, 'office_id' | 'work_type' | 'attacker_model'>;

export interface IDesktopApp extends DesktopAppObjectInitial {
  app_name: string;
  platform_type: string;
}

export interface IDesktopAppState extends IObjectState {
  desktopApps: IDesktopApp[];
  allDesktopApps: IDesktopApp[];
  desktopAppById: IDesktopApp;
}

export interface IDesktopAppErrors {
  platform_type_error: string;
  app_name_error: string;
  test_method_error: string;
}

