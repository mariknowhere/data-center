import {RootState} from '../storeTypes';

export const selectAuthToken = (state: RootState) => state.auth.authData.access_token;
export const selectAuthData = (state: RootState) => state.auth.authData;
export const selectProfileData = (state: RootState) => state.auth.profileData;
export const selectAuthErrors = (state: RootState) => state.auth.errors;
