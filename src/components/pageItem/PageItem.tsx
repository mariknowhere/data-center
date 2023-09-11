import {FC} from 'react';

import classNames from 'classnames';

import Text from '../text/Text';
import {TextVariantEnum} from '../text/TextTypes';

import {IItemProps} from './PageItemTypes';
import styles from './PageItem.module.scss';

const PageItem: FC<IItemProps> = ({
  title,
  text,
  isFirst,
  className ,
  classNameTitle,
  classNameText,
}) => {
  return (
    <div className={classNames(styles['project-item'], className, { [styles['project-item_active']]: isFirst })}>
      <Text variant={TextVariantEnum.XS} className={classNames(styles['project-item-title'], classNameTitle)}>
        {title}
      </Text>
      <Text variant={TextVariantEnum.M} className={classNames(styles['project-item-text'], classNameText)}>
        {text}
      </Text>
    </div>
  );
};

export default PageItem;
