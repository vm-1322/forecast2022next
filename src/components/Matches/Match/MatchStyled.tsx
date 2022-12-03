import styled from 'styled-components';

export const StyledMatchItem = styled.a`
  display: flex;
  width: 100%;
  padding: 10px;
  background-color: inherit;
`;

export const StyledMatchItemDateTime = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 75px;
  padding-right: 10px;

  ${(props) => props.theme.media.tablet} {
    width: 120px;
    padding: 0 10px;
  }
`;

export const StyledMatchItemDate = styled.div`
  text-align: center;
`;

export const StyledMatchItemTime = styled.div`
  text-align: center;
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

export const StyledMatchItemResultScore = styled.div<{
  isWin?: boolean;
}>`
  height: 27px;
  font-weight: ${(props) => (props.isWin ? 700 : 400)};
`;

export const StyledMatchItemStatus = styled.div<{ matchStatus?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${(props) =>
    props.matchStatus && {
      width: '90px',
      marginLeft: props.theme.media.tablet ? '20px' : '7px',
      padding: '5px',
      textAlign: 'center',
      lineHeight: '40px',
    }}
`;
