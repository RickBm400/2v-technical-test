import type { debtsListDataType } from '@/types/debts.types';
import { createContext, useContext } from 'react';

export const ActionsContext = createContext<{
  openTimeline: boolean;
  setOpenTimeline: (open: boolean) => void;
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
  debtData: debtsListDataType | null;
  setDebtData: (data: debtsListDataType | null) => void;
}>({
  openTimeline: false,
  setOpenTimeline: () => {},
  openModal: false,
  setOpenModal: () => {},
  debtData: null,
  setDebtData: () => {},
});

export const useDebtListActionsContext = () => useContext(ActionsContext);
