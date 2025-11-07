import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';

export const API_SERVICE_BASE_URL = '/api';

export const ApiService = (config?: AxiosRequestConfig): AxiosInstance => {
  const headers: AxiosRequestConfig['headers'] = {};

  const axiosConfig: AxiosRequestConfig = {
    ...config,
    baseURL: config?.baseURL || API_SERVICE_BASE_URL,
    headers: {
      ...headers,
      ...(config?.headers ?? {}),
    },
  };

  return axios.create(axiosConfig);
};
