import { useEffect, useState } from 'react';

import {
  StyledMatches,
  StyledMatchItem,
  StyledMatchItemDateTime,
  StyledMatchItemTeam,
  StyledMatchItemTeamFlag,
  StyledMatchItemTeamName,
  StyledMatchItemTeams,
  StyledMatchesList,
} from './MatchesStyled';

import { IMatchesProps, IMatch } from '../../types';

const Matches: React.FC<IMatchesProps> = ({ className }) => {
  const [matches, setMatches] = useState<Array<IMatch>>([]);

  const FormatDateTime = (moment: number) => {
    const date = new Date(moment).toString();

    return `${date.substring(8, 10)} ${date.substring(4, 7)},  ${date.substring(
      15,
      21
    )}`;
  };

  const retrieveMatches = async () => {
    const response = await fetch('/api/matches', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const listMatches = await response.json();
    setMatches(listMatches);
  };

  const renderMatchItem = (match: IMatch) => {
    return (
      <StyledMatchItem key={match._id} href={match.linkToBet}>
        <StyledMatchItemDateTime>
          {FormatDateTime(match.date)}
        </StyledMatchItemDateTime>
        <StyledMatchItemTeams>
          <StyledMatchItemTeam>
            <StyledMatchItemTeamFlag>
              <img src={match.team1.flag} alt={match.team1.code} />
            </StyledMatchItemTeamFlag>
            <StyledMatchItemTeamName>
              {match.team1.name}
            </StyledMatchItemTeamName>
          </StyledMatchItemTeam>
          <StyledMatchItemTeam>
            <StyledMatchItemTeamFlag>
              <img src={match.team2.flag} alt={match.team2.code} />
            </StyledMatchItemTeamFlag>
            <StyledMatchItemTeamName>
              {match.team2.name}
            </StyledMatchItemTeamName>
          </StyledMatchItemTeam>
        </StyledMatchItemTeams>
      </StyledMatchItem>
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
