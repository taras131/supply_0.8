import {ICurrentMachinery, INewMachinery} from "../models/iMachinery";
import {INewProblem, IProblem} from "../models/IProblems";
import {INewTask} from "../models/IMachineryTasks";
import {ILoginData, IRegisterData} from "../models/iAuth";
import {INewCompany} from "../models/iCompanies";
import {IUser} from "../models/IUser";
import {INewMachineryDoc} from "../models/IMachineryDoc";

export type ValidationErrors = { [key: string]: string | null };

export const machineryValidate = (machinery: ICurrentMachinery | INewMachinery) => {
    const errors: ValidationErrors = {};
    if (machinery) {
        if (machinery.brand.trim().length < 2) errors.brand = "Марка должена быть не менее 2 символов";
        if (!machinery.brand) errors.brand = "Марка обязателена для заполнения";
        if (machinery.brand.trim().length > 32) errors.brand = "Марка должена быть длиннее 32 символов";
        if (machinery.model.trim().length < 2) errors.model = "Модель должна быть не менее 2 символов";
        if (!machinery.model) errors.model = "Модель обязательна для заполнения";
        if (machinery.model.trim().length > 32) errors.model = "Модель должна быть не длиннее 32 символов";
        if (machinery.type_id < 0) errors.type_id = "Выберите тип техники";
        if (machinery.engine_type_id < 0) errors.engine_type_id = "Выберите тип двигателя";
        if (machinery.year_manufacture < 0) errors.year_manufacture = "Выберите год производства";
        // if (machinery.operating_type_id < 0) errors.operating_type_id = "Выберите еденицы измерения";
        if (machinery.vin.trim().length > 32) errors.vin = "VIN должен быть не длиннее 32 символов";
        if (machinery.state_number.trim().length > 32)
            errors.state_number = "Гос. номер должен быть не длиннее 32 символов";
        if (machinery.working_equipment.trim().length > 32)
            errors.working_equipment = "Поле должно быть не длиннее 32 символов";
        if (machinery.frame_number?.trim().length > 32) errors.frame_number = "Поле должно быть не длиннее 32 символов";
        if (machinery.engine_brand.trim().length > 32)
            errors.engine_brand = "Марка двигателя должна быть не длиннее 32 символов";
        if (machinery.engine_model.trim().length > 32)
            errors.engine_model = "Модель двигателя должна быть не длиннее 32 символов";
        if (machinery.transmission_brand.trim().length > 32)
            errors.transmission_brand = "Марка трансмиссии должна быть не длиннее 32 символов";
        if (machinery.transmission_model.trim().length > 32)
            errors.transmission_model = "Модель трансмиссии должна быть не длиннее 32 символов";
    }
    return errors;
};

export const docValidate = (doc: INewMachineryDoc) => {
    const errors: ValidationErrors = {};
    if (doc.title.length < 2) errors.title = "Название должно быть не менее 2 символов";
    if (doc.title.length > 32) errors.title = "Название должно быть не длиннее 32 символов";
    return errors;
};

export const problemValidate = (problem: IProblem | INewProblem) => {
    const errors: ValidationErrors = {};
    if (problem.category_id < 0) errors.category_id = "Выберите категорию";
    if (+problem.operating === 0 && +problem.odometer === 0) {
        errors.operating = "Заполните км или часы";
        errors.odometer = "Заполните км или часы";
    }
    if (problem.operating > 1000000000) errors.operating = "Слишком большое значение";
    if (problem.odometer > 1000000000) errors.odometer = "Слишком большое значение";
    if (problem.title.length < 3) errors.title = "Не менее 3 символов";
    if (problem.title.length === 0) errors.title = "Заголовок должен быть";
    if (problem.title.length > 32) errors.title = "Не более 32 символов";
    if (problem.description.length === 0) errors.description = "Описание должно быть";
    if (problem.description.length < 3) errors.description = "Описание должно быть не менее 2 символов";
    if (problem.description.length > 400) errors.description = "Описание должно быть не длиннее 400 символов";
    return errors;
};

