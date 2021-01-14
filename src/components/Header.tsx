import React, { ReactElement } from 'react';
import logo from '../images/logo.svg';
import Menu from './Menu';

type HeaderProps = {
  email: string
  onClickLogoutButton(): void
}

const Header: React.FunctionComponent<HeaderProps> = ({
  email,
  onClickLogoutButton 
}): ReactElement => {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Россия" />
      <Menu
        email={email}
        onClickLogoutButton={onClickLogoutButton}
      />
    </header>
  );
}

export default Header;
