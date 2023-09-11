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

import {createManager, getManagerInfo, getManagers} from '../../../../store/projects/projectsAsync';
import {ROLES_ERROR_MESSAGES} from '../../../../constants/errors';
import ConfirmModal from '../../general/confirm/ConfirmModal';
import {ModalTypes} from '../../general/confirm/ConfirmTypes';
import {selectProjectById, selectProjects} from '../../../../store/projects/projectsSelectors';
import {localization} from '../../../../localization/localization';
import Loader from '../../../loader/Loader';

const ChangeManager: FC<IModalProps> = ({ isModalVisible, setModalVisible }) => {
  const dispatch = useAppDispatch();

  const { projectId } = useParams();

  const { managers, isLoading } = useAppSelector(selectProjects);
  const { manager } = useAppSelector(selectProjectById);

  const [managerId, setManagerId] = useState<string>(manager?.id || '');
  const [isManagerIdCorrect, setManagerIdCorrect] = useState<boolean>(true);

  const [isAppointManagerModal, setAppointManagerModal] = useState<boolean>(false);

  useEffect(() => {
    if (isModalVisible && managers.length === 0) {
      dispatch(getManagers());
    }
  }, [dispatch, isModalVisible, managers.length]);

  const changeManager = () => {
    setManagerIdCorrect(!!managerId);

    if (managerId && projectId) {
      dispatch(createManager({ projectId, managerId }));
      dispatch(getManagerInfo({ managerId }));

      setModalVisible(false);
    }
  };

  const onManagerClick = (id: string) => managerId !== id ? setManagerId(id) : setManagerId('');
  const onAppointManagerHandler = () => setAppointManagerModal(prevState => !prevState);

  return (
    <>
      <Modal
        classNameContent={styles['modal-users-wrapper']}
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        title={localization.modals.roles.appointManagerTitle}
      >
        {isLoading ? <Loader /> : (
          <div className={styles['modal-users']}>
            {managers.map(({ id, email, first_name }) => (
              <div
                key={id}
                onClick={() => onManagerClick(id)}
                className={classNames(styles['modal-user'], { [styles['modal-user_active']]: id === managerId })}
              >
                <Text className={styles['modal-user-email']}>{`${first_name} (${email})`}</Text>
              </div>
            ))}
          </div>
        )}
        <div className={styles['modal-buttons']}>
          <Button buttonText={localization.modals.appointButtonText} onClick={onAppointManagerHandler} />
          {!isManagerIdCorrect && (
            <Text className={styles['modal-user-error']}>{ROLES_ERROR_MESSAGES.MANAGER_EMPTY}</Text>
          )}
        </div>
      </Modal>
      <ConfirmModal
        isModalVisible={isAppointManagerModal}
        setModalVisible={setAppointManagerModal}
        text={localization.project.confirmManagerText}
        onConfirmClick={changeManager}
        type={ModalTypes.Appoint}
      />
    </>
  );
};

export default ChangeManager;
