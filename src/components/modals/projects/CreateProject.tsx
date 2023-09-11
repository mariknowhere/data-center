import {FC, useEffect, useState} from 'react';

import classNames from 'classnames';

import {useNavigate} from 'react-router-dom';

import Modal from '../Modal';
import {IModalProps} from '../ModalTypes';
import InputForm from '../../inputForm/InputForm';
import styles from '../Modal.module.scss';
import Button from '../../button/Button';
import {InputTypeEnum} from '../../input/InputTypes';
import {useAppDispatch} from '../../../hooks/useAppDispatch';
import {IProject} from '../../../store/projects/projectsTypes';
import {validateProject} from '../../../utils/validate/validateProject';
import {useAppSelector} from '../../../hooks/useAppSelector';
import {selectProjectErrors, selectProjects} from '../../../store/projects/projectsSelectors';
import {createProject, getAllProjects} from '../../../store/projects/projectsAsync';
import {useShowPopup} from '../../../hooks/useShowPopup';
import {selectCustomers} from '../../../store/customers/customersSelectors';
import ConfirmModal from '../general/confirm/ConfirmModal';
import {ModalTypes} from '../general/confirm/ConfirmTypes';
import {ButtonTypeEnum} from '../../button/ButtonTypes';
import {dateChange} from '../../../utils/dateChange';
import {getAllCustomers} from '../../../store/customers/customersAsync';
import {IPopupItem} from '../../popup/PopupTypes';

import {ROUTES} from '../../../router/routes';

import {CREATE_MODAL_OPEN} from '../../../constants/other';
import {localization} from '../../../localization/localization';

import {resetProjectData} from './utils/resetProjectData';

let prepareCustomers: any[] = [];

const CreateProject: FC<IModalProps> = ({ isModalVisible, setModalVisible }) => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { allProjects } = useAppSelector(selectProjects);
  const { allCustomers } = useAppSelector(selectCustomers);

  const { showPopupHandler } = useShowPopup();

  const {
    customer_name_error,
    project_name_error,
    start_date_error,
    end_date_error,
    gos_order_number_error,
    gos_order_date_error,
  } = useAppSelector(selectProjectErrors);

  const [project, setProject] = useState<IProject>({
    end_date: '',
    name: '',
    start_date: '',
    customer: { id: '' },
    gos_order_date: '',
    gos_order_number: '',
  });

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [gosOrderDate, setGosOrderDate] = useState<Date | null>(null);

  const [customerId, setCustomerId] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('');

  const [isCreateProjectModal, setCreateProjectModal] = useState<boolean>(false);
  const [isResetProjectDataModal, setResetProjectDataModal] = useState<boolean>(false);

  useEffect(() => {
    if (allProjects.length === 0) {
      dispatch(getAllProjects({}));
    }

    if (allCustomers.length === 0) {
      dispatch(getAllCustomers({}));
    }
  }, [dispatch, allProjects.length, allCustomers.length]);

  useEffect(() => {
    prepareCustomers = allCustomers.map((customer) => {
      return {
        text: customer.customer_name,
        id: customer.id,
      };
    });

    prepareCustomers[prepareCustomers.length] = {
      text: 'Создать заказчика',
      id: 'create',
    };
  }, [allCustomers]);

  const addProjectHandler = () => {
    const isValidate = validateProject(project, dispatch, allProjects, customerId);

    if (isValidate) {
      project.customer!.id = customerId;

      if (!project.gos_order_number) {
        delete project.gos_order_number;
      }

      if (!project.gos_order_date) {
        delete project.gos_order_date;
      }

      dispatch(createProject({ project, customerId }));

      resetProjectData(dispatch, setProject, setStartDate, setEndDate, setGosOrderDate, setCustomerId, setCustomerName);

      setModalVisible(false);
    }
  };

  const resetProjectDataHandler = () => {
    resetProjectData(dispatch, setProject, setStartDate, setEndDate, setGosOrderDate, setCustomerId, setCustomerName);
  };

  const onStartDateChange = (date: any) => dateChange(date, setStartDate, setProject, project, 'start_date');
  const onEndDateChange = (date: any) => dateChange(date, setEndDate, setProject, project, 'end_date');
  const onGosDateChange = (date: any) => dateChange(date, setGosOrderDate, setProject, project, 'gos_order_date');

  const onCustomerChangeHandler = ({ id, text }: IPopupItem) => {
    if (id === 'create') {
      localStorage.setItem(CREATE_MODAL_OPEN, 'true');

      navigate(ROUTES.COMMON + ROUTES.CUSTOMERS);
    } else {
      setCustomerId(String(id) || '');

      setCustomerName(text);
    }
  };

  const onConfirmCreateModalHandler = () => setCreateProjectModal(prevState => !prevState);
  const onConfirmResetModalHandler = () => setResetProjectDataModal(prevState => !prevState);

  return (
    <>
      <Modal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        title={localization.modals.project.createTitle}
      >
        <div className={styles['modal-inputs']}>
          <InputForm
            text={localization.modals.project.customerNameText}
            placeholder={localization.modals.project.customerNamePlaceholder}
            errorMessage={customer_name_error}
            value={customerName}
            popupItems={prepareCustomers}
            onClick={showPopupHandler}
            onPopupChange={onCustomerChangeHandler}
            onChange={(event) => setCustomerName(event.target.value )}
            required
            disabled
          />
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
            date={startDate}
            onDateChange={onStartDateChange}
            required
          />
          <InputForm
            text={localization.modals.project.endDateText}
            errorMessage={end_date_error}
            type={InputTypeEnum.Date}
            date={endDate}
            onDateChange={onEndDateChange}
            required
          />
          <InputForm
            text={localization.modals.project.gosOrderNumberText}
            placeholder={localization.modals.project.gosOrderNumberPlaceholder}
            errorMessage={gos_order_number_error}
            value={project.gos_order_number}
            onChange={(event) => {
              setProject({...project, gos_order_number: event.target.value});
            }}
          />
          <InputForm
            text={localization.modals.project.gosOrderDateText}
            errorMessage={gos_order_date_error}
            type={InputTypeEnum.Date}
            date={gosOrderDate}
            onDateChange={onGosDateChange}
            disabledKeyboardNavigation={true}
          />
        </div>
        <div className={classNames(styles['modal-buttons'], styles['modal-buttons_between'])}>
          <Button buttonText={localization.modals.createButtonText} onClick={onConfirmCreateModalHandler} />
          <Button
            type={ButtonTypeEnum.Red}
            buttonText={localization.modals.resetButtonText}
            onClick={onConfirmResetModalHandler}
          />
        </div>
      </Modal>
      <ConfirmModal
        isModalVisible={isCreateProjectModal}
        setModalVisible={setCreateProjectModal}
        text={localization.project.confirmProjectText}
        onConfirmClick={addProjectHandler}
        type={ModalTypes.Create}
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

export default CreateProject;
