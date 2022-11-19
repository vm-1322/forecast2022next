import { Fragment } from 'react';

import Layout from '../components/Layout';

const HomeChildren: React.FC = () => {
  return <div>Home Page</div>;
};

const HomePage: React.FC = () => {
  return (
    <Fragment>
      <Layout>
        <HomeChildren />
      </Layout>
    </Fragment>
  );
};

export default HomePage;
