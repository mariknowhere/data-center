import {createAsyncThunk} from '@reduxjs/toolkit';

import axios from 'axios';

import {IEntityResponse, IThunkApiConfigProps} from '../storeTypes';
import {AUTHORIZATION_TOKEN, AUTHORIZATION_USERNAME} from '../../constants/auth';

import {ANALYTIC_ROUTES} from '../../constants/analytics';

import {AnalyticsTypes, IGetProjectReportRequest, IReportResponse} from './analyticsTypes';

export const getVulnsReport = createAsyncThunk<IReportResponse, string, IThunkApiConfigProps>(
  AnalyticsTypes.GET_VULNS_REPORT,
  async (prepareVulnsReport, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${ANALYTIC_ROUTES.VULNS_REPORT}/?${prepareVulnsReport}`, {
          headers: {
            'Authorization': `${AUTHORIZATION_USERNAME} ${AUTHORIZATION_TOKEN}`,
          },
        });

      return { report: response.data, status: response.status };
    } catch (error: any) {
      return rejectWithValue(error.response.status);
    }
  },
);

export const getProjectReport = createAsyncThunk<IReportResponse, IGetProjectReportRequest, IThunkApiConfigProps>(
  AnalyticsTypes.GET_PROJECT_REPORT,
  async ({ name }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${ANALYTIC_ROUTES.PROJECT_REPORT}/?name=${name}`, {
          headers: {
            'Authorization': `${AUTHORIZATION_USERNAME} ${AUTHORIZATION_TOKEN}`,
          },
        });

      return { report: response.data, status: response.status };
    } catch (error: any) {
      return rejectWithValue(error.response.status);
    }
  },
);

export const uploadExcel = createAsyncThunk<IEntityResponse, FormData, IThunkApiConfigProps>(
  AnalyticsTypes.UPLOAD_EXCEL,
  async (files, { rejectWithValue }) => {
    try {
      const response = await axios.post(ANALYTIC_ROUTES.UPLOAD_EXCEL, files, {
        headers: {
          'Authorization': `${AUTHORIZATION_USERNAME} ${AUTHORIZATION_TOKEN}`,
        }});

      return { status: response.status };
    } catch (error: any) {
      return rejectWithValue(error.response.status);
    }
  },
);
