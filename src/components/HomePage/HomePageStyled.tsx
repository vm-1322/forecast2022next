import styled from 'styled-components';

export const StyledHomePage = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  jastifi-content: space-betwin;

  ${(props) => props.theme.media.tablet} {
    flex-direction: row;
  }
`;

export const StyledMatches = styled.div`
  width: 100%;

  ${(props) => props.theme.media.tablet} {
    width: 67%;
  }
`;

export const StyledScoreTable = styled.div`
  width: 100%;

  ${(props) => props.theme.media.tablet} {
    width: 33%;
  }
`;
