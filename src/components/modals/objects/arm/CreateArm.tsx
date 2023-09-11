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
import {IPopupItem} from '../../../popup/PopupTypes';
import ConfirmModal from '../../general/confirm/ConfirmModal';
import {ModalTypes} from '../../general/confirm/ConfirmTypes';
import {ButtonTypeEnum} from '../../../button/ButtonTypes';


import {createObject} from '../../../../store/objects/objectsAsync';
import {
  attackerModelPopupItems,
  OBJECT_TITLES,
  OBJECT_TYPES,
  prepareAttackerModelToEng,
  prepareWorkTypeToEng,
  selectGropPopupItems,
  workTypePopupItems,
} from '../../../../constants/objects';
import {selectInfSystems} from '../../../../store/infSystems/infSystemsSelectors';
import {selectArmErrors} from '../../../../store/objects/arm/armSelectors';
import {IArm} from '../../../../store/objects/arm/armTypes';
import {validateArm} from '../../../../utils/validate/objects/validateArm';
import {selectOffices} from '../../../../store/offices/officesSelectors';

import {InputTypeEnum} from '../../../input/InputTypes';

import {CREATE_MODAL_OPEN} from '../../../../constants/other';

import {ROUTES} from '../../../../router/routes';
import {selectProjectById} from '../../../../store/projects/projectsSelectors';
import {selectProfileData} from '../../../../store/auth/authSelectors';

import {localization} from '../../../../localization/localization';

import {resetArmData} from './utils/resetArmData';

let prepareInfSystems: IPopupItem[] = [];
let prepareOffices: IPopupItem[] = [];

