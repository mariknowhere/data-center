import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

import {OBJECTS_ROUTES} from '../../constants/objects';
import {PROJECTS_ROUTES} from '../../constants/projects';

import {IEntityResponse, IGetOptionalRequest, IThunkApiConfigProps} from '../storeTypes';
import {AUTHORIZATION_TOKEN, AUTHORIZATION_USERNAME} from '../../constants/auth';
import {ROLES_ROUTES} from '../../constants/roles';
import {IUser} from '../auth/authTypes';

import {
  IChangeObjectResponse,
  ICount,
  ICreatePentesterRequest,
  IDeleteObjectResponse,
  IDeletePentesterRequest,
  IGetObjectLogsResponse,
  IGetObjectResponse,
  IGetObjectsResponse,
  IObjectResponse,
  IPentesterRequest,
  IRequestChangeObject,
  IRequestCreateObject,
  IRequestObjectById,
  ObjectTypes,
  PentersTypes,
} from './objectsTypes';

export const getObjects = createAsyncThunk<IGetObjectsResponse, IGetOptionalRequest, IThunkApiConfigProps>(
  ObjectTypes.GET,
  async ({id, objectType, filters, pagination}, {rejectWithValue}) => {
    try {
      const response = await axios.get(
        `${PROJECTS_ROUTES.FULL_URL}/${id}/${OBJECTS_ROUTES.URL}/${objectType}?${pagination ? pagination : 'offset=0&limit=10'}${filters ? `&${filters}` : ''}`,
        {
          headers: {
            'Authorization': `${AUTHORIZATION_USERNAME} ${AUTHORIZATION_TOKEN}`,
          },
        });

      return { data: response.data, objectType };
    } catch (error: any) {
      return rejectWithValue(error.response.status);
    }
  },
);

export const getAllObjects = createAsyncThunk<IGetObjectsResponse, IGetOptionalRequest, IThunkApiConfigProps>(
  ObjectTypes.GET_ALL,
  async ({id, objectType, filters}, {rejectWithValue}) => {
    try {
      const response = await axios.get(
        `${PROJECTS_ROUTES.FULL_URL}/${id}/${OBJECTS_ROUTES.URL}/${objectType}${filters ? `?${filters}` : ''}`,
        {
          headers: {
            'Authorization': `${AUTHORIZATION_USERNAME} ${AUTHORIZATION_TOKEN}`,
          },
        });

      return { data: response.data, objectType };
    } catch (error: any) {
      return rejectWithValue(error.response.status);
    }
  },
);

export const getBaseObjects = createAsyncThunk<IGetObjectsResponse, IGetOptionalRequest, IThunkApiConfigProps>(
  ObjectTypes.GET_BASE,
  async ({id, objectType, filters, pagination}, {rejectWithValue}) => {
    try {
      const response = await axios.get(
        `${PROJECTS_ROUTES.FULL_URL}/${id}/${OBJECTS_ROUTES.URL}/${OBJECTS_ROUTES.BASE}?${pagination ? pagination : 'offset=0&limit=10'}${filters ? `&${filters}` : ''}`,
        {
          headers: {
            'Authorization': `${AUTHORIZATION_USERNAME} ${AUTHORIZATION_TOKEN}`,
          },
        });

      return { data: response.data, objectType };
    } catch (error: any) {
      return rejectWithValue(error.response.status);
    }
  },
);

