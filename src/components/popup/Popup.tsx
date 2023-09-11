import {FC} from 'react';

import classNames from 'classnames';

import {IPopupProps} from './PopupTypes';
import styles from './Popup.module.scss';

const Popup: FC<IPopupProps> = ({ items, onChange, activeItem }) => {
  return (
    <ul className={styles.popup}>
      {items.map((item) => (
        <li
          key={item.id}
          onClick={() => {onChange(item);}}
          className={classNames(styles['popup-text'], { [styles['popup-text_active']]: item.text === activeItem })}
        >
          {item.text}
        </li>
      ),
      )}
    </ul>
  );
};

export default Popup;
