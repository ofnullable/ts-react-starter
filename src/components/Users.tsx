import * as React from 'react';
import { Link } from 'react-router-dom';
import { User } from '../store/models';

interface UsersProps {
  users: User[] | null;
  loading: boolean;
}

function Users({ users, loading }: UsersProps) {
  return loading ? (
    <p>load users...</p>
  ) : (
    <ul>
      {users?.length ? (
        users.map((user) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>
              <p>
                {user.username} {user.email}
              </p>
            </Link>
          </li>
        ))
      ) : (
        <li>anyone</li>
      )}
    </ul>
  );
}

export default Users;
