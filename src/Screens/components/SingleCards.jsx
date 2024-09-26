import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Alert, Snackbar } from '@mui/material';
import { addDoc, collection } from 'firebase/firestore';
import { auth, database } from '../Config/firebase'; // Ensure auth is imported from Firebase config

export default function SingleCards({ id, tittle, roomtype, price, image, desc }) {
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar state
  const [error, setError] = useState(''); // Error state
  
  const handleBuy = async () => {
    const user = auth.currentUser;
    
    // Check if user is logged in
    if (!user) {
      navigate('/Signup');
      return;
    }
  
    // Ensure all fields are valid
    if (!id || !tittle || !roomtype || !price || !image || !desc) {
      setError('Some fields are missing or invalid. Please check the data.');
      return;
    }
  
    try {
      const cardData = {
        id,
        tittle,
        roomtype,
        price,
        image,
        desc,
        userId: user.uid,
        timestamp: new Date().toISOString(),
      };
  
      // Save card data to Firestore in the 'Cards' collection
      await addDoc(collection(database, 'Cards'), cardData);
  
      // Show success message
      setOpenSnackbar(true);
  
      // Delay navigation by 2 seconds to allow the user to see the success message
      setTimeout(() => {
        navigate('/');
      }, 2000); // 2000 ms = 2 seconds
  
    } catch (err) {
      console.error("Error saving document: ", err);
      setError('Error saving the document. Please try again.');
    }
  };
  

  return (
    <center>
      <Card sx={{ maxWidth: 345, marginTop: 15 }}>
        <CardMedia sx={{ height: 140 }} image={image} title={tittle} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {tittle}
          </Typography>
          <Typography sx={{ color: "green" }} gutterBottom variant="h5" component="div">
            {roomtype}
          </Typography>
          <Typography variant="body2" sx={{ color: 'gray', fontSize: 18 }}>
            {desc}
          </Typography>
          <br />
          <Typography variant="body2" sx={{ color: 'black', fontSize: 20 }}>
            {price}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={handleBuy} variant="contained" size="small">
            Buy
          </Button>
        </CardActions>

        {/* Snackbar for success alert */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={2000}
          onClose={() => setOpenSnackbar(false)}
        >
          <Alert severity="success" sx={{ width: '100%' }}>
            Purchase successful!
          </Alert>
        </Snackbar>

        {/* Show an error if something goes wrong */}
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </Card>
    </center>
  );
}