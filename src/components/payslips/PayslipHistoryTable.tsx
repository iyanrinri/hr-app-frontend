'use client';

import React from 'react';
import Link from 'next/link';
import { Payslip } from '@/types/payslip';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Eye } from 'lucide-react';

interface PayslipHistoryTableProps {
  payslips: Payslip[];
  isLoading?: boolean;
}

export default function PayslipHistoryTable({ payslips, isLoading }: PayslipHistoryTableProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-16 bg-gray-100 rounded-md animate-pulse" />
        ))}
      </div>
    );
  }

  if (payslips.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-300">
        No payslip records found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Period / Date
            </th>
            {/* Show employee column only if it's likely a mix (e.g. admin view), 
                or we can check first item but that's flaky. 
                Let's assume this table is generally used. If "My Payslips", employee name is redundant but harmless.
            */}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Employee
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Gross Salary
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Additions
            </th>
             <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Deductions
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Take Home Pay
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {payslips.map((payslip) => (
            <tr key={payslip.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                    {new Date(payslip.payroll.periodStart).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
                </div>
                <div className="text-xs text-gray-500">
                    Gen: {new Date(payslip.generatedAt).toLocaleDateString()}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                 <div className="text-sm font-medium text-gray-900">
                    {payslip.payroll.employee?.firstName} {payslip.payroll.employee?.lastName}
                 </div>
                 <div className="text-xs text-gray-500">
                    {payslip.payroll.employee?.position}
                 </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                {formatCurrency(payslip.payroll.baseSalary)}
              </td>
               <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-green-600">
                +{formatCurrency((parseFloat(payslip.totalGross) - parseFloat(payslip.payroll.baseSalary)).toString())}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-red-600">
                -{formatCurrency(payslip.totalDeductions)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-bold text-brand-navy">
                {formatCurrency(payslip.takeHomePay)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                <Link href={`/dashboard/payslips/${payslip.id}`}>
                    <Button variant="ghost" title="View Detail">
                        <Eye className="w-4 h-4 text-gray-500 hover:text-brand-navy" />
                    </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
