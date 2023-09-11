import {FC, useEffect, useState} from 'react';

import classNames from 'classnames';

import {useParams} from 'react-router-dom';

import Modal from '../Modal';
import {IModalProps} from '../ModalTypes';
import InputForm from '../../inputForm/InputForm';
import styles from '../Modal.module.scss';
import Button from '../../button/Button';
import {InputTypeEnum} from '../../input/InputTypes';
import {useAppDispatch} from '../../../hooks/useAppDispatch';
import {useAppSelector} from '../../../hooks/useAppSelector';
import {IPopupItem} from '../../popup/PopupTypes';
import {selectVulnErrors, selectVulns} from '../../../store/vulns/vulnsSelectors';
import {useShowPopup} from '../../../hooks/useShowPopup';
import {IVuln} from '../../../store/vulns/vulnsTypes';
import {validateVuln} from '../../../utils/validate/validateVuln';
import {createVuln, getAllVulns, uploadVulnScreenshots} from '../../../store/vulns/vulnsAsync';
import {
  attackComplexityPopupItems,
  attackVectorPopupItems,
  availabilityPopupItems,
  confidentialityPopupItems,
  integrityPopupItems,
  negativeConsequencesTypes,
  prepareRiskLevelToRu,
  privilegesRequiredPopupItems,
  scopePopupItems,
  userInteractionPopupItems,
} from '../../../constants/vulns';
import ConfirmModal from '../general/confirm/ConfirmModal';
import {ModalTypes} from '../general/confirm/ConfirmTypes';
import {ButtonTypeEnum} from '../../button/ButtonTypes';

import Text from '../../text/Text';
import Title from '../../title/Title';
import {OBJECT_TYPES} from '../../../constants/objects';

import {TextVariantEnum} from '../../text/TextTypes';

import {TitleVariantEnum} from '../../title/TitleTypes';

import {localization} from '../../../localization/localization';

import {resetVulnData} from './utils/resetVulnData';

import {calculateCvss} from './utils/calculateCvss';


let isModalCorrect = false;

interface IModalVulnProps extends IModalProps {
  objectType: string;
}

let prepareObjectType = '';

