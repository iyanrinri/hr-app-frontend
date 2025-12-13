import React from 'react';
import { PayrollSummary } from '@/types/payroll';
import { Card } from '@/components/ui/Card';
import { formatCurrency } from '@/lib/utils';
import { Wallet, CheckCircle, Clock, Banknote, TrendingUp } from 'lucide-react';

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
      value: summary.totalPayrolls,
      icon: Wallet,
      color: 'bg-indigo-100 text-indigo-600',
    },
    {
      label: 'Paid (Month)',
      value: summary.totalPaid,
      icon: CheckCircle,
      color: 'bg-green-100 text-green-600',
    },
    {
      label: 'Pending',
      value: summary.totalUnpaid,
      icon: Clock,
      color: 'bg-yellow-100 text-yellow-600',
    },
    {
      label: 'Total Gross',
      value: formatCurrency(Number(summary.totalGrossSalary)),
      icon: Banknote,
      color: 'bg-blue-100 text-blue-600',
      isCurrency: true
    },
    {
      label: 'Avg Net Salary',
      value: formatCurrency(Number(summary.averageNetSalary)),
      icon: TrendingUp,
      color: 'bg-teal-100 text-teal-600',
      isCurrency: true
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      {items.map((item, index) => (
        <Card key={index} className="p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-lg ${item.color}`}>
              <item.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{item.label}</p>
              <p className={`text-xl font-bold text-gray-900 ${item.isCurrency ? 'text-lg' : ''}`}>
                {item.value}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
