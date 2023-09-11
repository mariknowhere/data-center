import {EMPTY_ERROR_MESSAGE, GENERAL_ERROR_MESSAGES} from '../../../constants/errors';
import {setInternalIpAddressError} from '../../../store/objects/objectsSlice';
import {validateIp} from '../general/validateIp';
import {IInternal} from '../../../store/objects/internal/internalTypes';

/**
 * return is the data valid
 * @param {IInternal} object  Validation data
 * @param {any} dispatch      Dispatcher to change values in the store
 * @return {boolean}          Is the data valid
 */
export const validateInternal = (
  object: IInternal,
  dispatch: any,
): boolean => {
  let isAddressIpCorrect;

  const isAddressIpFormatCorrect = validateIp(object.ip_address);

  if (!object.ip_address) {
    dispatch(setInternalIpAddressError(GENERAL_ERROR_MESSAGES.FIELD_EMPTY));

    isAddressIpCorrect = false;
  } else if (!isAddressIpFormatCorrect) {
    dispatch(setInternalIpAddressError(GENERAL_ERROR_MESSAGES.IP));

    isAddressIpCorrect = false;
  } else {
    dispatch(setInternalIpAddressError(EMPTY_ERROR_MESSAGE));

    isAddressIpCorrect = true;
  }

  return (isAddressIpCorrect);
};
