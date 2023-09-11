import {FC, useEffect, useState} from 'react';

import classNames from 'classnames';

import {useParams} from 'react-router-dom';

import Modal from '../Modal';
import {IModalProps} from '../ModalTypes';
import InputForm from '../../inputForm/InputForm';
import styles from '../Modal.module.scss';
import Button from '../../button/Button';
import {InputTypeEnum} from '../../input/InputTypes';
import {useAppDispatch} from '../../../hooks/useAppDispatch';
import {useAppSelector} from '../../../hooks/useAppSelector';
import ConfirmModal from '../general/confirm/ConfirmModal';
import {ModalTypes} from '../general/confirm/ConfirmTypes';
import {ButtonTypeEnum} from '../../button/ButtonTypes';

import {IOffice} from '../../../store/offices/officesTypes';
import {createOffice, getAllOffices} from '../../../store/offices/officesAsync';
import {validateOffice} from '../../../utils/validate/groups/validateOffice';
import {selectOfficeErrors, selectOffices} from '../../../store/offices/officesSelectors';

import {localization} from '../../../localization/localization';

import {resetOfficeData} from './utils/resetOfficeData';

const CreateOffice: FC<IModalProps> = ({ isModalVisible, setModalVisible }) => {
  const dispatch = useAppDispatch();

  const { customerId } = useParams();

  const { allOffices } = useAppSelector(selectOffices);

  const {
    office_name_error,
    address_error,
    responsible_is_error,
    office_security_level_error,
  } = useAppSelector(selectOfficeErrors);

  const [office, setOffice] = useState<IOffice>({
    address: '',
    availability_separate_internet: false,
    availability_wifi: false,
    name: '',
    security_level: null,
    responsible_is: '',
  });

  const [isCreateOfficeModal, setCreateOfficeModal] = useState<boolean>(false);
  const [isResetOfficeDataModal, setResetOfficeDataModal] = useState<boolean>(false);

  useEffect(() => {
    if (allOffices.length === 0) {
      dispatch(getAllOffices({ id: customerId }));
    }
  }, [dispatch, customerId, allOffices.length]);

  const addOfficeHandler = () => {
    const isValidate = validateOffice(office, dispatch, allOffices);

    if (isValidate && customerId) {
      dispatch(createOffice({ office, customerId }));

      resetOfficeData(dispatch, setOffice);

      setModalVisible(false);
    }
  };

  const resetOfficeDataHandler = () => resetOfficeData(dispatch, setOffice);

  const onConfirmCreateModalHandler = () => setCreateOfficeModal(prevState => !prevState);
  const onConfirmResetModalHandler = () => setResetOfficeDataModal(prevState => !prevState);

  return (
    <>
      <Modal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        title={localization.modals.office.createTitle}
      >
        <div className={styles['modal-inputs']}>
          <InputForm
            text={localization.modals.office.nameText}
            placeholder={localization.modals.office.namePlaceholder}
            errorMessage={office_name_error}
            value={office.name}
            onChange={(event) => {
              setOffice({...office, name: event.target.value});
            }}
            required
          />
          <InputForm
            text={localization.modals.office.addressText}
            placeholder={localization.modals.office.addressPlaceholder}
            errorMessage={address_error}
            value={office.address}
            onChange={(event) => {
              setOffice({...office, address: event.target.value});
            }}
            required
          />
          <InputForm
            text={localization.modals.office.responsibleText}
            placeholder={localization.modals.office.responsiblePlaceholder}
            errorMessage={responsible_is_error}
            value={office.responsible_is}
            onChange={(event) => {
              setOffice({...office, responsible_is: event.target.value});
            }}
            required
          />
          <InputForm
            text={localization.modals.office.securityLevelText}
            placeholder={localization.modals.office.securityLevelPlaceholder}
            errorMessage={office_security_level_error}
            value={office.security_level}
            type={InputTypeEnum.Number}
            onChange={(event) => {
              setOffice({...office, security_level: parseInt(event.target.value)});
            }}
            required
          />
          <InputForm
            text={localization.modals.office.availabilityWifiText}
            type={InputTypeEnum.Checkbox}
            value={office.availability_wifi}
            onChange={(event) => {
              setOffice({...office, availability_wifi: event.target.checked});
            }}
          />
          <InputForm
            text={localization.modals.office.availabilitySeparateInternetText}
            type={InputTypeEnum.Checkbox}
            value={office.availability_separate_internet}
            onChange={(event) => {
              setOffice({...office, availability_separate_internet: event.target.checked});
            }}
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
        isModalVisible={isCreateOfficeModal}
        setModalVisible={setCreateOfficeModal}
        text={localization.office.confirmText}
        onConfirmClick={addOfficeHandler}
        type={ModalTypes.Create}
      />
      <ConfirmModal
        isModalVisible={isResetOfficeDataModal}
        setModalVisible={setResetOfficeDataModal}
        text={localization.office.confirmDataText}
        onConfirmClick={resetOfficeDataHandler}
        type={ModalTypes.Reset}
      />
    </>
  );
};

export default CreateOffice;
