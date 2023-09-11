import {IObjectInitial, IObjectState} from '../objectsTypes';

type OtherObjectInitial = Omit<IObjectInitial, 'blackbox' | 'greybox' | 'attacker_model' | 'work_type'>;

export interface IOther extends OtherObjectInitial {
  ip_address: string;
}

export interface IOtherState extends IObjectState {
  others: IOther[];
  allOthers: IOther[];
  otherById: IOther;
}

export interface IOtherErrors {
  ip_address_error: string;
}
