import { useListActionsContext } from '@/context/ListActions.context';
import { Dropdown, type MenuProps } from 'antd';
import type React from 'react';

export default function DropdownAction(props: {
  children: React.ReactNode;
  data: any;
}) {
  const { setOpenTimeline, openTimeline, setDebtData } =
    useListActionsContext();

  const items: MenuProps['items'] = [
    { label: 'Editar deuda', key: 'edit' },
    { label: 'Eliminar deuda', key: 'delete' },
    { label: 'Pagar deuda', key: 'payment' },
    {
      label: 'Movimientos',
      key: 'movements',
      onClick: () => {
        setDebtData(props.data);
        if (!openTimeline) {
          setOpenTimeline(true);
        }
      },
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={['click']}>
      {props.children}
    </Dropdown>
  );
}
