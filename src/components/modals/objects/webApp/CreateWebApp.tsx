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
import {IWebApp} from '../../../../store/objects/webApps/webAppTypes';
import {validateWebApp} from '../../../../utils/validate/objects/validateWebApp';
import {IPopupItem} from '../../../popup/PopupTypes';
import {useShowPopup} from '../../../../hooks/useShowPopup';
import {ButtonTypeEnum} from '../../../button/ButtonTypes';
import ConfirmModal from '../../general/confirm/ConfirmModal';
import {ModalTypes} from '../../general/confirm/ConfirmTypes';


import {
  attackerModelPopupItems,
  OBJECT_TITLES,
  OBJECT_TYPES,
  prepareAttackerModelToEng,
  prepareWorkTypeToEng,
  workTypePopupItems,
} from '../../../../constants/objects';
import {createObject} from '../../../../store/objects/objectsAsync';
import {selectWebAppErrors} from '../../../../store/objects/webApps/webAppsSelectors';
import {selectInfSystems} from '../../../../store/infSystems/infSystemsSelectors';

import {InputTypeEnum} from '../../../input/InputTypes';

import {selectProjectById} from '../../../../store/projects/projectsSelectors';

import {CREATE_MODAL_OPEN} from '../../../../constants/other';
import {ROUTES} from '../../../../router/routes';
import {selectProfileData} from '../../../../store/auth/authSelectors';

import {localization} from '../../../../localization/localization';

import {resetWebAppData} from './utils/resetWebAppData';

let prepareInfSystems: IPopupItem[] = [];

const CreateWebApp: FC<IModalProps> = ({
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
    attacker_model_error,
    work_type_error,
    ip_address_error,
    test_method_error,
  } = useAppSelector(selectWebAppErrors);

  const [webApp, setWebApp] = useState<IWebApp>({
    additional_info: '',
    attacker_model: '',
    inf_system: { id: '', name: '' },
    inf_system_id: '',
    ip_address: '',
    greybox: false,
    blackbox: false,
    domain_name: '',
    work_type: '',
  });

  const [isCreateWebAppModal, setCreateWebAppModal] = useState<boolean>(false);
  const [isResetWebAppDataModal, setResetWebAppDataModal] = useState<boolean>(false);

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

  const addWebAppHandler = () => {
    const isValidate = validateWebApp(webApp, dispatch);

    if (isValidate && setSecondaryModalVisible && projectId) {
      if (!webApp.inf_system?.id || !webApp.inf_system?.name) {
        delete webApp.inf_system;
        delete webApp.inf_system_id;
      } else {
        webApp.inf_system_id = webApp.inf_system.id;

        delete webApp.inf_system;
      }

      webApp.attacker_model = prepareAttackerModelToEng[webApp.attacker_model || ''];
      webApp.work_type = prepareWorkTypeToEng[webApp.work_type || ''];

      dispatch(createObject({ projectId, object: webApp, objectType: OBJECT_TYPES.WebApp }));

      resetWebAppData(dispatch, setWebApp);

      setModalVisible(false);
      setSecondaryModalVisible(false);
    }
  };

  const resetWebAppDataHandler = () => resetWebAppData(dispatch, setWebApp);

  const onInfSystemNameChangeHandler = ({ text, id }: IPopupItem) => {
    if (id === 'create') {
      localStorage.setItem(CREATE_MODAL_OPEN, 'true');

      navigate(`${ROUTES.COMMON}${ROUTES.CUSTOMERS}/${customer?.id}/${ROUTES.INF_SYSTEMS}`);
    } else {
      setWebApp({...webApp, inf_system: {name: text, id: String(id)}});
    }
  };
  const onAttackerModelChangeHandler = ({ text }: IPopupItem) => {
    setWebApp({...webApp, attacker_model: text || ''});
  };
  const onWorkTypeChangeHandler = ({ text }: IPopupItem) => setWebApp({ ...webApp, work_type: text || '' });

  const onConfirmCreateModalHandler = () => setCreateWebAppModal(prevState => !prevState);
  const onConfirmResetModalHandler = () => setResetWebAppDataModal(prevState => !prevState);

  return (
    <>
      <Modal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        title={localization.modals.objects.createWebAppTitle}
      >
        <div className={styles['modal-inputs']}>
          <InputForm
            text={localization.modals.objects.infSystemText}
            placeholder={localization.modals.objects.infSystemPlaceholder}
            value={webApp.inf_system?.name}
            popupItems={prepareInfSystems}
            onClick={showPopupHandler}
            onPopupChange={onInfSystemNameChangeHandler}
            onChange={(event) => {
              setWebApp({...webApp, inf_system: { name: event.target.value, id: '' }});
            }}
            disabled
          />
          <InputForm
            text={localization.modals.objects.ipAddressText}
            placeholder={localization.modals.objects.ipAddressPlaceholder}
            errorMessage={ip_address_error}
            value={webApp.ip_address}
            onChange={(event) => {
              setWebApp({...webApp, ip_address: event.target.value});
            }}
            required
          />
          <InputForm
            text={localization.modals.objects.domainNameText}
            placeholder={localization.modals.objects.domainNamePlaceholder}
            value={webApp.domain_name}
            onChange={(event) => {
              setWebApp({...webApp, domain_name: event.target.value});
            }}
          />
          <InputForm
            text={localization.modals.objects.attackerModelText}
            placeholder={localization.modals.objects.attackerModelPlaceholder}
            errorMessage={attacker_model_error}
            popupItems={attackerModelPopupItems}
            value={webApp.attacker_model}
            onClick={showPopupHandler}
            onPopupChange={onAttackerModelChangeHandler}
            onChange={(event) => {
              setWebApp({...webApp, attacker_model: event.target.value});
            }}
            disabled
            required
          />
          <InputForm
            text={localization.modals.objects.workTypeText}
            placeholder={localization.modals.objects.workTypePlaceholder}
            errorMessage={work_type_error}
            popupItems={workTypePopupItems}
            value={webApp.work_type}
            onClick={showPopupHandler}
            onPopupChange={onWorkTypeChangeHandler}
            onChange={(event) => {
              setWebApp({...webApp, work_type: event.target.value});
            }}
            disabled
            required
          />
          <InputForm
            text={localization.modals.objects.additionalInfoText}
            placeholder={localization.modals.objects.additionalInfoPlaceholder}
            value={webApp.additional_info}
            onTextareaChange={(event) => {
              setWebApp({...webApp, additional_info: event.target.value});
            }}
            textarea
          />
          <InputForm
            text={localization.modals.objects.greyboxText}
            type={InputTypeEnum.Checkbox}
            value={webApp.greybox}
            onChange={(event) => {
              setWebApp({...webApp, greybox: event.target.checked });
            }}
          />
          <InputForm
            text={localization.modals.objects.blackboxText}
            errorMessage={test_method_error}
            type={InputTypeEnum.Checkbox}
            value={webApp.blackbox}
            onChange={(event) => {
              setWebApp({...webApp, blackbox: event.target.checked });
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
        isModalVisible={isCreateWebAppModal}
        setModalVisible={setCreateWebAppModal}
        text={OBJECT_TITLES.WEB_APP}
        onConfirmClick={addWebAppHandler}
        type={ModalTypes.Create}
      />
      <ConfirmModal
        isModalVisible={isResetWebAppDataModal}
        setModalVisible={setResetWebAppDataModal}
        text={localization.modals.objects.webAppResetButtonText}
        onConfirmClick={resetWebAppDataHandler}
        type={ModalTypes.Reset}
      />
    </>
  );
};

export default CreateWebApp;
