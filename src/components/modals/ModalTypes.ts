import {Dispatch, ReactNode, SetStateAction} from 'react';

export interface IModalProps {
  isModalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  setSecondaryModalVisible?: Dispatch<SetStateAction<boolean>>;
  title?: string;
  children?: ReactNode;
  className?: string;
  classNameContent?: string;
}
