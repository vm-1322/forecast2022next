import { Fragment, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import {
  StyledNav,
  StyledNavItem,
  StyledNavItems,
  StyledNavUser,
  StyledNavUserItem,
} from './NavigationStyled';

import { INavigationProps, INavigationItem } from '../../types';

const Navigation: React.FC<INavigationProps> = ({
  items,
  activePath,
  isAuth,
  userName = '',
  logOutHandler = () => {},
  className,
}) => {
  const router = useRouter();

  const [currentPath, setCurrentPath] = useState(
    activePath ? activePath : router.pathname
  );

  const renderNavigationItem = (item: INavigationItem, itemIndex: number) => {
    return (
      <StyledNavItem
        key={itemIndex}
        isActive={item.link.value === currentPath}
        onClick={() => setCurrentPath(item.link.value)}
      >
        <Link href={item.link.value}>{item.link.label}</Link>
      </StyledNavItem>
    );
  };

  const navigationItems = items?.map(renderNavigationItem);

  return (
    <StyledNav className={className}>
      <StyledNavItems>{navigationItems}</StyledNavItems>
      <StyledNavUser>
        {isAuth ? (
          <Fragment>
            <StyledNavUserItem isActive={'/profile' === currentPath}>
              <Link href={'/profile'}>{userName ? userName : 'Profile'}</Link>
            </StyledNavUserItem>
            <StyledNavUserItem>
              <Link
                href={'/logout'}
                onClick={() => {
                  setCurrentPath('/');
                  logOutHandler();
                }}
              >
                Log Out
              </Link>
            </StyledNavUserItem>
          </Fragment>
        ) : (
          <Fragment>
            <StyledNavUserItem
              isActive={'/login' === currentPath}
              onClick={() => setCurrentPath('/login')}
            >
              <Link href={'/login'}>Log In</Link>
            </StyledNavUserItem>
            <StyledNavUserItem
              isActive={'/register' === currentPath}
              onClick={() => setCurrentPath('/register')}
            >
              <Link href={'/register'}>Sign Up</Link>
            </StyledNavUserItem>
          </Fragment>
        )}
      </StyledNavUser>
    </StyledNav>
  );
};

export default Navigation;