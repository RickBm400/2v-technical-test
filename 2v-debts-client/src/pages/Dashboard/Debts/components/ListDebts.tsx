// antd components
import { mdiDotsVertical } from '@mdi/js';
import Icon from '@mdi/react';
import { Table, Button } from 'antd';
import type { TableProps } from 'antd';
import StatusTag from './StatusTag';

// local types
import type { debtsListDataType } from '@/types/debts.types';
import DropdownAction from './ActionsDropdown';
import NewDebtModal from './NewDebtModal';
import { useState } from 'react';

interface componentProps {
  debtsData: { limit: number; total: number; data: debtsListDataType[] };
  currentPage: number;
  pageSize: number;
  handlePaginationChange: (page: number, pageSize: number) => void;
}

export default function ListDebts(props: componentProps) {
  const [editorModal, setEditorModal] = useState(false);
  const [debtDataToEdit, setDebtDataToEdit] = useState<debtsListDataType>();

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
      dataIndex: 'total_debt',
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
      render: (item) => (
        <DropdownAction
          data={item}
          methods={{ setEditorModal, setDebtDataToEdit }}
        >
          <Button color='green' shape='circle'>
            <Icon path={mdiDotsVertical} size={0.9} />
          </Button>
        </DropdownAction>
      ),
    },
  ];

  const tableData =
    props.debtsData?.data.map((debt, index) => ({
      ...debt,
      key: index,
    })) || [];

  return (
    <div>
      <Table<debtsListDataType>
        dataSource={tableData}
        columns={columns}
        pagination={{
          current: props.currentPage,
          pageSize: props.debtsData?.limit,
          total: props.debtsData?.total as any,
          onChange: props.handlePaginationChange,
          showSizeChanger: true,
          pageSizeOptions: ['5', '10', '20', '50'],
          showTotal: (total) => `Total ${total} deudas`,
        }}
      ></Table>
      <NewDebtModal
        open={editorModal}
        onClose={() => {
          setEditorModal(false);
          props.handlePaginationChange(1, 10);
        }}
        data={debtDataToEdit}
      />
    </div>
  );
}
