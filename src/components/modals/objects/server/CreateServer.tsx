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
import {IServer} from '../../../../store/objects/servers/serversTypes';
import {validateServer} from '../../../../utils/validate/objects/validateServer';
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
import {selectServerErrors} from '../../../../store/objects/servers/serversSelectors';
import {selectInfSystems} from '../../../../store/infSystems/infSystemsSelectors';
import {selectOffices} from '../../../../store/offices/officesSelectors';

import {InputTypeEnum} from '../../../input/InputTypes';

import {selectProjectById} from '../../../../store/projects/projectsSelectors';

import {CREATE_MODAL_OPEN} from '../../../../constants/other';
import {ROUTES} from '../../../../router/routes';
import {selectProfileData} from '../../../../store/auth/authSelectors';

import {localization} from '../../../../localization/localization';

import {resetServerData} from './utils/resetServerData';

let prepareInfSystems: IPopupItem[] = [];
let prepareOffices: IPopupItem[] = [];

const CreateServer: FC<IModalProps> = ({
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
  } = useAppSelector(selectServerErrors);

  const [server, setServer] = useState<IServer>({
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

  const [isCreateServerModal, setCreateServerModal] = useState<boolean>(false);
  const [isResetServerDataModal, setResetServerDataModal] = useState<boolean>(false);

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

  const addServerHandler = () => {
    const isValidate = validateServer(server, dispatch);

    if (isValidate && setSecondaryModalVisible && projectId) {
      if (groupType.value === 'inf_system' && server.inf_system?.id) {
        server.inf_system_id = server.inf_system.id;

        delete server.inf_system;
        delete server.office;
        delete server.office_id;
      } else if (groupType.value === 'office' && server.office?.id) {
        server.office_id = server.office?.id;

        delete server.office;
        delete server.inf_system;
        delete server.inf_system_id;
      } else {
        delete server.inf_system;
        delete server.inf_system_id;

        delete server.office;
        delete server.office_id;
      }

      server.attacker_model = prepareAttackerModelToEng[server.attacker_model || ''];
      server.work_type = prepareWorkTypeToEng[server.work_type || ''];

      dispatch(createObject({ object: server, projectId, objectType: OBJECT_TYPES.Server }));

      resetServerData(dispatch, setServer, setGroupType);

      setModalVisible(false);
      setSecondaryModalVisible(false);
    }
  };

  const resetServerDataHandler = () => resetServerData(dispatch, setServer, setGroupType);

  const onGroupChangeHandler = (item: IPopupItem) => setGroupType(item);

  const onInfSystemNameChangeHandler = ({ id, text }: IPopupItem) => {
    if (id === 'create') {
      localStorage.setItem(CREATE_MODAL_OPEN, 'true');

      navigate(`${ROUTES.COMMON}${ROUTES.CUSTOMERS}/${customer?.id}/${ROUTES.INF_SYSTEMS}`);
    } else {
      setServer({...server, inf_system: {name: text, id: String(id)}});
    }
  };
  const onOfficeNameChangeHandler = ({ id, text }: IPopupItem) => {
    if (id === 'create') {
      localStorage.setItem(CREATE_MODAL_OPEN, 'true');

      navigate(`${ROUTES.COMMON}${ROUTES.CUSTOMERS}/${customer?.id}/${ROUTES.OFFICES}`);
    } else {
      setServer({...server, office: {name: text, id: String(id)}});
    }
  };

  const onAttackerModelChangeHandler = ({ text }: IPopupItem) => {
    setServer({...server, attacker_model: text || ''});
  };
  const onWorkTypeChangeHandler = ({ text }: IPopupItem) => setServer({ ...server, work_type: text || '' });

  const onConfirmCreateModalHandler = () => setCreateServerModal(prevState => !prevState);
  const onConfirmResetModalHandler = () => setResetServerDataModal(prevState => !prevState);

  return (
    <>
      <Modal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        title={localization.modals.objects.createServerTitle}
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
              value={server.inf_system?.name}
              popupItems={prepareInfSystems}
              onClick={showPopupHandler}
              onPopupChange={onInfSystemNameChangeHandler}
              onChange={(event) => {
                setServer({...server, inf_system: {name: event.target.value, id: ''}});
              }}
              disabled
            />
          )}
          {groupType.value === 'office' && (
            <InputForm
              text={localization.modals.objects.officeText}
              placeholder={localization.modals.objects.officePlaceholder}
              value={server.office?.name}
              popupItems={prepareOffices}
              onClick={showPopupHandler}
              onPopupChange={onOfficeNameChangeHandler}
              onChange={(event) => {
                setServer({...server, office: {name: event.target.value, id: ''}});
              }}
              disabled
            />
          )}
          <InputForm
            text={localization.modals.objects.ipAddressText}
            placeholder={localization.modals.objects.ipAddressPlaceholder}
            errorMessage={ip_address_error}
            value={server.ip_address}
            onChange={(event) => {
              setServer({...server, ip_address: event.target.value});
            }}
            required
          />
          <InputForm
            text={localization.modals.objects.networkDeviceText}
            placeholder={localization.modals.objects.networkDevicePlaceholder}
            value={server.network_device_name}
            onChange={(event) => {
              setServer({...server, network_device_name: event.target.value});
            }}
          />
          <InputForm
            text={localization.modals.objects.assignmentText}
            placeholder={localization.modals.objects.assignmentPlaceholder}
            value={server.assignment}
            onTextareaChange={(event) => {
              setServer({...server, assignment: event.target.value});
            }}
            textarea
          />
          <InputForm
            text={localization.modals.objects.attackerModelText}
            placeholder={localization.modals.objects.attackerModelPlaceholder}
            errorMessage={attacker_model_error}
            popupItems={attackerModelPopupItems}
            value={server.attacker_model}
            onClick={showPopupHandler}
            onPopupChange={onAttackerModelChangeHandler}
            onChange={(event) => {
              setServer({...server, attacker_model: event.target.value});
            }}
            disabled
            required
          />
          <InputForm
            text={localization.modals.objects.workTypeText}
            placeholder={localization.modals.objects.workTypePlaceholder}
            errorMessage={work_type_error}
            popupItems={workTypePopupItems}
            value={server.work_type}
            onClick={showPopupHandler}
            onPopupChange={onWorkTypeChangeHandler}
            onChange={(event) => {
              setServer({...server, work_type: event.target.value});
            }}
            disabled
            required
          />
          <InputForm
            text={localization.modals.objects.additionalInfoText}
            placeholder={localization.modals.objects.additionalInfoPlaceholder}
            value={server.additional_info}
            onTextareaChange={(event) => {
              setServer({...server, additional_info: event.target.value});
            }}
            textarea
          />
          <InputForm
            text={localization.modals.objects.greyboxText}
            type={InputTypeEnum.Checkbox}
            value={server.greybox}
            onChange={(event) => {
              setServer({...server, greybox: event.target.checked });
            }}
          />
          <InputForm
            text={localization.modals.objects.blackboxText}
            errorMessage={test_method_error}
            type={InputTypeEnum.Checkbox}
            value={server.blackbox}
            onChange={(event) => {
              setServer({...server, blackbox: event.target.checked });
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
        isModalVisible={isCreateServerModal}
        setModalVisible={setCreateServerModal}
        text={OBJECT_TITLES.SERVER}
        onConfirmClick={addServerHandler}
        type={ModalTypes.Create}
      />
      <ConfirmModal
        isModalVisible={isResetServerDataModal}
        setModalVisible={setResetServerDataModal}
        text={localization.modals.objects.serverResetButtonText}
        onConfirmClick={resetServerDataHandler}
        type={ModalTypes.Reset}
      />
    </>
  );
};

export default CreateServer;
