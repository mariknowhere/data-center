import {createAsyncThunk} from '@reduxjs/toolkit';

import axios from 'axios';

import {AUTHORIZATION_TOKEN, AUTHORIZATION_USERNAME} from '../../constants/auth';
import {IGetOptionalRequest, IThunkApiConfigProps} from '../storeTypes';
import {CUSTOMER_ROUTES} from '../../constants/costumer';
import {OFFICES_URL} from '../../constants/offices';

import {
  IChangeOfficeRequest,
  ICreateOfficeRequest,
  IDeleteOfficeResponse,
  IGetOfficeResponse,
  IOffice,
  IOfficeByIdRequest,
  IOfficeResponse,
  OfficesTypes,
} from './officesTypes';

export const getOffices = createAsyncThunk<IGetOfficeResponse, IGetOptionalRequest, IThunkApiConfigProps>(
  OfficesTypes.GET,
  async ({ id, filters, pagination }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${CUSTOMER_ROUTES.FULL_URL}/${id}/${OFFICES_URL}/?${pagination ? pagination : 'offset=0&limit=10'}${filters ? `&${filters}` : ''}`,
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

export const getAllOffices = createAsyncThunk<IGetOfficeResponse, IGetOptionalRequest, IThunkApiConfigProps>(
  OfficesTypes.GET_ALL,
  async ({ id, filters }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${CUSTOMER_ROUTES.FULL_URL}/${id}/${OFFICES_URL}/${filters ? `?${filters}` : ''}`,
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

export const getOfficeById = createAsyncThunk<IOffice, IOfficeByIdRequest, IThunkApiConfigProps>(
  OfficesTypes.GET_ONE,
  async ({ customerId, officeId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${CUSTOMER_ROUTES.FULL_URL}/${customerId}/${OFFICES_URL}/${officeId}`,
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

export const createOffice = createAsyncThunk<IOfficeResponse, ICreateOfficeRequest, IThunkApiConfigProps>(
  OfficesTypes.POST,
  async ({ customerId, office }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${CUSTOMER_ROUTES.FULL_URL}/${customerId}/${OFFICES_URL}/`,
        office, {
          headers: {
            'Authorization': `${AUTHORIZATION_USERNAME} ${AUTHORIZATION_TOKEN}`,
          },
        });

      return { office: response.data, status: response.status };
    } catch (error: any) {
      return rejectWithValue(error.response.status);
    }
  },
);

export const deleteOffice = createAsyncThunk<IDeleteOfficeResponse, IOfficeByIdRequest, IThunkApiConfigProps>(
  OfficesTypes.DELETE,
  async ({ customerId, officeId }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${CUSTOMER_ROUTES.FULL_URL}/${customerId}/${OFFICES_URL}/${officeId}`,
        {
          headers: {
            'Authorization': `${AUTHORIZATION_USERNAME} ${AUTHORIZATION_TOKEN}`,
          },
        });

      return { id: officeId, office: response.data, status: response.status };
    } catch (error: any) {
      return rejectWithValue(error.response.status);
    }
  },
);

export const changeOffice = createAsyncThunk<IOfficeResponse, IChangeOfficeRequest, IThunkApiConfigProps>(
  OfficesTypes.PATCH,
  async ({ customerId, officeId, office }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${CUSTOMER_ROUTES.FULL_URL}/${customerId}/${OFFICES_URL}/${officeId}`,
        office,
        {
          headers: {
            'Authorization': `${AUTHORIZATION_USERNAME} ${AUTHORIZATION_TOKEN}`,
          },
        });

      return { office: response.data, status: response.status };
    } catch (error: any) {
      return rejectWithValue(error.response.status);
    }
  },
);
