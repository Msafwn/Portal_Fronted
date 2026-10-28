import { io } from 'socket.io-client';

let socket = null;

const SOCKET_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export const connectSocket = (user, token) => {
  const userId = user?._id || user?.id;
  const role = user?.role;

  if (socket && socket.connected) {
    if (userId) {
      socket.emit('join', { userId, role });
    }
    return socket;
  }

  socket = io(SOCKET_URL, {
    auth: {
      token: token || localStorage.getItem('token') || '',
    },
    query: {
      userId: userId || '',
      role: role || '',
    },
    transports: ['websocket', 'polling'],
    reconnection: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 2000,
  });

  socket.on('connect', () => {
    console.log('⚡ [WebSocket] Connected to Notification Server, ID:', socket.id);
    if (userId) {
      socket.emit('join', { userId, role });
    }
  });

  socket.on('disconnect', (reason) => {
    console.log('⚡ [WebSocket] Disconnected:', reason);
  });

  socket.on('connect_error', (error) => {
    console.warn('⚡ [WebSocket] Connection note:', error.message);
  });

  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

