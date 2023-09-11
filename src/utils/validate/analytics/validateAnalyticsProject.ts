import {setAnalyticsProjectName} from '../../../store/analytics/analyticsSlice';
import {IGetProjectReportRequest} from '../../../store/analytics/analyticsTypes';
import {ANALYTICS_ERROR_MESSAGES, EMPTY_ERROR_MESSAGE, GENERAL_ERROR_MESSAGES} from '../../../constants/errors';
import {IProject} from '../../../store/projects/projectsTypes';

/**
 * return is the data valid
 * @param {IGetProjectReportRequest} data  Validation data
 * @param {any} dispatch                   Dispatcher to change values in the store
 * @param {IProject[]} projects            Array of projects to validate by name
 * @return {boolean}                       Is the data valid
 */
export const validateAnalyticsProject = (
  data: IGetProjectReportRequest,
  dispatch: any,
  projects: IProject[],
): boolean => {
  let isNameCorrect;

  const projectGosOrderNumberBusy = projects?.find((project: IProject) => {
    return project.name === data.name;
  });

  if (!data.name) {
    dispatch(setAnalyticsProjectName(GENERAL_ERROR_MESSAGES.FIELD_EMPTY));

    isNameCorrect = false;
  } else if (!projectGosOrderNumberBusy) {
    dispatch(setAnalyticsProjectName(ANALYTICS_ERROR_MESSAGES.NAME));

    isNameCorrect = false;
  } else {
    dispatch(setAnalyticsProjectName(EMPTY_ERROR_MESSAGE));

    isNameCorrect = true;
  }

  return !!(isNameCorrect);
};
