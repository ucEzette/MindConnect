import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useThemeMode } from '../context/ThemeContext';
import { appointmentAPI, chatAPI } from '../services/api';
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  IconButton,
  Chip,
  LinearProgress,
  alpha,
  useTheme
} from '@mui/material';
import {
  ExitToApp,
  Event,
  Chat,
  People,
  Brightness4,
  Brightness7,
  Home,
  TrendingUp,
  Assessment
} from '@mui/icons-material';

function TherapistDashboard() {
  const { user, logout } = useAuth();
  const { mode, toggleTheme } = useThemeMode();
  const theme = useTheme();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const appointmentsRes = await appointmentAPI.getTherapistAppointments();
      setAppointments(appointmentsRes.data.appointments);
      const roomsRes = await chatAPI.getRooms();
      setChatRooms(roomsRes.data.rooms);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const todayAppointments = appointments.filter(apt => 
    new Date(apt.appointmentDate).toDateString() === new Date().toDateString()
  );

  const thisWeekAppointments = appointments.filter(apt => {
    const aptDate = new Date(apt.appointmentDate);
    const today = new Date();
    const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    return aptDate >= today && aptDate <= weekFromNow;
  });

  const completedAppointments = appointments.filter(apt => apt.status === 'completed').length;
  const completionRate = appointments.length > 0 ? (completedAppointments / appointments.length) * 100 : 0;

  // Chart data for appointments by status
  const statusCounts = {
    scheduled: appointments.filter(a => a.status === 'scheduled').length,
    completed: appointments.filter(a => a.status === 'completed').length,
    cancelled: appointments.filter(a => a.status === 'cancelled').length,
  };

  const totalAppointments = Object.values(statusCounts).reduce((a, b) => a + b, 0);

  return (
    <>
      {/* Header */}
      <AppBar 
        position="static" 
        sx={{ 
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
          boxShadow: '0 4px 12px rgba(59, 74, 122, 0.15)'
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton color="inherit" onClick={() => navigate('/')}>
              <Home />
            </IconButton>
            <Box>
              <Typography variant="overline" sx={{ opacity: 0.8, fontSize: '0.7rem', letterSpacing: '0.1em' }}>
                Therapist Portal
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, mt: -0.5 }}>
                Dr. {user?.name}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Chip 
              label="Therapist" 
              sx={{ 
                bgcolor: theme.palette.secondary.main, 
                color: 'white',
                fontWeight: 600,
                height: 28
              }} 
              size="small" 
            />
            <IconButton onClick={toggleTheme} color="inherit">
              {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
            <IconButton color="inherit" onClick={handleLogout}>
              <ExitToApp />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {/* Welcome Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 1, color: 'primary.main' }}>
            Welcome Back, Dr. {user?.name} 👋
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.125rem' }}>
            Here's your practice overview for today
          </Typography>
        </Box>

        {/* Statistics Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {/* Today's Sessions */}
          <Grid item xs={12} md={3}>
            <Card 
              sx={{ 
                background: `linear-gradient(135deg, ${alpha('#4CAF50', 0.1)}, ${alpha('#4CAF50', 0.05)})`, 
                borderLeft: '4px solid #4CAF50',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'translateY(-4px)' }
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Event sx={{ fontSize: 40, color: '#4CAF50' }} />
                  <Chip 
                    label="Today" 
                    size="small" 
                    sx={{ 
                      bgcolor: alpha('#4CAF50', 0.2),
                      color: '#2E7D32',
                      fontWeight: 600
                    }} 
                  />
                </Box>
                <Typography variant="h2" sx={{ fontWeight: 800, color: '#4CAF50', mb: 0.5 }}>
                  {todayAppointments.length}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                  Sessions scheduled today
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* This Week */}
          <Grid item xs={12} md={3}>
            <Card 
              sx={{ 
                background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.primary.main, 0.05)})`, 
                borderLeft: `4px solid ${theme.palette.primary.main}`,
                transition: 'transform 0.2s',
                '&:hover': { transform: 'translateY(-4px)' }
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <TrendingUp sx={{ fontSize: 40, color: 'primary.main' }} />
                  <Chip 
                    label="This Week" 
                    size="small" 
                    sx={{ 
                      bgcolor: alpha(theme.palette.primary.main, 0.2),
                      color: theme.palette.primary.dark,
                      fontWeight: 600
                    }} 
                  />
                </Box>
                <Typography variant="h2" sx={{ fontWeight: 800, color: 'primary.main', mb: 0.5 }}>
                  {thisWeekAppointments.length}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                  Upcoming appointments
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Total Clients */}
          <Grid item xs={12} md={3}>
            <Card 
              sx={{ 
                background: `linear-gradient(135deg, ${alpha('#D4A24A', 0.1)}, ${alpha('#D4A24A', 0.05)})`, 
                borderLeft: '4px solid #D4A24A',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'translateY(-4px)' }
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <People sx={{ fontSize: 40, color: '#D4A24A' }} />
                  <Chip 
                    label="Total" 
                    size="small" 
                    sx={{ 
                      bgcolor: alpha('#D4A24A', 0.2),
                      color: '#B58633',
                      fontWeight: 600
                    }} 
                  />
                </Box>
                <Typography variant="h2" sx={{ fontWeight: 800, color: '#D4A24A', mb: 0.5 }}>
                  {appointments.length}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                  Total clients served
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Chat Rooms */}
          <Grid item xs={12} md={3}>
            <Card 
              sx={{ 
                background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.05)})`, 
                borderLeft: `4px solid ${theme.palette.secondary.main}`,
                transition: 'transform 0.2s',
                '&:hover': { transform: 'translateY(-4px)' }
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Chat sx={{ fontSize: 40, color: 'secondary.main' }} />
                  <Chip 
                    label="Active" 
                    size="small" 
                    sx={{ 
                      bgcolor: alpha(theme.palette.secondary.main, 0.2),
                      color: theme.palette.secondary.dark,
                      fontWeight: 600
                    }} 
                  />
                </Box>
                <Typography variant="h2" sx={{ fontWeight: 800, color: 'secondary.main', mb: 0.5 }}>
                  {chatRooms.length}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                  Moderated chat rooms
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Charts Section */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {/* Appointment Status Distribution */}
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3, height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <Assessment sx={{ color: 'primary.main', fontSize: 28 }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Appointment Status Distribution
                </Typography>
              </Box>
              {totalAppointments > 0 ? (
                <Box>
                  {Object.entries(statusCounts).map(([status, count]) => (
                    <Box key={status} sx={{ mb: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body1" sx={{ textTransform: 'capitalize', fontWeight: 600 }}>
                          {status}
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 700, color: 'primary.main' }}>
                          {count} ({((count / totalAppointments) * 100).toFixed(0)}%)
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={(count / totalAppointments) * 100} 
                        sx={{ 
                          height: 12, 
                          borderRadius: 6,
                          bgcolor: alpha(
                            status === 'scheduled' ? theme.palette.primary.main : 
                            status === 'completed' ? '#4CAF50' : 
                            '#EF5350', 
                            0.15
                          ),
                          '& .MuiLinearProgress-bar': {
                            bgcolor: status === 'scheduled' ? theme.palette.primary.main : 
                                     status === 'completed' ? '#4CAF50' : 
                                     '#EF5350',
                            borderRadius: 6
                          }
                        }} 
                      />
                    </Box>
                  ))}
                </Box>
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="body1" color="text.secondary">
                    No appointments data yet
                  </Typography>
                </Box>
              )}
            </Card>
          </Grid>

          {/* Completion Rate */}
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3, height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <TrendingUp sx={{ color: '#4CAF50', fontSize: 28 }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Practice Performance
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center', py: 2 }}>
                <Box sx={{ position: 'relative', display: 'inline-flex', mb: 3 }}>
                  <Box sx={{ 
                    width: 160, 
                    height: 160, 
                    borderRadius: '50%', 
                    background: `conic-gradient(#4CAF50 ${completionRate * 3.6}deg, ${alpha('#4CAF50', 0.15)} 0deg)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 24px rgba(76, 175, 80, 0.2)'
                  }}>
                    <Box sx={{ 
                      width: 130, 
                      height: 130, 
                      borderRadius: '50%', 
                      bgcolor: 'background.paper',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column'
                    }}>
                      <Typography variant="h2" sx={{ fontWeight: 800, color: '#4CAF50' }}>
                        {completionRate.toFixed(0)}%
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                        Completion Rate
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  {completedAppointments} of {appointments.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  sessions completed successfully
                </Typography>
              </Box>
            </Card>
          </Grid>
        </Grid>

        {/* Quick Actions */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: 'primary.main' }}>
            Quick Actions
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Button 
                fullWidth 
                variant="contained" 
                onClick={() => navigate('/appointments')} 
                sx={{ py: 2, fontWeight: 600 }}
              >
                View All Appointments
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button 
                fullWidth 
                variant="outlined" 
                onClick={() => navigate('/chat-rooms')} 
                sx={{ py: 2, fontWeight: 600 }}
              >
                Moderate Chat Rooms
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button 
                fullWidth 
                variant="outlined" 
                onClick={() => navigate('/ai-assistant')} 
                sx={{ py: 2, fontWeight: 600 }}
              >
                Test AI Assistant
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* Today's Schedule */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: 'primary.main' }}>
            Today's Schedule
          </Typography>
          {todayAppointments.length === 0 ? (
            <Card sx={{ p: 4, textAlign: 'center', border: '2px dashed', borderColor: 'divider' }}>
              <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 500 }}>
                No appointments scheduled for today
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Enjoy your day or use this time for professional development
              </Typography>
            </Card>
          ) : (
            <Grid container spacing={2}>
              {todayAppointments.map((apt) => (
                <Grid item xs={12} md={6} key={apt.id}>
                  <Card sx={{ 
                    p: 2.5, 
                    borderLeft: '4px solid',
                    borderColor: 'primary.main',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateX(4px)',
                      boxShadow: `0 4px 16px ${alpha(theme.palette.primary.main, 0.15)}`
                    }
                  }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {apt.client?.name}
                      </Typography>
                      <Chip 
                        label={apt.status} 
                        size="small" 
                        color={apt.status === 'scheduled' ? 'primary' : 'default'}
                        sx={{ fontWeight: 600 }}
                      />
                    </Box>
                    <Typography variant="h6" sx={{ color: 'primary.main', mb: 0.5, fontWeight: 600 }}>
                      {new Date(apt.appointmentDate).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Duration: {apt.duration} minutes
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Container>
    </>
  );
}

export default TherapistDashboard;
