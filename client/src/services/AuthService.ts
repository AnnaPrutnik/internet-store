import instance, { refreshInstance } from '../http';
import { AxiosResponse } from 'axios';
import { AuthResponse } from '../model/response/AuthResponse';

class AuthService {
  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return instance.post<AuthResponse>('/auth/login', { email, password });
  }

  static async registration(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return instance.post<AuthResponse>('/auth/registration', {
      email,
      password,
    });
  }

  static async logout(): Promise<void> {
    return instance.post('/auth/logout');
  }

  static async refresh(): Promise<AxiosResponse<AuthResponse>> {
    return refreshInstance.get<AuthResponse>('/auth/refresh');
  }
}

export default AuthService;
