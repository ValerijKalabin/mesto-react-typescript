import React, { FunctionComponent, ReactElement } from 'react';
import { NavLink } from 'react-router-dom';

type MenuProps = {
  userEmail: string
  onClickLogoutButton(): void
}

const Menu: FunctionComponent<MenuProps> = ({
  userEmail,
  onClickLogoutButton
}): ReactElement => {
  const loggedIn: boolean = Boolean(userEmail);

  return (
    <nav className="menu">
      {!loggedIn &&
        <NavLink
          to="/sign-up"
          className="menu__item"
          activeClassName="menu__item_active"
        >
          Регистрация
        </NavLink>
      }
      {!loggedIn &&
        <NavLink
          to="/sign-in"
          className="menu__item"
          activeClassName="menu__item_active"
        >
          Войти
        </NavLink>
      }
      {loggedIn &&
        <p className="menu__item menu__item_type_text">
          {userEmail}
        </p>}
      {loggedIn &&
        <button
          className="menu__item menu__item_type_button"
          name="logout"
          onClick={onClickLogoutButton}
        >
          Выйти
        </button>
      }
    </nav>
  );
}

export default Menu;
