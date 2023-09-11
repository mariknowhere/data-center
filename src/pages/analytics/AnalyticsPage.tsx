import {FC, useEffect, useState} from 'react';

import FileSaver from 'file-saver';

import classNames from 'classnames';

import Loader from '../../components/loader/Loader';
import Tabs from '../../components/tabs/Tabs';
import Text from '../../components/text/Text';
import InputForm from '../../components/inputForm/InputForm';
import {InputTypeEnum} from '../../components/input/InputTypes';
import {date, FULL_DATE_TODAY} from '../../constants/date';
import {dateChange} from '../../utils/dateChange';
import {useAppSelector} from '../../hooks/useAppSelector';
import {selectAnalytics, selectAnalyticsErrors} from '../../store/analytics/analyticsSelectors';
import {TextVariantEnum} from '../../components/text/TextTypes';
import {
  IAttackerModel,
  IGetProjectReportRequest,
  IGetVulnsReport,
  IObjectType,
  IRiskLevel,
  ITestMethod,
  IWorkType,
} from '../../store/analytics/analyticsTypes';
import Button from '../../components/button/Button';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {validateAnalyticsVulns} from '../../utils/validate/analytics/validateAnalyticsVulns';
import {analyticTabLinks, analyticLogicTypes} from '../../constants/analytics';
import {getProjectReport, getVulnsReport, uploadExcel} from '../../store/analytics/analyticsAsync';
import {validateAnalyticsProject} from '../../utils/validate/analytics/validateAnalyticsProject';
import {selectProjects} from '../../store/projects/projectsSelectors';
import {getAllProjects} from '../../store/projects/projectsAsync';
import {validateAnalyticsUpload} from '../../utils/validate/analytics/validateAnalyticsUpload';
import Notification from '../../components/notification/Notification';


import Navbar from '../../components/navbar/Navbar';
import {selectProfileData} from '../../store/auth/authSelectors';
import {PROJECT_REPORT_URL, VULNS_REPORT_URL} from '../../constants/other';
import {localization} from '../../localization/localization';
import {ANALYTICS_ERROR_MESSAGES} from '../../constants/errors';

import styles from './AnalyticsPage.module.scss';

let prepareProjects: any[] = [];

/**
 * Component for displaying information on analytics page.
 *
 */
