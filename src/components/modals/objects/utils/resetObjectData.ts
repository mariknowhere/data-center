import {Dispatch, SetStateAction} from 'react';

import {
  setApiAddressIpError,
  setApiAttackerModelError,
  setApiWorkTypeError,
  setArmAddressIpError,
  setArmAttackerModelError,
  setArmWorkTypeError,
  setDesktopAppNameError,
  setDesktopAppPlatformTypeError,
  setExternalIpAddressError,
  setInternalIpAddressError,
  setMobileAppNameError,
  setMobileAppPlatformError,
  setNetworkDeviceAddressIpError,
  setNetworkDeviceAttackerModelError,
  setNetworkDeviceWorkTypeError,
  setOtherIpAddressError,
  setServerAddressIpError,
  setServerAttackerModelError,
  setServerWorkTypeError,
  setSocialEngineeringSuccessCriterionError,
  setSourceCodeNumberRowsError,
  setWebAppAddressIpError,
  setWebAppAttackerError,
  setWebAppWorkTypeError,
  setWifiAttackerModelError,
  setWifiBssidError,
  setWifiSsidError,
} from '../../../../store/objects/objectsSlice';
import {EMPTY_ERROR_MESSAGE} from '../../../../constants/errors';
import {Object} from '../../../../store/objects/objectsTypes';
import {IPopupItem} from '../../../popup/PopupTypes';

/**
 *
 * @param {any} dispatch                                          Dispatcher to change values in the store
 * @param {Dispatch<SetStateAction<Object>>} setObject            Setter for dumping data in object
 * @param {Dispatch<SetStateAction<IPopupItem>>} setGroupType     Setter for dumping data in object
 * @param {Dispatch<SetStateAction<any>>} setEngineeringType      Setter for dumping data in social engineering
 * @param {Dispatch<SetStateAction<any>>} setProgrammingLanguage  Setter for dumping data in source code
 */
export const resetObjectData = (
  dispatch: any,
  setObject: Dispatch<SetStateAction<Object>>,
  setGroupType: Dispatch<SetStateAction<IPopupItem>>,
  setEngineeringType: Dispatch<SetStateAction<any>>,
  setProgrammingLanguage: Dispatch<SetStateAction<any>>,
) => {
  setObject({
    additional_info: '',
    attacker_model: '',
    inf_system: { id: '', name: '' },
    inf_system_id: '',
    office: { id: '', name: '' },
    office_id: '',
    platform_type: '',
    network_device_name: '',
    assignment: '',
    ssid: '',
    bssid: '',
    success_criterion: '',
    programming_language: [],
    engineering_type: [],
    number_rows: NaN,
    ip_address: '',
    app_name: '',
    greybox: false,
    blackbox: false,
    domain_name: '',
    work_type: '',
  });

  setGroupType({
    text: 'Отсутствует',
    value: 'none',
    id: 1,
  });

  setEngineeringType(null);
  setProgrammingLanguage(null);



  dispatch(setWebAppAttackerError(EMPTY_ERROR_MESSAGE));
  dispatch(setWebAppWorkTypeError(EMPTY_ERROR_MESSAGE));
  dispatch(setWebAppAddressIpError(EMPTY_ERROR_MESSAGE));

  dispatch(setApiAttackerModelError(EMPTY_ERROR_MESSAGE));
  dispatch(setApiWorkTypeError(EMPTY_ERROR_MESSAGE));
  dispatch(setApiAddressIpError(EMPTY_ERROR_MESSAGE));

  dispatch(setArmAttackerModelError(EMPTY_ERROR_MESSAGE));
  dispatch(setArmWorkTypeError(EMPTY_ERROR_MESSAGE));
  dispatch(setArmAddressIpError(EMPTY_ERROR_MESSAGE));

  dispatch(setDesktopAppNameError(EMPTY_ERROR_MESSAGE));
  dispatch(setDesktopAppPlatformTypeError(EMPTY_ERROR_MESSAGE));

  dispatch(setExternalIpAddressError(EMPTY_ERROR_MESSAGE));
  dispatch(setInternalIpAddressError(EMPTY_ERROR_MESSAGE));
  dispatch(setOtherIpAddressError(EMPTY_ERROR_MESSAGE));

  dispatch(setMobileAppNameError(EMPTY_ERROR_MESSAGE));
  dispatch(setMobileAppPlatformError(EMPTY_ERROR_MESSAGE));

  dispatch(setNetworkDeviceAttackerModelError(EMPTY_ERROR_MESSAGE));
  dispatch(setNetworkDeviceWorkTypeError(EMPTY_ERROR_MESSAGE));
  dispatch(setNetworkDeviceAddressIpError(EMPTY_ERROR_MESSAGE));

  dispatch(setServerAttackerModelError(EMPTY_ERROR_MESSAGE));
  dispatch(setServerWorkTypeError(EMPTY_ERROR_MESSAGE));
  dispatch(setServerAddressIpError(EMPTY_ERROR_MESSAGE));

  dispatch(setSocialEngineeringSuccessCriterionError(EMPTY_ERROR_MESSAGE));
  dispatch(setSourceCodeNumberRowsError(EMPTY_ERROR_MESSAGE));

  dispatch(setWifiSsidError(EMPTY_ERROR_MESSAGE));
  dispatch(setWifiBssidError(EMPTY_ERROR_MESSAGE));
  dispatch(setWifiAttackerModelError(EMPTY_ERROR_MESSAGE));
};
