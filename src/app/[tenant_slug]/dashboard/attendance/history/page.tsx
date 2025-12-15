'use client';

import { useAttendanceHistory } from '@/hooks/useAttendance';
import { EmployeeSelector } from '@/components/attendance/EmployeeSelector';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Filter, Calendar, Eye } from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Attendance } from '@/hooks/useAttendance';

// Dynamic import for map to avoid SSR issues
const AttendanceMap = dynamic(() => import('@/components/attendance/AttendanceMap'), {
  ssr: false,
  loading: () => <div className="h-64 bg-gray-100 rounded flex items-center justify-center">Loading map...</div>
});

export default function AttendanceHistoryPage() {
  const user = useAuthStore((state) => state.user);
  
  // Filter inputs
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
  const [startDateInput, setStartDateInput] = useState('');
  const [endDateInput, setEndDateInput] = useState('');
  const [statusInput, setStatusInput] = useState('');
  
  // Applied filters
  const [startDateQuery, setStartDateQuery] = useState('');
  const [endDateQuery, setEndDateQuery] = useState('');
  const [statusQuery, setStatusQuery] = useState('');
  const [employeeIdQuery, setEmployeeIdQuery] = useState('');
  
  // View detail modal
  const [viewAttendance, setViewAttendance] = useState<Attendance | null>(null);

  const { data: response, isLoading } = useAttendanceHistory(
    1, 
    10, 
    startDateQuery, 
    endDateQuery, 
    employeeIdQuery, 
    statusQuery
  );

  const handleApplyFilters = () => {
    setStartDateQuery(startDateInput);
    setEndDateQuery(endDateInput);
    setStatusQuery(statusInput);
    setEmployeeIdQuery(selectedEmployeeId);
  };

  const handleResetFilters = () => {
    setStartDateInput('');
    setEndDateInput('');
    setStatusInput('');
    setSelectedEmployeeId('');
    setStartDateQuery('');
    setEndDateQuery('');
    setStatusQuery('');
    setEmployeeIdQuery('');
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

  const formatTime = (dateString: string | null) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Attendance History</h2>
        <Link href="/dashboard/attendance">
          <Button variant="secondary">Back to Attendance</Button>
        </Link>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {/* Employee Selector for HR/SUPER/ADMIN */}
            {(user?.role === 'HR' || user?.role === 'SUPER' || user?.role === 'ADMIN') && (
              <EmployeeSelector
                selectedEmployeeId={selectedEmployeeId}
                onEmployeeChange={setSelectedEmployeeId}
              />
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Input
                label="Start Date"
                type="date"
                value={startDateInput}
                onChange={(e) => setStartDateInput(e.target.value)}
              />
              <Input
                label="End Date"
                type="date"
                value={endDateInput}
                onChange={(e) => setEndDateInput(e.target.value)}
              />
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Status</label>
                <select
                  value={statusInput}
                  onChange={(e) => setStatusInput(e.target.value)}
                  className="w-full appearance-none px-4 py-2 pr-10 border border-gray-600 rounded-md focus:outline-none focus:ring-brand-cyan focus:border-brand-cyan bg-white text-black cursor-pointer"
                >
                  <option value="">All Status</option>
                  <option value="PRESENT">Present</option>
                  <option value="LATE">Late</option>
                  <option value="ABSENT">Absent</option>
                  <option value="EXCUSED">Excused</option>
                </select>
              </div>
              <div className="flex items-end gap-2">
                <Button onClick={handleApplyFilters} className="flex-1">
                  <Filter className="w-4 h-4 mr-2" />
                  Apply
                </Button>
                <Button variant="secondary" onClick={handleResetFilters} className="flex-1">
                  Reset
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* History Table */}
      <Card>
        <CardHeader>
          <CardTitle>Attendance Records</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-navy mb-4"></div>
              <p className="text-gray-600">Loading attendance history...</p>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  {(user?.role === 'HR' || user?.role === 'SUPER' || user?.role === 'ADMIN') && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                  )}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clock In</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clock Out</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Hours</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {response?.data && response.data.length > 0 ? (
                  response.data.map((attendance) => (
                    <tr key={attendance.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                          {new Date(attendance.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </div>
                      </td>
                      {(user?.role === 'HR' || user?.role === 'SUPER') && attendance.employee && (
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {attendance.employee.firstName} {attendance.employee.lastName}
                        </td>
                      )}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatTime(attendance.checkIn)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatTime(attendance.checkOut)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {attendance.workDuration ? `${(attendance.workDuration / 60).toFixed(1)}h` : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(attendance.status)}`}>
                          {attendance.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                        {attendance.notes || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button 
                          variant="secondary" 
                          className="p-2" 
                          onClick={() => setViewAttendance(attendance)}
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                      No attendance records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>

      {/* View Detail Modal */}
      {viewAttendance && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Attendance Details</h3>
              <button
                onClick={() => setViewAttendance(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* Employee Info */}
              {viewAttendance.employee && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">Employee Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Name</p>
                      <p className="font-medium text-gray-900">
                        {viewAttendance.employee.firstName} {viewAttendance.employee.lastName}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Email</p>
                      <p className="font-medium text-gray-900">{viewAttendance.employee.user.email}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Position</p>
                      <p className="font-medium text-gray-900">{viewAttendance.employee.position}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Department</p>
                      <p className="font-medium text-gray-900">{viewAttendance.employee.department}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Attendance Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Date</label>
                  <p className="text-gray-900">
                    {new Date(viewAttendance.date).toLocaleDateString('en-US', { 
                      year: 'numeric', month: 'long', day: 'numeric' 
                    })}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Status</label>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(viewAttendance.status)}`}>
                    {viewAttendance.status}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Check In</label>
                  <p className="text-gray-900">{formatTime(viewAttendance.checkIn)}</p>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Check Out</label>
                  <p className="text-gray-900">{formatTime(viewAttendance.checkOut)}</p>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Work Duration</label>
                  <p className="text-gray-900">
                    {viewAttendance.workDuration ? `${(viewAttendance.workDuration / 60).toFixed(1)} hours` : '-'}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Period</label>
                  <p className="text-gray-900">{viewAttendance.attendancePeriod?.name || '-'}</p>
                </div>
                {viewAttendance.notes && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-1">Notes</label>
                    <p className="text-gray-900">{viewAttendance.notes}</p>
                  </div>
                )}
              </div>

              {/* Map */}
              {(viewAttendance.checkInLocation || viewAttendance.checkOutLocation) && (
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Location</label>
                  <AttendanceMap 
                    checkInLocation={viewAttendance.checkInLocation}
                    checkOutLocation={viewAttendance.checkOutLocation}
                  />
                </div>
              )}
            </div>
            <div className="sticky bottom-0 bg-gray-50 px-6 py-4 border-t border-gray-200">
              <Button onClick={() => setViewAttendance(null)} variant="secondary" className="w-full">
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
