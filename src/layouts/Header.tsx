import * as React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav>
        <NavLink to="/">Go Home</NavLink>
        <NavLink to="/sample">Go Sample</NavLink>
      </nav>
    </header>
  );
};

export default Header;
