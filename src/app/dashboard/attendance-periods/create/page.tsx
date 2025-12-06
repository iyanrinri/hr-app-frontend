'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCreateAttendancePeriod } from '@/hooks/useAttendancePeriods';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

const periodSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  workingDaysPerWeek: z.coerce.number().min(1).max(7, 'Must be between 1 and 7'),
  workingHoursPerDay: z.coerce.number().min(1).max(24, 'Must be between 1 and 24'),
  workingStartTime: z.string().min(1, 'Start time is required'),
  workingEndTime: z.string().min(1, 'End time is required'),
  allowSaturdayWork: z.boolean().default(false),
  allowSundayWork: z.boolean().default(false),
  lateToleranceMinutes: z.coerce.number().min(0).max(120, 'Must be between 0 and 120'),
  earlyLeaveToleranceMinutes: z.coerce.number().min(0).max(120, 'Must be between 0 and 120'),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
}).refine((data) => new Date(data.endDate) > new Date(data.startDate), {
  message: "End date must be after start date",
  path: ["endDate"],
});

type PeriodFormValues = z.infer<typeof periodSchema>;

export default function CreateAttendancePeriodPage() {
  const router = useRouter();
  const { mutate: createPeriod, isPending } = useCreateAttendancePeriod();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PeriodFormValues>({
    resolver: zodResolver(periodSchema),
    defaultValues: {
      workingDaysPerWeek: 5,
      workingHoursPerDay: 8,
      workingStartTime: '09:00',
      workingEndTime: '17:00',
      allowSaturdayWork: false,
      allowSundayWork: false,
      lateToleranceMinutes: 15,
      earlyLeaveToleranceMinutes: 15,
      isActive: true,
    },
  });

  const onSubmit = (data: PeriodFormValues) => {
    createPeriod(data);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <h2 className="text-2xl font-bold text-gray-900">Create Attendance Period</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Period Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <Input
                  label="Period Name"
                  placeholder="e.g., January 2024"
                  error={errors.name?.message}
                  {...register('name')}
                />
              </div>
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
              <Input
                label="Working Days Per Week"
                type="number"
                min="1"
                max="7"
                error={errors.workingDaysPerWeek?.message}
                {...register('workingDaysPerWeek')}
              />
              <Input
                label="Working Hours Per Day"
                type="number"
                min="1"
                max="24"
                error={errors.workingHoursPerDay?.message}
                {...register('workingHoursPerDay')}
              />
              <Input
                label="Working Start Time"
                type="time"
                error={errors.workingStartTime?.message}
                {...register('workingStartTime')}
              />
              <Input
                label="Working End Time"
                type="time"
                error={errors.workingEndTime?.message}
                {...register('workingEndTime')}
              />
              <Input
                label="Late Tolerance (Minutes)"
                type="number"
                min="0"
                max="120"
                error={errors.lateToleranceMinutes?.message}
                {...register('lateToleranceMinutes')}
              />
              <Input
                label="Early Leave Tolerance (Minutes)"
                type="number"
                min="0"
                max="120"
                error={errors.earlyLeaveToleranceMinutes?.message}
                {...register('earlyLeaveToleranceMinutes')}
              />
              <div className="md:col-span-2 space-y-3">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-brand-navy border-gray-600 rounded focus:ring-brand-cyan"
                    {...register('allowSaturdayWork')}
                  />
                  <span className="text-sm font-medium text-gray-900">Allow Saturday Work</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-brand-navy border-gray-600 rounded focus:ring-brand-cyan"
                    {...register('allowSundayWork')}
                  />
                  <span className="text-sm font-medium text-gray-900">Allow Sunday Work</span>
                </label>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-900 mb-1">
                  Description
                </label>
                <textarea
                  className="block w-full px-3 py-2 bg-white text-black border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-brand-cyan focus:border-brand-cyan"
                  rows={3}
                  placeholder="Optional description for this period"
                  {...register('description')}
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                )}
              </div>
              <div className="md:col-span-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-brand-navy border-gray-600 rounded focus:ring-brand-cyan"
                    {...register('isActive')}
                  />
                  <span className="text-sm font-medium text-gray-900">Set as Active Period</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="secondary" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit" isLoading={isPending}>
                Create Period
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
