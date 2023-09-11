import {FC, useEffect, useState} from 'react';

import {useLocation, useNavigate} from 'react-router-dom';

import HamburgerMenu from '../../components/hamburgerMenu/HamburgerMenu';
import {ROUTES} from '../../router/routes';
import Button from '../../components/button/Button';
import {ButtonTypeEnum} from '../../components/button/ButtonTypes';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {logout} from '../../store/auth/authAsync';
import InputForm from '../../components/inputForm/InputForm';
import {useAppSelector} from '../../hooks/useAppSelector';
import {selectProfileData} from '../../store/auth/authSelectors';
import {prepareRoleVariantsToRu} from '../../constants/roles';
import {localization} from '../../localization/localization';

import styles from './SettingsPage.module.scss';

/**
 * Component for displaying information on settings page.
 *
 */
const SettingsPage: FC = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const {
    email,
    role,
    first_name,
    role_description,
  } = useAppSelector(selectProfileData);

  const [roleState, setRoleState] = useState<string>('');

  const fromPage = location.state.from.pathname || ROUTES.COMMON;

  const onBackClick = () => navigate(fromPage);

  const onLogOutClick = () => {
    dispatch(logout());

    navigate(ROUTES.COMMON + ROUTES.LOGIN);
  };

  useEffect(() => {
    const preparedRoleState = prepareRoleVariantsToRu[role || ''];

    setRoleState(preparedRoleState);
  }, [role]);

  return (
    <HamburgerMenu>
      <div className={styles['menu-content']} >
        <h2 className={styles['menu-content-title']}>{localization.settings.title}</h2>
        <div className={styles['menu-content-inputs']}>
          <InputForm
            text={localization.settings.nameText}
            placeholder={localization.settings.namePlaceholder}
            value={first_name}
            disabled
          />
          <InputForm
            text={localization.settings.emailText}
            placeholder={localization.settings.emailPlaceholder}
            value={email}
            disabled
          />
          <InputForm
            text={localization.settings.roleText}
            placeholder={localization.settings.rolePlaceholder}
            value={roleState}
            disabled
          />
          <InputForm
            text={localization.settings.descriptionText}
            placeholder={localization.settings.descriptionPlaceholder}
            value={role_description}
            textarea
            disabled
          />
        </div>
        <div className={styles['menu-content-buttons']}>
          <Button onClick={onBackClick} buttonText={localization.settings.backButtonText} />
          <Button
            onClick={onLogOutClick}
            buttonText={localization.settings.logOutButtonText}
            type={ButtonTypeEnum.Red}
          />
        </div>
      </div>
    </HamburgerMenu>
  );
};

export default SettingsPage;
