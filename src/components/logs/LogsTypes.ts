import {ILog} from '../../store/projects/projectsTypes';

export interface ILogsProps {
  logs: ILog[];
  showFullLogs: boolean;
  onShowLogsHandler: () => void;
}
