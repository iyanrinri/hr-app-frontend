'use client';

import { useMyLeaveBalances, useMyLeaveRequests, useCancelLeaveRequest } from '@/hooks/useLeave';
import { Button } from '@/components/ui/Button';
// Card components removed as we are using custom styling
import { Plus, X, Calendar, Clock, AlertCircle, CheckCircle2, XCircle, Briefcase, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { LeaveRequestForm } from '@/components/leaves/LeaveRequestForm';
import { LeaveRequestStatus, LeaveBalance, LeaveRequest } from '@/types/leave';
import { format, formatDistanceToNow } from 'date-fns';

export default function MyLeavesPage() {
  const { data: balances, isLoading: isLoadingBalances } = useMyLeaveBalances();
  const { data: requestsData, isLoading: isLoadingRequests } = useMyLeaveRequests({ page: 1, limit: 50 });
  const { mutate: cancelRequest } = useCancelLeaveRequest();

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle API returning direct array or { data: [] }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const requests = Array.isArray(requestsData) ? requestsData : (requestsData as any)?.data || [];

  const getStatusBadge = (status: LeaveRequestStatus) => {
    switch (status) {
      case LeaveRequestStatus.APPROVED: 
      case LeaveRequestStatus.HR_APPROVED:
      case LeaveRequestStatus.MANAGER_APPROVED:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Approved
          </span>
        );
      case LeaveRequestStatus.PENDING: 
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </span>
        );
      case LeaveRequestStatus.REJECTED: 
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </span>
        );
      case LeaveRequestStatus.CANCELLED: 
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
            <AlertCircle className="w-3 h-3 mr-1" />
            Cancelled
          </span>
        );
      default: 
        return <span className="text-gray-500">{status}</span>;
    }
  };

  const handleCancel = (id: string) => {
    if (confirm('Are you sure you want to cancel this request?')) {
      cancelRequest(id);
    }
  };

  // Gradient definitions for cards
  const gradients = [
    'from-blue-500 to-cyan-400',
    'from-emerald-500 to-teal-400',
    'from-violet-500 to-purple-400',
    'from-orange-500 to-amber-400',
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Leave Management
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            View your balances and track your leave requests
          </p>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <Button onClick={() => setIsModalOpen(true)} className="shadow-lg shadow-brand-navy/20">
            <Plus className="w-4 h-4 mr-2" />
            New Request
          </Button>
        </div>
      </div>

      {/* Balances Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoadingBalances ? (
          [1, 2, 3].map((i) => (
            <div key={i} className="h-40 bg-gray-100 rounded-xl animate-pulse"></div>
          ))
        ) : (!balances || balances.length === 0) ? (
          <div className="col-span-full bg-white rounded-xl shadow-sm p-8 text-center border border-dashed border-gray-300">
            <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900">No Leave Balances</h3>
            <p className="text-gray-500 mt-1">You don&apos;t have any assigned leave quotas yet.</p>
          </div>
        ) : (
          balances.map((balance: LeaveBalance, idx: number) => (
            <div 
              key={balance.id} 
              className={`relative overflow-hidden rounded-xl shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-gradient-to-br ${gradients[idx % gradients.length]}`}
            >
              <div className="px-6 py-6 text-white relative z-10">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-white/80 text-sm font-medium mb-1">Leave Type</p>
                    <h3 className="text-2xl font-bold tracking-tight">{balance.leaveTypeName}</h3>
                  </div>
                  <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                </div>
                
                <div className="mt-8 flex items-end justify-between">
                  <div>
                    <p className="text-white/80 text-xs font-medium uppercase tracking-wider">Remaining</p>
                    <p className="text-4xl font-extrabold mt-1">{balance.remainingQuota}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white/80 text-xs mb-1">Total Quota: {balance.totalQuota}</p>
                    <p className="text-white/80 text-xs">Used: {balance.usedQuota}</p>
                  </div>
                </div>
              </div>
              
              {/* Decorative shapes */}
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
              <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-black/10 rounded-full blur-xl"></div>
            </div>
          ))
        )}
      </div>

      {/* Recent Activity / Requests List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Requests</h3>
            <p className="mt-1 text-sm text-gray-500">History of your leave applications</p>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type & Reason
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date Submitted
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
              {isLoadingRequests ? (
                [1, 2, 3].map((i) => (
                  <tr key={i}>
                    <td className="px-6 py-4 whitespace-nowrap"><div className="h-4 bg-gray-100 rounded w-3/4 animate-pulse"></div></td>
                    <td className="px-6 py-4 whitespace-nowrap"><div className="h-4 bg-gray-100 rounded w-1/2 animate-pulse"></div></td>
                    <td className="px-6 py-4 whitespace-nowrap"><div className="h-4 bg-gray-100 rounded w-1/2 animate-pulse"></div></td>
                    <td className="px-6 py-4 whitespace-nowrap"><div className="h-4 bg-gray-100 rounded w-1/4 animate-pulse"></div></td>
                    <td className="px-6 py-4 whitespace-nowrap text-right"><div className="h-4 bg-gray-100 rounded w-8 animate-pulse ml-auto"></div></td>
                  </tr>
                ))
              ) : requests.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center">
                      <Calendar className="w-12 h-12 text-gray-300 mb-3" />
                      <p className="text-lg font-medium text-gray-900">No requests found</p>
                      <p className="text-sm text-gray-500 mt-1">You haven&apos;t applied for any leave yet.</p>
                      <Button variant="ghost" onClick={() => setIsModalOpen(true)} className="mt-4 text-brand-navy hover:bg-blue-50">
                        Apply Now <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ) : (
                requests.map((req: LeaveRequest) => (
                  <tr key={req.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{req.leaveTypeName}</div>
                          <div className="text-sm text-gray-500 max-w-xs truncate">{req.reason}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {format(new Date(req.startDate), 'MMM d')} - {format(new Date(req.endDate), 'MMM d, yyyy')}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        {req.totalDays} day{req.totalDays > 1 ? 's' : ''}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {req.submittedAt ? formatDistanceToNow(new Date(req.submittedAt), { addSuffix: true }) : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(req.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {(req.status === LeaveRequestStatus.PENDING || req.status === LeaveRequestStatus.MANAGER_APPROVED) && (
                        <Button 
                          variant="danger" 
                          className="bg-white text-red-600 border border-red-200 hover:bg-red-50 hover:border-red-300 focus:ring-red-200 py-1 px-3 text-xs h-auto shadow-sm" 
                          onClick={() => handleCancel(req.id)}
                        >
                          Cancel
                        </Button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal - Apply Leave */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div className="fixed inset-0 bg-gray-500/75 backdrop-blur-sm transition-opacity" aria-hidden="true" onClick={() => setIsModalOpen(false)}></div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block relative z-50 align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 border-b border-gray-100">
                <div className="sm:flex sm:items-start justify-between">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-xl leading-6 font-bold text-gray-900" id="modal-title">
                      Apply for Leave
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Fill in the details below to request time off.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="bg-white rounded-full p-1 hover:bg-gray-100 transition-colors"
                  >
                    <X className="w-6 h-6 text-gray-400 hover:text-gray-600" />
                  </button>
                </div>
              </div>
              <div className="px-4 sm:px-8 py-6">
                <LeaveRequestForm 
                  onSuccess={() => setIsModalOpen(false)} 
                  onCancel={() => setIsModalOpen(false)} 
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
