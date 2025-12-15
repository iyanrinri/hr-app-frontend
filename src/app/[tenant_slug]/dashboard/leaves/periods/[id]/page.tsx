'use client';

import { useLeavePeriod, useUpdateLeavePeriod, useLeaveTypes, useCreateLeaveType, useDeleteLeaveType } from '@/hooks/useLeave';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { ArrowLeft, Check, Plus, Trash, Settings } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';

// --- Validation Schemas ---

const periodSchema = z.object({
  name: z.string().min(3, 'Name is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  description: z.string().optional(),
  isActive: z.boolean(),
});

type PeriodFormValues = z.infer<typeof periodSchema>;

// --- Components ---

export default function LeavePeriodDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const periodId = Number(id);

  const { data: period, isLoading: isLoadingPeriod, error } = useLeavePeriod(periodId);
  const { mutate: updatePeriod, isPending: isUpdating } = useUpdateLeavePeriod(periodId);

  // Leave Types Hooks
  const { data: leaveTypes, isLoading: isLoadingTypes } = useLeaveTypes(periodId);
  const { mutate: deleteType } = useDeleteLeaveType();

  // Form for Period
  const { register, handleSubmit, reset, formState: { errors } } = useForm<PeriodFormValues>({
    resolver: zodResolver(periodSchema) as any
  });

  // Modal State
  const [isTypeModalOpen, setIsTypeModalOpen] = useState(false);

  useEffect(() => {
    if (period) {
      reset({
        name: period.name,
        startDate: period.startDate.split('T')[0], // ensure yyyy-mm-dd
        endDate: period.endDate.split('T')[0],
        description: period.description,
        isActive: period.isActive
      });
    }
  }, [period, reset]);

  const onPeriodSubmit = (data: PeriodFormValues) => {
    updatePeriod(data);
  };

  const handleDeleteType = (typeId: number) => {
    if (confirm('Delete this leave type?')) {
      deleteType(typeId);
    }
  };

  if (isLoadingPeriod) return <div className="p-8 text-center">Loading...</div>;
  if (error || !period) return <div className="p-8 text-center text-red-500">Period not found</div>;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <h2 className="text-2xl font-bold text-gray-900">Edit Leave Period</h2>
      </div>

      {/* Period Details Form */}
      <Card>
        <CardHeader><CardTitle>Configuration</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onPeriodSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <Input 
                 label="Period Name"
                 error={errors.name?.message}
                 {...register('name')}
               />
               <div className="flex items-end pb-2">
                 <label className="flex items-center gap-2 cursor-pointer">
                   <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-brand-navy focus:ring-brand-navy" {...register('isActive')} />
                   <span className="text-sm font-medium text-gray-700">Set as Active Period</span>
                 </label>
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
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Description</label>
              <textarea 
                className="w-full min-h-[80px] border border-gray-300 rounded-md p-2"
                {...register('description')}
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit" isLoading={isUpdating}>Save Changes</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Leave Types Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
           <h3 className="text-xl font-bold text-gray-800">Leave Types & Quotas</h3>
           <Button onClick={() => setIsTypeModalOpen(true)}>
             <Plus className="w-4 h-4 mr-2" /> Add Leave Type
           </Button>
        </div>

        <Card>
          <CardContent className="p-0 overflow-hidden">
             <table className="w-full text-sm text-left">
               <thead className="bg-gray-50 border-b">
                 <tr>
                   <th className="px-4 py-3 font-medium text-gray-500">Code</th>
                   <th className="px-4 py-3 font-medium text-gray-500">Name</th>
                   <th className="px-4 py-3 font-medium text-gray-500">Quota</th>
                   <th className="px-4 py-3 font-medium text-gray-500">Settings</th>
                   <th className="px-4 py-3 font-medium text-right text-gray-500">Action</th>
                 </tr>
               </thead>
               <tbody className="divide-y">
                 {isLoadingTypes ? (
                   <tr><td colSpan={5} className="p-4 text-center">Loading types...</td></tr>
                 ) : (!leaveTypes || leaveTypes.length === 0) ? (
                   <tr><td colSpan={5} className="p-4 text-center text-gray-500 italic">No leave types defined.</td></tr>
                 ) : (
                   leaveTypes.map(lt => (
                     <tr key={lt.id} className="hover:bg-gray-50">
                       <td className="px-4 py-3 font-mono text-xs">{lt.type}</td>
                       <td className="px-4 py-3 font-medium">{lt.name}</td>
                       <td className="px-4 py-3">{lt.defaultQuota} Days</td>
                       <td className="px-4 py-3 text-xs text-gray-500 space-y-1">
                          <div>Max Consec: {lt.maxConsecutiveDays}d</div>
                          <div>Notice: {lt.advanceNoticeDays}d</div>
                          {lt.isCarryForward && <div className="text-green-600">Carry Fwd: {lt.maxCarryForward}d</div>}
                       </td>
                       <td className="px-4 py-3 text-right">
                          <Button 
                            variant="danger" 
                            className="h-8 px-2"
                            onClick={() => handleDeleteType(lt.id)}
                          >
                            <Trash className="w-4 h-4" />
                          </Button>
                       </td>
                     </tr>
                   ))
                 )}
               </tbody>
             </table>
          </CardContent>
        </Card>
      </div>

      {/* Create Type Modal */}
      {isTypeModalOpen && (
        <LeaveTypeModal 
          isOpen={isTypeModalOpen} 
          onClose={() => setIsTypeModalOpen(false)} 
          leavePeriodId={periodId} 
        />
      )}
    </div>
  );
}

