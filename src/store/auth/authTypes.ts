import {IEntityResponse, IState} from '../storeTypes';

export enum AuthTypes {
  LOGIN = 'auth/login',
  LOGOUT = 'auth/logout',
  USER_INFO = 'auth/getInfoUser'
}

export interface IUser {
  id: string;
  email: string;
  first_name: string;
  is_active?: boolean;
  is_superuser?: boolean;
  is_verified?: boolean;
  role?: string;
  role_description?: string;
}

export interface ILoginRequest {
  username: string;
  password: string;
  scope?: string;
  client_id?: string;
  client_secret?: string;
  grant_type?: string;
}

export interface ILoginResponse extends IEntityResponse {
  access_token: string | null;
  token_type: string | null;
}

export interface IAuthDataProps extends ILoginResponse, Omit<IState, 'count'>, IEntityResponse {}

export interface IAuthErrorsProps {
  username_error: string;
  password_error: string;
}

export interface IAuthState {
  authData: IAuthDataProps;
  profileData: IUser;
  errors: IAuthErrorsProps;
  isAuth: boolean;
}
