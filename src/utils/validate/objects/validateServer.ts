import {EMPTY_ERROR_MESSAGE, GENERAL_ERROR_MESSAGES, OBJECT_ERROR_MESSAGE} from '../../../constants/errors';
import {
  setServerAddressIpError,
  setServerAttackerModelError,
  setServerTestMethodError,
  setServerWorkTypeError,
} from '../../../store/objects/objectsSlice';
import {IServer} from '../../../store/objects/servers/serversTypes';
import {validateIp} from '../general/validateIp';

/**
 * return is the data valid
 * @param {IServer} object  Validation data
 * @param {any} dispatch    Dispatcher to change values in the store
 * @return {boolean}        Is the data valid
 */
export const validateServer = (
  object: IServer,
  dispatch: any,
): boolean => {
  let isAddressIpCorrect;
  let isWorkTypeCorrect;
  let isAttackerModelCorrect;
  let isTestMethodCorrect;

  const isAddressIpFormatCorrect = validateIp(object.ip_address);

  if (!object.ip_address) {
    dispatch(setServerAddressIpError(GENERAL_ERROR_MESSAGES.FIELD_EMPTY));

    isAddressIpCorrect = false;
  } else if (!isAddressIpFormatCorrect) {
    dispatch(setServerAddressIpError(GENERAL_ERROR_MESSAGES.IP));

    isAddressIpCorrect = false;
  } else {
    dispatch(setServerAddressIpError(EMPTY_ERROR_MESSAGE));

    isAddressIpCorrect = true;
  }

  if (!object.work_type) {
    dispatch(setServerWorkTypeError(GENERAL_ERROR_MESSAGES.POPUP_EMPTY));

    isWorkTypeCorrect = false;
  } else {
    dispatch(setServerWorkTypeError(EMPTY_ERROR_MESSAGE));

    isWorkTypeCorrect = true;
  }

  if (!object.attacker_model) {
    dispatch(setServerAttackerModelError(GENERAL_ERROR_MESSAGES.POPUP_EMPTY));

    isAttackerModelCorrect = false;
  } else {
    dispatch(setServerAttackerModelError(EMPTY_ERROR_MESSAGE));

    isAttackerModelCorrect = true;
  }

  if (!object.greybox && !object.blackbox) {
    dispatch(setServerTestMethodError(OBJECT_ERROR_MESSAGE.TEST_METHOD_EMPTY));

    isTestMethodCorrect = false;
  } else {
    dispatch(setServerTestMethodError(EMPTY_ERROR_MESSAGE));

    isTestMethodCorrect = true;
  }

  return (isAddressIpCorrect && isWorkTypeCorrect && isAttackerModelCorrect && isTestMethodCorrect);
};
