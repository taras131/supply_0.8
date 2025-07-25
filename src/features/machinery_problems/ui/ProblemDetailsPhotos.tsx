import React, {FC, useState} from "react";
import PhotosManager from "../../../components/common/PhotosManager";
import ButtonsEditCancel from "../../../components/common/ButtonsEditCancel";
import {nestServerPath} from "../../../api";
import {fetchDeleteMachineryProblemPhoto, fetchUploadMachineryProblemPhoto} from "../model/actions";
import {useAppDispatch} from "../../../hooks/redux";
import Box from "@mui/material/Box";

interface IProps {
    currentProblemPhotos: string []
}

const ProblemDetailsPhotos: FC<IProps> = ({currentProblemPhotos}) => {
    const dispatch = useAppDispatch();
    const [isEditMode, setIsEditMode] = useState(false);
    const toggleIsEditMode = () => {
        setIsEditMode((prev) => !prev);
    };
    const onAddPhoto = (newFile: File) => {
        dispatch(fetchUploadMachineryProblemPhoto(newFile));
    };
    const onDeletePhoto = (deletedFileIndex: number) => {
        dispatch(
            fetchDeleteMachineryProblemPhoto(currentProblemPhotos[deletedFileIndex]),
        );
    };
    const photosPaths = currentProblemPhotos?.map(photo => `${nestServerPath}/static/${photo}`);
    return (
        <Box sx={{ position: "relative" }}>
            <PhotosManager
                photosPaths={photosPaths}
                onAddPhoto={onAddPhoto}
                onDeletePhoto={onDeletePhoto}
                isViewingOnly={!isEditMode}
            />
            <ButtonsEditCancel
                isEditMode={isEditMode}
                toggleIsEditMode={toggleIsEditMode}
                cancelUpdateHandler={toggleIsEditMode}
            />
        </Box>
    );
};

export default ProblemDetailsPhotos;