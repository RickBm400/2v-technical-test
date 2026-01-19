export enum debtStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  DELETED = 'DELETED',
}

export interface Debt {
  id: string;
  status: debtStatus;
  total_debt: number;
  total_paid: number;
  title: string;
  description: string;
  debtor_id: string;
  creditor_id: string;
  due_date: string | Date | undefined;
}
