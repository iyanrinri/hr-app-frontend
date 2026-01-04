import React from 'react';
import { EmployeeProfile } from '@/types/employee';
import { User, Phone, MapPin, Building2, Calendar, CreditCard, Heart, Briefcase, LucideIcon, BadgeCheck } from 'lucide-react';
import { format } from 'date-fns';

interface ProfileViewProps {
  profile: EmployeeProfile;
}

const formatDate = (dateString?: string) => {
  if (!dateString) return '-';
  try {
    return format(new Date(dateString), 'MMMM d, yyyy');
  } catch {
    return dateString;
  }
};

const InfoItem = ({ icon: Icon, label, value }: { icon: LucideIcon, label: string, value?: string | number | null }) => (
  <div className="flex items-start p-3 bg-gray-50 rounded-lg border border-gray-100">
    <div className="flex-shrink-0 mr-3">
      <Icon className="w-5 h-5 text-gray-400" />
    </div>
    <div>
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</p>
      <p className="mt-1 text-sm font-medium text-gray-900 break-words">{value || '-'}</p>
    </div>
  </div>
);

export const ProfileView: React.FC<ProfileViewProps> = ({ profile }) => {
  return (
    <div className="space-y-6">
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Details Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-100 flex items-center">
            <User className="w-5 h-5 mr-2 text-brand-navy" />
            <h3 className="text-lg font-semibold text-gray-900">Personal Details</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoItem icon={User} label="Full Name" value={`${profile.firstName} ${profile.lastName}`} />
              <InfoItem icon={Calendar} label="Date of Birth" value={String(formatDate(profile.dateOfBirth))} />
              <InfoItem icon={User} label="Gender" value={profile.gender?.replace('_', ' ') || '-'} />
              <InfoItem icon={Heart} label="Marital Status" value={String(profile.maritalStatus || '-')} />
              <InfoItem icon={User} label="Nationality" value={String(profile.nationality || '-')} />
              <InfoItem icon={User} label="Religion" value={String(profile.religion || '-')} />
              <InfoItem icon={Heart} label="Blood Type" value={String(profile.bloodType || '-')} />
              <InfoItem icon={CreditCard} label="ID Number (NIK)" value={String(profile.idNumber || '-')} />
              <InfoItem icon={CreditCard} label="Tax Number (NPWP)" value={String(profile.taxNumber || '-')} />
            </div>
          </div>
        </div>

        {/* Contact Information Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 px-6 py-4 border-b border-gray-100 flex items-center">
            <Phone className="w-5 h-5 mr-2 text-emerald-700" />
            <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoItem icon={Phone} label="Phone Number" value={profile.phoneNumber} />
              <InfoItem icon={Phone} label="Alt Phone" value={profile.alternativePhone} />
              <InfoItem icon={MapPin} label="City" value={profile.city} />
              <InfoItem icon={MapPin} label="Province" value={profile.province} />
              <InfoItem icon={MapPin} label="Postal Code" value={profile.postalCode} />
              <div className="md:col-span-2">
                <InfoItem icon={MapPin} label="Address" value={profile.address} />
              </div>
              <div className="md:col-span-2 pt-4 border-t border-gray-100 mt-2">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">Emergency Contact</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoItem icon={User} label="Name" value={profile.emergencyContactName} />
                  <InfoItem icon={Phone} label="Phone" value={profile.emergencyContactPhone} />
                  <InfoItem icon={Heart} label="Relation" value={profile.emergencyContactRelation} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Employment Details Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 px-6 py-4 border-b border-gray-100 flex items-center">
            <Briefcase className="w-5 h-5 mr-2 text-amber-700" />
            <h3 className="text-lg font-semibold text-gray-900">Employment Details</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoItem icon={BadgeCheck} label="Employee ID" value={profile.employeeNumber || profile.id} />
              <InfoItem icon={Briefcase} label="Status" value={profile.employmentStatus} />
              <InfoItem icon={Briefcase} label="Position" value={profile.position || profile?.user?.role} />
              <InfoItem icon={Building2} label="Department" value={profile.department} />
              <InfoItem icon={MapPin} label="Work Location" value={profile.workLocation} />
              <InfoItem icon={Calendar} label="Join Date" value={formatDate(profile.joinDate)} />
              {(profile.contractStartDate || profile.contractEndDate) && (
                <>
                  <InfoItem icon={Calendar} label="Contract Start" value={formatDate(profile.contractStartDate)} />
                  <InfoItem icon={Calendar} label="Contract End" value={formatDate(profile.contractEndDate)} />
                </>
              )}
            </div>
          </div>
        </div>

        {/* Financial Information Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
           <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-4 border-b border-gray-100 flex items-center">
            <CreditCard className="w-5 h-5 mr-2 text-purple-700" />
            <h3 className="text-lg font-semibold text-gray-900">Financial Information</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 gap-4">
              <InfoItem icon={Building2} label="Bank Name" value={profile.bankName} />
              <InfoItem icon={CreditCard} label="Account Number" value={profile.bankAccountNumber} />
              <InfoItem icon={User} label="Account Holder" value={profile.bankAccountName || profile.bankAccountHolder} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
