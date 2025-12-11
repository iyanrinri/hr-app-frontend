'use client';

import { usePendingApprovals, useApproveLeaveRequest, useRejectLeaveRequest } from '@/hooks/useLeave';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Check, X } from 'lucide-react';
import { LeaveRequest } from '@/types/leave';
import { format } from 'date-fns';

export default function LeaveApprovalsPage() {
  const { data: approvals, isLoading } = usePendingApprovals();
  const { mutate: approve } = useApproveLeaveRequest();
  const { mutate: reject } = useRejectLeaveRequest();

  const handleApprove = (id: string) => {
    approve({ id });
  };

  const handleReject = (id: string) => {
    const reason = prompt('Please enter a rejection reason:');
    if (reason !== null) {
      reject({ id, comments: reason });
    }
  };

  if (isLoading) return <div className="p-8 text-center">Loading approvals...</div>;

  const requests: LeaveRequest[] = approvals || [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
           <h2 className="text-2xl font-bold text-gray-900">Leave Approvals</h2>
           <p className="text-sm text-gray-500">Review and action pending leave requests.</p>
        </div>
      </div>

      <Card>
        <CardHeader><CardTitle>Pending Requests</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
             <table className="w-full text-sm text-left">
               <thead className="bg-gray-50 border-b">
                 <tr>
                   <th className="px-4 py-3 font-medium text-gray-500">Employee</th>
                   <th className="px-4 py-3 font-medium text-gray-500">Type</th>
                   <th className="px-4 py-3 font-medium text-gray-500">Dates</th>
                   <th className="px-4 py-3 font-medium text-gray-500">Days</th>
                   <th className="px-4 py-3 font-medium text-gray-500">Reason</th>
                   <th className="px-4 py-3 font-medium text-right text-gray-500">Actions</th>
                 </tr>
               </thead>
               <tbody className="divide-y">
                 {requests.length === 0 ? (
                   <tr><td colSpan={6} className="p-4 text-center text-gray-500 italic">No pending approvals.</td></tr>
                 ) : (
                   requests.map((req) => (
                     <tr key={req.id} className="hover:bg-gray-50">
                       <td className="px-4 py-3 font-medium text-gray-900">{req.employeeName || 'Unknown'}</td>
                       <td className="px-4 py-3 text-gray-600">{req.leaveTypeName}</td>
                       <td className="px-4 py-3 text-gray-600">
                         {format(new Date(req.startDate), 'MMM dd')} - {format(new Date(req.endDate), 'MMM dd, yyyy')}
                       </td>
                       <td className="px-4 py-3">{req.totalDays}</td>
                       <td className="px-4 py-3 truncate max-w-[200px]">{req.reason}</td>
                       <td className="px-4 py-3 text-right space-x-2">
                         <div className="flex justify-end gap-2">
                           <Button 
                             className="bg-green-600 hover:bg-green-700 text-white py-1 px-3 text-xs"
                             onClick={() => handleApprove(req.id)}
                           >
                             <Check className="w-4 h-4 mr-1" /> Approve
                           </Button>
                           <Button 
                             variant="danger"
                             className="py-1 px-3 text-xs"
                             onClick={() => handleReject(req.id)}
                           >
                             <X className="w-4 h-4 mr-1" /> Reject
                           </Button>
                         </div>
                       </td>
                     </tr>
                   ))
                 )}
               </tbody>
             </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
