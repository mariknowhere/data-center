import {EMPTY_ERROR_MESSAGE, GENERAL_ERROR_MESSAGES, OBJECT_ERROR_MESSAGE} from '../../../constants/errors';
import {
  setApiAddressIpError,
  setApiAttackerModelError, setApiTestMethodError,
  setApiWorkTypeError,
} from '../../../store/objects/objectsSlice';
import {validateIp} from '../general/validateIp';
import {IApi} from '../../../store/objects/api/apiTypes';

/**
 * return is the data valid
 * @param {IApi} object   Validation data
 * @param {any} dispatch  Dispatcher to change values in the store
 * @return {boolean}      Is the data valid
 */
export const validateApi = (
  object: IApi,
  dispatch: any,
): boolean => {
  let isAddressIpCorrect;
  let isWorkTypeCorrect;
  let isAttackerModelCorrect;
  let isTestMethodCorrect;

  const isAddressIpFormatCorrect = validateIp(object.ip_address);

  if (!object.ip_address) {
    dispatch(setApiAddressIpError(GENERAL_ERROR_MESSAGES.FIELD_EMPTY));

    isAddressIpCorrect = false;
  } else if (!isAddressIpFormatCorrect) {
    dispatch(setApiAddressIpError(GENERAL_ERROR_MESSAGES.IP));

    isAddressIpCorrect = false;
  } else {
    dispatch(setApiAddressIpError(EMPTY_ERROR_MESSAGE));

    isAddressIpCorrect = true;
  }

  if (!object.work_type) {
    dispatch(setApiWorkTypeError(GENERAL_ERROR_MESSAGES.POPUP_EMPTY));

    isWorkTypeCorrect = false;
  } else {
    dispatch(setApiWorkTypeError(EMPTY_ERROR_MESSAGE));

    isWorkTypeCorrect = true;
  }

  if (!object.attacker_model) {
    dispatch(setApiAttackerModelError(GENERAL_ERROR_MESSAGES.POPUP_EMPTY));

    isAttackerModelCorrect = false;
  } else {
    dispatch(setApiAttackerModelError(EMPTY_ERROR_MESSAGE));

    isAttackerModelCorrect = true;
  }

  if (!object.greybox && !object.blackbox) {
    dispatch(setApiTestMethodError(OBJECT_ERROR_MESSAGE.TEST_METHOD_EMPTY));

    isTestMethodCorrect = false;
  } else {
    dispatch(setApiTestMethodError(EMPTY_ERROR_MESSAGE));

    isTestMethodCorrect = true;
  }

  return (isAddressIpCorrect && isWorkTypeCorrect && isAttackerModelCorrect && isTestMethodCorrect);
};
