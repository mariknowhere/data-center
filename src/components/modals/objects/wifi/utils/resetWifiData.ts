import {Dispatch, SetStateAction} from 'react';

import {
  setWifiAttackerModelError,
  setWifiBssidError,
  setWifiSsidError,
} from '../../../../../store/objects/objectsSlice';
import {EMPTY_ERROR_MESSAGE} from '../../../../../constants/errors';
import {IWifi} from '../../../../../store/objects/wifies/wifiesTypes';

/**
 *
 * @param {any} dispatch                             Dispatcher to change values in the store
 * @param {Dispatch<SetStateAction<IWifi>>} setWifi  Setter for dumping data in wifi
 */
export const resetWifiData = (dispatch: any, setWifi: Dispatch<SetStateAction<IWifi>>) => {
  setWifi({
    additional_info: '',
    attacker_model: '',
    bssid: '',
    office: { id: '', name: '' },
    office_id: '',
    ssid: '',
    greybox: false,
    blackbox: false,
  });

  dispatch(setWifiSsidError(EMPTY_ERROR_MESSAGE));
  dispatch(setWifiBssidError(EMPTY_ERROR_MESSAGE));
  dispatch(setWifiAttackerModelError(EMPTY_ERROR_MESSAGE));
};
