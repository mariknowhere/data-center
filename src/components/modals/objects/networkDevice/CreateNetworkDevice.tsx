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
import {selectNetworkDeviceErrors} from '../../../../store/objects/networkDevices/networkDevicesSelectors';
import {INetworkDevice} from '../../../../store/objects/networkDevices/networkDevicesTypes';
import {validateNetworkDevice} from '../../../../utils/validate/objects/validateNetworkDevice';
import {selectOffices} from '../../../../store/offices/officesSelectors';

import {InputTypeEnum} from '../../../input/InputTypes';

import {selectProjectById} from '../../../../store/projects/projectsSelectors';

import {CREATE_MODAL_OPEN} from '../../../../constants/other';
import {ROUTES} from '../../../../router/routes';
import {selectProfileData} from '../../../../store/auth/authSelectors';

import {localization} from '../../../../localization/localization';

import {resetNetworkDeviceData} from './utils/resetNetworkDeviceData';

let prepareInfSystems: IPopupItem[] = [];
let prepareOffices: IPopupItem[] = [];

const CreateNetworkDevice: FC<IModalProps> = ({
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
  } = useAppSelector(selectNetworkDeviceErrors);

  const [networkDevice, setNetworkDevice] = useState<INetworkDevice>({
    additional_info: '',
    assignment: '',
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
    text: localization.common.absent,
    value: 'none',
    id: 1,
  });

  const [isCreateNetworkDeviceModal, setCreateNetworkDeviceModal] = useState<boolean>(false);
  const [isResetNetworkDeviceDataModal, setResetNetworkDeviceDataModal] = useState<boolean>(false);

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

  const addNetworkDeviceHandler = () => {
    const isValidate = validateNetworkDevice(networkDevice, dispatch);

    if (isValidate && setSecondaryModalVisible && projectId) {
      if (groupType.value === 'inf_system' && networkDevice.inf_system?.id) {
        networkDevice.inf_system_id = networkDevice.inf_system.id;

        delete networkDevice.inf_system;
        delete networkDevice.office;
        delete networkDevice.office_id;
      } else if (groupType.value === 'office' && networkDevice.office?.id) {
        networkDevice.office_id = networkDevice.office?.id;

        delete networkDevice.office;
        delete networkDevice.inf_system;
        delete networkDevice.inf_system_id;
      } else {
        delete networkDevice.inf_system;
        delete networkDevice.inf_system_id;

        delete networkDevice.office;
        delete networkDevice.office_id;
      }

      networkDevice.attacker_model = prepareAttackerModelToEng[networkDevice.attacker_model || ''];
      networkDevice.work_type = prepareWorkTypeToEng[networkDevice.work_type || ''];

      dispatch(createObject({ object: networkDevice, projectId, objectType: OBJECT_TYPES.NetworkDevice }));

      resetNetworkDeviceData(dispatch, setNetworkDevice, setGroupType);

      setModalVisible(false);
      setSecondaryModalVisible(false);
    }
  };

  const resetNetworkDeviceDataHandler = () => resetNetworkDeviceData(dispatch, setNetworkDevice, setGroupType);

  const onGroupChangeHandler = (item: IPopupItem) => setGroupType(item);

  const onInfSystemNameChangeHandler = ({ id, text }: IPopupItem) => {
    if (id === 'create') {
      localStorage.setItem(CREATE_MODAL_OPEN, 'true');

      navigate(`${ROUTES.COMMON}${ROUTES.CUSTOMERS}/${customer?.id}/${ROUTES.INF_SYSTEMS}`);
    } else {
      setNetworkDevice({...networkDevice, inf_system: {name: text, id: String(id)}});
    }
  };
  const onOfficeNameChangeHandler = ({ id, text }: IPopupItem) => {
    if (id === 'create') {
      localStorage.setItem(CREATE_MODAL_OPEN, 'true');

      navigate(`${ROUTES.COMMON}${ROUTES.CUSTOMERS}/${customer?.id}/${ROUTES.OFFICES}`);
    } else {
      setNetworkDevice({...networkDevice, office: {name: text, id: String(id)}});
    }
  };

  const onAttackerModelChangeHandler = ({ text }: IPopupItem) => {
    setNetworkDevice({...networkDevice, attacker_model: text || ''});
  };
  const onWorkTypeChangeHandler = ({ text }: IPopupItem) => {
    setNetworkDevice({...networkDevice, work_type: text || ''});
  };

  const onConfirmCreateModalHandler = () => setCreateNetworkDeviceModal(prevState => !prevState);
  const onConfirmResetModalHandler = () => setResetNetworkDeviceDataModal(prevState => !prevState);

  return (
    <>
      <Modal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        title={localization.modals.objects.createNetworkDeviceTitle}
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
              value={networkDevice.inf_system?.name}
              popupItems={prepareInfSystems}
              onClick={showPopupHandler}
              onPopupChange={onInfSystemNameChangeHandler}
              onChange={(event) => {
                setNetworkDevice({...networkDevice, inf_system: {name: event.target.value, id: ''}});
              }}
              disabled
            />
          )}
          {groupType.value === 'office' && (
            <InputForm
              text={localization.modals.objects.officeText}
              placeholder={localization.modals.objects.officePlaceholder}
              value={networkDevice.office?.name}
              popupItems={prepareOffices}
              onClick={showPopupHandler}
              onPopupChange={onOfficeNameChangeHandler}
              onChange={(event) => {
                setNetworkDevice({...networkDevice, office: {name: event.target.value, id: ''}});
              }}
              disabled
            />
          )}
          <InputForm
            text={localization.modals.objects.ipAddressText}
            placeholder={localization.modals.objects.ipInternalAddressPlaceholder}
            errorMessage={ip_address_error}
            value={networkDevice.ip_address}
            onChange={(event) => {
              setNetworkDevice({...networkDevice, ip_address: event.target.value});
            }}
            required
          />
          <InputForm
            text={localization.modals.objects.networkDeviceText}
            placeholder={localization.modals.objects.networkDevicePlaceholder}
            value={networkDevice.network_device_name}
            onChange={(event) => {
              setNetworkDevice({...networkDevice, network_device_name: event.target.value});
            }}
          />
          <InputForm
            text={localization.modals.objects.assignmentText}
            placeholder={localization.modals.objects.assignmentPlaceholder}
            value={networkDevice.assignment}
            onTextareaChange={(event) => {
              setNetworkDevice({...networkDevice, assignment: event.target.value});
            }}
            textarea
          />
          <InputForm
            text={localization.modals.objects.attackerModelText}
            placeholder={localization.modals.objects.attackerModelPlaceholder}
            errorMessage={attacker_model_error}
            popupItems={attackerModelPopupItems}
            value={networkDevice.attacker_model}
            onClick={showPopupHandler}
            onPopupChange={onAttackerModelChangeHandler}
            onChange={(event) => {
              setNetworkDevice({...networkDevice, attacker_model: event.target.value});
            }}
            disabled
            required
          />
          <InputForm
            text={localization.modals.objects.workTypeText}
            placeholder={localization.modals.objects.workTypePlaceholder}
            errorMessage={work_type_error}
            popupItems={workTypePopupItems}
            value={networkDevice.work_type}
            onClick={showPopupHandler}
            onPopupChange={onWorkTypeChangeHandler}
            onChange={(event) => {
              setNetworkDevice({...networkDevice, work_type: event.target.value});
            }}
            disabled
            required
          />
          <InputForm
            text={localization.modals.objects.additionalInfoText}
            placeholder={localization.modals.objects.additionalInfoPlaceholder}
            value={networkDevice.additional_info}
            onTextareaChange={(event) => {
              setNetworkDevice({...networkDevice, additional_info: event.target.value});
            }}
            textarea
          />
          <InputForm
            text={localization.modals.objects.greyboxText}
            type={InputTypeEnum.Checkbox}
            value={networkDevice.greybox}
            onChange={(event) => {
              setNetworkDevice({...networkDevice, greybox: event.target.checked });
            }}
          />
          <InputForm
            text={localization.modals.objects.blackboxText}
            errorMessage={test_method_error}
            type={InputTypeEnum.Checkbox}
            value={networkDevice.blackbox}
            onChange={(event) => {
              setNetworkDevice({...networkDevice, blackbox: event.target.checked });
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
        isModalVisible={isCreateNetworkDeviceModal}
        setModalVisible={setCreateNetworkDeviceModal}
        text={OBJECT_TITLES.NETWORK_DEVICE}
        onConfirmClick={addNetworkDeviceHandler}
        type={ModalTypes.Create}
      />
      <ConfirmModal
        isModalVisible={isResetNetworkDeviceDataModal}
        setModalVisible={setResetNetworkDeviceDataModal}
        text={localization.modals.objects.networkDeviceResetButtonText}
        onConfirmClick={resetNetworkDeviceDataHandler}
        type={ModalTypes.Reset}
      />
    </>
  );
};

export default CreateNetworkDevice;
