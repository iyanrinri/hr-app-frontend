'use client';

import { useCreateOvertimeRequest, useUpdateOvertimeRequest } from '@/hooks/useOvertime';
import { useAllEmployees } from '@/hooks/useEmployees';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { differenceInMinutes, format, parse } from 'date-fns';
import { useEffect, useState } from 'react';
import { OvertimeRequest } from '@/types/overtime';

const overtimeRequestSchema = z.object({
  employeeId: z.string().optional(),
  date: z.string().min(1, 'Date is required'),
  startTime: z.string().min(1, 'Start time is required'),
  endTime: z.string().min(1, 'End time is required'),
  reason: z.string().min(3, 'Reason is required'),
});

type OvertimeRequestFormValues = z.infer<typeof overtimeRequestSchema>;

interface Props {
  initialData?: OvertimeRequest;
  onSuccess: () => void;
  onCancel: () => void;
}

export function OvertimeRequestForm({ initialData, onSuccess, onCancel }: Props) {
  const { mutate: createRequest, isPending: isCreating } = useCreateOvertimeRequest();
  const { mutate: updateRequest, isPending: isUpdating } = useUpdateOvertimeRequest(initialData?.id || '');
  const { data: employees } = useAllEmployees();
  const user = useAuthStore((state) => state.user);
  
  const isAdminOrHr = user?.role === 'ADMIN' || user?.role === 'HR';
  const isEditing = !!initialData;
  const isPending = isCreating || isUpdating;

  // Format initial data times for input[type="time"]
  const getInitialTime = (isoString?: string) => {
    if (!isoString) return '';
    try {
      return format(new Date(isoString), 'HH:mm');
    } catch {
      return '';
    }
  };

  const getInitialDate = (dateStr?: string | Date) => {
    if (!dateStr) return format(new Date(), 'yyyy-MM-dd');
    try {
      return format(new Date(dateStr), 'yyyy-MM-dd');
    } catch {
      return format(new Date(), 'yyyy-MM-dd');
    }
  };

  const { register, handleSubmit, formState: { errors }, watch } = useForm<OvertimeRequestFormValues>({
    resolver: zodResolver(overtimeRequestSchema),
    defaultValues: {
      date: getInitialDate(initialData?.date),
      startTime: getInitialTime(initialData?.startTime),
      endTime: getInitialTime(initialData?.endTime),
      reason: initialData?.reason || '',
      employeeId: initialData?.employeeId ? String(initialData.employeeId) : '',
    }
  });

  // Duration calculation
  const date = watch('date');
  const startTime = watch('startTime');
  const endTime = watch('endTime');
  const [durationStr, setDurationStr] = useState('');

  useEffect(() => {
    if (date && startTime && endTime) {
      const start = parse(`${date} ${startTime}`, 'yyyy-MM-dd HH:mm', new Date());
      const end = parse(`${date} ${endTime}`, 'yyyy-MM-dd HH:mm', new Date());
      
      let endDate = end;
      if (end < start) {
        endDate = new Date(end.getTime() + 24 * 60 * 60 * 1000);
      }

      const diff = differenceInMinutes(endDate, start);
      
      const hours = Math.floor(diff / 60);
      const minutes = diff % 60;
      setDurationStr(`${hours}h ${minutes}m`);
    } else {
      setDurationStr('');
    }
  }, [date, startTime, endTime]);

  const handleFormSubmit = (data: OvertimeRequestFormValues) => {
    const startDateTime = parse(`${data.date} ${data.startTime}`, 'yyyy-MM-dd HH:mm', new Date());
    let endDateTime = parse(`${data.date} ${data.endTime}`, 'yyyy-MM-dd HH:mm', new Date());
    
    if (endDateTime < startDateTime) {
      endDateTime = new Date(endDateTime.getTime() + 24 * 60 * 60 * 1000);
    }

    // Default to current user ID if not provided (e.g. employee role)
    // IMPORTANT: Ensure user.id is numeric or convertable if backend expects number
    const finalEmployeeId = data.employeeId ? Number(data.employeeId) : (user?.id ? Number(user.id) : 0);

    const payload = {
      employeeId: finalEmployeeId,
      date: data.date,
      startTime: startDateTime.toISOString(),
      endTime: endDateTime.toISOString(),
      reason: data.reason
    };

    const options = {
      onSuccess: () => {
        onSuccess();
      }
    };

    if (isEditing && initialData) {
      updateRequest(payload, options);
    } else {
      createRequest(payload, options);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      {isAdminOrHr && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Employee</label>
          <select 
            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-navy focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            {...register('employeeId')}
            disabled={isEditing} // Usually don't change employee on edit
          >
            <option value="">Select Employee (Yourself)</option>
            {employees?.map(emp => (
              <option key={emp.id} value={emp.id}>
                {emp.firstName} {emp.lastName} ({emp.position})
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500">Leave empty to request for yourself.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input 
          label="Date" 
          type="date" 
          error={errors.date?.message} 
          {...register('date')} 
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input 
          label="Start Time" 
          type="time" 
          error={errors.startTime?.message} 
          {...register('startTime')} 
        />
        <Input 
          label="End Time" 
          type="time" 
          error={errors.endTime?.message} 
          {...register('endTime')} 
        />
      </div>

      {durationStr && (
        <div className="bg-blue-50 text-brand-navy px-4 py-2 rounded-md text-sm font-medium flex items-center">
          <span className="mr-2">⏱</span> Duration: {durationStr}
        </div>
      )}

      <div className="space-y-1">
         <label className="text-sm font-medium text-gray-700">Reason</label>
         <textarea 
           className="w-full min-h-[80px] border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy focus:border-transparent transition-all"
           placeholder="Justification for overtime..."
           {...register('reason')}
         />
         {errors.reason && <p className="text-xs text-red-500">{errors.reason.message}</p>}
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
        <Button type="submit" isLoading={isPending}>
          {isEditing ? 'Update Request' : 'Submit Request'}
        </Button>
      </div>
    </form>
  );
}
