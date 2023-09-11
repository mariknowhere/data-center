import {createSlice} from '@reduxjs/toolkit';

import {isError} from '../storeHelpers';

import {OBJECT_TYPES} from '../../constants/objects';

import {IObjectsState} from './objectsTypes';
import {ISourceCode} from './sourceCodes/sourceCodesTypes';
import {
  changeObject,
  createObject,
  createPentester,
  createPentesters,
  deleteObject,
  deletePentester,
  getAllObjects, getBaseObjects,
  getObjectById,
  getObjectCounts, getObjectLogs,
  getObjects,
  getPentesterInfo,
  getPentesters,
} from './objectsAsync';


import {IDesktopApp} from './desktopApps/desktopAppsTypes';
import {ISocialEngineering} from './socialEngineering/socialEngineeringTypes';
import {IWifi} from './wifies/wifiesTypes';
import {IServer} from './servers/serversTypes';
import {IMobileApp} from './mobileApps/mobileAppsTypes';
import {IWebApp} from './webApps/webAppTypes';
import {IApi} from './api/apiTypes';
import {INetworkDevice} from './networkDevices/networkDevicesTypes';
import {IArm} from './arm/armTypes';
import {IExternal} from './external/externalTypes';
import {IInternal} from './internal/internalTypes';
import {IOther} from './other/otherTypes';

const initialState: IObjectsState = {
  base: {
    base: [],
    count: 0,
    filters: '',
    page: 1,
    offset: 0,
    limit: 10,
  },
  webApp: {
    webApps: [],
    allWebApps: [],
    webAppById: {
      attacker_model: '',
      ip_address: '',
      greybox: false,
      blackbox: false,
      work_type: '',
    },
    count: 0,
    filters: '',
    page: 1,
    offset: 0,
    limit: 10,
    logs: [],
  },
  api: {
    api: [],
    allApi: [],
    apiById: {
      ip_address: '',
      greybox: false,
      blackbox: false,
      attacker_model: '',
      work_type: '',
    },
    count: 0,
    filters: '',
    page: 1,
    offset: 0,
    limit: 10,
    logs: [],
  },
  mobileApp: {
    mobileApps: [],
    allMobileApps: [],
    mobileAppById: {
      app_name: '',
      platform_type: '',
      greybox: false,
      blackbox: false,
    },
    count: 0,
    filters: '',
    page: 1,
    offset: 0,
    limit: 10,
    logs: [],
  },
  networkDevice: {
    networkDevices: [],
    allNetworkDevices: [],
    networkDeviceById: {
      ip_address: '',
      greybox: false,
      blackbox: false,
      attacker_model: '',
      work_type: '',
    },
    count: 0,
    filters: '',
    page: 1,
    offset: 0,
    limit: 10,
    logs: [],
  },
  server: {
    servers: [],
    allServers: [],
    serverById: {
      attacker_model: '',
      ip_address: '',
      greybox: false,
      blackbox: false,
      work_type: '',
    },
    count: 0,
    filters: '',
    page: 1,
    offset: 0,
    limit: 10,
    logs: [],
  },
  arm: {
    arm: [],
    allArm: [],
    armById: {
      ip_address: '',
      greybox: false,
      blackbox: false,
      attacker_model: '',
      work_type: '',
    },
    count: 0,
    filters: '',
    page: 1,
    offset: 0,
    limit: 10,
    logs: [],
  },
  wifi: {
    wifies: [],
    allWifies: [],
    wifiById: {
      attacker_model: '',
      bssid: '',
      ssid: '',
      greybox: false,
      blackbox: false,
    },
    count: 0,
    filters: '',
    page: 1,
    offset: 0,
    limit: 10,
    logs: [],
  },
  socialEngineering: {
    socialEngineering: [],
    allSocialEngineering: [],
    socialEngineeringById: {
      success_criterion: '',
    },
    count: 0,
    filters: '',
    page: 1,
    offset: 0,
    limit: 10,
    logs: [],
  },
  desktopApp: {
    desktopApps: [],
    allDesktopApps: [],
    desktopAppById: {
      app_name: '',
      platform_type: '',
      greybox: false,
      blackbox: false,
    },
    count: 0,
    filters: '',
    page: 1,
    offset: 0,
    limit: 10,
    logs: [],
  },
  sourceCode: {
    sourceCodes: [],
    allSourceCodes: [],
    sourceCodeById: {
      number_rows: 0,
      programming_language: [],
    },
    count: 0,
    filters: '',
    page: 1,
    offset: 0,
    limit: 10,
    logs: [],
  },
  external: {
    externals: [],
    allExternals: [],
    externalById: {
      ip_address: '',
    },
    count: 0,
    filters: '',
    page: 1,
    offset: 0,
    limit: 10,
    logs: [],
  },
  internal: {
    internals: [],
    allInternals: [],
    internalById: {
      ip_address: '',
    },
    count: 0,
    filters: '',
    page: 1,
    offset: 0,
    limit: 10,
    logs: [],
  },
  other: {
    others: [],
    allOthers: [],
    otherById: {
      ip_address: '',
    },
    count: 0,
    filters: '',
    page: 1,
    offset: 0,
    limit: 10,
    logs: [],
  },
  errors: {
    webAppErrors: {
      attacker_model_error: '',
      work_type_error: '',
      ip_address_error: '',
      test_method_error: '',
    },
    apiErrors: {
      ip_address_error: '',
      attacker_model_error: '',
      work_type_error: '',
      test_method_error: '',
    },
    mobileAppErrors: {
      app_name_error: '',
      platform_error: '',
      test_method_error: '',
    },
    networkDeviceErrors: {
      work_type_error: '',
      attacker_model_error: '',
      ip_address_error: '',
      test_method_error: '',
    },
    serverErrors: {
      work_type_error: '',
      attacker_model_error: '',
      ip_address_error: '',
      test_method_error: '',
    },
    armErrors: {
      work_type_error: '',
      attacker_model_error: '',
      ip_address_error: '',
      test_method_error: '',
    },
    wifiErrors: {
      ssid_error: '',
      bssid_error: '',
      attacker_model_error: '',
      test_method_error: '',
    },
    socialEngineeringErrors: {
      success_criterion_error: '',
    },
    desktopAppErrors: {
      app_name_error: '',
      platform_type_error: '',
      test_method_error: '',
    },
    sourceCodeErrors: {
      number_rows_error: '',
    },
    externalErrors: {
      ip_address_error: '',
    },
    internalErrors: {
      ip_address_error: '',
    },
    otherErrors: {
      ip_address_error: '',
    },
  },
  pentesters: [],
  pentesterById: {
    id: '',
    email: '',
    first_name: '',
    role: '',
  },
  isLoading: false,
  isChangeDone: false,
  isPentesterAppointed: false,
  error: null,
  status: null,
  notificationTitle: '',
  selectTab: OBJECT_TYPES.Base,
};

