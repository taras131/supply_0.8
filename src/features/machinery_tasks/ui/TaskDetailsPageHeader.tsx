import React from "react";
import {Stack} from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {useAppSelector} from "../../../hooks/redux";
import {selectCurrentMachineryTitle} from "../../machinery/model/selectors";
import {useNavigate} from "react-router-dom";

const TaskDetailsPageHeader = () => {
    const navigate = useNavigate();
    const currentMachineryTitle = useAppSelector(selectCurrentMachineryTitle);
    return (
        <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Button variant="outlined" onClick={() => navigate(-1)}>
                Назад
            </Button>
            <Typography variant="h2" fontSize={"24px"} textAlign="center">
                {currentMachineryTitle}
            </Typography>
        </Stack>
    );
};

export default TaskDetailsPageHeader;