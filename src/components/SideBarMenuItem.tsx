import React, {FC} from "react";
import {Accordion, AccordionDetails, AccordionSummary, ListItem, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {useLocation} from "react-router-dom";
import Box from "@mui/material/Box";
import {IRouteConfig} from "../config/routes";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const menuItemBaseStyles = {
    alignItems: "center",
    marginBottom: "8px",
    borderRadius: 1,
    color: "var(--NavItem-color)",
    cursor: "pointer",
    display: "flex",
    flex: "0 0 auto",
    gap: 1,
    p: "6px 16px",
    position: "relative",
    textDecoration: "none",
    height: "var(--MainNav-height)",
    whiteSpace: "nowrap",
};

const getMenuItemHoverStyles = (isActive: boolean) => ({
    "&:hover": {
        backgroundColor: isActive
            ? "var(--NavItem-active-background)"
            : "var(--NavItem-hover-background)",
        color: isActive
            ? "var(--NavItem-active-color)"
            : "var(--NavItem-hover-color)",
    },
    ...(isActive && {
        backgroundColor: "var(--NavItem-active-background)",
        color: "var(--NavItem-active-color)",
    }),
});

interface IProps {
    path: string;
    label: string;
    children?: IRouteConfig[];
}

const SideBarMenuItem: FC<IProps> = ({label, path, children = null}) => {
    const currentPath: any = useLocation().pathname;
    const isActive = path === "/"
        ? currentPath === path
        : currentPath.startsWith(path) && !children;
    return (
        <>
            {children
                ? (
                    <Accordion sx={{backgroundColor: "inherit", color: "inherit"}}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon sx={{color: "#FF5722"}}/>}
                            aria-controls="panel1-content"
                            id="panel1-header"
                            sx={{
                                ...menuItemBaseStyles,
                                ...getMenuItemHoverStyles(isActive),
                            }}
                        >
                            <Typography component="span">
                                {label}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {children.map(menuItem => (
                                <SideBarMenuItem key={menuItem.path} {...menuItem}/>
                            ))}
                        </AccordionDetails>
                    </Accordion>
                )
                : (
                    <Link style={{textDecoration: "none", color: "white"}} to={path}>
                        <ListItem
                            disablePadding
                            sx={{
                                ...menuItemBaseStyles,
                                ...getMenuItemHoverStyles(isActive),
                                ...(isActive && {
                                    backgroundColor: "var(--NavItem-active-background)",
                                    color: "var(--NavItem-active-color)",
                                }),
                            }}
                        >
                            <Box sx={{flex: "1 1 auto"}}>
                                <Typography
                                    component="span"
                                    sx={{
                                        color: "inherit",
                                        fontSize: "0.875rem",
                                        fontWeight: 500,
                                        lineHeight: "28px",
                                    }}
                                >
                                    {label}
                                </Typography>
                            </Box>
                        </ListItem>
                    </Link>
                )}
        </>
    );
};

export default SideBarMenuItem;
