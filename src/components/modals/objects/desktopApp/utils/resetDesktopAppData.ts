import {Dispatch, SetStateAction} from 'react';

import {setDesktopAppNameError, setDesktopAppPlatformTypeError} from '../../../../../store/objects/objectsSlice';
import {EMPTY_ERROR_MESSAGE} from '../../../../../constants/errors';
import {IDesktopApp} from '../../../../../store/objects/desktopApps/desktopAppsTypes';

/**
 *
 * @param {any} dispatch                                         Dispatcher to change values in the store
 * @param {Dispatch<SetStateAction<IDesktopApp>>} setDesktopApp  Setter for dumping data in desktop application
 */
export const resetApiData = (dispatch: any, setDesktopApp: Dispatch<SetStateAction<IDesktopApp>>) => {
  setDesktopApp({
    additional_info: '',
    app_name: '',
    inf_system: { id: '', name: '' },
    inf_system_id: '',
    platform_type: '',
    greybox: false,
    blackbox: false,
  });

  dispatch(setDesktopAppNameError(EMPTY_ERROR_MESSAGE));
  dispatch(setDesktopAppPlatformTypeError(EMPTY_ERROR_MESSAGE));
};
