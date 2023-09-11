import {RootState} from '../storeTypes';

export const selectAnalytics = (state: RootState) => state.analytics;
export const selectAnalyticsErrors = (state: RootState) => state.analytics.errors;
