import React from 'react';
import { Box, Container, Grid, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box 
      component="footer" 
      sx={{ backgroundColor: '#333', color: '#fff', py: 4, mt: 4 }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* About Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2">
              Learn more about our hotel, services, and what makes us special.
            </Typography>
          </Grid>

          {/* Contact Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2">
              Phone: +123 456 789 <br />
              Email: contact@hotel.com <br />
              Address: 123 Hotel St, City, Country
            </Typography>
          </Grid>

          {/* Links Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box>
              <Link href="#" color="inherit" underline="hover">
                Home
              </Link>
            </Box>
            <Box>
              <Link href="#" color="inherit" underline="hover">
                Rooms
              </Link>
            </Box>
            <Box>
              <Link href="#" color="inherit" underline="hover">
                Services
              </Link>
            </Box>
            <Box>
              <Link href="#" color="inherit" underline="hover">
                Contact Us
              </Link>
            </Box>
          </Grid>

          {/* Social Media Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Box>
              <Link href="#" color="inherit" underline="hover">
                Facebook
              </Link>
            </Box>
            <Box>
              <Link href="#" color="inherit" underline="hover">
                Instagram
              </Link>
            </Box>
            <Box>
              <Link href="#" color="inherit" underline="hover">
                Twitter
              </Link>
            </Box>
            <Box>
              <Link href="#" color="inherit" underline="hover">
                LinkedIn
              </Link>
            </Box>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box mt={4} textAlign="center">
          <Typography variant="body2">
            © {new Date().getFullYear()} Your Hotel Name. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;