import {IObjectInitial, IObjectState} from '../objectsTypes';

type ExternalObjectInitial =
  Omit<IObjectInitial, 'blackbox' | 'greybox' | 'attacker_model' | 'work_type' | 'office' | 'office_id'>;

export interface IExternal extends ExternalObjectInitial {
  ip_address: string;
}

export interface IExternalState extends IObjectState {
  externals: IExternal[];
  allExternals: IExternal[];
  externalById: IExternal;
}

export interface IExternalErrors {
  ip_address_error: string;
}
