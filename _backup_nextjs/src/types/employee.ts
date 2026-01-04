export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER'
}

export enum MaritalStatus {
  SINGLE = 'SINGLE',
  MARRIED = 'MARRIED',
  DIVORCED = 'DIVORCED',
  WIDOWED = 'WIDOWED'
}

export enum EmploymentStatus {
  PERMANENT = 'PERMANENT',
  CONTRACT = 'CONTRACT',
  PROBATION = 'PROBATION',
  INTERN = 'INTERN'
}

export interface EmployeeProfile {
  id: string;
  userId: string;
  // Personal Information
  firstName: string;
  lastName: string;
  name?: string; // derived or optional
  email?: string; // from user object usually, but let's keep it if we map it
  
  role?: string; // from user object
  
  dateOfBirth?: string;
  gender?: Gender;
  maritalStatus?: MaritalStatus;
  nationality?: string;
  religion?: string;
  bloodType?: string;
  idNumber?: string;
  taxNumber?: string;
  
  // Contact Information
  phoneNumber?: string;
  alternativePhone?: string;
  address?: string;
  city?: string;
  province?: string;
  postalCode?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyContactRelation?: string;
  
  // Bank Information
  bankName?: string;
  bankAccountNumber?: string;
  bankAccountHolder?: string; 
  bankAccountName?: string;
  
  // Employment Details
  employeeNumber?: string;
  employmentStatus?: EmploymentStatus;
  workLocation?: string;
  joinDate?: string;
  department?: string; 
  position?: string;
  contractStartDate?: string;
  contractEndDate?: string;
  
  // Metadata
  profilePicture?: string; // from API
  profilePictureUrl?: string; // legacy or mapped
  createdAt: string;
  updatedAt: string;
  
  // Nested User object from API
  user?: {
    id: string;
    email: string;
    role: string;
  }
}

export interface UpdateProfilePayload {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  address?: string;
  city?: string;
  dateOfBirth?: string;
  gender?: Gender;
  maritalStatus?: MaritalStatus;
  nationality?: string;
  religion?: string;
  bloodType?: string;
  idNumber?: string;
  taxNumber?: string;
  alternativePhone?: string;
  province?: string;
  postalCode?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyContactRelation?: string;
  bankName?: string;
  bankAccountNumber?: string;
  bankAccountName?: string;
  // Admin only fields
  employmentStatus?: EmploymentStatus;
  workLocation?: string;
  joinDate?: string;
  position?: string;
  department?: string;
  employeeNumber?: string;
  contractStartDate?: string;
  contractEndDate?: string;
}
