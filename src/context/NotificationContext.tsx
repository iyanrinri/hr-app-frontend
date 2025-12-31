'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuthStore } from '@/store/authStore';
import { toast } from 'react-hot-toast';
import { UserCheck, BarChart3, AlertTriangle } from 'lucide-react';

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
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (!token) return;

    // Only connect WebSocket for SUPER/ADMIN/HR roles
    const allowedRoles = ['SUPER', 'ADMIN', 'HR'];
    if (!user || !allowedRoles.includes(user.role)) {
      console.log('ℹ️ WebSocket disabled for role:', user?.role || 'unknown');
      return;
    }

    // Extract tenantSlug from URL pathname (e.g., /my_company/dashboard/...)
    const pathParts = window.location.pathname.split('/');
    const tenantSlug = pathParts[1]; // First segment after /
    
    if (!tenantSlug) {
      console.warn('⚠️ No tenantSlug found in URL');
      return;
    }

    console.log('🔌 Initializing WebSocket for role:', user.role);

    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().then((permission) => {
        console.log('📢 Notification permission:', permission);
      });
    }

    // Connect to WebSocket - FIXED: Use /attendance namespace
    const socketInstance = io(`${process.env.NEXT_PUBLIC_SOCKET_URL}/attendance`, {
      auth: {
        token: `Bearer ${token}`
      },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000
    });


    socketInstance.on('connect_error', (error) => {
      console.error('❌ [WebSocket] Connection Error:', error);
    });

    socketInstance.on('connect', () => {
      console.log('✅ Connected to attendance WebSocket');
      setIsConnected(true);
      
      // FIXED: Emit join-tenant event to join the tenant room (matches backend)
      socketInstance.emit('join-tenant', { tenantSlug });
      console.log('🏢 Emitting join-tenant for:', tenantSlug);
    });

    socketInstance.on('disconnect', () => {
      console.log('❌ Disconnected from attendance WebSocket');
      setIsConnected(false);
    });

    // Listen for successful room join confirmation
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    socketInstance.on('joined', (data: any) => {
      console.log('✅ Successfully joined tenant room:', data);
    });

    // FIXED: Listen to attendance.dashboard_update event
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    socketInstance.on('attendance.dashboard_update', (data: any) => {
      console.log('� [ATTENDANCE.DASHBOARD-UPDATE] Received:', {
        timestamp: new Date().toISOString(),
        data: data
      });
      
      // Trigger dashboard refresh
      setDashboardUpdateTrigger((prev) => prev + 1);

      // Parse dashboard data to show notifications
      const { presentEmployees = [], lateEmployees = [] } = data;
      
      // Show notification for latest employee activity
      if (presentEmployees.length > 0) {
        const latestEmployee = presentEmployees[0];
        const isLate = lateEmployees.some((emp: { id: string }) => emp.id === latestEmployee.id);
        
        const notification: AttendanceNotification = {
          type: 'CLOCK_IN',
          employeeId: latestEmployee.id,
          employeeName: `${latestEmployee.firstName} ${latestEmployee.lastName}`,
          timestamp: latestEmployee.checkIn || new Date().toISOString(),
          message: isLate 
            ? `${latestEmployee.firstName} ${latestEmployee.lastName} clocked in (Late)` 
            : `${latestEmployee.firstName} ${latestEmployee.lastName} clocked in`
        };

        setNotifications((prev) => [notification, ...prev]);
        setUnreadCount((prev) => prev + 1);

        const Icon = isLate ? AlertTriangle : UserCheck;
        const iconColor = isLate ? 'text-yellow-600' : 'text-green-600';

        toast.success(notification.message, {
          duration: 10000,
          position: 'top-right',
          icon: <Icon className={`w-6 h-6 ${iconColor}`} />
        });
      }

      // General dashboard update toast
      toast.success('Dashboard updated', {
        duration: 5000,
        position: 'top-right',
        icon: <BarChart3 className="w-6 h-6 text-brand-navy" />
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

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [token, user]);

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
