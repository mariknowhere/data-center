import {FC, useEffect, useState} from 'react';

import {useNavigate, useParams} from 'react-router-dom';

import classNames from 'classnames';

import styles from '../../../Item.module.scss';
import {useAppDispatch} from '../../../../hooks/useAppDispatch';
import {IItemProps} from '../../../../components/pageItem/PageItemTypes';
import PageItem from '../../../../components/pageItem/PageItem';
import Button from '../../../../components/button/Button';
import Title from '../../../../components/title/Title';
import {TitleVariantEnum} from '../../../../components/title/TitleTypes';
import Navbar from '../../../../components/navbar/Navbar';
import {ButtonTypeEnum} from '../../../../components/button/ButtonTypes';
import {useAppSelector} from '../../../../hooks/useAppSelector';
import {selectObjects} from '../../../../store/objects/objectsSelectors';
import ConfirmModal from '../../../../components/modals/general/confirm/ConfirmModal';
import {ROUTES} from '../../../../router/routes';
import Loader from '../../../../components/loader/Loader';
import {getProjectById} from '../../../../store/projects/projectsAsync';
import {selectProjectById} from '../../../../store/projects/projectsSelectors';
import {selectProfileData} from '../../../../store/auth/authSelectors';
import {TextVariantEnum} from '../../../../components/text/TextTypes';
import ChangePentester from '../../../../components/modals/roles/pentesters/ChangePentester';
import Notification from '../../../../components/notification/Notification';
import {deleteObject, getObjectById, getObjectLogs} from '../../../../store/objects/objectsAsync';
import {OBJECT_TITLES, OBJECT_TYPES, prepareDesktopPlatformToRu} from '../../../../constants/objects';
import {selectDesktopApp, selectDesktopAppById} from '../../../../store/objects/desktopApps/desktopAppsSelectors';
import Text from '../../../../components/text/Text';
import DeletePentester from '../../../../components/modals/roles/pentesters/DeletePentester';


import Logs from '../../../../components/logs/Logs';
import ChangeObject from '../../../../components/modals/objects/ChangeObject';
import Archive from '../../../../components/archive/Archive';
import {localization} from '../../../../localization/localization';

/**
 * Component for displaying information on desktop app page.
 *
 */
