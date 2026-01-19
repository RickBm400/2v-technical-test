import { useState } from 'react';
import { ActionsContext } from './ListActions.context';
import type { debtsListDataType } from '@/types/debts.types';

const ListActionsProvider = ({ children }: { children: React.ReactNode }) => {
  const [openTimeline, setOpenTimeline] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [debtData, setDebtData] = useState<debtsListDataType | null>(null);

  const value = {
    openTimeline,
    setOpenTimeline,
    openModal,
    setOpenModal,
    debtData,
    setDebtData,
  };

  return (
    <ActionsContext.Provider value={value}>{children}</ActionsContext.Provider>
  );
};

export default ListActionsProvider;
