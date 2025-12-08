import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/services/api';
import { toast } from 'react-hot-toast';

export interface Attendance {
  id: string;
  employeeId: string;
  attendancePeriodId: string;
  date: string;
  checkIn: string | null;
  checkOut: string | null;
  checkInLocation: {
    latitude: number;
    longitude: number;
  } | null;
  checkOutLocation: {
    latitude: number;
    longitude: number;
  } | null;
  workDuration: number | null;
  status: 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED';
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  attendancePeriod?: {
    id: string;
    name: string;
    startDate: any;
    endDate: any;
  };
  employee?: {
    id: string;
    firstName: string;
    lastName: string;
    position: string;
    department: string;
    user: {
      email: string;
      role: string;
    };
  };
}

export interface AttendanceHistory {
  data: Attendance[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface AttendanceStats {
  statusCounts: {
    PRESENT?: number;
    ABSENT?: number;
    LATE?: number;
    EXCUSED?: number;
  };
  totalWorkDuration: number; // in minutes
  totalWorkDays: number;
  averageWorkDuration: number; // in minutes
}

export interface ClockInOutPayload {
  latitude: number;
  longitude: number;
  notes?: string;
}

// Clock In
export const useClockIn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ClockInOutPayload) => 
      api.post('/attendance/clock-in', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attendance', 'today'] });
      queryClient.invalidateQueries({ queryKey: ['attendance', 'history'] });
      toast.success('Clocked in successfully');
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || 'Failed to clock in';
      toast.error(message);
    },
  });
};

// Clock Out
export const useClockOut = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ClockInOutPayload) => 
      api.post('/attendance/clock-out', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attendance', 'today'] });
      queryClient.invalidateQueries({ queryKey: ['attendance', 'history'] });
      toast.success('Clocked out successfully');
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || 'Failed to clock out';
      toast.error(message);
    },
  });
};

// Get Today's Attendance
export const useTodayAttendance = () => {
  return useQuery({
    queryKey: ['attendance', 'today'],
    queryFn: async () => {
      const { data } = await api.get<Attendance>('/attendance/today');
      return data;
    },
  });
};

// Get Attendance History
export const useAttendanceHistory = (
  page = 1,
  limit = 10,
  startDate = '',
  endDate = '',
  employeeId = '',
  status = ''
) => {
  return useQuery({
    queryKey: ['attendance', 'history', page, limit, startDate, endDate, employeeId, status],
    queryFn: async () => {
      // Add 1 second delay for loading state
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const params: Record<string, string | number> = { 
        page, 
        limit 
      };
      
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;
      if (employeeId) params.employeeId = employeeId;
      if (status) params.status = status;

      const { data } = await api.get<AttendanceHistory>('/attendance/history', { params });
      return data;
    },
  });
};

// Get Attendance Stats
export const useAttendanceStats = (
  startDate = '',
  endDate = '',
  employeeId = ''
) => {
  return useQuery({
    queryKey: ['attendance', 'stats', startDate, endDate, employeeId],
    queryFn: async () => {
      const params: Record<string, string> = {};
      
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;
      if (employeeId) params.employeeId = employeeId;

      const { data } = await api.get<AttendanceStats>('/attendance/stats', { params });
      return data;
    },
    enabled: !!startDate && !!endDate,
  });
};

// Today's Attendance Dashboard Interfaces
export interface TodayAttendanceEmployee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  position: string;
  checkIn?: any;
  checkOut?: any;
  status?: 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED';
  isLate?: boolean;
  minutesLate?: number;
  workDuration?: number; // in minutes
}

export interface TodayAttendanceDashboard {
  date: string;
  summary: {
    totalEmployees: number;
    totalPresent: number;
    totalAbsent: number;
    totalLate: number;
    attendanceRate: number;
    lateRate: number;
    onTimeRate: number;
  };
  presentEmployees: TodayAttendanceEmployee[];
  absentEmployees: TodayAttendanceEmployee[];
  lateEmployees: TodayAttendanceEmployee[];
  attendancePeriod: {
    id: string;
    name: string;
    workingStartTime: string;
    workingEndTime: string;
    toleranceMinutes: number;
  };
}

// Get Today's Attendance Dashboard
export const useTodayAttendanceDashboard = () => {
  return useQuery({
    queryKey: ['attendance', 'dashboard', 'today'],
    queryFn: async () => {
      const { data } = await api.get<TodayAttendanceDashboard>('/attendance/dashboard/today');
      return data;
    },
  });
};
