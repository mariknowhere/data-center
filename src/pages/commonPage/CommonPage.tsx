import {FC, useEffect} from 'react';

import {Outlet, useLocation, useNavigate} from 'react-router-dom';

import {ROUTES} from '../../router/routes';
import Header from '../../components/header/Header';

import {useAppSelector} from '../../hooks/useAppSelector';

import {selectAuthToken} from '../../store/auth/authSelectors';

import CommonNavigation from './commonNavigation/CommonNavigation';
import styles from './CommonPage.module.scss';


/**
 * Component for displaying information on common page.
 *
 */
const CommonPage: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isAuth = useAppSelector(selectAuthToken);

  useEffect(() => {
    if (!isAuth) {
      navigate(ROUTES.COMMON + ROUTES.LOGIN);
    }
  }, [isAuth, navigate]);

  return (
    <div className={styles.common}>
      {location.pathname !== ROUTES.COMMON + ROUTES.LOGIN && location.pathname !== ROUTES.COMMON && <Header />}
      {location.pathname === ROUTES.COMMON ? <CommonNavigation /> : <Outlet />}
    </div>
  );
};

export default CommonPage;
