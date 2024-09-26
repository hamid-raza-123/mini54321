import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { database } from './Config/firebase';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const RoomDataTable = () => {
  const [roomData, setRoomData] = useState([]);

  useEffect(() => {
    // Fetch data from Firestore
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(database, 'Cards'));
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setRoomData(data);
    };

    fetchData();
  }, []);

  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ p: 2 }}>
        Room Data
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Room Type</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {roomData.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.tittle}</TableCell>
              <TableCell>{row.roomtype}</TableCell>
              <TableCell>{row.price}</TableCell>
              <TableCell>{row.desc}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RoomDataTable;