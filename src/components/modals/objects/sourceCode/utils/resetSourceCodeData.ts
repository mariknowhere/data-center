import {Dispatch, SetStateAction} from 'react';

import {setSourceCodeNumberRowsError} from '../../../../../store/objects/objectsSlice';
import {EMPTY_ERROR_MESSAGE} from '../../../../../constants/errors';
import {ISourceCode} from '../../../../../store/objects/sourceCodes/sourceCodesTypes';

/**
 *
 * @param {any} dispatch                                          Dispatcher to change values in the store
 * @param {Dispatch<SetStateAction<ISourceCode>>} setSourceCode   Setter for dumping data in source code
 * @param {Dispatch<SetStateAction<any>>} setProgrammingLanguage  Setter for dumping data in type
 */
export const resetSourceCodeData = (
  dispatch: any,
  setSourceCode: Dispatch<SetStateAction<ISourceCode>>,
  setProgrammingLanguage: Dispatch<SetStateAction<any>>,
) => {
  setSourceCode({
    inf_system: { id: '', name: '' },
    inf_system_id: '',
    number_rows: NaN,
    programming_language: [],
  });

  setProgrammingLanguage(null);

  dispatch(setSourceCodeNumberRowsError(EMPTY_ERROR_MESSAGE));
};
