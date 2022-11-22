import styled from 'styled-components';

export const StyledMatches = styled.div`
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
  height: 27px;
  padding: 2px 0;
`;

export const StyledMatchItemTeamFlag = styled.div`
  height: 15px;
  width: 23px;

  & img {
    width: 100%;
  }
`;

export const StyledMatchItemTeamName = styled.div<{ isWin?: boolean }>`
  width: 150px;
  padding: 0 15px;
  font-weight: ${(props) => (props.isWin ? 700 : 400)};
`;

export const StyledMatchItemResult = styled.div`
  width: 20px;
  text-align: center;
`;

export const StyledMatchItemResultScore = styled.div<{ isWin?: boolean }>`
  height: 27px;
  font-weight: ${(props) => (props.isWin ? 700 : 400)};
`;

export const StyledMatchItemForecast = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 120px;
  margin-left: 50px;
  padding: 5px;

  & input {
    display: block;
    padding: 7px;
    margin: 0 auto;
    background-color: silver;
    border-radius: 5px;
    border: none;
    color: white;
    font-size: 1rem;
    cursor: cell;
  }
`;

export const StyledMatchItemStatus = styled.div`
  width: 120px;
  margin-left: 50px;
  padding: 5px;
  font-size: 1rem;
  text-align: center;
  line-height: 40px;
`;
