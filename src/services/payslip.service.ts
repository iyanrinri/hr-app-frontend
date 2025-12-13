import api from './api';
import { 
  Payslip, 
  GeneratePayslipRequest, 
  PayslipListResponse 
} from '@/types/payslip';

export const PayslipService = {
  // Generate a new payslip
  generatePayslip: async (data: GeneratePayslipRequest): Promise<Payslip> => {
    const response = await api.post('/payslip/generate', data);
    return response.data;
  },

  // Get payslip by ID
  getPayslipById: async (id: string): Promise<Payslip> => {
    const response = await api.get(`/payslip/${id}`);
    return response.data;
  },

  // Get payslip by Payroll ID
  getPayslipByPayrollId: async (payrollId: string): Promise<Payslip> => {
    const response = await api.get(`/payslip/by-payroll/${payrollId}`);
    return response.data;
  },

  // Get all payslips (for HR list view - might need params for pagination/filters if API supports it later)
  // Assuming 'getAllPayslips' endpoint might exist or we use a filter on a general endpoint.
  // The provided API doc lists:
  // 1. Generate
  // 2. Get By ID
  // 3. Get By Payroll ID
  // 4. Get Employee History
  // 5. Get My History
  // 6. Delete
  // It lacks a "Get All Payslips" endpoint explicitly, but usually admins need one. 
  // I will assume for now we might use `getEmployeePayslipHistory` iteratively or maybe there is a general list endpoint not documented?
  // Re-reading user request: "3. Payslip List / History Page - Filters: [Employee] [Department]". 
  // This implies an endpoint to list all. I'll assume GET /payslip or GET /payslip/history exists or similar.
  // Let's implement getAllPayslips using GET /payslip (similar to payroll) for now, or fall back to client-side if needed.
  // Based on "4. GET EMPLOYEE PAYSLIP HISTORY", I'll stick to that for now for specific employees.
  // Wait, commonly lists are just GET /payslip. I'll assume that for list page.
  
  getAllPayslips: async (params?: any): Promise<PayslipListResponse> => {
    // Tentative endpoint, subject to backend availability. 
    // If not available, we might iterate employees or use payrolls list to link to payslips. 
    // But let's assume standard REST pattern.
    const response = await api.get('/payslip', { params });
    return response.data;
  },

  // Get employee payslip history
  getEmployeePayslipHistory: async (employeeId: string): Promise<PayslipListResponse> => {
    const response = await api.get(`/payslip/employee/${employeeId}`);
    return response.data;
  },

  // Get my payslip history
  getMyPayslipHistory: async (): Promise<PayslipListResponse> => {
    const response = await api.get('/payslip/my/history');
    return response.data;
  },

  // Delete payslip
  deletePayslip: async (id: string): Promise<{ message: string }> => {
    const response = await api.delete(`/payslip/${id}`);
    return response.data;
  }
};
