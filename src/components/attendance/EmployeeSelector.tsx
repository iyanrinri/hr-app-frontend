'use client';

import { useAuthStore } from '@/store/authStore';
import { useEmployees } from '@/hooks/useEmployees';

interface EmployeeSelectorProps {
  selectedEmployeeId: string;
  onEmployeeChange: (employeeId: string) => void;
}

export function EmployeeSelector({ selectedEmployeeId, onEmployeeChange }: EmployeeSelectorProps) {
  const user = useAuthStore((state) => state.user);
  const { data: response } = useEmployees(1, 100); // Get all employees for selector

  // Only show selector for HR/SUPER/ADMIN roles
  if (!user || (user.role !== 'HR' && user.role !== 'SUPER' && user.role !== 'ADMIN')) {
    return null;
  }

  return (
    <div className="w-full">
      <label className="block text-sm font-bold text-gray-900 mb-2">
        Select Employee
      </label>
      <select
        value={selectedEmployeeId}
        onChange={(e) => onEmployeeChange(e.target.value)}
        className="w-full appearance-none px-4 py-2 pr-10 border border-gray-600 rounded-md focus:outline-none focus:ring-brand-cyan focus:border-brand-cyan bg-white text-black cursor-pointer"
      >
        <option value="">All Employees</option>
        {response?.data.map((employee) => (
          <option key={employee.id} value={employee.id}>
            {employee.firstName} {employee.lastName} ({employee.user.email})
          </option>
        ))}
      </select>
    </div>
  );
}
