import {FC, useEffect, useState} from 'react';

import {useNavigate, useParams} from 'react-router-dom';

import classNames from 'classnames';

import Modal from '../../Modal';
import {IModalProps} from '../../ModalTypes';
import InputForm from '../../../inputForm/InputForm';
import styles from '../../Modal.module.scss';
import Button from '../../../button/Button';
import {InputTypeEnum} from '../../../input/InputTypes';
import {useAppDispatch} from '../../../../hooks/useAppDispatch';
import {useAppSelector} from '../../../../hooks/useAppSelector';
import {validateSourceCode} from '../../../../utils/validate/objects/validateSourceCode';
import {ISourceCode} from '../../../../store/objects/sourceCodes/sourceCodesTypes';
import {useShowPopup} from '../../../../hooks/useShowPopup';
import ConfirmModal from '../../general/confirm/ConfirmModal';
import {ModalTypes} from '../../general/confirm/ConfirmTypes';


import {ButtonTypeEnum} from '../../../button/ButtonTypes';
import {createObject} from '../../../../store/objects/objectsAsync';
import {OBJECT_TITLES, OBJECT_TYPES, programmingLanguageList} from '../../../../constants/objects';
import {selectSourceCodesErrors} from '../../../../store/objects/sourceCodes/sourceCodesSelectors';
import {selectInfSystems} from '../../../../store/infSystems/infSystemsSelectors';
import {IPopupItem} from '../../../popup/PopupTypes';

import {selectProjectById} from '../../../../store/projects/projectsSelectors';

import {CREATE_MODAL_OPEN} from '../../../../constants/other';

import {ROUTES} from '../../../../router/routes';
import {selectProfileData} from '../../../../store/auth/authSelectors';

import {localization} from '../../../../localization/localization';

import {resetSourceCodeData} from './utils/resetSourceCodeData';

let prepareInfSystems: IPopupItem[] = [];

const CreateSourceCode: FC<IModalProps> = ({
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

  const { number_rows_error } = useAppSelector(selectSourceCodesErrors);

  const [sourceCode, setSourceCode] = useState<ISourceCode>({
    inf_system: { id: '', name: '' },
    inf_system_id: '',
    number_rows: null,
    programming_language: [],
  });

  const [programmingLanguage, setProgrammingLanguage] = useState<any>(null);

  const [isCreateSourceCodeModal, setCreateSourceCodeModal] = useState<boolean>(false);
  const [isResetSourceCodeDataModal, setResetSourceCodeDataModal] = useState<boolean>(false);

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

  const addSourceCodeHandler = () => {
    const isValidate = validateSourceCode(sourceCode, dispatch);

    if (isValidate && setSecondaryModalVisible && projectId) {
      if (!sourceCode.inf_system?.id || !sourceCode.inf_system?.name) {
        delete sourceCode.inf_system;
        delete sourceCode.inf_system_id;
      } else {
        sourceCode.inf_system_id = sourceCode.inf_system.id;

        delete sourceCode.inf_system;
      }

      resetSourceCodeData(dispatch, setSourceCode, setProgrammingLanguage);

      dispatch(createObject({ projectId, object: sourceCode, objectType: OBJECT_TYPES.SourceCode }));

      setModalVisible(false);
      setSecondaryModalVisible(false);
    }
  };

  const resetSourceCodeDataHandler = () => resetSourceCodeData(dispatch, setSourceCode, setProgrammingLanguage);

  const onInfSystemNameChangeHandler = ({ id, text }: IPopupItem) => {
    if (id === 'create') {
      localStorage.setItem(CREATE_MODAL_OPEN, 'true');

      navigate(`${ROUTES.COMMON}${ROUTES.CUSTOMERS}/${customer?.id}/${ROUTES.INF_SYSTEMS}`);
    } else {
      setSourceCode({...sourceCode, inf_system: {name: text, id: String(id)}});
    }
  };

  const onProgrammingLanguageClick = (data: any) => {
    const prepareProgrammingLanguage = data.map(({ value }: any) => value);

    setSourceCode({...sourceCode, programming_language: prepareProgrammingLanguage });
    setProgrammingLanguage(data);
  };

  const onConfirmCreateModalHandler = () => setCreateSourceCodeModal(prevState => !prevState);
  const onConfirmResetModalHandler = () => setResetSourceCodeDataModal(prevState => !prevState);

  return (
    <>
      <Modal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        title={localization.modals.objects.createSourceCodeTitle}
      >
        <div className={styles['modal-inputs']}>
          <InputForm
            text={localization.modals.objects.infSystemText}
            placeholder={localization.modals.objects.infSystemPlaceholder}
            value={sourceCode.inf_system?.name}
            popupItems={prepareInfSystems}
            onClick={showPopupHandler}
            onPopupChange={onInfSystemNameChangeHandler}
            onChange={(event) => {
              setSourceCode({...sourceCode, inf_system: {name: event.target.value, id: ''}});
            }}
            disabled
          />
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
            value={sourceCode.number_rows}
            onChange={(event) => {
              setSourceCode({...sourceCode, number_rows: parseInt(event.target.value)});
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
        isModalVisible={isCreateSourceCodeModal}
        setModalVisible={setCreateSourceCodeModal}
        text={OBJECT_TITLES.SOURCE_CODE}
        onConfirmClick={addSourceCodeHandler}
        type={ModalTypes.Create}
      />
      <ConfirmModal
        isModalVisible={isResetSourceCodeDataModal}
        setModalVisible={setResetSourceCodeDataModal}
        text={localization.modals.objects.sourceCodeResetButtonText}
        onConfirmClick={resetSourceCodeDataHandler}
        type={ModalTypes.Reset}
      />
    </>
  );
};

export default CreateSourceCode;
