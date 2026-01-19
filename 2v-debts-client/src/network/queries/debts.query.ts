import type { debtsListDataType, debtStatus } from '@/types/debts.types';
import $axiosClient from '../axios.client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from './client';

interface paginationParams {
  page: number;
  limit: number;
  name?: string;
  status?: debtStatus | string;
}

export const getDebtsPaginatedQuery = (params?: paginationParams) => {
  return useQuery({
    queryKey: ['debts-paginated'],
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
      queryClient.invalidateQueries({ queryKey: ['debts-paginated', 1, 10] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