export const newTaskValidate = (task: INewTask) => {
    const errors: ValidationErrors = {};
    if (task.title.length < 3) errors.title = "Не менее 3 символов";
    if (task.title.length === 0) errors.title = "Заголовок должен быть";
    if (task.title.length > 32) errors.title = "Не более 32 символов";
    if (task.description.length === 0) errors.description = "Описание должно быть";
    if (task.description.length < 3) errors.description = "Описание должно быть не менее 2 символов";
    if (task.description.length > 400) errors.description = "Описание должно быть не длиннее 400 символов";
    if (task.priority_id < 0) errors.priority_id = "Выбирите приоритет";
    if (task.type_id < 0) errors.type_id = "Выбирите тип работ";
    return errors;
};

export const taskValidate = (task: INewTask) => {
    const errors: ValidationErrors = {};
    if (task.title.length < 3) errors.title = "Не менее 3 символов";
    if (task.title.length === 0) errors.title = "Заголовок должен быть";
    if (task.title.length > 32) errors.title = "Не более 32 символов";
    if (task.description.length === 0) errors.description = "Описание должно быть";
    if (task.description.length < 3) errors.description = "Описание должно быть не менее 2 символов";
    if (task.description.length > 400) errors.description = "Описание должно быть не длиннее 400 символов";
    if (task.priority_id < 0) errors.priority_id = "Выбирите приоритет";
    if (task.type_id < 0) errors.type_id = "Выбирите тип работ";
    return errors;
};

export const loginValidate = (user: ILoginData) => {
    const errors: ValidationErrors = {};
    if (user.email.length === 0) {
        errors.email = "Email обязателен";
    } else {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(user.email)) {
            errors.email = "Некорректный формат email";
        } else if (user.email.length < 3) {
            errors.email = "Не менее 3 символов";
        }
    }
    if (user.password.length === 0) errors.password = "Пароль должен быть";
    if (user.password.length < 4) errors.password = "Пароль должен быть не короче 4 символов";
    if (user.password.length > 32) errors.password = "Пароль должен быть не длинее 32 символов";
    return errors;
};

export const registerValidate = (user: IRegisterData, companyName: string) => {
    const errors: ValidationErrors = loginValidate(user);
    if (user.first_name.length === 0) errors.first_name = "Имя должен быть";
    if (user.first_name.length < 2) errors.first_name = "Имя должен быть не короче 2 символов";
    if (user.first_name.length > 32) errors.first_name = "Имя должно быть не длинее 32 символов";
    if (user.middle_name.length === 0) errors.middle_name = "Отчество должено быть";
    if (user.middle_name.length < 2) errors.middle_name = "Отчество должено быть не короче 2 символов";
    if (user.middle_name.length > 32) errors.middle_name = "Отчество должно быть не длинее 32 символов";
    if (user.role_id < 1) errors.role_id = "Выберите роль";
    if (user.tab === "oldCompany") {
        if (!user.company_id || user.company_id.length < 2) {
            errors.company_id = "Укажите ключ существующей компании";
        } else if (!companyName) { // ← только так!
            errors.company_id = "Компания не найдена по введённому ключу";
        }
    }
    if (user.tab === "newCompany") {
        if (!user.company_name || user.company_name.length < 2)
            errors.company_name = "Укажите имя новой компании";
    }
    return errors;
};

export const companyValidate = (company: INewCompany) => {
    const errors: ValidationErrors = {};
    if (company.name.length < 2) errors.name = "Название должно быть не короче 2 символов";
    if (company.name.length > 40) errors.name = "Название должно быть не длинее 40 символов";
    return errors;
};

export const userUpdateValidate = (user: IUser) => {
    const errors: ValidationErrors = {};
    if (user.first_name.length === 0) errors.first_name = "Имя должен быть";
    if (user.first_name.length < 2) errors.first_name = "Имя должен быть не короче 2 символов";
    if (user.first_name.length > 32) errors.first_name = "Имя должно быть не длинее 32 символов";
    if (user.middle_name.length === 0) errors.middle_name = "Отчество должено быть";
    if (user.middle_name.length < 2) errors.middle_name = "Отчество должено быть не короче 2 символов";
    if (user.middle_name.length > 32) errors.middle_name = "Отчество должно быть не длинее 32 символов";
    if (user.email.length === 0) errors.email = "email должен быть";
    // if (user.role_id < 0) errors.role_id = "Выберите роль";

    return errors;
};