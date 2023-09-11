import {IEntity, IEntityResponse, IState} from '../storeTypes';

export enum CustomerTypes {
  GET = 'customers/getCustomers',
  GET_ALL = 'customers/getAllCustomers',
  GET_ONE = 'customers/getCustomerById',
  RESTORE = 'customers/restoreCustomer',
  POST = 'customers/createCustomer',
  DELETE = 'customers/deleteCustomer',
  PATCH = 'customers/changeCustomer'
}

export interface ICustomer extends IEntity {
  inn: number | null;
  customer_name: string;
  number_employees: number | null;
  customer_type: string;
}

export interface ICustomerInfo {
  id: string;
  customer_name?: string;
}



export interface ICustomerResponse extends IEntityResponse {
  customer: ICustomer;
}

export interface IGetCustomerResponse extends Pick<IState, 'count'> {
  data: ICustomer[];
}

export interface IDeleteCustomerResponse extends IEntityResponse {
  id: string;
}

export interface ICustomerRequest extends Omit<ICustomerResponse, 'status'> {
  customerId: string;
}



export interface ICustomerErrors {
  inn_error: string;
  customer_name_error: string;
  customer_type_error: string;
  number_employees_error: string;
}

export interface ICustomersState extends IState, IEntityResponse {
  customers: ICustomer[];
  allCustomers: ICustomer[];
  customerById: ICustomer;
  errors: ICustomerErrors;
}
