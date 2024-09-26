// import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, CardMedia, Button, Grid } from "@mui/material";
import { collection, getDocs } from "firebase/firestore"; // Firestore imports
import { database } from "./Config/firebase"; // Firebase setup
import { useNavigate } from "react-router-dom"; // For routing
import { useEffect, useState } from "react";

const EditRoom = () => {
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
    navigate("/Dashboard/CreateRoom", { state: { roomData: room } }); // Passing room data to CreateRoom component
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
            <Button
              variant="contained"
              fullWidth
              onClick={() => handleEdit(room)}
            >
              Edit
            </Button>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default EditRoom;