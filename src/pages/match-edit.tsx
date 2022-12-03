import { useRouter } from 'next/router';

import Layout from 'components/Layout';
import MatchEdit from 'components/Matches/MatchEdit';

const MatchEditPage: React.FC = () => {
  const router = useRouter();

  const queryMatch = (router.query.match as string) || '{}';
  const curMatch = JSON.parse(queryMatch);
  const queryCreate = (router.query.create as string) || false;

  return (
    <Layout>
      <MatchEdit match={curMatch} create={queryCreate as boolean} />
    </Layout>
  );
};

export default MatchEditPage;
