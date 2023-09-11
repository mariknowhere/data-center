import {EMPTY_ERROR_MESSAGE, GENERAL_ERROR_MESSAGES, OBJECT_ERROR_MESSAGE} from '../../../constants/errors';
import {
  setMobileAppNameError,
  setMobileAppPlatformError,
  setMobileAppTestMethodError,
} from '../../../store/objects/objectsSlice';
import {IMobileApp} from '../../../store/objects/mobileApps/mobileAppsTypes';

/**
 * return is the data valid
 * @param {IMobileApp} object  Validation data
 * @param {any} dispatch       Dispatcher to change values in the store
 * @return {boolean}           Is the data valid
 */
export const validateMobileApp = (
  object: IMobileApp,
  dispatch: any,
): boolean => {
  let isAppNameCorrect;
  let isPlatformCorrect;
  let isTestMethodCorrect;

  if (!object.app_name) {
    dispatch(setMobileAppNameError(GENERAL_ERROR_MESSAGES.FIELD_EMPTY));

    isAppNameCorrect = false;
  } else {
    dispatch(setMobileAppNameError(EMPTY_ERROR_MESSAGE));

    isAppNameCorrect = true;
  }

  if (!object.platform_type) {
    dispatch(setMobileAppPlatformError(GENERAL_ERROR_MESSAGES.POPUP_EMPTY));

    isPlatformCorrect = false;
  } else {
    dispatch(setMobileAppPlatformError(EMPTY_ERROR_MESSAGE));

    isPlatformCorrect = true;
  }

  if (!object.greybox && !object.blackbox) {
    dispatch(setMobileAppTestMethodError(OBJECT_ERROR_MESSAGE.TEST_METHOD_EMPTY));

    isTestMethodCorrect = false;
  } else {
    dispatch(setMobileAppTestMethodError(EMPTY_ERROR_MESSAGE));

    isTestMethodCorrect = true;
  }

  return (isAppNameCorrect && isPlatformCorrect && isTestMethodCorrect);
};
