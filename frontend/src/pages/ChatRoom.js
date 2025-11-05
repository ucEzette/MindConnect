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

