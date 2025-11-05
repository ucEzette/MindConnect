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

