import axiosClient from '../axiosClient';

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

export const authService = {
  login: (data: LoginPayload) =>
    axiosClient
      .post<LoginResponse>('/auth/login', data)
      .then((res) => res.data),

  logout: () => axiosClient.post('/auth/logout'),

  getMe: () => axiosClient.get('/auth/me'),
};
