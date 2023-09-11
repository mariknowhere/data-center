import {ChangeEvent, Dispatch, SetStateAction} from 'react';

import {InputTypeEnum} from '../../../../components/input/InputTypes';
import {
  attackerModelList,
  desktopPlatformList,
  mobilePlatformList,
  OBJECT_TYPES, objectTypeList, programmingLanguageList,
  socialEngineeringList,
  workTypeList,
} from '../../../../constants/objects';
import {ISourceCode} from '../../../../store/objects/sourceCodes/sourceCodesTypes';
import {IWebApp} from '../../../../store/objects/webApps/webAppTypes';
import {IServer} from '../../../../store/objects/servers/serversTypes';
import {IMobileApp} from '../../../../store/objects/mobileApps/mobileAppsTypes';
import {ISocialEngineering} from '../../../../store/objects/socialEngineering/socialEngineeringTypes';
import {IWifi} from '../../../../store/objects/wifies/wifiesTypes';
import {IDesktopApp} from '../../../../store/objects/desktopApps/desktopAppsTypes';
import {IPopupItem} from '../../../../components/popup/PopupTypes';
import {IApi} from '../../../../store/objects/api/apiTypes';
import {INetworkDevice} from '../../../../store/objects/networkDevices/networkDevicesTypes';
import {IArm} from '../../../../store/objects/arm/armTypes';
import {IFilter} from '../../../../components/filters/FiltersTypes';
import {IExternal} from '../../../../store/objects/external/externalTypes';
import {IInternal} from '../../../../store/objects/internal/internalTypes';
import {IOther} from '../../../../store/objects/other/otherTypes';
import {Object} from '../../../../store/objects/objectsTypes';
import {localization} from '../../../../localization/localization';

