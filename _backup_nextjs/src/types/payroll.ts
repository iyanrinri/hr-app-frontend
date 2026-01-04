export enum PayrollStatus {
  PENDING = 'PENDING',
  PROCESSED = 'PROCESSED',
  PAID = 'PAID'
}

export interface PayrollEmployee {
  id: string;
  firstName: string;
  lastName: string;
  position?: string;
  department?: string;
  name?: string; // Derived in frontend if needed
}

export interface Payroll {
  id: string;
  employeeId: string;
  periodStart: string;
  periodEnd: string;
  baseSalary: string; // Stored as string/decimal in backend
  overtimePay: string;
  deductions: string;
  bonuses: string;
  grossSalary: string;
  netSalary: string;
  overtimeHours: string;
  regularHours: string;
  isPaid: boolean;
  processedAt?: string;
  processedBy?: string;
  createdAt: string;
  updatedAt: string;
  status: PayrollStatus; // Mapped from isPaid/processedAt logic or distinct field if backend supports
  employee?: PayrollEmployee;
  processor?: {
    id: string;
    email: string;
  };
}

export interface CreatePayrollRequest {
  employeeId: string;
  periodStart: string;
  periodEnd: string;
  deductions?: string;
  bonuses?: string;
  overtimeRequestIds: string[];
}

export interface ProcessPayrollRequest {
  payrollIds: string[];
}

export interface PayrollFilters {
  employeeId?: string;
  department?: string;
  status?: PayrollStatus;
  periodStartFrom?: string;
  periodStartTo?: string;
  page?: number;
  limit?: number;
}

export interface PayrollListResponse {
  data: Payroll[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PayrollSummary {
  totalPayrolls: number;
  totalBaseSalary: string;
  totalOvertimePay: string;
  totalDeductions: string;
  totalBonuses: string;
  totalGrossSalary: string;
  totalNetSalary: string;
  totalOvertimeHours: string;
  totalRegularHours: string;
}

// Bulk Generate Payroll Types
export interface BulkGeneratePayrollRequest {
  periodStart: string; // ISO 8601 date string
  periodEnd: string; // ISO 8601 date string
  bonusPercentage?: number; // 0-100
  deductions?: Record<string, string>; // { employeeId: amount }
  employeeIds?: string[]; // Optional - if not provided, generate for all active employees
}

export interface FailedPayrollGeneration {
  employeeId: string;
  employeeName?: string;
  reason: string;
}

export interface BulkGeneratePayrollResponse {
  generated: number;
  failed: FailedPayrollGeneration[];
  payrolls: Payroll[];
}

// UI State for Deductions Manager
export interface DeductionEntry {
  id: string; // Temporary ID for UI
  employeeId: string;
  employeeName: string;
  amount: string;
}
