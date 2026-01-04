'use client';

import { useQuery } from '@tanstack/react-query';
import api from '@/services/api';
import { format, differenceInDays } from 'date-fns';
import { TrendingUp, Calendar, DollarSign, Wallet, History, Award } from 'lucide-react';

interface Salary {
  id: string;
  employeeId: string;
  baseSalary: string;
  allowances: string;
  grade: string | null;
  effectiveDate: string;
  endDate: string | null;
  isActive: boolean;
  notes: string | null;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  employee?: {
    id: string;
    firstName: string;
    lastName: string;
    position: string;
    department: string;
  };
}

interface EmployeeSalaryAdjustmentHistoryProps {
  employeeId: string;
  currentBaseSalary?: number;
}

export function EmployeeSalaryAdjustmentHistory({ 
  employeeId
}: EmployeeSalaryAdjustmentHistoryProps) {
  // Fetch salary history
  const { data: salaryHistory, isLoading } = useQuery({
    queryKey: ['employee-salary-history', employeeId],
    queryFn: async () => {
      const { data } = await api.get<Salary[]>(`/salaries/employee/${employeeId}/history`);
      return data;
    },
    enabled: !!employeeId,
  });

  const salaries = salaryHistory || [];
  const currentSalary = salaries.find(s => s.isActive);
  const historicalSalaries = salaries.filter(s => !s.isActive).sort((a, b) => 
    new Date(b.effectiveDate).getTime() - new Date(a.effectiveDate).getTime()
  );

  const formatCurrency = (amount: number | string) => {
    const num = typeof amount === 'string' ? parseFloat(amount) : amount;
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  const calculateTotalSalary = (baseSalary: string, allowances: string) => {
    return parseFloat(baseSalary) + parseFloat(allowances);
  };

  const calculateDifference = (newSalary: string, oldSalary: string) => {
    const diff = parseFloat(newSalary) - parseFloat(oldSalary);
    const percentage = (diff / parseFloat(oldSalary)) * 100;
    return { amount: diff, percentage };
  };

  return (
    <div className="space-y-6">
      {/* Current Salary Card */}
      {currentSalary && (
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white/80 text-sm font-medium mb-1">Current Base Salary</p>
              <p className="text-4xl font-bold">{formatCurrency(currentSalary.baseSalary)}</p>
              {parseFloat(currentSalary.allowances) > 0 && (
                <p className="text-white/90 text-sm mt-2">
                  + Allowances: {formatCurrency(currentSalary.allowances)}
                </p>
              )}
              <p className="text-white text-lg font-semibold mt-2">
                Total: {formatCurrency(calculateTotalSalary(currentSalary.baseSalary, currentSalary.allowances))}
              </p>
            </div>
            <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
              <Wallet className="w-10 h-10 text-white" />
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-white/80">
              <Calendar className="w-4 h-4" />
              <span>Effective since {format(new Date(currentSalary.effectiveDate), 'MMM d, yyyy')}</span>
            </div>
            {currentSalary.grade && (
              <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
                <Award className="w-4 h-4" />
                <span className="font-medium">{currentSalary.grade}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Salary History */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900 flex items-center gap-2">
                <History className="w-5 h-5" />
                Salary History
              </h3>
              <p className="mt-1 text-sm text-gray-500">Complete history of salary changes</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>{salaries.length} total records</span>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="p-12 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-navy mx-auto"></div>
            <p className="text-gray-500 mt-4">Loading salary history...</p>
          </div>
        ) : salaries.length === 0 ? (
          <div className="p-12 text-center">
            <DollarSign className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-lg">No salary records found</p>
            <p className="text-gray-400 text-sm mt-1">Salary history will appear here once created</p>
          </div>
        ) : (
          <div className="p-6">
            <div className="space-y-4">
              {/* Current Salary in Timeline */}
              {currentSalary && (
                <div className="relative pl-8 pb-8 border-l-2 border-green-400">
                  <div className="absolute left-[-9px] top-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow"></div>
                  <div className="bg-green-50 rounded-lg border-2 border-green-200 p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Current
                          </span>
                          {currentSalary.grade && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {currentSalary.grade}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>Effective: {format(new Date(currentSalary.effectiveDate), 'MMM d, yyyy')}</span>
                          <span className="text-gray-400">•</span>
                          <span>{differenceInDays(new Date(), new Date(currentSalary.effectiveDate))} days ago</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-3">
                      <div className="bg-white rounded-lg p-3 border border-gray-200">
                        <p className="text-xs text-gray-500 mb-1">Base Salary</p>
                        <p className="font-semibold text-gray-900">{formatCurrency(currentSalary.baseSalary)}</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 border border-gray-200">
                        <p className="text-xs text-gray-500 mb-1">Allowances</p>
                        <p className="font-semibold text-gray-900">{formatCurrency(currentSalary.allowances)}</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 border border-green-200 bg-green-50">
                        <p className="text-xs text-gray-500 mb-1">Total</p>
                        <p className="font-bold text-green-600">
                          {formatCurrency(calculateTotalSalary(currentSalary.baseSalary, currentSalary.allowances))}
                        </p>
                      </div>
                    </div>

                    {currentSalary.notes && (
                      <div className="bg-white rounded-lg p-3 border border-gray-200">
                        <p className="text-xs text-gray-500 mb-1">Notes</p>
                        <p className="text-sm text-gray-700">{currentSalary.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Historical Salaries */}
              {historicalSalaries.map((salary, index) => {
                const prevSalary = index === 0 ? currentSalary : historicalSalaries[index - 1];
                const diff = prevSalary ? calculateDifference(
                  prevSalary.baseSalary,
                  salary.baseSalary
                ) : null;

                return (
                  <div key={salary.id} className="relative pl-8 pb-8 border-l-2 border-gray-300 last:border-l-0 last:pb-0">
                    <div className="absolute left-[-9px] top-0 w-4 h-4 bg-gray-400 rounded-full border-2 border-white shadow"></div>
                    <div className="bg-gray-50 rounded-lg border-2 border-gray-200 p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              Historical
                            </span>
                            {salary.grade && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {salary.grade}
                              </span>
                            )}
                            {diff && (
                              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                diff.amount > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                                <TrendingUp className="w-3 h-3" />
                                {diff.amount > 0 ? '+' : ''}{diff.percentage.toFixed(1)}%
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {format(new Date(salary.effectiveDate), 'MMM d, yyyy')}
                              {salary.endDate && ` - ${format(new Date(salary.endDate), 'MMM d, yyyy')}`}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-3">
                        <div className="bg-white rounded-lg p-3 border border-gray-200">
                          <p className="text-xs text-gray-500 mb-1">Base Salary</p>
                          <p className="font-semibold text-gray-900">{formatCurrency(salary.baseSalary)}</p>
                        </div>
                        <div className="bg-white rounded-lg p-3 border border-gray-200">
                          <p className="text-xs text-gray-500 mb-1">Allowances</p>
                          <p className="font-semibold text-gray-900">{formatCurrency(salary.allowances)}</p>
                        </div>
                        <div className="bg-white rounded-lg p-3 border border-gray-200">
                          <p className="text-xs text-gray-500 mb-1">Total</p>
                          <p className="font-semibold text-gray-900">
                            {formatCurrency(calculateTotalSalary(salary.baseSalary, salary.allowances))}
                          </p>
                        </div>
                      </div>

                      {salary.notes && (
                        <div className="bg-white rounded-lg p-3 border border-gray-200">
                          <p className="text-xs text-gray-500 mb-1">Notes</p>
                          <p className="text-sm text-gray-700">{salary.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
