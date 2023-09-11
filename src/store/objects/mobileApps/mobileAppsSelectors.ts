import {RootState} from '../../storeTypes';

export const selectMobileApp = (state: RootState) => state.objects.mobileApp;
export const selectMobileAppById = (state: RootState) => state.objects.mobileApp.mobileAppById;
export const selectMobileAppErrors = (state: RootState) => state.objects.errors.mobileAppErrors;
