import {Dispatch, SetStateAction} from 'react';

import {
  setArmAddressIpError,
  setArmAttackerModelError,
  setArmWorkTypeError,
} from '../../../../../store/objects/objectsSlice';
import {EMPTY_ERROR_MESSAGE} from '../../../../../constants/errors';
import {IArm} from '../../../../../store/objects/arm/armTypes';
import {IPopupItem} from '../../../../popup/PopupTypes';

/**
 *
 * @param {any} dispatch                                       Dispatcher to change values in the store
 * @param {Dispatch<SetStateAction<IApi>>} setArm              Setter for dumping data in arm
 * @param {Dispatch<SetStateAction<IPopupItem>>} setGroupType  Setter for dumping data in group type
 */
export const resetArmData = (
  dispatch: any,
  setArm: Dispatch<SetStateAction<IArm>>,
  setGroupType: Dispatch<SetStateAction<IPopupItem>>,
) => {
  setArm({
    additional_info: '',
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

  dispatch(setArmAttackerModelError(EMPTY_ERROR_MESSAGE));
  dispatch(setArmWorkTypeError(EMPTY_ERROR_MESSAGE));
  dispatch(setArmAddressIpError(EMPTY_ERROR_MESSAGE));
};
