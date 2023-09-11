import {RootState} from '../storeTypes';

export const selectVulns = (state: RootState) => state.vulns;
export const selectVulnById = (state: RootState) => state.vulns.vulnById;
export const selectVulnErrors = (state: RootState) => state.vulns.errors;