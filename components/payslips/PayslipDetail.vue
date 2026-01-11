<script setup lang="ts">
import { ref, computed } from 'vue'
import { formatCurrency as formatIDR, terbilang as terbilangFallback } from '@/utils'
import { Printer, Download, Trash2, ChevronDown, ChevronUp } from 'lucide-vue-next'
import type { Payslip } from '@/types/payslip'

const props = defineProps<{
  payslip: Payslip
  isAdmin?: boolean
}>()

const emit = defineEmits<{
  (e: 'delete'): void
}>()

const isTaxDetailsOpen = ref(false)
const isCompanyDetailsOpen = ref(false)



// Calculate totalGross if not provided
const totalGross = computed(() => props.payslip.totalGross || 
    (parseFloat(props.payslip.grossSalary || '0') + 
     parseFloat(props.payslip.overtimePay || '0') + 
     parseFloat(props.payslip.bonuses || '0') + 
     parseFloat(props.payslip.allowances || '0')).toString()
)

// Calculate totalDeductions if not provided
const totalDeductions = computed(() => props.payslip.totalDeductions ||
    props.payslip.deductions?.reduce((sum, d) => sum + parseFloat(String(d.amount) || '0'), 0).toString() ||
    (parseFloat(props.payslip.taxAmount || '0') + 
     parseFloat(props.payslip.bpjsKesehatanEmployee || '0') + 
     parseFloat(props.payslip.bpjsKetenagakerjaanEmployee || '0') + 
     parseFloat(props.payslip.otherDeductions || '0')).toString()
)

const handlePrint = () => {
    window.print()
}



</script>

