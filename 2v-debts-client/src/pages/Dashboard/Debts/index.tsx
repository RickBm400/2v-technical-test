// mdi icons
import Icon from '@mdi/react';
import { mdiSearchWeb } from '@mdi/js';
import NewDebtModal from './components/NewDebtModal';

// antd components
import { Input, Select, Button } from 'antd';

// Debts components
import ListDebts from './components/ListDebts';
import { useListActionsContext } from '@/context/ListActions.context';
import DebtInfoCard from './components/DebtInfoCard';
import { getDebtsPaginatedQuery } from '@/network/queries/debts.query';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router';

export default function Debts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [debtList, setDebtsList] = useState<any | null>(null);
  const { openTimeline, setOpenModal, openModal } = useListActionsContext();
  const { data, isLoading, isError } = getDebtsPaginatedQuery({
    page: currentPage,
  } as any);

  useEffect(() => {
    if (data) {
      console.log(data.data);
      const debts = data.data;
      setDebtsList(debts);
    }
  }, [data]);

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
            defaultValue={'ALL'}
            style={{ width: 160 }}
            options={[
              { value: 'ALL', label: 'Todas' },
              { value: 'PENDING', label: 'Pendientes' },
              { value: 'COMPLETED', label: 'Pagadas' },
            ]}
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
            debtsData={debtList}
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
