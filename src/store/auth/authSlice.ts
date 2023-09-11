import {createSlice} from '@reduxjs/toolkit';

import {isError} from '../storeHelpers';
import {getCookie} from '../../utils/cookie/getCookie';
import {setCookie} from '../../utils/cookie/setCookie';
import {deleteCookie} from '../../utils/cookie/deleteCookie';
import {ROUTES} from '../../router/routes';

import {getUserInfo, login, logout} from './authAsync';
import {IAuthState} from './authTypes';

const access_token = getCookie('token') || null;

const initialState: IAuthState = {
  authData: {
    access_token: access_token,
    token_type: null,
    isLoading: false,
    error: null,
    status: null,
  },
  profileData: {
    id: '',
    email: '',
    is_active: false,
    is_superuser: false,
    is_verified: false,
    first_name: '',
    role: '',
  },
  errors: {
    username_error: '',
    password_error: '',
  },
  isAuth: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUsernameError(state, action) {
      state.errors.username_error = action.payload;
    },
    setPasswordError(state, action) {
      state.errors.password_error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.authData.isLoading = false;
        state.authData.access_token = action.payload.access_token;
        state.authData.token_type = action.payload.token_type;
        state.authData.status = 203;

        setCookie('token', action.payload.access_token!, { 'max-age': 3600 });

        window.location.pathname = ROUTES.COMMON;
      })
      .addCase(login.pending, (state) => {
        state.authData.isLoading = true;
        state.authData.error = null;
        state.authData.status = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.authData.isLoading = false;
        state.authData.access_token = null;
        state.authData.status = 205;

        deleteCookie('token');
      })
      .addCase(logout.pending, (state) => {
        state.authData.isLoading = true;
        state.authData.error = null;
        state.authData.status = null;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.profileData = action.payload;
      })
      .addMatcher(isError, (state, action) => {
        state.authData.error = action.payload;
        state.authData.status = action.payload;
        state.authData.isLoading = false;
      });
  },
});

export const {
  setUsernameError,
  setPasswordError,
} = authSlice.actions;

export default authSlice.reducer;
