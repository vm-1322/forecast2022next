import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

import { useUserRoles } from '../../hooks';
import {
  StyledMatches,
  StyledMatchItem,
  StyledMatchItemDateTime,
  StyledMatchItemDate,
  StyledMatchItemTime,
  StyledMatchItemForecast,
  StyledMatchItemResult,
  StyledMatchItemResultScore,
  StyledMatchItemStatus,
  StyledMatchItemTeam,
  StyledMatchItemTeamFlag,
  StyledMatchItemTeamName,
  StyledMatchItemTeams,
  StyledMatchesList,
  StyledMatchesStandings,
} from './MatchesStyled';
import {
  IMatchesProps,
  IMatch,
  IForecast,
  MatchStatus,
  DateTime,
} from '../../types';
import { FormatDateTime } from '../../utility/common';

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

    const listMatches = await response.json();

    setMatches(listMatches);

    if (forecast) {
      const response = await fetch('/api/forecasts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const listForecasts = await response.json();

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
    const win1: boolean = Number(match.result1) > Number(match.result2);
    const win2: boolean = Number(match.result1) < Number(match.result2);

    const isNotForecast = match.matchStatus !== MatchStatus.Forecast;
    const isViewForecast =
      forecast &&
      status === 'authenticated' &&
      listRoles.length &&
      match.matchStatus === MatchStatus.Forecast &&
      Date.now() < match.date;

    let isForecast = false;

    if (isViewForecast) {
      const findedForecast = forecasts.find(
        (curForecast) => curForecast.matchDetails._id === match._id
      );

      if (findedForecast) {
        if (
          session.user.email ===
          JSON.parse(JSON.stringify(findedForecast.user)).email
        )
          isForecast = true;
      }
    }

    return (
      <StyledMatchItem key={match._id} href={match.linkToBet}>
        <StyledMatchItemDateTime>
          <StyledMatchItemDate>
            {FormatDateTime(match.date, DateTime.Date)}
          </StyledMatchItemDate>
          <StyledMatchItemTime>
            {FormatDateTime(match.date, DateTime.Time)}
          </StyledMatchItemTime>
        </StyledMatchItemDateTime>
        <StyledMatchItemTeams>
          <StyledMatchItemTeam>
            <StyledMatchItemTeamFlag>
              <img src={match.team1.flag} alt={match.team1.code} />
            </StyledMatchItemTeamFlag>
            <StyledMatchItemTeamName isWin={win1}>
              {match.team1.name}
            </StyledMatchItemTeamName>
          </StyledMatchItemTeam>
          <StyledMatchItemTeam>
            <StyledMatchItemTeamFlag>
              <img src={match.team2.flag} alt={match.team2.code} />
            </StyledMatchItemTeamFlag>
            <StyledMatchItemTeamName isWin={win2}>
              {match.team2.name}
            </StyledMatchItemTeamName>
          </StyledMatchItemTeam>
        </StyledMatchItemTeams>
        <StyledMatchItemResult>
          <StyledMatchItemResultScore isWin={win1}>
            {match.result1}
          </StyledMatchItemResultScore>
          <StyledMatchItemResultScore isWin={win2}>
            {match.result2}
          </StyledMatchItemResultScore>
        </StyledMatchItemResult>
        {isNotForecast ? (
          <StyledMatchItemStatus>{match.matchStatus}</StyledMatchItemStatus>
        ) : isViewForecast ? (
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
        ) : null}
      </StyledMatchItem>
    );
  };

  useEffect(() => {
    retrieveData();
  }, []);

  return (
    <StyledMatches>
      <StyledMatchesList>{matches.map(renderMatchItem)}</StyledMatchesList>
      <StyledMatchesStandings>
        <Link
          href={
            'https://www.flashscore.com/standings/fRgR6gtF/zkyDYRLU/#/2/8/zkyDYRLU/table'
          }
          target={'_blank'}
        >
          Standings
        </Link>
      </StyledMatchesStandings>
    </StyledMatches>
  );
};

export default Matches;
