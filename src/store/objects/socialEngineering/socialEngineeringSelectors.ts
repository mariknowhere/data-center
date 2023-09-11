import {RootState} from '../../storeTypes';

export const selectSocialEngineering = (state: RootState) => state.objects.socialEngineering;
export const selectSocialEngineeringById = (state: RootState) => state.objects.socialEngineering.socialEngineeringById;
export const selectSocialEngineeringErrors = (state: RootState) => state.objects.errors.socialEngineeringErrors;
