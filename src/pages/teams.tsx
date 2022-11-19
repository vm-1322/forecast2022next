import { Fragment } from 'react';

import Layout from '../components/Layout';
import Teams from '../components/Teams';

const TeamsPage: React.FC = () => {
  return (
    <Fragment>
      <Layout>
        <Teams />
      </Layout>
    </Fragment>
  );
};

export default TeamsPage;
