'use client';

import { useEmployees, useDeleteEmployee, useRestoreEmployee } from '@/hooks/useEmployees';
import { EmployeeTable } from '@/components/tables/EmployeeTable';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Link from 'next/link';
import { Plus, Search, Filter } from 'lucide-react';
import { useState } from 'react';

export default function EmployeesPage() {
  // Filter inputs (not yet applied)
  const [searchInput, setSearchInput] = useState('');
  const [statusInput, setStatusInput] = useState('');
  
  // Applied filters (used in API query)
  const [searchQuery, setSearchQuery] = useState('');
  const [statusQuery, setStatusQuery] = useState('');
  
  const { data: response, isLoading, error } = useEmployees(1, 10, searchQuery, statusQuery);
  const { mutate: deleteEmployee } = useDeleteEmployee();
  const { mutate: restoreEmployee } = useRestoreEmployee();

  const handleApplyFilters = () => {
    setSearchQuery(searchInput);
    setStatusQuery(statusInput);
  };

  const handleResetFilters = () => {
    setSearchInput('');
    setStatusInput('');
    setSearchQuery('');
    setStatusQuery('');
  };

  if (error) return <div className="p-6 text-center text-red-600">Error loading employees</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Employees</h2>
        <Link href="/dashboard/employees/create">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Employee
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative lg:col-span-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, email, position..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-brand-cyan focus:border-brand-cyan bg-white text-black"
              />
            </div>
            <div className="relative">
              <select
                value={statusInput}
                onChange={(e) => setStatusInput(e.target.value)}
                className="w-full appearance-none px-4 py-2 pr-10 border border-gray-600 rounded-md focus:outline-none focus:ring-brand-cyan focus:border-brand-cyan bg-white text-black cursor-pointer"
              >
                <option value="">All Status</option>
                <option value="active">Active Only</option>
                <option value="inactive">Inactive Only</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleApplyFilters} className="flex-1">
                <Filter className="w-4 h-4 mr-2" />
                Apply
              </Button>
              <Button variant="secondary" onClick={handleResetFilters} className="flex-1">
                Reset
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Employees</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-navy mb-4"></div>
              <p className="text-gray-600">Loading employees...</p>
            </div>
          ) : (
            <EmployeeTable 
              employees={response?.data || []} 
              onDelete={deleteEmployee} 
              onRestore={restoreEmployee}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
