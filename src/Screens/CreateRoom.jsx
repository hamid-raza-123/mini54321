// import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Grid, Typography } from "@mui/material";
import { addDoc, updateDoc, doc, collection } from "firebase/firestore";
import { database } from "./Config/firebase";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import for accessing passed state

const CreateRoom = () => {
    const navigate = useNavigate()
  const location = useLocation(); // Get the passed room data for editing
  const [roomData, setRoomData] = useState({
    imageUrl: "",
    roomType: "",
    price: "",
    description: "",
  });

  const [isEditMode, setIsEditMode] = useState(false); // Check if we're editing
  const [roomId, setRoomId] = useState(null); // Store room ID for editing

  // Pre-fill form with room data if editing
  useEffect(() => {
    if (location.state && location.state.roomData) {
      setRoomData(location.state.roomData);
      setIsEditMode(true);
      setRoomId(location.state.roomData.id);
    }
  }, [location]);

  const handleChange = (e) => {
    setRoomData({
      ...roomData,
      [e.target.name]: e.target.value,
    });
  };

  const saveToLocalStorage = (data) => {
    localStorage.setItem("roomData", JSON.stringify(data));
  };

  // Save to Firestore (update if in edit mode)
  const saveToDatabase = async (data) => {
    try {
      if (isEditMode) {
        const roomRef = doc(database, "rooms", roomId);
        await updateDoc(roomRef, data);
        alert("Room data updated successfully!");
      } else {
        await addDoc(collection(database, "rooms"), data);
        alert("Room data saved successfully!");
        navigate('/Dashboard/EditRoom')
      }
    } catch (error) {
      console.error("Error saving to database: ", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveToLocalStorage(roomData);
    saveToDatabase(roomData);
    setRoomData({ imageUrl: "", roomType: "", price: "", description: "" }); // Reset form
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
        padding: 3,
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: 600,
          width: "100%",
          padding: 2,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" align="center" marginBottom={2}>
          {isEditMode ? "Edit Room" : "Create Room"}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Image URL"
              name="imageUrl"
              value={roomData.imageUrl}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Room Type"
              name="roomType"
              value={roomData.roomType}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Price"
              name="price"
              type="type"
              value={roomData.price}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={roomData.description}
              onChange={handleChange}
              multiline
              rows={4}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained">
              {isEditMode ? "Update Room" : "Save Room"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default CreateRoom;