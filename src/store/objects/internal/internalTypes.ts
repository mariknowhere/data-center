import {IObjectInitial, IObjectState} from '../objectsTypes';

type InternalObjectInitial =
  Omit<IObjectInitial, 'blackbox' | 'greybox' | 'attacker_model' | 'work_type' | 'office' | 'office_id'>;

export interface IInternal extends InternalObjectInitial {
  ip_address: string;
}

export interface IInternalState extends IObjectState {
  internals: IInternal[];
  allInternals: IInternal[];
  internalById: IInternal;
}

export interface IInternalErrors {
  ip_address_error: string;
}
