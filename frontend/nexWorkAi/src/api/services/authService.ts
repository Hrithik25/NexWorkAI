import axiosClient from '../axiosClient';

interface LoginPayload {
  email: string;
  password: string;
}

type ResponseData = {
  token: string;
  role: string;
  email: string;
  type: string;
};

interface LoginResponse {
  success: boolean;
  message: string;
  data: ResponseData;
  timestamp: string;
}

export const authService = {
  login: (data: LoginPayload) =>
    axiosClient
      .post<LoginResponse>('/auth/login', data)
      .then((res) => res.data?.data),

  logout: () => axiosClient.post('/auth/logout'),

  getMe: () => axiosClient.get('/auth/me'),
};
