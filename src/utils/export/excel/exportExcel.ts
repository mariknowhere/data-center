import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

import {FULL_DATE_TODAY} from '../../../constants/date';
import {ITableDocx} from '../ExportTypes';

/**
 *
 * @param {ITableDocx} table   Table of values for export
 * @param {number} sizeColumn  Column size within a table
 */
export const exportExcel = (table: ITableDocx, sizeColumn?: number) => {
  const ExcelJSWorkbook = new ExcelJS.Workbook();
  const worksheet = ExcelJSWorkbook.addWorksheet(`${table.title} (${FULL_DATE_TODAY})`);

  worksheet.mergeCells('A2:B2');

  const customCell = worksheet.getCell('A2');
  customCell.font = {
    name: 'Comic Sans MS',
    family: 4,
    size: 20,
    underline: true,
    bold: true,
  };

  customCell.value = table.title;

  const headerRow = worksheet.addRow(3);
  worksheet.getRow(3).font = { bold: true };

  for (let i = 0; i < table.headers.length; i++) {
    const currentColumnWidth = sizeColumn || 110;

    worksheet.getColumn(i + 1).width = currentColumnWidth / 6;

    const cell = headerRow.getCell(i + 1);
    cell.value = table.headers[i].text;
  }

  for (let i = 0; i < table.body.rows.length; i++) {
    const dataRow = worksheet.addRow(3);

    // if (table.body.rows[i].rowType === "data") {
    //   dataRow.outlineLevel = 1;
    // }

    for (let j = 0; j < table.body.rows[i].cells.length; j++) {
      const cell = dataRow.getCell(j + 1);
      cell.value = table.body.rows[i].cells[j].text;
    }
  }

  const rowCount = worksheet.rowCount + 2;

  worksheet.mergeCells(`A${rowCount}:B${rowCount}`);
  worksheet.getRow(1).font = { bold: true };
  worksheet.getCell(`A${rowCount}`).font = {
    name: 'Comic Sans MS',
    family: 4,
    size: 20,
    underline: true,
    bold: true,
  };

  worksheet.getCell(`A${rowCount}`).value = FULL_DATE_TODAY;

  ExcelJSWorkbook.xlsx.writeBuffer().then(function(buffer) {
    saveAs(
      new Blob([buffer], { type: 'application/octet-stream' }),
      `${table.title} (${FULL_DATE_TODAY}).xlsx`,
    );
  });
};
