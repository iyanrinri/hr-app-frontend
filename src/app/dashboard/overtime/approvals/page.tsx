'use client';

import { useState } from 'react';
import { useOvertimeApprovals, useOvertimeApprovalStats } from '@/hooks/useOvertimeApprovals';
import { OvertimeStatusBadge } from '@/components/overtime/OvertimeStatusBadge';
import { format } from 'date-fns';
import { User, Filter } from 'lucide-react';
import { OvertimeStatus, ApproverType } from '@/types/overtime';

export default function ApprovalsHistoryPage() {
  const [statusFilter, setStatusFilter] = useState<OvertimeStatus | ''>('');
  const [approverTypeFilter, setApproverTypeFilter] = useState<ApproverType | ''>('');

  const { data: listResponse, isLoading } = useOvertimeApprovals({ 
    take: 50,
    status: statusFilter || undefined,
    approverType: approverTypeFilter || undefined
  });
  
  const { data: stats } = useOvertimeApprovalStats();

  const requests = listResponse?.requests || [];

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Approval History
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            View history of all overtime approvals
          </p>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4 gap-2">
           <select 
             className="rounded-md border-gray-300 shadow-sm focus:border-brand-navy focus:ring-brand-navy sm:text-sm"
             value={statusFilter}
             onChange={(e) => setStatusFilter(e.target.value as OvertimeStatus)}
           >
             <option value="">All Status</option>
             <option value={OvertimeStatus.APPROVED}>Approved</option>
             <option value={OvertimeStatus.REJECTED}>Rejected</option>
             <option value={OvertimeStatus.PENDING}>Pending</option>
           </select>
           <select 
             className="rounded-md border-gray-300 shadow-sm focus:border-brand-navy focus:ring-brand-navy sm:text-sm"
             value={approverTypeFilter}
             onChange={(e) => setApproverTypeFilter(e.target.value as ApproverType)}
           >
             <option value="">All Types</option>
             <option value={ApproverType.MANAGER}>Manager</option>
             <option value={ApproverType.HR}>HR</option>
           </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Total Processed</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">{stats?.total || 0}</dd>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Approved</dt>
            <dd className="mt-1 text-3xl font-semibold text-green-600">{stats?.approved || 0}</dd>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Rejected</dt>
            <dd className="mt-1 text-3xl font-semibold text-red-600">{stats?.rejected || 0}</dd>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Pending</dt>
            <dd className="mt-1 text-3xl font-semibold text-yellow-600">{stats?.pending || 0}</dd>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reason
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                [1, 2, 3].map((i) => (
                  <tr key={i}>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-3/4 animate-pulse"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-1/2 animate-pulse"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-1/4 animate-pulse"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-1/4 animate-pulse"></div></td>
                    <td className="px-6 py-4"></td>
                  </tr>
                ))
              ) : requests.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center">
                      <Filter className="w-12 h-12 text-gray-300 mb-3" />
                      <p className="text-lg font-medium text-gray-900">No approvals found</p>
                      <p className="text-sm text-gray-500 mt-1">Try adjusting the filters</p>
                    </div>
                  </td>
                </tr>
              ) : (
                requests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                       <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-brand-navy/10 flex items-center justify-center text-brand-navy mr-3">
                             <User className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {request.employee?.name || `Emp #${request.employeeId}`}
                            </div>
                            <div className="text-xs text-gray-500">
                              {request.employee?.email}
                            </div>
                          </div>
                       </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {format(new Date(request.date), 'MMM d, yyyy')}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        {format(new Date(request.startTime), 'HH:mm')} - {format(new Date(request.endTime), 'HH:mm')}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 truncate max-w-xs" title={request.reason}>
                         {request.reason}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {(request.totalMinutes / 60).toFixed(1)} hrs
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <OvertimeStatusBadge 
                        status={request.status} 
                        managerApprovedAt={request.managerApprovedAt}
                        hrApprovedAt={request.hrApprovedAt}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
