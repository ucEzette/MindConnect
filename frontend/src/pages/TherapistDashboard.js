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
  Switch,
  FormControlLabel,
  alpha,
  Paper
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
      <AppBar position="static" sx={{ background: `linear-gradient(135deg, #1b5e20, #2e7d32)` }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton color="inherit" onClick={() => navigate('/dashboard')}>
              <Home />
            </IconButton>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Therapist Portal | Dr. {user?.name}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Chip label="Therapist" color="secondary" size="small" />
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
              Welcome Back, Dr. {user?.name} 👋
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Here's your practice overview for today
            </Typography>
          </Box>
        </Box>

        {/* Statistics Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={3}>
            <Card sx={{ background: `linear-gradient(135deg, ${alpha('#10b981', 0.1)}, ${alpha('#10b981', 0.2)})`, borderLeft: '4px solid #10b981' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Event sx={{ fontSize: 40, color: '#10b981' }} />
                  <Chip label="Today" size="small" sx={{ bgcolor: alpha('#10b981', 0.2) }} />
                </Box>
                <Typography variant="h2" sx={{ fontWeight: 800, color: '#10b981', mb: 0.5 }}>
                  {todayAppointments.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Sessions scheduled today
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card sx={{ background: `linear-gradient(135deg, ${alpha('#3b82f6', 0.1)}, ${alpha('#3b82f6', 0.2)})`, borderLeft: '4px solid #3b82f6' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <TrendingUp sx={{ fontSize: 40, color: '#3b82f6' }} />
                  <Chip label="This Week" size="small" sx={{ bgcolor: alpha('#3b82f6', 0.2) }} />
                </Box>
                <Typography variant="h2" sx={{ fontWeight: 800, color: '#3b82f6', mb: 0.5 }}>
                  {thisWeekAppointments.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Upcoming appointments
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card sx={{ background: `linear-gradient(135deg, ${alpha('#f59e0b', 0.1)}, ${alpha('#f59e0b', 0.2)})`, borderLeft: '4px solid #f59e0b' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <People sx={{ fontSize: 40, color: '#f59e0b' }} />
                  <Chip label="Total" size="small" sx={{ bgcolor: alpha('#f59e0b', 0.2) }} />
                </Box>
                <Typography variant="h2" sx={{ fontWeight: 800, color: '#f59e0b', mb: 0.5 }}>
                  {appointments.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total clients served
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card sx={{ background: `linear-gradient(135deg, ${alpha('#8b5cf6', 0.1)}, ${alpha('#8b5cf6', 0.2)})`, borderLeft: '4px solid #8b5cf6' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Chat sx={{ fontSize: 40, color: '#8b5cf6' }} />
                  <Chip label="Active" size="small" sx={{ bgcolor: alpha('#8b5cf6', 0.2) }} />
                </Box>
                <Typography variant="h2" sx={{ fontWeight: 800, color: '#8b5cf6', mb: 0.5 }}>
                  {chatRooms.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
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
            <Card sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <Assessment sx={{ color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Appointment Status Distribution
                </Typography>
              </Box>
              {totalAppointments > 0 ? (
                <Box>
                  {Object.entries(statusCounts).map(([status, count]) => (
                    <Box key={status} sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="body2" sx={{ textTransform: 'capitalize', fontWeight: 500 }}>
                          {status}
                        </Typography>
                        <Typography variant="body2" fontWeight="bold">
                          {count} ({((count / totalAppointments) * 100).toFixed(0)}%)
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={(count / totalAppointments) * 100} 
                        sx={{ 
                          height: 10, 
                          borderRadius: 5,
                          bgcolor: alpha(status === 'scheduled' ? '#3b82f6' : status === 'completed' ? '#10b981' : '#ef4444', 0.2),
                          '& .MuiLinearProgress-bar': {
                            bgcolor: status === 'scheduled' ? '#3b82f6' : status === 'completed' ? '#10b981' : '#ef4444',
                            borderRadius: 5
                          }
                        }} 
                      />
                    </Box>
                  ))}
                </Box>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No appointments yet
                </Typography>
              )}
            </Card>
          </Grid>

          {/* Completion Rate */}
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <TrendingUp sx={{ color: 'success.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Practice Performance
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center', py: 3 }}>
                <Box sx={{ position: 'relative', display: 'inline-flex', mb: 2 }}>
                  <Box sx={{ 
                    width: 150, 
                    height: 150, 
                    borderRadius: '50%', 
                    background: `conic-gradient(#10b981 ${completionRate * 3.6}deg, ${alpha('#10b981', 0.2)} 0deg)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Box sx={{ 
                      width: 120, 
                      height: 120, 
                      borderRadius: '50%', 
                      bgcolor: 'background.paper',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column'
                    }}>
                      <Typography variant="h3" sx={{ fontWeight: 800, color: '#10b981' }}>
                        {completionRate.toFixed(0)}%
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Completion
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Typography variant="body1" color="text.secondary">
                  {completedAppointments} of {appointments.length} sessions completed
                </Typography>
              </Box>
            </Card>
          </Grid>
        </Grid>

        {/* Quick Actions */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            Quick Actions
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Button fullWidth variant="contained" onClick={() => navigate('/appointments')} sx={{ py: 2 }}>
                View All Appointments
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button fullWidth variant="outlined" onClick={() => navigate('/chat-rooms')} sx={{ py: 2 }}>
                Moderate Chat Rooms
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button fullWidth variant="outlined" onClick={() => navigate('/ai-assistant')} sx={{ py: 2 }}>
                Test AI Assistant
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* Upcoming Appointments */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            Today's Schedule
          </Typography>
          {todayAppointments.length === 0 ? (
            <Card sx={{ p: 3 }}>
              <Typography variant="body1" color="text.secondary">
                No appointments scheduled for today
              </Typography>
            </Card>
          ) : (
            <Grid container spacing={2}>
              {todayAppointments.map((apt) => (
                <Grid item xs={12} md={6} key={apt.id}>
                  <Card sx={{ p: 2, borderLeft: '4px solid', borderColor: 'primary.main' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {apt.client?.name}
                      </Typography>
                      <Chip label={apt.status} size="small" color={apt.status === 'scheduled' ? 'primary' : 'default'} />
                    </Box>
                    <Typography variant="body2" color="primary.main" sx={{ mb: 0.5 }}>
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
