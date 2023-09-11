import {Dispatch, SetStateAction} from 'react';

import {EMPTY_ERROR_MESSAGE} from '../../../../constants/errors';
import {
  setOfficeAddressError,
  setOfficeNameError,
  setOfficeResponsibleError,
  setOfficeSecurityLevelError,
} from '../../../../store/offices/officesSlice';
import {IOffice} from '../../../../store/offices/officesTypes';

/**
 *
 * @param {any} dispatch                                 Dispatcher to change values in the store
 * @param {Dispatch<SetStateAction<IOffice>>} setOffice  Setter for resetting office data
 */
export const resetOfficeData = (dispatch: any, setOffice: Dispatch<SetStateAction<IOffice>>) => {
  setOffice({
    address: '',
    availability_separate_internet: false,
    availability_wifi: false,
    name: '',
    security_level: NaN,
    responsible_is: '',
  });

  dispatch(setOfficeNameError(EMPTY_ERROR_MESSAGE));
  dispatch(setOfficeResponsibleError(EMPTY_ERROR_MESSAGE));
  dispatch(setOfficeSecurityLevelError(EMPTY_ERROR_MESSAGE));
  dispatch(setOfficeAddressError(EMPTY_ERROR_MESSAGE));
};
