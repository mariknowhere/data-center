import {RootState} from '../../storeTypes';

export const selectServer = (state: RootState) => state.objects.server;
export const selectServerById = (state: RootState) => state.objects.server.serverById;
export const selectServerErrors = (state: RootState) => state.objects.errors.serverErrors;
