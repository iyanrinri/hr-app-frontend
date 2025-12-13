'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { PayslipService } from '@/services/payslip.service';
import { PayrollService } from '@/services/payroll.service';
import { JKKRiskCategory, GeneratePayslipRequest } from '@/types/payslip';
import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/lib/utils';
import { toast } from 'react-hot-toast';
import { Loader2, Calculator, Info } from 'lucide-react';

export default function GeneratePayslipForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [selectedPayrollId, setSelectedPayrollId] = useState<string>('');
  const [jkkRisk, setJkkRisk] = useState<JKKRiskCategory>(JKKRiskCategory.LOW);
  const [dependents, setDependents] = useState<number>(0);
  const [additionalAllowances, setAdditionalAllowances] = useState<number>(0);
  const [otherDeductions, setOtherDeductions] = useState<number>(0);

  // Fetch Payrolls (Pending or Processed, or all)
  const { data: payrollsResponse, isLoading: isLoadingPayrolls } = useQuery({
    queryKey: ['payrolls', 'all'],
    queryFn: () => PayrollService.getAllPayrolls({ limit: 100 }) // Fetch reasonable amount
  });

  const payrolls = payrollsResponse?.data || [];
  
  // Find selected payroll
  const selectedPayroll = payrolls.find(p => p.id === selectedPayrollId);

  const mutation = useMutation({
    mutationFn: (data: GeneratePayslipRequest) => PayslipService.generatePayslip(data),
    onSuccess: (data) => {
      toast.success('Payslip generated successfully!');
      queryClient.invalidateQueries({ queryKey: ['payslips'] });
      router.push(`/dashboard/payslips/${data.id}`);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to generate payslip');
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPayrollId) {
      toast.error('Please select a payroll record');
      return;
    }

    if (confirm('Are you sure you want to generate this payslip?')) {
        mutation.mutate({
          payrollId: selectedPayrollId,
          jkkRiskCategory: jkkRisk,
          dependents: dependents,
          additionalAllowances: additionalAllowances || 0,
          otherDeductions: otherDeductions || 0
        });
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 w-full max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center">
        <Calculator className="w-6 h-6 mr-2 text-brand-navy" />
        Generate Payslip
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Payroll Selection */}
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Select Payroll *</label>
            <select
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-brand-navy focus:border-brand-navy"
                value={selectedPayrollId}
                onChange={(e) => setSelectedPayrollId(e.target.value)}
                required
            >
                <option value="">-- Select Payroll Record --</option>
                {isLoadingPayrolls ? (
                    <option disabled>Loading payrolls...</option>
                ) : (
                    payrolls.map((payroll) => (
                        <option key={payroll.id} value={payroll.id}>
                            {payroll.employee?.firstName} {payroll.employee?.lastName} - {new Date(payroll.periodStart).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })} ({formatCurrency(payroll.grossSalary)})
                        </option>
                    ))
                )}
            </select>
        </div>

        {selectedPayroll && (
            <div className="bg-blue-50 p-4 rounded-md border border-blue-100 grid grid-cols-2 gap-4 text-sm">
                <div>
                   <p className="text-gray-500">Employee</p>
                   <p className="font-semibold">{selectedPayroll.employee?.firstName} {selectedPayroll.employee?.lastName}</p>
                </div>
                <div>
                   <p className="text-gray-500">Position</p>
                   {/* Fallback as position might not be returned deeply in list, but let's assume it is or just show basic */}
                   <p className="font-semibold">{selectedPayroll.employee?.position || 'N/A'}</p>
                </div>
                <div>
                   <p className="text-gray-500">Period</p>
                   <p className="font-semibold">
                     {new Date(selectedPayroll.periodStart).toLocaleDateString('id-ID')} - {new Date(selectedPayroll.periodEnd).toLocaleDateString('id-ID')}
                   </p>
                </div>
                <div>
                   <p className="text-gray-500">Gross Salary (Payroll)</p>
                   <p className="font-semibold text-green-600">{formatCurrency(selectedPayroll.grossSalary)}</p>
                </div>
            </div>
        )}

        <hr className="border-gray-200" />

        {/* Tax & BPJS Settings */}
        <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4">Tax & BPJS Settings</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        JKK Risk Category
                        <span className="ml-1 inline-block" title="Determines BPJS JKK Rate (0.24% - 1.74%)">
                            <Info className="w-4 h-4 text-gray-400" />
                        </span>
                    </label>
                    <div className="space-y-2">
                        {Object.values(JKKRiskCategory).map((risk) => (
                            <div key={risk} className="flex items-center">
                                <input
                                    id={`risk-${risk}`}
                                    name="risk"
                                    type="radio"
                                    className="focus:ring-brand-navy h-4 w-4 text-brand-navy border-gray-300"
                                    checked={jkkRisk === risk}
                                    onChange={() => setJkkRisk(risk)}
                                />
                                <label htmlFor={`risk-${risk}`} className="ml-3 block text-sm text-gray-700 capitalize">
                                    {risk.replace('_', ' ')}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Number of Dependents (PTKP)</label>
                    <select
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={dependents}
                        onChange={(e) => setDependents(Number(e.target.value))}
                    >
                        {[0, 1, 2, 3].map(num => (
                            <option key={num} value={num}>{num} Dependent(s)</option>
                        ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-1">Used for PTKP calculation (TK/0 to K/3)</p>
                </div>
            </div>
        </div>

        <hr className="border-gray-200" />

        {/* Additional Items */}
        <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4">Additional Items</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Additional Allowances</label>
                    <div className="relative rounded-md shadow-sm">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <span className="text-gray-500 sm:text-sm">Rp</span>
                        </div>
                        <input
                          type="number"
                          min="0"
                          className="block w-full rounded-md border-gray-300 pl-10 focus:border-brand-navy focus:ring-brand-navy sm:text-sm h-10 border"
                          placeholder="0"
                          value={additionalAllowances}
                          onChange={(e) => setAdditionalAllowances(Number(e.target.value))}
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Other Deductions</label>
                    <div className="relative rounded-md shadow-sm">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <span className="text-gray-500 sm:text-sm">Rp</span>
                        </div>
                        <input
                          type="number"
                          min="0"
                          className="block w-full rounded-md border-gray-300 pl-10 focus:border-brand-navy focus:ring-brand-navy sm:text-sm h-10 border"
                          placeholder="0"
                          value={otherDeductions}
                          onChange={(e) => setOtherDeductions(Number(e.target.value))}
                        />
                    </div>
                </div>
            </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-4 pt-4">
            <Button
                type="button"
                variant="secondary"
                onClick={() => router.back()}
                disabled={mutation.isPending}
            >
                Cancel
            </Button>
            <Button
                type="submit"
                disabled={mutation.isPending || !selectedPayrollId}
            >
                {mutation.isPending ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                    </>
                ) : (
                    'Generate Payslip'
                )}
            </Button>
        </div>

      </form>
    </div>
  );
}
