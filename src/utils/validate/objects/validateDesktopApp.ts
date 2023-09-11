import {EMPTY_ERROR_MESSAGE, GENERAL_ERROR_MESSAGES, OBJECT_ERROR_MESSAGE} from '../../../constants/errors';
import {
  setDesktopAppNameError,
  setDesktopAppPlatformTypeError,
  setDesktopAppTestMethodError,
} from '../../../store/objects/objectsSlice';
import {IDesktopApp} from '../../../store/objects/desktopApps/desktopAppsTypes';

/**
 * return is the data valid
 * @param {IDesktopApp} object  Validation data
 * @param {any} dispatch        Dispatcher to change values in the store
 * @return {boolean}            Is the data valid
 */
export const validateDesktopApp = (
  object: IDesktopApp,
  dispatch: any,
): boolean => {
  let isAppNameCorrect;
  let isPlatformTypeCorrect;
  let isTestMethodCorrect;

  if (!object.app_name) {
    dispatch(setDesktopAppNameError(GENERAL_ERROR_MESSAGES.FIELD_EMPTY));

    isAppNameCorrect = false;
  } else {
    dispatch(setDesktopAppNameError(EMPTY_ERROR_MESSAGE));

    isAppNameCorrect = true;
  }

  if (!object.platform_type) {
    dispatch(setDesktopAppPlatformTypeError(GENERAL_ERROR_MESSAGES.POPUP_EMPTY));

    isPlatformTypeCorrect = false;
  } else {
    dispatch(setDesktopAppPlatformTypeError(EMPTY_ERROR_MESSAGE));

    isPlatformTypeCorrect = true;
  }

  if (!object.greybox && !object.blackbox) {
    dispatch(setDesktopAppTestMethodError(OBJECT_ERROR_MESSAGE.TEST_METHOD_EMPTY));

    isTestMethodCorrect = false;
  } else {
    dispatch(setDesktopAppTestMethodError(EMPTY_ERROR_MESSAGE));

    isTestMethodCorrect = true;
  }

  return (isAppNameCorrect && isPlatformTypeCorrect && isTestMethodCorrect);
};
