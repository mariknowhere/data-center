import {CUSTOMER_ERROR_MESSAGES, EMPTY_ERROR_MESSAGE, GENERAL_ERROR_MESSAGES} from '../../constants/errors';
import {ICustomer} from '../../store/customers/customersTypes';
import {
  setCustomerInnError,
  setCustomerNameError,
  setCustomerNumberEmployeesError,
  setCustomerTypeError,
} from '../../store/customers/customersSlice';

/**
 * return is the data valid
 * @param {ICustomer} customer     Validation data
 * @param {any} dispatch           Dispatcher to change values in the store
 * @param {ICustomer[]} customers  Array of customers to validate by name and inn
 * @param {string} customerId      Customer id to check in the modal change
 * @return {boolean}               Is the data valid
 */
export const validateCustomer = (
  customer: ICustomer,
  dispatch: any,
  customers?: ICustomer[],
  customerId?: string,
): boolean => {
  let isCustomerNameCorrect;
  let isInnCorrect;
  let isNumberEmployeesCorrect;
  let isCustomerTypeCorrect;

  const customerNameBusy =
    customers?.find((item: ICustomer) => item.customer_name === customer.customer_name && customerId !== item.id);
  const customerInnBusy =
    customers?.find((item: ICustomer) => String(item.inn) === String(customer.inn) && customerId !== item.id);

  if (!customer.customer_name) {
    dispatch(setCustomerNameError(GENERAL_ERROR_MESSAGES.FIELD_EMPTY));

    isCustomerNameCorrect = false;
  } else if (customerNameBusy) {
    dispatch(setCustomerNameError(CUSTOMER_ERROR_MESSAGES.NAME_BUSY));

    isCustomerNameCorrect = false;
  } else {
    dispatch(setCustomerNameError(EMPTY_ERROR_MESSAGE));

    isCustomerNameCorrect = true;
  }

  if (customer.inn === null || customer.inn === undefined || isNaN(customer.inn)) {
    dispatch(setCustomerInnError(GENERAL_ERROR_MESSAGES.FIELD_EMPTY));

    isInnCorrect = false;
  } else if (customer.inn.toString().trim().length !== 12) {
    dispatch(setCustomerInnError(CUSTOMER_ERROR_MESSAGES.INN));

    isInnCorrect = false;
  } else if (customerInnBusy) {
    dispatch(setCustomerInnError(CUSTOMER_ERROR_MESSAGES.INN_BUSY));

    isInnCorrect = false;
  } else {
    dispatch(setCustomerInnError(EMPTY_ERROR_MESSAGE));

    isInnCorrect = true;
  }

  if (customer.number_employees === null || customer.number_employees === undefined ||
    isNaN(customer.number_employees)) {
    dispatch(setCustomerNumberEmployeesError(GENERAL_ERROR_MESSAGES.FIELD_EMPTY));

    isNumberEmployeesCorrect = false;
  } else if (customer.number_employees < 0) {
    dispatch(setCustomerNumberEmployeesError(GENERAL_ERROR_MESSAGES.NUMBER_NEGATIVE));

    isNumberEmployeesCorrect = false;
  } else {
    dispatch(setCustomerNumberEmployeesError(EMPTY_ERROR_MESSAGE));

    isNumberEmployeesCorrect = true;
  }

  if (!customer.customer_type) {
    dispatch(setCustomerTypeError(CUSTOMER_ERROR_MESSAGES.TYPE_EMPTY));

    isCustomerTypeCorrect = false;
  } else {
    dispatch(setCustomerTypeError(EMPTY_ERROR_MESSAGE));

    isCustomerTypeCorrect = true;
  }

  return !!(isCustomerNameCorrect && isInnCorrect && isCustomerTypeCorrect && isNumberEmployeesCorrect);
};
