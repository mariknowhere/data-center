import {FC, useEffect, useState} from 'react';

import {useNavigate, useParams} from 'react-router-dom';

import Button from '../../../components/button/Button';
import {TextVariantEnum} from '../../../components/text/TextTypes';
import {useAppDispatch} from '../../../hooks/useAppDispatch';
import {useAppSelector} from '../../../hooks/useAppSelector';
import Loader from '../../../components/loader/Loader';
import Filters from '../../../components/filters/Filters';
import {selectBase, selectObjects} from '../../../store/objects/objectsSelectors';
import Pagination from '../../../components/pagination/Pagination';
import Table from '../../../components/table/Table';
import Navbar from '../../../components/navbar/Navbar';
import styles from '../../Items.module.scss';
import Tabs from '../../../components/tabs/Tabs';
import ObjectButtonsModal from '../../../components/modals/objects/ObjectButtonsModal';
import {getProjectById} from '../../../store/projects/projectsAsync';
import {IHeadCell} from '../../../components/table/TableTypes';
import {ILink} from '../../../components/tabs/TabsTypes';

import {selectProjectById} from '../../../store/projects/projectsSelectors';

import {IFilter} from '../../../components/filters/FiltersTypes';
import {ISourceCode} from '../../../store/objects/sourceCodes/sourceCodesTypes';
import {IWebApp} from '../../../store/objects/webApps/webAppTypes';
import {IServer} from '../../../store/objects/servers/serversTypes';
import {IMobileApp} from '../../../store/objects/mobileApps/mobileAppsTypes';
import {ISocialEngineering} from '../../../store/objects/socialEngineering/socialEngineeringTypes';
import {IWifi} from '../../../store/objects/wifies/wifiesTypes';
import {IDesktopApp} from '../../../store/objects/desktopApps/desktopAppsTypes';
import {selectProfileData} from '../../../store/auth/authSelectors';
import ExportModal from '../../../components/modals/general/export/ExportModal';
import {ExportTypes} from '../../../utils/export/ExportTypes';
import Notification from '../../../components/notification/Notification';
import {
  setApiFiltersText,
  setApiOffset,
  setApiPage,
  setArmFiltersText,
  setArmOffset,
  setArmPage,
  setBaseFiltersText,
  setBaseOffset,
  setBasePage,
  setDesktopAppFiltersText,
  setDesktopAppOffset,
  setDesktopAppPage,
  setExternalFiltersText,
  setExternalOffset,
  setExternalPage,
  setInternalFiltersText,
  setInternalOffset,
  setInternalPage,
  setMobileAppFiltersText,
  setMobileAppOffset,
  setMobileAppPage,
  setNetworkDeviceFiltersText,
  setNetworkDeviceOffset,
  setNetworkDevicePage,
  setOtherFiltersText,
  setOtherOffset,
  setOtherPage,
  setSelectTab,
  setServerFiltersText,
  setServerOffset,
  setServerPage,
  setSocialEngineeringFiltersText,
  setSocialEngineeringOffset,
  setSocialEngineeringPage,
  setSourceCodeFiltersText,
  setSourceCodeOffset,
  setSourceCodePage,
  setWebAppFiltersText,
  setWebAppOffset,
  setWebAppPage,
  setWifiFiltersText,
  setWifiOffset,
  setWifiPage,
} from '../../../store/objects/objectsSlice';

import {getBaseObjects, getObjectCounts, getObjects} from '../../../store/objects/objectsAsync';
import {selectWifi} from '../../../store/objects/wifies/wifiesSelectors';
import {selectWebApp} from '../../../store/objects/webApps/webAppsSelectors';
import {selectSourceCode} from '../../../store/objects/sourceCodes/sourceCodesSelectors';
import {selectSocialEngineering} from '../../../store/objects/socialEngineering/socialEngineeringSelectors';
import {selectServer} from '../../../store/objects/servers/serversSelectors';
import {selectMobileApp} from '../../../store/objects/mobileApps/mobileAppsSelectors';
import {selectDesktopApp} from '../../../store/objects/desktopApps/desktopAppsSelectors';
import {getAllInfSystems} from '../../../store/infSystems/infSystemsAsync';
import {getAllOffices} from '../../../store/offices/officesAsync';
import {selectInfSystems} from '../../../store/infSystems/infSystemsSelectors';
import {selectOffices} from '../../../store/offices/officesSelectors';
import {selectArm} from '../../../store/objects/arm/armSelectors';
import {selectApi} from '../../../store/objects/api/apiSelectors';
import {selectNetworkDevice} from '../../../store/objects/networkDevices/networkDevicesSelectors';
import ChangePentester from '../../../components/modals/roles/pentesters/ChangePentester';

import {OBJECT_TYPES, OBJECTS_TITLES} from '../../../constants/objects';
import {selectExternal} from '../../../store/objects/external/externalSelectors';
import {selectInternal} from '../../../store/objects/internal/internalSelectors';
import {selectOther} from '../../../store/objects/other/otherSelectors';
import {IExternal} from '../../../store/objects/external/externalTypes';
import {IInternal} from '../../../store/objects/internal/internalTypes';
import {IOther} from '../../../store/objects/other/otherTypes';
import {IApi} from '../../../store/objects/api/apiTypes';
import {INetworkDevice} from '../../../store/objects/networkDevices/networkDevicesTypes';
import {IArm} from '../../../store/objects/arm/armTypes';
import {filterDateOrNumber} from '../../../utils/prepare/filterDateOrNumber';
import {ROUTES} from '../../../router/routes';

import {filterScopeOrDelete} from '../../../utils/prepare/filterScopeOrDelete';

import {localization} from '../../../localization/localization';

import {preparedObjectPaginationItems} from './utils/preparedObjectPaginationItems';
import {exportObjects} from './utils/exportObjects';
import {preparedObjectFilters} from './utils/preparedObjectFilters';
import {preparedObjectRows} from './utils/preparedObjectRows';

let prepareInfSystems: any[] = [];
let prepareOffices: any[] = [];

/**
 * Component for displaying information on objects page.
 *
 */
