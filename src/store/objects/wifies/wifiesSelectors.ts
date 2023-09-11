import {RootState} from '../../storeTypes';

export const selectWifi = (state: RootState) => state.objects.wifi;
export const selectWifiById = (state: RootState) => state.objects.wifi.wifiById;
export const selectWifiErrors = (state: RootState) => state.objects.errors.wifiErrors;
