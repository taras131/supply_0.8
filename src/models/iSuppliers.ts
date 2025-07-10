import {defaultCompany, INewCompany} from "./iCompanies";

export interface INewSupplier extends INewCompany{
  phone: string;
  manager_email: string;
  accounts_department_email: string;
}

export interface ISupplier extends INewSupplier {
  id: string;
}

export const defaultSupplier : INewSupplier = {
 ...defaultCompany,
  manager_email: "",
  accounts_department_email: "",
  phone: "",
};