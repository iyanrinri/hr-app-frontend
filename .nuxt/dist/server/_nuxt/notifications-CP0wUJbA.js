import { I as defineStore } from "../server.mjs";
const useNotificationStore = defineStore("notifications", {
  state: () => ({
    notifications: [],
    unreadCount: 0,
    isConnected: false,
    dashboardUpdateTrigger: 0,
    socket: null
    // Type this properly if needed, but 'any' avoids complications
  }),
  actions: {
    setConnected(status) {
      this.isConnected = status;
    },
    addNotification(notification) {
      this.notifications.unshift(notification);
      this.unreadCount++;
    },
    incrementDashboardTrigger() {
      this.dashboardUpdateTrigger++;
    },
    markAsRead() {
      this.unreadCount = 0;
    },
    clearNotifications() {
      this.notifications = [];
      this.unreadCount = 0;
    },
    setSocket(socket) {
      this.socket = socket;
    }
  }
});
export {
  useNotificationStore as u
};
//# sourceMappingURL=notifications-CP0wUJbA.js.map
