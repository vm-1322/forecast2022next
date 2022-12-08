import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

import { DateTime, DBAction, IForecastsProps, IForecast } from 'types';
import { FormatDateTime } from 'utility/common';
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

const Forecasts: React.FC<IForecastsProps> = ({ className }) => {
  const [forecasts, setForecasts] = useState<Array<IForecast>>([]);
  const { data: session, status } = useSession();

  const retrieveForecasts = async () => {
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
  };

  const getForecastDate = (curForecast: IForecast): number => {
    curForecast.history.sort((a, b) => b.date - a.date);

    return curForecast.history[0].date;
  };

  const renderForecastItem = (forecast: IForecast) => {
    if (
      forecast.matchDetails.date > Date.now() &&
      forecast.matchDetails.user.email !== session.user.email
    )
      return null;

    const forecastDate = getForecastDate(forecast);

    const win1: boolean =
      Number(forecast.matchDetails.result1) >
      Number(forecast.matchDetails.result2);
    const win2: boolean =
      Number(forecast.matchDetails.result1) <
      Number(forecast.matchDetails.result2);

    return (
      <StyledForecastItem key={forecast.matchDetails._id}>
        <StyledForecastItemDateTime>
          <StyledForecastItemDate>
            {FormatDateTime(forecastDate, DateTime.Date)}
          </StyledForecastItemDate>
          <StyledForecastItemTime>
            {FormatDateTime(forecastDate, DateTime.Time)}
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
            {forecast.matchDetails.user.username}
          </StyledForecastItemUser>
          <StyledForecastItemPoints>
            {forecast.result ? `(${forecast.result})` : null}
          </StyledForecastItemPoints>
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