const CreateVuln: FC<IModalVulnProps> = ({
  isModalVisible,
  setModalVisible,
  objectType,
}) => {
  const dispatch = useAppDispatch();

  const { projectId, objectId } = useParams();

  const { allVulns } = useAppSelector(selectVulns);

  const { showPopupHandler } = useShowPopup();

  const {
    location_error,
    vulnerability_name_error,
    description_error,
    procedure_exploiting_error,
    recommendation_error,
    negative_consequences_error,
    cve_id_error,

    attack_vector_error,
    attack_complexity_error,
    privileges_required_error,
    user_interaction_error,
    integrity_error,
    availability_error,
    confidentiality_error,
    scope_error,
  } = useAppSelector(selectVulnErrors);

  useEffect(() => {
    switch (objectType) {
    case 'webApp': {
      prepareObjectType = OBJECT_TYPES.WebApp;

      break;
    }

    case 'api': {
      prepareObjectType = OBJECT_TYPES.API;

      break;
    }

    case 'mobileApp': {
      prepareObjectType = OBJECT_TYPES.MobileApp;

      break;
    }

    case 'networkDevice': {
      prepareObjectType = OBJECT_TYPES.NetworkDevice;

      break;
    }

    case 'server': {
      prepareObjectType = OBJECT_TYPES.Server;

      break;
    }

    case 'arm': {
      prepareObjectType = OBJECT_TYPES.ARM;

      break;
    }

    case 'wifi': {
      prepareObjectType = OBJECT_TYPES.WiFi;

      break;
    }

    case 'socialEngineering': {
      prepareObjectType = OBJECT_TYPES.SocialEngineering;

      break;
    }

    case 'desktopApp': {
      prepareObjectType = OBJECT_TYPES.DesktopApp;

      break;
    }

    case 'sourceCode': {
      prepareObjectType = OBJECT_TYPES.SourceCode;

      break;
    }

    case 'external': {
      prepareObjectType = OBJECT_TYPES.External;

      break;
    }

    case 'internal': {
      prepareObjectType = OBJECT_TYPES.Internal;

      break;
    }

    case 'other': {
      prepareObjectType = OBJECT_TYPES.Other;

      break;
    }
    }
  }, [objectType]);

  const [vuln, setVuln] = useState<IVuln>({
    cvss_score: 0,
    cvss_vector: '',
    description: '',
    location: '',
    name: '',
    negative_consequences: [],
    procedure_exploiting: '',
    recommendations: '',
    risk_level: '',
  });

  const [cvssAV, setCvssAV] = useState<IPopupItem>({
    text: '',
    value: '',
  });
  const [cvssAC, setCvssAC] = useState<IPopupItem>({
    text: '',
    value: '',
  });
  const [cvssPR, setCvssPR] = useState<IPopupItem>({
    text: '',
    value: '',
  });
  const [cvssUI, setCvssUI] = useState<IPopupItem>({
    text: '',
    value: '',
  });
  const [cvssS, setCvssS] = useState<IPopupItem>({
    text: '',
    value: '',
  });
  const [cvssC, setCvssC] = useState<IPopupItem>({
    text: '',
    value: '',
  });
  const [cvssI, setCvssI] = useState<IPopupItem>({
    text: '',
    value: '',
  });
  const [cvssA, setCvssA] = useState<IPopupItem>({
    text: '',
    value: '',
  });

  const [cveId, setCveId] = useState<string>('');
  const [cweId, setCweId] = useState<string>('');

  const [screenshots, setScreenshots] = useState<FileList | any[]>();
  const [selectedNegativeOption, setSelectedNegativeOption] = useState<any>(null);

  const [isCreateVulnModal, setCreateVulnModal] = useState<boolean>(false);
  const [isResetVulnDataModal, setResetVulnDataModal] = useState<boolean>(false);
  const [isVulnsLoading, setVulnsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (projectId && objectId && !isVulnsLoading && allVulns.length === 0) {
      dispatch(getAllVulns({ projectId, objectId, objectType: prepareObjectType }));

      setVulnsLoading(true);
    }

    if (screenshots && isModalCorrect && projectId && objectId) {
      let vulnId = '';
      const data = new FormData();

      allVulns.forEach((prepareVuln) => {
        if (prepareVuln.name === vuln.name && prepareVuln.id) {
          vulnId = prepareVuln.id;
        }
      });

      Array.from(screenshots).forEach((screenshot) => {
        data.append('files', screenshot, screenshot.name);
      });

      dispatch(uploadVulnScreenshots({ files: data, vulnId, projectId, objectId, objectType: prepareObjectType }));

      setVuln({
        ...vuln,
        name: '',
      });
      setScreenshots([]);

      isModalCorrect = false;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, objectId, projectId, allVulns, isVulnsLoading]);

  useEffect(() => {
    calculateCvss(vuln, setVuln, cvssAV, cvssAC, cvssPR, cvssUI, cvssS, cvssC, cvssI, cvssA);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cvssAV, cvssAC, cvssPR, cvssUI, cvssS, cvssC, cvssI, cvssA]);

  const addVulnHandler = () => {
    const cvssItems = [cvssAV, cvssAC, cvssPR, cvssUI, cvssS, cvssC, cvssI, cvssA];

    const isValidate = validateVuln(vuln, dispatch, cvssItems, allVulns, cveId, cweId);

    if (isValidate && objectId && projectId) {
      isModalCorrect = true;

      dispatch(createVuln({ objectId, projectId, objectType: prepareObjectType, vuln }));

      if (!screenshots) {
        setVuln({
          ...vuln,
          cvss_score: 0,
          cvss_vector: '',
          description: '',
          location: '',
          negative_consequences: [],
          procedure_exploiting: '',
          recommendations: '',
          risk_level: '',
          name: '',
        });
      } else if (screenshots) {
        setVuln({
          ...vuln,
          cvss_score: 0,
          cvss_vector: '',
          description: '',
          location: '',
          negative_consequences: [],
          procedure_exploiting: '',
          recommendations: '',
          risk_level: '',
        });
      }

      setCveId('');
      setCweId('');

      setCvssAV({
        text: '',
        value: '',
      });
      setCvssAC({
        text: '',
        value: '',
      });
      setCvssPR({
        text: '',
        value: '',
      });
      setCvssUI({
        text: '',
        value: '',
      });
      setCvssS({
        text: '',
        value: '',
      });
      setCvssC({
        text: '',
        value: '',
      });
      setCvssI({
        text: '',
        value: '',
      });
      setCvssA({
        text: '',
        value: '',
      });

      setModalVisible(false);
    }
  };

  const resetVulnDataHandler = () => {
    resetVulnData(dispatch, setVuln, setCvssAV, setCvssAC, setCvssPR, setCvssUI, setCvssS, setCvssC, setCvssI,
      setCvssA, setCveId, setCweId);
  };

  const onCvssAVPopupItemChange = (item: IPopupItem) => setCvssAV(item);
  const onCvssACPopupItemChange = (item: IPopupItem) => setCvssAC(item);
  const onCvssPRPopupItemChange = (item: IPopupItem) => setCvssPR(item);
  const onCvssUIPopupItemChange = (item: IPopupItem) => setCvssUI(item);
  const onCvssSPopupItemChange = (item: IPopupItem) => setCvssS(item);
  const onCvssCPopupItemChange = (item: IPopupItem) => setCvssC(item);
  const onCvssIPopupItemChange = (item: IPopupItem) => setCvssI(item);
  const onCvssAPopupItemChange = (item: IPopupItem) => setCvssA(item);

  const onNegativeConsequencesChange = (data: any) => {
    const prepareNegativeConsequences = data.map(({ value }: any) => value);

    setVuln({...vuln, negative_consequences: prepareNegativeConsequences });
    setSelectedNegativeOption(data);
  };

  const handleFileChange = (event: any) => setScreenshots(event.target.files);

  const onConfirmCreateModalHandler = () => setCreateVulnModal(prevState => !prevState);
  const onConfirmResetModalHandler = () => setResetVulnDataModal(prevState => !prevState);

  return (
    <>
      <Modal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        title={localization.modals.vuln.createTitle}
      >
        <div className={styles['modal-inputs']}>
          <InputForm
            text={localization.modals.vuln.nameText}
            placeholder={localization.modals.vuln.namePlaceholder}
            value={vuln.name}
            errorMessage={vulnerability_name_error}
            onChange={(event) => setVuln({ ...vuln, name: event.target.value })}
            required
          />
          <InputForm
            text={localization.modals.vuln.cveIdText}
            placeholder={localization.modals.vuln.cveIdPlaceholder}
            errorMessage={cve_id_error}
            value={cveId}
            onChange={(event) => setCveId(event.target.value)}
          />
          <InputForm
            text={localization.modals.vuln.cweIdText}
            placeholder={localization.modals.vuln.cweIdPlaceholder}
            value={cweId}
            onChange={(event) => setCweId(event.target.value)}
          />
          <InputForm
            text={localization.modals.vuln.locationText}
            placeholder={localization.modals.vuln.locationPlaceholder}
            value={vuln.location}
            errorMessage={location_error}
            onChange={(event) => {
              setVuln({...vuln, location: event.target.value});
            }}
            required
          />
          <InputForm
            text={localization.modals.vuln.descriptionText}
            placeholder={localization.modals.vuln.descriptionPlaceholder}
            value={vuln.description}
            errorMessage={description_error}
            onTextareaChange={(event) => {
              setVuln({...vuln, description: event.target.value});
            }}
            textarea
            required
          />
          <InputForm
            text={localization.modals.vuln.negativeConsequencesText}
            placeholder={localization.modals.vuln.negativeConsequencesPlaceholder}
            errorMessage={negative_consequences_error}
            value={selectedNegativeOption}
            onSelectChange={onNegativeConsequencesChange}
            options={negativeConsequencesTypes}
            isMulti
            required
          />
          <div className={styles['modal-calculator-wrapper']}>
            <div className={styles['modal-calculator-panel']}>
              <InputForm
                text={localization.modals.vuln.attackVectorText}
                placeholder={localization.modals.vuln.attackVectorPlaceholder}
                errorMessage={attack_vector_error}
                value={cvssAV.text || ''}
                popupItems={attackVectorPopupItems}
                onClick={showPopupHandler}
                onPopupChange={onCvssAVPopupItemChange}
                onChange={(event) => {
                  setCvssAV({text: event.target.value, value: ''});
                }}
                disabled
                required
              />
              <InputForm
                text={localization.modals.vuln.attackComplexityText}
                placeholder={localization.modals.vuln.attackComplexityPlaceholder}
                errorMessage={attack_complexity_error}
                value={cvssAC.text || ''}
                popupItems={attackComplexityPopupItems}
                onClick={showPopupHandler}
                onPopupChange={onCvssACPopupItemChange}
                onChange={(event) => {
                  setCvssAC({text: event.target.value, value: ''});
                }}
                disabled
                required
              />
              <InputForm
                text={localization.modals.vuln.privilegesRequiredText}
                placeholder={localization.modals.vuln.privilegesRequiredPlaceholder}
                errorMessage={privileges_required_error}
                value={cvssPR.text || ''}
                popupItems={privilegesRequiredPopupItems}
                onClick={showPopupHandler}
                onPopupChange={onCvssPRPopupItemChange}
                onChange={(event) => {
                  setCvssPR({text: event.target.value, value: ''});
                }}
                disabled
                required
              />
              <InputForm
                text={localization.modals.vuln.userInteractionText}
                placeholder={localization.modals.vuln.userInteractionPlaceholder}
                errorMessage={user_interaction_error}
                value={cvssUI.text || ''}
                popupItems={userInteractionPopupItems}
                onClick={showPopupHandler}
                onPopupChange={onCvssUIPopupItemChange}
                onChange={(event) => {
                  setCvssUI({text: event.target.value, value: ''});
                }}
                disabled
                required
              />
            </div>
            <div className={styles['modal-calculator-panel']}>
              <InputForm
                text={localization.modals.vuln.scopeText}
                placeholder={localization.modals.vuln.scopePlaceholder}
                errorMessage={scope_error}
                value={cvssS.text || ''}
                popupItems={scopePopupItems}
                onClick={showPopupHandler}
                onPopupChange={onCvssSPopupItemChange}
                onChange={(event) => {
                  setCvssS({text: event.target.value, value: ''});
                }}
                disabled
                required
              />
              <InputForm
                text={localization.modals.vuln.confidentialityText}
                placeholder={localization.modals.vuln.confidentialityPlaceholder}
                errorMessage={confidentiality_error}
                value={cvssC.text || ''}
                popupItems={confidentialityPopupItems}
                onClick={showPopupHandler}
                onPopupChange={onCvssCPopupItemChange}
                onChange={(event) => {
                  setCvssC({text: event.target.value, value: ''});
                }}
                disabled
                required
              />
              <InputForm
                text={localization.modals.vuln.integrityText}
                placeholder={localization.modals.vuln.integrityPlaceholder}
                errorMessage={integrity_error}
                value={cvssI.text || ''}
                popupItems={integrityPopupItems}
                onClick={showPopupHandler}
                onPopupChange={onCvssIPopupItemChange}
                onChange={(event) => {
                  setCvssI({text: event.target.value, value: ''});
                }}
                disabled
                required
              />
              <InputForm
                text={localization.modals.vuln.availabilityText}
                placeholder={localization.modals.vuln.availabilityPlaceholder}
                errorMessage={availability_error}
                value={cvssA.text || ''}
                popupItems={availabilityPopupItems}
                onClick={showPopupHandler}
                onPopupChange={onCvssAPopupItemChange}
                onChange={(event) => {
                  setCvssA({text: event.target.value, value: ''});
                }}
                disabled
                required
              />
            </div>
          </div>
          <div className={styles['modal-calculator-info']}>
            <Text className={styles['modal-calculator-info-title']}>
              {
                `${localization.modals.vuln.vectorString} - ${vuln.cvss_vector ? 
                  vuln.cvss_vector : localization.modals.vuln.vector}`
              }
            </Text>
            {vuln.risk_level && (
              <div
                className={classNames(
                  styles['modal-calculator-info-score'], styles[`modal-calculator-info-score_${vuln.risk_level}`])}
              >
                <Title variant={TitleVariantEnum.H1}>
                  {(vuln.cvss_score !== null && vuln.cvss_score !== undefined) ? vuln.cvss_score.toString() : '-'}
                </Title>
                <Text className={styles['modal-calculator-info-risk-level']} variant={TextVariantEnum.L}>
                  {`(${prepareRiskLevelToRu[vuln.risk_level]})`}
                </Text>
              </div>
            )}
          </div>
          <InputForm
            text={localization.modals.vuln.procedureExploitingText}
            placeholder={localization.modals.vuln.procedureExploitingPlaceholder}
            value={vuln.procedure_exploiting}
            errorMessage={procedure_exploiting_error}
            onChange={(event) => {
              setVuln({...vuln, procedure_exploiting: event.target.value});
            }}
            required
          />
          <InputForm
            text={localization.modals.vuln.recommendationsText}
            placeholder={localization.modals.vuln.recommendationsPlaceholder}
            value={vuln.recommendations}
            errorMessage={recommendation_error}
            onTextareaChange={(event) => {
              setVuln({...vuln, recommendations: event.target.value});
            }}
            textarea
            required
          />
          <InputForm
            text={localization.modals.vuln.screenshotsText}
            placeholder={localization.modals.vuln.screenshotsPlaceholder}
            type={InputTypeEnum.File}
            onChange={handleFileChange}
          />
        </div>
        <div className={classNames(styles['modal-buttons'], styles['modal-buttons_between'])}>
          <Button buttonText={localization.modals.createButtonText} onClick={onConfirmCreateModalHandler} />
          <Button
            type={ButtonTypeEnum.Red}
            buttonText={localization.modals.resetButtonText}
            onClick={onConfirmResetModalHandler}
          />
        </div>
      </Modal>
      <ConfirmModal
        isModalVisible={isCreateVulnModal}
        setModalVisible={setCreateVulnModal}
        text={localization.vuln.confirmVulnText}
        onConfirmClick={addVulnHandler}
        type={ModalTypes.Create}
      />
      <ConfirmModal
        isModalVisible={isResetVulnDataModal}
        setModalVisible={setResetVulnDataModal}
        text={localization.vuln.confirmVulnDataText}
        onConfirmClick={resetVulnDataHandler}
        type={ModalTypes.Reset}
      />
    </>
  );
};

export default CreateVuln;
