'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEmployee, useUpdateEmployee } from '@/hooks/useEmployees';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { HierarchyManager } from '@/components/employees/HierarchyManager';

const employeeSchema = z.object({
  firstName: z.string().min(2, 'First Name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().optional().or(z.literal('')),
  position: z.string().min(2, 'Position is required'),
  department: z.string().min(2, 'Department is required'),
  baseSalary: z.coerce.number().min(0, 'Salary must be positive'),
});

type EmployeeFormValues = z.infer<typeof employeeSchema>;

export default function EditEmployeePage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  
  const { data: employee, isLoading, error } = useEmployee(id);
  const { mutate: updateEmployee, isPending } = useUpdateEmployee(id);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeSchema),
  });

  const [activeTab, setActiveTab] = useState<'details' | 'management'>('details');

  useEffect(() => {
    if (employee) {
      reset({
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.user.email,
        password: '',
        position: employee.position,
        department: employee.department,
        baseSalary: employee.baseSalary,
      });
    }
  }, [employee, reset]);

  const onSubmit = (data: EmployeeFormValues) => {
    // Remove password if empty
    const payload: Partial<EmployeeFormValues> = { ...data };
    if (!payload.password || payload.password === '') {
      delete payload.password;
    }
    updateEmployee(payload);
  };

  if (isLoading) return <div className="text-center py-12">Loading...</div>;
  if (error || !employee) return <div className="text-center py-12 text-red-500">Error loading employee</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <h2 className="text-2xl font-bold text-gray-900">Edit Employee</h2>
      </div>

      <div className="flex gap-4 border-b border-gray-200">
        <button
          className={`px-4 py-2 font-medium text-sm transition-colors border-b-2 ${
            activeTab === 'details' 
              ? 'border-brand-navy text-brand-navy' 
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('details')}
        >
          Employee Details
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm transition-colors border-b-2 ${
            activeTab === 'management' 
              ? 'border-brand-navy text-brand-navy' 
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('management')}
        >
          Management & Hierarchy
        </button>
      </div>

      {activeTab === 'details' ? (
        <Card>
          <CardHeader>
            <CardTitle>Employee Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="First Name"
                  error={errors.firstName?.message}
                  {...register('firstName')}
                />
                <Input
                  label="Last Name"
                  error={errors.lastName?.message}
                  {...register('lastName')}
                />
                <Input
                  label="Email Address"
                  type="email"
                  error={errors.email?.message}
                  {...register('email')}
                />
                <Input
                  label="Password (leave empty to keep current)"
                  type="password"
                  placeholder="Enter new password or leave empty"
                  error={errors.password?.message}
                  {...register('password')}
                />
                <Input
                  label="Position"
                  error={errors.position?.message}
                  {...register('position')}
                />
                <Input
                  label="Department"
                  error={errors.department?.message}
                  {...register('department')}
                />
                <Input
                  label="Base Salary"
                  type="number"
                  error={errors.baseSalary?.message}
                  {...register('baseSalary')}
                />
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
      ) : (
        <HierarchyManager employeeId={id} />
      )}
    </div>
  );
}
