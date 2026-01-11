import { defineComponent, ref, computed, createVNode, resolveDynamicComponent, withCtx, createTextVNode, unref, useSSRContext, mergeProps } from "vue";
import { ssrRenderAttrs, ssrRenderVNode, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { c as usePayslip, d as useDeletePayslip } from "./usePayslips-toysh2Fm.js";
import { d as Trash2, a1 as Printer, i as Download, a2 as ChevronUp, j as ChevronDown, u as useRoute, n as useRouter, K as useAuthStore } from "../server.mjs";
import { f as formatCurrency, t as terbilang } from "./index-B7s_3MI_.js";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/hookable/dist/index.mjs";
import "./fetch-VuP8VKdC.js";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/ohash/dist/index.mjs";
import "@vue/shared";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/perfect-debounce/dist/index.mjs";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/radix3/dist/index.mjs";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/defu/dist/defu.mjs";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/ufo/dist/index.mjs";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/klona/dist/index.mjs";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/destr/dist/index.mjs";
import "uuid";
import "clsx";
import "tailwind-merge";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "PayslipDetail",
  __ssrInlineRender: true,
  props: {
    payslip: {},
    isAdmin: { type: Boolean }
  },
  emits: ["delete"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const isTaxDetailsOpen = ref(false);
    const isCompanyDetailsOpen = ref(false);
    const totalGross = computed(
      () => props.payslip.totalGross || (parseFloat(props.payslip.grossSalary || "0") + parseFloat(props.payslip.overtimePay || "0") + parseFloat(props.payslip.bonuses || "0") + parseFloat(props.payslip.allowances || "0")).toString()
    );
    const totalDeductions = computed(
      () => props.payslip.totalDeductions || props.payslip.deductions?.reduce((sum, d) => sum + parseFloat(String(d.amount) || "0"), 0).toString() || (parseFloat(props.payslip.taxAmount || "0") + parseFloat(props.payslip.bpjsKesehatanEmployee || "0") + parseFloat(props.payslip.bpjsKetenagakerjaanEmployee || "0") + parseFloat(props.payslip.otherDeductions || "0")).toString()
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent("style"), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` @media print { body * { visibility: hidden; } #payslip-content, #payslip-content * { visibility: visible; } #payslip-content { position: absolute; left: 0; top: 0; width: 100%; } } `);
          } else {
            return [
              createTextVNode(" @media print { body * { visibility: hidden; } #payslip-content, #payslip-content * { visibility: visible; } #payslip-content { position: absolute; left: 0; top: 0; width: 100%; } } ")
            ];
          }
        }),
        _: 1
      }), _parent);
      _push(`<div id="payslip-content" class="bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto print:shadow-none print:max-w-none"><div class="bg-gray-50 px-6 py-4 flex justify-between items-center border-b border-gray-200 print:hidden"><h1 class="text-xl font-bold text-gray-800">Payslip Detail</h1><div class="flex space-x-2">`);
      if (__props.isAdmin) {
        _push(`<button class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">`);
        _push(ssrRenderComponent(unref(Trash2), { class: "w-4 h-4 mr-2" }, null, _parent));
        _push(` Delete </button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-navy">`);
      _push(ssrRenderComponent(unref(Printer), { class: "w-4 h-4 mr-2" }, null, _parent));
      _push(` Print </button><button class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-navy">`);
      _push(ssrRenderComponent(unref(Download), { class: "w-4 h-4 mr-2" }, null, _parent));
      _push(` Download PDF </button></div></div><div class="p-8 print:p-0"><div class="text-center mb-8 border-b-2 border-gray-800 pb-4"><h2 class="text-2xl font-bold uppercase tracking-wide">Slip Gaji / Payslip</h2><p class="text-gray-600">Company Name Inc.</p><div class="mt-2 text-sm text-gray-500"> Periode: ${ssrInterpolate(__props.payslip.payroll?.periodStart ? new Date(__props.payslip.payroll.periodStart).toLocaleDateString("id-ID", { month: "long", year: "numeric" }) : "N/A")}</div><div class="text-xs text-gray-400 mt-1"> Generated: ${ssrInterpolate(new Date(__props.payslip.generatedAt).toLocaleString())}</div></div><div class="grid grid-cols-2 gap-4 mb-8"><div><table class="w-full text-sm"><tbody><tr><td class="text-gray-500 py-1" width="100">Name</td><td class="font-semibold">: ${ssrInterpolate(__props.payslip.payroll?.employee?.firstName || "-")} ${ssrInterpolate(__props.payslip.payroll?.employee?.lastName || "")}</td></tr><tr><td class="text-gray-500 py-1">Position</td><td class="font-semibold">: ${ssrInterpolate(__props.payslip.payroll?.employee?.position || "-")}</td></tr><tr><td class="text-gray-500 py-1">Department</td><td class="font-semibold">: ${ssrInterpolate(__props.payslip.payroll?.employee?.department || "-")}</td></tr></tbody></table></div><div><table class="w-full text-sm"><tbody><tr><td class="text-gray-500 py-1" width="100">Status PTKP</td><td class="font-semibold">: ${ssrInterpolate(__props.payslip.taxCalculationDetails?.ptkpCategory || "-")}</td></tr><tr><td class="text-gray-500 py-1">Payment Date</td><td class="font-semibold">: ${ssrInterpolate(__props.payslip.payroll?.processedAt ? new Date(__props.payslip.payroll.processedAt).toLocaleDateString() : "-")}</td></tr></tbody></table></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8"><div><h3 class="text-sm font-bold uppercase text-gray-500 mb-3 border-b border-gray-200 pb-1">Penghasilan / Income</h3><table class="w-full text-sm"><tbody><tr><td class="py-1">Gaji Pokok</td><td class="text-right font-medium">${ssrInterpolate(unref(formatCurrency)(__props.payslip.grossSalary))}</td></tr><tr><td class="py-1">Lembur ${ssrInterpolate(__props.payslip.payroll?.overtimeHours ? `(${__props.payslip.payroll.overtimeHours} jam)` : "")}</td><td class="text-right font-medium">${ssrInterpolate(unref(formatCurrency)(__props.payslip.overtimePay))}</td></tr><tr><td class="py-1">Allowance / Tunjangan</td><td class="text-right font-medium">${ssrInterpolate(unref(formatCurrency)(__props.payslip.allowances))}</td></tr><tr><td class="py-1">Bonus</td><td class="text-right font-medium">${ssrInterpolate(unref(formatCurrency)(__props.payslip.bonuses))}</td></tr><tr class="border-t border-gray-300 font-bold mt-2"><td class="pt-2">Total Penghasilan Kotor</td><td class="text-right pt-2">${ssrInterpolate(unref(formatCurrency)(totalGross.value))}</td></tr></tbody></table></div><div><h3 class="text-sm font-bold uppercase text-gray-500 mb-3 border-b border-gray-200 pb-1">Potongan / Deductions</h3><table class="w-full text-sm"><tbody><!--[-->`);
      ssrRenderList(__props.payslip.deductions, (deduction) => {
        _push(`<tr><td class="py-1">${ssrInterpolate(deduction.description)}</td><td class="text-right font-medium text-red-600">(${ssrInterpolate(unref(formatCurrency)(deduction.amount))})</td></tr>`);
      });
      _push(`<!--]--><tr class="border-t border-gray-300 font-bold mt-2"><td class="pt-2">Total Potongan</td><td class="text-right pt-2 text-red-600">(${ssrInterpolate(unref(formatCurrency)(totalDeductions.value))})</td></tr></tbody></table></div></div><div class="bg-brand-navy/5 p-6 rounded-lg text-center mb-8 print:border print:border-gray-300"><h3 class="text-sm font-bold uppercase text-gray-500 mb-2">Gaji Bersih / Net Salary</h3><p class="text-3xl font-bold text-brand-navy mb-2">${ssrInterpolate(unref(formatCurrency)(__props.payslip.takeHomePay))}</p><p class="text-sm italic text-gray-600 capitalize">&quot;${ssrInterpolate(unref(terbilang)(Number(__props.payslip.takeHomePay)))}&quot;</p></div><div class="space-y-4 print:block">`);
      if (__props.payslip.taxCalculationDetails) {
        _push(`<div class="border border-gray-200 rounded-md"><button class="w-full px-4 py-2 bg-gray-50 flex justify-between items-center text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors print:hidden"><span>Detail Perhitungan Pajak</span>`);
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(isTaxDetailsOpen.value ? unref(ChevronUp) : unref(ChevronDown)), { class: "w-4 h-4" }, null), _parent);
        _push(`</button><div class="${ssrRenderClass([isTaxDetailsOpen.value ? "block" : "hidden", "print:block", "px-4", "py-3", "text-sm"])}"><div class="grid grid-cols-2 gap-x-8 gap-y-2"><div class="flex justify-between"><span class="text-gray-500">Kategori PTKP</span><span>${ssrInterpolate(__props.payslip.taxCalculationDetails.ptkpCategory)}</span></div><div class="flex justify-between"><span class="text-gray-500">PTKP setahun</span><span>${ssrInterpolate(unref(formatCurrency)(__props.payslip.taxCalculationDetails.ptkp))}</span></div><div class="flex justify-between"><span class="text-gray-500">Penghasilan Bruto setahun</span><span>${ssrInterpolate(unref(formatCurrency)(__props.payslip.taxCalculationDetails.annualGrossSalary || __props.payslip.taxCalculationDetails.annualGross || 0))}</span></div><div class="flex justify-between"><span class="text-gray-500">Pengurang (Biaya Jabatan + BPJS)</span><span>${ssrInterpolate(unref(formatCurrency)(__props.payslip.taxCalculationDetails.annualBpjs || 0))}</span></div><div class="flex justify-between border-t border-gray-200 pt-1 font-medium bg-yellow-50 px-2 rounded"><span>Penghasilan Kena Pajak (PKP)</span><span>${ssrInterpolate(unref(formatCurrency)(__props.payslip.taxCalculationDetails.taxableIncome || __props.payslip.taxCalculationDetails.annualTaxableIncome || 0))}</span></div><div></div><div class="col-span-2 mt-2"><p class="text-xs text-gray-400 mb-1">Rincian Lapisan Tarif Pajak:</p><!--[-->`);
        ssrRenderList(__props.payslip.taxCalculationDetails.taxBreakdown, (bracket, idx) => {
          _push(`<div class="flex justify-between text-xs text-gray-600 ml-4"><span>• Lapisan ${ssrInterpolate(bracket.bracket)} (${ssrInterpolate(bracket.rate * 100)}%)</span><span>${ssrInterpolate(unref(formatCurrency)(bracket.amount))}</span></div>`);
        });
        _push(`<!--]--></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="border border-gray-200 rounded-md"><button class="w-full px-4 py-2 bg-gray-50 flex justify-between items-center text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors print:hidden"><span>Kontribusi Perusahaan (Benefit bukan Tunai)</span>`);
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(isCompanyDetailsOpen.value ? unref(ChevronUp) : unref(ChevronDown)), { class: "w-4 h-4" }, null), _parent);
      _push(`</button><div class="${ssrRenderClass([isCompanyDetailsOpen.value ? "block" : "hidden", "print:block", "px-4", "py-3", "text-sm"])}"><table class="w-full"><tbody><tr><td class="py-1 text-gray-500">BPJS Kesehatan (4%)</td><td class="text-right">${ssrInterpolate(unref(formatCurrency)(__props.payslip.bpjsKesehatanCompany))}</td></tr><tr><td class="py-1 text-gray-500">BPJS Ketenagakerjaan (JHT 3.7%)</td><td class="text-right">${ssrInterpolate(unref(formatCurrency)(parseFloat(__props.payslip.grossSalary || "0") * 0.037))}</td></tr><tr><td class="py-1 text-gray-500">BPJS Ketenagakerjaan (Lainnya)</td><td class="text-right">${ssrInterpolate(unref(formatCurrency)(Math.max(0, parseFloat(__props.payslip.bpjsKetenagakerjaanCompany) - parseFloat(__props.payslip.grossSalary || "0") * 0.037)))}</td></tr><tr class="border-t border-gray-200 font-medium"><td class="pt-2">Total Contribution</td><td class="text-right pt-2">${ssrInterpolate(unref(formatCurrency)(parseFloat(__props.payslip.bpjsKesehatanCompany) + parseFloat(__props.payslip.bpjsKetenagakerjaanCompany)))}</td></tr></tbody></table></div></div></div><div class="hidden print:flex mt-12 justify-between px-12 text-center text-sm"><div><p class="mb-16">Diterima Ole,</p><p class="font-bold underline">${ssrInterpolate(__props.payslip.payroll?.employee?.firstName || "-")} ${ssrInterpolate(__props.payslip.payroll?.employee?.lastName || "")}</p><p>Employee</p></div><div><p class="mb-16">Disetujui Oleh,</p><p class="font-bold underline">HR Manager</p><p>Human Resources</p></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/payslips/PayslipDetail.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const router = useRouter();
    const id = route.params.id;
    const { data: payslip, loading, error } = usePayslip(id);
    const { mutate: deletePayslip } = useDeletePayslip();
    const authStore = useAuthStore();
    const user = computed(() => authStore.user);
    const isAdmin = computed(() => ["ADMIN", "SUPER", "HR"].includes(user.value?.role || ""));
    const handleDelete = async () => {
      if (confirm("Are you sure you want to delete this payslip? This action cannot be undone.")) {
        await deletePayslip(id, {
          onSuccess: () => {
            router.push({ path: ".." });
          }
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "px-4 py-8" }, _attrs))}>`);
      if (unref(loading)) {
        _push(`<div class="flex justify-center py-12"><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-navy"></div></div>`);
      } else if (unref(error)) {
        _push(`<div class="text-center py-12 text-red-500"> Error loading payslip: ${ssrInterpolate(unref(error).message)}</div>`);
      } else if (unref(payslip)) {
        _push(ssrRenderComponent(_sfc_main$1, {
          payslip: unref(payslip),
          isAdmin: unref(isAdmin),
          onDelete: handleDelete
        }, null, _parent));
      } else {
        _push(`<div class="text-center py-12 text-gray-500"> Payslip not found. </div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[tenant_slug]/dashboard/payslips/[id]/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-TmyR3Kn9.js.map
