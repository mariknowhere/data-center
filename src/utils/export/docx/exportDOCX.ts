import {
  WidthType,
  TableRow,
  TableCell,
  Paragraph,
  VerticalAlign,
  Table,
  HeadingLevel,
  Packer,
  Document,
  PageOrientation,
} from 'docx';
import {saveAs} from 'file-saver';

import {ITableDocx} from '../ExportTypes';
import {FULL_DATE_TODAY} from '../../../constants/date';

/**
 *
 * @param {string} fileName      Name for new file
 * @param {ITableDocx} table     Table of values for export
 * @param {WidthType} widthType  Type for cell size
 */
export const exportDOCX = (fileName: string, table: ITableDocx, widthType: WidthType) => {
  const prepareRows = table.body.rows.map((row) => {
    return new TableRow({
      children: row.cells.map(({size, text}) => {
        return new TableCell({
          width: {
            size: size,
            type: widthType,
          },
          children: [new Paragraph(text)],
          margins: { top: 50, bottom: 50, left: 50, right: 50 },
          verticalAlign: VerticalAlign.CENTER,
        });
      }),
    });
  });

  const prepareHeaders = table.headers.map(({size, text}) => {
    return new TableCell({
      width: {
        size: size,
        type: widthType,
      },
      children: [new Paragraph(text)],
      margins: { top: 50, bottom: 50, left: 50, right: 50 },
      verticalAlign: VerticalAlign.CENTER,
    });
  });

  const columnWidths = table.headers.map(({ size }) => size);

  const prepareTable = new Table({
    columnWidths,
    rows: [
      new TableRow({
        children: prepareHeaders,
      }),
      ...prepareRows,
    ],
  });

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            size: {
              orientation: PageOrientation.LANDSCAPE,
            },
          },
        },
        children: [
          new Paragraph({
            text: table.title,
            heading: HeadingLevel.HEADING_1,
            spacing: {
              after: 200,
            },
            shading: {
              color: '00FFFF',
            },
          }),
          prepareTable,
        ],
      },
    ],
  });

  Packer.toBlob(doc).then(blob => {
    saveAs(blob, `${fileName} (${FULL_DATE_TODAY}).docx`);
  });
};