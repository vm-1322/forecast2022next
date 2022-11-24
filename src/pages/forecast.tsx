import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import Layout from '../components/Layout';
import Forecast from '../components/Forecast';

const ForecastPage: React.FC = () => {
  const [curForecast, setCurForecast] = useState();
  const router = useRouter();
  const { data: session, status } = useSession();

  const queryMatch = (router.query.match as string) || '{}';
  const curMatch = JSON.parse(queryMatch);

  useEffect(() => {
    fetch('/api/forecast', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        matchId: curMatch._id,
        userEmail: session.user.email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.dir(data);
        setCurForecast(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <Layout>
      <Forecast match={curMatch} forecast={curForecast} />
    </Layout>
  );
};

export default ForecastPage;
