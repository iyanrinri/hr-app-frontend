import { _ as _sfc_main$1 } from './Card-CVi1E1xp.mjs';
import { _ as _sfc_main$2 } from './CardContent-BE35Q-6Q.mjs';
import { defineComponent, ref, computed, mergeProps, unref, withCtx, createVNode, createBlock, openBlock, Fragment, renderList, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderComponent, ssrRenderList } from 'vue/server-renderer';
import { d as useOvertimeApprovals, e as useOvertimeApprovalStats } from './useOvertime-BEYm8O2P.mjs';
import { _ as _sfc_main$3 } from './OvertimeStatusBadge-DoLs4Iy4.mjs';
import { format } from 'date-fns';
import { O as OvertimeStatus, A as ApproverType } from './overtime-kX-Lpsii.mjs';
import { aq as Filter, U as User } from './server.mjs';
import './index-B7s_3MI_.mjs';
import 'clsx';
import 'tailwind-merge';
import './fetch-VuP8VKdC.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const statusFilter = ref("");
    const approverTypeFilter = ref("");
    const filters = computed(() => ({
      take: 50,
      status: statusFilter.value || void 0,
      approverType: approverTypeFilter.value || void 0
    }));
    const { data: listResponse, loading: isLoading } = useOvertimeApprovals(filters);
    const { data: stats } = useOvertimeApprovalStats();
    const requests = computed(() => {
      if (!listResponse.value) return [];
      if (Array.isArray(listResponse.value)) return listResponse.value;
      return listResponse.value.requests || [];
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d;
      const _component_UiCard = _sfc_main$1;
      const _component_UiCardContent = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" }, _attrs))}><div class="md:flex md:items-center md:justify-between"><div class="flex-1 min-w-0"><h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate"> Approval History </h2><p class="mt-1 text-sm text-gray-500"> View history of all overtime approvals </p></div><div class="mt-4 flex md:mt-0 md:ml-4 gap-2"><select class="rounded-md border-gray-300 shadow-sm focus:border-brand-navy focus:ring-brand-navy sm:text-sm"><option value=""${ssrIncludeBooleanAttr(Array.isArray(statusFilter.value) ? ssrLooseContain(statusFilter.value, "") : ssrLooseEqual(statusFilter.value, "")) ? " selected" : ""}>All Status</option><option${ssrRenderAttr("value", unref(OvertimeStatus).APPROVED)}${ssrIncludeBooleanAttr(Array.isArray(statusFilter.value) ? ssrLooseContain(statusFilter.value, unref(OvertimeStatus).APPROVED) : ssrLooseEqual(statusFilter.value, unref(OvertimeStatus).APPROVED)) ? " selected" : ""}>Approved</option><option${ssrRenderAttr("value", unref(OvertimeStatus).REJECTED)}${ssrIncludeBooleanAttr(Array.isArray(statusFilter.value) ? ssrLooseContain(statusFilter.value, unref(OvertimeStatus).REJECTED) : ssrLooseEqual(statusFilter.value, unref(OvertimeStatus).REJECTED)) ? " selected" : ""}>Rejected</option><option${ssrRenderAttr("value", unref(OvertimeStatus).PENDING)}${ssrIncludeBooleanAttr(Array.isArray(statusFilter.value) ? ssrLooseContain(statusFilter.value, unref(OvertimeStatus).PENDING) : ssrLooseEqual(statusFilter.value, unref(OvertimeStatus).PENDING)) ? " selected" : ""}>Pending</option></select><select class="rounded-md border-gray-300 shadow-sm focus:border-brand-navy focus:ring-brand-navy sm:text-sm"><option value=""${ssrIncludeBooleanAttr(Array.isArray(approverTypeFilter.value) ? ssrLooseContain(approverTypeFilter.value, "") : ssrLooseEqual(approverTypeFilter.value, "")) ? " selected" : ""}>All Types</option><option${ssrRenderAttr("value", unref(ApproverType).MANAGER)}${ssrIncludeBooleanAttr(Array.isArray(approverTypeFilter.value) ? ssrLooseContain(approverTypeFilter.value, unref(ApproverType).MANAGER) : ssrLooseEqual(approverTypeFilter.value, unref(ApproverType).MANAGER)) ? " selected" : ""}>Manager</option><option${ssrRenderAttr("value", unref(ApproverType).HR)}${ssrIncludeBooleanAttr(Array.isArray(approverTypeFilter.value) ? ssrLooseContain(approverTypeFilter.value, unref(ApproverType).HR) : ssrLooseEqual(approverTypeFilter.value, unref(ApproverType).HR)) ? " selected" : ""}>HR</option></select></div></div><div class="grid grid-cols-1 gap-5 sm:grid-cols-4"><div class="bg-white overflow-hidden shadow rounded-lg"><div class="px-4 py-5 sm:p-6"><dt class="text-sm font-medium text-gray-500 truncate">Total Processed</dt><dd class="mt-1 text-3xl font-semibold text-gray-900">${ssrInterpolate(((_a = unref(stats)) == null ? void 0 : _a.total) || 0)}</dd></div></div><div class="bg-white overflow-hidden shadow rounded-lg"><div class="px-4 py-5 sm:p-6"><dt class="text-sm font-medium text-gray-500 truncate">Approved</dt><dd class="mt-1 text-3xl font-semibold text-green-600">${ssrInterpolate(((_b = unref(stats)) == null ? void 0 : _b.approved) || 0)}</dd></div></div><div class="bg-white overflow-hidden shadow rounded-lg"><div class="px-4 py-5 sm:p-6"><dt class="text-sm font-medium text-gray-500 truncate">Rejected</dt><dd class="mt-1 text-3xl font-semibold text-red-600">${ssrInterpolate(((_c = unref(stats)) == null ? void 0 : _c.rejected) || 0)}</dd></div></div><div class="bg-white overflow-hidden shadow rounded-lg"><div class="px-4 py-5 sm:p-6"><dt class="text-sm font-medium text-gray-500 truncate">Pending</dt><dd class="mt-1 text-3xl font-semibold text-yellow-600">${ssrInterpolate(((_d = unref(stats)) == null ? void 0 : _d.pending) || 0)}</dd></div></div></div>`);
      _push(ssrRenderComponent(_component_UiCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiCardContent, { class: "p-0 overflow-hidden" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="overflow-x-auto"${_scopeId2}><table class="min-w-full divide-y divide-gray-200"${_scopeId2}><thead class="bg-gray-50"${_scopeId2}><tr${_scopeId2}><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId2}> Employee </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId2}> Date </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId2}> Reason </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId2}> Duration </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId2}> Status </th></tr></thead><tbody class="bg-white divide-y divide-gray-200"${_scopeId2}>`);
                  if (unref(isLoading)) {
                    _push3(`<!--[-->`);
                    ssrRenderList(3, (i) => {
                      _push3(`<tr${_scopeId2}><td class="px-6 py-4"${_scopeId2}><div class="h-4 bg-gray-100 rounded w-3/4 animate-pulse"${_scopeId2}></div></td><td class="px-6 py-4"${_scopeId2}><div class="h-4 bg-gray-100 rounded w-1/2 animate-pulse"${_scopeId2}></div></td><td class="px-6 py-4"${_scopeId2}><div class="h-4 bg-gray-100 rounded w-1/4 animate-pulse"${_scopeId2}></div></td><td class="px-6 py-4"${_scopeId2}><div class="h-4 bg-gray-100 rounded w-1/4 animate-pulse"${_scopeId2}></div></td><td class="px-6 py-4"${_scopeId2}></td></tr>`);
                    });
                    _push3(`<!--]-->`);
                  } else if (requests.value.length === 0) {
                    _push3(`<tr${_scopeId2}><td colspan="5" class="px-6 py-12 text-center text-gray-500"${_scopeId2}><div class="flex flex-col items-center justify-center"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(Filter), { class: "w-12 h-12 text-gray-300 mb-3" }, null, _parent3, _scopeId2));
                    _push3(`<p class="text-lg font-medium text-gray-900"${_scopeId2}>No approvals found</p><p class="text-sm text-gray-500 mt-1"${_scopeId2}>Try adjusting the filters</p></div></td></tr>`);
                  } else {
                    _push3(`<!--[-->`);
                    ssrRenderList(requests.value, (request) => {
                      var _a2, _b2;
                      _push3(`<tr class="hover:bg-gray-50 transition-colors"${_scopeId2}><td class="px-6 py-4 whitespace-nowrap"${_scopeId2}><div class="flex items-center"${_scopeId2}><div class="h-8 w-8 rounded-full bg-brand-navy/10 flex items-center justify-center text-brand-navy mr-3"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(User), { class: "w-4 h-4" }, null, _parent3, _scopeId2));
                      _push3(`</div><div${_scopeId2}><div class="text-sm font-medium text-gray-900"${_scopeId2}>${ssrInterpolate(((_a2 = request.employee) == null ? void 0 : _a2.name) || `Emp #${request.employeeId}`)}</div><div class="text-xs text-gray-500"${_scopeId2}>${ssrInterpolate((_b2 = request.employee) == null ? void 0 : _b2.email)}</div></div></div></td><td class="px-6 py-4 whitespace-nowrap"${_scopeId2}><div class="text-sm text-gray-900"${_scopeId2}>${ssrInterpolate(unref(format)(new Date(request.date), "MMM d, yyyy"))}</div><div class="text-xs text-gray-500 mt-0.5"${_scopeId2}>${ssrInterpolate(unref(format)(new Date(request.startTime), "HH:mm"))} - ${ssrInterpolate(unref(format)(new Date(request.endTime), "HH:mm"))}</div></td><td class="px-6 py-4"${_scopeId2}><div class="text-sm text-gray-900 truncate max-w-xs"${ssrRenderAttr("title", request.reason)}${_scopeId2}>${ssrInterpolate(request.reason)}</div></td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"${_scopeId2}>${ssrInterpolate((request.totalMinutes / 60).toFixed(1))} hrs </td><td class="px-6 py-4 whitespace-nowrap"${_scopeId2}>`);
                      _push3(ssrRenderComponent(_sfc_main$3, {
                        status: request.status,
                        managerApprovedAt: request.managerApprovedAt,
                        hrApprovedAt: request.hrApprovedAt
                      }, null, _parent3, _scopeId2));
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
                            }, " Employee "),
                            createVNode("th", {
                              scope: "col",
                              class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            }, " Date "),
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
                            }, " Status ")
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
                                createVNode(unref(Filter), { class: "w-12 h-12 text-gray-300 mb-3" }),
                                createVNode("p", { class: "text-lg font-medium text-gray-900" }, "No approvals found"),
                                createVNode("p", { class: "text-sm text-gray-500 mt-1" }, "Try adjusting the filters")
                              ])
                            ])
                          ])) : (openBlock(true), createBlock(Fragment, { key: 2 }, renderList(requests.value, (request) => {
                            var _a2, _b2;
                            return openBlock(), createBlock("tr", {
                              key: request.id,
                              class: "hover:bg-gray-50 transition-colors"
                            }, [
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                createVNode("div", { class: "flex items-center" }, [
                                  createVNode("div", { class: "h-8 w-8 rounded-full bg-brand-navy/10 flex items-center justify-center text-brand-navy mr-3" }, [
                                    createVNode(unref(User), { class: "w-4 h-4" })
                                  ]),
                                  createVNode("div", null, [
                                    createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(((_a2 = request.employee) == null ? void 0 : _a2.name) || `Emp #${request.employeeId}`), 1),
                                    createVNode("div", { class: "text-xs text-gray-500" }, toDisplayString((_b2 = request.employee) == null ? void 0 : _b2.email), 1)
                                  ])
                                ])
                              ]),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                createVNode("div", { class: "text-sm text-gray-900" }, toDisplayString(unref(format)(new Date(request.date), "MMM d, yyyy")), 1),
                                createVNode("div", { class: "text-xs text-gray-500 mt-0.5" }, toDisplayString(unref(format)(new Date(request.startTime), "HH:mm")) + " - " + toDisplayString(unref(format)(new Date(request.endTime), "HH:mm")), 1)
                              ]),
                              createVNode("td", { class: "px-6 py-4" }, [
                                createVNode("div", {
                                  class: "text-sm text-gray-900 truncate max-w-xs",
                                  title: request.reason
                                }, toDisplayString(request.reason), 9, ["title"])
                              ]),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-500" }, toDisplayString((request.totalMinutes / 60).toFixed(1)) + " hrs ", 1),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                createVNode(_sfc_main$3, {
                                  status: request.status,
                                  managerApprovedAt: request.managerApprovedAt,
                                  hrApprovedAt: request.hrApprovedAt
                                }, null, 8, ["status", "managerApprovedAt", "hrApprovedAt"])
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
                          }, " Employee "),
                          createVNode("th", {
                            scope: "col",
                            class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          }, " Date "),
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
                          }, " Status ")
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
                              createVNode(unref(Filter), { class: "w-12 h-12 text-gray-300 mb-3" }),
                              createVNode("p", { class: "text-lg font-medium text-gray-900" }, "No approvals found"),
                              createVNode("p", { class: "text-sm text-gray-500 mt-1" }, "Try adjusting the filters")
                            ])
                          ])
                        ])) : (openBlock(true), createBlock(Fragment, { key: 2 }, renderList(requests.value, (request) => {
                          var _a2, _b2;
                          return openBlock(), createBlock("tr", {
                            key: request.id,
                            class: "hover:bg-gray-50 transition-colors"
                          }, [
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                              createVNode("div", { class: "flex items-center" }, [
                                createVNode("div", { class: "h-8 w-8 rounded-full bg-brand-navy/10 flex items-center justify-center text-brand-navy mr-3" }, [
                                  createVNode(unref(User), { class: "w-4 h-4" })
                                ]),
                                createVNode("div", null, [
                                  createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(((_a2 = request.employee) == null ? void 0 : _a2.name) || `Emp #${request.employeeId}`), 1),
                                  createVNode("div", { class: "text-xs text-gray-500" }, toDisplayString((_b2 = request.employee) == null ? void 0 : _b2.email), 1)
                                ])
                              ])
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                              createVNode("div", { class: "text-sm text-gray-900" }, toDisplayString(unref(format)(new Date(request.date), "MMM d, yyyy")), 1),
                              createVNode("div", { class: "text-xs text-gray-500 mt-0.5" }, toDisplayString(unref(format)(new Date(request.startTime), "HH:mm")) + " - " + toDisplayString(unref(format)(new Date(request.endTime), "HH:mm")), 1)
                            ]),
                            createVNode("td", { class: "px-6 py-4" }, [
                              createVNode("div", {
                                class: "text-sm text-gray-900 truncate max-w-xs",
                                title: request.reason
                              }, toDisplayString(request.reason), 9, ["title"])
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-500" }, toDisplayString((request.totalMinutes / 60).toFixed(1)) + " hrs ", 1),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                              createVNode(_sfc_main$3, {
                                status: request.status,
                                managerApprovedAt: request.managerApprovedAt,
                                hrApprovedAt: request.hrApprovedAt
                              }, null, 8, ["status", "managerApprovedAt", "hrApprovedAt"])
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
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[tenant_slug]/dashboard/overtime/approvals/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-DGux4-ft.mjs.map
