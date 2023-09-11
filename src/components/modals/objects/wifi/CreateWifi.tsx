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
import {IWifi} from '../../../../store/objects/wifies/wifiesTypes';
import {validateWifi} from '../../../../utils/validate/objects/validateWifi';
import {IPopupItem} from '../../../popup/PopupTypes';
import {useShowPopup} from '../../../../hooks/useShowPopup';
import ConfirmModal from '../../general/confirm/ConfirmModal';
import {ModalTypes} from '../../general/confirm/ConfirmTypes';


import {ButtonTypeEnum} from '../../../button/ButtonTypes';
import {createObject, getAllObjects} from '../../../../store/objects/objectsAsync';
import {
  attackerModelPopupItems,
  OBJECT_TITLES,
  OBJECT_TYPES,
  prepareAttackerModelToEng,
} from '../../../../constants/objects';
import {selectWifi, selectWifiErrors} from '../../../../store/objects/wifies/wifiesSelectors';
import {selectOffices} from '../../../../store/offices/officesSelectors';

import {InputTypeEnum} from '../../../input/InputTypes';

import {CREATE_MODAL_OPEN} from '../../../../constants/other';

import {ROUTES} from '../../../../router/routes';
import {selectProjectById} from '../../../../store/projects/projectsSelectors';

import {localization} from '../../../../localization/localization';

import {resetWifiData} from './utils/resetWifiData';

let prepareOffices: IPopupItem[] = [];

const CreateWifi: FC<IModalProps> = ({
  isModalVisible,
  setModalVisible,
  setSecondaryModalVisible,
}) => {
  const dispatch = useAppDispatch();

  const { projectId } = useParams();
  const navigate = useNavigate();

  const { allOffices } = useAppSelector(selectOffices);
  const { customer } = useAppSelector(selectProjectById);
  const { allWifies } = useAppSelector(selectWifi);

  const { showPopupHandler } = useShowPopup();

  const {
    ssid_error,
    bssid_error,
    attacker_model_error,
    test_method_error,
  } = useAppSelector(selectWifiErrors);

  const [wifi, setWifi] = useState<IWifi>({
    additional_info: '',
    attacker_model: '',
    bssid: '',
    office: { id: '', name: '' },
    office_id: '',
    ssid: '',
    greybox: false,
    blackbox: false,
  });

  const [isCreateWifiModal, setCreateWifiModal] = useState<boolean>(false);
  const [isResetWifiDataModal, setResetWifiDataModal] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getAllObjects({ id: projectId, objectType: OBJECT_TYPES.WiFi }));
  }, [dispatch, projectId]);

  useEffect(() => {
    prepareOffices = allOffices.map((office) => {
      return {
        text: office.name,
        id: office.id,
      };
    });

    prepareOffices[prepareOffices.length] = {
      text: localization.office.createButtonText,
      id: 'create',
    };
  }, [allOffices]);

  const addWifiHandler = () => {
    const isValidate = validateWifi(wifi, dispatch, allWifies);

    if (isValidate && setSecondaryModalVisible && projectId) {
      if (!wifi.office?.id || !wifi.office?.name) {
        delete wifi.office;
        delete wifi.office_id;
      } else {
        wifi.office_id = wifi.office.id;

        delete wifi.office;
      }

      wifi.attacker_model = prepareAttackerModelToEng[wifi.attacker_model || ''];

      dispatch(createObject({ projectId, object: wifi, objectType: OBJECT_TYPES.WiFi }));

      resetWifiData(dispatch, setWifi);

      setModalVisible(false);
      setSecondaryModalVisible(false);
    }
  };

  const resetWifiDataHandler = () => resetWifiData(dispatch, setWifi);

  const onOfficeNameChangeHandler = ({ id, text }: IPopupItem) => {
    if (id === 'create') {
      localStorage.setItem(CREATE_MODAL_OPEN, 'true');

      navigate(`${ROUTES.COMMON}${ROUTES.CUSTOMERS}/${customer?.id}/${ROUTES.OFFICES}`);
    } else {
      setWifi({...wifi, office: {name: text, id: String(id)}});
    }
  };
  const onAttackerModelChangeHandler = ({ text }: IPopupItem) => setWifi({ ...wifi, attacker_model: text || '' });

  const onConfirmCreateModalHandler = () => setCreateWifiModal(prevState => !prevState);
  const onConfirmResetModalHandler = () => setResetWifiDataModal(prevState => !prevState);

  return (
    <>
      <Modal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        title={localization.modals.objects.createWifiTitle}
      >
        <div className={styles['modal-inputs']}>
          <InputForm
            text={localization.modals.objects.officeText}
            placeholder={localization.modals.objects.officePlaceholder}
            value={wifi.office?.name}
            popupItems={prepareOffices}
            onClick={showPopupHandler}
            onPopupChange={onOfficeNameChangeHandler}
            onChange={(event) => {
              setWifi({...wifi, office: {name: event.target.value, id: ''}});
            }}
            disabled
          />
          <InputForm
            text={localization.modals.objects.ssidText}
            placeholder={localization.modals.objects.ssidPlaceholder}
            errorMessage={ssid_error}
            value={wifi.ssid}
            onChange={(event) => {
              setWifi({...wifi, ssid: event.target.value});
            }}
            required
          />
          <InputForm
            text={localization.modals.objects.bssidText}
            placeholder={localization.modals.objects.bssidPlaceholder}
            errorMessage={bssid_error}
            value={wifi.bssid}
            onChange={(event) => {
              setWifi({...wifi, bssid: event.target.value});
            }}
            required
          />
          <InputForm
            text={localization.modals.objects.attackerModelText}
            placeholder={localization.modals.objects.attackerModelPlaceholder}
            errorMessage={attacker_model_error}
            popupItems={attackerModelPopupItems}
            value={wifi.attacker_model}
            onClick={showPopupHandler}
            onPopupChange={onAttackerModelChangeHandler}
            onChange={(event) => {
              setWifi({...wifi, attacker_model: event.target.value});
            }}
            disabled
            required
          />
          <InputForm
            text={localization.modals.objects.additionalInfoText}
            placeholder={localization.modals.objects.additionalInfoPlaceholder}
            value={wifi.additional_info}
            onChange={(event) => {
              setWifi({...wifi, additional_info: event.target.value});
            }}
          />
          <InputForm
            text={localization.modals.objects.greyboxText}
            type={InputTypeEnum.Checkbox}
            value={wifi.greybox}
            onChange={(event) => {
              setWifi({...wifi, greybox: event.target.checked });
            }}
          />
          <InputForm
            text={localization.modals.objects.blackboxText}
            errorMessage={test_method_error}
            type={InputTypeEnum.Checkbox}
            value={wifi.blackbox}
            onChange={(event) => {
              setWifi({...wifi, blackbox: event.target.checked });
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
        isModalVisible={isCreateWifiModal}
        setModalVisible={setCreateWifiModal}
        text={OBJECT_TITLES.WIFI}
        onConfirmClick={addWifiHandler}
        type={ModalTypes.Create}
      />
      <ConfirmModal
        isModalVisible={isResetWifiDataModal}
        setModalVisible={setResetWifiDataModal}
        text={OBJECT_TITLES.WIFI}
        onConfirmClick={resetWifiDataHandler}
        type={ModalTypes.Reset}
      />
    </>
  );
};

export default CreateWifi;
