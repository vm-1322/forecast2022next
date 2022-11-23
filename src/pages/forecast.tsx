import { useRouter } from 'next/router';

import Layout from '../components/Layout';
import Forecast from '../components/Forecast';

const ForecastPage: React.FC = () => {
  const router = useRouter();

  const queryMatch = (router.query.match as string) || '{}';
  const curMatch = JSON.parse(queryMatch);

  return (
    <Layout>
      <Forecast match={curMatch} />
    </Layout>
  );
};

export default ForecastPage;
