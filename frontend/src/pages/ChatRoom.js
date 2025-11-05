import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { chatAPI } from '../services/api';
import {
  Container, Box, Typography, TextField, Button, Paper,
  AppBar, Toolbar, IconButton, Avatar, Card
} from '@mui/material';
import { ArrowBack as BackIcon, Send as SendIcon } from '@mui/icons-material';

function ChatRoom() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [roomInfo, setRoomInfo] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    loadMessages();
    // Mock room info
    setRoomInfo({
      roomName: 'Anxiety Support Group',
      topic: 'Managing Daily Anxiety',
      participants: 12
    });
  }, [roomId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadMessages = async () => {
    try {
      const res = await chatAPI.getRoomMessages(roomId);
      setMessages(res.data.messages || []);
    } catch (error) {
      console.error('Failed to load messages:', error);
      // Mock messages for demo
      setMessages([
        {
          id: 1,
          content: 'Welcome to the anxiety support group! Feel free to share your thoughts.',
          User: { name: 'Dr. Sarah Johnson', userType: 'therapist' },
          createdAt: new Date(Date.now() - 3600000)
        },
        {
          id: 2,
          content: 'Thank you for creating this safe space. I\'ve been struggling lately.',
          User: { name: 'Alex', userType: 'patient' },
          createdAt: new Date(Date.now() - 1800000)
        }
      ]);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const messageData = {
      roomId,
      content: newMessage,
      messageType: 'text'
    };

    try {
      await chatAPI.saveMessage(messageData);
      // Add message to local state immediately
      const newMsg = {
        id: Date.now(),
        content: newMessage,
        User: { name: 'You', userType: 'patient' },
        createdAt: new Date()
      };
      setMessages(prev => [...prev, newMsg]);
      setNewMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: '#6d28d9' }}>
        <Toolbar>
          <IconButton color="inherit" onClick={() => navigate('/chat-rooms')}>
            <BackIcon />
          </IconButton>
          <Box>
            <Typography variant="h6">{roomInfo?.roomName}</Typography>
            <Typography variant="caption" sx={{ opacity: 0.8 }}>
              {roomInfo?.participants} participants • {roomInfo?.topic}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ height: 'calc(100vh - 140px)', display: 'flex', flexDirection: 'column', py: 2 }}>
        {/* Messages Area */}
        <Paper 
          elevation={3}
          sx={{ 
            flex: 1, 
            overflow: 'auto', 
            p: 2, 
            mb: 2, 
            bgcolor: '#f9f8ff',
            borderRadius: 2
          }}
        >
          {messages.map((msg) => (
            <Box key={msg.id} sx={{ mb: 2 }}>
              <Card 
                sx={{ 
                  p: 2,
                  ml: msg.User?.userType === 'therapist' ? 0 : 4,
                  mr: msg.User?.userType === 'therapist' ? 4 : 0,
                  bgcolor: msg.User?.userType === 'therapist' ? '#e3f2fd' : '#ffffff',
                  borderLeft: msg.User?.userType === 'therapist' ? '4px solid #6d28d9' : 'none'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Avatar 
                    sx={{ 
                      bgcolor: msg.User?.userType === 'therapist' ? '#6d28d9' : '#4f46e5',
                      width: 32, 
                      height: 32, 
                      mr: 1,
                      fontSize: '0.8rem'
                    }}
                  >
                    {msg.User?.name?.charAt(0) || 'U'}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {msg.User?.name}
                      {msg.User?.userType === 'therapist' && (
                        <Typography component="span" variant="caption" sx={{ ml: 1, color: '#6d28d9' }}>
                          (Therapist)
                        </Typography>
                      )}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(msg.createdAt).toLocaleTimeString()}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                  {msg.content}
                </Typography>
              </Card>
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </Paper>

        {/* Message Input */}
        <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
          <form onSubmit={handleSend}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                fullWidth
                placeholder="Type your message here..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                variant="outlined"
                size="small"
                multiline
                maxRows={3}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2
                  }
                }}
              />
              <Button
                type="submit"
                variant="contained"
                endIcon={<SendIcon />}
                sx={{ 
                  bgcolor: '#6d28d9',
                  minWidth: 100,
                  borderRadius: 2,
                  '&:hover': { bgcolor: '#5b21b6' }
                }}
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

export default ChatRoom;
