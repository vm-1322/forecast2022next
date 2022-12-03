import { IHeaderProps } from 'types';
import {
  StyledHeader,
  StyledHeaderLogo,
  StyledHeaderText,
} from './HeaderStyled';

const Header: React.FC<IHeaderProps> = ({ className }) => {
  return (
    <StyledHeader className={className}>
      <a href='https://www.qatar2022.qa/' target='_blank'>
        <StyledHeaderLogo>
          <img src='/images/logo.png' alt='Qatar 2022' />
        </StyledHeaderLogo>
        <StyledHeaderText>FIFA WORLD CUP QATAR 2022</StyledHeaderText>
      </a>
    </StyledHeader>
  );
};

export default Header;
