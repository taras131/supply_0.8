import React from "react";
import {useAppSelector} from "../../../hooks/redux";
import {selectAllMachineryComments} from "../model/selectors";
import MachineryCommentsItem from "./MachineryCommentsItem";
import {List, Typography} from "@mui/material";
import MachineryCommentsAddNew from "./MachineryCommentsAddNew";

const MachineryComments = () => {
    const comments = useAppSelector(selectAllMachineryComments);
    const commentsList = comments?.map(comment => (<MachineryCommentsItem
            key={comment.id}
            comment={comment}/>
    ));
    return (
        <div>
            MachineryComments
            <MachineryCommentsAddNew/>
            {comments
                ? (<List>
                    {commentsList}
                </List>)
                : (<Typography variant={"subtitle2"}>
                    Пока нет ни одной заметки
                </Typography>)}
        </div>
    );
};

export default MachineryComments;