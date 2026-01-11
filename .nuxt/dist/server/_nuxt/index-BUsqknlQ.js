import { _ as _sfc_main$3 } from "./Button-gKFWS_xI.js";
import { defineComponent, ref, watch, computed, mergeProps, unref, withCtx, createTextVNode, useSSRContext, createVNode } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrRenderStyle } from "vue/server-renderer";
import { u as useAllEmployees } from "./useEmployees-CEaIsP48.js";
import { u as useActiveLeavePeriod, a as useLeaveTypes, f as useEmployeeLeaveBalances } from "./useLeaves-DMmgn55L.js";
import { format } from "date-fns";
import { _ as _sfc_main$2 } from "./Input-CKYYc_rG.js";
import { P as Plus, b as Calendar, y as Search, H as Briefcase, w as SquarePen } from "../server.mjs";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/hookable/dist/index.mjs";
import "./nuxt-link-DsceMx1n.js";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/ufo/dist/index.mjs";
import "./index-B7s_3MI_.js";
import "clsx";
import "tailwind-merge";
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
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/klona/dist/index.mjs";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/destr/dist/index.mjs";
import "uuid";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AssignBalanceModal",
  __ssrInlineRender: true,
  props: {
    isOpen: { type: Boolean },
    employeeId: {},
    employeeName: {},
    leaveTypes: {}
  },
  emits: ["close", "assigned"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const selectedTypeId = ref("");
    const quota = ref(0);
    const loading = ref(false);
    watch(() => selectedTypeId.value, (newVal) => {
      const type = props.leaveTypes.find((t) => String(t.id) === newVal);
      if (type) quota.value = type.defaultQuota;
    });
    const selectedType = computed(() => props.leaveTypes.find((t) => String(t.id) === selectedTypeId.value));
    const handleAssign = async () => {
      console.log("Assigning balance:", {
        employeeId: props.employeeId,
        leaveTypeConfigId: selectedTypeId.value,
        quota: quota.value
      });
      loading.value = true;
      setTimeout(() => {
        loading.value = false;
        emit("assigned");
        emit("close");
      }, 1e3);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiInput = _sfc_main$2;
      const _component_UiButton = _sfc_main$3;
      if (__props.isOpen) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" }, _attrs))}><div class="bg-white rounded-lg shadow-xl w-full max-w-md"><div class="p-6 border-b flex justify-between items-center"><h3 class="text-lg font-bold">Assign Leave Balance</h3><button class="text-gray-500 hover:text-gray-700">`);
        _push(ssrRenderComponent(unref(Plus), { class: "w-5 h-5 rotate-45" }, null, _parent));
        _push(`</button></div><div class="p-6 space-y-4"><div><p class="text-sm text-gray-600">Employee</p><p className="font-medium text-gray-900">${ssrInterpolate(__props.employeeName)}</p></div><div class="space-y-2"><label class="text-sm font-medium text-gray-700">Leave Type</label><select class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy"><option value=""${ssrIncludeBooleanAttr(Array.isArray(selectedTypeId.value) ? ssrLooseContain(selectedTypeId.value, "") : ssrLooseEqual(selectedTypeId.value, "")) ? " selected" : ""}>-- Select Leave Type --</option><!--[-->`);
        ssrRenderList(__props.leaveTypes, (type) => {
          _push(`<option${ssrRenderAttr("value", String(type.id))}${ssrIncludeBooleanAttr(Array.isArray(selectedTypeId.value) ? ssrLooseContain(selectedTypeId.value, String(type.id)) : ssrLooseEqual(selectedTypeId.value, String(type.id))) ? " selected" : ""}>${ssrInterpolate(type.name)}</option>`);
        });
        _push(`<!--]--></select></div>`);
        _push(ssrRenderComponent(_component_UiInput, {
          label: "Quota (Days)",
          type: "number",
          modelValue: quota.value,
          "onUpdate:modelValue": ($event) => quota.value = $event,
          modelModifiers: { number: true },
          placeholder: "Enter quota"
        }, null, _parent));
        if (unref(selectedType)) {
          _push(`<div class="text-xs text-gray-500 bg-gray-50 p-3 rounded"> Default quota for ${ssrInterpolate(unref(selectedType).name)}: ${ssrInterpolate(unref(selectedType).defaultQuota)} days </div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="flex justify-end gap-3 pt-4">`);
        _push(ssrRenderComponent(_component_UiButton, {
          type: "button",
          variant: "ghost",
          onClick: ($event) => _ctx.$emit("close")
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Cancel `);
            } else {
              return [
                createTextVNode(" Cancel ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_UiButton, {
          onClick: handleAssign,
          disabled: !selectedTypeId.value || quota.value <= 0 || loading.value
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Assign Balance `);
            } else {
              return [
                createTextVNode(" Assign Balance ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/leaves/AssignBalanceModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const selectedEmployeeId = ref("");
    const searchQuery = ref("");
    const isAssignModalOpen = ref(false);
    const { data: employees } = useAllEmployees();
    const { data: activePeriod } = useActiveLeavePeriod();
    const periodId = computed(() => activePeriod.value?.id);
    const { data: leaveTypes } = useLeaveTypes(periodId);
    const { data: balancesData, loading: isLoadingBalances, refresh: refreshBalances } = useEmployeeLeaveBalances(selectedEmployeeId);
    const balances = computed(() => {
      if (!balancesData.value) return [];
      if (Array.isArray(balancesData.value)) return balancesData.value;
      return balancesData.value.data || [];
    });
    const filteredEmployees = computed(() => {
      if (!employees.value) return [];
      const query = searchQuery.value.toLowerCase();
      return employees.value.filter((emp) => {
        const fullName = `${emp.firstName} ${emp.lastName}`.toLowerCase();
        const position = emp.position?.toLowerCase() || "";
        return fullName.includes(query) || position.includes(query);
      });
    });
    const selectedEmployee = computed(
      () => employees.value?.find((emp) => String(emp.id) === selectedEmployeeId.value)
    );
    const onBalanceAssigned = () => {
      refreshBalances();
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiButton = _sfc_main$3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" }, _attrs))}><div class="md:flex md:items-center md:justify-between"><div class="flex-1 min-w-0"><h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate"> Leave Administration </h2><p class="mt-1 text-sm text-gray-500"> Manage employee leave balances and quotas </p></div></div>`);
      if (unref(activePeriod)) {
        _push(`<div class="bg-blue-50 border border-blue-200 rounded-lg p-4"><div class="flex items-center gap-3">`);
        _push(ssrRenderComponent(unref(Calendar), { class: "w-5 h-5 text-blue-600" }, null, _parent));
        _push(`<div><p class="text-sm font-medium text-blue-900"> Active Period: ${ssrInterpolate(unref(activePeriod).name)}</p><p class="text-xs text-blue-700">${ssrInterpolate(unref(format)(new Date(unref(activePeriod).startDate), "MMM d, yyyy"))} - ${ssrInterpolate(unref(format)(new Date(unref(activePeriod).endDate), "MMM d, yyyy"))}</p></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4"><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div class="space-y-2"><label class="text-sm font-medium text-gray-700">Search Employee</label><div class="relative">`);
      _push(ssrRenderComponent(unref(Search), { class: "absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" }, null, _parent));
      _push(`<input type="text" class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy focus:ring-offset-2" placeholder="Search by name or position..."${ssrRenderAttr("value", searchQuery.value)}></div></div><div class="space-y-2"><label class="text-sm font-medium text-gray-700">Select Employee</label><select class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy focus:ring-offset-2"><option value=""${ssrIncludeBooleanAttr(Array.isArray(selectedEmployeeId.value) ? ssrLooseContain(selectedEmployeeId.value, "") : ssrLooseEqual(selectedEmployeeId.value, "")) ? " selected" : ""}>-- Select Employee --</option><!--[-->`);
      ssrRenderList(filteredEmployees.value, (emp) => {
        _push(`<option${ssrRenderAttr("value", String(emp.id))}${ssrIncludeBooleanAttr(Array.isArray(selectedEmployeeId.value) ? ssrLooseContain(selectedEmployeeId.value, String(emp.id)) : ssrLooseEqual(selectedEmployeeId.value, String(emp.id))) ? " selected" : ""}>${ssrInterpolate(emp.firstName)} ${ssrInterpolate(emp.lastName)} (${ssrInterpolate(emp.position)}) </option>`);
      });
      _push(`<!--]--></select></div></div></div>`);
      if (!selectedEmployeeId.value) {
        _push(`<div class="text-center py-12 bg-white rounded-xl shadow-sm border border-dashed border-gray-300">`);
        _push(ssrRenderComponent(unref(Search), { class: "w-12 h-12 text-gray-300 mx-auto mb-3" }, null, _parent));
        _push(`<p class="text-gray-500 text-lg">Select an employee to view their leave balances</p></div>`);
      } else {
        _push(`<div class="space-y-6"><div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6"><div class="flex items-center justify-between"><div class="flex items-center gap-4"><div class="h-12 w-12 rounded-full bg-brand-navy flex items-center justify-center text-white"><span class="text-lg font-bold">${ssrInterpolate(selectedEmployee.value?.firstName.charAt(0))}${ssrInterpolate(selectedEmployee.value?.lastName.charAt(0))}</span></div><div><h3 class="text-lg font-semibold text-gray-900">${ssrInterpolate(selectedEmployee.value?.firstName)} ${ssrInterpolate(selectedEmployee.value?.lastName)}</h3><p class="text-sm text-gray-500">${ssrInterpolate(selectedEmployee.value?.position)}</p></div></div>`);
        _push(ssrRenderComponent(_component_UiButton, {
          onClick: ($event) => isAssignModalOpen.value = true
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(Plus), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
              _push2(` Assign Leave Balance `);
            } else {
              return [
                createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                createTextVNode(" Assign Leave Balance ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div><div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"><div class="px-6 py-5 border-b border-gray-200 bg-gray-50"><h3 class="text-lg font-medium leading-6 text-gray-900">Leave Balances</h3><p class="mt-1 text-sm text-gray-500">Current leave quotas and usage</p></div>`);
        if (unref(isLoadingBalances)) {
          _push(`<div class="p-8 text-center">Loading balances...</div>`);
        } else if (!balances.value || balances.value.length === 0) {
          _push(`<div class="p-8 text-center">`);
          _push(ssrRenderComponent(unref(Briefcase), { class: "w-12 h-12 text-gray-300 mx-auto mb-3" }, null, _parent));
          _push(`<p class="text-gray-500">No leave balances assigned yet</p>`);
          _push(ssrRenderComponent(_component_UiButton, {
            variant: "ghost",
            onClick: ($event) => isAssignModalOpen.value = true,
            class: "mt-4"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Assign First Balance `);
              } else {
                return [
                  createTextVNode(" Assign First Balance ")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div>`);
        } else {
          _push(`<div class="overflow-x-auto"><table class="min-w-full divide-y divide-gray-200"><thead class="bg-gray-50"><tr><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leave Type</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Quota</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Used</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remaining</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valid Period</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th><th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th></tr></thead><tbody class="bg-white divide-y divide-gray-200"><!--[-->`);
          ssrRenderList(balances.value, (balance) => {
            _push(`<tr class="hover:bg-gray-50"><td class="px-6 py-4 whitespace-nowrap"><div class="flex items-center">`);
            _push(ssrRenderComponent(unref(Briefcase), { class: "w-5 h-5 text-gray-400 mr-3" }, null, _parent));
            _push(`<div class="text-sm font-medium text-gray-900">${ssrInterpolate(balance.leaveTypeName)}</div></div></td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${ssrInterpolate(balance.totalQuota)} days </td><td class="px-6 py-4 whitespace-nowrap"><div class="flex items-center gap-2"><span class="text-sm text-gray-900">${ssrInterpolate(balance.usedQuota)} days</span><div class="w-24 bg-gray-200 rounded-full h-2"><div class="${ssrRenderClass(`h-2 rounded-full ${balance.usedQuota / balance.totalQuota * 100 >= 90 ? "bg-red-500" : balance.usedQuota / balance.totalQuota * 100 >= 70 ? "bg-yellow-500" : "bg-green-500"}`)}" style="${ssrRenderStyle({ width: `${Math.min(balance.usedQuota / balance.totalQuota * 100, 100)}%` })}"></div></div></div></td><td class="px-6 py-4 whitespace-nowrap"><span class="${ssrRenderClass(`text-sm font-medium ${balance.remainingQuota <= 0 ? "text-red-600" : balance.remainingQuota <= 3 ? "text-yellow-600" : "text-green-600"}`)}">${ssrInterpolate(balance.remainingQuota)} days </span></td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${ssrInterpolate(unref(format)(new Date(balance.validFrom), "MMM d, yy"))} - ${ssrInterpolate(unref(format)(new Date(balance.validTo), "MMM d, yy"))}</td><td class="px-6 py-4 whitespace-nowrap">`);
            if (balance.isActive) {
              _push(`<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Active</span>`);
            } else {
              _push(`<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Inactive</span>`);
            }
            _push(`</td><td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">`);
            _push(ssrRenderComponent(_component_UiButton, {
              variant: "ghost",
              class: "h-8 px-2"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(ssrRenderComponent(unref(SquarePen), { class: "w-4 h-4" }, null, _parent2, _scopeId));
                } else {
                  return [
                    createVNode(unref(SquarePen), { class: "w-4 h-4" })
                  ];
                }
              }),
              _: 2
            }, _parent));
            _push(`</td></tr>`);
          });
          _push(`<!--]--></tbody></table></div>`);
        }
        _push(`</div></div>`);
      }
      _push(ssrRenderComponent(_sfc_main$1, {
        isOpen: isAssignModalOpen.value,
        employeeId: selectedEmployeeId.value,
        employeeName: selectedEmployee.value ? `${selectedEmployee.value.firstName} ${selectedEmployee.value.lastName}` : "",
        leaveTypes: unref(leaveTypes) || [],
        onClose: ($event) => isAssignModalOpen.value = false,
        onAssigned: onBalanceAssigned
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[tenant_slug]/dashboard/leaves/admin/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-BUsqknlQ.js.map
