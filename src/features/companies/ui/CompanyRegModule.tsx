import React, {Dispatch, FC, SetStateAction} from "react";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import {Stack, Tab, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import FieldControl from "../../../components/common/FieldControl";
import {IRegisterData} from "../../../models/iAuth";
import {useAppSelector} from "../../../hooks/redux";
import {selectCompanyIsLoading, selectCurrentCompanyName} from "../model/selectors";
import Preloader from "../../../components/Preloader";
import {ValidationErrors} from "../../../utils/validators";

interface IProps {
    editedValue: IRegisterData;
    errors: ValidationErrors;
    onChange: (e: any) => void;
    setEditedValue: Dispatch<SetStateAction<IRegisterData>>
}

const CompanyRegModule: FC<IProps> = ({editedValue, errors, onChange, setEditedValue}) => {
    const companyName = useAppSelector(selectCurrentCompanyName);
    const isLoading = useAppSelector(selectCompanyIsLoading);
    const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
        setEditedValue(prev => ({...prev, tab: newValue}));
    };
    return (
        <Box sx={{width: "100%", typography: "body1"}}>
            <Typography variant={"subtitle1"}>Компания:</Typography>
            <TabContext value={editedValue.tab}>
                <Box sx={{borderBottom: 1, borderColor: "divider"}}>
                    <TabList onChange={handleTabChange} aria-label="reg company">
                        <Tab label="Существующая" value="oldCompany"/>
                        <Tab label="Новая" value="newCompany"/>
                    </TabList>
                </Box>
                <TabPanel value="oldCompany">
                    <Stack sx={{height: "65px"}}>
                        <FieldControl
                            label="Введите ключ"
                            name="company_id"
                            id="company_id"
                            value={editedValue.company_id}
                            error={errors.company_id}
                            onChange={onChange}
                        />
                        {isLoading
                            ? (<Preloader/>)
                            : (<>
                                {companyName
                                    && (<Typography color={"primary"}>Найдена: {companyName}</Typography>)
                                  }
                            </>)}
                    </Stack>
                </TabPanel>
                <TabPanel value="newCompany">
                    <Stack sx={{height: "65px"}}>
                        <FieldControl
                            label="Название компании"
                            name="company_name"
                            id="company_name"
                            value={editedValue.company_name}
                            error={errors.company_name}
                            onChange={onChange}
                        />
                    </Stack>
                </TabPanel>
            </TabContext>
        </Box>
    );
};

export default CompanyRegModule;
