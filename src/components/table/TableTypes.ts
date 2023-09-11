import {IProject} from '../../store/projects/projectsTypes';
import {IVuln} from '../../store/vulns/vulnsTypes';
import {ICustomer} from '../../store/customers/customersTypes';
import {IInfSystem} from '../../store/infSystems/infSystemsTypes';
import {IOffice} from '../../store/offices/officesTypes';

export interface IHeadCell {
  id: string;
  text?: string;
  align?: any;
  image?: boolean;
  checked?: boolean;
}

export interface ITableProps {
  headCells: IHeadCell[];
  activeRowIds?: string[];
  setActiveRowIds?: any;
  projectsBodyRows?: IProject[];
  objectsBodyRows?: any;
  vulnBodyRows?: IVuln[];
  customerBodyRows?: ICustomer[];
  infSystemBodyRows?: IInfSystem[];
  officeBodyRows?: IOffice[];
  selectTab?: string;
  className?: string;
}
