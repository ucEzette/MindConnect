import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { appointmentAPI } from '../services/api';
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import { ArrowBack as BackIcon } from '@mui/icons-material';

function Appointments() {
  const navigate = useNavigate();
  const [therapists, setTherapists] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const therapistsRes = await appointmentAPI.getTherapists();
      setTherapists(therapistsRes.data.therapists);

      const appointmentsRes = await appointmentAPI.getUserAppointments();
      setAppointments(appointmentsRes.data.appointments);
    } catch (error) {
      console.error('Failed to load appointments:', error);
    }
  };

  const handleBookAppointment = (therapist) => {
    setSelectedTherapist(therapist);
    setOpenDialog(true);
  };

  const handleConfirmBooking = async () => {
    try {
      await appointmentAPI.createAppointment({
        therapistId: selectedTherapist.id,
        appointmentDate: new Date(appointmentDate).toISOString(),
        duration: 60
      });
      
      alert('Appointment booked successfully!');
      setOpenDialog(false);
      loadData();
    } catch (error) {
      console.error('Failed to book appointment:', error);
      alert('Failed to book appointment');
    }
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => navigate('/dashboard')}
          >
            <BackIcon />
          </IconButton>
          <Typography variant="h6">
            Book Appointments
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {appointments.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom>
              Your Appointments
            </Typography>
            <Grid container spacing={2}>
              {appointments.map((apt) => (
                <Grid item xs={12} md={6} key={apt.id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">
                        {apt.Therapist?.User?.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {new Date(apt.appointmentDate).toLocaleString()}
                      </Typography>
                      <Typography variant="body2">
                        Status: {apt.status}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        <Typography variant="h5" gutterBottom>
          Available Therapists
        </Typography>
        <Grid container spacing={3}>
          {therapists.map((therapist) => (
            <Grid item xs={12} sm={6} md={4} key={therapist.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">
                    {therapist.User?.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {therapist.specializations.join(', ')}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {therapist.bio}
                  </Typography>
                  <Typography variant="body2" color="primary" sx={{ mt: 1 }}>
                    ${therapist.hourlyRate}/hour
                  </Typography>
                  <Typography variant="caption" display="block">
                    {therapist.yearsExperience} years experience
                  </Typography>
                </CardContent>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => handleBookAppointment(therapist)}
                >
                  Book Appointment
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Book Appointment</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Book session with {selectedTherapist?.User?.name}
          </Typography>
          <TextField
            fullWidth
            type="datetime-local"
            label="Appointment Date & Time"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleConfirmBooking} variant="contained">
            Confirm Booking
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Appointments;
