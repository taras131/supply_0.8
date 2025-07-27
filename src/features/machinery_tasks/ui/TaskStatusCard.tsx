import React, {FC} from "react";
import Card from "@mui/material/Card";
import TitleWithValue from "../../../components/TitleWithValue";
import {convertMillisecondsToDate} from "../../../utils/services";
import {ITask} from "../../../models/IMachineryTasks";
import CreateUpdateUserInfo from "../../../components/common/CreateUpdateUserInfo";
import {useAppSelector} from "../../../hooks/redux";
import {selectCurrentMachineryTitle} from "../../machinery/model/selectors";
import RelatedProblem from "../../machinery_problems/ui/RelatedProblem";

interface IProps {
    currentTask: ITask;
}

const TaskStatusCard: FC<IProps> = ({currentTask}) => {
    const currentMachineryTitle = useAppSelector(selectCurrentMachineryTitle);
    return (
        <Card sx={{
            padding: "24px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(250px, 100%), 1fr))",
            gap: "24px",
        }}>

            <TitleWithValue title={"Срок выполнения:"}
                            value={convertMillisecondsToDate(+currentTask.due_date)}/>
            <TitleWithValue title={"Техника:"}
                            value={currentMachineryTitle}/>
            <CreateUpdateUserInfo author={currentTask.author}
                                  createdAT={currentTask.created_at}
                                  updatedAuthor={currentTask.updated_author ?? null}
                                  updatedAt={currentTask.updated_at || null}/>
            {currentTask.problem && (
                <TitleWithValue title={"Основание:"}  sx={{ gridColumn: "span 2" }}>
                    <RelatedProblem problem={currentTask.problem}/>
                </TitleWithValue>
            )}
        </Card>
    );
};

export default TaskStatusCard;