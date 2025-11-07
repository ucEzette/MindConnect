import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data) => api.put('/auth/profile', data)
};

export const chatAPI = {
  getRooms: () => api.get('/chat/rooms'),
  createRoom: (data) => api.post('/chat/rooms', data),
  getRoomMessages: (roomId) => api.get(`/chat/rooms/${roomId}/messages`),
  saveMessage: (data) => api.post('/chat/messages', data)
};

export const appointmentAPI = {
  getTherapists: () => api.get('/appointments/therapists'),
  createAppointment: (data) => api.post('/appointments', data),
  getUserAppointments: () => api.get('/appointments/user'),
  getTherapistAppointments: () => api.get('/appointments/therapist'),
  updateAppointment: (id, data) => api.put(`/appointments/${id}`, data)
};

export const aiAPI = {
  chat: (data) => api.post('/ai/chat', data)
};

export default api;
