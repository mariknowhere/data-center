import {RootState} from '../../storeTypes';

export const selectNetworkDevice = (state: RootState) => state.objects.networkDevice;
export const selectNetworkDeviceById = (state: RootState) => state.objects.networkDevice.networkDeviceById;
export const selectNetworkDeviceErrors = (state: RootState) => state.objects.errors.networkDeviceErrors;
