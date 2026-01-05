export enum OvertimeStatus {
  PENDING = 'PENDING',
  MANAGER_APPROVED = 'MANAGER_APPROVED',
  HR_APPROVED = 'HR_APPROVED',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

export enum ApproverType {
  MANAGER = 'MANAGER',
  HR = 'HR'
}

export enum ApprovalStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

export interface OvertimeApprovalProcessPayload {
  requestId: number | string;
  status: ApprovalStatus;
  approverType: ApproverType;
  comments?: string;
  rejectionReason?: string;
}

export interface OvertimeApprovalStats {
  approved: number;
  rejected: number;
  pending: number;
  total: number;
}

export interface OvertimeRequest {
  id: string;
  employeeId: string;
  attendanceId?: string;
  date: string;
  startTime: string;
  endTime: string;
  totalMinutes: number;
  reason: string;
  status: OvertimeStatus;
  overtimeRate?: string;
  calculatedAmount?: string;
  managerComments?: string;
  hrComments?: string;
  rejectionReason?: string;
  submittedAt: string;
  managerApprovedAt?: string;
  hrApprovedAt?: string;
  finalizedAt?: string;
  createdAt: string;
  updatedAt: string;
  employee?: {
    id: string;
    name: string;
    email?: string;
  };
  attendance?: {
    id: string;
    date: string;
  };
  approvals?: Array<{
    id: string;
    approverId: string;
    status: string;
    comments?: string;
    approvedAt?: string;
  }>;
}

export interface CreateOvertimePayload {
  employeeId: number;
  attendanceId?: number;
  date: string;
  startTime: string;
  endTime: string;
  reason: string;
}

export interface UpdateOvertimePayload {
  attendanceId?: number;
  date?: string;
  startTime?: string;
  endTime?: string;
  reason?: string;
}

export interface OvertimeFilters {
  skip?: number;
  take?: number;
  status?: OvertimeStatus;
  startDate?: string;
  endDate?: string;
  employeeId?: string;
  approverId?: number;
  approverType?: ApproverType;
}

export interface OvertimeListResponse {
  requests: OvertimeRequest[];
  total: number;
  skip: number;
  take: number;
}

export interface EmployeeOvertimeHistoryFilters {
  skip?: number;
  take?: number;
  status?: OvertimeStatus;
  startDate?: string;
  endDate?: string;
}

export interface TotalHoursFilters {
  startDate: string;
  endDate: string;
  status?: OvertimeStatus;
}

export interface TotalHoursResponse {
  employeeId: string;
  totalMinutes: number;
  totalHours: number;
  totalAmount?: string;
  requests: OvertimeRequest[];
}