const ObjectsPage: FC = () => {
  const dispatch = useAppDispatch();

  const { projectId } = useParams();
  const navigate = useNavigate();

  const { role, id } = useAppSelector(selectProfileData);
  const { allInfSystems } = useAppSelector(selectInfSystems);
  const { allOffices } = useAppSelector(selectOffices);

  const {
    customer,
    manager,
    teamlead,
  } = useAppSelector(selectProjectById);

  const {
    isLoading,
    error,
    status,
    selectTab,
    notificationTitle,
  } = useAppSelector(selectObjects);

  const {
    base,
    count: baseCount,
    filters: baseFiltersText,
    page: basePage,
    offset: baseOffset,
  } = useAppSelector(selectBase);

  const {
    webApps,
    count: webAppCount,
    filters: webAppFiltersText,
    page: webAppPage,
    offset: webAppOffset,
  } = useAppSelector(selectWebApp);
  const {
    api,
    count: apiCount,
    filters: apiFiltersText,
    page: apiPage,
    offset: apiOffset,
  } = useAppSelector(selectApi);
  const {
    mobileApps,
    count: mobileAppCount,
    filters: mobileAppFiltersText,
    page: mobileAppPage,
    offset: mobileAppOffset,
  } = useAppSelector(selectMobileApp);
  const {
    networkDevices,
    count: networkDeviceCount,
    filters: networkDeviceFiltersText,
    page: networkDevicePage,
    offset: networkDeviceOffset,
  } = useAppSelector(selectNetworkDevice);
  const {
    servers,
    count: serverCount,
    filters: serverFiltersText,
    page: serverPage,
    offset: serverOffset,
  } = useAppSelector(selectServer);

  const {
    arm,
    count: armCount,
    filters: armFiltersText,
    page: armPage,
    offset: armOffset,
  } = useAppSelector(selectArm);
  const {
    wifies,
    count: wifiCount,
    filters: wifiFiltersText,
    page: wifiPage,
    offset: wifiOffset,
  } = useAppSelector(selectWifi);
  const {
    socialEngineering,
    count: socialEngineeringCount,
    filters: socialEngineeringFiltersText,
    page: socialEngineeringPage,
    offset: socialEngineeringOffset,
  } = useAppSelector(selectSocialEngineering);
  const {
    desktopApps,
    count: desktopAppCount,
    filters: desktopAppFiltersText,
    page: desktopAppPage,
    offset: desktopAppOffset,
  } = useAppSelector(selectDesktopApp);
  const {
    sourceCodes,
    count: sourceCodeCount,
    filters: sourceCodeFiltersText,
    page: sourceCodePage,
    offset: sourceCodeOffset,
  } = useAppSelector(selectSourceCode);

  const {
    externals,
    count: externalCount,
    filters: externalFiltersText,
    page: externalPage,
    offset: externalOffset,
  } = useAppSelector(selectExternal);
  const {
    internals,
    count: internalCount,
    filters: internalFiltersText,
    page: internalPage,
    offset: internalOffset,
  } = useAppSelector(selectInternal);
  const {
    others,
    count: otherCount,
    filters: otherFiltersText,
    page: otherPage,
    offset: otherOffset,
  } = useAppSelector(selectOther);

  const [isCreateModal, setCreateModal] = useState<boolean>(false);
  const [isExportModal, setExportModal] = useState<boolean>(false);
  const [isChangePentesterModal, setChangePentesterModal] = useState<boolean>(false);

  const [hasManagerAccess, setManagerAccess] = useState<boolean>(false);
  const [hasTeamleadAccess, setTeamleadAccess] = useState<boolean>(false);

  const [headCells, setHeadCells] = useState<IHeadCell[]>([]);
  const [bodyRows, setBodyRows] = useState<Object[]>([]);
  const [filterItems, setFilterItems] = useState<IFilter[]>([]);

  const [paginationCount, setPaginationCount] = useState<number>(0);
  const [paginationPage, setPaginationPage] = useState<number>(1);
  const [paginationLimit, setPaginationLimit] = useState<number>(10);

  const [isGroupsLoading, setGroupsLoading] = useState<boolean>(false);
  const [isCountsLoading, setCountsLoading] = useState<boolean>(false);
  const [activeRowIds, setActiveRowIds] = useState<string[]>([]);


  const [baseFilters, setBaseFilters] = useState<Object>({
    object_type: '',
    inf_system_id: '',
    office_id: '',
  });

  const [baseType, setBaseType] = useState<any>(null);
  const [baseInfSystem, setBaseInfSystem] = useState<any>(null);
  const [baseOffice, setBaseOffice] = useState<any>(null);


  const [webAppFilters, setWebAppFilters] = useState<IWebApp>({
    attacker_model: '',
    ip_address: '',
    greybox: false,
    blackbox: false,
    work_type: '',
  });

  const [webAppInfSystem, setWebAppInfSystem] = useState<any>(null);
  const [webAppAttackerModel, setWebAppAttackerModel] = useState<any>(null);
  const [webAppWorkType, setWebAppWorkType] = useState<any>(null);


  const [apiFilters, setApiFilters] = useState<IApi>({
    ip_address: '',
    greybox: false,
    blackbox: false,
    attacker_model: '',
    work_type: '',
  });

  const [apiInfSystem, setApiInfSystem] = useState<any>(null);
  const [apiAttackerModel, setApiAttackerModel] = useState<any>(null);
  const [apiWorkType, setApiWorkType] = useState<any>(null);


  const [mobileAppFilters, setMobileAppFilters] = useState<IMobileApp>({
    app_name: '',
    platform_type: '',
    greybox: false,
    blackbox: false,
  });

  const [mobileAppInfSystem, setMobileAppInfSystem] = useState<any>(null);
  const [mobileAppPlatform, setMobileAppPlatform] = useState<any>(null);


  const [networkDeviceFilters, setNetworkDeviceFilters] = useState<INetworkDevice>({
    ip_address: '',
    greybox: false,
    blackbox: false,
    attacker_model: '',
    work_type: '',
  });

  const [networkDeviceInfSystem, setNetworkDeviceInfSystem] = useState<any>(null);
  const [networkDeviceOffice, setNetworkDeviceOffice] = useState<any>(null);
  const [networkDeviceAttackerModel, setNetworkDeviceAttackerModel] = useState<any>(null);
  const [networkDeviceWorkType, setNetworkDeviceWorkType] = useState<any>(null);


  const [serverFilters, setServerFilters] = useState<IServer>({
    attacker_model: '',
    ip_address: '',
    greybox: false,
    blackbox: false,
    work_type: '',
  });

  const [serverInfSystem, setServerInfSystem] = useState<any>(null);
  const [serverOffice, setServerOffice] = useState<any>(null);
  const [serverAttackerModel, setServerAttackerModel] = useState<any>(null);
  const [serverWorkType, setServerWorkType] = useState<any>(null);


  const [armFilters, setArmFilters] = useState<IArm>({
    ip_address: '',
    greybox: false,
    blackbox: false,
    attacker_model: '',
    work_type: '',
  });

  const [armInfSystem, setArmInfSystem] = useState<any>(null);
  const [armOffice, setArmOffice] = useState<any>(null);
  const [armAttackerModel, setArmAttackerModel] = useState<any>(null);
  const [armWorkType, setArmWorkType] = useState<any>(null);


  const [wifiFilters, setWifiFilters] = useState<IWifi>({
    attacker_model: '',
    bssid: '',
    ssid: '',
    greybox: false,
    blackbox: false,
  });

  const [wifiOffice, setWifiOffice] = useState<any>(null);
  const [wifiAttackerModel, setWifiAttackerModel] = useState<any>(null);


  const [socialEngineeringFilters, setSocialEngineeringFilters] = useState<ISocialEngineering>({
    success_criterion: '',
  });

  const [socialEngineeringOffice, setSocialEngineeringOffice] = useState<any>(null);

  const [socialEngineeringTypeOption, setSocialEngineeringTypeOption] = useState<any>(null);


  const [desktopAppFilters, setDesktopAppFilters] = useState<IDesktopApp>({
    app_name: '',
    platform_type: '',
    greybox: false,
    blackbox: false,
  });

  const [desktopAppInfSystem, setDesktopAppInfSystem] = useState<any>(null);
  const [desktopAppPlatform, setDesktopAppPlatform] = useState<any>(null);


  const [sourceCodeFilters, setSourceCodeFilters] = useState<ISourceCode>({
    number_rows: null,
    programming_language: [],
  });

  const [programmingLanguage, setProgrammingLanguage] = useState<any>(null);
  const [sourceCodeInfSystem, setSourceCodeInfSystem] = useState<any>(null);
  const [secondaryNumberRows, setSecondaryNumberRows] = useState<number | null>(null);


  const [externalFilters, setExternalFilters] = useState<IExternal>({
    ip_address: '',
  });

  const [externalInfSystem, setExternalInfSystem] = useState<any>(null);


  const [internalFilters, setInternalFilters] = useState<IInternal>({
    ip_address: '',
  });

  const [internalInfSystem, setInternalInfSystem] = useState<any>(null);


  const [otherFilters, setOtherFilters] = useState<IOther>({
    ip_address: '',
  });

  const [otherInfSystem, setOtherInfSystem] = useState<any>(null);
  const [otherOffice, setOtherOffice] = useState<any>(null);

  useEffect(() => {
    setManagerAccess(manager?.id === id);
    setTeamleadAccess(teamlead?.id === id);
  }, [teamlead, manager, id]);

  useEffect(() => {
    switch (selectTab) {
    case OBJECT_TYPES.Base: {
      dispatch(getBaseObjects({ id: projectId, filters: baseFiltersText, pagination: `offset=${baseOffset}&limit=10` }));

      break;
    }

    case OBJECT_TYPES.WebApp: {
      dispatch(getObjects({ id: projectId, objectType: selectTab, filters: webAppFiltersText, pagination: `offset=${webAppOffset}&limit=10` }));

      break;
    }

    case OBJECT_TYPES.API: {
      dispatch(getObjects({ id: projectId, objectType: selectTab, filters: apiFiltersText, pagination: `offset=${apiOffset}&limit=10` }));

      break;
    }

    case OBJECT_TYPES.MobileApp: {
      dispatch(getObjects({ id: projectId, objectType: selectTab, filters: mobileAppFiltersText, pagination: `offset=${mobileAppOffset}&limit=10` }));

      break;
    }

    case OBJECT_TYPES.NetworkDevice: {
      dispatch(getObjects({ id: projectId, objectType: selectTab, filters: networkDeviceFiltersText, pagination: `offset=${networkDeviceOffset}&limit=10` }));

      break;
    }

    case OBJECT_TYPES.Server: {
      dispatch(getObjects({ id: projectId, objectType: selectTab, filters: serverFiltersText, pagination: `offset=${serverOffset}&limit=10` }));

      break;
    }

    case OBJECT_TYPES.ARM: {
      dispatch(getObjects({ id: projectId, objectType: selectTab, filters: armFiltersText, pagination: `offset=${armOffset}&limit=10` }));

      break;
    }

    case OBJECT_TYPES.WiFi: {
      dispatch(getObjects({ id: projectId, objectType: selectTab, filters: wifiFiltersText, pagination: `offset=${wifiOffset}&limit=10` }));

      break;
    }

    case OBJECT_TYPES.SocialEngineering: {
      dispatch(getObjects({ id: projectId, objectType: selectTab, filters: socialEngineeringFiltersText, pagination: `offset=${socialEngineeringOffset}&limit=10` }));

      break;
    }

    case OBJECT_TYPES.DesktopApp: {
      dispatch(getObjects({ id: projectId, objectType: selectTab, filters: desktopAppFiltersText, pagination: `offset=${desktopAppOffset}&limit=10` }));

      break;
    }

    case OBJECT_TYPES.SourceCode: {
      dispatch(getObjects({ id: projectId, objectType: selectTab, filters: sourceCodeFiltersText, pagination: `offset=${sourceCodeOffset}&limit=10` }));

      break;
    }

    case OBJECT_TYPES.External: {
      dispatch(getObjects({ id: projectId, objectType: selectTab, filters: externalFiltersText, pagination: `offset=${externalOffset}&limit=10` }));

      break;
    }

    case OBJECT_TYPES.Internal: {
      dispatch(getObjects({ id: projectId, objectType: selectTab, filters: internalFiltersText, pagination: `offset=${internalOffset}&limit=10` }));

      break;
    }

    case OBJECT_TYPES.Other: {
      dispatch(getObjects({ id: projectId, objectType: selectTab, filters: otherFiltersText, pagination: `offset=${otherOffset}&limit=10` }));

      break;
    }
    }

    setPaginationLimit(10);
    setActiveRowIds([]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectTab]);

  useEffect(() => {
    if (!isGroupsLoading && customer?.id) {
      dispatch(getAllInfSystems({ id: customer?.id }));
      dispatch(getAllOffices({ id: customer?.id }));

      setGroupsLoading(true);
    } else {
      prepareInfSystems = allInfSystems.map((infSystem) => {
        return {
          label: infSystem.name,
          value: infSystem.id,
        };
      });

      prepareOffices = allOffices.map((office) => {
        return {
          label: office.name,
          value: office.id,
        };
      });
    }
  }, [dispatch, isGroupsLoading, allInfSystems, allOffices, customer]);

  useEffect(() => {
    preparedObjectFilters(
      selectTab, setFilterItems, baseFilters, setBaseFilters, baseType, setBaseType, baseInfSystem, setBaseInfSystem,
      baseOffice, setBaseOffice, webAppFilters, setWebAppFilters, webAppInfSystem, setWebAppInfSystem,
      webAppAttackerModel, setWebAppAttackerModel, webAppWorkType, setWebAppWorkType, apiFilters, setApiFilters,
      apiInfSystem, setApiInfSystem, apiAttackerModel, setApiAttackerModel, apiWorkType, setApiWorkType,
      mobileAppFilters, setMobileAppFilters, mobileAppInfSystem, setMobileAppInfSystem, mobileAppPlatform,
      setMobileAppPlatform, networkDeviceFilters, setNetworkDeviceFilters, networkDeviceInfSystem,
      setNetworkDeviceInfSystem, networkDeviceOffice, setNetworkDeviceOffice, networkDeviceAttackerModel,
      setNetworkDeviceAttackerModel, networkDeviceWorkType, setNetworkDeviceWorkType, serverFilters, setServerFilters,
      serverInfSystem, setServerInfSystem, serverOffice, setServerOffice, serverAttackerModel, setServerAttackerModel,
      serverWorkType, setServerWorkType, armFilters, setArmFilters, armInfSystem, setArmInfSystem, armOffice,
      setArmOffice, armAttackerModel, setArmAttackerModel, armWorkType, setArmWorkType, wifiFilters, setWifiFilters,
      wifiOffice, setWifiOffice, wifiAttackerModel, setWifiAttackerModel, socialEngineeringFilters,
      setSocialEngineeringFilters, socialEngineeringOffice, setSocialEngineeringOffice, socialEngineeringTypeOption,
      setSocialEngineeringTypeOption, desktopAppFilters, setDesktopAppFilters, desktopAppInfSystem,
      setDesktopAppInfSystem, desktopAppPlatform, setDesktopAppPlatform, sourceCodeFilters, setSourceCodeFilters,
      sourceCodeInfSystem, setSourceCodeInfSystem, secondaryNumberRows, setSecondaryNumberRows, programmingLanguage,
      setProgrammingLanguage, externalFilters, setExternalFilters, externalInfSystem, setExternalInfSystem,
      internalFilters, setInternalFilters, internalInfSystem, setInternalInfSystem, otherFilters, setOtherFilters,
      otherInfSystem, setOtherInfSystem, otherOffice, setOtherOffice, prepareInfSystems, prepareOffices, role,
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role, selectTab, webAppFilters, apiFilters, mobileAppFilters, networkDeviceFilters, serverFilters, armFilters,
    wifiFilters, socialEngineeringFilters, desktopAppFilters, sourceCodeFilters, externalFilters, internalFilters,
    otherFilters, prepareInfSystems, prepareOffices, secondaryNumberRows, baseFilters]);

  useEffect(() => {
    if (projectId && !customer?.id) {
      dispatch(getProjectById(projectId));
    }

    if (projectId && !isCountsLoading) {
      dispatch(getObjectCounts({ id: projectId }));

      setCountsLoading(true);
    }
  }, [dispatch, projectId, isCountsLoading, customer?.id]);

  useEffect(() => {
    preparedObjectPaginationItems(selectTab, setPaginationCount, setPaginationPage, baseCount, webAppCount, apiCount,
      mobileAppCount, networkDeviceCount, serverCount, armCount, wifiCount, socialEngineeringCount, desktopAppCount,
      sourceCodeCount, externalCount, internalCount, otherCount, basePage, webAppPage, apiPage, mobileAppPage,
      networkDevicePage, serverPage, armPage, wifiPage, socialEngineeringPage, desktopAppPage, sourceCodePage,
      externalPage, internalPage, otherPage);
  }, [selectTab, webAppCount, apiCount, mobileAppCount, networkDeviceCount, serverCount, armCount, wifiCount,
    socialEngineeringCount, desktopAppCount, sourceCodeCount, externalCount, internalCount, otherCount, webAppPage,
    apiPage, mobileAppPage, networkDevicePage, serverPage, armPage, wifiPage, socialEngineeringPage, desktopAppPage,
    sourceCodePage, externalPage, internalPage, otherPage, baseCount, basePage]);

  useEffect(() => {
    preparedObjectRows(selectTab, setHeadCells, setBodyRows, base, webApps, api, mobileApps, networkDevices, servers, arm,
      wifies, socialEngineering, desktopApps, sourceCodes, externals, internals, others,
    );
  }, [selectTab, api, networkDevices, arm, sourceCodes, webApps, servers, mobileApps, socialEngineering, wifies,
    desktopApps, externals, internals, others, base]);

  const onSearchButtonClick = (reset: boolean) => {
    if (reset) {
      dispatch(getObjectCounts({ id: projectId, filters: '' }));

      filterScopeOrDelete(dispatch, baseFiltersText, setBaseFiltersText);

      filterScopeOrDelete(dispatch, webAppFiltersText, setWebAppFiltersText);
      filterScopeOrDelete(dispatch, apiFiltersText, setApiFiltersText);
      filterScopeOrDelete(dispatch, mobileAppFiltersText, setMobileAppFiltersText);
      filterScopeOrDelete(dispatch, networkDeviceFiltersText, setNetworkDeviceFiltersText);
      filterScopeOrDelete(dispatch, serverFiltersText, setServerFiltersText);

      filterScopeOrDelete(dispatch, armFiltersText, setArmFiltersText);
      filterScopeOrDelete(dispatch, wifiFiltersText, setWifiFiltersText);
      filterScopeOrDelete(dispatch, socialEngineeringFiltersText, setSocialEngineeringFiltersText);
      filterScopeOrDelete(dispatch, desktopAppFiltersText, setDesktopAppFiltersText);
      filterScopeOrDelete(dispatch, sourceCodeFiltersText, setSourceCodeFiltersText);

      filterScopeOrDelete(dispatch, externalFiltersText, setExternalFiltersText);
      filterScopeOrDelete(dispatch, internalFiltersText, setInternalFiltersText);
      filterScopeOrDelete(dispatch, otherFiltersText, setOtherFiltersText);

      setBaseFilters({
        ...baseFilters,
        my_scope: false,
        is_delete: false,
      });

      setWebAppFilters({
        ...webAppFilters,
        my_scope: false,
        is_delete: false,
      });
      setApiFilters({
        ...apiFilters,
        my_scope: false,
        is_delete: false,
      });
      setMobileAppFilters({
        ...mobileAppFilters,
        my_scope: false,
        is_delete: false,
      });
      setNetworkDeviceFilters({
        ...networkDeviceFilters,
        my_scope: false,
        is_delete: false,
      });
      setServerFilters({
        ...serverFilters,
        my_scope: false,
        is_delete: false,
      });

      setArmFilters({
        ...armFilters,
        my_scope: false,
        is_delete: false,
      });
      setWifiFilters({
        ...wifiFilters,
        my_scope: false,
        is_delete: false,
      });
      setSocialEngineeringFilters({
        ...socialEngineeringFilters,
        my_scope: false,
        is_delete: false,
      });
      setDesktopAppFilters({
        ...desktopAppFilters,
        my_scope: false,
        is_delete: false,
      });
      setSourceCodeFilters({
        ...sourceCodeFilters,
        my_scope: false,
        is_delete: false,
      });

      setExternalFilters({
        ...externalFilters,
        my_scope: false,
        is_delete: false,
      });
      setInternalFilters({
        ...internalFilters,
        my_scope: false,
        is_delete: false,
      });
      setOtherFilters({
        ...otherFilters,
        my_scope: false,
        is_delete: false,
      });
    }

    switch (selectTab) {
    case OBJECT_TYPES.Base: {
      let prepareBaseFilters = '';

      Object.entries(baseFilters).forEach((filter: any) => {
        const isFilterItemArray = Array.isArray(filter[1]);
        const isFilterArrayEmpty = isFilterItemArray && filter[1].length > 0;

        if (filter[1] && !isFilterItemArray) {
          prepareBaseFilters += `${prepareBaseFilters ? '&' : ''}${filter[0]}=${filter[1]}`;
        } else if (isFilterArrayEmpty) {
          filter[1].forEach((filterString: string) => {
            prepareBaseFilters += `${prepareBaseFilters ? '&' : ''}${filter[0]}=${filterString}`;
          });
        }
      });

      dispatch(setBaseFiltersText(prepareBaseFilters));
      dispatch(setBaseOffset(0));
      dispatch(setBasePage((1)));
      setPaginationLimit(10);

      if (reset) {
        dispatch(setBaseFiltersText(''));

        setBaseFilters({
          object_type: '',
          inf_system_id: '',
          office_id: '',
          my_scope: false,
          is_delete: false,
        });

        setBaseType(null);
        setBaseInfSystem(null);
        setBaseOffice(null);

        dispatch(getBaseObjects({ id: projectId, filters: '' }));
      }

      if (prepareBaseFilters && !reset) {
        const isScopeFilterActive = prepareBaseFilters.includes('my_scope');
        const isDeleteFilterActive = prepareBaseFilters.includes('is_delete');

        dispatch(getBaseObjects({ id: projectId, filters: prepareBaseFilters }));

        if (isScopeFilterActive || isDeleteFilterActive) {
          dispatch(getObjectCounts({ id: projectId, filters: prepareBaseFilters }));

          dispatch(setBaseFiltersText(prepareBaseFilters));

          dispatch(setWebAppFiltersText(
            webAppFiltersText +
              isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setApiFiltersText(
            apiFiltersText +
              isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setMobileAppFiltersText(
            mobileAppFiltersText +
              isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setNetworkDeviceFiltersText(
            networkDeviceFiltersText +
              isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setServerFiltersText(
            serverFiltersText +
              isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));

          dispatch(setArmFiltersText(
            armFiltersText +
              isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setWifiFiltersText(
            wifiFiltersText +
              isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setSocialEngineeringFiltersText(
            socialEngineeringFiltersText +
              isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setDesktopAppFiltersText(
            desktopAppFiltersText +
              isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setSourceCodeFiltersText(
            sourceCodeFiltersText +
              isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));

          dispatch(setExternalFiltersText(
            externalFiltersText +
              isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setInternalFiltersText(
            internalFiltersText +
              isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setOtherFiltersText(
            otherFiltersText +
              isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
        }
      }

      break;
    }

    case OBJECT_TYPES.WebApp: {
      let prepareWebAppFilters = '';

      Object.entries(webAppFilters).forEach((filter: any) => {
        const isFilterItemArray = Array.isArray(filter[1]);
        const isFilterArrayEmpty = isFilterItemArray && filter[1].length > 0;

        if (filter[1] && !isFilterItemArray) {
          prepareWebAppFilters += `${prepareWebAppFilters ? '&' : ''}${filter[0]}=${filter[1]}`;
        } else if (isFilterArrayEmpty) {
          filter[1].forEach((filterString: string) => {
            prepareWebAppFilters += `${prepareWebAppFilters ? '&' : ''}${filter[0]}=${filterString}`;
          });
        }
      });

      dispatch(setWebAppFiltersText(prepareWebAppFilters));
      dispatch(setWebAppOffset(0));
      dispatch(setWebAppPage((1)));
      setPaginationLimit(10);

      if (reset) {
        dispatch(setWebAppFiltersText(''));

        setWebAppFilters({
          attacker_model: '',
          inf_system_id: '',
          ip_address: '',
          greybox: false,
          blackbox: false,
          domain_name: '',
          work_type: '',
          my_scope: false,
          is_delete: false,
        });

        setWebAppInfSystem(null);
        setWebAppAttackerModel(null);
        setWebAppWorkType(null);

        dispatch(getObjects({ id: projectId, objectType: OBJECT_TYPES.WebApp, filters: '' }));
      }

      if (prepareWebAppFilters && !reset) {
        const isScopeFilterActive = prepareWebAppFilters.includes('my_scope');
        const isDeleteFilterActive = prepareWebAppFilters.includes('is_delete');

        dispatch(getObjects({ id: projectId, objectType: OBJECT_TYPES.WebApp, filters: prepareWebAppFilters }));

        if (isScopeFilterActive || isDeleteFilterActive) {
          dispatch(getObjectCounts({ id: projectId, filters: prepareWebAppFilters }));

          dispatch(setBaseFiltersText(
            baseFiltersText +
              isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));

          dispatch(setWebAppFiltersText(prepareWebAppFilters));
          dispatch(setApiFiltersText(
            apiFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setMobileAppFiltersText(
            mobileAppFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setNetworkDeviceFiltersText(
            networkDeviceFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setServerFiltersText(
            serverFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));

          dispatch(setArmFiltersText(
            armFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setWifiFiltersText(
            wifiFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setSocialEngineeringFiltersText(
            socialEngineeringFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setDesktopAppFiltersText(
            desktopAppFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setSourceCodeFiltersText(
            sourceCodeFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));

          dispatch(setExternalFiltersText(
            externalFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setInternalFiltersText(
            internalFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setOtherFiltersText(
            otherFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
        }
      }

      break;
    }

    case OBJECT_TYPES.API: {
      let prepareApiFilters = '';

      Object.entries(apiFilters).forEach((filter: any) => {
        const isFilterItemArray = Array.isArray(filter[1]);
        const isFilterArrayEmpty = isFilterItemArray && filter[1].length > 0;

        if (filter[1] && !isFilterItemArray) {
          prepareApiFilters += `${prepareApiFilters ? '&' : ''}${filter[0]}=${filter[1]}`;
        } else if (isFilterArrayEmpty) {
          filter[1].forEach((filterString: string) => {
            prepareApiFilters += `${prepareApiFilters ? '&' : ''}${filter[0]}=${filterString}`;
          });
        }
      });

      dispatch(setApiFiltersText(prepareApiFilters));
      dispatch(setApiOffset(0));
      dispatch(setApiPage((1)));
      setPaginationLimit(10);

      if (reset) {
        dispatch(setApiFiltersText(''));

        setApiFilters({
          ip_address: '',
          inf_system_id: '',
          domain_name: '',
          greybox: false,
          blackbox: false,
          attacker_model: '',
          work_type: '',
          my_scope: false,
          is_delete: false,
        });

        setApiInfSystem(null);
        setApiAttackerModel(null);
        setApiWorkType(null);

        dispatch(getObjects({ id: projectId, objectType: OBJECT_TYPES.API, filters: '' }));
      }

      if (prepareApiFilters && !reset) {
        const isScopeFilterActive = prepareApiFilters.includes('my_scope');
        const isDeleteFilterActive = prepareApiFilters.includes('is_delete');

        dispatch(getObjects({ id: projectId, objectType: OBJECT_TYPES.API, filters: prepareApiFilters }));

        if (isScopeFilterActive || isDeleteFilterActive) {
          dispatch(getObjectCounts({ id: projectId, filters: prepareApiFilters }));

          dispatch(setBaseFiltersText(
            baseFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));

          dispatch(setWebAppFiltersText(
            webAppFiltersText +
              isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setApiFiltersText(prepareApiFilters));
          dispatch(setMobileAppFiltersText(
            mobileAppFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setNetworkDeviceFiltersText(
            networkDeviceFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setServerFiltersText(
            serverFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));

          dispatch(setArmFiltersText(
            armFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setWifiFiltersText(
            wifiFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setSocialEngineeringFiltersText(
            socialEngineeringFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setDesktopAppFiltersText(
            desktopAppFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setSourceCodeFiltersText(
            sourceCodeFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));

          dispatch(setExternalFiltersText(
            externalFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setInternalFiltersText(
            internalFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setOtherFiltersText(
            otherFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
        }
      }

      break;
    }

    case OBJECT_TYPES.MobileApp: {
      let prepareMobileAppFilters = '';

      Object.entries(mobileAppFilters).forEach((filter: any) => {
        const isFilterItemArray = Array.isArray(filter[1]);
        const isFilterArrayEmpty = isFilterItemArray && filter[1].length > 0;

        if (filter[1] && !isFilterItemArray) {
          prepareMobileAppFilters += `${prepareMobileAppFilters ? '&' : ''}${filter[0]}=${filter[1]}`;
        } else if (isFilterArrayEmpty) {
          filter[1].forEach((filterString: string) => {
            prepareMobileAppFilters += `${prepareMobileAppFilters ? '&' : ''}${filter[0]}=${filterString}`;
          });
        }
      });

      dispatch(setMobileAppFiltersText(prepareMobileAppFilters));
      dispatch(setMobileAppOffset(0));
      dispatch(setMobileAppPage((1)));
      setPaginationLimit(10);

      if (reset) {
        dispatch(setMobileAppFiltersText(''));

        setMobileAppFilters({
          app_name: '',
          inf_system_id: '',
          platform_type: '',
          greybox: false,
          blackbox: false,
          my_scope: false,
          is_delete: false,
        });

        setMobileAppInfSystem(null);
        setMobileAppPlatform(null);

        dispatch(getObjects({ id: projectId, objectType: OBJECT_TYPES.MobileApp, filters: '' }));
      }

      if (prepareMobileAppFilters && !reset) {
        const isScopeFilterActive = prepareMobileAppFilters.includes('my_scope');
        const isDeleteFilterActive = prepareMobileAppFilters.includes('is_delete');

        dispatch(getObjects({ id: projectId, objectType: OBJECT_TYPES.MobileApp, filters: prepareMobileAppFilters }));

        if (isScopeFilterActive || isDeleteFilterActive) {
          dispatch(getObjectCounts({ id: projectId, filters: prepareMobileAppFilters }));

          dispatch(setBaseFiltersText(
            baseFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));

          dispatch(setWebAppFiltersText(
            webAppFiltersText +
              isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setApiFiltersText(
            apiFiltersText +
              isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setMobileAppFiltersText(prepareMobileAppFilters));
          dispatch(setNetworkDeviceFiltersText(
            networkDeviceFiltersText +
              isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setServerFiltersText(
            serverFiltersText +
              isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));

          dispatch(setArmFiltersText(
            armFiltersText +
              isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setWifiFiltersText(
            wifiFiltersText +
              isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setSocialEngineeringFiltersText(
            socialEngineeringFiltersText +
              isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setDesktopAppFiltersText(
            desktopAppFiltersText +
              isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setSourceCodeFiltersText(
            sourceCodeFiltersText +
              isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));

          dispatch(setExternalFiltersText(
            externalFiltersText +
              isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setInternalFiltersText(
            internalFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setOtherFiltersText(
            otherFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
        }
      }

      break;
    }

    case OBJECT_TYPES.NetworkDevice: {
      let prepareNetworkDeviceFilters = '';

      Object.entries(networkDeviceFilters).forEach((filter: any) => {
        const isFilterItemArray = Array.isArray(filter[1]);
        const isFilterArrayEmpty = isFilterItemArray && filter[1].length > 0;

        if (filter[1] && !isFilterItemArray) {
          prepareNetworkDeviceFilters += `${prepareNetworkDeviceFilters ? '&' : ''}${filter[0]}=${filter[1]}`;
        } else if (isFilterArrayEmpty) {
          filter[1].forEach((filterString: string) => {
            prepareNetworkDeviceFilters += `${prepareNetworkDeviceFilters ? '&' : ''}${filter[0]}=${filterString}`;
          });
        }
      });

      dispatch(setNetworkDeviceFiltersText(prepareNetworkDeviceFilters));
      dispatch(setNetworkDeviceOffset(0));
      dispatch(setNetworkDevicePage((1)));
      setPaginationLimit(10);

      if (reset) {
        dispatch(setNetworkDeviceFiltersText(''));

        setNetworkDeviceFilters({
          ip_address: '',
          greybox: false,
          blackbox: false,
          inf_system_id: '',
          office_id: '',
          attacker_model: '',
          network_device_name: '',
          work_type: '',
          my_scope: false,
          is_delete: false,
        });

        setNetworkDeviceInfSystem(null);
        setNetworkDeviceOffice(null);
        setNetworkDeviceAttackerModel(null);
        setNetworkDeviceWorkType(null);

        dispatch(getObjects({ id: projectId, objectType: OBJECT_TYPES.NetworkDevice, filters: '' }));
      }

      if (prepareNetworkDeviceFilters && !reset) {
        const isScopeFilterActive = prepareNetworkDeviceFilters.includes('my_scope');
        const isDeleteFilterActive = prepareNetworkDeviceFilters.includes('is_delete');

        dispatch(getObjects({ id: projectId, objectType: OBJECT_TYPES.NetworkDevice, filters: prepareNetworkDeviceFilters }));

        if (isScopeFilterActive || isDeleteFilterActive) {
          dispatch(getObjectCounts({ id: projectId, filters: prepareNetworkDeviceFilters }));

          dispatch(setBaseFiltersText(
            baseFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));

          dispatch(setWebAppFiltersText(
            webAppFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setApiFiltersText(
            apiFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setMobileAppFiltersText(
            mobileAppFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setNetworkDeviceFiltersText(prepareNetworkDeviceFilters));
          dispatch(setServerFiltersText(
            serverFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));

          dispatch(setArmFiltersText(
            armFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setWifiFiltersText(
            wifiFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setSocialEngineeringFiltersText(
            socialEngineeringFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setDesktopAppFiltersText(
            desktopAppFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setSourceCodeFiltersText(
            sourceCodeFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));

          dispatch(setExternalFiltersText(
            externalFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setInternalFiltersText(
            internalFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setOtherFiltersText(
            otherFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
        }
      }

      break;
    }

    case OBJECT_TYPES.Server: {
      let prepareServerFilters = '';

      Object.entries(serverFilters).forEach((filter: any) => {
        const isFilterItemArray = Array.isArray(filter[1]);
        const isFilterArrayEmpty = isFilterItemArray && filter[1].length > 0;

        if (filter[1] && !isFilterItemArray) {
          prepareServerFilters += `${prepareServerFilters ? '&' : ''}${filter[0]}=${filter[1]}`;
        } else if (isFilterArrayEmpty) {
          filter[1].forEach((filterString: string) => {
            prepareServerFilters += `${prepareServerFilters ? '&' : ''}${filter[0]}=${filterString}`;
          });
        }
      });

      dispatch(setServerFiltersText(prepareServerFilters));
      dispatch(setServerOffset(0));
      dispatch(setServerPage((1)));
      setPaginationLimit(10);

      if (reset) {
        dispatch(setServerFiltersText(''));

        setServerFilters({
          assignment: '',
          attacker_model: '',
          inf_system_id: '',
          office_id: '',
          ip_address: '',
          network_device_name: '',
          greybox: false,
          blackbox: false,
          work_type: '',
          my_scope: false,
          is_delete: false,
        });

        setServerInfSystem(null);
        setServerOffice(null);
        setServerAttackerModel(null);
        setServerWorkType(null);

        dispatch(getObjects({ id: projectId, objectType: OBJECT_TYPES.Server, filters: '' }));
      }

      if (prepareServerFilters && !reset) {
        const isScopeFilterActive = prepareServerFilters.includes('my_scope');
        const isDeleteFilterActive = prepareServerFilters.includes('is_delete');

        dispatch(getObjects({ id: projectId, objectType: OBJECT_TYPES.Server, filters: prepareServerFilters }));

        if (isScopeFilterActive || isDeleteFilterActive) {
          dispatch(getObjectCounts({ id: projectId, filters: prepareServerFilters }));

          dispatch(setBaseFiltersText(
            baseFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));

          dispatch(setWebAppFiltersText(
            webAppFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setApiFiltersText(
            apiFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setMobileAppFiltersText(
            mobileAppFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setNetworkDeviceFiltersText(
            networkDeviceFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setServerFiltersText(prepareServerFilters));

          dispatch(setArmFiltersText(
            armFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setWifiFiltersText(
            wifiFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setSocialEngineeringFiltersText(
            socialEngineeringFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setDesktopAppFiltersText(
            desktopAppFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setSourceCodeFiltersText(
            sourceCodeFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));

          dispatch(setExternalFiltersText(
            externalFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setInternalFiltersText(
            internalFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setOtherFiltersText(
            otherFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
        }
      }

      break;
    }

    case OBJECT_TYPES.ARM: {
      let prepareArmFilters = '';

      Object.entries(armFilters).forEach((filter: any) => {
        const isFilterItemArray = Array.isArray(filter[1]);
        const isFilterArrayEmpty = isFilterItemArray && filter[1].length > 0;

        if (filter[1] && !isFilterItemArray) {
          prepareArmFilters += `${prepareArmFilters ? '&' : ''}${filter[0]}=${filter[1]}`;
        } else if (isFilterArrayEmpty) {
          filter[1].forEach((filterString: string) => {
            prepareArmFilters += `${prepareArmFilters ? '&' : ''}${filter[0]}=${filterString}`;
          });
        }
      });

      dispatch(setArmFiltersText(prepareArmFilters));
      dispatch(setArmOffset(0));
      dispatch(setArmPage((1)));
      setPaginationLimit(10);

      if (reset) {
        dispatch(setArmFiltersText(''));

        setArmFilters({
          ip_address: '',
          greybox: false,
          blackbox: false,
          inf_system_id: '',
          office_id: '',
          attacker_model: '',
          network_device_name: '',
          work_type: '',
          my_scope: false,
          is_delete: false,
        });

        setArmInfSystem(null);
        setArmOffice(null);
        setArmAttackerModel(null);
        setArmWorkType(null);

        dispatch(getObjects({ id: projectId, objectType: OBJECT_TYPES.ARM, filters: '' }));
      }

      if (prepareArmFilters && !reset) {
        const isScopeFilterActive = prepareArmFilters.includes('my_scope');
        const isDeleteFilterActive = prepareArmFilters.includes('is_delete');

        dispatch(getObjects({ id: projectId, objectType: OBJECT_TYPES.ARM, filters: prepareArmFilters }));

        if (isScopeFilterActive || isDeleteFilterActive) {
          dispatch(getObjectCounts({ id: projectId, filters: prepareArmFilters }));

          dispatch(setBaseFiltersText(
            baseFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));

          dispatch(setWebAppFiltersText(
            webAppFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setApiFiltersText(
            apiFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setMobileAppFiltersText(
            mobileAppFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setNetworkDeviceFiltersText(
            networkDeviceFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setServerFiltersText(serverFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
            isDeleteFilterActive ? '&is_delete=true' : '',
          ));

          dispatch(setArmFiltersText(prepareArmFilters));
          dispatch(setWifiFiltersText(
            wifiFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setSocialEngineeringFiltersText(
            socialEngineeringFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setDesktopAppFiltersText(
            desktopAppFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setSourceCodeFiltersText(
            sourceCodeFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));

          dispatch(setExternalFiltersText(
            externalFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setInternalFiltersText(
            internalFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setOtherFiltersText(
            otherFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
        }
      }

      break;
    }

    case OBJECT_TYPES.WiFi: {
      let prepareWifiFilters = '';

      Object.entries(wifiFilters).forEach((filter: any) => {
        const isFilterItemArray = Array.isArray(filter[1]);
        const isFilterArrayEmpty = isFilterItemArray && filter[1].length > 0;

        if (filter[1] && !isFilterItemArray) {
          prepareWifiFilters += `${prepareWifiFilters ? '&' : ''}${filter[0]}=${filter[1]}`;
        } else if (isFilterArrayEmpty) {
          filter[1].forEach((filterString: string) => {
            prepareWifiFilters += `${prepareWifiFilters ? '&' : ''}${filter[0]}=${filterString}`;
          });
        }
      });

      dispatch(setWifiFiltersText(prepareWifiFilters));
      dispatch(setWifiOffset(0));
      dispatch(setWifiPage((1)));
      setPaginationLimit(10);

      if (reset) {
        dispatch(setWifiFiltersText(''));

        setWifiFilters({
          additional_info: '',
          attacker_model: '',
          bssid: '',
          office_id: '',
          ssid: '',
          greybox: false,
          blackbox: false,
          my_scope: false,
          is_delete: false,
        });

        setWifiOffice(null);
        setWifiAttackerModel(null);

        dispatch(getObjects({ id: projectId, objectType: OBJECT_TYPES.WiFi, filters: '' }));
      }

      if (prepareWifiFilters && !reset) {
        const isScopeFilterActive = prepareWifiFilters.includes('my_scope');
        const isDeleteFilterActive = prepareWifiFilters.includes('is_delete');

        dispatch(getObjects({ id: projectId, objectType: OBJECT_TYPES.WiFi, filters: prepareWifiFilters }));

        if (isScopeFilterActive || isDeleteFilterActive) {
          dispatch(getObjectCounts({ id: projectId, filters: prepareWifiFilters }));

          dispatch(setBaseFiltersText(
            baseFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));

          dispatch(setWebAppFiltersText(
            webAppFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setApiFiltersText(
            apiFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setMobileAppFiltersText(
            mobileAppFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setNetworkDeviceFiltersText(
            networkDeviceFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setServerFiltersText(
            serverFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));

          dispatch(setArmFiltersText(
            armFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setWifiFiltersText(prepareWifiFilters));
          dispatch(setSocialEngineeringFiltersText(
            socialEngineeringFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setDesktopAppFiltersText(
            desktopAppFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setSourceCodeFiltersText(
            sourceCodeFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));

          dispatch(setExternalFiltersText(
            externalFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setInternalFiltersText(
            internalFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setOtherFiltersText(
            otherFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
        }
      }

      break;
    }

    case OBJECT_TYPES.SocialEngineering: {
      let prepareSocialEngineeringFilters = '';

      Object.entries(socialEngineeringFilters).forEach((filter: any) => {
        const isFilterItemArray = Array.isArray(filter[1]);
        const isFilterArrayEmpty = isFilterItemArray && filter[1].length > 0;

        if (filter[1] && !isFilterItemArray) {
          prepareSocialEngineeringFilters += `${prepareSocialEngineeringFilters ? '&' : ''}${filter[0]}=${filter[1]}`;
        } else if (isFilterArrayEmpty) {
          filter[1].forEach((filterString: string) => {
            prepareSocialEngineeringFilters += `${prepareSocialEngineeringFilters ? '&' : ''}${filter[0]}=${filterString}`;
          });
        }
      });

      dispatch(setSocialEngineeringFiltersText(prepareSocialEngineeringFilters));
      dispatch(setSocialEngineeringOffset(0));
      dispatch(setSocialEngineeringPage((1)));
      setPaginationLimit(10);

      if (reset) {
        dispatch(setSocialEngineeringFiltersText(''));

        setSocialEngineeringFilters({
          office_id: '',
          engineering_type: [],
          success_criterion: '',
          additional_info: '',
          my_scope: false,
          is_delete: false,
        });

        setSocialEngineeringOffice(null);
        setSocialEngineeringTypeOption(null);

        dispatch(getObjects({ id: projectId, objectType: OBJECT_TYPES.SocialEngineering, filters: '' }));
      }

      if (prepareSocialEngineeringFilters && !reset) {
        const isScopeFilterActive = prepareSocialEngineeringFilters.includes('my_scope');
        const isDeleteFilterActive = prepareSocialEngineeringFilters.includes('is_delete');

        dispatch(getObjects({ id: projectId, objectType: OBJECT_TYPES.SocialEngineering, filters: prepareSocialEngineeringFilters }));

        if (isScopeFilterActive || isDeleteFilterActive) {
          dispatch(getObjectCounts({ id: projectId, filters: prepareSocialEngineeringFilters }));

          dispatch(setBaseFiltersText(
            baseFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));

          dispatch(setWebAppFiltersText(
            webAppFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setApiFiltersText(
            apiFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setMobileAppFiltersText(
            mobileAppFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setNetworkDeviceFiltersText(
            networkDeviceFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setServerFiltersText(
            serverFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));

          dispatch(setArmFiltersText(
            armFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setWifiFiltersText(
            wifiFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setSocialEngineeringFiltersText(prepareSocialEngineeringFilters));
          dispatch(setDesktopAppFiltersText(
            desktopAppFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setSourceCodeFiltersText(
            sourceCodeFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));

          dispatch(setExternalFiltersText(
            externalFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setInternalFiltersText(
            internalFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setOtherFiltersText(
            otherFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
        }
      }

      break;
    }

    case OBJECT_TYPES.DesktopApp: {
      let prepareDesktopAppFilters = '';

      Object.entries(desktopAppFilters).forEach((filter: any) => {
        const isFilterItemArray = Array.isArray(filter[1]);
        const isFilterArrayEmpty = isFilterItemArray && filter[1].length > 0;

        if (filter[1] && !isFilterItemArray) {
          prepareDesktopAppFilters += `${prepareDesktopAppFilters ? '&' : ''}${filter[0]}=${filter[1]}`;
        } else if (isFilterArrayEmpty) {
          filter[1].forEach((filterString: string) => {
            prepareDesktopAppFilters += `${prepareDesktopAppFilters ? '&' : ''}${filter[0]}=${filterString}`;
          });
        }
      });

      dispatch(setDesktopAppFiltersText(prepareDesktopAppFilters));
      dispatch(setDesktopAppOffset(0));
      dispatch(setDesktopAppPage((1)));
      setPaginationLimit(10);

      if (reset) {
        dispatch(setDesktopAppFiltersText(''));

        setDesktopAppFilters({
          additional_info: '',
          app_name: '',
          inf_system_id: '',
          platform_type: '',
          greybox: false,
          blackbox: false,
          my_scope: false,
          is_delete: false,
        });

        setDesktopAppInfSystem(null);
        setDesktopAppPlatform(null);

        dispatch(getObjects({ id: projectId, objectType: OBJECT_TYPES.DesktopApp, filters: '' }));
      }

      if (prepareDesktopAppFilters && !reset) {
        const isScopeFilterActive = prepareDesktopAppFilters.includes('my_scope');
        const isDeleteFilterActive = prepareDesktopAppFilters.includes('is_delete');

        dispatch(getObjects({ id: projectId, objectType: OBJECT_TYPES.DesktopApp, filters: prepareDesktopAppFilters }));

        if (isScopeFilterActive || isDeleteFilterActive) {
          dispatch(getObjectCounts({ id: projectId, filters: prepareDesktopAppFilters }));

          dispatch(setBaseFiltersText(
            baseFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));

          dispatch(setWebAppFiltersText(
            webAppFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setApiFiltersText(
            apiFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setMobileAppFiltersText(
            mobileAppFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setNetworkDeviceFiltersText(
            networkDeviceFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setServerFiltersText(
            serverFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));

          dispatch(setArmFiltersText(
            armFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setWifiFiltersText(
            wifiFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setSocialEngineeringFiltersText(
            socialEngineeringFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setDesktopAppFiltersText(prepareDesktopAppFilters));
          dispatch(setSourceCodeFiltersText(
            sourceCodeFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));

          dispatch(setExternalFiltersText(
            externalFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setInternalFiltersText(
            internalFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setOtherFiltersText(
            otherFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
        }
      }

      break;
    }

    case OBJECT_TYPES.SourceCode: {
      let prepareSourceCodeFilters = '';

      Object.entries(sourceCodeFilters).forEach((filter: any) => {
        const isFilterItemArray = Array.isArray(filter[1]);
        const isFilterArrayEmpty = isFilterItemArray && filter[1].length > 0;

        if ((filter[1] && !isFilterItemArray) || (filter[1] === 0)) {
          prepareSourceCodeFilters += `${prepareSourceCodeFilters ? '&' : ''}${filter[0]}=${filter[1]}`;
        } else if (isFilterArrayEmpty) {
          filter[1].forEach((filterString: string) => {
            prepareSourceCodeFilters += `${prepareSourceCodeFilters ? '&' : ''}${filter[0]}=${filterString}`;
          });
        }
      });

      prepareSourceCodeFilters = filterDateOrNumber(prepareSourceCodeFilters, sourceCodeFilters, secondaryNumberRows, 'number_rows');

      dispatch(setSourceCodeFiltersText(prepareSourceCodeFilters));
      dispatch(setSourceCodeOffset(0));
      dispatch(setSourceCodePage((1)));
      setPaginationLimit(10);

      if (reset) {
        dispatch(setSourceCodeFiltersText(''));

        setSourceCodeFilters({
          inf_system_id: '',
          number_rows: NaN,
          programming_language: [],
          my_scope: false,
          is_delete: false,
        });

        setSourceCodeInfSystem(null);
        setSecondaryNumberRows(NaN);
        setProgrammingLanguage(null);

        dispatch(getObjects({ id: projectId, objectType: OBJECT_TYPES.SourceCode, filters: '' }));
      }

      if (prepareSourceCodeFilters && !reset) {
        const isScopeFilterActive = prepareSourceCodeFilters.includes('my_scope');
        const isDeleteFilterActive = prepareSourceCodeFilters.includes('is_delete');

        dispatch(getObjects({ id: projectId, objectType: OBJECT_TYPES.SourceCode, filters: prepareSourceCodeFilters }));

        if (isScopeFilterActive || isDeleteFilterActive) {
          dispatch(getObjectCounts({ id: projectId, filters: prepareSourceCodeFilters }));

          dispatch(setBaseFiltersText(
            baseFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));

          dispatch(setWebAppFiltersText(
            webAppFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setApiFiltersText(
            apiFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setMobileAppFiltersText(
            mobileAppFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setNetworkDeviceFiltersText(
            networkDeviceFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setServerFiltersText(
            serverFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));

          dispatch(setArmFiltersText(
            armFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setWifiFiltersText(
            wifiFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setSocialEngineeringFiltersText(
            socialEngineeringFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setDesktopAppFiltersText(
            desktopAppFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setSourceCodeFiltersText(prepareSourceCodeFilters));

          dispatch(setExternalFiltersText(
            externalFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setInternalFiltersText(
            internalFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setOtherFiltersText(
            otherFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
        }
      }

      break;
    }

    case OBJECT_TYPES.External: {
      let prepareExternalFilters = '';

      Object.entries(externalFilters).forEach((filter: any) => {
        const isFilterItemArray = Array.isArray(filter[1]);
        const isFilterArrayEmpty = isFilterItemArray && filter[1].length > 0;

        if (filter[1] && !isFilterItemArray) {
          prepareExternalFilters += `${prepareExternalFilters ? '&' : ''}${filter[0]}=${filter[1]}`;
        } else if (isFilterArrayEmpty) {
          filter[1].forEach((filterString: string) => {
            prepareExternalFilters += `${prepareExternalFilters ? '&' : ''}${filter[0]}=${filterString}`;
          });
        }
      });

      dispatch(setExternalFiltersText(prepareExternalFilters));
      dispatch(setExternalOffset(0));
      dispatch(setExternalPage((1)));
      setPaginationLimit(10);

      if (reset) {
        dispatch(setExternalFiltersText(''));

        setExternalFilters({
          inf_system_id: '',
          ip_address: '',
          my_scope: false,
          is_delete: false,
        });

        setExternalInfSystem(null);

        dispatch(getObjects({ id: projectId, objectType: OBJECT_TYPES.External, filters: '' }));
      }

      if (prepareExternalFilters && !reset) {
        const isScopeFilterActive = prepareExternalFilters.includes('my_scope');
        const isDeleteFilterActive = prepareExternalFilters.includes('is_delete');

        dispatch(getObjects({ id: projectId, objectType: OBJECT_TYPES.External, filters: prepareExternalFilters }));

        if (isScopeFilterActive || isDeleteFilterActive) {
          dispatch(getObjectCounts({ id: projectId, filters: prepareExternalFilters }));

          dispatch(setBaseFiltersText(
            baseFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));

          dispatch(setWebAppFiltersText(
            webAppFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setApiFiltersText(
            apiFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setMobileAppFiltersText(
            mobileAppFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setNetworkDeviceFiltersText(
            networkDeviceFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setServerFiltersText(
            serverFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));

          dispatch(setArmFiltersText(
            armFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setWifiFiltersText(
            wifiFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setSocialEngineeringFiltersText(
            socialEngineeringFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setDesktopAppFiltersText(
            desktopAppFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setSourceCodeFiltersText(
            sourceCodeFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));

          dispatch(setExternalFiltersText(prepareExternalFilters));
          dispatch(setInternalFiltersText(
            internalFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setOtherFiltersText(
            otherFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
        }
      }

      break;
    }

    case OBJECT_TYPES.Internal: {
      let prepareInternalFilters = '';

      Object.entries(internalFilters).forEach((filter: any) => {
        const isFilterItemArray = Array.isArray(filter[1]);
        const isFilterArrayEmpty = isFilterItemArray && filter[1].length > 0;

        if (filter[1] && !isFilterItemArray) {
          prepareInternalFilters += `${prepareInternalFilters ? '&' : ''}${filter[0]}=${filter[1]}`;
        } else if (isFilterArrayEmpty) {
          filter[1].forEach((filterString: string) => {
            prepareInternalFilters += `${prepareInternalFilters ? '&' : ''}${filter[0]}=${filterString}`;
          });
        }
      });

      dispatch(setInternalFiltersText(prepareInternalFilters));
      dispatch(setInternalOffset(0));
      dispatch(setInternalPage((1)));
      setPaginationLimit(10);

      if (reset) {
        dispatch(setInternalFiltersText(''));

        setInternalFilters({
          inf_system_id: '',
          ip_address: '',
          my_scope: false,
          is_delete: false,
        });

        setInternalInfSystem(null);

        dispatch(getObjects({ id: projectId, objectType: OBJECT_TYPES.Internal, filters: '' }));
      }

      if (prepareInternalFilters && !reset) {
        const isScopeFilterActive = prepareInternalFilters.includes('my_scope');
        const isDeleteFilterActive = prepareInternalFilters.includes('is_delete');

        dispatch(getObjects({ id: projectId, objectType: OBJECT_TYPES.Internal, filters: prepareInternalFilters }));

        if (isScopeFilterActive || isDeleteFilterActive) {
          dispatch(getObjectCounts({ id: projectId, filters: prepareInternalFilters }));

          dispatch(setBaseFiltersText(
            baseFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));

          dispatch(setWebAppFiltersText(
            webAppFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setApiFiltersText(
            apiFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setMobileAppFiltersText(
            mobileAppFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setNetworkDeviceFiltersText(
            networkDeviceFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setServerFiltersText(
            serverFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));

          dispatch(setArmFiltersText(
            armFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setWifiFiltersText(
            wifiFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setSocialEngineeringFiltersText(
            socialEngineeringFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setDesktopAppFiltersText(
            desktopAppFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setSourceCodeFiltersText(
            sourceCodeFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));

          dispatch(setExternalFiltersText(
            externalFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setInternalFiltersText(prepareInternalFilters));
          dispatch(setOtherFiltersText(
            otherFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
        }
      }

      break;
    }

    case OBJECT_TYPES.Other: {
      let prepareOtherFilters = '';

      Object.entries(otherFilters).forEach((filter: any) => {
        const isFilterItemArray = Array.isArray(filter[1]);
        const isFilterArrayEmpty = isFilterItemArray && filter[1].length > 0;

        if (filter[1] && !isFilterItemArray) {
          prepareOtherFilters += `${prepareOtherFilters ? '&' : ''}${filter[0]}=${filter[1]}`;
        } else if (isFilterArrayEmpty) {
          filter[1].forEach((filterString: string) => {
            prepareOtherFilters += `${prepareOtherFilters ? '&' : ''}${filter[0]}=${filterString}`;
          });
        }
      });

      dispatch(setOtherFiltersText(prepareOtherFilters));
      dispatch(setOtherOffset(0));
      dispatch(setOtherPage((1)));
      setPaginationLimit(10);

      if (reset) {
        dispatch(setOtherFiltersText(''));

        setOtherFilters({
          inf_system_id: '',
          ip_address: '',
          my_scope: false,
          is_delete: false,
        });

        setOtherInfSystem(null);
        setOtherOffice(null);

        dispatch(getObjects({ id: projectId, objectType: OBJECT_TYPES.Other, filters: '' }));
      }

      if (prepareOtherFilters && !reset) {
        const isScopeFilterActive = prepareOtherFilters.includes('my_scope');
        const isDeleteFilterActive = prepareOtherFilters.includes('is_delete');

        dispatch(getObjects({ id: projectId, objectType: OBJECT_TYPES.Other, filters: prepareOtherFilters }));

        if (isScopeFilterActive || isDeleteFilterActive) {
          dispatch(getObjectCounts({ id: projectId, filters: prepareOtherFilters }));

          dispatch(setBaseFiltersText(
            baseFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));

          dispatch(setWebAppFiltersText(
            webAppFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setApiFiltersText(
            apiFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setMobileAppFiltersText(
            mobileAppFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setNetworkDeviceFiltersText(
            networkDeviceFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setServerFiltersText(
            serverFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));

          dispatch(setArmFiltersText(
            armFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setWifiFiltersText(
            wifiFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setSocialEngineeringFiltersText(
            socialEngineeringFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setDesktopAppFiltersText(
            desktopAppFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setSourceCodeFiltersText(
            sourceCodeFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));

          dispatch(setExternalFiltersText(
            externalFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setInternalFiltersText(
            internalFiltersText +
            isScopeFilterActive ? isDeleteFilterActive ? '&my_scope=true&is_delete=true' : '&my_scope=true' :
              isDeleteFilterActive ? '&is_delete=true' : '',
          ));
          dispatch(setOtherFiltersText(prepareOtherFilters));
        }
      }

      break;
    }
    }
  };

  const onPageClick = (offset: number, limit: number) => {
    const preparePagination = `offset=${offset}&limit=${limit}`;

    switch (selectTab) {
    case OBJECT_TYPES.Base: {
      dispatch(setBaseOffset(offset));
      dispatch(setBasePage((offset + limit) / limit));

      dispatch(getBaseObjects({ id: projectId, pagination: preparePagination, filters: baseFiltersText }));

      break;
    }

    case OBJECT_TYPES.WebApp: {
      dispatch(setWebAppOffset(offset));
      dispatch(setWebAppPage((offset + limit) / limit));

      dispatch(getObjects({ id: projectId, objectType: selectTab, pagination: preparePagination, filters: webAppFiltersText }));

      break;
    }

    case OBJECT_TYPES.API: {
      dispatch(setApiOffset(offset));
      dispatch(setApiPage((offset + limit) / limit));

      dispatch(getObjects({ id: projectId, objectType: selectTab, pagination: preparePagination, filters: apiFiltersText }));

      break;
    }

    case OBJECT_TYPES.MobileApp: {
      dispatch(setMobileAppOffset(offset));
      dispatch(setMobileAppPage((offset + limit) / limit));

      dispatch(getObjects({ id: projectId, objectType: selectTab, pagination: preparePagination, filters: mobileAppFiltersText }));

      break;
    }

    case OBJECT_TYPES.NetworkDevice: {
      dispatch(setNetworkDeviceOffset(offset));
      dispatch(setNetworkDevicePage((offset + limit) / limit));

      dispatch(getObjects({ id: projectId, objectType: selectTab, pagination: preparePagination, filters: networkDeviceFiltersText }));

      break;
    }

    case OBJECT_TYPES.Server: {
      dispatch(setServerOffset(offset));
      dispatch(setServerPage((offset + limit) / limit));

      dispatch(getObjects({ id: projectId, objectType: selectTab, pagination: preparePagination, filters: serverFiltersText }));

      break;
    }

    case OBJECT_TYPES.ARM: {
      dispatch(setArmOffset(offset));
      dispatch(setArmPage((offset + limit) / limit));

      dispatch(getObjects({ id: projectId, objectType: selectTab, pagination: preparePagination, filters: armFiltersText }));

      break;
    }

    case OBJECT_TYPES.WiFi: {
      dispatch(setWifiOffset(offset));
      dispatch(setWifiPage((offset + limit) / limit));

      dispatch(getObjects({ id: projectId, objectType: selectTab, pagination: preparePagination, filters: wifiFiltersText }));

      break;
    }

    case OBJECT_TYPES.SocialEngineering: {
      dispatch(setSocialEngineeringOffset(offset));
      dispatch(setSocialEngineeringPage((offset + limit) / limit));

      dispatch(getObjects({ id: projectId, objectType: selectTab, pagination: preparePagination, filters: socialEngineeringFiltersText }));

      break;
    }

    case OBJECT_TYPES.DesktopApp: {
      dispatch(setDesktopAppOffset(offset));
      dispatch(setDesktopAppPage((offset + limit) / limit));

      dispatch(getObjects({ id: projectId, objectType: selectTab, pagination: preparePagination, filters: desktopAppFiltersText }));

      break;
    }

    case OBJECT_TYPES.SourceCode: {
      dispatch(setSourceCodeOffset(offset));
      dispatch(setSourceCodePage((offset + limit) / limit));

      dispatch(getObjects({ id: projectId, objectType: selectTab, pagination: preparePagination, filters: sourceCodeFiltersText }));

      break;
    }

    case OBJECT_TYPES.External: {
      dispatch(setExternalOffset(offset));
      dispatch(setExternalPage((offset + limit) / limit));

      dispatch(getObjects({ id: projectId, objectType: selectTab, pagination: preparePagination, filters: externalFiltersText }));

      break;
    }

    case OBJECT_TYPES.Internal: {
      dispatch(setInternalOffset(offset));
      dispatch(setInternalPage((offset + limit) / limit));

      dispatch(getObjects({ id: projectId, objectType: selectTab, pagination: preparePagination, filters: internalFiltersText }));

      break;
    }

    case OBJECT_TYPES.Other: {
      dispatch(setOtherOffset(offset));
      dispatch(setOtherPage((offset + limit) / limit));

      dispatch(getObjects({ id: projectId, objectType: selectTab, pagination: preparePagination, filters: otherFiltersText }));

      break;
    }
    }
  };

  const onTabClick = (name: string) => dispatch(setSelectTab(name));

  const onCreateProjectHandler = () => setCreateModal(prevState => !prevState);
  const onExportProjectHandler = () => setExportModal(prevState => !prevState);
  const onChangePentesterHandler = () => setChangePentesterModal(prevState => !prevState);

  const onBackNavigate = () => navigate(`/${ROUTES.PROJECTS}/${projectId}`);

  const objectsTabLinks: ILink[] = [
    {
      name: OBJECTS_TITLES.BASE,
      count: baseCount,
      tabId: OBJECT_TYPES.Base,
    },
    {
      name: OBJECTS_TITLES.WEB_APPS,
      count: webAppCount,
      tabId: OBJECT_TYPES.WebApp,
    },
    {
      name: OBJECTS_TITLES.API,
      count: apiCount,
      tabId: OBJECT_TYPES.API,
    },
    {
      name: OBJECTS_TITLES.MOBILE_APPS,
      count: mobileAppCount,
      tabId: OBJECT_TYPES.MobileApp,
    },
    {
      name: OBJECTS_TITLES.NETWORK_DEVICES,
      count: networkDeviceCount,
      tabId: OBJECT_TYPES.NetworkDevice,
    },
    {
      name: OBJECTS_TITLES.SERVERS,
      count: serverCount,
      tabId: OBJECT_TYPES.Server,
    },
    {
      name: OBJECTS_TITLES.ARM,
      count: armCount,
      tabId: OBJECT_TYPES.ARM,
    },
    {
      name: OBJECTS_TITLES.WIFI,
      count: wifiCount,
      tabId: OBJECT_TYPES.WiFi,
    },
    {
      name: OBJECTS_TITLES.SOCIAL_ENGINEERING,
      count: socialEngineeringCount,
      tabId: OBJECT_TYPES.SocialEngineering,
    },
    {
      name: OBJECTS_TITLES.DESKTOP_APPS,
      count: desktopAppCount,
      tabId: OBJECT_TYPES.DesktopApp,
    },
    {
      name: OBJECTS_TITLES.SOURCE_CODES,
      count: sourceCodeCount,
      tabId: OBJECT_TYPES.SourceCode,
    },
    {
      name: OBJECTS_TITLES.EXTERNALS,
      count: externalCount,
      tabId: OBJECT_TYPES.External,
    },
    {
      name: OBJECTS_TITLES.INTERNALS,
      count: internalCount,
      tabId: OBJECT_TYPES.Internal,
    },
    {
      name: OBJECTS_TITLES.OTHERS,
      count: otherCount,
      tabId: OBJECT_TYPES.Other,
    },
  ];

  return (
    <>
      <Navbar />
      <div className={styles.items}>
        <div className={styles['items-content']}>
          <Filters filters={filterItems} onSearchButtonClick={onSearchButtonClick} />
          <Tabs links={objectsTabLinks} tabActive={selectTab} onClick={onTabClick}/>
          <div className={styles['items-departures']}>
            <Button
              onClick={onBackNavigate}
              buttonText={localization.common.backButtonText}
              typeButtonText={TextVariantEnum.S}
            />
            {(role === 'admin' || hasManagerAccess || hasTeamleadAccess) && (
              <Button
                onClick={onCreateProjectHandler}
                buttonText={localization.object.createButtonText}
                typeButtonText={TextVariantEnum.S}
              />
            )}
            <Button
              onClick={onExportProjectHandler}
              buttonText={localization.common.exportTableButtonText}
              typeButtonText={TextVariantEnum.S}
            />
            {(role === 'admin' || hasTeamleadAccess) && (
              <Button
                onClick={onChangePentesterHandler}
                buttonText={localization.object.appointPentesterButtonText}
                typeButtonText={TextVariantEnum.S}
              />
            )}
          </div>
        </div>
        {isLoading ? <Loader/> : (
          <div className={styles['items-table-wrapper']}>
            <Table
              className={styles['items-table']}
              headCells={headCells}
              objectsBodyRows={bodyRows}
              selectTab={selectTab}
              activeRowIds={activeRowIds}
              setActiveRowIds={setActiveRowIds}
            />
          </div>
        )}
        <Pagination
          count={paginationCount}
          onPageClick={onPageClick}
          startPage={paginationPage}
          startLimit={paginationLimit}
          setStartLimit={setPaginationLimit}
        />
        {(role === 'admin' || hasManagerAccess || hasTeamleadAccess) && (
          <ObjectButtonsModal
            isModalVisible={isCreateModal}
            setModalVisible={setCreateModal}
          />
        )}
        {(role === 'admin' || hasTeamleadAccess) && (
          <ChangePentester
            isModalVisible={isChangePentesterModal}
            setModalVisible={setChangePentesterModal}
            selectTab={selectTab}
            activeRowIds={activeRowIds}
          />
        )}
        <ExportModal
          isModalVisible={isExportModal}
          setModalVisible={setExportModal}
          handlePdfExport={() => exportObjects(ExportTypes.PDF, bodyRows, headCells, selectTab)}
          handleDocxExport={() => exportObjects(ExportTypes.DOCX, bodyRows, headCells, selectTab)}
          handleExcelExport={() => exportObjects(ExportTypes.EXCEL, bodyRows, headCells, selectTab)}
        />
        {(status !== 200 && status !== 202 && status !== 203 && status !== 205) && (
          <Notification status={status} error={error} title={notificationTitle} />
        )}
      </div>
    </>
  );
};

export default ObjectsPage;
