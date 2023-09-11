import {EMPTY_ERROR_MESSAGE, GENERAL_ERROR_MESSAGES} from '../../../constants/errors';
import {setOtherIpAddressError} from '../../../store/objects/objectsSlice';
import {validateIp} from '../general/validateIp';
import {IOther} from '../../../store/objects/other/otherTypes';

/**
 * return is the data valid
 * @param {IOther} object  Validation data
 * @param {any} dispatch   Dispatcher to change values in the store
 * @return {boolean}       Is the data valid
 */
export const validateOther = (
  object: IOther,
  dispatch: any,
): boolean => {
  let isAddressIpCorrect;

  const isAddressIpFormatCorrect = validateIp(object.ip_address);

  if (!object.ip_address) {
    dispatch(setOtherIpAddressError(GENERAL_ERROR_MESSAGES.FIELD_EMPTY));

    isAddressIpCorrect = false;
  } else if (!isAddressIpFormatCorrect) {
    dispatch(setOtherIpAddressError(GENERAL_ERROR_MESSAGES.IP));

    isAddressIpCorrect = false;
  } else {
    dispatch(setOtherIpAddressError(EMPTY_ERROR_MESSAGE));

    isAddressIpCorrect = true;
  }

  return (isAddressIpCorrect);
};
