import React, { useState, useEffect, useMemo } from 'react';
import { useAllEmployees, Employee } from '@/hooks/useEmployees';
import { useOvertimeRequests } from '@/hooks/useOvertime';
import { OvertimeStatus } from '@/types/overtime';
import { CreatePayrollRequest } from '@/types/payroll';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { formatCurrency } from '@/lib/utils';
import { User, Calendar, DollarSign, Calculator, Clock } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface CreatePayrollFormProps {
  onSubmit: (data: CreatePayrollRequest) => Promise<void>;
  isSubmitting?: boolean;
}

// Helper function to get first and last day of current month
const getCurrentMonthDates = () => {
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  
  // Format to YYYY-MM-DD for input[type="date"]
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  return {
    start: formatDate(firstDay),
    end: formatDate(lastDay)
  };
};

export default function CreatePayrollForm({ onSubmit, isSubmitting }: CreatePayrollFormProps) {
  const currentMonth = getCurrentMonthDates();
  
  const [employeeId, setEmployeeId] = useState<string>('');
  const [periodStart, setPeriodStart] = useState<string>(currentMonth.start);
  const [periodEnd, setPeriodEnd] = useState<string>(currentMonth.end);
  const [deductions, setDeductions] = useState<string>('0');
  const [bonuses, setBonuses] = useState<string>('0');
  const [selectedOvertimeIds, setSelectedOvertimeIds] = useState<string[]>([]);

  // Fetch all employees for dropdown
  const { data: employees = [], isLoading: isLoadingEmployees } = useAllEmployees();

  // Fetch approved overtime requests based on selection
  const { data: overtimeResponse, isLoading: isLoadingOvertime } = useOvertimeRequests(
    employeeId && periodStart && periodEnd
      ? {
          employeeId: employeeId,
          startDate: periodStart,
          endDate: periodEnd,
          status: OvertimeStatus.APPROVED,
          take: 100 // Fetch up to 100 records
        }
      : undefined
  );

  const overtimeRequests = useMemo(() => overtimeResponse?.requests || [], [overtimeResponse]);

  // Get selected employee details
  const selectedEmployee = useMemo(() => 
    employees.find((e: Employee) => e.id.toString() === employeeId),
  [employees, employeeId]);

  // Auto-select new overtime requests when they load
  useEffect(() => {
    if (overtimeRequests.length > 0) {
      const ids = overtimeRequests.map(req => req.id);
      setSelectedOvertimeIds(ids);
    } else {
      setSelectedOvertimeIds([]);
    }
  }, [overtimeRequests]);

  // Calculations
  const baseSalary = selectedEmployee?.baseSalary || 0;
  
  const overtimePay = useMemo(() => {
    return overtimeRequests
      .filter(req => selectedOvertimeIds.includes(req.id))
      .reduce((total, req) => {
        // Use calculatedAmount if available, otherwise 0 
        // Need to ensure backend sends this or we calculate frontend side if needed.
        // Assuming backend sends `calculatedAmount` as string/number in response
        return total + (Number(req.calculatedAmount) || 0);
      }, 0);
  }, [overtimeRequests, selectedOvertimeIds]);

  const grossSalary = baseSalary + overtimePay + Number(bonuses);
  const netSalary = grossSalary - Number(deductions);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!employeeId || !periodStart || !periodEnd) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (new Date(periodStart) > new Date(periodEnd)) {
      toast.error('Period start date must be before end date');
      return;
    }

    await onSubmit({
      employeeId,
      periodStart: new Date(periodStart).toISOString(), // Ensure proper format
      periodEnd: new Date(periodEnd).toISOString(),
      deductions,
      bonuses,
      overtimeRequestIds: selectedOvertimeIds
    });
  };

  const handleOvertimeToggle = (id: string) => {
    setSelectedOvertimeIds(prev => 
      prev.includes(id) ? prev.filter(oid => oid !== id) : [...prev, id]
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Employee Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <User className="mr-2 h-5 w-5 text-gray-500" />
              Employee Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Select Employee</label>
              <select
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-cyan focus:border-brand-cyan"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                disabled={isLoadingEmployees}
              >
                <option value="">-- Select Employee --</option>
                {employees.map((emp: Employee) => (
                  <option key={emp.id} value={emp.id}>
                    {emp.firstName} {emp.lastName} ({emp.position})
                  </option>
                ))}
              </select>
            </div>
            
            {selectedEmployee && (
              <div className="bg-gray-50 p-4 rounded-md space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Department:</span>
                  <span className="font-medium">{selectedEmployee.department}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Base Salary:</span>
                  <span className="font-medium">{formatCurrency(selectedEmployee.baseSalary)}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Period Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Calendar className="mr-2 h-5 w-5 text-gray-500" />
              Payroll Period
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="date"
              label="Period Start"
              value={periodStart}
              onChange={(e) => setPeriodStart(e.target.value)}
              required
            />
            <Input
              type="date"
              label="Period End"
              value={periodEnd}
              min={periodStart}
              onChange={(e) => setPeriodEnd(e.target.value)}
              required
            />
          </CardContent>
        </Card>

        {/* Financials */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <DollarSign className="mr-2 h-5 w-5 text-gray-500" />
              Adjustments
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="number"
              label="Bonuses"
              value={bonuses}
              onChange={(e) => setBonuses(e.target.value)}
              min="0"
              icon={<span className="text-gray-500 text-sm">Rp</span>}
            />
            <Input
              type="number"
              label="Deductions"
              value={deductions}
              onChange={(e) => setDeductions(e.target.value)}
              min="0"
              icon={<span className="text-gray-500 text-sm">Rp</span>}
            />
          </CardContent>
        </Card>

        {/* Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Calculator className="mr-2 h-5 w-5 text-gray-500" />
              Calculated Salary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Base Salary:</span>
              <span>{formatCurrency(baseSalary)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Overtime Pay:</span>
              <span>{formatCurrency(overtimePay)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Bonuses:</span>
              <span className="text-green-600">+ {formatCurrency(bonuses)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Deductions:</span>
              <span className="text-red-600">- {formatCurrency(deductions)}</span>
            </div>
            <div className="border-t pt-3 mt-2">
              <div className="flex justify-between font-bold text-lg">
                <span>Net Salary:</span>
                <span className="text-brand-cyan">{formatCurrency(netSalary)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Overtime Requests Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Clock className="mr-2 h-5 w-5 text-gray-500" />
            Approved Overtime Requests
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoadingOvertime ? (
            <div className="text-center py-4 text-gray-500">Loading overtime requests...</div>
          ) : overtimeRequests.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              {employeeId && periodStart && periodEnd 
                ? 'No approved overtime requests found for this period.' 
                : 'Select Employee and Period to view overtime requests.'}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Include</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Hours</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Reason</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {overtimeRequests.map((req) => (
                    <tr key={req.id} className="hover:bg-gray-50">
                      <td className="px-4 py-2">
                        <input
                          type="checkbox"
                          checked={selectedOvertimeIds.includes(req.id)}
                          onChange={() => handleOvertimeToggle(req.id)}
                          className="h-4 w-4 text-brand-cyan focus:ring-brand-cyan border-gray-300 rounded"
                        />
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-900">
                        {new Date(req.date).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-900">
                        {req.totalMinutes / 60} hrs
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-900">
                        {formatCurrency(req.calculatedAmount || 0)}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-500 truncate max-w-xs">
                        {req.reason}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button 
          type="button" 
          variant="secondary" 
          onClick={() => window.history.back()}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          disabled={isSubmitting || !employeeId}
          className="bg-brand-cyan hover:bg-brand-cyan/90 text-white"
        >
          {isSubmitting ? 'Creating Payroll...' : 'Create Payroll'}
        </Button>
      </div>
    </form>
  );
}
