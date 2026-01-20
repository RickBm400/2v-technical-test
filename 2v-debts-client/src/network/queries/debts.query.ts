import type { debtsListDataType, debtStatus } from '@/types/debts.types';
import $axiosClient from '../axios.client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from './client';

interface paginationParams {
  page: number;
  limit: number;
  search?: string;
  status?: debtStatus | string;
}

export const getDebtsPaginatedQuery = (params?: paginationParams) => {
  console.log(params);
  return useQuery({
    queryKey: ['debts-paginated', params],
    queryFn: async () => {
      const response = await $axiosClient.get('/debt/paginated', {
        params,
      });
      return response.data;
    },
  });
};

export const addDebtMutation = () => {
  return useMutation({
    mutationFn: async (data: debtsListDataType) => {
      const response = await $axiosClient.post('/debt', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['debts-paginated', 1, 10] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const deleteDebtMutation = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await $axiosClient.delete(`/debt/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['debts-paginated', { page: 1, limit: 10, search: null }],
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const updateDebtByIdMutation = () => {
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Partial<debtsListDataType>;
    }) => {
      console.log(data);
      const response = await $axiosClient.patch(`/debt/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['debts-paginated', { page: 1, limit: 10, search: null }],
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
