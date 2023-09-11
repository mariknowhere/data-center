import {Dispatch, SetStateAction} from 'react';

import {
  setApiAddressIpError,
  setApiAttackerModelError,
  setApiWorkTypeError,
} from '../../../../../store/objects/objectsSlice';
import {EMPTY_ERROR_MESSAGE} from '../../../../../constants/errors';
import {IApi} from '../../../../../store/objects/api/apiTypes';

/**
 *
 * @param {any} dispatch                           Dispatcher to change values in the store
 * @param {Dispatch<SetStateAction<IApi>>} setApi  Setter for dumping data in api
 */
export const resetApiData = (dispatch: any, setApi: Dispatch<SetStateAction<IApi>>) => {
  setApi({
    additional_info: '',
    attacker_model: '',
    inf_system: { id: '', name: '' },
    inf_system_id: '',
    ip_address: '',
    domain_name: '',
    greybox: false,
    blackbox: false,
    work_type: '',
  });

  dispatch(setApiAttackerModelError(EMPTY_ERROR_MESSAGE));
  dispatch(setApiWorkTypeError(EMPTY_ERROR_MESSAGE));
  dispatch(setApiAddressIpError(EMPTY_ERROR_MESSAGE));
};
