import React, { useState } from 'react';
import Head from 'next/head';

import Header from '../Header';
import Navigation from '../Navigation';
import Footer from '../Footer';
import { StyledLayout, StyledLayoutMain } from './LayoutStyled';
import { ILayoutProps, INavigationItem } from '../../types';

const Layout: React.FC<ILayoutProps> = ({ children, className }) => {
  const items: INavigationItem[] = [
    { link: { label: 'Home', value: '/' } },
    { link: { label: 'Matches', value: '/matches' } },
    { link: { label: 'Teams', value: '/teams' } },
  ];

  const [isAuth, setIsAuth] = useState(false);

  if (isAuth) {
    items.splice(1, 0, { link: { label: 'Forecasts', value: '/forecasts' } });
  }

  const logOutHandler = () => {
    setIsAuth(false);
  };

  return (
    <StyledLayout className={className}>
      <Head>
        <title>Forecast 2022</title>
      </Head>
      <Header />
      <Navigation items={items} isAuth={isAuth} logOutHandler={logOutHandler} />
      <StyledLayoutMain>{children}</StyledLayoutMain>
      <Footer />
    </StyledLayout>
  );
};

export default Layout;
