import {RootState} from '../storeTypes';

export const selectObjects = (state: RootState) => state.objects;
export const selectBase = (state: RootState) => state.objects.base;
