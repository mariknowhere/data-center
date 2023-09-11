import {FC, useState} from 'react';

import {IModalProps} from '../ModalTypes';
import Modal from '../Modal';
import Button from '../../button/Button';

import {localization} from '../../../localization/localization';

import styles from './ObjectButtonsModal.module.scss';
import CreateSourceCode from './sourceCode/CreateSourceCode';
import CreateWebApp from './webApp/CreateWebApp';
import CreateServer from './server/CreateServer';
import CreateMobileApp from './mobileApp/CreateMobileApp';
import CreateSocialEngineering from './socialEngineering/CreateSocialEngineering';
import CreateWifi from './wifi/CreateWifi';
import CreateDesktopApp from './desktopApp/CreateDesktopApp';
import CreateArm from './arm/CreateArm';
import CreateNetworkDevice from './networkDevice/CreateNetworkDevice';
import CreateApi from './api/CreateApi';
import CreateExternal from './external/CreateExternal';
import CreateInternal from './internal/CreateInternal';
import CreateOther from './other/CreateOther';

const ObjectButtonsModal: FC<IModalProps> = ({ isModalVisible, setModalVisible }) => {
  const [isWebAppModal, setWebAppModal] = useState<boolean>(false);
  const [isApiModal, setApiModal] = useState<boolean>(false);
  const [isMobileAppModal, setMobileAppModal] = useState<boolean>(false);
  const [isNetworkDeviceModal, setNetworkDeviceModal] = useState<boolean>(false);
  const [isServerModal, setServerModal] = useState<boolean>(false);

  const [isArmModal, setArmModal] = useState<boolean>(false);
  const [isWifiModal, setWifiModal] = useState<boolean>(false);
  const [isSocialEngineeringModal, setSocialEngineeringModal] = useState<boolean>(false);
  const [isDesktopAppModal, setDesktopAppModal] = useState<boolean>(false);
  const [isSourceCodeModal, setSourceCodeModal] = useState<boolean>(false);

  const [isExternalModal, setExternalModal] = useState<boolean>(false);
  const [isInternalModal, setInternalModal] = useState<boolean>(false);
  const [isOtherModal, setOtherModal] = useState<boolean>(false);

  const onWebAppModalChange = () => setWebAppModal(prevState => !prevState);
  const onApiModalChange = () => setApiModal(prevState => !prevState);
  const onMobileAppModalChange = () => setMobileAppModal(prevState => !prevState);
  const onNetworkDeviceModalChange = () => setNetworkDeviceModal(prevState => !prevState);
  const onServerModalChange = () => setServerModal(prevState => !prevState);

  const onArmModalChange = () => setArmModal(prevState => !prevState);
  const onWifiChange = () => setWifiModal(prevState => !prevState);
  const onSocialEngineeringChange = () => setSocialEngineeringModal(prevState => !prevState);
  const onDesktopAppChange = () => setDesktopAppModal(prevState => !prevState);
  const onSourceCodeModalChange = () => setSourceCodeModal(prevState => !prevState);

  const onExternalModalChange = () => setExternalModal(prevState => !prevState);
  const onInternalModalChange = () => setInternalModal(prevState => !prevState);
  const onOtherModalChange = () => setOtherModal(prevState => !prevState);

  return (
    <>
      <Modal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        title={localization.modals.objects.createObjectTitle}
      >
        <div className={styles['object-buttons']}>
          <Button onClick={onWebAppModalChange} buttonText={localization.modals.objects.webAppButtonText} />
          <Button onClick={onApiModalChange} buttonText={localization.modals.objects.apiButtonText} />
          <Button onClick={onMobileAppModalChange} buttonText={localization.modals.objects.mobileAppButtonText} />
          <Button onClick={onNetworkDeviceModalChange} buttonText={localization.modals.objects.networkDeviceButtonText} />
          <Button onClick={onServerModalChange} buttonText={localization.modals.objects.serverButtonText} />
          <Button onClick={onArmModalChange} buttonText={localization.modals.objects.armButtonText} />
          <Button onClick={onWifiChange} buttonText={localization.modals.objects.wifiButtonText} />
          <Button onClick={onSocialEngineeringChange} buttonText={localization.modals.objects.socialEngineeringButtonText} />
          <Button onClick={onDesktopAppChange} buttonText={localization.modals.objects.desktopAppButtonText} />
          <Button onClick={onSourceCodeModalChange} buttonText={localization.modals.objects.sourceCodeButtonText} />
          <Button onClick={onExternalModalChange} buttonText={localization.modals.objects.externalButtonText} />
          <Button onClick={onInternalModalChange} buttonText={localization.modals.objects.internalButtonText} />
          <Button onClick={onOtherModalChange} buttonText={localization.modals.objects.otherButtonText} />
        </div>
      </Modal>
      <CreateWebApp
        isModalVisible={isWebAppModal}
        setModalVisible={setWebAppModal}
        setSecondaryModalVisible={setModalVisible}
      />
      <CreateApi
        isModalVisible={isApiModal}
        setModalVisible={setApiModal}
        setSecondaryModalVisible={setModalVisible}
      />
      <CreateMobileApp
        isModalVisible={isMobileAppModal}
        setModalVisible={setMobileAppModal}
        setSecondaryModalVisible={setModalVisible}
      />
      <CreateNetworkDevice
        isModalVisible={isNetworkDeviceModal}
        setModalVisible={setNetworkDeviceModal}
        setSecondaryModalVisible={setModalVisible}
      />
      <CreateServer
        isModalVisible={isServerModal}
        setModalVisible={setServerModal}
        setSecondaryModalVisible={setModalVisible}
      />
      <CreateArm
        isModalVisible={isArmModal}
        setModalVisible={setArmModal}
        setSecondaryModalVisible={setModalVisible}
      />
      <CreateWifi
        isModalVisible={isWifiModal}
        setModalVisible={setWifiModal}
        setSecondaryModalVisible={setModalVisible}
      />
      <CreateSocialEngineering
        isModalVisible={isSocialEngineeringModal}
        setModalVisible={setSocialEngineeringModal}
        setSecondaryModalVisible={setModalVisible}
      />
      <CreateDesktopApp
        isModalVisible={isDesktopAppModal}
        setModalVisible={setDesktopAppModal}
        setSecondaryModalVisible={setModalVisible}
      />
      <CreateSourceCode
        isModalVisible={isSourceCodeModal}
        setModalVisible={setSourceCodeModal}
        setSecondaryModalVisible={setModalVisible}
      />
      <CreateExternal
        isModalVisible={isExternalModal}
        setModalVisible={setExternalModal}
        setSecondaryModalVisible={setModalVisible}
      />
      <CreateInternal
        isModalVisible={isInternalModal}
        setModalVisible={setInternalModal}
        setSecondaryModalVisible={setModalVisible}
      />
      <CreateOther
        isModalVisible={isOtherModal}
        setModalVisible={setOtherModal}
        setSecondaryModalVisible={setModalVisible}
      />
    </>
  );
};

export default ObjectButtonsModal;
