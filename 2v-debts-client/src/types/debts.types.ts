export enum debtStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
}

export interface debtsListDataType {
  title: string;
  description: string;
  amount: number;
  dueDate?: string;
  status: debtStatus | string;
  id?: number | string;
}
