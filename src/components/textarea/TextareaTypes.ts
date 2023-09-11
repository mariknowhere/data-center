import {ChangeEvent} from 'react';

export interface ITextarea {
  value: string;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  disabled?: boolean;
}
