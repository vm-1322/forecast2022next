import { Fragment } from 'react';

import Layout from '../components/Layout';

const ForecastChildren: React.FC = () => {
  return <div>Forecast Page</div>;
};

const ForecastPage: React.FC = () => {
  return (
    <Fragment>
      <Layout>
        <ForecastChildren />
      </Layout>
    </Fragment>
  );
};

export default ForecastPage;
