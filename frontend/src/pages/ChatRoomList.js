import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { chatAPI } from '../services/api';
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  AppBar,
  Toolbar,
  IconButton
} from '@mui/material';
import { ArrowBack as BackIcon } from '@mui/icons-material';

function ChatRoomList() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    try {
      const response = await chatAPI.getRooms();
      setRooms(response.data.rooms);
    } catch (error) {
      console.error('Failed to load rooms:', error);
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
            Chat Rooms
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Join a Support Community
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Connect with others who understand what you're going through
        </Typography>

        <Grid container spacing={3}>
          {rooms.map((room) => (
            <Grid item xs={12} sm={6} md={4} key={room.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {room.roomName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {room.description}
                  </Typography>
                  <Typography variant="caption" display="block">
                    Topic: {room.topic}
                  </Typography>
                  {room.moderator && (
                    <Typography variant="caption" display="block">
                      Moderated by: {room.moderator.User?.name}
                    </Typography>
                  )}
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => navigate(`/chat/${room.id}`)}
                  >
                    Join Room
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default ChatRoomList;
