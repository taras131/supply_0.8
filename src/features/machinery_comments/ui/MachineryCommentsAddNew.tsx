import React from "react";
import {Button, Stack} from "@mui/material";
import FieldControl from "../../../components/common/FieldControl";
import {useEditor} from "../../../hooks/useEditor";
import {machineryCommentValidate} from "../../../utils/validators";
import {emptyMachineryComment, INewMachineryComment} from "../../../models/IMachineryComment";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {fetchAddMachineryComment} from "../model/actions";
import MachineryComments from "./MachineryComments";
import {selectCurrentMachineryId} from "../../machinery/model/selectors";

const MachineryCommentsAddNew = () => {
    const dispatch = useAppDispatch();
    const machineryId = useAppSelector(selectCurrentMachineryId);
    const {editedValue, errors, handleFieldChange, resetValue} = useEditor<INewMachineryComment>({
        initialValue: JSON.parse(JSON.stringify(emptyMachineryComment)),
        validate: machineryCommentValidate,
    });
    const saveClickHandler = () => {
        dispatch(fetchAddMachineryComment({...editedValue, machinery_id: machineryId || "-1"}));
        resetValue();
    };
    return (
        <Stack direction="row" spacing={2}>
            <FieldControl
                label=""
                name="text"
                id="text"
                value={editedValue.text}
                error={errors?.text}
                isEditMode
                onChange={handleFieldChange}
            />
            <Button onClick={saveClickHandler}
                    disabled={Object.keys(MachineryComments).length > 0}>
                Добавить
            </Button>
        </Stack>
    );
};

export default MachineryCommentsAddNew;