import {RootState} from '../../storeTypes';

export const selectArm = (state: RootState) => state.objects.arm;
export const selectArmById = (state: RootState) => state.objects.arm.armById;
export const selectArmErrors = (state: RootState) => state.objects.errors.armErrors;
