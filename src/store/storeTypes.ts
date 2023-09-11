import {store} from './store';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export interface IState {
  isLoading: boolean;
  error: string | null;
  count: number;
}

export interface IThunkApiConfigProps {
  rejectValue: string;
}

export interface IGetOptionalRequest {
  pagination?: string;
  filters?: string;
  id?: string
  projectId?: string;
  objectType?: string;
}

export interface IEntity {
  id?: string;
  is_delete?: boolean;
}

export interface IEntityResponse {
  status: number | null;
}
