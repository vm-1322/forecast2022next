import { Fragment } from 'react';

import Layout from '../components/Layout';

const ForecastsChildren: React.FC = () => {
  return <div>Forecasts Page</div>;
};

const ForecastsPage: React.FC = () => {
  return (
    <Fragment>
      <Layout>
        <ForecastsChildren />
      </Layout>
    </Fragment>
  );
};

export default ForecastsPage;
