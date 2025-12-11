'use client';

import { useLeavePeriods, useDeleteLeavePeriod } from '@/hooks/useLeave';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Plus, Edit, Trash, Check, X } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

export default function LeavePeriodsPage() {
  const { data: response, isLoading } = useLeavePeriods();
  const { mutate: deletePeriod } = useDeleteLeavePeriod();

  const periods = response?.data || [];

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this leave period?')) {
      deletePeriod(id);
    }
  };

  if (isLoading) return <div className="p-8 text-center">Loading leave periods...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Leave Configuration</h2>
          <p className="text-sm text-gray-500">Manage leave periods and entitlements</p>
        </div>
        <Link href="/dashboard/leaves/periods/create">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Period
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Leave Periods</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 font-medium text-gray-500">Name</th>
                  <th className="px-4 py-3 font-medium text-gray-500">Start Date</th>
                  <th className="px-4 py-3 font-medium text-gray-500">End Date</th>
                  <th className="px-4 py-3 font-medium text-gray-500">Status</th>
                  <th className="px-4 py-3 font-medium text-gray-500">Description</th>
                  <th className="px-4 py-3 font-medium text-right text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {periods.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-6 text-center text-gray-500 italic">
                      No leave periods found.
                    </td>
                  </tr>
                ) : (
                  periods.map((period) => (
                    <tr key={period.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">{period.name}</td>
                      <td className="px-4 py-3 text-gray-600">{format(new Date(period.startDate), 'MMM dd, yyyy')}</td>
                      <td className="px-4 py-3 text-gray-600">{format(new Date(period.endDate), 'MMM dd, yyyy')}</td>
                      <td className="px-4 py-3">
                        {period.isActive ? (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                            <Check className="w-3 h-3 mr-1" /> Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                            <X className="w-3 h-3 mr-1" /> Inactive
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-gray-500 truncate max-w-[200px]">{period.description}</td>
                      <td className="px-4 py-3 text-right space-x-2">
                        <Link href={`/dashboard/leaves/periods/${period.id}`}>
                          <Button variant="secondary" className="h-8 px-2">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button 
                          variant="danger" 
                          className="h-8 px-2"
                          onClick={() => handleDelete(period.id)}
                        >
                          <Trash className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
