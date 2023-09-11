import {FC} from 'react';

import styles from '../../Modal.module.scss';
import Button from '../../../button/Button';
import Modal from '../../Modal';

import {localization} from '../../../../localization/localization';

import {IExportModalProps} from './ExportTypes';

const ExportModal: FC<IExportModalProps> = ({
  isModalVisible,
  setModalVisible,
  handlePdfExport,
  handleDocxExport,
  handleExcelExport,
}) => {
  const onPdfExportHandler = () => {
    setModalVisible(prevState => !prevState);

    handlePdfExport();
  };

  const onDocxExportHandler = () => {
    setModalVisible(prevState => !prevState);

    handleDocxExport();
  };

  const onExcelExportHandler = () => {
    setModalVisible(prevState => !prevState);

    handleExcelExport();
  };

  return (
    <Modal
      classNameContent={styles['modal-content_small']}
      isModalVisible={isModalVisible}
      setModalVisible={setModalVisible}
      title={localization.modals.export.title}
    >
      <div className={styles['modal-export-buttons']}>
        <Button
          className={styles['modal-export-button']}
          buttonText={localization.modals.export.pdfButtonText}
          onClick={onPdfExportHandler}
        />
        <Button
          className={styles['modal-export-button']}
          buttonText={localization.modals.export.docxButtonText}
          onClick={onDocxExportHandler}
        />
        <Button
          className={styles['modal-export-button']}
          buttonText={localization.modals.export.excelButtonText}
          onClick={onExcelExportHandler}
        />
      </div>
    </Modal>
  );
};

export default ExportModal;
