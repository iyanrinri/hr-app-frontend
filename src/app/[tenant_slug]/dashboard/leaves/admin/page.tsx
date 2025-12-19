'use client';

import { useState } from 'react';
import { useAllEmployees } from '@/hooks/useEmployees';
import { useEmployeeLeaveBalances } from '@/hooks/useLeave';
import { useActiveLeavePeriod, useLeaveTypes } from '@/hooks/useLeave';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Search, Briefcase, Calendar, Plus, Edit } from 'lucide-react';
import { LeaveBalance } from '@/types/leave';
import { format } from 'date-fns';

export default function LeaveAdminPage() {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

  const { data: employees } = useAllEmployees();
  const { data: activePeriod } = useActiveLeavePeriod();
  const { data: leaveTypes } = useLeaveTypes(activePeriod?.id);
  
  // Get balances for selected employee
  const { data: balances, isLoading: isLoadingBalances } = useEmployeeLeaveBalances(selectedEmployeeId);

  // Filter employees based on search
  const filteredEmployees = employees?.filter(emp => {
    const fullName = `${emp.firstName} ${emp.lastName}`.toLowerCase();
    const position = emp.position?.toLowerCase() || '';
    const query = searchQuery.toLowerCase();
    return fullName.includes(query) || position.includes(query);
  });

  const selectedEmployee = employees?.find(emp => emp.id === selectedEmployeeId);

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Leave Administration
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage employee leave balances and quotas
          </p>
        </div>
      </div>

      {/* Active Period Info */}
      {activePeriod && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm font-medium text-blue-900">
                Active Period: {activePeriod.name}
              </p>
              <p className="text-xs text-blue-700">
                {format(new Date(activePeriod.startDate), 'MMM d, yyyy')} - {format(new Date(activePeriod.endDate), 'MMM d, yyyy')}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Employee Search */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Search Employee</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy focus:ring-offset-2"
                placeholder="Search by name or position..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Employee Select */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Select Employee</label>
            <select
              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy focus:ring-offset-2"
              value={selectedEmployeeId}
              onChange={(e) => setSelectedEmployeeId(e.target.value)}
            >
              <option value="">-- Select Employee --</option>
              {filteredEmployees?.map(emp => (
                <option key={emp.id} value={emp.id}>
                  {emp.firstName} {emp.lastName} ({emp.position})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Content Area */}
      {!selectedEmployeeId ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-dashed border-gray-300">
          <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 text-lg">Select an employee to view their leave balances</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Employee Info Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-brand-navy flex items-center justify-center text-white">
                  <span className="text-lg font-bold">
                    {selectedEmployee?.firstName.charAt(0)}{selectedEmployee?.lastName.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {selectedEmployee?.firstName} {selectedEmployee?.lastName}
                  </h3>
                  <p className="text-sm text-gray-500">{selectedEmployee?.position}</p>
                </div>
              </div>
              <Button onClick={() => setIsAssignModalOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Assign Leave Balance
              </Button>
            </div>
          </div>

          {/* Leave Balances */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Leave Balances</h3>
              <p className="mt-1 text-sm text-gray-500">Current leave quotas and usage</p>
            </div>

            {isLoadingBalances ? (
              <div className="p-8 text-center">Loading balances...</div>
            ) : !balances || balances.length === 0 ? (
              <div className="p-8 text-center">
                <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No leave balances assigned yet</p>
                <Button 
                  variant="ghost" 
                  onClick={() => setIsAssignModalOpen(true)}
                  className="mt-4"
                >
                  Assign First Balance
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Leave Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total Quota
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Used
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Remaining
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Valid Period
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
                    {balances.map((balance: LeaveBalance) => {
                      const usagePercent = (balance.usedQuota / balance.totalQuota) * 100;
                      return (
                        <tr key={balance.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <Briefcase className="w-5 h-5 text-gray-400 mr-3" />
                              <div className="text-sm font-medium text-gray-900">
                                {balance.leaveTypeName}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {balance.totalQuota} days
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-900">{balance.usedQuota} days</span>
                              <div className="w-24 bg-gray-200 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${
                                    usagePercent >= 90 ? 'bg-red-500' :
                                    usagePercent >= 70 ? 'bg-yellow-500' :
                                    'bg-green-500'
                                  }`}
                                  style={{ width: `${Math.min(usagePercent, 100)}%` }}
                                />
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`text-sm font-medium ${
                              balance.remainingQuota <= 0 ? 'text-red-600' :
                              balance.remainingQuota <= 3 ? 'text-yellow-600' :
                              'text-green-600'
                            }`}>
                              {balance.remainingQuota} days
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {format(new Date(balance.validFrom), 'MMM d, yy')} - {format(new Date(balance.validTo), 'MMM d, yy')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {balance.isActive ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Active
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                Inactive
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Button variant="ghost" className="h-8 px-2">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Assign Balance Modal */}
      {isAssignModalOpen && (
        <AssignBalanceModal
          isOpen={isAssignModalOpen}
          onClose={() => setIsAssignModalOpen(false)}
          employeeId={selectedEmployeeId}
          employeeName={selectedEmployee ? `${selectedEmployee.firstName} ${selectedEmployee.lastName}` : ''}
          leaveTypes={leaveTypes || []}
        />
      )}
    </div>
  );
}

// --- Assign Balance Modal Component ---

interface AssignBalanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  employeeId: string;
  employeeName: string;
  leaveTypes: Array<{ id: number; name: string; defaultQuota: number }>;
}

function AssignBalanceModal({ isOpen, onClose, employeeId, employeeName, leaveTypes }: AssignBalanceModalProps) {
  const [selectedTypeId, setSelectedTypeId] = useState('');
  const [quota, setQuota] = useState(0);

  const selectedType = leaveTypes.find(t => String(t.id) === selectedTypeId);

  const handleAssign = () => {
    // TODO: Implement assign balance mutation
    console.log('Assigning balance:', { employeeId, leaveTypeConfigId: selectedTypeId, quota });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6 border-b flex justify-between items-center">
          <h3 className="text-lg font-bold">Assign Leave Balance</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <Plus className="w-5 h-5 rotate-45" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <p className="text-sm text-gray-600">Employee</p>
            <p className="font-medium text-gray-900">{employeeName}</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Leave Type</label>
            <select
              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy"
              value={selectedTypeId}
              onChange={(e) => {
                setSelectedTypeId(e.target.value);
                const type = leaveTypes.find(t => String(t.id) === e.target.value);
                if (type) setQuota(type.defaultQuota);
              }}
            >
              <option value="">-- Select Leave Type --</option>
              {leaveTypes.map(type => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Quota (Days)"
            type="number"
            value={quota}
            onChange={(e) => setQuota(Number(e.target.value))}
            placeholder="Enter quota"
          />

          {selectedType && (
            <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded">
              Default quota for {selectedType.name}: {selectedType.defaultQuota} days
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleAssign}
              disabled={!selectedTypeId || quota <= 0}
            >
              Assign Balance
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
