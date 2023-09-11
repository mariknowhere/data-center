import {IObjectInitial, IObjectState} from '../objectsTypes';

export interface IServer extends IObjectInitial {
  ip_address: string;
  network_device_name?: string;
  assignment?: string;
}

export interface IServerState extends IObjectState {
  servers: IServer[];
  allServers: IServer[];
  serverById: IServer;
}

export interface IServerErrors {
  work_type_error: string;
  attacker_model_error: string;
  ip_address_error: string;
  test_method_error: string;
}