export const getObjectCounts = createAsyncThunk<ICount[], IGetOptionalRequest, IThunkApiConfigProps>(
  ObjectTypes.GET_COUNTS,
  async ({ id, filters}, {rejectWithValue}) => {
    try {
      const response = await axios.get(
        `${PROJECTS_ROUTES.FULL_URL}/${id}/${OBJECTS_ROUTES.URL}/${filters ? '?' + filters : ''}`,
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

export const getObjectById = createAsyncThunk<IGetObjectResponse, IRequestObjectById, IThunkApiConfigProps>(
  ObjectTypes.GET_ONE,
  async ({objectType, objectId, projectId}, {rejectWithValue}) => {
    try {
      const response = await axios.get(
        `${PROJECTS_ROUTES.FULL_URL}/${projectId}/${OBJECTS_ROUTES.URL}/${objectType}/${objectId}`,
        {
          headers: {
            'Authorization': `${AUTHORIZATION_USERNAME} ${AUTHORIZATION_TOKEN}`,
          },
        });

      return { object: response.data, objectType };
    } catch (error: any) {
      return rejectWithValue(error.response.status);
    }
  },
);

export const getObjectLogs = createAsyncThunk<IGetObjectLogsResponse, IRequestObjectById, IThunkApiConfigProps>(
  ObjectTypes.GET_LOGS,
  async ({objectType, objectId, projectId}, {rejectWithValue}) => {
    try {
      // @ts-ignore
      const response = await axios.get(
        `${PROJECTS_ROUTES.FULL_URL}/${projectId}/${OBJECTS_ROUTES.URL}/${objectType}/${objectId}/${PROJECTS_ROUTES.LOGS}`,
        {
          headers: {
            'Authorization': `${AUTHORIZATION_USERNAME} ${AUTHORIZATION_TOKEN}`,
          },
        });

      return { data: response.data.data, objectType };
    } catch (error: any) {
      return rejectWithValue(error.response.status);
    }
  },
);

export const createObject = createAsyncThunk<IObjectResponse, IRequestCreateObject, IThunkApiConfigProps>(
  ObjectTypes.POST,
  async ({ objectType, projectId, object }, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        `${PROJECTS_ROUTES.FULL_URL}/${projectId}/${OBJECTS_ROUTES.URL}/${objectType}`,
        object,
        {
          headers: {
            'Authorization': `${AUTHORIZATION_USERNAME} ${AUTHORIZATION_TOKEN}`,
          },
        });

      return { object: response.data, status: response.status, objectType };
    } catch (error: any) {
      return rejectWithValue(error.response.status);
    }
  },
);

export const deleteObject = createAsyncThunk<IDeleteObjectResponse, IRequestObjectById, IThunkApiConfigProps>(
  ObjectTypes.DELETE,
  async ({projectId, objectId, objectType}, {rejectWithValue}) => {
    try {
      const response = await axios.delete(
        `${PROJECTS_ROUTES.FULL_URL}/${projectId}/${OBJECTS_ROUTES.URL}/${objectType}/${objectId}`,
        {
          headers: {
            'Authorization': `${AUTHORIZATION_USERNAME} ${AUTHORIZATION_TOKEN}`,
          },
        });

      return { id: objectId, status: response.status, objectType };
    } catch (error: any) {
      return rejectWithValue(error.response.status);
    }
  },
);

export const changeObject = createAsyncThunk<IChangeObjectResponse, IRequestChangeObject, IThunkApiConfigProps>(
  ObjectTypes.PATCH,
  async ({projectId, objectType, objectId, object}, {rejectWithValue}) => {
    try {
      const response = await axios.patch(
        `${PROJECTS_ROUTES.FULL_URL}/${projectId}/${OBJECTS_ROUTES.URL}/${objectType}/${objectId}`,
        object,
        {
          headers: {
            'Authorization': `${AUTHORIZATION_USERNAME} ${AUTHORIZATION_TOKEN}`,
          },
        });

      return { object: response.data, status: response.status, objectType, currentObjectType: object.object_type };
    } catch (error: any) {
      return rejectWithValue(error.response.status);
    }
  },
);



export const getPentesters = createAsyncThunk<IUser[], string, IThunkApiConfigProps>(
  PentersTypes.GET,
  async (projectId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${ROLES_ROUTES.PENTESTERS}?project_id=${projectId}`, {
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

export const getPentesterInfo = createAsyncThunk<IUser, IPentesterRequest, IThunkApiConfigProps>(
  PentersTypes.GET_INFO,
  async ({ pentesterId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${ROLES_ROUTES.PENTESTERS}/${pentesterId}`, {
        headers: {
          'Authorization': `${AUTHORIZATION_USERNAME} ${AUTHORIZATION_TOKEN}`,
        }});

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.status);
    }
  },
);

export const createPentester = createAsyncThunk<IEntityResponse, IDeletePentesterRequest, IThunkApiConfigProps>(
  PentersTypes.POST,
  async ({ objectId, projectId, pentesterIds }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${OBJECTS_ROUTES.FULL_URL}/${objectId}/${ROLES_ROUTES.ASSIGN_PENTESTER}?project_id=${projectId}${pentesterIds}`,
        {},
        {
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

export const createPentesters = createAsyncThunk<IEntityResponse, ICreatePentesterRequest, IThunkApiConfigProps>(
  PentersTypes.POSTS,
  async ({ objectIds, projectId, pentesterIds }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${OBJECTS_ROUTES.FULL_URL}/${ROLES_ROUTES.ASSIGN_PENTESTER}?project_id=${projectId}${objectIds}${pentesterIds}`,
        {},
        {
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

export const deletePentester = createAsyncThunk<IEntityResponse, IDeletePentesterRequest, IThunkApiConfigProps>(
  PentersTypes.DELETE,
  async ({ objectId, projectId, pentesterIds }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${OBJECTS_ROUTES.FULL_URL}/${objectId}/${ROLES_ROUTES.DELETE_PENTESTER}?project_id=${projectId}${pentesterIds}`,
        {
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
