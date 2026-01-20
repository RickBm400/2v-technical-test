import { useDebtListActionsContext } from '@/context/ListActions.context';
import { deleteDebtMutation } from '@/network/queries/debts.query';
import { Dropdown, message, type MenuProps } from 'antd';
import type React from 'react';

export default function DropdownAction(props: {
  children: React.ReactNode;
  data: any;
  methods: Record<string, React.Dispatch<React.SetStateAction<any>>>;
}) {
  const { setOpenTimeline, openTimeline, setdebtListData, setModalEditorMode } =
    useDebtListActionsContext();
  const { mutate: deleteMutation } = deleteDebtMutation();

  const items: MenuProps['items'] = [
    {
      label: 'Editar deuda',
      key: 'edit',
      onClick: () => {
        setModalEditorMode('EDIT');
        props.methods.setDebtDataToEdit(props.data);
        props.methods.setEditorModal(true);
      },
    },
    {
      label: 'Eliminar deuda',
      key: 'delete',
      onClick: () => {
        deleteMutation(props.data.id);
        message.success('Registro eliminado');
      },
    },
    { label: 'Pagar deuda', key: 'payment' },
    {
      label: 'Movimientos',
      key: 'movements',
      onClick: () => {
        setdebtListData(props.data);
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
