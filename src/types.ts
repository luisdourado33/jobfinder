export interface IFormValues {
  email: string;
  password: string;
  rememberCredentials: boolean;
}
export interface IFormNewJob {
  user_id: number;
  title: string;
  description: string;
  period: string;
  location: string;
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
  access?: number;
  jobsCreated?: number;
  jobsSigned?: number;
  birthDate: Date | null | string;
  status?: boolean;
}

export type Role = {
  id: number;
  name: string;
  status: boolean;
  created_at: Date;
  updated_at: Date;
};

export type Company = {
  id: number;
  name: string;
  status: boolean;
  created_at: Date;
  updated_at: Date;
};

export type IJob = {
  id?: number;
  user_id?: number;
  title: string;
  description: string;
  period: string;
  location: string;
  created_at: string;
  updated_at: string;
  user?: { username: string };
};
