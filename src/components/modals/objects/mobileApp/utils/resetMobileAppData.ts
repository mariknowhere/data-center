import {Dispatch, SetStateAction} from 'react';

import {setMobileAppNameError, setMobileAppPlatformError} from '../../../../../store/objects/objectsSlice';
import {EMPTY_ERROR_MESSAGE} from '../../../../../constants/errors';
import {IMobileApp} from '../../../../../store/objects/mobileApps/mobileAppsTypes';

/**
 *
 * @param {any} dispatch                                       Dispatcher to change values in the store
 * @param {Dispatch<SetStateAction<IMobileApp>>} setMobileApp  Setter for dumping data in mobile application
 */
export const resetMobileAppData = (dispatch: any, setMobileApp: Dispatch<SetStateAction<IMobileApp>>) => {
  setMobileApp({
    additional_info: '',
    app_name: '',
    inf_system: { id: '', name: '' },
    inf_system_id: '',
    platform_type: '',
    greybox: false,
    blackbox: false,
  });

  dispatch(setMobileAppNameError(EMPTY_ERROR_MESSAGE));
  dispatch(setMobileAppPlatformError(EMPTY_ERROR_MESSAGE));
};
