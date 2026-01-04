'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCreateEmployee } from '@/hooks/useEmployees';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

const employeeSchema = z.object({
  firstName: z.string().min(2, 'First Name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  position: z.string().min(2, 'Position is required'),
  department: z.string().min(2, 'Department is required'),
  joinDate: z.string().refine((val) => !isNaN(Date.parse(val)), 'Invalid date'),
  baseSalary: z.coerce.number().min(0, 'Salary must be positive'),
});

type EmployeeFormValues = z.infer<typeof employeeSchema>;

export default function CreateEmployeePage() {
  const router = useRouter();
  const { mutate: createEmployee, isPending } = useCreateEmployee();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeSchema) as any,
  });

  const onSubmit = (data: EmployeeFormValues) => {
    // Ensure joinDate is in ISO format if input is date
    const payload = {
      ...data,
      joinDate: new Date(data.joinDate).toISOString(),
    };
    createEmployee(payload);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <h2 className="text-2xl font-bold text-gray-900">Add New Employee</h2>
      </div>

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
                label="Password"
                type="password"
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
                label="Join Date"
                type="date"
                error={errors.joinDate?.message}
                {...register('joinDate')}
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
                Create Employee
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
