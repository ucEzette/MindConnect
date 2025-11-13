import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Button, Grid, Card, CardContent, AppBar, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';


function LandingPage() {
  const navigate = useNavigate();


  return (
    <Box sx={{ bgcolor: '#f9f8ff' }}>
      {/* Navbar */}
      <AppBar 
        position="sticky" 
        elevation={0} 
        sx={{ 
          bgcolor: alpha(theme.palette.background.paper, 0.95), 
          backdropFilter: 'blur(10px)', 
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}` 
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 8 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box 
              component="img" 
              src="/connect.png" 
              alt="MindConnect" 
              sx={{ width: 40, height: 40 }} 
            />
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 700, 
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`, 
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent' 
              }}
            >
              MindConnect
            </Typography>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 4 }}>
            {['Home', 'Features', 'About', 'Contact'].map((item) => (
              <Button 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                sx={{ color: theme.palette.text.primary, fontWeight: 500 }}
              >
                {item}
              </Button>
            ))}
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
                variant="contained"
                onClick={() => navigate('/register')}
                sx={{
                  bgcolor: '#6d28d9',
                  borderRadius: '25px',
                  px: 3,
                  py: 1.5,
                  '&:hover': { bgcolor: '#5b21b6' }
                }}
              >
                Get Started
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate('/register')}
                sx={{
                  borderColor: '#6d28d9',
                  color: '#6d28d9',
                  borderRadius: '25px',
                  px: 3,
                  py: 1.5,
                  '&:hover': { bgcolor: '#f5f3ff', borderColor: '#6d28d9' }
                }}
              >
                One integrated platform combining professional therapy, AI-powered support, and peer communities, because mental health care should never be fragmented.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button 
                  variant="contained" 
                  size="large" 
                  onClick={() => navigate('/register')} 
                  endIcon={<ArrowForward />} 
                  sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}
                >
                  Get Started Free
                </Button>
                <Button 
                  variant="outlined" 
                  size="large" 
                  onClick={() => navigate('/register')} 
                  sx={{ 
                    px: 4, 
                    py: 1.5, 
                    fontSize: '1.1rem', 
                    borderWidth: 2, 
                    '&:hover': { borderWidth: 2 } 
                  }}
                >
                  Talk to AI
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box 
                component="img" 
                src="./connect.png" 
                alt="Mental health" 
                sx={{ 
                  width: '100%', 
                  maxWidth: 400, 
                  mx: 'auto', 
                  display: 'block', 
                  filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.15))' 
                }} 
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Problem Statement */}
      <Box 
        sx={{ 
          py: 8, 
          px: { xs: 2, md: 8 }, 
          bgcolor: theme.palette.mode === 'dark' 
            ? alpha(theme.palette.error.main, 0.05) 
            : alpha(theme.palette.error.main, 0.03) 
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h3" align="center" sx={{ fontWeight: 700, mb: 3 }}>
            The Mental Health Crisis
          </Typography>
          <Typography 
            variant="h6" 
            align="center" 
            sx={{ 
              color: theme.palette.text.secondary, 
              mb: 6, 
              maxWidth: 800, 
              mx: 'auto' 
            }}
          >
            <strong>970 million people globally</strong> suffer from mental health disorders, yet <strong>85% face a treatment gap</strong> in low and middle-income countries. Existing solutions are fragmented therapy apps lack community, community apps lack professional support. Users juggle multiple platforms during their most vulnerable moments.
          </Typography>
          <Grid container spacing={3}>
            {stats.map((stat, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card 
                  sx={{ 
                    textAlign: 'center', 
                    py: 3, 
                    background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.1)})` 
                  }}
                >
                  <CardContent>
                    <Typography 
                      variant="h2" 
                      sx={{ 
                        fontWeight: 800, 
                        color: theme.palette.primary.main, 
                        mb: 1 
                      }}
                    >
                      {stat.number}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                      {stat.label}
                    </Typography>
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                      {stat.sublabel}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Box>

      {/* Features Section */}
      <Box id="features" sx={{ py: 8, px: { xs: 2, md: '10%' }, textAlign: 'center' }}>
        <Typography variant="h3" sx={{ mb: 5, fontWeight: 'bold', color: '#2e1065' }}>
          Everything You Need for Mental Wellness
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {[
            {
              title: 'Talk to Therapists',
              description: 'Book one-on-one sessions with certified mental health therapists.'
            },
            {
              title: 'Join Communities',
              description: 'Share experiences and find strength in supportive peer groups.'
            },
            {
              title: '24/7 AI Assistant',
              description: 'Get instant emotional support and mental wellness tips.'
            }
          ].map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  bgcolor: '#f3f0ff',
                  borderRadius: '15px',
                  boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
                  height: '100%'
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#6d28d9' }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#555' }}>
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* About Section */}
      <Box id="about" sx={{ py: 8, px: { xs: 2, md: '10%' }, textAlign: 'center', bgcolor: '#e0f2fe' }}>
        <Typography variant="h3" sx={{ mb: 5, fontWeight: 'bold', color: '#2e1065' }}>
          How It Works
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {[
            { title: 'Create Account', description: 'Sign up securely as a patient or therapist.' },
            { title: 'Connect', description: 'Find therapists, join chat rooms, or start a conversation with AI.' },
            { title: 'Grow', description: 'Track your emotional journey.' }
          ].map((step, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  bgcolor: '#ffffff',
                  borderRadius: '15px',
                  boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
                  height: '100%'
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#6d28d9' }}>
                    {step.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#555' }}>
                    {step.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Testimonials Section */}
      <Box sx={{ py: 8, px: { xs: 2, md: '10%' }, textAlign: 'center', bgcolor: '#f9f8ff' }}>
        <Typography variant="h3" sx={{ mb: 5, fontWeight: 'bold', color: '#2e1065' }}>
          What Our Users Say
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {[
            { quote: '"MindConnect gave me hope and the courage to open up again."', author: 'Faith, Community Member' },
            { quote: '"As a therapist, it\'s fulfilling to reach people who truly need care."', author: 'Dr. Sarah' }
          ].map((testimonial, index) => (
            <Grid item xs={12} sm={6} md={5} key={index}>
              <Card
                sx={{
                  bgcolor: '#f3f0ff',
                  borderRadius: '15px',
                  boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
                  fontStyle: 'italic'
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="body1" sx={{ mb: 2, color: '#555' }}>
                    {testimonial.quote}
                  </Typography>
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#6d28d9' }}>
                    {testimonial.author}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Call to Action */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #6d28d9, #4f46e5)',
          py: 8,
          px: { xs: 2, md: '10%' },
          textAlign: 'center',
          color: '#fff'
        }}
      >
        <Typography variant="h3" sx={{ mb: 2, fontWeight: 'bold' }}>
          Your healing journey starts here
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Join thousands finding safety with MindConnect today.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            onClick={() => navigate('/register')}
            sx={{
              bgcolor: '#fff',
              color: '#6d28d9',
              borderRadius: '25px',
              px: 3,
              py: 1.5,
              '&:hover': { bgcolor: '#f3f0ff' }
            }}
          >
            Join as Patient
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate('/register')}
            sx={{
              borderColor: '#fff',
              color: '#fff',
              borderRadius: '25px',
              px: 3,
              py: 1.5,
              '&:hover': { bgcolor: '#7c3aed', borderColor: '#fff' }
            }}
          >
            Join as Therapist
          </Button>
        </Box>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: '#1e1b4b', color: '#ccc', textAlign: 'center', py: 3 }}>
        <Typography variant="body2">
          © 2025 MindConnect. All Rights Reserved.
        </Typography>
      </Box>
    </Box>
  );
}

export default LandingPage;
