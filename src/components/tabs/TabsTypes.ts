export interface ILink {
  name: string;
  tabId: string;
  count?: number;
}

export interface ITabsProps {
  links: ILink[];
  tabActive: string;
  onClick: (name: string) => void;
}
