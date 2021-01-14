import React, { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import CurrentUserContext from '../contexts/CurrentUserContext';
import IUser from '../interfaces/IUser';

type MenuProps = {
  email: string
  onClickLogoutButton(): void
}

const Menu: React.FunctionComponent<MenuProps> = ({
  email,
  onClickLogoutButton
}): ReactElement => {
  const currentUser: IUser = React.useContext<IUser>(CurrentUserContext);
  const loggedIn: boolean = Boolean(currentUser._id);

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
          {email}
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
