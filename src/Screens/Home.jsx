import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useNavigate, useLocation } from 'react-router-dom';
// import hotelimg from '/hotels.jpg';
import hotelsimg from "../assets/hotels.jpg"
import Cards from './components/cards';
import { BusnissData, econimicData } from './CardData';
import Grid from '@mui/material/Grid';
import Footer from './components/Footer';

const drawerWidth = 240;
const navItems = ['Home', 'Login', 'Signup'];

function Home(props) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (item) => {
    if (item === 'Home') {
      navigate('/');
    } else if (item === 'Login') {
      navigate('/login');
    } else if (item === 'Signup') {
      navigate('/Signup');
    }
  };

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        {/* You can add a logo or title here if needed */}
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }} onClick={() => handleNavClick(item)}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  // Define styles for active and hover states
  const getUnderlineStyle = (path) => ({
    textDecoration: location.pathname === path ? 'underline' : 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  });

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar sx={{ backgroundColor: 'black' }} component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { lg: 'none' } }} // hide menu icon on lg and larger screens
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'block', sm: 'block', md: 'block', lg: 'block' }, fontFamily: 'cursive', textAlign: { xs: 'center' } }} // show heading on all screens
          >
            Welcome to Hotel Management System
          </Typography>
          <Box sx={{ display: { xs: 'none', lg: 'block' } }}> {/* Display full nav on lg */}
            <Box sx={{ display: 'flex', gap: 10.5 }}>
              <Typography
                sx={{
                  fontFamily: 'cursive',
                  fontSize: 20,
                  cursor: 'pointer',
                  ...getUnderlineStyle('/'), // Add underline when active or hover
                }}
                onClick={() => handleNavClick('Home')}
              >
                Home
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'cursive',
                  fontSize: 20,
                  cursor: 'pointer',
                  ...getUnderlineStyle('/login'), // Add underline when active or hover
                }}
                onClick={() => handleNavClick('Login')}
              >
                Login
              </Typography>
              <Typography
                sx={{
                  marginRight: 10,
                  fontFamily: 'cursive',
                  fontSize: 20,
                  cursor: 'pointer',
                  ...getUnderlineStyle('/Signup'), // Add underline when active or hover
                }}
                onClick={() => handleNavClick('Signup')}
              >
                Signup
              </Typography>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', lg: 'none' }, // only show drawer on xs, sm, md
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3, width: '100%' }}>
        <Toolbar />
        <img src={hotelsimg} height={550} width="100%" alt="" />

        <h1>Business Class Rooms</h1>
        <hr />
        <Grid container spacing={2} sx={{ mt: 3 }}>
          {BusnissData.map((e, i) => (
            <Grid item xs={12} sm={6} md={3} lg={3} key={i}>
              <Cards tittle={e.tiitle} roomtype={e.roomtype} price={e.price} image={e.image} desc={e.description} onClick={()=>{navigate(`/about/${e.id}`)}} />
            </Grid>
          ))}
        </Grid>

<br />
<br />
        <h1>Econemy Class Rooms</h1>
        <hr />
        <Grid container spacing={2} sx={{ mt: 3 }}>
          {econimicData.map((e, i) => (
            <Grid item xs={12} sm={6} md={3} lg={3} key={i}>
              <Cards tittle={e.tiitle} roomtype={e.roomtype} price={e.price} image={e.image} desc={e.description} onClick={()=>{navigate(`/about/${e.id}`)}} />
            </Grid>
          ))}
        </Grid>
        <Footer/>
      </Box>
    </Box>
  );
}

Home.propTypes = {
  window: PropTypes.func,
};

export default Home;