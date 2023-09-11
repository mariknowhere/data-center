import {FC, useEffect} from 'react';
import classNames from 'classnames';

import Title from '../title/Title';
import {TitleVariantEnum} from '../title/TitleTypes';
import {localization} from '../../localization/localization';

import {IModalProps} from './ModalTypes';
import styles from './Modal.module.scss';

const Modal: FC<IModalProps> = ({
  isModalVisible,
  setModalVisible,
  children,
  className,
  classNameContent,
  title,
}) => {
  useEffect(() => {
    document.body.style.overflow = isModalVisible ? 'hidden' : 'auto';
  }, [isModalVisible]);

  const onContentClick = (event: { stopPropagation: () => any; }) => event.stopPropagation();

  const onCloseIconClick = () => setModalVisible(!isModalVisible);

  return (
    <div className={classNames(className, styles.modal, { [styles['modal-active']]: isModalVisible })}>
      <div
        className={classNames(
          styles['modal-content'], classNameContent, { [styles['modal-content-active']]: isModalVisible },
        )}
        onClick={onContentClick}
      >
        <div className={styles['modal-header']}>
          <Title variant={TitleVariantEnum.H2} className={styles['modal-header-title']}>
            {title}
          </Title>
          <img
            onClick={onCloseIconClick}
            src="/assets/images/close.png"
            alt={localization.common.closeAlt}
            className={styles['modal-header-image']}
          />
        </div>
        <hr className={styles['modal-divider']} />
        {children}
      </div>
    </div>
  );
};

export default Modal;
