export enum MovementType {
  CREATION = 'CREATION',
  PAYMENT = 'PAYMENT',
  CANCELLATION = 'CANCELLATION',
}

export interface Movement {
  id: string;
  user_id: string;
  debt_id: string;
  created_at: string;
  created_by: string;
  type: MovementType;
  amount: number;
  previous_amount: number;
  new_amount: number;
}
