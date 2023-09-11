import {FC} from 'react';

import styles from './Textarea.module.scss';
import {ITextarea} from './TextareaTypes';

const Textarea: FC<ITextarea> = ({
  value,
  onChange,
  placeholder,
  disabled,
}) => {
  return (
    <textarea
      disabled={disabled}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={styles.textarea}
    />
  );
};

export default Textarea;
