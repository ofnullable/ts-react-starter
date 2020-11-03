import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { css } from '@emotion/core';

const footerStyle = css`
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  & > span {
    flex: 1;
    display: flex;
    justify-content: center;
  }
  .menus {
    flex: 1.5;
    height: 100%;
    padding: 0 12px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    a {
      color: initial;
      padding: 12px;
      text-decoration: none;
    }
    a.active {
      color: dodgerblue;
    }
  }
`;

function Footer() {
  return (
    <footer css={[footerStyle]}>
      <span key={'title'}>ts react starter</span>
      <nav key={'menus'} className="menus">
        <NavLink exact to="/">
          Home
        </NavLink>
        <NavLink to="/users">Users</NavLink>
      </nav>
    </footer>
  );
}

export default Footer;
