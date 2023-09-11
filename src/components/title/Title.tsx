import {FC} from 'react';

import classNames from 'classnames';

import {ITitleProps, TitleVariantEnum} from './TitleTypes';
import styles from './Title.module.scss';

const Title: FC<ITitleProps> = ({ variant = TitleVariantEnum.H2, className, children }) => {
  return (
    <>
      {variant === TitleVariantEnum.H1 ? (
        <h1 className={classNames(className, styles['title'], styles[`title-${variant}`])}>
          {children}
        </h1>
      ) : variant === TitleVariantEnum.H2 ? (
        <h2 className={classNames(className, styles['title'], styles[`title-${variant}`])}>
          {children}
        </h2>
      ) : (
        <h3 className={classNames(className, styles['title'], styles[`title-${variant}`])}>
          {children}
        </h3>
      )}
    </>
  );
};

export default Title;
