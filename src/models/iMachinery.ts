import {MachineryStatus} from "utils/const";
import {IComment} from "./iComents";
import {ITask} from "./IMachineryTasks";
import {IProblem} from "./IProblems";
import {IMachineryDoc} from "./IMachineryDoc";
import {IUser} from "./IUser";

export type MachineryStatusType = (typeof MachineryStatus)[keyof typeof MachineryStatus];

export interface INewMachinery {
    brand: string;
    model: string;
    year_manufacture: string;
    type_id: number;
    engine_type_id: number;
    vin: string;
    state_number: string;
    status: MachineryStatusType;
    photos: string[];
    traction_type_id: number;
    transmission_type_id: number;
    operating_type_id: number;
    working_equipment: string;
    engine_brand: string;
    engine_model: string;
    transmission_brand: string;
    transmission_model: string;
    frame_number: string;
}

export interface IMachinery extends INewMachinery {
    id: string;
    comments?: IComment[];
    author_id: number;
    author: IUser;
    updated_author: IUser;
    created_at: string;
    updated_at: string;
}

export interface ICurrentMachinery extends IMachinery {
    docs: IMachineryDoc[];
    tasks: ITask[];
    problems: IProblem[];
}

export interface IDoc {
    docTitle: string;
}


export const emptyMachinery: INewMachinery = {
    brand: "",
    model: "",
    year_manufacture: "-1",
    type_id: -1,
    engine_type_id: -1,
    operating_type_id: -1,
    vin: "",
    state_number: "",
    status: MachineryStatus.active,
    photos: [],
    traction_type_id: -1,
    transmission_type_id: -1,
    working_equipment: "",
    engine_brand: "",
    engine_model: "",
    transmission_brand: "",
    transmission_model: "",
    frame_number: "",
};

export const defaultMachinery: ICurrentMachinery = {
    ...emptyMachinery,
    id: "",
    created_date: Date.now(),
    updated_date: Date.now(),
    docs: [],
    tasks: [],
    problems: [],
};
