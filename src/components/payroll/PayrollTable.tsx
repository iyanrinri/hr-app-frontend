import React from 'react';
import { Payroll, PayrollStatus } from '@/types/payroll';
import { Button } from '@/components/ui/Button';
import PayrollStatusBadge from './PayrollStatusBadge';
import { Eye, CheckCircle, DollarSign, Trash2, Calendar } from 'lucide-react';
import Link from 'next/link';
import { formatCurrency } from '@/lib/utils'; // Assuming this exists, if not I will check utils.ts

interface PayrollTableProps {
  payrolls: Payroll[];
  isLoading?: boolean;
  onProcess?: (id: string) => void;
  onMarkPaid?: (id: string) => void;
  onDelete?: (id: string) => void;
  isAdmin?: boolean;
}

export default function PayrollTable({ 
  payrolls, 
  isLoading, 
  onProcess, 
  onMarkPaid, 
  onDelete,
  isAdmin = false 
}: PayrollTableProps) {
  
  if (isLoading) {
    return (
      <div className="w-full bg-white rounded-lg shadow p-6">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-12 bg-gray-100 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (payrolls.length === 0) {
    return (
      <div className="w-full bg-white rounded-lg shadow p-12 text-center text-gray-500">
        No payroll records found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Employee
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Period
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Base Salary
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Gross Salary
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Net Salary
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {payrolls.map((payroll) => {
            const startDate = new Date(payroll.periodStart).toLocaleDateString();
            const endDate = new Date(payroll.periodEnd).toLocaleDateString();
            
            return (
              <tr key={payroll.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-sm font-medium text-gray-900">
                      {payroll.employee?.firstName} {payroll.employee?.lastName}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">{payroll.employee?.position}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="mr-1.5 h-4 w-4" />
                    {startDate} - {endDate}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatCurrency(Number(payroll.baseSalary))}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatCurrency(Number(payroll.grossSalary))}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {formatCurrency(Number(payroll.netSalary))}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <PayrollStatusBadge status={payroll.status || (payroll.isPaid ? 'PAID' : 'PENDING')} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <Link href={`/dashboard/payroll/${payroll.id}`} passHref>
                      <Button variant="secondary" className="p-2" title="View Details">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </Link>
                    
                    {isAdmin && (
                      <>
                        {payroll.status === PayrollStatus.PENDING && onProcess && (
                          <Button 
                            variant="secondary" 
                            className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                            onClick={() => onProcess(payroll.id)}
                            title="Process Payroll"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                        )}
                        
                        {payroll.status === PayrollStatus.PROCESSED && onMarkPaid && (
                          <Button 
                            variant="secondary" 
                            className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50"
                            onClick={() => onMarkPaid(payroll.id)}
                            title="Mark as Paid"
                          >
                            <DollarSign className="w-4 h-4" />
                          </Button>
                        )}

                        {payroll.status !== PayrollStatus.PAID && onDelete && (
                          <Button 
                            variant="danger" 
                            className="p-2"
                            onClick={() => onDelete(payroll.id)}
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
