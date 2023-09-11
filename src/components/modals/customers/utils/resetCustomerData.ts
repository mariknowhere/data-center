import {Dispatch, SetStateAction} from 'react';

import {EMPTY_ERROR_MESSAGE} from '../../../../constants/errors';
import {
  setCustomerInnError,
  setCustomerNameError,
  setCustomerNumberEmployeesError,
  setCustomerTypeError,
} from '../../../../store/customers/customersSlice';
import {ICustomer} from '../../../../store/customers/customersTypes';

/**
 *
 * @param {any} dispatch                                     Dispatcher to change values in the store
 * @param {Dispatch<SetStateAction<ICustomer>>} setCustomer  Setter for resetting customer data
 */
export const resetOfficeData = (dispatch: any, setCustomer: Dispatch<SetStateAction<ICustomer>>) => {
  setCustomer({
    customer_name: '',
    customer_type: '',
    inn: NaN,
    number_employees: NaN,
  });

  dispatch(setCustomerNameError(EMPTY_ERROR_MESSAGE));
  dispatch(setCustomerInnError(EMPTY_ERROR_MESSAGE));
  dispatch(setCustomerTypeError(EMPTY_ERROR_MESSAGE));
  dispatch(setCustomerNumberEmployeesError(EMPTY_ERROR_MESSAGE));
};
