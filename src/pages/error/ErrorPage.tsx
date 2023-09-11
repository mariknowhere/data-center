import {useNavigate} from 'react-router-dom';

import {FC} from 'react';
import {Watch} from 'react-loader-spinner';

import Button from '../../components/button/Button';
import Title from '../../components/title/Title';
import {ROUTES} from '../../router/routes';
import {localization} from '../../localization/localization';

import styles from './ErrorPage.module.scss';

/**
 * Component for displaying information on error page.
 *
 */
const ErrorPage: FC = () => {
  const navigate = useNavigate();

  const onCommonPageHandler = () => {
    navigate(ROUTES.COMMON);

    window.location.reload();
  };

  const onReloadPageHandler = () => window.location.reload();

  return (
    <div id="error-page" className={styles['error']}>
      <div className={styles['error-content']}>
        <Title className={styles['error-title']}>{localization.error.title}</Title>
        <Watch
          height="200"
          width="200"
          radius="46"
          color="#FF364B"
          ariaLabel="watch-loading"
          visible={true}
        />
        <div className={styles['error-buttons']}>
          <Button onClick={onCommonPageHandler} buttonText={localization.error.commonPageButtonText} />
          <Button onClick={onReloadPageHandler} buttonText={localization.error.reloadPageButtonText} />
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
