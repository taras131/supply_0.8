import React, { useEffect } from "react";
import { Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useLocation, useNavigate } from "react-router-dom";
import TaskIssueView from "./TaskIssueView";
import { useEditor } from "../../../../hooks/useEditor";
import { newTaskValidate } from "../../../../utils/validators";
import { INewTask } from "../../../../models/ITasks";
import { emptyTask } from "../../utils/const";
import Box from "@mui/material/Box";
import PhotosManager from "../../../../components/common/PhotosManager";
import usePhotoManager from "../../../../hooks/usePhotoManager";
import { fetchAddMachineryTask } from "../../model/actions";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { getCurrentMachineryId } from "../../model/selectors";
import Card from "@mui/material/Card";
import {selectCurrentUserId} from "../../../users/model/selectors";

const TaskAddNewPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentMachineryId = useAppSelector(getCurrentMachineryId);
  const currentUserId = useAppSelector(selectCurrentUserId);
  const { tempFiles, onAddPhoto, onDeletePhoto, clearPhotos } = usePhotoManager();
  const location = useLocation();
  const problemId = location.state?.problemId;
  const taskTypeId = location.state?.taskTypeId;
  const { editedValue, errors, handleFieldChange, setEditedValue, resetValue, validateValue } = useEditor<INewTask>({
    initialValue: JSON.parse(JSON.stringify(emptyTask)),
    validate: newTaskValidate,
  });
  useEffect(() => {
    if (problemId) {
      setEditedValue((prev) => ({ ...prev, problem_id: problemId, type_id: 2 }));
    }
  }, [problemId]);
  useEffect(() => {
    if (taskTypeId) {
      setEditedValue((prev) => ({ ...prev, type_id: taskTypeId }));
    }
  }, [taskTypeId]);
  useEffect(() => {
    const today = new Date();
    setEditedValue((prev) => ({
      ...prev,
      due_date: today.getTime(),
    }));
    return () => clearPhotos();
  }, []);
  useEffect(() => {
    if (validateValue) {
      validateValue();
    }
  }, [editedValue, validateValue]);
  const handleDateChange = (date: any) => {
    if (date && date.isValid && date.isValid()) {
      setEditedValue((prev) => ({
        ...prev,
        due_date: date.toDate().getTime(),
      }));
    }
  };
  const handleAddClick = async () => {
    const newFiles = [...tempFiles.map((fileData) => fileData.file)];
    const newTask = {
      ...editedValue,
      machinery_id: currentMachineryId ? currentMachineryId : 0,
      author_id: currentUserId,
    };
    await dispatch(fetchAddMachineryTask({ newTask, files: newFiles }));
    resetValue();
    clearPhotos();
  };
  return (
    <div>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Button variant="outlined" onClick={() => navigate(-1)}>
          Назад
        </Button>
        <Typography variant="h2" fontSize={"24px"} textAlign="center">
          Новая задача:
        </Typography>
        <Button
          onClick={handleAddClick}
          variant={"contained"}
          color={"success"}
          disabled={!!Object.keys(errors).length}
        >
          Сохранить
        </Button>
      </Stack>
      <Box
        sx={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(500px, 100%), 1fr))",
          gap: "16px",
          marginTop: "24px",
        }}
      >
        <TaskIssueView
          task={editedValue}
          errors={errors}
          isEditMode={true}
          fieldChangeHandler={handleFieldChange}
          handleDateChange={handleDateChange}
        />
        <Card sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <PhotosManager
            onAddPhoto={onAddPhoto}
            onDeletePhoto={onDeletePhoto}
            photosPaths={tempFiles.map((fileData) => fileData.preview)}
          />
        </Card>
      </Box>
    </div>
  );
};

export default TaskAddNewPage;
