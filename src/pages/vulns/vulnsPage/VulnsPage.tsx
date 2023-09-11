import {ChangeEvent, FC, useEffect, useState} from 'react';

import {useLocation, useNavigate, useParams} from 'react-router-dom';

import Navbar from '../../../components/navbar/Navbar';
import Table from '../../../components/table/Table';
import Pagination from '../../../components/pagination/Pagination';
import Button from '../../../components/button/Button';
import {TextVariantEnum} from '../../../components/text/TextTypes';
import {useAppDispatch} from '../../../hooks/useAppDispatch';
import {useAppSelector} from '../../../hooks/useAppSelector';
import Loader from '../../../components/loader/Loader';
import Tabs from '../../../components/tabs/Tabs';
import {ILink} from '../../../components/tabs/TabsTypes';
import Filters from '../../../components/filters/Filters';
import {selectVulns} from '../../../store/vulns/vulnsSelectors';
import {getVulns} from '../../../store/vulns/vulnsAsync';
import {negativeConsequencesTypes, prepareVulnType, riskLevelList, vulnHeadCells} from '../../../constants/vulns';
import CreateVuln from '../../../components/modals/vulns/CreateVuln';
import styles from '../../Items.module.scss';
import {IFilter} from '../../../components/filters/FiltersTypes';
import {InputTypeEnum} from '../../../components/input/InputTypes';
import {IVuln} from '../../../store/vulns/vulnsTypes';
import {getProjectById} from '../../../store/projects/projectsAsync';
import {selectProjectById} from '../../../store/projects/projectsSelectors';
import {selectProfileData} from '../../../store/auth/authSelectors';
import ExportModal from '../../../components/modals/general/export/ExportModal';
import {ExportTypes} from '../../../utils/export/ExportTypes';
import Notification from '../../../components/notification/Notification';

import {getObjectById} from '../../../store/objects/objectsAsync';
import {selectWebAppById} from '../../../store/objects/webApps/webAppsSelectors';
import {selectApiById} from '../../../store/objects/api/apiSelectors';
import {selectMobileAppById} from '../../../store/objects/mobileApps/mobileAppsSelectors';
import {selectNetworkDeviceById} from '../../../store/objects/networkDevices/networkDevicesSelectors';
import {selectServerById} from '../../../store/objects/servers/serversSelectors';
import {selectArmById} from '../../../store/objects/arm/armSelectors';
import {selectWifiById} from '../../../store/objects/wifies/wifiesSelectors';
import {selectSocialEngineeringById} from '../../../store/objects/socialEngineering/socialEngineeringSelectors';
import {selectDesktopAppById} from '../../../store/objects/desktopApps/desktopAppsSelectors';
import {selectSourceCodeById} from '../../../store/objects/sourceCodes/sourceCodesSelectors';
import {selectExternalById} from '../../../store/objects/external/externalSelectors';
import {selectInternalById} from '../../../store/objects/internal/internalSelectors';
import {selectOtherById} from '../../../store/objects/other/otherSelectors';
import {IUser} from '../../../store/auth/authTypes';
import {setVulnSelectTab} from '../../../store/vulns/vulnsSlice';
import {OBJECT_TYPES} from '../../../constants/objects';
import {filterDateOrNumber} from '../../../utils/prepare/filterDateOrNumber';
import {ROUTES} from '../../../router/routes';
import {localization} from '../../../localization/localization';

import {exportVulns} from './utils/exportVulns';

let filters = '';
let pagination = '';

/**
 * Component for displaying information on vulns page.
 *
 */
