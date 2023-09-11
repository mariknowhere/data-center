import {Dispatch, SetStateAction} from 'react';

import {OBJECT_TYPES} from '../../../../constants/objects';

/**
 *
 * @param {string} selectTab                                     Current tab in objects
 * @param {Dispatch<SetStateAction<number>>} setPaginationCount  Setter to change total number of objects in pagination
 * @param {Dispatch<SetStateAction<number>>} setPaginationPage   Setter to change actual page of objects in pagination
 * @param {number} baseCount                                     Number of base objects in the table
 * @param {number} webAppCount                                   Number of web applications in the table
 * @param {number} apiCount                                      Number of api in the table
 * @param {number} mobileAppCount                                Number of mobile applications in the table
 * @param {number} networkDeviceCount                            Number of network devices in the table
 * @param {number} serverCount                                   Number of servers in the table
 * @param {number} armCount                                      Number of arm in the table
 * @param {number} wifiCount                                     Number of wifi in the table
 * @param {number} socialEngineeringCount                        Number of social engineering in the table
 * @param {number} desktopAppCount                               Number of desktop applications in the table
 * @param {number} sourceCodeCount                               Number of source codes in the table
 * @param {number} externalCount                                 Number of external ips in the table
 * @param {number} internalCount                                 Number of internal ips in the table
 * @param {number} otherCount                                    Number of others in the table
 * @param {number} basePage                                      Actual page in pagination for base objects
 * @param {number} webAppPage                                    Actual page in pagination for web applications
 * @param {number} apiPage                                       Actual page in pagination for api
 * @param {number} mobileAppPage                                 Actual page in pagination for mobile applications
 * @param {number} networkDevicePage                             Actual page in pagination for network devices
 * @param {number} serverPage                                    Actual page in pagination for servers
 * @param {number} armPage                                       Actual page in pagination for arm
 * @param {number} wifiPage                                      Actual page in pagination for wifi
 * @param {number} socialEngineeringPage                         Actual page in pagination for social engineering
 * @param {number} desktopAppPage                                Actual page in pagination for desktop applications
 * @param {number} sourceCodePage                                Actual page in pagination for source codes
 * @param {number} externalPage                                  Actual page in pagination for external ips
 * @param {number} internalPage                                  Actual page in pagination for internal ips
 * @param {number} otherPage                                     Actual page in pagination for others
 */
export const preparedObjectPaginationItems = (
  selectTab: string,
  setPaginationCount: Dispatch<SetStateAction<number>>,
  setPaginationPage: Dispatch<SetStateAction<number>>,
  baseCount: number,
  webAppCount: number,
  apiCount: number,
  mobileAppCount: number,
  networkDeviceCount: number,
  serverCount: number,
  armCount: number,
  wifiCount: number,
  socialEngineeringCount: number,
  desktopAppCount: number,
  sourceCodeCount: number,
  externalCount: number,
  internalCount: number,
  otherCount: number,

  basePage: number,
  webAppPage: number,
  apiPage: number,
  mobileAppPage: number,
  networkDevicePage: number,
  serverPage: number,
  armPage: number,
  wifiPage: number,
  socialEngineeringPage: number,
  desktopAppPage: number,
  sourceCodePage: number,
  externalPage: number,
  internalPage: number,
  otherPage: number,
) => {
  switch (selectTab) {
  case OBJECT_TYPES.Base: {
    setPaginationCount(baseCount);
    setPaginationPage(basePage);

    break;
  }

  case OBJECT_TYPES.WebApp: {
    setPaginationCount(webAppCount);
    setPaginationPage(webAppPage);

    break;
  }

  case OBJECT_TYPES.API: {
    setPaginationCount(apiCount);
    setPaginationPage(apiPage);

    break;
  }

  case OBJECT_TYPES.MobileApp: {
    setPaginationCount(mobileAppCount);
    setPaginationPage(mobileAppPage);

    break;
  }

  case OBJECT_TYPES.NetworkDevice: {
    setPaginationCount(networkDeviceCount);
    setPaginationPage(networkDevicePage);

    break;
  }

  case OBJECT_TYPES.Server: {
    setPaginationCount(serverCount);
    setPaginationPage(serverPage);

    break;
  }

  case OBJECT_TYPES.ARM: {
    setPaginationCount(armCount);
    setPaginationPage(armPage);

    break;
  }

  case OBJECT_TYPES.WiFi: {
    setPaginationCount(wifiCount);
    setPaginationPage(wifiPage);

    break;
  }

  case OBJECT_TYPES.SocialEngineering: {
    setPaginationCount(socialEngineeringCount);
    setPaginationPage(socialEngineeringPage);

    break;
  }

  case OBJECT_TYPES.DesktopApp: {
    setPaginationCount(desktopAppCount);
    setPaginationPage(desktopAppPage);

    break;
  }

  case OBJECT_TYPES.SourceCode: {
    setPaginationCount(sourceCodeCount);
    setPaginationPage(sourceCodePage);

    break;
  }

  case OBJECT_TYPES.External: {
    setPaginationCount(externalCount);
    setPaginationPage(externalPage);

    break;
  }

  case OBJECT_TYPES.Internal: {
    setPaginationCount(internalCount);
    setPaginationPage(internalPage);

    break;
  }

  case OBJECT_TYPES.Other: {
    setPaginationCount(otherCount);
    setPaginationPage(otherPage);

    break;
  }
  }
};
