import type { Auth } from '@entities/auth/api/types';
import { ApiService } from '@shared/services';

const login = async (body: Auth.Api.Login.Request.Body) => {
  const { data } = await ApiService().post<Auth.Api.Login.Response.Data>(
    `/auth/login`,
    body,
  );
  return data;
};

const register = async (body: Auth.Api.Register.Request.Body) => {
  const { data } = await ApiService().post<Auth.Api.Register.Response.Data>(
    `/auth/register`,
    body,
  );
  return data;
};

const getProfile = async () => {
  const { data } = await ApiService().get<Auth.Api.GetProfile.Response.Data>(
    `/auth/profile`,
  );
  return data;
};

export const authApi = {
  login,
  register,
  getProfile,
};
