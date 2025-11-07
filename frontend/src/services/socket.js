import { io } from 'socket.io-client';

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';

class SocketService {
  constructor() {
    this.socket = null;
  }

  connect(userId) {
    this.socket = io(SOCKET_URL, { transports: ['websocket'], autoConnect: true });
    this.socket.on('connect', () => {
      console.log('Socket connected:', this.socket.id);
      this.socket.emit('user-connected', userId);
    });
    this.socket.on('disconnect', () => console.log('Socket disconnected'));
    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  joinRoom(roomId) {
    if (this.socket) this.socket.emit('join-room', roomId);
  }

  leaveRoom(roomId) {
    if (this.socket) this.socket.emit('leave-room', roomId);
  }

  sendMessage(data) {
    if (this.socket) this.socket.emit('send-message', data);
  }

  onMessage(callback) {
    if (this.socket) this.socket.on('receive-message', callback);
  }

  emitTyping(data) {
    if (this.socket) this.socket.emit('typing', data);
  }

  emitStopTyping(data) {
    if (this.socket) this.socket.emit('stop-typing', data);
  }

  onTyping(callback) {
    if (this.socket) this.socket.on('user-typing', callback);
  }

  onStopTyping(callback) {
    if (this.socket) this.socket.on('user-stop-typing', callback);
  }
}

export default new SocketService();
