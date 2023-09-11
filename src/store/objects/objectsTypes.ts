import {IEntity, IEntityResponse, IState} from '../storeTypes';

import {ILog} from '../projects/projectsTypes';

import {IUser} from '../auth/authTypes';

import {ISourceCode, ISourceCodeErrors, ISourceCodeState} from './sourceCodes/sourceCodesTypes';
import {IWebApp, IWebAppErrors, IWebAppState} from './webApps/webAppTypes';
import {IMobileApp, IMobileAppErrors, IMobileAppState} from './mobileApps/mobileAppsTypes';
import {IServer, IServerErrors, IServerState} from './servers/serversTypes';
import {IWifi, IWifiErrors, IWifiState} from './wifies/wifiesTypes';
import {
  ISocialEngineering,
  ISocialEngineeringErrors,
  ISocialEngineeringState,
} from './socialEngineering/socialEngineeringTypes';
import {IDesktopApp, IDesktopAppErrors, IDesktopAppState} from './desktopApps/desktopAppsTypes';
import {IApi, IApiErrors, IApiState} from './api/apiTypes';
import {IArm, IArmErrors, IArmState} from './arm/armTypes';
import {INetworkDevice, INetworkDeviceErrors, INetworkDeviceState} from './networkDevices/networkDevicesTypes';
import {IExternal, IExternalErrors, IExternalState} from './external/externalTypes';
import {IInternal, IInternalErrors, IInternalState} from './internal/internalTypes';
import {IOther, IOtherErrors, IOtherState} from './other/otherTypes';


export enum ObjectTypes {
  GET = 'objects/getObjects',
  GET_ALL = 'objects/getAllObjects',
  GET_BASE = 'objects/getBaseObjects',
  GET_COUNTS = 'objects/getObjectCounts',
  GET_ONE = 'objects/getObjectById',
  GET_LOGS = 'objects/getObjectLogs',
  POST = 'objects/createObject',
  DELETE = 'objects/deleteObject',
  PATCH = 'objects/changeObject',
}

export enum PentersTypes {
  GET = 'objects/getPentesters',
  GET_INFO = 'objects/getPentesterInfo',
  POST = 'objects/createPentester',
  POSTS = 'objects/createPentesters',
  DELETE = 'objects/deletePentester'
}

export type Object =
  ISourceCode | IWifi | ISocialEngineering | IDesktopApp | IMobileApp | IWebApp | IServer | IExternal | IInternal |
  IOther | IArm | IApi | INetworkDevice | any;

export interface IRequestObjectById {
  projectId: string;
  objectType?: string;
  objectId: string;
}

export interface IDataGetObjectsResponse extends Pick<IState, 'count'> {
  data: Object[];
}

export interface ICount extends Pick<IState, 'count'> {
  type: string;
}

export interface IGetObjectsResponse extends Pick<IRequestObjectById, 'objectType'> {
  data: IDataGetObjectsResponse;
}

export interface IGetObjectResponse extends Pick<IRequestObjectById, 'objectType'> {
  object: Object;
}

export interface IGetObjectLogsResponse extends Pick<IRequestObjectById, 'objectType'> {
  data: ILog[];
}

export interface IObjectResponse extends Pick<IRequestObjectById, 'objectType'>, IEntityResponse {
  object: Object;
}

export interface IRequestCreateObject extends Omit<IRequestObjectById, 'objectId'> {
  object: Object;
}

export interface IDeleteObjectResponse extends Omit<IObjectResponse, 'object'> {
  id: string
}

export interface IChangeObjectResponse extends IObjectResponse {
  currentObjectType: string;
}


export interface IRequestChangeObject extends IRequestObjectById, Pick<IObjectResponse, 'object'> {}

export interface IPentesterRequest {
  pentesterId: string;
}

export interface IDeletePentesterRequest {
  projectId: string;
  objectId: string;
  pentesterIds: string;
}

export interface ICreatePentesterRequest {
  projectId: string;
  objectIds: string;
  pentesterIds: string;
}



interface IGroupItem {
  id: string;
  name: string;
}

export interface IBaseState extends Omit<IObjectState, 'logs'> {
  base: Object;
}

export interface IObjectInitial extends IEntity {
  blackbox: boolean;
  greybox: boolean;
  attacker_model: string | null;
  work_type: string | null;
  additional_info?: string;
  inf_system?: IGroupItem;
  inf_system_id?: string | number;
  office?: IGroupItem;
  office_id?: string | number;
  project_id?: string;
  pentesters?: IUser[];
  my_scope?: boolean;
  object_type?: string;
}

interface IObjectsErrors {
  webAppErrors: IWebAppErrors;
  apiErrors: IApiErrors;
  mobileAppErrors: IMobileAppErrors;
  networkDeviceErrors: INetworkDeviceErrors;
  serverErrors: IServerErrors;
  armErrors: IArmErrors;
  wifiErrors: IWifiErrors;
  socialEngineeringErrors: ISocialEngineeringErrors;
  desktopAppErrors: IDesktopAppErrors;
  sourceCodeErrors: ISourceCodeErrors;
  externalErrors: IExternalErrors;
  internalErrors: IInternalErrors;
  otherErrors: IOtherErrors;
}

export interface IObjectsState extends Omit<IState, 'count'>, IEntityResponse {
  base: IBaseState;
  webApp: IWebAppState;
  api: IApiState;
  mobileApp: IMobileAppState;
  networkDevice: INetworkDeviceState;
  server: IServerState;
  arm: IArmState;
  wifi: IWifiState;
  socialEngineering: ISocialEngineeringState;
  desktopApp: IDesktopAppState;
  sourceCode: ISourceCodeState;
  external: IExternalState;
  internal: IInternalState;
  other: IOtherState;
  errors: IObjectsErrors;
  pentesters: IUser[];
  pentesterById: IUser;
  notificationTitle: string;
  selectTab: string;
  isChangeDone: boolean;
  isPentesterAppointed: boolean;
}

export interface IObjectState extends Pick<IState, 'count'> {
  filters: string;
  offset: number;
  limit: number;
  page: number;
  logs: ILog[];
}
