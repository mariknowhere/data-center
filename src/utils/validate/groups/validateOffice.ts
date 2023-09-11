import {EMPTY_ERROR_MESSAGE, GENERAL_ERROR_MESSAGES, OBJECT_ERROR_MESSAGE} from '../../../constants/errors';
import {
  setOfficeAddressError,
  setOfficeNameError,
  setOfficeResponsibleError,
  setOfficeSecurityLevelError,
} from '../../../store/offices/officesSlice';
import {IOffice} from '../../../store/offices/officesTypes';

/**
 * return is the data valid
 * @param {IOffice} office     Validation data
 * @param {any} dispatch       Dispatcher to change values in the store
 * @param {IOffice[]} offices  Array of offices to validate by name
 * @return {boolean}           Is the data valid
 */
export const validateOffice = (
  office: IOffice,
  dispatch: any,
  offices?: IOffice[],
): boolean => {
  let isOfficeNameCorrect;
  let isAddressCorrect;
  let isResponsibleCorrect;
  let isSecurityLevelCorrect;

  const infSystemNameBusy = offices?.find((item: IOffice) => item.name === office.name && office.id !== item.id);

  if (!office.name) {
    dispatch(setOfficeNameError(GENERAL_ERROR_MESSAGES.FIELD_EMPTY));

    isOfficeNameCorrect = false;
  } else if (infSystemNameBusy) {
    dispatch(setOfficeNameError(OBJECT_ERROR_MESSAGE.OFFICE_NAME_BUSY));

    isOfficeNameCorrect = false;
  } else {
    dispatch(setOfficeNameError(EMPTY_ERROR_MESSAGE));

    isOfficeNameCorrect = true;
  }

  if (!office.responsible_is) {
    dispatch(setOfficeResponsibleError(GENERAL_ERROR_MESSAGES.FIELD_EMPTY));

    isResponsibleCorrect = false;
  } else {
    dispatch(setOfficeResponsibleError(EMPTY_ERROR_MESSAGE));

    isResponsibleCorrect = true;
  }

  if (office.security_level === null || office.security_level === undefined || isNaN(office.security_level)) {
    dispatch(setOfficeSecurityLevelError(GENERAL_ERROR_MESSAGES.FIELD_EMPTY));

    isSecurityLevelCorrect = false;
  } else if (office.security_level < 0) {
    dispatch(setOfficeSecurityLevelError(GENERAL_ERROR_MESSAGES.NUMBER_NEGATIVE));

    isSecurityLevelCorrect = false;
  } else {
    dispatch(setOfficeSecurityLevelError(EMPTY_ERROR_MESSAGE));

    isSecurityLevelCorrect = true;
  }

  if (!office.address) {
    dispatch(setOfficeAddressError(GENERAL_ERROR_MESSAGES.FIELD_EMPTY));

    isAddressCorrect = false;
  } else {
    dispatch(setOfficeAddressError(EMPTY_ERROR_MESSAGE));

    isAddressCorrect = true;
  }

  return !!(isOfficeNameCorrect && isAddressCorrect && isResponsibleCorrect && isSecurityLevelCorrect);
};
