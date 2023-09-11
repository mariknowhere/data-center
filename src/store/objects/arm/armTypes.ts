import {IObjectInitial, IObjectState} from '../objectsTypes';

export interface IArm extends IObjectInitial {
  ip_address: string;
  network_device_name?: string;
}

export interface IArmState extends IObjectState {
  arm: IArm[];
  allArm: IArm[];
  armById: IArm;
}

export interface IArmErrors {
  ip_address_error: string;
  attacker_model_error: string;
  work_type_error: string;
  test_method_error: string;
}
