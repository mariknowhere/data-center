import {RootState} from '../storeTypes';

export const selectProjects = (state: RootState) => state.projects;
export const selectProjectById = (state: RootState) => state.projects.projectById;
export const selectProjectErrors = (state: RootState) => state.projects.errors;
