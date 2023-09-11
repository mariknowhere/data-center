import {EMPTY_ERROR_MESSAGE, GENERAL_ERROR_MESSAGES} from '../../../constants/errors';
import {ISocialEngineering} from '../../../store/objects/socialEngineering/socialEngineeringTypes';
import {setSocialEngineeringSuccessCriterionError} from '../../../store/objects/objectsSlice';

/**
 * return is the data valid
 * @param {ISocialEngineering} object  Validation data
 * @param {any} dispatch               Dispatcher to change values in the store
 * @return {boolean}                   Is the data valid
 */
export const validateSocialEngineering = (
  object: ISocialEngineering,
  dispatch: any,
): boolean => {
  let isSuccessCriterionCorrect;

  if (!object.success_criterion) {
    dispatch(setSocialEngineeringSuccessCriterionError(GENERAL_ERROR_MESSAGES.FIELD_EMPTY));

    isSuccessCriterionCorrect = false;
  } else {
    dispatch(setSocialEngineeringSuccessCriterionError(EMPTY_ERROR_MESSAGE));

    isSuccessCriterionCorrect = true;
  }

  return (isSuccessCriterionCorrect);
};
