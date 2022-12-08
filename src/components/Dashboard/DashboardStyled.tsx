import styled from 'styled-components';

export const StyledDashboard = styled.div`
  display: flex;
  flex-direction: column;

  ${(props) => props.theme.media.tablet} {
    flex-direction: row;
  }
`;

export const StyledDashboardMatchesList = styled.div`
  margin: 50px auto 0;
`;

export const StyledDashboardMatchItem = styled.div`
  display: flex;
  flex-direction: row;

  &:nth-child(odd) {
    background: ${(props) => props.theme.colors.oddRow};
  }
`;

export const StyledDashboardMatchItemStatusEdit = styled.div`
  display: flex;
  flex-direction: row;
`;

export const StyledDashboardMatchItemStatus = styled.div`
  margin-left: 3px;
  line-height: 30px;

  ${(props) => props.theme.media.tablet} {
    margin-left: 20px;
  }
`;

export const StyledDashboardMatchItemEdit = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 42px;
  margin-left: 3px;
  background-color: inherit;

  & input {
    display: block;
    width: 100%;
    margin: 0 auto;
    padding: 7px;
    background-color: silver;
    border-radius: 5px;
    border: none;
    color: white;
    font-size: 1rem;
    cursor: cell;
  }

  ${(props) => props.theme.media.tablet} {
    width: 90px;
    margin-left: 20px;
  }
`;

export const StyledDashboardCreateMatch = styled.div`
  margin: 0 auto;

  & input {
    display: block;
    margin 20px auto;
    padding: 7px 15px;
    background-color: silver;
    border-radius: 5px;
    border: none;
    color: white;
    font-size: 1rem;
    cursor: pointer;
  }
`;

export const StyledDashboardScoreTableList = styled.div`
  ax-width: 380px;
`;

export const StyledDashboardCalculateScoreTable = styled.div`
  width: 150px;
  margin: 10px auto;
`;
