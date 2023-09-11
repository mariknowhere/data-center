import {FC, useEffect, useState} from 'react';

import {useNavigate, useParams} from 'react-router-dom';

import classNames from 'classnames';

import Modal from '../../Modal';
import {IModalProps} from '../../ModalTypes';
import InputForm from '../../../inputForm/InputForm';
import styles from '../../Modal.module.scss';
import Button from '../../../button/Button';
import {useAppDispatch} from '../../../../hooks/useAppDispatch';
import {useAppSelector} from '../../../../hooks/useAppSelector';
import {useShowPopup} from '../../../../hooks/useShowPopup';
import ConfirmModal from '../../general/confirm/ConfirmModal';
import {ModalTypes} from '../../general/confirm/ConfirmTypes';


import {ButtonTypeEnum} from '../../../button/ButtonTypes';
import {createObject} from '../../../../store/objects/objectsAsync';
import {OBJECT_TITLES, OBJECT_TYPES} from '../../../../constants/objects';
import {selectInfSystems} from '../../../../store/infSystems/infSystemsSelectors';
import {IPopupItem} from '../../../popup/PopupTypes';
import {selectProjectById} from '../../../../store/projects/projectsSelectors';
import {CREATE_MODAL_OPEN} from '../../../../constants/other';
import {ROUTES} from '../../../../router/routes';
import {selectInternalErrors} from '../../../../store/objects/internal/internalSelectors';

import {IInternal} from '../../../../store/objects/internal/internalTypes';

import {validateInternal} from '../../../../utils/validate/objects/validateInternal';

import {selectProfileData} from '../../../../store/auth/authSelectors';

import {localization} from '../../../../localization/localization';

import {resetInternalData} from './utils/resetInternalData';

let prepareInfSystems: IPopupItem[] = [];

const CreateExternal: FC<IModalProps> = ({
  isModalVisible,
  setModalVisible,
  setSecondaryModalVisible,
}) => {
  const dispatch = useAppDispatch();

  const { projectId } = useParams();
  const navigate = useNavigate();

  const { allInfSystems } = useAppSelector(selectInfSystems);
  const { customer } = useAppSelector(selectProjectById);
  const { role } = useAppSelector(selectProfileData);

  const { showPopupHandler } = useShowPopup();

  const { ip_address_error } = useAppSelector(selectInternalErrors);

  const [internal, setInternal] = useState<IInternal>({
    inf_system: { id: '', name: '' },
    inf_system_id: '',
    ip_address: '',
    additional_info: '',
  });

  const [isCreateInternalModal, setCreateInternalModal] = useState<boolean>(false);
  const [isResetInternalDataModal, setResetInternalDataModal] = useState<boolean>(false);

  useEffect(() => {
    if (role) {
      prepareInfSystems = allInfSystems.map((infSystem) => {
        return {
          text: infSystem.name,
          id: infSystem.id,
        };
      });

      if (role !== 'teamlead') {
        prepareInfSystems[prepareInfSystems.length] = {
          text: localization.infSystem.createButtonText,
          id: 'create',
        };
      }
    }
  }, [allInfSystems, role]);

  const addInternalHandler = () => {
    const isValidate = validateInternal(internal, dispatch);

    if (isValidate && setSecondaryModalVisible && projectId) {
      if (!internal.inf_system?.id || !internal.inf_system?.name) {
        delete internal.inf_system;
        delete internal.inf_system_id;
      } else {
        internal.inf_system_id = internal.inf_system.id;

        delete internal.inf_system;
      }

      resetInternalData(dispatch, setInternal);

      dispatch(createObject({ projectId, object: internal, objectType: OBJECT_TYPES.Internal }));

      setModalVisible(false);
      setSecondaryModalVisible(false);
    }
  };

  const resetInternalDataHandler = () => resetInternalData(dispatch, setInternal);

  const onInfSystemNameChangeHandler = ({ id, text }: IPopupItem) => {
    if (id === 'create') {
      localStorage.setItem(CREATE_MODAL_OPEN, 'true');

      navigate(`${ROUTES.COMMON}${ROUTES.CUSTOMERS}/${customer?.id}/${ROUTES.INF_SYSTEMS}`);
    } else {
      setInternal({...internal, inf_system: {name: text, id: String(id)}});
    }
  };

  const onConfirmCreateModalHandler = () => setCreateInternalModal(prevState => !prevState);
  const onConfirmResetModalHandler = () => setResetInternalDataModal(prevState => !prevState);

  return (
    <>
      <Modal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        title={localization.modals.objects.createInternalTitle}
      >
        <div className={styles['modal-inputs']}>
          <InputForm
            text={localization.modals.objects.infSystemText}
            placeholder={localization.modals.objects.infSystemPlaceholder}
            value={internal.inf_system?.name}
            popupItems={prepareInfSystems}
            onClick={showPopupHandler}
            onPopupChange={onInfSystemNameChangeHandler}
            onChange={(event) => {
              setInternal({...internal, inf_system: {name: event.target.value, id: ''}});
            }}
            disabled
          />
          <InputForm
            text={localization.modals.objects.ipInternalAddressText}
            placeholder={localization.modals.objects.ipInternalAddressPlaceholder}
            errorMessage={ip_address_error}
            value={internal.ip_address}
            onChange={(event) => {
              setInternal({...internal, ip_address: event.target.value});
            }}
            required
          />
          <InputForm
            text={localization.modals.objects.additionalInfoText}
            placeholder={localization.modals.objects.additionalInfoPlaceholder}
            value={internal.additional_info}
            onTextareaChange={(event) => {
              setInternal({...internal, additional_info: event.target.value});
            }}
            textarea
          />
        </div>
        <div className={classNames(styles['modal-buttons'], styles['modal-buttons_between'])}>
          <Button buttonText={localization.common.createButtonText} onClick={onConfirmCreateModalHandler} />
          <Button
            type={ButtonTypeEnum.Red}
            buttonText={localization.common.resetButtonText}
            onClick={onConfirmResetModalHandler}
          />
        </div>
      </Modal>
      <ConfirmModal
        isModalVisible={isCreateInternalModal}
        setModalVisible={setCreateInternalModal}
        text={OBJECT_TITLES.INTERNAL}
        onConfirmClick={addInternalHandler}
        type={ModalTypes.Create}
      />
      <ConfirmModal
        isModalVisible={isResetInternalDataModal}
        setModalVisible={setResetInternalDataModal}
        text={localization.modals.objects.internalResetButtonText}
        onConfirmClick={resetInternalDataHandler}
        type={ModalTypes.Reset}
      />
    </>
  );
};

export default CreateExternal;
