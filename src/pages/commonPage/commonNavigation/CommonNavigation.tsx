import {Link} from 'react-router-dom';

import {useEffect, useState} from 'react';

import {selectProfileData} from '../../../store/auth/authSelectors';
import {useAppSelector} from '../../../hooks/useAppSelector';
import {getUserInfo} from '../../../store/auth/authAsync';
import {useAppDispatch} from '../../../hooks/useAppDispatch';
import {AUTHORIZATION_TOKEN} from '../../../constants/auth';

import Title from '../../../components/title/Title';
import {TitleVariantEnum} from '../../../components/title/TitleTypes';
import {localization} from '../../../localization/localization';

import styles from './CommonNavigation.module.scss';

const allCards = [
  {
    image: '/assets/icons/rocket-mini.svg',
    background: '/assets/images/projects.jpg',
    title: localization.common.project,
    width: '50%',
    path: 'projects',
  },
  {
    image: '/assets/icons/analytic-mini.svg',
    background: '/assets/images/analytics.jpeg',
    title: localization.common.analytics,
    width: '50%',
    path: 'analytics',
  },
];

const teamleadOrPentesterCards = [
  {
    image: '/assets/icons/rocket-mini.svg',
    background: '/assets/images/projects.jpg',
    title: 'Проекты',
    width: '100%',
    path: 'projects',
  },
];

const clientOrAnalyticCards = [
  {
    image: '/assets/icons/analytic-mini.svg',
    background: '/assets/images/analytics.jpeg',
    title: 'Аналитика',
    width: '100%',
    path: 'analytics',
  },
];

interface ICard {
  image: string;
  background: string;
  title: string;
  width: string;
  path: string;
}

/**
 * Component part of a common page for navigation.
 *
 */
const CommonNavigation = () => {
  const dispatch = useAppDispatch();

  const { role } = useAppSelector(selectProfileData);

  const [cards, setCards] = useState<ICard[]>([]);

  useEffect(() => {
    if (!role && AUTHORIZATION_TOKEN) {
      dispatch(getUserInfo());
    }

    if (role === 'teamlead' || role === 'pentester') {
      setCards(teamleadOrPentesterCards);
    } else if (role === 'analyst' || role === 'client') {
      setCards(clientOrAnalyticCards);
    } else if (role) {
      setCards(allCards);
    }
  }, [dispatch, role]);

  return (
    <div className={styles.common}>
      {cards.map(({path, title, width, image, background}) => (
        <Link key={path} to={path} style={{width}} className={styles['common-link']}>
          <div
            style={{background: `url(${background}) 10% 10% no-repeat`}}
            className={styles['common-link-background']}
          />
          <img src={image} alt={title} className={styles['common-link-image']}/>
          <Title className={styles['common-link-title']} variant={TitleVariantEnum.H1}>{title}</Title>
        </Link>
      ))}
    </div>
  );
};

export default CommonNavigation;
