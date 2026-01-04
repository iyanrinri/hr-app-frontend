'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { PayrollService } from '@/services/payroll.service';
import { PayrollStatus } from '@/types/payroll';
import PayrollStatusBadge from '@/components/payroll/PayrollStatusBadge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/lib/utils';
import { ChevronLeft, Printer, Trash2, CheckCircle, DollarSign, Calendar, User, Clock, CreditCard } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function PayrollDetailPage() {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const id = params.id as string;
  const tenantSlug = params?.tenant_slug as string;

  const { data: payroll, isLoading } = useQuery({
    queryKey: ['payroll', id],
    queryFn: () => PayrollService.getPayrollById(id),
    enabled: !!id
  });

  // Action mutations similar to list page
  const processMutation = useMutation({
    mutationFn: PayrollService.processPayrolls,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payroll', id] });
      toast.success('Payroll processed successfully');
    },
    onError: () => toast.error('Failed to process payroll')
  });

  const markPaidMutation = useMutation({
    mutationFn: PayrollService.markPayrollPaid,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payroll', id] });
      toast.success('Payroll marked as paid');
    },
    onError: () => toast.error('Failed to mark payroll as paid')
  });

  const deleteMutation = useMutation({
    mutationFn: PayrollService.deletePayroll,
    onSuccess: () => {
      toast.success('Payroll deleted successfully');
      router.push(`/${tenantSlug}/dashboard/payroll`);
    },
    onError: () => toast.error('Failed to delete payroll')
  });

  if (isLoading) return <div className="p-8 text-center">Loading details...</div>;
  if (!payroll) return <div className="p-8 text-center">Payroll record not found</div>;

  const startDate = new Date(payroll.periodStart).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const endDate = new Date(payroll.periodEnd).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => router.back()} className="p-2">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Payroll Details</h1>
            <p className="text-gray-500">ID: #{payroll.id}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
           <Button variant="secondary" onClick={() => window.print()}>
            <Printer className="mr-2 h-4 w-4" />
            Print Slip
          </Button>
          
          {/* Admin Actions */}
          {/* Assuming we check role here or just show buttons based on status for now */}
          {payroll.status === PayrollStatus.PENDING && (
            <>
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => processMutation.mutate({ payrollIds: [id] })}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Process
              </Button>
              <Button 
                variant="danger"
                onClick={() => {
                  if (confirm('Are you sure you want to delete this payroll?')) {
                    deleteMutation.mutate(id);
                  }
                }}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </>
          )}

          {payroll.status === PayrollStatus.PROCESSED && (
            <Button 
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={() => markPaidMutation.mutate(id)}
            >
              <DollarSign className="mr-2 h-4 w-4" />
              Mark as Paid
            </Button>
          )}
        </div>
      </div>

      {/* Main Content Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Summary */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <User className="mr-2 h-5 w-5 text-gray-500" />
                Employee Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-500">Name</label>
                  <p className="font-medium text-lg">{payroll.employee?.firstName} {payroll.employee?.lastName}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Position</label>
                  <p className="font-medium">{payroll.employee?.position}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Department</label>
                  <p className="font-medium">{payroll.employee?.department}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Status</label>
                  <div className="mt-1">
                    <PayrollStatusBadge status={payroll.status || (payroll.isPaid ? 'PAID' : 'PENDING')} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
             <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <CreditCard className="mr-2 h-5 w-5 text-gray-500" />
                Salary Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Base Salary</span>
                <span className="font-medium">{formatCurrency(Number(payroll.baseSalary))}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Overtime Pay ({payroll.overtimeHours} hours)</span>
                <span className="font-medium">{formatCurrency(Number(payroll.overtimePay))}</span>
              </div>
               <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Bonuses</span>
                <span className="text-green-600 font-medium">+ {formatCurrency(Number(payroll.bonuses))}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="font-bold text-gray-800">Gross Salary</span>
                <span className="font-bold text-gray-800">{formatCurrency(Number(payroll.grossSalary))}</span>
              </div>
               <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Deductions</span>
                <span className="text-red-600 font-medium">- {formatCurrency(Number(payroll.deductions))}</span>
              </div>
              <div className="flex justify-between items-center py-3 bg-gray-50 px-4 rounded-lg mt-2">
                <span className="font-bold text-lg text-gray-900">Net Salary</span>
                <span className="font-bold text-xl text-brand-cyan">{formatCurrency(Number(payroll.netSalary))}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Meta Info */}
        <div className="space-y-6">
           <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Calendar className="mr-2 h-5 w-5 text-gray-500" />
                Period Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Start Date</label>
                <p className="font-medium">{startDate}</p>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">End Date</label>
                <p className="font-medium">{endDate}</p>
              </div>
              <div className="pt-4 border-t border-gray-100">
                 <label className="text-xs font-bold text-gray-500 uppercase">Processed On</label>
                 <p className="text-sm text-gray-600">
                   {payroll.processedAt 
                     ? new Date(payroll.processedAt).toLocaleString()
                     : 'Not processed yet'}
                 </p>
              </div>
            </CardContent>
          </Card>

           <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Clock className="mr-2 h-5 w-5 text-gray-500" />
                Hours Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Regular Hours</span>
                <span className="font-medium">{payroll.regularHours} hrs</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Overtime Hours</span>
                <span className="font-medium">{payroll.overtimeHours} hrs</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
