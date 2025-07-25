export interface IUser {
    id: string;
    created_date: string;
    updated_date: string;
    email: string;
    telegram: string,
    phone: string,
    first_name: string;
    middle_name: string;
    role_id: number;
    status_id: number;
    company_id: string;
    avatar_path: string;
}

export interface IUserWithPassport extends IUser {
    passport_series?: string;
    passport_number?: string;
    passport_issued_date?: string;
    passport_issued_whom?: string;
}

export const defaultUser: IUserWithPassport = {
    id: "",
    created_date: "",
    updated_date: "",
    email: "",
    telegram: "",
    phone: "",
    first_name: "",
    middle_name: "",
    role_id: -1,
    status_id: 1,
    company_id: "",
    avatar_path: "",
    passport_series: "",
    passport_number: "",
    passport_issued_date: "",
    passport_issued_whom: "",
};