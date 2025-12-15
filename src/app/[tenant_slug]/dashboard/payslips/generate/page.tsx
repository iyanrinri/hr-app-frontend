'use client';

import React from 'react';
import GeneratePayslipForm from '@/components/payslips/GeneratePayslipForm';
import { Button } from '@/components/ui/Button';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function GeneratePayslipPage() {
  const router = useRouter();

  return (
    <div className="space-y-6">
       <div className="flex items-center">
        <Button variant="ghost" onClick={() => router.back()} className="mr-2">
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <div>
           <h1 className="text-2xl font-bold text-gray-900">Generate New Payslip</h1>
           <p className="text-gray-500">Calculate tax and BPJS automatically.</p>
        </div>
      </div>

      <GeneratePayslipForm />
    </div>
  );
}
