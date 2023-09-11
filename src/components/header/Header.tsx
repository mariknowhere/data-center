import {FC, useEffect} from 'react';

import {Link, useLocation} from 'react-router-dom';

import {ROUTES} from '../../router/routes';
import {useAppSelector} from '../../hooks/useAppSelector';
import {selectProfileData} from '../../store/auth/authSelectors';
import {getUserInfo} from '../../store/auth/authAsync';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {AUTHORIZATION_TOKEN} from '../../constants/auth';
import {localization} from '../../localization/localization';

import styles from './Header.module.scss';

/**
 * Component displays information in the page header.
 *
 */
const Header: FC = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();

  const { email } = useAppSelector(selectProfileData);

  useEffect(() => {
    if (!email && AUTHORIZATION_TOKEN) {
      dispatch(getUserInfo());
    }
  }, [dispatch, email]);

  return (
    <div className={styles['header']}>
      <div className={styles['header-start']}>
        <Link to={ROUTES.COMMON}>
          <img src="/assets/icons/logo.svg" alt={localization.header.logoAlt} className={styles['header-logo']} />
        </Link>
        <div className={styles['header-divider']}></div>
        <span className={styles['header-text']}>{localization.header.title}</span>
      </div>
      <div className={styles['header-end']}>
        <span className={styles['header-text']}>{email || ''}</span>
        <div className={styles['header-divider']}></div>
        <Link to={ROUTES.SETTINGS} state={{ from: location }}>
          <img src="/assets/icons/options.svg" alt={localization.header.optionsAlt} />
        </Link>
      </div>
    </div>
  );
};

export default Header;
