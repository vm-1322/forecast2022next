import { breakpoints, media } from './variables';

export type ColorsType = {
  common: {
    black: string;
    white: string;
  };
  primary: string;
  secondary: string;

  [key: string]: string | Record<string, string>;
};

export type FontsType = {
  primary: string;

  [key: string]: string;
};

export type BreakpointsType = typeof breakpoints;
export type MediaType = typeof media;

export type ThemeType = {
  colors: ColorsType;
  fonts: FontsType;
  breakpoints: BreakpointsType;
  media: MediaType;
};

export const theme: ThemeType = {
  colors: {
    common: {
      black: '#000',
      white: '#fff',
    },
    primary: '#686868',
    secondary: '#ab3e26',
    oddRow: '#e6e6e6',
  },
  fonts: {
    primary: 'Open Sans, sans-serif',
  },
  breakpoints,
  media,
};
