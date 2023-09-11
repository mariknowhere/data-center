import {EMPTY_ERROR_MESSAGE, GENERAL_ERROR_MESSAGES, OBJECT_ERROR_MESSAGE} from '../../../constants/errors';
import {
  setWebAppAddressIpError,
  setWebAppAttackerError,
  setWebAppTestMethodError,
  setWebAppWorkTypeError,
} from '../../../store/objects/objectsSlice';
import {IWebApp} from '../../../store/objects/webApps/webAppTypes';
import {validateIp} from '../general/validateIp';

/**
 * return is the data valid
 * @param {IWebApp} object  Validation data
 * @param {any} dispatch    Dispatcher to change values in the store
 * @return {boolean}        Is the data valid
 */
export const validateWebApp = (
  object: IWebApp,
  dispatch: any,
): boolean => {
  let isAttackerModelCorrect;
  let isWorkTypeCorrect;
  let isAddressIpCorrect;
  let isTestMethodCorrect;

  const isAddressIpFormatCorrect = validateIp(object.ip_address);

  if (!object.attacker_model) {
    dispatch(setWebAppAttackerError(GENERAL_ERROR_MESSAGES.POPUP_EMPTY));

    isAttackerModelCorrect = false;
  } else {
    dispatch(setWebAppAttackerError(EMPTY_ERROR_MESSAGE));

    isAttackerModelCorrect = true;
  }

  if (!object.work_type) {
    dispatch(setWebAppWorkTypeError(GENERAL_ERROR_MESSAGES.POPUP_EMPTY));

    isWorkTypeCorrect = false;
  } else {
    dispatch(setWebAppWorkTypeError(EMPTY_ERROR_MESSAGE));

    isWorkTypeCorrect = true;
  }

  if (!object.ip_address) {
    dispatch(setWebAppAddressIpError(GENERAL_ERROR_MESSAGES.FIELD_EMPTY));

    isAddressIpCorrect = false;
  } else if (!isAddressIpFormatCorrect) {
    dispatch(setWebAppAddressIpError(GENERAL_ERROR_MESSAGES.IP));

    isAddressIpCorrect = false;
  } else {
    dispatch(setWebAppAddressIpError(EMPTY_ERROR_MESSAGE));

    isAddressIpCorrect = true;
  }

  if (!object.greybox && !object.blackbox) {
    dispatch(setWebAppTestMethodError(OBJECT_ERROR_MESSAGE.TEST_METHOD_EMPTY));

    isTestMethodCorrect = false;
  } else {
    dispatch(setWebAppTestMethodError(EMPTY_ERROR_MESSAGE));

    isTestMethodCorrect = true;
  }

  return (isAttackerModelCorrect && isWorkTypeCorrect && isAddressIpCorrect && isTestMethodCorrect);
};
