import {FC} from 'react';

import classNames from 'classnames';

import {IInputProps, InputTypeEnum} from './InputTypes';
import styles from './Input.module.scss';

const Input: FC<IInputProps> = ({
  type = InputTypeEnum.Text,
  imageUrl,
  name,
  placeholder,
  className,
  list,
  onClick,
  value,
  onChange,
  disabled,
  disabledCheckbox,
  accept = 'image/*',
  multiple = true,
}) => {
  return (
    <div className={classNames(className, styles['input-wrapper'])}>
      <input
        onClick={onClick}
        type={type}
        name={name}
        list={list}
        id={name}
        value={value}
        checked={value}
        readOnly={disabled}
        disabled={disabledCheckbox}
        onChange={onChange}
        placeholder={placeholder}
        accept={accept}
        multiple={multiple}
        className={classNames(styles.input, styles[`input-${type}`], { [styles['input_readonly']]: disabled })}
      />
      {imageUrl && <img src={imageUrl} alt={name} className={styles['input-image']} />}
    </div>
  );
};

export default Input;
