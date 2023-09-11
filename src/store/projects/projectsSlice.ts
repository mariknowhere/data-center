import {createSlice} from '@reduxjs/toolkit';

import {isError} from '../storeHelpers';

import {localization} from '../../localization/localization';

import {
  changeProject, createManager,
  createProject, createTeamlead, deleteManager,
  deleteProject, deleteTeamlead,
  getAllProjects, getManagerInfo, getManagers,
  getProjectById, getProjectLogs,
  getProjects, getTeamleadInfo,
  getTeamleads,
  restoreProject,
} from './projectsAsync';
import {IProject, IProjectsState} from './projectsTypes';

const initialState: IProjectsState = {
  projects: [],
  allProjects: [],
  projectById: {
    name: '',
    start_date: '',
    end_date: '',
    gos_order_number: '',
    gos_order_date: '',
  },
  logs: [],
  errors: {
    customer_name_error: '',
    project_name_error: '',
    start_date_error: '',
    end_date_error: '',
    gos_order_number_error: '',
    gos_order_date_error: '',
  },
  teamleads: [],
  managers: [],
  isLoading: false,
  error: null,
  status: null,
  notificationTitle: '',
  count: 0,
  isProjectChanged: false,
};

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjectChanged(state, action) {
      state.isProjectChanged = action.payload;
    },

    setProjectCustomerNameError(state, action) {
      state.errors.customer_name_error = action.payload;
    },
    setProjectNameError(state, action) {
      state.errors.project_name_error = action.payload;
    },
    setProjectStartDateError(state, action) {
      state.errors.start_date_error = action.payload;
    },
    setProjectEndDateError(state, action) {
      state.errors.end_date_error = action.payload;
    },
    setProjectGosOrderNumberError(state, action) {
      state.errors.gos_order_number_error = action.payload;
    },
    setProjectGosOrderDateError(state, action) {
      state.errors.gos_order_date_error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projects = action.payload.data;

        state.count = action.payload.count;
      })
      .addCase(getProjects.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status = null;
      })
      .addCase(getAllProjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allProjects = action.payload.data;

        state.count = action.payload.count;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notificationTitle = localization.project.notificationProjectTitle;

        state.status = action.payload.status;
        state.count += 1;

        state.allProjects.push(action.payload.project);
        state.projects.length < 10 && state.projects.push(action.payload.project);
      })
      .addCase(createProject.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status = null;
      })
      .addCase(changeProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notificationTitle = localization.project.notificationProjectTitle;
        state.isProjectChanged = true;

        state.projects.forEach((project: IProject) => {
          if (project.id === action.payload.project.id) {
            project.start_date = action.payload.project.start_date;
            project.end_date = action.payload.project.end_date;
            project.gos_order_number = action.payload.project.gos_order_number;
            project.gos_order_date = action.payload.project.gos_order_date;
          }
        });

        state.allProjects.forEach((project: IProject) => {
          if (project.id === action.payload.project.id) {
            project.start_date = action.payload.project.start_date;
            project.end_date = action.payload.project.end_date;
            project.gos_order_number = action.payload.project.gos_order_number;
            project.gos_order_date = action.payload.project.gos_order_date;
          }
        });

        state.status = action.payload.status;
        state.projectById = action.payload.project;
      })
      .addCase(changeProject.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status = null;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notificationTitle = localization.project.notificationProjectTitle;
        state.count -= 1;

        state.status = action.payload.status;
        state.projects = state.projects.filter((project: IProject) => project.id !== action.payload.id);
        state.allProjects = state.allProjects.filter((project: IProject) => project.id !== action.payload.id);
      })
      .addCase(deleteProject.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status = null;
      })
      .addCase(getProjectById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projectById = action.payload;
      })
      .addCase(getProjectById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status = null;
        state.logs = [];
      })
      .addCase(getProjectLogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.logs = action.payload.data;
      })
      .addCase(getProjectLogs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status = null;
      })
      .addCase(restoreProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projectById.is_delete = false;
        state.status = action.payload.status;
      })
      .addCase(restoreProject.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status = null;
      })

      .addCase(getTeamleads.fulfilled, (state, action) => {
        state.isLoading = false;
        state.teamleads = action.payload;
      })
      .addCase(createTeamlead.fulfilled, (state) => {
        state.isLoading = false;
        state.notificationTitle = localization.project.notificationTeamleadTitle;
        state.status = 206;
      })
      .addCase(createTeamlead.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status = null;
      })
      .addCase(getTeamleadInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projectById.teamlead = action.payload;
      })
      .addCase(deleteTeamlead.fulfilled, (state) => {
        state.isLoading = false;
        state.notificationTitle = localization.project.notificationTeamleadTitle;

        state.status = 207;
        state.projectById.teamlead = { id: '', email: '', first_name: '' };
      })
      .addCase(deleteTeamlead.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status = null;
      })

      .addCase(getManagers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.managers = action.payload;
      })
      .addCase(createManager.fulfilled, (state) => {
        state.isLoading = false;
        state.notificationTitle = localization.project.notificationManagerTitle;
        state.status = 206;
      })
      .addCase(createManager.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status = null;
      })
      .addCase(getManagerInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projectById.manager = action.payload;
      })
      .addCase(deleteManager.fulfilled, (state) => {
        state.isLoading = false;
        state.notificationTitle = localization.project.notificationManagerTitle;

        state.status = 207;
        state.projectById.manager = { id: '', email: '', first_name: '' };
      })
      .addCase(deleteManager.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status = null;
      })

      .addMatcher(isError, (state, action) => {
        state.error = action.payload;
        state.status = action.payload;

        state.isLoading = false;
      });
  },
});

export const {
  setProjectChanged,

  setProjectCustomerNameError,
  setProjectNameError,
  setProjectStartDateError,
  setProjectEndDateError,
  setProjectGosOrderNumberError,
  setProjectGosOrderDateError,
} = projectsSlice.actions;

export default projectsSlice.reducer;
