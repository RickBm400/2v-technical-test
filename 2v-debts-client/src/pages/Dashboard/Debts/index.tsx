// mdi icons
import Icon from '@mdi/react';
import { mdiSearchWeb } from '@mdi/js';
import NewDebtModal from './components/NewDebtModal';

// antd components
import { Input, Select, Button } from 'antd';

// Debts components
import ListDebts from './components/ListDebts';
import { useDebtListActionsContext } from '@/context/ListActions.context';
import DebtInfoCard from './components/DebtInfoCard';
import { getDebtsPaginatedQuery } from '@/network/queries/debts.query';
import { useState } from 'react';
import { Navigate } from 'react-router';
import type { debtStatus } from '@/types/debts.types';

export default function Debts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [currentStatus, setCurrentStatus] = useState<debtStatus | 'ALL'>('ALL');
  // const [debtList, setDebtsList] = useState<any | null>(null);
  const { openTimeline, setOpenModal, openModal } = useDebtListActionsContext();
  const { data, isLoading, isError, refetch } = getDebtsPaginatedQuery({
    page: currentPage,
    limit: pageSize,
    ...(currentStatus != 'ALL' ? { status: currentStatus } : {}),
  } as any);

  if (isLoading) {
    return <p>Loading character </p>;
  }

  if (isError) {
    return <Navigate to={'/login'} />;
  }

  const handlePaginationChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const handleSelectChange = (value: string, ola: string) => {
    console.log(value);
    console.log(ola);
    setCurrentStatus(value as debtStatus | 'ALL');
    setCurrentPage(1);
    refetch({
      page: 1,
      limit: 10,
      ...(value != 'ALL' ? { status: value } : {}),
    } as any);
  };

  const debtsFilterOptions: Array<Record<string, string>> = [
    { value: 'ALL', label: 'Todas' },
    { value: 'PENDING', label: 'Pendientes' },
    { value: 'COMPLETED', label: 'Pagadas' },
  ];

  return (
    <div className='h-screen w-screen p-8 grid grid-cols-12 gap-8 justify-center'>
      <div
        className={` space-y-8 ${openTimeline ? `col-span-8` : 'col-span-12'}`}
      >
        <h4 className='text-[2rem] font-bold'>Deudas pendientes</h4>
        <div className='flex gap-2'>
          <Input
            placeholder='Buscar deuda'
            suffix={<Icon path={mdiSearchWeb} size={1}></Icon>}
          />
          <Select
            value={currentStatus}
            style={{ width: 160 }}
            options={debtsFilterOptions}
            onClick={(e) => e.preventDefault()}
            onChange={() => handleSelectChange}
          ></Select>
          <Button
            color='primary'
            variant='solid'
            onClick={() => setOpenModal(true)}
          >
            + Agregar deuda
          </Button>
        </div>
        <div id='debts_list'>
          <ListDebts
            debtsData={data.data}
            currentPage={currentPage}
            pageSize={pageSize}
            handlePaginationChange={handlePaginationChange}
          ></ListDebts>
        </div>
      </div>
      <div className={` col-span-4 ${openTimeline ? 'block' : 'hidden'}`}>
        <DebtInfoCard />
      </div>
      <NewDebtModal open={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
}
