import {IEntity, IEntityResponse, IGetOptionalRequest, IState} from '../storeTypes';
import {IUser} from '../auth/authTypes';

export enum VulnsTypes {
  GET = 'vulns/getVulns',
  GET_ALL = 'vulns/getAllVulns',
  GET_ONE = 'vulns/getVulnById',
  POST = 'vulns/createVuln',
  DELETE = 'vulns/deleteVuln',
  PATCH = 'vulns/changeVuln',
  UPLOAD = 'vulns/uploadVulnScreenshots',
  GET_SCREENSHOTS = 'vulns/getVulnScreenshots',
  DELETE_SCREENSHOTS = 'vulns/deleteVulnScreenshots',
  DELETE_SCREENSHOT = 'vulns/deleteVulnScreenshot',
}

interface IVulnErrors {
  location_error: string;
  vulnerability_name_error: string;
  description_error: string;
  procedure_exploiting_error: string;
  recommendation_error: string;
  negative_consequences_error: string;
  cve_id_error: string;
  cwe_id_error: string;

  attack_vector_error: string;
  attack_complexity_error: string;
  privileges_required_error: string;
  user_interaction_error: string;
  scope_error: string;
  confidentiality_error: string;
  integrity_error: string;
  availability_error: string;
}

export enum CvssPRTypes {
  N = 'PR:N',
  L = 'PR:L',
  H = 'PR:H',
}

export enum CvssSTypes {
  U = 'S:U',
  C = 'S:C',
}

export interface IVuln extends IEntity {
  name: string;
  location: string;
  description: string;
  negative_consequences: string[];
  cvss_score: number | null;
  cvss_vector: string;
  risk_level: string;
  procedure_exploiting: string;
  recommendations: string;
  cwe_id?: string[] | null;
  cve_id?: string[] | null;
  owner?: IUser;
  my_scope?: boolean;
}

export interface IVulnsState extends IState, IEntityResponse {
  vulns: IVuln[];
  allVulns: IVuln[];
  vulnById: IVuln;
  vulnScreenshots?: string[];
  errors: IVulnErrors;
  selectTab: string;
}



export interface IVulnRequest extends IGetOptionalRequest {
  objectId: string;
  projectId: string;
  objectType: string;
}

export interface ICreateVulnRequest extends IVulnRequest {
  vuln: IVuln;
}

export interface IDeleteVulnRequest extends IVulnRequest {
  vulnId: string;
}

export interface IChangeVulnRequest extends IDeleteVulnRequest {
  vuln: IVuln;
}



export interface IVulnResponse extends IEntityResponse {
  vuln: IVuln;
}

export interface IGetVulnResponse extends Pick<IState, 'count'> {
  data: IVuln[];
}

export interface IDeleteVulnResponse extends IEntityResponse {
  id: string;
}



export interface IUploadScreenshotsRequest extends IDeleteVulnRequest {
  files: any;
}

export interface IUploadScreenshotsResponse {
  id: string;
  vulnerability_id: string;
}

export interface IDeleteScreenshotRequest extends IDeleteVulnRequest {
  screenId: string;
  fullScreenId: string;
}
