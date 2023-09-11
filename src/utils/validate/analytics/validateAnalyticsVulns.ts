import {EMPTY_ERROR_MESSAGE, GENERAL_ERROR_MESSAGES, PROJECTS_ERROR_MESSAGES} from '../../../constants/errors';
import {
  setAnalyticsEndDate,
  setAnalyticsNumEmployees,
  setAnalyticsObjectTypes,
  setAnalyticsStartDate,
} from '../../../store/analytics/analyticsSlice';
import {IGetVulnsReport} from '../../../store/analytics/analyticsTypes';

/**
 * return is the data valid
 * @param {IGetVulnsReport} data  Validation data
 * @param {any} dispatch          Dispatcher to change values in the store
 * @return {boolean}              Is the data valid
 */
export const validateAnalyticsVulns = (
  data: IGetVulnsReport,
  dispatch: any,
): boolean => {
  let isObjectTypesCorrect;
  let isStartDateCorrect;
  let isEndDateCorrect;
  let isEmployeesCorrect;

  const prepareStartDate = data.start_date.split('-');
  const prepareEndDate = data.end_date.split('-');

  const startYear = parseInt(prepareStartDate[0]);
  const endYear = parseInt(prepareEndDate[0]);

  const startMonth = parseInt(prepareStartDate[1]);
  const endMonth = parseInt(prepareEndDate[1]);

  const startDays = parseInt(prepareStartDate[2]);
  const endDays = parseInt(prepareEndDate[2]);

  if (!data.object_types) {
    dispatch(setAnalyticsObjectTypes(GENERAL_ERROR_MESSAGES.POPUP_EMPTY));

    isObjectTypesCorrect = false;
  } else {
    dispatch(setAnalyticsObjectTypes(EMPTY_ERROR_MESSAGE));

    isObjectTypesCorrect = true;
  }

  if (data.start_date.trim().length <= 3) {
    dispatch(setAnalyticsStartDate(PROJECTS_ERROR_MESSAGES.DATE_LENGTH));

    isStartDateCorrect = false;
  } else if ((startYear > endYear) || (startYear === endYear && startMonth > endMonth) ||
    (startYear === endYear && startMonth === endMonth && startDays > endDays)) {
    dispatch(setAnalyticsStartDate(PROJECTS_ERROR_MESSAGES.START_DATE));

    isStartDateCorrect = false;
  } else {
    dispatch(setAnalyticsStartDate(EMPTY_ERROR_MESSAGE));

    isStartDateCorrect = true;
  }

  if (data.end_date.trim().length <= 3) {
    dispatch(setAnalyticsEndDate(PROJECTS_ERROR_MESSAGES.DATE_LENGTH));

    isEndDateCorrect = false;
  } else if ((startYear > endYear) || (startYear === endYear && startMonth > endMonth) ||
    (startYear === endYear && startMonth === endMonth && startDays > endDays)) {
    dispatch(setAnalyticsEndDate(PROJECTS_ERROR_MESSAGES.END_DATE));

    isStartDateCorrect = false;
  } else {
    dispatch(setAnalyticsEndDate(EMPTY_ERROR_MESSAGE));

    isEndDateCorrect = true;
  }

  if (data.num_employees && data.num_employees < 0) {
    dispatch(setAnalyticsNumEmployees(GENERAL_ERROR_MESSAGES.NUMBER_NEGATIVE));

    isEmployeesCorrect = false;
  } else if (data.num_employees === 0) {
    dispatch(setAnalyticsNumEmployees(GENERAL_ERROR_MESSAGES.NUMBER_ZERO));

    isEmployeesCorrect = false;
  } else {
    dispatch(setAnalyticsNumEmployees(EMPTY_ERROR_MESSAGE));

    isEmployeesCorrect = true;
  }

  return !!(isObjectTypesCorrect && isStartDateCorrect && isEndDateCorrect && isEmployeesCorrect);
};
