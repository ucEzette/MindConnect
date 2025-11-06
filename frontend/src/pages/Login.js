import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {Container,Box,TextField,Button,Typography,Alert,Paper} from '@mui/material';


function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
     const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await response.json();
      
      // Store token in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Navigate to dashboard
      navigate('/dashboard');
    } catch (error) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box 
      sx={{ 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        bgcolor: '#f3f5f9',
        flexDirection: 'column'
      }}
    >
      <Paper
        elevation={4}
        sx={{
          bgcolor: 'white',
          p: 5,
          borderRadius: 3,
          width: '90%',
          maxWidth: 400,
          textAlign: 'center',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
        }}
      >
        <Typography 
          variant="h4" 
          sx={{ 
            mb: 3,
            color: '#2b2b52',
            fontWeight: 600
          }}
        >
          Welcome Back
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            sx={{ 
              mb: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: 1.5,
                '&:focus-within': {
                  '& fieldset': {
                    borderColor: '#4b7bec'
                  }
                }
              }
            }}
          />

          <TextField
            fullWidth
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            sx={{ 
              mb: 1,
              '& .MuiOutlinedInput-root': {
                borderRadius: 1.5,
                '&:focus-within': {
                  '& fieldset': {
                    borderColor: '#4b7bec'
                  }
                }
              }
            }}
          />

          <Box sx={{ textAlign: 'right', mb: 2 }}>
            <Link 
              to="/forgot-password"
              style={{
                fontSize: '0.9rem',
                color: '#6d28d9',
                textDecoration: 'none',
                fontWeight: 'normal'
              }}
            >
              Forgot Password?
            </Link>
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{
              mt: 1,
              py: 1.5,
              bgcolor: '#6d28d9',
              borderRadius: 1.5,
              fontSize: '1rem',
              fontWeight: 600,
              '&:hover': {
                bgcolor: '#5b21b6'
              },
              '&:disabled': {
                bgcolor: '#ccc'
              }
            }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>

        <Typography sx={{ mt: 2 }}>
          Don't have an account?{' '}
          <Link 
            to="/register"
            style={{
              color: '#4b7bec',
              textDecoration: 'none',
              fontWeight: 'bold'
            }}
          >
            Register here
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}

export default Login;