<template>
    <div>
        <!-- Print Styles -->
        <component :is="'style'">
        @media print {
          body * {
            visibility: hidden;
          }
          #payslip-content,
          #payslip-content * {
            visibility: visible;
          }
          #payslip-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
        </component>

        <div id="payslip-content" class="bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto print:shadow-none print:max-w-none">
            <!-- Header Actions -->
            <div class="bg-gray-50 px-6 py-4 flex justify-between items-center border-b border-gray-200 print:hidden">
                <h1 class="text-xl font-bold text-gray-800">Payslip Detail</h1>
                <div class="flex space-x-2">
                    <button v-if="isAdmin" @click="$emit('delete')" class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                        <Trash2 class="w-4 h-4 mr-2" />
                        Delete
                    </button>
                    <button @click="handlePrint" class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-navy">
                        <Printer class="w-4 h-4 mr-2" />
                        Print
                    </button>
                    <button @click="handlePrint" class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-navy">
                        <Download class="w-4 h-4 mr-2" />
                        Download PDF
                    </button>
                </div>
            </div>

            <div class="p-8 print:p-0">
                <!-- Slip Header -->
                <div class="text-center mb-8 border-b-2 border-gray-800 pb-4">
                    <h2 class="text-2xl font-bold uppercase tracking-wide">Slip Gaji / Payslip</h2>
                    <p class="text-gray-600">Company Name Inc.</p>
                    <div class="mt-2 text-sm text-gray-500">
                        Periode: {{ payslip.payroll?.periodStart 
                        ? new Date(payslip.payroll.periodStart).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })
                        : 'N/A'
                        }}
                    </div>
                    <div class="text-xs text-gray-400 mt-1">
                        Generated: {{ new Date(payslip.generatedAt).toLocaleString() }}
                    </div>
                </div>

                <!-- Employee Info -->
                <div class="grid grid-cols-2 gap-4 mb-8">
                    <div>
                        <table class="w-full text-sm">
                            <tbody>
                                <tr>
                                    <td class="text-gray-500 py-1" width="100">Name</td>
                                    <td class="font-semibold">: {{ payslip.payroll?.employee?.firstName || '-' }} {{ payslip.payroll?.employee?.lastName || '' }}</td>
                                </tr>
                                <tr>
                                    <td class="text-gray-500 py-1">Position</td>
                                    <td class="font-semibold">: {{ payslip.payroll?.employee?.position || '-' }}</td>
                                </tr>
                                <tr>
                                    <td class="text-gray-500 py-1">Department</td>
                                    <td class="font-semibold">: {{ payslip.payroll?.employee?.department || '-' }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <table class="w-full text-sm">
                            <tbody>
                                <tr>
                                    <td class="text-gray-500 py-1" width="100">Status PTKP</td>
                                    <td class="font-semibold">: {{ payslip.taxCalculationDetails?.ptkpCategory || '-' }}</td>
                                </tr>
                                <tr>
                                    <td class="text-gray-500 py-1">Payment Date</td>
                                    <td class="font-semibold">: {{ payslip.payroll?.processedAt ? new Date(payslip.payroll.processedAt).toLocaleDateString() : '-' }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <!-- Income -->
                    <div>
                        <h3 class="text-sm font-bold uppercase text-gray-500 mb-3 border-b border-gray-200 pb-1">Penghasilan / Income</h3>
                        <table class="w-full text-sm">
                            <tbody>
                                <tr>
                                    <td class="py-1">Gaji Pokok</td>
                                    <td class="text-right font-medium">{{ formatIDR(payslip.grossSalary) }}</td>
                                </tr>
                                <tr>
                                    <td class="py-1">Lembur {{ payslip.payroll?.overtimeHours ? `(${payslip.payroll.overtimeHours} jam)` : '' }}</td>
                                    <td class="text-right font-medium">{{ formatIDR(payslip.overtimePay) }}</td>
                                </tr>
                                <tr>
                                    <td class="py-1">Allowance / Tunjangan</td>
                                    <td class="text-right font-medium">{{ formatIDR(payslip.allowances) }}</td>
                                </tr>
                                <tr>
                                    <td class="py-1">Bonus</td>
                                    <td class="text-right font-medium">{{ formatIDR(payslip.bonuses) }}</td>
                                </tr>
                                <tr class="border-t border-gray-300 font-bold mt-2">
                                    <td class="pt-2">Total Penghasilan Kotor</td>
                                    <td class="text-right pt-2">{{ formatIDR(totalGross) }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- Deductions -->
                    <div>
                        <h3 class="text-sm font-bold uppercase text-gray-500 mb-3 border-b border-gray-200 pb-1">Potongan / Deductions</h3>
                        <table class="w-full text-sm">
                            <tbody>
                                <tr v-for="deduction in payslip.deductions" :key="deduction.id">
                                    <td class="py-1">{{ deduction.description }}</td>
                                    <td class="text-right font-medium text-red-600">({{ formatIDR(deduction.amount) }})</td>
                                </tr>
                                <tr class="border-t border-gray-300 font-bold mt-2">
                                    <td class="pt-2">Total Potongan</td>
                                    <td class="text-right pt-2 text-red-600">({{ formatIDR(totalDeductions) }})</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Take Home Pay -->
                <div class="bg-brand-navy/5 p-6 rounded-lg text-center mb-8 print:border print:border-gray-300">
                    <h3 class="text-sm font-bold uppercase text-gray-500 mb-2">Gaji Bersih / Net Salary</h3>
                    <p class="text-3xl font-bold text-brand-navy mb-2">{{ formatIDR(payslip.takeHomePay) }}</p>
                    <p class="text-sm italic text-gray-600 capitalize">"{{ terbilangFallback(Number(payslip.takeHomePay)) }}"</p>
                </div>

                <!-- Collapsible Details -->
                <div class="space-y-4 print:block">
                    <!-- Tax Calculation Details -->
                    <div v-if="payslip.taxCalculationDetails" class="border border-gray-200 rounded-md">
                        <button 
                            @click="isTaxDetailsOpen = !isTaxDetailsOpen"
                            class="w-full px-4 py-2 bg-gray-50 flex justify-between items-center text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors print:hidden"
                        >
                            <span>Detail Perhitungan Pajak</span>
                            <component :is="isTaxDetailsOpen ? ChevronUp : ChevronDown" class="w-4 h-4" />
                        </button>
                        <!-- Always show in print, toggle in screen -->
                        <div :class="[isTaxDetailsOpen ? 'block' : 'hidden', 'print:block', 'px-4', 'py-3', 'text-sm']">
                            <div class="grid grid-cols-2 gap-x-8 gap-y-2">
                                <div class="flex justify-between">
                                    <span class="text-gray-500">Kategori PTKP</span>
                                    <span>{{ payslip.taxCalculationDetails.ptkpCategory }}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-gray-500">PTKP setahun</span>
                                    <span>{{ formatIDR(payslip.taxCalculationDetails.ptkp) }}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-gray-500">Penghasilan Bruto setahun</span>
                                    <span>{{ formatIDR((payslip.taxCalculationDetails as any).annualGrossSalary || payslip.taxCalculationDetails.annualGross || 0) }}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-gray-500">Pengurang (Biaya Jabatan + BPJS)</span>
                                    <span>{{ formatIDR((payslip.taxCalculationDetails as any).annualBpjs || 0) }}</span>
                                </div>
                                <div class="flex justify-between border-t border-gray-200 pt-1 font-medium bg-yellow-50 px-2 rounded">
                                    <span>Penghasilan Kena Pajak (PKP)</span>
                                    <span>{{ formatIDR((payslip.taxCalculationDetails as any).taxableIncome || payslip.taxCalculationDetails.annualTaxableIncome || 0) }}</span>
                                </div>
                                <div></div>

                                <div class="col-span-2 mt-2">
                                    <p class="text-xs text-gray-400 mb-1">Rincian Lapisan Tarif Pajak:</p>
                                    <div v-for="(bracket, idx) in payslip.taxCalculationDetails.taxBreakdown" :key="idx" class="flex justify-between text-xs text-gray-600 ml-4">
                                        <span>• Lapisan {{ bracket.bracket }} ({{ bracket.rate * 100 }}%)</span>
                                        <span>{{ formatIDR(bracket.amount) }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Company Contributions -->
                    <div class="border border-gray-200 rounded-md">
                        <button 
                            @click="isCompanyDetailsOpen = !isCompanyDetailsOpen"
                            class="w-full px-4 py-2 bg-gray-50 flex justify-between items-center text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors print:hidden"
                        >
                            <span>Kontribusi Perusahaan (Benefit bukan Tunai)</span>
                            <component :is="isCompanyDetailsOpen ? ChevronUp : ChevronDown" class="w-4 h-4" />
                        </button>
                        <div :class="[isCompanyDetailsOpen ? 'block' : 'hidden', 'print:block', 'px-4', 'py-3', 'text-sm']">
                            <table class="w-full">
                                <tbody>
                                    <tr>
                                        <td class="py-1 text-gray-500">BPJS Kesehatan (4%)</td>
                                        <td class="text-right">{{ formatIDR(payslip.bpjsKesehatanCompany) }}</td>
                                    </tr>
                                    <tr>
                                        <td class="py-1 text-gray-500">BPJS Ketenagakerjaan (JHT 3.7%)</td>
                                        <td class="text-right">{{ formatIDR(parseFloat(payslip.grossSalary || '0') * 0.037) }}</td>
                                    </tr>
                                    <tr>
                                        <td class="py-1 text-gray-500">BPJS Ketenagakerjaan (Lainnya)</td>
                                        <td class="text-right">{{ formatIDR(Math.max(0, parseFloat(payslip.bpjsKetenagakerjaanCompany) - (parseFloat(payslip.grossSalary || '0') * 0.037))) }}</td>
                                    </tr>
                                    <tr class="border-t border-gray-200 font-medium">
                                        <td class="pt-2">Total Contribution</td>
                                        <td class="text-right pt-2">{{ formatIDR(parseFloat(payslip.bpjsKesehatanCompany) + parseFloat(payslip.bpjsKetenagakerjaanCompany)) }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- Footer for Print -->
                <div class="hidden print:flex mt-12 justify-between px-12 text-center text-sm">
                    <div>
                        <p class="mb-16">Diterima Ole,</p>
                        <p class="font-bold underline">{{ payslip.payroll?.employee?.firstName || '-' }} {{ payslip.payroll?.employee?.lastName || '' }}</p>
                        <p>Employee</p>
                    </div>
                    <div>
                        <p class="mb-16">Disetujui Oleh,</p>
                        <p class="font-bold underline">HR Manager</p>
                        <p>Human Resources</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
