import {IModalProps} from '../../ModalTypes';

export enum ModalTypes {
  Delete = 'delete',
  Change = 'change',
  Reset = 'reset',
  Create = 'create',
  Appoint = 'appoint',
  Restore = 'restore',
}

export interface IConfirmProps extends IModalProps {
  text: string;
  onConfirmClick: () => void;
  type?: ModalTypes;
}
