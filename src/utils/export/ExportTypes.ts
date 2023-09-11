export interface ITable {
    title: string;
    body: any[];
    headers: any[];
}

export interface ITableCellDocx {
    size: number;
    text: string;
}

export interface ITableRowDocx {
    cells: ITableCellDocx[];
}

export interface ITableBodyDocx {
    rows: ITableRowDocx[];
}

export interface ITableDocx {
    title: string;
    body: ITableBodyDocx;
    headers: ITableCellDocx[];
}

export enum ExportTypes {
    PDF = 'pdf',
    DOCX = 'docx',
    EXCEL = 'excel'
}
