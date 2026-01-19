import { useMutation } from '@tanstack/react-query';
import $axiosClient from '../axios.client';

export const loginUserQuery = () => {
  return useMutation({
    mutationFn: async (payload: { email: string; password: string }) => {
      const response = await $axiosClient.get(`/auth/login`, {
        params: payload,
      });
      return response.data;
    },
    onSuccess: (data: any) => {
      localStorage.setItem('token', data.token);
    },
  });
};

export const registerUserMutation = () => {
  return useMutation({
    mutationKey: ['register-user'],
    mutationFn: async (data: { email: string; password: string }) => {
      await $axiosClient.post(`/register`, data);
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
