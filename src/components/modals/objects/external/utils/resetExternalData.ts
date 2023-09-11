import {Dispatch, SetStateAction} from 'react';

import {setExternalIpAddressError} from '../../../../../store/objects/objectsSlice';
import {EMPTY_ERROR_MESSAGE} from '../../../../../constants/errors';
import {IExternal} from '../../../../../store/objects/external/externalTypes';

/**
 *
 * @param {any} dispatch                                     Dispatcher to change values in the store
 * @param {Dispatch<SetStateAction<IExternal>>} setExternal  Setter for dumping data in external ip
 */
export const resetExternalData = (dispatch: any, setExternal: Dispatch<SetStateAction<IExternal>>) => {
  setExternal({
    inf_system: { id: '', name: '' },
    inf_system_id: '',
    ip_address: '',
    additional_info: '',
  });

  dispatch(setExternalIpAddressError(EMPTY_ERROR_MESSAGE));
};
