'use client';

import { useEmployees, useDeleteEmployee, useRestoreEmployee, Employee } from '@/hooks/useEmployees';
import { EmployeeTable } from '@/components/tables/EmployeeTable';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import Link from 'next/link';
import { Plus, Search, LayoutGrid, List as ListIcon, Edit, Trash2, User, Mail, Briefcase } from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'next/navigation';

export default function EmployeesPage() {
  const params = useParams();
  // View Mode State
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter inputs (not yet applied)
  const [searchInput, setSearchInput] = useState('');
  const [statusInput, setStatusInput] = useState('');
  
  // Applied filters (used in API query)
  const [searchQuery, setSearchQuery] = useState('');
  const [statusQuery, setStatusQuery] = useState('');
  
  const { data: response, isLoading, error } = useEmployees(1, 50, searchQuery, statusQuery);
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

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this employee?')) {
      deleteEmployee(id);
    }
  };

  // Helper to determine active status
  const isEmployeeActive = (emp: Employee) => !emp.deletedAt;

  const employees = response?.data || [];

  if (error) return <div className="p-12 text-center text-red-600 bg-red-50 rounded-lg border border-red-100 mt-6 lg:mx-8">Error loading employees. Please try refreshing the page.</div>;

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Employee Directory</h2>
          <p className="text-gray-500 mt-1">Manage your organization&apos;s workforce and profiles.</p>
        </div>
        <Link href={`/${params?.tenant_slug}/dashboard/employees/create`}>
          <Button className="shadow-lg shadow-brand-navy/20 h-10 px-6">
            <Plus className="w-4 h-4 mr-2" />
            Add Employee
          </Button>
        </Link>
      </div>

      {/* Filters & View Toggle */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col lg:flex-row gap-4 items-center justify-between">
        
        {/* Search & Status Pill Group */}
        <div className="flex flex-col md:flex-row gap-4 w-full lg:w-auto flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, email, position..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-brand-cyan/20 focus:bg-white transition-all text-sm"
            />
          </div>
          
          <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-lg self-start">
             <button 
               onClick={() => setStatusInput('')}
               className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${statusInput === '' ? 'bg-white text-brand-navy shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
             >
               All
             </button>
             <button 
               onClick={() => setStatusInput('active')}
               className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${statusInput === 'active' ? 'bg-white text-green-700 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
             >
               Active
             </button>
             <button 
               onClick={() => setStatusInput('inactive')}
               className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${statusInput === 'inactive' ? 'bg-white text-gray-700 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
             >
               Inactive
             </button>
          </div>

          <div className="flex gap-2">
             <Button onClick={handleApplyFilters} variant="secondary" className="px-4 shadow-sm border border-gray-200">Apply</Button>
             {(searchInput || statusInput) && (
               <Button onClick={handleResetFilters} variant="ghost" className="px-4 text-gray-500">Reset</Button>
             )}
          </div>
        </div>

        {/* View Toggles */}
        <div className="flex items-center bg-gray-50 p-1 rounded-lg border border-gray-100">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white text-brand-navy shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
            title="Grid View"
          >
            <LayoutGrid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-white text-brand-navy shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
            title="List View"
          >
            <ListIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content Area */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
           {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
             <div key={i} className="h-64 bg-gray-100 rounded-xl animate-pulse"></div>
           ))}
        </div>
      ) : employees.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-200">
           <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
             <User className="w-8 h-8 text-gray-300" />
           </div>
           <h3 className="text-lg font-medium text-gray-900">No employees found</h3>
           <p className="text-gray-500 mt-1">Try adjusting your filters or add a new employee.</p>
        </div>
      ) : (
        <>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {employees.map((emp: Employee) => {
                const isActive = isEmployeeActive(emp);
                return (
                  <div key={emp.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden group relative">
                    {/* Status Badge - Absolute Top Right */}
                    <div className="absolute top-3 right-3 z-10">
                       <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase shadow-sm backdrop-blur-md ${isActive ? 'bg-green-100/90 text-green-700' : 'bg-red-100/90 text-red-700'}`}>
                          {isActive ? 'Active' : 'Inactive'}
                       </span>
                    </div>

                    <div className="h-24 bg-gradient-to-r from-gray-50 to-gray-100 relative border-b border-gray-100">
                       {/* Decorative Pattern or Content */}
                    </div>
                    
                    <div className="px-6 pb-6 pt-16 relative">
                       {/* Avatar - Lifted up to overlap banner */}
                       <div className="w-20 h-20 rounded-2xl bg-white p-1 absolute -top-10 left-6 shadow-md shadow-gray-200">
                          <div className="w-full h-full rounded-xl bg-brand-navy text-white flex items-center justify-center text-2xl font-bold">
                             {(emp.firstName?.[0] || '') + (emp.lastName?.[0] || '')}
                          </div>
                       </div>
                       
                       {/* Spacer for Avatar */}
                       <div className="mb-4">
                          <Link href={`/${params?.tenant_slug}/dashboard/employees/${emp.id}`} className="block hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-cyan rounded-md">
                             <h3 className="font-bold text-gray-900 text-xl leading-tight group-hover:text-brand-navy transition-colors truncate pr-2" title={`${emp.firstName} ${emp.lastName}`}>
                               {emp.firstName} {emp.lastName}
                             </h3>
                          </Link>
                          <p className="text-brand-cyan font-medium text-sm mt-1 truncate">{emp.position || emp.user?.role}</p>
                       </div>
                       
                       <div className="space-y-3 mb-6 pt-4 border-t border-gray-50">
                          <div className="flex items-center text-sm text-gray-500">
                             <Mail className="w-4 h-4 mr-3 text-gray-400 shrink-0" />
                             <span className="truncate" title={emp.user?.email}>{emp.user?.email}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                             <Briefcase className="w-4 h-4 mr-3 text-gray-400 shrink-0" />
                             <span className="truncate" title={emp.department || 'No Dept'}>{emp.department || 'No Dept'}</span>
                          </div>
                       </div>

                       <div className="flex gap-2">
                        <Link href={`/${params?.tenant_slug}/dashboard/employees/${emp.id}`} className="flex-1">
                            <Button variant="secondary" className="w-full h-9 text-xs">
                              <Edit className="w-3.5 h-3.5 mr-1.5" /> Edit
                            </Button>
                          </Link>
                          <Button 
                            variant="danger" 
                            className="flex-1 h-9 text-xs bg-red-50 text-red-600 hover:bg-red-100 border-red-100 shadow-sm"
                            onClick={() => handleDelete(emp.id)}
                          >
                            <Trash2 className="w-3.5 h-3.5 mr-1.5" /> Delete
                          </Button>
                       </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <Card className="border border-gray-100 shadow-sm overflow-hidden">
               <div className="overflow-x-auto">
                 <EmployeeTable 
                    employees={employees} 
                    onDelete={handleDelete} 
                    onRestore={restoreEmployee}
                  />
               </div>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
