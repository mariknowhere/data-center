import {Dispatch, SetStateAction} from 'react';

import {
  apiHeadCells,
  armHeadCells, baseHeadCells,
  desktopAppHeadCells, externalHeadCells, internalHeadCells,
  mobileAppHeadCells,
  networkDeviceHeadCells,
  OBJECT_TYPES, otherHeadCells,
  serverHeadCells,
  socialEngineeringHeadCells,
  sourceCodeHeadCells,
  webAppHeadCells,
  wifiHeadCells,
} from '../../../../constants/objects';
import {ISourceCode} from '../../../../store/objects/sourceCodes/sourceCodesTypes';
import {IWebApp} from '../../../../store/objects/webApps/webAppTypes';
import {IServer} from '../../../../store/objects/servers/serversTypes';
import {IMobileApp} from '../../../../store/objects/mobileApps/mobileAppsTypes';
import {ISocialEngineering} from '../../../../store/objects/socialEngineering/socialEngineeringTypes';
import {IWifi} from '../../../../store/objects/wifies/wifiesTypes';
import {IDesktopApp} from '../../../../store/objects/desktopApps/desktopAppsTypes';
import {IArm} from '../../../../store/objects/arm/armTypes';
import {IApi} from '../../../../store/objects/api/apiTypes';
import {INetworkDevice} from '../../../../store/objects/networkDevices/networkDevicesTypes';
import {IOther} from '../../../../store/objects/other/otherTypes';
import {IInternal} from '../../../../store/objects/internal/internalTypes';
import {IExternal} from '../../../../store/objects/external/externalTypes';
import {Object} from '../../../../store/objects/objectsTypes';

/**
 *
 * @param {string} selectTab                            Current tab in objects
 * @param {Dispatch<SetStateAction<any>>} setHeadCells  Setter to change headers in object table
 * @param {Dispatch<SetStateAction<any>>} setBodyRows   Setter to change body rows in object table
 * @param {IWebApp[]} base                              Array of base objects to display in a table
 * @param {IWebApp[]} webApps                           Array of web applications to display in a table
 * @param {IApi[]} api                                  Array of api to display in a table
 * @param {IMobileApp[]} mobileApps                     Array of mobile applications to display in a table
 * @param {INetworkDevice[]} networkDevices             Array of network devices to display in a table
 * @param {IServer[]} servers                           Array servers to display in a table
 * @param {IArm[]} arm                                  Array of arm to display in a table
 * @param {IWifi[]} wifies                              Array of wifi to display in a table
 * @param {ISocialEngineering[]} socialEngineering      Array of social engineering to display in a table
 * @param {IDesktopApp[]} desktopApps                   Array of desktop applications to display in a table
 * @param {ISourceCode[]} sourceCodes                   Array of source codes to display in a table
 * @param {IExternal[]} externals                       Array of externals ips to display in a table
 * @param {IInternal[]} internals                       Array of internal ips to display in a table
 * @param {IOther[]} others                             Array of others to display in a table
 */
export const preparedObjectRows = (
  selectTab: string,
  setHeadCells: Dispatch<SetStateAction<any>>,
  setBodyRows: Dispatch<SetStateAction<any>>,
  base: Object[],
  webApps: IWebApp[],
  api: IApi[],
  mobileApps: IMobileApp[],
  networkDevices: INetworkDevice[],
  servers: IServer[],
  arm: IArm[],
  wifies: IWifi[],
  socialEngineering: ISocialEngineering[],
  desktopApps: IDesktopApp[],
  sourceCodes: ISourceCode[],
  externals: IExternal[],
  internals: IInternal[],
  others: IOther[],
) => {
  switch (selectTab) {
  case OBJECT_TYPES.Base: {
    setHeadCells(baseHeadCells);
    setBodyRows(base);

    break;
  }

  case OBJECT_TYPES.WebApp: {
    setHeadCells(webAppHeadCells);
    setBodyRows(webApps);

    break;
  }

  case OBJECT_TYPES.API: {
    setHeadCells(apiHeadCells);
    setBodyRows(api);

    break;
  }

  case OBJECT_TYPES.MobileApp: {
    setHeadCells(mobileAppHeadCells);
    setBodyRows(mobileApps);

    break;
  }

  case OBJECT_TYPES.NetworkDevice: {
    setHeadCells(networkDeviceHeadCells);
    setBodyRows(networkDevices);

    break;
  }

  case OBJECT_TYPES.Server: {
    setHeadCells(serverHeadCells);
    setBodyRows(servers);

    break;
  }

  case OBJECT_TYPES.ARM: {
    setHeadCells(armHeadCells);
    setBodyRows(arm);

    break;
  }

  case OBJECT_TYPES.WiFi: {
    setHeadCells(wifiHeadCells);
    setBodyRows(wifies);

    break;
  }

  case OBJECT_TYPES.SocialEngineering: {
    setHeadCells(socialEngineeringHeadCells);
    setBodyRows(socialEngineering);

    break;
  }

  case OBJECT_TYPES.DesktopApp: {
    setHeadCells(desktopAppHeadCells);
    setBodyRows(desktopApps);

    break;
  }

  case OBJECT_TYPES.SourceCode: {
    setHeadCells(sourceCodeHeadCells);
    setBodyRows(sourceCodes);

    break;
  }

  case OBJECT_TYPES.External: {
    setHeadCells(externalHeadCells);
    setBodyRows(externals);

    break;
  }

  case OBJECT_TYPES.Internal: {
    setHeadCells(internalHeadCells);
    setBodyRows(internals);

    break;
  }

  case OBJECT_TYPES.Other: {
    setHeadCells(otherHeadCells);
    setBodyRows(others);

    break;
  }
  }
};
