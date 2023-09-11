import {EMPTY_ERROR_MESSAGE, GENERAL_ERROR_MESSAGES} from '../../../constants/errors';
import {ISourceCode} from '../../../store/objects/sourceCodes/sourceCodesTypes';
import {setSourceCodeNumberRowsError} from '../../../store/objects/objectsSlice';

/**
 * return is the data valid
 * @param {ISourceCode} object  Validation data
 * @param {any} dispatch        Dispatcher to change values in the store
 * @return {boolean}            Is the data valid
 */
export const validateSourceCode = (
  object: ISourceCode,
  dispatch: any,
): boolean => {
  let isNumberRowsCorrect;

  if (object.number_rows && object.number_rows < 0) {
    dispatch(setSourceCodeNumberRowsError(GENERAL_ERROR_MESSAGES.NUMBER_NEGATIVE));

    isNumberRowsCorrect = false;
  } else {
    dispatch(setSourceCodeNumberRowsError(EMPTY_ERROR_MESSAGE));

    isNumberRowsCorrect = true;
  }

  return (isNumberRowsCorrect);
};
