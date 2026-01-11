import { _ as _sfc_main$1 } from "./Card-CVi1E1xp.js";
import { _ as _sfc_main$2 } from "./CardContent-BE35Q-6Q.js";
import { defineComponent, mergeProps, withCtx, unref, createVNode, createBlock, openBlock, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import { b as usePendingOvertimeApprovals, c as useProcessOvertimeApproval } from "./useOvertime-BEYm8O2P.js";
import { _ as _sfc_main$3 } from "./OvertimeStatusBadge-DoLs4Iy4.js";
import { format } from "date-fns";
import { A as ApproverType, O as OvertimeStatus, a as ApprovalStatus } from "./overtime-kX-Lpsii.js";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/hookable/dist/index.mjs";
import { f as Clock, U as User, C as CircleCheck, h as CircleX } from "../server.mjs";
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
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { data: requests, loading: isLoading, refresh } = usePendingOvertimeApprovals();
    const { mutate: processApproval } = useProcessOvertimeApproval();
    const handleApprove = async (id, currentStatus) => {
      let approverType = ApproverType.MANAGER;
      if (currentStatus === OvertimeStatus.MANAGER_APPROVED) {
        approverType = ApproverType.HR;
      }
      const comments = prompt("Optional: Add approval comments");
      if (comments !== null) {
        await processApproval({
          requestId: id,
          status: ApprovalStatus.APPROVED,
          approverType,
          comments
        });
        refresh();
      }
    };
    const handleReject = async (id, currentStatus) => {
      let approverType = ApproverType.MANAGER;
      if (currentStatus === OvertimeStatus.MANAGER_APPROVED) {
        approverType = ApproverType.HR;
      }
      const reason = prompt("Please provide a reason for rejection (Required)");
      if (reason) {
        await processApproval({
          requestId: id,
          status: ApprovalStatus.REJECTED,
          approverType,
          rejectionReason: reason
        });
        refresh();
      } else if (reason === "") {
        alert("Rejection reason is required");
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiCard = _sfc_main$1;
      const _component_UiCardContent = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" }, _attrs))}><div class="md:flex md:items-center md:justify-between"><div class="flex-1 min-w-0"><h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate"> Pending Approvals </h2><p class="mt-1 text-sm text-gray-500"> Review and manage overtime requests requiring your approval </p></div></div>`);
      _push(ssrRenderComponent(_component_UiCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiCardContent, { class: "p-0 overflow-hidden" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="overflow-x-auto"${_scopeId2}><table class="min-w-full divide-y divide-gray-200"${_scopeId2}><thead class="bg-gray-50"${_scopeId2}><tr${_scopeId2}><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId2}> Employee </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId2}> Date </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId2}> Reason &amp; Time </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId2}> Duration </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId2}> Status </th><th scope="col" class="relative px-6 py-3"${_scopeId2}><span class="sr-only"${_scopeId2}>Actions</span></th></tr></thead><tbody class="bg-white divide-y divide-gray-200"${_scopeId2}>`);
                  if (unref(isLoading)) {
                    _push3(`<!--[-->`);
                    ssrRenderList(3, (i) => {
                      _push3(`<tr${_scopeId2}><td class="px-6 py-4"${_scopeId2}><div class="h-4 bg-gray-100 rounded w-3/4 animate-pulse"${_scopeId2}></div></td><td class="px-6 py-4"${_scopeId2}><div class="h-4 bg-gray-100 rounded w-1/2 animate-pulse"${_scopeId2}></div></td><td class="px-6 py-4"${_scopeId2}><div class="h-4 bg-gray-100 rounded w-3/4 animate-pulse"${_scopeId2}></div></td><td class="px-6 py-4"${_scopeId2}><div class="h-4 bg-gray-100 rounded w-1/4 animate-pulse"${_scopeId2}></div></td><td class="px-6 py-4"${_scopeId2}><div class="h-4 bg-gray-100 rounded w-1/4 animate-pulse"${_scopeId2}></div></td><td class="px-6 py-4"${_scopeId2}></td></tr>`);
                    });
                    _push3(`<!--]-->`);
                  } else if (!unref(requests) || unref(requests).length === 0) {
                    _push3(`<tr${_scopeId2}><td colspan="6" class="px-6 py-12 text-center text-gray-500"${_scopeId2}><div class="flex flex-col items-center justify-center"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(Clock), { class: "w-12 h-12 text-gray-300 mb-3" }, null, _parent3, _scopeId2));
                    _push3(`<p class="text-lg font-medium text-gray-900"${_scopeId2}>No pending approvals</p><p class="text-sm text-gray-500 mt-1"${_scopeId2}>You&#39;re all caught up!</p></div></td></tr>`);
                  } else {
                    _push3(`<!--[-->`);
                    ssrRenderList(unref(requests), (request) => {
                      _push3(`<tr class="hover:bg-gray-50 transition-colors"${_scopeId2}><td class="px-6 py-4 whitespace-nowrap"${_scopeId2}><div class="flex items-center"${_scopeId2}><div class="h-8 w-8 rounded-full bg-brand-navy/10 flex items-center justify-center text-brand-navy mr-3"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(User), { class: "w-4 h-4" }, null, _parent3, _scopeId2));
                      _push3(`</div><div${_scopeId2}><div class="text-sm font-medium text-gray-900"${_scopeId2}>${ssrInterpolate(request.employee?.name || `Emp #${request.employeeId}`)}</div><div class="text-xs text-gray-500"${_scopeId2}>${ssrInterpolate(request.employee?.email)}</div></div></div></td><td class="px-6 py-4 whitespace-nowrap"${_scopeId2}><div class="text-sm text-gray-900"${_scopeId2}>${ssrInterpolate(unref(format)(new Date(request.date), "MMM d, yyyy"))}</div></td><td class="px-6 py-4"${_scopeId2}><div class="text-sm text-gray-900 truncate max-w-xs"${ssrRenderAttr("title", request.reason)}${_scopeId2}>${ssrInterpolate(request.reason)}</div><div class="text-xs text-gray-500 mt-0.5"${_scopeId2}>${ssrInterpolate(unref(format)(new Date(request.startTime), "HH:mm"))} - ${ssrInterpolate(unref(format)(new Date(request.endTime), "HH:mm"))}</div></td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"${_scopeId2}>${ssrInterpolate((request.totalMinutes / 60).toFixed(1))} hrs </td><td class="px-6 py-4 whitespace-nowrap"${_scopeId2}>`);
                      _push3(ssrRenderComponent(_sfc_main$3, {
                        status: request.status,
                        managerApprovedAt: request.managerApprovedAt,
                        hrApprovedAt: request.hrApprovedAt
                      }, null, _parent3, _scopeId2));
                      _push3(`</td><td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"${_scopeId2}><div class="flex justify-end gap-2"${_scopeId2}><button class="p-1 rounded-full text-green-600 hover:bg-green-50 transition-colors" title="Approve"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(CircleCheck), { class: "w-5 h-5" }, null, _parent3, _scopeId2));
                      _push3(`</button><button class="p-1 rounded-full text-red-600 hover:bg-red-50 transition-colors" title="Reject"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(CircleX), { class: "w-5 h-5" }, null, _parent3, _scopeId2));
                      _push3(`</button></div></td></tr>`);
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
                            }, " Reason & Time "),
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
                                createVNode("div", { class: "h-4 bg-gray-100 rounded w-3/4 animate-pulse" })
                              ]),
                              createVNode("td", { class: "px-6 py-4" }, [
                                createVNode("div", { class: "h-4 bg-gray-100 rounded w-1/4 animate-pulse" })
                              ]),
                              createVNode("td", { class: "px-6 py-4" }, [
                                createVNode("div", { class: "h-4 bg-gray-100 rounded w-1/4 animate-pulse" })
                              ]),
                              createVNode("td", { class: "px-6 py-4" })
                            ]);
                          }), 64)) : !unref(requests) || unref(requests).length === 0 ? (openBlock(), createBlock("tr", { key: 1 }, [
                            createVNode("td", {
                              colspan: "6",
                              class: "px-6 py-12 text-center text-gray-500"
                            }, [
                              createVNode("div", { class: "flex flex-col items-center justify-center" }, [
                                createVNode(unref(Clock), { class: "w-12 h-12 text-gray-300 mb-3" }),
                                createVNode("p", { class: "text-lg font-medium text-gray-900" }, "No pending approvals"),
                                createVNode("p", { class: "text-sm text-gray-500 mt-1" }, "You're all caught up!")
                              ])
                            ])
                          ])) : (openBlock(true), createBlock(Fragment, { key: 2 }, renderList(unref(requests), (request) => {
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
                                    createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(request.employee?.name || `Emp #${request.employeeId}`), 1),
                                    createVNode("div", { class: "text-xs text-gray-500" }, toDisplayString(request.employee?.email), 1)
                                  ])
                                ])
                              ]),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                createVNode("div", { class: "text-sm text-gray-900" }, toDisplayString(unref(format)(new Date(request.date), "MMM d, yyyy")), 1)
                              ]),
                              createVNode("td", { class: "px-6 py-4" }, [
                                createVNode("div", {
                                  class: "text-sm text-gray-900 truncate max-w-xs",
                                  title: request.reason
                                }, toDisplayString(request.reason), 9, ["title"]),
                                createVNode("div", { class: "text-xs text-gray-500 mt-0.5" }, toDisplayString(unref(format)(new Date(request.startTime), "HH:mm")) + " - " + toDisplayString(unref(format)(new Date(request.endTime), "HH:mm")), 1)
                              ]),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-500" }, toDisplayString((request.totalMinutes / 60).toFixed(1)) + " hrs ", 1),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                createVNode(_sfc_main$3, {
                                  status: request.status,
                                  managerApprovedAt: request.managerApprovedAt,
                                  hrApprovedAt: request.hrApprovedAt
                                }, null, 8, ["status", "managerApprovedAt", "hrApprovedAt"])
                              ]),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium" }, [
                                createVNode("div", { class: "flex justify-end gap-2" }, [
                                  createVNode("button", {
                                    onClick: ($event) => handleApprove(request.id, request.status),
                                    class: "p-1 rounded-full text-green-600 hover:bg-green-50 transition-colors",
                                    title: "Approve"
                                  }, [
                                    createVNode(unref(CircleCheck), { class: "w-5 h-5" })
                                  ], 8, ["onClick"]),
                                  createVNode("button", {
                                    onClick: ($event) => handleReject(request.id, request.status),
                                    class: "p-1 rounded-full text-red-600 hover:bg-red-50 transition-colors",
                                    title: "Reject"
                                  }, [
                                    createVNode(unref(CircleX), { class: "w-5 h-5" })
                                  ], 8, ["onClick"])
                                ])
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
                          }, " Reason & Time "),
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
                              createVNode("div", { class: "h-4 bg-gray-100 rounded w-3/4 animate-pulse" })
                            ]),
                            createVNode("td", { class: "px-6 py-4" }, [
                              createVNode("div", { class: "h-4 bg-gray-100 rounded w-1/4 animate-pulse" })
                            ]),
                            createVNode("td", { class: "px-6 py-4" }, [
                              createVNode("div", { class: "h-4 bg-gray-100 rounded w-1/4 animate-pulse" })
                            ]),
                            createVNode("td", { class: "px-6 py-4" })
                          ]);
                        }), 64)) : !unref(requests) || unref(requests).length === 0 ? (openBlock(), createBlock("tr", { key: 1 }, [
                          createVNode("td", {
                            colspan: "6",
                            class: "px-6 py-12 text-center text-gray-500"
                          }, [
                            createVNode("div", { class: "flex flex-col items-center justify-center" }, [
                              createVNode(unref(Clock), { class: "w-12 h-12 text-gray-300 mb-3" }),
                              createVNode("p", { class: "text-lg font-medium text-gray-900" }, "No pending approvals"),
                              createVNode("p", { class: "text-sm text-gray-500 mt-1" }, "You're all caught up!")
                            ])
                          ])
                        ])) : (openBlock(true), createBlock(Fragment, { key: 2 }, renderList(unref(requests), (request) => {
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
                                  createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(request.employee?.name || `Emp #${request.employeeId}`), 1),
                                  createVNode("div", { class: "text-xs text-gray-500" }, toDisplayString(request.employee?.email), 1)
                                ])
                              ])
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                              createVNode("div", { class: "text-sm text-gray-900" }, toDisplayString(unref(format)(new Date(request.date), "MMM d, yyyy")), 1)
                            ]),
                            createVNode("td", { class: "px-6 py-4" }, [
                              createVNode("div", {
                                class: "text-sm text-gray-900 truncate max-w-xs",
                                title: request.reason
                              }, toDisplayString(request.reason), 9, ["title"]),
                              createVNode("div", { class: "text-xs text-gray-500 mt-0.5" }, toDisplayString(unref(format)(new Date(request.startTime), "HH:mm")) + " - " + toDisplayString(unref(format)(new Date(request.endTime), "HH:mm")), 1)
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-500" }, toDisplayString((request.totalMinutes / 60).toFixed(1)) + " hrs ", 1),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                              createVNode(_sfc_main$3, {
                                status: request.status,
                                managerApprovedAt: request.managerApprovedAt,
                                hrApprovedAt: request.hrApprovedAt
                              }, null, 8, ["status", "managerApprovedAt", "hrApprovedAt"])
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium" }, [
                              createVNode("div", { class: "flex justify-end gap-2" }, [
                                createVNode("button", {
                                  onClick: ($event) => handleApprove(request.id, request.status),
                                  class: "p-1 rounded-full text-green-600 hover:bg-green-50 transition-colors",
                                  title: "Approve"
                                }, [
                                  createVNode(unref(CircleCheck), { class: "w-5 h-5" })
                                ], 8, ["onClick"]),
                                createVNode("button", {
                                  onClick: ($event) => handleReject(request.id, request.status),
                                  class: "p-1 rounded-full text-red-600 hover:bg-red-50 transition-colors",
                                  title: "Reject"
                                }, [
                                  createVNode(unref(CircleX), { class: "w-5 h-5" })
                                ], 8, ["onClick"])
                              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[tenant_slug]/dashboard/overtime/pending/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-6kRR9lqV.js.map
