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
import {selectExternalErrors} from '../../../../store/objects/external/externalSelectors';
import {IExternal} from '../../../../store/objects/external/externalTypes';

import {validateExternal} from '../../../../utils/validate/objects/validateExternal';

import {selectProfileData} from '../../../../store/auth/authSelectors';

import {localization} from '../../../../localization/localization';

import {resetExternalData} from './utils/resetExternalData';

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

  const { ip_address_error } = useAppSelector(selectExternalErrors);

  const [external, setExternal] = useState<IExternal>({
    inf_system: { id: '', name: '' },
    inf_system_id: '',
    ip_address: '',
    additional_info: '',
  });

  const [isCreateExternalModal, setCreateExternalModal] = useState<boolean>(false);
  const [isResetExternalDataModal, setResetExternalDataModal] = useState<boolean>(false);

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

  const addExternalHandler = () => {
    const isValidate = validateExternal(external, dispatch);

    if (isValidate && setSecondaryModalVisible && projectId) {
      if (!external.inf_system?.id || !external.inf_system?.name) {
        delete external.inf_system;
        delete external.inf_system_id;
      } else {
        external.inf_system_id = external.inf_system.id;

        delete external.inf_system;
      }

      resetExternalData(dispatch, setExternal);

      dispatch(createObject({ projectId, object: external, objectType: OBJECT_TYPES.External }));

      setModalVisible(false);
      setSecondaryModalVisible(false);
    }
  };

  const resetExternalDataHandler = () => resetExternalData(dispatch, setExternal);

  const onInfSystemNameChangeHandler = ({ id, text }: IPopupItem) => {
    if (id === 'create') {
      localStorage.setItem(CREATE_MODAL_OPEN, 'true');

      navigate(`${ROUTES.COMMON}${ROUTES.CUSTOMERS}/${customer?.id}/${ROUTES.INF_SYSTEMS}`);
    } else {
      setExternal({...external, inf_system: {name: text, id: String(id)}});
    }
  };

  const onConfirmCreateModalHandler = () => setCreateExternalModal(prevState => !prevState);
  const onConfirmResetModalHandler = () => setResetExternalDataModal(prevState => !prevState);

  return (
    <>
      <Modal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        title={localization.modals.objects.createExternalTitle}
      >
        <div className={styles['modal-inputs']}>
          <InputForm
            text={localization.modals.objects.infSystemText}
            placeholder={localization.modals.objects.infSystemPlaceholder}
            value={external.inf_system?.name}
            popupItems={prepareInfSystems}
            onClick={showPopupHandler}
            onPopupChange={onInfSystemNameChangeHandler}
            onChange={(event) => {
              setExternal({...external, inf_system: {name: event.target.value, id: ''}});
            }}
            disabled
          />
          <InputForm
            text={localization.modals.objects.ipExternalAddressText}
            placeholder={localization.modals.objects.ipExternalAddressPlaceholder}
            errorMessage={ip_address_error}
            value={external.ip_address}
            onChange={(event) => {
              setExternal({...external, ip_address: event.target.value});
            }}
            required
          />
          <InputForm
            text={localization.modals.objects.additionalInfoText}
            placeholder={localization.modals.objects.additionalInfoPlaceholder}
            value={external.additional_info}
            onTextareaChange={(event) => {
              setExternal({...external, additional_info: event.target.value});
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
        isModalVisible={isCreateExternalModal}
        setModalVisible={setCreateExternalModal}
        text={OBJECT_TITLES.EXTERNAL}
        onConfirmClick={addExternalHandler}
        type={ModalTypes.Create}
      />
      <ConfirmModal
        isModalVisible={isResetExternalDataModal}
        setModalVisible={setResetExternalDataModal}
        text={localization.modals.objects.externalResetButtonText}
        onConfirmClick={resetExternalDataHandler}
        type={ModalTypes.Reset}
      />
    </>
  );
};

export default CreateExternal;
