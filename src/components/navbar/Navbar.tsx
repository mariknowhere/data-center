import classNames from 'classnames';
import {FC, useEffect, useState} from 'react';

import {NavLink, useLocation} from 'react-router-dom';

import {ROUTES} from '../../router/routes';
import {useAppSelector} from '../../hooks/useAppSelector';
import {selectProfileData} from '../../store/auth/authSelectors';
import {localization} from '../../localization/localization';

import styles from './Navbar.module.scss';

const commonLinks = [
  {
    href: ROUTES.COMMON + ROUTES.PROJECTS,
    title: localization.navbar.projects,
    id: 1,
  },
  {
    href: ROUTES.COMMON + ROUTES.CUSTOMERS,
    title:localization.navbar.customers,
    id: 2,
  },
];

const analyticLinks = [
  {
    href: ROUTES.COMMON + ROUTES.ANALYTICS,
    title:localization.navbar.analytics,
    id: 1,
  },
];

const Navbar: FC = () => {
  const location = useLocation();

  const { role } = useAppSelector(selectProfileData);

  const [links, setLinks] = useState<any[]>([]);

  useEffect(() => {
    if (role && (role === 'teamlead' || role === 'pentester')) {
      setLinks([commonLinks[0]]);
    } else if (role) {
      setLinks(location.pathname === ROUTES.COMMON + ROUTES.ANALYTICS ? analyticLinks : commonLinks);
    }
  }, [location.pathname, role]);

  return (
    <ul className={styles['navbar']}>
      {links.map(({ href, title, id }) => (
        <li key={id} className={styles['navbar-item-wrapper']}>
          <NavLink
            to={href}
            className={({ isActive }) => isActive ?
              classNames(styles['navbar-item_active'], styles['navbar-item']) : styles['navbar-item']
            }>
            {title}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default Navbar;
