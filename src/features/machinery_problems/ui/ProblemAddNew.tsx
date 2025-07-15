import React, {FC, useEffect} from "react";
import {Button, Drawer, Stack, Typography} from "@mui/material";
import {useEditor} from "../../../hooks/useEditor";
import {problemValidate} from "../../../utils/validators";
import {useAppDispatch} from "../../../hooks/redux";
import usePhotoManager from "../../../hooks/usePhotoManager";
import PhotosManager from "../../../components/common/PhotosManager";
import Box from "@mui/material/Box";
import {emptyProblem, INewMachineryProblem} from "../../../models/IMachineryProblems";
import {fetchAddMachineryProblem} from "../model/actions";
import ProblemView from "./ProblemView";

interface IProps {
    isOpen: boolean;
    onClose: (event: React.KeyboardEvent | React.MouseEvent) => void;
}

const ProblemAddNew: FC<IProps> = ({isOpen, onClose}) => {
    const dispatch = useAppDispatch();
    const {tempFiles, onAddPhoto, onDeletePhoto, clearPhotos} = usePhotoManager();
    const {editedValue, errors, handleFieldChange, resetValue} = useEditor<INewMachineryProblem>({
        initialValue: JSON.parse(JSON.stringify(emptyProblem)),
        validate: problemValidate,
    });
    useEffect(() => {
        return () => clearPhotos();
    }, []);
    const addClickHandler = async () => {
        const newFiles = [...tempFiles.map((fileData) => fileData.file)];
        clearPhotos();
        resetValue();
        await dispatch(
            fetchAddMachineryProblem({
                newProblem: {
                    ...editedValue
                    , odometer: +editedValue.odometer
                    , operating: +editedValue.operating,
                },
                files: newFiles,
            }),
        );
        onClose();
    };
    return (
        <Drawer anchor="right" open={isOpen} onClose={onClose}>
            <Box
                sx={{
                    padding: "16px",
                    maxWidth: "500px",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                }}
            >
                <Typography color="primary" variant="h2" fontSize={"20px"} fontWeight={600} sx={{marginBottom: "8px"}}>
                    Новая проблема
                </Typography>
                <ProblemView problem={editedValue}
                             errors={errors}
                             fieldChangeHandler={handleFieldChange}
                             isEditMode={true}/>
                <PhotosManager
                    onAddPhoto={onAddPhoto}
                    onDeletePhoto={onDeletePhoto}
                    photosPaths={tempFiles.map((fileData) => fileData.preview)}
                />
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Button onClick={onClose} variant="outlined">
                        Назад
                    </Button>
                    <Button onClick={addClickHandler} variant="contained" color="success"
                            disabled={!!Object.keys(errors).length}>
                        Сохранить
                    </Button>
                </Stack>
            </Box>
        </Drawer>
    );
};

export default ProblemAddNew;
