'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { PayrollService } from '@/services/payroll.service';
import PayrollTable from '@/components/payroll/PayrollTable';
import { Button } from '@/components/ui/Button';

export default function MyPayrollPage() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  // Fetch My Payrolls
  const { data, isLoading } = useQuery({
    queryKey: ['my-payrolls', page, limit],
    queryFn: () => PayrollService.getMyPayrolls({
      page,
      limit
    })
  });

  // Calculate my summary from the list if not provided by a separate endpoint for "my summary"
  // Or reuse getPayrollSummary if backend supports strict filtering by user context automatically.
  // Assuming getPayrollSummary without ID returns my summary for employee or comprehensive for admin?
  // Let's stick to list only for now, or fetch summary if needed.
  // The service defined `getPayrollSummary(employeeId)`. If I pass nothing, API might return all. 
  // Let's assume for now we just show the list. Or maybe a simple summary calculation on the frontend if needed.
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Salary & Payroll</h1>
          <p className="text-gray-500">View your salary history and payslips.</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <PayrollTable 
          payrolls={data?.data || []} 
          isLoading={isLoading}
          isAdmin={false} // Hide admin actions
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
