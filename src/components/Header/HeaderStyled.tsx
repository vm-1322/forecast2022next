import styled from 'styled-components';

export const StyledHeader = styled.header`
  padding: 20px 50px;
  background: linear-gradient(rgb(227, 216, 206), rgb(255, 255, 255));
  font-size: 2rem;
  text-transform: uppercase;

  & a {
    display: flex;
    max-width: 580px;
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
  margin-left: 50px;
`;
