import { FC } from 'react';

import styles from './HamburgerMenu.module.scss';
import {IHamburgerMenuProps} from './HamburgerMenuTypes';

const HamburgerMenu: FC<IHamburgerMenuProps> = ({ children, right = 376 }) => {
  return (
    <div className={styles.menu}>
      <div className={styles['menu-overlay']} style={{right: `${right}px`}} />
      {children}
    </div>
  );
};

export default HamburgerMenu;
