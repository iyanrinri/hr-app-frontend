export interface Employee {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  position: string;
  department: string;
  joinDate: string;
  baseSalary: number;
  managerId: number | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  user: {
    id: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  };
}

export interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface EmployeesResponse {
  data: Employee[];
  meta: Meta;
}

export interface CreateEmployeePayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  position: string;
  department: string;
  joinDate: string;
  baseSalary: number;
}

export interface AssignManagerPayload {
  managerId: number | null;
}

export interface AssignSubordinatesPayload {
  subordinateIds: number[]; 
}

export interface OrganizationTreeResponse {
  manager: Employee | null;
  employee: Employee;
  subordinates: Employee[];
  siblings: Employee[];
  managementChain: Employee[];
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
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
  INTERN = 'INTERN',
  FREELANCE = 'FREELANCE',
  PROBATION = 'PROBATION',
  TERMINATED = 'TERMINATED',
  RESIGNED = 'RESIGNED'
}

export interface EmployeeProfile {
  id: string;
  employeeId: string;
  
  // Personal Info
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  gender?: Gender;
  maritalStatus?: MaritalStatus;
  nationality?: string;
  religion?: string;
  bloodType?: string;
  idNumber?: string; // NIK
  taxNumber?: string; // NPWP

  // Contact Info
  phoneNumber?: string;
  alternativePhone?: string;
  address?: string;
  city?: string;
  province?: string;
  postalCode?: string;
  
  // Emergency Contact
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyContactRelation?: string;

  // Financial Info
  bankName?: string;
  bankAccountNumber?: string;
  bankAccountHolder?: string; // Usually matches name but can differ
  bankAccountName?: string; // Alias for holder

  // Employment Details (Some redundant with Employee model but kept for snapshots)
  employmentStatus: EmploymentStatus;
  workLocation?: string;
  joinDate?: string;
  contractStartDate?: string;
  contractEndDate?: string;
  
  // Picture
  profilePicture?: string;
  profilePictureUrl?: string; // Helper for frontend display

  // Meta
  createdAt: string;
  updatedAt: string;

  // Relations
  user?: {
      id: string;
      email: string;
      role: string;
  };

  // Redundant fields often sent by API
  position?: string;
  department?: string;
  employeeNumber?: string; // Custom ID
}

export interface UpdateProfilePayload {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  gender?: Gender;
  maritalStatus?: MaritalStatus;
  nationality?: string;
  religion?: string;
  bloodType?: string;
  idNumber?: string;
  taxNumber?: string;
  phoneNumber?: string;
  alternativePhone?: string;
  address?: string;
  city?: string;
  province?: string;
  postalCode?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyContactRelation?: string;
  bankName?: string;
  bankAccountNumber?: string;
  bankAccountName?: string;
  
  // Admin only usually
  employmentStatus?: EmploymentStatus;
  workLocation?: string;
  joinDate?: string;
  contractStartDate?: string | null;
  contractEndDate?: string | null;
  position?: string;
  department?: string;
  employeeNumber?: string;
}
