/** @jsx jsx */
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { css, jsx } from '@emotion/core';

const footerStyle = css`
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  span {
    flex: 1;
    display: flex;
    justify-content: center;
  }
  nav {
    flex: 1.5;
    height: 100%;
    padding: 12px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    a {
      color: black;
      padding: 12px;
      text-decoration: none;
    }
    a.active {
      color: dodgerblue;
    }
  }
`;

const Footer = () => {
  return (
    <footer css={footerStyle}>
      <span>Footer!</span>
      <nav>
        <NavLink exact to='/'>Home</NavLink>
        <NavLink to='/sample'>sample</NavLink>
      </nav>
    </footer>
  );
};

export default Footer;
