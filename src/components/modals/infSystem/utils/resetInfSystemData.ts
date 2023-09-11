import {Dispatch, SetStateAction} from 'react';

import {EMPTY_ERROR_MESSAGE} from '../../../../constants/errors';
import {
  setInfSystemContactPersonError,
  setInfSystemNameError,
  setInfSystemProductError,
  setInfSystemProductManagerError,
  setInfSystemSecurityLevelError,
  setInfSystemWebInterfaceAddressError,
} from '../../../../store/infSystems/infSystemsSlice';
import {IInfSystem} from '../../../../store/infSystems/infSystemsTypes';

/**
 *
 * @param {any} dispatch                                       Dispatcher to change values in the store
 * @param {Dispatch<SetStateAction<IInfSystem>>} setInfSystem  Setter for resetting inf system data
 */
export const resetInfSystemData = (dispatch: any, setInfSystem: Dispatch<SetStateAction<IInfSystem>>) => {
  setInfSystem({
    availability_interface: false,
    inf_system_contact_person: '',
    name: '',
    security_level: NaN,
    product: '',
    product_manager: '',
    web_interface_address: '',
  });

  dispatch(setInfSystemNameError(EMPTY_ERROR_MESSAGE));
  dispatch(setInfSystemProductError(EMPTY_ERROR_MESSAGE));
  dispatch(setInfSystemSecurityLevelError(EMPTY_ERROR_MESSAGE));
  dispatch(setInfSystemProductManagerError(EMPTY_ERROR_MESSAGE));
  dispatch(setInfSystemWebInterfaceAddressError(EMPTY_ERROR_MESSAGE));
  dispatch(setInfSystemContactPersonError(EMPTY_ERROR_MESSAGE));
};
