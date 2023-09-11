import { WidthType } from 'docx';

import {ExportTypes, ITableBodyDocx, ITableCellDocx, ITableRowDocx} from '../../../../utils/export/ExportTypes';
import {exportExcel} from '../../../../utils/export/excel/exportExcel';
import {exportDOCX} from '../../../../utils/export/docx/exportDOCX';
import {FULL_DATE_TODAY} from '../../../../constants/date';
import {exportPDF} from '../../../../utils/export/pdf/exportPDF';
import {IInfSystem} from '../../../../store/infSystems/infSystemsTypes';
import {infSystemHeadCells} from '../../../../constants/infSystems';
import {localization} from '../../../../localization/localization';

/**
 *
 * @param {ExportTypes} type         Export type
 * @param {IInfSystem[]} infSystems  Array of inf systems to collect data
 */
export const exportInfSystems = (type: ExportTypes, infSystems: IInfSystem[]) => {
  const fileName = `${localization.infSystem.filename} (${FULL_DATE_TODAY})`;

  const infSystemHeaderPDF = infSystemHeadCells.map(headCell => headCell.text);
  const infSystemHeader: ITableCellDocx[] = infSystemHeadCells.map(cell => {
    return {
      size: 2000,
      text: cell.text || '',
    };
  });

  infSystemHeaderPDF.shift();
  infSystemHeader.shift();

  const prepareInfSystemBodyPDF = infSystems.map(({
    name,
    availability_interface,
    web_interface_address,
    security_level,
    product,
    product_manager,
    inf_system_contact_person,
  }) => {
    return  {
      name: name ? name : '-',
      availability_interface: availability_interface ? localization.common.present : localization.common.absent,
      web_interface_address: web_interface_address ? web_interface_address : '-',
      security_level: (security_level !== null && security_level !== undefined) ? security_level.toString() : '-',
      product: product ? product : '-',
      product_manager: product_manager ? product_manager : '-',
      inf_system_contact_person: inf_system_contact_person ? inf_system_contact_person : '-',
    };
  });

  const infSystemBodyPDF =
    prepareInfSystemBodyPDF.map((infSystem) => Object.values(infSystem));

  const prepareInfSystemBody: ITableRowDocx[] = infSystems.map(({
    name,
    availability_interface,
    web_interface_address,
    security_level,
    product,
    product_manager,
    inf_system_contact_person,
  }) => {
    const infSystem = {
      name: name ? name : '-',
      availability_interface: availability_interface ? localization.common.present : localization.common.absent,
      web_interface_address: web_interface_address ? web_interface_address : '-',
      security_level: (security_level !== null && security_level !== undefined) ? security_level.toString() : '-',
      product: product ? product : '-',
      product_manager: product_manager ? product_manager : '-',
      inf_system_contact_person: inf_system_contact_person ? inf_system_contact_person : '-',
    };

    return {
      cells: Object.values(infSystem).map((text) => {
        return {
          size: 2000,
          text,
        };
      }),
    };
  });

  const infSystemBody: ITableBodyDocx = {
    rows: prepareInfSystemBody,
  };


  switch (type) {
  case ExportTypes.PDF: {
    return exportPDF(
      'landscape',
      fileName,
      [{ title: localization.infSystem.filename, headers: infSystemHeaderPDF, body: infSystemBodyPDF }],
      'auto',
    );
  }

  case ExportTypes.DOCX: {
    return exportDOCX(
      fileName, {
        title: localization.infSystem.filename,
        headers: infSystemHeader,
        body: infSystemBody,
      },
      WidthType.DXA,
    );
  }

  case ExportTypes.EXCEL: {
    return exportExcel(
      { headers: infSystemHeader, title: localization.infSystem.filename, body: infSystemBody },
      150,
    );
  }
  }
};
