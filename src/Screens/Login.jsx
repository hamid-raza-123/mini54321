import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  IconButton,
  AppBar,
  Toolbar,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink, useNavigate } from "react-router-dom";
import { auth, database } from "./Config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loginClicked, setLoginClicked] = useState(false); // New state for underline

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };

  const handelHome= ()=>{
    navigate('/')
  }

  const handelsi= ()=>{
    navigate('/Signup')
  }

  const handleLogin = async () => {
    setLoginClicked(true); // Add underline when login button is clicked

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const q = query(
        collection(database, "users"),
        where("uid", "==", user.uid)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((res) => {
        const role = res.data().role;
        if (role === "Admin") {
          navigate("/Dashboard");
        } else if (role === "Staff") {
          navigate('/staf')
        } else {
         navigate('/')
        }
      });

      localStorage.setItem("isLoggedIn", true);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Grid container sx={{ height: "fit-content" }}>
      <AppBar sx={{ backgroundColor: "black" }} component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{ mr: 2, display: { lg: "none" } }} // Hide on lg screens
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, textAlign: "center", fontFamily: "cursive" }}
          >
            Welcome to Hotel Management System
          </Typography>
          <Box sx={{ display: { xs: "none", lg: "block" } }}>
            <Box sx={{ display: "flex", gap: 5 }}>
              <Typography
              onClick={handelHome}
                sx={{
                  fontFamily: "cursive",
                  fontSize: 20,
                  cursor: "pointer",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Home
              </Typography>
              <Typography
                sx={{
                  fontFamily: "cursive",
                  fontSize: 20,
                  cursor: "pointer",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Login
              </Typography>
              <Typography
              onClick={handelsi}
                sx={{
                  fontFamily: "cursive",
                  fontSize: 20,
                  cursor: "pointer",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Signup
              </Typography>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        sx={{
          display: "flex",
         
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          padding: 3,
        }}
      >
<Box  sx={{}}>

<Box sx={{ width: "100%", maxWidth: "400px",marginTop:20}}>
          <Typography variant="h5" gutterBottom align="center">
            LOGIN
          </Typography>

          <TextField
            label="Email"
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

          {error && (
            <Typography color="error" align="center" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}

          <FormControlLabel
            control={
              <Checkbox checked={rememberMe} onChange={handleRememberMeChange} />
            }
            label="Remember me"
          />

          <Button
            variant="contained"
            color="warning"
            fullWidth
            onClick={handleLogin}
            sx={{
              mt: 2,
              borderBottom: loginClicked ? "2px solid green" : "none", // Add underline when clicked
            }}
          >
            Login
          </Button>

          <Typography align="center" sx={{ marginTop: 2, fontSize: 20, color: "black" }}>
            Or{" "}
            <NavLink to="/signup" style={{ color: "blue" }}>
              Sign up
            </NavLink>
          </Typography>
        </Box>
</Box>
      </Grid>
    </Grid>
  );
};

export default Login;