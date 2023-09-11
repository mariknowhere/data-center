import {FC, useEffect, useState} from 'react';

import {useNavigate, useParams} from 'react-router-dom';

import classNames from 'classnames';

import FileSaver from 'file-saver';

import styles from '../../Item.module.scss';
import Navbar from '../../../components/navbar/Navbar';
import Button from '../../../components/button/Button';
import {ButtonTypeEnum} from '../../../components/button/ButtonTypes';
import ChangeProject from '../../../components/modals/projects/ChangeProject';
import {
  deleteManager,
  deleteProject,
  deleteTeamlead,
  getProjectById,
  getProjectLogs,
  restoreProject,
} from '../../../store/projects/projectsAsync';
import {useAppSelector} from '../../../hooks/useAppSelector';
import {selectProjectById, selectProjects} from '../../../store/projects/projectsSelectors';
import {useAppDispatch} from '../../../hooks/useAppDispatch';
import PageItem from '../../../components/pageItem/PageItem';
import {IItemProps} from '../../../components/pageItem/PageItemTypes';
import Title from '../../../components/title/Title';
import {TitleVariantEnum} from '../../../components/title/TitleTypes';
import {IProject} from '../../../store/projects/projectsTypes';
import Text from '../../../components/text/Text';
import {TextVariantEnum} from '../../../components/text/TextTypes';
import {ROUTES} from '../../../router/routes';
import ChangeTeamlead from '../../../components/modals/roles/teamleads/ChangeTeamlead';
import ConfirmModal from '../../../components/modals/general/confirm/ConfirmModal';
import Loader from '../../../components/loader/Loader';
import {selectProfileData} from '../../../store/auth/authSelectors';
import Notification from '../../../components/notification/Notification';


import {IGetProjectReportRequest} from '../../../store/analytics/analyticsTypes';
import {getProjectReport} from '../../../store/analytics/analyticsAsync';


import {FULL_DATE_TODAY} from '../../../constants/date';
import {selectAnalytics} from '../../../store/analytics/analyticsSelectors';
import Logs from '../../../components/logs/Logs';
import Archive from '../../../components/archive/Archive';
import {ModalTypes} from '../../../components/modals/general/confirm/ConfirmTypes';
import {PROJECT_REPORT_URL} from '../../../constants/other';
import ChangeManager from '../../../components/modals/roles/managers/ChangeManager';
import {setProjectChanged} from '../../../store/projects/projectsSlice';
import {localization} from '../../../localization/localization';

/**
 * Component for displaying information on project page.
 *
 */
