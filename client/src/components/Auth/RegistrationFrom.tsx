import React, { useContext } from 'react';
import AuthForm from './AuthForm';
import { Context } from '../../index';
import { actionEnum } from './AuthLayout';
import { observer } from 'mobx-react-lite';

const RegistrationFrom = () => {
  const { store } = useContext(Context);

  const onRegistrationClick = async (email: string, password: string) => {
    if (!email || !password) {
      return alert('bad credential');
    }
    await store.registration(email, password);
  };

  return (
    <AuthForm
      action={actionEnum.registration}
      onClickBtn={onRegistrationClick}
    />
  );
};

export default observer(RegistrationFrom);
