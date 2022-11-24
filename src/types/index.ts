import { Schema } from 'mongoose';

export enum ForecastAction {
  Read = 'Read',
  Write = 'Write',
  Create = 'Create',
}

export enum DateTime {
  DateTime = 'DateTime',
  Date = 'Date',
  Time = 'Time',
}

export enum MatchStatus {
  Forecast = 'Forecast',
  Finished = 'Finished',
  Canceled = 'Canceled',
}

export enum Stages {
  GS = 'Group Stage',
  PO = 'Play Off',
}

export enum Rounds {
  R16 = '1/8 Final',
  QF = '1/4 Final',
  SF = '1/2 Final',
  Third = '3rd place',
  F = 'Final',
}

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

export interface IForecastProps {
  match: IMatch;
  forecast: IForecast;
  className?: string;
}

export interface IForecastsProps {
  className?: string;
}

export interface IHeaderProps {
  className?: string;
}

export interface IHomePageProps {
  className?: string;
}

export interface ILayoutProps {
  children: React.ReactNode;
  className?: string;
}

export interface ILogInProps {
  className?: string;
}

export interface IMatchesProps {
  forecast?: boolean;
  className?: string;
}

export interface INavigationProps {
  items: Array<INavigationItem>;
  activePath?: string;
  className?: string;
}

export interface IScoreTableProps {
  className?: string;
}

export interface ISignUpProps {
  className?: string;
}

export interface ITeamsProps {
  className?: string;
}

/*
 * Types
 */

export interface IForecast {
  user: Schema.Types.ObjectId;
  match: Schema.Types.ObjectId;
  goal1: number;
  goal2: number;
  history?: [
    {
      date: number;
      goal1: number;
      goal2: number;
    }
  ];
  result: string;
  _id?: string;
}

export interface IMatch {
  date: number;
  team1Code: string;
  team1?: {
    code: string;
    name: string;
    flag?: string;
    link?: string;
    _id?: string;
  };
  team2Code: string;
  team2?: {
    code: string;
    name: string;
    flag?: string;
    link?: string;
    _id?: string;
  };
  result1: string;
  result2: string;
  stage: {
    kind: keyof typeof Stages;
    groupRound: string | keyof typeof Rounds;
    round: number;
  };
  matchStatus: keyof typeof MatchStatus;
  forecast: boolean;
  linkToBet: string;
  _id?: string;
}

export interface IRole {
  name: string;
}

export interface ITeam {
  code: string;
  name: string;
  flag?: string;
  link?: string;
  _id?: string;
}

export interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  roles: [Schema.Types.ObjectId];
}
