import {EMPTY_ERROR_MESSAGE, GENERAL_ERROR_MESSAGES} from '../../../constants/errors';
import {setExternalIpAddressError} from '../../../store/objects/objectsSlice';
import {IExternal} from '../../../store/objects/external/externalTypes';
import {validateIp} from '../general/validateIp';

/**
 * return is the data valid
 * @param {IExternal} object  Validation data
 * @param {any} dispatch      Dispatcher to change values in the store
 * @return {boolean}          Is the data valid
 */
export const validateExternal = (
  object: IExternal,
  dispatch: any,
): boolean => {
  let isAddressIpCorrect;

  const isAddressIpFormatCorrect = validateIp(object.ip_address);

  if (!object.ip_address) {
    dispatch(setExternalIpAddressError(GENERAL_ERROR_MESSAGES.FIELD_EMPTY));

    isAddressIpCorrect = false;
  } else if (!isAddressIpFormatCorrect) {
    dispatch(setExternalIpAddressError(GENERAL_ERROR_MESSAGES.IP));

    isAddressIpCorrect = false;
  } else {
    dispatch(setExternalIpAddressError(EMPTY_ERROR_MESSAGE));

    isAddressIpCorrect = true;
  }

  return (isAddressIpCorrect);
};
