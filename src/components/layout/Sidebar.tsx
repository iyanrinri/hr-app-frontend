'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Users, Clock, Settings, LogOut, Bell, Calendar, CalendarClock, ChevronLeft, ChevronRight, FileText, CheckSquare } from 'lucide-react';
import { useLogout } from '@/hooks/useAuth';
import { useAuthStore } from '@/store/authStore';
import { useNotifications } from '@/hooks/useNotifications';
import { useState } from 'react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, roles: ['SUPER', 'HR', 'EMPLOYEE'] },
  { name: 'My Attendance', href: '/dashboard/attendance', icon: Clock, roles: ['SUPER', 'HR', 'EMPLOYEE'] },
  { name: "Today's Attendance", href: '/dashboard/attendance/today', icon: Bell, roles: ['SUPER', 'HR'] },
  { name: 'Employees', href: '/dashboard/employees', icon: Users, roles: ['SUPER', 'HR'] },
  { name: 'Attendance Periods', href: '/dashboard/attendance-periods', icon: Calendar, roles: ['SUPER', 'HR'] },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings, roles: ['SUPER'] },
  { name: 'Leave Config', href: '/dashboard/leaves/periods', icon: CalendarClock, roles: ['SUPER', 'HR'] },
  { name: 'My Leaves', href: '/dashboard/leaves/my', icon: FileText }, // All roles
  { name: 'Approvals', href: '/dashboard/leaves/approvals', icon: CheckSquare, roles: ['SUPER', 'HR', 'MANAGER'] },
];

export function Sidebar() {
  const pathname = usePathname();
  const logout = useLogout();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const user = useAuthStore((state) => state.user);
  const { unreadCount } = useNotifications();

  // Filter navigation items based on user role
  const filteredNavigation = navigation.filter((item) => 
    !item.roles || (user?.role && item.roles.includes(user.role))
  );

  return (
    <div className={cn(
      'flex flex-col bg-white border-r border-gray-200 min-h-screen transition-all duration-300',
      isCollapsed ? 'w-20' : 'w-64'
    )}>
      <div className="flex items-center justify-between h-16 border-b border-gray-200 px-4">
        {!isCollapsed && (
          <span className="text-xl font-bold text-brand-navy">HR Portal</span>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-md hover:bg-gray-100 transition-colors ml-auto"
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-1">
        {filteredNavigation.map((item) => {
          const isActive = pathname === item.href;
          const isTodayAttendance = item.href === '/dashboard/attendance/today';
          const showBadge = isTodayAttendance && unreadCount > 0;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors relative',
                isActive
                  ? 'bg-brand-light text-brand-navy'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                isCollapsed && 'justify-center'
              )}
              title={isCollapsed ? item.name : ''}
            >
              <item.icon className={cn('w-5 h-5', !isCollapsed && 'mr-3')} />
              {!isCollapsed && item.name}
              {showBadge && (
                <span className="ml-auto bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={logout}
          className={cn(
            'flex items-center w-full px-4 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 transition-colors',
            isCollapsed && 'justify-center'
          )}
          title={isCollapsed ? 'Logout' : ''}
        >
          <LogOut className={cn('w-5 h-5', !isCollapsed && 'mr-3')} />
          {!isCollapsed && 'Logout'}
        </button>
      </div>
    </div>
  );
}
