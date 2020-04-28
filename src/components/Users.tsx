import * as React from 'react';
import { Link } from 'react-router-dom';
import { IUser } from '../store/models';

interface UsersProps {
  users: IUser[] | null,
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
