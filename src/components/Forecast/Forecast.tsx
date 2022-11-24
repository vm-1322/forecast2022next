import { useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import {
  StyledForecast,
  StyledForecastDateStage,
  StyledForecastDate,
  StyledForecastStage,
  StyledForecastResult,
  StyledForecastResultGoal,
  StyledForecastFormCheckBox,
  StyledForecastTeams,
  StyledForecastTeamItem,
  StyledForecastTeamItemFlag,
  StyledForecastTeamItemName,
  StyledForecastTitle,
  StyledForecastLinkToBet,
} from './ForecastStyled';
import {
  IForecastProps,
  IForecast,
  IMatch,
  ITeam,
  ForecastAction,
} from '../../types';
import { FormatDateTime, getSage } from '../../utility/common';

const Forecast: React.FC<IForecastProps> = ({ match, forecast, className }) => {
  if (JSON.stringify(match) === '{}') return null;

  const [forecastCorrect, setForecastCorrect] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  const goal1InputRef = useRef<HTMLInputElement>();
  const goal2InputRef = useRef<HTMLInputElement>();

  // console.log('forecast', forecast);

  // if (JSON.stringify(forecast) !== '{}') {
  //   match = {
  //     ...match,
  //     result1: '0',
  //     result2: '1',
  //   };
  // }

  const betHandler = async () => {
    const forecastAction =
      JSON.stringify(forecast) === '{}'
        ? ForecastAction.Create
        : ForecastAction.Write;

    const response = await fetch('/api/forecast', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        forecastAction: forecastAction,
        matchId: match._id,
        userEmail: session.user.email,
        goal1: goal1InputRef.current.value,
        goal2: goal2InputRef.current.value,
      }),
    });

    router.replace('/forecasts');
  };

  const renderTeamItem = (team: ITeam) => {
    return (
      <StyledForecastTeamItem key={team._id}>
        <StyledForecastTeamItemFlag href={team.link} target='_blank'>
          <img src={team.flag} alt={team.code} />
        </StyledForecastTeamItemFlag>
        <StyledForecastTeamItemName>{team.name}</StyledForecastTeamItemName>
      </StyledForecastTeamItem>
    );
  };

  return (
    <StyledForecast>
      <form
        onSubmit={(event: React.FormEvent) => {
          event.preventDefault();
          betHandler();
        }}
      >
        <StyledForecastTitle>Forecast</StyledForecastTitle>
        <StyledForecastDateStage>
          <StyledForecastDate>{FormatDateTime(match.date)}</StyledForecastDate>
          <StyledForecastStage>{getSage(match)}</StyledForecastStage>
        </StyledForecastDateStage>
        <StyledForecastTeams>
          {renderTeamItem(match.team1)}
          {renderTeamItem(match.team2)}
        </StyledForecastTeams>
        <StyledForecastResult>
          <StyledForecastResultGoal>
            <input type='Number' min={0} required ref={goal1InputRef} />
          </StyledForecastResultGoal>
          <StyledForecastResultGoal>
            <input type='Number' min={0} required ref={goal2InputRef} />
          </StyledForecastResultGoal>
        </StyledForecastResult>
        <StyledForecastFormCheckBox>
          <input
            type='checkbox'
            onClick={() => {
              setForecastCorrect((prevState) => !prevState);
            }}
          />
          Forecast is correct
        </StyledForecastFormCheckBox>
        <input type='submit' value='Make Bet' disabled={!forecastCorrect} />
        <StyledForecastLinkToBet>
          <Link href={match.linkToBet} target='_blank'>
            Go to bet site
          </Link>
        </StyledForecastLinkToBet>
      </form>
    </StyledForecast>
  );
};

export default Forecast;
