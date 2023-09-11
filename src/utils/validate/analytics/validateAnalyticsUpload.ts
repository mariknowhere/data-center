import {EMPTY_ERROR_MESSAGE, GENERAL_ERROR_MESSAGES} from '../../../constants/errors';
import {setAnalyticsExcelFileError, setAnalyticsScreenshotsError} from '../../../store/analytics/analyticsSlice';
import {IUploadExcel} from '../../../store/analytics/analyticsTypes';

/**
 * return is the data valid
 * @param {IUploadExcel} data  Validation data
 * @param {any} dispatch       Dispatcher to change values in the store
 * @return {boolean}           Is the data valid
 */
export const validateAnalyticsUpload = (
  data: IUploadExcel,
  dispatch: any,
): boolean => {
  let isExcelFileCorrect;

  if (!data.excel_file) {
    dispatch(setAnalyticsExcelFileError(GENERAL_ERROR_MESSAGES.FILE_EMPTY));

    isExcelFileCorrect = false;
  } else {
    dispatch(setAnalyticsExcelFileError(EMPTY_ERROR_MESSAGE));

    isExcelFileCorrect = true;
  }

  return isExcelFileCorrect;
};
