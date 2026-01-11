import { _ as _sfc_main$3 } from "./Card-CVi1E1xp.js";
import { _ as _sfc_main$4 } from "./CardContent-BE35Q-6Q.js";
import { defineComponent, computed, ref, watch, mergeProps, unref, useSSRContext, withCtx, createVNode, createBlock, openBlock, Fragment, renderList, toDisplayString, createCommentVNode, createTextVNode } from "vue";
import { ssrRenderAttrs, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { a as useCreateOvertimeRequest, b as useUpdateOvertimeRequest, u as useOvertimeRequests, c as useDeleteOvertimeRequest } from "./useOvertimeCRUD-DlVHnEXn.js";
import { _ as _sfc_main$2 } from "./Input-CKYYc_rG.js";
import { u as useAllEmployees } from "./useEmployees-CEaIsP48.js";
import { K as useAuthStore, P as Plus, f as Clock, X } from "../server.mjs";
import { format, parse, differenceInMinutes } from "date-fns";
import { _ as _sfc_main$5 } from "./OvertimeStatusBadge-DoLs4Iy4.js";
import { O as OvertimeStatus } from "./overtime-kX-Lpsii.js";
import { TransitionRoot, Dialog, TransitionChild, DialogPanel, DialogTitle } from "@headlessui/vue";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/hookable/dist/index.mjs";
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
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/ufo/dist/index.mjs";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/klona/dist/index.mjs";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/destr/dist/index.mjs";
import "uuid";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "OvertimeRequestForm",
  __ssrInlineRender: true,
  props: {
    initialData: {}
  },
  emits: ["success", "cancel"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const { loading: isCreating } = useCreateOvertimeRequest();
    const { loading: isUpdating } = useUpdateOvertimeRequest();
    const { data: employees } = useAllEmployees();
    const authStore = useAuthStore();
    const user = computed(() => authStore.user);
    const isAdminOrHr = computed(() => ["ADMIN", "SUPER", "HR"].includes(user.value?.role || ""));
    const isEditing = computed(() => !!props.initialData);
    const isPending = computed(() => isCreating.value || isUpdating.value);
    const form = ref({
      employeeId: "",
      date: format(/* @__PURE__ */ new Date(), "yyyy-MM-dd"),
      startTime: "",
      endTime: "",
      reason: ""
    });
    const errors = ref({});
    const durationStr = ref("");
    watch([() => form.value.date, () => form.value.startTime, () => form.value.endTime], ([date, startTime, endTime]) => {
      if (date && startTime && endTime) {
        try {
          const start = parse(`${date} ${startTime}`, "yyyy-MM-dd HH:mm", /* @__PURE__ */ new Date());
          let end = parse(`${date} ${endTime}`, "yyyy-MM-dd HH:mm", /* @__PURE__ */ new Date());
          if (end < start) {
            end = new Date(end.getTime() + 24 * 60 * 60 * 1e3);
          }
          const diff = differenceInMinutes(end, start);
          const hours = Math.floor(diff / 60);
          const minutes = diff % 60;
          durationStr.value = `${hours}h ${minutes}m`;
        } catch (e) {
          durationStr.value = "";
        }
      } else {
        durationStr.value = "";
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiInput = _sfc_main$2;
      _push(`<form${ssrRenderAttrs(mergeProps({ class: "space-y-4" }, _attrs))}>`);
      if (isAdminOrHr.value) {
        _push(`<div class="space-y-2"><label class="text-sm font-medium text-gray-700">Employee</label><select class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"${ssrIncludeBooleanAttr(isEditing.value) ? " disabled" : ""}><option value=""${ssrIncludeBooleanAttr(Array.isArray(form.value.employeeId) ? ssrLooseContain(form.value.employeeId, "") : ssrLooseEqual(form.value.employeeId, "")) ? " selected" : ""}>Select Employee (Yourself)</option><!--[-->`);
        ssrRenderList(unref(employees), (emp) => {
          _push(`<option${ssrRenderAttr("value", emp.id)}${ssrIncludeBooleanAttr(Array.isArray(form.value.employeeId) ? ssrLooseContain(form.value.employeeId, emp.id) : ssrLooseEqual(form.value.employeeId, emp.id)) ? " selected" : ""}>${ssrInterpolate(emp.name || emp.firstName + " " + emp.lastName)} (${ssrInterpolate(emp.position)}) </option>`);
        });
        _push(`<!--]--></select><p class="text-xs text-gray-500">Leave empty to request for yourself.</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="grid grid-cols-1 gap-4">`);
      _push(ssrRenderComponent(_component_UiInput, {
        label: "Date",
        type: "date",
        modelValue: form.value.date,
        "onUpdate:modelValue": ($event) => form.value.date = $event,
        error: errors.value.date
      }, null, _parent));
      _push(`</div><div class="grid grid-cols-2 gap-4">`);
      _push(ssrRenderComponent(_component_UiInput, {
        label: "Start Time",
        type: "time",
        modelValue: form.value.startTime,
        "onUpdate:modelValue": ($event) => form.value.startTime = $event,
        error: errors.value.startTime
      }, null, _parent));
      _push(ssrRenderComponent(_component_UiInput, {
        label: "End Time",
        type: "time",
        modelValue: form.value.endTime,
        "onUpdate:modelValue": ($event) => form.value.endTime = $event,
        error: errors.value.endTime
      }, null, _parent));
      _push(`</div>`);
      if (durationStr.value) {
        _push(`<div class="bg-blue-50 text-brand-navy px-4 py-2 rounded-md text-sm font-medium flex items-center"><span class="mr-2">⏱</span> Duration: ${ssrInterpolate(durationStr.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="space-y-2"><label class="text-sm font-medium text-gray-700">Reason</label><textarea rows="3" class="flex w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-navy disabled:cursor-not-allowed disabled:opacity-50" placeholder="Justification for overtime...">${ssrInterpolate(form.value.reason)}</textarea>`);
      if (errors.value.reason) {
        _push(`<p class="text-sm text-red-500">${ssrInterpolate(errors.value.reason)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="flex justify-end gap-3 pt-4"><button type="button" class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"> Cancel </button><button type="submit"${ssrIncludeBooleanAttr(isPending.value) ? " disabled" : ""} class="px-4 py-2 text-sm font-medium text-white bg-brand-navy rounded-md hover:opacity-90 disabled:opacity-50 flex items-center">`);
      if (isPending.value) {
        _push(`<span class="mr-2">...</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(` ${ssrInterpolate(isEditing.value ? "Update Request" : "Submit Request")}</button></div></form>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/overtime/OvertimeRequestForm.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const isModalOpen = ref(false);
    const selectedRequest = ref(void 0);
    const { data: response, loading: isLoading, refresh } = useOvertimeRequests({ take: 50 });
    const { mutate: deleteRequest } = useDeleteOvertimeRequest();
    const requests = computed(() => {
      if (!response.value) return [];
      if (Array.isArray(response.value)) return response.value;
      return response.value.requests || [];
    });
    const handleEdit = (request) => {
      if (request.status !== OvertimeStatus.PENDING) {
        alert("Only pending requests can be edited");
        return;
      }
      selectedRequest.value = request;
      isModalOpen.value = true;
    };
    const handleDelete = async (id) => {
      if (confirm("Are you sure you want to delete this specific request?")) {
        await deleteRequest(id);
        refresh();
      }
    };
    const openNewModal = () => {
      selectedRequest.value = void 0;
      isModalOpen.value = true;
    };
    const onFormSuccess = () => {
      isModalOpen.value = false;
      refresh();
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiCard = _sfc_main$3;
      const _component_UiCardContent = _sfc_main$4;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" }, _attrs))}><div class="md:flex md:items-center md:justify-between"><div class="flex-1 min-w-0"><h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate"> My Overtime </h2><p class="mt-1 text-sm text-gray-500"> Track and manage your overtime submissions </p></div><div class="mt-4 flex md:mt-0 md:ml-4"><button class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brand-navy hover:bg-brand-navy/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-navy shadow-lg shadow-brand-navy/20">`);
      _push(ssrRenderComponent(unref(Plus), { class: "w-4 h-4 mr-2" }, null, _parent));
      _push(` New Overtime </button></div></div>`);
      _push(ssrRenderComponent(_component_UiCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiCardContent, { class: "p-0 overflow-hidden" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="overflow-x-auto"${_scopeId2}><table class="min-w-full divide-y divide-gray-200"${_scopeId2}><thead class="bg-gray-50"${_scopeId2}><tr${_scopeId2}><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId2}> Date &amp; Time </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId2}> Reason </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId2}> Duration </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId2}> Status </th><th scope="col" class="relative px-6 py-3"${_scopeId2}><span class="sr-only"${_scopeId2}>Actions</span></th></tr></thead><tbody class="bg-white divide-y divide-gray-200"${_scopeId2}>`);
                  if (unref(isLoading)) {
                    _push3(`<!--[-->`);
                    ssrRenderList(3, (i) => {
                      _push3(`<tr${_scopeId2}><td class="px-6 py-4"${_scopeId2}><div class="h-4 bg-gray-100 rounded w-3/4 animate-pulse"${_scopeId2}></div></td><td class="px-6 py-4"${_scopeId2}><div class="h-4 bg-gray-100 rounded w-1/2 animate-pulse"${_scopeId2}></div></td><td class="px-6 py-4"${_scopeId2}><div class="h-4 bg-gray-100 rounded w-1/4 animate-pulse"${_scopeId2}></div></td><td class="px-6 py-4"${_scopeId2}><div class="h-4 bg-gray-100 rounded w-1/4 animate-pulse"${_scopeId2}></div></td><td class="px-6 py-4"${_scopeId2}></td></tr>`);
                    });
                    _push3(`<!--]-->`);
                  } else if (requests.value.length === 0) {
                    _push3(`<tr${_scopeId2}><td colspan="5" class="px-6 py-12 text-center text-gray-500"${_scopeId2}><div class="flex flex-col items-center justify-center"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(Clock), { class: "w-12 h-12 text-gray-300 mb-3" }, null, _parent3, _scopeId2));
                    _push3(`<p class="text-lg font-medium text-gray-900"${_scopeId2}>No overtime requests</p><p class="text-sm text-gray-500 mt-1"${_scopeId2}>You haven&#39;t submitted any overtime requests yet.</p><button class="mt-4 text-brand-navy hover:text-blue-900 font-medium"${_scopeId2}> Create Request </button></div></td></tr>`);
                  } else {
                    _push3(`<!--[-->`);
                    ssrRenderList(requests.value, (request) => {
                      _push3(`<tr class="hover:bg-gray-50 transition-colors"${_scopeId2}><td class="px-6 py-4 whitespace-nowrap"${_scopeId2}><div class="text-sm font-medium text-gray-900"${_scopeId2}>${ssrInterpolate(unref(format)(new Date(request.date), "MMM d, yyyy"))}</div><div class="text-xs text-gray-500 mt-1"${_scopeId2}>${ssrInterpolate(unref(format)(new Date(request.startTime), "HH:mm"))} - ${ssrInterpolate(unref(format)(new Date(request.endTime), "HH:mm"))}</div></td><td class="px-6 py-4"${_scopeId2}><div class="text-sm text-gray-500 max-w-xs truncate"${_scopeId2}>${ssrInterpolate(request.reason)}</div></td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"${_scopeId2}>${ssrInterpolate((request.totalMinutes / 60).toFixed(1))} hrs </td><td class="px-6 py-4 whitespace-nowrap"${_scopeId2}>`);
                      _push3(ssrRenderComponent(_sfc_main$5, {
                        status: request.status,
                        managerApprovedAt: request.managerApprovedAt,
                        hrApprovedAt: request.hrApprovedAt
                      }, null, _parent3, _scopeId2));
                      _push3(`</td><td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"${_scopeId2}>`);
                      if (request.status === unref(OvertimeStatus).PENDING) {
                        _push3(`<div class="flex justify-end gap-2"${_scopeId2}><button class="text-brand-navy hover:text-blue-900"${_scopeId2}> Edit </button><button class="text-red-600 hover:text-red-900 ml-2"${_scopeId2}> Delete </button></div>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`</td></tr>`);
                    });
                    _push3(`<!--]-->`);
                  }
                  _push3(`</tbody></table></div>`);
                } else {
                  return [
                    createVNode("div", { class: "overflow-x-auto" }, [
                      createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                        createVNode("thead", { class: "bg-gray-50" }, [
                          createVNode("tr", null, [
                            createVNode("th", {
                              scope: "col",
                              class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            }, " Date & Time "),
                            createVNode("th", {
                              scope: "col",
                              class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            }, " Reason "),
                            createVNode("th", {
                              scope: "col",
                              class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            }, " Duration "),
                            createVNode("th", {
                              scope: "col",
                              class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            }, " Status "),
                            createVNode("th", {
                              scope: "col",
                              class: "relative px-6 py-3"
                            }, [
                              createVNode("span", { class: "sr-only" }, "Actions")
                            ])
                          ])
                        ]),
                        createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                          unref(isLoading) ? (openBlock(), createBlock(Fragment, { key: 0 }, renderList(3, (i) => {
                            return createVNode("tr", { key: i }, [
                              createVNode("td", { class: "px-6 py-4" }, [
                                createVNode("div", { class: "h-4 bg-gray-100 rounded w-3/4 animate-pulse" })
                              ]),
                              createVNode("td", { class: "px-6 py-4" }, [
                                createVNode("div", { class: "h-4 bg-gray-100 rounded w-1/2 animate-pulse" })
                              ]),
                              createVNode("td", { class: "px-6 py-4" }, [
                                createVNode("div", { class: "h-4 bg-gray-100 rounded w-1/4 animate-pulse" })
                              ]),
                              createVNode("td", { class: "px-6 py-4" }, [
                                createVNode("div", { class: "h-4 bg-gray-100 rounded w-1/4 animate-pulse" })
                              ]),
                              createVNode("td", { class: "px-6 py-4" })
                            ]);
                          }), 64)) : requests.value.length === 0 ? (openBlock(), createBlock("tr", { key: 1 }, [
                            createVNode("td", {
                              colspan: "5",
                              class: "px-6 py-12 text-center text-gray-500"
                            }, [
                              createVNode("div", { class: "flex flex-col items-center justify-center" }, [
                                createVNode(unref(Clock), { class: "w-12 h-12 text-gray-300 mb-3" }),
                                createVNode("p", { class: "text-lg font-medium text-gray-900" }, "No overtime requests"),
                                createVNode("p", { class: "text-sm text-gray-500 mt-1" }, "You haven't submitted any overtime requests yet."),
                                createVNode("button", {
                                  onClick: openNewModal,
                                  class: "mt-4 text-brand-navy hover:text-blue-900 font-medium"
                                }, " Create Request ")
                              ])
                            ])
                          ])) : (openBlock(true), createBlock(Fragment, { key: 2 }, renderList(requests.value, (request) => {
                            return openBlock(), createBlock("tr", {
                              key: request.id,
                              class: "hover:bg-gray-50 transition-colors"
                            }, [
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(unref(format)(new Date(request.date), "MMM d, yyyy")), 1),
                                createVNode("div", { class: "text-xs text-gray-500 mt-1" }, toDisplayString(unref(format)(new Date(request.startTime), "HH:mm")) + " - " + toDisplayString(unref(format)(new Date(request.endTime), "HH:mm")), 1)
                              ]),
                              createVNode("td", { class: "px-6 py-4" }, [
                                createVNode("div", { class: "text-sm text-gray-500 max-w-xs truncate" }, toDisplayString(request.reason), 1)
                              ]),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-500" }, toDisplayString((request.totalMinutes / 60).toFixed(1)) + " hrs ", 1),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                createVNode(_sfc_main$5, {
                                  status: request.status,
                                  managerApprovedAt: request.managerApprovedAt,
                                  hrApprovedAt: request.hrApprovedAt
                                }, null, 8, ["status", "managerApprovedAt", "hrApprovedAt"])
                              ]),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium" }, [
                                request.status === unref(OvertimeStatus).PENDING ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "flex justify-end gap-2"
                                }, [
                                  createVNode("button", {
                                    onClick: ($event) => handleEdit(request),
                                    class: "text-brand-navy hover:text-blue-900"
                                  }, " Edit ", 8, ["onClick"]),
                                  createVNode("button", {
                                    onClick: ($event) => handleDelete(request.id),
                                    class: "text-red-600 hover:text-red-900 ml-2"
                                  }, " Delete ", 8, ["onClick"])
                                ])) : createCommentVNode("", true)
                              ])
                            ]);
                          }), 128))
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UiCardContent, { class: "p-0 overflow-hidden" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "overflow-x-auto" }, [
                    createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                      createVNode("thead", { class: "bg-gray-50" }, [
                        createVNode("tr", null, [
                          createVNode("th", {
                            scope: "col",
                            class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          }, " Date & Time "),
                          createVNode("th", {
                            scope: "col",
                            class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          }, " Reason "),
                          createVNode("th", {
                            scope: "col",
                            class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          }, " Duration "),
                          createVNode("th", {
                            scope: "col",
                            class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          }, " Status "),
                          createVNode("th", {
                            scope: "col",
                            class: "relative px-6 py-3"
                          }, [
                            createVNode("span", { class: "sr-only" }, "Actions")
                          ])
                        ])
                      ]),
                      createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                        unref(isLoading) ? (openBlock(), createBlock(Fragment, { key: 0 }, renderList(3, (i) => {
                          return createVNode("tr", { key: i }, [
                            createVNode("td", { class: "px-6 py-4" }, [
                              createVNode("div", { class: "h-4 bg-gray-100 rounded w-3/4 animate-pulse" })
                            ]),
                            createVNode("td", { class: "px-6 py-4" }, [
                              createVNode("div", { class: "h-4 bg-gray-100 rounded w-1/2 animate-pulse" })
                            ]),
                            createVNode("td", { class: "px-6 py-4" }, [
                              createVNode("div", { class: "h-4 bg-gray-100 rounded w-1/4 animate-pulse" })
                            ]),
                            createVNode("td", { class: "px-6 py-4" }, [
                              createVNode("div", { class: "h-4 bg-gray-100 rounded w-1/4 animate-pulse" })
                            ]),
                            createVNode("td", { class: "px-6 py-4" })
                          ]);
                        }), 64)) : requests.value.length === 0 ? (openBlock(), createBlock("tr", { key: 1 }, [
                          createVNode("td", {
                            colspan: "5",
                            class: "px-6 py-12 text-center text-gray-500"
                          }, [
                            createVNode("div", { class: "flex flex-col items-center justify-center" }, [
                              createVNode(unref(Clock), { class: "w-12 h-12 text-gray-300 mb-3" }),
                              createVNode("p", { class: "text-lg font-medium text-gray-900" }, "No overtime requests"),
                              createVNode("p", { class: "text-sm text-gray-500 mt-1" }, "You haven't submitted any overtime requests yet."),
                              createVNode("button", {
                                onClick: openNewModal,
                                class: "mt-4 text-brand-navy hover:text-blue-900 font-medium"
                              }, " Create Request ")
                            ])
                          ])
                        ])) : (openBlock(true), createBlock(Fragment, { key: 2 }, renderList(requests.value, (request) => {
                          return openBlock(), createBlock("tr", {
                            key: request.id,
                            class: "hover:bg-gray-50 transition-colors"
                          }, [
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                              createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(unref(format)(new Date(request.date), "MMM d, yyyy")), 1),
                              createVNode("div", { class: "text-xs text-gray-500 mt-1" }, toDisplayString(unref(format)(new Date(request.startTime), "HH:mm")) + " - " + toDisplayString(unref(format)(new Date(request.endTime), "HH:mm")), 1)
                            ]),
                            createVNode("td", { class: "px-6 py-4" }, [
                              createVNode("div", { class: "text-sm text-gray-500 max-w-xs truncate" }, toDisplayString(request.reason), 1)
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-500" }, toDisplayString((request.totalMinutes / 60).toFixed(1)) + " hrs ", 1),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                              createVNode(_sfc_main$5, {
                                status: request.status,
                                managerApprovedAt: request.managerApprovedAt,
                                hrApprovedAt: request.hrApprovedAt
                              }, null, 8, ["status", "managerApprovedAt", "hrApprovedAt"])
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium" }, [
                              request.status === unref(OvertimeStatus).PENDING ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "flex justify-end gap-2"
                              }, [
                                createVNode("button", {
                                  onClick: ($event) => handleEdit(request),
                                  class: "text-brand-navy hover:text-blue-900"
                                }, " Edit ", 8, ["onClick"]),
                                createVNode("button", {
                                  onClick: ($event) => handleDelete(request.id),
                                  class: "text-red-600 hover:text-red-900 ml-2"
                                }, " Delete ", 8, ["onClick"])
                              ])) : createCommentVNode("", true)
                            ])
                          ]);
                        }), 128))
                      ])
                    ])
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
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
                                class: "text-lg font-medium leading-6 text-gray-900"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`${ssrInterpolate(selectedRequest.value ? "Edit Overtime Request" : "New Overtime Request")}`);
                                  } else {
                                    return [
                                      createTextVNode(toDisplayString(selectedRequest.value ? "Edit Overtime Request" : "New Overtime Request"), 1)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`<button class="text-gray-400 hover:text-gray-500"${_scopeId4}>`);
                              _push5(ssrRenderComponent(unref(X), { class: "w-5 h-5" }, null, _parent5, _scopeId4));
                              _push5(`</button></div></div><div class="px-4 py-5 sm:p-6"${_scopeId4}>`);
                              _push5(ssrRenderComponent(_sfc_main$1, {
                                initialData: selectedRequest.value,
                                onSuccess: onFormSuccess,
                                onCancel: ($event) => isModalOpen.value = false
                              }, null, _parent5, _scopeId4));
                              _push5(`</div>`);
                            } else {
                              return [
                                createVNode("div", { class: "bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 border-b border-gray-100" }, [
                                  createVNode("div", { class: "flex justify-between items-center" }, [
                                    createVNode(unref(DialogTitle), {
                                      as: "h3",
                                      class: "text-lg font-medium leading-6 text-gray-900"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(selectedRequest.value ? "Edit Overtime Request" : "New Overtime Request"), 1)
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
                                createVNode("div", { class: "px-4 py-5 sm:p-6" }, [
                                  createVNode(_sfc_main$1, {
                                    initialData: selectedRequest.value,
                                    onSuccess: onFormSuccess,
                                    onCancel: ($event) => isModalOpen.value = false
                                  }, null, 8, ["initialData", "onCancel"])
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
                                    class: "text-lg font-medium leading-6 text-gray-900"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(selectedRequest.value ? "Edit Overtime Request" : "New Overtime Request"), 1)
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
                              createVNode("div", { class: "px-4 py-5 sm:p-6" }, [
                                createVNode(_sfc_main$1, {
                                  initialData: selectedRequest.value,
                                  onSuccess: onFormSuccess,
                                  onCancel: ($event) => isModalOpen.value = false
                                }, null, 8, ["initialData", "onCancel"])
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
                                      class: "text-lg font-medium leading-6 text-gray-900"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(selectedRequest.value ? "Edit Overtime Request" : "New Overtime Request"), 1)
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
                                createVNode("div", { class: "px-4 py-5 sm:p-6" }, [
                                  createVNode(_sfc_main$1, {
                                    initialData: selectedRequest.value,
                                    onSuccess: onFormSuccess,
                                    onCancel: ($event) => isModalOpen.value = false
                                  }, null, 8, ["initialData", "onCancel"])
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
                                    class: "text-lg font-medium leading-6 text-gray-900"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(selectedRequest.value ? "Edit Overtime Request" : "New Overtime Request"), 1)
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
                              createVNode("div", { class: "px-4 py-5 sm:p-6" }, [
                                createVNode(_sfc_main$1, {
                                  initialData: selectedRequest.value,
                                  onSuccess: onFormSuccess,
                                  onCancel: ($event) => isModalOpen.value = false
                                }, null, 8, ["initialData", "onCancel"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[tenant_slug]/dashboard/overtime/my/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-VQWgRJ0T.js.map
