import styled from 'styled-components';

export const StyledForecasts = styled.div`
  padding: 10px;
  color: ${(props) => props.theme.colors.common.black};

  ${(props) => props.theme.media.tablet} {
    padding: 25px;
  }
`;

export const StyledForecastsList = styled.div`
  display: flex;
  flex-direction: colomn;
  flex-wrap: wrap;
  font-size: 0.75rem;

  ${(props) => props.theme.media.tablet} {
    font-size: 1rem;
  }
`;

export const StyledForecastItem = styled.a`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px;

  &:nth-child(odd) {
    background: ${(props) => props.theme.colors.oddRow};
  }
`;

export const StyledForecastItemDateTime = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 75px;
  padding-right: 10px;

  ${(props) => props.theme.media.tablet} {
    padding: 0 10px;
  }
`;

export const StyledForecastItemDate = styled.div`
  text-align: center;
`;

export const StyledForecastItemTime = styled.div`
  text-align: center;
`;

export const StyledForecastItemResult = styled.div`
  width: 20px;
  text-align: center;
`;

export const StyledForecastItemResultScore = styled.div`
  height: 27px;
`;

export const StyledForecastItemUserPoints = styled.div`
  displey: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;

  ${(props) => props.theme.media.desktop} {
    flex-direction: row;
    text-align: inherit;
  }
`;

export const StyledForecastItemUser = styled.div`
  width: 100px;
  margin-left: 10px;
`;

export const StyledForecastItemPoints = styled.div`
  width: 10px;
  margin: 0 auto;
  text-align: center;

  ${(props) => props.theme.media.desktop} {
    margin: 0 20px 0 10px;
  }
`;

export const StyledForecastItemMatchDateTime = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 75px;
  padding-right: 10px;

  ${(props) => props.theme.media.tablet} {
    width: 100px;
    padding: 0 10px;
  }
`;

export const StyledForecastItemMatchDate = styled.div`
  text-align: center;
`;

export const StyledForecastItemMatchTime = styled.div`
  text-align: center;
`;

export const StyledForecastItemMatchTeams = styled.div``;

export const StyledForecastItemMatchTeam = styled.div`
  display: flex;
  height: 27px;
  padding: 2px 0;
`;

export const StyledForecastItemMatchTeamFlag = styled.div`
  height: 15px;
  width: 23px;

  & img {
    width: 100%;
  }
`;

export const StyledForecastItemMatchTeamName = styled.div<{ isWin?: boolean }>`
  width: 80px;
  padding: 0 5px;
  font-weight: ${(props) => (props.isWin ? 700 : 400)};

  ${(props) => props.theme.media.tablet} {
    width: 150px;
    padding: 0 15px;
  }
`;

export const StyledForecastItemMatchResult = styled.div`
  width: 20px;
  text-align: center;
`;

export const StyledForecastItemMatchResultScore = styled.div<{
  isWin?: boolean;
}>`
  height: 27px;
  font-weight: ${(props) => (props.isWin ? 700 : 400)};
`;

export const StyledForecastItemMatchStatus = styled.div`
  width: 90px;
  margin-left: 5px;
  padding: 5px;
  text-align: center;
  line-height: 40px;

  ${(props) => props.theme.media.tablet} {
    margin-left: 15px;
  }
`;
