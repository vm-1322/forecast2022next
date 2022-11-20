import styled from 'styled-components';

export const StyledMatches = styled.section`
  padding: 25px;
  color: ${(props) => props.theme.colors.common.black};
`;

export const StyledMatchesList = styled.div`
  display: flex;
  flex-direction: colomn;
  flex-wrap: wrap;
`;

export const StyledMatchItem = styled.a`
  display: flex;
  width: 100%;
  padding: 10px;

  &:nth-child(odd) {
    background: ${(props) => props.theme.colors.oddRow};
  }
`;

export const StyledMatchItemDateTime = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 120px;
  padding: 0 10px;
`;

export const StyledMatchItemTeams = styled.div``;

export const StyledMatchItemTeam = styled.div`
  display: flex;
  padding: 2px 0;
`;

export const StyledMatchItemTeamFlag = styled.div`
  height: 15px;
  width: 23px;

  & img {
    width: 100%;
  }
`;

export const StyledMatchItemTeamName = styled.div`
  width: 150px;
  padding: 0 15px;
`;
