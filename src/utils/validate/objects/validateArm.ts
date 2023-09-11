import {EMPTY_ERROR_MESSAGE, GENERAL_ERROR_MESSAGES, OBJECT_ERROR_MESSAGE} from '../../../constants/errors';
import {
  setArmAddressIpError,
  setArmAttackerModelError,
  setArmTestMethodError,
  setArmWorkTypeError,
} from '../../../store/objects/objectsSlice';
import {validateIp} from '../general/validateIp';
import {IArm} from '../../../store/objects/arm/armTypes';

/**
 * return is the data valid
 * @param {IArm} object   Validation data
 * @param {any} dispatch  Dispatcher to change values in the store
 * @return {boolean}      Is the data valid
 */
export const validateArm = (
  object: IArm,
  dispatch: any,
): boolean => {
  let isAddressIpCorrect;
  let isWorkTypeCorrect;
  let isAttackerModelCorrect;
  let isTestMethodCorrect;

  const isAddressIpFormatCorrect = validateIp(object.ip_address);

  if (!object.ip_address) {
    dispatch(setArmAddressIpError(GENERAL_ERROR_MESSAGES.FIELD_EMPTY));

    isAddressIpCorrect = false;
  } else if (!isAddressIpFormatCorrect) {
    dispatch(setArmAddressIpError(GENERAL_ERROR_MESSAGES.IP));

    isAddressIpCorrect = false;
  } else {
    dispatch(setArmAddressIpError(EMPTY_ERROR_MESSAGE));

    isAddressIpCorrect = true;
  }

  if (!object.work_type) {
    dispatch(setArmWorkTypeError(GENERAL_ERROR_MESSAGES.POPUP_EMPTY));

    isWorkTypeCorrect = false;
  } else {
    dispatch(setArmWorkTypeError(EMPTY_ERROR_MESSAGE));

    isWorkTypeCorrect = true;
  }

  if (!object.attacker_model) {
    dispatch(setArmAttackerModelError(GENERAL_ERROR_MESSAGES.POPUP_EMPTY));

    isAttackerModelCorrect = false;
  } else {
    dispatch(setArmAttackerModelError(EMPTY_ERROR_MESSAGE));

    isAttackerModelCorrect = true;
  }

  if (!object.greybox && !object.blackbox) {
    dispatch(setArmTestMethodError(OBJECT_ERROR_MESSAGE.TEST_METHOD_EMPTY));

    isTestMethodCorrect = false;
  } else {
    dispatch(setArmTestMethodError(EMPTY_ERROR_MESSAGE));

    isTestMethodCorrect = true;
  }

  return (isAddressIpCorrect && isWorkTypeCorrect && isAttackerModelCorrect && isTestMethodCorrect);
};
