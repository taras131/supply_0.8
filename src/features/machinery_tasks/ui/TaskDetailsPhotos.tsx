import React, {FC, useState} from "react";
import PhotosManager from "../../../components/common/PhotosManager";
import {fetchDeleteTaskPhoto, fetchUploadTaskPhoto} from "../model/actions";
import ButtonsEditCancel from "../../../components/common/ButtonsEditCancel";
import Box from "@mui/material/Box";
import {useAppDispatch} from "../../../hooks/redux";
import {nestServerPath} from "../../../api";

interface IProps {
    photos: string[];
    viewType: "issue" | "result";
}

const TaskDetailsPhotos: FC<IProps> = ({photos, viewType}) => {
    const dispatch = useAppDispatch();
    const [isEditMode, setIsEditMode] = useState(false);
    const type = viewType === "issue" ? "issue_photos" : "result_photos";
    const toggleIsEditMode = () => {
        setIsEditMode(prev => !prev);
    };
    const onAddPhoto = (newFile: File) => {
        dispatch(fetchUploadTaskPhoto({file: newFile, type}));
    };
    const onDeletePhoto = (deletedFileIndex: number) => {
        dispatch(
            fetchDeleteTaskPhoto({deletePhotoName: photos[deletedFileIndex], type}),
        );
    };
    const photosPaths = photos.map(photo => `${nestServerPath}/static/${photo}`,);
    return (
        <Box sx={{
            position: "relative",
            padding: "24px",
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            height: "100%",
        }}>
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

export default TaskDetailsPhotos;