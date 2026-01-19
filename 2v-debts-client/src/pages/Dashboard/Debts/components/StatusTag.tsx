// antd component
import { Tag } from 'antd';
import { debtStatus } from '@/types/debts.types';

export default function StatusTag(props: { status: string }) {
  type colorProps = {
    title: string;
    color: string;
  };

  const colors: Record<debtStatus, colorProps> = {
    PENDING: {
      title: 'Pendiente',
      color: 'orange',
    },
    COMPLETED: {
      title: 'Completado',
      color: 'green',
    },
    DELETED: {
      title: 'Eliminada',
      color: 'red',
    },
  };

  const statusSelected =
    colors[(props?.status ?? debtStatus.PENDING) as debtStatus];

  return (
    <Tag variant='outlined' color={statusSelected.color}>
      {statusSelected.title}
    </Tag>
  );
}
