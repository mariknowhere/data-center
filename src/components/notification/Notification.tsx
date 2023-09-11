import {FC, useEffect, useState} from 'react';

import classNames from 'classnames';

import Text from '../text/Text';

import {TextVariantEnum} from '../text/TextTypes';

import {localization} from '../../localization/localization';

import {INotification, INotificationProps} from './NotificationTypes';
import styles from './Notification.module.scss';



const Notification: FC<INotificationProps> = ({ error, title, status }) => {
  const [textArray, setTextArray] = useState<INotification[]>([]);

  useEffect(() => {
    switch (status) {
    case 200: {
      const index = textArray.length;
      setTextArray(
        [...textArray, { text: `${title} ${localization.notification.changeText}`, isVisible: true }],
      );

      setTimeout(() => {
        setTextArray(prevState => prevState.filter((item, indexPrevState) => index !== indexPrevState));
      }, 3000);

      break;
    }

    case 201: {
      const index = textArray.length;
      setTextArray(
        [...textArray, { text: `${title} ${localization.notification.createText}`, isVisible: true }],
      );

      setTimeout(() => {
        setTextArray(prevState => prevState.filter((item, indexPrevState) => index !== indexPrevState));
      }, 3000);

      break;
    }

    case 202: {
      const index = textArray.length;
      setTextArray(
        [...textArray, { text: `${title} ${localization.notification.uploadText}`, isVisible: true }],
      );

      setTimeout(() => {
        setTextArray(prevState => prevState.filter((item, indexPrevState) => index !== indexPrevState));
      }, 3000);

      break;
    }

    case 203: {
      const index = textArray.length;
      setTextArray([...textArray, { text: localization.notification.loginText, isVisible: true }]);

      setTimeout(() => {
        setTextArray(prevState => prevState.filter((item, indexPrevState) => index !== indexPrevState));
      }, 3000);

      break;
    }

    case 204: {
      const index = textArray.length;
      setTextArray(
        [...textArray, { text: `${title} ${localization.notification.deleteText}`, isVisible: true }],
      );

      setTimeout(() => {
        setTextArray(prevState => prevState.filter((item, indexPrevState) => index !== indexPrevState));
      }, 3000);

      break;
    }

    case 205: {
      const index = textArray.length;
      setTextArray([...textArray, { text: localization.notification.logoutText, isVisible: true }]);

      setTimeout(() => {
        setTextArray(prevState => prevState.filter((item, indexPrevState) => index !== indexPrevState));
      }, 3000);

      break;
    }

    case 206: {
      const index = textArray.length;
      setTextArray(
        [...textArray, { text: `${title} ${localization.notification.appointText}`, isVisible: true }],
      );

      setTimeout(() => {
        setTextArray(prevState => prevState.filter((item, indexPrevState) => index !== indexPrevState));
      }, 3000);

      break;
    }

    case 207: {
      const index = textArray.length;
      setTextArray([...textArray, {
        text: `${title} ${localization.notification.deleteText}`,
        isVisible: true,
      }]);

      setTimeout(() => {
        setTextArray(prevState => prevState.filter((item, indexPrevState) => index !== indexPrevState));
      }, 3000);

      break;
    }


    case 400: {
      const index = textArray.length;
      setTextArray(
        [...textArray, {
          text: localization.notification.authorizationDataError,
          isVisible: true,
          isDisabled: true,
        }],
      );

      setTimeout(() => {
        setTextArray(prevState => prevState.filter((item, indexPrevState) => index !== indexPrevState));
      }, 3000);

      break;
    }

    case 401: {
      const index = textArray.length;
      setTextArray(
        [...textArray, {
          text: localization.notification.authorizationError,
          isVisible: true,
          isDisabled: true,
        }],
      );

      setTimeout(() => {
        setTextArray(prevState => prevState.filter((item, indexPrevState) => index !== indexPrevState));
      }, 3000);

      break;
    }

    case 403: {
      const index = textArray.length;
      setTextArray(
        [...textArray, { text: localization.notification.roleError, isVisible: true, isDisabled: true }],
      );

      setTimeout(() => {
        setTextArray(prevState => prevState.filter((item, indexPrevState) => index !== indexPrevState));
      }, 3000);

      break;
    }

    case 404: {
      const index = textArray.length;
      setTextArray(
        [...textArray, { text: localization.notification.pageEmptyError, isVisible: true, isDisabled: true }],
      );

      setTimeout(() => {
        setTextArray(prevState => prevState.filter((item, indexPrevState) => index !== indexPrevState));
      }, 3000);

      break;
    }

    case 409: {
      const index = textArray.length;
      setTextArray(
        [...textArray, { text: localization.notification.conflictError, isVisible: true, isDisabled: true }],
      );

      setTimeout(() => {
        setTextArray(prevState => prevState.filter((item, indexPrevState) => index !== indexPrevState));
      }, 3000);

      break;
    }

    case 422: {
      const index = textArray.length;
      setTextArray(
        [...textArray, { text: localization.notification.dataIncorrectError, isVisible: true, isDisabled: true }],
      );

      setTimeout(() => {
        setTextArray(prevState => prevState.filter((item, indexPrevState) => index !== indexPrevState));
      }, 3000);

      break;
    }



    case 500: {
      const index = textArray.length;
      setTextArray(
        [...textArray, { text: localization.notification.serverError, isVisible: true, isDisabled: true }],
      );

      setTimeout(() => {
        setTextArray(prevState => prevState.filter((item, indexPrevState) => index !== indexPrevState));
      }, 3000);

      break;
    }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const onCloseNotificationHandler = (index: number) => {
    setTextArray(prevState => prevState.filter((item, indexPrevState) => index !== indexPrevState));
  };

  return (
    <>
      {textArray.map(({ text, isVisible, isDisabled }, index) => (
        <div
          key={text + index}
          style={{ bottom: `${(index) * 65 + 20}px` }}
          className={classNames(styles['notification'], { [styles['notification_visible']]: isVisible })}
        >
          <div className={styles['notification-content']}>
            <Text
              variant={TextVariantEnum.S}
              className={classNames(styles['notification-title'], { [styles['notification-title_disabled']]: isDisabled })}
            >
              {text}
            </Text>
            <img
              onClick={() => onCloseNotificationHandler(index)}
              src="/assets/images/close.png"
              alt={localization.common.closeAlt}
              className={styles['notification-image']}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default Notification;
