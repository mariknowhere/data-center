import {Dispatch, SetStateAction} from 'react';

import {
  prepareAttackComplexity,
  prepareAttackVector,
  prepareOtherCVSS,
  prepareUserInteraction,
} from '../../../../constants/vulns';
import {CvssPRTypes, CvssSTypes, IVuln} from '../../../../store/vulns/vulnsTypes';
import {IPopupItem} from '../../../popup/PopupTypes';
import {roundup} from '../../../../utils/calculate/roundup';

/**
 *
 * @param {IVuln} vuln                               Vulnerability for destructuring into a setter
 * @param {Dispatch<SetStateAction<IVuln>>} setVuln  Setter for changing the data of a vulnerability
 * @param {IPopupItem} cvssAV                        СvssAV value for calculating risk level, svss score and cvss vector
 * @param {IPopupItem} cvssAC                        СvssAC value for calculating risk level, svss score and cvss vector
 * @param {IPopupItem} cvssPR                        СvssPR value for calculating risk level, svss score and cvss vector
 * @param {IPopupItem} cvssUI                        СvssUI value for calculating risk level, svss score and cvss vector
 * @param {IPopupItem} cvssS                         СvssS value for calculating risk level, svss score and cvss vector
 * @param {IPopupItem} cvssC                         СvssC value for calculating risk level, svss score and cvss vector
 * @param {IPopupItem} cvssI                         СvssI value for calculating risk level, svss score and cvss vector
 * @param {IPopupItem} cvssA                         СvssA value for calculating risk level, svss score and cvss vector
 */
export const calculateCvss = (
  vuln: IVuln,
  setVuln: Dispatch<SetStateAction<IVuln>>,
  cvssAV: IPopupItem,
  cvssAC: IPopupItem,
  cvssPR: IPopupItem,
  cvssUI: IPopupItem,
  cvssS: IPopupItem,
  cvssC: IPopupItem,
  cvssI: IPopupItem,
  cvssA: IPopupItem,
) => {
  if (cvssAV.value && cvssAC.value && cvssPR.value && cvssUI.value && cvssS.value && cvssC.value && cvssI.value && cvssA.value) {
    const cvssVector = `CVSS:3.1/${cvssAV.value}/${cvssAC.value}/${cvssPR.value}/${cvssUI.value}/${cvssS.value}/C:${cvssC.value}/I:${cvssI.value}/A:${cvssA.value}`;

    const attackVector = prepareAttackVector[cvssAV.value];
    const attackComplexity = prepareAttackComplexity[cvssAC.value];
    const userInteraction = prepareUserInteraction[cvssUI.value];
    let privilegesRequired = 0;

    const confidentiality = prepareOtherCVSS[cvssC.value];
    const integrity = prepareOtherCVSS[cvssI.value];
    const availability = prepareOtherCVSS[cvssA.value];

    switch (cvssPR.value) {
    case CvssPRTypes.N: {
      privilegesRequired = 0.85;

      break;
    }

    case CvssPRTypes.L: {
      privilegesRequired = cvssS.value === CvssSTypes.C ? 0.68 : 0.62;

      break;
    }

    case CvssPRTypes.H: {
      privilegesRequired = cvssS.value === CvssSTypes.C ? 0.5 : 0.27;

      break;
    }
    }

    const ISS = 1 - ((1 - confidentiality) * (1 - integrity) * (1 - availability));
    const impact = cvssS.value === CvssSTypes.C ? 7.52 * (ISS - 0.029) - 3.25 * Math.pow((ISS - 0.02), 15) : 6.42 * ISS;
    const exploitability = 8.22 * attackVector * attackComplexity * privilegesRequired * userInteraction;

    const cvssScore = impact <= 0 ? 0 : cvssS.value === CvssSTypes.C ?
      roundup(Math.min(...[1.08 * (impact + exploitability), 10])) :
      roundup(Math.min(...[(impact + exploitability), 10]));

    if (cvssScore === 0) {
      setVuln({
        ...vuln,
        risk_level: 'info',
        cvss_vector: cvssVector,
        cvss_score: cvssScore,
      });
    } else if (cvssScore < 4 && cvssScore >= 0.1) {
      setVuln({
        ...vuln,
        risk_level: 'low',
        cvss_vector: cvssVector,
        cvss_score: cvssScore,
      });
    } else if (cvssScore >= 4 && cvssScore < 7) {
      setVuln({
        ...vuln,
        risk_level: 'medium',
        cvss_vector: cvssVector,
        cvss_score: cvssScore,
      });
    } else if (cvssScore >= 7 && cvssScore < 9) {
      setVuln({
        ...vuln,
        risk_level: 'high',
        cvss_vector: cvssVector,
        cvss_score: cvssScore,
      });
    } else if (cvssScore >= 9 && cvssScore <= 10) {
      setVuln({
        ...vuln,
        risk_level: 'critical',
        cvss_vector: cvssVector,
        cvss_score: cvssScore,
      });
    }
  } else {
    setVuln({ ...vuln, risk_level: '', cvss_score: 0, cvss_vector: '' });
  }
};
