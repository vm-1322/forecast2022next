import styled from 'styled-components';

export const StyledDashboard = styled.div``;

export const StyledDashboardMatchestsList = styled.div``;

export const StyledDashboardMatchItem = styled.div`
  display: flex;
  flex-direction: row;
  width: 60%;

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
  width: 60%;

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
