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
import {ISocialEngineering} from '../../../../store/objects/socialEngineering/socialEngineeringTypes';
import {validateSocialEngineering} from '../../../../utils/validate/objects/validateSocialEngineering';
import {useShowPopup} from '../../../../hooks/useShowPopup';
import {ButtonTypeEnum} from '../../../button/ButtonTypes';


import ConfirmModal from '../../general/confirm/ConfirmModal';
import {ModalTypes} from '../../general/confirm/ConfirmTypes';
import {createObject} from '../../../../store/objects/objectsAsync';
import {OBJECT_TITLES, OBJECT_TYPES, socialEngineeringList} from '../../../../constants/objects';
import {selectSocialEngineeringErrors} from '../../../../store/objects/socialEngineering/socialEngineeringSelectors';
import {selectOffices} from '../../../../store/offices/officesSelectors';
import {IPopupItem} from '../../../popup/PopupTypes';

import {selectProjectById} from '../../../../store/projects/projectsSelectors';

import {CREATE_MODAL_OPEN} from '../../../../constants/other';

import {ROUTES} from '../../../../router/routes';
import {selectProfileData} from '../../../../store/auth/authSelectors';

import {localization} from '../../../../localization/localization';

import {resetSocialEngineeringData} from './utils/resetSocialEngineeringData';

let prepareOffices: IPopupItem[] = [];

const CreateSocialEngineering: FC<IModalProps> = ({
  isModalVisible,
  setModalVisible,
  setSecondaryModalVisible,
}) => {
  const dispatch = useAppDispatch();

  const { projectId } = useParams();
  const navigate = useNavigate();

  const { allOffices } = useAppSelector(selectOffices);
  const { success_criterion_error } = useAppSelector(selectSocialEngineeringErrors);
  const { customer } = useAppSelector(selectProjectById);
  const { role } = useAppSelector(selectProfileData);

  const { showPopupHandler } = useShowPopup();

  const [socialEngineering, setSocialEngineering] = useState<ISocialEngineering>({
    additional_info: '',
    engineering_type: [],
    office: { id: '', name: '' },
    office_id: '',
    success_criterion: '',
  });

  const [engineeringType, setEngineeringType] = useState<any>(null);
  const [isCreateSocialEngineeringModal, setCreateSocialEngineeringModal] = useState<boolean>(false);
  const [isResetSocialEngineeringDataModal, setResetSocialEngineeringDataModal] = useState<boolean>(false);

  useEffect(() => {
    if (role) {
      prepareOffices = allOffices.map((office) => {
        return {
          text: office.name,
          id: office.id,
        };
      });

      if (role !== 'teamlead') {
        prepareOffices[prepareOffices.length] = {
          text: localization.office.createButtonText,
          id: 'create',
        };
      }
    }
  }, [allOffices, role]);

  const addSocialEngineeringHandler = () => {
    const isValidate = validateSocialEngineering(socialEngineering, dispatch);

    if (isValidate && setSecondaryModalVisible && projectId) {
      if (!socialEngineering.office?.id || !socialEngineering.office?.name) {
        delete socialEngineering.office;
        delete socialEngineering.office_id;
      } else {
        socialEngineering.office_id = socialEngineering.office.id;

        delete socialEngineering.office;
      }

      dispatch(createObject({ object: socialEngineering, projectId, objectType: OBJECT_TYPES.SocialEngineering }));

      resetSocialEngineeringData(dispatch, setSocialEngineering, setEngineeringType);

      setModalVisible(false);
      setSecondaryModalVisible(false);
    }
  };

  const resetSocialEngineeringDataHandler = () => {
    resetSocialEngineeringData(dispatch, setSocialEngineering, setEngineeringType);
  };

  const onOfficeNameChangeHandler = ({ id, text }: IPopupItem) => {
    if (id === 'create') {
      localStorage.setItem(CREATE_MODAL_OPEN, 'true');

      navigate(`${ROUTES.COMMON}${ROUTES.CUSTOMERS}/${customer?.id}/${ROUTES.OFFICES}`);
    } else {
      setSocialEngineering({...socialEngineering, office: {name: text, id: String(id)}});
    }
  };

  const onTypeClick = (data: any) => {
    const prepareEngineeringType = data.map(({ value }: any) => value);

    setSocialEngineering({...socialEngineering, engineering_type: prepareEngineeringType });
    setEngineeringType(data);
  };

  const onConfirmCreateModalHandler = () => setCreateSocialEngineeringModal(prevState => !prevState);
  const onConfirmResetModalHandler = () => setResetSocialEngineeringDataModal(prevState => !prevState);


  return (
    <>
      <Modal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        title={localization.modals.objects.createSocialEngineeringTitle}
      >
        <div className={styles['modal-inputs']}>
          <InputForm
            text={localization.modals.objects.officeText}
            placeholder={localization.modals.objects.officePlaceholder}
            value={socialEngineering.office?.name}
            popupItems={prepareOffices}
            onClick={showPopupHandler}
            onPopupChange={onOfficeNameChangeHandler}
            onChange={(event) => {
              setSocialEngineering({...socialEngineering, office: {name: event.target.value, id: ''}});
            }}
            disabled
          />
          <InputForm
            text={localization.modals.objects.engineeringTypeText}
            placeholder={localization.modals.objects.engineeringTypePlaceholder}
            value={engineeringType}
            onSelectChange={onTypeClick}
            options={socialEngineeringList}
            isMulti
          />
          <InputForm
            text={localization.modals.objects.successCriterionText}
            placeholder={localization.modals.objects.successCriterionPlaceholder}
            errorMessage={success_criterion_error}
            value={socialEngineering.success_criterion}
            onTextareaChange={(event) => {
              setSocialEngineering({...socialEngineering, success_criterion: event.target.value});
            }}
            textarea
            required
          />
          <InputForm
            text={localization.modals.objects.additionalInfoText}
            placeholder={localization.modals.objects.additionalInfoPlaceholder}
            value={socialEngineering.additional_info}
            onTextareaChange={(event) => {
              setSocialEngineering({...socialEngineering, additional_info: event.target.value});
            }}
            textarea
          />
        </div>
        <div className={classNames(styles['modal-buttons'], styles['modal-buttons_between'])}>
          <Button buttonText={localization.common.createButtonText} onClick={onConfirmCreateModalHandler}/>
          <Button
            type={ButtonTypeEnum.Red}
            buttonText={localization.common.resetButtonText}
            onClick={onConfirmResetModalHandler}
          />
        </div>
      </Modal>
      <ConfirmModal
        isModalVisible={isCreateSocialEngineeringModal}
        setModalVisible={setCreateSocialEngineeringModal}
        text={OBJECT_TITLES.SOCIAL_ENGINEERING}
        onConfirmClick={addSocialEngineeringHandler}
        type={ModalTypes.Create}
      />
      <ConfirmModal
        isModalVisible={isResetSocialEngineeringDataModal}
        setModalVisible={setResetSocialEngineeringDataModal}
        text={localization.modals.objects.socialEngineeringResetButtonText}
        onConfirmClick={resetSocialEngineeringDataHandler}
        type={ModalTypes.Reset}
      />
    </>
  );
};

export default CreateSocialEngineering;
