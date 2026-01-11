import { _ as _sfc_main$2 } from './Button-gKFWS_xI.mjs';
import { defineComponent, ref, computed, mergeProps, withCtx, unref, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderAttr } from 'vue/server-renderer';
import { u as useMyLeaveBalances, a as useMyLeaveRequests, b as useCancelLeaveRequest, c as useActiveLeavePeriod, d as useLeaveTypes, e as useCreateLeaveRequest } from './useLeaves-DMmgn55L.mjs';
import { format, formatDistanceToNow } from 'date-fns';
import { _ as _sfc_main$3 } from './Input-CKYYc_rG.mjs';
import { TransitionRoot, Dialog, TransitionChild, DialogPanel, DialogTitle } from '@headlessui/vue';
import { P as Plus, H as Briefcase, b as Calendar, I as ChevronRight, C as CircleCheck, f as Clock, h as CircleX, J as CircleAlert, X } from './server.mjs';
import './nuxt-link-DsceMx1n.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import './index-B7s_3MI_.mjs';
import 'clsx';
import 'tailwind-merge';
import './fetch-VuP8VKdC.mjs';
import '@vue/shared';
import 'perfect-debounce';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';
import 'uuid';

var LeaveRequestStatus = /* @__PURE__ */ ((LeaveRequestStatus2) => {
  LeaveRequestStatus2["PENDING"] = "PENDING";
  LeaveRequestStatus2["MANAGER_APPROVED"] = "MANAGER_APPROVED";
  LeaveRequestStatus2["HR_APPROVED"] = "HR_APPROVED";
  LeaveRequestStatus2["APPROVED"] = "APPROVED";
  LeaveRequestStatus2["REJECTED"] = "REJECTED";
  LeaveRequestStatus2["CANCELLED"] = "CANCELLED";
  return LeaveRequestStatus2;
})(LeaveRequestStatus || {});
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "LeaveRequestForm",
  __ssrInlineRender: true,
  emits: ["success", "cancel"],
  setup(__props, { emit: __emit }) {
    const { data: activePeriod } = useActiveLeavePeriod();
    const periodId = computed(() => {
      var _a;
      return (_a = activePeriod.value) == null ? void 0 : _a.id;
    });
    const { data: leaveTypes } = useLeaveTypes(periodId);
    const { loading: isPending } = useCreateLeaveRequest();
    const form = ref({
      leaveTypeConfigId: "",
      startDate: "",
      endDate: "",
      reason: "",
      emergencyContact: "",
      handoverNotes: ""
    });
    const errors = ref({});
    const selectedType = computed(() => {
      var _a;
      return (_a = leaveTypes.value) == null ? void 0 : _a.find((t) => String(t.id) === String(form.value.leaveTypeConfigId));
    });
    const estDays = computed(() => {
      if (form.value.startDate && form.value.endDate) {
        const start = new Date(form.value.startDate);
        const end = new Date(form.value.endDate);
        if (!isNaN(start.getTime()) && !isNaN(end.getTime()) && end >= start) {
          const diffTime = Math.abs(end.getTime() - start.getTime());
          return Math.ceil(diffTime / (1e3 * 60 * 60 * 24)) + 1;
        }
      }
      return 0;
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_UiInput = _sfc_main$3;
      const _component_UiButton = _sfc_main$2;
      _push(`<form${ssrRenderAttrs(mergeProps({ class: "space-y-4" }, _attrs))}>`);
      if (!unref(activePeriod)) {
        _push(`<div class="p-4 bg-yellow-50 text-yellow-800 rounded-md"> No active leave period found. Please contact HR. </div>`);
      } else {
        _push(`<!--[--><div class="space-y-2"><label class="text-sm font-medium text-gray-700">Leave Type</label><select class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-navy focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"><option value=""${ssrIncludeBooleanAttr(Array.isArray(form.value.leaveTypeConfigId) ? ssrLooseContain(form.value.leaveTypeConfigId, "") : ssrLooseEqual(form.value.leaveTypeConfigId, "")) ? " selected" : ""}>Select Leave Type</option><!--[-->`);
        ssrRenderList((_a = unref(leaveTypes)) == null ? void 0 : _a.filter((t) => t.isActive), (type) => {
          _push(`<option${ssrRenderAttr("value", String(type.id))}${ssrIncludeBooleanAttr(Array.isArray(form.value.leaveTypeConfigId) ? ssrLooseContain(form.value.leaveTypeConfigId, String(type.id)) : ssrLooseEqual(form.value.leaveTypeConfigId, String(type.id))) ? " selected" : ""}>${ssrInterpolate(type.name)}</option>`);
        });
        _push(`<!--]--></select>`);
        if (errors.value.leaveTypeConfigId) {
          _push(`<p class="text-xs text-red-500">${ssrInterpolate(errors.value.leaveTypeConfigId)}</p>`);
        } else {
          _push(`<!---->`);
        }
        if (selectedType.value) {
          _push(`<div class="text-xs text-gray-500 mt-1"> Max ${ssrInterpolate(selectedType.value.maxConsecutiveDays)} consecutive days. Notice: ${ssrInterpolate(selectedType.value.advanceNoticeDays)} days. </div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="grid grid-cols-2 gap-4">`);
        _push(ssrRenderComponent(_component_UiInput, {
          label: "Start Date",
          type: "date",
          modelValue: form.value.startDate,
          "onUpdate:modelValue": ($event) => form.value.startDate = $event,
          error: errors.value.startDate
        }, null, _parent));
        _push(ssrRenderComponent(_component_UiInput, {
          label: "End Date",
          type: "date",
          modelValue: form.value.endDate,
          "onUpdate:modelValue": ($event) => form.value.endDate = $event,
          error: errors.value.endDate
        }, null, _parent));
        _push(`</div>`);
        if (estDays.value > 0) {
          _push(`<div class="text-sm text-brand-navy font-medium">Estimated Duration: ${ssrInterpolate(estDays.value)} Days</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="space-y-1"><label class="text-sm font-medium text-gray-700">Reason</label><textarea class="w-full min-h-[80px] border border-gray-300 rounded-md p-2 focus:ring-brand-navy focus:border-brand-navy" placeholder="Why are you taking leave?">${ssrInterpolate(form.value.reason)}</textarea>`);
        if (errors.value.reason) {
          _push(`<p class="text-xs text-red-500">${ssrInterpolate(errors.value.reason)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        _push(ssrRenderComponent(_component_UiInput, {
          label: "Emergency Contact",
          modelValue: form.value.emergencyContact,
          "onUpdate:modelValue": ($event) => form.value.emergencyContact = $event,
          placeholder: "+62...",
          error: errors.value.emergencyContact
        }, null, _parent));
        _push(`<div class="space-y-1"><label class="text-sm font-medium text-gray-700">Handover Notes (Optional)</label><textarea class="w-full min-h-[60px] border border-gray-300 rounded-md p-2 focus:ring-brand-navy focus:border-brand-navy" placeholder="Who will cover your tasks?">${ssrInterpolate(form.value.handoverNotes)}</textarea></div><div class="flex justify-end gap-3 pt-4">`);
        _push(ssrRenderComponent(_component_UiButton, {
          type: "button",
          variant: "ghost",
          onClick: ($event) => _ctx.$emit("cancel")
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Cancel`);
            } else {
              return [
                createTextVNode("Cancel")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_UiButton, {
          type: "submit",
          disabled: unref(isPending) || !unref(activePeriod)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Submit Request`);
            } else {
              return [
                createTextVNode("Submit Request")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><!--]-->`);
      }
      _push(`</form>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/leaves/LeaveRequestForm.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { data: balances, loading: isLoadingBalances } = useMyLeaveBalances();
    const { data: requestsData, loading: isLoadingRequests, refresh: refreshRequests } = useMyLeaveRequests({ page: 1, limit: 50 });
    const { mutate: cancelRequest } = useCancelLeaveRequest();
    const isModalOpen = ref(false);
    const requests = computed(() => {
      const data = requestsData.value;
      if (!data) return [];
      if (Array.isArray(data)) return data;
      return data.data || [];
    });
    const handleCancel = async (id) => {
      if (confirm("Are you sure you want to cancel this request?")) {
        await cancelRequest(id);
        refreshRequests();
      }
    };
    const onFormSuccess = () => {
      isModalOpen.value = false;
      refreshRequests();
    };
    const gradients = [
      "from-blue-500 to-cyan-400",
      "from-emerald-500 to-teal-400",
      "from-violet-500 to-purple-400",
      "from-orange-500 to-amber-400"
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiButton = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" }, _attrs))}><div class="md:flex md:items-center md:justify-between"><div class="flex-1 min-w-0"><h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate"> Leave Management </h2><p class="mt-1 text-sm text-gray-500"> View your balances and track your leave requests </p></div><div class="mt-4 flex md:mt-0 md:ml-4">`);
      _push(ssrRenderComponent(_component_UiButton, {
        onClick: ($event) => isModalOpen.value = true,
        class: "shadow-lg shadow-brand-navy/20"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Plus), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
            _push2(` New Request `);
          } else {
            return [
              createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
              createTextVNode(" New Request ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">`);
      if (unref(isLoadingBalances)) {
        _push(`<!--[-->`);
        ssrRenderList(3, (i) => {
          _push(`<div class="h-40 bg-gray-100 rounded-xl animate-pulse"></div>`);
        });
        _push(`<!--]-->`);
      } else if (!unref(balances) || unref(balances).length === 0) {
        _push(`<div class="col-span-full bg-white rounded-xl shadow-sm p-8 text-center border border-dashed border-gray-300">`);
        _push(ssrRenderComponent(unref(Briefcase), { class: "w-12 h-12 text-gray-400 mx-auto mb-3" }, null, _parent));
        _push(`<h3 class="text-lg font-medium text-gray-900">No Leave Balances</h3><p class="text-gray-500 mt-1">You don&#39;t have any assigned leave quotas yet.</p></div>`);
      } else {
        _push(`<!--[-->`);
        ssrRenderList(unref(balances), (balance, idx) => {
          _push(`<div class="${ssrRenderClass(`relative overflow-hidden rounded-xl shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-gradient-to-br ${gradients[idx % gradients.length]}`)}"><div class="px-6 py-6 text-white relative z-10"><div class="flex justify-between items-start"><div><p class="text-white/80 text-sm font-medium mb-1">Leave Type</p><h3 class="text-2xl font-bold tracking-tight">${ssrInterpolate(balance.leaveTypeName)}</h3></div><div class="bg-white/20 p-2 rounded-lg backdrop-blur-sm">`);
          _push(ssrRenderComponent(unref(Briefcase), { class: "w-6 h-6 text-white" }, null, _parent));
          _push(`</div></div><div class="mt-8 flex items-end justify-between"><div><p class="text-white/80 text-xs font-medium uppercase tracking-wider">Remaining</p><p class="text-4xl font-extrabold mt-1">${ssrInterpolate(balance.remainingQuota)}</p></div><div class="text-right"><p class="text-white/80 text-xs mb-1">Total Quota: ${ssrInterpolate(balance.totalQuota)}</p><p class="text-white/80 text-xs">Used: ${ssrInterpolate(balance.usedQuota)}</p></div></div></div><div class="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div><div class="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-black/10 rounded-full blur-xl"></div></div>`);
        });
        _push(`<!--]-->`);
      }
      _push(`</div><div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"><div class="px-6 py-5 border-b border-gray-200 bg-gray-50 flex items-center justify-between"><div><h3 class="text-lg font-medium leading-6 text-gray-900">Recent Requests</h3><p class="mt-1 text-sm text-gray-500">History of your leave applications</p></div></div><div class="overflow-x-auto"><table class="min-w-full divide-y divide-gray-200"><thead class="bg-gray-50"><tr><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> Type &amp; Reason </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> Duration </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> Date Submitted </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> Status </th><th scope="col" class="relative px-6 py-3"><span class="sr-only">Actions</span></th></tr></thead><tbody class="bg-white divide-y divide-gray-200">`);
      if (unref(isLoadingRequests)) {
        _push(`<!--[-->`);
        ssrRenderList(3, (i) => {
          _push(`<tr><td class="px-6 py-4 whitespace-nowrap"><div class="h-4 bg-gray-100 rounded w-3/4 animate-pulse"></div></td><td class="px-6 py-4 whitespace-nowrap"><div class="h-4 bg-gray-100 rounded w-1/2 animate-pulse"></div></td><td class="px-6 py-4 whitespace-nowrap"><div class="h-4 bg-gray-100 rounded w-1/2 animate-pulse"></div></td><td class="px-6 py-4 whitespace-nowrap"><div class="h-4 bg-gray-100 rounded w-1/4 animate-pulse"></div></td><td class="px-6 py-4 whitespace-nowrap text-right"><div class="h-4 bg-gray-100 rounded w-8 animate-pulse ml-auto"></div></td></tr>`);
        });
        _push(`<!--]-->`);
      } else if (requests.value.length === 0) {
        _push(`<tr><td colspan="5" class="px-6 py-12 text-center text-gray-500"><div class="flex flex-col items-center justify-center">`);
        _push(ssrRenderComponent(unref(Calendar), { class: "w-12 h-12 text-gray-300 mb-3" }, null, _parent));
        _push(`<p class="text-lg font-medium text-gray-900">No requests found</p><p class="text-sm text-gray-500 mt-1">You haven&#39;t applied for any leave yet.</p>`);
        _push(ssrRenderComponent(_component_UiButton, {
          variant: "ghost",
          onClick: ($event) => isModalOpen.value = true,
          class: "mt-4 text-brand-navy hover:bg-blue-50"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Apply Now `);
              _push2(ssrRenderComponent(unref(ChevronRight), { class: "w-4 h-4 ml-1" }, null, _parent2, _scopeId));
            } else {
              return [
                createTextVNode(" Apply Now "),
                createVNode(unref(ChevronRight), { class: "w-4 h-4 ml-1" })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></td></tr>`);
      } else {
        _push(`<!--[-->`);
        ssrRenderList(requests.value, (req) => {
          _push(`<tr class="hover:bg-gray-50 transition-colors"><td class="px-6 py-4"><div class="flex items-center"><div><div class="text-sm font-medium text-gray-900">${ssrInterpolate(req.leaveTypeName)}</div><div class="text-sm text-gray-500 max-w-xs truncate">${ssrInterpolate(req.reason)}</div></div></div></td><td class="px-6 py-4 whitespace-nowrap"><div class="text-sm text-gray-900">${ssrInterpolate(unref(format)(new Date(req.startDate), "MMM d"))} - ${ssrInterpolate(unref(format)(new Date(req.endDate), "MMM d, yyyy"))}</div><div class="text-xs text-gray-500 mt-0.5">${ssrInterpolate(req.totalDays)} day${ssrInterpolate(req.totalDays > 1 ? "s" : "")}</div></td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${ssrInterpolate(req.submittedAt ? unref(formatDistanceToNow)(new Date(req.submittedAt), { addSuffix: true }) : "-")}</td><td class="px-6 py-4 whitespace-nowrap">`);
          if (req.status === unref(LeaveRequestStatus).APPROVED || req.hrApprovalStatus === "APPROVED") {
            _push(`<div class="flex flex-col gap-1"><span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">`);
            _push(ssrRenderComponent(unref(CircleCheck), { class: "w-3 h-3 mr-1" }, null, _parent));
            _push(` Approved </span><span class="text-xs text-gray-500">by HR</span></div>`);
          } else if (req.status === unref(LeaveRequestStatus).MANAGER_APPROVED || req.managerApprovedAt && req.hrApprovalStatus === "PENDING") {
            _push(`<div class="flex flex-col gap-1"><span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">`);
            _push(ssrRenderComponent(unref(CircleCheck), { class: "w-3 h-3 mr-1" }, null, _parent));
            _push(` Manager Approved </span><span class="text-xs text-gray-500">waiting for HR</span></div>`);
          } else if (req.status === unref(LeaveRequestStatus).PENDING) {
            _push(`<div class="flex flex-col gap-1"><span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">`);
            _push(ssrRenderComponent(unref(Clock), { class: "w-3 h-3 mr-1" }, null, _parent));
            _push(` Pending </span><span class="text-xs text-gray-500">waiting for Manager/HR</span></div>`);
          } else if (req.status === unref(LeaveRequestStatus).REJECTED || req.hrApprovalStatus === "REJECTED") {
            _push(`<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">`);
            _push(ssrRenderComponent(unref(CircleX), { class: "w-3 h-3 mr-1" }, null, _parent));
            _push(` Rejected </span>`);
          } else if (req.status === unref(LeaveRequestStatus).CANCELLED) {
            _push(`<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">`);
            _push(ssrRenderComponent(unref(CircleAlert), { class: "w-3 h-3 mr-1" }, null, _parent));
            _push(` Cancelled </span>`);
          } else {
            _push(`<span class="text-gray-500">${ssrInterpolate(req.status)}</span>`);
          }
          _push(`</td><td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">`);
          if (req.status === unref(LeaveRequestStatus).PENDING || req.status === unref(LeaveRequestStatus).MANAGER_APPROVED) {
            _push(ssrRenderComponent(_component_UiButton, {
              variant: "destructive",
              class: "bg-white text-red-600 border border-red-200 hover:bg-red-50 hover:border-red-300 focus:ring-red-200 py-1 px-3 text-xs h-auto shadow-sm",
              onClick: ($event) => handleCancel(req.id)
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
              _: 2
            }, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`</td></tr>`);
        });
        _push(`<!--]-->`);
      }
      _push(`</tbody></table></div></div>`);
      _push(ssrRenderComponent(unref(TransitionRoot), {
        as: "template",
        show: isModalOpen.value
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Dialog), {
              as: "div",
              class: "relative z-50",
              onClose: ($event) => isModalOpen.value = false
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
                        _push4(`<div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"${_scopeId3}></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" })
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
                        _push4(ssrRenderComponent(unref(DialogPanel), { class: "relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 border-b border-gray-100"${_scopeId4}><div class="flex justify-between items-center"${_scopeId4}>`);
                              _push5(ssrRenderComponent(unref(DialogTitle), {
                                as: "h3",
                                class: "text-lg font-semibold leading-6 text-gray-900"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Apply for Leave`);
                                  } else {
                                    return [
                                      createTextVNode("Apply for Leave")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`<button class="text-gray-400 hover:text-gray-500"${_scopeId4}>`);
                              _push5(ssrRenderComponent(unref(X), { class: "w-5 h-5" }, null, _parent5, _scopeId4));
                              _push5(`</button></div></div><div class="px-4 sm:px-8 py-6"${_scopeId4}>`);
                              _push5(ssrRenderComponent(_sfc_main$1, {
                                onSuccess: onFormSuccess,
                                onCancel: ($event) => isModalOpen.value = false
                              }, null, _parent5, _scopeId4));
                              _push5(`</div>`);
                            } else {
                              return [
                                createVNode("div", { class: "bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 border-b border-gray-100" }, [
                                  createVNode("div", { class: "flex justify-between items-center" }, [
                                    createVNode(unref(DialogTitle), {
                                      as: "h3",
                                      class: "text-lg font-semibold leading-6 text-gray-900"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("Apply for Leave")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode("button", {
                                      onClick: ($event) => isModalOpen.value = false,
                                      class: "text-gray-400 hover:text-gray-500"
                                    }, [
                                      createVNode(unref(X), { class: "w-5 h-5" })
                                    ], 8, ["onClick"])
                                  ])
                                ]),
                                createVNode("div", { class: "px-4 sm:px-8 py-6" }, [
                                  createVNode(_sfc_main$1, {
                                    onSuccess: onFormSuccess,
                                    onCancel: ($event) => isModalOpen.value = false
                                  }, null, 8, ["onCancel"])
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(DialogPanel), { class: "relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 border-b border-gray-100" }, [
                                createVNode("div", { class: "flex justify-between items-center" }, [
                                  createVNode(unref(DialogTitle), {
                                    as: "h3",
                                    class: "text-lg font-semibold leading-6 text-gray-900"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("Apply for Leave")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode("button", {
                                    onClick: ($event) => isModalOpen.value = false,
                                    class: "text-gray-400 hover:text-gray-500"
                                  }, [
                                    createVNode(unref(X), { class: "w-5 h-5" })
                                  ], 8, ["onClick"])
                                ])
                              ]),
                              createVNode("div", { class: "px-4 sm:px-8 py-6" }, [
                                createVNode(_sfc_main$1, {
                                  onSuccess: onFormSuccess,
                                  onCancel: ($event) => isModalOpen.value = false
                                }, null, 8, ["onCancel"])
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
                        createVNode("div", { class: "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" })
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
                            createVNode(unref(DialogPanel), { class: "relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg" }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 border-b border-gray-100" }, [
                                  createVNode("div", { class: "flex justify-between items-center" }, [
                                    createVNode(unref(DialogTitle), {
                                      as: "h3",
                                      class: "text-lg font-semibold leading-6 text-gray-900"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("Apply for Leave")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode("button", {
                                      onClick: ($event) => isModalOpen.value = false,
                                      class: "text-gray-400 hover:text-gray-500"
                                    }, [
                                      createVNode(unref(X), { class: "w-5 h-5" })
                                    ], 8, ["onClick"])
                                  ])
                                ]),
                                createVNode("div", { class: "px-4 sm:px-8 py-6" }, [
                                  createVNode(_sfc_main$1, {
                                    onSuccess: onFormSuccess,
                                    onCancel: ($event) => isModalOpen.value = false
                                  }, null, 8, ["onCancel"])
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
                onClose: ($event) => isModalOpen.value = false
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
                      createVNode("div", { class: "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" })
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
                          createVNode(unref(DialogPanel), { class: "relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 border-b border-gray-100" }, [
                                createVNode("div", { class: "flex justify-between items-center" }, [
                                  createVNode(unref(DialogTitle), {
                                    as: "h3",
                                    class: "text-lg font-semibold leading-6 text-gray-900"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("Apply for Leave")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode("button", {
                                    onClick: ($event) => isModalOpen.value = false,
                                    class: "text-gray-400 hover:text-gray-500"
                                  }, [
                                    createVNode(unref(X), { class: "w-5 h-5" })
                                  ], 8, ["onClick"])
                                ])
                              ]),
                              createVNode("div", { class: "px-4 sm:px-8 py-6" }, [
                                createVNode(_sfc_main$1, {
                                  onSuccess: onFormSuccess,
                                  onCancel: ($event) => isModalOpen.value = false
                                }, null, 8, ["onCancel"])
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
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[tenant_slug]/dashboard/leaves/my/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-DPi1n7FA.mjs.map