const AnalyticsPage: FC = () => {
  const dispatch = useAppDispatch();

  const { allProjects } = useAppSelector(selectProjects);
  const { isLoading, error, status } = useAppSelector(selectAnalytics);
  const { role } = useAppSelector(selectProfileData);

  const {
    object_types_error,
    start_date_error,
    end_date_error,
    num_employees_error,
    project_name_error,
    excel_file_error,
  } = useAppSelector(selectAnalyticsErrors);

  const [projectReportUrl, setProjectReportUrl] = useState<string | null>(localStorage.getItem(PROJECT_REPORT_URL));
  const [vulnsReportUrl, setVulnsReportUrl] = useState<string | null>(localStorage.getItem(VULNS_REPORT_URL));

  const [selectTab, setSelectTab] = useState<string>('export-vulns');
  const [selectLogicType, setSelectLogicType] = useState<string>('or');
  const [notificationTitle, setNotificationTitle] = useState<string>('');

  const [isTestMethodVisible, setTestMethodVisible] = useState<boolean>(true);
  const [isModelAttackerVisible, setModelAttackerVisible] = useState<boolean>(true);
  const [isWorkTypeVisible, setWorkTypeVisible] = useState<boolean>(true);

  const [nameProject, setNameProject] = useState<string>('');
  const [selectedNameProject, setSelectedNameProject] = useState<any>(null);
  const [screenshots, setScreenshots] = useState<FileList | any[]>();
  const [excel, setExcel] = useState<FileList | any[]>();

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [prepareStartDate, setPrepareStartDate] = useState<string>('');
  const [prepareEndDate, setPrepareEndDate] = useState<string>('');
  const [employees, setEmployees] = useState<number | undefined | null>();

  const [objectTypes, setObjectTypes] = useState<IObjectType>({
    web_app: false,
    api: false,
    mobile_app: false,
    network_device: false,
    server: false,
    arm: false,
    wifi: false,
    social_engineering: false,
    desktop_app: false,
    source_code: false,
    internal_ip: false,
    external_ip: false,
    other: false,
  });

  const [riskLevel, setRiskLevel] = useState<IRiskLevel>({
    critical: false,
    high: false,
    low: false,
    medium: false,
    info: false,
  });

  const [testMethod, setTestMethod] = useState<ITestMethod>({
    blackbox: false,
    greybox: false,
  });

  const [attackerModel, setAttackerModel] = useState<IAttackerModel>({
    external: false,
    internal: false,
  });

  const [workTypes, setWorkTypes] = useState<IWorkType>({
    security_analysis: false,
    pentest: false,
    instrument_scan: false,
  });

  useEffect(() => {
    if (projectReportUrl) {
      FileSaver.saveAs(
        `/docx_reports/project_reports/${projectReportUrl}`,
        `${localization.analytics.exportProject.filename} (${FULL_DATE_TODAY}).docx`,
      );

      setProjectReportUrl(null);

      localStorage.removeItem(PROJECT_REPORT_URL);
    }

    if (vulnsReportUrl) {
      FileSaver.saveAs(
        `/docx_reports/vulnerabilities_reports/${vulnsReportUrl}`,
        `${localization.analytics.exportVulns.filename} (${FULL_DATE_TODAY}).docx`,
      );

      setVulnsReportUrl(null);

      localStorage.removeItem(VULNS_REPORT_URL);
    }
  }, [projectReportUrl, vulnsReportUrl]);

  useEffect(() => {
    if (role && role !== 'client') {
      dispatch(getAllProjects({}));
    }
  }, [dispatch, role]);

  useEffect(() => {
    prepareProjects = allProjects.map(({ name }) => {
      return {
        value: name,
        label: name,
      };
    });
  }, [allProjects]);

  useEffect(() => {
    const activeObjects: string[] = [];
    Object.entries(objectTypes).forEach((objectTypeValue: any) => {
      if (objectTypeValue[1]) {
        activeObjects.push(objectTypeValue[0]);
      }
    });

    const isAnyPanelsVisible =
      activeObjects.find(object => object === 'web_app' || object === 'arm' || object === 'server' || object === 'network_device' || object === 'api');

    if (activeObjects.length === 0 || isAnyPanelsVisible) {
      setTestMethodVisible(true);
      setModelAttackerVisible(true);
      setWorkTypeVisible(true);
    } else if (!isAnyPanelsVisible) {
      setTestMethodVisible(false);
      setModelAttackerVisible(false);
      setWorkTypeVisible(false);

      activeObjects.forEach((object) => {
        switch (object) {
        case 'mobile_app': {
          setTestMethodVisible(true);

          break;
        }

        case 'wifi': {
          setTestMethodVisible(true);
          setModelAttackerVisible(true);

          break;
        }

        case 'desktop_app': {
          setTestMethodVisible(true);

          break;
        }
        }
      });
    }
  }, [objectTypes]);

  const onUploadExcelHandler = () => {
    const filesFormData = new FormData();

    const files = {
      screenshots,
      excel_file: excel,
    };

    const isValidate = validateAnalyticsUpload(files, dispatch);

    if (excel && isValidate) {
      if (screenshots) {
        Array.from(screenshots).forEach((screenshot) => {
          filesFormData.append('screenshots', screenshot, screenshot.name);
        });
      }

      Array.from(excel).forEach((item) => {
        filesFormData.append('excel_file', item, item.name);
      });

      dispatch(uploadExcel(filesFormData));
      setNotificationTitle(localization.analytics.import.filename);
    }
  };

  const onExportProjectReport = () => {
    const vulnsProject: IGetProjectReportRequest = {
      name: nameProject,
    };

    const isValidate = validateAnalyticsProject(vulnsProject, dispatch, allProjects);

    if (isValidate) {
      setNameProject('');

      dispatch(getProjectReport(vulnsProject));
      setNotificationTitle(localization.analytics.exportProject.filename);
    }
  };

  const onExportVulnsReport = () => {
    let prepareVulnsReport = '';

    let prepareObjectTypes = '';
    let prepareRiskLevel = '';
    let prepareTestMethod = '';
    let prepareAttackerModel = '';
    let prepareWorkTypes = '';
    const prepareLogicType = `&logic_type=${selectLogicType}`;

    Object.entries(objectTypes).forEach((objectTypeValue: any) => {
      if (objectTypeValue[1]) {
        prepareObjectTypes += `&object_types=${objectTypeValue[0]}`;
      }
    });

    Object.entries(riskLevel).forEach((riskLevelValue: any) => {
      if (riskLevelValue[1]) {
        prepareRiskLevel += `&risk_level=${riskLevelValue[0]}`;
      }
    });

    Object.entries(testMethod).forEach((testMethodValue: any) => {
      if (testMethodValue[1]) {
        prepareTestMethod += `&test_method=${testMethodValue[0]}`;
      }
    });

    Object.entries(workTypes).forEach((workTypeValue: any) => {
      if (workTypeValue[1]) {
        prepareWorkTypes += `&work_type=${workTypeValue[0]}`;
      }
    });

    Object.entries(attackerModel).forEach((attackerModelValue: any) => {
      if (attackerModelValue[1]) {
        prepareAttackerModel += `&attacker_model=${attackerModelValue[0]}`;
      }
    });

    prepareObjectTypes = prepareObjectTypes.slice(1, prepareObjectTypes.length);

    const vulnsReport: IGetVulnsReport = {
      object_types: prepareObjectTypes,
      start_date: prepareStartDate,
      end_date: prepareEndDate,
      num_employees: employees || null,
      risk_level: prepareRiskLevel,
      work_type: prepareWorkTypes,
      test_method: prepareTestMethod,
      attacker_model: prepareAttackerModel,
      logic_type: prepareLogicType,
    };

    const isValidate = validateAnalyticsVulns(vulnsReport, dispatch);

    if (isValidate) {
      Object.entries(vulnsReport).forEach((vulnsReportValue: any) => {
        if (vulnsReportValue[0] === 'object_types') {
          prepareVulnsReport += prepareObjectTypes;
        } else if (vulnsReportValue[0] === 'risk_level') {
          prepareVulnsReport += prepareRiskLevel;
        } else if (vulnsReportValue[0] === 'test_method') {
          prepareVulnsReport += prepareTestMethod;
        } else if (vulnsReportValue[0] === 'work_type') {
          prepareVulnsReport += prepareWorkTypes;
        } else if (vulnsReportValue[0] === 'attacker_model') {
          prepareVulnsReport += prepareAttackerModel;
        } else if (vulnsReportValue[0] === 'logic_type') {
          prepareVulnsReport += prepareLogicType;
        } else if (vulnsReportValue[1]) {
          prepareVulnsReport += `&${vulnsReportValue[0]}=${vulnsReportValue[1]}`;
        }
      });

      dispatch(getVulnsReport(prepareVulnsReport));

      setStartDate(date);
      setEndDate(date);
      setEmployees(0);
      setSelectLogicType('or');

      setObjectTypes({
        web_app: false,
        api: false,
        mobile_app: false,
        network_device: false,
        server: false,
        arm: false,
        wifi: false,
        social_engineering: false,
        desktop_app: false,
        source_code: false,
        internal_ip: false,
        external_ip: false,
        other: false,
      });

      setRiskLevel({
        critical: false,
        high: false,
        low: false,
        medium: false,
        info: false,
      });
      setTestMethod({
        blackbox: false,
        greybox: false,
      });
      setAttackerModel({
        external: false,
        internal: false,
      });
      setWorkTypes({
        security_analysis: false,
        pentest: false,
        instrument_scan: false,
      });

      setNotificationTitle(localization.analytics.exportVulns.filename);
    }
  };

  const onTabClick = (name: string) => setSelectTab(name);

  const onNameProjectChange = (data: any) => {
    setNameProject(data?.value || '');
    setSelectedNameProject(data);
  };

  const onStartDateChange = (date: any) => dateChange(date, setStartDate, setPrepareStartDate);
  const onEndDateChange = (date: any) => dateChange(date, setEndDate, setPrepareEndDate);

  const handleScreenshotsChange = (event: any) => setScreenshots(event.target.files);
  const handleExcelChange = (event: any) => setExcel(event.target.files);

  const onLogicTypeClick = (type: string) => setSelectLogicType(type);

  return (
    <>
      <Navbar />
      <div className={styles.analytics}>
        {isLoading ? <Loader/> : (
          <>
            <div className={styles['analytics-content']}>
              <Tabs links={analyticTabLinks} tabActive={selectTab} onClick={onTabClick} />
              {selectTab === 'export-vulns' && (
                <div className={styles['analytics-panel']}>
                  <Text className={styles['analytics-panel-title']} variant={TextVariantEnum.L}>
                    {localization.analytics.title}
                  </Text>
                  <div className={styles['analytics-panel-toggle-wrapper']}>
                    {analyticLogicTypes.map(({ text, type, id }) => (
                      <div
                        key={id}
                        className={styles['analytics-panel-toggle-container']}
                        onClick={() => onLogicTypeClick(type)}
                      >
                        <Text className={classNames(
                          styles['analytics-panel-toggle'], {
                            [styles['analytics-panel-toggle_active']]: selectLogicType === type,
                          })}
                        >
                          {text}
                        </Text>
                      </div>
                    ))}
                  </div>
                  <div className={styles['analytics-panel-item']}>
                    <Text className={styles['analytics-panel-topic']} variant={TextVariantEnum.S}>
                      {localization.analytics.exportVulns.periodTitle}
                    </Text>
                    <div className={styles['analytics-panel-inputs']}>
                      <InputForm
                        text={localization.analytics.exportVulns.startDateText}
                        errorMessage={start_date_error}
                        type={InputTypeEnum.Date}
                        date={startDate}
                        onDateChange={onStartDateChange}
                        required
                      />
                      <InputForm
                        text={localization.analytics.exportVulns.endDateText}
                        errorMessage={end_date_error}
                        type={InputTypeEnum.Date}
                        date={endDate}
                        onDateChange={onEndDateChange}
                        required
                      />
                    </div>
                  </div>
                  <div className={styles['analytics-panel-item']}>
                    <Text className={styles['analytics-panel-topic']} variant={TextVariantEnum.S}>
                      {localization.analytics.exportVulns.companyTitle}
                    </Text>
                    <div className={styles['analytics-panel-inputs']}>
                      <InputForm
                        text={localization.analytics.exportVulns.employeesText}
                        placeholder={localization.analytics.exportVulns.employeesPlaceholder}
                        errorMessage={num_employees_error}
                        type={InputTypeEnum.Number}
                        value={employees}
                        onChange={(event) => setEmployees(parseInt(event.target.value))}
                      />
                    </div>
                  </div>
                  <div className={styles['analytics-panel-item']}>
                    <Text className={styles['analytics-panel-topic']} variant={TextVariantEnum.S}>
                      {localization.analytics.exportVulns.assets}
                    </Text>
                    <Text className={styles['analytics-panel-topic']} variant={TextVariantEnum.S}>
                      {localization.analytics.exportVulns.objectTypeTitle}
                    </Text>
                    <div className={styles['analytics-panel-inputs_secondary']}>
                      <InputForm
                        text={localization.analytics.exportVulns.webAppText}
                        type={InputTypeEnum.Checkbox}
                        value={objectTypes.web_app}
                        classNameWrapper={styles['analytics-panel-checkbox']}
                        onChange={(event) => {
                          setObjectTypes({...objectTypes, web_app: event.target.checked});
                        }}
                      />
                      <InputForm
                        text={localization.analytics.exportVulns.apiText}
                        type={InputTypeEnum.Checkbox}
                        value={objectTypes.api}
                        classNameWrapper={styles['analytics-panel-checkbox']}
                        onChange={(event) => {
                          setObjectTypes({...objectTypes, api: event.target.checked});
                        }}
                      />
                      <InputForm
                        text={localization.analytics.exportVulns.mobileAppText}
                        type={InputTypeEnum.Checkbox}
                        value={objectTypes.mobile_app}
                        classNameWrapper={styles['analytics-panel-checkbox']}
                        onChange={(event) => {
                          setObjectTypes({...objectTypes, mobile_app: event.target.checked});
                        }}
                      />
                      <InputForm
                        text={localization.analytics.exportVulns.networkDeviceText}
                        type={InputTypeEnum.Checkbox}
                        value={objectTypes.network_device}
                        classNameWrapper={styles['analytics-panel-checkbox']}
                        onChange={(event) => {
                          setObjectTypes({...objectTypes, network_device: event.target.checked});
                        }}
                      />
                      <InputForm
                        text={localization.analytics.exportVulns.serverText}
                        type={InputTypeEnum.Checkbox}
                        value={objectTypes.server}
                        classNameWrapper={styles['analytics-panel-checkbox']}
                        onChange={(event) => {
                          setObjectTypes({...objectTypes, server: event.target.checked});
                        }}
                      />
                      <InputForm
                        text={localization.analytics.exportVulns.armText}
                        type={InputTypeEnum.Checkbox}
                        value={objectTypes.arm}
                        classNameWrapper={styles['analytics-panel-checkbox']}
                        onChange={(event) => {
                          setObjectTypes({...objectTypes, arm: event.target.checked});
                        }}
                      />
                      <InputForm
                        text={localization.analytics.exportVulns.wifiText}
                        type={InputTypeEnum.Checkbox}
                        value={objectTypes.wifi}
                        classNameWrapper={styles['analytics-panel-checkbox']}
                        onChange={(event) => {
                          setObjectTypes({...objectTypes, wifi: event.target.checked});
                        }}
                      />
                      <InputForm
                        text={localization.analytics.exportVulns.socialEngineeringText}
                        type={InputTypeEnum.Checkbox}
                        value={objectTypes.social_engineering}
                        classNameWrapper={styles['analytics-panel-checkbox']}
                        onChange={(event) => {
                          setObjectTypes({...objectTypes, social_engineering: event.target.checked});
                        }}
                      />
                      <InputForm
                        text={localization.analytics.exportVulns.desktopAppText}
                        type={InputTypeEnum.Checkbox}
                        value={objectTypes.desktop_app}
                        classNameWrapper={styles['analytics-panel-checkbox']}
                        onChange={(event) => {
                          setObjectTypes({...objectTypes, desktop_app: event.target.checked});
                        }}
                      />
                      <InputForm
                        text={localization.analytics.exportVulns.sourceCodeText}
                        type={InputTypeEnum.Checkbox}
                        value={objectTypes.source_code}
                        classNameWrapper={styles['analytics-panel-checkbox']}
                        onChange={(event) => {
                          setObjectTypes({...objectTypes, source_code: event.target.checked});
                        }}
                      />
                      <InputForm
                        text={localization.analytics.exportVulns.externalText}
                        type={InputTypeEnum.Checkbox}
                        value={objectTypes.external_ip}
                        classNameWrapper={styles['analytics-panel-checkbox']}
                        onChange={(event) => {
                          setObjectTypes({...objectTypes, external_ip: event.target.checked});
                        }}
                      />
                      <InputForm
                        text={localization.analytics.exportVulns.internalText}
                        type={InputTypeEnum.Checkbox}
                        value={objectTypes.internal_ip}
                        classNameWrapper={styles['analytics-panel-checkbox']}
                        onChange={(event) => {
                          setObjectTypes({...objectTypes, internal_ip: event.target.checked});
                        }}
                      />
                      <InputForm
                        text={localization.analytics.exportVulns.otherText}
                        type={InputTypeEnum.Checkbox}
                        value={objectTypes.other}
                        classNameWrapper={styles['analytics-panel-checkbox']}
                        onChange={(event) => {
                          setObjectTypes({...objectTypes, other: event.target.checked});
                        }}
                      />
                    </div>
                    {object_types_error && (
                      <Text variant={TextVariantEnum.S} className={styles['analytics-panel-text']}>
                        {ANALYTICS_ERROR_MESSAGES.OBJECT_TYPE_EMPTY}
                      </Text>
                    )}
                    <Text className={styles['analytics-panel-topic']} variant={TextVariantEnum.S}>
                      {localization.analytics.exportVulns.vulnTypeTitle}
                    </Text>
                    <div className={styles['analytics-panel-inputs_secondary']}>
                      <InputForm
                        text={localization.analytics.exportVulns.criticalVulnType}
                        type={InputTypeEnum.Checkbox}
                        value={riskLevel.critical}
                        classNameWrapper={styles['analytics-panel-checkbox']}
                        onChange={(event) => {
                          setRiskLevel({...riskLevel, critical: event.target.checked});
                        }}
                      />
                      <InputForm
                        text={localization.analytics.exportVulns.highVulnType}
                        type={InputTypeEnum.Checkbox}
                        value={riskLevel.high}
                        classNameWrapper={styles['analytics-panel-checkbox']}
                        onChange={(event) => {
                          setRiskLevel({...riskLevel, high: event.target.checked});
                        }}
                      />
                      <InputForm
                        text={localization.analytics.exportVulns.mediumVulnType}
                        type={InputTypeEnum.Checkbox}
                        value={riskLevel.medium}
                        classNameWrapper={styles['analytics-panel-checkbox']}
                        onChange={(event) => {
                          setRiskLevel({...riskLevel, medium: event.target.checked});
                        }}
                      />
                      <InputForm
                        text={localization.analytics.exportVulns.lowVulnType}
                        type={InputTypeEnum.Checkbox}
                        value={riskLevel.low}
                        classNameWrapper={styles['analytics-panel-checkbox']}
                        onChange={(event) => {
                          setRiskLevel({...riskLevel, low: event.target.checked});
                        }}
                      />
                      <InputForm
                        text={localization.analytics.exportVulns.infoVulnType}
                        type={InputTypeEnum.Checkbox}
                        value={riskLevel.info}
                        classNameWrapper={styles['analytics-panel-checkbox']}
                        onChange={(event) => {
                          setRiskLevel({...riskLevel, info: event.target.checked});
                        }}
                      />
                    </div>
                  </div>
                  <div className={styles['analytics-panel-item']}>
                    <Text className={styles['analytics-panel-topic']} variant={TextVariantEnum.S}>
                      {localization.analytics.exportVulns.testConditionsTitle}
                    </Text>
                    <Text
                      className={classNames(
                        styles['analytics-panel-topic'],
                        {[styles['analytics_disabled']] : !isTestMethodVisible},
                      )}
                      variant={TextVariantEnum.S}
                    >
                      {localization.analytics.exportVulns.methodTestTitle}
                    </Text>
                    <div className={styles['analytics-panel-inputs_secondary']}>
                      <InputForm
                        text={localization.analytics.exportVulns.blackboxText}
                        type={InputTypeEnum.Checkbox}
                        value={testMethod.blackbox}
                        classNameWrapper={styles['analytics-panel-checkbox']}
                        classNameText={classNames({[styles['analytics_disabled']] : !isTestMethodVisible})}
                        onChange={(event) => {
                          setTestMethod({...testMethod, blackbox: event.target.checked});
                        }}
                        disabledCheckbox={!isTestMethodVisible}
                      />
                      <InputForm
                        text={localization.analytics.exportVulns.greyboxText}
                        type={InputTypeEnum.Checkbox}
                        value={testMethod.greybox}
                        classNameWrapper={styles['analytics-panel-checkbox']}
                        classNameText={classNames({[styles['analytics_disabled']] : !isTestMethodVisible})}
                        onChange={(event) => {
                          setTestMethod({...testMethod, greybox: event.target.checked});
                        }}
                        disabledCheckbox={!isTestMethodVisible}
                      />
                    </div>
                    <Text
                      className={classNames(
                        styles['analytics-panel-topic'], {[styles['analytics_disabled']] : !isModelAttackerVisible},
                      )}
                      variant={TextVariantEnum.S}
                    >
                      {localization.analytics.exportVulns.modelAttackerTitle}
                    </Text>
                    <div className={styles['analytics-panel-inputs_secondary']}>
                      <InputForm
                        text={localization.analytics.exportVulns.modelExternalText}
                        type={InputTypeEnum.Checkbox}
                        value={attackerModel.external}
                        classNameWrapper={styles['analytics-panel-checkbox']}
                        classNameText={classNames({[styles['analytics_disabled']] : !isModelAttackerVisible})}
                        onChange={(event) => {
                          setAttackerModel({...attackerModel, external: event.target.checked});
                        }}
                        disabledCheckbox={!isModelAttackerVisible}
                      />
                      <InputForm
                        text={localization.analytics.exportVulns.modelInternalText}
                        type={InputTypeEnum.Checkbox}
                        value={attackerModel.internal}
                        classNameWrapper={styles['analytics-panel-checkbox']}
                        classNameText={classNames({[styles['analytics_disabled']] : !isModelAttackerVisible})}
                        onChange={(event) => {
                          setAttackerModel({...attackerModel, internal: event.target.checked});
                        }}
                        disabledCheckbox={!isModelAttackerVisible}
                      />
                    </div>
                    <Text
                      className={classNames(
                        styles['analytics-panel-topic'], {[styles['analytics_disabled']] : !isWorkTypeVisible})}
                      variant={TextVariantEnum.S}
                    >
                      {localization.analytics.exportVulns.workTypeTitle}
                    </Text>
                    <div className={styles['analytics-panel-inputs_secondary']}>
                      <InputForm
                        text={localization.analytics.exportVulns.instrumentScanText}
                        type={InputTypeEnum.Checkbox}
                        value={workTypes.instrument_scan}
                        classNameWrapper={styles['analytics-panel-checkbox']}
                        classNameText={classNames({[styles['analytics_disabled']] : !isWorkTypeVisible})}
                        onChange={(event) => {
                          setWorkTypes({...workTypes, instrument_scan: event.target.checked});
                        }}
                        disabledCheckbox={!isWorkTypeVisible}
                      />
                      <InputForm
                        text={localization.analytics.exportVulns.securityAnalysisText}
                        type={InputTypeEnum.Checkbox}
                        value={workTypes.security_analysis}
                        classNameWrapper={styles['analytics-panel-checkbox']}
                        classNameText={classNames({[styles['analytics_disabled']] : !isWorkTypeVisible})}
                        onChange={(event) => {
                          setWorkTypes({...workTypes, security_analysis: event.target.checked});
                        }}
                        disabledCheckbox={!isWorkTypeVisible}
                      />
                      <InputForm
                        text={localization.analytics.exportVulns.pentestText}
                        type={InputTypeEnum.Checkbox}
                        value={workTypes.pentest}
                        classNameWrapper={styles['analytics-panel-checkbox']}
                        classNameText={classNames({[styles['analytics_disabled']] : !isWorkTypeVisible})}
                        onChange={(event) => {
                          setWorkTypes({...workTypes, pentest: event.target.checked});
                        }}
                        disabledCheckbox={!isWorkTypeVisible}
                      />
                    </div>
                  </div>
                  <Button
                    onClick={onExportVulnsReport}
                    className={styles['analytics-panel-button']}
                    buttonText={localization.analytics.sendButtonText}
                  />
                </div>
              )}
              {selectTab === 'export-project' && (
                <div className={styles['analytics-panel']}>
                  <Text className={styles['analytics-panel-title']} variant={TextVariantEnum.L}>
                    {localization.analytics.title}
                  </Text>
                  <div className={styles['analytics-panel-item']}>
                    <Text className={styles['analytics-panel-topic']} variant={TextVariantEnum.S}>
                      {localization.analytics.exportProject.title}
                    </Text>
                    <div className={styles['analytics-panel-inputs']}>
                      {role && role === 'client' ? (
                        <InputForm
                          text={localization.analytics.exportProject.nameProjectText}
                          placeholder={localization.analytics.exportProject.nameProjectPlaceholder}
                          errorMessage={project_name_error}
                          value={nameProject}
                          onChange={(event) => setNameProject(event.target.value)}
                          required
                        />
                      ) : (
                        <InputForm
                          text={localization.analytics.exportProject.nameProjectText}
                          placeholder={localization.analytics.exportProject.nameProjectPlaceholder}
                          errorMessage={project_name_error}
                          value={selectedNameProject}
                          onSelectChange={onNameProjectChange}
                          options={prepareProjects}
                          isClearable
                          isSearchable
                          required
                        />
                      )}
                    </div>
                  </div>
                  <Button
                    onClick={onExportProjectReport}
                    className={styles['analytics-panel-button']}
                    buttonText={localization.analytics.sendButtonText}
                  />
                </div>
              )}
              {selectTab === 'import' && (
                <div className={styles['analytics-panel']}>
                  <Text className={styles['analytics-panel-title']} variant={TextVariantEnum.L}>
                    {localization.analytics.import.title}
                  </Text>
                  <div className={styles['analytics-panel-item']}>
                    <div className={styles['analytics-panel-inputs']}>
                      <InputForm
                        text={localization.analytics.import.excelText}
                        type={InputTypeEnum.File}
                        errorMessage={excel_file_error}
                        onChange={handleExcelChange}
                        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                        multiple={false}
                        required
                      />
                      <InputForm
                        text={localization.analytics.import.snapshotsText}
                        type={InputTypeEnum.File}
                        onChange={handleScreenshotsChange}
                      />
                    </div>
                  </div>
                  <Button
                    onClick={onUploadExcelHandler}
                    className={styles['analytics-panel-button']}
                    buttonText={localization.analytics.sendButtonText}
                  />
                </div>
              )}
            </div>
          </>
        )}
      </div>
      {(status !== 200 && status !== 203 && status !== 204 && status !== 205) && (
        <Notification status={status} error={error} title={notificationTitle} />
      )}
    </>
  );
};

export default AnalyticsPage;
