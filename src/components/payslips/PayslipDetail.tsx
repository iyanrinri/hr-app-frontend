'use client';

import React from 'react';
import { Payslip } from '@/types/payslip';
import { formatCurrency, terbilang } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Printer, Download, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface PayslipDetailProps {
  payslip: Payslip;
  isAdmin?: boolean;
  onDelete?: () => void;
}

export default function PayslipDetail({ payslip, isAdmin, onDelete }: PayslipDetailProps) {
  const [isTaxDetailsOpen, setIsTaxDetailsOpen] = useState(false);
  const [isCompanyDetailsOpen, setIsCompanyDetailsOpen] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto print:shadow-none print:max-w-none">
      {/* Header Actions */}
      <div className="bg-gray-50 px-6 py-4 flex justify-between items-center border-b border-gray-200 print:hidden">
        <h1 className="text-xl font-bold text-gray-800">Payslip Detail</h1>
        <div className="flex space-x-2">
          {isAdmin && onDelete && (
             <Button variant="danger" onClick={onDelete}>
               <Trash2 className="w-4 h-4 mr-2" />
               Delete
             </Button>
          )}
          <Button variant="secondary" onClick={handlePrint}>
            <Printer className="w-4 h-4 mr-2" />
            Print
          </Button>
          {/* Download PDF usually requires backend generation or client-side library like react-pdf. 
              For now, print to PDF is the standard fallback. */}
          <Button variant="secondary" onClick={handlePrint}>
             <Download className="w-4 h-4 mr-2" />
             Download PDF
          </Button>
        </div>
      </div>

      <div className="p-8 print:p-0">
        {/* Slip Header */}
        <div className="text-center mb-8 border-b-2 border-gray-800 pb-4">
          <h2 className="text-2xl font-bold uppercase tracking-wide">Slip Gaji / Payslip</h2>
          <p className="text-gray-600">Company Name Inc.</p>
          <div className="mt-2 text-sm text-gray-500">
             Periode: {new Date(payslip.payroll.periodStart).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
          </div>
          <div className="text-xs text-gray-400 mt-1">
             Generated: {new Date(payslip.generatedAt).toLocaleString()}
          </div>
        </div>

        {/* Employee Info */}
        <div className="grid grid-cols-2 gap-4 mb-8">
            <div>
                <table className="w-full text-sm">
                    <tbody>
                        <tr>
                            <td className="text-gray-500 py-1" width="100">Name</td>
                            <td className="font-semibold">: {payslip.payroll.employee?.firstName} {payslip.payroll.employee?.lastName}</td>
                        </tr>
                        <tr>
                            <td className="text-gray-500 py-1">Position</td>
                            <td className="font-semibold">: {payslip.payroll.employee?.position || '-'}</td>
                        </tr>
                        <tr>
                            <td className="text-gray-500 py-1">Department</td>
                            <td className="font-semibold">: {payslip.payroll.employee?.department || '-'}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                 <table className="w-full text-sm">
                    <tbody>
                        <tr>
                            <td className="text-gray-500 py-1" width="100">Status PTKP</td>
                            <td className="font-semibold">: {payslip.taxCalculationDetails?.ptkpCategory || '-'}</td>
                        </tr>
                        <tr>
                            <td className="text-gray-500 py-1">Payment Date</td>
                            <td className="font-semibold">: {payslip.payroll.processedAt ? new Date(payslip.payroll.processedAt).toLocaleDateString() : '-'}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Income */}
            <div>
                <h3 className="text-sm font-bold uppercase text-gray-500 mb-3 border-b border-gray-200 pb-1">Penghasilan / Income</h3>
                <table className="w-full text-sm">
                    <tbody>
                        <tr>
                            <td className="py-1">Gaji Pokok</td>
                            <td className="text-right font-medium">{formatCurrency(payslip.payroll.baseSalary)}</td>
                        </tr>
                         <tr>
                            <td className="py-1">Lembur {payslip.payroll.overtimeHours ? `(${payslip.payroll.overtimeHours} jam)` : ''}</td>
                            <td className="text-right font-medium">{formatCurrency(payslip.overtimePay)}</td>
                        </tr>
                        <tr>
                            <td className="py-1">Allowance / Tunjangan</td>
                            <td className="text-right font-medium">{formatCurrency(payslip.allowances)}</td>
                        </tr>
                        <tr>
                            <td className="py-1">Bonus</td>
                            <td className="text-right font-medium">{formatCurrency(payslip.bonuses)}</td>
                        </tr>
                        <tr className="border-t border-gray-300 font-bold mt-2">
                            <td className="pt-2">Total Penghasilan Kotor</td>
                            <td className="text-right pt-2">{formatCurrency(payslip.totalGross)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Deductions */}
            <div>
                <h3 className="text-sm font-bold uppercase text-gray-500 mb-3 border-b border-gray-200 pb-1">Potongan / Deductions</h3>
                <table className="w-full text-sm">
                    <tbody>
                        {payslip.deductions?.map((deduction) => (
                             <tr key={deduction.id}>
                                <td className="py-1">{deduction.description}</td>
                                <td className="text-right font-medium text-red-600">({formatCurrency(deduction.amount)})</td>
                             </tr>
                        ))}
                         <tr className="border-t border-gray-300 font-bold mt-2">
                            <td className="pt-2">Total Potongan</td>
                            <td className="text-right pt-2 text-red-600">({formatCurrency(payslip.totalDeductions)})</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        {/* Take Home Pay */}
        <div className="bg-brand-navy/5 p-6 rounded-lg text-center mb-8 print:border print:border-gray-300">
             <h3 className="text-sm font-bold uppercase text-gray-500 mb-2">Gaji Bersih / Net Salary</h3>
             <p className="text-3xl font-bold text-brand-navy mb-2">{formatCurrency(payslip.takeHomePay)}</p>
             <p className="text-sm italic text-gray-600 capitalize">&quot;{terbilang(Number(payslip.takeHomePay))} Rupiah&quot;</p>
        </div>

        {/* Collapsible Details */}
        <div className="space-y-4 print:block">
            {/* Tax Calculation Details */}
            {payslip.taxCalculationDetails && (
                <div className="border border-gray-200 rounded-md">
                     <button 
                        onClick={() => setIsTaxDetailsOpen(!isTaxDetailsOpen)}
                        className="w-full px-4 py-2 bg-gray-50 flex justify-between items-center text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors print:hidden"
                     >
                        <span>Detail Perhitungan Pajak</span>
                        {isTaxDetailsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                     </button>
                     {/* Always show in print, toggle in screen */}
                     <div className={`${isTaxDetailsOpen ? 'block' : 'hidden'} print:block px-4 py-3 text-sm`}>
                        <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                             <div className="flex justify-between">
                                <span className="text-gray-500">Kategori PTKP</span>
                                <span>{payslip.taxCalculationDetails.ptkpCategory}</span>
                             </div>
                             <div className="flex justify-between">
                                <span className="text-gray-500">PTKP setahun</span>
                                <span>{formatCurrency(payslip.taxCalculationDetails.ptkp)}</span>
                             </div>
                             <div className="flex justify-between">
                                <span className="text-gray-500">Penghasilan Bruto setahun</span>
                                <span>{formatCurrency(payslip.taxCalculationDetails.annualGross)}</span>
                             </div>
                             <div className="flex justify-between">
                                <span className="text-gray-500">Pengurang (Biaya Jabatan + BPJS)</span>
                                <span>{formatCurrency(payslip.taxCalculationDetails.annualBpjs)}</span>
                             </div>
                             <div className="flex justify-between border-t border-gray-200 pt-1 font-medium bg-yellow-50 px-2 rounded">
                                <span>Penghasilan Kena Pajak (PKP)</span>
                                <span>{formatCurrency(payslip.taxCalculationDetails.annualTaxableIncome)}</span>
                             </div>
                             <div></div>

                             <div className="col-span-2 mt-2">
                                <p className="text-xs text-gray-400 mb-1">Rincian Lapisan Tarif Pajak:</p>
                                {payslip.taxCalculationDetails.taxBreakdown.map((bracket, idx) => (
                                    <div key={idx} className="flex justify-between text-xs text-gray-600 ml-4">
                                        <span>• Lapisan {bracket.bracket} ({bracket.rate * 100}%)</span>
                                        <span>{formatCurrency(bracket.amount)}</span>
                                    </div>
                                ))}
                             </div>
                        </div>
                     </div>
                </div>
            )}

            {/* Company Contributions */}
            <div className="border border-gray-200 rounded-md">
                <button 
                    onClick={() => setIsCompanyDetailsOpen(!isCompanyDetailsOpen)}
                    className="w-full px-4 py-2 bg-gray-50 flex justify-between items-center text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors print:hidden"
                >
                    <span>Kontribusi Perusahaan (Benefit bukan Tunai)</span>
                    {isCompanyDetailsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                <div className={`${isCompanyDetailsOpen ? 'block' : 'hidden'} print:block px-4 py-3 text-sm`}>
                     <table className="w-full">
                        <tbody>
                            <tr>
                                <td className="py-1 text-gray-500">BPJS Kesehatan (4%)</td>
                                <td className="text-right">{formatCurrency(payslip.bpjsKesehatanCompany)}</td>
                            </tr>
                            <tr>
                                <td className="py-1 text-gray-500">BPJS Ketenagakerjaan (JHT 3.7%)</td>
                                <td className="text-right">{formatCurrency(payslip.payroll.baseSalary ? parseFloat(payslip.payroll.baseSalary) * 0.037 : 0)}</td> 
                                {/* Note: Exact breakdown might need to come from API if not strictly 3.7% of base, but estimate ok */}
                            </tr>
                            <tr>
                                <td className="py-1 text-gray-500">BPJS Ketenagakerjaan (Lainnya)</td>
                                <td className="text-right">{formatCurrency(parseFloat(payslip.bpjsKetenagakerjaanCompany) - (parseFloat(payslip.payroll.baseSalary) * 0.037))}</td>
                            </tr>
                             <tr className="border-t border-gray-200 font-medium">
                                <td className="pt-2">Total Contribution</td>
                                <td className="text-right pt-2">{formatCurrency(parseFloat(payslip.bpjsKesehatanCompany) + parseFloat(payslip.bpjsKetenagakerjaanCompany))}</td>
                            </tr>
                        </tbody>
                     </table>
                </div>
            </div>
        </div>

        {/* Footer for Print */}
        <div className="hidden print:flex mt-12 justify-between px-12 text-center text-sm">
             <div>
                <p className="mb-16">Diterima Ole,</p>
                <p className="font-bold underline">{payslip.payroll.employee?.firstName} {payslip.payroll.employee?.lastName}</p>
                <p>Employee</p>
             </div>
             <div>
                <p className="mb-16">Disetujui Oleh,</p>
                <p className="font-bold underline">HR Manager</p>
                <p>Human Resources</p>
             </div>
        </div>
      </div>
    </div>
  );
}
