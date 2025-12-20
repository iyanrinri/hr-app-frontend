'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { PayrollService } from '@/services/payroll.service';
import { Payroll, PayrollStatus } from '@/types/payroll';
import { format } from 'date-fns';
import { DollarSign, TrendingUp, Calendar, Eye, X, Wallet, Receipt } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface EmployeeSalaryHistoryProps {
  employeeId: string;
  currentBaseSalary?: number;
}

export function EmployeeSalaryHistory({ employeeId, currentBaseSalary }: EmployeeSalaryHistoryProps) {
  const [selectedPayroll, setSelectedPayroll] = useState<Payroll | null>(null);
  const [page, setPage] = useState(1);
  const limit = 10;

  // Fetch employee payroll history
  const { data: payrollData, isLoading } = useQuery({
    queryKey: ['employee-payroll-history', employeeId, page, limit],
    queryFn: () => PayrollService.getEmployeePayrollHistory(employeeId, { page, limit }),
    enabled: !!employeeId,
  });

  const payrolls = payrollData?.data || [];
  const totalPayrolls = payrollData?.total || 0;
  const totalPages = payrollData?.totalPages || 1;

  // Calculate summary stats - convert string to number
  const totalEarned = payrolls.reduce((sum, p) => sum + (parseFloat(p.netSalary) || 0), 0);
  const avgSalary = payrolls.length > 0 ? totalEarned / payrolls.length : 0;

  const getStatusBadge = (status: PayrollStatus) => {
    const configs = {
      [PayrollStatus.PENDING]: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending' },
      [PayrollStatus.PROCESSED]: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Processed' },
      [PayrollStatus.PAID]: { bg: 'bg-green-100', text: 'text-green-800', label: 'Paid' },
    };
    const config = configs[status] || configs[PayrollStatus.PENDING];
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Current Base Salary */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white/80 font-medium text-sm">Current Base Salary</h3>
            <Wallet className="w-8 h-8 text-white/40" />
          </div>
          <div className="text-3xl font-bold">
            {currentBaseSalary ? formatCurrency(currentBaseSalary) : '-'}
          </div>
          <p className="text-white/60 text-xs mt-2">Per month</p>
        </div>

        {/* Total Earned (from history) */}
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white/80 font-medium text-sm">Total Earned (History)</h3>
            <DollarSign className="w-8 h-8 text-white/40" />
          </div>
          <div className="text-3xl font-bold">{formatCurrency(totalEarned)}</div>
          <p className="text-white/60 text-xs mt-2">From {payrolls.length} payroll(s)</p>
        </div>

        {/* Average Salary */}
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white/80 font-medium text-sm">Average Net Salary</h3>
            <TrendingUp className="w-8 h-8 text-white/40" />
          </div>
          <div className="text-3xl font-bold">{formatCurrency(avgSalary)}</div>
          <p className="text-white/60 text-xs mt-2">Per payroll period</p>
        </div>
      </div>

      {/* Payroll History Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">Salary History</h3>
              <p className="mt-1 text-sm text-gray-500">Complete payroll history for this employee</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Receipt className="w-4 h-4" />
              <span>{totalPayrolls} total records</span>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="p-12 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-navy mx-auto"></div>
            <p className="text-gray-500 mt-4">Loading salary history...</p>
          </div>
        ) : payrolls.length === 0 ? (
          <div className="p-12 text-center">
            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-lg">No salary history found</p>
            <p className="text-gray-400 text-sm mt-1">Payroll records will appear here once processed</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Period
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Gross Salary
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Deductions
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Net Salary
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {payrolls.map((payroll) => (
                    <tr key={payroll.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                          <div className="text-sm font-medium text-gray-900">
                            {payroll.periodStart && payroll.periodEnd
                              ? `${format(new Date(payroll.periodStart), 'MMM d')} - ${format(new Date(payroll.periodEnd), 'MMM d, yyyy')}`
                              : 'N/A'}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {formatCurrency(parseFloat(payroll.grossSalary) || 0)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-red-600 font-medium">
                          -{formatCurrency(parseFloat(payroll.deductions) || 0)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-green-600">
                          {formatCurrency(parseFloat(payroll.netSalary) || 0)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(payroll.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button
                          variant="ghost"
                          className="h-8 px-2"
                          onClick={() => setSelectedPayroll(payroll)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Showing {((page - 1) * limit) + 1} to {Math.min(page * limit, totalPayrolls)} of {totalPayrolls} results
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="secondary"
                    disabled={page === 1}
                    onClick={() => setPage(p => p - 1)}
                    className="h-8 px-3 text-sm"
                  >
                    Previous
                  </Button>
                  <Button
                    variant="secondary"
                    disabled={page === totalPages}
                    onClick={() => setPage(p => p + 1)}
                    className="h-8 px-3 text-sm"
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Detail Modal */}
      {selectedPayroll && (
        <PayrollDetailModal
          payroll={selectedPayroll}
          isOpen={!!selectedPayroll}
          onClose={() => setSelectedPayroll(null)}
        />
      )}
    </div>
  );
}

// Payroll Detail Modal Component
interface PayrollDetailModalProps {
  payroll: Payroll;
  isOpen: boolean;
  onClose: () => void;
}

function PayrollDetailModal({ payroll, isOpen, onClose }: PayrollDetailModalProps) {
  if (!isOpen) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl my-8">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-brand-navy to-blue-600">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white">Payroll Details</h3>
              <p className="text-sm text-white/80 mt-1">
                Period: {payroll.periodStart && payroll.periodEnd
                  ? `${format(new Date(payroll.periodStart), 'MMM d')} - ${format(new Date(payroll.periodEnd), 'MMM d, yyyy')}`
                  : 'N/A'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Earnings */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Earnings</h4>
            <div className="bg-green-50 rounded-lg p-4 space-y-2 border border-green-200">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Base Salary</span>
                <span className="text-sm font-medium text-gray-900">{formatCurrency(parseFloat(payroll.baseSalary) || 0)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Bonuses</span>
                <span className="text-sm font-medium text-gray-900">{formatCurrency(parseFloat(payroll.bonuses) || 0)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Overtime Pay</span>
                <span className="text-sm font-medium text-gray-900">{formatCurrency(parseFloat(payroll.overtimePay) || 0)}</span>
              </div>
              <div className="pt-2 border-t border-green-300 flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-900">Gross Salary</span>
                <span className="text-lg font-bold text-green-600">{formatCurrency(parseFloat(payroll.grossSalary) || 0)}</span>
              </div>
            </div>
          </div>

          {/* Deductions */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Deductions</h4>
            <div className="bg-red-50 rounded-lg p-4 space-y-2 border border-red-200">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Deductions</span>
                <span className="text-sm font-medium text-gray-900">{formatCurrency(parseFloat(payroll.deductions) || 0)}</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">Includes PPh 21, BPJS Kesehatan, BPJS Ketenagakerjaan, and other deductions</p>
            </div>
          </div>

          {/* Net Salary */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-white/80 text-sm font-medium mb-1">Net Salary (Take Home Pay)</p>
                <p className="text-3xl font-bold">{formatCurrency(parseFloat(payroll.netSalary) || 0)}</p>
              </div>
              <DollarSign className="w-12 h-12 text-white/30" />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
}
