import React, {FC, useEffect, useState} from "react";
import {Drawer, Stack, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {useEditor} from "../../../hooks/useEditor";
import {problemValidate} from "../../../utils/validators";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {fetchUpdateMachineryProblem} from "../model/actions";
import {defaultProblem, IMachineryProblem} from "../../../models/IMachineryProblems";
import {setCurrentProblem} from "../model/slice";
import {selectCurrentProblem} from "../model/selectors";
import ProblemView from "./ProblemView";
import ButtonsEditCancelSave from "../../../components/common/ButtonsEditCancelSave";
import ProblemDetailsPhotos from "./ProblemDetailsPhotos";
import CreateUpdateUserInfo from "../../../components/common/CreateUpdateUserInfo";
import RelatedTasks from "../../machinery_tasks/ui/RelatedTasks";

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
                <Typography variant={"h5"} sx={{marginBottom: "16px"}}>Детали проблемы:</Typography>
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
