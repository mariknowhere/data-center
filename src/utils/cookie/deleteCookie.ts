import {setCookie} from './setCookie';

/**
 *
 * @param {string} name  Key for cookie
 */
export const deleteCookie = (name: string) => {
  setCookie(name, '', {
    'max-age': -1,
  });
};
