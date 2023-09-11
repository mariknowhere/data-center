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
import {OBJECT_TITLES, OBJECT_TYPES, selectGropPopupItems} from '../../../../constants/objects';
import {selectInfSystems} from '../../../../store/infSystems/infSystemsSelectors';
import {IPopupItem} from '../../../popup/PopupTypes';
import {selectProjectById} from '../../../../store/projects/projectsSelectors';
import {CREATE_MODAL_OPEN} from '../../../../constants/other';
import {ROUTES} from '../../../../router/routes';
import {selectOtherErrors} from '../../../../store/objects/other/otherSelectors';
import {IOther} from '../../../../store/objects/other/otherTypes';
import {validateOther} from '../../../../utils/validate/objects/validateOther';

import {selectOffices} from '../../../../store/offices/officesSelectors';

import {selectProfileData} from '../../../../store/auth/authSelectors';

import {localization} from '../../../../localization/localization';

import {resetOtherData} from './utils/resetOtherData';

let prepareInfSystems: IPopupItem[] = [];
let prepareOffices: IPopupItem[] = [];

const CreateOther: FC<IModalProps> = ({
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

  const { ip_address_error } = useAppSelector(selectOtherErrors);

  const [other, setOther] = useState<IOther>({
    inf_system: { id: '', name: '' },
    inf_system_id: '',
    office: { id: '', name: '' },
    office_id: '',
    ip_address: '',
    additional_info: '',
  });

  const [groupType, setGroupType] = useState<IPopupItem>({
    text: localization.common.absent,
    value: 'none',
    id: 1,
  });

  const [isCreateOtherModal, setCreateOtherModal] = useState<boolean>(false);
  const [isResetOtherDataModal, setResetOtherDataModal] = useState<boolean>(false);

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

  const addOtherHandler = () => {
    const isValidate = validateOther(other, dispatch);

    if (isValidate && setSecondaryModalVisible && projectId) {
      if (groupType.value === 'inf_system' && other.inf_system?.id) {
        other.inf_system_id = other.inf_system.id;

        delete other.inf_system;
        delete other.office;
        delete other.office_id;
      } else if (groupType.value === 'office' && other.office?.id) {
        other.office_id = other.office?.id;

        delete other.office;
        delete other.inf_system;
        delete other.inf_system_id;
      } else {
        delete other.inf_system;
        delete other.inf_system_id;

        delete other.office;
        delete other.office_id;
      }

      resetOtherData(dispatch, setOther, setGroupType);

      dispatch(createObject({ projectId, object: other, objectType: OBJECT_TYPES.Other }));

      setModalVisible(false);
      setSecondaryModalVisible(false);
    }
  };

  const resetOtherDataHandler = () => resetOtherData(dispatch, setOther, setGroupType);

  const onGroupChangeHandler = (item: IPopupItem) => setGroupType(item);

  const onInfSystemNameChangeHandler = ({ id, text }: IPopupItem) => {
    if (id === 'create') {
      localStorage.setItem(CREATE_MODAL_OPEN, 'true');

      navigate(`${ROUTES.COMMON}${ROUTES.CUSTOMERS}/${customer?.id}/${ROUTES.INF_SYSTEMS}`);
    } else {
      setOther({...other, inf_system: {name: text, id: String(id)}});
    }
  };

  const onOfficeNameChangeHandler = ({ id, text }: IPopupItem) => {
    if (id === 'create') {
      localStorage.setItem(CREATE_MODAL_OPEN, 'true');

      navigate(`${ROUTES.COMMON}${ROUTES.CUSTOMERS}/${customer?.id}/${ROUTES.OFFICES}`);
    } else {
      setOther({...other, office: {name: text, id: String(id)}});
    }
  };

  const onConfirmCreateModalHandler = () => setCreateOtherModal(prevState => !prevState);
  const onConfirmResetModalHandler = () => setResetOtherDataModal(prevState => !prevState);

  return (
    <>
      <Modal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        title={localization.modals.objects.createOtherTitle}
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
              value={other.inf_system?.name}
              popupItems={prepareInfSystems}
              onClick={showPopupHandler}
              onPopupChange={onInfSystemNameChangeHandler}
              onChange={(event) => {
                setOther({...other, inf_system: {name: event.target.value, id: ''}});
              }}
              disabled
            />
          )}
          {groupType.value === 'office' && (
            <InputForm
              text={localization.modals.objects.officeText}
              placeholder={localization.modals.objects.officePlaceholder}
              value={other.office?.name}
              popupItems={prepareOffices}
              onClick={showPopupHandler}
              onPopupChange={onOfficeNameChangeHandler}
              onChange={(event) => {
                setOther({...other, office: {name: event.target.value, id: ''}});
              }}
              disabled
            />
          )}
          <InputForm
            text={localization.modals.objects.ipAddressText}
            placeholder={localization.modals.objects.ipAddressPlaceholder}
            errorMessage={ip_address_error}
            value={other.ip_address}
            onChange={(event) => {
              setOther({...other, ip_address: event.target.value});
            }}
            required
          />
          <InputForm
            text={localization.modals.objects.additionalInfoText}
            placeholder={localization.modals.objects.additionalInfoPlaceholder}
            value={other.additional_info}
            onTextareaChange={(event) => {
              setOther({...other, additional_info: event.target.value});
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
        isModalVisible={isCreateOtherModal}
        setModalVisible={setCreateOtherModal}
        text={OBJECT_TITLES.OTHER}
        onConfirmClick={addOtherHandler}
        type={ModalTypes.Create}
      />
      <ConfirmModal
        isModalVisible={isResetOtherDataModal}
        setModalVisible={setResetOtherDataModal}
        text={localization.modals.objects.otherResetButtonText}
        onConfirmClick={resetOtherDataHandler}
        type={ModalTypes.Reset}
      />
    </>
  );
};

export default CreateOther;
