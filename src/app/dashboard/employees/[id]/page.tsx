'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEmployee, useUpdateEmployee } from '@/hooks/useEmployees';
import { useEmployeeProfile, useUpdateEmployeeProfile, useUploadEmployeePicture, useDeleteEmployeePicture } from '@/hooks/useEmployeeProfile';
import { ProfileView } from '@/components/profile/ProfileView';
import { ProfileForm } from '@/components/profile/ProfileForm';
import { ProfilePictureUpload } from '@/components/profile/ProfilePictureUpload';
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
  
  // Base Employee Data (Account)
  const { data: employee, isLoading: isLoadingEmployee, error } = useEmployee(id);
  const { mutate: updateEmployee, isPending: isUpdatingEmployee } = useUpdateEmployee(id);

  // Extended Profile Data
  const { data: profile, isLoading: isLoadingProfile } = useEmployeeProfile(id);
  const { mutate: updateProfile, isPending: isUpdatingProfile } = useUpdateEmployeeProfile(id);
  
  // Picture Hooks
  const { mutateAsync: uploadPicture, isPending: isUploadingPicture } = useUploadEmployeePicture(id);
  const { mutateAsync: deletePicture, isPending: isDeletingPicture } = useDeleteEmployeePicture(id);

  const [activeTab, setActiveTab] = useState<'details' | 'profile' | 'management'>('details');
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // ... (rest of hook calls)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeSchema),
  });

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

  const onSubmitAccount = (data: EmployeeFormValues) => {
    // Remove password if empty
    const payload: Partial<EmployeeFormValues> = { ...data };
    if (!payload.password || payload.password === '') {
      delete payload.password;
    }
    updateEmployee(payload);
  };

  if (isLoadingEmployee) return <div className="text-center py-12">Loading...</div>;
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

      <div className="flex gap-4 border-b border-gray-200 overflow-x-auto">
        <button
          className={`px-4 py-2 font-medium text-sm transition-colors border-b-2 whitespace-nowrap ${
            activeTab === 'details' 
              ? 'border-brand-navy text-brand-navy' 
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('details')}
        >
          Account Settings
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm transition-colors border-b-2 whitespace-nowrap ${
            activeTab === 'profile' 
              ? 'border-brand-navy text-brand-navy' 
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('profile')}
        >
          Profile Information
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm transition-colors border-b-2 whitespace-nowrap ${
            activeTab === 'management' 
              ? 'border-brand-navy text-brand-navy' 
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('management')}
        >
          Management & Hierarchy
        </button>
      </div>

      <div className="mt-6">
        {activeTab === 'details' && (
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmitAccount)} className="space-y-6">
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
                  <Button type="submit" isLoading={isUpdatingEmployee}>
                    Save Changes
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {activeTab === 'profile' && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Extended Profile</CardTitle>
              {!isEditingProfile && (
                <Button 
                  onClick={() => setIsEditingProfile(true)} 
                  variant="secondary" 
                  className="py-1 px-3 h-8 text-xs"
                >
                  Edit Profile
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {isLoadingProfile ? (
                 <div className="py-12 flex justify-center">
                   <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-navy"></div>
                 </div>
              ) : !profile ? (
                 <div className="py-12 text-center text-gray-500">
                   Profile not found or could not be loaded.
                 </div>
              ) : (
                <>
                  <div className="mb-8 flex justify-center pb-6 border-b border-gray-100">
                    <ProfilePictureUpload 
                      currentImageUrl={profile.profilePicture || profile.profilePictureUrl} 
                      altText={`${profile.firstName} ${profile.lastName}`}
                      onUpload={uploadPicture}
                      onDelete={deletePicture}
                      isUploading={isUploadingPicture}
                      isDeleting={isDeletingPicture}
                      canEdit={true}
                      size="xl"
                    />
                  </div>

                  {isEditingProfile ? (
                    <ProfileForm 
                      initialData={profile} 
                      onSubmit={(data) => {
                        updateProfile(data, {
                          onSuccess: () => setIsEditingProfile(false)
                        });
                      }}
                      onCancel={() => setIsEditingProfile(false)}
                      isLoading={isUpdatingProfile}
                      isAdmin={true} 
                    />
                  ) : (
                    <ProfileView profile={profile} />
                  )}
                </>
              )}
            </CardContent>
          </Card>
        )}

        {activeTab === 'management' && (
          <HierarchyManager employeeId={id} />
        )}
      </div>
    </div>
  );
}
