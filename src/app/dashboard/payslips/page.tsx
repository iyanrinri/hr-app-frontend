'use client';

import React from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { PayslipService } from '@/services/payslip.service';
import PayslipHistoryTable from '@/components/payslips/PayslipHistoryTable';
import { Button } from '@/components/ui/Button';
import { Plus, Download } from 'lucide-react';

export default function PayslipListPage() {
  const { data: payslipsResponse, isLoading } = useQuery({
    queryKey: ['payslips'],
    queryFn: () => PayslipService.getAllPayslips()
  });

  const payslips = payslipsResponse?.data || [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payslip Management</h1>
          <p className="text-gray-500">View and manage employee payslips.</p>
        </div>
        <div className="flex space-x-2">
            <Button variant="secondary">
                <Download className="w-4 h-4 mr-2" />
                Export Report
            </Button>
            <Link href="/dashboard/payslips/generate">
                <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Generate Payslip
                </Button>
            </Link>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <PayslipHistoryTable payslips={payslips} isLoading={isLoading} />
      </div>
    </div>
  );
}
