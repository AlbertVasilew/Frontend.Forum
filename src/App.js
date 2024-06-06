import { Box, ThemeProvider, createTheme } from "@mui/material";

import Content from "./components/Content";

import './styles/styles.css';
import Menu from "./components/Drawer";
import theme from "./styles/theme";
import { useEffect, useState } from "react";
import axios from "axios";
import CategoryContext from "./contexts/categoryContext";
import MenuContext from "./contexts/menuContext";
import { retrieveCategories, retrieveMenuCounters } from "./helpers/api-calls";
import ManageCategoryDialog from "./components/ManageCategoryDialog";
import DialogContext from "./contexts/dialogContext";
import ManageTaskDialog from "./components/ManageTaskDialog";

const App = () => {
    const [categories, setCategories] = useState([]);
    const [primaryMenuCounters, setPrimaryMenuCounters] = useState([]);

    const [manageCategoryDialog, setManageCategoryDialog] = useState();
    const [manageTaskDialog, setManageTaskDialog] = useState();


    useEffect(() => {    
        retrieveCategories(setCategories);
        retrieveMenuCounters(setPrimaryMenuCounters);
    }, []);

    return (
        <ThemeProvider theme={createTheme(theme)}>
            <CategoryContext.Provider value={{categories, setCategories}}>
                <MenuContext.Provider value={{primaryMenuCounters, setPrimaryMenuCounters}}>
                    <DialogContext.Provider value={{manageCategoryDialog, setManageCategoryDialog, manageTaskDialog, setManageTaskDialog}}>
                        <Box sx={{display: "flex"}}>
                            <Menu />
                            <Content />
                        </Box>
                        {manageCategoryDialog && (
                            <ManageCategoryDialog
                                open={manageCategoryDialog}
                                data={manageCategoryDialog}
                                closeHandler={() => setManageCategoryDialog()}
                            />
                        )}
                        {manageTaskDialog && (
                            <ManageTaskDialog
                                open={manageTaskDialog}
                                data={manageTaskDialog}
                                closeHandler={() => setManageTaskDialog()}
                            />
                        )}
                    </DialogContext.Provider>
                </MenuContext.Provider>
            </CategoryContext.Provider>
        </ThemeProvider>
    );
}

export default App;