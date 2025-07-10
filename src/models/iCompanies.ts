export interface INewCompany {
    name: string;
    owner_email: string;
    logo_path: string;
    INN: string;
    city: string;
    kpp: string;
    legal_address: string;
    bik: string;
    correspondent_account: string;
    payment_account: string;
    bank: string;
    okogu: string;
    ogrn: string;
    okpo: string;
    okato: string;
}

export interface ICompany extends INewCompany {
    id: string;
}

export const defaultCompany: INewCompany = {
    name: "",
    logo_path: "",
    owner_email: "",
    INN: "",
    city: "",
    kpp: "",
    legal_address: "",
    bik: "",
    correspondent_account: "",
    payment_account: "",
    bank: "",
    okogu: "",
    ogrn: "",
    okpo: "",
    okato: "",
};
