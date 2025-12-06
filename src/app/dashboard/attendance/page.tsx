'use client';

import { useClockIn, useClockOut, useTodayAttendance } from '@/hooks/useAttendance';
import { useAttendanceStats } from '@/hooks/useAttendance';
import { EmployeeSelector } from '@/components/attendance/EmployeeSelector';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Clock, LogIn, LogOut, MapPin, Calendar, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import Link from 'next/link';

export default function AttendancePage() {
  const user = useAuthStore((state) => state.user);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
  const [notes, setNotes] = useState('');
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const { data: todayAttendance, isLoading: loadingToday } = useTodayAttendance();
  const { mutate: clockIn, isPending: clockingIn } = useClockIn();
  const { mutate: clockOut, isPending: clockingOut } = useClockOut();

  // Get current month stats
  const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0];
  const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString().split('T')[0];
  const { data: stats } = useAttendanceStats(startOfMonth, endOfMonth, selectedEmployeeId);

  const getLocation = (): Promise<{ latitude: number; longitude: number }> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by your browser'));
        return;
      }

      setIsGettingLocation(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setIsGettingLocation(false);
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          setIsGettingLocation(false);
          reject(error);
        }
      );
    });
  };

  const handleClockIn = async () => {
    try {
      const location = await getLocation();
      clockIn({
        ...location,
        notes: notes || undefined,
      });
      setNotes('');
    } catch (error) {
      alert('Please enable location access to clock in');
    }
  };

  const handleClockOut = async () => {
    try {
      const location = await getLocation();
      clockOut({
        ...location,
        notes: notes || undefined,
      });
      setNotes('');
    } catch (error) {
      alert('Please enable location access to clock out');
    }
  };

  const formatTime = (dateString: string | null) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      PRESENT: 'bg-green-100 text-green-800',
      LATE: 'bg-yellow-100 text-yellow-800',
      ABSENT: 'bg-red-100 text-red-800',
      EXCUSED: 'bg-blue-100 text-blue-800',
    };
    return badges[status as keyof typeof badges] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">My Attendance</h2>
        <div className="flex items-center gap-4">
          <Link href="/dashboard/attendance/history">
            <Button variant="secondary">View History</Button>
          </Link>
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </div>
      </div>

      {/* Employee Selector for HR/SUPER */}
      {(user?.role === 'HR' || user?.role === 'SUPER') && (
        <Card>
          <CardContent className="pt-6">
            <EmployeeSelector
              selectedEmployeeId={selectedEmployeeId}
              onEmployeeChange={setSelectedEmployeeId}
            />
          </CardContent>
        </Card>
      )}

      {/* Today's Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Today's Attendance
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loadingToday ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-navy"></div>
            </div>
          ) : todayAttendance ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Clock In</p>
                  <p className="text-2xl font-bold text-gray-900">{formatTime(todayAttendance.checkIn)}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Clock Out</p>
                  <p className="text-2xl font-bold text-gray-900">{formatTime(todayAttendance.checkOut)}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Total Hours</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {todayAttendance.workDuration ? `${(todayAttendance.workDuration / 60).toFixed(1)}h` : '-'}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(todayAttendance.status)}`}>
                    {todayAttendance.status}
                  </span>
                </div>
                {todayAttendance.notes && (
                  <p className="text-sm text-gray-600 italic">"{todayAttendance.notes}"</p>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No attendance record for today
            </div>
          )}
        </CardContent>
      </Card>

      {/* Clock In/Out Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Clock In/Out</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Notes (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add any notes about your attendance..."
                className="w-full px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-brand-cyan focus:border-brand-cyan bg-white text-black"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                onClick={handleClockIn}
                disabled={clockingIn || isGettingLocation || !!todayAttendance?.checkIn}
                className="py-6 text-lg"
              >
                <LogIn className="w-6 h-6 mr-2" />
                {isGettingLocation ? 'Getting Location...' : 'Clock In'}
              </Button>
              <Button
                onClick={handleClockOut}
                disabled={clockingOut || isGettingLocation || !todayAttendance?.checkIn || !!todayAttendance?.checkOut}
                variant="secondary"
                className="py-6 text-lg"
              >
                <LogOut className="w-6 h-6 mr-2" />
                {isGettingLocation ? 'Getting Location...' : 'Clock Out'}
              </Button>
            </div>

            <div className="flex items-center justify-center text-sm text-gray-500">
              <MapPin className="w-4 h-4 mr-1" />
              Location will be recorded automatically
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      {stats && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              This Month's Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-3xl font-bold text-green-600">{stats.totalPresent}</p>
                <p className="text-sm text-gray-600 mt-1">Present</p>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <p className="text-3xl font-bold text-red-600">{stats.totalAbsent}</p>
                <p className="text-sm text-gray-600 mt-1">Absent</p>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <p className="text-3xl font-bold text-yellow-600">{stats.totalLate}</p>
                <p className="text-sm text-gray-600 mt-1">Late</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-3xl font-bold text-blue-600">{stats.averageHours ? (stats.averageHours / 60).toFixed(1) : '0.0'}h</p>
                <p className="text-sm text-gray-600 mt-1">Avg Hours</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
