import {RootState} from '../../storeTypes';

export const selectExternal = (state: RootState) => state.objects.external;
export const selectExternalById = (state: RootState) => state.objects.external.externalById;
export const selectExternalErrors = (state: RootState) => state.objects.errors.externalErrors;
