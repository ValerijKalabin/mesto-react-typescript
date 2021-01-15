import React, { FunctionComponent, ReactElement } from 'react';
import logo from '../images/logo.svg';
import Menu from './Menu';

type HeaderProps = {
  userEmail: string
  onClickLogoutButton(): void
}

const Header: FunctionComponent<HeaderProps> = ({
  userEmail,
  onClickLogoutButton 
}): ReactElement => {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Россия" />
      <Menu
        userEmail={userEmail}
        onClickLogoutButton={onClickLogoutButton}
      />
    </header>
  );
}

export default Header;
