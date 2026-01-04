export interface Holiday {
    id: string;
    attendancePeriodId: string;
    name: string;
    date: string;
    isNational: boolean;
    isRecurring: boolean;
    description: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface AttendancePeriod {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
    workingDaysPerWeek: number;
    workingHoursPerDay: number;
    workingStartTime: string;
    workingEndTime: string;
    allowSaturdayWork: boolean;
    allowSundayWork: boolean;
    lateToleranceMinutes: number;
    earlyLeaveToleranceMinutes: number;
    isActive: boolean;
    description: string | null;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
    holidays?: Holiday[];
    _count?: {
        attendances: number;
        attendanceLogs: number;
    };
}

export interface Meta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
}

export interface AttendancePeriodsResponse {
    data: AttendancePeriod[];
    meta: Meta;
}
