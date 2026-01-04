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
    startDate: string;
    endDate: string;
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

export interface TodayAttendanceEmployee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  position: string;
  checkIn?: string | null;
  checkOut?: string | null;
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
