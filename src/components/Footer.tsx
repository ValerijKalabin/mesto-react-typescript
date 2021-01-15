import React, { FunctionComponent, ReactElement } from 'react';

const Footer: FunctionComponent = (): ReactElement => {
  return (
    <footer className="footer">
      <p className="footer__copyright">&copy; {new Date().getFullYear()} Mesto Russia</p>
    </footer>
  );
}

export default Footer;
