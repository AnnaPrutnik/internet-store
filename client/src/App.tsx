import React, { useEffect, useContext, useState } from 'react';
import AuthLayout from './components/Auth/AuthLayout';
import { Context } from './index';
import { observer } from 'mobx-react-lite';
import { IUser } from './model/IUser';
import UserService from './services/UserService';
import UserItem from './components/UserItem';

import './App.css';

function App() {
  const { store } = useContext(Context);
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth();
    }
  }, []);

  const getUsers = async () => {
    setUsers([] as IUser[]);
    try {
      const users = await UserService.getUsers();
      setUsers(users);
    } catch (error) {
      console.log(error);
    }
  };

  if (store.isLoading) {
    return <div>Loading...</div>;
  }

  if (store.isAuth) {
    return (
      <div>
        <h2>{`User ${store.user.email} is authorized`}</h2>
        <button onClick={() => store.logout()}>Logout</button>
        <button onClick={getUsers}> Get users</button>
        {users.length > 0 && (
          <ul>
            {users.map((user) => (
              <UserItem email={user.email} key={user.id} />
            ))}
          </ul>
        )}
      </div>
    );
  }

  return (
    <div>
      <AuthLayout />
    </div>
  );
}

export default observer(App);
