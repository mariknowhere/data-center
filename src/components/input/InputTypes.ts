import {ChangeEvent} from 'react';

export enum InputTypeEnum {
  Text = 'text',
  Number = 'number',
  Password = 'password',
  Date = 'date',
  File = 'file',
  Checkbox = 'checkbox',
}

export interface IInputProps {
  imageUrl?: string;
  disabled?: boolean;
  disabledCheckbox?: boolean;
  name?: string;
  type?: InputTypeEnum;
  placeholder?: string;
  className?: string;
  list?: string;
  onClick?: () => void;
  value?: any;
  accept?: string;
  multiple?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}
