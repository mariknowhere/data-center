import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

import {IEntityResponse, IGetOptionalRequest, IThunkApiConfigProps} from '../storeTypes';
import {AUTHORIZATION_TOKEN, AUTHORIZATION_USERNAME} from '../../constants/auth';

import {CUSTOMER_ROUTES} from '../../constants/costumer';

import {
  CustomerTypes,
  ICustomer,
  ICustomerRequest,
  ICustomerResponse,
  IDeleteCustomerResponse,
  IGetCustomerResponse,
} from './customersTypes';

export const getCustomers = createAsyncThunk<IGetCustomerResponse, IGetOptionalRequest, IThunkApiConfigProps>(
  CustomerTypes.GET,
  async ({ filters, pagination }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${CUSTOMER_ROUTES.FULL_URL}/?${pagination ? pagination : 'offset=0&limit=10'}${filters ? `&${filters}` : ''}`,
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

export const getAllCustomers = createAsyncThunk<IGetCustomerResponse, IGetOptionalRequest, IThunkApiConfigProps>(
  CustomerTypes.GET_ALL,
  async ({ filters }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${CUSTOMER_ROUTES.FULL_URL}/${filters ? `?${filters}` : ''}`, {
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

export const getCustomerById = createAsyncThunk<ICustomer, string, IThunkApiConfigProps>(
  CustomerTypes.GET_ONE,
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${CUSTOMER_ROUTES.FULL_URL}/${id}`, {
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

export const restoreCustomer = createAsyncThunk<IEntityResponse, string, IThunkApiConfigProps>(
  CustomerTypes.RESTORE,
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${CUSTOMER_ROUTES.FULL_URL}/${id}/${CUSTOMER_ROUTES.RESTORE}`, {
          headers: {
            'Authorization': `${AUTHORIZATION_USERNAME} ${AUTHORIZATION_TOKEN}`,
          },
        });

      return { status: response.status };
    } catch (error: any) {
      return rejectWithValue(error.response.status);
    }
  },
);

export const createCustomer = createAsyncThunk<ICustomerResponse, ICustomer, IThunkApiConfigProps>(
  CustomerTypes.POST,
  async (customer: ICustomer, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${CUSTOMER_ROUTES.FULL_URL}/`, customer, {
        headers: {
          'Authorization': `${AUTHORIZATION_USERNAME} ${AUTHORIZATION_TOKEN}`,
        },
      });

      return { customer: response.data, status: response.status };
    } catch (error: any) {
      return rejectWithValue(error.response.status);
    }
  },
);

export const deleteCustomer = createAsyncThunk<IDeleteCustomerResponse, string, IThunkApiConfigProps>(
  CustomerTypes.DELETE,
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${CUSTOMER_ROUTES.FULL_URL}/${id}`, {
        headers: {
          'Authorization': `${AUTHORIZATION_USERNAME} ${AUTHORIZATION_TOKEN}`,
        },
      });

      return { id, status: response.status };
    } catch (error: any) {
      return rejectWithValue(error.response.status);
    }
  },
);

export const changeCustomer = createAsyncThunk<ICustomerResponse, ICustomerRequest, IThunkApiConfigProps>(
  CustomerTypes.PATCH,
  async ({ customer, customerId }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${CUSTOMER_ROUTES.FULL_URL}/${customerId}`, customer, {
          headers: {
            'Authorization': `${AUTHORIZATION_USERNAME} ${AUTHORIZATION_TOKEN}`,
          },
        });

      return { customer: response.data, status: response.status };
    } catch (error: any) {
      return rejectWithValue(error.response.status);
    }
  },
);
