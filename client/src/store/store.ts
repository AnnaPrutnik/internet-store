import { IUser } from './../model/IUser';
import { makeAutoObservable } from 'mobx';
import { AxiosError } from 'axios';
import AuthService from '../services/AuthService';
import { setAuthCookie } from '../http/cookie';

export default class Store {
  user = {} as IUser;
  isAuth = false;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(auth: boolean) {
    this.isAuth = auth;
  }

  setUser(user: IUser) {
    this.user = user;
  }

  setLoading(value: boolean) {
    this.isLoading = value;
  }

  async login(email: string, password: string) {
    try {
      const response = await AuthService.login(email, password);
      setAuthCookie('token', response.data.token);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (error) {
      const err = error as AxiosError;
      console.log(err.message);
    }
  }

  async registration(email: string, password: string) {
    try {
      const response = await AuthService.registration(email, password);
      setAuthCookie('token', response.data.token);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (error) {
      const err = error as AxiosError;
      console.log(err.message);
    }
  }

  async logout() {
    try {
      await AuthService.logout();
      setAuthCookie('token', '');
      this.setAuth(false);
      this.setUser({} as IUser);
    } catch (error) {
      const err = error as AxiosError;
      console.log(err.message);
    }
  }

  async checkAuth() {
    this.setLoading(true);
    try {
      const response = await AuthService.refresh();
      setAuthCookie('token', response.data.token);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (error) {
      const err = error as AxiosError;
      console.log(err.message);
    } finally {
      this.setLoading(false);
    }
  }
}
