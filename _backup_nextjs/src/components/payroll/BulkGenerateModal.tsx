'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { X, Calendar, Percent, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { DeductionEntry, BulkGeneratePayrollRequest } from '@/types/payroll';
import { useAllEmployees } from '@/hooks/useEmployees';
import DeductionsManager from './DeductionsManager';
import { formatCurrency } from '@/lib/utils';

interface BulkGenerateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: BulkGeneratePayrollRequest) => void;
  isLoading?: boolean;
}

export default function BulkGenerateModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false
}: BulkGenerateModalProps) {
  // Get current month dates
  const getCurrentMonthDates = () => {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    
    return {
      start: firstDay.toISOString().split('T')[0],
      end: lastDay.toISOString().split('T')[0]
    };
  };

  const defaultDates = getCurrentMonthDates();

  // Form state
  const [periodStart, setPeriodStart] = useState(defaultDates.start);
  const [periodEnd, setPeriodEnd] = useState(defaultDates.end);
  const [bonusPercentage, setBonusPercentage] = useState<string>('');
  const [generateFor, setGenerateFor] = useState<'all' | 'specific'>('all');
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<string[]>([]);
  const [deductions, setDeductions] = useState<DeductionEntry[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Fetch employees
  const { data: employees = [], isLoading: isLoadingEmployees } = useAllEmployees();

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      const dates = getCurrentMonthDates();
      setPeriodStart(dates.start);
      setPeriodEnd(dates.end);
      setBonusPercentage('');
      setGenerateFor('all');
      setSelectedEmployeeIds([]);
      setDeductions([]);
      setErrors({});
    }
  }, [isOpen]);

  // Deductions handlers
  const handleAddDeduction = () => {
    const newDeduction: DeductionEntry = {
      id: `deduction-${Date.now()}`,
      employeeId: '',
      employeeName: '',
      amount: ''
    };
    setDeductions([...deductions, newDeduction]);
  };

  const handleRemoveDeduction = (id: string) => {
    setDeductions(deductions.filter(d => d.id !== id));
  };

  const handleUpdateDeduction = (id: string, field: 'employeeId' | 'amount', value: string) => {
    setDeductions(deductions.map(d => {
      if (d.id === id) {
        if (field === 'employeeId') {
          const employee = employees.find(e => e.id === value);
          return {
            ...d,
            employeeId: value,
            employeeName: employee ? `${employee.firstName} ${employee.lastName}` : ''
          };
        }
        return { ...d, [field]: value };
      }
      return d;
    }));
  };

  // Calculate summary
  const summary = useMemo(() => {
    const employeeCount = generateFor === 'all' 
      ? employees.length 
      : selectedEmployeeIds.length;

    // Estimate average salary (you might want to calculate this from actual employee data)
    const averageSalary = employees.length > 0
      ? employees.reduce((sum, emp) => sum + (emp.baseSalary || 0), 0) / employees.length
      : 0;

    const bonusPercent = parseFloat(bonusPercentage) || 0;
    const estimatedTotalBonus = employeeCount * averageSalary * (bonusPercent / 100);

    const totalDeductions = deductions.reduce((sum, d) => {
      return sum + (parseFloat(d.amount) || 0);
    }, 0);

    return {
      employeeCount,
      estimatedTotalBonus,
      totalDeductions
    };
  }, [generateFor, employees, selectedEmployeeIds, bonusPercentage, deductions]);

  // Validation
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!periodStart) {
      newErrors.periodStart = 'Start date is required';
    }

    if (!periodEnd) {
      newErrors.periodEnd = 'End date is required';
    }

    if (periodStart && periodEnd && new Date(periodEnd) <= new Date(periodStart)) {
      newErrors.periodEnd = 'End date must be after start date';
    }

    if (bonusPercentage) {
      const bonus = parseFloat(bonusPercentage);
      if (isNaN(bonus) || bonus < 0 || bonus > 100) {
        newErrors.bonusPercentage = 'Bonus percentage must be between 0 and 100';
      }
    }

    if (generateFor === 'specific' && selectedEmployeeIds.length === 0) {
      newErrors.selectedEmployees = 'Please select at least one employee';
    }

    // Validate deductions
    deductions.forEach((d, index) => {
      if (!d.employeeId) {
        newErrors[`deduction-${index}-employee`] = 'Employee is required';
      }
      if (!d.amount || parseFloat(d.amount) <= 0) {
        newErrors[`deduction-${index}-amount`] = 'Amount must be greater than 0';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    // Build deductions object
    const deductionsObj: Record<string, string> = {};
    deductions.forEach(d => {
      if (d.employeeId && d.amount) {
        deductionsObj[d.employeeId] = d.amount;
      }
    });

    const payload: BulkGeneratePayrollRequest = {
      periodStart: new Date(periodStart).toISOString(),
      periodEnd: new Date(periodEnd).toISOString(),
      bonusPercentage: bonusPercentage ? parseFloat(bonusPercentage) : undefined,
      deductions: Object.keys(deductionsObj).length > 0 ? deductionsObj : undefined,
      employeeIds: generateFor === 'specific' ? selectedEmployeeIds : undefined
    };

    onSubmit(payload);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl my-8">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-brand-navy to-blue-600">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white">🚀 Bulk Generate Payroll</h3>
              <p className="text-sm text-white/80 mt-1">
                Generate payroll untuk semua karyawan dengan sekali klik
              </p>
            </div>
            <button
              onClick={onClose}
              disabled={isLoading}
              className="p-2 rounded-full hover:bg-white/20 transition-colors disabled:opacity-50"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Period Selector */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              📅 Payroll Period *
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">From</label>
                <input
                  type="date"
                  value={periodStart}
                  onChange={(e) => setPeriodStart(e.target.value)}
                  className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:border-brand-cyan"
                  disabled={isLoading}
                />
                {errors.periodStart && (
                  <p className="text-xs text-red-600 mt-1">{errors.periodStart}</p>
                )}
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">To</label>
                <input
                  type="date"
                  value={periodEnd}
                  onChange={(e) => setPeriodEnd(e.target.value)}
                  className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:border-brand-cyan"
                  disabled={isLoading}
                />
                {errors.periodEnd && (
                  <p className="text-xs text-red-600 mt-1">{errors.periodEnd}</p>
                )}
              </div>
            </div>
          </div>

          {/* Bonus Percentage */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
              <Percent className="w-4 h-4" />
              💰 Bonus Percentage (Optional)
            </label>
            <div className="relative">
              <input
                type="number"
                value={bonusPercentage}
                onChange={(e) => setBonusPercentage(e.target.value)}
                placeholder="0"
                min="0"
                max="100"
                step="0.1"
                className="w-full px-4 py-2.5 pr-12 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:border-brand-cyan"
                disabled={isLoading}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">%</span>
            </div>
            {errors.bonusPercentage && (
              <p className="text-xs text-red-600 mt-1">{errors.bonusPercentage}</p>
            )}
            {bonusPercentage && (
              <div className="mt-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-xs text-blue-700">
                  ℹ️ Bonus akan di-calculate otomatis dari base salary. 
                  Contoh: Rp 5.000.000 × {bonusPercentage}% = {formatCurrency(5000000 * (parseFloat(bonusPercentage) / 100))}
                </p>
              </div>
            )}
          </div>

          {/* Generate For */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
              <Users className="w-4 h-4" />
              👥 Generate For
            </label>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-brand-cyan transition-colors">
                <input
                  type="radio"
                  value="all"
                  checked={generateFor === 'all'}
                  onChange={(e) => setGenerateFor(e.target.value as 'all' | 'specific')}
                  className="w-4 h-4 text-brand-cyan"
                  disabled={isLoading}
                />
                <span className="flex-1 font-medium text-gray-900">
                  All Active Employees (Recommended)
                  {!isLoadingEmployees && <span className="text-gray-500 ml-2">({employees.length})</span>}
                </span>
              </label>

              <label className="flex items-center gap-3 p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-brand-cyan transition-colors">
                <input
                  type="radio"
                  value="specific"
                  checked={generateFor === 'specific'}
                  onChange={(e) => setGenerateFor(e.target.value as 'all' | 'specific')}
                  className="w-4 h-4 text-brand-cyan"
                  disabled={isLoading}
                />
                <span className="flex-1 font-medium text-gray-900">Specific Employees Only</span>
              </label>

              {generateFor === 'specific' && (
                <div className="ml-7 mt-3">
                  <select
                    multiple
                    value={selectedEmployeeIds}
                    onChange={(e) => {
                      const selected = Array.from(e.target.selectedOptions, option => option.value);
                      setSelectedEmployeeIds(selected);
                    }}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:border-brand-cyan min-h-[150px]"
                    disabled={isLoading || isLoadingEmployees}
                  >
                    {employees.map((emp) => (
                      <option key={emp.id} value={emp.id}>
                        {emp.firstName} {emp.lastName} - {emp.position}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    Hold Ctrl/Cmd to select multiple employees
                  </p>
                  {errors.selectedEmployees && (
                    <p className="text-xs text-red-600 mt-1">{errors.selectedEmployees}</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Deductions Manager */}
          <DeductionsManager
            deductions={deductions}
            employees={employees}
            onAdd={handleAddDeduction}
            onRemove={handleRemoveDeduction}
            onUpdate={handleUpdateDeduction}
          />

          {/* Summary Preview */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-5 border-2 border-gray-200">
            <div className="flex items-center gap-2 text-gray-700 mb-4">
              <TrendingUp className="w-5 h-5" />
              <span className="text-sm font-semibold">📊 Summary Preview</span>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Employees to generate:</span>
                <span className="text-lg font-bold text-gray-900">{summary.employeeCount}</span>
              </div>
              {bonusPercentage && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total bonus estimate:</span>
                  <span className="text-lg font-bold text-green-600">
                    {formatCurrency(summary.estimatedTotalBonus)}
                  </span>
                </div>
              )}
              {summary.totalDeductions > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total deductions:</span>
                  <span className="text-lg font-bold text-red-600">
                    {formatCurrency(summary.totalDeductions)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading || isLoadingEmployees}
              className="bg-brand-cyan hover:bg-brand-cyan/90 text-white"
            >
              {isLoading ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  Generating...
                </>
              ) : (
                <>
                  🚀 Generate Payroll
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
