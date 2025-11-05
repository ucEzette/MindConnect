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

       {/* Hero Section */}
      <Box
        id="home"
        sx={{
          background: 'linear-gradient(135deg, #ede9fe, #dbeafe)',
          py: { xs: 6, md: 10 },
          px: { xs: 2, md: '10%' }
        }}
      >
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          <Grid item xs={12} md={6}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '1.8rem', md: '2.4rem' },
                color: '#2e1065',
                fontWeight: 'bold',
                mb: 2
              }}
            >
              Find Support. Feel Heard. <span style={{ color: '#6d28d9' }}>Heal Together.</span>
            </Typography>
            <Typography variant="body1" sx={{ color: '#555', mb: 3 }}>
              MindConnect helps you connect with licensed therapists, join caring communities, 
              and access AI-powered support anytime, anywhere.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button
