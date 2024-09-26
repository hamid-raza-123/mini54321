import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  AppBar,
  Toolbar,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore"; // Firestore import
import { auth, database } from "./Config/firebase";

const drawerWidth = 240;
const navItems = ["Home", "Login", "Signup"];

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [role, setRole] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  const handleSignup = async () => {
    if (!firstName || !lastName || !email || !password || !role) {
      setError("Please fill out all fields.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const userData = {
        firstName,
        lastName,
        email,
        role,
        uid: userCredential.user.uid,
      };

      await addDoc(collection(database, "users"), userData);

      localStorage.setItem("uid", userCredential.user.uid);

      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleNavClick = (item) => {
    if (item === "Home") {
      navigate("/");
    } else if (item === "Login") {
      navigate("/login");
    } else if (item === "Signup") {
      navigate("/Signup");
    }
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        {/* Logo or Title */}
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              onClick={() => handleNavClick(item)}
            >
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Grid container sx={{ height: "fit-content" }}>
      {/* Navbar */}
      <AppBar sx={{ backgroundColor: "black" }} component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { lg: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "block", sm: "block", md: "block", lg: "block" },
              fontFamily: "cursive",
              textAlign: { xs: "center" },
            }}
          >
            Welcome to Hotel Management System
          </Typography>
          <Box sx={{ display: { xs: "none", lg: "block" } }}>
            <Box sx={{ display: "flex", gap: 10.5 }}>
              {navItems.map((item) => (
                <Typography
                  key={item}
                  sx={{
                    fontFamily: "cursive",
                    fontSize: 20,
                    cursor: "pointer",
                  }}
                  onClick={() => handleNavClick(item)}
                >
                  {item}
                </Typography>
              ))}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", lg: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>

      {/* Signup Form */}
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        sx={{
          display: "flex",
          backgroundColor: "whitesmoke",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          padding: 3,
        }}
      >
        <Box sx={{ width: "100%", maxWidth: "400px" }}>
          <Typography variant="h5" gutterBottom align="center">
            SIGN UP
          </Typography>

          <TextField
            label="First Name"
            type="text"
            variant="outlined"
            fullWidth
            margin="normal"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            error={Boolean(error && !firstName)}
            helperText={error && !firstName ? "First name is required" : ""}
          />

          <TextField
            label="Last Name"
            type="text"
            variant="outlined"
            fullWidth
            margin="normal"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            error={Boolean(error && !lastName)}
            helperText={error && !lastName ? "Last name is required" : ""}
          />

          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={Boolean(error && !email)}
            helperText={error && !email ? "Email is required" : ""}
          />

          <TextField
            label="Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={Boolean(error && !password)}
            helperText={error && !password ? "Password is required" : ""}
            InputProps={{
              endAdornment: (
                <IconButton onClick={togglePasswordVisibility}>
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              ),
            }}
          />

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={role}
              label="Role"
              onChange={handleChange}
            >
              <MenuItem value="Staff">Staff</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Customer">Customer</MenuItem>
            </Select>
          </FormControl>

          {error && (
            <Typography color="error" align="center" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}

          <Button
            style={{ marginTop: 50 }}
            variant="contained"
            color="warning"
            fullWidth
            onClick={handleSignup}
          >
            Sign Up
          </Button>

          <Typography
            align="center"
            sx={{ marginTop: 2, fontSize: 20, color: "black" }}
          >
            <span>Or</span>
            <NavLink to="/login" style={{ color: "blue", marginLeft: 5 }}>
              Already have a profile?
            </NavLink>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Signup;