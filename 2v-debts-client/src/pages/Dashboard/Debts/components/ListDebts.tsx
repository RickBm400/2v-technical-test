// antd components
import { mdiAlert } from '@mdi/js';
import Icon from '@mdi/react';
import { Table, Button } from 'antd';
import type { TableProps } from 'antd';
import StatusTag from './StatusTag';

// local types
import type { debtsListDataType } from '@/types/debts.types';

interface componentProps {
  timelineAction: () => void;
}

export default function ListDebts(props: componentProps) {
  const columns: TableProps<debtsListDataType>['columns'] = [
    {
      key: 'title',
      title: 'Deuda',
      dataIndex: 'title',
    },
    {
      key: 'description',
      title: 'Descripción',
      dataIndex: 'description',
    },
    {
      key: 'amount',
      title: 'Monto',
      align: 'center',
      dataIndex: 'amount',
      render: (amount: string) => <span>$ {amount} </span>,
    },
    {
      key: 'status',
      title: 'Estado',
      dataIndex: 'status',
      align: 'center',
      render: (status: string) => <StatusTag status={status} />,
    },
    {
      key: 'actions',
      title: 'Acciones',
      className: 'flex justify-end',
      render: () => (
        <Button color='green' onClick={props.timelineAction}>
          <Icon path={mdiAlert} size={0.9} />
        </Button>
      ),
    },
  ];

  const dataSource: debtsListDataType[] = [
    {
      title: 'Deuda1',
      description: 'Pago por la cena del viernes',
      amount: 100,
      status: 'PENDING',
    },
    {
      title: 'Deuda2',
      description: 'Pago por el café del lunes',
      amount: 200,
      status: 'COMPLETED',
    },
    {
      title: 'Deuda3',
      description: 'Pago por el café del martes',
      amount: 300,
      status: 'PENDING',
    },
    {
      title: 'Deuda3',
      description: 'Pago por el café del martes',
      amount: 300,
      status: 'PENDING',
    },
    {
      title: 'Deuda3',
      description: 'Pago por el café del martes',
      amount: 300,
      status: 'PENDING',
    },
    {
      title: 'Deuda3',
      description: 'Pago por el café del martes',
      amount: 300,
      status: 'PENDING',
    },
    {
      title: 'Deuda3',
      description: 'Pago por el café del martes',
      amount: 300,
      status: 'PENDING',
    },
    {
      title: 'Deuda3',
      description: 'Pago por el café del martes',
      amount: 300,
      status: 'PENDING',
    },
    {
      title: 'Deuda3',
      description: 'Pago por el café del martes',
      amount: 300,
      status: 'PENDING',
    },
    {
      title: 'Deuda3',
      description: 'Pago por el café del martes',
      amount: 300,
      status: 'PENDING',
    },
  ].map((debt, index) => {
    return {
      ...debt,
      key: index,
    };
  });

  return (
    <Table<debtsListDataType> dataSource={dataSource} columns={columns}></Table>
  );
}
