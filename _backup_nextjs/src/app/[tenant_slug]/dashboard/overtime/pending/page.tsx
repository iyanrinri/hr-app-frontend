'use client';

import { usePendingOvertimeApprovals, useProcessOvertimeApproval } from '@/hooks/useOvertimeApprovals';
import { OvertimeStatusBadge } from '@/components/overtime/OvertimeStatusBadge';
import { format } from 'date-fns';
import { CheckCircle2, XCircle, Clock, User } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { OvertimeStatus, ApproverType, ApprovalStatus } from '@/types/overtime';

export default function PendingOvertimePage() {
  const { data: requests, isLoading } = usePendingOvertimeApprovals();
  const { mutate: processApproval } = useProcessOvertimeApproval();

  const handleApprove = (id: string, currentStatus: OvertimeStatus) => {
    // Determine approver type based on current status
    // PENDING -> Manager Approval needed -> I am acting as MANAGER
    // MANAGER_APPROVED -> HR Approval needed -> I am acting as HR
    let approverType = ApproverType.MANAGER;
    if (currentStatus === OvertimeStatus.MANAGER_APPROVED) {
      approverType = ApproverType.HR;
    }

    const comments = prompt("Optional: Add approval comments");
    if (comments !== null) {
      processApproval({
        requestId: id,
        status: ApprovalStatus.APPROVED,
        approverType,
        comments
      });
    }
  };

  const handleReject = (id: string, currentStatus: OvertimeStatus) => {
    let approverType = ApproverType.MANAGER;
    if (currentStatus === OvertimeStatus.MANAGER_APPROVED) {
      approverType = ApproverType.HR;
    }

    const reason = prompt("Please provide a reason for rejection (Required)");
    if (reason) {
      processApproval({
        requestId: id,
        status: ApprovalStatus.REJECTED,
        approverType,
        rejectionReason: reason
      });
    } else if (reason === '') {
      toast.error("Rejection reason is required");
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Pending Approvals
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Review and manage overtime requests requiring your approval
          </p>
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
                  Reason & Time
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                [1, 2, 3].map((i) => (
                  <tr key={i}>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-3/4 animate-pulse"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-1/2 animate-pulse"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-3/4 animate-pulse"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-1/4 animate-pulse"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-1/4 animate-pulse"></div></td>
                    <td className="px-6 py-4"></td>
                  </tr>
                ))
              ) : !requests || requests.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center">
                      <Clock className="w-12 h-12 text-gray-300 mb-3" />
                      <p className="text-lg font-medium text-gray-900">No pending approvals</p>
                      <p className="text-sm text-gray-500 mt-1">You&apos;re all caught up!</p>
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
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 truncate max-w-xs" title={request.reason}>
                         {request.reason}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        {format(new Date(request.startTime), 'HH:mm')} - {format(new Date(request.endTime), 'HH:mm')}
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
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                         <button 
                           onClick={() => handleApprove(request.id, request.status)}
                           className="p-1 rounded-full text-green-600 hover:bg-green-50 transition-colors"
                           title="Approve"
                         >
                           <CheckCircle2 className="w-5 h-5" />
                         </button>
                         <button 
                           onClick={() => handleReject(request.id, request.status)}
                           className="p-1 rounded-full text-red-600 hover:bg-red-50 transition-colors"
                           title="Reject"
                         >
                           <XCircle className="w-5 h-5" />
                         </button>
                      </div>
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
