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
  <Grid item xs={12} md={7}>      
            {selectedTherapist && (
              <Card sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Avatar sx={{ bgcolor: '#6d28d9', mr: 2, width: 64, height: 64 }}>
                    {selectedTherapist.avatar}
                  </Avatar>
                  <Box>
                    <Typography variant="h5">Dr. {selectedTherapist.User?.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Licensed Clinical Psychologist - Anxiety & Depression Specialist
                    </Typography>
                  </Box>
                </Box>

                <Typography variant="h6" sx={{ mb: 2 }}>Select Session Type</Typography>

                <Grid container spacing={2} sx={{ mb: 3 }}>
                  {sessions.map((session) => (
                    <Grid item xs={4} key={session.type}>
                      <Card 
                        sx={{ 
                          p: 2, cursor: 'pointer', textAlign: 'center',
                          border: sessionType === session.type ? '2px solid #6d28d9' : '1px solid #e0e0e0'
                        }}
                        onClick={() => setSessionType(session.type)}
                      >
                        <Box sx={{ color: '#6d28d9', mb: 1 }}>{session.icon}</Box>
                        <Typography variant="subtitle2">{session.title}</Typography>
                        <Typography variant="h6" color="primary">${session.price}</Typography>
                      </Card>
                    </Grid>
                  ))}
                </Grid>

                <Button 
                  variant="contained" 
                  fullWidth 
                  onClick={() => setOpenDialog(true)}
                  sx={{ bgcolor: '#6d28d9' }}
                >
                  Book Session
                </Button>
              </Card>
            )}
          </Grid>
        </Grid>
      </Container>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogContent>
          <Typography variant="h6" sx={{ mb: 2 }}>Book Appointment</Typography>
          <TextField
            fullWidth
            type="datetime-local"
            label="Date & Time"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button onClick={() => setOpenDialog(false)} sx={{ flex: 1 }}>Cancel</Button>
            <Button onClick={handleBook} variant="contained" sx={{ flex: 1 }}>Book</Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Appointments;
