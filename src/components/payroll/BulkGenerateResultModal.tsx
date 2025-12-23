'use client';

import React from 'react';
import { FailedPayrollGeneration } from '@/types/payroll';
import { X, CheckCircle, AlertCircle, Download } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface BulkGenerateResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  generated: number;
  failed: FailedPayrollGeneration[];
}

export default function BulkGenerateResultModal({
  isOpen,
  onClose,
  generated,
  failed
}: BulkGenerateResultModalProps) {
  if (!isOpen) return null;

  const totalAttempted = generated + failed.length;
  const isFullSuccess = failed.length === 0;
  const isPartialSuccess = generated > 0 && failed.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl my-8">
        {/* Header */}
        <div className={`px-6 py-5 border-b border-gray-200 ${
          isFullSuccess 
            ? 'bg-gradient-to-r from-green-600 to-green-500' 
            : isPartialSuccess
            ? 'bg-gradient-to-r from-yellow-600 to-orange-500'
            : 'bg-gradient-to-r from-red-600 to-red-500'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isFullSuccess ? (
                <CheckCircle className="w-8 h-8 text-white" />
              ) : (
                <AlertCircle className="w-8 h-8 text-white" />
              )}
              <div>
                <h3 className="text-xl font-bold text-white">
                  {isFullSuccess ? '✅ Bulk Generate Complete' : '⚠️ Bulk Generate Completed with Issues'}
                </h3>
                <p className="text-sm text-white/80 mt-1">
                  {totalAttempted} payroll{totalAttempted !== 1 ? 's' : ''} processed
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <div className="flex items-center gap-2 text-green-700 mb-2">
                <CheckCircle className="w-5 h-5" />
                <span className="text-sm font-medium">Successfully Generated</span>
              </div>
              <p className="text-3xl font-bold text-green-900">{generated}</p>
            </div>

            <div className="bg-red-50 rounded-lg p-4 border border-red-200">
              <div className="flex items-center gap-2 text-red-700 mb-2">
                <AlertCircle className="w-5 h-5" />
                <span className="text-sm font-medium">Failed to Generate</span>
              </div>
              <p className="text-3xl font-bold text-red-900">{failed.length}</p>
            </div>
          </div>

          {/* Failed Employees List */}
          {failed.length > 0 && (
            <div>
              <label className="text-sm font-medium text-gray-700 mb-3 block">
                Failed Employees:
              </label>
              <div className="bg-red-50 rounded-lg border border-red-200 max-h-64 overflow-y-auto">
                <ul className="divide-y divide-red-200">
                  {failed.map((item, index) => (
                    <li key={index} className="p-4">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="font-medium text-red-900">
                            {item.employeeName || `Employee ID: ${item.employeeId}`}
                          </p>
                          <p className="text-sm text-red-700 mt-1">
                            Reason: {item.reason}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Success Message */}
          {isFullSuccess && (
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <p className="text-green-900 text-center">
                🎉 All payrolls were generated successfully! The payroll table has been refreshed.
              </p>
            </div>
          )}

          {/* Partial Success Message */}
          {isPartialSuccess && (
            <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
              <p className="text-yellow-900 text-center">
                ⚠️ Some payrolls were generated successfully, but {failed.length} failed. 
                Please review the failed items above and retry if needed.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
          {failed.length > 0 && (
            <Button variant="secondary" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download Report
            </Button>
          )}
          <Button onClick={onClose} className="bg-brand-cyan hover:bg-brand-cyan/90">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
