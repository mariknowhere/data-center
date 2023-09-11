import {createAsyncThunk} from '@reduxjs/toolkit';

import axios from 'axios';

import {PROJECTS_ROUTES} from '../../constants/projects';


import {IEntityResponse, IGetOptionalRequest, IThunkApiConfigProps} from '../storeTypes';
import {AUTHORIZATION_TOKEN, AUTHORIZATION_USERNAME} from '../../constants/auth';
import {ROLES_ROUTES} from '../../constants/roles';
import {IUser} from '../auth/authTypes';

import {
  ICreateManagerRequest,
  ICreateProjectRequest,
  ICreateTeamleadRequest,
  IDeleteProjectResponse,
  IGetProjectLogsResponse,
  IGetProjectResponse, IManagerRequest, IManagerResponse,
  IProject,
  IProjectResponse,
  ITeamleadRequest,
  ITeamleadResponse, ManagerTypes,
  ProjectTypes,
  TeamleadTypes,
} from './projectsTypes';

export const getProjects = createAsyncThunk<IGetProjectResponse, IGetOptionalRequest, IThunkApiConfigProps>(
  ProjectTypes.GET,
  async ({ filters, pagination }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${PROJECTS_ROUTES.FULL_URL}/?${pagination ? pagination : 'offset=0&limit=10'}${filters ? `&${filters}` : ''}`,
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

export const getAllProjects = createAsyncThunk<IGetProjectResponse, IGetOptionalRequest, IThunkApiConfigProps>(
  ProjectTypes.GET_ALL,
  async ({ filters }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${PROJECTS_ROUTES.FULL_URL}/${filters ? `?${filters}` : ''}`,
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

export const getProjectById = createAsyncThunk<IProject, string, IThunkApiConfigProps>(
  ProjectTypes.GET_ONE,
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${PROJECTS_ROUTES.FULL_URL}/${id}`, {
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

export const getProjectLogs = createAsyncThunk<IGetProjectLogsResponse, string, IThunkApiConfigProps>(
  ProjectTypes.GET_LOGS,
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${PROJECTS_ROUTES.FULL_URL}/${id}/${PROJECTS_ROUTES.LOGS}`, {
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

export const restoreProject = createAsyncThunk<IEntityResponse, string, IThunkApiConfigProps>(
  ProjectTypes.RESTORE,
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${PROJECTS_ROUTES.FULL_URL}/${id}/${PROJECTS_ROUTES.RESTORE}`, {
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

export const createProject = createAsyncThunk<IProjectResponse, ICreateProjectRequest, IThunkApiConfigProps>(
  ProjectTypes.POST,
  async ({ project, customerId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${PROJECTS_ROUTES.FULL_URL}/?customer_id=${customerId}`,
        project,
        {
          headers: {
            'Authorization': `${AUTHORIZATION_USERNAME} ${AUTHORIZATION_TOKEN}`,
          },
        });

      return { project: response.data, status: response.status };
    } catch (error: any) {
      return rejectWithValue(error.response.status);
    }
  },
);

export const deleteProject = createAsyncThunk<IDeleteProjectResponse, string, IThunkApiConfigProps>(
  ProjectTypes.DELETE,
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${PROJECTS_ROUTES.FULL_URL}/${id}`, {
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

export const changeProject = createAsyncThunk<IProjectResponse, IProject, IThunkApiConfigProps>(
  ProjectTypes.PATCH,
  async (project: IProject, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${PROJECTS_ROUTES.FULL_URL}/${project.id}`, project, {
        headers: {
          'Authorization': `${AUTHORIZATION_USERNAME} ${AUTHORIZATION_TOKEN}`,
        },
      });

      return { project: response.data, status: response.status };
    } catch (error: any) {
      return rejectWithValue(error.response.status);
    }
  },
);



