import {createSlice} from '@reduxjs/toolkit';

import {isError} from '../storeHelpers';

import {PROJECT_REPORT_URL, VULNS_REPORT_URL} from '../../constants/other';

import {IAnalyticsState} from './analyticsTypes';
import {getProjectReport, getVulnsReport, uploadExcel} from './analyticsAsync';


const initialState: IAnalyticsState = {
  isLoading: false,
  error: null,
  status: null,
  errors: {
    object_types_error: '',
    start_date_error: '',
    end_date_error: '',
    num_employees_error: '',
    project_name_error: '',
    screenshots_error: '',
    excel_file_error: '',
  },
};

export const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    setAnalyticsObjectTypes(state, action)  {
      state.errors.object_types_error = action.payload;
    },
    setAnalyticsStartDate(state, action)  {
      state.errors.start_date_error = action.payload;
    },
    setAnalyticsEndDate(state, action)  {
      state.errors.end_date_error = action.payload;
    },
    setAnalyticsNumEmployees(state, action)  {
      state.errors.num_employees_error = action.payload;
    },
    setAnalyticsProjectName(state, action)  {
      state.errors.project_name_error = action.payload;
    },
    setAnalyticsScreenshotsError(state, action)  {
      state.errors.screenshots_error = action.payload;
    },
    setAnalyticsExcelFileError(state, action)  {
      state.errors.excel_file_error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getVulnsReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = 201;

        localStorage.setItem(VULNS_REPORT_URL, action.payload.report.msg);
        window.location.reload();
      })
      .addCase(getVulnsReport.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status = null;
      })
      .addCase(getProjectReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = 201;

        localStorage.setItem(PROJECT_REPORT_URL, action.payload.report.msg);

        setTimeout(() => {
          window.location.reload();
        }, 500);
      })
      .addCase(getProjectReport.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status = null;
      })
      .addCase(uploadExcel.fulfilled, (state) => {
        state.isLoading = false;
        state.status = 202;
      })
      .addCase(uploadExcel.pending, (state) => {
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
  setAnalyticsObjectTypes,
  setAnalyticsStartDate,
  setAnalyticsEndDate,
  setAnalyticsNumEmployees,
  setAnalyticsProjectName,
  setAnalyticsScreenshotsError,
  setAnalyticsExcelFileError,
} = analyticsSlice.actions;

export default analyticsSlice.reducer;
