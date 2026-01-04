'use client';

import React from 'react';
import CreatePayrollForm from '@/components/payroll/CreatePayrollForm';
import { PayrollService } from '@/services/payroll.service';
import { CreatePayrollRequest } from '@/types/payroll';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function CreatePayrollPage() {
  const router = useRouter();
  const params = useParams();
  const tenantSlug = params?.tenant_slug as string;
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (data: CreatePayrollRequest) => PayrollService.createPayroll(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payrolls'] });
      queryClient.invalidateQueries({ queryKey: ['payroll-summary'] });
      toast.success('Payroll created successfully');
      router.push(`/${tenantSlug}/dashboard/payroll`);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to create payroll');
    }
  });

  const handleSubmit = async (data: CreatePayrollRequest) => {
    await createMutation.mutateAsync(data);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" onClick={() => router.back()} className="p-2">
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Create New Payroll</h1>
          <p className="text-gray-500">Calculate and generate payroll for an employee.</p>
        </div>
      </div>

      <CreatePayrollForm 
        onSubmit={handleSubmit}
        isSubmitting={createMutation.isPending}
      />
    </div>
  );
}
