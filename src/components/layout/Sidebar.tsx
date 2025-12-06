'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Users, LayoutDashboard, LogOut, ChevronLeft, ChevronRight, Calendar, Clock } from 'lucide-react';
import { useLogout } from '@/hooks/useAuth';
import { useAuthStore } from '@/store/authStore';
import { useState } from 'react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, roles: ['SUPER', 'HR', 'EMPLOYEE'] },
  { name: 'My Attendance', href: '/dashboard/attendance', icon: Clock, roles: ['SUPER', 'HR', 'EMPLOYEE'] },
  { name: 'Employees', href: '/dashboard/employees', icon: Users, roles: ['SUPER', 'HR', 'EMPLOYEE'] },
  { name: 'Attendance Periods', href: '/dashboard/attendance-periods', icon: Calendar, roles: ['SUPER', 'HR'] },
];

export function Sidebar() {
  const pathname = usePathname();
  const logout = useLogout();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const user = useAuthStore((state) => state.user);

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
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors',
                isActive
                  ? 'bg-brand-light text-brand-navy'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                isCollapsed && 'justify-center'
              )}
              title={isCollapsed ? item.name : ''}
            >
              <item.icon className={cn('w-5 h-5', !isCollapsed && 'mr-3')} />
              {!isCollapsed && item.name}
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
