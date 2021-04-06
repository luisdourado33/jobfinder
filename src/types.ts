export interface IFormValues {
  email: string;
  password: string;
  rememberCredentials: boolean;
}

export interface IUser {
  id?: number;
  username: string;
  email: string;
  password: string;
  passwordRepeat: string;
  role_id: number;
  role_name?: string;
  cpf: string;
  birthDate: Date | null | string;
  status?: boolean;
}

export type Role = {
  id: number;
  name: string;
  status: boolean;
  created_at: Date;
  updated_at: Date;
}

export type Company = {
  id: number;
  name: string;
  status: boolean;
  created_at: Date;
  updated_at: Date;
}