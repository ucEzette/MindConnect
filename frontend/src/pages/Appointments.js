import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { appointmentAPI } from '../services/api';
import {
  Container, Box, Typography, Grid, Card, CardContent, Button,
  AppBar, Toolbar, IconButton, Dialog, DialogContent, TextField, Avatar
} from '@mui/material';
import { ArrowBack as BackIcon, Person, Group, Phone } from '@mui/icons-material';

function Appointments() {
  const navigate = useNavigate();
  const [therapists, setTherapists] = useState([]);
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState('');
  const [sessionType, setSessionType] = useState('individual');

  useEffect(() => {
    appointmentAPI.getTherapists().then(res => 
      setTherapists(res.data.therapists.map(t => ({
        ...t,
        avatar: t.User?.name?.charAt(0) || 'T'
      })))
    );
  }, []);

 const handleBook = async () => {
    try {
      await appointmentAPI.createAppointment({
        therapistId: selectedTherapist.id,
        appointmentDate: new Date(appointmentDate).toISOString()
      });
      alert('Booked successfully!');
      setOpenDialog(false);
    } catch (error) {
      alert('Booking failed');
    }
  };

  const sessions = [
    { type: 'individual', title: 'Individual', icon: <Person />, price: 120 },
    { type: 'group', title: 'Group', icon: <Group />, price: 80 },
    { type: 'phone', title: 'Phone', icon: <Phone />, price: 100 }
  ];
    return (
    <>
      <AppBar position="static" sx={{ bgcolor: '#6d28d9' }}>
        <Toolbar>
          <IconButton color="inherit" onClick={() => navigate('/dashboard')}>
            <BackIcon />
          </IconButton>
          <Typography variant="h6">Book an appointment</Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={5}>
            {therapists.map((therapist) => (
              <Card 
                key={therapist.id} 
                sx={{ mb: 2, cursor: 'pointer', '&:hover': { bgcolor: '#f9f8ff' }}}
                onClick={() => setSelectedTherapist(therapist)}
              >
                <CardContent sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
                  <Avatar sx={{ bgcolor: '#6d28d9', mr: 2 }}>
                    {therapist.avatar}
                  </Avatar>
                  <Box>
                    <Typography variant="h6">Dr. {therapist.User?.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Licensed Clinical Psychologist
                    </Typography>
                    <Typography variant="caption">
                      8 years • +1200 sessions • 98% rate
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Grid>
