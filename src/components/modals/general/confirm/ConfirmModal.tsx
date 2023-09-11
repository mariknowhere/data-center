import {FC, useEffect, useState} from 'react';

import classNames from 'classnames';

import styles from '../../Modal.module.scss';
import Text from '../../../text/Text';
import Button from '../../../button/Button';
import Modal from '../../Modal';

import {ButtonTypeEnum} from '../../../button/ButtonTypes';
import {localization} from '../../../../localization/localization';

import {IConfirmProps, ModalTypes} from './ConfirmTypes';

const ConfirmModal: FC<IConfirmProps> = ({
  isModalVisible,
  setModalVisible,
  text,
  onConfirmClick,
  type = ModalTypes.Delete,
}) => {
  const [headerText, setHeaderText] = useState<string>('');

  useEffect(() => {
    switch (type) {
    case ModalTypes.Delete: {
      setHeaderText(localization.modals.confirm.deleteHeaderTitle);

      break;
    }

    case ModalTypes.Change: {
      setHeaderText(localization.modals.confirm.changeHeaderTitle);

      break;
    }

    case ModalTypes.Reset: {
      setHeaderText(localization.modals.confirm.resetDataHeaderTitle);

      break;
    }

    case ModalTypes.Create: {
      setHeaderText(localization.modals.confirm.createHeaderTitle);

      break;
    }

    case ModalTypes.Appoint: {
      setHeaderText(localization.modals.confirm.appointHeaderTitle);

      break;
    }

    case ModalTypes.Restore: {
      setHeaderText(localization.modals.confirm.restoreHeaderTitle);

      break;
    }
    }
  }, [type]);

  const onAcceptConfirmHandler = () => {
    setModalVisible(prevState => !prevState);

    onConfirmClick();
  };

  const onRejectConfirmHandler = () => setModalVisible(prevState => !prevState);

  return (
    <Modal
      classNameContent={styles['modal-content_small']}
      isModalVisible={isModalVisible}
      setModalVisible={setModalVisible}
      title={`${headerText} ${text}?`}
    >
      <Text>
        {`${localization.modals.confirm.description} ${headerText.toLowerCase()} ${text}?`}
      </Text>
      <div className={classNames(styles['modal-buttons'], styles['modal-buttons_between'])}>
        <Button buttonText={localization.modals.confirm.confirmButtonText} onClick={onAcceptConfirmHandler}/>
        <Button
          type={ButtonTypeEnum.Red}
          buttonText={localization.modals.confirm.cancelButtonText}
          onClick={onRejectConfirmHandler}
        />
      </div>
    </Modal>
  );
};

export default ConfirmModal;
