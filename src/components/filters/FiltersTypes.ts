import {IInputFormProps} from '../inputForm/InputFormTypes';

export interface IFilter extends IInputFormProps {
  id: number;
}

export interface IFiltersProps {
  filters?: IFilter[];
  onSearchButtonClick?: (reset: boolean) => void;
}
