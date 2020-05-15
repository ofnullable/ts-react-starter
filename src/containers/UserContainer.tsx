import * as React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../store/reducers';
import { loadUserRequest } from '../store/actions/users';
import User from '../components/User';

function UserContainer() {
  const { data, loading } = useSelector((state: AppState) => state.users.user);
  const params = useParams<{id: string}>();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!data) {
      dispatch(loadUserRequest(params.id));
    }
  }, [])

  return <User user={data} loading={loading} />;
}

export const loadData: LoadData = async ({ store, match }) => {
  store.dispatch(loadUserRequest(match.params.id));
};

export default UserContainer;
