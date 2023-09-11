import {Dispatch, SetStateAction} from 'react';

import {
  setProjectCustomerNameError,
  setProjectEndDateError,
  setProjectGosOrderDateError,
  setProjectGosOrderNumberError,
  setProjectNameError,
  setProjectStartDateError,
} from '../../../../store/projects/projectsSlice';
import {EMPTY_ERROR_MESSAGE} from '../../../../constants/errors';
import {IProject} from '../../../../store/projects/projectsTypes';

/**
 *
 * @param {any} dispatch                                           Dispatcher to change values in the store
 * @param {Dispatch<SetStateAction<IProject>>} setProject          Setter for resetting project data
 * @param {Dispatch<SetStateAction<Date | null>>} setStartDate     Setter for resetting start date data
 * @param {Dispatch<SetStateAction<Date | null>>} setEndDate       Setter for resetting end date data
 * @param {Dispatch<SetStateAction<Date | null>>} setGosOrderDate  Setter for resetting gos order date data
 * @param {Dispatch<SetStateAction<string>>} setCustomerId         Setter for resetting customer id data
 * @param {Dispatch<SetStateAction<string>>} setCustomerName       Setter for resetting customer name data
 */
export const resetProjectData = (
  dispatch: any,
  setProject: Dispatch<SetStateAction<IProject>>,
  setStartDate?: Dispatch<SetStateAction<Date | null>>,
  setEndDate?: Dispatch<SetStateAction<Date | null>>,
  setGosOrderDate?: Dispatch<SetStateAction<Date | null>>,
  setCustomerId?: Dispatch<SetStateAction<string>>,
  setCustomerName?: Dispatch<SetStateAction<string>>,
) => {
  setProject({
    end_date: '',
    gos_order_date: '',
    gos_order_number: '',
    customer: { id: '' },
    name: '',
    start_date: '',
  });

  if (setStartDate && setEndDate && setGosOrderDate && setCustomerId && setCustomerName) {
    setStartDate(null);
    setEndDate(null);
    setGosOrderDate(null);
    setCustomerId('');
    setCustomerName('');
  }

  dispatch(setProjectCustomerNameError(EMPTY_ERROR_MESSAGE));
  dispatch(setProjectNameError(EMPTY_ERROR_MESSAGE));
  dispatch(setProjectStartDateError(EMPTY_ERROR_MESSAGE));
  dispatch(setProjectEndDateError(EMPTY_ERROR_MESSAGE));
  dispatch(setProjectGosOrderDateError(EMPTY_ERROR_MESSAGE));
  dispatch(setProjectGosOrderNumberError(EMPTY_ERROR_MESSAGE));
};
