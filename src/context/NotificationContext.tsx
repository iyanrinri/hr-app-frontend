'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuthStore } from '@/store/authStore';
import { toast } from 'react-hot-toast';

interface AttendanceNotification {
  type: 'CLOCK_IN' | 'CLOCK_OUT';
  employeeId: string;
  employeeName: string;
  timestamp: string;
  message: string;
}

interface NotificationContextType {
  socket: Socket | null;
  notifications: AttendanceNotification[];
  isConnected: boolean;
  unreadCount: number;
  dashboardUpdateTrigger: number;
  markAsRead: () => void;
  clearNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [notifications, setNotifications] = useState<AttendanceNotification[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [dashboardUpdateTrigger, setDashboardUpdateTrigger] = useState(0);
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    console.log('🔄 [NotificationContext] Checking token:', token ? 'Token exists' : 'No token');
    
    if (!token) return;

    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().then((permission) => {
        console.log('📢 Notification permission:', permission);
      });
    }

    console.log('🔌 [NotificationContext] Attempting to connect to ws://localhost:3000/notifications');

    // Connect to WebSocket
    const socketInstance = io('ws://localhost:3000/notifications', {
      auth: {
        token: `Bearer ${token}`
      },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000
    });

    socketInstance.on('connect_error', (err) => {
      console.error('❌ [NotificationContext] Connection Error:', err.message);
    });

    socketInstance.on('connect', () => {
      console.log('✅ Connected to notifications WebSocket');
      setIsConnected(true);
    });

    socketInstance.on('disconnect', () => {
      console.log('❌ Disconnected from notifications WebSocket');
      setIsConnected(false);
    });

