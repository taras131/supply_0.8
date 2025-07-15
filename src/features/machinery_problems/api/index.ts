import {appAPI, nestServerPath} from "../../../api";
import {IMachineryProblem, INewMachineryProblem} from "../../../models/IMachineryProblems";

const machineryProblemsPath = `${nestServerPath}/machinery-problem`;

export const machineryProblemsAPI = {
    add: async (machinery_id: string,newProblem: INewMachineryProblem) => {
        const problem_in = {...newProblem, machinery_id};
        const res = await appAPI.post(machineryProblemsPath, problem_in);
        return await res.data;
    },
    update: async (problem: INewMachineryProblem) => {
        console.log(problem);
        const res = await appAPI.put(machineryProblemsPath, problem);
        console.log(res);
        console.log(res.data);
        return await res.data;
    },
    delete: async (problemId: string) => {
        const res = await appAPI.delete(`${machineryProblemsPath}/${problemId}`);
        return await res.data;
    },
};