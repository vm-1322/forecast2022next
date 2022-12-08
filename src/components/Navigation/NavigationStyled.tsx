import styled from 'styled-components';

export const StyledNav = styled.nav`
  position: sticky;
  top: 70px;
  display: flex;
  flext-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  padding: 15px 25px;
  background: ${(props) => props.theme.colors.common.white};
  border-top: 1px solid rgb(0, 0, 0, 7%);
  box-shadow: rgb(0 0 0 / 7%) 0px 1px 0px;
  color: ${(props) => props.theme.colors.primary};
  z-index: 10;

  ${(props) => props.theme.media.tablet} {
    top: 90px;
  }}


`;

export const StyledNavItems = styled.div`
  display: flex;
  flext-direction: row;
  flex-wrap: wrap;
`;

export const StyledNavUser = styled.div`
  display: flex;
  flext-direction: row;
  flex-wrap: wrap;
  margin-left: 20px;
`;

export const StyledNavItem = styled.div<{ isActive: boolean }>`
  font-family: 'Open Sans', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 1.4;
  margin-right: 20px;
  color: ${(props) =>
    props.isActive ? props.theme.colors.secondary : props.theme.colors.primary};

  &:last-child {
    margin-right: 0;
  }
`;

export const StyledNavUserItem = styled.div<{ isActive?: boolean }>`
  font-family: 'Open Sans', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 1.4;
  margin-right: 20px;
  color: ${(props) =>
    props.isActive ? props.theme.colors.secondary : props.theme.colors.primary};

  &:last-child {
    margin-right: 0;
  }
`;
