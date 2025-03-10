import React, {useEffect} from "react";
import {Stack, Typography} from "@mui/material";
import PhotosManager from "../../../components/common/PhotosManager";
import Button from "@mui/material/Button";
import {useAppDispatch} from "../../../hooks/redux";
import {INewMachinery} from "../../../models/iMachinery";
import usePhotoManager from "../../../hooks/usePhotoManager";
import {fetchAddMachinery} from "../model/actions";
import {Link, useNavigate} from "react-router-dom";
import {routes} from "../../../utils/routes";
import {useEditor} from "../../../hooks/useEditor";
import {machineryValidate} from "../../../utils/validators";
import {emptyMachinery} from "../utils/const";
import MachineryAdditionalView from "./MachineryAdditionalView";
import MachineryBasicView from "./MachineryBasicView";

const MachineryAddNewPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {tempFiles, onAddPhoto, onDeletePhoto, clearPhotos} = usePhotoManager();
    const {
        editedValue,
        errors,
        handleFieldChange,
        resetValue,
    } = useEditor<INewMachinery>({
        initialValue: JSON.parse(JSON.stringify(emptyMachinery)),
        validate: machineryValidate,
    });
    useEffect(() => {
        return () => {
            clearPhotos();
        };
    }, []);
    const handleAddClick = async () => {
        dispatch(fetchAddMachinery({
            newMachinery: editedValue,
            files: tempFiles.map(fileData => fileData.file),
        }));
        clearPhotos();
        resetValue();
        navigate(routes.machinery);
    };
    return (
        <Stack sx={{padding: "24px", height: "100%"}} spacing={4}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Button variant="outlined"
                        component={Link}
                        to={routes.machinery}>
                    Назад
                </Button>
                <Typography variant="h2" fontSize={"24px"} textAlign="center">
                    Новая Техника:
                </Typography>
                <Button onClick={handleAddClick}
                        variant={"contained"}
                        color={"success"}
                        disabled={!!Object.keys(errors).length}>
                    Сохранить
                </Button>
            </Stack>
            <MachineryBasicView editedMachinery={editedValue}
                                     errors={errors}
                                     machineryFieldChangeHandler={handleFieldChange}
                                     isEditMode={true}/>
            <MachineryAdditionalView editedMachinery={editedValue}
                           errors={errors}
                           machineryFieldChangeHandler={handleFieldChange}
                           isEditMode={true}/>
            <PhotosManager onAddPhoto={onAddPhoto}
                           onDeletePhoto={onDeletePhoto}
                           photosPaths={tempFiles.map(fileData => fileData.preview)}/>
        </Stack>
    );
};

export default MachineryAddNewPage;