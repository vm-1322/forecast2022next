import { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import {
  StyledMatches,
  StyledMatchItem,
  StyledMatchItemDateTime,
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

import { IMatchesProps, IMatch, MatchStatus } from '../../types';

const Matches: React.FC<IMatchesProps> = ({ forecast = false, className }) => {
  const [matches, setMatches] = useState<Array<IMatch>>([]);
  const { data: session, status } = useSession();
  const router = useRouter();

  const FormatDateTime = (moment: number) => {
    const date = new Date(moment).toString();

    return `${date.substring(8, 10)} ${date.substring(4, 7)},  ${date.substring(
      15,
      21
    )}`;
  };

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

  const renderMatchItem = (match: IMatch) => {
    const win1: boolean = Number(match.result1) > Number(match.result2);
    const win2: boolean = Number(match.result1) < Number(match.result2);
    const matchStatus = match.matchStatus;
    const isForecast =
      forecast &&
      status === 'authenticated' &&
      match.matchStatus === MatchStatus.Forecast;
    const isNotForecast = match.matchStatus !== MatchStatus.Forecast;

    const makeForecast = (curMatch: IMatch) => {
      console.log('makeForecast');
      console.log(curMatch);
      router.replace('/forecast');
    };

    return (
      <Fragment>
        <StyledMatchItem key={match._id} href={match.linkToBet}>
          <StyledMatchItemDateTime>
            {FormatDateTime(match.date)}
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
                value='Make forecast'
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
