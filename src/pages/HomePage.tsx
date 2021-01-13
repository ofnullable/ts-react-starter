import * as React from 'react';
import { css } from '@emotion/react';

const mainTextStyle = css`
  font-size: 5rem;
`;

function HomePage() {
  return (
    <div className="container">
      <h1 css={[mainTextStyle]}>TS React Starter 🚀</h1>
    </div>
  );
}

export default HomePage;
