import {Dispatch, SetStateAction} from 'react';

import {
  setServerAddressIpError,
  setServerAttackerModelError,
  setServerWorkTypeError,
} from '../../../../../store/objects/objectsSlice';
import {EMPTY_ERROR_MESSAGE} from '../../../../../constants/errors';
import {IPopupItem} from '../../../../popup/PopupTypes';
import {IServer} from '../../../../../store/objects/servers/serversTypes';

/**
 *
 * @param {any} dispatch                                       Dispatcher to change values in the store
 * @param {Dispatch<SetStateAction<IServer>>} setServer        Setter for dumping data in server
 * @param {Dispatch<SetStateAction<IPopupItem>>} setGroupType  Setter for dumping data in group type
 */
export const resetServerData = (
  dispatch: any,
  setServer: Dispatch<SetStateAction<IServer>>,
  setGroupType: Dispatch<SetStateAction<IPopupItem>>,
) => {
  setServer({
    additional_info: '',
    assignment: '',
    attacker_model: '',
    inf_system: { id: '', name: '' },
    inf_system_id: '',
    office: { id: '', name: '' },
    office_id: '',
    ip_address: '',
    network_device_name: '',
    greybox: false,
    blackbox: false,
    work_type: '',
  });

  setGroupType({
    text: 'Отсутствует',
    value: 'none',
    id: 1,
  });

  dispatch(setServerAttackerModelError(EMPTY_ERROR_MESSAGE));
  dispatch(setServerWorkTypeError(EMPTY_ERROR_MESSAGE));
  dispatch(setServerAddressIpError(EMPTY_ERROR_MESSAGE));
};
