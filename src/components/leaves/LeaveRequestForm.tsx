'use client';

import { useActiveLeavePeriod, useLeaveTypes, useCreateLeaveRequest } from '@/hooks/useLeave';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const leaveRequestSchema = z.object({
  leaveTypeConfigId: z.string().min(1, 'Please select a leave type'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  reason: z.string().min(3, 'Reason is required'),
  emergencyContact: z.string().optional(),
  handoverNotes: z.string().optional(),
});

type LeaveRequestFormValues = z.infer<typeof leaveRequestSchema>;

interface Props {
  onSuccess: () => void;
  onCancel: () => void;
}

export function LeaveRequestForm({ onSuccess, onCancel }: Props) {
  const { data: activePeriod } = useActiveLeavePeriod();
  const { data: leaveTypes } = useLeaveTypes(activePeriod?.id);
  const { mutate: createRequest, isPending } = useCreateLeaveRequest();

  const { register, handleSubmit, formState: { errors }, watch } = useForm<LeaveRequestFormValues>({
    resolver: zodResolver(leaveRequestSchema),
  });

  const onSubmit = (data: LeaveRequestFormValues) => {
    // Ensure payload matches interface
    createRequest(data, {
      onSuccess: () => {
        onSuccess();
      }
    });
  };

  const selectedTypeId = watch('leaveTypeConfigId');
  const selectedType = leaveTypes?.find(t => String(t.id) === selectedTypeId);

  // Calculate days estimation (rough)
  const startDate = watch('startDate');
  const endDate = watch('endDate');
  let estDays = 0;
  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (!isNaN(start.getTime()) && !isNaN(end.getTime()) && end >= start) {
      const diffTime = Math.abs(end.getTime() - start.getTime());
      estDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; 
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {!activePeriod ? (
        <div className="p-4 bg-yellow-50 text-yellow-800 rounded-md">
          No active leave period found. Please contact HR.
        </div>
      ) : (
        <>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Leave Type</label>
            <select 
              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-navy focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              {...register('leaveTypeConfigId')}
            >
              <option value="">Select Leave Type</option>
              {leaveTypes?.filter(t => t.isActive).map(type => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
            {errors.leaveTypeConfigId && <p className="text-xs text-red-500">{errors.leaveTypeConfigId.message}</p>}
            
            {selectedType && (
               <div className="text-xs text-gray-500 mt-1">
                 Max {selectedType.maxConsecutiveDays} consecutive days. Notice: {selectedType.advanceNoticeDays} days.
               </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input label="Start Date" type="date" error={errors.startDate?.message} {...register('startDate')} />
            <Input label="End Date" type="date" error={errors.endDate?.message} {...register('endDate')} />
          </div>

          {estDays > 0 && <div className="text-sm text-brand-navy font-medium">Estimated Duration: {estDays} Days</div>}

          <Textarea 
             label="Reason"
             placeholder="Why are you taking leave?"
             error={errors.reason?.message}
             {...register('reason')}
          />

          <Input label="Emergency Contact" placeholder="+62..." error={errors.emergencyContact?.message} {...register('emergencyContact')} />
          
          <Textarea 
             label="Handover Notes (Optional)"
             placeholder="Who will cover your tasks?"
             error={errors.handoverNotes?.message}
             className="min-h-[60px]"
             {...register('handoverNotes')}
          />

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
            <Button type="submit" isLoading={isPending} disabled={!activePeriod}>Submit Request</Button>
          </div>
        </>
      )}
    </form>
  );
}
