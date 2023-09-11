import {EMPTY_ERROR_MESSAGE, GENERAL_ERROR_MESSAGES, OBJECT_ERROR_MESSAGE} from '../../../constants/errors';
import {
  setWifiAttackerModelError,
  setWifiBssidError,
  setWifiSsidError,
  setWifiTestMethodError,
} from '../../../store/objects/objectsSlice';
import {IWifi} from '../../../store/objects/wifies/wifiesTypes';

/**
 * return is the data valid
 * @param {IWifi} object    Validation data
 * @param {any} dispatch    Dispatcher to change values in the store
 * @param {IWifi[]} wifies  Array with all wifies for check bssid unique
 * @return {boolean}        Is the data valid
 */
export const validateWifi = (
  object: IWifi,
  dispatch: any,
  wifies: IWifi[],
): boolean => {
  let isSsidCorrect;
  let isBssidCorrect;
  let isAttackerModelCorrect;
  let isTestMethodCorrect;

  const wifiBssidFree = wifies.find(({ bssid, id }) => object.bssid === bssid && object.id !== id);

  if (!object.ssid) {
    dispatch(setWifiSsidError(GENERAL_ERROR_MESSAGES.FIELD_EMPTY));

    isSsidCorrect = false;
  } else {
    dispatch(setWifiSsidError(EMPTY_ERROR_MESSAGE));

    isSsidCorrect = true;
  }

  if (!object.bssid) {
    dispatch(setWifiBssidError(GENERAL_ERROR_MESSAGES.FIELD_EMPTY));

    isBssidCorrect = false;
  } else if (wifiBssidFree) {
    dispatch(setWifiBssidError(OBJECT_ERROR_MESSAGE.BSSID_BUSY));

    isBssidCorrect = false;
  } else {
    dispatch(setWifiBssidError(EMPTY_ERROR_MESSAGE));

    isBssidCorrect = true;
  }

  if (!object.attacker_model) {
    dispatch(setWifiAttackerModelError(GENERAL_ERROR_MESSAGES.POPUP_EMPTY));

    isAttackerModelCorrect = false;
  } else {
    dispatch(setWifiAttackerModelError(EMPTY_ERROR_MESSAGE));

    isAttackerModelCorrect = true;
  }

  if (!object.greybox && !object.blackbox) {
    dispatch(setWifiTestMethodError(OBJECT_ERROR_MESSAGE.TEST_METHOD_EMPTY));

    isTestMethodCorrect = false;
  } else {
    dispatch(setWifiTestMethodError(EMPTY_ERROR_MESSAGE));

    isTestMethodCorrect = true;
  }

  return (isSsidCorrect && isAttackerModelCorrect && isBssidCorrect && isTestMethodCorrect);
};
