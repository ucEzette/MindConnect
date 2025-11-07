import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { chatAPI } from '../services/api';
import socketService from '../services/socket';
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
  IconButton
} from '@mui/material';
import { ArrowBack as BackIcon, Send as SendIcon } from '@mui/icons-material';

function ChatRoom() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [room, setRoom] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    loadRoom();
    loadMessages();
    joinRoom();

    return () => {
      socketService.leaveRoom(roomId);
    };
  }, [roomId]);

  useEffect(() => {
    socketService.onMessage((message) => {
      setMessages((prev) => [...prev, message]);
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadRoom = async () => {
    try {
      const response = await chatAPI.getRooms();
      const foundRoom = response.data.rooms.find(r => r.id === roomId);
      setRoom(foundRoom);
    } catch (error) {
      console.error('Failed to load room:', error);
    }
  };

  const loadMessages = async () => {
    try {
      const response = await chatAPI.getRoomMessages(roomId);
      setMessages(response.data.messages);
    } catch (error) {
      console.error('Failed to load messages:', error);
    }
  };

  const joinRoom = () => {
    socketService.joinRoom(roomId);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (newMessage.trim()) {
      socketService.sendMessage({
        roomId,
        content: newMessage,
        userId: user.id,
        userName: user.name
      });
      
      setNewMessage('');
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
            {room?.roomName || 'Chat Room'}
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ height: 'calc(100vh - 140px)', display: 'flex', flexDirection: 'column', py: 2 }}>
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
            {messages.map((msg) => (
              <ListItem
                key={msg.id}
                sx={{
                  flexDirection: 'column',
                  alignItems: msg.userId === user.id ? 'flex-end' : 'flex-start',
                  mb: 1
                }}
              >
                <Paper
                  sx={{
                    p: 1.5,
                    maxWidth: '70%',
                    backgroundColor: msg.userId === user.id ? '#1976d2' : '#fff',
                    color: msg.userId === user.id ? '#fff' : '#000'
                  }}
                >
                  <Typography variant="caption" display="block" sx={{ fontWeight: 'bold' }}>
                    {msg.userName || msg.User?.name}
                  </Typography>
                  <Typography variant="body1">{msg.content}</Typography>
                  <Typography variant="caption" display="block" sx={{ mt: 0.5, opacity: 0.7 }}>
                    {new Date(msg.createdAt).toLocaleTimeString()}
                  </Typography>
                </Paper>
              </ListItem>
            ))}
            <div ref={messagesEndRef} />
          </List>
        </Paper>

        <Paper elevation={3} sx={{ p: 2 }}>
          <form onSubmit={handleSendMessage}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                fullWidth
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                variant="outlined"
                size="small"
              />
              <Button
                type="submit"
                variant="contained"
                endIcon={<SendIcon />}
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
