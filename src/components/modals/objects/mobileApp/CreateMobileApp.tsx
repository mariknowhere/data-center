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
import {IMobileApp} from '../../../../store/objects/mobileApps/mobileAppsTypes';
import {validateMobileApp} from '../../../../utils/validate/objects/validateMobileApp';
import {
  mobilePlatformPopupItems,
  OBJECT_TITLES,
  OBJECT_TYPES,
  prepareMobilePlatformToEng,
} from '../../../../constants/objects';
import {useShowPopup} from '../../../../hooks/useShowPopup';
import {IPopupItem} from '../../../popup/PopupTypes';
import ConfirmModal from '../../general/confirm/ConfirmModal';
import {ModalTypes} from '../../general/confirm/ConfirmTypes';


import {ButtonTypeEnum} from '../../../button/ButtonTypes';
import {createObject} from '../../../../store/objects/objectsAsync';
import {selectMobileAppErrors} from '../../../../store/objects/mobileApps/mobileAppsSelectors';
import {selectInfSystems} from '../../../../store/infSystems/infSystemsSelectors';

import {InputTypeEnum} from '../../../input/InputTypes';

import {CREATE_MODAL_OPEN} from '../../../../constants/other';

import {ROUTES} from '../../../../router/routes';
import {selectProjectById} from '../../../../store/projects/projectsSelectors';
import {selectProfileData} from '../../../../store/auth/authSelectors';

import {localization} from '../../../../localization/localization';

import {resetMobileAppData} from './utils/resetMobileAppData';

let prepareInfSystems: IPopupItem[] = [];

const CreateMobileApp: FC<IModalProps> = ({
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
    platform_error,
    test_method_error,
  } = useAppSelector(selectMobileAppErrors);

  const [mobileApp, setMobileApp] = useState<IMobileApp>({
    additional_info: '',
    app_name: '',
    inf_system: { id: '', name: '' },
    inf_system_id: '',
    platform_type: '',
    greybox: false,
    blackbox: false,
  });

  const [isCreateMobileAppModal, setCreateMobileAppModal] = useState<boolean>(false);
  const [isResetMobileAppDataModal, setResetMobileAppDataModal] = useState<boolean>(false);

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

  const addMobileAppHandler = () => {
    const isValidate = validateMobileApp(mobileApp, dispatch);

    if (isValidate && setSecondaryModalVisible && projectId) {
      if (!mobileApp.inf_system?.id || !mobileApp.inf_system?.name) {
        delete mobileApp.inf_system;
        delete mobileApp.inf_system_id;
      } else {
        mobileApp.inf_system_id = mobileApp.inf_system.id;

        delete mobileApp.inf_system;
      }

      mobileApp.platform_type = prepareMobilePlatformToEng[mobileApp.platform_type || ''];

      dispatch(createObject({ object: mobileApp, objectType: OBJECT_TYPES.MobileApp, projectId }));

      resetMobileAppData(dispatch, setMobileApp);

      setModalVisible(false);
      setSecondaryModalVisible(false);
    }
  };

  const resetMobileAppDataHandler = () => resetMobileAppData(dispatch, setMobileApp);

  const onInfSystemNameChangeHandler = ({ id, text }: IPopupItem) => {
    if (id === 'create') {
      localStorage.setItem(CREATE_MODAL_OPEN, 'true');

      navigate(`${ROUTES.COMMON}${ROUTES.CUSTOMERS}/${customer?.id}/${ROUTES.INF_SYSTEMS}`);
    } else {
      setMobileApp({...mobileApp, inf_system: {name: text, id: String(id)}});
    }
  };
  const onPlatformChangeHandler = ({ text }: IPopupItem) => {
    setMobileApp({...mobileApp, platform_type: text || ''});
  };

  const onConfirmCreateModalHandler = () => setCreateMobileAppModal(prevState => !prevState);
  const onConfirmResetModalHandler = () => setResetMobileAppDataModal(prevState => !prevState);

  return (
    <>
      <Modal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        title={localization.modals.objects.createMobileAppTitle}
      >
        <div className={styles['modal-inputs']}>
          <InputForm
            text={localization.modals.objects.infSystemText}
            placeholder={localization.modals.objects.infSystemPlaceholder}
            value={mobileApp.inf_system?.name}
            popupItems={prepareInfSystems}
            onClick={showPopupHandler}
            onPopupChange={onInfSystemNameChangeHandler}
            onChange={(event) => {
              setMobileApp({...mobileApp, inf_system: {name: event.target.value, id: ''}});
            }}
            disabled
          />
          <InputForm
            text={localization.modals.objects.appNameText}
            placeholder={localization.modals.objects.appNamePlaceholder}
            errorMessage={app_name_error}
            value={mobileApp.app_name}
            onChange={(event) => {
              setMobileApp({...mobileApp, app_name: event.target.value});
            }}
            required
          />
          <InputForm
            text={localization.modals.objects.platformTypeText}
            placeholder={localization.modals.objects.platformTypePlaceholder}
            value={mobileApp.platform_type}
            errorMessage={platform_error}
            popupItems={mobilePlatformPopupItems}
            onClick={showPopupHandler}
            onPopupChange={onPlatformChangeHandler}
            disabled
            onChange={(event) => {
              setMobileApp({...mobileApp, platform_type: event.target.value});
            }}
            required
          />
          <InputForm
            text={localization.modals.objects.additionalInfoText}
            placeholder={localization.modals.objects.additionalInfoPlaceholder}
            value={mobileApp.additional_info}
            onTextareaChange={(event) => {
              setMobileApp({...mobileApp, additional_info: event.target.value});
            }}
            textarea
          />
          <InputForm
            text={localization.modals.objects.greyboxText}
            type={InputTypeEnum.Checkbox}
            value={mobileApp.greybox}
            onChange={(event) => {
              setMobileApp({...mobileApp, greybox: event.target.checked });
            }}
          />
          <InputForm
            text={localization.modals.objects.blackboxText}
            errorMessage={test_method_error}
            type={InputTypeEnum.Checkbox}
            value={mobileApp.blackbox}
            onChange={(event) => {
              setMobileApp({...mobileApp, blackbox: event.target.checked });
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
        isModalVisible={isCreateMobileAppModal}
        setModalVisible={setCreateMobileAppModal}
        text={OBJECT_TITLES.MOBILE_APP}
        onConfirmClick={addMobileAppHandler}
        type={ModalTypes.Create}
      />
      <ConfirmModal
        isModalVisible={isResetMobileAppDataModal}
        setModalVisible={setResetMobileAppDataModal}
        text={localization.modals.objects.mobileAppResetButtonText}
        onConfirmClick={resetMobileAppDataHandler}
        type={ModalTypes.Reset}
      />
    </>
  );
};

export default CreateMobileApp;
