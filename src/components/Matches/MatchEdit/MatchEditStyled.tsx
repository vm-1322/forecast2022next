import styled from 'styled-components';

export const StyledMatchEdit = styled.div`
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

export const StyledMatchEditTitle = styled.h2`
  margin: 0 0 10px;
  text-align: center;
`;

export const StyledMatchEditDateStage = styled.div`
  margin-top: 10px;
`;

export const StyledMatchEditDate = styled.div`
  & input {
    margin-left: 5px;
    font-size: 1rem;
  }
`;

export const StyledMatchEditStage = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 15px;
`;

export const StyledMatchEditStageKind = styled.div``;

export const StyledMatchEditStageGroup = styled.div`
  &.display-none {
    display: none;
  }

  & label {
    margin: 0 3px 0 7px;
  }

  & input {
    width: 30px;
  }
`;

export const StyledMatchEditStageGroupRound = styled.div`
  &.display-none {
    display: none;
  }

  & label {
    margin: 0 3px 0 7px;
  }

  & input {
    width: 40px;
  }
`;

export const StyledMatchEditStageRound = styled.div`
  margin-left: 5px;

  &.display-none {
    display: none;
  }
`;

export const StyledMatchTeams = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
`;

export const StyledMatchTeamItem = styled.div`
  margin: 0 10px 30px;
  width: 120px;

  & select {
    margin-top: 15px;
  }
`;

export const StyledMatchTeamItemFlag = styled.div`
  display: block;
  width: 70px;
  margin: 0 auto;
`;

export const StyledMatchResult = styled.div`
  display: flex;
  justify-content: center;
`;

export const StyledMatchResultGoal = styled.div`
  width: 60px;
  margin: 0 10px;

  & input {
    width: 100%;
    padding: 3px;
    font-size: 1.25rem;
    text-align: center;
  }
`;

export const StyledMatchForecastCheckBox = styled.div`
  margin-top: 20px;
`;

export const StyledMatchSLinkToBet = styled.div`
  margin-top: 15px;

  & label {
    display: block;
  }

  & textarea {
    width: 100%;
  }
`;

export const StyledMatchFormCheckBox = styled.div`
  margin-top: 20px;
`;

export const StyledMatchStatus = styled.div`
  margin-top: 15px;

  & select {
    margin-left: 5px;
    font-size: 1rem;
  }
`;