const DesktopAppPage: FC = () => {
  const dispatch = useAppDispatch();

  const { objectId, projectId } = useParams();
  const navigate = useNavigate();

  const { error, isLoading, status, notificationTitle } = useAppSelector(selectObjects);
  const { logs } = useAppSelector(selectDesktopApp);

  const { name, teamlead, manager } = useAppSelector(selectProjectById);

  const { role, id } = useAppSelector(selectProfileData);

  const {
    additional_info: additionalInfo,
    app_name: appName,
    inf_system: infSystem,
    platform_type: platformType,
    greybox,
    blackbox,
    pentesters,
    is_delete: isDelete,
  } = useAppSelector(selectDesktopAppById);

  const [isChangeProjectModal, setChangeProjectModal] = useState<boolean>(false);
  const [isDeleteOfficeServerModal, setDeleteOfficeServerModal] = useState<boolean>(false);
  const [isChangePentesterModal, setChangePentesterModal] = useState<boolean>(false);
  const [isDeletePentesterModal, setDeletePentesterModal] = useState<boolean>(false);
  const [showFullLogs, setShowFullLogs] = useState<boolean>(false);

  const [hasManagerAccess, setManagerAccess] = useState<boolean>(false);
  const [hasTeamleadAccess, setTeamleadAccess] = useState<boolean>(false);

  useEffect(() => {
    setManagerAccess(manager?.id === id);
    setTeamleadAccess(teamlead?.id === id);
  }, [teamlead, manager, id]);

  useEffect(() => {
    if (projectId && !name) {
      dispatch(getProjectById(projectId));
    }

    if (objectId && projectId && name) {
      dispatch(getObjectById({ objectType: OBJECT_TYPES.DesktopApp, objectId, projectId }));
    }
  }, [dispatch, objectId, projectId, name]);

  useEffect(() => {
    if ((role === 'admin' || hasManagerAccess || hasTeamleadAccess) && objectId && projectId) {
      dispatch(getObjectLogs({ objectType: OBJECT_TYPES.DesktopApp, objectId, projectId }));
    }
  }, [dispatch, objectId, projectId, hasManagerAccess, hasTeamleadAccess, role]);

  const removeObjectHandler = () => {
    if (objectId && projectId) {
      dispatch(deleteObject({ projectId, objectId, objectType: OBJECT_TYPES.DesktopApp }));
    }

    navigate(`/${ROUTES.PROJECTS}/${projectId}/${ROUTES.OBJECTS}`);
  };

  const onModalHandler = () => setChangeProjectModal(prevState => !prevState);
  const onConfirmDeleteModalHandler = () => setDeleteOfficeServerModal(prevState => !prevState);
  const onChangePentesterHandler = () => setChangePentesterModal(prevState => !prevState);
  const onDeletePentesterHandler = () => setDeletePentesterModal(prevState => !prevState);
  const onShowLogsHandler = () => setShowFullLogs(prevState => !prevState);

  const onBackNavigate = () => navigate(`/${ROUTES.PROJECTS}/${projectId}/${ROUTES.OBJECTS}`);
  const showVulnsPage = () => navigate(ROUTES.VULNS);

  const infoList: IItemProps[] = [
    {
      title: localization.object.filters.projectNameText,
      text: name ? name : '-',
      id: 1,
      isFirst: true,
    },
    {
      title: localization.object.filters.infSystemText,
      text: infSystem ? infSystem.name : '-',
      id: 2,
    },
    {
      title: localization.object.filters.appNameText,
      text: appName ? appName : '-',
      id: 3,
    },
    {
      title: localization.object.filters.platformTypeText,
      text: platformType ? prepareDesktopPlatformToRu[platformType] : '-',
      id: 4,
    },
  ];

  const secondaryInfoList: IItemProps[] = [
    {
      title: localization.object.filters.attackerModelText,
      text: localization.object.internalTitle,
      id: 1,
      isFirst: true,
    },
    {
      title: localization.object.filters.testMethodText,
      text: `${greybox ?
        blackbox ?  localization.object.filters.greyboxAndBlackboxText : localization.object.filters.greyboxText : 
        blackbox ? localization.object.filters.blackboxText : '-'}`,
      id: 2,
    },
    {
      title: localization.object.filters.additionalInfoText,
      text: additionalInfo ? additionalInfo : '-',
      id: 3,
    },
  ];

  const stateInfoList: IItemProps[] = pentesters?.map((pentester, index) => {
    return {
      title: '',
      text: `${pentester.first_name} (${pentester.email})`,
      id: index + 1,
    };
  }) || [];

  return (
    <>
      <Navbar/>
      <div className={styles['item-content']}>
        {isLoading ? <Loader /> : (
          <>
            <div className={styles['item-body']}>
              <div className={styles['item-body-info']}>
                <Title className={styles['item-body-info-title']} variant={TitleVariantEnum.H3}>
                  {localization.object.infoDesktopAppTitle}
                </Title>
                <div className={styles['item-body-info-list']}>
                  {infoList.map((item) => (
                    <PageItem key={item.id} {...item} />
                  ))}
                </div>
              </div>
              <div className={styles['item-body-info-secondary']}>
                <Title className={styles['item-body-info-secondary-title']} variant={TitleVariantEnum.H3}>
                  {localization.common.secondaryInfoTitle}
                </Title>
                <div className={styles['item-body-info-secondary-list']}>
                  {secondaryInfoList.map((item) => (
                    <PageItem key={item.id} {...item} />
                  ))}
                </div>
              </div>
              <div className={styles['item-panel']}>
                <div className={styles['item-panel-top-wrapper']}>
                  <div className={styles['item-panel-top']}>
                    <Title className={styles['item-panel-top-title']} variant={TitleVariantEnum.H3}>
                      <>
                        {localization.object.interactiveDesktopAppTitle}
                        {isDelete && (
                          <Archive />
                        )}
                      </>
                    </Title>
                    <div className={styles['item-panel-top-buttons']}>
                      <Button onClick={onBackNavigate} buttonText={localization.common.backButtonText} />
                      {(role === 'admin' || hasManagerAccess || hasTeamleadAccess) && (
                        <Button onClick={onModalHandler} buttonText={localization.common.changeButtonText} />
                      )}
                      {(role !== 'manager') && (
                        <Button onClick={showVulnsPage} buttonText={localization.object.vulnsButtonText} />
                      )}
                      {(role === 'admin' || hasManagerAccess || hasTeamleadAccess) && (
                        <Button
                          onClick={onConfirmDeleteModalHandler}
                          buttonText={localization.common.deleteButtonText}
                          type={ButtonTypeEnum.Red}
                        />
                      )}
                    </div>
                    {(role === 'admin' || role === 'teamlead') && (
                      <div className={classNames(styles['item-panel-top-buttons'], styles['item-panel-top-buttons_secondary'])}>
                        <Button
                          onClick={onChangePentesterHandler}
                          buttonText={localization.object.appointPentesterButtonText}
                          typeButtonText={TextVariantEnum.S}
                        />
                        {pentesters?.length !== 0 && (
                          <Button
                            onClick={onDeletePentesterHandler}
                            buttonText={localization.object.deletePentesterButtonText}
                            typeButtonText={TextVariantEnum.S}
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>
                {stateInfoList.length !== 0 && (
                  <>
                    <div className={styles['item-panel-divider']}></div>
                    <div className={styles['item-panel-bottom']}>
                      <Text variant={TextVariantEnum.L} className={styles['item-panel-bottom-title']}>
                        {localization.object.pentestersTitle}
                      </Text>
                      {stateInfoList.map((item) => (
                        <PageItem
                          {...item}
                          className={styles['item-panel-bottom-item']}
                          classNameTitle={styles['item-panel-bottom-item-title']}
                          classNameText={styles['item-panel-bottom-item-text']}
                          key={item.id}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
            {logs.length !== 0 && (
              <Logs logs={logs} onShowLogsHandler={onShowLogsHandler} showFullLogs={showFullLogs} />
            )}
          </>
        )}
        <ConfirmModal
          isModalVisible={isDeleteOfficeServerModal}
          setModalVisible={setDeleteOfficeServerModal}
          text={OBJECT_TITLES.DESKTOP_APP}
          onConfirmClick={removeObjectHandler}
        />
        {(role === 'admin' || hasManagerAccess || hasTeamleadAccess) && (
          <ChangeObject
            isModalVisible={isChangeProjectModal}
            setModalVisible={setChangeProjectModal}
            selectTab={OBJECT_TYPES.DesktopApp}
            selectTitle={OBJECT_TITLES.DESKTOP_APP}
          />
        )}
        {(role === 'admin' || hasTeamleadAccess) && (
          <ChangePentester
            isModalVisible={isChangePentesterModal}
            setModalVisible={setChangePentesterModal}
            selectTab={OBJECT_TYPES.DesktopApp}
            pentestersIds={pentesters}
          />
        )}
        {(role === 'admin' || hasTeamleadAccess) && pentesters?.length !== 0 && (
          <DeletePentester
            isModalVisible={isDeletePentesterModal}
            setModalVisible={setDeletePentesterModal}
            selectTab={OBJECT_TYPES.DesktopApp}
            pentestersIds={pentesters}
          />
        )}
        {(status !== 201 && status !== 202 && status !== 203 && status !== 205) && (
          <Notification status={status} error={error} title={notificationTitle} />
        )}
      </div>
    </>
  );
};

export default DesktopAppPage;
