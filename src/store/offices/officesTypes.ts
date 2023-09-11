import {IEntity, IEntityResponse, IState} from '../storeTypes';

export enum OfficesTypes {
  GET = 'offices/getOffices',
  GET_ALL = 'offices/getAllOffices',
  GET_ONE = 'offices/getOfficeById',
  POST = 'offices/createOffice',
  DELETE = 'offices/deleteOffice',
  PATCH = 'offices/changeOffice'
}

export interface IOffice extends IEntity {
  name: string;
  address: string;
  availability_wifi: boolean;
  responsible_is: string;
  availability_separate_internet: boolean;
  security_level: number | null;
}

export interface IOfficeErrors {
  office_name_error: string;
  address_error: string;
  responsible_is_error: string;
  office_security_level_error: string;
}



export interface IChangeOfficeRequest {
  customerId: string;
  officeId: string;
  office: IOffice;
}

export interface ICreateOfficeRequest extends Omit<IChangeOfficeRequest, 'officeId'> {}

export interface IOfficeByIdRequest extends Omit<IChangeOfficeRequest, 'office'> {}



export interface IOfficeResponse extends Pick<IChangeOfficeRequest, 'office'>, IEntityResponse {}

export interface IGetOfficeResponse extends Pick<IState, 'count'> {
  data: IOffice[];
}

export interface IDeleteOfficeResponse extends Pick<IChangeOfficeRequest, 'office'>, IEntityResponse {
  id: string;
}



export interface IOfficesState extends IState, IEntityResponse {
  offices: IOffice[];
  allOffices: IOffice[];
  officeById: IOffice;
  errors: IOfficeErrors;
}
