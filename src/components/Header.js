import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Header = () => (
    <AppBar position="sticky">
        <Toolbar className="header">
            <Typography variant="h6" className="header__title">Forum</Typography>
            <Box className="header__actions">
                <Button className="header__button" startIcon={<AccountCircleIcon />}>Login</Button>
            </Box>
            </Toolbar>
      </AppBar>
)

export default Header;