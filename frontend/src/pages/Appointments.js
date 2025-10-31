import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { appointmentAPI } from '../services/api';
import {
  Container, Box, Typography, Grid, Card, CardContent, Button,
  AppBar, Toolbar, IconButton, Dialog, DialogContent, TextField, Avatar
} from '@mui/material';
import { ArrowBack as BackIcon, Person, Group, Phone } from '@mui/icons-material';

function Appointments() {
  const navigate = useNavigate();
  const [therapists, setTherapists] = useState([]);
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState('');
  const [sessionType, setSessionType] = useState('individual');

  useEffect(() => {
    appointmentAPI.getTherapists().then(res => 
      setTherapists(res.data.therapists.map(t => ({
        ...t,
        avatar: t.User?.name?.charAt(0) || 'T'
      })))
    );
  }, []);

 const handleBook = async () => {
    try {
      await appointmentAPI.createAppointment({
        therapistId: selectedTherapist.id,
        appointmentDate: new Date(appointmentDate).toISOString()
      });
      alert('Booked successfully!');
      setOpenDialog(false);
    } catch (error) {
      alert('Booking failed');
    }
  };

  const sessions = [
    { type: 'individual', title: 'Individual', icon: <Person />, price: 120 },
    { type: 'group', title: 'Group', icon: <Group />, price: 80 },
    { type: 'phone', title: 'Phone', icon: <Phone />, price: 100 }
  ];