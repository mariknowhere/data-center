import {Dispatch, SetStateAction} from 'react';

import {IProject} from '../store/projects/projectsTypes';

/**
 *
 * @param {Date} date                                       Date to display on the calendar
 * @param {Dispatch<SetStateAction<Date | null>>} setValue  Setter to change the date
 * @param {any} setPrepareValue                             Setter to change date in string format
 * @param {IProject} object                                 Object to destruct inside a setter
 * @param {string} key                                      Key to change date inside object
 */
export const dateChange = (
  date: Date,
  setValue: Dispatch<SetStateAction<Date | null>>,
  setPrepareValue: any,
  object?: IProject,
  key?: string,
) => {
  if (date) {
    const prepareDate = date!.toISOString().trim().slice(0, 10);

    setValue(date);

    (object && key) ? setPrepareValue({ ...object, [key]: prepareDate}) : setPrepareValue(prepareDate);
  } else {
    setValue(null);

    (object && key) ? setPrepareValue({ ...object, [key]: ''}) : setPrepareValue('');
  }
};
