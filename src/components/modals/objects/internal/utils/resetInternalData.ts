import {Dispatch, SetStateAction} from 'react';

import {setInternalIpAddressError} from '../../../../../store/objects/objectsSlice';
import {EMPTY_ERROR_MESSAGE} from '../../../../../constants/errors';
import {IInternal} from '../../../../../store/objects/internal/internalTypes';

/**
 *
 * @param {any} dispatch                                     Dispatcher to change values in the store
 * @param {Dispatch<SetStateAction<IInternal>>} setInternal  Setter for dumping data in internal ip
 */
export const resetInternalData = (dispatch: any, setInternal: Dispatch<SetStateAction<IInternal>>) => {
  setInternal({
    inf_system: { id: '', name: '' },
    inf_system_id: '',
    ip_address: '',
    additional_info: '',
  });

  dispatch(setInternalIpAddressError(EMPTY_ERROR_MESSAGE));
};
