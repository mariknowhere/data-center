import {FC, useEffect, useState} from 'react';

import {useLocation, useNavigate, useParams} from 'react-router-dom';

import classNames from 'classnames';

import Navbar from '../../../components/navbar/Navbar';
import Button from '../../../components/button/Button';
import {ButtonTypeEnum} from '../../../components/button/ButtonTypes';
import {useAppSelector} from '../../../hooks/useAppSelector';
import {useAppDispatch} from '../../../hooks/useAppDispatch';
import Title from '../../../components/title/Title';
import {TitleVariantEnum} from '../../../components/title/TitleTypes';
import Text from '../../../components/text/Text';
import {TextVariantEnum} from '../../../components/text/TextTypes';
import {selectVulnById, selectVulns} from '../../../store/vulns/vulnsSelectors';
import {IVuln} from '../../../store/vulns/vulnsTypes';
import {
  deleteVuln,
  deleteVulnScreenshot,
  deleteVulnScreenshots,
  getVulnById,
  getVulnScreenshots,
} from '../../../store/vulns/vulnsAsync';
import PageItem from '../../../components/pageItem/PageItem';
import {IItemProps} from '../../../components/pageItem/PageItemTypes';
import ChangeVuln from '../../../components/modals/vulns/ChangeVuln';
import ConfirmModal from '../../../components/modals/general/confirm/ConfirmModal';
import Loader from '../../../components/loader/Loader';
import {selectProfileData} from '../../../store/auth/authSelectors';
import Notification from '../../../components/notification/Notification';
import {OBJECT_TYPES} from '../../../constants/objects';
import {prepareNegativeConsequencesToRu, prepareRiskLevelToRu} from '../../../constants/vulns';
import {IPopupItem} from '../../../components/popup/PopupTypes';
import {preparedVulnCvssItems} from '../../../utils/prepare/preparedVulnCvssItems';


import Fancybox from '../../../components/fancybox/Fancybox';
import {getProjectById} from '../../../store/projects/projectsAsync';
import {selectProjectById} from '../../../store/projects/projectsSelectors';
import {preparedMultiSelectData} from '../../../utils/prepare/preparedMultiSelectData';
import Archive from '../../../components/archive/Archive';
import {ROUTES} from '../../../router/routes';
import {localization} from '../../../localization/localization';

import styles from './VulnPage.module.scss';

let prepareObjectType = '';

/**
 * Component for displaying information on vuln page.
 *
 */
