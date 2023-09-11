import {FC} from 'react';

import classNames from 'classnames';

import Text from '../text/Text';

import styles from './Button.module.scss';
import {ButtonTypeEnum, IButtonProps} from './ButtonTypes';

const Button: FC<IButtonProps> = ({
  buttonText,
  className,
  classNameText,
  onClick,
  type = ButtonTypeEnum.Blue,
  typeButtonText,
}) => {
  return (
    <button onClick={onClick} className={classNames(className, styles.button, styles[`button_${type}`])}>
      <Text className={classNames(classNameText, styles['button-text'])} variant={typeButtonText}>
        {buttonText}
      </Text>
    </button>
  );
};

export default Button;
