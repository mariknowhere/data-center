import {Dispatch, SetStateAction} from 'react';

import {
  setNetworkDeviceAddressIpError,
  setNetworkDeviceAttackerModelError,
  setNetworkDeviceWorkTypeError,
} from '../../../../../store/objects/objectsSlice';
import {EMPTY_ERROR_MESSAGE} from '../../../../../constants/errors';
import {INetworkDevice} from '../../../../../store/objects/networkDevices/networkDevicesTypes';
import {IPopupItem} from '../../../../popup/PopupTypes';

/**
 *
 * @param {any} dispatch                                               Dispatcher to change values in the store
 * @param {Dispatch<SetStateAction<INetworkDevice>>} setNetworkDevice  Setter for dumping data in network device
 * @param {Dispatch<SetStateAction<IPopupItem>>} setGroupType          Setter for dumping data in group type
 */
export const resetNetworkDeviceData = (
  dispatch: any,
  setNetworkDevice: Dispatch<SetStateAction<INetworkDevice>>,
  setGroupType: Dispatch<SetStateAction<IPopupItem>>,
) => {
  setNetworkDevice({
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

  dispatch(setNetworkDeviceAttackerModelError(EMPTY_ERROR_MESSAGE));
  dispatch(setNetworkDeviceWorkTypeError(EMPTY_ERROR_MESSAGE));
  dispatch(setNetworkDeviceAddressIpError(EMPTY_ERROR_MESSAGE));
};
