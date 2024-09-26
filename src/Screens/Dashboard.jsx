import React, { useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  CssBaseline,
  Button,
} from '@mui/material';
import { Inbox, Menu } from '@mui/icons-material';
import HotelIcon from '@mui/icons-material/Hotel';
import { Outlet, useNavigate } from 'react-router-dom';
import BedroomChildIcon from '@mui/icons-material/BedroomChild';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import HistoryIcon from '@mui/icons-material/History';

const drawerWidth = 240;

const Dashboard = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const drawer = (
    <div>
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {/* Customer */}
          <ListItem
            sx={{ color: 'black', fontSize: 30,height:80 }}
            button
            onClick={() => navigate('/Dashboard/CreateRoom')}
          >
            <ListItemIcon>
              <BedroomChildIcon sx={{ color: 'black', fontSize: 30 }} />
            </ListItemIcon>
            <ListItemText primary="CrateRoom" sx={{ color: 'black', fontSize: "30px" }} />
          </ListItem>

          {/* Teachers */}
          <ListItem
            sx={{ color: 'black', fontSize: 30,height:80 }}
            button
            onClick={() => navigate('/Dashboard/EditRoom')}
          >
            <ListItemIcon>
              <EditSharpIcon sx={{ color: 'black', fontSize: 30 }} />
            </ListItemIcon>
            <ListItemText primary="EditRoom" sx={{ color: 'black', fontSize: 30 }} />
          </ListItem>

          {/* Subjects */}
          <ListItem
            sx={{ color: 'black', fontSize: 30,height:80 }}
            button
            onClick={() => navigate('/Dashboard/deleteRoom')}
          >
            <ListItemIcon>
              <DeleteSharpIcon sx={{ color: 'black', fontSize: 30 }} />
            </ListItemIcon>
            <ListItemText primary="DeleteRoom" sx={{ color: 'black', fontSize: 30 }} />
          </ListItem>
          <ListItem
            sx={{ color: 'black', fontSize: 30,height:80 }}
            button
            onClick={() => navigate('/Dashboard/CheckingHistory')}
          >
            <ListItemIcon>
              <HistoryIcon sx={{ color: 'black', fontSize: 30 }} />
            </ListItemIcon>
            <ListItemText primary="CheckingHistory" sx={{ color: 'black', fontSize: 30 }} />
          </ListItem>

          {/* <ListItem
            sx={{ color: 'black', fontSize: 30,height:80 }}
            button
            onClick={() => navigate('')}
          >
            <ListItemIcon>
              <DeleteSharpIcon sx={{ color: 'black', fontSize: 30 }} />
            </ListItemIcon>
            <ListItemText primary="CheckoutHistory" sx={{ color: 'black', fontSize: 30 }} />
          </ListItem> */}

          {/* School */}

        </List>
      </Box>
    </div>
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
            <Menu />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}
          >
            <HotelIcon sx={{ mr: 2 }} />{' '}
            <Box sx={{ fontFamily: 'cursive', fontSize: 18 }}>Hotel Management Dashboard</Box>
          </Typography>
          <IconButton color="inherit" edge="end" sx={{ ml: 'auto' }}>
            <Button variant="contained" onClick={handleLogout}>
              Logout
            </Button>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, display: { xs: 'none', sm: 'block' } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="permanent"
          sx={{
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        {/* Main Content Goes Here */}
        <Outlet />
      </Box>

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

export default Dashboard;