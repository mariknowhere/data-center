import {IObjectInitial, IObjectState} from '../objectsTypes';

export interface INetworkDevice extends IObjectInitial {
  ip_address: string;
  network_device_name?: string;
  assignment?: string;
}

export interface INetworkDeviceState extends IObjectState {
  networkDevices: INetworkDevice[];
  allNetworkDevices: INetworkDevice[];
  networkDeviceById: INetworkDevice;
}

export interface INetworkDeviceErrors {
  ip_address_error: string;
  attacker_model_error: string;
  work_type_error: string;
  test_method_error: string;
}
