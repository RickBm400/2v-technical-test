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
  debtorId?: string;
  creditorId?: string;
  dueDate?: string | Date | undefined;
}
