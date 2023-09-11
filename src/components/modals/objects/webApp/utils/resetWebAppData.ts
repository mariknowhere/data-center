import {Dispatch, SetStateAction} from 'react';

import {
  setWebAppAddressIpError,
  setWebAppAttackerError,
  setWebAppWorkTypeError,
} from '../../../../../store/objects/objectsSlice';
import {EMPTY_ERROR_MESSAGE} from '../../../../../constants/errors';
import {IWebApp} from '../../../../../store/objects/webApps/webAppTypes';

/**
 *
 * @param {any} dispatch                                 Dispatcher to change values in the store
 * @param {Dispatch<SetStateAction<IWebApp>>} setWebApp  Setter for dumping data in web application
 */
export const resetWebAppData = (dispatch: any, setWebApp: Dispatch<SetStateAction<IWebApp>>) => {
  setWebApp({
    additional_info: '',
    attacker_model: '',
    inf_system: { id: '', name: '' },
    ip_address: '',
    greybox: false,
    blackbox: false,
    domain_name: '',
    work_type: '',
  });

  dispatch(setWebAppAttackerError(EMPTY_ERROR_MESSAGE));
  dispatch(setWebAppWorkTypeError(EMPTY_ERROR_MESSAGE));
  dispatch(setWebAppAddressIpError(EMPTY_ERROR_MESSAGE));
};
