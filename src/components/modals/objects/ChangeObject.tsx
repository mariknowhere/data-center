import {FC, useEffect, useState} from 'react';

import {useNavigate, useParams} from 'react-router-dom';

import classNames from 'classnames';

import InputForm from '../../inputForm/InputForm';
import styles from '../Modal.module.scss';
import Button from '../../button/Button';
import {useAppDispatch} from '../../../hooks/useAppDispatch';
import {useAppSelector} from '../../../hooks/useAppSelector';
import {IWebApp} from '../../../store/objects/webApps/webAppTypes';
import {validateWebApp} from '../../../utils/validate/objects/validateWebApp';
import ConfirmModal from '../general/confirm/ConfirmModal';
import {ModalTypes} from '../general/confirm/ConfirmTypes';


import Modal from '../Modal';
import {ButtonTypeEnum} from '../../button/ButtonTypes';
import {useShowPopup} from '../../../hooks/useShowPopup';
import {IPopupItem} from '../../popup/PopupTypes';
import {
  attackerModelPopupItems,
  desktopPlatformPopupItems,
  mobilePlatformPopupItems,
  OBJECT_TYPES,
  objectTypeItems,
  prepareAttackerModelToEng,
  prepareAttackerModelToRu,
  prepareDesktopPlatformToEng,
  prepareDesktopPlatformToRu,
  prepareMobilePlatformToEng,
  prepareMobilePlatformToRu,
  prepareObjectTypesForChangeModalToRu,
  prepareObjectTypesForResetModalToRu,
  prepareWorkTypeToEng,
  prepareWorkTypeToRu,
  programmingLanguageList,
  selectGropPopupItems,
  socialEngineeringList,
  workTypePopupItems,
} from '../../../constants/objects';
import {changeObject} from '../../../store/objects/objectsAsync';
import {IModalProps} from '../ModalTypes';
import {getAllInfSystems} from '../../../store/infSystems/infSystemsAsync';
import {selectProjectById} from '../../../store/projects/projectsSelectors';
import {selectWebAppById, selectWebAppErrors} from '../../../store/objects/webApps/webAppsSelectors';
import {selectInfSystems} from '../../../store/infSystems/infSystemsSelectors';
import {InputTypeEnum} from '../../input/InputTypes';
import {CREATE_MODAL_OPEN} from '../../../constants/other';
import {ROUTES} from '../../../router/routes';
import {Object} from '../../../store/objects/objectsTypes';
import {selectMobileAppById, selectMobileAppErrors} from '../../../store/objects/mobileApps/mobileAppsSelectors';
import {selectDesktopAppById, selectDesktopAppErrors} from '../../../store/objects/desktopApps/desktopAppsSelectors';
import {selectWifi, selectWifiById, selectWifiErrors} from '../../../store/objects/wifies/wifiesSelectors';
import {
  selectSocialEngineeringById,
  selectSocialEngineeringErrors,
} from '../../../store/objects/socialEngineering/socialEngineeringSelectors';
import {selectSourceCodeById, selectSourceCodesErrors} from '../../../store/objects/sourceCodes/sourceCodesSelectors';
import {selectOffices} from '../../../store/offices/officesSelectors';

import {selectApiById, selectApiErrors} from '../../../store/objects/api/apiSelectors';
import {validateApi} from '../../../utils/validate/objects/validateApi';
import {IApi} from '../../../store/objects/api/apiTypes';
import {getAllOffices} from '../../../store/offices/officesAsync';
import {
  selectNetworkDeviceById,
  selectNetworkDeviceErrors,
} from '../../../store/objects/networkDevices/networkDevicesSelectors';
import {selectServerById, selectServerErrors} from '../../../store/objects/servers/serversSelectors';
import {selectArmById, selectArmErrors} from '../../../store/objects/arm/armSelectors';
import {selectExternalById, selectExternalErrors} from '../../../store/objects/external/externalSelectors';
import {selectInternalById, selectInternalErrors} from '../../../store/objects/internal/internalSelectors';
import {selectOtherById, selectOtherErrors} from '../../../store/objects/other/otherSelectors';
import {validateMobileApp} from '../../../utils/validate/objects/validateMobileApp';
import {IMobileApp} from '../../../store/objects/mobileApps/mobileAppsTypes';
import {validateNetworkDevice} from '../../../utils/validate/objects/validateNetworkDevice';
import {INetworkDevice} from '../../../store/objects/networkDevices/networkDevicesTypes';
import {IServer} from '../../../store/objects/servers/serversTypes';
import {validateServer} from '../../../utils/validate/objects/validateServer';
import {validateArm} from '../../../utils/validate/objects/validateArm';
import {IArm} from '../../../store/objects/arm/armTypes';
import {validateWifi} from '../../../utils/validate/objects/validateWifi';
import {IWifi} from '../../../store/objects/wifies/wifiesTypes';
import {validateSocialEngineering} from '../../../utils/validate/objects/validateSocialEngineering';
import {ISocialEngineering} from '../../../store/objects/socialEngineering/socialEngineeringTypes';
import {validateDesktopApp} from '../../../utils/validate/objects/validateDesktopApp';
import {IDesktopApp} from '../../../store/objects/desktopApps/desktopAppsTypes';
import {ISourceCode} from '../../../store/objects/sourceCodes/sourceCodesTypes';
import {validateSourceCode} from '../../../utils/validate/objects/validateSourceCode';
import {validateExternal} from '../../../utils/validate/objects/validateExternal';
import {IExternal} from '../../../store/objects/external/externalTypes';
import {IInternal} from '../../../store/objects/internal/internalTypes';
import {validateInternal} from '../../../utils/validate/objects/validateInternal';
import {validateOther} from '../../../utils/validate/objects/validateOther';
import {IOther} from '../../../store/objects/other/otherTypes';
import {upperFirstLetter} from '../../../utils/prepare/upperFirstLetter';
import {selectObjects} from '../../../store/objects/objectsSelectors';
import {setChangeDone} from '../../../store/objects/objectsSlice';

