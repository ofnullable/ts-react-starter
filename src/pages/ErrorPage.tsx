import * as React from 'react';
import { css } from '@emotion/react';

const errorPageStyle = css`
  flex: 1 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    color: red;
  }
`;

function ErrorPage() {
  return (
    <div css={errorPageStyle}>
      <h1>404</h1>
      <p>Page not found.</p>
    </div>
  );
}

export default ErrorPage;
