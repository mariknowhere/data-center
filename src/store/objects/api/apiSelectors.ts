import {RootState} from '../../storeTypes';

export const selectApi = (state: RootState) => state.objects.api;
export const selectApiById = (state: RootState) => state.objects.api.apiById;
export const selectApiErrors = (state: RootState) => state.objects.errors.apiErrors;
