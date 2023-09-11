import {RootState} from '../../storeTypes';

export const selectOther = (state: RootState) => state.objects.other;
export const selectOtherById = (state: RootState) => state.objects.other.otherById;
export const selectOtherErrors = (state: RootState) => state.objects.errors.otherErrors;
