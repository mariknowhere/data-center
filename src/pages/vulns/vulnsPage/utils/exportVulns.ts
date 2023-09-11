import {WidthType} from 'docx';

import {ExportTypes, ITableBodyDocx, ITableCellDocx, ITableRowDocx} from '../../../../utils/export/ExportTypes';
import {exportExcel} from '../../../../utils/export/excel/exportExcel';
import {exportDOCX} from '../../../../utils/export/docx/exportDOCX';
import {FULL_DATE_TODAY} from '../../../../constants/date';
import {exportPDF} from '../../../../utils/export/pdf/exportPDF';
import {prepareNegativeConsequencesToRu, vulnHeadCells} from '../../../../constants/vulns';
import {IVuln} from '../../../../store/vulns/vulnsTypes';
import {preparedMultiSelectData} from '../../../../utils/prepare/preparedMultiSelectData';
import {localization} from '../../../../localization/localization';

/**
 *
 * @param {ExportTypes} type     Export type
 * @param {IVuln[]} objectVulns  Array of vulns to collect data
 */
export const exportVulns = (type: ExportTypes, objectVulns: IVuln[]) => {
  const fileName = `${localization.vuln.filename} (${FULL_DATE_TODAY})`;

  const vulnHeadersPDF = vulnHeadCells.map(customerCell => customerCell.text);
  const vulnHeaders: ITableCellDocx[] = vulnHeadCells.map(cell => {
    return {
      size: 1800,
      text: cell.text || '',
    };
  });

  vulnHeadersPDF.shift();
  vulnHeaders.shift();

  const prepareVulnsBodyPDF = objectVulns.map(({
    location,
    cve_id,
    cwe_id,
    name,
    negative_consequences,
    description,
    procedure_exploiting,
    recommendations,
  }) => {
    return  {
      name: name ? name : '-',
      cve_id: cve_id ? cve_id[0] : '-',
      cwe_id: cwe_id ? cwe_id[0] : '-',
      location: location ? location : '-',
      description: description ? description : '-',
      negative_consequences: negative_consequences && negative_consequences?.length !== 0 ?
        preparedMultiSelectData(negative_consequences, prepareNegativeConsequencesToRu) : '-',
      procedure_exploiting: procedure_exploiting ? procedure_exploiting : '-',
      recommendations: recommendations ? recommendations : '-',
    };
  });

  const vulnsBodyPDF = prepareVulnsBodyPDF.map((vuln) => Object.values(vuln));

  const prepareVulnsBody: ITableRowDocx[] = objectVulns.map(({
    location,
    cve_id,
    cwe_id,
    name,
    negative_consequences,
    description,
    procedure_exploiting,
    recommendations,
  }) => {
    const vuln = {
      name: name ? name : '-',
      cve_id: cve_id ? cve_id[0] : '-',
      cwe_id: cwe_id ? cwe_id[0] : '-',
      location: location ? location : '-',
      description: description ? description : '-',
      negative_consequences: negative_consequences && negative_consequences?.length !== 0 ?
        preparedMultiSelectData(negative_consequences, prepareNegativeConsequencesToRu) : '-',
      procedure_exploiting: procedure_exploiting ? procedure_exploiting : '-',
      recommendations: recommendations ? recommendations : '-',
    };

    return {
      cells: Object.values(vuln).map((text) => {
        return {
          size: 900,
          text,
        };
      }),
    };
  });

  const vulnsBody: ITableBodyDocx = {
    rows: prepareVulnsBody,
  };


  switch (type) {
  case ExportTypes.PDF: {
    return exportPDF('landscape', fileName,
      [{ title: localization.vuln.filename, headers: vulnHeadersPDF, body: vulnsBodyPDF }], 'auto',
    );
  }

  case ExportTypes.DOCX: {
    return exportDOCX(fileName, {
      title: localization.vuln.filename,
      headers: vulnHeaders,
      body: vulnsBody,
    }, WidthType.DXA);
  }

  case ExportTypes.EXCEL: {
    return exportExcel({
      headers: vulnHeaders,
      title: localization.vuln.filename,
      body: vulnsBody,
    }, 150);
  }
  }
};