const CreateArm: FC<IModalProps> = ({
  isModalVisible,
  setModalVisible,
  setSecondaryModalVisible,
}) => {
  const dispatch = useAppDispatch();

  const { projectId } = useParams();
  const navigate = useNavigate();

  const { allInfSystems } = useAppSelector(selectInfSystems);
  const { allOffices } = useAppSelector(selectOffices);
  const { customer } = useAppSelector(selectProjectById);
  const { role } = useAppSelector(selectProfileData);

  const { showPopupHandler } = useShowPopup();

  const {
    work_type_error,
    attacker_model_error,
    ip_address_error,
    test_method_error,
  } = useAppSelector(selectArmErrors);

  const [arm, setArm] = useState<IArm>({
    additional_info: '',
    attacker_model: '',
    inf_system: { id: '', name: '' },
    office: { id: '', name: '' },
    ip_address: '',
    network_device_name: '',
    greybox: false,
    blackbox: false,
    work_type: '',
  });

  const [groupType, setGroupType] = useState<IPopupItem>({
    text: 'Отсутствует',
    value: 'none',
    id: 1,
  });

  const [isCreateArmModal, setCreateArmModal] = useState<boolean>(false);
  const [isResetArmDataModal, setResetArmDataModal] = useState<boolean>(false);

  useEffect(() => {
    if (role) {
      prepareInfSystems = allInfSystems.map((infSystem) => {
        return {
          text: infSystem.name,
          id: infSystem.id,
        };
      });

      prepareOffices = allOffices.map((office) => {
        return {
          text: office.name,
          id: office.id,
        };
      });

      if (role !== 'teamlead') {
        prepareInfSystems[prepareInfSystems.length] = {
          text: localization.infSystem.createButtonText,
          id: 'create',
        };

        prepareOffices[prepareOffices.length] = {
          text: localization.office.createButtonText,
          id: 'create',
        };
      }
    }
  }, [allInfSystems, allOffices, role]);

  const addArmHandler = () => {
    const isValidate = validateArm(arm, dispatch);

    if (isValidate && setSecondaryModalVisible && projectId) {
      if (groupType.value === 'inf_system' && arm.inf_system?.id) {
        arm.inf_system_id = arm.inf_system.id;

        delete arm.inf_system;
        delete arm.office;
        delete arm.office_id;
      } else if (groupType.value === 'office' && arm.office?.id) {
        arm.office_id = arm.office?.id;

        delete arm.office;
        delete arm.inf_system;
        delete arm.inf_system_id;
      } else {
        delete arm.inf_system;
        delete arm.inf_system_id;

        delete arm.office;
        delete arm.office_id;
      }

      arm.attacker_model = prepareAttackerModelToEng[arm.attacker_model || ''];
      arm.work_type = prepareWorkTypeToEng[arm.work_type || ''];

      dispatch(createObject({ object: arm, projectId, objectType: OBJECT_TYPES.ARM }));

      resetArmData(dispatch, setArm, setGroupType);

      setModalVisible(false);
      setSecondaryModalVisible(false);
    }
  };

  const resetArmDataHandler = () => resetArmData(dispatch, setArm, setGroupType);

  const onGroupChangeHandler = (item: IPopupItem) => setGroupType(item);

  const onInfSystemNameChangeHandler = ({ id, text }: IPopupItem) => {
    if (id === 'create') {
      localStorage.setItem(CREATE_MODAL_OPEN, 'true');

      navigate(`${ROUTES.COMMON}${ROUTES.CUSTOMERS}/${customer?.id}/${ROUTES.INF_SYSTEMS}`);
    } else {
      setArm({...arm, inf_system: {name: text, id: String(id)}});
    }
  };

  const onOfficeNameChangeHandler = ({ id, text }: IPopupItem) => {
    if (id === 'create') {
      localStorage.setItem(CREATE_MODAL_OPEN, 'true');

      navigate(`${ROUTES.COMMON}${ROUTES.CUSTOMERS}/${customer?.id}/${ROUTES.OFFICES}`);
    } else {
      setArm({...arm, office: {name: text, id: String(id)}});
    }
  };

  const onAttackerModelChangeHandler = ({ text }: IPopupItem) => setArm({ ...arm, attacker_model: text || '' });
  const onWorkTypeChangeHandler = ({ text }: IPopupItem) => setArm({ ...arm, work_type: text || '' });

  const onConfirmCreateModalHandler = () => setCreateArmModal(prevState => !prevState);
  const onConfirmResetModalHandler = () => setResetArmDataModal(prevState => !prevState);

  return (
    <>
      <Modal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        title={localization.modals.objects.createArmTitle}
      >
        <div className={styles['modal-inputs']}>
          <InputForm
            text={localization.modals.objects.groupTypeText}
            placeholder={localization.modals.objects.groupTypePlaceholder}
            value={groupType.text}
            popupItems={selectGropPopupItems}
            onClick={showPopupHandler}
            onPopupChange={onGroupChangeHandler}
            disabled
          />
          {groupType.value === 'inf_system' && (
            <InputForm
              text={localization.modals.objects.infSystemText}
              placeholder={localization.modals.objects.infSystemPlaceholder}
              value={arm.inf_system?.name}
              popupItems={prepareInfSystems}
              onClick={showPopupHandler}
              onPopupChange={onInfSystemNameChangeHandler}
              onChange={(event) => {
                setArm({...arm, inf_system: {name: event.target.value, id: ''}});
              }}
              disabled
            />
          )}
          {groupType.value === 'office' && (
            <InputForm
              text={localization.modals.objects.officeText}
              placeholder={localization.modals.objects.officePlaceholder}
              value={arm.office?.name}
              popupItems={prepareOffices}
              onClick={showPopupHandler}
              onPopupChange={onOfficeNameChangeHandler}
              onChange={(event) => {
                setArm({...arm, office: {name: event.target.value, id: ''}});
              }}
              disabled
            />
          )}
          <InputForm
            text={localization.modals.objects.ipAddressText}
            placeholder={localization.modals.objects.ipAddressPlaceholder}
            errorMessage={ip_address_error}
            value={arm.ip_address}
            onChange={(event) => {
              setArm({...arm, ip_address: event.target.value});
            }}
            required
          />
          <InputForm
            text={localization.modals.objects.networkDeviceText}
            placeholder={localization.modals.objects.networkDevicePlaceholder}
            value={arm.network_device_name}
            onChange={(event) => {
              setArm({...arm, network_device_name: event.target.value});
            }}
          />
          <InputForm
            text={localization.modals.objects.attackerModelText}
            placeholder={localization.modals.objects.attackerModelPlaceholder}
            errorMessage={attacker_model_error}
            popupItems={attackerModelPopupItems}
            value={arm.attacker_model}
            onClick={showPopupHandler}
            onPopupChange={onAttackerModelChangeHandler}
            onChange={(event) => {
              setArm({...arm, attacker_model: event.target.value});
            }}
            disabled
            required
          />
          <InputForm
            text={localization.modals.objects.workTypeText}
            placeholder={localization.modals.objects.workTypePlaceholder}
            errorMessage={work_type_error}
            popupItems={workTypePopupItems}
            value={arm.work_type}
            onClick={showPopupHandler}
            onPopupChange={onWorkTypeChangeHandler}
            onChange={(event) => {
              setArm({...arm, work_type: event.target.value});
            }}
            disabled
            required
          />
          <InputForm
            text={localization.modals.objects.additionalInfoText}
            placeholder={localization.modals.objects.additionalInfoPlaceholder}
            value={arm.additional_info}
            onTextareaChange={(event) => {
              setArm({...arm, additional_info: event.target.value});
            }}
            textarea
          />
          <InputForm
            text={localization.modals.objects.greyboxText}
            type={InputTypeEnum.Checkbox}
            value={arm.greybox}
            onChange={(event) => {
              setArm({...arm, greybox: event.target.checked });
            }}
          />
          <InputForm
            text={localization.modals.objects.blackboxText}
            errorMessage={test_method_error}
            type={InputTypeEnum.Checkbox}
            value={arm.blackbox}
            onChange={(event) => {
              setArm({...arm, blackbox: event.target.checked });
            }}
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
        isModalVisible={isCreateArmModal}
        setModalVisible={setCreateArmModal}
        text={OBJECT_TITLES.ARM}
        onConfirmClick={addArmHandler}
        type={ModalTypes.Create}
      />
      <ConfirmModal
        isModalVisible={isResetArmDataModal}
        setModalVisible={setResetArmDataModal}
        text={OBJECT_TITLES.ARM}
        onConfirmClick={resetArmDataHandler}
        type={ModalTypes.Reset}
      />
    </>
  );
};

export default CreateArm;
