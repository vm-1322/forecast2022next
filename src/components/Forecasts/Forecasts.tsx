import { Fragment, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

import {
  StyledForecasts,
  StyledForecastsList,
  StyledForecastItemDateTime,
  StyledForecastItemDate,
  StyledForecastItemResult,
  StyledForecastItemResultScore,
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
    const getForecastDate = (curForecast: IForecast): number => {
      curForecast.history.sort((a, b) => b.date - a.date);

      return curForecast.history[0].date;
    };

    return (
      <Fragment>
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
          <StyledForecastItemUser>
            {JSON.parse(JSON.stringify(forecast.user)).username}
          </StyledForecastItemUser>
          <StyledForecastItemPoints>{forecast.result}</StyledForecastItemPoints>
        </StyledForecastItem>
        {/* <StyledMatchItem key={match._id} href={match.linkToBet}>
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
        </StyledMatchItem> */}
      </Fragment>
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
