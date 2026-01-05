export interface LeavePeriodStats {
  totalEmployeesWithBalances: number;
  totalLeaveRequests: number;
}

export interface LeavePeriod {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  description: string;
  createdBy: number;
  createdAt: string;
  updatedAt: string;
  stats?: LeavePeriodStats;
  leaveTypes?: LeaveType[]; // Optional if included in detail response
}

export interface LeaveType {
  id: number;
  leavePeriodId: number;
  type: string; // e.g., 'ANNUAL', 'SICK'
  name: string;
  description: string;
  defaultQuota: number;
  maxConsecutiveDays: number;
  advanceNoticeDays: number;
  isCarryForward: boolean;
  maxCarryForward: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateLeavePeriodPayload {
  name: string;
  startDate: string;
  endDate: string;
  description?: string;
}

export interface UpdateLeavePeriodPayload extends Partial<CreateLeavePeriodPayload> {
  isActive?: boolean;
}

export interface CreateLeaveTypePayload {
  leavePeriodId: number;
  type: string;
  name: string;
  description?: string;
  defaultQuota: number;
  maxConsecutiveDays: number;
  advanceNoticeDays: number;
  isCarryForward: boolean;
  maxCarryForward: number;
  isActive: boolean;
}

export type UpdateLeaveTypePayload = Partial<Omit<CreateLeaveTypePayload, 'leavePeriodId'>>;

export interface LeavePeriodsResponse {
  data: LeavePeriod[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// --- Leave Requests & Balances ---

export enum LeaveRequestStatus {
  PENDING = 'PENDING',
  MANAGER_APPROVED = 'MANAGER_APPROVED',
  HR_APPROVED = 'HR_APPROVED',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED'
}

export interface LeaveRequest {
  id: string; // Changed to string
  employeeId?: string; // Optional, might not be in 'my' requests
  employeeName?: string; // Optional
  leaveTypeName: string;
  leaveTypeConfigId?: string; // Optional, might not be in list response
  startDate: string;
  endDate: string;
  totalDays: number;
  reason: string;
  status: LeaveRequestStatus;
  submittedAt: string;
  managerComments?: string;
  hrComments?: string;
  emergencyContact?: string;
  handoverNotes?: string;
  // New fields for approval tracking
  requiresManagerApproval?: boolean;
  managerApprovedAt?: string;
  hrApprovalStatus?: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export interface LeaveBalance {
  id: string;
  leaveTypeName: string;
  totalQuota: number;
  usedQuota: number;
  remainingQuota: number;
  validFrom: string;
  validTo: string;
  isActive: boolean;
}

export interface AssignLeavePayload {
  leaveTypeConfigId: string;
  startDate: string;
  endDate: string;
  reason: string;
  emergencyContact?: string;
  handoverNotes?: string;
}

export interface LeaveRequestFilters {
  status?: LeaveRequestStatus[];
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}
