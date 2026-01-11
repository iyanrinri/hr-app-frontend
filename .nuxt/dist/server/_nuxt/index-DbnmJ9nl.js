import { _ as __nuxt_component_0 } from "./nuxt-link-DsceMx1n.js";
import { defineComponent, mergeProps, useSSRContext, ref, watch, unref, withCtx, createVNode, computed, resolveDynamicComponent, createTextVNode, withDirectives, vModelText, createBlock, createCommentVNode, openBlock, toDisplayString, Fragment, renderList } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderComponent, ssrRenderClass, ssrRenderVNode, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { u as useRoute, b as Calendar, E as Eye, c as CircleCheckBig, D as DollarSign, d as Trash2, F as FileText, W as Wallet, e as Banknote, f as Clock, g as TrendingDown, R as RefreshCw, X, h as CircleX, i as Download, P as Plus, j as ChevronDown } from "../server.mjs";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/hookable/dist/index.mjs";
import { TransitionRoot, Dialog, TransitionChild, DialogPanel, DialogTitle } from "@headlessui/vue";
import { u as usePayrolls, a as usePayrollSummary, b as useProcessPayrolls, c as useMarkPayrollPaid, d as useDeletePayroll, e as useBulkGeneratePayroll } from "./usePayroll-BqsCAGPe.js";
import { u as useGeneratePayslip } from "./usePayslips-toysh2Fm.js";
import { u as useAllEmployees } from "./useEmployees-CEaIsP48.js";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/ufo/dist/index.mjs";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/unctx/dist/index.mjs";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/radix3/dist/index.mjs";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/defu/dist/defu.mjs";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/klona/dist/index.mjs";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/destr/dist/index.mjs";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/ohash/dist/index.mjs";
import "uuid";
import "./fetch-VuP8VKdC.js";
import "@vue/shared";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/perfect-debounce/dist/index.mjs";
var PayrollStatus = /* @__PURE__ */ ((PayrollStatus2) => {
  PayrollStatus2["PENDING"] = "PENDING";
  PayrollStatus2["PROCESSED"] = "PROCESSED";
  PayrollStatus2["PAID"] = "PAID";
  return PayrollStatus2;
})(PayrollStatus || {});
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "PayrollStatusBadge",
  __ssrInlineRender: true,
  props: {
    status: {}
  },
  setup(__props) {
    const getStatusColor = (status) => {
      switch (status) {
        case PayrollStatus.PAID:
          return "bg-green-100 text-green-800 border-green-200";
        case PayrollStatus.PROCESSED:
          return "bg-blue-100 text-blue-800 border-blue-200";
        case PayrollStatus.PENDING:
          return "bg-yellow-100 text-yellow-800 border-yellow-200";
        default:
          return "bg-gray-100 text-gray-800 border-gray-200";
      }
    };
    const formatStatus = (status) => {
      return status.replace(/_/g, " ");
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<span${ssrRenderAttrs(mergeProps({
        class: ["px-2.5 py-0.5 rounded-full text-xs font-medium border", getStatusColor(__props.status)]
      }, _attrs))}>${ssrInterpolate(formatStatus(__props.status))}</span>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/payroll/PayrollStatusBadge.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "PayrollTable",
  __ssrInlineRender: true,
  props: {
    payrolls: {},
    isLoading: { type: Boolean },
    isAdmin: { type: Boolean }
  },
  emits: ["process", "markPaid", "delete", "generatePayslip"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const route = useRoute();
    const tenantSlug = route.params.tenant_slug;
    const formatCurrency = (val) => {
      return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(val);
    };
    const payslipStatus = ref({});
    const useTenantUrl = () => {
      const route2 = useRoute();
      const tenantSlug2 = route2.params.tenant_slug;
      return (path) => tenantSlug2 ? `/api/${tenantSlug2}${path}` : `/api${path}`;
    };
    const getUrl = useTenantUrl();
    const checkPayslips = async () => {
      const paidPayrolls = props.payrolls.filter((p) => {
        const actualStatus = p.status || (p.isPaid ? PayrollStatus.PAID : p.processedAt ? PayrollStatus.PROCESSED : PayrollStatus.PENDING);
        return actualStatus === PayrollStatus.PAID;
      });
      for (const payroll of paidPayrolls) {
        if (payslipStatus.value[payroll.id]) continue;
        payslipStatus.value[payroll.id] = "loading";
        try {
          await $fetch(getUrl(`/payslip/by-payroll/${payroll.id}`));
          payslipStatus.value[payroll.id] = "exists";
        } catch (error) {
          payslipStatus.value[payroll.id] = "not_exists";
        }
      }
    };
    watch(() => props.payrolls, (newVal) => {
      if (newVal.length > 0) checkPayslips();
    }, { immediate: true });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      if (__props.isLoading) {
        _push(`<div${ssrRenderAttrs(_attrs)}><div class="w-full bg-white rounded-lg shadow p-6"><div class="animate-pulse space-y-4"><!--[-->`);
        ssrRenderList(5, (i) => {
          _push(`<div class="h-12 bg-gray-100 rounded"></div>`);
        });
        _push(`<!--]--></div></div></div>`);
      } else if (__props.payrolls.length === 0) {
        _push(`<div${ssrRenderAttrs(_attrs)}><div class="w-full bg-white rounded-lg shadow p-12 text-center text-gray-500"> No payroll records found. </div></div>`);
      } else {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "overflow-x-auto bg-white rounded-lg shadow" }, _attrs))}><table class="min-w-full divide-y divide-gray-200"><thead class="bg-gray-50"><tr><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> Employee </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> Period </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> Base Salary </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> Gross Salary </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> Net Salary </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> Status </th><th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"> Actions </th></tr></thead><tbody class="bg-white divide-y divide-gray-200"><!--[-->`);
        ssrRenderList(__props.payrolls, (payroll) => {
          _push(`<tr class="hover:bg-gray-50"><td class="px-6 py-4 whitespace-nowrap"><div class="flex items-center"><div class="text-sm font-medium text-gray-900">${ssrInterpolate(payroll.employee?.firstName)} ${ssrInterpolate(payroll.employee?.lastName)}</div></div><div class="text-xs text-gray-500">${ssrInterpolate(payroll.employee?.position)}</div></td><td class="px-6 py-4 whitespace-nowrap"><div class="flex items-center text-sm text-gray-500">`);
          _push(ssrRenderComponent(unref(Calendar), { class: "mr-1.5 h-4 w-4" }, null, _parent));
          _push(` ${ssrInterpolate(new Date(payroll.periodStart).toLocaleDateString())} - ${ssrInterpolate(new Date(payroll.periodEnd).toLocaleDateString())}</div></td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${ssrInterpolate(formatCurrency(Number(payroll.baseSalary)))}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${ssrInterpolate(formatCurrency(Number(payroll.grossSalary)))}</td><td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${ssrInterpolate(formatCurrency(Number(payroll.netSalary)))}</td><td class="px-6 py-4 whitespace-nowrap">`);
          _push(ssrRenderComponent(_sfc_main$5, {
            status: payroll.status || (payroll.isPaid ? "PAID" : payroll.processedAt ? "PROCESSED" : "PENDING")
          }, null, _parent));
          _push(`</td><td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"><div class="flex justify-end space-x-2">`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/${unref(tenantSlug)}/dashboard/payroll/${payroll.id}`
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<button class="p-2 text-gray-500 hover:bg-gray-100 rounded" title="View Details"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Eye), { class: "w-4 h-4" }, null, _parent2, _scopeId));
                _push2(`</button>`);
              } else {
                return [
                  createVNode("button", {
                    class: "p-2 text-gray-500 hover:bg-gray-100 rounded",
                    title: "View Details"
                  }, [
                    createVNode(unref(Eye), { class: "w-4 h-4" })
                  ])
                ];
              }
            }),
            _: 2
          }, _parent));
          if (__props.isAdmin) {
            _push(`<!--[-->`);
            if (payroll.status === unref(PayrollStatus).PENDING || !payroll.status && !payroll.processedAt) {
              _push(`<button class="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded" title="Process Payroll">`);
              _push(ssrRenderComponent(unref(CircleCheckBig), { class: "w-4 h-4" }, null, _parent));
              _push(`</button>`);
            } else {
              _push(`<!---->`);
            }
            if (payroll.status === unref(PayrollStatus).PROCESSED || payroll.processedAt && !payroll.isPaid) {
              _push(`<button class="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded" title="Mark as Paid">`);
              _push(ssrRenderComponent(unref(DollarSign), { class: "w-4 h-4" }, null, _parent));
              _push(`</button>`);
            } else {
              _push(`<!---->`);
            }
            if (payroll.status !== unref(PayrollStatus).PAID && !payroll.isPaid) {
              _push(`<button class="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded" title="Delete">`);
              _push(ssrRenderComponent(unref(Trash2), { class: "w-4 h-4" }, null, _parent));
              _push(`</button>`);
            } else {
              _push(`<!---->`);
            }
            if (payroll.status === unref(PayrollStatus).PAID || payroll.isPaid) {
              _push(`<!--[-->`);
              if (payslipStatus.value[payroll.id] === "not_exists") {
                _push(`<button class="p-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded" title="Generate Payslip">`);
                _push(ssrRenderComponent(unref(FileText), { class: "w-4 h-4" }, null, _parent));
                _push(`</button>`);
              } else {
                _push(`<!---->`);
              }
              if (payslipStatus.value[payroll.id] === "exists") {
                _push(ssrRenderComponent(_component_NuxtLink, {
                  to: `/${unref(tenantSlug)}/dashboard/payslips?payrollId=${payroll.id}`
                }, {
                  default: withCtx((_, _push2, _parent2, _scopeId) => {
                    if (_push2) {
                      _push2(`<button class="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded" title="View Payslip"${_scopeId}>`);
                      _push2(ssrRenderComponent(unref(FileText), { class: "w-4 h-4" }, null, _parent2, _scopeId));
                      _push2(`</button>`);
                    } else {
                      return [
                        createVNode("button", {
                          class: "p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded",
                          title: "View Payslip"
                        }, [
                          createVNode(unref(FileText), { class: "w-4 h-4" })
                        ])
                      ];
                    }
                  }),
                  _: 2
                }, _parent));
              } else {
                _push(`<!---->`);
              }
              if (payslipStatus.value[payroll.id] === "loading") {
                _push(`<button class="p-2 opacity-50 cursor-not-allowed rounded" disabled title="Checking payslip...">`);
                _push(ssrRenderComponent(unref(FileText), { class: "w-4 h-4 animate-pulse" }, null, _parent));
                _push(`</button>`);
              } else {
                _push(`<!---->`);
              }
              _push(`<!--]-->`);
            } else {
              _push(`<!---->`);
            }
            _push(`<!--]-->`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></td></tr>`);
        });
        _push(`<!--]--></tbody></table></div>`);
      }
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/payroll/PayrollTable.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "PayrollStats",
  __ssrInlineRender: true,
  props: {
    summary: {},
    loading: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const formatCurrency = (val) => {
      return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(val);
    };
    const items = computed(() => {
      const s = props.summary;
      if (!s) return [];
      return [
        {
          label: "Total Payrolls",
          value: s.totalPayrolls.toString(),
          icon: Wallet,
          color: "bg-indigo-100 text-indigo-600",
          isCurrency: false
        },
        {
          label: "Base Salary",
          value: formatCurrency(Number(s.totalBaseSalary)),
          icon: Banknote,
          color: "bg-blue-100 text-blue-600",
          isCurrency: true
        },
        {
          label: "Overtime",
          value: formatCurrency(Number(s.totalOvertimePay)),
          icon: Clock,
          color: "bg-yellow-100 text-yellow-600",
          isCurrency: true
        },
        {
          label: "Deductions",
          value: formatCurrency(Number(s.totalDeductions)),
          icon: TrendingDown,
          color: "bg-red-100 text-red-600",
          isCurrency: true
        },
        {
          label: "Net Salary",
          value: formatCurrency(Number(s.totalNetSalary)),
          icon: CircleCheckBig,
          color: "bg-green-100 text-green-600",
          isCurrency: true
        }
      ];
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.loading) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6" }, _attrs))}><!--[-->`);
        ssrRenderList(5, (i) => {
          _push(`<div class="h-24 bg-gray-100 rounded-lg animate-pulse"></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6" }, _attrs))}><!--[-->`);
        ssrRenderList(items.value, (item, index) => {
          _push(`<div class="bg-white p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow"><div class="flex flex-col space-y-2"><div class="flex items-center justify-between"><div class="${ssrRenderClass(["p-2 rounded-lg", item.color])}">`);
          ssrRenderVNode(_push, createVNode(resolveDynamicComponent(item.icon), { class: "h-4 w-4" }, null), _parent);
          _push(`</div></div><div><p class="text-xs font-medium text-gray-500 mb-1 truncate">${ssrInterpolate(item.label)}</p><p class="${ssrRenderClass(["font-bold text-gray-900 truncate", item.isCurrency ? "text-sm" : "text-xl"])}">${ssrInterpolate(item.value)}</p></div></div></div>`);
        });
        _push(`<!--]--></div>`);
      }
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/payroll/PayrollStats.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "BulkGenerateModal",
  __ssrInlineRender: true,
  props: {
    isOpen: { type: Boolean },
    isLoading: { type: Boolean }
  },
  emits: ["close", "submit"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const form = ref({
      periodStart: "",
      periodEnd: "",
      bonusPercentage: 0
    });
    const handleSubmit = () => {
      emit("submit", {
        periodStart: new Date(form.value.periodStart).toISOString(),
        periodEnd: new Date(form.value.periodEnd).toISOString(),
        bonusPercentage: form.value.bonusPercentage
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(TransitionRoot), mergeProps({
        as: "template",
        show: __props.isOpen
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Dialog), {
              as: "div",
              class: "relative z-50",
              onClose: ($event) => _ctx.$emit("close")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(TransitionChild), {
                    as: "template",
                    enter: "ease-out duration-300",
                    "enter-from": "opacity-0",
                    "enter-to": "opacity-100",
                    leave: "ease-in duration-200",
                    "leave-from": "opacity-100",
                    "leave-to": "opacity-0"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="fixed inset-0 bg-gray-500/75 backdrop-blur-sm transition-opacity"${_scopeId3}></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "fixed inset-0 bg-gray-500/75 backdrop-blur-sm transition-opacity" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="fixed inset-0 z-10 overflow-y-auto"${_scopeId2}><div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(TransitionChild), {
                    as: "template",
                    enter: "ease-out duration-300",
                    "enter-from": "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
                    "enter-to": "opacity-100 translate-y-0 sm:scale-100",
                    leave: "ease-in duration-200",
                    "leave-from": "opacity-100 translate-y-0 sm:scale-100",
                    "leave-to": "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(DialogPanel), { class: "relative transform overflow-hidden rounded-xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 border-b border-gray-100"${_scopeId4}><div class="flex justify-between items-center"${_scopeId4}>`);
                              _push5(ssrRenderComponent(unref(DialogTitle), {
                                as: "h3",
                                class: "text-lg font-semibold leading-6 text-gray-900 flex items-center"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(RefreshCw), { class: "w-5 h-5 mr-2 text-brand-navy" }, null, _parent6, _scopeId5));
                                    _push6(` Bulk Generate Payroll `);
                                  } else {
                                    return [
                                      createVNode(unref(RefreshCw), { class: "w-5 h-5 mr-2 text-brand-navy" }),
                                      createTextVNode(" Bulk Generate Payroll ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`<button class="text-gray-400 hover:text-gray-500 transition-colors"${_scopeId4}>`);
                              _push5(ssrRenderComponent(unref(X), { class: "w-5 h-5" }, null, _parent5, _scopeId4));
                              _push5(`</button></div></div><div class="px-6 py-6 space-y-4"${_scopeId4}><div${_scopeId4}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId4}>Period Start</label><input type="date"${ssrRenderAttr("value", form.value.periodStart)} class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-navy focus:border-brand-navy" required${_scopeId4}></div><div${_scopeId4}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId4}>Period End</label><input type="date"${ssrRenderAttr("value", form.value.periodEnd)} class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-navy focus:border-brand-navy" required${_scopeId4}></div><div${_scopeId4}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId4}>Bonus Percentage (%)</label><input type="number"${ssrRenderAttr("value", form.value.bonusPercentage)} min="0" max="100" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-navy focus:border-brand-navy"${_scopeId4}><p class="text-xs text-gray-500 mt-1"${_scopeId4}>Applied to base salary for all employees</p></div></div><div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"${_scopeId4}><button type="button" class="inline-flex w-full justify-center rounded-lg bg-brand-navy px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-navy/90 sm:ml-3 sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"${ssrIncludeBooleanAttr(__props.isLoading || !form.value.periodStart || !form.value.periodEnd) ? " disabled" : ""}${_scopeId4}>`);
                              if (__props.isLoading) {
                                _push5(ssrRenderComponent(unref(RefreshCw), { class: "w-4 h-4 mr-2 animate-spin" }, null, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                              _push5(` ${ssrInterpolate(__props.isLoading ? "Generating..." : "Generate All")}</button><button type="button" class="mt-3 inline-flex w-full justify-center rounded-lg bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"${_scopeId4}> Cancel </button></div>`);
                            } else {
                              return [
                                createVNode("div", { class: "bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 border-b border-gray-100" }, [
                                  createVNode("div", { class: "flex justify-between items-center" }, [
                                    createVNode(unref(DialogTitle), {
                                      as: "h3",
                                      class: "text-lg font-semibold leading-6 text-gray-900 flex items-center"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(RefreshCw), { class: "w-5 h-5 mr-2 text-brand-navy" }),
                                        createTextVNode(" Bulk Generate Payroll ")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode("button", {
                                      onClick: ($event) => _ctx.$emit("close"),
                                      class: "text-gray-400 hover:text-gray-500 transition-colors"
                                    }, [
                                      createVNode(unref(X), { class: "w-5 h-5" })
                                    ], 8, ["onClick"])
                                  ])
                                ]),
                                createVNode("div", { class: "px-6 py-6 space-y-4" }, [
                                  createVNode("div", null, [
                                    createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Period Start"),
                                    withDirectives(createVNode("input", {
                                      type: "date",
                                      "onUpdate:modelValue": ($event) => form.value.periodStart = $event,
                                      class: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-navy focus:border-brand-navy",
                                      required: ""
                                    }, null, 8, ["onUpdate:modelValue"]), [
                                      [vModelText, form.value.periodStart]
                                    ])
                                  ]),
                                  createVNode("div", null, [
                                    createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Period End"),
                                    withDirectives(createVNode("input", {
                                      type: "date",
                                      "onUpdate:modelValue": ($event) => form.value.periodEnd = $event,
                                      class: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-navy focus:border-brand-navy",
                                      required: ""
                                    }, null, 8, ["onUpdate:modelValue"]), [
                                      [vModelText, form.value.periodEnd]
                                    ])
                                  ]),
                                  createVNode("div", null, [
                                    createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Bonus Percentage (%)"),
                                    withDirectives(createVNode("input", {
                                      type: "number",
                                      "onUpdate:modelValue": ($event) => form.value.bonusPercentage = $event,
                                      min: "0",
                                      max: "100",
                                      class: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-navy focus:border-brand-navy"
                                    }, null, 8, ["onUpdate:modelValue"]), [
                                      [vModelText, form.value.bonusPercentage]
                                    ]),
                                    createVNode("p", { class: "text-xs text-gray-500 mt-1" }, "Applied to base salary for all employees")
                                  ])
                                ]),
                                createVNode("div", { class: "bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6" }, [
                                  createVNode("button", {
                                    type: "button",
                                    class: "inline-flex w-full justify-center rounded-lg bg-brand-navy px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-navy/90 sm:ml-3 sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed",
                                    onClick: handleSubmit,
                                    disabled: __props.isLoading || !form.value.periodStart || !form.value.periodEnd
                                  }, [
                                    __props.isLoading ? (openBlock(), createBlock(unref(RefreshCw), {
                                      key: 0,
                                      class: "w-4 h-4 mr-2 animate-spin"
                                    })) : createCommentVNode("", true),
                                    createTextVNode(" " + toDisplayString(__props.isLoading ? "Generating..." : "Generate All"), 1)
                                  ], 8, ["disabled"]),
                                  createVNode("button", {
                                    type: "button",
                                    class: "mt-3 inline-flex w-full justify-center rounded-lg bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto",
                                    onClick: ($event) => _ctx.$emit("close")
                                  }, " Cancel ", 8, ["onClick"])
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(DialogPanel), { class: "relative transform overflow-hidden rounded-xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 border-b border-gray-100" }, [
                                createVNode("div", { class: "flex justify-between items-center" }, [
                                  createVNode(unref(DialogTitle), {
                                    as: "h3",
                                    class: "text-lg font-semibold leading-6 text-gray-900 flex items-center"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(RefreshCw), { class: "w-5 h-5 mr-2 text-brand-navy" }),
                                      createTextVNode(" Bulk Generate Payroll ")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode("button", {
                                    onClick: ($event) => _ctx.$emit("close"),
                                    class: "text-gray-400 hover:text-gray-500 transition-colors"
                                  }, [
                                    createVNode(unref(X), { class: "w-5 h-5" })
                                  ], 8, ["onClick"])
                                ])
                              ]),
                              createVNode("div", { class: "px-6 py-6 space-y-4" }, [
                                createVNode("div", null, [
                                  createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Period Start"),
                                  withDirectives(createVNode("input", {
                                    type: "date",
                                    "onUpdate:modelValue": ($event) => form.value.periodStart = $event,
                                    class: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-navy focus:border-brand-navy",
                                    required: ""
                                  }, null, 8, ["onUpdate:modelValue"]), [
                                    [vModelText, form.value.periodStart]
                                  ])
                                ]),
                                createVNode("div", null, [
                                  createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Period End"),
                                  withDirectives(createVNode("input", {
                                    type: "date",
                                    "onUpdate:modelValue": ($event) => form.value.periodEnd = $event,
                                    class: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-navy focus:border-brand-navy",
                                    required: ""
                                  }, null, 8, ["onUpdate:modelValue"]), [
                                    [vModelText, form.value.periodEnd]
                                  ])
                                ]),
                                createVNode("div", null, [
                                  createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Bonus Percentage (%)"),
                                  withDirectives(createVNode("input", {
                                    type: "number",
                                    "onUpdate:modelValue": ($event) => form.value.bonusPercentage = $event,
                                    min: "0",
                                    max: "100",
                                    class: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-navy focus:border-brand-navy"
                                  }, null, 8, ["onUpdate:modelValue"]), [
                                    [vModelText, form.value.bonusPercentage]
                                  ]),
                                  createVNode("p", { class: "text-xs text-gray-500 mt-1" }, "Applied to base salary for all employees")
                                ])
                              ]),
                              createVNode("div", { class: "bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6" }, [
                                createVNode("button", {
                                  type: "button",
                                  class: "inline-flex w-full justify-center rounded-lg bg-brand-navy px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-navy/90 sm:ml-3 sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed",
                                  onClick: handleSubmit,
                                  disabled: __props.isLoading || !form.value.periodStart || !form.value.periodEnd
                                }, [
                                  __props.isLoading ? (openBlock(), createBlock(unref(RefreshCw), {
                                    key: 0,
                                    class: "w-4 h-4 mr-2 animate-spin"
                                  })) : createCommentVNode("", true),
                                  createTextVNode(" " + toDisplayString(__props.isLoading ? "Generating..." : "Generate All"), 1)
                                ], 8, ["disabled"]),
                                createVNode("button", {
                                  type: "button",
                                  class: "mt-3 inline-flex w-full justify-center rounded-lg bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto",
                                  onClick: ($event) => _ctx.$emit("close")
                                }, " Cancel ", 8, ["onClick"])
                              ])
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode(unref(TransitionChild), {
                      as: "template",
                      enter: "ease-out duration-300",
                      "enter-from": "opacity-0",
                      "enter-to": "opacity-100",
                      leave: "ease-in duration-200",
                      "leave-from": "opacity-100",
                      "leave-to": "opacity-0"
                    }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "fixed inset-0 bg-gray-500/75 backdrop-blur-sm transition-opacity" })
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "fixed inset-0 z-10 overflow-y-auto" }, [
                      createVNode("div", { class: "flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0" }, [
                        createVNode(unref(TransitionChild), {
                          as: "template",
                          enter: "ease-out duration-300",
                          "enter-from": "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
                          "enter-to": "opacity-100 translate-y-0 sm:scale-100",
                          leave: "ease-in duration-200",
                          "leave-from": "opacity-100 translate-y-0 sm:scale-100",
                          "leave-to": "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(DialogPanel), { class: "relative transform overflow-hidden rounded-xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg" }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 border-b border-gray-100" }, [
                                  createVNode("div", { class: "flex justify-between items-center" }, [
                                    createVNode(unref(DialogTitle), {
                                      as: "h3",
                                      class: "text-lg font-semibold leading-6 text-gray-900 flex items-center"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(RefreshCw), { class: "w-5 h-5 mr-2 text-brand-navy" }),
                                        createTextVNode(" Bulk Generate Payroll ")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode("button", {
                                      onClick: ($event) => _ctx.$emit("close"),
                                      class: "text-gray-400 hover:text-gray-500 transition-colors"
                                    }, [
                                      createVNode(unref(X), { class: "w-5 h-5" })
                                    ], 8, ["onClick"])
                                  ])
                                ]),
                                createVNode("div", { class: "px-6 py-6 space-y-4" }, [
                                  createVNode("div", null, [
                                    createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Period Start"),
                                    withDirectives(createVNode("input", {
                                      type: "date",
                                      "onUpdate:modelValue": ($event) => form.value.periodStart = $event,
                                      class: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-navy focus:border-brand-navy",
                                      required: ""
                                    }, null, 8, ["onUpdate:modelValue"]), [
                                      [vModelText, form.value.periodStart]
                                    ])
                                  ]),
                                  createVNode("div", null, [
                                    createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Period End"),
                                    withDirectives(createVNode("input", {
                                      type: "date",
                                      "onUpdate:modelValue": ($event) => form.value.periodEnd = $event,
                                      class: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-navy focus:border-brand-navy",
                                      required: ""
                                    }, null, 8, ["onUpdate:modelValue"]), [
                                      [vModelText, form.value.periodEnd]
                                    ])
                                  ]),
                                  createVNode("div", null, [
                                    createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Bonus Percentage (%)"),
                                    withDirectives(createVNode("input", {
                                      type: "number",
                                      "onUpdate:modelValue": ($event) => form.value.bonusPercentage = $event,
                                      min: "0",
                                      max: "100",
                                      class: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-navy focus:border-brand-navy"
                                    }, null, 8, ["onUpdate:modelValue"]), [
                                      [vModelText, form.value.bonusPercentage]
                                    ]),
                                    createVNode("p", { class: "text-xs text-gray-500 mt-1" }, "Applied to base salary for all employees")
                                  ])
                                ]),
                                createVNode("div", { class: "bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6" }, [
                                  createVNode("button", {
                                    type: "button",
                                    class: "inline-flex w-full justify-center rounded-lg bg-brand-navy px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-navy/90 sm:ml-3 sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed",
                                    onClick: handleSubmit,
                                    disabled: __props.isLoading || !form.value.periodStart || !form.value.periodEnd
                                  }, [
                                    __props.isLoading ? (openBlock(), createBlock(unref(RefreshCw), {
                                      key: 0,
                                      class: "w-4 h-4 mr-2 animate-spin"
                                    })) : createCommentVNode("", true),
                                    createTextVNode(" " + toDisplayString(__props.isLoading ? "Generating..." : "Generate All"), 1)
                                  ], 8, ["disabled"]),
                                  createVNode("button", {
                                    type: "button",
                                    class: "mt-3 inline-flex w-full justify-center rounded-lg bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto",
                                    onClick: ($event) => _ctx.$emit("close")
                                  }, " Cancel ", 8, ["onClick"])
                                ])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Dialog), {
                as: "div",
                class: "relative z-50",
                onClose: ($event) => _ctx.$emit("close")
              }, {
                default: withCtx(() => [
                  createVNode(unref(TransitionChild), {
                    as: "template",
                    enter: "ease-out duration-300",
                    "enter-from": "opacity-0",
                    "enter-to": "opacity-100",
                    leave: "ease-in duration-200",
                    "leave-from": "opacity-100",
                    "leave-to": "opacity-0"
                  }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "fixed inset-0 bg-gray-500/75 backdrop-blur-sm transition-opacity" })
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "fixed inset-0 z-10 overflow-y-auto" }, [
                    createVNode("div", { class: "flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0" }, [
                      createVNode(unref(TransitionChild), {
                        as: "template",
                        enter: "ease-out duration-300",
                        "enter-from": "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
                        "enter-to": "opacity-100 translate-y-0 sm:scale-100",
                        leave: "ease-in duration-200",
                        "leave-from": "opacity-100 translate-y-0 sm:scale-100",
                        "leave-to": "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(DialogPanel), { class: "relative transform overflow-hidden rounded-xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 border-b border-gray-100" }, [
                                createVNode("div", { class: "flex justify-between items-center" }, [
                                  createVNode(unref(DialogTitle), {
                                    as: "h3",
                                    class: "text-lg font-semibold leading-6 text-gray-900 flex items-center"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(RefreshCw), { class: "w-5 h-5 mr-2 text-brand-navy" }),
                                      createTextVNode(" Bulk Generate Payroll ")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode("button", {
                                    onClick: ($event) => _ctx.$emit("close"),
                                    class: "text-gray-400 hover:text-gray-500 transition-colors"
                                  }, [
                                    createVNode(unref(X), { class: "w-5 h-5" })
                                  ], 8, ["onClick"])
                                ])
                              ]),
                              createVNode("div", { class: "px-6 py-6 space-y-4" }, [
                                createVNode("div", null, [
                                  createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Period Start"),
                                  withDirectives(createVNode("input", {
                                    type: "date",
                                    "onUpdate:modelValue": ($event) => form.value.periodStart = $event,
                                    class: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-navy focus:border-brand-navy",
                                    required: ""
                                  }, null, 8, ["onUpdate:modelValue"]), [
                                    [vModelText, form.value.periodStart]
                                  ])
                                ]),
                                createVNode("div", null, [
                                  createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Period End"),
                                  withDirectives(createVNode("input", {
                                    type: "date",
                                    "onUpdate:modelValue": ($event) => form.value.periodEnd = $event,
                                    class: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-navy focus:border-brand-navy",
                                    required: ""
                                  }, null, 8, ["onUpdate:modelValue"]), [
                                    [vModelText, form.value.periodEnd]
                                  ])
                                ]),
                                createVNode("div", null, [
                                  createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Bonus Percentage (%)"),
                                  withDirectives(createVNode("input", {
                                    type: "number",
                                    "onUpdate:modelValue": ($event) => form.value.bonusPercentage = $event,
                                    min: "0",
                                    max: "100",
                                    class: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-navy focus:border-brand-navy"
                                  }, null, 8, ["onUpdate:modelValue"]), [
                                    [vModelText, form.value.bonusPercentage]
                                  ]),
                                  createVNode("p", { class: "text-xs text-gray-500 mt-1" }, "Applied to base salary for all employees")
                                ])
                              ]),
                              createVNode("div", { class: "bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6" }, [
                                createVNode("button", {
                                  type: "button",
                                  class: "inline-flex w-full justify-center rounded-lg bg-brand-navy px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-navy/90 sm:ml-3 sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed",
                                  onClick: handleSubmit,
                                  disabled: __props.isLoading || !form.value.periodStart || !form.value.periodEnd
                                }, [
                                  __props.isLoading ? (openBlock(), createBlock(unref(RefreshCw), {
                                    key: 0,
                                    class: "w-4 h-4 mr-2 animate-spin"
                                  })) : createCommentVNode("", true),
                                  createTextVNode(" " + toDisplayString(__props.isLoading ? "Generating..." : "Generate All"), 1)
                                ], 8, ["disabled"]),
                                createVNode("button", {
                                  type: "button",
                                  class: "mt-3 inline-flex w-full justify-center rounded-lg bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto",
                                  onClick: ($event) => _ctx.$emit("close")
                                }, " Cancel ", 8, ["onClick"])
                              ])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ])
                  ])
                ]),
                _: 1
              }, 8, ["onClose"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/payroll/BulkGenerateModal.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "BulkGenerateResultModal",
  __ssrInlineRender: true,
  props: {
    isOpen: { type: Boolean },
    generated: {},
    failed: {}
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(TransitionRoot), mergeProps({
        as: "template",
        show: __props.isOpen
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Dialog), {
              as: "div",
              class: "relative z-50",
              onClose: ($event) => _ctx.$emit("close")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(TransitionChild), {
                    as: "template",
                    enter: "ease-out duration-300",
                    "enter-from": "opacity-0",
                    "enter-to": "opacity-100",
                    leave: "ease-in duration-200",
                    "leave-from": "opacity-100",
                    "leave-to": "opacity-0"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="fixed inset-0 bg-gray-500/75 backdrop-blur-sm transition-opacity"${_scopeId3}></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "fixed inset-0 bg-gray-500/75 backdrop-blur-sm transition-opacity" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="fixed inset-0 z-10 overflow-y-auto"${_scopeId2}><div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(TransitionChild), {
                    as: "template",
                    enter: "ease-out duration-300",
                    "enter-from": "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
                    "enter-to": "opacity-100 translate-y-0 sm:scale-100",
                    leave: "ease-in duration-200",
                    "leave-from": "opacity-100 translate-y-0 sm:scale-100",
                    "leave-to": "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(DialogPanel), { class: "relative transform overflow-hidden rounded-xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 border-b border-gray-100"${_scopeId4}><div class="flex justify-between items-center"${_scopeId4}>`);
                              _push5(ssrRenderComponent(unref(DialogTitle), {
                                as: "h3",
                                class: "text-lg font-semibold leading-6 text-gray-900"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Generation Result `);
                                  } else {
                                    return [
                                      createTextVNode(" Generation Result ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`<button class="text-gray-400 hover:text-gray-500"${_scopeId4}>`);
                              _push5(ssrRenderComponent(unref(X), { class: "w-5 h-5" }, null, _parent5, _scopeId4));
                              _push5(`</button></div></div><div class="px-6 py-6 space-y-4"${_scopeId4}>`);
                              if (__props.generated > 0) {
                                _push5(`<div class="flex items-center p-4 bg-green-50 rounded-lg"${_scopeId4}>`);
                                _push5(ssrRenderComponent(unref(CircleCheckBig), { class: "w-6 h-6 text-green-500 mr-3" }, null, _parent5, _scopeId4));
                                _push5(`<div${_scopeId4}><h4 class="text-sm font-medium text-green-800"${_scopeId4}>Available Payrolls Generated</h4><p class="text-sm text-green-600"${_scopeId4}>${ssrInterpolate(__props.generated)} payrolls created successfully.</p></div></div>`);
                              } else {
                                _push5(`<!---->`);
                              }
                              if (__props.failed.length > 0) {
                                _push5(`<div class="space-y-3"${_scopeId4}><div class="flex items-center p-4 bg-red-50 rounded-lg"${_scopeId4}>`);
                                _push5(ssrRenderComponent(unref(CircleX), { class: "w-6 h-6 text-red-500 mr-3" }, null, _parent5, _scopeId4));
                                _push5(`<div${_scopeId4}><h4 class="text-sm font-medium text-red-800"${_scopeId4}>Failed to Generate</h4><p class="text-sm text-red-600"${_scopeId4}>${ssrInterpolate(__props.failed.length)} payrolls encountered errors.</p></div></div><div class="max-h-48 overflow-y-auto border border-gray-200 rounded-lg"${_scopeId4}><table class="min-w-full divide-y divide-gray-200"${_scopeId4}><thead class="bg-gray-50 sticky top-0"${_scopeId4}><tr${_scopeId4}><th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"${_scopeId4}>Employee</th><th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"${_scopeId4}>Reason</th></tr></thead><tbody class="bg-white divide-y divide-gray-200"${_scopeId4}><!--[-->`);
                                ssrRenderList(__props.failed, (item, idx) => {
                                  _push5(`<tr${_scopeId4}><td class="px-4 py-2 text-sm text-gray-900"${_scopeId4}>${ssrInterpolate(item.employeeName || item.employeeId)}</td><td class="px-4 py-2 text-sm text-red-600"${_scopeId4}>${ssrInterpolate(item.reason)}</td></tr>`);
                                });
                                _push5(`<!--]--></tbody></table></div></div>`);
                              } else {
                                _push5(`<!---->`);
                              }
                              _push5(`</div><div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"${_scopeId4}><button type="button" class="inline-flex w-full justify-center rounded-lg bg-brand-navy px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-navy/90 sm:ml-3 sm:w-auto"${_scopeId4}> Close </button></div>`);
                            } else {
                              return [
                                createVNode("div", { class: "bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 border-b border-gray-100" }, [
                                  createVNode("div", { class: "flex justify-between items-center" }, [
                                    createVNode(unref(DialogTitle), {
                                      as: "h3",
                                      class: "text-lg font-semibold leading-6 text-gray-900"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Generation Result ")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode("button", {
                                      onClick: ($event) => _ctx.$emit("close"),
                                      class: "text-gray-400 hover:text-gray-500"
                                    }, [
                                      createVNode(unref(X), { class: "w-5 h-5" })
                                    ], 8, ["onClick"])
                                  ])
                                ]),
                                createVNode("div", { class: "px-6 py-6 space-y-4" }, [
                                  __props.generated > 0 ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "flex items-center p-4 bg-green-50 rounded-lg"
                                  }, [
                                    createVNode(unref(CircleCheckBig), { class: "w-6 h-6 text-green-500 mr-3" }),
                                    createVNode("div", null, [
                                      createVNode("h4", { class: "text-sm font-medium text-green-800" }, "Available Payrolls Generated"),
                                      createVNode("p", { class: "text-sm text-green-600" }, toDisplayString(__props.generated) + " payrolls created successfully.", 1)
                                    ])
                                  ])) : createCommentVNode("", true),
                                  __props.failed.length > 0 ? (openBlock(), createBlock("div", {
                                    key: 1,
                                    class: "space-y-3"
                                  }, [
                                    createVNode("div", { class: "flex items-center p-4 bg-red-50 rounded-lg" }, [
                                      createVNode(unref(CircleX), { class: "w-6 h-6 text-red-500 mr-3" }),
                                      createVNode("div", null, [
                                        createVNode("h4", { class: "text-sm font-medium text-red-800" }, "Failed to Generate"),
                                        createVNode("p", { class: "text-sm text-red-600" }, toDisplayString(__props.failed.length) + " payrolls encountered errors.", 1)
                                      ])
                                    ]),
                                    createVNode("div", { class: "max-h-48 overflow-y-auto border border-gray-200 rounded-lg" }, [
                                      createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                                        createVNode("thead", { class: "bg-gray-50 sticky top-0" }, [
                                          createVNode("tr", null, [
                                            createVNode("th", { class: "px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase" }, "Employee"),
                                            createVNode("th", { class: "px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase" }, "Reason")
                                          ])
                                        ]),
                                        createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                                          (openBlock(true), createBlock(Fragment, null, renderList(__props.failed, (item, idx) => {
                                            return openBlock(), createBlock("tr", { key: idx }, [
                                              createVNode("td", { class: "px-4 py-2 text-sm text-gray-900" }, toDisplayString(item.employeeName || item.employeeId), 1),
                                              createVNode("td", { class: "px-4 py-2 text-sm text-red-600" }, toDisplayString(item.reason), 1)
                                            ]);
                                          }), 128))
                                        ])
                                      ])
                                    ])
                                  ])) : createCommentVNode("", true)
                                ]),
                                createVNode("div", { class: "bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6" }, [
                                  createVNode("button", {
                                    type: "button",
                                    class: "inline-flex w-full justify-center rounded-lg bg-brand-navy px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-navy/90 sm:ml-3 sm:w-auto",
                                    onClick: ($event) => _ctx.$emit("close")
                                  }, " Close ", 8, ["onClick"])
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(DialogPanel), { class: "relative transform overflow-hidden rounded-xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 border-b border-gray-100" }, [
                                createVNode("div", { class: "flex justify-between items-center" }, [
                                  createVNode(unref(DialogTitle), {
                                    as: "h3",
                                    class: "text-lg font-semibold leading-6 text-gray-900"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Generation Result ")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode("button", {
                                    onClick: ($event) => _ctx.$emit("close"),
                                    class: "text-gray-400 hover:text-gray-500"
                                  }, [
                                    createVNode(unref(X), { class: "w-5 h-5" })
                                  ], 8, ["onClick"])
                                ])
                              ]),
                              createVNode("div", { class: "px-6 py-6 space-y-4" }, [
                                __props.generated > 0 ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "flex items-center p-4 bg-green-50 rounded-lg"
                                }, [
                                  createVNode(unref(CircleCheckBig), { class: "w-6 h-6 text-green-500 mr-3" }),
                                  createVNode("div", null, [
                                    createVNode("h4", { class: "text-sm font-medium text-green-800" }, "Available Payrolls Generated"),
                                    createVNode("p", { class: "text-sm text-green-600" }, toDisplayString(__props.generated) + " payrolls created successfully.", 1)
                                  ])
                                ])) : createCommentVNode("", true),
                                __props.failed.length > 0 ? (openBlock(), createBlock("div", {
                                  key: 1,
                                  class: "space-y-3"
                                }, [
                                  createVNode("div", { class: "flex items-center p-4 bg-red-50 rounded-lg" }, [
                                    createVNode(unref(CircleX), { class: "w-6 h-6 text-red-500 mr-3" }),
                                    createVNode("div", null, [
                                      createVNode("h4", { class: "text-sm font-medium text-red-800" }, "Failed to Generate"),
                                      createVNode("p", { class: "text-sm text-red-600" }, toDisplayString(__props.failed.length) + " payrolls encountered errors.", 1)
                                    ])
                                  ]),
                                  createVNode("div", { class: "max-h-48 overflow-y-auto border border-gray-200 rounded-lg" }, [
                                    createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                                      createVNode("thead", { class: "bg-gray-50 sticky top-0" }, [
                                        createVNode("tr", null, [
                                          createVNode("th", { class: "px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase" }, "Employee"),
                                          createVNode("th", { class: "px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase" }, "Reason")
                                        ])
                                      ]),
                                      createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                                        (openBlock(true), createBlock(Fragment, null, renderList(__props.failed, (item, idx) => {
                                          return openBlock(), createBlock("tr", { key: idx }, [
                                            createVNode("td", { class: "px-4 py-2 text-sm text-gray-900" }, toDisplayString(item.employeeName || item.employeeId), 1),
                                            createVNode("td", { class: "px-4 py-2 text-sm text-red-600" }, toDisplayString(item.reason), 1)
                                          ]);
                                        }), 128))
                                      ])
                                    ])
                                  ])
                                ])) : createCommentVNode("", true)
                              ]),
                              createVNode("div", { class: "bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6" }, [
                                createVNode("button", {
                                  type: "button",
                                  class: "inline-flex w-full justify-center rounded-lg bg-brand-navy px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-navy/90 sm:ml-3 sm:w-auto",
                                  onClick: ($event) => _ctx.$emit("close")
                                }, " Close ", 8, ["onClick"])
                              ])
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode(unref(TransitionChild), {
                      as: "template",
                      enter: "ease-out duration-300",
                      "enter-from": "opacity-0",
                      "enter-to": "opacity-100",
                      leave: "ease-in duration-200",
                      "leave-from": "opacity-100",
                      "leave-to": "opacity-0"
                    }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "fixed inset-0 bg-gray-500/75 backdrop-blur-sm transition-opacity" })
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "fixed inset-0 z-10 overflow-y-auto" }, [
                      createVNode("div", { class: "flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0" }, [
                        createVNode(unref(TransitionChild), {
                          as: "template",
                          enter: "ease-out duration-300",
                          "enter-from": "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
                          "enter-to": "opacity-100 translate-y-0 sm:scale-100",
                          leave: "ease-in duration-200",
                          "leave-from": "opacity-100 translate-y-0 sm:scale-100",
                          "leave-to": "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(DialogPanel), { class: "relative transform overflow-hidden rounded-xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg" }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 border-b border-gray-100" }, [
                                  createVNode("div", { class: "flex justify-between items-center" }, [
                                    createVNode(unref(DialogTitle), {
                                      as: "h3",
                                      class: "text-lg font-semibold leading-6 text-gray-900"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Generation Result ")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode("button", {
                                      onClick: ($event) => _ctx.$emit("close"),
                                      class: "text-gray-400 hover:text-gray-500"
                                    }, [
                                      createVNode(unref(X), { class: "w-5 h-5" })
                                    ], 8, ["onClick"])
                                  ])
                                ]),
                                createVNode("div", { class: "px-6 py-6 space-y-4" }, [
                                  __props.generated > 0 ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "flex items-center p-4 bg-green-50 rounded-lg"
                                  }, [
                                    createVNode(unref(CircleCheckBig), { class: "w-6 h-6 text-green-500 mr-3" }),
                                    createVNode("div", null, [
                                      createVNode("h4", { class: "text-sm font-medium text-green-800" }, "Available Payrolls Generated"),
                                      createVNode("p", { class: "text-sm text-green-600" }, toDisplayString(__props.generated) + " payrolls created successfully.", 1)
                                    ])
                                  ])) : createCommentVNode("", true),
                                  __props.failed.length > 0 ? (openBlock(), createBlock("div", {
                                    key: 1,
                                    class: "space-y-3"
                                  }, [
                                    createVNode("div", { class: "flex items-center p-4 bg-red-50 rounded-lg" }, [
                                      createVNode(unref(CircleX), { class: "w-6 h-6 text-red-500 mr-3" }),
                                      createVNode("div", null, [
                                        createVNode("h4", { class: "text-sm font-medium text-red-800" }, "Failed to Generate"),
                                        createVNode("p", { class: "text-sm text-red-600" }, toDisplayString(__props.failed.length) + " payrolls encountered errors.", 1)
                                      ])
                                    ]),
                                    createVNode("div", { class: "max-h-48 overflow-y-auto border border-gray-200 rounded-lg" }, [
                                      createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                                        createVNode("thead", { class: "bg-gray-50 sticky top-0" }, [
                                          createVNode("tr", null, [
                                            createVNode("th", { class: "px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase" }, "Employee"),
                                            createVNode("th", { class: "px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase" }, "Reason")
                                          ])
                                        ]),
                                        createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                                          (openBlock(true), createBlock(Fragment, null, renderList(__props.failed, (item, idx) => {
                                            return openBlock(), createBlock("tr", { key: idx }, [
                                              createVNode("td", { class: "px-4 py-2 text-sm text-gray-900" }, toDisplayString(item.employeeName || item.employeeId), 1),
                                              createVNode("td", { class: "px-4 py-2 text-sm text-red-600" }, toDisplayString(item.reason), 1)
                                            ]);
                                          }), 128))
                                        ])
                                      ])
                                    ])
                                  ])) : createCommentVNode("", true)
                                ]),
                                createVNode("div", { class: "bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6" }, [
                                  createVNode("button", {
                                    type: "button",
                                    class: "inline-flex w-full justify-center rounded-lg bg-brand-navy px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-navy/90 sm:ml-3 sm:w-auto",
                                    onClick: ($event) => _ctx.$emit("close")
                                  }, " Close ", 8, ["onClick"])
                                ])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Dialog), {
                as: "div",
                class: "relative z-50",
                onClose: ($event) => _ctx.$emit("close")
              }, {
                default: withCtx(() => [
                  createVNode(unref(TransitionChild), {
                    as: "template",
                    enter: "ease-out duration-300",
                    "enter-from": "opacity-0",
                    "enter-to": "opacity-100",
                    leave: "ease-in duration-200",
                    "leave-from": "opacity-100",
                    "leave-to": "opacity-0"
                  }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "fixed inset-0 bg-gray-500/75 backdrop-blur-sm transition-opacity" })
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "fixed inset-0 z-10 overflow-y-auto" }, [
                    createVNode("div", { class: "flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0" }, [
                      createVNode(unref(TransitionChild), {
                        as: "template",
                        enter: "ease-out duration-300",
                        "enter-from": "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
                        "enter-to": "opacity-100 translate-y-0 sm:scale-100",
                        leave: "ease-in duration-200",
                        "leave-from": "opacity-100 translate-y-0 sm:scale-100",
                        "leave-to": "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(DialogPanel), { class: "relative transform overflow-hidden rounded-xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 border-b border-gray-100" }, [
                                createVNode("div", { class: "flex justify-between items-center" }, [
                                  createVNode(unref(DialogTitle), {
                                    as: "h3",
                                    class: "text-lg font-semibold leading-6 text-gray-900"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Generation Result ")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode("button", {
                                    onClick: ($event) => _ctx.$emit("close"),
                                    class: "text-gray-400 hover:text-gray-500"
                                  }, [
                                    createVNode(unref(X), { class: "w-5 h-5" })
                                  ], 8, ["onClick"])
                                ])
                              ]),
                              createVNode("div", { class: "px-6 py-6 space-y-4" }, [
                                __props.generated > 0 ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "flex items-center p-4 bg-green-50 rounded-lg"
                                }, [
                                  createVNode(unref(CircleCheckBig), { class: "w-6 h-6 text-green-500 mr-3" }),
                                  createVNode("div", null, [
                                    createVNode("h4", { class: "text-sm font-medium text-green-800" }, "Available Payrolls Generated"),
                                    createVNode("p", { class: "text-sm text-green-600" }, toDisplayString(__props.generated) + " payrolls created successfully.", 1)
                                  ])
                                ])) : createCommentVNode("", true),
                                __props.failed.length > 0 ? (openBlock(), createBlock("div", {
                                  key: 1,
                                  class: "space-y-3"
                                }, [
                                  createVNode("div", { class: "flex items-center p-4 bg-red-50 rounded-lg" }, [
                                    createVNode(unref(CircleX), { class: "w-6 h-6 text-red-500 mr-3" }),
                                    createVNode("div", null, [
                                      createVNode("h4", { class: "text-sm font-medium text-red-800" }, "Failed to Generate"),
                                      createVNode("p", { class: "text-sm text-red-600" }, toDisplayString(__props.failed.length) + " payrolls encountered errors.", 1)
                                    ])
                                  ]),
                                  createVNode("div", { class: "max-h-48 overflow-y-auto border border-gray-200 rounded-lg" }, [
                                    createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                                      createVNode("thead", { class: "bg-gray-50 sticky top-0" }, [
                                        createVNode("tr", null, [
                                          createVNode("th", { class: "px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase" }, "Employee"),
                                          createVNode("th", { class: "px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase" }, "Reason")
                                        ])
                                      ]),
                                      createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                                        (openBlock(true), createBlock(Fragment, null, renderList(__props.failed, (item, idx) => {
                                          return openBlock(), createBlock("tr", { key: idx }, [
                                            createVNode("td", { class: "px-4 py-2 text-sm text-gray-900" }, toDisplayString(item.employeeName || item.employeeId), 1),
                                            createVNode("td", { class: "px-4 py-2 text-sm text-red-600" }, toDisplayString(item.reason), 1)
                                          ]);
                                        }), 128))
                                      ])
                                    ])
                                  ])
                                ])) : createCommentVNode("", true)
                              ]),
                              createVNode("div", { class: "bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6" }, [
                                createVNode("button", {
                                  type: "button",
                                  class: "inline-flex w-full justify-center rounded-lg bg-brand-navy px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-navy/90 sm:ml-3 sm:w-auto",
                                  onClick: ($event) => _ctx.$emit("close")
                                }, " Close ", 8, ["onClick"])
                              ])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ])
                  ])
                ]),
                _: 1
              }, 8, ["onClose"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/payroll/BulkGenerateResultModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const page = ref(1);
    const limit = ref(10);
    const status = ref("");
    const department = ref("");
    const isBulkModalOpen = ref(false);
    const isResultModalOpen = ref(false);
    const bulkResult = ref({ generated: 0, failed: [] });
    const filters = computed(() => ({
      page: page.value,
      limit: limit.value,
      status: status.value || void 0,
      department: department.value || void 0
    }));
    const { data: payrollsData, loading: isLoadingPayrolls, refresh: refreshPayrolls } = usePayrolls(filters);
    const { data: summary, loading: isLoadingSummary, refresh: refreshSummary } = usePayrollSummary();
    const { mutate: processPayrolls } = useProcessPayrolls();
    const { mutate: markPaid } = useMarkPayrollPaid();
    useDeletePayroll();
    const { mutate: bulkGenerate, loading: isBulkGenerating } = useBulkGeneratePayroll();
    const { mutate: generatePayslip } = useGeneratePayslip();
    useAllEmployees();
    const refreshAll = () => {
      refreshPayrolls();
      refreshSummary();
    };
    const handleProcess = async (id) => {
      await processPayrolls({ payrollIds: [id] }, {
        onSuccess: () => {
          refreshAll();
        }
      });
    };
    const handleMarkPaid = async (id) => {
      await markPaid(id, {
        onSuccess: () => refreshAll()
      });
    };
    const handleDelete = async (id) => {
      if (confirm("Are you sure you want to delete this payroll record?")) {
        try {
          const getUrl = (path) => `/api/${useRoute().params.tenant_slug}${path}`;
          await $fetch(getUrl(`/payroll/${id}`), { method: "DELETE" });
          refreshAll();
        } catch (e) {
          console.error(e);
        }
      }
    };
    const handleGeneratePayslip = async (id) => {
      if (confirm("Generate payslip for this payroll?")) {
        await generatePayslip({ payrollId: id }, {
          onSuccess: () => refreshAll(),
          onError: (err) => {
            if (err?.statusCode === 400) alert("Payslip already exists");
            else alert("Failed to generate payslip");
          }
        });
      }
    };
    const handleBulkGenerate = async (payload) => {
      await bulkGenerate(payload, {
        onSuccess: (res) => {
          bulkResult.value = { generated: res.generated, failed: res.failed };
          isBulkModalOpen.value = false;
          isResultModalOpen.value = true;
          refreshAll();
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"><div><h1 class="text-2xl font-bold text-gray-900">Payroll Management</h1><p class="text-gray-500">Process, view, and manage employee payrolls</p></div><div class="flex flex-wrap gap-3"><button class="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 flex items-center">`);
      _push(ssrRenderComponent(unref(Download), { class: "mr-2 h-4 w-4" }, null, _parent));
      _push(` Export </button><button class="px-4 py-2 rounded-lg text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 flex items-center shadow-sm">`);
      _push(ssrRenderComponent(unref(RefreshCw), { class: "mr-2 h-4 w-4" }, null, _parent));
      _push(` Bulk Generate </button>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "payroll/create",
        class: "px-4 py-2 rounded-lg text-sm font-medium text-white bg-brand-navy hover:bg-brand-navy/90 flex items-center shadow-sm"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Plus), { class: "mr-2 h-4 w-4" }, null, _parent2, _scopeId));
            _push2(` New Payroll `);
          } else {
            return [
              createVNode(unref(Plus), { class: "mr-2 h-4 w-4" }),
              createTextVNode(" New Payroll ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
      _push(ssrRenderComponent(_sfc_main$3, {
        summary: unref(summary),
        loading: unref(isLoadingSummary)
      }, null, _parent));
      _push(`<div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200"><div class="flex flex-col md:flex-row gap-4 mb-4"><div class="flex gap-4 w-full md:w-auto"><div class="relative w-full md:w-48"><select class="w-full appearance-none px-4 py-2.5 pr-10 border-2 border-gray-300 rounded-lg bg-white text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-brand-navy focus:border-brand-navy hover:border-gray-400 transition-colors cursor-pointer"><option value=""${ssrIncludeBooleanAttr(Array.isArray(status.value) ? ssrLooseContain(status.value, "") : ssrLooseEqual(status.value, "")) ? " selected" : ""}>All Statuses</option><option${ssrRenderAttr("value", unref(PayrollStatus).PENDING)}${ssrIncludeBooleanAttr(Array.isArray(status.value) ? ssrLooseContain(status.value, unref(PayrollStatus).PENDING) : ssrLooseEqual(status.value, unref(PayrollStatus).PENDING)) ? " selected" : ""}>Pending</option><option${ssrRenderAttr("value", unref(PayrollStatus).PROCESSED)}${ssrIncludeBooleanAttr(Array.isArray(status.value) ? ssrLooseContain(status.value, unref(PayrollStatus).PROCESSED) : ssrLooseEqual(status.value, unref(PayrollStatus).PROCESSED)) ? " selected" : ""}>Processed</option><option${ssrRenderAttr("value", unref(PayrollStatus).PAID)}${ssrIncludeBooleanAttr(Array.isArray(status.value) ? ssrLooseContain(status.value, unref(PayrollStatus).PAID) : ssrLooseEqual(status.value, unref(PayrollStatus).PAID)) ? " selected" : ""}>Paid</option></select>`);
      _push(ssrRenderComponent(unref(ChevronDown), { class: "absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 pointer-events-none" }, null, _parent));
      _push(`</div><div class="relative w-full md:w-48"><select class="w-full appearance-none px-4 py-2.5 pr-10 border-2 border-gray-300 rounded-lg bg-white text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-brand-navy focus:border-brand-navy hover:border-gray-400 transition-colors cursor-pointer"><option value=""${ssrIncludeBooleanAttr(Array.isArray(department.value) ? ssrLooseContain(department.value, "") : ssrLooseEqual(department.value, "")) ? " selected" : ""}>All Departments</option><option value="IT"${ssrIncludeBooleanAttr(Array.isArray(department.value) ? ssrLooseContain(department.value, "IT") : ssrLooseEqual(department.value, "IT")) ? " selected" : ""}>IT</option><option value="HR"${ssrIncludeBooleanAttr(Array.isArray(department.value) ? ssrLooseContain(department.value, "HR") : ssrLooseEqual(department.value, "HR")) ? " selected" : ""}>HR</option><option value="Finance"${ssrIncludeBooleanAttr(Array.isArray(department.value) ? ssrLooseContain(department.value, "Finance") : ssrLooseEqual(department.value, "Finance")) ? " selected" : ""}>Finance</option></select>`);
      _push(ssrRenderComponent(unref(ChevronDown), { class: "absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 pointer-events-none" }, null, _parent));
      _push(`</div></div></div>`);
      _push(ssrRenderComponent(_sfc_main$4, {
        payrolls: unref(payrollsData)?.data || [],
        loading: unref(isLoadingPayrolls),
        isAdmin: true,
        onProcess: handleProcess,
        onMarkPaid: handleMarkPaid,
        onDelete: handleDelete,
        onGeneratePayslip: handleGeneratePayslip
      }, null, _parent));
      if (unref(payrollsData)) {
        _push(`<div class="flex items-center justify-between mt-4 px-2"><div class="text-sm text-gray-500"> Showing ${ssrInterpolate((page.value - 1) * limit.value + 1)} to ${ssrInterpolate(Math.min(page.value * limit.value, unref(payrollsData).total))} of ${ssrInterpolate(unref(payrollsData).total)} results </div><div class="flex space-x-2"><button${ssrIncludeBooleanAttr(page.value === 1) ? " disabled" : ""} class="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"> Previous </button><button${ssrIncludeBooleanAttr(page.value >= unref(payrollsData).totalPages) ? " disabled" : ""} class="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"> Next </button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        isOpen: isBulkModalOpen.value,
        isLoading: unref(isBulkGenerating),
        onClose: ($event) => isBulkModalOpen.value = false,
        onSubmit: handleBulkGenerate
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, {
        isOpen: isResultModalOpen.value,
        generated: bulkResult.value.generated,
        failed: bulkResult.value.failed,
        onClose: ($event) => isResultModalOpen.value = false
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[tenant_slug]/dashboard/payroll/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-DbnmJ9nl.js.map
