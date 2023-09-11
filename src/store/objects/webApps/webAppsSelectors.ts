import {RootState} from '../../storeTypes';

export const selectWebApp = (state: RootState) => state.objects.webApp;
export const selectWebAppById = (state: RootState) => state.objects.webApp.webAppById;
export const selectWebAppErrors = (state: RootState) => state.objects.errors.webAppErrors;
