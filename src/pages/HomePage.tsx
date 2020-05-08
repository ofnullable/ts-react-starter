import * as React from 'react';
import { ReduxStore } from '../store';
import { loadUsersRequest } from '../store/actions/users';
import { LoadData } from '../server/ssrMiddleware';

function HomePage() {
  return (
    <div className="container">
      <h1>Home page!!</h1>
    </div>
  );
}

export const loadData: LoadData = async ({ store }: { store: ReduxStore }) => {
  store.dispatch(loadUsersRequest());
};

export default HomePage;
