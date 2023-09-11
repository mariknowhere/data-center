import {EMPTY_ERROR_MESSAGE, GENERAL_ERROR_MESSAGES, VULN_ERROR_MESSAGES} from '../../constants/errors';
import {IVuln} from '../../store/vulns/vulnsTypes';
import {
  setCveIdError,
  setCweIdError,
  setVulnAttackComplexityError,
  setVulnAttackVectorError,
  setVulnAvailabilityError,
  setVulnConfidentialityError,
  setVulnDescriptionError,
  setVulnIntegrityError,
  setVulnLocationError,
  setVulnNameError,
  setVulnNegativeConsequencesError,
  setVulnPrivilegesRequiredError,
  setVulnProcedureExploitingError,
  setVulnRecommendationError,
  setVulnScopeError,
  setVulnUserInteractionError,
} from '../../store/vulns/vulnsSlice';

import {IPopupItem} from '../../components/popup/PopupTypes';

import {validateCveId} from './general/validateCveId';

/**
 * return is the data valid
 * @param {IVuln} vuln              Validation data
 * @param {any} dispatch            Dispatcher to change values in the store
 * @param {IPopupItem[]} cvssItems  Array of cvss to validate for emptiness
 * @param {IVuln[]} vulns           Array of vulns to validate by name
 * @param {string} cveId            CveId for validation
 * @param {string} cweId            CweId for validation
 * @return {boolean}                Is the data valid
 */
