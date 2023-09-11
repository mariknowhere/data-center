import {FC} from 'react';
import {RotatingLines} from 'react-loader-spinner';

import classNames from 'classnames';

import styles from './Loader.module.scss';
import {ILoaderProps} from './LoaderTypes';

const Loader: FC<ILoaderProps> = ({ className }) => {
  return (
    <div className={classNames(styles['loader-wrapper'], className)}>
      <RotatingLines
        strokeColor="grey"
        strokeWidth="3"
        animationDuration="1"
        width="120"
        visible
      />
    </div>
  );
};

export default Loader;
