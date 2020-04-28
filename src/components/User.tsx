import * as React from 'react';
import { IUser } from '../store/models';

interface UserProps {
  user: IUser | null,
  loading: boolean,
}

const User = ({ user, loading }: UserProps) => {
  return loading ?
    <p>load user...</p> :
    <>
      <h1>{user?.username} ({user?.name})</h1>
      <p><b>email:</b> {user?.email}</p>
    </>;
};

export default User;