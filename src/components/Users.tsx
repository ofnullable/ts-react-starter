import * as React from 'react';
import { Link } from 'react-router-dom';
import { User } from '../stores/models';

interface UsersProps {
  users: User[] | null,
  loading: boolean,
}

const Users = ({ users, loading }: UsersProps) => {
  return loading ?
    <p>load users...</p> :
    <ul>
      {users?.map(user => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>
              <p>{user.username} {user.email}</p>
            </Link>
          </li>
        ),
      )}
    </ul>;
};

export default Users;
