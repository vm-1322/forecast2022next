import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import Match from './Match';
import { useUserRoles } from 'hooks';
import { DBAction, IForecast, IMatch, IMatchesProps, MatchStatus } from 'types';
import {
  StyledMatches,
  StyledMatchItem,
  StyledMatchItemForecast,
  StyledMatchesList,
} from './MatchesStyled';

const Matches: React.FC<IMatchesProps> = ({ forecast = false, className }) => {
  const [matches, setMatches] = useState<Array<IMatch>>([]);
  const [forecasts, setForecasts] = useState<Array<IForecast>>([]);
  const { data: session, status } = useSession();
  const router = useRouter();
  const listRoles = useUserRoles();

  const retrieveData = async () => {
    const response = await fetch('/api/matches', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ forecast: forecast }),
    });

    const data = await response.json();
    const listMatches = data.data;

    setMatches(listMatches);

    if (forecast) {
      const response = await fetch('/api/forecasts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: DBAction.Read }),
      });

      const data = await response.json();
      const listForecasts = data.data;

      setForecasts(listForecasts);
    }
  };

  const makeForecast = (curMatch: IMatch) => {
    router.push(
      {
        pathname: '/forecast',
        query: {
          match: JSON.stringify(curMatch),
        },
      },
      '/forecast'
    );
  };

  const renderMatchItem = (match: IMatch) => {
    const isViewForecast =
      forecast &&
      status === 'authenticated' &&
      listRoles.length &&
      match.matchStatus === MatchStatus.Forecast &&
      Date.now() < match.date;

    let isForecast = false;

    if (isViewForecast) {
      const findedForecast = forecasts.find(
        (curForecast) =>
          curForecast.matchDetails._id === match._id &&
          curForecast.matchDetails.user.email === session.user.email
      );

      if (findedForecast) isForecast = true;
    }

    return (
      <StyledMatchItem>
        <Match
          match={match}
          matchStatus={
            isViewForecast ? (
              <StyledMatchItemForecast>
                <input
                  type='button'
                  value={isForecast ? 'Edit' : 'Bet'}
                  onClick={(event: React.FormEvent) => {
                    event.preventDefault();
                    makeForecast(match);
                  }}
                  className={isForecast ? 'edit' : ''}
                />
              </StyledMatchItemForecast>
            ) : null
          }
        />
      </StyledMatchItem>
    );
  };

  useEffect(() => {
    retrieveData();
  }, []);

  return (
    <StyledMatches>
      <StyledMatchesList>{matches.map(renderMatchItem)}</StyledMatchesList>
    </StyledMatches>
  );
};

export default Matches;
