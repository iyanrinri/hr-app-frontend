'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAttendancePeriod, useUpdateAttendancePeriod } from '@/hooks/useAttendancePeriods';
import { useHolidays, useCreateHoliday, useDeleteHoliday } from '@/hooks/useHolidays';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Plus, Trash2, Calendar as CalendarIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

const periodSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  workingDaysPerWeek: z.coerce.number().min(1).max(7, 'Must be between 1 and 7'),
  workingHoursPerDay: z.coerce.number().min(1).max(24, 'Must be between 1 and 24'),
  workingStartTime: z.string().min(1, 'Start time is required'),
  workingEndTime: z.string().min(1, 'End time is required'),
  allowSaturdayWork: z.boolean(),
  allowSundayWork: z.boolean(),
  lateToleranceMinutes: z.coerce.number().min(0).max(120, 'Must be between 0 and 120'),
  earlyLeaveToleranceMinutes: z.coerce.number().min(0).max(120, 'Must be between 0 and 120'),
  description: z.string().optional(),
  isActive: z.boolean(),
}).refine((data) => new Date(data.endDate) > new Date(data.startDate), {
  message: "End date must be after start date",
  path: ["endDate"],
});

type PeriodFormValues = z.infer<typeof periodSchema>;

interface HolidayFormData {
  name: string;
  date: string;
  isNational: boolean;
  isRecurring: boolean;
  description: string;
}

export default function EditAttendancePeriodPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const { data: period, isLoading, error } = useAttendancePeriod(id);
  const { mutate: updatePeriod, isPending } = useUpdateAttendancePeriod(id);
  const { data: holidays } = useHolidays(id);
  const { mutate: createHoliday } = useCreateHoliday();
  const { mutate: deleteHoliday } = useDeleteHoliday();

  const [showHolidayForm, setShowHolidayForm] = useState(false);
  const [holidayForm, setHolidayForm] = useState<HolidayFormData>({
    name: '',
    date: '',
    isNational: false,
    isRecurring: false,
    description: '',
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PeriodFormValues>({
    resolver: zodResolver(periodSchema) as any,
  });

  useEffect(() => {
    if (period) {
      reset({
        name: period.name,
        startDate: period.startDate.split('T')[0],
        endDate: period.endDate.split('T')[0],
        workingDaysPerWeek: period.workingDaysPerWeek,
        workingHoursPerDay: period.workingHoursPerDay,
        workingStartTime: period.workingStartTime,
        workingEndTime: period.workingEndTime,
        allowSaturdayWork: period.allowSaturdayWork,
        allowSundayWork: period.allowSundayWork,
        lateToleranceMinutes: period.lateToleranceMinutes,
        earlyLeaveToleranceMinutes: period.earlyLeaveToleranceMinutes,
        description: period.description || '',
        isActive: period.isActive,
      });
    }
  }, [period, reset]);

  const onSubmit = (data: PeriodFormValues) => {
    updatePeriod({
      ...data,
      description: data.description ?? null,
    });
  };

  const handleAddHoliday = () => {
    if (holidayForm.name && holidayForm.date) {
      createHoliday({
        ...holidayForm,
        attendancePeriodId: id,
      });
      setHolidayForm({
        name: '',
        date: '',
        isNational: false,
        isRecurring: false,
        description: '',
      });
      setShowHolidayForm(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-navy mb-4"></div>
        <p className="text-gray-600">Loading period details...</p>
      </div>
    );
  }

  if (error || !period) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-600 mb-4">Error loading period details</p>
        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <h2 className="text-2xl font-bold text-gray-900">Edit Attendance Period</h2>
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
                <Textarea
                  label="Description"
                  placeholder="Optional description for this period"
                  rows={3}
                  error={errors.description?.message}
                  {...register('description')}
                />
              </div>
              <div className="md:col-span-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-brand-navy border-gray-600 rounded focus:ring-brand-cyan"
                    {...register('isActive')}
                  />
                  <span className="text-sm font-medium text-gray-900">Active Period</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="secondary" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit" isLoading={isPending}>
                Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Holidays Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Holidays</CardTitle>
          <Button onClick={() => setShowHolidayForm(!showHolidayForm)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Holiday
          </Button>
        </CardHeader>
        <CardContent>
          {showHolidayForm && (
            <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
              <h4 className="font-bold text-gray-900 mb-4">New Holiday</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Holiday Name"
                  value={holidayForm.name}
                  onChange={(e) => setHolidayForm({ ...holidayForm, name: e.target.value })}
                />
                <Input
                  label="Date"
                  type="date"
                  value={holidayForm.date}
                  onChange={(e) => setHolidayForm({ ...holidayForm, date: e.target.value })}
                />
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-900 mb-1">Description</label>
                  <input
                    type="text"
                    className="block w-full px-3 py-2 bg-white text-black border border-gray-600 rounded-md focus:outline-none focus:ring-brand-cyan focus:border-brand-cyan"
                    value={holidayForm.description}
                    onChange={(e) => setHolidayForm({ ...holidayForm, description: e.target.value })}
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-brand-navy border-gray-600 rounded focus:ring-brand-cyan"
                      checked={holidayForm.isNational}
                      onChange={(e) => setHolidayForm({ ...holidayForm, isNational: e.target.checked })}
                    />
                    <span className="text-sm font-medium text-gray-900">National Holiday</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-brand-navy border-gray-600 rounded focus:ring-brand-cyan"
                      checked={holidayForm.isRecurring}
                      onChange={(e) => setHolidayForm({ ...holidayForm, isRecurring: e.target.checked })}
                    />
                    <span className="text-sm font-medium text-gray-900">Recurring</span>
                  </label>
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <Button variant="secondary" onClick={() => setShowHolidayForm(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddHoliday}>
                  Add Holiday
                </Button>
              </div>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {holidays && holidays.length > 0 ? (
                  holidays.map((holiday) => (
                    <tr key={holiday.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <div className="flex items-center">
                          <CalendarIcon className="w-4 h-4 mr-2 text-gray-400" />
                          {holiday.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(holiday.date).toLocaleDateString('en-US', { 
                          year: 'numeric', month: 'long', day: 'numeric' 
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex gap-2">
                          {holiday.isNational && (
                            <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                              National
                            </span>
                          )}
                          {holiday.isRecurring && (
                            <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded">
                              Recurring
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button
                          variant="danger"
                          className="p-2"
                          onClick={() => deleteHoliday(holiday.id)}
                          title="Delete Holiday"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                      No holidays configured for this period
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
