import {FC, useEffect, useState} from 'react';

import classNames from 'classnames';

import {useParams} from 'react-router-dom';

import Modal from '../Modal';
import {IModalProps} from '../ModalTypes';
import InputForm from '../../inputForm/InputForm';
import styles from '../Modal.module.scss';
import Button from '../../button/Button';
import {useAppDispatch} from '../../../hooks/useAppDispatch';
import {useAppSelector} from '../../../hooks/useAppSelector';
import {selectCustomerById, selectCustomerErrors, selectCustomers} from '../../../store/customers/customersSelectors';
import {ICustomer} from '../../../store/customers/customersTypes';
import {changeCustomer, getAllCustomers} from '../../../store/customers/customersAsync';
import {validateCustomer} from '../../../utils/validate/validateCustomer';
import {InputTypeEnum} from '../../input/InputTypes';
import ConfirmModal from '../general/confirm/ConfirmModal';
import {ModalTypes} from '../general/confirm/ConfirmTypes';
import {ButtonTypeEnum} from '../../button/ButtonTypes';
import {IPopupItem} from '../../popup/PopupTypes';
import {customerTypePopupItems, prepareCustomerTypeToEng, prepareCustomerTypeToRu} from '../../../constants/costumer';
import {useShowPopup} from '../../../hooks/useShowPopup';


import {localization} from '../../../localization/localization';

import {resetOfficeData} from './utils/resetCustomerData';

const ChangeProject: FC<IModalProps> = ({ isModalVisible, setModalVisible }) => {
  const dispatch = useAppDispatch();

  const { customerId } = useParams();

  const { allCustomers } = useAppSelector(selectCustomers);

  const { showPopupHandler } = useShowPopup();

  const {
    customer_name_error,
    inn_error,
    customer_type_error,
    number_employees_error,
  } = useAppSelector(selectCustomerErrors);

  const {
    customer_name: customerName,
    inn: innName,
    customer_type: customerType,
    number_employees: numberEmployees,
  }: ICustomer = useAppSelector(selectCustomerById);

  const [customer, setCustomer] = useState<ICustomer>({
    customer_name: customerName,
    customer_type: prepareCustomerTypeToRu[customerType || ''],
    inn: innName,
    number_employees: numberEmployees,
  });

  const [isChangeCustomerModal, setChangeCustomerModal] = useState<boolean>(false);
  const [isResetCustomerDataModal, setResetCustomerDataModal] = useState<boolean>(false);
  const [isCustomersLoading, setCustomersLoading] = useState<boolean>(false);

  useEffect(() => {
    if (allCustomers.length === 0 && !isCustomersLoading) {
      dispatch(getAllCustomers({}));

      setCustomersLoading(true);
    }

    setCustomer({
      customer_name: customerName,
      customer_type: prepareCustomerTypeToRu[customerType || ''],
      inn: innName,
      number_employees: numberEmployees,
    });
  }, [dispatch, allCustomers.length, isCustomersLoading, customerName, customerType, innName, numberEmployees]);

  const changeCustomerHandler = () => {
    const isValidate = validateCustomer(customer, dispatch, allCustomers, customerId);

    if (isValidate && customerId) {
      customer.customer_type = prepareCustomerTypeToEng[customer.customer_type];

      dispatch(changeCustomer({ customer, customerId }));

      customer.customer_type = prepareCustomerTypeToRu[customer.customer_type];

      setModalVisible(false);
    }
  };

  const resetCustomerDataHandler = () => resetOfficeData(dispatch, setCustomer);

  const onConfirmChangeModalHandler = () => setChangeCustomerModal(prevState => !prevState);
  const onConfirmResetModalHandler = () => setResetCustomerDataModal(prevState => !prevState);

  const onCustomerTypeChange = (item: IPopupItem) => setCustomer({ ...customer, customer_type: item.text || '' });

  return (
    <>
      <Modal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        title={localization.modals.customer.changeTitle}
      >
        <div className={styles['modal-inputs']}>
          <InputForm
            text={localization.modals.customer.customerNameText}
            placeholder={localization.modals.customer.customerNamePlaceholder}
            errorMessage={customer_name_error}
            value={customer.customer_name}
            onChange={(event) => {
              setCustomer({...customer, customer_name: event.target.value});
            }}
            required
          />
          <InputForm
            text={localization.modals.customer.typeText}
            placeholder={localization.modals.customer.typePlaceholder}
            value={customer.customer_type || ''}
            errorMessage={customer_type_error}
            popupItems={customerTypePopupItems}
            onClick={showPopupHandler}
            onPopupChange={onCustomerTypeChange}
            disabled
            onChange={(event) => {
              setCustomer({...customer, customer_type: event.target.value});
            }}
            required
          />
          <InputForm
            text={localization.modals.customer.innText}
            placeholder={localization.modals.customer.innPlaceholder}
            type={InputTypeEnum.Number}
            errorMessage={inn_error}
            value={customer.inn}
            onChange={(event) => {
              setCustomer({...customer, inn: parseInt(event.target.value) });
            }}
            required
          />
          <InputForm
            text={localization.modals.customer.employeesText}
            placeholder={localization.modals.customer.employeesPlaceholder}
            type={InputTypeEnum.Number}
            errorMessage={number_employees_error}
            value={customer.number_employees}
            onChange={(event) => {
              setCustomer({...customer, number_employees: parseInt(event.target.value)});
            }}
            required
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
        isModalVisible={isChangeCustomerModal}
        setModalVisible={setChangeCustomerModal}
        text={localization.customer.confirmText}
        onConfirmClick={changeCustomerHandler}
        type={ModalTypes.Change}
      />
      <ConfirmModal
        isModalVisible={isResetCustomerDataModal}
        setModalVisible={setResetCustomerDataModal}
        text={localization.customer.confirmText}
        onConfirmClick={resetCustomerDataHandler}
        type={ModalTypes.Reset}
      />
    </>
  );
};

export default ChangeProject;
