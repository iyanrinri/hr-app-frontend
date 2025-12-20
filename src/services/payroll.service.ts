import api from './api';
import { 
  Payroll, 
  CreatePayrollRequest, 
  PayrollFilters, 
  PayrollListResponse, 
  ProcessPayrollRequest,
  PayrollSummary 
} from '@/types/payroll';

export const PayrollService = {
  // Create a new payroll record
  createPayroll: async (data: CreatePayrollRequest): Promise<Payroll> => {
    const response = await api.post('/payroll', data);
    return response.data;
  },

  // Get all payroll records (Admin/HR)
  getAllPayrolls: async (params?: PayrollFilters): Promise<PayrollListResponse> => {
    const response = await api.get('/payroll', { params });
    return response.data;
  },

  // Get authenticated employee's payroll records
  getMyPayrolls: async (params?: Partial<PayrollFilters>): Promise<PayrollListResponse> => {
    const response = await api.get('/payroll/my', { params });
    return response.data;
  },

  // Get a single payroll record by ID
  getPayrollById: async (id: string): Promise<Payroll> => {
    const response = await api.get(`/payroll/${id}`);
    return response.data;
  },

  // Get payroll summary stats
  getPayrollSummary: async (employeeId?: string): Promise<PayrollSummary> => {
    const params = employeeId ? { employeeId } : {};
    const response = await api.get('/payroll/summary', { params });
    return response.data;
  },

  // Get payroll history for a specific employee (Admin/HR)
  getEmployeePayrollHistory: async (employeeId: string, params?: Partial<PayrollFilters>): Promise<PayrollListResponse> => {
    const response = await api.get(`/payroll/employee/${employeeId}`, { params });
    return response.data;
  },

  // Process multiple payroll records
  processPayrolls: async (data: ProcessPayrollRequest): Promise<{ processed: number; message: string }> => {
    const response = await api.put('/payroll/process', data);
    return response.data;
  },

  // Mark a single payroll as paid
  markPayrollPaid: async (id: string): Promise<Payroll> => {
    const response = await api.put(`/payroll/${id}/mark-paid`);
    return response.data;
  },

  // Delete a payroll record
  deletePayroll: async (id: string): Promise<{ message: string }> => {
    const response = await api.delete(`/payroll/${id}`);
    return response.data;
  }
};
