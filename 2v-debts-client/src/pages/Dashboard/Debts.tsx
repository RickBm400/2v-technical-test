// mdi icons
import Icon from '@mdi/react';
import { mdiSearchWeb } from '@mdi/js';

// antd components
import { Input, Select, Button } from 'antd';
import { useState } from 'react';

export default function Debts() {
  const [openTimeline, setOpenTimeline] = useState(false);

  const toogleLayout = () => {
    setOpenTimeline(!openTimeline);
  };

  return (
    <div className='h-screen w-screen p-8 grid grid-cols-12 gap-8 justify-center'>
      <div className={openTimeline ? `col-span-8` : 'col-span-12'}>
        <h4>Deudas pendientes</h4>
        <div className='flex gap-2'>
          <Input
            placeholder='Buscar deuda'
            suffix={<Icon path={mdiSearchWeb} size={1}></Icon>}
          />
          <Select
            style={{ width: 160 }}
            options={[
              { value: 'PENDING', label: 'Pendientes' },
              { value: 'COMPLETED', label: 'Pagadas' },
            ]}
          ></Select>
          <Button color='primary' variant='solid' onClick={toogleLayout}>
            + Agregar deuda
          </Button>
        </div>
      </div>
      <div
        className={`bg-blue-300 col-span-4 ${openTimeline ? 'block' : 'hidden'}`}
      ></div>
    </div>
  );
}
