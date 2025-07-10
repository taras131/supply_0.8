export interface INewMachineryDoc {
    title: string;
    machinery_id: string;
    file_name: string;
}

export interface IMachineryDoc extends INewMachineryDoc {
    id: string;
    created_date: int;
    updated_date: int;
}

export const emptyMachineryDoc: INewMachineryDoc = {
    title: "",
    machinery_id: "",
    file_name: "",
};