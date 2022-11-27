import styled from 'styled-components';

export const StyledForecast = styled.div`
  width: 315px;
  margin: 50px auto;
  padding: 1rem;
  border: 1px solid #b3b3b3;
  border-radius: 5px;
  background: ${(props) => props.theme.colors.gainsboro};
  box-shadow: 10px 10px 10px 0px rgba(217, 213, 217, 1);

  & input[type='submit'] {
    display: block;
    margin: 20px auto 0;
    padding: 9px 23px;
    background: ${(props) => props.theme.colors.secondary};
    color: ${(props) => props.theme.colors.common.white};
    border: none;
    border-radius: 4px;
    font-weight: 700;
    font-size: 16px;
    cursor: pointer;

    &:disabled,
    &:disabled:hover {
      opacity: 0.3;
      cursor: initial;
    }
  }
`;

export const StyledForecastTitle = styled.h2`
  margin: 0 0 10px;
  text-align: center;
`;

export const StyledForecastDateStage = styled.div`
  display: flex;
  margin-bottom: 20px;
  justify-content: center;
`;

export const StyledForecastDate = styled.div`
  margin: 0 10px;
`;

export const StyledForecastStage = styled.div`
  margin: 0 10px;
`;

export const StyledForecastTeams = styled.div`
  display: flex;
  justify-content: center;
`;

export const StyledForecastTeamItem = styled.div`
  margin: 0 10px 30px;
  width: 120px;
`;

export const StyledForecastTeamItemFlag = styled.a`
  display: block;
  width: 70px;
  margin: 0 auto;
`;

export const StyledForecastTeamItemName = styled.div`
  text-align: center;
`;

export const StyledForecastResult = styled.div`
  display: flex;
  justify-content: center;
`;

export const StyledForecastResultGoal = styled.div`
  width: 60px;
  margin: 0 10px;

  & input {
    width: 100%;
    padding: 3px;
    font-size: 1.25rem;
    text-align: center;
  }
`;

export const StyledForecastLinkToBet = styled.div`
  margin-top: 15px;
  text-align: center;
`;

export const StyledForecastFormCheckBox = styled.div`
  margin-top: 20px;
`;
