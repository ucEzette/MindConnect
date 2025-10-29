import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { aiAPI } from '../services/api';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  List,
  ListItem,
  AppBar,
  Toolbar,
  IconButton,
  Alert
} from '@mui/material';
import { ArrowBack as BackIcon, Send as SendIcon } from '@mui/icons-material';

function AIAssistant() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I\'m here to support you. How are you feeling today? Remember, I\'m an AI assistant and while I can provide support, please reach out to a licensed therapist or emergency services if you\'re in crisis.',
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [crisis, setCrisis] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;

    const userMsg = {
      role: 'user',
      content: newMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setNewMessage('');
    setLoading(true);

    try {
      const conversationHistory = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const response = await aiAPI.chat({
        message: newMessage,
        conversationHistory
      });

      const aiMsg = {
        role: 'assistant',
        content: response.data.response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMsg]);
      
      if (response.data.isCrisis) {
        setCrisis(true);
      }
    } catch (error) {
      console.error('AI chat error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'I\'m experiencing technical difficulties. Please try again or contact a therapist directly.',
        timestamp: new Date()
      }]);
    } finally {
      setLoading(false);
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
            AI Mental Health Assistant
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ height: 'calc(100vh - 140px)', display: 'flex', flexDirection: 'column', py: 2 }}>
        {crisis && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setCrisis(false)}>
            <strong>Crisis Detected:</strong> If you're experiencing a mental health emergency, please call:
            <br />
            • Emergency Services: 911 (US) or your local emergency number
            <br />
            • Crisis Helpline: 988 (US Suicide & Crisis Lifeline)
            <br />
            • Or visit your nearest emergency room
          </Alert>
        )}

        <Paper
          elevation={3}
          sx={{
            flex: 1,
            overflow: 'auto',
            p: 2,
            mb: 2,
            backgroundColor: '#f5f5f5'
          }}
        >
          <List>
            {messages.map((msg, index) => (
              <ListItem
                key={index}
                sx={{
                  flexDirection: 'column',
                  alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  mb: 1
                }}
              >
                <Paper
                  sx={{
                    p: 1.5,
                    maxWidth: '80%',
                    backgroundColor: msg.role === 'user' ? '#1976d2' : '#fff',
                    color: msg.role === 'user' ? '#fff' : '#000'
                  }}
                >
                  <Typography variant="caption" display="block" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                    {msg.role === 'user' ? 'You' : 'AI Assistant'}
                  </Typography>
                  <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                    {msg.content}
                  </Typography>
                  <Typography variant="caption" display="block" sx={{ mt: 0.5, opacity: 0.7 }}>
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </Typography>
                </Paper>
              </ListItem>
            ))}
            {loading && (
              <ListItem>
                <Typography variant="body2" color="text.secondary">
                  AI is typing...
                </Typography>
              </ListItem>
            )}
            <div ref={messagesEndRef} />
          </List>
        </Paper>

        <Paper elevation={3} sx={{ p: 2 }}>
          <form onSubmit={handleSendMessage}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                fullWidth
                placeholder="Share what's on your mind..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                variant="outlined"
                size="small"
                multiline
                maxRows={3}
                disabled={loading}
              />
              <Button
                type="submit"
                variant="contained"
                endIcon={<SendIcon />}
                disabled={loading}
              >
                Send
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </>
  );
}

export default AIAssistant;
