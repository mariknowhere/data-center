import { WidthType } from 'docx';

import {ExportTypes, ITableBodyDocx, ITableCellDocx, ITableRowDocx} from '../../../../utils/export/ExportTypes';
import {projectHeadCells} from '../../../../constants/projects';
import {exportExcel} from '../../../../utils/export/excel/exportExcel';
import {exportDOCX} from '../../../../utils/export/docx/exportDOCX';
import {FULL_DATE_TODAY} from '../../../../constants/date';
import {exportPDF} from '../../../../utils/export/pdf/exportPDF';
import {IProject} from '../../../../store/projects/projectsTypes';
import {localization} from '../../../../localization/localization';

/**
 *
 * @param {ExportTypes} type     Export type
 * @param {IProject[]} projects  Array of projects to collect data
 */
export const exportProjects = (type: ExportTypes, projects: IProject[]) => {
  const fileName = `${localization.project.filename} (${FULL_DATE_TODAY})`;

  const projectsHeadersPDF = projectHeadCells.map(projectCell => projectCell.text);

  const projectsHeaders: ITableCellDocx[] = projectHeadCells.map(cell => {
    return {
      size: 2900,
      text: cell.text || '',
    };
  });

  projectsHeadersPDF.shift();
  projectsHeaders.shift();

  const prepareProjectsBody: ITableRowDocx[] = projects.map(({
    name,
    start_date,
    end_date,
    gos_order_number,
    gos_order_date,
  }) => {
    const project = {
      name: name ? name : '-',
      start_date: start_date ? start_date : '-',
      end_date: end_date ? end_date : '-',
      gos_order_number: gos_order_number ? gos_order_number : '-',
      gos_order_date: gos_order_date ? gos_order_date : '-',
    };

    return {
      cells: Object.values(project).map((text) => {
        return {
          size: 2900,
          text,
        };
      }),
    };
  });

  const projectsBody: ITableBodyDocx = {
    rows: prepareProjectsBody,
  };

  const prepareProjectsBodyPDF = projects.map(({
    name,
    start_date,
    end_date,
    gos_order_number,
    gos_order_date,
  }) => {
    return {
      name: name ? name : '-',
      start_date: start_date ? start_date : '-',
      end_date: end_date ? end_date : '-',
      gos_order_number: gos_order_number ? gos_order_number : '-',
      gos_order_date: gos_order_date ? gos_order_date : '-',
    };
  });

  const projectsBodyPDF =
    prepareProjectsBodyPDF.map((project) => Object.values(project));


  switch (type) {
  case ExportTypes.EXCEL: {
    return exportExcel({
      headers: projectsHeaders,
      title: localization.project.filename,
      body: projectsBody,
    });
  }

  case ExportTypes.DOCX: {
    return exportDOCX(fileName, {
      title: localization.project.filename,
      headers: projectsHeaders,
      body: projectsBody,
    }, WidthType.DXA,
    );
  }

  case ExportTypes.PDF: {
    return exportPDF(
      'landscape',
      fileName,
      [{ title: localization.project.filename, headers: projectsHeadersPDF, body: projectsBodyPDF }],
      'auto',
    );
  }
  }
};
