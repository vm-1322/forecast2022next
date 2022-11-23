import Link from 'next/link';

import {
  StyledForecast,
  StyledForecastDateStage,
  StyledForecastDate,
  StyledForecastStage,
  StyledForecastResult,
  StyledForecastResultGoal,
  StyledForecastTeams,
  StyledForecastTeamItem,
  StyledForecastTeamItemFlag,
  StyledForecastTeamItemName,
  StyledForecastTitle,
  StyledForecastLinkToBet,
} from './ForecastStyled';
import { IForecastProps, ITeam } from '../../types';
import { FormatDateTime, getSage } from '../../utility/common';

const Forecast: React.FC<IForecastProps> = ({ match, className }) => {
  if (JSON.stringify(match) === '{}') return null;

  const betHandler = () => {
    console.log(betHandler);
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
            <input type='Number' min={0} required />
          </StyledForecastResultGoal>
          <StyledForecastResultGoal>
            <input type='Number' min={0} required />
          </StyledForecastResultGoal>
        </StyledForecastResult>
        <input type='submit' value='Make Bet' />
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
