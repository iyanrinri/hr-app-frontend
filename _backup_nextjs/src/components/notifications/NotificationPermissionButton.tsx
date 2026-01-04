'use client';

import { Button } from '@/components/ui/Button';
import { Bell, BellOff } from 'lucide-react';
import { useState } from 'react';

export function NotificationPermissionButton() {
  const [permission, setPermission] = useState<NotificationPermission>(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      return Notification.permission;
    }
    return 'default';
  });

  const requestPermission = async () => {
    if ('Notification' in window) {
      const result = await Notification.requestPermission();
      setPermission(result);
      
      if (result === 'granted') {
        // Show test notification
        new Notification('Notifications Enabled! 🎉', {
          body: 'You will now receive attendance updates',
          icon: '/favicon.ico',
        });
      }
    }
  };

  if (!('Notification' in window)) {
    return null;
  }

  if (permission === 'granted') {
    return (
      <div className="flex items-center gap-2 text-sm text-green-600">
        <Bell className="w-4 h-4" />
        <span>Notifications enabled</span>
      </div>
    );
  }

  if (permission === 'denied') {
    return (
      <div className="flex items-center gap-2 text-sm text-red-600">
        <BellOff className="w-4 h-4" />
        <span>Notifications blocked</span>
      </div>
    );
  }

  return (
    <Button onClick={requestPermission} variant="secondary" className="text-sm">
      <Bell className="w-4 h-4 mr-2" />
      Enable Notifications
    </Button>
  );
}
