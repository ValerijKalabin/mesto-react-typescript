import logo from '../images/logo.svg';

const Header:React.FunctionComponent = () => {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Россия" />
    </header>
  );
}

export default Header;
