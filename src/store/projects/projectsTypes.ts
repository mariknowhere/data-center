import {IEntity, IEntityResponse, IState} from '../storeTypes';
import {ICustomerInfo} from '../customers/customersTypes';
import {IUser} from '../auth/authTypes';

export enum ProjectTypes {
  GET = 'projects/getProject',
  GET_ALL = 'projects/getAllProject',
  GET_ONE = 'projects/getProjectById',
  GET_LOGS = 'projects/getProjectLogs',
  RESTORE = 'projects/restoreProject',
  POST = 'projects/createProject',
  DELETE = 'projects/deleteProject',
  PATCH = 'projects/changeProject'
}

export enum TeamleadTypes {
  GET = 'projects/getTeamleads',
  GET_INFO = 'projects/getTeamleadInfo',
  POST = 'projects/createTeamlead',
  DELETE = 'projects/deleteTeamlead'
}

export enum ManagerTypes {
  GET = 'projects/getManagers',
  GET_INFO = 'projects/getManagerInfo',
  POST = 'projects/createManager',
  DELETE = 'projects/deleteManager'
}

export interface IProject extends IEntity {
  name: string;
  start_date: string;
  end_date: string;
  gos_order_number?: string;
  gos_order_date?: string;
  teamlead?: IUser | null;
  manager?: IUser | null;
  customer?: ICustomerInfo | null;
}



export interface ICreateProjectRequest {
  project: IProject;
  customerId: string;
}

export interface IProjectResponse extends IEntityResponse {
  project: IProject;
}

export interface IGetProjectResponse extends Pick<IState, 'count'> {
  data: IProject[];
  count: number;
}

export interface IGetProjectLogsResponse {
  data: ILog[];
}

export interface IDeleteProjectResponse extends Omit<IProjectResponse, 'project'> {
  id: string;
}



export interface ITeamleadRequest {
  teamleadId: string;
}

export interface ICreateTeamleadRequest extends Pick<ITeamleadRequest, 'teamleadId'> {
  projectId: string;
}

export interface ITeamleadResponse extends IEntityResponse {
  teamleadId: string;
}



export interface IManagerRequest {
  managerId: string;
}

export interface ICreateManagerRequest extends Pick<IManagerRequest, 'managerId'> {
  projectId: string;
}

export interface IManagerResponse extends IEntityResponse {
  managerId: string;
}



export interface IProjectErrors {
  customer_name_error: string;
  project_name_error: string;
  start_date_error: string;
  end_date_error: string;
  gos_order_number_error: string;
  gos_order_date_error: string;
}

export interface ILog {
  created_at: string;
  user: IUser;
  action_description: string;
}

export interface IProjectsState extends IState, IEntityResponse {
  projects: IProject[];
  allProjects: IProject[];
  projectById: IProject;
  logs: ILog[];
  errors: IProjectErrors;
  teamleads: IUser[];
  managers: IUser[];
  notificationTitle: string;
  isProjectChanged: boolean;
}