// --- Leave Type Modal Component ---

const typeSchema = z.object({
  type: z.string().min(2, 'Code required (e.g. ANNUAL)'),
  name: z.string().min(2, 'Name required'),
  description: z.string().optional(),
  defaultQuota: z.coerce.number().min(0),
  maxConsecutiveDays: z.coerce.number().min(1),
  advanceNoticeDays: z.coerce.number().min(0),
  isCarryForward: z.boolean(),
  maxCarryForward: z.coerce.number().min(0),
  isActive: z.boolean(),
});

interface TypeFormValues {
  type: string;
  name: string;
  description?: string;
  defaultQuota: number;
  maxConsecutiveDays: number;
  advanceNoticeDays: number;
  isCarryForward: boolean;
  maxCarryForward: number;
  isActive: boolean;
}

function LeaveTypeModal({ isOpen, onClose, leavePeriodId }: { isOpen: boolean; onClose: () => void; leavePeriodId: number }) {
  const { mutate: createType, isPending } = useCreateLeaveType();
  const { register, handleSubmit, formState: { errors } } = useForm<TypeFormValues>({
    resolver: zodResolver(typeSchema) as any,
    defaultValues: {
      defaultQuota: 12,
      maxConsecutiveDays: 5,
      advanceNoticeDays: 3,
      isCarryForward: false,
      maxCarryForward: 0,
      isActive: true
    }
  });

  const onSubmit = (data: TypeFormValues) => {
    createType({ ...data, leavePeriodId: Number(leavePeriodId) }, {
      onSuccess: () => onClose()
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
       <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
         <div className="p-6 border-b flex justify-between items-center">
           <h3 className="text-lg font-bold">Add Leave Type</h3>
           <button onClick={onClose} className="text-gray-500 hover:text-gray-700"><Check className="hidden" /><Settings className="w-5 h-5 rotate-45" /></button> {/* using X icon or similar logic */}
         </div>
         <div className="p-6">
           <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input label="Type Code (e.g. ANNUAL)" error={errors.type?.message} {...register('type')} />
                <Input label="Display Name" error={errors.name?.message} {...register('name')} />
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                 <Input label="Default Quota" type="number" error={errors.defaultQuota?.message} {...register('defaultQuota')} />
                 <Input label="Max Consec." type="number" error={errors.maxConsecutiveDays?.message} {...register('maxConsecutiveDays')} />
                 <Input label="Adv. Notice" type="number" error={errors.advanceNoticeDays?.message} {...register('advanceNoticeDays')} />
              </div>

              <div className="space-y-2 p-3 bg-gray-50 rounded border">
                <label className="flex items-center gap-2">
                  <input type="checkbox" {...register('isCarryForward')} className="rounded border-gray-300" />
                  <span className="text-sm font-medium">Allow Carry Forward?</span>
                </label>
                <Input label="Max Carry Fwd Days" type="number" error={errors.maxCarryForward?.message} {...register('maxCarryForward')} />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">Description</label>
                <textarea className="w-full border rounded p-2 text-sm" {...register('description')} />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
                <Button type="submit" isLoading={isPending}>Create Type</Button>
              </div>
           </form>
         </div>
       </div>
    </div>
  );
}
