import {FC} from 'react';

import {localization} from '../../localization/localization';

import styles from './Archive.module.scss';

const Archive: FC = () => {
  return (
    <div className={styles.archive}>
      {localization.archive.title}
      <img src="/assets/icons/delete.png" alt={localization.archive.imgAlt} />
    </div>
  );
};

export default Archive;
