import React, {FC} from "react";
import {formatDateDDMMYYYY} from "../../utils/services";
import {IUser} from "../../models/IUser";
import TitleWithValue from "../TitleWithValue";
import {Stack} from "@mui/material";

interface IProps {
    author: IUser,
    updatedAuthor: IUser | null,
    createdAT: string,
    updatedAt: string | null,
}

const CreateUpdateUserInfo: FC<IProps> = ({
                                              author,
                                              updatedAuthor,
                                              createdAT,
                                              updatedAt,
                                          }) => {
    return (
        <>
            <Stack direction="row" spacing={6}>
                <TitleWithValue title={"Добавлено:"} value={formatDateDDMMYYYY(createdAT)}/>
                <TitleWithValue title={"Автор:"} value={`${author.first_name}
                 ${author.middle_name}`}/>
            </Stack>
            {updatedAuthor && updatedAt && (
                <>
                    <Stack direction="row" spacing={6}>
                        <TitleWithValue title={"Обновлено:"} value={formatDateDDMMYYYY(updatedAt)}/>
                        <TitleWithValue title={"Обновил:"}
                                        value={`${updatedAuthor.first_name} ${updatedAuthor.middle_name}`}/>
                    </Stack>
                </>
            )}
        </>
    );
};

export default CreateUpdateUserInfo;