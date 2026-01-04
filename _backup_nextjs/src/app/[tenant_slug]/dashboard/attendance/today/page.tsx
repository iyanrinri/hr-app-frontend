'use client';

import { useTodayAttendanceDashboard } from '@/hooks/useAttendance';
import { useNotifications } from '@/hooks/useNotifications';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  Users, 
  UserCheck, 
  UserX, 
  Clock, 
  Calendar,
  RefreshCw
} from 'lucide-react';
import { useEffect } from 'react';
import Link from 'next/link';
import { NotificationPermissionButton } from '@/components/notifications/NotificationPermissionButton';
import { useParams } from 'next/navigation';

export default function TodayAttendanceDashboardPage() {
  const params = useParams();
  const tenantSlug = params?.tenant_slug as string;
  const { data: dashboard, isLoading, refetch } = useTodayAttendanceDashboard();
  const { notifications, isConnected, dashboardUpdateTrigger } = useNotifications();

  // Auto-refresh when new notification arrives
  useEffect(() => {
    if (notifications.length > 0) {
      console.log('🔄 [AUTO-REFRESH] Dashboard refreshing due to new notification', {
        notificationCount: notifications.length,
        latestNotification: notifications[0],
        timestamp: new Date().toISOString()
      });
      refetch();
    }
  }, [notifications, refetch]);

  // Auto-refresh when dashboard-update event is received
  useEffect(() => {
    if (dashboardUpdateTrigger > 0) {
      console.log('🔄 [AUTO-REFRESH] Dashboard refreshing due to dashboard-update event', {
        triggerCount: dashboardUpdateTrigger,
        timestamp: new Date().toISOString()
      });
      refetch();
    }
  }, [dashboardUpdateTrigger, refetch]);

  const formatTime = (dateObj: string | number | Date | null | undefined) => {
    if (!dateObj) return '-';
    try {
      const date = new Date(dateObj);
      return date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    } catch {
      return '-';
    }
  };

  const getStatusBadge = (status?: string) => {
    const badges = {
      PRESENT: 'bg-green-100 text-green-800',
      LATE: 'bg-yellow-100 text-yellow-800',
      ABSENT: 'bg-red-100 text-red-800',
      EXCUSED: 'bg-blue-100 text-blue-800',
    };
    return badges[status as keyof typeof badges] || 'bg-gray-100 text-gray-800';
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-navy mb-4"></div>
        <p className="text-gray-600">Loading today&apos;s attendance...</p>
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="text-center py-12 text-gray-500">
        No attendance data available for today
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Today&apos;s Attendance Dashboard</h2>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="w-4 h-4 mr-2" />
              {new Date(dashboard.date).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
            <div className="flex items-center text-sm">
              <div className={`w-2 h-2 rounded-full mr-2 ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
              {isConnected ? 'Live Updates Active' : 'Disconnected'}
            </div>
            <NotificationPermissionButton />
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => refetch()} variant="secondary">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Link href={tenantSlug ? `/${tenantSlug}/dashboard/attendance/history` : '/dashboard/attendance/history'}>
            <Button variant="secondary">View History</Button>
          </Link>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Employees</p>
                <p className="text-3xl font-bold text-gray-900">{dashboard.summary.totalEmployees}</p>
              </div>
              <Users className="w-10 h-10 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Present</p>
                <p className="text-3xl font-bold text-green-600">{dashboard.summary.totalPresent}</p>
                <p className="text-xs text-gray-500 mt-1">{dashboard.summary.attendanceRate.toFixed(0)}% rate</p>
              </div>
              <UserCheck className="w-10 h-10 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Absent</p>
                <p className="text-3xl font-bold text-red-600">{dashboard.summary.totalAbsent}</p>
              </div>
              <UserX className="w-10 h-10 text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Late</p>
                <p className="text-3xl font-bold text-yellow-600">{dashboard.summary.totalLate}</p>
                <p className="text-xs text-gray-500 mt-1">{dashboard.summary.lateRate.toFixed(0)}% rate</p>
              </div>
              <Clock className="w-10 h-10 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Period Info */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Attendance Period</p>
              <p className="text-lg font-bold text-gray-900">{dashboard.attendancePeriod.name}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Working Hours</p>
              <p className="text-lg font-bold text-gray-900">
                {dashboard.attendancePeriod.workingStartTime} - {dashboard.attendancePeriod.workingEndTime}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Tolerance: {dashboard.attendancePeriod.toleranceMinutes} minutes
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Present Employees */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <UserCheck className="w-5 h-5 mr-2 text-green-600" />
            Present Employees ({dashboard.presentEmployees.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {dashboard.presentEmployees.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Position</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Check In</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Check Out</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {dashboard.presentEmployees.map((employee) => (
                    <tr key={employee.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {employee.firstName} {employee.lastName}
                          </p>
                          <p className="text-sm text-gray-500">{employee.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {employee.department}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {employee.position}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatTime(employee.checkIn)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatTime(employee.checkOut)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {employee.workDuration ? `${(employee.workDuration / 60).toFixed(1)}h` : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col gap-1">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(employee.status)}`}>
                            {employee.status}
                          </span>
                          {employee.isLate && (
                            <span className="text-xs text-yellow-600">
                              Late by {employee.minutesLate} min
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-gray-500 py-4">No employees present yet</p>
          )}
        </CardContent>
      </Card>

      {/* Absent Employees */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <UserX className="w-5 h-5 mr-2 text-red-600" />
            Absent Employees ({dashboard.absentEmployees.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {dashboard.absentEmployees.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Position</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {dashboard.absentEmployees.map((employee) => (
                    <tr key={employee.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {employee.firstName} {employee.lastName}
                          </p>
                          <p className="text-sm text-gray-500">{employee.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {employee.department}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {employee.position}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-gray-500 py-4">All employees are present! 🎉</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
