import {IObjectInitial, IObjectState} from '../objectsTypes';

type SourceCodeObjectInitial =
  Omit<IObjectInitial, 'office' | 'office_id' | 'attacker_model' | 'additional_info' | 'blackbox' | 'greybox' |
    'work_type'>;

export interface ISourceCode extends SourceCodeObjectInitial {
  programming_language?: string[];
  number_rows?: number | null;
}

export interface ISourceCodeState extends IObjectState {
  sourceCodes: ISourceCode[];
  allSourceCodes: ISourceCode[];
  sourceCodeById: ISourceCode;
}

export interface ISourceCodeErrors {
  number_rows_error: string;
}
