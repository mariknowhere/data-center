import { WidthType } from 'docx';

import {ExportTypes, ITableBodyDocx, ITableCellDocx, ITableRowDocx} from '../../../../utils/export/ExportTypes';
import {exportExcel} from '../../../../utils/export/excel/exportExcel';
import {exportDOCX} from '../../../../utils/export/docx/exportDOCX';
import {FULL_DATE_TODAY} from '../../../../constants/date';
import {exportPDF} from '../../../../utils/export/pdf/exportPDF';
import {ICustomer} from '../../../../store/customers/customersTypes';
import {customerHeadCells, prepareCustomerTypeToRu} from '../../../../constants/costumer';
import {localization} from '../../../../localization/localization';

/**
 *
 * @param {ExportTypes} type       Export type
 * @param {ICustomer[]} customers  Array of customers to collect data
 */
export const exportCustomers = (type: ExportTypes, customers: ICustomer[]) => {
  const fileName = `${localization.customer.filename} (${FULL_DATE_TODAY})`;

  const projectsHeadersPDF = customerHeadCells.map(cell => cell.text);
  const customerHeaders: ITableCellDocx[] = customerHeadCells.map(cell => {
    return {
      size: 3500,
      text: cell.text || '',
    };
  });

  projectsHeadersPDF.shift();
  customerHeaders.shift();

  const prepareCustomersBody: ITableRowDocx[] = customers.map(({
    inn,
    customer_name,
    customer_type,
    number_employees,
  }) => {
    const customer = {
      customer_name: customer_name ? customer_name : '-',
      inn: (inn !== null && inn !== undefined) ? inn.toString() : '-',
      number_employees: (number_employees !== null && number_employees !== undefined) ? number_employees.toString() : '-',
      customer_type: customer_type ? prepareCustomerTypeToRu[customer_type] : '-',
    };

    return {
      cells: Object.values(customer).map((text) => {
        return {
          size: 3500,
          text,
        };
      }),
    };
  });

  const customersBody: ITableBodyDocx = {
    rows: prepareCustomersBody,
  };

  const customersBodyPDF = customers.map(({ customer_name, inn, number_employees, customer_type }) => {
    const customer = {
      customer_name: customer_name ? customer_name : '-',
      inn: (inn !== null && inn !== undefined) ? inn : '-',
      number_employees: (number_employees !== null && number_employees !== undefined) ? number_employees.toString() : '-',
      customer_type: customer_type ? prepareCustomerTypeToRu[customer_type] : '-',
    };

    return Object.values(customer);
  });

  switch (type) {
  case ExportTypes.PDF: {
    return exportPDF(
      'landscape',
      fileName,
      [{ title: localization.customer.filename, headers: projectsHeadersPDF, body: customersBodyPDF }],
      'auto',
    );
  }

  case ExportTypes.DOCX: {
    return exportDOCX(
      fileName,
      {
        title: localization.customer.filename,
        headers: customerHeaders,
        body: customersBody,
      }, WidthType.DXA,
    );
  }

  case ExportTypes.EXCEL: {
    return exportExcel({
      headers: customerHeaders,
      title: localization.customer.filename,
      body: customersBody,
    },
    150,
    );
  }
  }
};
