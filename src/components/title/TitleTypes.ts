import {ReactNode} from 'react';

export enum TitleVariantEnum {
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
}

export interface ITitleProps {
  children?: ReactNode;
  variant?: TitleVariantEnum;
  className?: string;
}
