import jsPDF from 'jspdf';

import 'jspdf-autotable';
import './Roboto-Medium-normal';
import {ITable} from '../ExportTypes';
import {FULL_DATE_TODAY} from '../../../constants/date';

/**
 *
 * @param {string} orientation         File Orientation
 * @param {string} fileName            Name for new file
 * @param {ITable[]} tables            Table of values for export
 * @param {string | number} cellWidth  Column size within a table
 */
export const exportPDF = (orientation: string, fileName: string, tables: ITable[], cellWidth: string | number) => {
  const unit = 'pt';
  const size = 'A4'; // Use A1, A2, A3 or A4

  // @ts-ignore
  const doc = new jsPDF(orientation, unit, size); // portrait or landscape

  doc.addFont('Roboto-Medium-normal.ttf', 'Roboto-Medium-normal', 'normal');
  doc.setFont('Roboto-Medium-normal');
  doc.setFontSize(15);

  tables.forEach((table) => {
    doc.text(table.title, 40, 40);

    // @ts-ignore
    doc.autoTable({
      startY: 50,
      head: [table.headers],
      body: table.body,
      styles: {
        font: 'Roboto-Medium-normal',
        fontStyle: 'normal',
        cellWidth: cellWidth,
      },
      headStyles: {
        fillColor: [249, 249, 249],
        textColor: 'black',
        lineColor: [240, 240, 240],
        lineWidth: 0.5,
      },
      bodyStyles: {
        lineColor: [240, 240, 240],
        lineWidth: 0.5,
      },
      theme: 'grid',
    });

    doc.addPage();
  });

  doc.deletePage(tables.length + 1);
  doc.save(`${fileName} (${FULL_DATE_TODAY}).pdf`);
};
