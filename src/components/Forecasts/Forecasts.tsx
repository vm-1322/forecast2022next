import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

import {
  StyledForecasts,
  StyledForecastsList,
  StyledForecastItemDateTime,
  StyledForecastItemDate,
  StyledForecastItemResult,
  StyledForecastItemResultScore,
  StyledForecastItemMatchDateTime,
  StyledForecastItemMatchDate,
  StyledForecastItemMatchTime,
  StyledForecastItemMatchTeams,
  StyledForecastItemMatchTeam,
  StyledForecastItemMatchTeamFlag,
  StyledForecastItemMatchTeamName,
  StyledForecastItemMatchResult,
  StyledForecastItemMatchResultScore,
  StyledForecastItemMatchStatus,
  StyledForecastItemUserPoints,
  StyledForecastItemUser,
  StyledForecastItemPoints,
  StyledForecastItemTime,
  StyledForecastItem,
} from './ForecastsStyled';
import { IForecastsProps, IForecast, DateTime } from '../../types';
import { FormatDateTime } from '../../utility/common';

const Forecasts: React.FC<IForecastsProps> = ({ className }) => {
  const [forecasts, setForecasts] = useState<Array<IForecast>>([]);
  const { data: session, status } = useSession();

  const retrieveForecasts = async () => {
    const response = await fetch('/api/forecasts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const listForecasts = await response.json();
    setForecasts(listForecasts);
  };

  const renderForecastItem = (forecast: IForecast) => {
    const win1: boolean =
      Number(forecast.matchDetails.result1) >
      Number(forecast.matchDetails.result2);
    const win2: boolean =
      Number(forecast.matchDetails.result1) <
      Number(forecast.matchDetails.result2);
    const matchStatus = forecast.matchDetails.matchStatus;

    const getForecastDate = (curForecast: IForecast): number => {
      curForecast.history.sort((a, b) => b.date - a.date);

      return curForecast.history[0].date;
    };

    return (
      <StyledForecastItem key={forecast._id}>
        <StyledForecastItemDateTime>
          <StyledForecastItemDate>
            {FormatDateTime(getForecastDate(forecast), DateTime.Date)}
          </StyledForecastItemDate>
          <StyledForecastItemTime>
            {FormatDateTime(getForecastDate(forecast), DateTime.Time)}
          </StyledForecastItemTime>
        </StyledForecastItemDateTime>
        <StyledForecastItemResult>
          <StyledForecastItemResultScore>
            {forecast.goal1}
          </StyledForecastItemResultScore>
          <StyledForecastItemResultScore>
            {forecast.goal2}
          </StyledForecastItemResultScore>
        </StyledForecastItemResult>
        <StyledForecastItemUserPoints>
          <StyledForecastItemUser>
            {JSON.parse(JSON.stringify(forecast.user)).username}
          </StyledForecastItemUser>
          <StyledForecastItemPoints>{forecast.result}</StyledForecastItemPoints>
        </StyledForecastItemUserPoints>
        <StyledForecastItemMatchDateTime>
          <StyledForecastItemMatchDate>
            {FormatDateTime(forecast.matchDetails.date, DateTime.Date)}
          </StyledForecastItemMatchDate>
          <StyledForecastItemMatchTime>
            {FormatDateTime(forecast.matchDetails.date, DateTime.Time)}
          </StyledForecastItemMatchTime>
        </StyledForecastItemMatchDateTime>
        <StyledForecastItemMatchTeams>
          <StyledForecastItemMatchTeam>
            <StyledForecastItemMatchTeamFlag>
              <img
                src={forecast.matchDetails.team1.flag}
                alt={forecast.matchDetails.team1.code}
              />
            </StyledForecastItemMatchTeamFlag>
            <StyledForecastItemMatchTeamName isWin={win1}>
              {forecast.matchDetails.team1.name}
            </StyledForecastItemMatchTeamName>
          </StyledForecastItemMatchTeam>
          <StyledForecastItemMatchTeam>
            <StyledForecastItemMatchTeamFlag>
              <img
                src={forecast.matchDetails.team2.flag}
                alt={forecast.matchDetails.team2.code}
              />
            </StyledForecastItemMatchTeamFlag>
            <StyledForecastItemMatchTeamName isWin={win2}>
              {forecast.matchDetails.team2.name}
            </StyledForecastItemMatchTeamName>
          </StyledForecastItemMatchTeam>
        </StyledForecastItemMatchTeams>
        <StyledForecastItemMatchResult>
          <StyledForecastItemMatchResultScore isWin={win1}>
            {forecast.matchDetails.result1}
          </StyledForecastItemMatchResultScore>
          <StyledForecastItemMatchResultScore isWin={win2}>
            {forecast.matchDetails.result2}
          </StyledForecastItemMatchResultScore>
        </StyledForecastItemMatchResult>
        <StyledForecastItemMatchStatus>
          {forecast.matchDetails.matchStatus}
        </StyledForecastItemMatchStatus>
      </StyledForecastItem>
    );
  };

  console.dir(forecasts);

  useEffect(() => {
    retrieveForecasts();
  }, []);

  return (
    <StyledForecasts>
      <StyledForecastsList>
        {forecasts.map(renderForecastItem)}
      </StyledForecastsList>
    </StyledForecasts>
  );
};

export default Forecasts;
