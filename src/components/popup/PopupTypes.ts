export interface IPopupItem {
  text: string;
  value?: string;
  id?: number | string;
}

export interface IPopupProps {
  items: IPopupItem[];
  activeItem: string;
  onChange: (event: any) => void;
}
