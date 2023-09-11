import {getCookie} from '../utils/cookie/getCookie';

export const AUTH_URL = `${process.env.REACT_APP_API_URI}/api/v1/auth`;
export const USERS_URL = `${process.env.REACT_APP_API_URI}/api/v1/users`;

export const AUTH_ROUTES = {
  LOGIN: AUTH_URL + '/jwt/login',
  LOGOUT: AUTH_URL + '/jwt/logout',
  USER_INFO: USERS_URL + '/me',
};

export const AUTHORIZATION_USERNAME = 'Bearer';
export const AUTHORIZATION_TOKEN = getCookie('token') || null;
