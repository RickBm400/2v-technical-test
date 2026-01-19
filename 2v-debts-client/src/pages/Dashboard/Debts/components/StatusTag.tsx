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
      color: 'red',
    },
    COMPLETED: {
      title: 'Completado',
      color: 'green',
    },
  };

  return (
    <Tag variant='outlined' color={colors[props.status as debtStatus].color}>
      {colors[props.status as debtStatus].title}
    </Tag>
  );
}
