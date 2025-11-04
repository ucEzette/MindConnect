import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Button, Grid, Card, CardContent, AppBar, Toolbar } from '@mui/material';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <Box sx={{ bgcolor: '#f9f8ff' }}>
      {/* Navbar */}
      <AppBar position="sticky" sx={{ bgcolor: '#ffffff', color: '#333', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: '10%' } }}>
          <Typography variant="h5" sx={{ color: '#6d28d9', fontWeight: 'bold', fontFamily: '"Poppins", sans-serif' }}>
            MindConnect
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
            <Button href="#home" sx={{ color: '#333', fontWeight: 500, '&:hover': { color: '#6d28d9' } }}>
              Home
            </Button>
            <Button href="#features" sx={{ color: '#333', fontWeight: 500, '&:hover': { color: '#6d28d9' } }}>
              Features
            </Button>
            <Button href="#about" sx={{ color: '#333', fontWeight: 500, '&:hover': { color: '#6d28d9' } }}>
              About
            </Button>
            <Button href="#contact" sx={{ color: '#333', fontWeight: 500, '&:hover': { color: '#6d28d9' } }}>
              Contact
            </Button>
          </Box>
          <Button
            variant="contained"
            onClick={() => navigate('/login')}
            sx={{
              bgcolor: '#6d28d9',
              borderRadius: '25px',
              px: 3,
              '&:hover': { bgcolor: '#5b21b6' }
            }}
          >
            Sign In
          </Button>
        </Toolbar>
      </AppBar>
