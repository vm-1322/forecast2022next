export const breakpoints = {
  mobile: '375px',
  tablet: '1024px',
  desktop: '1360px',
  desktopLarge: '1760px',
};

export const media = Object.fromEntries(
  Object.entries(breakpoints).map(([name, value]) => [
    name,
    `@media (min-width: ${value})`,
  ])
) as {
  [Property in keyof typeof breakpoints]: string;
};
