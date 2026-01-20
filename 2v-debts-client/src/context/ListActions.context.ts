import type { debtsListDataType } from '@/types/debts.types';
import { createContext, useContext } from 'react';

export const ActionsContext = createContext<{
  openTimeline: boolean;
  setOpenTimeline: (open: boolean) => void;
  debtListData: debtsListDataType | null;
  setdebtListData: (data: debtsListDataType | null) => void;
  modalEditorMode: 'CREATE' | 'EDIT';
  setModalEditorMode: (model: 'CREATE' | 'EDIT') => void;
}>({
  openTimeline: false,
  setOpenTimeline: () => {},
  debtListData: null,
  setdebtListData: () => {},
  modalEditorMode: 'CREATE',
  setModalEditorMode: () => {},
});

export const useDebtListActionsContext = () => useContext(ActionsContext);
