import React, { useContext } from 'react';
import { Context } from '../../index';
import AuthForm from './AuthForm';
import { actionEnum } from './AuthLayout';
import { observer } from 'mobx-react-lite';

const LoginForm = () => {
  const { store } = useContext(Context);

  console.log(store.user);

  const onLoginClick = async (email: string, password: string) => {
    if (!email || !password) {
      return alert('bad credential');
    }
    await store.login(email, password);
  };

  return <AuthForm action={actionEnum.login} onClickBtn={onLoginClick} />;
};

export default observer(LoginForm);
