import {RootState} from '../../storeTypes';

export const selectSourceCode = (state: RootState) => state.objects.sourceCode;
export const selectSourceCodeById = (state: RootState) => state.objects.sourceCode.sourceCodeById;
export const selectSourceCodesErrors = (state: RootState) => state.objects.errors.sourceCodeErrors;