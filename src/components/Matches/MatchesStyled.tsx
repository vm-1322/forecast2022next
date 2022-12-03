import styled from 'styled-components';

export const StyledMatches = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
  color: ${(props) => props.theme.colors.common.black};

  ${(props) => props.theme.media.tablet} {
    padding: 20px;
  }
`;

export const StyledMatchesList = styled.div`
  display: flex;
  flex-direction: colomn;
  flex-wrap: wrap;
`;

export const StyledMatchItem = styled.div`
  width: 100%;

  &:nth-child(odd) {
    background: ${(props) => props.theme.colors.oddRow};
  }
`;

export const StyledMatchItemForecast = styled.div`
  width: 90px;
  margin-left: 7px;

  & input {
    display: block;
    width: 100%;
    padding: 7px;
    margin: 0 auto;
    background-color: silver;
    border-radius: 5px;
    border: none;
    color: white;
    font-size: 1rem;
    cursor: cell;
  }

  & input.edit {
    color: yellow;
  }

  ${(props) => props.theme.media.tablet} {
    margin-left: 20px;
  }
`;

export const StyledMatchItemStatus = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 90px;
  margin-left: 7px;
  padding: 5px;
  text-align: center;

  ${(props) => props.theme.media.tablet} {
    margin-left: 20px;
  }
`;

export const StyledMatchesStandings = styled.div`
  margin-left: 10px;
`;
