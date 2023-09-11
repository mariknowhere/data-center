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
  workTypePopupItems,
} from '../../../../constants/objects';
import {selectInfSystems} from '../../../../store/infSystems/infSystemsSelectors';
import {selectApiErrors} from '../../../../store/objects/api/apiSelectors';
import {IApi} from '../../../../store/objects/api/apiTypes';
import {validateApi} from '../../../../utils/validate/objects/validateApi';

import {InputTypeEnum} from '../../../input/InputTypes';

import {ROUTES} from '../../../../router/routes';

import {selectProjectById} from '../../../../store/projects/projectsSelectors';
import {CREATE_MODAL_OPEN} from '../../../../constants/other';
import {selectProfileData} from '../../../../store/auth/authSelectors';

import {localization} from '../../../../localization/localization';

import {resetApiData} from './utils/resetApiData';

let prepareInfSystems: IPopupItem[] = [];

const CreateApi: FC<IModalProps> = ({
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

  const {
    work_type_error,
    attacker_model_error,
    ip_address_error,
    test_method_error,
  } = useAppSelector(selectApiErrors);

  const [api, setApi] = useState<IApi>({
    additional_info: '',
    attacker_model: '',
    inf_system: { id: '', name: '' },
    inf_system_id: '',
    ip_address: '',
    domain_name: '',
    greybox: false,
    blackbox: false,
    work_type: '',
  });

  const [isCreateApiModal, setCreateApiModal] = useState<boolean>(false);
  const [isResetApiDataModal, setResetApiDataModal] = useState<boolean>(false);

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

  const addApiHandler = () => {
    const isValidate = validateApi(api, dispatch);

    if (isValidate && setSecondaryModalVisible && projectId) {
      if (!api.inf_system?.id || !api.inf_system?.name) {
        delete api.inf_system;
        delete api.inf_system_id;
      } else {
        api.inf_system_id = api.inf_system.id;

        delete api.inf_system;
      }

      api.attacker_model = prepareAttackerModelToEng[api.attacker_model || ''];
      api.work_type = prepareWorkTypeToEng[api.work_type || ''];

      dispatch(createObject({ object: api, projectId, objectType: OBJECT_TYPES.API }));

      resetApiData(dispatch, setApi);

      setModalVisible(false);
      setSecondaryModalVisible(false);
    }
  };

  const resetApiDataHandler = () => resetApiData(dispatch, setApi);

  const onInfSystemNameChangeHandler = ({ text, id }: IPopupItem) => {
    if (id === 'create') {
      localStorage.setItem(CREATE_MODAL_OPEN, 'true');

      navigate(`${ROUTES.COMMON}${ROUTES.CUSTOMERS}/${customer?.id}/${ROUTES.INF_SYSTEMS}`);
    } else {
      setApi({...api, inf_system: {name: text, id: String(id)}});
    }
  };
  const onAttackerModelChangeHandler = ({ text }: IPopupItem) => setApi({ ...api, attacker_model: text || '' });
  const onWorkTypeChangeHandler = ({ text }: IPopupItem) => setApi({ ...api, work_type: text || '' });

  const onConfirmCreateModalHandler = () => setCreateApiModal(prevState => !prevState);
  const onConfirmResetModalHandler = () => setResetApiDataModal(prevState => !prevState);

  return (
    <>
      <Modal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        title={localization.modals.objects.createApiTitle}
      >
        <div className={styles['modal-inputs']}>
          <InputForm
            text={localization.modals.objects.infSystemText}
            placeholder={localization.modals.objects.infSystemPlaceholder}
            value={api.inf_system?.name}
            popupItems={prepareInfSystems}
            onClick={showPopupHandler}
            onPopupChange={onInfSystemNameChangeHandler}
            onChange={(event) => {
              setApi({...api, inf_system: {name: event.target.value, id: ''}});
            }}
            disabled
          />
          <InputForm
            text={localization.modals.objects.ipAddressText}
            placeholder={localization.modals.objects.ipAddressPlaceholder}
            errorMessage={ip_address_error}
            value={api.ip_address}
            onChange={(event) => {
              setApi({...api, ip_address: event.target.value});
            }}
            required
          />
          <InputForm
            text={localization.modals.objects.domainNameText}
            placeholder={localization.modals.objects.domainNamePlaceholder}
            value={api.domain_name}
            onChange={(event) => {
              setApi({...api, domain_name: event.target.value});
            }}
          />
          <InputForm
            text={localization.modals.objects.attackerModelText}
            placeholder={localization.modals.objects.attackerModelPlaceholder}
            errorMessage={attacker_model_error}
            popupItems={attackerModelPopupItems}
            value={api.attacker_model}
            onClick={showPopupHandler}
            onPopupChange={onAttackerModelChangeHandler}
            onChange={(event) => {
              setApi({...api, attacker_model: event.target.value});
            }}
            disabled
            required
          />
          <InputForm
            text={localization.modals.objects.workTypeText}
            placeholder={localization.modals.objects.workTypePlaceholder}
            errorMessage={work_type_error}
            popupItems={workTypePopupItems}
            value={api.work_type}
            onClick={showPopupHandler}
            onPopupChange={onWorkTypeChangeHandler}
            onChange={(event) => {
              setApi({...api, work_type: event.target.value});
            }}
            disabled
            required
          />
          <InputForm
            text={localization.modals.objects.additionalInfoText}
            placeholder={localization.modals.objects.additionalInfoPlaceholder}
            value={api.additional_info}
            onTextareaChange={(event) => {
              setApi({...api, additional_info: event.target.value});
            }}
            textarea
          />
          <InputForm
            text={localization.modals.objects.greyboxText}
            type={InputTypeEnum.Checkbox}
            value={api.greybox}
            onChange={(event) => {
              setApi({...api, greybox: event.target.checked });
            }}
          />
          <InputForm
            text={localization.modals.objects.blackboxText}
            errorMessage={test_method_error}
            type={InputTypeEnum.Checkbox}
            value={api.blackbox}
            onChange={(event) => {
              setApi({...api, blackbox: event.target.checked });
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
        isModalVisible={isCreateApiModal}
        setModalVisible={setCreateApiModal}
        text={OBJECT_TITLES.API}
        onConfirmClick={addApiHandler}
        type={ModalTypes.Create}
      />
      <ConfirmModal
        isModalVisible={isResetApiDataModal}
        setModalVisible={setResetApiDataModal}
        text={OBJECT_TITLES.API}
        onConfirmClick={resetApiDataHandler}
        type={ModalTypes.Reset}
      />
    </>
  );
};

export default CreateApi;
