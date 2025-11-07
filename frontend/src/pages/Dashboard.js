import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { chatAPI, appointmentAPI } from '../services/api';
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  AppBar,
  Toolbar,
  IconButton
} from '@mui/material';
import {
  Chat as ChatIcon,
  SmartToy as AIIcon,
  Event as EventIcon,
  ExitToApp as LogoutIcon
} from '@mui/icons-material';

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [chatRooms, setChatRooms] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const roomsRes = await chatAPI.getRooms();
      setChatRooms(roomsRes.data.rooms);

      const appointmentsRes = await appointmentAPI.getUserAppointments();
      setAppointments(appointmentsRes.data.appointments);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            MindConnect - Welcome {user?.name}
          </Typography>
          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Your Mental Health Hub
        </Typography>

        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <ChatIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                <Typography variant="h6" gutterBottom>
                  Chat Rooms
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Join community discussions and get peer support
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => navigate('/chat-rooms')}>
                  Browse Rooms
                </Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <AIIcon sx={{ fontSize: 40, color: 'secondary.main' }} />
                <Typography variant="h6" gutterBottom>
                  AI Assistant
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  24/7 support from our AI mental health companion
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => navigate('/ai-assistant')}>
                  Chat Now
                </Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <EventIcon sx={{ fontSize: 40, color: 'success.main' }} />
                <Typography variant="h6" gutterBottom>
                  Appointments
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Book sessions with licensed therapists
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => navigate('/appointments')}>
                  Book Now
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Active Chat Rooms
          </Typography>
          <Grid container spacing={2}>
            {chatRooms.slice(0, 3).map((room) => (
              <Grid item xs={12} md={4} key={room.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{room.roomName}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {room.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button 
                      size="small" 
                      onClick={() => navigate(`/chat/${room.id}`)}
                    >
                      Join Room
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {appointments.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
              Upcoming Appointments
            </Typography>
            {appointments.slice(0, 3).map((apt) => (
              <Card key={apt.id} sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="h6">
                    Session with {apt.Therapist?.User?.name}
                  </Typography>
                  <Typography variant="body2">
                    {new Date(apt.appointmentDate).toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Status: {apt.status}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Container>
    </>
  );
}

export default Dashboard;
