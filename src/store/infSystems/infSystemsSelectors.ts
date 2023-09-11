import {RootState} from '../storeTypes';

export const selectInfSystems = (state: RootState) => state.infSystems;

export const selectInfSystemById = (state: RootState) => state.infSystems.infSystemById;
export const selectInfSystemErrors = (state: RootState) => state.infSystems.errors;