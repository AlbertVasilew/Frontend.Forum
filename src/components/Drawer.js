import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import NoteIcon from '@mui/icons-material/Note';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TodayIcon from '@mui/icons-material/Today';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';

import { Box, Divider, Drawer, ListItemIcon, ListItemText, MenuItem, MenuList, Typography } from "@mui/material";

const Menu = () => (
    <Drawer
        variant="permanent"
        PaperProps={{sx: { width: "350px", border: 0, backgroundColor: "transparent", padding: "20px", boxSizing: "border-box" }}}
        sx={{
          width: "350px"
        }}
      >
        <Box sx={{ padding: "20px", background: "#F4F4F4", borderRadius: "10px", height: "100%" }}>
          <Typography sx={{marginBottom: "30px"}}>
            <Box component="span">Welcome, </Box>
            <Box component="span" sx={{fontWeight: "bold"}}>Albert</Box>
          </Typography>
          <Box sx={{margin: "15px 0px"}}>
            <Typography sx={{textTransform: "uppercase", fontSize: "12px", fontWeight: "bold"}}>Tasks</Typography>
              <MenuList>
                <MenuItem sx={{padding: "5px 10px"}}>
                  <ListItemIcon>
                    <KeyboardDoubleArrowRightIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Upcoming</ListItemText>
                  <Typography sx={{fontWeight: "bold", fontSize: "12px", padding: "0px 10px", borderRadius: "3px"}}>8</Typography>
                </MenuItem>
                <MenuItem sx={{padding: "5px 10px"}}>
                  <ListItemIcon>
                    <TodayIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Today</ListItemText>
                  <Typography sx={{fontWeight: "bold", fontSize: "12px", padding: "0px 10px", borderRadius: "3px"}}>5</Typography>
                </MenuItem>
                <MenuItem sx={{padding: "5px 10px"}}>
                  <ListItemIcon>
                    <CalendarMonthIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Calendar</ListItemText>
                </MenuItem>
                <MenuItem sx={{padding: "5px 10px"}}>
                  <ListItemIcon>
                    <NoteIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Sticky wall</ListItemText>
                  <Typography sx={{fontWeight: "bold", fontSize: "12px", padding: "0px 10px", borderRadius: "3px"}}>3</Typography>
                </MenuItem>
              </MenuList>
          </Box>
          <Divider />
          <Box sx={{margin: "15px 0px"}}>
            <Typography sx={{textTransform: "uppercase", fontSize: "12px", fontWeight: "bold"}}>Categories</Typography>
              <MenuList>
                <MenuItem sx={{padding: "5px 10px"}}>
                  <ListItemIcon>
                    <Box sx={{width: "15px", height: "15px", background: "blue", borderRadius: "5px"}}></Box>
                  </ListItemIcon>
                  <ListItemText>Personal</ListItemText>
                  <Typography sx={{fontWeight: "bold", fontSize: "12px", padding: "0px 10px", borderRadius: "3px"}}>1</Typography>
                </MenuItem>
                <MenuItem sx={{padding: "5px 10px"}}>
                  <ListItemIcon>
                    <Box sx={{width: "15px", height: "15px", background: "red", borderRadius: "5px"}}></Box>
                  </ListItemIcon>
                  <ListItemText>Work</ListItemText>
                  <Typography sx={{fontWeight: "bold", fontSize: "12px", padding: "0px 10px", borderRadius: "3px"}}>3</Typography>
                </MenuItem>
                <MenuItem sx={{padding: "5px 10px"}}>
                  <ListItemIcon>
                    <AddIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Add New Category</ListItemText>
                </MenuItem>
              </MenuList>
          </Box>
          <Divider />
          <Box sx={{margin: "15px 0px"}}>
            <Typography sx={{textTransform: "uppercase", fontSize: "12px", fontWeight: "bold"}}>Account</Typography>
              <MenuList>
                <MenuItem sx={{padding: "5px 10px"}}>
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