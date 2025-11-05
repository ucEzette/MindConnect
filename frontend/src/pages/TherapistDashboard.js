import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { appointmentAPI, chatAPI } from '../services/api';
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  AppBar,
  Toolbar,
  IconButton,
  Chip
} from '@mui/material';
import {
  ExitToApp as LogoutIcon,
  Event as EventIcon,
  Chat as ChatIcon,
  People as PeopleIcon
} from '@mui/icons-material';

