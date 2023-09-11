import {IProject} from '../../store/projects/projectsTypes';
import {EMPTY_ERROR_MESSAGE, GENERAL_ERROR_MESSAGES, PROJECTS_ERROR_MESSAGES} from '../../constants/errors';
import {
  setProjectCustomerNameError,
  setProjectEndDateError,
  setProjectNameError,
  setProjectStartDateError,
} from '../../store/projects/projectsSlice';

/**
 * return is the data valid
 * @param {IProject} project     Validation data
 * @param {any} dispatch         Dispatcher to change values in the store
 * @param {IProject[]} projects  Array of projects to validate by name
 * @param {string} customerId    Customer id to validate
 * @return {boolean}             Is the data valid
 */
export const validateProject = (
  project: IProject,
  dispatch: any,
  projects: IProject[],
  customerId?: string,
): boolean => {
  let isCustomerIdCorrect;
  let isProjectNameCorrect;
  let isStartDateCorrect;
  let isEndDateCorrect;

  const prepareStartDate = project.start_date.split('-');
  const prepareEndDate = project.end_date.split('-');

  const startYear = parseInt(prepareStartDate[0]);
  const endYear = parseInt(prepareEndDate[0]);

  const startMonth = parseInt(prepareStartDate[1]);
  const endMonth = parseInt(prepareEndDate[1]);

  const startDays = parseInt(prepareStartDate[2]);
  const endDays = parseInt(prepareEndDate[2]);

  const projectNameFree = projects.find(({ name, id }) => project.name === name && project.id !== id);

  if (!customerId) {
    dispatch(setProjectCustomerNameError(PROJECTS_ERROR_MESSAGES.CUSTOMER_EMPTY));

    isCustomerIdCorrect = false;
  } else {
    dispatch(setProjectCustomerNameError(EMPTY_ERROR_MESSAGE));

    isCustomerIdCorrect = true;
  }

  if (!project.name) {
    dispatch(setProjectNameError(GENERAL_ERROR_MESSAGES.FIELD_EMPTY));

    isProjectNameCorrect = false;
  } else if (projectNameFree) {
    dispatch(setProjectNameError(PROJECTS_ERROR_MESSAGES.NAME_BUSY));

    isProjectNameCorrect = false;
  } else {
    dispatch(setProjectNameError(EMPTY_ERROR_MESSAGE));

    isProjectNameCorrect = true;
  }

  if (project.start_date.trim().length <= 3) {
    dispatch(setProjectStartDateError(PROJECTS_ERROR_MESSAGES.DATE_LENGTH));

    isStartDateCorrect = false;
  } else if ((startYear > endYear) || (startYear === endYear && startMonth > endMonth) ||
      (startYear === endYear && startMonth === endMonth && startDays > endDays)) {
    dispatch(setProjectStartDateError(PROJECTS_ERROR_MESSAGES.START_DATE));

    isStartDateCorrect = false;
  } else {
    dispatch(setProjectStartDateError(EMPTY_ERROR_MESSAGE));

    isStartDateCorrect = true;
  }

  if (project.end_date.trim().length <= 3) {
    dispatch(setProjectEndDateError(PROJECTS_ERROR_MESSAGES.DATE_LENGTH));

    isEndDateCorrect = false;
  } else if ((startYear > endYear) || (startYear === endYear && startMonth > endMonth) ||
    (startYear === endYear && startMonth === endMonth && startDays > endDays)) {
    dispatch(setProjectEndDateError(PROJECTS_ERROR_MESSAGES.END_DATE));

    isStartDateCorrect = false;
  } else {
    dispatch(setProjectEndDateError(EMPTY_ERROR_MESSAGE));

    isEndDateCorrect = true;
  }

  return !!(isCustomerIdCorrect && isProjectNameCorrect && isStartDateCorrect && isEndDateCorrect);
};
