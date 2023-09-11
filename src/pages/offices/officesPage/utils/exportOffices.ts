import { WidthType } from 'docx';

import {ExportTypes, ITableBodyDocx, ITableCellDocx, ITableRowDocx} from '../../../../utils/export/ExportTypes';
import {exportExcel} from '../../../../utils/export/excel/exportExcel';
import {exportDOCX} from '../../../../utils/export/docx/exportDOCX';
import {FULL_DATE_TODAY} from '../../../../constants/date';
import {exportPDF} from '../../../../utils/export/pdf/exportPDF';
import {officeHeadCells} from '../../../../constants/offices';
import {IOffice} from '../../../../store/offices/officesTypes';
import {localization} from '../../../../localization/localization';

/**
 *
 * @param {ExportTypes} type   Export type
 * @param {IOffice[]} offices  Array of offices to collect data
 */
export const exportOffices = (type: ExportTypes, offices: IOffice[]) => {
  const fileName = `${localization.office.filename} (${FULL_DATE_TODAY})`;

  const officeHeaderPDF = officeHeadCells.map(headCell => headCell.text);
  const officeHeader: ITableCellDocx[] = officeHeadCells.map(cell => {
    return {
      size: 2400,
      text: cell.text || '',
    };
  });

  officeHeader.shift();
  officeHeaderPDF.shift();

  const prepareOfficeBodyPDF = offices.map(({
    name,
    address,
    availability_wifi,
    responsible_is,
    availability_separate_internet,
    security_level,
  }) => {
    return {
      name: name ? name : '-',
      address: address ? address : '-',
      availability_wifi: availability_wifi ? localization.common.present : localization.common.absent,
      responsible_is: responsible_is ? responsible_is : '-',
      availability_separate_internet: availability_separate_internet ?
        localization.common.present : localization.common.absent,
      security_level: (security_level !== null && security_level !== undefined) ? security_level.toString() : '-',
    };
  });

  const officeBodyPDF = prepareOfficeBodyPDF.map((office) => Object.values(office));

  const prepareOfficeBody: ITableRowDocx[] = offices.map(({
    name,
    address,
    availability_wifi,
    responsible_is,
    availability_separate_internet,
    security_level,
  }) => {
    const office = {
      name: name ? name : '-',
      address: address ? address : '-',
      availability_wifi: availability_wifi ? localization.common.present : localization.common.absent,
      responsible_is: responsible_is ? responsible_is : '-',
      availability_separate_internet: availability_separate_internet ?
        localization.common.present : localization.common.absent,
      security_level: (security_level !== null && security_level !== undefined) ? security_level.toString() : '-',
    };

    return {
      cells: Object.values(office).map((text) => {
        return {
          size: 2400,
          text,
        };
      }),
    };
  });

  const officeBody: ITableBodyDocx = {
    rows: prepareOfficeBody,
  };


  switch (type) {
  case ExportTypes.PDF: {
    return exportPDF(
      'landscape',
      fileName,
      [{ title: localization.office.filename, headers: officeHeaderPDF, body: officeBodyPDF }],
      'auto',
    );
  }

  case ExportTypes.DOCX: {
    return exportDOCX(fileName, {
      title: localization.office.filename,
      headers: officeHeader,
      body: officeBody,
    }, WidthType.DXA);
  }

  case ExportTypes.EXCEL: {
    return exportExcel({
      headers: officeHeader,
      title: localization.office.filename,
      body: officeBody,
    }, 180);
  }
  }
};
