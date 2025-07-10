import {appAPI, nestServerPath} from "../../../api";
import {ICompany} from "../../../models/iCompanies";
import {INewMachineryDoc} from "../../../models/IMachineryDoc";

export const machineryDocsPath = `${nestServerPath}/companies`;

export const machineryDocsAPI = {
    add: async (machineryDoc: INewMachineryDoc) => {
        const res = await appAPI.post(machineryDocsPath, machineryDoc);
        return res.data;
    },

};