import {IEntityResponse} from '../../store/storeTypes';

export interface INotification {
  text: string;
  isVisible: boolean;
  isDisabled?: boolean;
}

export interface INotificationProps extends IEntityResponse {
  error: string | null;
  title: string;
}
