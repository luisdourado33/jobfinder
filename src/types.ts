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