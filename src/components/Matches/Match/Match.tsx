import { IMatchProps, MatchKind, MatchStatus, DateTime } from 'types';
import { FormatDateTime } from 'utility/common';
import {
  StyledMatchItem,
  StyledMatchItemDateTime,
  StyledMatchItemDate,
  StyledMatchItemTime,
  StyledMatchItemTeams,
  StyledMatchItemTeam,
  StyledMatchItemTeamFlag,
  StyledMatchItemTeamName,
  StyledMatchItemResult,
  StyledMatchItemResultScore,
  StyledMatchItemStatus,
} from './MatchStyled';

const Match: React.FC<IMatchProps> = ({
  match,
  matchKind = MatchKind.List,
  matchStatus,
  className,
}) => {
  const win1: boolean = Number(match.result1) > Number(match.result2);
  const win2: boolean = Number(match.result1) < Number(match.result2);

  return (
    <StyledMatchItem key={match._id}>
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
            <img
              src={match.matchDetails.team1.flag}
              alt={match.matchDetails.team1.code}
            />
          </StyledMatchItemTeamFlag>
          <StyledMatchItemTeamName isWin={win1}>
            {match.matchDetails.team1.name}
          </StyledMatchItemTeamName>
        </StyledMatchItemTeam>
        <StyledMatchItemTeam>
          <StyledMatchItemTeamFlag>
            <img
              src={match.matchDetails.team2.flag}
              alt={match.matchDetails.team2.code}
            />
          </StyledMatchItemTeamFlag>
          <StyledMatchItemTeamName isWin={win2}>
            {match.matchDetails.team2.name}
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
      <StyledMatchItemStatus matchStatus={!matchStatus}>
        {matchStatus
          ? matchStatus
          : match.matchStatus !== MatchStatus.Forecast
          ? match.matchStatus
          : null}
      </StyledMatchItemStatus>
    </StyledMatchItem>
  );
};

export default Match;