export const validateVuln = (
  vuln: IVuln,
  dispatch: any,
  cvssItems: IPopupItem[],
  vulns?: IVuln[],
  cveId?: string,
  cweId?: string,
): boolean => {
  let isLocationCorrect;
  let isNameCorrect;
  let isDescriptionCorrect;
  let isRecommendationCorrect;
  let isProcedureExploitingCorrect;
  let isNegativeConsequencesCorrect;
  let isCveIdCorrect;
  let isCweIdCorrect;

  let isAttackVectorCorrect;
  let isAttackComplexityCorrect;
  let isPrivilegesRequiredCorrect;
  let isUserInteractionCorrect;
  let isScopeCorrect;
  let isConfidentialityCorrect;
  let isIntegrityCorrect;
  let isAvailabilityCorrect;

  const vulnerabilityNameBusy = vulns?.find((item: IVuln) => item.name === vuln.name && vuln.id !== item.id);

  let isCveIdFormatCorrect = true;

  const cveIds = cveId?.split(',');
  const prepareCveIds= cveIds?.map((cveId) => cveId.trim());

  const cweIds = cweId?.split(',');
  const prepareCweIds= cweIds?.map((cweId) => cweId.trim());

  prepareCveIds?.forEach((cveId) => {
    if (isCveIdFormatCorrect && cveId) {
      isCveIdFormatCorrect = validateCveId(cveId);
    }
  });

  if (!vuln.name) {
    dispatch(setVulnNameError(GENERAL_ERROR_MESSAGES.FIELD_EMPTY));

    isNameCorrect = false;
  } else if (vulnerabilityNameBusy) {
    dispatch(setVulnNameError(VULN_ERROR_MESSAGES.NAME_BUSY));

    isNameCorrect = false;
  } else {
    dispatch(setVulnNameError(EMPTY_ERROR_MESSAGE));

    isNameCorrect = true;
  }

  if (!vuln.location) {
    dispatch(setVulnLocationError(GENERAL_ERROR_MESSAGES.FIELD_EMPTY));

    isLocationCorrect = false;
  } else {
    dispatch(setVulnLocationError(EMPTY_ERROR_MESSAGE));

    isLocationCorrect = true;
  }

  if (!vuln.description) {
    dispatch(setVulnDescriptionError(GENERAL_ERROR_MESSAGES.FIELD_EMPTY));

    isDescriptionCorrect = false;
  } else {
    dispatch(setVulnDescriptionError(EMPTY_ERROR_MESSAGE));

    isDescriptionCorrect = true;
  }

  if (vuln.negative_consequences && vuln.negative_consequences.length === 0) {
    dispatch(setVulnNegativeConsequencesError(GENERAL_ERROR_MESSAGES.POPUP_EMPTY));

    isNegativeConsequencesCorrect = false;
  } else {
    dispatch(setVulnNegativeConsequencesError(EMPTY_ERROR_MESSAGE));

    isNegativeConsequencesCorrect = true;
  }

  if (!vuln.procedure_exploiting) {
    dispatch(setVulnProcedureExploitingError(GENERAL_ERROR_MESSAGES.FIELD_EMPTY));

    isProcedureExploitingCorrect = false;
  } else {
    dispatch(setVulnProcedureExploitingError(EMPTY_ERROR_MESSAGE));

    isProcedureExploitingCorrect = true;
  }

  if (!vuln.recommendations) {
    dispatch(setVulnRecommendationError(GENERAL_ERROR_MESSAGES.FIELD_EMPTY));

    isRecommendationCorrect = false;
  } else {
    dispatch(setVulnRecommendationError(EMPTY_ERROR_MESSAGE));

    isRecommendationCorrect = true;
  }

  if (!isCveIdFormatCorrect) {
    dispatch(setCveIdError(VULN_ERROR_MESSAGES.CVE_ID));

    isCveIdCorrect = false;
  } else {
    dispatch(setCveIdError(EMPTY_ERROR_MESSAGE));

    if (prepareCveIds && prepareCveIds[0]) {
      vuln.cve_id = prepareCveIds;
    }

    isCveIdCorrect = true;
  }

  if (prepareCweIds?.length !== 0) {
    dispatch(setCweIdError(EMPTY_ERROR_MESSAGE));

    if (prepareCweIds && prepareCweIds[0]) {
      vuln.cwe_id = prepareCweIds;
    }

    isCweIdCorrect = true;
  }

  if (!cvssItems[0].value) {
    dispatch(setVulnAttackVectorError(VULN_ERROR_MESSAGES.AC_EMPTY));

    isAttackVectorCorrect = false;
  } else {
    dispatch(setVulnAttackVectorError(EMPTY_ERROR_MESSAGE));

    isAttackVectorCorrect = true;
  }

  if (!cvssItems[1].value) {
    dispatch(setVulnAttackComplexityError(VULN_ERROR_MESSAGES.AV_EMPTY));

    isAttackComplexityCorrect = false;
  } else {
    dispatch(setVulnAttackComplexityError(EMPTY_ERROR_MESSAGE));

    isAttackComplexityCorrect = true;
  }

  if (!cvssItems[2].value) {
    dispatch(setVulnPrivilegesRequiredError(VULN_ERROR_MESSAGES.PR_EMPTY));

    isPrivilegesRequiredCorrect = false;
  } else {
    dispatch(setVulnPrivilegesRequiredError(EMPTY_ERROR_MESSAGE));

    isPrivilegesRequiredCorrect = true;
  }

  if (!cvssItems[3].value) {
    dispatch(setVulnUserInteractionError(VULN_ERROR_MESSAGES.UI_EMPTY));

    isUserInteractionCorrect = false;
  } else {
    dispatch(setVulnUserInteractionError(EMPTY_ERROR_MESSAGE));

    isUserInteractionCorrect = true;
  }

  if (!cvssItems[4].value) {
    dispatch(setVulnScopeError(VULN_ERROR_MESSAGES.S_EMPTY));

    isScopeCorrect = false;
  } else {
    dispatch(setVulnScopeError(EMPTY_ERROR_MESSAGE));

    isScopeCorrect = true;
  }

  if (!cvssItems[5].value) {
    dispatch(setVulnConfidentialityError(VULN_ERROR_MESSAGES.C_EMPTY));

    isConfidentialityCorrect = false;
  } else {
    dispatch(setVulnConfidentialityError(EMPTY_ERROR_MESSAGE));

    isConfidentialityCorrect = true;
  }

  if (!cvssItems[6].value) {
    dispatch(setVulnIntegrityError(VULN_ERROR_MESSAGES.I_EMPTY));

    isIntegrityCorrect = false;
  } else {
    dispatch(setVulnIntegrityError(EMPTY_ERROR_MESSAGE));

    isIntegrityCorrect = true;
  }

  if (!cvssItems[7].value) {
    dispatch(setVulnAvailabilityError(VULN_ERROR_MESSAGES.A_EMPTY));

    isAvailabilityCorrect = false;
  } else {
    dispatch(setVulnAvailabilityError(EMPTY_ERROR_MESSAGE));

    isAvailabilityCorrect = true;
  }

  return !!(isLocationCorrect && isNameCorrect && isAttackVectorCorrect && isAttackComplexityCorrect &&
    isPrivilegesRequiredCorrect && isUserInteractionCorrect && isScopeCorrect && isConfidentialityCorrect &&
    isIntegrityCorrect && isAvailabilityCorrect && isDescriptionCorrect && isRecommendationCorrect &&
    isProcedureExploitingCorrect && isNegativeConsequencesCorrect && isCveIdCorrect && isCweIdCorrect
  );
};
