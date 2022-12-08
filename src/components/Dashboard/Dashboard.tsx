import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Match from 'components/Matches/Match';
import ScoreTable from 'components/ScoreTable';
import { DBAction, IDashboardProps, IMatch, MatchStatus } from 'types';
import {
  StyledDashboard,
  StyledDashboardMatchesList,
  StyledDashboardMatchItem,
  StyledDashboardMatchItemStatusEdit,
  StyledDashboardMatchItemStatus,
  StyledDashboardMatchItemEdit,
  StyledDashboardCreateMatch,
  StyledDashboardCalculateScoreTable,
  StyledDashboardScoreTableList,
} from './DashboardStyled';

const Dashboard: React.FC<IDashboardProps> = ({ className }) => {
  const [matches, setMatches] = useState<Array<IMatch>>([]);
  const router = useRouter();

  const calculateScoreTable = async () => {
    const response = await fetch('/api/forecasts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action: DBAction.Read }),
    });

    const data = await response.json();
    const listForecasts = data.data;
    const forecastsToUpdate = [];
    const scoreTableObj = {};
    const scoreTable = [];

    listForecasts.forEach((curForecast) => {
      let curUser = scoreTableObj[curForecast.matchDetails.user.email];

      if (!curUser)
        curUser = {
          user: curForecast.user,
          email: curForecast.matchDetails.user.email,
          username: curForecast.matchDetails.user.username,
          dateForecast: 0,
          points: 0,
          numberForecasts: 0,
          effectiveForecasts: 0,
          expectedForecasts: 0,
          canceledForecasts: 0,
        };

      curUser.numberForecasts += 1;

      if (curForecast.matchDetails.matchStatus === MatchStatus.Forecast) {
        curUser.expectedForecasts += 1;
      } else if (
        curForecast.matchDetails.matchStatus === MatchStatus.Canceled
      ) {
        curUser.canceledForecasts += 1;
      } else if (
        curForecast.matchDetails.matchStatus === MatchStatus.Finished
      ) {
        const lastForecast = curForecast.history.sort(
          (a, b) => b.date - a.date
        )[0];

        let curResult = curForecast.result;

        if (!curResult) {
          if (
            Number(curForecast.matchDetails.result1) ===
              Number(lastForecast.goal1) &&
            Number(curForecast.matchDetails.result2) ===
              Number(lastForecast.goal2)
          ) {
            curResult = '5';
          } else if (
            Number(curForecast.matchDetails.result1) -
              Number(curForecast.matchDetails.result2) ===
            Number(lastForecast.goal1) - Number(lastForecast.goal2)
          ) {
            curResult = '3';
          } else if (
            (Number(curForecast.matchDetails.result1) -
              Number(curForecast.matchDetails.result2) >
              0 &&
              Number(lastForecast.goal1) - Number(lastForecast.goal2) > 0) ||
            (Number(curForecast.matchDetails.result1) -
              Number(curForecast.matchDetails.result2) <
              0 &&
              Number(lastForecast.goal1) - Number(lastForecast.goal2) < 0)
          ) {
            curResult = '2';
          } else {
            curResult = '0';
          }

          forecastsToUpdate.push({
            forecast: { matchId: curForecast.match, userId: curForecast.user },
            result: curResult,
          });
        }

        if (Number(curResult)) {
          curUser.effectiveForecasts += 1;
          curUser.points += Number(curResult);

          if (lastForecast.date > curUser.dateForecast)
            curUser.dateForecast = lastForecast.date;
        }
      }

      scoreTableObj[curForecast.matchDetails.user.email] = curUser;
    });

    for (const userData in scoreTableObj) {
      scoreTable.push(scoreTableObj[userData]);
    }

    if (forecastsToUpdate.length) {
      try {
        await fetch('/api/forecasts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: DBAction.Update,
            forecastsToUpdate: forecastsToUpdate,
          }),
        });
      } catch (error) {
        console.log(error);
      }
    }

    if (scoreTable.length) {
      try {
        const response = await fetch('/api/scoretable', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: DBAction.Update,
            scoreTable: scoreTable,
          }),
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const createMatch = () => {
    router.push(
      {
        pathname: '/match-edit',
        query: {
          create: JSON.stringify(true),
        },
      },
      '/match-edit'
    );
  };

  const editMatch = (curMatch: IMatch) => {
    router.push(
      {
        pathname: '/match-edit',
        query: {
          match: JSON.stringify(curMatch),
        },
      },
      '/match-edit'
    );
  };

  const retriveMatches = async () => {
    const response = await fetch('/api/matches', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    const listMatches = data.data;

    setMatches(listMatches);
  };

  useEffect(() => {
    retriveMatches();
  }, []);

  const renderMatchItem = (match: IMatch) => {
    return (
      <StyledDashboardMatchItem>
        <Match
          match={match}
          matchStatus={
            <StyledDashboardMatchItemStatusEdit>
              <StyledDashboardMatchItemStatus>
                {match.matchStatus}
              </StyledDashboardMatchItemStatus>
              <StyledDashboardMatchItemEdit>
                <input
                  type='button'
                  value='Edit'
                  onClick={(event: React.FormEvent) => {
                    event.preventDefault();
                    editMatch(match);
                  }}
                />
              </StyledDashboardMatchItemEdit>
            </StyledDashboardMatchItemStatusEdit>
          }
        />
      </StyledDashboardMatchItem>
    );
  };

  return (
    <StyledDashboard>
      <StyledDashboardScoreTableList>
        <StyledDashboardCalculateScoreTable>
          <input
            type='button'
            value='Calculate ScoreTable'
            onClick={(event: React.FormEvent) => {
              event.preventDefault();
              calculateScoreTable();
            }}
          />
        </StyledDashboardCalculateScoreTable>
        <ScoreTable />
      </StyledDashboardScoreTableList>
      <StyledDashboardMatchesList>
        {matches.map(renderMatchItem)}
        <StyledDashboardCreateMatch>
          <input
            type='button'
            value='Create Match'
            onClick={(event: React.FormEvent) => {
              event.preventDefault();
              createMatch();
            }}
          />
        </StyledDashboardCreateMatch>
      </StyledDashboardMatchesList>
    </StyledDashboard>
  );
};

export default Dashboard;