import {localization} from '../../../localization/localization';

import {resetObjectData} from './utils/resetObjectData';

let prepareInfSystems: IPopupItem[] = [];
let prepareOffices: IPopupItem[] = [];

export interface IChangeObjectProps extends IModalProps {
  selectTab: string;
  selectTitle: string;
}

const ChangeObject: FC<IChangeObjectProps> = ({
  isModalVisible,
  setModalVisible,
  selectTab,
  selectTitle,
}) => {
  const dispatch = useAppDispatch();

  const { projectId, objectId } = useParams();
  const navigate = useNavigate();

  const { isChangeDone } = useAppSelector(selectObjects);
  const { allInfSystems } = useAppSelector(selectInfSystems);
  const { allOffices } = useAppSelector(selectOffices);
  const { allWifies } = useAppSelector(selectWifi);
  const { customer } = useAppSelector(selectProjectById);

  const { showPopupHandler } = useShowPopup();

  const webAppById = useAppSelector(selectWebAppById);
  const apiById = useAppSelector(selectApiById);
  const mobileAppById = useAppSelector(selectMobileAppById);
  const networkDeviceById = useAppSelector(selectNetworkDeviceById);
  const serverById = useAppSelector(selectServerById);

  const armById = useAppSelector(selectArmById);
  const wifiById = useAppSelector(selectWifiById);
  const socialEngineeringById = useAppSelector(selectSocialEngineeringById);
  const desktopAppById = useAppSelector(selectDesktopAppById);
  const sourceCodeById = useAppSelector(selectSourceCodeById);

  const externalById = useAppSelector(selectExternalById);
  const internalById = useAppSelector(selectInternalById);
  const otherById = useAppSelector(selectOtherById);

  const {
    attacker_model_error: web_app_attacker_model_error,
    work_type_error: web_app_work_type_error,
    ip_address_error: web_app_ip_address_error,
    test_method_error: web_app_test_method_error,
  } = useAppSelector(selectWebAppErrors);
  const {
    work_type_error: api_work_type_error,
    attacker_model_error: api_attacker_model_error,
    ip_address_error: api_ip_address_error,
    test_method_error: api_test_method_error,
  } = useAppSelector(selectApiErrors);
  const {
    app_name_error: mobile_app_name_error,
    platform_error: mobile_app_platform_error,
    test_method_error: mobile_app_test_method_error,
  } = useAppSelector(selectMobileAppErrors);
  const {
    work_type_error: network_device_work_type_error,
    attacker_model_error: network_device_attacker_model_error,
    ip_address_error: network_device_ip_address_error,
    test_method_error: network_device_test_method_error,
  } = useAppSelector(selectNetworkDeviceErrors);
  const {
    work_type_error: server_work_type_error,
    attacker_model_error: server_attacker_model_error,
    ip_address_error: server_ip_address_error,
    test_method_error: server_test_method_error,
  } = useAppSelector(selectServerErrors);

  const {
    work_type_error: arm_work_type_error,
    attacker_model_error: arm_attacker_model_error,
    ip_address_error: arm_ip_address_error,
    test_method_error: arm_test_method_error,
  } = useAppSelector(selectArmErrors);
  const {
    ssid_error,
    bssid_error,
    test_method_error: wifi_test_method_error,
  } = useAppSelector(selectWifiErrors);
  const {
    success_criterion_error,
  } = useAppSelector(selectSocialEngineeringErrors);
  const {
    app_name_error: desktop_app_name_error,
    platform_type_error: desktop_platform_error,
    test_method_error: desktop_app_test_method_error,
  } = useAppSelector(selectDesktopAppErrors);
  const {
    number_rows_error,
  } = useAppSelector(selectSourceCodesErrors);

  const {
    ip_address_error: external_ip_address_error,
  } = useAppSelector(selectExternalErrors);
  const {
    ip_address_error: internal_ip_address_error,
  } = useAppSelector(selectInternalErrors);
  const {
    ip_address_error: other_ip_address_error,
  } = useAppSelector(selectOtherErrors);

  const [object, setObject] = useState<Object>({});

  const [engineeringType, setEngineeringType] = useState<any>(null);
  const [programmingLanguage, setProgrammingLanguage] = useState<any>(null);

  const [groupType, setGroupType] = useState<IPopupItem>({
    text: localization.common.absent,
    value: 'none',
  });

  const [isGroupsLoading, setGroupsLoading] = useState<boolean>(false);

  const [objectType, setObjectType] = useState<IPopupItem>({
    text: upperFirstLetter(selectTitle),
    value: selectTab,
  });

  const [isChangeWebAppModal, setChangeWebAppModal] = useState<boolean>(false);
  const [isResetWebAppDataModal, setResetWebAppDataModal] = useState<boolean>(false);

  useEffect(() => {
    switch (selectTab) {
    case OBJECT_TYPES.WebApp: {
      setObject({
        additional_info: webAppById.additional_info,
        attacker_model: prepareAttackerModelToRu[webAppById.attacker_model || ''],
        inf_system: webAppById.inf_system,
        ip_address: webAppById.ip_address,
        domain_name: webAppById.domain_name,
        work_type: prepareWorkTypeToRu[webAppById.work_type || ''],
        greybox: webAppById.greybox,
        blackbox: webAppById.blackbox,
      });

      break;
    }

    case OBJECT_TYPES.API: {
      setObject({
        additional_info: apiById.additional_info,
        attacker_model: prepareAttackerModelToRu[apiById.attacker_model || ''],
        inf_system: apiById.inf_system,
        ip_address: apiById.ip_address,
        domain_name: apiById.domain_name,
        work_type: prepareWorkTypeToRu[apiById.work_type || ''],
        greybox: apiById.greybox,
        blackbox: apiById.blackbox,
      });

      break;
    }

    case OBJECT_TYPES.MobileApp: {
      setObject({
        additional_info: mobileAppById.additional_info,
        inf_system: mobileAppById.inf_system,
        greybox: mobileAppById.greybox,
        blackbox: mobileAppById.blackbox,
        app_name: mobileAppById.app_name,
        platform_type: prepareMobilePlatformToRu[mobileAppById.platform_type],
      });

      break;
    }

    case OBJECT_TYPES.NetworkDevice: {
      setObject({
        additional_info: networkDeviceById.additional_info,
        inf_system: networkDeviceById.inf_system,
        greybox: networkDeviceById.greybox,
        blackbox: networkDeviceById.blackbox,
        assignment: networkDeviceById.assignment,
        attacker_model: prepareAttackerModelToRu[networkDeviceById.attacker_model || ''],
        office: networkDeviceById.office,
        ip_address: networkDeviceById.ip_address,
        network_device_name: networkDeviceById.network_device_name,
        work_type: prepareWorkTypeToRu[networkDeviceById.work_type || ''],
      });

      setGroupType({
        text: networkDeviceById.office ? localization.office.notificationTitle : networkDeviceById.inf_system ? localization.infSystem.notificationTitle : localization.common.absent,
        value: networkDeviceById.office ? 'office' : networkDeviceById.inf_system ? 'inf_system' : 'none',
      });

      break;
    }

    case OBJECT_TYPES.Server: {
      setObject({
        additional_info: serverById.additional_info,
        inf_system: serverById.inf_system,
        greybox: serverById.greybox,
        blackbox: serverById.blackbox,
        assignment: serverById.assignment,
        attacker_model: prepareAttackerModelToRu[serverById.attacker_model || ''],
        office: serverById.office,
        ip_address: serverById.ip_address,
        network_device_name: serverById.network_device_name,
        work_type: prepareWorkTypeToRu[serverById.work_type || ''],
      });

      setGroupType({
        text: serverById.office ? localization.office.notificationTitle : serverById.inf_system ? localization.infSystem.notificationTitle : localization.common.absent,
        value: serverById.office ? 'office' : serverById.inf_system ? 'inf_system' : 'none',
      });

      break;
    }

    case OBJECT_TYPES.ARM: {
      setObject({
        additional_info: armById.additional_info,
        inf_system: armById.inf_system,
        greybox: armById.greybox,
        blackbox: armById.blackbox,
        attacker_model: prepareAttackerModelToRu[armById.attacker_model || ''],
        office: armById.office,
        ip_address: armById.ip_address,
        network_device_name: armById.network_device_name,
        work_type: prepareWorkTypeToRu[armById.work_type || ''],
      });

      setGroupType({
        text: armById.office ? localization.office.notificationTitle : armById.inf_system ? localization.infSystem.notificationTitle : localization.common.absent,
        value: armById.office ? 'office' : armById.inf_system ? 'inf_system' : 'none',
      });

      break;
    }

    case OBJECT_TYPES.WiFi: {
      setObject({
        additional_info: wifiById.additional_info,
        greybox: wifiById.greybox,
        blackbox: wifiById.blackbox,
        attacker_model: prepareAttackerModelToRu[wifiById.attacker_model || ''],
        office: wifiById.office,
        bssid: wifiById.bssid,
        ssid: wifiById.ssid,
        id: objectId,
      });

      break;
    }

    case OBJECT_TYPES.SocialEngineering: {
      setObject({
        additional_info: socialEngineeringById.additional_info,
        office: socialEngineeringById.office,
        engineering_type: socialEngineeringById.engineering_type,
        success_criterion: socialEngineeringById.success_criterion,
      });

      if (socialEngineeringById.engineering_type && socialEngineeringById.engineering_type.length > 0) {
        const prepareEngineeringType: any[] = [];

        socialEngineeringById.engineering_type.forEach((currentEngineering) => {
          const engineeringItem = socialEngineeringList.find(engineering => engineering.value === currentEngineering);

          if (engineeringItem) {
            prepareEngineeringType.push(engineeringItem);
          }
        });

        setEngineeringType(prepareEngineeringType);
      }

      break;
    }

    case OBJECT_TYPES.DesktopApp: {
      setObject({
        additional_info: desktopAppById.additional_info,
        app_name: desktopAppById.app_name,
        inf_system: desktopAppById.inf_system,
        platform_type: prepareDesktopPlatformToRu[desktopAppById.platform_type],
        greybox: desktopAppById.greybox,
        blackbox: desktopAppById.blackbox,
      });

      break;
    }

    case OBJECT_TYPES.SourceCode: {
      setObject({
        inf_system: sourceCodeById.inf_system,
        number_rows: sourceCodeById.number_rows,
        programming_language: sourceCodeById.programming_language,
      });

      if (sourceCodeById.programming_language && sourceCodeById.programming_language.length > 0) {
        const prepareProgrammingLanguage: any[] = [];

        sourceCodeById.programming_language.forEach((currentLanguage) => {
          const languageItem = programmingLanguageList.find(language => language.value === currentLanguage);

          if (languageItem) {
            prepareProgrammingLanguage.push(languageItem);
          }
        });

        setProgrammingLanguage(prepareProgrammingLanguage);
      }

      break;
    }

    case OBJECT_TYPES.External: {
      setObject({
        inf_system: externalById.inf_system,
        ip_address: externalById.ip_address,
        additional_info: externalById.additional_info,
      });

      break;
    }

    case OBJECT_TYPES.Internal: {
      setObject({
        inf_system: internalById.inf_system,
        ip_address: internalById.ip_address,
        additional_info: internalById.additional_info,
      });

      break;
    }

    case OBJECT_TYPES.Other: {
      setObject({
        inf_system: otherById.inf_system,
        ip_address: otherById.ip_address,
        additional_info: otherById.additional_info,
        office: otherById.office,
      });

      setGroupType({
        text: otherById.office ? localization.office.notificationTitle : otherById.inf_system ? localization.infSystem.notificationTitle : localization.common.absent,
        value: otherById.office ? 'office' : otherById.inf_system ? 'inf_system' : 'none',
      });

      break;
    }
    }
  }, [objectId, selectTab, webAppById, apiById, mobileAppById, networkDeviceById, serverById, armById, wifiById,
    socialEngineeringById, desktopAppById, sourceCodeById, externalById, internalById, otherById, isModalVisible]);

  useEffect(() => {
    if (allInfSystems.length !== 0 && allOffices.length !== 0 && customer?.id) {
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

      prepareInfSystems[prepareInfSystems.length] = {
        text: localization.infSystem.createButtonText,
        id: 'create',
      };

      prepareOffices[prepareOffices.length] = {
        text: localization.office.createButtonText,
        id: 'create',
      };
    } else if (!isGroupsLoading && customer?.id) {
      prepareInfSystems = [];
      prepareOffices = [];

      dispatch(getAllInfSystems({ id: customer?.id }));
      dispatch(getAllOffices({ id: customer?.id }));

      prepareInfSystems[prepareInfSystems.length] = {
        text: localization.infSystem.createButtonText,
        id: 'create',
      };

      prepareOffices[prepareOffices.length] = {
        text: localization.office.createButtonText,
        id: 'create',
      };

      setGroupsLoading(true);
    }
  }, [dispatch, isGroupsLoading, allInfSystems, allOffices, customer]);

  useEffect(() => {
    if (isChangeDone) {
      navigate(`/${ROUTES.PROJECTS}/${projectId}/${ROUTES.OBJECTS}`);

      dispatch(setChangeDone(false));
    }
  }, [dispatch, navigate, projectId, isChangeDone]);

  const changeWebAppHandler = () => {
    let isValidate: boolean = false;

    switch(objectType.value) {
    case OBJECT_TYPES.WebApp: {
      const webApp: IWebApp = {
        additional_info: object.additional_info,
        attacker_model: object.attacker_model,
        inf_system: object.inf_system,
        ip_address: object.ip_address,
        domain_name: object.domain_name,
        work_type: object.work_type,
        greybox: object.greybox,
        blackbox: object.blackbox,
        object_type: OBJECT_TYPES.WebApp,
        id: objectId,
      };

      isValidate = validateWebApp(webApp, dispatch);

      if (isValidate && projectId && objectId) {
        if (!webApp.inf_system?.id || !webApp.inf_system?.name) {
          delete webApp.inf_system;
          delete webApp.inf_system_id;
        } else {
          webApp.inf_system_id = webApp.inf_system.id;

          delete webApp.inf_system;
        }

        webApp.attacker_model = prepareAttackerModelToEng[webApp.attacker_model || ''];
        webApp.work_type = prepareWorkTypeToEng[webApp.work_type || ''];

        dispatch(changeObject({ projectId, objectId, objectType: selectTab, object: webApp }));

        setModalVisible(false);
      }

      break;
    }

    case OBJECT_TYPES.API: {
      const api: IApi = {
        additional_info: object.additional_info,
        attacker_model: object.attacker_model,
        inf_system: object.inf_system,
        ip_address: object.ip_address,
        domain_name: object.domain_name,
        work_type: object.work_type,
        greybox: object.greybox,
        blackbox: object.blackbox,
        object_type: OBJECT_TYPES.API,
        id: objectId,
      };

      isValidate = validateApi(api, dispatch);

      if (isValidate && projectId && objectId) {
        if (!api.inf_system?.id || !api.inf_system?.name) {
          delete api.inf_system;
          delete api.inf_system_id;
        } else {
          api.inf_system_id = api.inf_system.id;

          delete api.inf_system;
        }

        api.attacker_model = prepareAttackerModelToEng[api.attacker_model || ''];
        api.work_type = prepareWorkTypeToEng[api.work_type || ''];

        dispatch(changeObject({ projectId, objectType: selectTab, object: api, objectId }));

        setModalVisible(false);
      }

      break;
    }

    case OBJECT_TYPES.MobileApp: {
      const mobileApp: IMobileApp = {
        additional_info: object.additional_info,
        inf_system: object.inf_system,
        greybox: object.greybox,
        blackbox: object.blackbox,
        app_name: object.app_name,
        platform_type: object.platform_type,
        object_type: OBJECT_TYPES.MobileApp,
        id: objectId,
      };

      isValidate = validateMobileApp(mobileApp, dispatch);

      if (isValidate && projectId && objectId) {
        if (!mobileApp.inf_system?.id || !mobileApp.inf_system?.name) {
          delete mobileApp.inf_system;
          delete mobileApp.inf_system_id;
        } else {
          mobileApp.inf_system_id = mobileApp.inf_system.id;

          delete mobileApp.inf_system;
        }

        mobileApp.platform_type = prepareMobilePlatformToEng[mobileApp.platform_type];

        dispatch(changeObject({ projectId, objectId, object: mobileApp, objectType: selectTab }));

        setModalVisible(false);
      }

      break;
    }

    case OBJECT_TYPES.NetworkDevice: {
      const networkDevice: INetworkDevice = {
        additional_info: object.additional_info,
        inf_system: object.inf_system,
        greybox: object.greybox,
        blackbox: object.blackbox,
        assignment: object.assignment,
        attacker_model: object.attacker_model,
        office: object.office,
        ip_address: object.ip_address,
        network_device_name: object.network_device_name,
        work_type: object.work_type,
        object_type: OBJECT_TYPES.NetworkDevice,
        id: objectId,
      };

      isValidate = validateNetworkDevice(networkDevice, dispatch);

      if (isValidate && projectId && objectId) {
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

        dispatch(changeObject({ projectId, objectType: selectTab, object: networkDevice, objectId }));

        setModalVisible(false);
      }

      break;
    }

    case OBJECT_TYPES.Server: {
      const server: IServer = {
        additional_info: object.additional_info,
        inf_system: object.inf_system,
        greybox: object.greybox,
        blackbox: object.blackbox,
        assignment: object.assignment,
        attacker_model: object.attacker_model,
        office: object.office,
        ip_address: object.ip_address,
        network_device_name: object.network_device_name,
        work_type: object.work_type,
        object_type: OBJECT_TYPES.Server,
        id: objectId,
      };

      isValidate = validateServer(server, dispatch);

      if (isValidate && projectId && objectId) {
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

        dispatch(changeObject({ projectId, objectType: selectTab, object: server, objectId }));

        setModalVisible(false);
      }

      break;
    }

    case OBJECT_TYPES.ARM: {
      const arm: IArm = {
        additional_info: object.additional_info,
        inf_system: object.inf_system,
        greybox: object.greybox,
        blackbox: object.blackbox,
        attacker_model: object.attacker_model,
        office: object.office,
        ip_address: object.ip_address,
        network_device_name: object.network_device_name,
        work_type: object.work_type,
        object_type: OBJECT_TYPES.ARM,
        id: objectId,
      };

      isValidate = validateArm(arm, dispatch);

      if (isValidate && projectId && objectId) {
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

        dispatch(changeObject({ projectId, objectType: selectTab, object: arm, objectId }));

        setModalVisible(false);
      }

      break;
    }

    case OBJECT_TYPES.WiFi: {
      const wifi: IWifi = {
        additional_info: object.additional_info,
        greybox: object.greybox,
        blackbox: object.blackbox,
        attacker_model: object.attacker_model,
        office: object.office,
        bssid: object.bssid,
        ssid: object.ssid,
        object_type: OBJECT_TYPES.WiFi,
        id: objectId,
      };

      isValidate = validateWifi(wifi, dispatch, allWifies);

      if (isValidate && projectId && objectId) {
        if (!wifi.office?.id || !wifi.office?.name) {
          delete wifi.office;
          delete wifi.office_id;
        } else {
          wifi.office_id = wifi.office.id;

          delete wifi.office;
        }

        wifi.attacker_model = prepareAttackerModelToEng[wifi.attacker_model || ''];

        dispatch(changeObject({ projectId, objectId, objectType: selectTab, object: wifi }));

        setModalVisible(false);
      }

      break;
    }

    case OBJECT_TYPES.SocialEngineering: {
      const socialEngineering: ISocialEngineering = {
        additional_info: object.additional_info,
        office: object.office,
        engineering_type: object.engineering_type,
        success_criterion: object.success_criterion,
        object_type: OBJECT_TYPES.SocialEngineering,
        id: objectId,
      };

      isValidate = validateSocialEngineering(socialEngineering, dispatch);

      if (isValidate && projectId && objectId) {
        if (!socialEngineering.office?.id || !socialEngineering.office?.name) {
          delete socialEngineering.office;
          delete socialEngineering.office_id;
        } else {
          socialEngineering.office_id = socialEngineering.office.id;

          delete socialEngineering.office;
        }

        dispatch(changeObject({ projectId, objectId, object: socialEngineering, objectType: selectTab }));

        setModalVisible(false);
      }

      break;
    }

    case OBJECT_TYPES.DesktopApp: {
      const desktopApp: IDesktopApp = {
        additional_info: object.additional_info,
        app_name: object.app_name,
        inf_system: object.inf_system,
        platform_type: object.platform_type,
        greybox: object.greybox,
        blackbox: object.blackbox,
        object_type: OBJECT_TYPES.DesktopApp,
        id: objectId,
      };

      isValidate = validateDesktopApp(desktopApp, dispatch);

      if (isValidate && projectId && objectId) {
        if (!desktopApp.inf_system?.id || !desktopApp.inf_system?.name) {
          delete desktopApp.inf_system;
          delete desktopApp.inf_system_id;
        } else {
          desktopApp.inf_system_id = desktopApp.inf_system.id;

          delete desktopApp.inf_system;
        }

        desktopApp.platform_type = prepareDesktopPlatformToEng[desktopApp.platform_type];

        dispatch(changeObject({ projectId, objectId, objectType: selectTab, object: desktopApp }));

        setModalVisible(false);
      }

      break;
    }

    case OBJECT_TYPES.SourceCode: {
      const sourceCode: ISourceCode = {
        inf_system: object.inf_system,
        number_rows: object.number_rows,
        programming_language: object.programming_language,
        object_type: OBJECT_TYPES.SourceCode,
        id: objectId,
      };

      isValidate = validateSourceCode(sourceCode, dispatch);

      if (isValidate && projectId && objectId) {
        if (!sourceCode.inf_system?.id || !sourceCode.inf_system?.name) {
          delete sourceCode.inf_system;
          delete sourceCode.inf_system_id;
        } else {
          sourceCode.inf_system_id = sourceCode.inf_system.id;

          delete sourceCode.inf_system;
        }

        dispatch(changeObject({ projectId, objectId, object: sourceCode, objectType: selectTab }));

        setModalVisible(false);
      }

      break;
    }

    case OBJECT_TYPES.External: {
      const external: IExternal = {
        inf_system: object.inf_system,
        ip_address: object.ip_address,
        additional_info: object.additional_info,
        object_type: OBJECT_TYPES.External,
        id: objectId,
      };

      isValidate = validateExternal(external, dispatch);

      if (isValidate && projectId && objectId) {
        if (!external.inf_system?.id || !external.inf_system?.name) {
          delete external.inf_system;
          delete external.inf_system_id;
        } else {
          external.inf_system_id = external.inf_system.id;

          delete external.inf_system;
        }

        dispatch(changeObject({ projectId, objectId, object: external, objectType: selectTab }));

        setModalVisible(false);
      }

      break;
    }

    case OBJECT_TYPES.Internal: {
      const internal: IInternal = {
        inf_system: object.inf_system,
        ip_address: object.ip_address,
        additional_info: object.additional_info,
        object_type: OBJECT_TYPES.Internal,
        id: objectId,
      };

      isValidate = validateInternal(internal, dispatch);

      if (isValidate && projectId && objectId) {
        if (!internal.inf_system?.id || !internal.inf_system?.name) {
          delete internal.inf_system;
          delete internal.inf_system_id;
        } else {
          internal.inf_system_id = internal.inf_system.id;

          delete internal.inf_system;
        }

        dispatch(changeObject({ projectId, objectId, object: internal, objectType: selectTab }));

        setModalVisible(false);
      }

      break;
    }

    case OBJECT_TYPES.Other: {
      const other: IOther = {
        inf_system: object.inf_system,
        ip_address: object.ip_address,
        additional_info: object.additional_info,
        office: object.office,
        object_type: OBJECT_TYPES.Other,
        id: objectId,
      };

      isValidate = validateOther(other, dispatch);

      if (isValidate && projectId && objectId) {
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

        dispatch(changeObject({ projectId, objectType: selectTab, object: other, objectId }));

        setModalVisible(false);
      }

      break;
    }
    }
  };

  const resetWebAppDataHandler = () => {
    resetObjectData(dispatch, setObject, setGroupType, setEngineeringType, setProgrammingLanguage);
  };

  const onInfSystemNameChangeHandler = ({ text, id }: IPopupItem) => {
    if (id === 'create') {
      localStorage.setItem(CREATE_MODAL_OPEN, 'true');

      navigate(`${ROUTES.COMMON}${ROUTES.CUSTOMERS}/${customer?.id}/${ROUTES.INF_SYSTEMS}`);
    } else {
      setObject({...object, inf_system: {name: text, id: String(id)}});
    }
  };

  const onOfficeNameChangeHandler = ({ id, text }: IPopupItem) => {
    if (id === 'create') {
      localStorage.setItem(CREATE_MODAL_OPEN, 'true');

      navigate(`${ROUTES.COMMON}${ROUTES.CUSTOMERS}/${customer?.id}/${ROUTES.OFFICES}`);
    } else {
      setObject({...object, office: {name: text, id: String(id)}});
    }
  };

  const onAttackerModelChangeHandler = ({ text }: IPopupItem) => {
    setObject({...object, attacker_model: text || ''});
  };

  const onMobilePlatformChangeHandler = ({ text }: IPopupItem) => {
    setObject({...object, platform_type: text || ''});
  };

  const onDesktopPlatformChangeHandler = ({ text }: IPopupItem) => {
    setObject({...object, platform_type: text || ''});
  };

  const onEngineeringTypeClick = (data: any) => {
    const prepareEngineeringType = data.map(({ value }: any) => value);

    setObject({...object, engineering_type: prepareEngineeringType });
    setEngineeringType(data);
  };

  const onProgrammingLanguageClick = (data: any) => {
    const prepareProgrammingLanguage = data.map(({ value }: any) => value);

    setObject({...object, programming_language: prepareProgrammingLanguage });
    setProgrammingLanguage(data);
  };

  const onWorkTypeChangeHandler = ({ text }: IPopupItem) => setObject({ ...object, work_type: text || '' });
  const onSelectTypeChange = (item: IPopupItem) => setObjectType(item);
  const onGroupChangeHandler = (item: IPopupItem) => setGroupType(item);


  const onConfirmChangeModalHandler = () => setChangeWebAppModal(prevState => !prevState);
  const onConfirmResetModalHandler = () => setResetWebAppDataModal(prevState => !prevState);

  return (
    <>
      <Modal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        title={`${localization.common.changeButtonText} ${selectTitle === 'социальная инженерия' ? 'социальную инженерию' : selectTitle}`}
      >
        <div className={styles['modal-inputs']}>
          <InputForm
            text={localization.modals.objects.objectTypeText}
            placeholder={localization.modals.objects.objectTypePlaceholder}
            popupItems={objectTypeItems}
            value={objectType.text}
            onClick={showPopupHandler}
            onPopupChange={onSelectTypeChange}
            disabled
          />
          {(objectType.value === OBJECT_TYPES.NetworkDevice || objectType.value === OBJECT_TYPES.Server
            || objectType.value === OBJECT_TYPES.ARM || objectType.value === OBJECT_TYPES.Other) && (
            <>
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
                  value={object.inf_system?.name}
                  popupItems={prepareInfSystems}
                  onClick={showPopupHandler}
                  onPopupChange={onInfSystemNameChangeHandler}
                  onChange={(event) => {
                    setObject({...object, inf_system: {name: event.target.value, id: ''}});
                  }}
                  disabled
                />
              )}
              {groupType.value === 'office' && (
                <InputForm
                  text={localization.modals.objects.officeText}
                  placeholder={localization.modals.objects.officePlaceholder}
                  value={object.office?.name}
                  popupItems={prepareOffices}
                  onClick={showPopupHandler}
                  onPopupChange={onOfficeNameChangeHandler}
                  onChange={(event) => {
                    setObject({...object, office: {name: event.target.value, id: ''}});
                  }}
                  disabled
                />
              )}
            </>
          )}
          {objectType.value !== OBJECT_TYPES.NetworkDevice && objectType.value !== OBJECT_TYPES.Server
            && objectType.value !== OBJECT_TYPES.ARM && objectType.value !== OBJECT_TYPES.WiFi
            && objectType.value !== OBJECT_TYPES.SocialEngineering && objectType.value !== OBJECT_TYPES.Other && (
            <InputForm
              text={localization.modals.objects.infSystemText}
              placeholder={localization.modals.objects.infSystemPlaceholder}
              value={object.inf_system?.name}
              popupItems={prepareInfSystems}
              onClick={showPopupHandler}
              onPopupChange={onInfSystemNameChangeHandler}
              onChange={(event) => {
                setObject({...object, inf_system: {name: event.target.value, id: ''}});
              }}
              disabled
            />
          )}
          {(objectType.value === OBJECT_TYPES.WiFi || objectType.value === OBJECT_TYPES.SocialEngineering) && (
            <InputForm
              text={localization.modals.objects.officeText}
              placeholder={localization.modals.objects.officePlaceholder}
              value={object.office?.name}
              popupItems={prepareOffices}
              onClick={showPopupHandler}
              onPopupChange={onOfficeNameChangeHandler}
              onChange={(event) => {
                setObject({...object, office: {name: event.target.value, id: ''}});
              }}
              disabled
            />
          )}
          {(objectType.value === OBJECT_TYPES.DesktopApp || objectType.value === OBJECT_TYPES.MobileApp) && (
            <InputForm
              text={localization.modals.objects.appNameText}
              placeholder={localization.modals.objects.appNamePlaceholder}
              errorMessage={objectType.value === OBJECT_TYPES.DesktopApp ? desktop_app_name_error : mobile_app_name_error}
              value={object.app_name}
              onChange={(event) => {
                setObject({...object, app_name: event.target.value});
              }}
              required
            />
          )}
          {(objectType.value === OBJECT_TYPES.MobileApp) && (
            <InputForm
              text={localization.modals.objects.platformTypeText}
              placeholder={localization.modals.objects.platformTypePlaceholder}
              value={object.platform_type}
              errorMessage={mobile_app_platform_error}
              popupItems={mobilePlatformPopupItems}
              onClick={showPopupHandler}
              onPopupChange={onMobilePlatformChangeHandler}
              disabled
              onChange={(event) => {
                setObject({...object, platform_type: event.target.value});
              }}
              required
            />
          )}
          {(objectType.value === OBJECT_TYPES.DesktopApp) && (
            <InputForm
              text={localization.modals.objects.platformTypeText}
              placeholder={localization.modals.objects.platformTypePlaceholder}
              errorMessage={desktop_platform_error}
              value={object.platform_type}
              popupItems={desktopPlatformPopupItems}
              onClick={showPopupHandler}
              onPopupChange={onDesktopPlatformChangeHandler}
              onChange={(event) => {
                setObject({...object, platform_type: event.target.value});
              }}
              disabled
              required
            />
          )}
          {objectType.value !== OBJECT_TYPES.MobileApp && objectType.value !== OBJECT_TYPES.WiFi
            && objectType.value !== OBJECT_TYPES.SocialEngineering && objectType.value !== OBJECT_TYPES.DesktopApp
            && objectType.value !== OBJECT_TYPES.SourceCode && (
            <InputForm
              text={objectType.value === OBJECT_TYPES.External ? localization.modals.objects.ipExternalAddressText :
                objectType.value === OBJECT_TYPES.Internal ? localization.modals.objects.ipInternalAddressText : localization.modals.objects.ipAddressText
              }
              placeholder={objectType.value === OBJECT_TYPES.External ? localization.modals.objects.ipExternalAddressPlaceholder :
                objectType.value === OBJECT_TYPES.Internal ? localization.modals.objects.ipInternalAddressPlaceholder : localization.modals.objects.ipAddressPlaceholder
              }
              errorMessage={objectType.value === OBJECT_TYPES.External ? external_ip_address_error :
                objectType.value === OBJECT_TYPES.Internal ? internal_ip_address_error :
                  objectType.value === OBJECT_TYPES.Other ? other_ip_address_error :
                    objectType.value === OBJECT_TYPES.WebApp ? web_app_ip_address_error :
                      objectType.value === OBJECT_TYPES.API ? api_ip_address_error :
                        objectType.value === OBJECT_TYPES.NetworkDevice ? network_device_ip_address_error :
                          objectType.value === OBJECT_TYPES.Server ? server_ip_address_error : arm_ip_address_error
              }
              value={object.ip_address}
              onChange={(event) => {
                setObject({...object, ip_address: event.target.value});
              }}
              required
            />
          )}
          {(objectType.value === OBJECT_TYPES.NetworkDevice || objectType.value === OBJECT_TYPES.Server ||
            objectType.value === OBJECT_TYPES.ARM) && (
            <InputForm
              text={localization.modals.objects.networkDeviceText}
              placeholder={localization.modals.objects.networkDevicePlaceholder}
              value={object.network_device_name}
              onChange={(event) => {
                setObject({...object, network_device_name: event.target.value});
              }}
            />
          )}
          {(objectType.value === OBJECT_TYPES.NetworkDevice || objectType.value === OBJECT_TYPES.Server) && (
            <InputForm
              text={localization.modals.objects.assignmentText}
              placeholder={localization.modals.objects.assignmentPlaceholder}
              value={object.assignment}
              onTextareaChange={(event) => {
                setObject({...object, assignment: event.target.value});
              }}
              textarea
            />
          )}
          {(objectType.value === OBJECT_TYPES.WebApp || objectType.value === OBJECT_TYPES.API) && (
            <InputForm
              text={localization.modals.objects.domainNameText}
              placeholder={localization.modals.objects.domainNamePlaceholder}
              value={object.domain_name}
              onChange={(event) => {
                setObject({...object, domain_name: event.target.value});
              }}
            />
          )}
          {(objectType.value === OBJECT_TYPES.WiFi) && (
            <>
              <InputForm
                text={localization.modals.objects.ssidText}
                placeholder={localization.modals.objects.ssidPlaceholder}
                errorMessage={ssid_error}
                value={object.ssid}
                onChange={(event) => {
                  setObject({...object, ssid: event.target.value});
                }}
                required
              />
              <InputForm
                text={localization.modals.objects.bssidText}
                placeholder={localization.modals.objects.bssidPlaceholder}
                errorMessage={bssid_error}
                value={object.bssid}
                onChange={(event) => {
                  setObject({...object, bssid: event.target.value});
                }}
                required
              />
            </>
          )}
          {(objectType.value === OBJECT_TYPES.SocialEngineering) && (
            <>
              <InputForm
                text={localization.modals.objects.engineeringTypeText}
                placeholder={localization.modals.objects.engineeringTypePlaceholder}
                value={engineeringType}
                onSelectChange={onEngineeringTypeClick}
                options={socialEngineeringList}
                isMulti
              />
              <InputForm
                text={localization.modals.objects.successCriterionText}
                placeholder={localization.modals.objects.successCriterionPlaceholder}
                errorMessage={success_criterion_error}
                value={object.success_criterion}
                onTextareaChange={(event) => {
                  setObject({...object, success_criterion: event.target.value});
                }}
                textarea
                required
              />
            </>
          )}
          {(objectType.value === OBJECT_TYPES.SourceCode) && (
            <>
              <InputForm
                text={localization.modals.objects.programmingLanguageText}
                placeholder={localization.modals.objects.programmingLanguagePlaceholder}
                value={programmingLanguage}
                onSelectChange={onProgrammingLanguageClick}
                options={programmingLanguageList}
                isMulti
              />
              <InputForm
                text={localization.modals.objects.numberRowsText}
                placeholder={localization.modals.objects.numberRowsPlaceholder}
                type={InputTypeEnum.Number}
                errorMessage={number_rows_error}
                value={object.number_rows}
                onChange={(event) => {
                  setObject({...object, number_rows: parseInt(event.target.value)});
                }}
              />
            </>
          )}
          {(objectType.value === OBJECT_TYPES.WebApp || objectType.value === OBJECT_TYPES.API
            || objectType.value === OBJECT_TYPES.NetworkDevice || objectType.value === OBJECT_TYPES.Server
            || objectType.value === OBJECT_TYPES.ARM || objectType.value === OBJECT_TYPES.WiFi) && (
            <InputForm
              text={localization.modals.objects.attackerModelText}
              placeholder={localization.modals.objects.attackerModelPlaceholder}
              errorMessage={objectType.value === OBJECT_TYPES.WebApp ? web_app_attacker_model_error :
                objectType.value === OBJECT_TYPES.API ? api_attacker_model_error :
                  objectType.value === OBJECT_TYPES.NetworkDevice ? network_device_attacker_model_error :
                    objectType.value === OBJECT_TYPES.Server ? server_attacker_model_error : arm_attacker_model_error
              }
              popupItems={attackerModelPopupItems}
              value={object.attacker_model}
              onClick={showPopupHandler}
              onPopupChange={onAttackerModelChangeHandler}
              onChange={(event) => {
                setObject({...object, attacker_model: event.target.value});
              }}
              disabled
              required
            />
          )}
          {(objectType.value === OBJECT_TYPES.WebApp || objectType.value === OBJECT_TYPES.API
            || objectType.value === OBJECT_TYPES.NetworkDevice || objectType.value === OBJECT_TYPES.Server
            || objectType.value === OBJECT_TYPES.ARM) && (
            <InputForm
              text={localization.modals.objects.workTypeText}
              placeholder={localization.modals.objects.workTypePlaceholder}
              errorMessage={objectType.value === OBJECT_TYPES.WebApp ? web_app_work_type_error :
                objectType.value === OBJECT_TYPES.API ? api_work_type_error :
                  objectType.value === OBJECT_TYPES.NetworkDevice ? network_device_work_type_error :
                    objectType.value === OBJECT_TYPES.Server ? server_work_type_error : arm_work_type_error
              }
              popupItems={workTypePopupItems}
              value={object.work_type}
              onClick={showPopupHandler}
              onPopupChange={onWorkTypeChangeHandler}
              onChange={(event) => {
                setObject({...object, work_type: event.target.value});
              }}
              disabled
              required
            />
          )}
          {objectType.value !== OBJECT_TYPES.SourceCode && (
            <InputForm
              text={localization.modals.objects.additionalInfoText}
              placeholder={localization.modals.objects.additionalInfoPlaceholder}
              value={object.additional_info}
              onTextareaChange={(event) => {
                setObject({...object, additional_info: event.target.value});
              }}
              textarea
            />
          )}
          {objectType.value !== OBJECT_TYPES.SourceCode && objectType.value !== OBJECT_TYPES.SocialEngineering
            && objectType.value !== OBJECT_TYPES.External && objectType.value !== OBJECT_TYPES.Internal
            && objectType.value !== OBJECT_TYPES.Other && (
            <>
              <InputForm
                text={localization.modals.objects.greyboxText}
                type={InputTypeEnum.Checkbox}
                value={object.greybox}
                onChange={(event) => {
                  setObject({...object, greybox: event.target.checked});
                }}
              />
              <InputForm
                text={localization.modals.objects.blackboxText}
                errorMessage={objectType.value === OBJECT_TYPES.WebApp ? web_app_test_method_error :
                  objectType.value === OBJECT_TYPES.API ? api_test_method_error :
                    objectType.value === OBJECT_TYPES.NetworkDevice ? network_device_test_method_error :
                      objectType.value === OBJECT_TYPES.WiFi ? wifi_test_method_error :
                        objectType.value === OBJECT_TYPES.DesktopApp ? desktop_app_test_method_error :
                          objectType.value === OBJECT_TYPES.MobileApp ? mobile_app_test_method_error :
                            objectType.value === OBJECT_TYPES.Server ? server_test_method_error : arm_test_method_error
                }
                type={InputTypeEnum.Checkbox}
                value={object.blackbox}
                onChange={(event) => {
                  setObject({...object, blackbox: event.target.checked});
                }}
              />
            </>
          )}
        </div>
        <div className={classNames(styles['modal-buttons'], styles['modal-buttons_between'])}>
          <Button buttonText={localization.common.changeButtonText} onClick={onConfirmChangeModalHandler} />
          <Button
            type={ButtonTypeEnum.Red}
            buttonText={localization.modals.resetButtonText}
            onClick={onConfirmResetModalHandler}
          />
        </div>
      </Modal>
      <ConfirmModal
        isModalVisible={isChangeWebAppModal}
        setModalVisible={setChangeWebAppModal}
        text={prepareObjectTypesForChangeModalToRu[selectTab]}
        onConfirmClick={changeWebAppHandler}
        type={ModalTypes.Change}
      />
      <ConfirmModal
        isModalVisible={isResetWebAppDataModal}
        setModalVisible={setResetWebAppDataModal}
        text={prepareObjectTypesForResetModalToRu[selectTab]}
        onConfirmClick={resetWebAppDataHandler}
        type={ModalTypes.Reset}
      />
    </>
  );
};

export default ChangeObject;
