import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import TodayIcon from '@mui/icons-material/Today';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';

import { Box, Divider, Drawer, ListItemIcon, ListItemText, MenuItem, MenuList, Typography } from "@mui/material";
import { drawer } from '../styles/styles';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CategoryContext from '../contexts/categoryContext';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import MenuContext from '../contexts/menuContext';
import DialogContext from '../contexts/dialogContext';

const Menu = () => {
  const [categoriesMenus, setCategoriesMenus] = useState([]);

  const categoryContext = useContext(CategoryContext);
  const primaryMenuContext = useContext(MenuContext);
  const dialogContext = useContext(DialogContext);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [menus, setMenus] = useState([
    { name: "Upcoming", icon: <KeyboardDoubleArrowRightIcon fontSize="small" />, path: "/upcoming" },
    { name: "Today", icon: <TodayIcon fontSize="small" />, path: "/today" },
    { name: "Overdue", icon: <EventBusyIcon fontSize="small" />, path: "/overdue" },
    { name: "Completed", icon: <FactCheckIcon fontSize="small" />, path: "/completed" }
  ]);


  useEffect(() => {
    setCategoriesMenus(categoryContext.categories.map(category => ({ ...category, path: `/category/${category.id}` })));
  }, [categoryContext.categories])

  useEffect(() => {
    setMenus(menus.map(menu => ({...menu, count: primaryMenuContext.primaryMenuCounters[menu.name.toLowerCase()]})));
  }, [primaryMenuContext.primaryMenuCounters]);

  const isActive = path => path === pathname;

  return (
    <Drawer variant="permanent" PaperProps={{sx: drawer.paper}} sx={drawer.drawer}>
      <Box className="drawer-container">
        <Typography className="drawer-container__menu">Menu</Typography>
        <Typography className="drawer-container__welcome-text">Welcome, Albert Vasilev</Typography>
        <Box className="drawer-menu">
          <Typography className="drawer-menu__title">Tasks</Typography>
          <MenuList>
            {menus?.map(menu => (
              <MenuItem key={menu.name} className={`drawer-menu-item ${isActive(menu.path) ? `active` : ''}`} onClick={() => navigate(menu.path)}>
                <ListItemIcon>
                  {menu.icon}
                </ListItemIcon>
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
            {categoriesMenus.map(categoryMenu => (
              <MenuItem key={categoryMenu.name} className={`drawer-menu-item ${isActive(categoryMenu.path) ? `active` : ''}`} onClick={() => navigate(categoryMenu.path)}>
                <ListItemIcon>
                  <Box className="task-category-color-box" sx={{background: categoryMenu.color}}></Box>
                </ListItemIcon>
                <ListItemText>{categoryMenu.name}</ListItemText>
                <Typography className="drawer-menu-item__count">{categoryMenu.tasks}</Typography>
              </MenuItem>
            ))}
            <MenuItem className="drawer-menu-item" onClick={() => dialogContext.setManageCategoryDialog(true)}>
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
            <MenuItem className="drawer-menu-item">
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText>Sign out</ListItemText>
            </MenuItem>
          </MenuList>
        </Box>
      </Box>
    </Drawer>
  )
}

export default Menu;