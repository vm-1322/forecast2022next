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
`;

export const StyledForecastItem = styled.a`
  display: flex;
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

export const StyledForecastItemUser = styled.div`
  width: 100px;
  margin-left: 10px;
  line-height: 50px;
`;

export const StyledForecastItemPoints = styled.div`
  width: 10px;
  margin-left: 10px;
  text-align: center;
  line-height: 50px;
`;
