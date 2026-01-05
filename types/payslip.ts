import type { Payroll } from './payroll';

export enum JKKRiskCategory {
  VERY_LOW = 'VERY_LOW',    // 0.24%
  LOW = 'LOW',              // 0.54%
  MEDIUM = 'MEDIUM',        // 0.89%
  HIGH = 'HIGH',            // 1.27%
  VERY_HIGH = 'VERY_HIGH'   // 1.74%
}

export enum MaritalStatus {
  SINGLE = 'SINGLE',
  MARRIED = 'MARRIED',
  DIVORCED = 'DIVORCED',
  WIDOWED = 'WIDOWED'
}

export interface DeductionItem {
  id: string;
  type: string; // 'TAX_PPH21' | 'BPJS_KESEHATAN' | 'BPJS_JHT' | 'BPJS_JP' | 'BPJS_JKK' | 'BPJS_JKM' | 'OTHER';
  description: string;
  amount: string | number;
}

export interface TaxBracketDetail {
  bracket: string;
  rate: number;
  amount: number;
}

export interface TaxCalculationDetails {
  ptkp: number;
  ptkpCategory: string; // e.g., 'K/2'
  annualGross: number;
  annualBpjs: number;
  annualTaxableIncome: number;
  annualTax: number;
  monthlyTax: number;
  taxBreakdown: TaxBracketDetail[];
}

export interface Payslip {
  id: string;
  payrollId: string;
  grossSalary: string;
  overtimePay: string;
  bonuses: string;
  allowances: string;
  totalGross?: string; // Optional - calculated if not provided
  
  taxAmount: string;
  bpjsKesehatanEmployee: string;
  bpjsKesehatanCompany: string;
  bpjsKetenagakerjaanEmployee: string;
  bpjsKetenagakerjaanCompany: string;
  otherDeductions: string;
  totalDeductions?: string; // Optional - calculated if not provided
  
  takeHomePay: string;
  
  taxCalculationDetails?: TaxCalculationDetails;
  
  generatedAt: string;
  generatedBy: string;
  
  payroll?: Payroll; // Optional - not always included in API responses
  deductions: DeductionItem[];
}

export interface GeneratePayslipRequest {
  payrollId: string | number;
  jkkRiskCategory?: JKKRiskCategory;
  dependents?: number;
  additionalAllowances?: number;
  otherDeductions?: number;
}

export interface PayslipListResponse {
  data: Payslip[];
  total: number;
}
