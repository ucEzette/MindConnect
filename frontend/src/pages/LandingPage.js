import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Button, Grid, Card, CardContent, AppBar, Toolbar, useTheme, alpha } from '@mui/material';
import { Psychology, Groups, SmartToy, Event, ArrowForward, CheckCircle, TrendingUp, Security } from '@mui/icons-material';

function LandingPage() {
  const navigate = useNavigate();
  const theme = useTheme();

  const features = [
    { 
      icon: <Psychology sx={{ fontSize: 50, color: theme.palette.primary.main }} />, 
      title: 'Professional Therapists', 
      description: 'Connect with licensed mental health professionals for one-on-one sessions' 
    },
    { 
      icon: <Groups sx={{ fontSize: 50, color: theme.palette.secondary.main }} />, 
      title: 'Support Communities', 
      description: 'Join moderated peer groups and share experiences with others who understand' 
    },
    { 
      icon: <SmartToy sx={{ fontSize: 50, color: theme.palette.success.main }} />, 
      title: '24/7 AI Assistant', 
      description: 'Get instant emotional support and mental wellness guidance anytime' 
    }
  ];

  const stats = [
    { number: '970M', label: 'People Affected', sublabel: 'Globally with mental health disorders' },
    { number: '85%', label: 'Treatment Gap', sublabel: 'In low-income countries' },
    { number: '24/7', label: 'Always Available', sublabel: 'Support when you need it' }
  ];

  return (
    <Box>
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
              src="/output-onlinepngtools.png" 
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
            endIcon={<ArrowForward />} 
            sx={{ px: 3 }}
          >
            Sign In
          </Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box 
        id="home" 
        sx={{ 
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.1)})`, 
          py: { xs: 8, md: 12 }, 
          px: { xs: 2, md: 8 } 
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography 
                variant="overline" 
                sx={{ 
                  color: theme.palette.primary.main, 
                  fontWeight: 700, 
                  fontSize: '0.95rem', 
                  letterSpacing: 2 
                }}
              >
                BREAKING THE STIGMA
              </Typography>
              <Typography 
                variant="h2" 
                sx={{ 
                  fontSize: { xs: '2.5rem', md: '3.5rem' }, 
                  fontWeight: 800, 
                  mb: 2, 
                  lineHeight: 1.2 
                }}
              >
                Find Support.<br />
                Feel Heard.<br />
                <span style={{ 
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`, 
                  WebkitBackgroundClip: 'text', 
                  WebkitTextFillColor: 'transparent' 
                }}>
                  Heal Together.
                </span>
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  color: theme.palette.text.secondary, 
                  mb: 4, 
                  lineHeight: 1.6 
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
                src="./output-onlinepngtools.png" 
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
            <strong>970 million people globally</strong> suffer from mental health disorders, yet <strong>85% face a treatment gap</strong> in low and middle-income countries. Existing solutions are fragmented—therapy apps lack community, community apps lack professional support. Users juggle multiple platforms during their most vulnerable moments.
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
        </Container>
      </Box>

      {/* Features */}
      <Box id="features" sx={{ py: 10, px: { xs: 2, md: 8 } }}>
        <Container maxWidth="lg">
          <Typography variant="h3" align="center" sx={{ fontWeight: 700, mb: 2 }}>
            Everything You Need for Mental Wellness
          </Typography>
          <Typography 
            variant="h6" 
            align="center" 
            sx={{ color: theme.palette.text.secondary, mb: 6 }}
          >
            First platform where professional care, AI assistance, and peer community work seamlessly together
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    transition: 'transform 0.3s', 
                    '&:hover': { transform: 'translateY(-8px)' }, 
                    background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 1)}, ${alpha(theme.palette.primary.main, 0.05)})` 
                  }}
                >
                  <CardContent sx={{ p: 4, textAlign: 'center' }}>
                    <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                    <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* How It Works */}
      <Box 
        id="about" 
        sx={{ 
          py: 10, 
          px: { xs: 2, md: 8 }, 
          bgcolor: alpha(theme.palette.primary.main, 0.03) 
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h3" align="center" sx={{ fontWeight: 700, mb: 6 }}>
            How It Works
          </Typography>
          <Grid container spacing={4}>
            {[
              { 
                step: '01', 
                title: 'Create Account', 
                description: 'Sign up securely as a therapy seeker or licensed therapist in under 2 minutes', 
                icon: <CheckCircle sx={{ fontSize: 40 }} /> 
              },
              { 
                step: '02', 
                title: 'Connect & Explore', 
                description: 'Find therapists, join moderated chat rooms, or start a conversation with our AI assistant', 
                icon: <TrendingUp sx={{ fontSize: 40 }} /> 
              },
              { 
                step: '03', 
                title: 'Heal & Grow', 
                description: 'Track your emotional journey with professional support, community, and AI guidance', 
                icon: <Security sx={{ fontSize: 40 }} /> 
              }
            ].map((item, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ p: 4, height: '100%', position: 'relative', overflow: 'visible' }}>
                  <Box 
                    sx={{ 
                      position: 'absolute', 
                      top: -20, 
                      left: 20, 
                      width: 60, 
                      height: 60, 
                      borderRadius: '50%', 
                      background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`, 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      color: 'white', 
                      fontWeight: 800, 
                      fontSize: '1.5rem' 
                    }}
                  >
                    {item.step}
                  </Box>
                  <Box sx={{ mt: 4, color: theme.palette.primary.main, mb: 2 }}>
                    {item.icon}
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                    {item.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials */}
      <Box sx={{ py: 10, px: { xs: 2, md: 8 } }}>
        <Container maxWidth="lg">
          <Typography variant="h3" align="center" sx={{ fontWeight: 700, mb: 6 }}>
            What Our Users Say
          </Typography>
          <Grid container spacing={4}>
            {[
              { 
                quote: "MindConnect gave me hope and the courage to open up again. Having the AI assistant available at 3am when I couldn't sleep changed everything.", 
                author: 'Faith M.', 
                role: 'Community Member', 
                rating: 5 
              },
              { 
                quote: "As a therapist, it's incredibly fulfilling to reach people who truly need care while moderating supportive peer communities.", 
                author: 'Dr. Sarah J.', 
                role: 'Licensed Therapist', 
                rating: 5 
              }
            ].map((testimonial, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card 
                  sx={{ 
                    p: 4, 
                    height: '100%', 
                    background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)}, ${alpha(theme.palette.secondary.main, 0.05)})` 
                  }}
                >
                  <Box sx={{ display: 'flex', gap: 0.5, mb: 2 }}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Box key={i} sx={{ color: theme.palette.warning.main }}>★</Box>
                    ))}
                  </Box>
                  <Typography 
                    variant="h6" 
                    sx={{ fontStyle: 'italic', mb: 3, lineHeight: 1.6 }}
                  >
                    "{testimonial.quote}"
                  </Typography>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {testimonial.author}
                  </Typography>
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                    {testimonial.role}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA */}
      <Box 
        sx={{ 
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`, 
          py: 10, 
          px: { xs: 2, md: 8 }, 
          color: 'white', 
          textAlign: 'center' 
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" sx={{ fontWeight: 800, mb: 2 }}>
            Your Healing Journey Starts Here
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.95 }}>
            Join thousands finding safety, support, and professional care with MindConnect today
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button 
              variant="contained" 
              size="large" 
              onClick={() => navigate('/register')} 
              sx={{ 
                bgcolor: 'white', 
                color: theme.palette.primary.main, 
                px: 5, 
                py: 2, 
                fontSize: '1.1rem', 
                '&:hover': { bgcolor: alpha('#fff', 0.9) } 
              }}
            >
              Join as Patient
            </Button>
            <Button 
              variant="outlined" 
              size="large" 
              onClick={() => navigate('/register')} 
              sx={{ 
                borderColor: 'white', 
                color: 'white', 
                px: 5, 
                py: 2, 
                fontSize: '1.1rem', 
                borderWidth: 2, 
                '&:hover': { borderWidth: 2, bgcolor: alpha('#fff', 0.1) } 
              }}
            >
              Join as Therapist
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box 
        sx={{ 
          bgcolor: theme.palette.mode === 'dark' ? '#0f172a' : '#1e293b', 
          color: 'white', 
          py: 6, 
          px: { xs: 2, md: 8 } 
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                <Box 
                  component="img" 
                  src="/logo.png" 
                  alt="MindConnect" 
                  sx={{ width: 35, height: 35 }} 
                />
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  MindConnect
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Comprehensive mental health support combining professional therapy, AI assistance, and peer communities.
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="body2" align="right" sx={{ opacity: 0.8 }}>
                © 2025 MindConnect. All Rights Reserved.<br />
                <strong>Crisis Support:</strong> 988 (RW) | 116 123 (RW) | Your local emergency services
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default LandingPage;
