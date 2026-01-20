import type { User } from './users.types';

export enum debtStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  DELETED = 'DELETED',
}

export interface debtsListDataType {
  id?: string;
  status: debtStatus | string;
  total_debt: number;
  total_paid?: number;
  title: string;
  description: string;
  // debtorId?: string;
  debtor?: string | User | null;
  creditor?: string;
  // creditor_id?: string;
  dueDate?: string | Date | undefined;
}
