import React, { useState } from 'react';
import { EmployeeProfile, UpdateProfilePayload, Gender, MaritalStatus, EmploymentStatus } from '@/types/employee';
import { Button } from '@/components/ui/Button'; 
import { Input } from '@/components/ui/Input';
import { Save, X } from 'lucide-react';

interface ProfileFormProps {
  initialData: EmployeeProfile;
  onSubmit: (data: UpdateProfilePayload) => void;
  onCancel: () => void;
  isLoading?: boolean;
  isAdmin?: boolean; // To enable editing of employment details
}

const SectionHeader = ({ title }: { title: string }) => (
  <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2 mb-4 mt-6 first:mt-0">
    {title}
  </h3>
);

// Helper Component for Form Section
const FormSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="bg-gray-50/50 p-6 rounded-xl border border-gray-100 hover:border-brand-navy/20 transition-colors">
    <SectionHeader title={title} />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {children}
    </div>
  </div>
);

const INDONESIAN_RELIGIONS = [
  'ISLAM',
  'PROTESTANT',
  'CATHOLIC',
  'HINDU',
  'BUDDHA',
  'CONFUCIANISM', // Konghucu
  'OTHER'
];

const INDONESIAN_PROVINCES = [
  'Aceh', 'Bali', 'Banten', 'Bengkulu', 'DI Yogyakarta', 'DKI Jakarta',
  'Gorontalo', 'Jambi', 'Jawa Barat', 'Jawa Tengah', 'Jawa Timur',
  'Kalimantan Barat', 'Kalimantan Selatan', 'Kalimantan Tengah', 'Kalimantan Timur', 'Kalimantan Utara',
  'Kepulauan Bangka Belitung', 'Kepulauan Riau', 'Lampung', 'Maluku', 'Maluku Utara',
  'Nusa Tenggara Barat', 'Nusa Tenggara Timur', 'Papua', 'Papua Barat', 'Riau',
  'Sulawesi Barat', 'Sulawesi Selatan', 'Sulawesi Tengah', 'Sulawesi Tenggara', 'Sulawesi Utara',
  'Sumatera Barat', 'Sumatera Selatan', 'Sumatera Utara', 'Other'
];

const BLOOD_TYPES = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const EMERGENCY_RELATIONS = [
  'Parent', 'Husband', 'Wife', 'Spouse', 'Sibling', 'Child', 'Relative', 'Friend', 'Other'
];

