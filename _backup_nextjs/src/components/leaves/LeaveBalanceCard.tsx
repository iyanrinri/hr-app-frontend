import { LeaveBalance } from '@/types/leave';
import { Briefcase, Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface LeaveBalanceCardProps {
  balance: LeaveBalance;
  gradient?: string;
  onClick?: () => void;
}

export function LeaveBalanceCard({ 
  balance, 
  gradient = 'from-blue-500 to-cyan-400',
  onClick 
}: LeaveBalanceCardProps) {
  const usagePercent = balance.totalQuota > 0 
    ? (balance.usedQuota / balance.totalQuota) * 100 
    : 0;

  return (
    <div 
      className={`relative overflow-hidden rounded-xl shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-gradient-to-br ${gradient} ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
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

        {/* Usage Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-white/80 text-xs">Usage</span>
            <span className="text-white/90 text-xs font-medium">{usagePercent.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2 backdrop-blur-sm">
            <div
              className="bg-white h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(usagePercent, 100)}%` }}
            />
          </div>
        </div>

        {/* Valid Period */}
        <div className="mt-4 pt-4 border-t border-white/20">
          <div className="flex items-center gap-2 text-white/80 text-xs">
            <Calendar className="w-3 h-3" />
            <span>
              Valid: {format(new Date(balance.validFrom), 'MMM d, yyyy')} - {format(new Date(balance.validTo), 'MMM d, yyyy')}
            </span>
          </div>
        </div>

        {/* Status Badge */}
        {!balance.isActive && (
          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-sm">
              Inactive
            </span>
          </div>
        )}
      </div>
      
      {/* Decorative shapes */}
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-black/10 rounded-full blur-xl"></div>
    </div>
  );
}
