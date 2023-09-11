import {createAsyncThunk} from '@reduxjs/toolkit';

import axios from 'axios';

import {IThunkApiConfigProps} from '../storeTypes';
import {AUTHORIZATION_TOKEN, AUTHORIZATION_USERNAME} from '../../constants/auth';

import {VULNS_ROUTES} from '../../constants/vulns';
import {PROJECTS_ROUTES} from '../../constants/projects';
import {OBJECTS_ROUTES} from '../../constants/objects';

import {
  IChangeVulnRequest,
  ICreateVulnRequest, IDeleteScreenshotRequest,
  IDeleteVulnRequest,
  IDeleteVulnResponse, IGetVulnResponse,
  IUploadScreenshotsRequest,
  IUploadScreenshotsResponse,
  IVuln,
  IVulnRequest,
  IVulnResponse,
  VulnsTypes,
} from './vulnsTypes';

export const getVulns = createAsyncThunk<IGetVulnResponse, IVulnRequest, IThunkApiConfigProps>(
  VulnsTypes.GET,
  async ({ projectId, objectType, objectId, filters, pagination }, {rejectWithValue}) => {
    try {
      const response = await axios.get(
        `${PROJECTS_ROUTES.FULL_URL}/${projectId}/${OBJECTS_ROUTES.URL}/${objectType}/${objectId}/${VULNS_ROUTES.URL}/?${pagination ? pagination : 'offset=0&limit=10'}${filters ? `&${filters}` : ''}`,
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

export const getAllVulns = createAsyncThunk<IGetVulnResponse, IVulnRequest, IThunkApiConfigProps>(
  VulnsTypes.GET_ALL,
  async ({ projectId, objectType, objectId, filters, pagination }, {rejectWithValue}) => {
    try {
      const response = await axios.get(
        `${PROJECTS_ROUTES.FULL_URL}/${projectId}/${OBJECTS_ROUTES.URL}/${objectType}/${objectId}/${VULNS_ROUTES.URL}/${filters ? `?${filters}` : ''}`,
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

export const getVulnById = createAsyncThunk<IVuln, IDeleteVulnRequest, IThunkApiConfigProps>(
  VulnsTypes.GET_ONE,
  async ({ projectId, vulnId, objectId, objectType }, {rejectWithValue}) => {
    try {
      const response = await axios.get(
        `${PROJECTS_ROUTES.FULL_URL}/${projectId}/${OBJECTS_ROUTES.URL}/${objectType}/${objectId}/${VULNS_ROUTES.URL}/${vulnId}`,
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

export const createVuln = createAsyncThunk<IVulnResponse, ICreateVulnRequest, IThunkApiConfigProps>(
  VulnsTypes.POST,
  async ({ objectId, objectType, vuln, projectId }, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        `${PROJECTS_ROUTES.FULL_URL}/${projectId}/${OBJECTS_ROUTES.URL}/${objectType}/${objectId}/${VULNS_ROUTES.URL}/`,
        vuln,
        {
          headers: {
            'Authorization': `${AUTHORIZATION_USERNAME} ${AUTHORIZATION_TOKEN}`,
          },
        });

      return { vuln: response.data, status: response.status };
    } catch (error: any) {
      return rejectWithValue(error.response.status);
    }
  },
);

export const deleteVuln = createAsyncThunk<IDeleteVulnResponse, IDeleteVulnRequest, IThunkApiConfigProps>(
  VulnsTypes.DELETE,
  async ({ projectId, vulnId, objectId, objectType }, {rejectWithValue}) => {
    try {
      const response = await axios.delete(
        `${PROJECTS_ROUTES.FULL_URL}/${projectId}/${OBJECTS_ROUTES.URL}/${objectType}/${objectId}/${VULNS_ROUTES.URL}/${vulnId}`,
        {
          headers: {
            'Authorization': `${AUTHORIZATION_USERNAME} ${AUTHORIZATION_TOKEN}`,
          },
        });

      return { id: vulnId, status: response.status };
    } catch (error: any) {
      return rejectWithValue(error.response.status);
    }
  },
);

export const changeVuln = createAsyncThunk<IVulnResponse, IChangeVulnRequest, IThunkApiConfigProps>(
  VulnsTypes.PATCH,
  async ({ vuln, projectId, objectType, objectId, vulnId }, {rejectWithValue}) => {
    try {
      const response = await axios.patch(
        `${PROJECTS_ROUTES.FULL_URL}/${projectId}/${OBJECTS_ROUTES.URL}/${objectType}/${objectId}/${VULNS_ROUTES.URL}/${vulnId}`,
        vuln,
        {
          headers: {
            'Authorization': `${AUTHORIZATION_USERNAME} ${AUTHORIZATION_TOKEN}`,
          },
        });

      return { vuln: response.data, status: response.status };
    } catch (error: any) {
      return rejectWithValue(error.response.status);
    }
  },
);



export const uploadVulnScreenshots = createAsyncThunk<IUploadScreenshotsResponse[], IUploadScreenshotsRequest, IThunkApiConfigProps>(
  VulnsTypes.UPLOAD,
  async ({ files, projectId, vulnId, objectId, objectType }, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        `${PROJECTS_ROUTES.FULL_URL}/${projectId}/${OBJECTS_ROUTES.URL}/${objectType}/${objectId}/${VULNS_ROUTES.URL}/${vulnId}/${VULNS_ROUTES.UPLOAD_SCREENSHOTS}`,
        files,
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

export const getVulnScreenshots = createAsyncThunk<string[], IDeleteVulnRequest, IThunkApiConfigProps>(
  VulnsTypes.GET_SCREENSHOTS,
  async ({ projectId, vulnId, objectId, objectType }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${PROJECTS_ROUTES.FULL_URL}/${projectId}/${OBJECTS_ROUTES.URL}/${objectType}/${objectId}/${VULNS_ROUTES.URL}/${vulnId}/${VULNS_ROUTES.SCREENSHOTS}`,
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

export const deleteVulnScreenshots = createAsyncThunk<[], IDeleteVulnRequest, IThunkApiConfigProps>(
  VulnsTypes.DELETE_SCREENSHOTS,
  async ({ projectId, vulnId, objectId, objectType }, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${PROJECTS_ROUTES.FULL_URL}/${projectId}/${OBJECTS_ROUTES.URL}/${objectType}/${objectId}/${VULNS_ROUTES.URL}/${vulnId}/${VULNS_ROUTES.DELETE_SCREENSHOTS}`,
        {
          headers: {
            'Authorization': `${AUTHORIZATION_USERNAME} ${AUTHORIZATION_TOKEN}`,
          },
        });

      return [];
    } catch (error: any) {
      return rejectWithValue(error.response.status);
    }
  },
);

export const deleteVulnScreenshot = createAsyncThunk<string, IDeleteScreenshotRequest, IThunkApiConfigProps>(
  VulnsTypes.DELETE_SCREENSHOT,
  async ({ projectId, vulnId, objectId, objectType, screenId, fullScreenId }, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${PROJECTS_ROUTES.FULL_URL}/${projectId}/${OBJECTS_ROUTES.URL}/${objectType}/${objectId}/${VULNS_ROUTES.URL}/${vulnId}/${VULNS_ROUTES.DELETE_SCREENSHOT}/${screenId}`,
        {
          headers: {
            'Authorization': `${AUTHORIZATION_USERNAME} ${AUTHORIZATION_TOKEN}`,
          },
        });

      return fullScreenId;
    } catch (error: any) {
      return rejectWithValue(error.response.status);
    }
  },
);