const VulnsPage: FC = () => {
  const dispatch = useAppDispatch();

  const { projectId, objectId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const objectTypePathname = location.pathname.split('/')[4];

  const { customer, teamlead } = useAppSelector(selectProjectById);
  const { role, id } = useAppSelector(selectProfileData);

  const { pentesters: webAppPentesters } = useAppSelector(selectWebAppById);
  const { pentesters: apiPentesters } = useAppSelector(selectApiById);
  const { pentesters: mobileAppPentesters } = useAppSelector(selectMobileAppById);
  const { pentesters: networkDevicePentesters } = useAppSelector(selectNetworkDeviceById);
  const { pentesters: serverPentesters } = useAppSelector(selectServerById);

  const { pentesters: armPentesters } = useAppSelector(selectArmById);
  const { pentesters: wifiPentesters } = useAppSelector(selectWifiById);
  const { pentesters: socialEngineeringPentesters } = useAppSelector(selectSocialEngineeringById);
  const { pentesters: desktopAppPentesters } = useAppSelector(selectDesktopAppById);
  const { pentesters: sourceCodePentesters } = useAppSelector(selectSourceCodeById);

  const { pentesters: externalPentesters } = useAppSelector(selectExternalById);
  const { pentesters: internalPentesters } = useAppSelector(selectInternalById);
  const { pentesters: otherPentesters } = useAppSelector(selectOtherById);

  const {
    error,
    vulns,
    count,
    status,
    isLoading,
    selectTab: selectObjectTab,
  } = useAppSelector(selectVulns);

  const [vulnFilters, setVulnFilters] = useState<IVuln>({
    cvss_score: null,
    cvss_vector: '',
    description: '',
    location: '',
    name: '',
    negative_consequences: [],
    procedure_exploiting: '',
    recommendations: '',
    risk_level: '',
    is_delete: false,
  });

  const [isCreateModal, setCreateModal] = useState<boolean>(false);
  const [isExportModal, setExportModal] = useState<boolean>(false);
  const [selectTab, setSelectTab] = useState<string>('all');

  const [negativeConsequences, setNegativeConsequences] = useState<any>(null);
  const [riskLevel, setRiskLevel] = useState<any>(null);
  const [secondarySvssScore, setSecondarySvssScore] = useState<any>(null);

  const [pentesters, setPentesters] = useState<IUser[]>([]);
  const [hasTeamleadAccess, setTeamleadAccess] = useState<boolean>(false);
  const [hasPentesterAccess, setPentesterAccess] = useState<boolean>(false);

  useEffect(() => {
    if (projectId && !customer) {
      dispatch(getProjectById(projectId));
    }

    const selectObjectType = prepareVulnType[objectTypePathname];
    dispatch(setVulnSelectTab(selectObjectType));

    if (projectId && objectId && customer) {
      dispatch(getVulns({ projectId, objectId, objectType: selectObjectType }));
      dispatch(getObjectById({ projectId, objectId, objectType: selectObjectType }));
    }
  }, [dispatch, objectId, projectId, objectTypePathname, customer]);

  useEffect(() => {
    switch (selectObjectTab) {
    case OBJECT_TYPES.WebApp: {
      setPentesters(webAppPentesters || []);

      break;
    }

    case OBJECT_TYPES.API: {
      setPentesters(apiPentesters || []);

      break;
    }

    case OBJECT_TYPES.MobileApp: {
      setPentesters(mobileAppPentesters || []);

      break;
    }

    case OBJECT_TYPES.NetworkDevice: {
      setPentesters(networkDevicePentesters || []);

      break;
    }

    case OBJECT_TYPES.Server: {
      setPentesters(serverPentesters || []);

      break;
    }

    case OBJECT_TYPES.ARM: {
      setPentesters(armPentesters || []);

      break;
    }

    case OBJECT_TYPES.WiFi: {
      setPentesters(wifiPentesters || []);

      break;
    }

    case OBJECT_TYPES.SocialEngineering: {
      setPentesters(socialEngineeringPentesters || []);

      break;
    }

    case OBJECT_TYPES.DesktopApp: {
      setPentesters(desktopAppPentesters || []);

      break;
    }

    case OBJECT_TYPES.SourceCode: {
      setPentesters(sourceCodePentesters || []);

      break;
    }

    case OBJECT_TYPES.External: {
      setPentesters(externalPentesters || []);

      break;
    }

    case OBJECT_TYPES.Internal: {
      setPentesters(internalPentesters || []);

      break;
    }

    case OBJECT_TYPES.Other: {
      setPentesters(otherPentesters || []);

      break;
    }
    }
  }, [selectObjectTab, webAppPentesters, apiPentesters, mobileAppPentesters, networkDevicePentesters,
    serverPentesters, armPentesters, wifiPentesters, socialEngineeringPentesters, desktopAppPentesters,
    sourceCodePentesters, externalPentesters, internalPentesters, otherPentesters]);

  useEffect(() => {
    const pentester = pentesters.find(pentester => pentester.id === id);

    setPentesterAccess(!!pentester);
    setTeamleadAccess(teamlead?.id === id);
  }, [pentesters, teamlead, id]);

  const onNegativeConsequencesChange = (data: any) => {
    const prepareNegativeConsequences = data.map(({ value }: any) => value);

    setNegativeConsequences(data);
    setVulnFilters({...vulnFilters, negative_consequences: prepareNegativeConsequences });
  };

  const onRiskLevelChange = (data: any) => {
    const prepareRiskLevel = data.map(({ value }: any) => value);

    setRiskLevel(data);
    setVulnFilters({ ...vulnFilters, risk_level: prepareRiskLevel });
  };

  const onTabClick = (name: string) => setSelectTab(name);
  const onBackNavigate = () => {
    navigate(`/${ROUTES.PROJECTS}/${projectId}/${ROUTES.OBJECTS}${objectTypePathname}/${objectId}`);
  };

  const onCreateProjectHandler = () => setCreateModal(prevState => !prevState);
  const onExportProjectHandler = () => setExportModal(prevState => !prevState);

  const onSearchButtonClick = (reset: boolean) => {
    filters = '';

    Object.entries(vulnFilters).forEach((vulnValue: any) => {
      const isFilterItemArray = Array.isArray(vulnValue[1]);
      const isFilterArrayEmpty = isFilterItemArray && vulnValue[1].length > 0;

      if ((vulnValue[1] && !isFilterItemArray) || (vulnValue[1] === 0)) {
        filters += `${filters ? '&' : ''}${vulnValue[0]}=${vulnValue[1]}`;
      } else if (isFilterArrayEmpty) {
        vulnValue[1].forEach((filter: string) => {
          filters += `${filters ? '&' : ''}${vulnValue[0]}=${filter}`;
        });
      }
    });

    filters = filterDateOrNumber(filters, vulnFilters, secondarySvssScore, 'cvss_score');

    if (reset) {
      setVulnFilters({
        cvss_score: NaN,
        cvss_vector: '',
        description: '',
        location: '',
        name: '',
        negative_consequences: [],
        procedure_exploiting: '',
        recommendations: '',
        risk_level: '',
        my_scope: false,
        is_delete: false,
      });

      setRiskLevel(null);
      setSecondarySvssScore(NaN);
      setNegativeConsequences(null);

      if (objectId && projectId) {
        dispatch(getVulns({ projectId, objectId, objectType: selectObjectTab, filters: '', pagination }));
      }
    }

    if (objectId && projectId && filters && !reset) {
      dispatch(getVulns({ projectId, objectId, objectType: selectObjectTab, filters, pagination }));
    }
  };

  const onPageClick = (offset: number, limit: number) => {
    pagination = `offset=${offset}&limit=${limit}`;

    if (projectId && objectId) {
      dispatch(getVulns({ projectId, objectId, objectType: selectObjectTab, filters, pagination }));
    }
  };

  const vulnsTabLinks: ILink[] = [
    {
      name: localization.vuln.tabs.allTitle,
      count: count,
      tabId: 'all',
    },
  ];

  const filterItems: IFilter[] = [
    {
      id: 1,
      text: localization.vuln.filters.nameText,
      placeholder: localization.vuln.filters.namePlaceholder,
      type: InputTypeEnum.Text,
      value: vulnFilters.name,
      onChange: (event: ChangeEvent<HTMLInputElement>) => setVulnFilters({
        ...vulnFilters,
        name: event.target.value,
      }),
    },
    {
      id: 2,
      text: localization.vuln.filters.locationText,
      placeholder: localization.vuln.filters.locationPlaceholder,
      type: InputTypeEnum.Text,
      value: vulnFilters.location,
      onChange: (event: ChangeEvent<HTMLInputElement>) => setVulnFilters({
        ...vulnFilters,
        location: event.target.value,
      }),
    },
    {
      id: 3,
      text: localization.vuln.filters.negativeConsequencesText,
      placeholder: localization.vuln.filters.negativeConsequencesPlaceholder,
      value: negativeConsequences,
      onSelectChange: onNegativeConsequencesChange,
      options: negativeConsequencesTypes,
      isMulti: true,
    },
    {
      id: 4,
      text: localization.vuln.filters.cvssScoreText,
      placeholder: localization.vuln.filters.cvssScorePlaceholder,
      type: InputTypeEnum.Number,
      value: vulnFilters.cvss_score,
      onChange: (event: ChangeEvent<HTMLInputElement>) => setVulnFilters({
        ...vulnFilters,
        cvss_score: parseInt(event.target.value),
      }),
      secondaryValue: secondarySvssScore,
      onSecondaryChange: (event: ChangeEvent<HTMLInputElement>) => {
        setSecondarySvssScore(parseInt(event.target.value));
      },
      primaryText: localization.common.primaryNumberTextHelper,
      secondaryText: localization.common.secondaryNumberTextHelper,
    },
    {
      id: 5,
      text: localization.vuln.filters.vectorText,
      placeholder: localization.vuln.filters.vectorPlaceholder,
      type: InputTypeEnum.Text,
      value: vulnFilters.cvss_vector,
      onChange: (event: ChangeEvent<HTMLInputElement>) => setVulnFilters({
        ...vulnFilters,
        cvss_vector: event.target.value,
      }),
    },
    {
      id: 6,
      text: localization.vuln.filters.riskLevelText,
      placeholder: localization.vuln.filters.riskLevelPlaceholder,
      value: riskLevel,
      onSelectChange: onRiskLevelChange,
      options: riskLevelList,
      isMulti: true,
    },
    {
      id: 7,
      text: localization.vuln.filters.procedureExploitingText,
      placeholder: localization.vuln.filters.procedureExploitingPlaceholder,
      type: InputTypeEnum.Text,
      value: vulnFilters.procedure_exploiting,
      onChange: (event: ChangeEvent<HTMLInputElement>) => setVulnFilters({
        ...vulnFilters,
        procedure_exploiting: event.target.value,
      }),
    },
    {
      id: 8,
      text: localization.common.deleteFilterText,
      type: InputTypeEnum.Checkbox,
      value: vulnFilters.is_delete,
      onChange: (event: ChangeEvent<HTMLInputElement>) => setVulnFilters({
        ...vulnFilters,
        is_delete: event.target.checked,
      }),
    },
    {
      id: 9,
      text: localization.common.myScopeFilterText,
      type: InputTypeEnum.Checkbox,
      value: vulnFilters.my_scope,
      onChange: (event: ChangeEvent<HTMLInputElement>) => setVulnFilters({
        ...vulnFilters,
        my_scope: event.target.checked,
      }),
    },
  ];

  filterItems.length = (role === 'manager' || role === 'chief') ? filterItems.length - 1 : filterItems.length;

  return (
    <>
      <Navbar/>
      <div className={styles.items}>
        <div className={styles['items-content']}>
          <Filters filters={filterItems} onSearchButtonClick={onSearchButtonClick}/>
          <Tabs links={vulnsTabLinks} tabActive={selectTab} onClick={onTabClick}/>
          <div className={styles['items-departures']}>
            <Button
              onClick={onBackNavigate}
              buttonText={localization.common.backButtonText}
              typeButtonText={TextVariantEnum.S}
            />
            {(role === 'admin' || hasTeamleadAccess || hasPentesterAccess) && (
              <Button
                onClick={onCreateProjectHandler}
                buttonText={localization.vuln.createButtonText}
                typeButtonText={TextVariantEnum.S}
              />
            )}
            <Button
              onClick={onExportProjectHandler}
              buttonText={localization.common.exportTableButtonText}
              typeButtonText={TextVariantEnum.S}
            />
          </div>
        </div>
        {isLoading ? <Loader/> : (
          <div className={styles['items-table-wrapper']}>
            <Table className={styles['items-table']} headCells={vulnHeadCells} vulnBodyRows={vulns} />
          </div>
        )}
        <Pagination count={count} onPageClick={onPageClick}/>
        {(role === 'admin' || hasTeamleadAccess || hasPentesterAccess) && (
          <CreateVuln
            isModalVisible={isCreateModal}
            setModalVisible={setCreateModal}
            objectType={objectTypePathname}
          />
        )}
        <ExportModal
          isModalVisible={isExportModal}
          setModalVisible={setExportModal}
          handlePdfExport={() => exportVulns(ExportTypes.PDF, vulns)}
          handleDocxExport={() => exportVulns(ExportTypes.DOCX, vulns)}
          handleExcelExport={() => exportVulns(ExportTypes.EXCEL, vulns)}
        />
      </div>
      {(status !== 200 && status !== 202 && status !== 203 && status !== 205 && status !== 206 && status !== 207) && (
        <Notification status={status} error={error} title={localization.vuln.notificationTitle} />
      )}
    </>
  );
};

export default VulnsPage;
