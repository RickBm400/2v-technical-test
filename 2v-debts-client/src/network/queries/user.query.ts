import { useMutation, useQuery } from '@tanstack/react-query';
import $axiosClient from '../axios.client';

interface RegisterPayload {
  email: string;
  password: string;
  name: string;
}

export const loginUserMutation = () => {
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

export const registerUserMutation = (onSuccess?: () => void) => {
  const loginMutation = loginUserMutation();
  return useMutation({
    mutationKey: ['register-user'],
    mutationFn: async (data: RegisterPayload) => {
      await $axiosClient.post(`/auth/sign-up`, data);
      return data;
    },
    onSuccess: async (data: { email: string; password: string }) => {
      // invoke login after successful registration
      await loginMutation.mutateAsync({
        email: data.email,
        password: data.password,
      });
    },
    onSettled: () => {
      if (loginMutation.isSuccess) {
        onSuccess?.();
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const getUsersQuery = () => {
  return useQuery({
    queryKey: ['users-list'],
    queryFn: async () => {
      const response = await $axiosClient.get('/user');
      return response.data;
    },
  });
};
