import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container, Box, Typography, TextField, Button, Paper,
  AppBar, Toolbar, IconButton, Avatar, Card
} from '@mui/material';
import { ArrowBack as BackIcon, Send as SendIcon } from '@mui/icons-material';

const ChatRoom = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [roomInfo, setRoomInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);
    useEffect(() => {
    fetchRoomData();
    fetchMessages();
  }, [roomId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchRoomData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/chat/rooms/${roomId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch room data');
      }
      const data = await response.json();
      setRoomInfo(data);
    } catch (error) {
      console.error('Error fetching room data:', error);
      // Fallback room info
      setRoomInfo({
        _id: roomId,
        name: 'Chat Room',
        participants: []
      });
    }
  };

    const fetchMessages = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/chat/rooms/${roomId}/messages`);
      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const messageData = {
      roomId,
      content: newMessage,
      sender: 'You', // In real app, get from auth context
      timestamp: new Date().toISOString()
    };

    try {
      const response = await fetch(`http://localhost:5000/api/chat/rooms/${roomId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageData)
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      // Add message to local state immediately for better UX
      const newMsg = {
        _id: Date.now().toString(),
        content: newMessage,
        sender: 'You',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, newMsg]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    }
  };

  if (loading) {
    return (
      <Container sx={{ mt: 4, textAlign: 'center' }}>
        <Typography>Loading chat room...</Typography>
      </Container>
    );
  }

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: '#6d28d9' }}>
        <Toolbar>
          <IconButton color="inherit" onClick={() => navigate(-1)}>
            <BackIcon />
          </IconButton>
          <Box>
            <Typography variant="h6">
              {roomInfo?.name || 'Chat Room'}
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.8 }}>
              {roomInfo?.participants ? `${roomInfo.participants.length} participants` : ''}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <Container 
        maxWidth="md" 
        sx={{ 
          height: 'calc(100vh - 140px)', 
          display: 'flex', 
          flexDirection: 'column', 
          py: 2 
        }}
              >
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
          {messages.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body1" color="text.secondary">
                No messages yet. Start the conversation!
              </Typography>
            </Box>
          ) : (
                        messages.map((msg) => (
              <Box key={msg._id} sx={{ mb: 2 }}>
                <Card 
                  sx={{ 
                    p: 2,
                    ml: msg.sender === 'You' ? 4 : 0,
                    mr: msg.sender === 'You' ? 0 : 4,
                    bgcolor: msg.sender === 'You' ? '#e3f2fd' : '#ffffff',
                    borderLeft: msg.sender !== 'You' ? '4px solid #6d28d9' : 'none'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Avatar 
                      sx={{ 
                        bgcolor: msg.sender === 'You' ? '#4f46e5' : '#6d28d9',
                        width: 32, 
                        height: 32, 
                        mr: 1,
                        fontSize: '0.8rem'
                      }}
                    >
                      {msg.sender?.charAt(0) || 'U'}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {msg.sender}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString() : 'Now'}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                    {msg.content}
                  </Typography>
                </Card>
              </Box>
            ))
          )}
          <div ref={messagesEndRef} />
        </Paper>

        {/* Message Input */}
        <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
          <form onSubmit={handleSendMessage}>
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