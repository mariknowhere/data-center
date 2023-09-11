import {ChangeEvent, FC, useState} from 'react';

import {Link} from 'react-router-dom';

import classNames from 'classnames';

import {ROUTES} from '../../router/routes';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {login} from '../../store/auth/authAsync';
import {validateLogin} from '../../utils/validate/validateLogin';
import {useAppSelector} from '../../hooks/useAppSelector';
import {selectAuthData, selectAuthErrors} from '../../store/auth/authSelectors';
import Text from '../../components/text/Text';
import {TextVariantEnum} from '../../components/text/TextTypes';
import Loader from '../../components/loader/Loader';
import Notification from '../../components/notification/Notification';
import {localization} from '../../localization/localization';

import styles from './LoginPage.module.scss';

/**
 * Component for displaying information on login page.
 *
 */
const LoginPage: FC = () => {
  const dispatch = useAppDispatch();

  const { username_error, password_error } = useAppSelector(selectAuthErrors);
  const { isLoading, error, status } = useAppSelector(selectAuthData);

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onLogInClick = () => {
    const user: string = `username=${username}&password=${password}`;
    const userObject = {
      username,
      password,
    };

    const isValidate = validateLogin(userObject, dispatch);

    if (isValidate) {
      dispatch(login(user));
    }
  };

  const onKeyPress = (event: any) => {
    const key = event.keyCode || event.which;

    if (key === 13) { // Клавиша Enter
      onLogInClick();
    }
  };

  const changeUsernameHandler = (event: ChangeEvent<HTMLInputElement>) => setUsername(event.target.value);
  const changePasswordHandler = (event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value);

  return (
    <div className={styles.login}>
      <div className={styles['login-left-panel']}>
        <Link to={ROUTES.COMMON}>
          <img src="/assets/icons/logo.svg" alt="Логотип" className={styles['login-left-panel-logo']}/>
        </Link>
        <h2 className={styles['login-left-panel-title']}>
          {localization.login.title}
        </h2>
        <div className={styles['login-left-panel-photo-wrapper']}>
          <img src="/assets/icons/login.svg" alt="FAVN" className={styles['login-left-panel-photo']}/>
        </div>
      </div>
      {isLoading ? <Loader /> : (
        <div className={styles['login-right-panel']}>
          <div className={styles['login-right-panel-block']}>
            <h2 className={styles['login-right-panel-title']}>{localization.login.logInTitle}</h2>
            <div className={styles['login-right-panel-inputs']}>
              <div className={styles['login-right-panel-input-wrapper']}>
                <span className={styles['login-right-panel-label']}>
                  {localization.login.emailText}
                  <span className={styles['login-right-panel-label-require']}>
                  *
                  </span>
                </span>
                <input
                  type="email"
                  placeholder={localization.login.emailPlaceholder}
                  className={styles['login-right-panel-input']}
                  name="username"
                  onChange={changeUsernameHandler}
                />
                {username_error && (
                  <Text
                    className={classNames(styles['login-right-panel-label'], styles['login-right-panel-label_danger'])}
                    variant={TextVariantEnum.S}
                  >
                    {username_error}
                  </Text>
                )}
              </div>
              <div className={styles['login-right-panel-input-wrapper']}>
                <span className={styles['login-right-panel-label']}>
                  {localization.login.passwordText}
                  <span className={styles['login-right-panel-label-require']}>
                  *
                  </span>
                </span>
                <input
                  id="password"
                  type="password"
                  placeholder={localization.login.passwordPlaceholder}
                  className={styles['login-right-panel-input']}
                  value={password}
                  onChange={changePasswordHandler}
                  onKeyPress={onKeyPress}
                />
                {password_error && (
                  <Text
                    className={classNames(styles['login-right-panel-label'], styles['login-right-panel-label_danger'])}
                    variant={TextVariantEnum.S}
                  >
                    {password_error}
                  </Text>
                )}
              </div>
            </div>
            <div className={styles['login-right-panel-buttons']}>
              <button onClick={onLogInClick} className={styles['login-right-panel-button']}>
                <span className={styles['login-right-panel-button-text']}>{localization.login.logInButtonText}</span>
              </button>
            </div>
          </div>
        </div>
      )}
      {(status !== 200 && status !== 201 && status !== 202 && status !== 204 && status !== 206 && status !== 207) && (
        <Notification status={status} error={error} title={''} />
      )}
    </div>
  );
};

export default LoginPage;
