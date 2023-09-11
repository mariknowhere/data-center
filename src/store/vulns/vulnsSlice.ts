import {createSlice} from '@reduxjs/toolkit';

import {isError} from '../storeHelpers';

import {IVuln, IVulnsState} from './vulnsTypes';
import {
  changeVuln,
  createVuln,
  deleteVuln,
  deleteVulnScreenshot,
  deleteVulnScreenshots,
  getAllVulns,
  getVulnById,
  getVulns,
  getVulnScreenshots,
  uploadVulnScreenshots,
} from './vulnsAsync';

const initialState: IVulnsState = {
  vulns: [],
  allVulns: [],
  vulnById: {
    location: '',
    description: '',
    recommendations: '',
    cvss_score: 0,
    cvss_vector: '',
    risk_level: '',
    procedure_exploiting: '',
    name: '',
    negative_consequences: [],
  },
  errors: {
    location_error: '',
    description_error: '',
    recommendation_error: '',
    procedure_exploiting_error: '',
    vulnerability_name_error: '',
    negative_consequences_error: '',
    cve_id_error: '',
    cwe_id_error: '',

    attack_vector_error: '',
    attack_complexity_error: '',
    privileges_required_error: '',
    user_interaction_error: '',
    scope_error: '',
    confidentiality_error: '',
    integrity_error: '',
    availability_error: '',
  },
  isLoading: false,
  error: null,
  status: null,
  count: 0,
  selectTab: '',
};

