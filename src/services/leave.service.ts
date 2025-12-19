import api from "./api";
import {
  LeavePeriod,
  LeavePeriodsResponse,
  CreateLeavePeriodPayload,
  UpdateLeavePeriodPayload,
  LeaveType,
  CreateLeaveTypePayload,
  UpdateLeaveTypePayload,
  LeaveRequest,
  LeaveBalance,
  AssignLeavePayload,
  LeaveRequestFilters,
} from "@/types/leave";

// ============================================
// LEAVE PERIODS
// ============================================

export const leavePeriodService = {
  /**
   * Get all leave periods with pagination
   */
  async getAll(
    page = 1,
    limit = 10,
    activeOnly = false
  ): Promise<LeavePeriodsResponse> {
    const { data } = await api.get<LeavePeriodsResponse>("/leave-periods", {
      params: { page, limit, activeOnly },
    });
    return data;
  },

  /**
   * Get a single leave period by ID
   */
  async getById(id: string | number): Promise<LeavePeriod> {
    const { data } = await api.get<LeavePeriod>(`/leave-periods/${id}`);
    return data;
  },

  /**
   * Get the currently active leave period
   */
  async getActive(): Promise<LeavePeriod> {
    const { data } = await api.get<LeavePeriod>("/leave-periods/active");
    return data;
  },

  /**
   * Create a new leave period
   */
  async create(payload: CreateLeavePeriodPayload): Promise<LeavePeriod> {
    const { data } = await api.post<LeavePeriod>("/leave-periods", payload);
    return data;
  },

  /**
   * Update an existing leave period
   */
  async update(
    id: string | number,
    payload: UpdateLeavePeriodPayload
  ): Promise<LeavePeriod> {
    const { data } = await api.patch<LeavePeriod>(
      `/leave-periods/${id}`,
      payload
    );
    return data;
  },

  /**
   * Delete a leave period
   */
  async delete(id: string | number): Promise<void> {
    await api.delete(`/leave-periods/${id}`);
  },
};

// ============================================
// LEAVE TYPES
// ============================================

export const leaveTypeService = {
  /**
   * Get all leave types, optionally filtered by leave period
   */
  async getAll(leavePeriodId?: number): Promise<LeaveType[]> {
    const params = leavePeriodId ? { leavePeriodId } : {};
    const { data } = await api.get<LeaveType[]>("/leave-types", { params });
    return data;
  },

  /**
   * Get a single leave type by ID
   */
  async getById(id: number): Promise<LeaveType> {
    const { data } = await api.get<LeaveType>(`/leave-types/${id}`);
    return data;
  },

  /**
   * Create a new leave type
   */
  async create(payload: CreateLeaveTypePayload): Promise<LeaveType> {
    const { data } = await api.post<LeaveType>("/leave-types", payload);
    return data;
  },

  /**
   * Update an existing leave type
   */
  async update(
    id: number,
    payload: UpdateLeaveTypePayload
  ): Promise<LeaveType> {
    const { data } = await api.patch<LeaveType>(`/leave-types/${id}`, payload);
    return data;
  },

  /**
   * Delete a leave type
   */
  async delete(id: number): Promise<void> {
    await api.delete(`/leave-types/${id}`);
  },
};

// ============================================
// LEAVE REQUESTS
// ============================================

export const leaveRequestService = {
  /**
   * Get my leave requests with filters
   */
  async getMyRequests(filters: LeaveRequestFilters): Promise<LeaveRequest[]> {
    const params = new URLSearchParams();
    if (filters.page) params.append("page", filters.page.toString());
    if (filters.limit) params.append("limit", filters.limit.toString());
    if (filters.startDate) params.append("startDate", filters.startDate);
    if (filters.endDate) params.append("endDate", filters.endDate);
    if (filters.status && filters.status.length > 0) {
      filters.status.forEach((s) => params.append("status", s));
    }

    const { data } = await api.get<LeaveRequest[]>("/leave-requests/my", {
      params,
    });
    return data;
  },

  /**
   * Get a single leave request by ID
   */
  async getById(id: number | string): Promise<LeaveRequest> {
    const { data } = await api.get<LeaveRequest>(`/leave-requests/${id}`);
    return data;
  },

  /**
   * Create a new leave request
   */
  async create(payload: AssignLeavePayload): Promise<LeaveRequest> {
    const { data } = await api.post<LeaveRequest>("/leave-requests", payload);
    return data;
  },

  /**
   * Cancel a leave request
   */
  async cancel(id: number | string): Promise<void> {
    await api.patch(`/leave-requests/${id}/cancel`);
  },

  /**
   * Get pending leave requests for approval
   */
  async getPendingApprovals(): Promise<LeaveRequest[]> {
    const { data } = await api.get<LeaveRequest[]>(
      "/leave-requests/pending/for-approval"
    );
    return data;
  },

  /**
   * Approve a leave request
   */
  async approve(id: number | string, comments?: string): Promise<void> {
    await api.patch(`/leave-requests/${id}/approve`, { comments });
  },

  /**
   * Reject a leave request
   */
  async reject(id: number | string, comments?: string): Promise<void> {
    await api.patch(`/leave-requests/${id}/reject`, { comments });
  },
};

// ============================================
// LEAVE BALANCES
// ============================================

export const leaveBalanceService = {
  /**
   * Get my leave balances
   */
  async getMyBalances(): Promise<LeaveBalance[]> {
    const { data } = await api.get<LeaveBalance[]>("/leave-balances/my");
    return data;
  },

  /**
   * Get leave balances for a specific employee
   */
  async getEmployeeBalances(
    employeeId: number | string
  ): Promise<LeaveBalance[]> {
    const { data } = await api.get<LeaveBalance[]>(
      `/leave-balances/employee/${employeeId}`
    );
    return data;
  },

  /**
   * Assign leave balance to an employee
   */
  async assignBalance(payload: {
    employeeId: number | string;
    leaveTypeConfigId: number | string;
    quota: number;
  }): Promise<LeaveBalance> {
    const { data } = await api.post<LeaveBalance>("/leave-balances", payload);
    return data;
  },

  /**
   * Update leave balance
   */
  async updateBalance(
    id: number | string,
    payload: { quota?: number; isActive?: boolean }
  ): Promise<LeaveBalance> {
    const { data } = await api.patch<LeaveBalance>(
      `/leave-balances/${id}`,
      payload
    );
    return data;
  },
};
