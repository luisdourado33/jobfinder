export interface IFormValues {
  email: string;
  password: string;
  rememberCredentials: boolean;
}

export interface IFormSignUp {
  fullName: string;
  email: string;
  password: string;
  passwordRepeat: string;
  occupation: string;
  cpf: string;
  birthDate: Date | null;
}

export type Role = {
  id: number;
  name: string;
  status: boolean;
  created_at: Date;
  updated_at: Date;
}