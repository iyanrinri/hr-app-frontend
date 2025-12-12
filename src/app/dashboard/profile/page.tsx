'use client';

import { useState } from 'react';
import { useMyProfile, useUpdateMyProfile, useUploadMyProfilePicture, useDeleteMyProfilePicture } from '@/hooks/useEmployeeProfile';
import { ProfileView } from '@/components/profile/ProfileView';
import { ProfileForm } from '@/components/profile/ProfileForm';
import { ProfilePictureUpload } from '@/components/profile/ProfilePictureUpload';
import { Mail, Shield, BadgeCheck, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function ProfilePage() {
  const { data: profile, isLoading } = useMyProfile();
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateMyProfile();
  const { mutateAsync: uploadPicture, isPending: isUploading } = useUploadMyProfilePicture();
  const { mutateAsync: deletePicture, isPending: isDeleting } = useDeleteMyProfilePicture();
  const [isEditing, setIsEditing] = useState(false);

  if (isLoading || !profile) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-navy"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            My Profile
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            View and manage your personal information
          </p>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          {!isEditing && (
            <Button onClick={() => setIsEditing(true)} className="shadow-lg shadow-brand-navy/20">
              <Pencil className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      <div className="relative mb-8">
        {/* Decorative Background */}
        <div className="h-48 rounded-xl bg-gradient-to-r from-brand-navy/90 via-blue-600/90 to-indigo-600/90 shadow-xl overflow-hidden relative">
          <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <BadgeCheck className="w-64 h-64 text-white transform rotate-12" />
          </div>
        </div>
        
        {/* Profile Header Info - Adjusted to be below/overlapping properly */}
        <div className="px-8 relative">
           <div className="flex flex-col md:flex-row items-end gap-6 -mt-12">
            <div className="relative z-10">
              <ProfilePictureUpload 
                currentImageUrl={profile.profilePicture || profile.profilePictureUrl} 
                altText={`${profile.firstName} ${profile.lastName}`}
                onUpload={uploadPicture}
                onDelete={deletePicture}
                isUploading={isUploading}
                isDeleting={isDeleting}
                canEdit={true}
                size="lg"
              />
            </div>
            
            <div className="flex-1 pb-2">
              <h1 className="text-3xl font-bold text-gray-900">
                {profile.firstName} {profile.lastName}
              </h1>
              <div className="flex flex-wrap items-center text-sm text-gray-600 gap-3 mt-2 font-medium">
                <span className="flex items-center bg-gray-100 px-3 py-1 rounded-full border border-gray-200 text-gray-700">
                  <Shield className="w-3.5 h-3.5 mr-2 text-brand-navy" />
                  {profile.user?.role || profile.role}
                </span>
                <span className="flex items-center bg-gray-100 px-3 py-1 rounded-full border border-gray-200 text-gray-700">
                  <Mail className="w-3.5 h-3.5 mr-2 text-brand-navy" />
                  {profile.user?.email || profile.email}
                </span>
                <span className="flex items-center bg-gray-100 px-3 py-1 rounded-full border border-gray-200 text-gray-700">
                  <BadgeCheck className="w-3.5 h-3.5 mr-2 text-brand-navy" />
                  #{profile.employeeNumber || profile.id}
                </span>
              </div>
            </div>

            <div className="pb-4 z-10">
               {!isEditing && (
                <Button onClick={() => setIsEditing(true)} className="shadow-md">
                  <Pencil className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              )}
            </div>
           </div>
        </div>
      </div>

      <div className="mt-16 pt-2">
        {isEditing ? (
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
              <div className="mb-6 pb-6 border-b border-gray-100">
                  <h2 className="text-xl font-bold text-gray-900">Edit Profile Information</h2>
                  <p className="text-sm text-gray-500 mt-1">Update your personal and contact details</p>
              </div>
              <ProfileForm 
                initialData={profile} 
                onSubmit={(data) => {
                  updateProfile(data, {
                    onSuccess: () => setIsEditing(false)
                  });
                }}
                onCancel={() => setIsEditing(false)}
                isLoading={isUpdating}
                // Ordinary users cannot edit employment details
                isAdmin={false} 
              />
            </div>
          ) : (
            <ProfileView profile={profile} />
          )}
      </div>
    </div>
  );
}
