import {IObjectInitial, IObjectState} from '../objectsTypes';

type ApiObjectInitial = Omit<IObjectInitial, 'office_id'>;

export interface IApi extends ApiObjectInitial {
  ip_address: string;
  domain_name?: string;
}

export interface IApiState extends IObjectState {
  api: IApi[];
  allApi: IApi[];
  apiById: IApi;
}

export interface IApiErrors {
  ip_address_error: string;
  attacker_model_error: string;
  work_type_error: string;
  test_method_error: string;
}
