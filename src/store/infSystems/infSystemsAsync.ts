import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

import {AUTHORIZATION_TOKEN, AUTHORIZATION_USERNAME} from '../../constants/auth';
import {IGetOptionalRequest, IThunkApiConfigProps} from '../storeTypes';
import {CUSTOMER_ROUTES} from '../../constants/costumer';

import {INF_SYSTEMS_URL} from '../../constants/infSystems';

import {
  IChangeInfSystemRequest,
  ICreateInfSystemRequest,
  IDeleteInfSystemResponse,
  IGetInfSystemResponse,
  IInfSystem,
  IInfSystemByIdRequest,
  IInfSystemResponse,
  InfSystemsTypes,
} from './infSystemsTypes';

export const getInfSystems = createAsyncThunk<IGetInfSystemResponse, IGetOptionalRequest, IThunkApiConfigProps>(
  InfSystemsTypes.GET,
  async ({ id, filters , pagination }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${CUSTOMER_ROUTES.FULL_URL}/${id}/${INF_SYSTEMS_URL}/?${pagination ? pagination : 'offset=0&limit=10'}${filters ? `&${filters}` : ''}`,
        {
          headers: {
            'Authorization': `${AUTHORIZATION_USERNAME} ${AUTHORIZATION_TOKEN}`,
          },
        });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.status);
    }
  },
);

export const getAllInfSystems = createAsyncThunk<IGetInfSystemResponse, IGetOptionalRequest, IThunkApiConfigProps>(
  InfSystemsTypes.GET_ALL,
  async ({ filters, id }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${CUSTOMER_ROUTES.FULL_URL}/${id}/${INF_SYSTEMS_URL}/${filters ? `?${filters}` : ''}`,
        {
          headers: {
            'Authorization': `${AUTHORIZATION_USERNAME} ${AUTHORIZATION_TOKEN}`,
          },
        });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.status);
    }
  },
);

export const getInfSystemById = createAsyncThunk<IInfSystem, IInfSystemByIdRequest, IThunkApiConfigProps>(
  InfSystemsTypes.GET_ONE,
  async ({ customerId, infSystemId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${CUSTOMER_ROUTES.FULL_URL}/${customerId}/${INF_SYSTEMS_URL}/${infSystemId}`,
        {
          headers: {
            'Authorization': `${AUTHORIZATION_USERNAME} ${AUTHORIZATION_TOKEN}`,
          },
        });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.status);
    }
  },
);

export const createInfSystem = createAsyncThunk<IInfSystemResponse, ICreateInfSystemRequest, IThunkApiConfigProps>(
  InfSystemsTypes.POST,
  async ({ customerId, infSystem }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${CUSTOMER_ROUTES.FULL_URL}/${customerId}/${INF_SYSTEMS_URL}/`,
        infSystem, {
          headers: {
            'Authorization': `${AUTHORIZATION_USERNAME} ${AUTHORIZATION_TOKEN}`,
          },
        });

      return { infSystem: response.data, status: response.status };
    } catch (error: any) {
      return rejectWithValue(error.response.status);
    }
  },
);

export const deleteInfSystem = createAsyncThunk<IDeleteInfSystemResponse, IInfSystemByIdRequest, IThunkApiConfigProps>(
  InfSystemsTypes.DELETE,
  async ({ customerId, infSystemId }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${CUSTOMER_ROUTES.FULL_URL}/${customerId}/${INF_SYSTEMS_URL}/${infSystemId}`,
        {
          headers: {
            'Authorization': `${AUTHORIZATION_USERNAME} ${AUTHORIZATION_TOKEN}`,
          },
        });

      return { id: infSystemId, status: response.status };
    } catch (error: any) {
      return rejectWithValue(error.response.status);
    }
  },
);

export const changeInfSystem = createAsyncThunk<IInfSystemResponse, IChangeInfSystemRequest, IThunkApiConfigProps>(
  InfSystemsTypes.PATCH,
  async ({ customerId, infSystemId, infSystem }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${CUSTOMER_ROUTES.FULL_URL}/${customerId}/${INF_SYSTEMS_URL}/${infSystemId}`,
        infSystem, {
          headers: {
            'Authorization': `${AUTHORIZATION_USERNAME} ${AUTHORIZATION_TOKEN}`,
          },
        });

      return { infSystem: response.data, status: response.status };
    } catch (error: any) {
      return rejectWithValue(error.response.status);
    }
  },
);
