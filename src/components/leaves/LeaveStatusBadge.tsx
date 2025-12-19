import { LeaveRequestStatus } from '@/types/leave';
import { CheckCircle2, Clock, XCircle, AlertCircle } from 'lucide-react';

interface LeaveStatusBadgeProps {
  status: LeaveRequestStatus;
  className?: string;
}

export function LeaveStatusBadge({ status, className = '' }: LeaveStatusBadgeProps) {
  const getStatusConfig = () => {
    switch (status) {
      case LeaveRequestStatus.APPROVED:
        return {
          icon: CheckCircle2,
          label: 'Approved',
          bgColor: 'bg-green-100',
          textColor: 'text-green-800',
          borderColor: 'border-green-200',
        };
      case LeaveRequestStatus.MANAGER_APPROVED:
        return {
          icon: CheckCircle2,
          label: 'Manager Approved',
          bgColor: 'bg-blue-100',
          textColor: 'text-blue-800',
          borderColor: 'border-blue-200',
        };
      case LeaveRequestStatus.HR_APPROVED:
        return {
          icon: CheckCircle2,
          label: 'HR Approved',
          bgColor: 'bg-teal-100',
          textColor: 'text-teal-800',
          borderColor: 'border-teal-200',
        };
      case LeaveRequestStatus.PENDING:
        return {
          icon: Clock,
          label: 'Pending',
          bgColor: 'bg-yellow-100',
          textColor: 'text-yellow-800',
          borderColor: 'border-yellow-200',
        };
      case LeaveRequestStatus.REJECTED:
        return {
          icon: XCircle,
          label: 'Rejected',
          bgColor: 'bg-red-100',
          textColor: 'text-red-800',
          borderColor: 'border-red-200',
        };
      case LeaveRequestStatus.CANCELLED:
        return {
          icon: AlertCircle,
          label: 'Cancelled',
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-800',
          borderColor: 'border-gray-200',
        };
      default:
        return {
          icon: Clock,
          label: status,
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-800',
          borderColor: 'border-gray-200',
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.bgColor} ${config.textColor} ${config.borderColor} ${className}`}
    >
      <Icon className="w-3 h-3 mr-1" />
      {config.label}
    </span>
  );
}
