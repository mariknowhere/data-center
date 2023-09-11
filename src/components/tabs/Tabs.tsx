import {FC} from 'react';

import classNames from 'classnames';

import styles from './Tabs.module.scss';
import {ITabsProps} from './TabsTypes';

const Tabs: FC<ITabsProps> = ({ links, tabActive, onClick }) => {
  return (
    <div className={styles.tabs}>
      <div className={styles['tabs-list']}>
        {links.map(({ name, count, tabId }) => (
          <div key={name} onClick={() => onClick(tabId)} className={classNames(styles['tabs-item'], {
            [styles['tabs-item_active']]: tabId === tabActive,
          })}>
            {name}
            {count !== undefined && (
              <span className={styles['tabs-item-count']}>
                {count}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
