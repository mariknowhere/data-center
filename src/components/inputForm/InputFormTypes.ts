import {ChangeEvent} from 'react';

import {IInputProps} from '../input/InputTypes';
import {ICalendarProps} from '../calendar/CalendarTypes';
import {IPopupItem} from '../popup/PopupTypes';

export interface IInputFormProps extends IInputProps, ICalendarProps {
  text: string;
  primaryText?: string;
  textarea?: boolean;
  onTextareaChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  errorMessage?: string;
  popupItems?: IPopupItem[];
  onPopupChange?: any;
  onClick?: any;
  classNameWrapper?: string;
  classNameText?: string;
  isMulti?: boolean;
  isClearable?: boolean;
  isSearchable?: boolean;
  options?: any[];
  onSelectChange?: any;
  secondaryValue?: any;
  onSecondaryChange?: any;
  secondaryText?: string;
}
