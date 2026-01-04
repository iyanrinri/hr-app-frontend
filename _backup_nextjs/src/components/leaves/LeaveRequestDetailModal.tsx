import { LeaveRequest } from '@/types/leave';
import { LeaveStatusBadge } from './LeaveStatusBadge';
import { X, Calendar, Clock, User, MessageSquare, Phone, FileText } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';
import { Button } from '@/components/ui/Button';

interface LeaveRequestDetailModalProps {
  request: LeaveRequest;
  isOpen: boolean;
  onClose: () => void;
  onApprove?: () => void;
  onReject?: () => void;
  onCancel?: () => void;
  showActions?: boolean;
  userRole?: string;
}

export function LeaveRequestDetailModal({
  request,
  isOpen,
  onClose,
  onApprove,
  onReject,
  onCancel,
  showActions = false,
  userRole,
}: LeaveRequestDetailModalProps) {
  if (!isOpen) return null;

  const canApprove = showActions && (userRole === 'MANAGER' || userRole === 'HR' || userRole === 'ADMIN' || userRole === 'SUPER');
  const canCancel = showActions && (request.status === 'PENDING' || request.status === 'MANAGER_APPROVED');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl my-8">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-brand-navy to-blue-600">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white">Leave Request Details</h3>
              <p className="text-sm text-white/80 mt-1">Request ID: {request.id}</p>
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
          {/* Status & Employee Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {request.employeeName && (
                <>
                  <div className="h-12 w-12 rounded-full bg-brand-navy flex items-center justify-center text-white">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{request.employeeName}</p>
                    <p className="text-sm text-gray-500">Employee</p>
                  </div>
                </>
              )}
            </div>
            <LeaveStatusBadge status={request.status} className="text-sm px-3 py-1" />
          </div>

          {/* Leave Type & Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center gap-2 text-blue-700 mb-2">
                <FileText className="w-4 h-4" />
                <span className="text-xs font-medium uppercase">Leave Type</span>
              </div>
              <p className="text-lg font-semibold text-blue-900">{request.leaveTypeName}</p>
            </div>

            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <div className="flex items-center gap-2 text-purple-700 mb-2">
                <Clock className="w-4 h-4" />
                <span className="text-xs font-medium uppercase">Duration</span>
              </div>
              <p className="text-lg font-semibold text-purple-900">
                {request.totalDays} {request.totalDays === 1 ? 'Day' : 'Days'}
              </p>
            </div>
          </div>

          {/* Date Range */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex items-center gap-2 text-gray-700 mb-3">
              <Calendar className="w-4 h-4" />
              <span className="text-sm font-medium">Leave Period</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 mb-1">Start Date</p>
                <p className="font-medium text-gray-900">
                  {format(new Date(request.startDate), 'EEEE, MMM d, yyyy')}
                </p>
              </div>
              <div className="text-gray-400">→</div>
              <div className="text-right">
                <p className="text-xs text-gray-500 mb-1">End Date</p>
                <p className="font-medium text-gray-900">
                  {format(new Date(request.endDate), 'EEEE, MMM d, yyyy')}
                </p>
              </div>
            </div>
          </div>

          {/* Reason */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Reason</label>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="text-gray-900">{request.reason}</p>
            </div>
          </div>

          {/* Emergency Contact */}
          {request.emergencyContact && (
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Emergency Contact
              </label>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-gray-900 font-mono">{request.emergencyContact}</p>
              </div>
            </div>
          )}

          {/* Handover Notes */}
          {request.handoverNotes && (
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Handover Notes
              </label>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-gray-900">{request.handoverNotes}</p>
              </div>
            </div>
          )}

          {/* Manager Comments */}
          {request.managerComments && (
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Manager Comments</label>
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <p className="text-blue-900">{request.managerComments}</p>
                {request.managerApprovedAt && (
                  <p className="text-xs text-blue-600 mt-2">
                    Approved on {format(new Date(request.managerApprovedAt), 'MMM d, yyyy HH:mm')}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* HR Comments */}
          {request.hrComments && (
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">HR Comments</label>
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <p className="text-green-900">{request.hrComments}</p>
              </div>
            </div>
          )}

          {/* Submission Info */}
          <div className="pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Submitted on {format(new Date(request.submittedAt), 'EEEE, MMM d, yyyy HH:mm')}
            </p>
          </div>
        </div>

        {/* Actions */}
        {showActions && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
            {canCancel && onCancel && (
              <Button variant="danger" onClick={onCancel}>
                Cancel Request
              </Button>
            )}
            {canApprove && onReject && (
              <Button variant="danger" onClick={onReject}>
                Reject
              </Button>
            )}
            {canApprove && onApprove && (
              <Button onClick={onApprove} className="bg-green-600 hover:bg-green-700">
                Approve
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
