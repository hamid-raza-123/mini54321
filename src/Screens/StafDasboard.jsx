import React, { useState } from 'react';
import { AppBar, Box, Button, CssBaseline, Drawer, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HotelIcon from '@mui/icons-material/Hotel';
import { Outlet, useNavigate } from 'react-router-dom';
import RoomDataTable from './RoomDatatable';

const drawerWidth = 240;

const StafDashboard = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const drawer = (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Hotel Management
      </Typography>
      {/* <Button onClick={() => navigate('/staff-dashboard/home')}>Home</Button>
      <Button onClick={() => navigate('/staff-dashboard/rooms')}>Rooms</Button>
      <Button onClick={() => navigate('/staff-dashboard/bookings')}>Bookings</Button> */}
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: 'black' }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}
          >
            <HotelIcon sx={{ mr: 2 }} />
            <Box sx={{ fontFamily: 'cursive', fontSize: 18 }}>Hotel Management Staff Dashboard</Box>
          </Typography>
          <Button variant="contained" onClick={handleLogout} sx={{ ml: 'auto' }}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Permanent Drawer for larger screens */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main content */}
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <RoomDataTable/>
        <Outlet />
      </Box>


      {/* Temporary Drawer for mobile screens */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default StafDashboard;