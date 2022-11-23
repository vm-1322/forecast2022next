import { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

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
} from './MatchesStyled';
import { IMatchesProps, IMatch, MatchStatus, DateTime } from '../../types';
import { FormatDateTime } from '../../utility/common';

const Matches: React.FC<IMatchesProps> = ({ forecast = false, className }) => {
  const [matches, setMatches] = useState<Array<IMatch>>([]);
  const { data: session, status } = useSession();
  const router = useRouter();

  const retrieveMatches = async () => {
    const response = await fetch('/api/matches', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ forecast: forecast }),
    });

    const listMatches = await response.json();
    setMatches(listMatches);
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
    const matchStatus = match.matchStatus;
    const isForecast =
      forecast &&
      status === 'authenticated' &&
      match.matchStatus === MatchStatus.Forecast;
    const isNotForecast = match.matchStatus !== MatchStatus.Forecast;

    return (
      <Fragment>
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
          {isForecast ? (
            <StyledMatchItemForecast>
              <input
                type='button'
                value='Bet'
                onClick={(event: React.FormEvent) => {
                  event.preventDefault();
                  makeForecast(match);
                }}
              />
            </StyledMatchItemForecast>
          ) : isNotForecast ? (
            <StyledMatchItemStatus>{matchStatus}</StyledMatchItemStatus>
          ) : null}
        </StyledMatchItem>
      </Fragment>
    );
  };

  useEffect(() => {
    retrieveMatches();
  }, []);

  return (
    <StyledMatches>
      <StyledMatchesList>{matches.map(renderMatchItem)}</StyledMatchesList>
    </StyledMatches>
  );
};

export default Matches;
