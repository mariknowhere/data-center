import {IEntity, IEntityResponse, IState} from '../storeTypes';

export enum InfSystemsTypes {
  GET = 'infSystems/getInfSystems',
  GET_ALL = 'infSystems/getAllInfSystems',
  GET_ONE = 'infSystems/getInfSystemById',
  POST = 'infSystems/createInfSystem',
  DELETE = 'infSystems/deleteInfSystem',
  PATCH = 'infSystems/changeInfSystem'
}

export interface IInfSystem extends IEntity {
  name: string;
  availability_interface: boolean;
  web_interface_address: string;
  security_level: number | null;
  product: string;
  product_manager: string;
  inf_system_contact_person: string;
}

export interface IInfSystemErrors {
  inf_system_name_error: string;
  web_interface_address_error: string;
  inf_system_security_level_error: string;
  product_error: string;
  product_manager_error: string;
  inf_system_contact_person_error: string;
}



export interface IChangeInfSystemRequest {
  customerId: string;
  infSystemId: string;
  infSystem: IInfSystem;
}

export interface ICreateInfSystemRequest extends Omit<IChangeInfSystemRequest, 'infSystemId'> {}

export interface IInfSystemByIdRequest extends Omit<IChangeInfSystemRequest, 'infSystem'> {}



export interface IInfSystemResponse extends IEntityResponse, Pick<IChangeInfSystemRequest, 'infSystem'> {}

export interface IGetInfSystemResponse extends Pick<IState, 'count'> {
  data: IInfSystem[];
}

export interface IDeleteInfSystemResponse extends IEntityResponse {
  id: string;
}



export interface IInfSystemsState extends IState, IEntityResponse {
  infSystems: IInfSystem[];
  allInfSystems: IInfSystem[];
  infSystemById: IInfSystem;
  errors: IInfSystemErrors;
}
