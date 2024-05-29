import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import NoteIcon from '@mui/icons-material/Note';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TodayIcon from '@mui/icons-material/Today';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';

import { Box, Divider, Drawer, ListItemIcon, ListItemText, MenuItem, MenuList, Typography } from "@mui/material";
import { drawer } from '../styles/styles';

const Menu = () => (
  <Drawer variant="permanent" PaperProps={{sx: drawer.paper}} sx={drawer.drawer}>
    <Box className="drawer-container">
      <Typography className="drawer-container__menu">Menu</Typography>
      <Typography className="drawer-container__welcome-text">Welcome, Albert Vasilev</Typography>
      <Box className="drawer-menu">
        <Typography className="drawer-menu__title">Tasks</Typography>
        <MenuList>
          <MenuItem className="drawer-menu-item">
            <ListItemIcon>
              <KeyboardDoubleArrowRightIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Upcoming</ListItemText>
            <Typography className="drawer-menu-item__count">8</Typography>
          </MenuItem>
          <MenuItem className="drawer-menu-item">
            <ListItemIcon>
              <TodayIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Today</ListItemText>
            <Typography className="drawer-menu-item__count">8</Typography>
          </MenuItem>
          <MenuItem className="drawer-menu-item">
            <ListItemIcon>
              <CalendarMonthIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Calendar</ListItemText>
          </MenuItem>
          <MenuItem className="drawer-menu-item">
            <ListItemIcon>
              <NoteIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Sticky wall</ListItemText>
            <Typography className="drawer-menu-item__count">8</Typography>
          </MenuItem>
        </MenuList>
      </Box>
      <Divider />
      <Box className="drawer-menu">
        <Typography className="drawer-menu__title">Categories</Typography>
        <MenuList>
          <MenuItem className="drawer-menu-item">
            <ListItemIcon>
              <Box className="task-category-color-box" sx={{background: "blue"}}></Box>
            </ListItemIcon>
            <ListItemText>Personal</ListItemText>
            <Typography className="drawer-menu-item__count">8</Typography>
          </MenuItem>
          <MenuItem className="drawer-menu-item">
            <ListItemIcon>
              <Box className="task-category-color-box" sx={{background: "red"}}></Box>
            </ListItemIcon>
            <ListItemText>Work</ListItemText>
            <Typography className="drawer-menu-item__count">8</Typography>
          </MenuItem>
          <MenuItem className="drawer-menu-item">
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

export default Menu;