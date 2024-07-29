import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import TodayIcon from '@mui/icons-material/Today';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import FactCheckIcon from '@mui/icons-material/FactCheck';

const menuItems = [
    { name: "Upcoming", icon: <KeyboardDoubleArrowRightIcon fontSize="small" />, path: "/upcoming" },
    { name: "Today", icon: <TodayIcon fontSize="small" />, path: "/today" },
    { name: "Overdue", icon: <EventBusyIcon fontSize="small" />, path: "/overdue" },
    { name: "Completed", icon: <FactCheckIcon fontSize="small" />, path: "/completed" }
];

export default menuItems;