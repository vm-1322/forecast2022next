import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { DBAction, IForecastProps, ITeam } from 'types';
import { FormatDateTime, getSage } from 'utility/common';
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

const Forecast: React.FC<IForecastProps> = ({ match, className }) => {
  if (JSON.stringify(match) === '{}') return null;

  const [forecastAction, setForecastAction] = useState(DBAction.Create);
  const [goal1, setGoal1] = useState(null);
  const [goal2, setGoal2] = useState(null);
  const [forecastIsCorrect, setForecastIsCorrect] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  const betHandler = async () => {
    await fetch('/api/forecast', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: forecastAction,
        matchId: match._id,
        userEmail: session.user.email,
        goal1: goal1,
        goal2: goal2,
      }),
    });

    router.replace('/forecasts');
  };

  const retriveForecast = async () => {
    const response = await fetch('/api/forecast', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: DBAction.Read,
        matchId: match._id,
        userEmail: session.user.email,
      }),
    });

    const curForecast = await response.json();

    if (JSON.stringify(curForecast) !== '{}') setForecastAction(DBAction.Add);

    setGoal1(curForecast.goal1);
    setGoal2(curForecast.goal2);
  };

  useEffect(() => {
    retriveForecast();
  }, []);

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
          {renderTeamItem(match.matchDetails.team1)}
          {renderTeamItem(match.matchDetails.team2)}
        </StyledForecastTeams>
        <StyledForecastResult>
          <StyledForecastResultGoal>
            <input
              type='Number'
              min={0}
              value={goal1}
              required
              onChange={(e) => setGoal1(e.target.value)}
            />
          </StyledForecastResultGoal>
          <StyledForecastResultGoal>
            <input
              type='Number'
              min={0}
              value={goal2}
              required
              onChange={(e) => setGoal2(e.target.value)}
            />
          </StyledForecastResultGoal>
        </StyledForecastResult>
        <StyledForecastFormCheckBox>
          <input
            type='checkbox'
            onClick={() => {
              setForecastIsCorrect((prevState) => !prevState);
            }}
          />
          Forecast is correct
        </StyledForecastFormCheckBox>
        <input type='submit' value='Make Bet' disabled={!forecastIsCorrect} />
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
