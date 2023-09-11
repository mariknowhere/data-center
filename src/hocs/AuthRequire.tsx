import {FC, ReactElement} from 'react';

import {Navigate, useLocation} from 'react-router-dom';

import {useAppSelector} from '../hooks/useAppSelector';
import {selectAuthToken} from '../store/auth/authSelectors';
import {ROUTES} from '../router/routes';

type AuthRequireType = {
  children: ReactElement;
}

const AuthRequire: FC<AuthRequireType> = ({ children }) => {
  const location = useLocation();

  const isAuth = useAppSelector(selectAuthToken);

  if (!isAuth) {
    return <Navigate to={ROUTES.COMMON + ROUTES.LOGIN} state={{ from: location }} />;
  }

  return children;
};

export default AuthRequire;
