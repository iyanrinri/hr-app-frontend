'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery, useMutation } from '@tanstack/react-query';
import { PayslipService } from '@/services/payslip.service';
import PayslipDetail from '@/components/payslips/PayslipDetail';
import { Button } from '@/components/ui/Button';
import { ChevronLeft, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function PayslipDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { data: payslip, isLoading, isError } = useQuery({
    queryKey: ['payslip', id],
    queryFn: () => PayslipService.getPayslipById(id),
    enabled: !!id
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => PayslipService.deletePayslip(id),
    onSuccess: () => {
        toast.success('Payslip deleted');
        router.push('/dashboard/payslips');
    },
    onError: () => toast.error('Failed to delete')
  });

  if (isLoading) {
    return (
        <div className="flex justify-center items-center h-96">
            <Loader2 className="w-8 h-8 animate-spin text-brand-navy" />
        </div>
    );
  }

  if (isError || !payslip) {
    return (
        <div className="text-center py-12">
            <h2 className="text-xl font-bold text-gray-800">Payslip Not Found</h2>
            <Button variant="ghost" onClick={() => router.back()}>Go Back</Button>
        </div>
    );
  }

  return (
    <div className="space-y-6">
       <div className="flex items-center print:hidden">
        <Button variant="ghost" onClick={() => router.back()} className="mr-2">
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <div>
           <h1 className="text-2xl font-bold text-gray-900">Payslip Detail</h1>
        </div>
      </div>

      <PayslipDetail 
        payslip={payslip} 
        isAdmin={true} // In real app, check user role from auth store
        onDelete={() => {
            if(confirm('Are you sure? This cannot be undone.')) {
                deleteMutation.mutate(id);
            }
        }}
      />
    </div>
  );
}
