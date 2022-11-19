export interface ILink {
  label: string;
  value: string;
}

export interface INavigationItem {
  link: ILink;
  innerLinks?: ILink[];
}

/*
 * Components
 */

export interface IFooterProps {
  className?: string;
}

export interface IHeaderProps {
  className?: string;
}

export interface ILayoutProps {
  children: React.ReactNode;
  className?: string;
}

export interface INavigationProps {
  items: Array<INavigationItem>;
  activePath?: string;
  isAuth?: boolean;
  userName?: string;
  logOutHandler?: () => void;
  className?: string;
}

export interface ITeamsProps {
  className?: string;
}

/*
 * Types
 */

export interface ITeam {
  code: string;
  name: string;
  flag?: string;
  link?: string;
  _id?: string;
}
