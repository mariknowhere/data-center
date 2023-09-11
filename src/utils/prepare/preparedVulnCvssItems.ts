import {Dispatch, SetStateAction} from 'react';

import {
  prepareAttackComplexityToFull,
  prepareAttackVectorToFull, prepareOtherCVSSToFull,
  preparePrivilegesRequiredToFull, prepareScopeToFull, prepareUserInteractionToFull,
} from '../../constants/vulns';
import {IPopupItem} from '../../components/popup/PopupTypes';

/**
 *
 * @param {string} cvssVector                               Cvss vector vulnerability
 * @param {Dispatch<SetStateAction<IPopupItem>>} setCvssAV  Setter to change svssAV value
 * @param {Dispatch<SetStateAction<IPopupItem>>} setCvssAC  Setter to change svssAC value
 * @param {Dispatch<SetStateAction<IPopupItem>>} setCvssPR  Setter to change svssPR value
 * @param {Dispatch<SetStateAction<IPopupItem>>} setCvssUI  Setter to change svssUI value
 * @param {Dispatch<SetStateAction<IPopupItem>>} setCvssS   Setter to change svssS value
 * @param {Dispatch<SetStateAction<IPopupItem>>} setCvssC   Setter to change svssC value
 * @param {Dispatch<SetStateAction<IPopupItem>>} setCvssI   Setter to change svssI value
 * @param {Dispatch<SetStateAction<IPopupItem>>} setCvssA   Setter to change svssA value
 */
export const preparedVulnCvssItems = (
  cvssVector: string,
  setCvssAV: Dispatch<SetStateAction<IPopupItem>>,
  setCvssAC: Dispatch<SetStateAction<IPopupItem>>,
  setCvssPR: Dispatch<SetStateAction<IPopupItem>>,
  setCvssUI: Dispatch<SetStateAction<IPopupItem>>,
  setCvssS: Dispatch<SetStateAction<IPopupItem>>,
  setCvssC: Dispatch<SetStateAction<IPopupItem>>,
  setCvssI: Dispatch<SetStateAction<IPopupItem>>,
  setCvssA: Dispatch<SetStateAction<IPopupItem>>,
) => {
  const cvssItems = cvssVector.split('/');

  if (cvssItems.length !== 0) {
    setCvssAV({ text: prepareAttackVectorToFull[cvssItems[1]], value: cvssItems[1] });
    setCvssAC({ text: prepareAttackComplexityToFull[cvssItems[2]], value: cvssItems[2] });
    setCvssPR({ text: preparePrivilegesRequiredToFull[cvssItems[3]], value: cvssItems[3] });
    setCvssUI({ text: prepareUserInteractionToFull[cvssItems[4]], value: cvssItems[4] });

    setCvssS({ text: prepareScopeToFull[cvssItems[5]], value: cvssItems[5] });
    setCvssC({ text: prepareOtherCVSSToFull[cvssItems[6]], value: cvssItems[6]?.split(':')[1] });
    setCvssI({ text: prepareOtherCVSSToFull[cvssItems[7]], value: cvssItems[7]?.split(':')[1] });
    setCvssA({ text: prepareOtherCVSSToFull[cvssItems[8]], value: cvssItems[8]?.split(':')[1] });
  }
};
