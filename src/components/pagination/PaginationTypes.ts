import {Dispatch, SetStateAction} from 'react';

export interface IPaginationProps {
  onPageClick: (offset: number, limit: number) => void;
  count?: number;
  startPage?: number;
  startLimit?: number;
  setStartLimit?: Dispatch<SetStateAction<number>>;
}
