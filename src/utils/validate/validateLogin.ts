import {AUTH_ERROR_MESSAGES, EMPTY_ERROR_MESSAGE} from '../../constants/errors';
import {ILoginRequest} from '../../store/auth/authTypes';
import {setPasswordError, setUsernameError} from '../../store/auth/authSlice';

/**
 * return is the data valid
 * @param {ILoginRequest} data  Validation data
 * @param {any} dispatch        Dispatcher to change values in the store
 * @return {boolean}            Is the data valid
 */
export const validateLogin = (data: ILoginRequest, dispatch: any): boolean => {
  let isUsernameCorrect;
  let isPasswordCorrect;

  if (data.username.trim().length <= 6) {
    dispatch(setUsernameError(AUTH_ERROR_MESSAGES.USERNAME_LENGTH));

    isUsernameCorrect = false;
  } else {
    dispatch(setUsernameError(EMPTY_ERROR_MESSAGE));

    isUsernameCorrect = true;
  }

  if (data.password.trim().length <= 6) {
    dispatch(setPasswordError(AUTH_ERROR_MESSAGES.PASSWORD_LENGTH));

    isPasswordCorrect = false;
  } else {
    dispatch(setPasswordError(EMPTY_ERROR_MESSAGE));

    isPasswordCorrect = true;
  }

  return !!(isUsernameCorrect && isPasswordCorrect);
};
