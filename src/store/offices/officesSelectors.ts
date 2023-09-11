import {RootState} from '../storeTypes';

export const selectOffices = (state: RootState) => state.offices;

export const selectOfficeById = (state: RootState) => state.offices.officeById;
export const selectOfficeErrors = (state: RootState) => state.offices.errors;
