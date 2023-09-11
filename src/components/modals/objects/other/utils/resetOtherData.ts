import {Dispatch, SetStateAction} from 'react';

import {setOtherIpAddressError} from '../../../../../store/objects/objectsSlice';
import {EMPTY_ERROR_MESSAGE} from '../../../../../constants/errors';
import {IOther} from '../../../../../store/objects/other/otherTypes';
import {IPopupItem} from '../../../../popup/PopupTypes';

/**
 *
 * @param {any} dispatch                               Dispatcher to change values in the store
 * @param {Dispatch<SetStateAction<IOther>>} setOther  Setter for dumping data in other
 * @param {Dispatch<SetStateAction<IPopupItem>>} setGroupType  Setter for dumping data in group type
 */
export const resetOtherData = (
  dispatch: any,
  setOther: Dispatch<SetStateAction<IOther>>,
  setGroupType: Dispatch<SetStateAction<IPopupItem>>,
) => {
  setOther({
    inf_system: { id: '', name: '' },
    inf_system_id: '',
    office: { id: '', name: '' },
    office_id: '',
    ip_address: '',
    additional_info: '',
  });

  setGroupType({
    text: 'Отсутствует',
    value: 'none',
    id: 1,
  });

  dispatch(setOtherIpAddressError(EMPTY_ERROR_MESSAGE));
};
