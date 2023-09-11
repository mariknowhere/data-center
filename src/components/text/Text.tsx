import { FC } from 'react';

import classNames from 'classnames';

import { ITextProps, TextVariantEnum } from './TextTypes';
import styles from './Text.module.scss';

const Text: FC<ITextProps> = ({ className, variant = TextVariantEnum.M, children  }) => {
  return (
    <span className={classNames(className, styles['text'], styles[`text-${variant}`])}>
      {children}
    </span>
  );
};

export default Text;
