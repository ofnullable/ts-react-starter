/** @jsx jsx */
import * as React from 'react';
import { css, jsx } from '@emotion/core';
import { NavLink } from 'react-router-dom';

const headerStyle = css`
  height: 60px;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  nav {
    padding: 0 12px;
    display: flex;
    a {
      color: black;
      padding: 0 8px;
      text-decoration: none;
    }
    a.active {
      color: dodgerblue;
    }
  }
`;

const Header = () => {
  return (
    <header css={headerStyle}>
      <nav>
        <NavLink exact to="/">Go Home</NavLink>
        <NavLink to="/sample">Go Sample</NavLink>
      </nav>
    </header>
  );
};

export default Header;
