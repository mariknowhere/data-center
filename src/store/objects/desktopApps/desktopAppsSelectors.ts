import {RootState} from '../../storeTypes';

export const selectDesktopApp = (state: RootState) => state.objects.desktopApp;
export const selectDesktopAppById = (state: RootState) => state.objects.desktopApp.desktopAppById;
export const selectDesktopAppErrors = (state: RootState) => state.objects.errors.desktopAppErrors;
