import * as React from 'react';
import { css } from '@emotion/react';
import { NavLink } from 'react-router-dom';

const headerStyle = css`
  height: 60px;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  nav {
    margin: 0 auto;
    padding: 0 12px;
    display: flex;
    width: 100%;
    max-width: 1200px;
    a {
      color: initial;
      padding: 0 8px;
      text-decoration: none;
    }
    a.active {
      color: dodgerblue;
    }
  }
`;

function Header() {
  return (
    <header css={headerStyle}>
      <nav>
        <NavLink exact to="/">
          Go Home
        </NavLink>
        <NavLink to="/users">Go Users</NavLink>
        <NavLink to="/error">Go Error</NavLink>
      </nav>
    </header>
  );
}

export default Header;
