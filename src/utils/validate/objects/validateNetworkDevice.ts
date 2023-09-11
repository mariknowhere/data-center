import {EMPTY_ERROR_MESSAGE, GENERAL_ERROR_MESSAGES, OBJECT_ERROR_MESSAGE} from '../../../constants/errors';
import {
  setNetworkDeviceAddressIpError,
  setNetworkDeviceAttackerModelError,
  setNetworkDeviceTestMethodError,
  setNetworkDeviceWorkTypeError,
} from '../../../store/objects/objectsSlice';
import {validateIp} from '../general/validateIp';
import {INetworkDevice} from '../../../store/objects/networkDevices/networkDevicesTypes';

/**
 * return is the data valid
 * @param {INetworkDevice} object  Validation data
 * @param {any} dispatch           Dispatcher to change values in the store
 * @return {boolean}               Is the data valid
 */
export const validateNetworkDevice = (
  object: INetworkDevice,
  dispatch: any,
): boolean => {
  let isAddressIpCorrect;
  let isWorkTypeCorrect;
  let isAttackerModelCorrect;
  let isTestMethodCorrect;

  const isAddressIpFormatCorrect = validateIp(object.ip_address);

  if (!object.ip_address) {
    dispatch(setNetworkDeviceAddressIpError(GENERAL_ERROR_MESSAGES.FIELD_EMPTY));

    isAddressIpCorrect = false;
  } else if (!isAddressIpFormatCorrect) {
    dispatch(setNetworkDeviceAddressIpError(GENERAL_ERROR_MESSAGES.IP));

    isAddressIpCorrect = false;
  } else {
    dispatch(setNetworkDeviceAddressIpError(EMPTY_ERROR_MESSAGE));

    isAddressIpCorrect = true;
  }

  if (!object.work_type) {
    dispatch(setNetworkDeviceWorkTypeError(GENERAL_ERROR_MESSAGES.POPUP_EMPTY));

    isWorkTypeCorrect = false;
  } else {
    dispatch(setNetworkDeviceWorkTypeError(EMPTY_ERROR_MESSAGE));

    isWorkTypeCorrect = true;
  }

  if (!object.attacker_model) {
    dispatch(setNetworkDeviceAttackerModelError(GENERAL_ERROR_MESSAGES.POPUP_EMPTY));

    isAttackerModelCorrect = false;
  } else {
    dispatch(setNetworkDeviceAttackerModelError(EMPTY_ERROR_MESSAGE));

    isAttackerModelCorrect = true;
  }

  if (!object.greybox && !object.blackbox) {
    dispatch(setNetworkDeviceTestMethodError(OBJECT_ERROR_MESSAGE.TEST_METHOD_EMPTY));

    isTestMethodCorrect = false;
  } else {
    dispatch(setNetworkDeviceTestMethodError(EMPTY_ERROR_MESSAGE));

    isTestMethodCorrect = true;
  }

  return (isAddressIpCorrect && isWorkTypeCorrect && isAttackerModelCorrect && isTestMethodCorrect);
};
