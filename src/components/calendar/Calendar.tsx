import {FC} from 'react';

import DatePicker from 'react-datepicker';

import {localization} from '../../localization/localization';

import styles from './Calendar.module.scss';
import {ICalendarProps} from './CalendarTypes';

import 'react-datepicker/dist/react-datepicker.css';

const Calendar: FC<ICalendarProps> = ({
  date,
  onDateChange,
  disabledKeyboardNavigation = false,
}) => {
  return (
    <div className={styles.calendar}>
      <DatePicker
        selected={date}
        onChange={onDateChange}
        disabledKeyboardNavigation={disabledKeyboardNavigation}
        placeholderText={localization.calendar.placeholder}
        dateFormat="dd/MM/yyyy"
      />
    </div>
  );
};

export default Calendar;
