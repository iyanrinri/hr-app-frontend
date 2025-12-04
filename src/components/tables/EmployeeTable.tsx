'use client';

import { Employee } from '@/hooks/useEmployees';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { Edit, Trash2, RotateCcw, Eye, X } from 'lucide-react';
import { useState } from 'react';

interface EmployeeTableProps {
  employees: Employee[];
  onDelete: (id: string) => void;
  onRestore: (id: string) => void;
}

export function EmployeeTable({ employees, onDelete, onRestore }: EmployeeTableProps) {
  const [confirmAction, setConfirmAction] = useState<{ type: 'delete' | 'restore'; id: string } | null>(null);
  const [viewEmployee, setViewEmployee] = useState<Employee | null>(null);

  const handleConfirm = () => {
    if (confirmAction) {
      if (confirmAction.type === 'delete') {
        onDelete(confirmAction.id);
      } else {
        onRestore(confirmAction.id);
      }
      setConfirmAction(null);
    }
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {employees.map((employee) => {
              const isInactive = !!employee.user.deletedAt;
              
              return (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <div className="flex flex-col">
                      <span>{employee.firstName} {employee.lastName}</span>
                      {isInactive && (
                        <span className="mt-1 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 w-fit">
                          Inactive User
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.position}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(employee.joinDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="secondary" 
                        className="p-2" 
                        onClick={() => setViewEmployee(employee)}
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Link href={`/dashboard/employees/${employee.id}`}>
                        <Button variant="secondary" className="p-2" title="Edit Employee">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                      {isInactive ? (
                        <Button 
                          variant="secondary" 
                          className="p-2 bg-green-50 text-green-600 hover:bg-green-100 border-green-200" 
                          onClick={() => setConfirmAction({ type: 'restore', id: employee.id })}
                          title="Restore Employee"
                        >
                          <RotateCcw className="w-4 h-4" />
                        </Button>
                      ) : (
                        <Button 
                          variant="danger" 
                          className="p-2" 
                          onClick={() => setConfirmAction({ type: 'delete', id: employee.id })}
                          title="Delete Employee"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* View Employee Modal */}
      {viewEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Employee Details</h3>
              <button
                onClick={() => setViewEmployee(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">First Name</label>
                  <p className="text-gray-900">{viewEmployee.firstName}</p>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Last Name</label>
                  <p className="text-gray-900">{viewEmployee.lastName}</p>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Email</label>
                  <p className="text-gray-900">{viewEmployee.user.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Role</label>
                  <p className="text-gray-900 capitalize">{viewEmployee.user.role}</p>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Position</label>
                  <p className="text-gray-900">{viewEmployee.position}</p>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Department</label>
                  <p className="text-gray-900">{viewEmployee.department}</p>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Join Date</label>
                  <p className="text-gray-900">{new Date(viewEmployee.joinDate).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</p>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Base Salary</label>
                  <p className="text-gray-900">
                    {new Intl.NumberFormat('id-ID', { 
                      style: 'currency', 
                      currency: 'IDR',
                      minimumFractionDigits: 0
                    }).format(viewEmployee.baseSalary)}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Status</label>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    viewEmployee.user.deletedAt 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {viewEmployee.user.deletedAt ? 'Inactive' : 'Active'}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Created At</label>
                  <p className="text-gray-900">{new Date(viewEmployee.createdAt).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</p>
                </div>
              </div>
            </div>
            <div className="sticky bottom-0 bg-gray-50 px-6 py-4 border-t border-gray-200">
              <Button onClick={() => setViewEmployee(null)} variant="secondary" className="w-full">
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Dialog */}
      {confirmAction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              {confirmAction.type === 'delete' ? 'Delete Employee' : 'Restore Employee'}
            </h3>
            <p className="text-gray-600 mb-6">
              {confirmAction.type === 'delete' 
                ? 'Are you sure you want to delete this employee? This action will deactivate their account.'
                : 'Are you sure you want to restore this employee? This will reactivate their account.'}
            </p>
            <div className="flex justify-end space-x-3">
              <Button variant="secondary" onClick={() => setConfirmAction(null)}>
                Cancel
              </Button>
              <Button 
                variant={confirmAction.type === 'delete' ? 'danger' : 'primary'}
                onClick={handleConfirm}
              >
                {confirmAction.type === 'delete' ? 'Delete' : 'Restore'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
