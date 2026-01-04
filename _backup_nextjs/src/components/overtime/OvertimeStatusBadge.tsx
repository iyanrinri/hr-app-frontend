import React from 'react';
import { OvertimeStatus } from '@/types/overtime';
import { CheckCircle2, Clock, XCircle } from 'lucide-react';

interface OvertimeStatusBadgeProps {
  status: OvertimeStatus;
  managerApprovedAt?: string;
  hrApprovedAt?: string;
}

export const OvertimeStatusBadge: React.FC<OvertimeStatusBadgeProps> = ({ 
  status
}) => {
  // APPROVED - Final state
  if (status === OvertimeStatus.APPROVED || status === OvertimeStatus.HR_APPROVED) {
    return (
      <div className="flex flex-col gap-1">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
          <CheckCircle2 className="w-3 h-3 mr-1" />
          Approved
        </span>
      </div>
    );
  }

  // MANAGER_APPROVED - Waiting for HR
  if (status === OvertimeStatus.MANAGER_APPROVED) {
    return (
      <div className="flex flex-col gap-1">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
          <CheckCircle2 className="w-3 h-3 mr-1" />
          Manager Approved
        </span>
        <span className="text-[10px] text-gray-500 leading-tight">Waiting for HR</span>
      </div>
    );
  }

  // PENDING
  if (status === OvertimeStatus.PENDING) {
    return (
      <div className="flex flex-col gap-1">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
          <Clock className="w-3 h-3 mr-1" />
          Pending
        </span>
        {/* <span className="text-[10px] text-gray-500 leading-tight">Waiting for Approval</span> */}
      </div>
    );
  }

  // REJECTED
  if (status === OvertimeStatus.REJECTED) {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
        <XCircle className="w-3 h-3 mr-1" />
        Rejected
      </span>
    );
  }

  // Default fallback
  return <span className="text-gray-500 text-xs">{status}</span>;
};
