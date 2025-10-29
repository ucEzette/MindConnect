import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { chatAPI, appointmentAPI } from '../services/api';
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
  IconButton
} from '@mui/material';
import {
  Chat as ChatIcon,
  SmartToy as AIIcon,
  Event as EventIcon,
  ExitToApp as LogoutIcon
} from '@mui/icons-material';

