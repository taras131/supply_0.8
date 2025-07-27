import React, {FC, useEffect, useState} from "react";
import {ButtonGroup, Drawer, Stack, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {useEditor} from "../../../hooks/useEditor";
import {problemValidate} from "../../../utils/validators";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {fetchUpdateMachineryProblem} from "../model/actions";
import {defaultProblem, IMachineryProblem, problemStatus} from "../../../models/IMachineryProblems";
import {setCurrentProblem} from "../model/slice";
import {selectCurrentProblem} from "../model/selectors";
import ProblemView from "./ProblemView";
import ButtonsEditCancelSave from "../../../components/common/ButtonsEditCancelSave";
import ProblemDetailsPhotos from "./ProblemDetailsPhotos";
import CreateUpdateUserInfo from "../../../components/common/CreateUpdateUserInfo";
import RelatedTasks from "../../machinery_tasks/ui/RelatedTasks";
import Button from "@mui/material/Button";
import {fetchUpdateMachineryTask} from "../../machinery_tasks/model/actions";

const ProblemDetails: FC = () => {
    const dispatch = useAppDispatch();
    const [isEditMode, setIsEditMode] = useState(false);
    const currentProblem = useAppSelector(selectCurrentProblem);
    const {editedValue, errors, handleFieldChange, setEditedValue} = useEditor<IMachineryProblem>({
        initialValue: currentProblem || defaultProblem,
        validate: problemValidate,
    });
    useEffect(() => {
        if (currentProblem) {
            setEditedValue(currentProblem);
        }
    }, [currentProblem]);
    if (!currentProblem) return null;
    const onClose = () => {
        dispatch(setCurrentProblem(null));
    };
    const toggleIsEditMode = () => {
        setIsEditMode((prev) => !prev);
    };

    const saveClickHandler = () => {
        dispatch(fetchUpdateMachineryProblem(editedValue));
        toggleIsEditMode();
    };
    const statusChangeHandler = (statusId: number) => {
        dispatch(fetchUpdateMachineryProblem({...currentProblem, status_id: statusId}));
    };
    return (
        <Drawer anchor="right" open={!!currentProblem} onClose={onClose}>
            <Box
                sx={{
                    padding: "28px",
                    width: "500px",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    gap: "24px",
                }}
            >
                <Stack direction="row" spacing={2} justifyContent={"space-between"} alignItems={"center"}>
                    <Typography variant={"h5"} sx={{marginBottom: "16px"}}>Детали:</Typography>
                    <ButtonGroup size="small" aria-label="Small button group">
                        <Button variant={currentProblem.status_id === 1 ? "contained" : "outlined"}
                                onClick={() => statusChangeHandler(1)}>
                            {problemStatus[0].title}
                        </Button>
                        <Button variant={currentProblem.status_id === 2 ? "contained" : "outlined"}
                                onClick={() => statusChangeHandler(2)}>
                            {problemStatus[1].title}
                        </Button>
                        <Button variant={currentProblem.status_id === 3 ? "contained" : "outlined"}
                                onClick={() => statusChangeHandler(3)}>
                            {problemStatus[2].title}
                        </Button>
                    </ButtonGroup>
                </Stack>
                {!isEditMode && (
                    <ProblemDetailsPhotos currentProblemPhotos={currentProblem.photos}/>

                )}
                <Stack spacing={3} sx={{position: "relative", paddingTop: "32px"}}>
                    <ProblemView
                        problem={editedValue}
                        errors={errors}
                        fieldChangeHandler={handleFieldChange}
                        isEditMode={isEditMode}
                    />
                    <ButtonsEditCancelSave
                        isEditMode={isEditMode}
                        isValid={!Object.keys(errors).length}
                        toggleIsEditMode={toggleIsEditMode}
                        updateHandler={saveClickHandler}
                        cancelUpdateHandler={toggleIsEditMode}
                    />
                </Stack>
                {!isEditMode && (
                    <>
                        {currentProblem.tasks && (<RelatedTasks
                            machineryId={currentProblem.machinery_id}
                            tasks={currentProblem.tasks}
                            problemId={currentProblem.id}
                        />)}
                        <Stack spacing={1}>
                            <CreateUpdateUserInfo
                                author={currentProblem.author}
                                updatedAuthor={currentProblem.updated_author || null}
                                createdAT={currentProblem.created_at}
                                updatedAt={currentProblem.updated_at || null}
                            />
                        </Stack>
                    </>
                )}
            </Box>
        </Drawer>
    );
};

export default ProblemDetails;
