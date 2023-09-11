import {FC, useEffect, useState} from 'react';

import classNames from 'classnames';

import {useParams} from 'react-router-dom';

import styles from '../../Modal.module.scss';
import Button from '../../../button/Button';
import Modal from '../../Modal';
import {IModalProps} from '../../ModalTypes';
import {useAppSelector} from '../../../../hooks/useAppSelector';
import Text from '../../../text/Text';
import {useAppDispatch} from '../../../../hooks/useAppDispatch';

import {createTeamlead, getTeamleadInfo, getTeamleads} from '../../../../store/projects/projectsAsync';
import {ROLES_ERROR_MESSAGES} from '../../../../constants/errors';
import ConfirmModal from '../../general/confirm/ConfirmModal';
import {ModalTypes} from '../../general/confirm/ConfirmTypes';
import {selectProjectById, selectProjects} from '../../../../store/projects/projectsSelectors';
import {localization} from '../../../../localization/localization';
import Loader from '../../../loader/Loader';

const ChangeTeamlead: FC<IModalProps> = ({ isModalVisible, setModalVisible }) => {
  const dispatch = useAppDispatch();

  const { projectId } = useParams();

  const { teamleads, isLoading } = useAppSelector(selectProjects);
  const { teamlead } = useAppSelector(selectProjectById);

  const [teamleadId, setTeamleadId] = useState<string>(teamlead?.id || '');
  const [isTeamleadIdCorrect, setTeamleadIdCorrect] = useState<boolean>(true);

  const [isAppointTeamleadModal, setAppointTeamleadModal] = useState<boolean>(false);

  useEffect(() => {
    if (isModalVisible && teamleads.length === 0) {
      dispatch(getTeamleads());
    }
  }, [dispatch, isModalVisible, teamleads.length]);

  const changeProjectTeamlead = () => {
    setTeamleadIdCorrect(!!teamleadId);

    if (teamleadId && projectId) {
      dispatch(createTeamlead({ projectId, teamleadId }));
      dispatch(getTeamleadInfo({ teamleadId }));

      setModalVisible(false);
    }
  };

  const onTeamleadClick = (id: string) => teamleadId !== id ? setTeamleadId(id) : setTeamleadId('');
  const onAppointTeamleadHandler = () => setAppointTeamleadModal(prevState => !prevState);

  return (
    <>
      <Modal
        classNameContent={styles['modal-users-wrapper']}
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        title={localization.modals.roles.appointTeamleadTitle}
      >
        {isLoading ? <Loader /> : (
          <div className={styles['modal-users']}>
            {teamleads.map(({ id, email, first_name }) => (
              <div
                key={id}
                onClick={() => onTeamleadClick(id)}
                className={classNames(styles['modal-user'], { [styles['modal-user_active']]: id === teamleadId })}
              >
                <Text className={styles['modal-user-email']}>{`${first_name} (${email})`}</Text>
              </div>
            ))}
          </div>
        )}
        <div className={styles['modal-buttons']}>
          <Button buttonText={localization.modals.appointButtonText} onClick={onAppointTeamleadHandler} />
          {!isTeamleadIdCorrect && (
            <Text className={styles['modal-user-error']}>{ROLES_ERROR_MESSAGES.TEAMLEAD_EMPTY}</Text>
          )}
        </div>
      </Modal>
      <ConfirmModal
        isModalVisible={isAppointTeamleadModal}
        setModalVisible={setAppointTeamleadModal}
        text={localization.project.confirmTeamleadText}
        onConfirmClick={changeProjectTeamlead}
        type={ModalTypes.Appoint}
      />
    </>
  );
};

export default ChangeTeamlead;
