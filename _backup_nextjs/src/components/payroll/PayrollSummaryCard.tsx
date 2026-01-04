import React from 'react';
import { PayrollSummary } from '@/types/payroll';
import { Card } from '@/components/ui/Card';
import { formatCurrency } from '@/lib/utils';
import { Wallet, CheckCircle, Clock, Banknote, TrendingDown } from 'lucide-react';

interface PayrollSummaryCardProps {
  summary: PayrollSummary;
  isLoading?: boolean;
}

export default function PayrollSummaryCard({ summary, isLoading }: PayrollSummaryCardProps) {
  if (isLoading) {
    return <div className="animate-pulse h-32 bg-gray-100 rounded-lg"></div>;
  }

  const items = [
    {
      label: 'Total Payrolls',
      value: summary.totalPayrolls.toString(),
      icon: Wallet,
      color: 'bg-indigo-100 text-indigo-600',
      isCurrency: false
    },
    {
      label: 'Base Salary',
      value: formatCurrency(Number(summary.totalBaseSalary)),
      icon: Banknote,
      color: 'bg-blue-100 text-blue-600',
      isCurrency: true
    },
    {
      label: 'Overtime',
      value: formatCurrency(Number(summary.totalOvertimePay)),
      icon: Clock,
      color: 'bg-yellow-100 text-yellow-600',
      isCurrency: true
    },
    {
      label: 'Deductions',
      value: formatCurrency(Number(summary.totalDeductions)),
      icon: TrendingDown,
      color: 'bg-red-100 text-red-600',
      isCurrency: true
    },
    {
      label: 'Net Salary',
      value: formatCurrency(Number(summary.totalNetSalary)),
      icon: CheckCircle,
      color: 'bg-green-100 text-green-600',
      isCurrency: true
    }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
      {items.map((item, index) => (
        <Card key={index} className="p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <div className={`p-2 rounded-lg ${item.color}`}>
                <item.icon className="h-4 w-4" />
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 mb-1 truncate">{item.label}</p>
              <p className={`font-bold text-gray-900 truncate ${item.isCurrency ? 'text-sm' : 'text-xl'}`}>
                {item.value}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
