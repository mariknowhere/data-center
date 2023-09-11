import {FC, useEffect, useState} from 'react';

import {useParams} from 'react-router-dom';

import classNames from 'classnames';

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
import {changeOffice} from '../../../store/offices/officesAsync';
import {validateOffice} from '../../../utils/validate/groups/validateOffice';
import {selectOfficeById, selectOfficeErrors, selectOffices} from '../../../store/offices/officesSelectors';

import {localization} from '../../../localization/localization';

import {resetOfficeData} from './utils/resetOfficeData';

const ChangeOffice: FC<IModalProps> = ({ isModalVisible, setModalVisible }) => {
  const dispatch = useAppDispatch();

  const { customerId, officeId } = useParams();

  const { allOffices } = useAppSelector(selectOffices);

  const {
    office_name_error,
    address_error,
    responsible_is_error,
    office_security_level_error,
  } = useAppSelector(selectOfficeErrors);

  const {
    name,
    address,
    availability_wifi,
    responsible_is,
    availability_separate_internet,
    security_level,
  }: IOffice = useAppSelector(selectOfficeById);

  const [office, setOffice] = useState<IOffice>({
    address: address,
    availability_separate_internet: availability_separate_internet,
    availability_wifi: availability_wifi,
    name: name,
    security_level: security_level,
    responsible_is: responsible_is,
    id: officeId,
  });

  const [isChangeOfficeModal, setChangeOfficeModal] = useState<boolean>(false);
  const [isResetOfficeDataModal, setResetOfficeDataModal] = useState<boolean>(false);

  useEffect(() => {
    setOffice({
      address: address,
      availability_separate_internet: availability_separate_internet,
      availability_wifi: availability_wifi,
      name: name,
      security_level: security_level,
      responsible_is: responsible_is,
      id: officeId,
    });
  }, [name, address, availability_separate_internet, availability_wifi, security_level, responsible_is, officeId]);

  const changeOfficeHandler = () => {
    const isValidate = validateOffice(office, dispatch, allOffices);

    if (isValidate && customerId && officeId) {
      dispatch(changeOffice({ customerId, office, officeId }));

      setModalVisible(false);
    }
  };

  const resetOfficeDataHandler = () => resetOfficeData(dispatch, setOffice);

  const onConfirmChangeModalHandler = () => setChangeOfficeModal(prevState => !prevState);
  const onConfirmResetModalHandler = () => setResetOfficeDataModal(prevState => !prevState);

  return (
    <>
      <Modal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        title={localization.modals.office.changeTitle}
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
          <Button buttonText={localization.common.changeButtonText} onClick={onConfirmChangeModalHandler} />
          <Button
            type={ButtonTypeEnum.Red}
            buttonText={localization.modals.resetButtonText}
            onClick={onConfirmResetModalHandler}
          />
        </div>
      </Modal>
      <ConfirmModal
        isModalVisible={isChangeOfficeModal}
        setModalVisible={setChangeOfficeModal}
        text={localization.office.confirmDataText}
        onConfirmClick={changeOfficeHandler}
        type={ModalTypes.Change}
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

export default ChangeOffice;
