import {EMPTY_ERROR_MESSAGE, GENERAL_ERROR_MESSAGES, OBJECT_ERROR_MESSAGE} from '../../../constants/errors';
import {IInfSystem} from '../../../store/infSystems/infSystemsTypes';
import {
  setInfSystemContactPersonError,
  setInfSystemNameError,
  setInfSystemProductError,
  setInfSystemProductManagerError,
  setInfSystemSecurityLevelError,
  setInfSystemWebInterfaceAddressError,
} from '../../../store/infSystems/infSystemsSlice';

/**
 * return is the data valid
 * @param {IInfSystem} infSystem     Validation data
 * @param {any} dispatch             Dispatcher to change values in the store
 * @param {IInfSystem[]} infSystems  Array of inf systems to validate by name
 * @return {boolean}                 Is the data valid
 */
export const validateInfSystem = (
  infSystem: IInfSystem,
  dispatch: any,
  infSystems?: IInfSystem[],
): boolean => {
  let isInfSystemNameCorrect;
  let isWebInterfaceAddressCorrect;
  let isProductCorrect;
  let isSecurityLevelCorrect;
  let isProductManagerCorrect;
  let isContactPersonCorrect;

  const infSystemNameBusy =
    infSystems?.find((item: IInfSystem) => item.name === infSystem.name && infSystem.id !== item.id);

  if (!infSystem.name) {
    dispatch(setInfSystemNameError(GENERAL_ERROR_MESSAGES.FIELD_EMPTY));

    isInfSystemNameCorrect = false;
  } else if (infSystemNameBusy) {
    dispatch(setInfSystemNameError(OBJECT_ERROR_MESSAGE.INF_SYSTEM_BUSY));

    isInfSystemNameCorrect = false;
  } else {
    dispatch(setInfSystemNameError(EMPTY_ERROR_MESSAGE));

    isInfSystemNameCorrect = true;
  }

  if (!infSystem.product) {
    dispatch(setInfSystemProductError(GENERAL_ERROR_MESSAGES.FIELD_EMPTY));

    isProductCorrect = false;
  } else {
    dispatch(setInfSystemProductError(EMPTY_ERROR_MESSAGE));

    isProductCorrect = true;
  }

  if (infSystem.security_level === null || infSystem.security_level === undefined || isNaN(infSystem.security_level)) {
    dispatch(setInfSystemSecurityLevelError(GENERAL_ERROR_MESSAGES.FIELD_EMPTY));

    isSecurityLevelCorrect = false;
  } else if (infSystem.security_level < 0) {
    dispatch(setInfSystemSecurityLevelError(GENERAL_ERROR_MESSAGES.NUMBER_NEGATIVE));

    isSecurityLevelCorrect = false;
  } else {
    dispatch(setInfSystemSecurityLevelError(EMPTY_ERROR_MESSAGE));

    isSecurityLevelCorrect = true;
  }

  if (!infSystem.product_manager) {
    dispatch(setInfSystemProductManagerError(GENERAL_ERROR_MESSAGES.FIELD_EMPTY));

    isProductManagerCorrect = false;
  } else {
    dispatch(setInfSystemProductManagerError(EMPTY_ERROR_MESSAGE));

    isProductManagerCorrect = true;
  }

  if (!infSystem.web_interface_address) {
    dispatch(setInfSystemWebInterfaceAddressError(GENERAL_ERROR_MESSAGES.FIELD_EMPTY));

    isWebInterfaceAddressCorrect = false;
  } else {
    dispatch(setInfSystemWebInterfaceAddressError(EMPTY_ERROR_MESSAGE));

    isWebInterfaceAddressCorrect = true;
  }

  if (!infSystem.inf_system_contact_person) {
    dispatch(setInfSystemContactPersonError(GENERAL_ERROR_MESSAGES.FIELD_EMPTY));

    isContactPersonCorrect = false;
  } else {
    dispatch(setInfSystemContactPersonError(EMPTY_ERROR_MESSAGE));

    isContactPersonCorrect = true;
  }

  return !!(isInfSystemNameCorrect && isWebInterfaceAddressCorrect && isProductCorrect &&
    isSecurityLevelCorrect && isProductManagerCorrect && isContactPersonCorrect
  );
};
