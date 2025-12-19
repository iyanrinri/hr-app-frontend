'use client';

import { useCreateLeavePeriod } from '@/hooks/useLeave';
import { CreateLeavePeriodPayload } from '@/types/leave';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { ArrowLeft } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  name: z.string().min(3, 'Name is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  description: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function CreateLeavePeriodPage() {
  const router = useRouter();
  const params = useParams();
  const tenantSlug = params?.tenant_slug as string;
  const { mutate: createPeriod, isPending } = useCreateLeavePeriod();
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema)
  });

  const onSubmit = (data: FormValues) => {
    createPeriod(data as CreateLeavePeriodPayload, {
      onSuccess: () => router.push(`/${tenantSlug}/dashboard/leaves/periods`)
    });
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <h2 className="text-2xl font-bold text-gray-900">Create Leave Period</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Period Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input 
              label="Period Name (e.g. Annual Leave 2025)"
              error={errors.name?.message}
              {...register('name')}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <Input 
                label="Start Date"
                type="date"
                error={errors.startDate?.message}
                {...register('startDate')}
              />
              <Input 
                label="End Date"
                type="date"
                error={errors.endDate?.message}
                {...register('endDate')}
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Description</label>
              <textarea 
                className="w-full min-h-[100px] border border-gray-300 rounded-md p-2 focus:ring-brand-navy focus:border-brand-navy"
                placeholder="Optional description..."
                {...register('description')}
              />
              {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
            </div>

            <div className="flex justify-end gap-3">
              <Button type="button" variant="secondary" onClick={() => router.back()}>Cancel</Button>
              <Button type="submit" isLoading={isPending}>Create Period</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