export const ProfileForm: React.FC<ProfileFormProps> = ({ 
  initialData, 
  onSubmit, 
  onCancel, 
  isLoading = false,
  isAdmin = false 
}) => {
  const [formData, setFormData] = useState<UpdateProfilePayload>({
    firstName: initialData.firstName,
    lastName: initialData.lastName,
    phoneNumber: initialData.phoneNumber || '',
    alternativePhone: initialData.alternativePhone || '',
    address: initialData.address || '',
    city: initialData.city || '',
    province: initialData.province || '',
    postalCode: initialData.postalCode || '',
    dateOfBirth: initialData.dateOfBirth ? initialData.dateOfBirth.split('T')[0] : '',
    gender: initialData.gender,
    maritalStatus: initialData.maritalStatus,
    nationality: initialData.nationality || '',
    religion: initialData.religion || '',
    bloodType: initialData.bloodType || '',
    idNumber: initialData.idNumber || '', // NIK
    taxNumber: initialData.taxNumber || '', // NPWP
    bankName: initialData.bankName || '',
    bankAccountNumber: initialData.bankAccountNumber || '',
    bankAccountName: initialData.bankAccountName || initialData.bankAccountHolder || '',
    emergencyContactName: initialData.emergencyContactName || '',
    emergencyContactPhone: initialData.emergencyContactPhone || '',
    emergencyContactRelation: initialData.emergencyContactRelation || '',
    // Admin fields
    employmentStatus: initialData.employmentStatus,
    workLocation: initialData.workLocation || '',
    joinDate: initialData.joinDate ? initialData.joinDate.split('T')[0] : '',
    position: initialData.position || '',
    department: initialData.department || '',
    employeeNumber: initialData.employeeNumber || '',
    contractStartDate: initialData.contractStartDate ? initialData.contractStartDate.split('T')[0] : '',
    contractEndDate: initialData.contractEndDate ? initialData.contractEndDate.split('T')[0] : '',
  });

  const [isOtherReligion, setIsOtherReligion] = useState(
    initialData.religion && !INDONESIAN_RELIGIONS.includes(initialData.religion)
  );
  
  const [isOtherProvince, setIsOtherProvince] = useState(
      initialData.province && !INDONESIAN_PROVINCES.includes(initialData.province)
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Check for dropdown handling
    if (name === 'religion') {
        if (value === 'OTHER') {
            setIsOtherReligion(true);
            setFormData(prev => ({ ...prev, religion: '' }));
            return;
        } else {
             setIsOtherReligion(false);
        }
    }

    if (name === 'province') {
        if (value === 'Other') {
            setIsOtherProvince(true);
            setFormData(prev => ({ ...prev, province: '' }));
            return;
        } else {
            setIsOtherProvince(false);
        }
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Prepare payload, sending null for empty dates
    const payload = { ...formData };
    
    if (payload.contractStartDate === '') {
        // @ts-expect-error - API expects null for empty date
        payload.contractStartDate = null; 
    }
    if (payload.contractEndDate === '') {
        // @ts-expect-error - API expects null for empty date
        payload.contractEndDate = null;
    }

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      
      {/* Personal Info */}
      <FormSection title="Personal Information">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
          <Input name="firstName" value={formData.firstName || ''} onChange={handleChange} placeholder="John" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
          <Input name="lastName" value={formData.lastName || ''} onChange={handleChange} placeholder="Doe" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
          <Input type="date" name="dateOfBirth" value={formData.dateOfBirth || ''} onChange={handleChange} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
          <select 
            name="gender" 
            value={formData.gender || ''} 
            onChange={handleChange}
            className="block w-full px-3 py-2 bg-white text-black border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-brand-cyan focus:border-brand-cyan text-base"
          >
            <option value="">Select Gender</option>
            {Object.values(Gender).map((g) => (
              <option key={g} value={g}>{g.replace('_', ' ')}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Marital Status</label>
          <select 
            name="maritalStatus" 
            value={formData.maritalStatus || ''} 
            onChange={handleChange}
            className="block w-full px-3 py-2 bg-white text-black border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-brand-cyan focus:border-brand-cyan text-base"
          >
            <option value="">Select Status</option>
            {Object.values(MaritalStatus).map((s) => (
              <option key={s} value={s}>{s.replace('_', ' ')}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
          <Input name="nationality" value={formData.nationality || ''} onChange={handleChange} placeholder="Indonesian" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Religion</label>
          {!isOtherReligion ? (
              <select 
                name="religion" 
                value={formData.religion || ''} 
                onChange={handleChange}
                className="block w-full px-3 py-2 bg-white text-black border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-brand-cyan focus:border-brand-cyan text-base"
              >
                <option value="">Select Religion</option>
                {INDONESIAN_RELIGIONS.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
          ) : (
            <div className="flex gap-2">
                 <Input name="religion" value={formData.religion || ''} onChange={handleChange} placeholder="Specify religion" />
                 <Button type="button" variant="secondary" onClick={() => { setIsOtherReligion(false); setFormData(p => ({...p, religion: ''})) }} className="whitespace-nowrap">Show List</Button>
            </div>
          )}
        </div>
        <div>
           <label className="block text-sm font-medium text-gray-700 mb-1">Blood Type</label>
           <select 
             name="bloodType" 
             value={formData.bloodType || ''} 
             onChange={handleChange}
             className="block w-full px-3 py-2 bg-white text-black border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-brand-cyan focus:border-brand-cyan text-base"
           >
             <option value="">Select</option>
             {BLOOD_TYPES.map((t) => (
               <option key={t} value={t}>{t}</option>
             ))}
           </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">ID Number (NIK)</label>
          <Input name="idNumber" value={formData.idNumber || ''} onChange={handleChange} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tax Number (NPWP)</label>
          <Input name="taxNumber" value={formData.taxNumber || ''} onChange={handleChange} />
        </div>
      </FormSection>

      {/* Contact Info */}
      <FormSection title="Contact Information">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <Input name="phoneNumber" value={formData.phoneNumber || ''} onChange={handleChange} placeholder="+62..." />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Alternative Phone</label>
          <Input name="alternativePhone" value={formData.alternativePhone || ''} onChange={handleChange} />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
          <Input name="address" value={formData.address || ''} onChange={handleChange} placeholder="Full address" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
          <Input name="city" value={formData.city || ''} onChange={handleChange} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Province</label>
           {!isOtherProvince ? (
              <select 
                name="province" 
                value={formData.province || ''} 
                onChange={handleChange}
                className="block w-full px-3 py-2 bg-white text-black border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-brand-cyan focus:border-brand-cyan text-base"
              >
                <option value="">Select Province</option>
                {INDONESIAN_PROVINCES.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
          ) : (
            <div className="flex gap-2">
                 <Input name="province" value={formData.province || ''} onChange={handleChange} placeholder="Specify province" />
                 <Button type="button" variant="secondary" onClick={() => { setIsOtherProvince(false); setFormData(p => ({...p, province: ''})) }} className="whitespace-nowrap">Show List</Button>
            </div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
          <Input name="postalCode" value={formData.postalCode || ''} onChange={handleChange} />
        </div>
        <div className="md:col-span-2 pt-4 mt-2 border-t border-gray-200">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Emergency Contact</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <Input name="emergencyContactName" value={formData.emergencyContactName || ''} onChange={handleChange} />
             </div>
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <Input name="emergencyContactPhone" value={formData.emergencyContactPhone || ''} onChange={handleChange} />
             </div>
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Relation</label>
                <select 
                  name="emergencyContactRelation" 
                  value={formData.emergencyContactRelation || ''} 
                  onChange={handleChange}
                  className="block w-full px-3 py-2 bg-white text-black border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-brand-cyan focus:border-brand-cyan text-base"
                >
                  <option value="">Select Relation</option>
                  {EMERGENCY_RELATIONS.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
             </div>
          </div>
        </div>
      </FormSection>

      {/* Bank Info */}
      <FormSection title="Financial Information">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
          <Input name="bankName" value={formData.bankName || ''} onChange={handleChange} placeholder="BCA" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
          <Input name="bankAccountNumber" value={formData.bankAccountNumber || ''} onChange={handleChange} />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Account Holder Name</label>
          <Input name="bankAccountName" value={formData.bankAccountName || ''} onChange={handleChange} />
        </div>
      </FormSection>

      {/* Admin Only Fields */}
      {isAdmin && (
        <FormSection title="Employment Details (Admin)">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID</label>
              <Input name="employeeNumber" value={formData.employeeNumber || ''} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Employment Status</label>
              <select 
                name="employmentStatus" 
                value={formData.employmentStatus || ''} 
                onChange={handleChange}
                className="block w-full px-3 py-2 bg-white text-black border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-brand-cyan focus:border-brand-cyan text-base"
              >
                <option value="">Select Status</option>
                {Object.values(EmploymentStatus).map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
              <Input name="position" value={formData.position || ''} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <Input name="department" value={formData.department || ''} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Work Location</label>
              <Input name="workLocation" value={formData.workLocation || ''} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Join Date</label>
              <Input type="date" name="joinDate" value={formData.joinDate || ''} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contract Start</label>
              <Input type="date" name="contractStartDate" value={formData.contractStartDate || ''} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contract End</label>
              <Input type="date" name="contractEndDate" value={formData.contractEndDate || ''} onChange={handleChange} />
            </div>
        </FormSection>
      )}

      {/* Buttons */}
      <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
        <Button type="button" variant="secondary" onClick={onCancel} disabled={isLoading}>
          <X className="w-4 h-4 mr-2" />
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading} className="bg-brand-navy text-white hover:bg-brand-navy/90">
          <Save className="w-4 h-4 mr-2" />
          {isLoading ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </form>
  );
};