const ProjectPage: FC = () => {
  const dispatch = useAppDispatch();

  const { projectId } = useParams();
  const navigate = useNavigate();

  const {
    isLoading,
    error,
    status,
    notificationTitle,
    logs,
    isProjectChanged,
  } = useAppSelector(selectProjects);
  const { isLoading: isAnalyticsLoading } = useAppSelector(selectAnalytics);
  const { role, id } = useAppSelector(selectProfileData);

  const {
    name: projectName,
    start_date: startDate,
    end_date: endDate,
    gos_order_number: gosOrderNumber,
    gos_order_date: gosOrderDate,
    teamlead,
    customer,
    manager,
    is_delete: isDelete,
    id: project_id,
  }: IProject = useAppSelector(selectProjectById);

  const [isChangeProjectModal, setChangeProjectModal] = useState<boolean>(false);
  const [isDeleteProjectModal, setDeleteProjectModal] = useState<boolean>(false);
  const [isRestoreProjectModal, setRestoreProjectModal] = useState<boolean>(false);

  const [isChangeTeamleadModal, setChangeTeamleadModal] = useState<boolean>(false);
  const [isDeleteTeamleadModal, setDeleteTeamleadModal] = useState<boolean>(false);

  const [isChangeManagerModal, setChangeManagerModal] = useState<boolean>(false);
  const [isDeleteManagerModal, setDeleteManagerModal] = useState<boolean>(false);

  const [hasManagerAccess, setManagerAccess] = useState<boolean>(false);
  const [hasTeamleadAccess, setTeamleadAccess] = useState<boolean>(false);

  const [showFullLogs, setShowFullLogs] = useState<boolean>(false);
  const [projectReportUrl, setProjectReportUrl] = useState<string | null>(localStorage.getItem(PROJECT_REPORT_URL));

  useEffect(() => {
    dispatch(getProjectById(projectId || ''));

    if (projectReportUrl) {
      FileSaver.saveAs(
        `/docx_reports/project_reports/${projectReportUrl}`,
        `${localization.analytics.exportProject.filename} (${FULL_DATE_TODAY}).docx`,
      );

      setProjectReportUrl(null);

      localStorage.removeItem(PROJECT_REPORT_URL);
    }
  }, [dispatch, projectId, projectReportUrl]);

  useEffect(() => {
    if (projectId === project_id) {
      setManagerAccess(manager?.id === id);
      setTeamleadAccess(teamlead?.id === id);
    }
  }, [projectId, manager, teamlead, project_id, id]);

  useEffect(() => {
    if (role === 'admin' || role === 'chief' || hasManagerAccess || hasTeamleadAccess) {
      dispatch(getProjectLogs(projectId || ''));
      dispatch(setProjectChanged(false));
    }
  }, [dispatch, projectId, hasManagerAccess, hasTeamleadAccess, isProjectChanged, role]);

  const removeProjectHandler = () => {
    dispatch(deleteProject(projectId || ''));

    navigate(ROUTES.COMMON + ROUTES.PROJECTS);
  };

  const removeTeamleadHandler = () => {
    if (projectId) {
      dispatch(deleteTeamlead(projectId));
    }
  };

  const removeManagerHandler = () => {
    if (projectId) {
      dispatch(deleteManager(projectId));
    }
  };

  const onExportProjectReport = () => {
    const project: IGetProjectReportRequest = {
      name: projectName,
    };

    dispatch(getProjectReport(project));
  };

  const restoreProjectHandler = () => {
    if (projectId) {
      dispatch(restoreProject(projectId));
    }
  };

  const onChangeProjectChange = () => setChangeProjectModal(prevState => !prevState);
  const onDeleteProjectModalChange = () => setDeleteProjectModal(prevState => !prevState);
  const onRestoreProjectModalChange = () => setRestoreProjectModal(prevState => !prevState);

  const onChangeTeamleadChange = () => setChangeTeamleadModal(prevState => !prevState);
  const onDeleteTeamleadModalChange = () => setDeleteTeamleadModal(prevState => !prevState);

  const onChangeManagerChange = () => setChangeManagerModal(prevState => !prevState);
  const onDeleteManagerModalChange = () => setDeleteManagerModal(prevState => !prevState);

  const onShowFullLogsChange = () => setShowFullLogs(prevState => !prevState);

  const onBackNavigate = () => navigate(ROUTES.COMMON + ROUTES.PROJECTS);

  const showObjectsPage = () => navigate(ROUTES.OBJECTS);

  const infoList: IItemProps[] = [
    {
      title: localization.project.infoList.customerNameText,
      text: customer?.customer_name ? customer?.customer_name : '-',
      id: 1,
      isFirst: true,
    },
    {
      title: localization.project.infoList.nameText,
      text: projectName ? projectName : '-',
      id: 2,
    },
    {
      title: localization.project.infoList.startDateText,
      text: startDate ? startDate.split('-').reverse().join('.') : '-',
      id: 3,
    },
    {
      title: localization.project.infoList.endDateText,
      text: endDate ? endDate.split('-').reverse().join('.') : '-',
      id: 4,
    },
  ];

  const secondaryInfoList: IItemProps[] = [
    {
      title: localization.project.secondaryInfoList.gosOrderNumberText,
      text: gosOrderNumber ? gosOrderNumber : '-',
      id: 1,
      isFirst: true,
    },
    {
      title: localization.project.secondaryInfoList.gosOrderDateText,
      text: gosOrderDate ? gosOrderDate.split('-').reverse().join('.') : '-',
      id: 2,
    },
  ];

  const stateInfoList: IItemProps[] = [
    {
      title: localization.project.stateInfo.manager,
      text: manager?.id ? `${manager.first_name} (${manager.email})` : '-',
      id: 1,
    },
    {
      title: localization.project.stateInfo.teamlead,
      text: teamlead?.id ? `${teamlead.first_name} (${teamlead.email})` : '-',
      id: 3,
    },
  ];

  return (
    <>
      <Navbar />
      <div className={styles['item-content']}>
        {(isLoading || isAnalyticsLoading) ? <Loader/> : (
          <>
            <div className={styles['item-body']}>
              <div className={styles['item-body-info']}>
                <Title className={styles['item-body-info-title']} variant={TitleVariantEnum.H3}>
                  {localization.project.infoList.title}
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
                        {localization.project.interactive.title}
                        {isDelete && (
                          <Archive />
                        )}
                      </>
                    </Title>
                    <div className={styles['item-panel-top-buttons']}>
                      <Button onClick={onBackNavigate} buttonText={localization.common.backButtonText} />
                      {(role === 'admin' || hasManagerAccess) && (
                        <Button
                          onClick={onChangeProjectChange}
                          buttonText={localization.common.changeButtonText}
                        />
                      )}
                      <Button
                        onClick={showObjectsPage}
                        buttonText={localization.project.interactive.objectsButtonText}
                      />
                      {(role === 'admin' || hasManagerAccess) && (
                        <Button
                          onClick={onDeleteProjectModalChange}
                          buttonText={localization.common.deleteButtonText}
                          type={ButtonTypeEnum.Red}
                        />
                      )}
                    </div>
                    {(role === 'admin' || role === 'chief') && (
                      <>
                        <div className={classNames(
                          styles['item-panel-top-buttons'], styles['item-panel-top-buttons_secondary'],
                        )}
                        >
                          <Button
                            onClick={onChangeManagerChange}
                            buttonText={localization.project.interactive.managerAppointButtonText}
                          />
                          {manager?.id && (
                            <Button
                              onClick={onDeleteManagerModalChange}
                              buttonText={localization.project.interactive.managerDeleteButtonText}
                              type={ButtonTypeEnum.Red}
                            />
                          )}
                        </div>
                        <div className={classNames(
                          styles['item-panel-top-buttons'], styles['item-panel-top-buttons_secondary'],
                        )}
                        >
                          <Button
                            onClick={onChangeTeamleadChange}
                            buttonText={localization.project.interactive.teamleadAppointButtonText}
                          />
                          {teamlead?.id && (
                            <Button
                              onClick={onDeleteTeamleadModalChange}
                              buttonText={localization.project.interactive.teamleadDeleteButtonText}
                              type={ButtonTypeEnum.Red}
                            />
                          )}
                        </div>
                      </>
                    )}
                    {(role === 'admin' || hasManagerAccess || role === 'chief') && (
                      <div className={classNames(
                        styles['item-panel-top-buttons'], styles['item-panel-top-buttons_secondary'],
                      )}
                      >
                        <Button
                          onClick={onExportProjectReport}
                          buttonText={localization.project.interactive.exportProjectButtonText}
                        />
                        {isDelete && (
                          <Button
                            onClick={onRestoreProjectModalChange}
                            buttonText={localization.common.restoreButtonText}
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className={styles['item-panel-divider']}></div>
                <div className={styles['item-panel-bottom']}>
                  <Text variant={TextVariantEnum.L} className={styles['item-panel-bottom-title']}>
                    {localization.common.stateInfoTitle}
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
              </div>
            </div>
            {logs && logs.length !== 0 && (
              <Logs logs={logs} onShowLogsHandler={onShowFullLogsChange} showFullLogs={showFullLogs} />
            )}
          </>
        )}
        {(role === 'admin' || role === 'chief') && (
          <ChangeTeamlead isModalVisible={isChangeTeamleadModal} setModalVisible={setChangeTeamleadModal} />
        )}
        {(role === 'admin' || role === 'chief') && (
          <ChangeManager isModalVisible={isChangeManagerModal} setModalVisible={setChangeManagerModal} />
        )}
        {(role === 'admin' || hasManagerAccess) && (
          <ChangeProject isModalVisible={isChangeProjectModal} setModalVisible={setChangeProjectModal} />
        )}
        <ConfirmModal
          isModalVisible={isDeleteProjectModal}
          setModalVisible={setDeleteProjectModal}
          text={localization.project.confirmProjectText}
          onConfirmClick={removeProjectHandler}
        />
        <ConfirmModal
          isModalVisible={isDeleteTeamleadModal}
          setModalVisible={setDeleteTeamleadModal}
          text={localization.project.confirmTeamleadText}
          onConfirmClick={removeTeamleadHandler}
        />
        <ConfirmModal
          isModalVisible={isDeleteManagerModal}
          setModalVisible={setDeleteManagerModal}
          text={localization.project.confirmManagerText}
          onConfirmClick={removeManagerHandler}
        />
        <ConfirmModal
          isModalVisible={isRestoreProjectModal}
          setModalVisible={setRestoreProjectModal}
          text={localization.project.confirmProjectText}
          onConfirmClick={restoreProjectHandler}
          type={ModalTypes.Restore}
        />
        {(status !== 201 && status !== 202 && status !== 203 && status !== 205) && (
          <Notification status={status} error={error} title={notificationTitle} />
        )}
      </div>
    </>
  );
};

export default ProjectPage;
