import type { debtsListDataType, debtStatus } from '@/types/debts.types';
import $axiosClient from '../axios.client';
import { useMutation, useQuery } from '@tanstack/react-query';

interface paginationParams {
  page: number;
  limit: number;
  name?: string;
  status?: debtStatus | string;
}

export const getDebtsPaginatedQuery = (params?: paginationParams) => {
  return useQuery({
    queryKey: ['debts-paginated', params?.page ?? 1, params?.limit ?? 10],
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
      const response = await $axiosClient.post('/debts', data);
      return response.data;
    },
  });
};
