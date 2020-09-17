import * as React from 'react';
import { loadUserRequest } from '../store/actions/users';
import { useSelector } from 'react-redux';
import { AppState } from '../store/reducers';

function User() {
  const { data: user, loading } = useSelector((state: AppState) => state.users.user);

  return loading ? (
    <p>load user...</p>
  ) : (
    user && (
      <div>
        <h1>
          {user.id} {user.username} ({user.name})
        </h1>
        <p>
          <b>email:</b> {user.email}
        </p>
      </div>
    )
  );
}

export const preload: Preload<{ id: string }> = async ({ store, match }) => {
  const user = store.getState().users.user;
  const userId = match.params.id;
  const needFetch = !user.data || user.data.id !== Number(userId);
  if (needFetch && !user.loading) {
    store.dispatch(loadUserRequest(userId));
  }
};

export default User;
