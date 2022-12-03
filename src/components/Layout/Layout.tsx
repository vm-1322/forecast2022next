import React from 'react';
import Head from 'next/head';
import { useSession } from 'next-auth/react';

import Header from 'components/Header';
import Navigation from 'components/Navigation';
import Footer from 'components/Footer';
import { ILayoutProps, INavigationItem } from 'types';
import { useUserRoles } from 'hooks';
import { StyledLayout, StyledLayoutMain } from './LayoutStyled';

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

    if (listRoles.find((item: string) => item === 'admin'))
      items.push({ link: { label: 'Dashboard', value: '/dashboard' } });
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