export const preparedObjectFilters = (
  selectTab: string,
  setFilterItems: Dispatch<SetStateAction<IFilter[]>>,

  baseFilters: Object,
  setBaseFilters: Dispatch<SetStateAction<Object>>,
  baseType: IPopupItem,
  setBaseType: Dispatch<SetStateAction<IPopupItem>>,
  baseInfSystem: IPopupItem,
  setBaseInfSystem: Dispatch<SetStateAction<IPopupItem>>,
  baseOffice: IPopupItem,
  setBaseOffice: Dispatch<SetStateAction<IPopupItem>>,

  webAppFilters: IWebApp,
  setWebAppFilters: Dispatch<SetStateAction<IWebApp>>,
  webAppInfSystem: IPopupItem,
  setWebAppInfSystem: Dispatch<SetStateAction<IPopupItem>>,
  webAppAttackerModel: IPopupItem,
  setWebAppAttackerModel: Dispatch<SetStateAction<IPopupItem>>,
  webAppWorkType: IPopupItem,
  setWebAppWorkType: Dispatch<SetStateAction<IPopupItem>>,

  apiFilters: IApi,
  setApiFilters: Dispatch<SetStateAction<IApi>>,
  apiInfSystem: IPopupItem,
  setApiInfSystem: Dispatch<SetStateAction<IPopupItem>>,
  apiAttackerModel: IPopupItem,
  setApiAttackerModel: Dispatch<SetStateAction<IPopupItem>>,
  apiWorkType: IPopupItem,
  setApiWorkType: Dispatch<SetStateAction<IPopupItem>>,

  mobileAppFilters: IMobileApp,
  setMobileAppFilters: Dispatch<SetStateAction<IMobileApp>>,
  mobileAppInfSystem: IPopupItem,
  setMobileAppInfSystem: Dispatch<SetStateAction<IPopupItem>>,
  mobileAppPlatform: IPopupItem,
  setMobileAppPlatform: Dispatch<SetStateAction<IPopupItem>>,

  networkDeviceFilters: INetworkDevice,
  setNetworkDeviceFilters: Dispatch<SetStateAction<INetworkDevice>>,
  networkDeviceInfSystem: IPopupItem,
  setNetworkDeviceInfSystem: Dispatch<SetStateAction<IPopupItem>>,
  networkDeviceOffice: IPopupItem,
  setNetworkDeviceOffice: Dispatch<SetStateAction<IPopupItem>>,
  networkDeviceAttackerModel: IPopupItem,
  setNetworkDeviceAttackerModel: Dispatch<SetStateAction<IPopupItem>>,
  networkDeviceWorkType: IPopupItem,
  setNetworkDeviceWorkType: Dispatch<SetStateAction<IPopupItem>>,

  serverFilters: IServer,
  setServerFilters: Dispatch<SetStateAction<IServer>>,
  serverInfSystem: IPopupItem,
  setServerInfSystem: Dispatch<SetStateAction<IPopupItem>>,
  serverOffice: IPopupItem,
  setServerOffice: Dispatch<SetStateAction<IPopupItem>>,
  serverAttackerModel: IPopupItem,
  setServerAttackerModel: Dispatch<SetStateAction<IPopupItem>>,
  serverWorkType: IPopupItem,
  setServerWorkType: Dispatch<SetStateAction<IPopupItem>>,

  armFilters: IArm,
  setArmFilters: Dispatch<SetStateAction<IArm>>,
  armInfSystem: IPopupItem,
  setArmInfSystem: Dispatch<SetStateAction<IPopupItem>>,
  armOffice: IPopupItem,
  setArmOffice: Dispatch<SetStateAction<IPopupItem>>,
  armAttackerModel: IPopupItem,
  setArmAttackerModel: Dispatch<SetStateAction<IPopupItem>>,
  armWorkType: IPopupItem,
  setArmWorkType: Dispatch<SetStateAction<IPopupItem>>,

  wifiFilters: IWifi,
  setWifiFilters: Dispatch<SetStateAction<IWifi>>,
  wifiOffice: IPopupItem,
  setWifiOffice: Dispatch<SetStateAction<IPopupItem>>,
  wifiAttackerModel: IPopupItem,
  setWifiAttackerModel: Dispatch<SetStateAction<IPopupItem>>,

  socialEngineeringFilters: ISocialEngineering,
  setSocialEngineeringFilters: Dispatch<SetStateAction<ISocialEngineering>>,
  socialEngineeringOffice: IPopupItem,
  setSocialEngineeringOffice: Dispatch<SetStateAction<IPopupItem>>,
  socialEngineeringTypeOption: any,
  setSocialEngineeringTypeOption: Dispatch<SetStateAction<any>>,

  desktopAppFilters: IDesktopApp,
  setDesktopAppFilters: Dispatch<SetStateAction<IDesktopApp>>,
  desktopAppInfSystem: IPopupItem,
  setDesktopAppInfSystem: Dispatch<SetStateAction<IPopupItem>>,
  desktopAppPlatform: IPopupItem,
  setDesktopAppPlatform: Dispatch<SetStateAction<IPopupItem>>,

  sourceCodeFilters: ISourceCode,
  setSourceCodeFilters: Dispatch<SetStateAction<ISourceCode>>,
  sourceCodeInfSystem: IPopupItem,
  setSourceCodeInfSystem: Dispatch<SetStateAction<IPopupItem>>,
  secondaryNumberRows: any,
  setSecondaryNumberRows: Dispatch<SetStateAction<any>>,
  programmingLanguage: any,
  setProgrammingLanguage: Dispatch<SetStateAction<any>>,

  externalFilters: IExternal,
  setExternalFilters: Dispatch<SetStateAction<IExternal>>,
  externalInfSystem: IPopupItem,
  setExternalInfSystem: Dispatch<SetStateAction<IPopupItem>>,

  internalFilters: IInternal,
  setInternalFilters: Dispatch<SetStateAction<IInternal>>,
  internalInfSystem: IPopupItem,
  setInternalInfSystem: Dispatch<SetStateAction<IPopupItem>>,

  otherFilters: IOther,
  setOtherFilters: Dispatch<SetStateAction<IOther>>,
  otherInfSystem: IPopupItem,
  setOtherInfSystem: Dispatch<SetStateAction<IPopupItem>>,
  otherOffice: IPopupItem,
  setOtherOffice: Dispatch<SetStateAction<IPopupItem>>,

  prepareInfSystems: IPopupItem[],
  prepareOffices: IPopupItem[],
  role?: string,
) => {
  const onBaseTypeChange = (data: any) => {
    const prepareValue = data.map(({ value }: any) => value);

    setBaseType(data);
    setBaseFilters({ ...baseFilters, object_type: prepareValue });
  };
  const onBaseInfSystemChange = (data: any) => {
    const prepareValue = data.map(({ value }: any) => value);

    setBaseInfSystem(data);
    setBaseFilters({ ...baseFilters, inf_system_id: prepareValue });
  };
  const onBaseOfficeChange = (data: any) => {
    const prepareValue = data.map(({ value }: any) => value);

    setBaseOffice(data);
    setBaseFilters({ ...baseFilters, office_id: prepareValue });
  };
  const onScopeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setBaseFilters({...baseFilters, my_scope: event.target.checked});

    setWebAppFilters({...webAppFilters, my_scope: event.target.checked});
    setApiFilters({...apiFilters, my_scope: event.target.checked});
    setMobileAppFilters({...mobileAppFilters, my_scope: event.target.checked});
    setNetworkDeviceFilters({...networkDeviceFilters, my_scope: event.target.checked});
    setServerFilters({...serverFilters, my_scope: event.target.checked});

    setArmFilters({...armFilters, my_scope: event.target.checked});
    setWifiFilters({...wifiFilters, my_scope: event.target.checked});
    setSocialEngineeringFilters({...socialEngineeringFilters, my_scope: event.target.checked});
    setDesktopAppFilters({...desktopAppFilters, my_scope: event.target.checked});
    setSourceCodeFilters({...sourceCodeFilters, my_scope: event.target.checked});

    setExternalFilters({...externalFilters, my_scope: event.target.checked});
    setInternalFilters({...internalFilters, my_scope: event.target.checked});
    setOtherFilters({...otherFilters, my_scope: event.target.checked});
  };
  const onDeleteChange = (event: ChangeEvent<HTMLInputElement>) => {
    setBaseFilters({...baseFilters, is_delete: event.target.checked});

    setWebAppFilters({...webAppFilters, is_delete: event.target.checked});
    setApiFilters({...apiFilters, is_delete: event.target.checked});
    setMobileAppFilters({...mobileAppFilters, is_delete: event.target.checked});
    setNetworkDeviceFilters({...networkDeviceFilters, is_delete: event.target.checked});
    setServerFilters({...serverFilters, is_delete: event.target.checked});

    setArmFilters({...armFilters, is_delete: event.target.checked});
    setWifiFilters({...wifiFilters, is_delete: event.target.checked});
    setSocialEngineeringFilters({...socialEngineeringFilters, is_delete: event.target.checked});
    setDesktopAppFilters({...desktopAppFilters, is_delete: event.target.checked});
    setSourceCodeFilters({...sourceCodeFilters, is_delete: event.target.checked});

    setExternalFilters({...externalFilters, is_delete: event.target.checked});
    setInternalFilters({...internalFilters, is_delete: event.target.checked});
    setOtherFilters({...otherFilters, is_delete: event.target.checked});
  };


  const onWebAppInfSystemChange = (data: any) => {
    const prepareValue = data.map(({ value }: any) => value);

    setWebAppInfSystem(data);
    setWebAppFilters({ ...webAppFilters, inf_system_id: prepareValue });
  };
  const onWebAppAttackerModelChange = (data: any) => {
    const prepareValue = data.map(({ value }: any) => value);

    setWebAppAttackerModel(data);
    setWebAppFilters({ ...webAppFilters, attacker_model: prepareValue });
  };
  const onWebAppWorkTypeChange = (data: any) => {
    const prepareValue = data.map(({ value }: any) => value);

    setWebAppWorkType(data);
    setWebAppFilters({ ...webAppFilters, work_type: prepareValue });
  };


  const onApiInfSystemChange = (data: any) => {
    const prepareValue = data.map(({ value }: any) => value);

    setApiInfSystem(data);
    setApiFilters({ ...apiFilters, inf_system_id: prepareValue });
  };
  const onApiAttackerModelChange = (data: any) => {
    const prepareValue = data.map(({ value }: any) => value);

    setApiAttackerModel(data);
    setApiFilters({ ...apiFilters, attacker_model: prepareValue });
  };
  const onApiWorkTypeChange = (data: any) => {
    const prepareValue = data.map(({ value }: any) => value);

    setApiWorkType(data);
    setApiFilters({ ...apiFilters, work_type: prepareValue });
  };


  const onMobileAppInfSystemChange = (data: any) => {
    const prepareValue = data.map(({ value }: any) => value);

    setMobileAppInfSystem(data);
    setMobileAppFilters({ ...mobileAppFilters, inf_system_id: prepareValue });
  };
  const onMobileAppPlatformChange = (data: any) => {
    const prepareValue = data.map(({ value }: any) => value);

    setMobileAppPlatform(data);
    setMobileAppFilters({ ...mobileAppFilters, platform_type: prepareValue || '' });
  };


  const onNetworkDeviceInfSystemChange = (data: any) => {
    const prepareValue = data.map(({ value }: any) => value);

    setNetworkDeviceInfSystem(data);
    setNetworkDeviceFilters({ ...networkDeviceFilters, inf_system_id: prepareValue });
  };
  const onNetworkDeviceOfficeChange = (data: any) => {
    const prepareValue = data.map(({ value }: any) => value);

    setNetworkDeviceOffice(data);
    setNetworkDeviceFilters({ ...networkDeviceFilters, office_id: prepareValue });
  };
  const onNetworkDeviceAttackerModelChange = (data: any) => {
    const prepareValue = data.map(({ value }: any) => value);

    setNetworkDeviceAttackerModel(data);
    setNetworkDeviceFilters({ ...networkDeviceFilters, attacker_model: prepareValue || '' });
  };
  const onNetworkDeviceWorkTypeChange = (data: any) => {
    const prepareValue = data.map(({ value }: any) => value);

    setNetworkDeviceWorkType(data);
    setNetworkDeviceFilters({ ...networkDeviceFilters, work_type: prepareValue || '' });
  };


  const onServerInfSystemChange = (data: any) => {
    const prepareValue = data.map(({ value }: any) => value);

    setServerInfSystem(data);
    setServerFilters({ ...serverFilters, inf_system_id: prepareValue });
  };
  const onServerOfficeChange = (data: any) => {
    const prepareValue = data.map(({ value }: any) => value);

    setServerOffice(data);
    setServerFilters({ ...serverFilters, office_id: prepareValue });
  };
  const onServerAttackerModelChange = (data: any) => {
    const prepareValue = data.map(({ value }: any) => value);

    setServerAttackerModel(data);
    setServerFilters({ ...serverFilters, attacker_model: prepareValue || '' });
  };
  const onServerWorkTypeChange = (data: any) => {
    const prepareValue = data.map(({ value }: any) => value);

    setServerWorkType(data);
    setServerFilters({ ...serverFilters, work_type: prepareValue || '' });
  };


  const onArmInfSystemChange = (data: any) => {
    const prepareValue = data.map(({ value }: any) => value);

    setArmInfSystem(data);
    setArmFilters({ ...armFilters, inf_system_id: prepareValue });
  };
  const onArmOfficeChange = (data: any) => {
    const prepareValue = data.map(({ value }: any) => value);

    setArmOffice(data);
    setArmFilters({ ...armFilters, office_id: prepareValue });
  };
  const onArmAttackerModelChange = (data: any) => {
    const prepareValue = data.map(({ value }: any) => value);

    setArmAttackerModel(data);
    setArmFilters({ ...armFilters, attacker_model: prepareValue || '' });
  };
  const onArmWorkTypeChange = (data: any) => {
    const prepareValue = data.map(({ value }: any) => value);

    setArmWorkType(data);
    setArmFilters({ ...armFilters, work_type: prepareValue || '' });
  };


  const onWifiOfficeChange = (data: any) => {
    const prepareValue = data.map(({ value }: any) => value);

    setWifiOffice(data);
    setWifiFilters({ ...wifiFilters, office_id: prepareValue });
  };
  const onWifiAttackerModelChange = (data: any) => {
    const prepareValue = data.map(({ value }: any) => value);

    setWifiAttackerModel(data);
    setWifiFilters({ ...wifiFilters, attacker_model: prepareValue || '' });
  };


  const onSocialEngineeringOfficeChange = (data: any) => {
    const prepareValue = data.map(({ value }: any) => value);

    setSocialEngineeringOffice(data);
    setSocialEngineeringFilters({ ...socialEngineeringFilters, office_id: prepareValue });
  };
  const onSocialEngineeringTypeChange = (data: any) => {
    const prepareEngineeringType = data.map(({ value }: any) => value);

    setSocialEngineeringFilters({...socialEngineeringFilters, engineering_type: prepareEngineeringType });
    setSocialEngineeringTypeOption(data);
  };


  const onDesktopAppInfSystemChange = (data: any) => {
    const prepareValue = data.map(({ value }: any) => value);

    setDesktopAppInfSystem(data);
    setDesktopAppFilters({ ...desktopAppFilters, inf_system_id: prepareValue });
  };
  const onDesktopAppPlatformTypeChange = (data: any) => {
    const prepareValue = data.map(({ value }: any) => value);

    setDesktopAppPlatform(data);
    setDesktopAppFilters({ ...desktopAppFilters, platform_type: prepareValue || '' });
  };


  const onSourceCodeInfSystemChange = (data: any) => {
    const prepareValue = data.map(({ value }: any) => value);

    setSourceCodeInfSystem(data);
    setSourceCodeFilters({ ...sourceCodeFilters, inf_system_id: prepareValue });
  };
  const onSourceCodeProgrammingLanguageChange = (data: any) => {
    const prepareProgrammingLanguage = data.map(({ value }: any) => value);

    setSourceCodeFilters({...sourceCodeFilters, programming_language: prepareProgrammingLanguage });
    setProgrammingLanguage(data);
  };

  const onExternalInfSystemChange = (data: any) => {
    const prepareValue = data.map(({ value }: any) => value);

    setExternalInfSystem(data);
    setExternalFilters({ ...externalFilters, inf_system_id: prepareValue });
  };

  const onInternalInfSystemChange = (data: any) => {
    const prepareValue = data.map(({ value }: any) => value);

    setInternalInfSystem(data);
    setInternalFilters({ ...internalFilters, inf_system_id: prepareValue });
  };

  const onOtherInfSystemChange = (data: any) => {
    const prepareValue = data.map(({ value }: any) => value);

    setOtherInfSystem(data);
    setOtherFilters({ ...otherFilters, inf_system_id: prepareValue });
  };
  const onOtherOfficeChange = (data: any) => {
    const prepareValue = data.map(({ value }: any) => value);

    setOtherOffice(data);
    setOtherFilters({ ...otherFilters, office_id: prepareValue });
  };

  const baseFilterItems = [
    {
      id: 1,
      text: localization.object.filters.objectTypeText,
      placeholder: localization.object.filters.objectTypePlaceholder,
      value: baseType,
      onSelectChange: onBaseTypeChange,
      options: objectTypeList,
      isMulti: true,
    },
    {
      id: 2,
      text: localization.object.filters.infSystemText,
      placeholder: localization.object.filters.infSystemPlaceholder,
      value: baseInfSystem,
      onSelectChange: onBaseInfSystemChange,
      options: prepareInfSystems,
      isMulti: true,
    },
    {
      id: 3,
      text: localization.object.filters.officeText,
      placeholder: localization.object.filters.officePlaceholder,
      value: baseOffice,
      onSelectChange: onBaseOfficeChange,
      options: prepareOffices,
      isMulti: true,
    },
    {
      id: 4,
      text: localization.common.deleteFilterText,
      type: InputTypeEnum.Checkbox,
      value: baseFilters.is_delete,
      onChange: onDeleteChange,
    },
    {
      id: 5,
      text: localization.common.myScopeFilterText,
      type: InputTypeEnum.Checkbox,
      value: baseFilters.my_scope,
      onChange: onScopeChange,
    },
  ];

  const webAppFilterItems = [
    {
      id: 1,
      text: localization.object.filters.infSystemText,
      placeholder: localization.object.filters.infSystemPlaceholder,
      value: webAppInfSystem,
      onSelectChange: onWebAppInfSystemChange,
      options: prepareInfSystems,
      isMulti: true,
    },
    {
      id: 2,
      text: localization.object.filters.ipAddressText,
      placeholder: localization.object.filters.ipAddressPlaceholder,
      type: InputTypeEnum.Text,
      value: webAppFilters.ip_address,
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        setWebAppFilters({...webAppFilters, ip_address: event.target.value});
      },
    },
    {
      id: 3,
      text: localization.object.filters.domainNameText,
      placeholder: localization.object.filters.networkDevicePlaceholder,
      type: InputTypeEnum.Text,
      value: webAppFilters.domain_name,
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        setWebAppFilters({...webAppFilters, domain_name: event.target.value});
      },
    },
    {
      id: 4,
      text: localization.object.filters.attackerModelText,
      placeholder: localization.object.filters.attackerModelPlaceholder,
      value: webAppAttackerModel,
      onSelectChange: onWebAppAttackerModelChange,
      options: attackerModelList,
      isMulti: true,
    },
    {
      id: 5,
      text: localization.object.filters.workTypeText,
      placeholder: localization.object.filters.workTypePlaceholder,
      value: webAppWorkType,
      onSelectChange: onWebAppWorkTypeChange,
      options: workTypeList,
      isMulti: true,
    },
    {
      id: 6,
      text: localization.object.filters.greyboxText,
      type: InputTypeEnum.Checkbox,
      value: webAppFilters.greybox,
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        setWebAppFilters({...webAppFilters, greybox: event.target.checked});
      },
    },
    {
      id: 7,
      text: localization.object.filters.blackboxText,
      type: InputTypeEnum.Checkbox,
      value: webAppFilters.blackbox,
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        setWebAppFilters({...webAppFilters, blackbox: event.target.checked});
      },
    },
    {
      id: 8,
      text: localization.common.deleteFilterText,
      type: InputTypeEnum.Checkbox,
      value: webAppFilters.is_delete,
      onChange: onDeleteChange,
    },
    {
      id: 9,
      text: localization.common.myScopeFilterText,
      type: InputTypeEnum.Checkbox,
      value: webAppFilters.my_scope,
      onChange: onScopeChange,
    },
  ];

  const apiFilterItems = [
    {
      id: 1,
      text: localization.object.filters.infSystemText,
      placeholder: localization.object.filters.infSystemPlaceholder,
      value: apiInfSystem,
      onSelectChange: onApiInfSystemChange,
      options: prepareInfSystems,
      isMulti: true,
    },
    {
      id: 2,
      text: localization.object.filters.ipAddressText,
      placeholder: localization.object.filters.ipAddressPlaceholder,
      type: InputTypeEnum.Text,
      value: apiFilters.ip_address,
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        setApiFilters({...apiFilters, ip_address: event.target.value});
      },
    },
    {
      id: 3,
      text: localization.object.filters.domainNameText,
      placeholder: localization.object.filters.networkDevicePlaceholder,
      type: InputTypeEnum.Text,
      value: apiFilters.domain_name,
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        setApiFilters({...apiFilters, domain_name: event.target.value});
      },
    },
    {
      id: 4,
      text: localization.object.filters.attackerModelText,
      placeholder: localization.object.filters.attackerModelPlaceholder,
      value: apiAttackerModel,
      onSelectChange: onApiAttackerModelChange,
      options: attackerModelList,
      isMulti: true,
    },
    {
      id: 5,
      text: localization.object.filters.workTypeText,
      placeholder: localization.object.filters.workTypePlaceholder,
      value: apiWorkType,
      onSelectChange: onApiWorkTypeChange,
      options: workTypeList,
      isMulti: true,
    },
    {
      id: 6,
      text: localization.object.filters.greyboxText,
      type: InputTypeEnum.Checkbox,
      value: apiFilters.greybox,
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        setApiFilters({...apiFilters, greybox: event.target.checked});
      },
    },
    {
      id: 7,
      text: localization.object.filters.blackboxText,
      type: InputTypeEnum.Checkbox,
      value: apiFilters.blackbox,
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        setApiFilters({...apiFilters, blackbox: event.target.checked});
      },
    },
    {
      id: 8,
      text: localization.common.deleteFilterText,
      type: InputTypeEnum.Checkbox,
      value: apiFilters.is_delete,
      onChange: onDeleteChange,
    },
    {
      id: 9,
      text: localization.common.myScopeFilterText,
      type: InputTypeEnum.Checkbox,
      value: apiFilters.my_scope,
      onChange: onScopeChange,
    },
  ];

  const mobileAppFilterItems = [
    {
      id: 1,
      text: localization.object.filters.infSystemText,
      placeholder: localization.object.filters.infSystemPlaceholder,
      value: mobileAppInfSystem,
      onSelectChange: onMobileAppInfSystemChange,
      options: prepareInfSystems,
      isMulti: true,
    },
    {
      id: 2,
      text: localization.object.filters.appNameText,
      placeholder: localization.object.filters.appNamePlaceholder,
      type: InputTypeEnum.Text,
      value: mobileAppFilters.app_name,
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        setMobileAppFilters({...mobileAppFilters, app_name: event.target.value});
      },
    },
    {
      id: 3,
      text: localization.object.filters.platformTypeText,
      placeholder: localization.object.filters.platformTypePlaceholder,
      value: mobileAppPlatform,
      onSelectChange: onMobileAppPlatformChange,
      options: mobilePlatformList,
      isMulti: true,
    },
    {
      id: 4,
      text: localization.object.filters.greyboxText,
      type: InputTypeEnum.Checkbox,
      value: mobileAppFilters.greybox,
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        setMobileAppFilters({...mobileAppFilters, greybox: event.target.checked});
      },
    },
    {
      id: 5,
      text: localization.object.filters.blackboxText,
      type: InputTypeEnum.Checkbox,
      value: mobileAppFilters.blackbox,
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        setMobileAppFilters({...mobileAppFilters, blackbox: event.target.checked});
      },
    },
    {
      id: 6,
      text: localization.common.deleteFilterText,
      type: InputTypeEnum.Checkbox,
      value: mobileAppFilters.is_delete,
      onChange: onDeleteChange,
    },
    {
      id: 7,
      text: localization.common.myScopeFilterText,
      type: InputTypeEnum.Checkbox,
      value: mobileAppFilters.my_scope,
      onChange: onScopeChange,
    },
  ];

  const networkDeviceFilterItems = [
    {
      id: 1,
      text: localization.object.filters.infSystemText,
      placeholder: localization.object.filters.infSystemPlaceholder,
      value: networkDeviceInfSystem,
      onSelectChange: onNetworkDeviceInfSystemChange,
      options: prepareInfSystems,
      isMulti: true,
    },
    {
      id: 2,
      text: localization.object.filters.officeText,
      placeholder: localization.object.filters.officePlaceholder,
      value: networkDeviceOffice,
      onSelectChange: onNetworkDeviceOfficeChange,
      options: prepareOffices,
      isMulti: true,
    },
    {
      id: 3,
      text: localization.object.filters.ipAddressText,
      placeholder: localization.object.filters.ipAddressPlaceholder,
      type: InputTypeEnum.Text,
      value: networkDeviceFilters.ip_address,
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        setNetworkDeviceFilters({...networkDeviceFilters, ip_address: event.target.value});
      },
    },
    {
      id: 4,
      text: localization.object.filters.networkDeviceText,
      placeholder: localization.object.filters.networkDevicePlaceholder,
      type: InputTypeEnum.Text,
      value: networkDeviceFilters.network_device_name,
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        setNetworkDeviceFilters({...networkDeviceFilters, network_device_name: event.target.value});
      },
    },
    {
      id: 5,
      text: localization.object.filters.attackerModelText,
      placeholder: localization.object.filters.attackerModelPlaceholder,
      value: networkDeviceAttackerModel,
      onSelectChange: onNetworkDeviceAttackerModelChange,
      options: attackerModelList,
      isMulti: true,
    },
    {
      id: 6,
      text: localization.object.filters.workTypeText,
      placeholder: localization.object.filters.workTypePlaceholder,
      value: networkDeviceWorkType,
      onSelectChange: onNetworkDeviceWorkTypeChange,
      options: workTypeList,
      isMulti: true,
    },
    {
      id: 7,
      text: localization.object.filters.greyboxText,
      type: InputTypeEnum.Checkbox,
      value: networkDeviceFilters.greybox,
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        setNetworkDeviceFilters({...networkDeviceFilters, greybox: event.target.checked});
      },
    },
    {
      id: 8,
      text: localization.object.filters.blackboxText,
      type: InputTypeEnum.Checkbox,
      value: networkDeviceFilters.blackbox,
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        setNetworkDeviceFilters({...networkDeviceFilters, blackbox: event.target.checked});
      },
    },
    {
      id: 9,
      text: localization.common.deleteFilterText,
      type: InputTypeEnum.Checkbox,
      value: networkDeviceFilters.is_delete,
      onChange: onDeleteChange,
    },
    {
      id: 10,
      text: localization.common.myScopeFilterText,
      type: InputTypeEnum.Checkbox,
      value: networkDeviceFilters.my_scope,
      onChange: onScopeChange,
    },
  ];

  const serverFilterItems = [
    {
      id: 1,
      text: localization.object.filters.infSystemText,
      placeholder: localization.object.filters.infSystemPlaceholder,
      value: serverInfSystem,
      onSelectChange: onServerInfSystemChange,
      options: prepareInfSystems,
      isMulti: true,
    },
    {
      id: 2,
      text: localization.object.filters.officeText,
      placeholder: localization.object.filters.officePlaceholder,
      value: serverOffice,
      onSelectChange: onServerOfficeChange,
      options: prepareOffices,
      isMulti: true,
    },
    {
      id: 3,
      text: localization.object.filters.ipAddressText,
      placeholder: localization.object.filters.ipAddressPlaceholder,
      type: InputTypeEnum.Text,
      value: serverFilters.ip_address,
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        setServerFilters({...serverFilters, ip_address: event.target.value});
      },
    },
    {
      id: 4,
      text: localization.object.filters.networkDeviceText,
      placeholder: localization.object.filters.networkDevicePlaceholder,
      type: InputTypeEnum.Text,
      value: serverFilters.network_device_name,
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        setServerFilters({...serverFilters, network_device_name: event.target.value});
      },
    },
    {
      id: 5,
      text: localization.object.filters.attackerModelText,
      placeholder: localization.object.filters.attackerModelPlaceholder,
      value: serverAttackerModel,
      onSelectChange: onServerAttackerModelChange,
      options: attackerModelList,
      isMulti: true,
    },
    {
      id: 6,
      text: localization.object.filters.workTypeText,
      placeholder: localization.object.filters.workTypePlaceholder,
      value: serverWorkType,
      onSelectChange: onServerWorkTypeChange,
      options: workTypeList,
      isMulti: true,
    },
    {
      id: 7,
      text: localization.object.filters.greyboxText,
      type: InputTypeEnum.Checkbox,
      value: serverFilters.greybox,
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        setServerFilters({...serverFilters, greybox: event.target.checked});
      },
    },
    {
      id: 8,
      text: localization.object.filters.blackboxText,
      type: InputTypeEnum.Checkbox,
      value: serverFilters.blackbox,
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        setServerFilters({...serverFilters, blackbox: event.target.checked});
      },
    },
    {
      id: 9,
      text: localization.common.deleteFilterText,
      type: InputTypeEnum.Checkbox,
      value: serverFilters.is_delete,
      onChange: onDeleteChange,
    },
    {
      id: 10,
      text: localization.common.myScopeFilterText,
      type: InputTypeEnum.Checkbox,
      value: serverFilters.my_scope,
      onChange: onScopeChange,
    },
  ];

  const armFilterItems = [
    {
      id: 1,
      text: localization.object.filters.infSystemText,
      placeholder: localization.object.filters.infSystemPlaceholder,
      value: armInfSystem,
      onSelectChange: onArmInfSystemChange,
      options: prepareInfSystems,
      isMulti: true,
    },
    {
      id: 2,
      text: localization.object.filters.officeText,
      placeholder: localization.object.filters.officePlaceholder,
      value: armOffice,
      onSelectChange: onArmOfficeChange,
      options: prepareOffices,
      isMulti: true,
    },
    {
      id: 3,
      text: localization.object.filters.ipAddressText,
      placeholder: localization.object.filters.ipAddressPlaceholder,
      type: InputTypeEnum.Text,
      value: armFilters.ip_address,
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        setArmFilters({...armFilters, ip_address: event.target.value});
      },
    },
    {
      id: 4,
      text: localization.object.filters.networkDeviceText,
      placeholder: localization.object.filters.networkDevicePlaceholder,
      type: InputTypeEnum.Text,
      value: armFilters.network_device_name,
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        setArmFilters({...armFilters, network_device_name: event.target.value});
      },
    },
    {
      id: 5,
      text: localization.object.filters.attackerModelText,
      placeholder: localization.object.filters.attackerModelPlaceholder,
      value: armAttackerModel,
      onSelectChange: onArmAttackerModelChange,
      options: attackerModelList,
      isMulti: true,
    },
    {
      id: 6,
      text: localization.object.filters.workTypeText,
      placeholder: localization.object.filters.workTypePlaceholder,
      value: armWorkType,
      onSelectChange: onArmWorkTypeChange,
      options: workTypeList,
      isMulti: true,
    },
    {
      id: 7,
      text: localization.object.filters.greyboxText,
      type: InputTypeEnum.Checkbox,
      value: armFilters.greybox,
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        setArmFilters({...armFilters, greybox: event.target.checked});
      },
    },
    {
      id: 8,
      text: localization.object.filters.blackboxText,
      type: InputTypeEnum.Checkbox,
      value: armFilters.blackbox,
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        setArmFilters({...armFilters, blackbox: event.target.checked});
      },
    },
    {
      id: 9,
      text: localization.common.deleteFilterText,
      type: InputTypeEnum.Checkbox,
      value: armFilters.is_delete,
      onChange: onDeleteChange,
    },
    {
      id: 10,
      text: localization.common.myScopeFilterText,
      type: InputTypeEnum.Checkbox,
      value: armFilters.my_scope,
      onChange: onScopeChange,
    },
  ];

  const wifiFilterItems = [
    {
      id: 1,
      text: localization.object.filters.officeText,
      placeholder: localization.object.filters.officePlaceholder,
      value: wifiOffice,
      onSelectChange: onWifiOfficeChange,
      options: prepareOffices,
      isMulti: true,
    },
    {
      id: 2,
      text: localization.object.filters.ssidText,
      placeholder: localization.object.filters.ssidPlaceholder,
      type: InputTypeEnum.Text,
      value: wifiFilters.ssid,
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        setWifiFilters({...wifiFilters, ssid: event.target.value});
      },
    },
    {
      id: 3,
      text: localization.object.filters.bssidText,
      placeholder: localization.object.filters.bssidPlaceholder,
      type: InputTypeEnum.Text,
      value: wifiFilters.bssid,
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        setWifiFilters({...wifiFilters, bssid: event.target.value});
      },
    },
    {
      id: 4,
      text: localization.object.filters.attackerModelText,
      placeholder: localization.object.filters.attackerModelPlaceholder,
      value: wifiAttackerModel,
      onSelectChange: onWifiAttackerModelChange,
      options: attackerModelList,
      isMulti: true,
    },
    {
      id: 5,
      text: localization.object.filters.greyboxText,
      type: InputTypeEnum.Checkbox,
      value: wifiFilters.greybox,
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        setWifiFilters({...wifiFilters, greybox: event.target.checked});
      },
    },
    {
      id: 6,
      text: localization.object.filters.blackboxText,
      type: InputTypeEnum.Checkbox,
      value: wifiFilters.blackbox,
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        setWifiFilters({...wifiFilters, blackbox: event.target.checked});
      },
    },
    {
      id: 7,
      text: localization.common.deleteFilterText,
      type: InputTypeEnum.Checkbox,
      value: wifiFilters.is_delete,
      onChange: onDeleteChange,
    },
    {
      id: 8,
      text: localization.common.myScopeFilterText,
      type: InputTypeEnum.Checkbox,
      value: wifiFilters.my_scope,
      onChange: onScopeChange,
    },
  ];

  const socialEngineeringFilterItems = [
    {
      id: 1,
      text: localization.object.filters.officeText,
      placeholder: localization.object.filters.officePlaceholder,
      value: socialEngineeringOffice,
      onSelectChange: onSocialEngineeringOfficeChange,
      options: prepareOffices,
      isMulti: true,
    },
    {
      id: 2,
      text: localization.object.filters.engineeringTypeText,
      placeholder: localization.object.filters.workTypePlaceholder,
      options: socialEngineeringList,
      isMulti: true,
      onSelectChange: onSocialEngineeringTypeChange,
      value: socialEngineeringTypeOption,
    },
    {
      id: 3,
      text: localization.object.filters.successCriterionText,
      placeholder: localization.object.filters.successCriterionPlaceholder,
      type: InputTypeEnum.Text,
      value: socialEngineeringFilters.success_criterion,
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        setSocialEngineeringFilters({...socialEngineeringFilters, success_criterion: event.target.value});
      },
    },
    {
      id: 4,
      text: localization.common.deleteFilterText,
      type: InputTypeEnum.Checkbox,
      value: socialEngineeringFilters.is_delete,
      onChange: onDeleteChange,
    },
    {
      id: 5,
      text: localization.common.myScopeFilterText,
      type: InputTypeEnum.Checkbox,
      value: socialEngineeringFilters.my_scope,
      onChange: onScopeChange,
    },
  ];

  const desktopAppFilterItems = [
    {
      id: 1,
      text: localization.object.filters.infSystemText,
      placeholder: localization.object.filters.infSystemPlaceholder,
      value: desktopAppInfSystem,
      onSelectChange: onDesktopAppInfSystemChange,
      options: prepareInfSystems,
      isMulti: true,
    },
    {
      id: 2,
      text: localization.object.filters.appNameText,
      placeholder: localization.object.filters.appNamePlaceholder,
      type: InputTypeEnum.Text,
      value: desktopAppFilters.app_name,
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        setDesktopAppFilters({...desktopAppFilters, app_name: event.target.value});
      },
    },
    {
      id: 3,
      text: localization.object.filters.platformTypeText,
      placeholder: localization.object.filters.platformTypePlaceholder,
      type: InputTypeEnum.Text,
      value: desktopAppPlatform,
      onSelectChange: onDesktopAppPlatformTypeChange,
      options: desktopPlatformList,
      isMulti: true,
    },
    {
      id: 4,
      text: localization.object.filters.greyboxText,
      type: InputTypeEnum.Checkbox,
      value: desktopAppFilters.greybox,
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        setDesktopAppFilters({...desktopAppFilters, greybox: event.target.checked});
      },
    },
    {
      id: 5,
      text: localization.object.filters.blackboxText,
      type: InputTypeEnum.Checkbox,
      value: desktopAppFilters.blackbox,
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        setDesktopAppFilters({...desktopAppFilters, blackbox: event.target.checked});
      },
    },
    {
      id: 6,
      text: localization.common.deleteFilterText,
      type: InputTypeEnum.Checkbox,
      value: desktopAppFilters.is_delete,
      onChange: onDeleteChange,
    },
    {
      id: 7,
      text: localization.common.myScopeFilterText,
      type: InputTypeEnum.Checkbox,
      value: desktopAppFilters.my_scope,
      onChange: onScopeChange,
    },
  ];

  const sourceCodeFilterItems = [
    {
      id: 1,
      text: localization.object.filters.infSystemText,
      placeholder: localization.object.filters.infSystemPlaceholder,
      value: sourceCodeInfSystem,
      onSelectChange: onSourceCodeInfSystemChange,
      options: prepareInfSystems,
      isMulti: true,
    },
    {
      id: 2,
      text: localization.object.filters.programmingLanguageText,
      placeholder: localization.object.filters.programmingLanguagePlaceholder,
      value: programmingLanguage,
      onSelectChange: onSourceCodeProgrammingLanguageChange,
      options: programmingLanguageList,
      isMulti: true,
    },
    {
      id: 3,
      text: localization.object.filters.numberRowsText,
      placeholder: localization.object.filters.numberRowsPlaceholder,
      type: InputTypeEnum.Number,
      value: sourceCodeFilters.number_rows,
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        setSourceCodeFilters({...sourceCodeFilters, number_rows: parseInt(event.target.value)});
      },
      secondaryValue: secondaryNumberRows,
      onSecondaryChange: (event: ChangeEvent<HTMLInputElement>) => {
        setSecondaryNumberRows(parseInt(event.target.value));
      },
      primaryText: localization.common.primaryNumberTextHelper,
      secondaryText: localization.common.secondaryNumberTextHelper,
    },
    {
      id: 4,
      text: localization.common.deleteFilterText,
      type: InputTypeEnum.Checkbox,
      value: sourceCodeFilters.is_delete,
      onChange: onDeleteChange,
    },
    {
      id: 5,
      text: localization.common.myScopeFilterText,
      type: InputTypeEnum.Checkbox,
      value: sourceCodeFilters.my_scope,
      onChange: onScopeChange,
    },
  ];

  const externalFilterItems = [
    {
      id: 1,
      text: localization.object.filters.infSystemText,
      placeholder: localization.object.filters.infSystemPlaceholder,
      value: externalInfSystem,
      onSelectChange: onExternalInfSystemChange,
      options: prepareInfSystems,
      isMulti: true,
    },
    {
      id: 2,
      text: localization.object.filters.ipExternalAddressText,
      placeholder: localization.object.filters.ipAddressPlaceholder,
      type: InputTypeEnum.Text,
      value: externalFilters.ip_address,
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        setExternalFilters({...externalFilters, ip_address: event.target.value});
      },
    },
    {
      id: 3,
      text: localization.common.deleteFilterText,
      type: InputTypeEnum.Checkbox,
      value: externalFilters.is_delete,
      onChange: onDeleteChange,
    },
    {
      id: 4,
      text: localization.common.myScopeFilterText,
      type: InputTypeEnum.Checkbox,
      value: externalFilters.my_scope,
      onChange: onScopeChange,
    },
  ];

  const internalFilterItems = [
    {
      id: 1,
      text: localization.object.filters.infSystemText,
      placeholder: localization.object.filters.infSystemPlaceholder,
      value: internalInfSystem,
      onSelectChange: onInternalInfSystemChange,
      options: prepareInfSystems,
      isMulti: true,
    },
    {
      id: 2,
      text: localization.object.filters.ipInternalAddressText,
      placeholder: localization.object.filters.ipAddressPlaceholder,
      type: InputTypeEnum.Text,
      value: internalFilters.ip_address,
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        setInternalFilters({...internalFilters, ip_address: event.target.value});
      },
    },
    {
      id: 3,
      text: localization.common.deleteFilterText,
      type: InputTypeEnum.Checkbox,
      value: internalFilters.is_delete,
      onChange: onDeleteChange,
    },
    {
      id: 4,
      text: localization.common.myScopeFilterText,
      type: InputTypeEnum.Checkbox,
      value: internalFilters.my_scope,
      onChange: onScopeChange,
    },
  ];

  const otherFilterItems = [
    {
      id: 1,
      text: localization.object.filters.infSystemText,
      placeholder: localization.object.filters.infSystemPlaceholder,
      value: otherInfSystem,
      onSelectChange: onOtherInfSystemChange,
      options: prepareInfSystems,
      isMulti: true,
    },
    {
      id: 2,
      text: localization.object.filters.officeText,
      placeholder: localization.object.filters.officePlaceholder,
      value: otherOffice,
      onSelectChange: onOtherOfficeChange,
      options: prepareOffices,
      isMulti: true,
    },
    {
      id: 3,
      text: localization.object.filters.ipExternalAddressText,
      placeholder: localization.object.filters.ipAddressPlaceholder,
      type: InputTypeEnum.Text,
      value: otherFilters.ip_address,
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        setOtherFilters({...otherFilters, ip_address: event.target.value});
      },
    },
    {
      id: 4,
      text: localization.common.deleteFilterText,
      type: InputTypeEnum.Checkbox,
      value: otherFilters.is_delete,
      onChange: onDeleteChange,
    },
    {
      id: 5,
      text: localization.common.myScopeFilterText,
      type: InputTypeEnum.Checkbox,
      value: otherFilters.my_scope,
      onChange: onScopeChange,
    },
  ];

  if (role === 'manager' || role === 'chief') {
    baseFilterItems.length = baseFilterItems.length - 1;

    webAppFilterItems.length = webAppFilterItems.length - 1;
    apiFilterItems.length = apiFilterItems.length - 1;
    mobileAppFilterItems.length = mobileAppFilterItems.length - 1;
    networkDeviceFilterItems.length = networkDeviceFilterItems.length - 1;
    serverFilterItems.length = serverFilterItems.length - 1;

    armFilterItems.length = armFilterItems.length - 1;
    wifiFilterItems.length = wifiFilterItems.length - 1;
    socialEngineeringFilterItems.length = socialEngineeringFilterItems.length - 1;
    desktopAppFilterItems.length = desktopAppFilterItems.length - 1;
    sourceCodeFilterItems.length = sourceCodeFilterItems.length - 1;

    externalFilterItems.length = externalFilterItems.length - 1;
    internalFilterItems.length = internalFilterItems.length - 1;
    otherFilterItems.length = otherFilterItems.length - 1;
  } else if (role === 'pentester') {
    delete baseFilterItems[baseFilterItems.length - 2];

    delete webAppFilterItems[webAppFilterItems.length - 2];
    delete apiFilterItems[apiFilterItems.length - 2];
    delete mobileAppFilterItems[mobileAppFilterItems.length - 2];
    delete networkDeviceFilterItems[networkDeviceFilterItems.length - 2];
    delete serverFilterItems[serverFilterItems.length - 2];

    delete armFilterItems[armFilterItems.length - 2];
    delete wifiFilterItems[wifiFilterItems.length - 2];
    delete socialEngineeringFilterItems[socialEngineeringFilterItems.length - 2];
    delete desktopAppFilterItems[desktopAppFilterItems.length - 2];
    delete sourceCodeFilterItems[sourceCodeFilterItems.length - 2];

    delete externalFilterItems[externalFilterItems.length - 2];
    delete internalFilterItems[internalFilterItems.length - 2];
    delete otherFilterItems[otherFilterItems.length - 2];
  }

  switch (selectTab) {
  case OBJECT_TYPES.Base: {
    setFilterItems(baseFilterItems);

    break;
  }

  case OBJECT_TYPES.WebApp: {
    setFilterItems(webAppFilterItems);

    break;
  }

  case OBJECT_TYPES.API: {
    setFilterItems(apiFilterItems);

    break;
  }

  case OBJECT_TYPES.MobileApp: {
    setFilterItems(mobileAppFilterItems);

    break;
  }

  case OBJECT_TYPES.NetworkDevice: {
    setFilterItems(networkDeviceFilterItems);

    break;
  }

  case OBJECT_TYPES.Server: {
    setFilterItems(serverFilterItems);

    break;
  }

  case OBJECT_TYPES.ARM: {
    setFilterItems(armFilterItems);

    break;
  }

  case OBJECT_TYPES.WiFi: {
    setFilterItems(wifiFilterItems);

    break;
  }

  case OBJECT_TYPES.SocialEngineering: {
    setFilterItems(socialEngineeringFilterItems);

    break;
  }

  case OBJECT_TYPES.DesktopApp: {
    setFilterItems(desktopAppFilterItems);

    break;
  }

  case OBJECT_TYPES.SourceCode: {
    setFilterItems(sourceCodeFilterItems);

    break;
  }

  case OBJECT_TYPES.External: {
    setFilterItems(externalFilterItems);

    break;
  }

  case OBJECT_TYPES.Internal: {
    setFilterItems(internalFilterItems);

    break;
  }

  case OBJECT_TYPES.Other: {
    setFilterItems(otherFilterItems);

    break;
  }
  }
};
