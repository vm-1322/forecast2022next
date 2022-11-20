import { Fragment } from 'react';

import Layout from '../components/Layout';
import Matches from '../components/Matches';

const MatchesPage: React.FC = () => {
  return (
    <Fragment>
      <Layout>
        <Matches />
      </Layout>
    </Fragment>
  );
};

export default MatchesPage;
