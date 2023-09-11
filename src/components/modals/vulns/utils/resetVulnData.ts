import {Dispatch, SetStateAction} from 'react';

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
} from '../../../../store/vulns/vulnsSlice';
import {IVuln} from '../../../../store/vulns/vulnsTypes';
import { EMPTY_ERROR_MESSAGE } from '../../../../constants/errors';
import {IPopupItem} from '../../../popup/PopupTypes';

/**
 *
 * @param {any} dispatch                                    Dispatcher to change values in the store
 * @param {Dispatch<SetStateAction<IVuln>>} setVuln         Setter for resetting vuln data
 * @param {Dispatch<SetStateAction<IPopupItem>>} setCvssAV  Setter for resetting cvssAV data
 * @param {Dispatch<SetStateAction<IPopupItem>>} setCvssAC  Setter for resetting cvssAC data
 * @param {Dispatch<SetStateAction<IPopupItem>>} setCvssPR  Setter for resetting cvssPR data
 * @param {Dispatch<SetStateAction<IPopupItem>>} setCvssUI  Setter for resetting cvssUI data
 * @param {Dispatch<SetStateAction<IPopupItem>>} setCvssS   Setter for resetting cvssS data
 * @param {Dispatch<SetStateAction<IPopupItem>>} setCvssC   Setter for resetting cvssC data
 * @param {Dispatch<SetStateAction<IPopupItem>>} setCvssI   Setter for resetting cvssI data
 * @param {Dispatch<SetStateAction<IPopupItem>>} setCvssA   Setter for resetting cvssA data
 * @param {Dispatch<SetStateAction<string>>} setCveId       Setter for resetting Cve ID data
 * @param {Dispatch<SetStateAction<string>>} setCweId       Setter for resetting Cwe ID data
 */
export const resetVulnData = (
  dispatch: any,
  setVuln: Dispatch<SetStateAction<IVuln>>,
  setCvssAV: Dispatch<SetStateAction<IPopupItem>>,
  setCvssAC: Dispatch<SetStateAction<IPopupItem>>,
  setCvssPR: Dispatch<SetStateAction<IPopupItem>>,
  setCvssUI: Dispatch<SetStateAction<IPopupItem>>,
  setCvssS: Dispatch<SetStateAction<IPopupItem>>,
  setCvssC: Dispatch<SetStateAction<IPopupItem>>,
  setCvssI: Dispatch<SetStateAction<IPopupItem>>,
  setCvssA: Dispatch<SetStateAction<IPopupItem>>,
  setCveId: Dispatch<SetStateAction<string>>,
  setCweId: Dispatch<SetStateAction<string>>,
) => {
  setVuln({
    cvss_score: NaN,
    cvss_vector: '',
    description: '',
    location: '',
    name: '',
    negative_consequences: [],
    procedure_exploiting: '',
    recommendations: '',
    risk_level: '',
  });

  setCveId('');
  setCweId('');

  setCvssAV({
    text: '',
    value: '',
  });
  setCvssAC({
    text: '',
    value: '',
  });
  setCvssPR({
    text: '',
    value: '',
  });
  setCvssUI({
    text: '',
    value: '',
  });
  setCvssS({
    text: '',
    value: '',
  });
  setCvssC({
    text: '',
    value: '',
  });
  setCvssI({
    text: '',
    value: '',
  });
  setCvssA({
    text: '',
    value: '',
  });

  dispatch(setVulnLocationError(EMPTY_ERROR_MESSAGE));
  dispatch(setVulnNameError(EMPTY_ERROR_MESSAGE));
  dispatch(setVulnDescriptionError(EMPTY_ERROR_MESSAGE));
  dispatch(setVulnRecommendationError(EMPTY_ERROR_MESSAGE));
  dispatch(setVulnProcedureExploitingError(EMPTY_ERROR_MESSAGE));
  dispatch(setVulnNegativeConsequencesError(EMPTY_ERROR_MESSAGE));
  dispatch(setCweIdError(EMPTY_ERROR_MESSAGE));
  dispatch(setCveIdError(EMPTY_ERROR_MESSAGE));

  dispatch(setVulnIntegrityError(EMPTY_ERROR_MESSAGE));
  dispatch(setVulnAvailabilityError(EMPTY_ERROR_MESSAGE));
  dispatch(setVulnConfidentialityError(EMPTY_ERROR_MESSAGE));
  dispatch(setVulnScopeError(EMPTY_ERROR_MESSAGE));
  dispatch(setVulnUserInteractionError(EMPTY_ERROR_MESSAGE));
  dispatch(setVulnPrivilegesRequiredError(EMPTY_ERROR_MESSAGE));
  dispatch(setVulnAttackComplexityError(EMPTY_ERROR_MESSAGE));
  dispatch(setVulnAttackVectorError(EMPTY_ERROR_MESSAGE));
};
