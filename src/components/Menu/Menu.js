import React from 'react';

import { Box, Divider, Drawer, ListItemIcon, ListItemText, MenuItem, MenuList, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';

import ManageCategoryDialog from '../ManageCategoryDialog';

import { logoutHandler } from '../../helpers/auth';
import { drawer } from '../../styles/styles';

const Menu = props => (
    <Drawer variant="permanent" PaperProps={{sx: drawer.paper}} sx={drawer.drawer}>
        <Box className="drawer-container">
            <Typography className="drawer-container__menu-text">Menu</Typography>
            <Typography className="drawer-container__welcome-text">Welcome, {props.user.username}</Typography>
            <Box className="drawer-menu">
                <Typography className="drawer-menu__title">Tasks</Typography>
                <MenuList>
                    {props.menus?.map(menu => (
                        <MenuItem
                            key={menu.name}
                            className={`drawer-menu-item ${props.isActive(menu.path) ? `active` : ''}`}
                            onClick={() => props.navigate(menu.path)}
                        >
                            <ListItemIcon>{menu.icon}</ListItemIcon>
                            <ListItemText>{menu.name}</ListItemText>
                            <Typography className="drawer-menu-item__count">{menu.count}</Typography>
                        </MenuItem>
                    ))}
                </MenuList>
            </Box>
            <Divider />
            <Box className="drawer-menu">
                <Typography className="drawer-menu__title">Categories</Typography>
                <MenuList>
                    {props.categoriesMenus.map(categoryMenu => (
                        <MenuItem
                            key={categoryMenu.name}
                            className={`drawer-menu-item ${props.isActive(categoryMenu.path) ? `active` : ''}`}
                            onClick={() => props.navigate(categoryMenu.path)}
                        >
                            <ListItemIcon>
                                <Box className="task__category-color-box" sx={{background: categoryMenu.color}}></Box>
                            </ListItemIcon>
                            <ListItemText>{categoryMenu.name}</ListItemText>
                            <Typography className="drawer-menu-item__count">{categoryMenu.tasks}</Typography>
                        </MenuItem>
                    ))}
                    <MenuItem className="drawer-menu-item" onClick={() => props.setManageCategoryDialog({})}>
                        <ListItemIcon>
                            <AddIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Add New Category</ListItemText>
                    </MenuItem>
                </MenuList>
            </Box>
            <Divider />
            <Box className="drawer-menu">
                <Typography className="drawer-menu__title">Account</Typography>
                <MenuList>
                    <MenuItem className="drawer-menu-item" onClick={() => logoutHandler(props.setUser)}>
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText>Sign out</ListItemText>
                    </MenuItem>
                </MenuList>
            </Box>
        </Box>
        {props.manageCategoryDialog && (
            <ManageCategoryDialog
                open={props.manageCategoryDialog != null}
                closeHandler={() => props.setManageCategoryDialog()}
                category={props.manageCategoryDialog}
            />
        )}
    </Drawer>
)

export default Menu;