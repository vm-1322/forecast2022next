import React from 'react';
import Head from 'next/head';

import Layout from '../components/Layout';

const Home: React.FC = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Forecast 2022</title>
      </Head>
      <Layout />
    </React.Fragment>
  );
};

export default Home;
