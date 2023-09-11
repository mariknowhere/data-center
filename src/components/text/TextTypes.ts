import {ReactNode} from 'react';

export enum TextVariantEnum {
  L = 'l',
  M = 'm',
  S = 's',
  XS = 'xs'
}

export interface ITextProps {
  children?: ReactNode;
  variant?: TextVariantEnum;
  className?: string;
}
