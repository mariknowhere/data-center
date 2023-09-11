import {IModalProps} from '../../ModalTypes';

export interface IExportModalProps extends IModalProps {
  handlePdfExport: () => void;
  handleDocxExport: () => void;
  handleExcelExport: () => void;
}
