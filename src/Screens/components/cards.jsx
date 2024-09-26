import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Cards({tittle,roomtype,price,image,desc,onClick}) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={image}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {tittle}
        </Typography>
        {/* <Typography sx={{color:"green"}} gutterBottom variant="h5" component="div">
          {roomtype}
        </Typography> */}
        {/* <Typography variant="body2" sx={{ color: 'gary',fontSize:18 }}>
        {desc}
        </Typography> */}
        <br />
        <Typography variant="body2" sx={{ color: 'black',fontSize:20 }}>
        {price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={onClick} size="small">Buy</Button>
       
      </CardActions>
    </Card>
  );
}