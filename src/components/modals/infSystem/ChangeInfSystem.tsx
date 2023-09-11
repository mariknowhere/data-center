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
import {IInfSystem} from '../../../store/infSystems/infSystemsTypes';
import {changeInfSystem} from '../../../store/infSystems/infSystemsAsync';
import {validateInfSystem} from '../../../utils/validate/groups/validateInfSystem';
import {
  selectInfSystemById,
  selectInfSystemErrors,
  selectInfSystems,
} from '../../../store/infSystems/infSystemsSelectors';

import {localization} from '../../../localization/localization';

import {resetInfSystemData} from './utils/resetInfSystemData';

const ChangeInfSystem: FC<IModalProps> = ({ isModalVisible, setModalVisible }) => {
  const dispatch = useAppDispatch();

  const { customerId, infSystemId } = useParams();

  const { allInfSystems } = useAppSelector(selectInfSystems);

  const {
    inf_system_name_error,
    web_interface_address_error,
    inf_system_security_level_error,
    product_error,
    product_manager_error,
    inf_system_contact_person_error,
  } = useAppSelector(selectInfSystemErrors);

  const {
    name,
    availability_interface,
    web_interface_address,
    security_level,
    product,
    product_manager,
    inf_system_contact_person,
  }: IInfSystem = useAppSelector(selectInfSystemById);

  const [infSystem, setInfSystem] = useState<IInfSystem>({
    availability_interface: availability_interface,
    inf_system_contact_person: inf_system_contact_person,
    name: name,
    security_level: security_level,
    product: product,
    product_manager: product_manager,
    web_interface_address: web_interface_address,
    id: infSystemId,
  });

  const [isChangeProjectModal, setChangeProjectModal] = useState<boolean>(false);
  const [isResetProjectDataModal, setResetProjectDataModal] = useState<boolean>(false);

  useEffect(() => {
    setInfSystem({
      availability_interface: availability_interface,
      inf_system_contact_person: inf_system_contact_person,
      name: name,
      security_level: security_level,
      product: product,
      product_manager: product_manager,
      web_interface_address: web_interface_address,
      id: infSystemId,
    });
  }, [name, availability_interface, inf_system_contact_person, security_level, product, product_manager,
    web_interface_address, infSystemId]);

  const changeInfSystemHandler = () => {
    const isValidate = validateInfSystem(infSystem, dispatch, allInfSystems);

    if (isValidate && customerId && infSystemId) {
      dispatch(changeInfSystem({ customerId, infSystem, infSystemId }));

      setModalVisible(false);
    }
  };

  const resetInfSystemDataHandler = () => resetInfSystemData(dispatch, setInfSystem);

  const onConfirmChangeModalHandler = () => setChangeProjectModal(prevState => !prevState);
  const onConfirmResetModalHandler = () => setResetProjectDataModal(prevState => !prevState);

  return (
    <>
      <Modal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        title={localization.modals.infSystem.changeTitle}
      >
        <div className={styles['modal-inputs']}>
          <InputForm
            text={localization.modals.infSystem.nameText}
            placeholder={localization.modals.infSystem.namePlaceholder}
            errorMessage={inf_system_name_error}
            value={infSystem.name}
            onChange={(event) => {
              setInfSystem({...infSystem, name: event.target.value});
            }}
            required
          />
          <InputForm
            text={localization.modals.infSystem.webInterfaceText}
            placeholder={localization.modals.infSystem.webInterfacePlaceholder}
            errorMessage={web_interface_address_error}
            value={infSystem.web_interface_address}
            onChange={(event) => {
              setInfSystem({...infSystem, web_interface_address: event.target.value});
            }}
            required
          />
          <InputForm
            text={localization.modals.infSystem.securityLevelText}
            placeholder={localization.modals.infSystem.securityLevelPlaceholder}
            errorMessage={inf_system_security_level_error}
            value={infSystem.security_level}
            type={InputTypeEnum.Number}
            onChange={(event) => {
              setInfSystem({...infSystem, security_level: parseInt(event.target.value)});
            }}
            required
          />
          <InputForm
            text={localization.modals.infSystem.productText}
            placeholder={localization.modals.infSystem.productPlaceholder}
            errorMessage={product_error}
            value={infSystem.product}
            onChange={(event) => {
              setInfSystem({...infSystem, product: event.target.value});
            }}
            required
          />
          <InputForm
            text={localization.modals.infSystem.productManagerText}
            placeholder={localization.modals.infSystem.productManagerPlaceholder}
            errorMessage={product_manager_error}
            value={infSystem.product_manager}
            onChange={(event) => {
              setInfSystem({...infSystem, product_manager: event.target.value});
            }}
            required
          />
          <InputForm
            text={localization.modals.infSystem.contactPersonText}
            placeholder={localization.modals.infSystem.contactPersonPlaceholder}
            errorMessage={inf_system_contact_person_error}
            value={infSystem.inf_system_contact_person}
            onChange={(event) => {
              setInfSystem({...infSystem, inf_system_contact_person: event.target.value});
            }}
            required
          />
          <InputForm
            text={localization.modals.infSystem.availabilityInterfaceText}
            type={InputTypeEnum.Checkbox}
            value={infSystem.availability_interface}
            onChange={(event) => {
              setInfSystem({...infSystem, availability_interface: event.target.checked});
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
        isModalVisible={isChangeProjectModal}
        setModalVisible={setChangeProjectModal}
        text={localization.infSystem.confirmDataText}
        onConfirmClick={changeInfSystemHandler}
        type={ModalTypes.Change}
      />
      <ConfirmModal
        isModalVisible={isResetProjectDataModal}
        setModalVisible={setResetProjectDataModal}
        text={localization.infSystem.confirmDataText}
        onConfirmClick={resetInfSystemDataHandler}
        type={ModalTypes.Reset}
      />
    </>
  );
};

export default ChangeInfSystem;
