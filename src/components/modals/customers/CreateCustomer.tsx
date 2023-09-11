import {FC, useEffect, useState} from 'react';

import classNames from 'classnames';

import Modal from '../Modal';
import {IModalProps} from '../ModalTypes';
import InputForm from '../../inputForm/InputForm';
import styles from '../Modal.module.scss';
import Button from '../../button/Button';
import {useAppDispatch} from '../../../hooks/useAppDispatch';
import {useAppSelector} from '../../../hooks/useAppSelector';
import {ICustomer} from '../../../store/customers/customersTypes';
import {selectCustomerErrors, selectCustomers} from '../../../store/customers/customersSelectors';
import {createCustomer, getAllCustomers} from '../../../store/customers/customersAsync';
import {validateCustomer} from '../../../utils/validate/validateCustomer';
import {InputTypeEnum} from '../../input/InputTypes';
import ConfirmModal from '../general/confirm/ConfirmModal';
import {ModalTypes} from '../general/confirm/ConfirmTypes';
import {ButtonTypeEnum} from '../../button/ButtonTypes';
import {useShowPopup} from '../../../hooks/useShowPopup';
import {IPopupItem} from '../../popup/PopupTypes';
import {customerTypePopupItems, prepareCustomerTypeToEng} from '../../../constants/costumer';

import {localization} from '../../../localization/localization';

import {resetOfficeData} from './utils/resetCustomerData';

const CreateCustomer: FC<IModalProps> = ({ isModalVisible, setModalVisible }) => {
  const dispatch = useAppDispatch();

  const { allCustomers } = useAppSelector(selectCustomers);

  const { showPopupHandler } = useShowPopup();

  const {
    customer_name_error,
    inn_error,
    customer_type_error,
    number_employees_error,
  } = useAppSelector(selectCustomerErrors);

  const [customer, setCustomer] = useState<ICustomer>({
    customer_name: '',
    customer_type: '',
    inn: null,
    number_employees: null,
  });

  const [isCreateCustomerModal, setCreateCustomerModal] = useState<boolean>(false);
  const [isResetCustomerDataModal, setResetCustomerDataModal] = useState<boolean>(false);

  useEffect(() => {
    if (allCustomers.length === 0) {
      dispatch(getAllCustomers({}));
    }
  }, [dispatch, allCustomers.length]);

  const addCustomerHandler = () => {
    const isValidate = validateCustomer(customer, dispatch, allCustomers);

    if (isValidate) {
      customer.customer_type = prepareCustomerTypeToEng[customer.customer_type];

      dispatch(createCustomer(customer));

      resetOfficeData(dispatch, setCustomer);

      setModalVisible(false);
    }
  };

  const resetCustomerDataHandler = () => resetOfficeData(dispatch, setCustomer);

  const onCustomerTypeChange = (item: IPopupItem) => setCustomer({ ...customer, customer_type: item.text || '' });

  const onConfirmCreateModalHandler = () => setCreateCustomerModal(prevState => !prevState);
  const onConfirmResetModalHandler = () => setResetCustomerDataModal(prevState => !prevState);

  return (
    <>
      <Modal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        title={localization.modals.customer.createTitle}
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
            value={customer.customer_type}
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
          <Button buttonText={localization.modals.createButtonText} onClick={onConfirmCreateModalHandler} />
          <Button
            type={ButtonTypeEnum.Red}
            buttonText={localization.modals.resetButtonText}
            onClick={onConfirmResetModalHandler}
          />
        </div>
      </Modal>
      <ConfirmModal
        isModalVisible={isCreateCustomerModal}
        setModalVisible={setCreateCustomerModal}
        text={localization.customer.confirmText}
        onConfirmClick={addCustomerHandler}
        type={ModalTypes.Create}
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

export default CreateCustomer;
