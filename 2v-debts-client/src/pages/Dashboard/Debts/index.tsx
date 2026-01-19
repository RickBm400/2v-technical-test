// mdi icons
import Icon from '@mdi/react';
import { mdiSearchWeb } from '@mdi/js';
import NewDebtModal from './components/NewDebtModal';

// antd components
import { Input, Select, Button } from 'antd';
import { useState } from 'react';

// Debts components
import ListDebts from './components/ListDebts';

export default function Debts() {
  const [openTimeline, setOpenTimeline] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <div className='h-screen w-screen p-8 grid grid-cols-12 gap-8 justify-center'>
      <div
        className={` space-y-8 ${openTimeline ? `col-span-8` : 'col-span-12'}`}
      >
        <h4>Deudas pendientes</h4>
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
            timelineAction={() => setOpenTimeline(!openTimeline)}
          ></ListDebts>
        </div>
      </div>
      <div
        className={`bg-blue-300 col-span-4 ${openTimeline ? 'block' : 'hidden'}`}
      ></div>
      <NewDebtModal open={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
}
