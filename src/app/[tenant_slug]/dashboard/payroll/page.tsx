'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { PayrollService } from '@/services/payroll.service';
import { PayrollStatus } from '@/types/payroll';
import PayrollTable from '@/components/payroll/PayrollTable';
import PayrollSummaryCard from '@/components/payroll/PayrollSummaryCard';
import { Button } from '@/components/ui/Button';
import { Plus, Download, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

export default function PayrollAdminPage() {
  const params = useParams();
  const tenantSlug = params?.tenant_slug as string;
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [status, setStatus] = useState<PayrollStatus | ''>('');
  const [department, setDepartment] = useState('');
  
  // Fetch Payrolls
  const { data, isLoading } = useQuery({
    queryKey: ['payrolls', page, limit, status, department],
    queryFn: () => PayrollService.getAllPayrolls({
      page,
      limit,
      status: status as PayrollStatus,
      department
    })
  });

  // Fetch Summary
  const { data: summary, isLoading: isLoadingSummary } = useQuery({
    queryKey: ['payroll-summary'],
    queryFn: () => PayrollService.getPayrollSummary()
  });

  // Process Payroll Mutation
  const processMutation = useMutation({
    mutationFn: PayrollService.processPayrolls,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payrolls'] });
      queryClient.invalidateQueries({ queryKey: ['payroll-summary'] });
      toast.success('Payroll processed successfully');
    },
    onError: () => toast.error('Failed to process payroll')
  });

  // Mark Paid Mutation
  const markPaidMutation = useMutation({
    mutationFn: PayrollService.markPayrollPaid,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payrolls'] });
      queryClient.invalidateQueries({ queryKey: ['payroll-summary'] });
      toast.success('Payroll marked as paid');
    },
    onError: () => toast.error('Failed to mark payroll as paid')
  });

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: PayrollService.deletePayroll,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payrolls'] });
      queryClient.invalidateQueries({ queryKey: ['payroll-summary'] });
      toast.success('Payroll deleted successfully');
    },
    onError: () => toast.error('Failed to delete payroll')
  });

  const handleProcess = (id: string) => {
    processMutation.mutate({ payrollIds: [id] });
  };

  const handleMarkPaid = (id: string) => {
    markPaidMutation.mutate(id);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this payroll record?')) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payroll Management</h1>
          <p className="text-gray-500">Manage employee salaries, overtime, and payments.</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="secondary">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Link href={`/${tenantSlug}/dashboard/payroll/create`}>
            <Button className="bg-brand-cyan hover:bg-brand-cyan/90 text-white">
              <Plus className="mr-2 h-4 w-4" />
              Create Payroll
            </Button>
          </Link>
        </div>
      </div>

      {summary && <PayrollSummaryCard summary={summary} isLoading={isLoadingSummary} />}

      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
             {/* Using standard inputs for now as filters */}
             <div className="flex gap-4">
               <div className="w-1/3 relative">
                 <select 
                  className="w-full appearance-none px-4 py-2.5 pr-10 border-2 border-gray-300 rounded-lg bg-white text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:border-brand-cyan hover:border-gray-400 transition-colors cursor-pointer"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as PayrollStatus)}
                 >
                   <option value="">All Statuses</option>
                   <option value={PayrollStatus.PENDING}>Pending</option>
                   <option value={PayrollStatus.PROCESSED}>Processed</option>
                   <option value={PayrollStatus.PAID}>Paid</option>
                 </select>
                 <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 pointer-events-none" />
               </div>
               <div className="w-1/3 relative">
                 <select 
                  className="w-full appearance-none px-4 py-2.5 pr-10 border-2 border-gray-300 rounded-lg bg-white text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:border-brand-cyan hover:border-gray-400 transition-colors cursor-pointer"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                 >
                   <option value="">All Departments</option>
                   <option value="IT">IT</option>
                   <option value="HR">HR</option>
                   <option value="Finance">Finance</option>
                   {/* Add more departments as needed or fetch dynamically */}
                 </select>
                 <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 pointer-events-none" />
               </div>
             </div>
          </div>
        </div>

        <PayrollTable 
          payrolls={data?.data || []} 
          isLoading={isLoading}
          isAdmin={true}
          onProcess={handleProcess}
          onMarkPaid={handleMarkPaid}
          onDelete={handleDelete}
        />

        {/* Pagination */}
        {data && (
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-500">
              Showing {((page - 1) * limit) + 1} to {Math.min(page * limit, data.total)} of {data.total} results
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="secondary" 
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
              >
                Previous
              </Button>
              <Button 
                variant="secondary" 
                disabled={page === data.totalPages}
                onClick={() => setPage(p => p + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
