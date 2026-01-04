import { defineStore } from 'pinia'

interface AttendanceNotification {
  type: 'CLOCK_IN' | 'CLOCK_OUT';
  employeeId: string;
  employeeName: string;
  timestamp: string;
  message: string;
}

export const useNotificationStore = defineStore('notifications', {
  state: () => ({
    notifications: [] as AttendanceNotification[],
    unreadCount: 0,
    isConnected: false,
    dashboardUpdateTrigger: 0,
    socket: null as any // Type this properly if needed, but 'any' avoids complications
  }),
  actions: {
    setConnected(status: boolean) {
      this.isConnected = status
    },
    addNotification(notification: AttendanceNotification) {
      this.notifications.unshift(notification)
      this.unreadCount++
    },
    incrementDashboardTrigger() {
      this.dashboardUpdateTrigger++
    },
    markAsRead() {
      this.unreadCount = 0
    },
    clearNotifications() {
      this.notifications = []
      this.unreadCount = 0
    },
    setSocket(socket: any) {
        this.socket = socket
    }
  }
})
