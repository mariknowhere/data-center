import {RootState} from '../storeTypes';

export const selectCustomers = (state: RootState) => state.customers;
export const selectCustomerErrors = (state: RootState) => state.customers.errors;
export const selectCustomerById = (state: RootState) => state.customers.customerById;
