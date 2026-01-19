export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  deletedAt: string | Date | null;
}
