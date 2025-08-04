import React, {FC} from "react";
import {IconButton, ListItem, ListItemText, Switch} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {IMachineryComment} from "../../../models/IMachineryComment";
import {fetchDeleteMachineryComment, fetchUpdateMachineryComment} from "../model/actions";
import {useAppDispatch} from "../../../hooks/redux";

interface IProps {
    comment: IMachineryComment;
}

const MachineryCommentsItem:FC<IProps> = ({comment}) => {
    const dispatch = useAppDispatch();
    const deleteHandler = () => {
        dispatch(fetchDeleteMachineryComment(comment.id));
    };
    const toggleIsActiveHandler = () => {
        dispatch(fetchUpdateMachineryComment({...comment, is_active: !comment.is_active}));
    };
    return (
        <ListItem
            sx={{ opacity: comment.is_active ? 1 : 0.6 }}
            secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={deleteHandler}>
                    <DeleteIcon />
                </IconButton>
            }
        >
            <Switch
                edge="start"
                onChange={toggleIsActiveHandler}
                checked={comment.is_active}
                inputProps={{
                    "aria-labelledby": "switch-list-label-wifi",
                }}
            />
            <ListItemText id="switch-list-label-notice" primary={`${comment.text}`} />
        </ListItem>
    );
};

export default MachineryCommentsItem;