import {IObjectInitial, IObjectState} from '../objectsTypes';

type WifiObjectInitial = Omit<IObjectInitial, 'inf_system' | 'work_type'>;

export interface IWifi extends WifiObjectInitial {
  ssid: string;
  bssid: string;
}

export interface IWifiState extends IObjectState {
  wifies: IWifi[];
  allWifies: IWifi[];
  wifiById: IWifi;
}

export interface IWifiErrors {
  ssid_error: string;
  bssid_error: string;
  attacker_model_error: string;
  test_method_error: string;
}