export const getTeamleads = createAsyncThunk<IUser[], undefined, IThunkApiConfigProps>(
  TeamleadTypes.GET,
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(ROLES_ROUTES.TEAMLEADS, {
        headers: {
          'Authorization': `${AUTHORIZATION_USERNAME} ${AUTHORIZATION_TOKEN}`,
        }});

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.status);
    }
  },
);

export const getTeamleadInfo = createAsyncThunk<IUser, ITeamleadRequest, IThunkApiConfigProps>(
  TeamleadTypes.GET_INFO,
  async ({ teamleadId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${ROLES_ROUTES.TEAMLEADS}/${teamleadId}`, {
        headers: {
          'Authorization': `${AUTHORIZATION_USERNAME} ${AUTHORIZATION_TOKEN}`,
        }});

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.status);
    }
  },
);

export const createTeamlead = createAsyncThunk<ITeamleadResponse, ICreateTeamleadRequest, IThunkApiConfigProps>(
  TeamleadTypes.POST,
  async ({ projectId, teamleadId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${PROJECTS_ROUTES.FULL_URL}/${projectId}/${ROLES_ROUTES.ASSIGN_TEAMLEAD}?teamlead_id=${teamleadId}`,
        undefined, {
          headers: {
            'Authorization': `${AUTHORIZATION_USERNAME} ${AUTHORIZATION_TOKEN}`,
          },
        });

      return { teamleadId, status: response.status };
    } catch (error: any) {
      return rejectWithValue(error.response.status);
    }
  },
);

export const deleteTeamlead = createAsyncThunk<IEntityResponse, string, IThunkApiConfigProps>(
  TeamleadTypes.DELETE,
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${PROJECTS_ROUTES.FULL_URL}/${id}/${ROLES_ROUTES.DELETE_TEAMLEAD}`, {
          headers: {
            'Authorization': `${AUTHORIZATION_USERNAME} ${AUTHORIZATION_TOKEN}`,
          }});

      return { status: response.status };
    } catch (error: any) {
      return rejectWithValue(error.response.status);
    }
  },
);



export const getManagers = createAsyncThunk<IUser[], undefined, IThunkApiConfigProps>(
  ManagerTypes.GET,
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(ROLES_ROUTES.MANAGERS, {
        headers: {
          'Authorization': `${AUTHORIZATION_USERNAME} ${AUTHORIZATION_TOKEN}`,
        }});

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.status);
    }
  },
);

export const getManagerInfo = createAsyncThunk<IUser, IManagerRequest, IThunkApiConfigProps>(
  ManagerTypes.GET_INFO,
  async ({ managerId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${ROLES_ROUTES.MANAGERS}/${managerId}`, {
        headers: {
          'Authorization': `${AUTHORIZATION_USERNAME} ${AUTHORIZATION_TOKEN}`,
        }});

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.status);
    }
  },
);

export const createManager = createAsyncThunk<IManagerResponse, ICreateManagerRequest, IThunkApiConfigProps>(
  ManagerTypes.POST,
  async ({ projectId, managerId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${PROJECTS_ROUTES.FULL_URL}/${projectId}/${ROLES_ROUTES.ASSIGN_MANAGER}?manager_id=${managerId}`,
        undefined, {
          headers: {
            'Authorization': `${AUTHORIZATION_USERNAME} ${AUTHORIZATION_TOKEN}`,
          },
        });

      return { managerId, status: response.status };
    } catch (error: any) {
      return rejectWithValue(error.response.status);
    }
  },
);

export const deleteManager = createAsyncThunk<IEntityResponse, string, IThunkApiConfigProps>(
  ManagerTypes.DELETE,
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${PROJECTS_ROUTES.FULL_URL}/${id}/${ROLES_ROUTES.DELETE_MANAGER}`, {
          headers: {
            'Authorization': `${AUTHORIZATION_USERNAME} ${AUTHORIZATION_TOKEN}`,
          }});

      return { status: response.status };
    } catch (error: any) {
      return rejectWithValue(error.response.status);
    }
  },
);