    socketInstance.on('attendance-notification', (data: AttendanceNotification) => {
      console.log('🔔 [ATTENDANCE-NOTIFICATION] Received:', {
        type: data.type,
        employeeId: data.employeeId,
        employeeName: data.employeeName,
        timestamp: data.timestamp,
        message: data.message,
        fullData: data
      });
      setNotifications((prev) => [data, ...prev]);
      setUnreadCount((prev) => prev + 1);

      // Show toast notification
      toast.success(data.message || `${data.employeeName} - ${data.type}`, {
        duration: 5000,
        position: 'top-right',
        icon: '🔔'
      });

      // Show browser notification
      if ('Notification' in window && Notification.permission === 'granted') {
        const notification = new Notification('Attendance Update', {
          body: data.message || `${data.employeeName} - ${data.type}`,
          icon: '/favicon.ico',
          badge: '/favicon.ico',
          tag: 'attendance-notification',
          requireInteraction: false,
        });

        // Play notification sound
        const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIGGS57OihUBELTKXh8bllHAU2jdXvzn0pBSh+zPLaizsKGGO56+mjUhELTKXh8bllHAU2jdXvzn0pBSh+zPLaizsKGGO56+mjUhELTKXh8bllHAU2jdXvzn0pBSh+zPLaizsKGGO56+mjUhELTKXh8bllHAU2jdXvzn0pBSh+zPLaizsKGGO56+mjUhELTKXh8bllHAU2jdXvzn0pBSh+zPLaizsKGGO56+mjUhELTKXh8bllHAU2jdXvzn0pBSh+zPLaizsKGGO56+mjUhELTKXh8bllHAU2jdXvzn0pBSh+zPLaizsKGGO56+mjUhELTKXh8bllHAU2jdXvzn0pBSh+zPLaizsKGGO56+mjUhELTKXh8bllHAU2jdXvzn0pBSh+zPLaizsKGGO56+mjUhELTKXh8bllHAU2jdXvzn0pBSh+zPLaizsKGGO56+mjUhELTKXh8bllHAU2jdXvzn0pBSh+zPLaizsKGGO56+mjUhELTKXh8bllHAU2jdXvzn0pBSh+zPLaizsKGGO56+mjUhELTKXh8bllHAU2jdXvzn0pBSh+zPLaizsKGGO56+mjUhELTKXh8bllHAU2jdXvzn0pBSh+zPLaizsKGGO56+mjUhELTKXh8bllHAU2jdXvzn0pBSh+zPLaizsKGGO56+mjUhELTKXh8bllHAU2jdXvzn0pBSh+zPLaizsKGGO56+mjUhELTKXh8bllHAU2jdXvzn0pBSh+zPLaizsKGGO56+mjUhELTKXh8bllHAU2jdXvzn0pBSh+zPLaizsKGGO56+mjUhELTKXh8bllHAU2jdXvzn0pBSh+zPLaizsKGGO56+mjUhELTKXh8bllHAU2jdXvzn0pBSh+zPLaizsKGGO56+mjUhELTKXh8bllHAU2jdXvzn0pBSh+zPLaizsKGGO56+mjUhELTKXh8bllHAU2jdXvzn0pBSh+zPLaizsKGGO56+mjUhELTKXh8bllHAU2jdXvzn0pBSh+zPLaizsKGGO56+mjUhELTKXh8bllHAU2jdXvzn0pBSh+zPLaizsKGGO56+mjUhELTKXh8bllHAU2jdXvzn0pBSh+zPLaizsKGGO56+mjUhELTKXh8bllHAU2jdXvzn0pBSh+zPLaizsKGGO56+mjUhELTKXh8bllHAU2jdXvzn0pBSh+zPLaizsKGGO56+mjUhELTKXh8bllHAU2jdXvzn0pBSh+zPLaizsKGGO56+mjUhELTKXh8bllHAU2jdXvzn0pBSh+zPLaizsKGGO56+mjUhELTKXh8bllHAU2jdXvzn0pBSh+zPLaizsKGGO56+mjUhELTKXh8bllHAU2jdXvzn0pBSh+zPLaizsKGGO56+mjUhELTKXh8bllHAU2jdXvzn0pBSh+zPLaizsKGGO56+mjUhELTKXh8bllHAU2jdXvzn0pBSh+zPLaizsKGGO56+mjUhELTKXh8bllHAU2jdXvzn0pBSh+zPLaizsKGGO56+mjUhELTKXh8bllHAU2jdXvzn0pBSh+zPLaizsKGGO56+mjUhELTKXh8bllHAU2jdXvzn0pBSh+zPLaizsKGGO56+mjUhELTKXh8bllHAU2jdXvzn0pBSh+zPLaizsKGGO56+mjUhELTKXh8bllHAU2jdXvzn0pBSh+zPLaizsKGGO56+mjUhELTKXh8bllHAU2jdXvzn0pBSh+zPLaizsKGGO56+mjUhELTKXh8bllHAU2jdXvzn0pBSh+zPLaizsKGGO56+mjUhELTKXh8bllHAU2jdXvzn0pBSh+zPLaizsKGGO56+mjUhELTKXh8bllHAU2jdXvzn0pBSh+zPLaizsKGGO56+mjUhELTKXh8bllHAU2jdXvzn0pBSh+zPLaizsKGGO56+mjUhELTKXh8bllHAU2jdXvzn0pBSh+zPLaizsKGGO56+mjUhELTKXh8bllHAU2jdXvzn0pBSh+zPLaizsKGGO56+mjUhELTKXh8bllHAU2jdXvzn0pBSh+zPLaizsKGGO56+mjUhELTKXh8bllHAU2jdXvzn0pBSh+zPLaizsKGGO56+mjUhELTKXh8bllHAU2jdXvzn0pBSh+zPLaizsKGGO56+mjUhELTKXh8bllHAU2jdXvzn0pBSh+zPLaizsKGGO56+mjUhELTKXh8bllHAU2jdXvzn0pBSh+zPLaizsKGGO56+mjUhELTKXh8bllHAU2jdXvzn0pBSh+zPLaizsKGGO56+mjUhELTKXh8bllHAU2jdXvzn0pBSh+zPLaizsKGGO56+mjUhELTKXh8bllHAU2jdXvzn0pBSh+zPLaizsKGGO56+mjUhELTKXh8bllHAU2jdXvzn0pBSh+zPLaizsKGGO56+mjUhELTKXh8bllHAU2jdXvzn0pBSh+zPLaizsKGGO56+mjUhELTKXh8bllHAU2jdXvzn0pBSh+zPLaizsKGGO56+mjUhELTKXh8bllHAU2jdXvzn0pBSh+zPLaizsKGGO56+mjUhELTKXh8bllHAU2jdXvzn0pBSh+zPLaizsKGGO56+mjUhELTKXh8bllHAU2jdXvzn0pBSh+zPLaizsKGGO56+mjUhELTKXh8bllHAU2jdXvzn0pBSh+zPLaizsKGGO56+mjUhELTKXh8bllHAU2jdXvzn0pBSh+zPLaizsKGGO56+mjUhELTKXh8bllHAU2jdXvzn0pBSh+zPLaizsKGGO56+mjUhELTKXh8bllHAU2jdXvzn0pBSh+zPLaizsKGGO56+mjUhELTKXh8bllHAU2jdXvzn0pBSh+zPLaizsKGGO56+mjUhELTKXh8bllHAU');
        audio.play().catch(err => console.log('Could not play sound:', err));

        // Auto-close notification after 5 seconds
        setTimeout(() => notification.close(), 5000);
      }
    });

    socketInstance.on('dashboard-update', (event: any) => {
      console.log('📊 [DASHBOARD-UPDATE] Received:', {
        timestamp: new Date().toISOString(),
        data: event
      });
      
      // Trigger dashboard refresh by incrementing counter
      setDashboardUpdateTrigger((prev) => prev + 1);

      // Show toast notification using the message from the event
      // Structure might be event.data.message or event.message depending on backend
      const message = event?.data?.message || event?.message || 'Attendance Updated';
      
      toast.success(message, {
        duration: 5000,
        position: 'top-right',
        icon: '📊'
      });
    });

    // Catch all events for debugging
    socketInstance.onAny((eventName, ...args) => {
      console.log('📡 [WEBSOCKET EVENT]', {
        event: eventName,
        args: args,
        timestamp: new Date().toISOString()
      });
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [token]);

  const markAsRead = () => {
    setUnreadCount(0);
  };

  const clearNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
  };

  return (
    <NotificationContext.Provider
      value={{
        socket,
        notifications,
        isConnected,
        unreadCount,
        dashboardUpdateTrigger,
        markAsRead,
        clearNotifications
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotificationContext() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotificationContext must be used within a NotificationProvider');
  }
  return context;
}
