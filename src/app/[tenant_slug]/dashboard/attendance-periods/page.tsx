'use client';

import { useAttendancePeriods, useDeleteAttendancePeriod } from '@/hooks/useAttendancePeriods';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Link from 'next/link';
import { Plus, Search, Filter, Eye, Edit, Trash2, CheckCircle, XCircle, Calendar } from 'lucide-react';
import { useState } from 'react';
import { AttendancePeriod } from '@/hooks/useAttendancePeriods';

export default function AttendancePeriodsPage() {
  // Filter inputs (not yet applied)
  const [searchInput, setSearchInput] = useState('');
  const [isActiveInput, setIsActiveInput] = useState('');
  
  // Applied filters (used in API query)
  const [searchQuery, setSearchQuery] = useState('');
  const [isActiveQuery, setIsActiveQuery] = useState('');
  
  const { data: response, isLoading, error } = useAttendancePeriods(1, 10, searchQuery, isActiveQuery);
  const { mutate: deletePeriod } = useDeleteAttendancePeriod();

  const [viewPeriod, setViewPeriod] = useState<AttendancePeriod | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const handleApplyFilters = () => {
    setSearchQuery(searchInput);
    setIsActiveQuery(isActiveInput);
  };

  const handleResetFilters = () => {
    setSearchInput('');
    setIsActiveInput('');
    setSearchQuery('');
    setIsActiveQuery('');
  };

  const handleDelete = () => {
    if (deleteConfirm) {
      deletePeriod(deleteConfirm);
      setDeleteConfirm(null);
    }
  };

  if (error) return <div className="p-6 text-center text-red-600">Error loading attendance periods</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Attendance Periods</h2>
        <Link href="/dashboard/attendance-periods/create">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Period
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
                placeholder="Search by name or year..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-brand-cyan focus:border-brand-cyan bg-white text-black"
              />
            </div>
            <div className="relative">
              <select
                value={isActiveInput}
                onChange={(e) => setIsActiveInput(e.target.value)}
                className="w-full appearance-none px-4 py-2 pr-10 border border-gray-600 rounded-md focus:outline-none focus:ring-brand-cyan focus:border-brand-cyan bg-white text-black cursor-pointer"
              >
                <option value="">All Status</option>
                <option value="true">Active Only</option>
                <option value="false">Inactive Only</option>
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
          <CardTitle>All Periods</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-navy mb-4"></div>
              <p className="text-gray-600">Loading attendance periods...</p>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Range</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Working Days/Hours</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Holidays</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {response?.data.map((period) => (
                  <tr key={period.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {period.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(period.startDate).toLocaleDateString()} - {new Date(period.endDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {period.workingDaysPerWeek} days / {period.workingHoursPerDay} hours
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {period.holidays?.length || 0} holidays
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        period.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {period.isActive ? (
                          <><CheckCircle className="w-3 h-3 mr-1" /> Active</>
                        ) : (
                          <><XCircle className="w-3 h-3 mr-1" /> Inactive</>
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Button 
                          variant="secondary" 
                          className="p-2" 
                          onClick={() => setViewPeriod(period)}
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Link href={`/dashboard/attendance-periods/${period.id}`}>
                          <Button variant="secondary" className="p-2" title="Edit Period">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button 
                          variant="danger" 
                          className="p-2" 
                          onClick={() => setDeleteConfirm(period.id)}
                          title="Delete Period"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>

      {/* Calendar Timeline View */}
      <Card>
        <CardHeader>
          <CardTitle>Period Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-navy mb-4"></div>
              <p className="text-gray-600">Loading timeline...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Active Period Info */}
              {response?.data.find(p => p.isActive) && (
                <div className="p-4 bg-brand-light border-l-4 border-brand-navy rounded">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-brand-navy mr-2" />
                    <div>
                      <p className="font-bold text-brand-navy">
                        Active Period: {response.data.find(p => p.isActive)?.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {new Date(response.data.find(p => p.isActive)!.startDate).toLocaleDateString('en-US', { 
                          month: 'long', day: 'numeric', year: 'numeric' 
                        })} - {new Date(response.data.find(p => p.isActive)!.endDate).toLocaleDateString('en-US', { 
                          month: 'long', day: 'numeric', year: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Timeline */}
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-200"></div>
                <div className="space-y-6 ml-6">
                  {response?.data.map((period) => {
                    const startDate = new Date(period.startDate);
                    const endDate = new Date(period.endDate);
                    const today = new Date();
                    const isOngoing = today >= startDate && today <= endDate;
                    const isPast = today > endDate;
                    const isFuture = today < startDate;

                    return (
                      <div key={period.id} className="relative">
                        <div className={`absolute -left-7-5 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 ${
                          period.isActive 
                            ? 'bg-brand-navy border-brand-navy' 
                            : isPast 
                            ? 'bg-gray-300 border-gray-400'
                            : 'bg-white border-brand-cyan'
                        }`}></div>
                        <div className={`p-4 rounded-lg border-2 ${
                          period.isActive 
                            ? 'border-brand-navy bg-brand-light' 
                            : 'border-gray-200 bg-white'
                        }`}>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h4 className={`font-bold ${
                                  period.isActive ? 'text-brand-navy' : 'text-gray-900'
                                }`}>
                                  {period.name}
                                </h4>
                                {period.isActive && (
                                  <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                                    Active
                                  </span>
                                )}
                                {isOngoing && !period.isActive && (
                                  <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                                    Ongoing
                                  </span>
                                )}
                                {isPast && (
                                  <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                                    Past
                                  </span>
                                )}
                                {isFuture && (
                                  <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                    Upcoming
                                  </span>
                                )}
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                <div>
                                  <p className="text-gray-500">Duration</p>
                                  <p className="font-medium text-gray-900">
                                    {startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-gray-500">Working Schedule</p>
                                  <p className="font-medium text-gray-900">
                                    {period.workingDaysPerWeek} days/week, {period.workingHoursPerDay} hrs/day
                                  </p>
                                </div>
                                <div>
                                  <p className="text-gray-500">Holidays</p>
                                  <p className="font-medium text-gray-900">
                                    {period.holidays?.length || 0} configured
                                  </p>
                                </div>
                              </div>
                              {period.description && (
                                <p className="mt-2 text-sm text-gray-600">{period.description}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {(!response?.data || response.data.length === 0) && (
                <div className="text-center py-12 text-gray-500">
                  No attendance periods configured yet
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Period Modal */}
      {viewPeriod && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Period Details</h3>
              <button
                onClick={() => setViewPeriod(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <XCircle className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Name</label>
                  <p className="text-gray-900">{viewPeriod.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Status</label>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    viewPeriod.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {viewPeriod.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Start Date</label>
                  <p className="text-gray-900">{new Date(viewPeriod.startDate).toLocaleDateString('en-US', { 
                    year: 'numeric', month: 'long', day: 'numeric' 
                  })}</p>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">End Date</label>
                  <p className="text-gray-900">{new Date(viewPeriod.endDate).toLocaleDateString('en-US', { 
                    year: 'numeric', month: 'long', day: 'numeric' 
                  })}</p>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Working Days Per Week</label>
                  <p className="text-gray-900">{viewPeriod.workingDaysPerWeek} days</p>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Working Hours Per Day</label>
                  <p className="text-gray-900">{viewPeriod.workingHoursPerDay} hours</p>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-1">Description</label>
                  <p className="text-gray-900">{viewPeriod.description || '-'}</p>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Holidays</label>
                  <p className="text-gray-900">{viewPeriod.holidays?.length || 0} holidays configured</p>
                </div>
              </div>
            </div>
            <div className="sticky bottom-0 bg-gray-50 px-6 py-4 border-t border-gray-200">
              <Button onClick={() => setViewPeriod(null)} variant="secondary" className="w-full">
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Attendance Period</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this attendance period? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <Button variant="secondary" onClick={() => setDeleteConfirm(null)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
