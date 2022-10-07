import React, { useState, useMemo } from 'react';
import s from './Auth.module.css';
import { actionEnum } from './AuthLayout';

interface IAuthForm {
  action: actionEnum;
  onClickBtn: (email: string, password: string) => void;
}

const AuthForm = ({ action, onClickBtn }: IAuthForm) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const title = useMemo(
    () => (action === actionEnum.login ? 'Sign in' : 'Create  account'),
    [action]
  );

  const btnTitle = useMemo(
    () => (action === actionEnum.login ? 'Sign in' : 'SignUp'),
    [action]
  );

  const text = useMemo(
    () =>
      action === actionEnum.login
        ? 'or use your account'
        : 'or use your email for registration',
    [action]
  );

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onClickBtn(email, password);
    console.log('submit');
  };

  return (
    <form action='#' className={s.form} onSubmit={onSubmit}>
      <h1>{title}</h1>
      <div className={s.socialContainer}>
        <a href='#' className={s.social}>
          <i className='fab fa-facebook-f'></i>
        </a>
        <a href='#' className='social'>
          <i className='fab fa-google-plus-g'></i>
        </a>
        <a href='#' className='social'>
          <i className='fab fa-linkedin-in'></i>
        </a>
      </div>
      <span>{text}</span>
      <input
        type='email'
        placeholder='Email'
        className={s.input}
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <input
        type='password'
        placeholder='Password'
        className={s.input}
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      {action === actionEnum.login && <a href='#'>Forgot your password?</a>}

      <button type='submit'>{btnTitle}</button>
    </form>
  );
};

export default AuthForm;
