import { useState } from 'react';
import { ActionsContext } from './ListActions.context';
import type { debtsListDataType } from '@/types/debts.types';

const ListActionsProvider = ({ children }: { children: React.ReactNode }) => {
  const [openTimeline, setOpenTimeline] = useState<boolean>(false);
  const [debtListData, setdebtListData] = useState<debtsListDataType | null>(
    null,
  );
  const [modalEditorMode, setModalEditorMode] = useState<'CREATE' | 'EDIT'>(
    'CREATE',
  );

  const value = {
    openTimeline,
    setOpenTimeline,
    debtListData,
    setdebtListData,
    modalEditorMode,
    setModalEditorMode,
  };

  return (
    <ActionsContext.Provider value={value}>{children}</ActionsContext.Provider>
  );
};

export default ListActionsProvider;
