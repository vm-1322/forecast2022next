import styled from 'styled-components';

export const StyledTeams = styled.section`
  padding: 25px;
  color: ${(props) => props.theme.colors.common.black};
`;

export const StyledTeamsTitle = styled.h2``;

export const StyledTeamsList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 40px;
`;

export const StyledTeamItem = styled.div`
  margin-bottom: 30px;
  width: 120px;
`;

export const StyledTeamItemFlag = styled.a`
  display: block;
  width: 70px;
  margin: 0 auto;
`;

export const StyledTeamItemName = styled.div`
  text-align: center;
`;
