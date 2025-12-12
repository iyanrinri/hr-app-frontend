'use client';

import { useState } from 'react';
import { useAllEmployees } from '@/hooks/useEmployees';
import { useEmployeeOvertimeHistory, useEmployeeTotalHours } from '@/hooks/useOvertime';
import { OvertimeStatusBadge } from '@/components/overtime/OvertimeStatusBadge';
import { format, startOfMonth, endOfMonth } from 'date-fns';
import { Search, Clock, DollarSign, BarChart3, History } from 'lucide-react';

export default function OvertimeAdminPage() {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'history' | 'total'>('history');
  
  // Date filters for Total Hours
  const [startDate, setStartDate] = useState(format(startOfMonth(new Date()), 'yyyy-MM-dd'));
  const [endDate, setEndDate] = useState(format(endOfMonth(new Date()), 'yyyy-MM-dd'));
  // const [statusFilter, setStatusFilter] = useState<OvertimeStatus | ''>(''); // Unused for now

  const { data: employees } = useAllEmployees();
  
  // Queries
  const { data: historyData, isLoading: isLoadingHistory } = useEmployeeOvertimeHistory(selectedEmployeeId, {
    // Basic pagination could be added here
    take: 50,
    startDate: activeTab === 'history' ? startDate : undefined,
    endDate: activeTab === 'history' ? endDate : undefined,
  });

  const { data: totalHoursData, isLoading: isLoadingTotal } = useEmployeeTotalHours(selectedEmployeeId, {
    startDate,
    endDate,
    status: undefined // statusFilter || undefined
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Overtime Administration
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Monitor and report on employee overtime
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="space-y-2">
             <label className="text-sm font-medium text-gray-700">Select Employee</label>
             <select 
               className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy focus:ring-offset-2"
               value={selectedEmployeeId}
               onChange={(e) => setSelectedEmployeeId(e.target.value)}
             >
               <option value="">-- Select Employee --</option>
               {employees?.map(emp => (
                 <option key={emp.id} value={emp.id}>
                   {emp.firstName} {emp.lastName} ({emp.position})
                 </option>
               ))}
             </select>
           </div>
           
           <div className="space-y-2">
             <label className="text-sm font-medium text-gray-700">Start Date</label>
             <input 
               type="date" 
               className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy"
               value={startDate}
               onChange={(e) => setStartDate(e.target.value)}
             />
           </div>

           <div className="space-y-2">
             <label className="text-sm font-medium text-gray-700">End Date</label>
             <input 
               type="date" 
               className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy"
               value={endDate}
               onChange={(e) => setEndDate(e.target.value)}
             />
           </div>
        </div>
        
        {/* Tabs */}
        <div className="flex border-b border-gray-200 mt-6">
          <button
            onClick={() => setActiveTab('history')}
            className={`mr-8 pb-3 text-sm font-medium transition-colors relative ${
              activeTab === 'history' 
                ? 'text-brand-navy border-b-2 border-brand-navy' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <span className="flex items-center gap-2">
              <History className="w-4 h-4" /> Request History
            </span>
          </button>
          <button
            onClick={() => setActiveTab('total')}
            className={`pb-3 text-sm font-medium transition-colors relative ${
              activeTab === 'total' 
                ? 'text-brand-navy border-b-2 border-brand-navy' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
           <span className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" /> Total Hours Analysis
            </span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      {!selectedEmployeeId ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-dashed border-gray-300">
           <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
           <p className="text-gray-500 text-lg">Select an employee to view details</p>
        </div>
      ) : activeTab === 'history' ? (
        /* History View */
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reason</th>
                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                 {isLoadingHistory ? (
                   <tr><td colSpan={5} className="px-6 py-4 text-center">Loading history...</td></tr>
                 ) : !historyData?.requests?.length ? (
                   <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-500">No records found for this period.</td></tr>
                 ) : (
                   historyData.requests.map(req => (
                     <tr key={req.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {format(new Date(req.date), 'MMM d, yyyy')}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 truncate max-w-xs">{req.reason}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(req.totalMinutes / 60).toFixed(1)} hrs</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                           {req.calculatedAmount ? 
                             new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(Number(req.calculatedAmount)) 
                             : '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                           <OvertimeStatusBadge status={req.status} />
                        </td>
                     </tr>
                   ))
                 )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Total Hours View */
        <div className="space-y-6">
           {/* Summary Cards */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
                 <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white/80 font-medium">Total Hours</h3>
                    <Clock className="w-8 h-8 text-white/40" />
                 </div>
                 <div className="text-4xl font-bold">
                    {isLoadingTotal ? '...' : totalHoursData?.totalHours.toFixed(1)} hrs
                 </div>
                 <p className="text-white/60 text-sm mt-2">{totalHoursData?.totalMinutes} minutes Total</p>
              </div>

              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-6 text-white shadow-lg">
                 <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white/80 font-medium">Total Compensation</h3>
                    <DollarSign className="w-8 h-8 text-white/40" />
                 </div>
                 <div className="text-4xl font-bold">
                    {isLoadingTotal ? '...' : totalHoursData?.totalAmount ? 
                      new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(Number(totalHoursData.totalAmount))
                      : 'Rp 0'}
                 </div>
                 <p className="text-white/60 text-sm mt-2">Estimated Amount</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                 <h3 className="text-gray-500 font-medium mb-4">Request Status Breakdown</h3>
                 {/* Simple breakdown if available, else just placeholder */}
                 <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                       <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-500"></div> Approved</span>
                       <span className="font-medium text-gray-900">{totalHoursData?.requests?.filter(r => r.status === 'APPROVED').length || 0}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                       <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-yellow-400"></div> Pending</span>
                       <span className="font-medium text-gray-900">{totalHoursData?.requests?.filter(r => r.status === 'PENDING').length || 0}</span>
                    </div>
                 </div>
              </div>
           </div>
           
           {/* Detailed List for Period */}
           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Detailed Breakdown</h3>
              <div className="overflow-x-auto">
                 <table className="min-w-full text-sm">
                    <thead>
                       <tr className="border-b border-gray-100">
                          <th className="text-left py-2 font-medium text-gray-500">Date</th>
                          <th className="text-left py-2 font-medium text-gray-500">Hours</th>
                          <th className="text-right py-2 font-medium text-gray-500">Rate (Multiplier)</th>
                          <th className="text-right py-2 font-medium text-gray-500">Amount</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                       {totalHoursData?.requests?.map(req => (
                          <tr key={req.id}>
                             <td className="py-3">{format(new Date(req.date), 'dd MMM yyyy')}</td>
                             <td className="py-3">{(req.totalMinutes / 60).toFixed(1)}</td>
                             <td className="py-3 text-right">{req.overtimeRate || '1.0'}x</td>
                             <td className="py-3 text-right">
                                {req.calculatedAmount ? Number(req.calculatedAmount).toLocaleString('id-ID') : '-'}
                             </td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
