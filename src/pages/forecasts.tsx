import Layout from '../components/Layout';

const ForecastsChildren: React.FC = () => {
  return <div>Forecasts Page</div>;
};

const ForecastsPage: React.FC = () => {
  return (
    <Layout>
      <ForecastsChildren />
    </Layout>
  );
};

export default ForecastsPage;
