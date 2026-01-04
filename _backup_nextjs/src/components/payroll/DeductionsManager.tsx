'use client';

import React from 'react';
import { DeductionEntry } from '@/types/payroll';
import { Employee } from '@/hooks/useEmployees';
import { X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/lib/utils';

interface DeductionsManagerProps {
  deductions: DeductionEntry[];
  employees: Employee[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, field: 'employeeId' | 'amount', value: string) => void;
}

export default function DeductionsManager({
  deductions,
  employees,
  onAdd,
  onRemove,
  onUpdate
}: DeductionsManagerProps) {
  // Get available employees (not already in deductions list)
  const getAvailableEmployees = (currentDeductionId: string) => {
    const usedEmployeeIds = deductions
      .filter(d => d.id !== currentDeductionId)
      .map(d => d.employeeId);
    return employees.filter(emp => !usedEmployeeIds.includes(emp.id));
  };

  const totalDeductions = deductions.reduce((sum, d) => {
    const amount = parseFloat(d.amount) || 0;
    return sum + amount;
  }, 0);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">
          💸 Deductions (Manual per Employee)
        </label>
        <Button
          type="button"
          variant="secondary"
          onClick={onAdd}
          className="text-sm"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Deduction
        </Button>
      </div>

      {deductions.length > 0 && (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {deductions.map((deduction) => {
                const availableEmployees = getAvailableEmployees(deduction.id);
                const selectedEmployee = employees.find(e => e.id === deduction.employeeId);
                
                return (
                  <tr key={deduction.id}>
                    <td className="px-4 py-3">
                      <select
                        value={deduction.employeeId}
                        onChange={(e) => {
                          const employee = employees.find(emp => emp.id === e.target.value);
                          onUpdate(deduction.id, 'employeeId', e.target.value);
                          // Also update employee name for display
                          if (employee) {
                            const updatedDeduction = deductions.find(d => d.id === deduction.id);
                            if (updatedDeduction) {
                              updatedDeduction.employeeName = `${employee.firstName} ${employee.lastName}`;
                            }
                          }
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:border-brand-cyan"
                      >
                        <option value="">Select Employee</option>
                        {selectedEmployee && (
                          <option value={selectedEmployee.id}>
                            {selectedEmployee.firstName} {selectedEmployee.lastName} - {selectedEmployee.position}
                          </option>
                        )}
                        {availableEmployees.map((emp) => (
                          <option key={emp.id} value={emp.id}>
                            {emp.firstName} {emp.lastName} - {emp.position}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        value={deduction.amount}
                        onChange={(e) => onUpdate(deduction.id, 'amount', e.target.value)}
                        placeholder="0"
                        min="0"
                        step="1000"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:border-brand-cyan"
                      />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => onRemove(deduction.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        title="Remove deduction"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          
          {totalDeductions > 0 && (
            <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Total Deductions:</span>
                <span className="text-lg font-bold text-gray-900">{formatCurrency(totalDeductions)}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {deductions.length === 0 && (
        <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200 border-dashed">
          <p className="text-sm text-gray-500">No deductions added yet</p>
          <p className="text-xs text-gray-400 mt-1">Click &quot;Add Deduction&quot; to add employee-specific deductions</p>
        </div>
      )}
    </div>
  );
}