export const vulnsSlice = createSlice({
  name: 'vulns',
  initialState,
  reducers: {
    setVulnSelectTab(state, action) {
      state.selectTab = action.payload;
    },

    setVulnLocationError(state, action) {
      state.errors.location_error = action.payload;
    },
    setVulnDescriptionError(state, action) {
      state.errors.description_error = action.payload;
    },
    setVulnRecommendationError(state, action) {
      state.errors.recommendation_error = action.payload;
    },
    setVulnProcedureExploitingError(state, action) {
      state.errors.procedure_exploiting_error = action.payload;
    },
    setVulnNameError(state, action) {
      state.errors.vulnerability_name_error = action.payload;
    },
    setVulnNegativeConsequencesError(state, action) {
      state.errors.negative_consequences_error = action.payload;
    },
    setCveIdError(state, action) {
      state.errors.cve_id_error = action.payload;
    },
    setCweIdError(state, action) {
      state.errors.cwe_id_error = action.payload;
    },

    setVulnAttackVectorError(state, action) {
      state.errors.attack_vector_error = action.payload;
    },
    setVulnAttackComplexityError(state, action) {
      state.errors.attack_complexity_error = action.payload;
    },
    setVulnPrivilegesRequiredError(state, action) {
      state.errors.privileges_required_error = action.payload;
    },
    setVulnUserInteractionError(state, action) {
      state.errors.user_interaction_error = action.payload;
    },
    setVulnScopeError(state, action) {
      state.errors.scope_error = action.payload;
    },
    setVulnConfidentialityError(state, action) {
      state.errors.confidentiality_error = action.payload;
    },
    setVulnIntegrityError(state, action) {
      state.errors.integrity_error = action.payload;
    },
    setVulnAvailabilityError(state, action) {
      state.errors.availability_error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getVulns.fulfilled, (state, action) => {
        state.isLoading = false;
        state.vulns = action.payload.data;

        state.count = action.payload.count;
      })
      .addCase(getVulns.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status = null;
      })
      .addCase(getAllVulns.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allVulns = action.payload.data;

        state.count = action.payload.count;
      })
      .addCase(createVuln.fulfilled, (state, action) => {
        state.isLoading = false;
        state.count += 1;
        state.status = action.payload.status;

        state.allVulns.push(action.payload.vuln);
        state.vulns.length < 10 && state.vulns.push(action.payload.vuln);
      })
      .addCase(createVuln.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status = null;
      })
      .addCase(changeVuln.fulfilled, (state, action) => {
        state.isLoading = false;

        state.vulns.forEach((vuln: IVuln) => {
          if (vuln.id === action.payload.vuln.id) {
            vuln.name = action.payload.vuln.name;
            vuln.procedure_exploiting = action.payload.vuln.procedure_exploiting;
            vuln.negative_consequences = action.payload.vuln.negative_consequences;
            vuln.recommendations = action.payload.vuln.recommendations;
            vuln.description = action.payload.vuln.description;
            vuln.location = action.payload.vuln.location;
            vuln.cve_id = action.payload.vuln.cve_id;
            vuln.cwe_id = action.payload.vuln.cwe_id;
            vuln.cvss_score = action.payload.vuln.cvss_score;
            vuln.cvss_vector = action.payload.vuln.cvss_vector;
            vuln.risk_level = action.payload.vuln.risk_level;
          }
        });

        state.allVulns.forEach((vuln: IVuln) => {
          if (vuln.id === action.payload.vuln.id) {
            vuln.name = action.payload.vuln.name;
            vuln.procedure_exploiting = action.payload.vuln.procedure_exploiting;
            vuln.negative_consequences = action.payload.vuln.negative_consequences;
            vuln.recommendations = action.payload.vuln.recommendations;
            vuln.description = action.payload.vuln.description;
            vuln.location = action.payload.vuln.location;
            vuln.cve_id = action.payload.vuln.cve_id;
            vuln.cwe_id = action.payload.vuln.cwe_id;
            vuln.cvss_score = action.payload.vuln.cvss_score;
            vuln.cvss_vector = action.payload.vuln.cvss_vector;
            vuln.risk_level = action.payload.vuln.risk_level;
          }
        });

        state.status = action.payload.status;
        state.vulnById = action.payload.vuln;
      })
      .addCase(changeVuln.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status = null;
      })
      .addCase(deleteVuln.fulfilled, (state, action) => {
        state.isLoading = false;
        state.count -= 1;

        state.status = action.payload.status;
        state.vulns = state.vulns.filter((vuln: IVuln) => vuln.id !== action.payload.id);
        state.allVulns = state.allVulns.filter((vuln: IVuln) => vuln.id !== action.payload.id);
      })
      .addCase(deleteVuln.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status = null;
      })
      .addCase(getVulnById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.vulnById = action.payload;
      })
      .addCase(getVulnById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status = null;
      })

      .addCase(uploadVulnScreenshots.fulfilled, (state, action) => {
        state.isLoading = false;

        action.payload.forEach((screenshot) => {
          state.vulnScreenshots ? state.vulnScreenshots.push(screenshot.id) : state.vulnScreenshots = [screenshot.id];
        });

        window.location.reload();
      })
      .addCase(getVulnScreenshots.fulfilled, (state, action) => {
        state.isLoading = false;
        state.vulnScreenshots = action.payload;
      })
      .addCase(deleteVulnScreenshots.fulfilled, (state) => {
        state.isLoading = false;

        state.vulnScreenshots = [];
      })
      .addCase(deleteVulnScreenshots.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status = null;
      })
      .addCase(deleteVulnScreenshot.fulfilled, (state, action) => {
        state.isLoading = false;

        state.vulnScreenshots = state.vulnScreenshots?.filter((screenshot: string) => screenshot !== action.payload);
      })
      .addCase(deleteVulnScreenshot.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status = null;
      })

      .addMatcher(isError, (state, action) => {
        state.error = action.payload;
        state.status = action.payload;
        state.isLoading = false;
      });
  },
});

export const {
  setVulnSelectTab,

  setVulnLocationError,
  setVulnDescriptionError,
  setVulnRecommendationError,
  setVulnNameError,
  setVulnProcedureExploitingError,
  setVulnNegativeConsequencesError,
  setCveIdError,
  setCweIdError,

  setVulnAvailabilityError,
  setVulnIntegrityError,
  setVulnConfidentialityError,
  setVulnScopeError,
  setVulnUserInteractionError,
  setVulnPrivilegesRequiredError,
  setVulnAttackComplexityError,
  setVulnAttackVectorError,
} = vulnsSlice.actions;

export default vulnsSlice.reducer;
