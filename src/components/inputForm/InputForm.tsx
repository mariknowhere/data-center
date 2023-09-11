import {FC} from 'react';

import classNames from 'classnames';

import Select from 'react-select';

import Text from '../text/Text';

import Input from '../input/Input';


import {TextVariantEnum} from '../text/TextTypes';
import {InputTypeEnum} from '../input/InputTypes';
import Calendar from '../calendar/Calendar';
import Popup from '../popup/Popup';
import Textarea from '../textarea/Textarea';

import styles from './InputForm.module.scss';
import {IInputFormProps} from './InputFormTypes';


const InputForm: FC<IInputFormProps> = ({
  text,
  errorMessage,
  type,
  date,
  onDateChange,
  popupItems,
  onPopupChange,
  onClick,
  value,
  required,
  classNameWrapper,
  classNameText,
  textarea = false,
  onTextareaChange,
  placeholder,
  disabledKeyboardNavigation,
  isMulti,
  isClearable,
  isSearchable  ,
  options,
  onSelectChange,
  secondaryValue,
  onSecondaryChange,
  onChange,
  disabled,
  primaryText,
  secondaryText,
  ...props
}) => {
  return (
    <div className={classNames(styles['input-form'], classNameWrapper)}>
      <Text
        className={classNames(styles['input-form-text'], classNameText, { [styles['input-form-text_required']]: required })}
        variant={TextVariantEnum.S}
      >
        {text}
      </Text>
      <div
        className={classNames(
          styles['input-form-wrapper'], { [styles['input-form-wrapper_secondary']]: onSecondaryChange },
        )}
        onClick={onClick}
      >
        {(type !== InputTypeEnum.Date && !textarea && !onSelectChange) && (
          <div className={styles['input-form-text-wrapper']}>
            {primaryText && (
              <Text className={styles['input-form-text_helper']} variant={TextVariantEnum.XS}>{primaryText}</Text>
            )}
            <Input
              {...props}
              disabled={disabled}
              onChange={onChange}
              type={type}
              value={value}
              placeholder={placeholder}
            />
          </div>
        )}
        {type === InputTypeEnum.Date && (
          <div className={styles['input-form-text-wrapper']}>
            {primaryText && (
              <Text className={styles['input-form-text_helper']} variant={TextVariantEnum.XS}>{primaryText}</Text>
            )}
            <Calendar date={date} onDateChange={onDateChange} disabledKeyboardNavigation={disabledKeyboardNavigation} />
          </div>
        )}
        {onSecondaryChange && (
          <img src="/assets/icons/arrow-right-blue.png" alt="До" />
        )}
        {type === InputTypeEnum.Date && onSecondaryChange && (
          <div className={styles['input-form-text-wrapper']}>
            <Text className={styles['input-form-text_helper']} variant={TextVariantEnum.XS}>{secondaryText}</Text>
            <Calendar
              date={secondaryValue}
              onDateChange={onSecondaryChange}
              disabledKeyboardNavigation={disabledKeyboardNavigation}
            />
          </div>
        )}
        {type === InputTypeEnum.Number && onSecondaryChange && (
          <div className={styles['input-form-text-wrapper']}>
            <Text className={styles['input-form-text_helper']} variant={TextVariantEnum.XS}>{secondaryText}</Text>
            <Input
              {...props}
              disabled={disabled}
              onChange={onSecondaryChange}
              type={type}
              value={secondaryValue}
              placeholder={placeholder}
            />
          </div>
        )}
        {textarea && (
          <Textarea disabled={disabled} value={value} onChange={onTextareaChange} placeholder={placeholder} />
        )}
        {popupItems && <Popup activeItem={value} items={popupItems} onChange={onPopupChange} />}
        {onSelectChange && (
          <Select
            isMulti={isMulti}
            isClearable={isClearable}
            isSearchable={isSearchable}
            value={value}
            onChange={onSelectChange}
            placeholder={placeholder}
            options={options}
          />
        )}
      </div>
      {errorMessage && (
        <Text
          variant={TextVariantEnum.S}
          className={classNames(styles['input-form-text'], styles['input-form-text_danger'])}
        >
          {errorMessage}
        </Text>
      )}
    </div>
  );
};

export default InputForm;