export const objectsSlice = createSlice({
  name: 'objects',
  initialState,
  reducers: {
    setSelectTab(state, action) {
      state.selectTab = action.payload;
    },
    setChangeDone(state, action) {
      state.isChangeDone = action.payload;
    },
    setPentesterAppointed(state, action) {
      state.isPentesterAppointed = action.payload;
    },

    setBaseFiltersText(state, action) {
      state.base.filters = action.payload;
    },
    setWebAppFiltersText(state, action) {
      state.webApp.filters = action.payload;
    },
    setApiFiltersText(state, action) {
      state.api.filters = action.payload;
    },
    setMobileAppFiltersText(state, action) {
      state.mobileApp.filters = action.payload;
    },
    setNetworkDeviceFiltersText(state, action) {
      state.networkDevice.filters = action.payload;
    },
    setServerFiltersText(state, action) {
      state.server.filters = action.payload;
    },
    setArmFiltersText(state, action) {
      state.arm.filters = action.payload;
    },
    setWifiFiltersText(state, action) {
      state.wifi.filters = action.payload;
    },
    setSocialEngineeringFiltersText(state, action) {
      state.socialEngineering.filters = action.payload;
    },
    setDesktopAppFiltersText(state, action) {
      state.desktopApp.filters = action.payload;
    },
    setSourceCodeFiltersText(state, action) {
      state.sourceCode.filters = action.payload;
    },
    setExternalFiltersText(state, action) {
      state.external.filters = action.payload;
    },
    setInternalFiltersText(state, action) {
      state.internal.filters = action.payload;
    },
    setOtherFiltersText(state, action) {
      state.other.filters = action.payload;
    },

    setBasePage(state, action) {
      state.base.page = action.payload;
    },
    setWebAppPage(state, action) {
      state.webApp.page = action.payload;
    },
    setApiPage(state, action) {
      state.api.page = action.payload;
    },
    setMobileAppPage(state, action) {
      state.mobileApp.page = action.payload;
    },
    setNetworkDevicePage(state, action) {
      state.networkDevice.page = action.payload;
    },
    setServerPage(state, action) {
      state.server.page = action.payload;
    },
    setArmPage(state, action) {
      state.arm.page = action.payload;
    },
    setWifiPage(state, action) {
      state.wifi.page = action.payload;
    },
    setSocialEngineeringPage(state, action) {
      state.socialEngineering.page = action.payload;
    },
    setDesktopAppPage(state, action) {
      state.desktopApp.page = action.payload;
    },
    setSourceCodePage(state, action) {
      state.sourceCode.page = action.payload;
    },
    setExternalPage(state, action) {
      state.external.page = action.payload;
    },
    setInternalPage(state, action) {
      state.internal.page = action.payload;
    },
    setOtherPage(state, action) {
      state.other.page = action.payload;
    },

    setBaseOffset(state, action) {
      state.base.offset = action.payload;
    },
    setWebAppOffset(state, action) {
      state.webApp.offset = action.payload;
    },
    setApiOffset(state, action) {
      state.api.offset = action.payload;
    },
    setMobileAppOffset(state, action) {
      state.mobileApp.offset = action.payload;
    },
    setNetworkDeviceOffset(state, action) {
      state.networkDevice.offset = action.payload;
    },
    setServerOffset(state, action) {
      state.server.offset = action.payload;
    },
    setArmOffset(state, action) {
      state.arm.offset = action.payload;
    },
    setWifiOffset(state, action) {
      state.wifi.offset = action.payload;
    },
    setSocialEngineeringOffset(state, action) {
      state.socialEngineering.offset = action.payload;
    },
    setDesktopAppOffset(state, action) {
      state.desktopApp.offset = action.payload;
    },
    setSourceCodeOffset(state, action) {
      state.sourceCode.offset = action.payload;
    },
    setExternalOffset(state, action) {
      state.external.offset = action.payload;
    },
    setInternalOffset(state, action) {
      state.internal.offset = action.payload;
    },
    setOtherOffset(state, action) {
      state.other.offset = action.payload;
    },

    setWebAppAttackerError(state, action) {
      state.errors.webAppErrors.attacker_model_error = action.payload;
    },
    setWebAppWorkTypeError(state, action) {
      state.errors.webAppErrors.work_type_error = action.payload;
    },
    setWebAppAddressIpError(state, action) {
      state.errors.webAppErrors.ip_address_error = action.payload;
    },
    setWebAppTestMethodError(state, action) {
      state.errors.webAppErrors.test_method_error = action.payload;
    },

    setApiAddressIpError(state, action) {
      state.errors.apiErrors.ip_address_error = action.payload;
    },
    setApiAttackerModelError(state, action) {
      state.errors.apiErrors.attacker_model_error = action.payload;
    },
    setApiWorkTypeError(state, action) {
      state.errors.apiErrors.work_type_error = action.payload;
    },
    setApiTestMethodError(state, action) {
      state.errors.apiErrors.test_method_error = action.payload;
    },

    setMobileAppNameError(state, action) {
      state.errors.mobileAppErrors.app_name_error = action.payload;
    },
    setMobileAppPlatformError(state, action) {
      state.errors.mobileAppErrors.platform_error = action.payload;
    },
    setMobileAppTestMethodError(state, action) {
      state.errors.mobileAppErrors.test_method_error = action.payload;
    },

    setNetworkDeviceAddressIpError(state, action) {
      state.errors.networkDeviceErrors.ip_address_error = action.payload;
    },
    setNetworkDeviceAttackerModelError(state, action) {
      state.errors.networkDeviceErrors.attacker_model_error = action.payload;
    },
    setNetworkDeviceWorkTypeError(state, action) {
      state.errors.networkDeviceErrors.work_type_error = action.payload;
    },
    setNetworkDeviceTestMethodError(state, action) {
      state.errors.networkDeviceErrors.test_method_error = action.payload;
    },

    setServerAddressIpError(state, action) {
      state.errors.serverErrors.ip_address_error = action.payload;
    },
    setServerWorkTypeError(state, action) {
      state.errors.serverErrors.work_type_error = action.payload;
    },
    setServerAttackerModelError(state, action) {
      state.errors.serverErrors.attacker_model_error = action.payload;
    },
    setServerTestMethodError(state, action) {
      state.errors.serverErrors.test_method_error = action.payload;
    },

    setArmAddressIpError(state, action) {
      state.errors.armErrors.ip_address_error = action.payload;
    },
    setArmAttackerModelError(state, action) {
      state.errors.armErrors.attacker_model_error = action.payload;
    },
    setArmWorkTypeError(state, action) {
      state.errors.armErrors.work_type_error = action.payload;
    },
    setArmTestMethodError(state, action) {
      state.errors.armErrors.test_method_error = action.payload;
    },

    setWifiSsidError(state, action) {
      state.errors.wifiErrors.ssid_error = action.payload;
    },
    setWifiBssidError(state, action) {
      state.errors.wifiErrors.bssid_error = action.payload;
    },
    setWifiAttackerModelError(state, action) {
      state.errors.wifiErrors.attacker_model_error = action.payload;
    },
    setWifiTestMethodError(state, action) {
      state.errors.wifiErrors.test_method_error = action.payload;
    },

    setSocialEngineeringSuccessCriterionError(state, action) {
      state.errors.socialEngineeringErrors.success_criterion_error = action.payload;
    },

    setDesktopAppNameError(state, action) {
      state.errors.desktopAppErrors.app_name_error = action.payload;
    },
    setDesktopAppPlatformTypeError(state, action) {
      state.errors.desktopAppErrors.platform_type_error = action.payload;
    },
    setDesktopAppTestMethodError(state, action) {
      state.errors.desktopAppErrors.test_method_error = action.payload;
    },

    setSourceCodeNumberRowsError(state, action) {
      state.errors.sourceCodeErrors.number_rows_error = action.payload;
    },

    setExternalIpAddressError(state, action) {
      state.errors.externalErrors.ip_address_error = action.payload;
    },

    setInternalIpAddressError(state, action) {
      state.errors.internalErrors.ip_address_error = action.payload;
    },

    setOtherIpAddressError(state, action) {
      state.errors.otherErrors.ip_address_error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getObjects.fulfilled, (state, action) => {
        state.isLoading = false;

        switch(action.payload.objectType) {
        case OBJECT_TYPES.Base: {
          state.base.base = action.payload.data.data;
          state.base.count = action.payload.data.count;

          break;
        }

        case OBJECT_TYPES.WebApp: {
          state.webApp.webApps = action.payload.data.data;
          state.webApp.count = action.payload.data.count;

          break;
        }

        case OBJECT_TYPES.API: {
          state.api.api = action.payload.data.data;
          state.api.count = action.payload.data.count;

          break;
        }

        case OBJECT_TYPES.MobileApp: {
          state.mobileApp.mobileApps = action.payload.data.data;
          state.mobileApp.count = action.payload.data.count;

          break;
        }

        case OBJECT_TYPES.NetworkDevice: {
          state.networkDevice.networkDevices = action.payload.data.data;
          state.networkDevice.count = action.payload.data.count;

          break;
        }

        case OBJECT_TYPES.Server: {
          state.server.servers = action.payload.data.data;
          state.server.count = action.payload.data.count;

          break;
        }

        case OBJECT_TYPES.ARM: {
          state.arm.arm = action.payload.data.data;
          state.arm.count = action.payload.data.count;

          break;
        }

        case OBJECT_TYPES.WiFi: {
          state.wifi.wifies = action.payload.data.data;
          state.wifi.count = action.payload.data.count;

          break;
        }

        case OBJECT_TYPES.SocialEngineering: {
          state.socialEngineering.socialEngineering = action.payload.data.data;
          state.socialEngineering.count = action.payload.data.count;

          break;
        }

        case OBJECT_TYPES.DesktopApp: {
          state.desktopApp.desktopApps = action.payload.data.data;
          state.desktopApp.count = action.payload.data.count;

          break;
        }

        case OBJECT_TYPES.SourceCode: {
          state.sourceCode.sourceCodes = action.payload.data.data;
          state.sourceCode.count = action.payload.data.count;

          break;
        }

        case OBJECT_TYPES.External: {
          state.external.externals = action.payload.data.data;
          state.external.count = action.payload.data.count;

          break;
        }

        case OBJECT_TYPES.Internal: {
          state.internal.internals = action.payload.data.data;
          state.internal.count = action.payload.data.count;

          break;
        }

        case OBJECT_TYPES.Other: {
          state.other.others = action.payload.data.data;
          state.other.count = action.payload.data.count;

          break;
        }
        }
      })
      .addCase(getObjects.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status = null;
      })
      .addCase(getAllObjects.fulfilled, (state, action) => {
        state.isLoading = false;

        switch(action.payload.objectType) {
        case OBJECT_TYPES.WebApp: {
          state.webApp.allWebApps = action.payload.data.data;

          break;
        }

        case OBJECT_TYPES.API: {
          state.api.allApi = action.payload.data.data;

          break;
        }

        case OBJECT_TYPES.MobileApp: {
          state.mobileApp.allMobileApps = action.payload.data.data;

          break;
        }

        case OBJECT_TYPES.NetworkDevice: {
          state.networkDevice.allNetworkDevices = action.payload.data.data;

          break;
        }

        case OBJECT_TYPES.Server: {
          state.server.allServers = action.payload.data.data;

          break;
        }

        case OBJECT_TYPES.ARM: {
          state.arm.allArm = action.payload.data.data;

          break;
        }

        case OBJECT_TYPES.WiFi: {
          state.wifi.allWifies = action.payload.data.data;

          break;
        }

        case OBJECT_TYPES.SocialEngineering: {
          state.socialEngineering.allSocialEngineering = action.payload.data.data;

          break;
        }

        case OBJECT_TYPES.DesktopApp: {
          state.desktopApp.allDesktopApps = action.payload.data.data;

          break;
        }

        case OBJECT_TYPES.SourceCode: {
          state.sourceCode.allSourceCodes = action.payload.data.data;

          break;
        }

        case OBJECT_TYPES.External: {
          state.external.allExternals = action.payload.data.data;

          break;
        }

        case OBJECT_TYPES.Internal: {
          state.internal.allInternals = action.payload.data.data;

          break;
        }

        case OBJECT_TYPES.Other: {
          state.other.allOthers = action.payload.data.data;

          break;
        }
        }
      })
      .addCase(getObjectCounts.fulfilled, (state, action) => {
        state.isLoading = false;

        action.payload.forEach(({ type, count }) => {
          switch(type) {
          case OBJECT_TYPES.Base: {
            state.base.count = count;

            break;
          }

          case OBJECT_TYPES.WebApp: {
            state.webApp.count = count;

            break;
          }

          case OBJECT_TYPES.API: {
            state.api.count = count;

            break;
          }

          case OBJECT_TYPES.MobileApp: {
            state.mobileApp.count = count;

            break;
          }

          case OBJECT_TYPES.NetworkDevice: {
            state.networkDevice.count = count;

            break;
          }

          case OBJECT_TYPES.Server: {
            state.server.count = count;

            break;
          }

          case OBJECT_TYPES.ARM: {
            state.arm.count = count;

            break;
          }

          case OBJECT_TYPES.WiFi: {
            state.wifi.count = count;

            break;
          }

          case OBJECT_TYPES.SocialEngineering: {
            state.socialEngineering.count = count;

            break;
          }

          case OBJECT_TYPES.DesktopApp: {
            state.desktopApp.count = count;

            break;
          }

          case OBJECT_TYPES.SourceCode: {
            state.sourceCode.count = count;

            break;
          }

          case OBJECT_TYPES.External: {
            state.external.count = count;

            break;
          }

          case OBJECT_TYPES.Internal: {
            state.internal.count = count;

            break;
          }

          case OBJECT_TYPES.Other: {
            state.other.count = count;

            break;
          }
          }
        });
      })
      .addCase(getObjectCounts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status = null;
      })
      .addCase(getBaseObjects.fulfilled, (state, action) => {
        state.isLoading = false;

        state.base.count = action.payload.data.count;
        state.base.base = action.payload.data.data;
      })
      .addCase(getBaseObjects.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status = null;
      })
      .addCase(createObject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = action.payload.status;

        switch (action.payload.objectType) {
        case OBJECT_TYPES.WebApp: {
          state.notificationTitle = 'Веб-приложение';
          state.webApp.count += 1;
          state.base.count += 1;
          state.webApp.allWebApps.push(action.payload.object);
          state.base.base.push(action.payload.object);

          state.webApp.webApps.length < 10 && state.webApp.webApps.push(action.payload.object);

          break;
        }

        case OBJECT_TYPES.API: {
          state.notificationTitle = 'API';
          state.api.count += 1;
          state.base.count += 1;
          state.api.allApi.push(action.payload.object);
          state.base.base.push(action.payload.object);

          state.api.api.length < 10 && state.api.api.push(action.payload.object);

          break;
        }

        case OBJECT_TYPES.MobileApp: {
          state.notificationTitle = 'Мобильное приложение';
          state.mobileApp.count += 1;
          state.base.count += 1;
          state.mobileApp.allMobileApps.push(action.payload.object);
          state.base.base.push(action.payload.object);

          state.mobileApp.mobileApps.length < 10 && state.mobileApp.mobileApps.push(action.payload.object);

          break;
        }

        case OBJECT_TYPES.NetworkDevice: {
          state.notificationTitle = 'Сетевое устройство';
          state.networkDevice.count += 1;
          state.base.count += 1;
          state.networkDevice.allNetworkDevices.push(action.payload.object);
          state.base.base.push(action.payload.object);

          state.networkDevice.networkDevices.length < 10 &&
          state.networkDevice.networkDevices.push(action.payload.object);

          break;
        }

        case OBJECT_TYPES.Server: {
          state.notificationTitle = 'Сервер';
          state.server.count += 1;
          state.base.count += 1;
          state.server.allServers.push(action.payload.object);
          state.base.base.push(action.payload.object);

          state.server.servers.length < 10 && state.server.servers.push(action.payload.object);

          break;
        }

        case OBJECT_TYPES.ARM: {
          state.notificationTitle = 'АРМ';
          state.arm.count += 1;
          state.base.count += 1;
          state.arm.allArm.push(action.payload.object);
          state.base.base.push(action.payload.object);

          state.arm.arm.length < 10 && state.arm.arm.push(action.payload.object);

          break;
        }

        case OBJECT_TYPES.WiFi: {
          state.notificationTitle = 'WiFi';
          state.wifi.count += 1;
          state.base.count += 1;
          state.wifi.allWifies.push(action.payload.object);
          state.base.base.push(action.payload.object);

          state.wifi.wifies.length < 10 && state.wifi.wifies.push(action.payload.object);

          break;
        }

        case OBJECT_TYPES.SocialEngineering: {
          state.notificationTitle = 'Социальная инженерия';
          state.socialEngineering.count += 1;
          state.base.count += 1;
          state.socialEngineering.allSocialEngineering.push(action.payload.object);
          state.base.base.push(action.payload.object);

          state.socialEngineering.socialEngineering.length < 10 &&
          state.socialEngineering.socialEngineering.push(action.payload.object);

          break;
        }

        case OBJECT_TYPES.DesktopApp: {
          state.notificationTitle = 'Десктопное приложение';
          state.desktopApp.count += 1;
          state.base.count += 1;
          state.desktopApp.allDesktopApps.push(action.payload.object);
          state.base.base.push(action.payload.object);

          state.desktopApp.desktopApps.length < 10 && state.desktopApp.desktopApps.push(action.payload.object);

          break;
        }

        case OBJECT_TYPES.SourceCode: {
          state.notificationTitle = 'Исходный код';
          state.sourceCode.count += 1;
          state.base.count += 1;
          state.sourceCode.allSourceCodes.push(action.payload.object);
          state.base.base.push(action.payload.object);

          state.sourceCode.sourceCodes.length < 10 && state.sourceCode.sourceCodes.push(action.payload.object);

          break;
        }

        case OBJECT_TYPES.External: {
          state.notificationTitle = 'Внешний IP адрес';
          state.external.count += 1;
          state.base.count += 1;
          state.external.allExternals.push(action.payload.object);
          state.base.base.push(action.payload.object);

          state.external.externals.length < 10 && state.external.externals.push(action.payload.object);

          break;
        }

        case OBJECT_TYPES.Internal: {
          state.notificationTitle = 'Внутренний IP адрес';
          state.internal.count += 1;
          state.base.count += 1;
          state.internal.allInternals.push(action.payload.object);
          state.base.base.push(action.payload.object);

          state.internal.internals.length < 10 && state.internal.internals.push(action.payload.object);

          break;
        }

        case OBJECT_TYPES.Other: {
          state.notificationTitle = 'Другой объект';
          state.other.count += 1;
          state.base.count += 1;
          state.other.allOthers.push(action.payload.object);
          state.base.base.push(action.payload.object);

          state.other.others.length < 10 && state.other.others.push(action.payload.object);

          break;
        }
        }
      })
      .addCase(createObject.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status = null;
      })
      .addCase(getObjectById.fulfilled, (state, action) => {
        state.isLoading = false;

        switch (action.payload.objectType) {
        case OBJECT_TYPES.WebApp: {
          state.webApp.webAppById = action.payload.object;

          break;
        }

        case OBJECT_TYPES.API: {
          state.api.apiById = action.payload.object;

          break;
        }

        case OBJECT_TYPES.MobileApp: {
          state.mobileApp.mobileAppById = action.payload.object;

          break;
        }

        case OBJECT_TYPES.NetworkDevice: {
          state.networkDevice.networkDeviceById = action.payload.object;

          break;
        }

        case OBJECT_TYPES.Server: {
          state.server.serverById = action.payload.object;

          break;
        }

        case OBJECT_TYPES.ARM: {
          state.arm.armById = action.payload.object;

          break;
        }

        case OBJECT_TYPES.WiFi: {
          state.wifi.wifiById = action.payload.object;

          break;
        }

        case OBJECT_TYPES.SocialEngineering: {
          state.socialEngineering.socialEngineeringById = action.payload.object;

          break;
        }

        case OBJECT_TYPES.DesktopApp: {
          state.desktopApp.desktopAppById = action.payload.object;

          break;
        }

        case OBJECT_TYPES.SourceCode: {
          state.sourceCode.sourceCodeById = action.payload.object;

          break;
        }

        case OBJECT_TYPES.External: {
          state.external.externalById = action.payload.object;

          break;
        }

        case OBJECT_TYPES.Internal: {
          state.internal.internalById = action.payload.object;

          break;
        }

        case OBJECT_TYPES.Other: {
          state.other.otherById = action.payload.object;

          break;
        }
        }
      })
      .addCase(getObjectById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status = null;
      })
      .addCase(getObjectLogs.fulfilled, (state, action) => {
        state.isLoading = false;

        switch (action.payload.objectType) {
        case OBJECT_TYPES.WebApp: {
          state.webApp.logs = action.payload.data;

          break;
        }

        case OBJECT_TYPES.API: {
          state.api.logs = action.payload.data;

          break;
        }

        case OBJECT_TYPES.MobileApp: {
          state.mobileApp.logs = action.payload.data;

          break;
        }

        case OBJECT_TYPES.NetworkDevice: {
          state.networkDevice.logs = action.payload.data;

          break;
        }

        case OBJECT_TYPES.Server: {
          state.server.logs = action.payload.data;

          break;
        }

        case OBJECT_TYPES.ARM: {
          state.arm.logs = action.payload.data;

          break;
        }

        case OBJECT_TYPES.WiFi: {
          state.wifi.logs = action.payload.data;

          break;
        }

        case OBJECT_TYPES.SocialEngineering: {
          state.socialEngineering.logs = action.payload.data;

          break;
        }

        case OBJECT_TYPES.DesktopApp: {
          state.desktopApp.logs = action.payload.data;

          break;
        }

        case OBJECT_TYPES.SourceCode: {
          state.sourceCode.logs = action.payload.data;

          break;
        }

        case OBJECT_TYPES.External: {
          state.external.logs = action.payload.data;

          break;
        }

        case OBJECT_TYPES.Internal: {
          state.internal.logs = action.payload.data;

          break;
        }

        case OBJECT_TYPES.Other: {
          state.other.logs = action.payload.data;

          break;
        }
        }
      })
      .addCase(deleteObject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = action.payload.status;

        switch (action.payload.objectType) {
        case OBJECT_TYPES.WebApp: {
          state.notificationTitle = 'Веб-приложение';
          state.webApp.count -= 1;
          state.base.count -= 1;
          state.webApp.webApps = state.webApp.webApps.filter(({ id }: IWebApp) => id !== action.payload.id);

          break;
        }

        case OBJECT_TYPES.API: {
          state.notificationTitle = 'API';
          state.api.count -= 1;
          state.base.count -= 1;
          state.api.api = state.api.api.filter(({ id }: IApi) => id !== action.payload.id);

          break;
        }

        case OBJECT_TYPES.MobileApp: {
          state.notificationTitle = 'Мобильное приложение';
          state.mobileApp.count -= 1;
          state.base.count -= 1;
          state.mobileApp.mobileApps =
            state.mobileApp.mobileApps.filter(({ id }: IMobileApp) => id !== action.payload.id);

          break;
        }

        case OBJECT_TYPES.NetworkDevice: {
          state.notificationTitle = 'Сетевое устройство';
          state.networkDevice.count -= 1;
          state.base.count -= 1;
          state.networkDevice.networkDevices = state.networkDevice.networkDevices.filter(({ id }: INetworkDevice) => id !== action.payload.id);

          break;
        }

        case OBJECT_TYPES.Server: {
          state.notificationTitle = 'Сервер';
          state.server.count -= 1;
          state.base.count -= 1;
          state.server.servers = state.server.servers.filter(({ id }: IServer) => id !== action.payload.id);

          break;
        }

        case OBJECT_TYPES.ARM: {
          state.notificationTitle = 'АРМ';
          state.arm.count -= 1;
          state.base.count -= 1;
          state.arm.arm = state.arm.arm.filter(({ id }: IArm) => id !== action.payload.id);

          break;
        }

        case OBJECT_TYPES.WiFi: {
          state.notificationTitle = 'WiFi';
          state.wifi.count -= 1;
          state.base.count -= 1;
          state.wifi.wifies = state.wifi.wifies.filter(({ id }: IWifi) => id !== action.payload.id);

          break;
        }

        case OBJECT_TYPES.SocialEngineering: {
          state.notificationTitle = 'Социальная инженерия';
          state.socialEngineering.count -= 1;
          state.base.count -= 1;
          state.socialEngineering.socialEngineering =
            state.socialEngineering.socialEngineering.filter(({ id }: ISocialEngineering) => id !== action.payload.id);

          break;
        }

        case OBJECT_TYPES.DesktopApp: {
          state.notificationTitle = 'Десктопное приложение';
          state.desktopApp.count -= 1;
          state.base.count -= 1;
          state.desktopApp.desktopApps =
            state.desktopApp.desktopApps.filter(({ id }: IDesktopApp) => id !== action.payload.id);

          break;
        }

        case OBJECT_TYPES.SourceCode: {
          state.notificationTitle = 'Исходный код';
          state.sourceCode.count -= 1;
          state.base.count -= 1;
          state.sourceCode.sourceCodes =
            state.sourceCode.sourceCodes.filter(({ id }: ISourceCode) => id !== action.payload.id);

          break;
        }

        case OBJECT_TYPES.External: {
          state.notificationTitle = 'Внешний IP адрес';
          state.external.count -= 1;
          state.base.count -= 1;
          state.external.externals =
            state.external.externals.filter(({ id }: IExternal) => id !== action.payload.id);

          break;
        }

        case OBJECT_TYPES.Internal: {
          state.notificationTitle = 'Внутренний IP адрес';
          state.internal.count -= 1;
          state.base.count -= 1;
          state.internal.internals =
            state.internal.internals.filter(({ id }: IInternal) => id !== action.payload.id);

          break;
        }

        case OBJECT_TYPES.Other: {
          state.notificationTitle = 'Другой объект';
          state.other.count -= 1;
          state.base.count -= 1;
          state.other.others = state.other.others.filter(({ id }: IOther) => id !== action.payload.id);

          break;
        }
        }
      })
      .addCase(deleteObject.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status = null;
      })
      .addCase(changeObject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = action.payload.status;

        if (action.payload.objectType === action.payload.currentObjectType) {
          switch (action.payload.objectType) {
          case OBJECT_TYPES.WebApp: {
            state.notificationTitle = 'Веб-приложение';
            state.webApp.webApps.forEach((webApp: IWebApp) => {
              if (webApp.id === action.payload.object.id) {
                webApp.inf_system = action.payload.object.inf_system;
                webApp.ip_address = action.payload.object.ip_address;
                webApp.domain_name = action.payload.object.domain_name;
                webApp.greybox = action.payload.object.greybox;
                webApp.blackbox = action.payload.object.blackbox;
                webApp.attacker_model = action.payload.object.attacker_model;
                webApp.work_type = action.payload.object.work_type;
                webApp.additional_info = action.payload.object.additional_info;
              }
            });

            state.webApp.allWebApps.forEach((webApp: IWebApp) => {
              if (webApp.id === action.payload.object.id) {
                webApp.inf_system = action.payload.object.inf_system;
                webApp.ip_address = action.payload.object.ip_address;
                webApp.domain_name = action.payload.object.domain_name;
                webApp.greybox = action.payload.object.greybox;
                webApp.blackbox = action.payload.object.blackbox;
                webApp.attacker_model = action.payload.object.attacker_model;
                webApp.work_type = action.payload.object.work_type;
                webApp.additional_info = action.payload.object.additional_info;
              }
            });

            state.webApp.webAppById = action.payload.object;

            break;
          }

          case OBJECT_TYPES.API: {
            state.notificationTitle = 'API';
            state.api.api.forEach((api: IApi) => {
              if (api.id === action.payload.object.id) {
                api.inf_system = action.payload.object.inf_system;
                api.ip_address = action.payload.object.ip_address;
                api.domain_name = action.payload.object.domain_name;
                api.greybox = action.payload.object.greybox;
                api.blackbox = action.payload.object.blackbox;
                api.attacker_model = action.payload.object.attacker_model;
                api.work_type = action.payload.object.work_type;
                api.additional_info = action.payload.object.additional_info;
              }
            });

            state.api.allApi.forEach((api: IApi) => {
              if (api.id === action.payload.object.id) {
                api.inf_system = action.payload.object.inf_system;
                api.ip_address = action.payload.object.ip_address;
                api.domain_name = action.payload.object.domain_name;
                api.greybox = action.payload.object.greybox;
                api.blackbox = action.payload.object.blackbox;
                api.attacker_model = action.payload.object.attacker_model;
                api.work_type = action.payload.object.work_type;
                api.additional_info = action.payload.object.additional_info;
              }
            });

            state.api.apiById = action.payload.object;

            break;
          }

          case OBJECT_TYPES.MobileApp: {
            state.notificationTitle = 'Мобильное приложение';
            state.mobileApp.mobileApps.forEach((mobileApp: IMobileApp) => {
              if (mobileApp.id === action.payload.object.id) {
                mobileApp.inf_system = action.payload.object.inf_system;
                mobileApp.app_name = action.payload.object.app_name;
                mobileApp.platform_type = action.payload.object.platform_type;
                mobileApp.greybox = action.payload.object.greybox;
                mobileApp.blackbox = action.payload.object.blackbox;
                mobileApp.additional_info = action.payload.object.additional_info;
              }
            });

            state.mobileApp.allMobileApps.forEach((mobileApp: IMobileApp) => {
              if (mobileApp.id === action.payload.object.id) {
                mobileApp.inf_system = action.payload.object.inf_system;
                mobileApp.app_name = action.payload.object.app_name;
                mobileApp.platform_type = action.payload.object.platform_type;
                mobileApp.greybox = action.payload.object.greybox;
                mobileApp.blackbox = action.payload.object.blackbox;
                mobileApp.additional_info = action.payload.object.additional_info;
              }
            });

            state.mobileApp.mobileAppById = action.payload.object;

            break;
          }

          case OBJECT_TYPES.NetworkDevice: {
            state.notificationTitle = 'Сетевое устройство';
            state.networkDevice.networkDevices.forEach((networkDevice: INetworkDevice) => {
              if (networkDevice.id === action.payload.object.id) {
                networkDevice.inf_system = action.payload.object.inf_system;
                networkDevice.ip_address = action.payload.object.ip_address;
                networkDevice.network_device_name = action.payload.object.network_device_name;
                networkDevice.assignment = action.payload.object.assignment;
                networkDevice.greybox = action.payload.object.greybox;
                networkDevice.blackbox = action.payload.object.blackbox;
                networkDevice.additional_info = action.payload.object.additional_info;
                networkDevice.attacker_model = action.payload.object.attacker_model;
                networkDevice.work_type = action.payload.object.work_type;
              }
            });

            state.networkDevice.allNetworkDevices.forEach((networkDevice: INetworkDevice) => {
              if (networkDevice.id === action.payload.object.id) {
                networkDevice.inf_system = action.payload.object.inf_system;
                networkDevice.ip_address = action.payload.object.ip_address;
                networkDevice.network_device_name = action.payload.object.network_device_name;
                networkDevice.assignment = action.payload.object.assignment;
                networkDevice.greybox = action.payload.object.greybox;
                networkDevice.blackbox = action.payload.object.blackbox;
                networkDevice.additional_info = action.payload.object.additional_info;
                networkDevice.attacker_model = action.payload.object.attacker_model;
                networkDevice.work_type = action.payload.object.work_type;
              }
            });

            state.networkDevice.networkDeviceById = action.payload.object;

            break;
          }

          case OBJECT_TYPES.Server: {
            state.notificationTitle = 'Сервер';
            state.server.servers.forEach((server: IServer) => {
              if (server.id === action.payload.object.id) {
                server.inf_system = action.payload.object.inf_system;
                server.ip_address = action.payload.object.ip_address;
                server.network_device_name = action.payload.object.network_device_name;
                server.assignment = action.payload.object.assignment;
                server.greybox = action.payload.object.greybox;
                server.blackbox = action.payload.object.blackbox;
                server.attacker_model = action.payload.object.attacker_model;
                server.work_type = action.payload.object.work_type;
                server.additional_info = action.payload.object.additional_info;
              }
            });

            state.server.allServers.forEach((server: IServer) => {
              if (server.id === action.payload.object.id) {
                server.inf_system = action.payload.object.inf_system;
                server.ip_address = action.payload.object.ip_address;
                server.network_device_name = action.payload.object.network_device_name;
                server.assignment = action.payload.object.assignment;
                server.greybox = action.payload.object.greybox;
                server.blackbox = action.payload.object.blackbox;
                server.attacker_model = action.payload.object.attacker_model;
                server.work_type = action.payload.object.work_type;
                server.additional_info = action.payload.object.additional_info;
              }
            });

            state.server.serverById = action.payload.object;

            break;
          }

          case OBJECT_TYPES.ARM: {
            state.notificationTitle = 'АРМ';
            state.arm.arm.forEach((arm: IArm) => {
              if (arm.id === action.payload.object.id) {
                arm.inf_system = action.payload.object.inf_system;
                arm.ip_address = action.payload.object.ip_address;
                arm.network_device_name = action.payload.object.network_device_name;
                arm.greybox = action.payload.object.greybox;
                arm.blackbox = action.payload.object.blackbox;
                arm.attacker_model = action.payload.object.attacker_model;
                arm.work_type = action.payload.object.work_type;
                arm.additional_info = action.payload.object.additional_info;
              }
            });

            state.arm.allArm.forEach((arm: IArm) => {
              if (arm.id === action.payload.object.id) {
                arm.inf_system = action.payload.object.inf_system;
                arm.ip_address = action.payload.object.ip_address;
                arm.network_device_name = action.payload.object.network_device_name;
                arm.greybox = action.payload.object.greybox;
                arm.blackbox = action.payload.object.blackbox;
                arm.attacker_model = action.payload.object.attacker_model;
                arm.work_type = action.payload.object.work_type;
                arm.additional_info = action.payload.object.additional_info;
              }
            });

            state.arm.armById = action.payload.object;

            break;
          }

          case OBJECT_TYPES.WiFi: {
            state.notificationTitle = 'WiFi';
            state.wifi.wifies.forEach((wifi: IWifi) => {
              if (wifi.id === action.payload.object.id) {
                wifi.office = action.payload.object.office;
                wifi.ssid = action.payload.object.ssid;
                wifi.bssid = action.payload.object.bssid;
                wifi.greybox = action.payload.object.greybox;
                wifi.blackbox = action.payload.object.blackbox;
                wifi.attacker_model = action.payload.object.attacker_model;
                wifi.additional_info = action.payload.object.additional_info;
              }
            });

            state.wifi.allWifies.forEach((wifi: IWifi) => {
              if (wifi.id === action.payload.object.id) {
                wifi.office = action.payload.object.office;
                wifi.ssid = action.payload.object.ssid;
                wifi.bssid = action.payload.object.bssid;
                wifi.greybox = action.payload.object.greybox;
                wifi.blackbox = action.payload.object.blackbox;
                wifi.attacker_model = action.payload.object.attacker_model;
                wifi.additional_info = action.payload.object.additional_info;
              }
            });

            state.wifi.wifiById = action.payload.object;

            break;
          }

          case OBJECT_TYPES.SocialEngineering: {
            state.notificationTitle = 'Социальная инженерия';
            state.socialEngineering.socialEngineering.forEach((socialEngineering: ISocialEngineering) => {
              if (socialEngineering.id === action.payload.object.id) {
                socialEngineering.office = action.payload.object.office;
                socialEngineering.engineering_type = action.payload.object.engineering_type;
                socialEngineering.success_criterion = action.payload.object.success_criterion;
                socialEngineering.additional_info = action.payload.object.additional_info;
              }
            });

            state.socialEngineering.allSocialEngineering.forEach((socialEngineering: ISocialEngineering) => {
              if (socialEngineering.id === action.payload.object.id) {
                socialEngineering.office = action.payload.object.office;
                socialEngineering.engineering_type = action.payload.object.engineering_type;
                socialEngineering.success_criterion = action.payload.object.success_criterion;
                socialEngineering.additional_info = action.payload.object.additional_info;
              }
            });

            state.socialEngineering.socialEngineeringById = action.payload.object;

            break;
          }

          case OBJECT_TYPES.DesktopApp: {
            state.notificationTitle = 'Десктопное приложение';
            state.desktopApp.desktopApps.forEach((desktopApp: IDesktopApp) => {
              if (desktopApp.id === action.payload.object.id) {
                desktopApp.inf_system = action.payload.object.inf_system;
                desktopApp.app_name = action.payload.object.app_name;
                desktopApp.platform_type = action.payload.object.platform_type;
                desktopApp.greybox = action.payload.object.greybox;
                desktopApp.blackbox = action.payload.object.blackbox;
                desktopApp.additional_info = action.payload.object.additional_info;
              }
            });

            state.desktopApp.allDesktopApps.forEach((desktopApp: IDesktopApp) => {
              if (desktopApp.id === action.payload.object.id) {
                desktopApp.inf_system = action.payload.object.inf_system;
                desktopApp.app_name = action.payload.object.app_name;
                desktopApp.platform_type = action.payload.object.platform_type;
                desktopApp.greybox = action.payload.object.greybox;
                desktopApp.blackbox = action.payload.object.blackbox;
                desktopApp.additional_info = action.payload.object.additional_info;
              }
            });

            state.desktopApp.desktopAppById = action.payload.object;

            break;
          }

          case OBJECT_TYPES.SourceCode: {
            state.notificationTitle = 'Исходный код';
            state.sourceCode.sourceCodes.forEach((sourceCode: ISourceCode) => {
              if (sourceCode.id === action.payload.object.id) {
                sourceCode.inf_system = action.payload.object.inf_system;
                sourceCode.programming_language = action.payload.object.programming_language;
                sourceCode.number_rows = action.payload.object.number_rows;
              }
            });

            state.sourceCode.allSourceCodes.forEach((sourceCode: ISourceCode) => {
              if (sourceCode.id === action.payload.object.id) {
                sourceCode.inf_system = action.payload.object.inf_system;
                sourceCode.programming_language = action.payload.object.programming_language;
                sourceCode.number_rows = action.payload.object.number_rows;
              }
            });

            state.sourceCode.sourceCodeById = action.payload.object;

            break;
          }

          case OBJECT_TYPES.External: {
            state.notificationTitle = 'Внешний IP адрес';
            state.external.externals.forEach((external: IExternal) => {
              if (external.id === action.payload.object.id) {
                external.inf_system = action.payload.object.inf_system;
                external.inf_system_id = action.payload.object.inf_system_id;
                external.ip_address = action.payload.object.ip_address;
                external.additional_info = action.payload.object.additional_info;
              }
            });

            state.external.allExternals.forEach((external: IExternal) => {
              if (external.id === action.payload.object.id) {
                external.inf_system = action.payload.object.inf_system;
                external.inf_system_id = action.payload.object.inf_system_id;
                external.ip_address = action.payload.object.ip_address;
                external.additional_info = action.payload.object.additional_info;
              }
            });

            state.external.externalById = action.payload.object;

            break;
          }

          case OBJECT_TYPES.Internal: {
            state.notificationTitle = 'Внутренний IP адрес';
            state.internal.internals.forEach((internal: IInternal) => {
              if (internal.id === action.payload.object.id) {
                internal.inf_system = action.payload.object.inf_system;
                internal.inf_system_id = action.payload.object.inf_system_id;
                internal.ip_address = action.payload.object.ip_address;
                internal.additional_info = action.payload.object.additional_info;
              }
            });

            state.internal.allInternals.forEach((internal: IInternal) => {
              if (internal.id === action.payload.object.id) {
                internal.inf_system = action.payload.object.inf_system;
                internal.inf_system_id = action.payload.object.inf_system_id;
                internal.ip_address = action.payload.object.ip_address;
                internal.additional_info = action.payload.object.additional_info;
              }
            });

            state.internal.internalById = action.payload.object;

            break;
          }

          case OBJECT_TYPES.Other: {
            state.notificationTitle = 'Другое объект';
            state.other.others.forEach((other: IOther) => {
              if (other.id === action.payload.object.id) {
                other.inf_system = action.payload.object.inf_system;
                other.inf_system_id = action.payload.object.inf_system_id;
                other.office = action.payload.object.office;
                other.office_id = action.payload.object.office_id;
                other.ip_address = action.payload.object.ip_address;
                other.additional_info = action.payload.object.additional_info;
              }
            });

            state.other.allOthers.forEach((other: IOther) => {
              if (other.id === action.payload.object.id) {
                other.inf_system = action.payload.object.inf_system;
                other.inf_system_id = action.payload.object.inf_system_id;
                other.office = action.payload.object.office;
                other.office_id = action.payload.object.office_id;
                other.ip_address = action.payload.object.ip_address;
                other.additional_info = action.payload.object.additional_info;
              }
            });

            state.other.otherById = action.payload.object;

            break;
          }
          }
        } else {
          state.isChangeDone = true;
          switch (action.payload.objectType) {
          case OBJECT_TYPES.WebApp: {
            state.notificationTitle = 'Веб-приложение';
            state.webApp.count -= 1;
            state.base.count -= 1;
            state.webApp.webApps = state.webApp.webApps.filter(({ id }: IWebApp) => id !== action.payload.object.id);

            break;
          }

          case OBJECT_TYPES.API: {
            state.notificationTitle = 'API';
            state.api.count -= 1;
            state.base.count -= 1;
            state.api.api = state.api.api.filter(({ id }: IApi) => id !== action.payload.object.id);

            break;
          }

          case OBJECT_TYPES.MobileApp: {
            state.notificationTitle = 'Мобильное приложение';
            state.mobileApp.count -= 1;
            state.base.count -= 1;
            state.mobileApp.mobileApps =
              state.mobileApp.mobileApps.filter(({ id }: IMobileApp) => id !== action.payload.object.id);

            break;
          }

          case OBJECT_TYPES.NetworkDevice: {
            state.notificationTitle = 'Сетевое устройство';
            state.networkDevice.count -= 1;
            state.base.count -= 1;
            state.networkDevice.networkDevices =
              state.networkDevice.networkDevices.filter(({ id }: INetworkDevice) => id !== action.payload.object.id);

            break;
          }

          case OBJECT_TYPES.Server: {
            state.notificationTitle = 'Сервер';
            state.server.count -= 1;
            state.base.count -= 1;
            state.server.servers =
              state.server.servers.filter(({ id }: IServer) => id !== action.payload.object.id);

            break;
          }

          case OBJECT_TYPES.ARM: {
            state.notificationTitle = 'АРМ';
            state.arm.count -= 1;
            state.base.count -= 1;
            state.arm.arm = state.arm.arm.filter(({ id }: IArm) => id !== action.payload.object.id);

            break;
          }

          case OBJECT_TYPES.WiFi: {
            state.notificationTitle = 'WiFi';
            state.wifi.count -= 1;
            state.base.count -= 1;
            state.wifi.wifies = state.wifi.wifies.filter(({ id }: IWifi) => id !== action.payload.object.id);

            break;
          }

          case OBJECT_TYPES.SocialEngineering: {
            state.notificationTitle = 'Социальная инженерия';
            state.socialEngineering.count -= 1;
            state.base.count -= 1;
            state.socialEngineering.socialEngineering =
              state.socialEngineering.socialEngineering.filter(({ id }: ISocialEngineering) => id !== action.payload.object.id);

            break;
          }

          case OBJECT_TYPES.DesktopApp: {
            state.notificationTitle = 'Десктопное приложение';
            state.desktopApp.count -= 1;
            state.base.count -= 1;
            state.desktopApp.desktopApps =
              state.desktopApp.desktopApps.filter(({ id }: IDesktopApp) => id !== action.payload.object.id);

            break;
          }

          case OBJECT_TYPES.SourceCode: {
            state.notificationTitle = 'Исходный код';
            state.sourceCode.count -= 1;
            state.base.count -= 1;
            state.sourceCode.sourceCodes =
              state.sourceCode.sourceCodes.filter(({ id }: ISourceCode) => id !== action.payload.object.id);

            break;
          }

          case OBJECT_TYPES.External: {
            state.notificationTitle = 'Внешний IP адрес';
            state.external.count -= 1;
            state.base.count -= 1;
            state.external.externals =
              state.external.externals.filter(({ id }: IExternal) => id !== action.payload.object.id);

            break;
          }

          case OBJECT_TYPES.Internal: {
            state.notificationTitle = 'Внутренний IP адрес';
            state.internal.count -= 1;
            state.base.count -= 1;
            state.internal.internals =
              state.internal.internals.filter(({ id }: IInternal) => id !== action.payload.object.id);

            break;
          }

          case OBJECT_TYPES.Other: {
            state.notificationTitle = 'Другой объект';
            state.other.count -= 1;
            state.base.count -= 1;
            state.other.others =
              state.other.others.filter(({ id }: IOther) => id !== action.payload.object.id);

            break;
          }
          }

          switch (action.payload.currentObjectType) {
          case OBJECT_TYPES.WebApp: {
            state.webApp.count += 1;
            state.base.count += 1;
            state.webApp.allWebApps.push(action.payload.object);

            state.webApp.webApps.length < 10 && state.webApp.webApps.push(action.payload.object);

            break;
          }

          case OBJECT_TYPES.API: {
            state.api.count += 1;
            state.base.count += 1;
            state.api.allApi.push(action.payload.object);

            state.api.api.length < 10 && state.api.api.push(action.payload.object);

            break;
          }

          case OBJECT_TYPES.MobileApp: {
            state.mobileApp.count += 1;
            state.base.count += 1;
            state.mobileApp.allMobileApps.push(action.payload.object);

            state.mobileApp.mobileApps.length < 10 && state.mobileApp.mobileApps.push(action.payload.object);

            break;
          }

          case OBJECT_TYPES.NetworkDevice: {
            state.networkDevice.count += 1;
            state.base.count += 1;
            state.networkDevice.allNetworkDevices.push(action.payload.object);

            state.networkDevice.networkDevices.length < 10 &&
            state.networkDevice.networkDevices.push(action.payload.object);

            break;
          }

          case OBJECT_TYPES.Server: {
            state.server.count += 1;
            state.base.count += 1;
            state.server.allServers.push(action.payload.object);

            state.server.servers.length < 10 && state.server.servers.push(action.payload.object);

            break;
          }

          case OBJECT_TYPES.ARM: {
            state.arm.count += 1;
            state.base.count += 1;
            state.arm.allArm.push(action.payload.object);

            state.arm.arm.length < 10 && state.arm.arm.push(action.payload.object);

            break;
          }

          case OBJECT_TYPES.WiFi: {
            state.wifi.count += 1;
            state.base.count += 1;
            state.wifi.allWifies.push(action.payload.object);

            state.wifi.wifies.length < 10 && state.wifi.wifies.push(action.payload.object);

            break;
          }

          case OBJECT_TYPES.SocialEngineering: {
            state.socialEngineering.count += 1;
            state.base.count += 1;
            state.socialEngineering.allSocialEngineering.push(action.payload.object);

            state.socialEngineering.socialEngineering.length < 10 &&
            state.socialEngineering.socialEngineering.push(action.payload.object);

            break;
          }

          case OBJECT_TYPES.DesktopApp: {
            state.desktopApp.count += 1;
            state.base.count += 1;
            state.desktopApp.allDesktopApps.push(action.payload.object);

            state.desktopApp.desktopApps.length < 10 && state.desktopApp.desktopApps.push(action.payload.object);

            break;
          }

          case OBJECT_TYPES.SourceCode: {
            state.sourceCode.count += 1;
            state.base.count += 1;
            state.sourceCode.allSourceCodes.push(action.payload.object);

            state.sourceCode.sourceCodes.length < 10 && state.sourceCode.sourceCodes.push(action.payload.object);

            break;
          }

          case OBJECT_TYPES.External: {
            state.external.count += 1;
            state.base.count += 1;
            state.external.allExternals.push(action.payload.object);

            state.external.externals.length < 10 && state.external.externals.push(action.payload.object);

            break;
          }

          case OBJECT_TYPES.Internal: {
            state.internal.count += 1;
            state.base.count += 1;
            state.internal.allInternals.push(action.payload.object);

            state.internal.internals.length < 10 && state.internal.internals.push(action.payload.object);

            break;
          }

          case OBJECT_TYPES.Other: {
            state.other.count += 1;
            state.base.count += 1;
            state.other.allOthers.push(action.payload.object);

            state.other.others.length < 10 && state.other.others.push(action.payload.object);

            break;
          }
          }
        }
      })
      .addCase(changeObject.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status = null;
      })

      .addCase(getPentesters.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pentesters = action.payload;
      })
      .addCase(createPentester.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notificationTitle = 'Пентестер';
        state.isPentesterAppointed = true;

        state.status = action.payload.status;
      })
      .addCase(createPentester.pending, (state) => {
        state.error = null;
        state.status = null;
      })
      .addCase(createPentesters.fulfilled, (state) => {
        state.isLoading = false;
        state.notificationTitle = 'Пентестер';

        state.status = 206;
      })
      .addCase(createPentesters.pending, (state) => {
        state.error = null;
        state.status = null;
      })
      .addCase(deletePentester.fulfilled, (state) => {
        state.isLoading = false;
        state.notificationTitle = 'Пентестер';
        state.isPentesterAppointed = true;

        state.status = 207;
      })
      .addCase(deletePentester.pending, (state) => {
        state.error = null;
        state.status = null;
      })
      .addCase(getPentesterInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pentesterById = action.payload;
      })

      .addMatcher(isError, (state, action) => {
        state.status = action.payload;
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const {
  setSelectTab,
  setChangeDone,
  setPentesterAppointed,

  setBaseFiltersText,
  setWebAppFiltersText,
  setApiFiltersText,
  setMobileAppFiltersText,
  setNetworkDeviceFiltersText,
  setServerFiltersText,
  setArmFiltersText,
  setWifiFiltersText,
  setSocialEngineeringFiltersText,
  setDesktopAppFiltersText,
  setSourceCodeFiltersText,
  setExternalFiltersText,
  setInternalFiltersText,
  setOtherFiltersText,

  setBaseOffset,
  setWebAppOffset,
  setApiOffset,
  setMobileAppOffset,
  setNetworkDeviceOffset,
  setServerOffset,
  setArmOffset,
  setWifiOffset,
  setSocialEngineeringOffset,
  setDesktopAppOffset,
  setSourceCodeOffset,
  setExternalOffset,
  setInternalOffset,
  setOtherOffset,

  setBasePage,
  setWebAppPage,
  setApiPage,
  setMobileAppPage,
  setNetworkDevicePage,
  setServerPage,
  setArmPage,
  setWifiPage,
  setSocialEngineeringPage,
  setDesktopAppPage,
  setSourceCodePage,
  setExternalPage,
  setInternalPage,
  setOtherPage,

  setWebAppAttackerError,
  setWebAppWorkTypeError,
  setWebAppAddressIpError,
  setWebAppTestMethodError,

  setApiAddressIpError,
  setApiAttackerModelError,
  setApiWorkTypeError,
  setApiTestMethodError,

  setMobileAppNameError,
  setMobileAppPlatformError,
  setMobileAppTestMethodError,

  setNetworkDeviceAddressIpError,
  setNetworkDeviceAttackerModelError,
  setNetworkDeviceWorkTypeError,
  setNetworkDeviceTestMethodError,

  setServerAttackerModelError,
  setServerWorkTypeError,
  setServerAddressIpError,
  setServerTestMethodError,

  setArmAddressIpError,
  setArmAttackerModelError,
  setArmWorkTypeError,
  setArmTestMethodError,

  setWifiSsidError,
  setWifiBssidError,
  setWifiAttackerModelError,
  setWifiTestMethodError,

  setSocialEngineeringSuccessCriterionError,

  setDesktopAppNameError,
  setDesktopAppPlatformTypeError,
  setDesktopAppTestMethodError,

  setSourceCodeNumberRowsError,

  setExternalIpAddressError,

  setInternalIpAddressError,

  setOtherIpAddressError,
} = objectsSlice.actions;

export default objectsSlice.reducer;
