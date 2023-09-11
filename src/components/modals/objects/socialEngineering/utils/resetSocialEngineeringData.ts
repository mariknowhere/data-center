import {Dispatch, SetStateAction} from 'react';

import {setSocialEngineeringSuccessCriterionError} from '../../../../../store/objects/objectsSlice';
import {EMPTY_ERROR_MESSAGE} from '../../../../../constants/errors';
import {ISocialEngineering} from '../../../../../store/objects/socialEngineering/socialEngineeringTypes';

/**
 *
 * @param {any} dispatch                                                       Dispatcher to change values in the store
 * @param {Dispatch<SetStateAction<ISocialEngineering>>} setSocialEngineering  Setter for dumping in social engineering
 * @param {Dispatch<SetStateAction<any>>} setSelectedTypeOption                Setter for dumping in social engineering
 */
export const resetSocialEngineeringData = (
  dispatch: any,
  setSocialEngineering: Dispatch<SetStateAction<ISocialEngineering>>,
  setSelectedTypeOption: Dispatch<SetStateAction<any>>,
) => {
  setSocialEngineering({
    additional_info: '',
    engineering_type: [],
    office: { id: '', name: '' },
    office_id: '',
    success_criterion: '',
  });
  setSelectedTypeOption([]);

  dispatch(setSocialEngineeringSuccessCriterionError(EMPTY_ERROR_MESSAGE));
};
