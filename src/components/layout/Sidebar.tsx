'use client';

import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Users, Clock, Settings, LogOut, Bell, Calendar, CalendarClock, ChevronLeft, ChevronRight, FileText, CheckSquare, Timer, Hourglass, BarChart3, Banknote, Wallet } from 'lucide-react';
import { useLogout } from '@/hooks/useAuth';
import { useAuthStore } from '@/store/authStore';
import { useNotifications } from '@/hooks/useNotifications';
import { useState } from 'react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, roles: ['SUPER', 'ADMIN', 'HR', 'EMPLOYEE'] },
  { name: 'My Attendance', href: '/dashboard/attendance', icon: Clock, roles: ['SUPER', 'ADMIN', 'HR', 'EMPLOYEE'] },
  { name: "Today's Attendance", href: '/dashboard/attendance/today', icon: Bell, roles: ['SUPER', 'ADMIN', 'HR'] },
  { name: 'Employees', href: '/dashboard/employees', icon: Users, roles: ['SUPER', 'ADMIN', 'HR'] },
  { name: 'Attendance Periods', href: '/dashboard/attendance-periods', icon: Calendar, roles: ['SUPER', 'ADMIN', 'HR'] },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings, roles: ['SUPER', 'ADMIN'] },
  { name: 'Leave Config', href: '/dashboard/leaves/periods', icon: CalendarClock, roles: ['SUPER', 'ADMIN', 'HR'] },
  { name: 'My Leaves', href: '/dashboard/leaves/my', icon: FileText }, // All roles
  { name: 'Approvals', href: '/dashboard/leaves/approvals', icon: CheckSquare, roles: ['SUPER', 'ADMIN', 'HR', 'MANAGER'] },
  // Overtime
  { name: 'My Overtime', href: '/dashboard/overtime/my', icon: Timer }, // All roles
  { name: 'Pending Overtime', href: '/dashboard/overtime/pending', icon: Hourglass, roles: ['SUPER', 'ADMIN', 'HR', 'MANAGER'] },
  { name: 'Approval History', href: '/dashboard/overtime/approvals', icon: CheckSquare, roles: ['SUPER', 'ADMIN', 'HR', 'MANAGER'] },
  { name: 'Overtime Admin', href: '/dashboard/overtime/admin', icon: BarChart3, roles: ['SUPER', 'ADMIN', 'HR'] },
  // Payroll
  { name: 'Payroll', href: '/dashboard/payroll', icon: Banknote, roles: ['SUPER', 'ADMIN', 'HR'] },
  { name: 'Payslips', href: '/dashboard/payslips', icon: FileText, roles: ['SUPER', 'ADMIN', 'HR'] },
  { name: 'My Salary', href: '/dashboard/payroll/my', icon: Wallet }, // All roles
  { name: 'My Payslips', href: '/dashboard/payslips/my', icon: FileText }, // All roles
];

export function Sidebar() {
  const pathname = usePathname();
  const logout = useLogout();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const user = useAuthStore((state) => state.user);
  const { unreadCount } = useNotifications();
  const params = useParams();
  const tenantSlug = params?.tenant_slug as string;

  // Filter navigation items based on user role and update hrefs
  const filteredNavigation = navigation.filter((item) => {
    if (item.name === 'Approvals' && user?.hasSubordinates) {
      return true;
    }
    return !item.roles || (user?.role && item.roles.includes(user.role));
  }).map(item => ({
    ...item,
    href: tenantSlug ? `/${tenantSlug}${item.href}` : item.href
  }));

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
      <div className="p-4 border-t border-gray-200 space-y-2">
        {!isCollapsed && user && (
           <Link href={tenantSlug ? `/${tenantSlug}/dashboard/profile` : '/dashboard/profile'} className="flex items-center p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors mb-2">
             <div className="h-8 w-8 rounded-full bg-brand-navy flex items-center justify-center text-white shrink-0">
               <span className="text-xs font-bold">{(user.name || 'U').charAt(0).toUpperCase()}</span>
             </div>
             <div className="ml-3 overflow-hidden">
               <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
               <p className="text-xs text-gray-500 truncate">{user.role}</p>
             </div>
           </Link>
        )}
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
