import React, { useState } from 'react';
import Head from 'next/head';
import { useSession } from 'next-auth/react';

import Header from '../Header';
import Navigation from '../Navigation';
import Footer from '../Footer';
import { useUserRoles } from '../../hooks';
import { StyledLayout, StyledLayoutMain } from './LayoutStyled';
import { ILayoutProps, INavigationItem } from '../../types';

const Layout: React.FC<ILayoutProps> = ({ children, className }) => {
  const items: INavigationItem[] = [
    { link: { label: 'Home', value: '/' } },
    { link: { label: 'Matches', value: '/matches' } },
    { link: { label: 'Teams', value: '/teams' } },
  ];

  const { data: session, status } = useSession();
  const listRoles = useUserRoles();

  if (status === 'authenticated') {
    if (listRoles.length)
      items.splice(1, 0, { link: { label: 'Forecasts', value: '/forecasts' } });
  }

  return (
    <StyledLayout className={className}>
      <Head>
        <title>Forecast 2022</title>
      </Head>
      <Header />
      <Navigation items={items} />
      <StyledLayoutMain>{children}</StyledLayoutMain>
      <Footer />
    </StyledLayout>
  );
};

export default Layout;
