import {createAsyncThunk} from '@reduxjs/toolkit';

import axios from 'axios';

import {AUTH_ROUTES, AUTHORIZATION_TOKEN, AUTHORIZATION_USERNAME} from '../../constants/auth';
import {IThunkApiConfigProps} from '../storeTypes';

import {AuthTypes, ILoginResponse, IUser} from './authTypes';

export const login = createAsyncThunk<ILoginResponse, string, IThunkApiConfigProps>(
  AuthTypes.LOGIN,
  async (account, { rejectWithValue }) => {
    try {
      const response = await axios.post(AUTH_ROUTES.LOGIN, account);

      return {
        access_token: response.data.access_token,
        token_type: response.data.token_type,
        status: response.status,
      };
    } catch (error: any) {
      return rejectWithValue(error.response.status);
    }
  },
);

export const logout = createAsyncThunk<string, undefined, IThunkApiConfigProps>(
  AuthTypes.LOGOUT,
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(AUTH_ROUTES.LOGOUT, _, {
        headers: {
          'Authorization': `${AUTHORIZATION_USERNAME} ${AUTHORIZATION_TOKEN}`,
        },
      });

      return response.data;
    } catch (error: any) {
      rejectWithValue(error.response.status);
    }
  },
);

export const getUserInfo = createAsyncThunk<IUser, undefined, IThunkApiConfigProps>(
  AuthTypes.USER_INFO,
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(AUTH_ROUTES.USER_INFO, {
        headers: {
          'Authorization': `${AUTHORIZATION_USERNAME} ${AUTHORIZATION_TOKEN}`,
        },
      });

      return response.data;
    } catch (error: any) {
      rejectWithValue(error.response.status);
    }
  },
);
