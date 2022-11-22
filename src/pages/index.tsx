import { Fragment } from 'react';

import Layout from '../components/Layout';
import HomePage from '../components/HomePage';

const Home: React.FC = () => {
  return (
    <Fragment>
      <Layout>
        <HomePage />
      </Layout>
    </Fragment>
  );
};

export default Home;
