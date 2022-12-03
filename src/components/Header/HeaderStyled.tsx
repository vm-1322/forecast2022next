import styled from 'styled-components';

export const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  padding: 10px 20px;
  background: linear-gradient(rgb(227, 216, 206), rgb(255, 255, 255));
  text-transform: uppercase;
  z-index: 10;

  & a {
    display: flex;
    max-width: 580px;
  }

  ${(props) => props.theme.media.tablet} {
    padding: 20px 50px;
  }
`;

export const StyledHeaderLogo = styled.div`
  width: 95px;
  height: 50px;

  & img {
    width: 100%;
  }
`;

export const StyledHeaderText = styled.div`
  margin-left: 20px;
  font-size: 1rem;
  line-height: 50px;

  ${(props) => props.theme.media.tablet} {
    margin-left: 50px;
    font-size: 2rem;
  }
`;
