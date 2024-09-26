// import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, CardMedia, Button, Grid, Box } from "@mui/material";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore"; // Firestore imports
import { database } from "./Config/firebase"; // Firebase setup
import { useNavigate } from "react-router-dom"; // For routing
import { useEffect, useState } from "react";

const DeleteRoom = () => {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  // Fetch room data from Firestore
  const fetchRooms = async () => {
    try {
      const querySnapshot = await getDocs(collection(database, "rooms"));
      const roomsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRooms(roomsData);
    } catch (error) {
      console.error("Error fetching room data: ", error);
    }
  };

  // Fetch room data when component mounts
  useEffect(() => {
    fetchRooms();
  }, []);

  // Navigate to CreateRoom for editing
  const handleEdit = (room) => {
    navigate("/create-room", { state: { roomData: room } }); // Passing room data to CreateRoom component
  };

  // Handle delete room
  const handleDelete = async (roomId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this room?");
    if (confirmDelete) {
      try {
        const roomRef = doc(database, "rooms", roomId);
        await deleteDoc(roomRef);
        alert("Room deleted successfully!");
        fetchRooms(); // Refresh room list after deletion
      } catch (error) {
        console.error("Error deleting room: ", error);
      }
    }
  };

  return (
    <Grid container spacing={3} padding={3}>
      {rooms.map((room) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={room.id}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              height="140"
              image={room.imageUrl}
              alt={room.roomType}
            />
            <CardContent>
              <Typography variant="h6">{room.roomType}</Typography>
              <Typography variant="body2" color="text.secondary">
                {room.description}
              </Typography>
              <Typography variant="body1" color="text.primary">
                Price: ${room.price}
              </Typography>
            </CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between", padding: 1 }}>
              <Button
                variant="contained"
                onClick={() => handleEdit(room)}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleDelete(room.id)}
              >
                Delete
              </Button>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default DeleteRoom;