import {TextVariantEnum} from '../text/TextTypes';

export enum ButtonTypeEnum {
  Blue = 'blue',
  Red = 'red',
  White = 'white',
}

export interface IButtonProps {
  buttonText: string;
  className?: string;
  onClick?: () => void;
  classNameText?: string;
  type?: ButtonTypeEnum;
  typeButtonText?: TextVariantEnum;
}
