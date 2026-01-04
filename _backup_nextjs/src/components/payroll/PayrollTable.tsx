import React, { useState, useEffect } from 'react';
import { Payroll, PayrollStatus } from '@/types/payroll';
import { Button } from '@/components/ui/Button';
import PayrollStatusBadge from './PayrollStatusBadge';
import { Eye, CheckCircle, DollarSign, Trash2, Calendar, FileText } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { formatCurrency } from '@/lib/utils';
import { PayslipService } from '@/services/payslip.service'; // Assuming this exists, if not I will check utils.ts

interface PayrollTableProps {
  payrolls: Payroll[];
  isLoading?: boolean;
  onProcess?: (id: string) => void;
  onMarkPaid?: (id: string) => void;
  onDelete?: (id: string) => void;
  onGeneratePayslip?: (id: string) => void;
  isAdmin?: boolean;
}

export default function PayrollTable({ 
  payrolls, 
  isLoading, 
  onProcess, 
  onMarkPaid, 
  onDelete,
  onGeneratePayslip,
  isAdmin = false 
}: PayrollTableProps) {
  const params = useParams();
  const tenantSlug = params?.tenant_slug as string;
  
  // Track which payrolls have payslips
  const [payslipStatus, setPayslipStatus] = useState<Record<string, 'loading' | 'exists' | 'not_exists'>>({});
  
  // Check payslip existence for PAID payrolls
  useEffect(() => {
    const checkPayslips = async () => {
      const paidPayrolls = payrolls.filter(p => {
        const actualStatus = p.status || 
          (p.isPaid ? PayrollStatus.PAID : 
           p.processedAt ? PayrollStatus.PROCESSED : 
           PayrollStatus.PENDING);
        return actualStatus === PayrollStatus.PAID;
      });

      for (const payroll of paidPayrolls) {
        if (payslipStatus[payroll.id]) continue; // Already checked
        
        setPayslipStatus(prev => ({ ...prev, [payroll.id]: 'loading' }));
        
        try {
          await PayslipService.getPayslipByPayrollId(payroll.id);
          setPayslipStatus(prev => ({ ...prev, [payroll.id]: 'exists' }));
        } catch (error: any) {
          if (error?.response?.status === 404) {
            setPayslipStatus(prev => ({ ...prev, [payroll.id]: 'not_exists' }));
          } else {
            setPayslipStatus(prev => ({ ...prev, [payroll.id]: 'not_exists' }));
          }
        }
      }
    };

    if (payrolls.length > 0) {
      checkPayslips();
    }
  }, [payrolls]);
  
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
            
            // Determine actual status based on backend fields
            const actualStatus = payroll.status || 
              (payroll.isPaid ? PayrollStatus.PAID : 
               payroll.processedAt ? PayrollStatus.PROCESSED : 
               PayrollStatus.PENDING);
            
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
                  <PayrollStatusBadge status={actualStatus} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <Link href={`/${tenantSlug}/dashboard/payroll/${payroll.id}`} passHref>
                      <Button variant="secondary" className="p-2" title="View Details">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </Link>
                    
                    {isAdmin && (
                      <>
                        {actualStatus === PayrollStatus.PENDING && onProcess && (
                          <Button 
                            variant="secondary" 
                            className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                            onClick={() => onProcess(payroll.id)}
                            title="Process Payroll"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                        )}
                        
                        {actualStatus === PayrollStatus.PROCESSED && onMarkPaid && (
                          <Button 
                            variant="secondary" 
                            className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50"
                            onClick={() => onMarkPaid(payroll.id)}
                            title="Mark as Paid"
                          >
                            <DollarSign className="w-4 h-4" />
                          </Button>
                        )}

                        {actualStatus !== PayrollStatus.PAID && onDelete && (
                          <Button 
                            variant="danger" 
                            className="p-2"
                            onClick={() => onDelete(payroll.id)}
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                        
                        {/* Generate Payslip button for PAID payrolls */}
                        {actualStatus === PayrollStatus.PAID && onGeneratePayslip && (
                          <>
                            {payslipStatus[payroll.id] === 'not_exists' && (
                              <Button 
                                variant="secondary" 
                                className="p-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                                onClick={() => onGeneratePayslip(payroll.id)}
                                title="Generate Payslip"
                              >
                                <FileText className="w-4 h-4" />
                              </Button>
                            )}
                            
                            {payslipStatus[payroll.id] === 'exists' && (
                              <Link href={`/${tenantSlug}/dashboard/payslips?payrollId=${payroll.id}`} passHref>
                                <Button 
                                  variant="secondary" 
                                  className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50"
                                  title="View Payslip"
                                >
                                  <FileText className="w-4 h-4" />
                                </Button>
                              </Link>
                            )}
                            
                            {payslipStatus[payroll.id] === 'loading' && (
                              <Button 
                                variant="secondary" 
                                className="p-2 opacity-50 cursor-not-allowed"
                                disabled
                                title="Checking payslip..."
                              >
                                <FileText className="w-4 h-4 animate-pulse" />
                              </Button>
                            )}
                          </>
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