const VulnPage: FC = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const { vulnId, projectId, objectId } = useParams();

  const objectTypePathname = location.pathname.split('/')[4];
  const navigate = useNavigate();

  const { role, id } = useAppSelector(selectProfileData);
  const { customer, teamlead } = useAppSelector(selectProjectById);

  const {
    vulnScreenshots: screenshots,
    isLoading,
    error,
    status,
  } = useAppSelector(selectVulns);

  const {
    cvss_score: cvssScore,
    cvss_vector: cvssVector,
    risk_level: riskLevel,
    location: locationName,
    name,
    description,
    procedure_exploiting: procedureExploiting,
    recommendations,
    negative_consequences: negativeConsequences,
    owner,
    cve_id,
    cwe_id,
    is_delete: isDelete,
  }: IVuln = useAppSelector(selectVulnById);

  const [cvssAV, setCvssAV] = useState<IPopupItem>({
    text: '',
    value: '',
  });
  const [cvssAC, setCvssAC] = useState<IPopupItem>({
    text: '',
    value: '',
  });
  const [cvssPR, setCvssPR] = useState<IPopupItem>({
    text: '',
    value: '',
  });
  const [cvssUI, setCvssUI] = useState<IPopupItem>({
    text: '',
    value: '',
  });
  const [cvssS, setCvssS] = useState<IPopupItem>({
    text: '',
    value: '',
  });
  const [cvssC, setCvssC] = useState<IPopupItem>({
    text: '',
    value: '',
  });
  const [cvssI, setCvssI] = useState<IPopupItem>({
    text: '',
    value: '',
  });
  const [cvssA, setCvssA] = useState<IPopupItem>({
    text: '',
    value: '',
  });

  const [screenshotList, setScreenshotList] = useState<string[] | undefined>([]);
  const [screenshotId, setScreenshotId] = useState<string>('');
  const [fullScreenshotId, setFullScreenshotId] = useState<string>('');

  const [isChangeVulnModal, setChangeVulnModal] = useState<boolean>(false);
  const [isDeleteVulnModal, setDeleteVulnModal] = useState<boolean>(false);
  const [isDeleteScreenshotsModal, setDeleteScreenshotsModal] = useState<boolean>(false);
  const [isDeleteScreenshotModal, setDeleteScreenshotModal] = useState<boolean>(false);

  const [hasTeamleadAccess, setTeamleadAccess] = useState<boolean>(false);

  useEffect(() => {
    if (projectId && !customer) {
      dispatch(getProjectById(projectId));
    }

    switch (objectTypePathname) {
    case 'webApp': {
      prepareObjectType = OBJECT_TYPES.WebApp;

      break;
    }

    case 'api': {
      prepareObjectType = OBJECT_TYPES.API;

      break;
    }

    case 'mobileApp': {
      prepareObjectType = OBJECT_TYPES.MobileApp;

      break;
    }

    case 'networkDevice': {
      prepareObjectType = OBJECT_TYPES.NetworkDevice;

      break;
    }

    case 'server': {
      prepareObjectType = OBJECT_TYPES.Server;

      break;
    }

    case 'arm': {
      prepareObjectType = OBJECT_TYPES.ARM;

      break;
    }

    case 'wifi': {
      prepareObjectType = OBJECT_TYPES.WiFi;

      break;
    }

    case 'socialEngineering': {
      prepareObjectType = OBJECT_TYPES.SocialEngineering;

      break;
    }

    case 'desktopApp': {
      prepareObjectType = OBJECT_TYPES.DesktopApp;

      break;
    }

    case 'sourceCode': {
      prepareObjectType = OBJECT_TYPES.SourceCode;

      break;
    }

    case 'external': {
      prepareObjectType = OBJECT_TYPES.External;

      break;
    }

    case 'internal': {
      prepareObjectType = OBJECT_TYPES.Internal;

      break;
    }

    case 'other': {
      prepareObjectType = OBJECT_TYPES.Other;

      break;
    }
    }
  }, [dispatch, objectTypePathname, projectId, customer]);

  useEffect(() => {
    setTeamleadAccess(teamlead?.id === id);
  }, [id, teamlead]);

  useEffect(() => {
    if (cvssVector) {
      preparedVulnCvssItems(cvssVector, setCvssAV, setCvssAC, setCvssPR, setCvssUI, setCvssS, setCvssC, setCvssI,
        setCvssA);
    }
  }, [cvssVector]);

  useEffect(() => {
    if (projectId && vulnId && objectId) {
      dispatch(getVulnScreenshots({ vulnId, projectId, objectId, objectType: prepareObjectType }));
      dispatch(getVulnById({ vulnId, projectId, objectId, objectType: prepareObjectType }));
    }
  }, [dispatch, objectId, projectId, vulnId]);

  useEffect(() => {
    setScreenshotList(screenshots);
  }, [screenshots]);

  const removeVulnHandler = () => {
    if (vulnId && projectId && objectId) {
      dispatch(deleteVuln({ vulnId, projectId, objectId, objectType: prepareObjectType }));
    }

    navigate(`/${ROUTES.PROJECTS}/${projectId}/${ROUTES.OBJECTS}${objectTypePathname}/${objectId}/${ROUTES.VULNS}`);
  };

  const removeScreenshotsDeleteHandler = () => {
    if (vulnId && projectId && objectId) {
      dispatch(deleteVulnScreenshots({ objectId, projectId, vulnId, objectType: prepareObjectType }));
    }
  };

  const removeScreenshotDeleteHandler = () => {
    if (vulnId && projectId && objectId) {
      dispatch(deleteVulnScreenshot({ projectId, objectId, vulnId, screenId: screenshotId,
        fullScreenId: fullScreenshotId, objectType: prepareObjectType,
      }));
    }
  };

  const onChangeVulnModalChange = () => setChangeVulnModal(prevState => !prevState);
  const onDeleteVulnModalChange = () => setDeleteVulnModal(prevState => !prevState);
  const onDeleteScreenshotsModalChange = () => setDeleteScreenshotsModal(prevState => !prevState);

  const onConfirmDeleteScreenshotModalHandler = (event: any) => {
    const closeIconId = event.target.id;
    const prepareScreenshotId = closeIconId.split('.')[0];

    if (closeIconId) {
      setDeleteScreenshotModal(prevState => !prevState);
      setScreenshotId(prepareScreenshotId);
      setFullScreenshotId(closeIconId);

      event.stopPropagation();
    }
  };

  const onBackNavigate = () => {
    navigate(`/${ROUTES.PROJECTS}/${projectId}/${ROUTES.OBJECTS}${objectTypePathname}/${objectId}/${ROUTES.VULNS}`);
  };

  const infoList: IItemProps[] = [
    {
      title: localization.vuln.infoList.nameText,
      text: name ? name : '-',
      id: 1,
      isFirst: true,
    },
    {
      title: localization.vuln.infoList.locationText,
      text: locationName ? locationName : '-',
      id: 2,
    },
    {
      title: localization.vuln.infoList.negativeConsequencesText,
      text: (negativeConsequences && negativeConsequences?.length !== 0) ?
        preparedMultiSelectData(negativeConsequences, prepareNegativeConsequencesToRu) : '-',
      id: 3,
    },
    {
      title: localization.vuln.infoList.procedureExploitingText,
      text: procedureExploiting ? procedureExploiting : '-',
      id: 4,
    },
    {
      title: localization.vuln.infoList.cveIdText,
      text: (cve_id && cve_id.length !== 0) ? cve_id.join(', ') : '-',
      id: 5,
    },
    {
      title: localization.vuln.infoList.cweIdText,
      text: (cwe_id && cwe_id.length !== 0) ? cwe_id.join(', ') : '-',
      id: 6,
    },
  ];

  const secondaryInfoList: IItemProps[] = [
    {
      title: localization.vuln.secondaryInfoList.cvssScoreText,
      text: cvssScore !== null ? cvssScore.toString() : '-',
      id: 1,
      isFirst: true,
    },
    {
      title: localization.vuln.secondaryInfoList.riskLevelText,
      //@ts-ignore
      text: riskLevel ?
        <span className={styles[`vuln-risk-level_${riskLevel}`]}>
          {prepareRiskLevelToRu[riskLevel]}
        </span> : '-',
      id: 2,
    },
    {
      title: localization.vuln.secondaryInfoList.descriptionText,
      text: description ? description : '-',
      id: 3,
    },
    {
      title: localization.vuln.secondaryInfoList.recommendationsText,
      text: recommendations ? recommendations : '-',
      id: 4,
    },
  ];

  const stateInfoList: IItemProps[] = [
    {
      title: localization.vuln.stateInfo.pentester,
      text: owner?.id ? `${owner?.first_name} (${owner?.email})` : '-',
      id: 1,
    },
  ];

  const cvssList: IItemProps[] = [
    {
      title: localization.vuln.cvssInfo.AV,
      text: cvssAV.text ? cvssAV.text : '-',
      id: 1,
    },
    {
      title: localization.vuln.cvssInfo.AC,
      text: cvssAC.text ? cvssAC.text : '-',
      id: 2,
    },
    {
      title: localization.vuln.cvssInfo.PR,
      text: cvssPR.text ? cvssPR.text : '-',
      id: 3,
    },
    {
      title: localization.vuln.cvssInfo.UI,
      text: cvssUI.text ? cvssUI.text : '-',
      id: 4,
    },
    {
      title: localization.vuln.cvssInfo.S,
      text: cvssS.text ? cvssS.text : '-',
      id: 5,
    },
    {
      title: localization.vuln.cvssInfo.C,
      text: cvssC.text ? cvssC.text : '-',
      id: 6,
    },
    {
      title: localization.vuln.cvssInfo.I,
      text: cvssI.text ? cvssI.text : '-',
      id: 7,
    },
    {
      title: localization.vuln.cvssInfo.A,
      text: cvssA.text ? cvssA.text : '-',
      id: 8,
    },
  ];

  return (
    <>
      <Navbar />
      <div className={styles['vuln-content']}>
        {isLoading ? <Loader /> : (
          <div className={styles['vuln-body']}>
            <div className={styles['vuln-body-info']}>
              <Title className={styles['vuln-body-info-title']} variant={TitleVariantEnum.H3}>
                {localization.vuln.infoList.title}
              </Title>
              <div className={styles['vuln-body-info-list']}>
                {infoList.map((item) => (
                  <PageItem key={item.id} {...item} />
                ))}
              </div>
            </div>
            <div className={styles['vuln-body-info-secondary']}>
              <Title className={styles['vuln-body-info-secondary-title']} variant={TitleVariantEnum.H3}>
                {localization.common.secondaryInfoTitle}
              </Title>
              <div className={styles['vuln-body-info-secondary-list']}>
                {secondaryInfoList.map((item) => (
                  <PageItem key={item.id} {...item} />
                ))}
                <div className={styles['vuln-body-info-secondary-screenshots-wrapper']}>
                  <Title variant={TitleVariantEnum.H3}>{localization.vuln.interactive.screenshots}</Title>
                  {screenshotList?.length !== 0 ? (
                    <Fancybox
                      options={{
                        Carousel: {
                          infinite: false,
                        },
                      }}
                      className={styles['vuln-body-info-secondary-screenshots']}
                    >
                      {screenshotList?.map((screenshot) => (
                        <a
                          onClick={onConfirmDeleteScreenshotModalHandler}
                          key={screenshot}
                          className={styles['vuln-body-info-secondary-screenshot-wrapper']}
                          data-fancybox="gallery"
                          href={`/screenshots/${screenshot}`}
                        >
                          <img
                            className={styles['vuln-body-info-secondary-screenshot']}
                            src={`/screenshots/${screenshot}`} alt={screenshot}
                          />
                          <div id={screenshot} className={styles['vuln-body-info-secondary-close-wrapper']}>
                            <img
                              id={screenshot}
                              className={styles['vuln-body-info-secondary-close']}
                              src="/assets/images/close.png"
                              alt={localization.common.closeAlt}
                            />
                          </div>
                        </a>
                      ))}
                    </Fancybox>
                  ) : '-'
                  }
                </div>
              </div>
            </div>
            <div className={styles['vuln-panel']}>
              <div className={styles['vuln-panel-top-wrapper']}>
                <div className={styles['vuln-panel-top']}>
                  <Title className={styles['vuln-panel-top-title']} variant={TitleVariantEnum.H3}>
                    <>
                      {localization.vuln.interactive.title}
                      {isDelete && (
                        <Archive />
                      )}
                    </>
                  </Title>
                  <div className={styles['vuln-panel-top-buttons']}>
                    <Button onClick={onBackNavigate} buttonText={localization.common.backButtonText} />
                    {(role === 'admin' || hasTeamleadAccess || owner?.id === id) && (
                      <>
                        <Button
                          onClick={onChangeVulnModalChange}
                          buttonText={localization.common.changeButtonText}
                        />
                        <Button
                          onClick={onDeleteVulnModalChange}
                          buttonText={localization.common.deleteButtonText}
                          type={ButtonTypeEnum.Red}
                        />
                      </>
                    )}
                  </div>
                  {(role === 'admin' || hasTeamleadAccess || owner?.id === id) && screenshots?.length !== 0 && (
                    <div className={classNames(
                      styles['vuln-panel-top-buttons'], styles['vuln-panel-top-buttons_secondary'],
                    )}
                    >
                      <Button
                        onClick={onDeleteScreenshotsModalChange}
                        buttonText={localization.vuln.interactive.deleteScreenshotsText}
                        type={ButtonTypeEnum.Red}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className={styles['vuln-panel-divider']}></div>
              <div className={styles['vuln-panel-bottom']}>
                <Text variant={TextVariantEnum.L} className={styles['vuln-panel-bottom-title']}>
                  {localization.common.stateInfoTitle}
                </Text>
                <div className={styles['vuln-panel-bottom-list']}>
                  {stateInfoList.map((item) => (
                    <PageItem
                      {...item}
                      className={styles['vuln-panel-bottom-item_secondary']}
                      classNameTitle={styles['vuln-panel-bottom-item-title']}
                      classNameText={styles['vuln-panel-bottom-item-text']}
                      key={item.id}
                    />
                  ))}
                </div>
              </div>
              <div className={styles['vuln-panel-divider']}></div>
              <div className={styles['vuln-panel-bottom']}>
                <Text variant={TextVariantEnum.L} className={styles['vuln-panel-bottom-title']}>
                  {localization.vuln.cvssInfo.title}
                </Text>
                <div className={styles['vuln-panel-bottom-list']}>
                  {cvssList.map((item) => (
                    <PageItem
                      {...item}
                      className={styles['vuln-panel-bottom-item']}
                      classNameTitle={styles['vuln-panel-bottom-item-title']}
                      classNameText={styles['vuln-panel-bottom-item-text']}
                      key={item.id}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        <ChangeVuln isModalVisible={isChangeVulnModal} setModalVisible={setChangeVulnModal} />
        <ConfirmModal
          isModalVisible={isDeleteVulnModal}
          setModalVisible={setDeleteVulnModal}
          text={localization.vuln.confirmVulnText}
          onConfirmClick={removeVulnHandler}
        />
        <ConfirmModal
          isModalVisible={isDeleteScreenshotsModal}
          setModalVisible={setDeleteScreenshotsModal}
          text={localization.vuln.confirmScreenshotsText}
          onConfirmClick={removeScreenshotsDeleteHandler}
        />
        <ConfirmModal
          isModalVisible={isDeleteScreenshotModal}
          setModalVisible={setDeleteScreenshotModal}
          text={localization.vuln.confirmScreenshotText}
          onConfirmClick={removeScreenshotDeleteHandler}
        />
      </div>
      {(status !== 201 && status !== 202 && status !== 203 && status !== 205 && status !== 206 && status !== 207) && (
        <Notification status={status} error={error} title={localization.vuln.notificationTitle} />
      )}
    </>
  );
};

export default VulnPage;
