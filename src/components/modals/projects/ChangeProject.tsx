import {FC, useEffect, useState} from 'react';

import classNames from 'classnames';

import Modal from '../Modal';
import {IModalProps} from '../ModalTypes';
import InputForm from '../../inputForm/InputForm';
import styles from '../Modal.module.scss';
import Button from '../../button/Button';
import {InputTypeEnum} from '../../input/InputTypes';
import {changeProject, getAllProjects} from '../../../store/projects/projectsAsync';
import {useAppDispatch} from '../../../hooks/useAppDispatch';
import {useAppSelector} from '../../../hooks/useAppSelector';
import {selectProjectById, selectProjectErrors, selectProjects} from '../../../store/projects/projectsSelectors';
import {IProject} from '../../../store/projects/projectsTypes';
import {validateProject} from '../../../utils/validate/validateProject';
import ConfirmModal from '../general/confirm/ConfirmModal';
import {ModalTypes} from '../general/confirm/ConfirmTypes';
import {ButtonTypeEnum} from '../../button/ButtonTypes';
import {dateChange} from '../../../utils/dateChange';

import {localization} from '../../../localization/localization';

import {resetProjectData} from './utils/resetProjectData';

const ChangeProject: FC<IModalProps> = ({ isModalVisible, setModalVisible }) => {
  const dispatch = useAppDispatch();

  const { allProjects } = useAppSelector(selectProjects);

  const {
    project_name_error,
    start_date_error,
    end_date_error,
    gos_order_number_error,
    gos_order_date_error,
  } = useAppSelector(selectProjectErrors);

  const {
    name: projectName,
    start_date: startDate,
    end_date: endDate ,
    gos_order_number: gosOrderNumber,
    gos_order_date: gosOrderDate,
    customer,
    id: projectId,
  }: IProject = useAppSelector(selectProjectById);

  const startDateMilliseconds = Date.parse(startDate || '2023-01-01');
  const startDateInitialState = new Date(startDateMilliseconds);

  const endDateMilliseconds = Date.parse(endDate || '2023-01-01');
  const endDateInitialState = new Date(endDateMilliseconds);

  const gosDateMilliseconds = Date.parse(gosOrderDate || '');
  const gosDateInitialState = gosDateMilliseconds ? new Date(gosDateMilliseconds) : null;

  const [project, setProject] = useState<IProject>({
    end_date: endDate,
    gos_order_date: gosOrderDate,
    gos_order_number: gosOrderNumber,
    name: projectName,
    start_date: startDate,
    customer: customer,
    id: projectId,
  });

  const [startDateState, setStartDateState] = useState<Date | null>(startDateInitialState);
  const [endDateState, setEndDateState] = useState<Date | null>(endDateInitialState);
  const [gosOrderDateState, setGosOrderDateState] = useState<Date | null>(gosDateInitialState);

  const [isChangeProjectModal, setChangeProjectModal] = useState<boolean>(false);
  const [isResetProjectDataModal, setResetProjectDataModal] = useState<boolean>(false);
  const [isProjectsLoading, setProjectsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (allProjects.length === 0 && !isProjectsLoading) {
      dispatch(getAllProjects({}));

      setProjectsLoading(true);
    }

    setProject({
      end_date: endDateInitialState!.toISOString().trim().slice(0, 10),
      gos_order_date: gosDateInitialState ? gosDateInitialState!.toISOString().trim().slice(0, 10) : '',
      gos_order_number: gosOrderNumber,
      name: projectName,
      start_date: startDateInitialState!.toISOString().trim().slice(0, 10),
      id: projectId,
    });

    setStartDateState(startDateInitialState);
    setEndDateState(endDateInitialState);
    setGosOrderDateState(gosDateInitialState);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectName, gosOrderNumber, endDate, gosOrderDate, startDate, customer]);

  const changeProjectHandler = () => {
    const isValidate = validateProject(project, dispatch, allProjects, customer?.customer_name);

    if (isValidate && projectId) {
      if (!gosOrderDateState) {
        delete project.gos_order_date;
      }

      dispatch(changeProject(project));

      setModalVisible(false);
    }
  };

  const resetProjectDataHandler = () => resetProjectData(dispatch, setProject);

  const onStartDateChange = (date: any) => dateChange(date, setStartDateState, setProject, project, 'start_date');
  const onEndDateChange = (date: any) => dateChange(date, setEndDateState, setProject, project, 'end_date');
  const onGosDateChange = (date: any) => dateChange(date, setGosOrderDateState, setProject, project, 'gos_order_date');

  const onConfirmChangeModalHandler = () => setChangeProjectModal(prevState => !prevState);
  const onConfirmResetModalHandler = () => setResetProjectDataModal(prevState => !prevState);

  return (
    <>
      <Modal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        title={localization.modals.project.changeTitle}
      >
        <div className={styles['modal-inputs']}>
          <InputForm
            text={localization.modals.project.nameText}
            placeholder={localization.modals.project.namePlaceholder}
            errorMessage={project_name_error}
            value={project.name}
            onChange={(event) => {
              setProject({...project, name: event.target.value});
            }}
            required
          />
          <InputForm
            text={localization.modals.project.startDateText}
            errorMessage={start_date_error}
            type={InputTypeEnum.Date}
            date={startDateState}
            onDateChange={onStartDateChange}
            required
          />
          <InputForm
            text={localization.modals.project.endDateText}
            errorMessage={end_date_error}
            type={InputTypeEnum.Date}
            date={endDateState}
            onDateChange={onEndDateChange}
            required
          />
          <InputForm
            text={localization.modals.project.gosOrderNumberText}
            placeholder={localization.modals.project.gosOrderNumberPlaceholder}
            errorMessage={gos_order_number_error}
            value={project.gos_order_number || ''}
            onChange={(event) => {
              setProject({...project, gos_order_number: event.target.value});
            }}
          />
          <InputForm
            text={localization.modals.project.gosOrderDateText}
            errorMessage={gos_order_date_error}
            type={InputTypeEnum.Date}
            date={gosOrderDateState}
            onDateChange={onGosDateChange}
          />
        </div>
        <div className={classNames(styles['modal-buttons'], styles['modal-buttons_between'])}>
          <Button buttonText={localization.common.changeButtonText} onClick={onConfirmChangeModalHandler} />
          <Button
            type={ButtonTypeEnum.Red}
            buttonText={localization.modals.resetButtonText}
            onClick={onConfirmResetModalHandler}
          />
        </div>
      </Modal>
      <ConfirmModal
        isModalVisible={isChangeProjectModal}
        setModalVisible={setChangeProjectModal}
        text={localization.project.confirmProjectText}
        onConfirmClick={changeProjectHandler}
        type={ModalTypes.Change}
      />
      <ConfirmModal
        isModalVisible={isResetProjectDataModal}
        setModalVisible={setResetProjectDataModal}
        text={localization.project.confirmProjectDataText}
        onConfirmClick={resetProjectDataHandler}
        type={ModalTypes.Reset}
      />
    </>
  );
};

export default ChangeProject;
