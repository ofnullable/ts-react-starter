import * as React from 'react';
import { Request } from 'express';
import { ReduxStore } from '../store';
import { loadUsersRequest } from '../store/actions/users';

function HomePage() {
  return (
    <div className="container">
      <h1>Home page!!</h1>
    </div>
  );
}

export const loadData = async ({ req, store }: { req: Request, store: ReduxStore }) => {
  store.dispatch(loadUsersRequest());
};

export default HomePage;
