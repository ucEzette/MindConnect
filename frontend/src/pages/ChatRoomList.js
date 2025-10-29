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

