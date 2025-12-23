'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { PayslipService } from '@/services/payslip.service';
import PayslipHistoryTable from '@/components/payslips/PayslipHistoryTable';

export default function MyPayslipsPage() {
  const { data: payslipsResponse, isLoading } = useQuery({
    queryKey: ['my-payslips'],
    queryFn: () => PayslipService.getMyPayslipHistory()
  });

  // API returns array directly, not wrapped in { data: [] }
  const payslips = payslipsResponse || [];


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Payslips</h1>
          <p className="text-gray-500">View and download your monthly payslips.</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <PayslipHistoryTable payslips={payslips} isLoading={isLoading} />
      </div>
    </div>
  );
}
