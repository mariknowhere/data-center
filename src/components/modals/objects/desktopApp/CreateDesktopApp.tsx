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
import {IDesktopApp} from '../../../../store/objects/desktopApps/desktopAppsTypes';
import {validateDesktopApp} from '../../../../utils/validate/objects/validateDesktopApp';
import {IPopupItem} from '../../../popup/PopupTypes';
import {useShowPopup} from '../../../../hooks/useShowPopup';
import ConfirmModal from '../../general/confirm/ConfirmModal';
import {ModalTypes} from '../../general/confirm/ConfirmTypes';
import {ButtonTypeEnum} from '../../../button/ButtonTypes';


import {createObject} from '../../../../store/objects/objectsAsync';
import {
  desktopPlatformPopupItems,
  OBJECT_TITLES,
  OBJECT_TYPES,
  prepareDesktopPlatformToEng,
} from '../../../../constants/objects';
import {selectDesktopAppErrors} from '../../../../store/objects/desktopApps/desktopAppsSelectors';
import {selectInfSystems} from '../../../../store/infSystems/infSystemsSelectors';

import {InputTypeEnum} from '../../../input/InputTypes';

import {selectProjectById} from '../../../../store/projects/projectsSelectors';

import {CREATE_MODAL_OPEN} from '../../../../constants/other';
import {ROUTES} from '../../../../router/routes';
import {selectProfileData} from '../../../../store/auth/authSelectors';

import {localization} from '../../../../localization/localization';

import {resetApiData} from './utils/resetDesktopAppData';

let prepareInfSystems: IPopupItem[] = [];

const CreateDesktopApp: FC<IModalProps> = ({
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
    app_name_error,
    platform_type_error,
    test_method_error,
  } = useAppSelector(selectDesktopAppErrors);

  const [desktopApp, setDesktopApp] = useState<IDesktopApp>({
    additional_info: '',
    app_name: '',
    inf_system: { id: '', name: '' },
    inf_system_id: '',
    platform_type: '',
    greybox: false,
    blackbox: false,
  });

  const [isCreateDesktopAppModal, setCreateDesktopAppModal] = useState<boolean>(false);
  const [isResetDesktopAppDataModal, setResetDesktopAppDataModal] = useState<boolean>(false);

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

  const addDesktopAppHandler = () => {
    const isValidate = validateDesktopApp(desktopApp, dispatch);

    if (isValidate && setSecondaryModalVisible && projectId) {
      if (!desktopApp.inf_system?.id || !desktopApp.inf_system?.name) {
        delete desktopApp.inf_system;
        delete desktopApp.inf_system_id;
      } else {
        desktopApp.inf_system_id = desktopApp.inf_system.id;

        delete desktopApp.inf_system;
      }

      desktopApp.platform_type = prepareDesktopPlatformToEng[desktopApp.platform_type];

      dispatch(createObject({ projectId, objectType: OBJECT_TYPES.DesktopApp, object: desktopApp }));

      resetApiData(dispatch, setDesktopApp);

      setModalVisible(false);
      setSecondaryModalVisible(false);
    }
  };

  const resetDesktopAppDataHandler = () => resetApiData(dispatch, setDesktopApp);

  const onInfSystemNameChangeHandler = ({ id, text }: IPopupItem) => {
    if (id === 'create') {
      localStorage.setItem(CREATE_MODAL_OPEN, 'true');

      navigate(`${ROUTES.COMMON}${ROUTES.CUSTOMERS}/${customer?.id}/${ROUTES.INF_SYSTEMS}`);
    } else {
      setDesktopApp({...desktopApp, inf_system: {name: text, id: String(id)}});
    }
  };
  const onPlatformTypeChangeHandler = ({ text }: IPopupItem) => {
    setDesktopApp({...desktopApp, platform_type: text || ''});
  };

  const onConfirmCreateModalHandler = () => setCreateDesktopAppModal(prevState => !prevState);
  const onConfirmResetModalHandler = () => setResetDesktopAppDataModal(prevState => !prevState);

  return (
    <>
      <Modal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        title={localization.modals.objects.createDesktopAppTitle}
      >
        <div className={styles['modal-inputs']}>
          <InputForm
            text={localization.modals.objects.infSystemText}
            placeholder={localization.modals.objects.infSystemPlaceholder}
            value={desktopApp.inf_system?.name}
            popupItems={prepareInfSystems}
            onClick={showPopupHandler}
            onPopupChange={onInfSystemNameChangeHandler}
            onChange={(event) => {
              setDesktopApp({...desktopApp, inf_system: {name: event.target.value, id: ''}});
            }}
            disabled
          />
          <InputForm
            text={localization.modals.objects.appNameText}
            placeholder={localization.modals.objects.appNamePlaceholder}
            errorMessage={app_name_error}
            value={desktopApp.app_name}
            onChange={(event) => {
              setDesktopApp({...desktopApp, app_name: event.target.value});
            }}
            required
          />
          <InputForm
            text={localization.modals.objects.platformTypeText}
            placeholder={localization.modals.objects.platformTypePlaceholder}
            errorMessage={platform_type_error}
            value={desktopApp.platform_type}
            popupItems={desktopPlatformPopupItems}
            onClick={showPopupHandler}
            onPopupChange={onPlatformTypeChangeHandler}
            onChange={(event) => {
              setDesktopApp({...desktopApp, platform_type: event.target.value});
            }}
            disabled
            required
          />
          <InputForm
            text={localization.modals.objects.additionalInfoText}
            placeholder={localization.modals.objects.additionalInfoPlaceholder}
            value={desktopApp.additional_info}
            onTextareaChange={(event) => {
              setDesktopApp({...desktopApp, additional_info: event.target.value});
            }}
            textarea
          />
          <InputForm
            text={localization.modals.objects.greyboxText}
            type={InputTypeEnum.Checkbox}
            value={desktopApp.greybox}
            onChange={(event) => {
              setDesktopApp({...desktopApp, greybox: event.target.checked });
            }}
          />
          <InputForm
            text={localization.modals.objects.blackboxText}
            errorMessage={test_method_error}
            type={InputTypeEnum.Checkbox}
            value={desktopApp.blackbox}
            onChange={(event) => {
              setDesktopApp({...desktopApp, blackbox: event.target.checked });
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
        isModalVisible={isCreateDesktopAppModal}
        setModalVisible={setCreateDesktopAppModal}
        text={OBJECT_TITLES.DESKTOP_APP}
        onConfirmClick={addDesktopAppHandler}
        type={ModalTypes.Create}
      />
      <ConfirmModal
        isModalVisible={isResetDesktopAppDataModal}
        setModalVisible={setResetDesktopAppDataModal}
        text={localization.modals.objects.desktopAppResetButtonText}
        onConfirmClick={resetDesktopAppDataHandler}
        type={ModalTypes.Reset}
      />
    </>
  );
};

export default CreateDesktopApp;
