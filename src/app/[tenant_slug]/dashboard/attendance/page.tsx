'use client';

import { useClockIn, useClockOut, useTodayAttendance } from '@/hooks/useAttendance';
import { useAttendanceStats } from '@/hooks/useAttendance';
import { EmployeeSelector } from '@/components/attendance/EmployeeSelector';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Clock, LogIn, LogOut, MapPin, Calendar, UserCheck, UserX, AlertTriangle, Timer } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import Link from 'next/link';
import { format } from 'date-fns';

// Helper component for Digital Clock
function DigitalClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="font-mono text-3xl md:text-4xl font-bold tracking-wider text-brand-navy">
      {time.toLocaleTimeString('en-US', { hour12: false })}
    </div>
  );
}

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
    } catch {
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
    } catch {
      alert('Please enable location access to clock out');
    }
  };

  const formatTime = (dateString: string | null) => {
    if (!dateString) return '--:--';
    return new Date(dateString).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false
    });
  };

  const getStatusColor = (status: string) => {
    const colors = {
      PRESENT: 'text-green-600 bg-green-50 ring-green-500/20',
      LATE: 'text-yellow-600 bg-yellow-50 ring-yellow-500/20',
      ABSENT: 'text-red-600 bg-red-50 ring-red-500/20',
      EXCUSED: 'text-blue-600 bg-blue-50 ring-blue-500/20',
    };
    return colors[status as keyof typeof colors] || 'text-gray-600 bg-gray-50 ring-gray-500/20';
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header with Clock */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 border-b border-gray-100 pb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Attendance</h2>
           <p className="flex items-center text-gray-500 mt-1">
            <Calendar className="w-4 h-4 mr-2" />
            {format(new Date(), 'EEEE, d MMMM yyyy')}
          </p>
        </div>
        <div className="flex flex-col items-end">
          <div className="text-xs text-gray-400 uppercase font-medium mb-1">Current Time</div>
          <DigitalClock />
        </div>
      </div>

      {/* Employee Selector for HR/SUPER/ADMIN */}
      {(user?.role === 'HR' || user?.role === 'SUPER' || user?.role === 'ADMIN') && (
        <Card className="border-none shadow-sm bg-gray-50">
          <CardContent className="pt-6">
            <EmployeeSelector
              selectedEmployeeId={selectedEmployeeId}
              onEmployeeChange={setSelectedEmployeeId}
            />
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Action Section (Today's Status + Clock In/Out) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Hero Card: Today's Status */}
          <div className="bg-white rounded-2xl shadow-xl shadow-brand-navy/5 overflow-hidden border border-gray-100 relative">
             <div className="absolute top-0 right-0 p-4 opacity-10">
               <Clock className="w-32 h-32 text-brand-navy" />
             </div>
             
             <div className="p-8 relative z-10">
               <div className="flex justify-between items-start mb-8">
                 <div>
                   <h3 className="text-lg font-medium text-gray-500">Today&apos;s Status</h3>
                   {loadingToday ? (
                      <div className="h-8 w-32 bg-gray-100 rounded animate-pulse mt-2"></div>
                   ) : (
                      <div className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold mt-2 ring-1 ring-inset ${getStatusColor(todayAttendance?.status || '')}`}>
                        {todayAttendance?.status || 'NOT STARTED'}
                      </div>
                   )}
                 </div>
                 
                 {todayAttendance?.workDuration && (
                   <div className="text-right">
                     <p className="text-sm text-gray-500">Duration</p>
                     <p className="text-3xl font-bold text-brand-navy">
                       {(todayAttendance.workDuration / 60).toFixed(1)}<span className="text-sm font-normal text-gray-400 ml-1">hrs</span>
                     </p>
                   </div>
                 )}
               </div>

               <div className="grid grid-cols-2 gap-8 mb-8">
                 <div>
                    <div className="flex items-center text-gray-400 mb-2">
                      <LogIn className="w-4 h-4 mr-2" />
                      <span className="text-xs font-medium uppercase tracking-wider">Clock In</span>
                    </div>
                    <div className="text-2xl font-mono text-gray-900">
                      {loadingToday ? '...' : formatTime(todayAttendance?.checkIn || null)}
                    </div>
                 </div>
                 <div>
                    <div className="flex items-center text-gray-400 mb-2">
                      <LogOut className="w-4 h-4 mr-2" />
                      <span className="text-xs font-medium uppercase tracking-wider">Clock Out</span>
                    </div>
                    <div className="text-2xl font-mono text-gray-900">
                      {loadingToday ? '...' : formatTime(todayAttendance?.checkOut || null)}
                    </div>
                 </div>
               </div>

               {/* Notes Input */}
               <div className="mb-6">
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add notes for your attendance (optional)..."
                    className="w-full bg-gray-50 border-0 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-navy/20 resize-none transition-all placeholder:text-gray-400"
                    rows={2}
                  />
               </div>

               {/* Action Buttons */}
               <div className="grid grid-cols-2 gap-4">
                 <Button
                   onClick={handleClockIn}
                   disabled={clockingIn || isGettingLocation || !!todayAttendance?.checkIn}
                   className={`h-14 text-lg font-bold shadow-lg shadow-blue-500/20 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 border-0 ${!!todayAttendance?.checkIn ? 'opacity-50 grayscale' : ''}`}
                 >
                   {isGettingLocation ? 'Locating...' : 'Clock In'}
                 </Button>
                 
                 <Button
                   onClick={handleClockOut}
                   disabled={clockingOut || isGettingLocation || !todayAttendance?.checkIn}
                   className={`h-14 text-lg font-bold shadow-lg shadow-orange-500/20 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0 ${!todayAttendance?.checkIn ? 'opacity-50 grayscale' : ''}`}
                 >
                   {isGettingLocation ? 'Locating...' : 'Clock Out'}
                 </Button>
               </div>
               
               <div className="mt-4 flex items-center justify-center text-xs text-gray-400">
                  <MapPin className="w-3 h-3 mr-1" />
                  Your location is recorded securely
               </div>
             </div>
          </div>
        </div>

        {/* Stats Column */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-900">Month Summary</h3>
            <Link href="/dashboard/attendance/history" className="text-xs font-medium text-brand-navy hover:underline">
              View History
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {/* Present Card */}
            <div className="p-5 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 relative overflow-hidden">
               <div className="absolute right-0 top-0 p-3 opacity-10"><UserCheck className="w-16 h-16 text-emerald-600" /></div>
               <p className="text-emerald-600 font-medium text-sm">Present</p>
               <p className="text-3xl font-bold text-emerald-700 mt-1">{stats?.statusCounts?.PRESENT || 0}<span className="text-sm font-normal text-emerald-600/60 ml-1">days</span></p>
            </div>

            {/* Late Card */}
            <div className="p-5 rounded-xl bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-100 relative overflow-hidden">
               <div className="absolute right-0 top-0 p-3 opacity-10"><AlertTriangle className="w-16 h-16 text-amber-600" /></div>
               <p className="text-amber-600 font-medium text-sm">Late</p>
               <p className="text-3xl font-bold text-amber-700 mt-1">{stats?.statusCounts?.LATE || 0}<span className="text-sm font-normal text-amber-600/60 ml-1">days</span></p>
            </div>

            {/* Absent Card */}
            <div className="p-5 rounded-xl bg-gradient-to-br from-rose-50 to-red-50 border border-rose-100 relative overflow-hidden">
               <div className="absolute right-0 top-0 p-3 opacity-10"><UserX className="w-16 h-16 text-rose-600" /></div>
               <p className="text-rose-600 font-medium text-sm">Absent</p>
               <p className="text-3xl font-bold text-rose-700 mt-1">{stats?.statusCounts?.ABSENT || 0}<span className="text-sm font-normal text-rose-600/60 ml-1">days</span></p>
            </div>

            {/* Avg Hours Card */}
            <div className="p-5 rounded-xl bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100 relative overflow-hidden">
               <div className="absolute right-0 top-0 p-3 opacity-10"><Timer className="w-16 h-16 text-indigo-600" /></div>
               <p className="text-indigo-600 font-medium text-sm">Avg Hours/Day</p>
               <p className="text-3xl font-bold text-indigo-700 mt-1">
                 {stats?.averageWorkDuration ? (stats.averageWorkDuration / 60).toFixed(1) : '0.0'}
                 <span className="text-sm font-normal text-indigo-600/60 ml-1">hrs</span>
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
