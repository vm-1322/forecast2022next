import { useEffect, useState } from 'react';

import { ITeamsProps, ITeam } from 'types';
import {
  StyledTeams,
  StyledTeamItem,
  StyledTeamItemFlag,
  StyledTeamItemName,
  StyledTeamsList,
  StyledTeamsTitle,
} from './TeamsStyled';

const Teams: React.FC<ITeamsProps> = ({ className }) => {
  const [teams, setTeams] = useState<Array<ITeam>>([]);

  const retrieveTeams = async () => {
    const response = await fetch('/api/teams', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    setTeams(data);
  };

  const renderTeamItem = (team: ITeam) => {
    return (
      <StyledTeamItem key={team._id}>
        <StyledTeamItemFlag href={team.link} target='_blank'>
          <img src={team.flag} alt={team.code} />
        </StyledTeamItemFlag>
        <StyledTeamItemName>{team.name}</StyledTeamItemName>
      </StyledTeamItem>
    );
  };

  useEffect(() => {
    retrieveTeams();
  }, []);

  return (
    <StyledTeams className={className}>
      <StyledTeamsTitle>National teams</StyledTeamsTitle>
      <StyledTeamsList>{teams.map(renderTeamItem)}</StyledTeamsList>
    </StyledTeams>
  );
};

export default Teams;
