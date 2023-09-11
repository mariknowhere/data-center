import {RootState} from '../../storeTypes';

export const selectInternal = (state: RootState) => state.objects.internal;
export const selectInternalById = (state: RootState) => state.objects.internal.internalById;
export const selectInternalErrors = (state: RootState) => state.objects.errors.internalErrors;
