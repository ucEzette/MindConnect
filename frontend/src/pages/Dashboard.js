import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useThemeMode } from '../context/ThemeContext';
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
  IconButton,
  alpha,
  useTheme
} from '@mui/material';
import {
  Chat as ChatIcon,
  SmartToy as AIIcon,
  Event as EventIcon,
  ExitToApp as LogoutIcon,
  Home as HomeIcon,
  Brightness4,
  Brightness7
} from '@mui/icons-material';

function Dashboard() {
  const { user, logout } = useAuth();
  const { mode, toggleTheme } = useThemeMode();
  const theme = useTheme();
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
      <AppBar position="static" sx={{ bgcolor: 'primary.main' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton color="inherit" onClick={() => navigate('/')}>
              <HomeIcon />
            </IconButton>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              MindConnect - Welcome {user?.name}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton onClick={toggleTheme} color="inherit">
              {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
            <IconButton color="inherit" onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 700, color: 'primary.main' }}>
          Your Mental Health Hub
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
          Access professional support, join caring communities, and connect with your AI assistant
        </Typography>

        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} md={4}>
            <Card sx={{ 
              height: '100%',
              background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.05)})`,
              border: '1px solid',
              borderColor: alpha(theme.palette.primary.main, 0.2),
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.15)}`
              }
            }}>
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <ChatIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                  Chat Rooms
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Join community discussions and get peer support
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
                <Button 
                  variant="contained" 
                  onClick={() => navigate('/chat-rooms')}
                  sx={{ px: 4 }}
                >
                  Browse Rooms
                </Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ 
              height: '100%',
              background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.05)})`,
              border: '1px solid',
              borderColor: alpha(theme.palette.secondary.main, 0.2),
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: `0 8px 24px ${alpha(theme.palette.secondary.main, 0.15)}`
              }
            }}>
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <AIIcon sx={{ fontSize: 60, color: 'secondary.main', mb: 2 }} />
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                  AI Assistant
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  24/7 support from our AI mental health companion
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
                <Button 
                  variant="contained" 
                  color="secondary"
                  onClick={() => navigate('/ai-assistant')}
                  sx={{ px: 4 }}
                >
                  Chat Now
                </Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ 
              height: '100%',
              background: `linear-gradient(135deg, ${alpha('#D4A24A', 0.1)}, ${alpha('#D4A24A', 0.05)})`,
              border: '1px solid',
              borderColor: alpha('#D4A24A', 0.2),
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: `0 8px 24px ${alpha('#D4A24A', 0.15)}`
              }
            }}>
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <EventIcon sx={{ fontSize: 60, color: '#D4A24A', mb: 2 }} />
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                  Appointments
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Book sessions with licensed therapists
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
                <Button 
                  variant="contained" 
                  onClick={() => navigate('/appointments')}
                  sx={{ 
                    px: 4,
                    bgcolor: '#D4A24A',
                    '&:hover': { bgcolor: '#B58633' }
                  }}
                >
                  Book Now
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ mt: 6 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
            Active Chat Rooms
          </Typography>
          <Grid container spacing={2}>
            {chatRooms.slice(0, 3).map((room) => (
              <Grid item xs={12} md={4} key={room.id}>
                <Card sx={{ 
                  border: '1px solid',
                  borderColor: 'divider',
                  '&:hover': { borderColor: 'primary.main' }
                }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {room.roomName}
                    </Typography>
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
          <Box sx={{ mt: 6 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
              Upcoming Appointments
            </Typography>
            {appointments.slice(0, 3).map((apt) => (
              <Card key={apt.id} sx={{ mb: 2, border: '1px solid', borderColor: 'divider' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Session with {apt.Therapist?.User?.name}
                  </Typography>
                  <Typography variant="body1" color="primary.main">
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
