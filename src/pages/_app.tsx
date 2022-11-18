import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';

import { theme, GlobalStyle } from '../styles';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default App;
