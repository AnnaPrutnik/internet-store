import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegistrationFrom from './RegistrationFrom';
import s from './Auth.module.css';

export enum actionEnum {
  'login',
  'registration',
}

const AuthLayout = () => {
  const [isLoginPanel, setIsLoginPanel] = useState(true);

  const onClickBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.id === 'signIn') {
      setIsLoginPanel(true);
    }

    if (e.currentTarget.id === 'signUp') {
      setIsLoginPanel(false);
    }
  };

  return (
    <div className={s.container}>
      <div className={isLoginPanel ? s.signUpNotActive : s.signUp}>
        <RegistrationFrom />
      </div>
      <div className={isLoginPanel ? s.signIn : s.signInNotActive}>
        <LoginForm />
      </div>
      <div className={isLoginPanel ? s.wrapperLogin : s.wrapperRegister}>
        <div className={isLoginPanel ? s.overlayLogin : s.overlayRegister}>
          <div className={isLoginPanel ? s.notRegisterPanel : s.registerPanel}>
            <h1>Welcome Back!</h1>
            <p>
              To keep connected with us please login with your personal info
            </p>
            <button className={s.ghost} id='signIn' onClick={onClickBtn}>
              Sign In
            </button>
          </div>
          <div className={isLoginPanel ? s.loginPanel : s.notLoginPanel}>
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start journey with us</p>
            <button className={s.ghost} id='signUp' onClick={onClickBtn}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
