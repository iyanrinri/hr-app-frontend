import { _ as _sfc_main$1 } from './Card-CVi1E1xp.mjs';
import { _ as _sfc_main$1$1, a as _sfc_main$2 } from './CardTitle-D9AdQELc.mjs';
import { _ as _sfc_main$3 } from './CardContent-BE35Q-6Q.mjs';
import { _ as _sfc_main$4 } from './Button-gKFWS_xI.mjs';
import { defineComponent, computed, mergeProps, withCtx, createTextVNode, createVNode, unref, createBlock, openBlock, Fragment, renderList, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { i as usePendingApprovals, j as useApproveLeaveRequest, k as useRejectLeaveRequest } from './useLeaves-DMmgn55L.mjs';
import { format } from 'date-fns';
import { ac as Check, X } from './server.mjs';
import './index-B7s_3MI_.mjs';
import 'clsx';
import 'tailwind-merge';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { data: approvalsData, loading, refresh } = usePendingApprovals();
    const { mutate: approve } = useApproveLeaveRequest();
    const { mutate: reject } = useRejectLeaveRequest();
    const requests = computed(() => {
      if (!approvalsData.value) return [];
      if (Array.isArray(approvalsData.value)) return approvalsData.value;
      return approvalsData.value.data || [];
    });
    const handleApprove = async (id) => {
      await approve(id);
      refresh();
    };
    const handleReject = async (id) => {
      const reason = prompt("Please enter a rejection reason:");
      if (reason !== null) {
        await reject(id, reason);
        refresh();
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiCard = _sfc_main$1;
      const _component_UiCardHeader = _sfc_main$1$1;
      const _component_UiCardTitle = _sfc_main$2;
      const _component_UiCardContent = _sfc_main$3;
      const _component_UiButton = _sfc_main$4;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex justify-between items-center"><div><h2 className="text-2xl font-bold text-gray-900">Leave Approvals</h2><p className="text-sm text-gray-500">Review and action pending leave requests.</p></div></div>`);
      _push(ssrRenderComponent(_component_UiCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiCardHeader, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiCardTitle, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Pending Requests`);
                      } else {
                        return [
                          createTextVNode("Pending Requests")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiCardTitle, null, {
                      default: withCtx(() => [
                        createTextVNode("Pending Requests")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UiCardContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="overflow-x-auto"${_scopeId2}>`);
                  if (unref(loading)) {
                    _push3(`<div class="text-center py-8"${_scopeId2}><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-navy mx-auto"${_scopeId2}></div></div>`);
                  } else {
                    _push3(`<table class="w-full text-sm text-left"${_scopeId2}><thead class="bg-gray-50 border-b"${_scopeId2}><tr${_scopeId2}><th class="px-4 py-3 font-medium text-gray-500"${_scopeId2}>Employee</th><th class="px-4 py-3 font-medium text-gray-500"${_scopeId2}>Type</th><th class="px-4 py-3 font-medium text-gray-500"${_scopeId2}>Dates</th><th class="px-4 py-3 font-medium text-gray-500"${_scopeId2}>Days</th><th class="px-4 py-3 font-medium text-gray-500"${_scopeId2}>Reason</th><th class="px-4 py-3 font-medium text-right text-gray-500"${_scopeId2}>Actions</th></tr></thead><tbody class="divide-y"${_scopeId2}>`);
                    if (requests.value.length === 0) {
                      _push3(`<tr${_scopeId2}><td colspan="6" class="p-4 text-center text-gray-500 italic"${_scopeId2}>No pending approvals.</td></tr>`);
                    } else {
                      _push3(`<!--[-->`);
                      ssrRenderList(requests.value, (req) => {
                        _push3(`<tr class="hover:bg-gray-50"${_scopeId2}><td class="px-4 py-3 font-medium text-gray-900"${_scopeId2}>${ssrInterpolate(req.employeeName || "Unknown")}</td><td class="px-4 py-3 text-gray-600"${_scopeId2}>${ssrInterpolate(req.leaveTypeName)}</td><td class="px-4 py-3 text-gray-600"${_scopeId2}>${ssrInterpolate(unref(format)(new Date(req.startDate), "MMM dd"))} - ${ssrInterpolate(unref(format)(new Date(req.endDate), "MMM dd, yyyy"))}</td><td class="px-4 py-3"${_scopeId2}>${ssrInterpolate(req.totalDays)}</td><td class="px-4 py-3 truncate max-w-[200px]"${_scopeId2}>${ssrInterpolate(req.reason)}</td><td class="px-4 py-3 text-right space-x-2"${_scopeId2}><div class="flex justify-end gap-2"${_scopeId2}>`);
                        _push3(ssrRenderComponent(_component_UiButton, {
                          class: "bg-green-600 hover:bg-green-700 text-white py-1 px-3 text-xs h-auto",
                          onClick: ($event) => handleApprove(req.id)
                        }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(ssrRenderComponent(unref(Check), { class: "w-4 h-4 mr-1" }, null, _parent4, _scopeId3));
                              _push4(` Approve `);
                            } else {
                              return [
                                createVNode(unref(Check), { class: "w-4 h-4 mr-1" }),
                                createTextVNode(" Approve ")
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                        _push3(ssrRenderComponent(_component_UiButton, {
                          variant: "destructive",
                          class: "py-1 px-3 text-xs h-auto",
                          onClick: ($event) => handleReject(req.id)
                        }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(ssrRenderComponent(unref(X), { class: "w-4 h-4 mr-1" }, null, _parent4, _scopeId3));
                              _push4(` Reject `);
                            } else {
                              return [
                                createVNode(unref(X), { class: "w-4 h-4 mr-1" }),
                                createTextVNode(" Reject ")
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                        _push3(`</div></td></tr>`);
                      });
                      _push3(`<!--]-->`);
                    }
                    _push3(`</tbody></table>`);
                  }
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "overflow-x-auto" }, [
                      unref(loading) ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "text-center py-8"
                      }, [
                        createVNode("div", { class: "animate-spin rounded-full h-8 w-8 border-b-2 border-brand-navy mx-auto" })
                      ])) : (openBlock(), createBlock("table", {
                        key: 1,
                        class: "w-full text-sm text-left"
                      }, [
                        createVNode("thead", { class: "bg-gray-50 border-b" }, [
                          createVNode("tr", null, [
                            createVNode("th", { class: "px-4 py-3 font-medium text-gray-500" }, "Employee"),
                            createVNode("th", { class: "px-4 py-3 font-medium text-gray-500" }, "Type"),
                            createVNode("th", { class: "px-4 py-3 font-medium text-gray-500" }, "Dates"),
                            createVNode("th", { class: "px-4 py-3 font-medium text-gray-500" }, "Days"),
                            createVNode("th", { class: "px-4 py-3 font-medium text-gray-500" }, "Reason"),
                            createVNode("th", { class: "px-4 py-3 font-medium text-right text-gray-500" }, "Actions")
                          ])
                        ]),
                        createVNode("tbody", { class: "divide-y" }, [
                          requests.value.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                            createVNode("td", {
                              colspan: "6",
                              class: "p-4 text-center text-gray-500 italic"
                            }, "No pending approvals.")
                          ])) : (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(requests.value, (req) => {
                            return openBlock(), createBlock("tr", {
                              key: req.id,
                              class: "hover:bg-gray-50"
                            }, [
                              createVNode("td", { class: "px-4 py-3 font-medium text-gray-900" }, toDisplayString(req.employeeName || "Unknown"), 1),
                              createVNode("td", { class: "px-4 py-3 text-gray-600" }, toDisplayString(req.leaveTypeName), 1),
                              createVNode("td", { class: "px-4 py-3 text-gray-600" }, toDisplayString(unref(format)(new Date(req.startDate), "MMM dd")) + " - " + toDisplayString(unref(format)(new Date(req.endDate), "MMM dd, yyyy")), 1),
                              createVNode("td", { class: "px-4 py-3" }, toDisplayString(req.totalDays), 1),
                              createVNode("td", { class: "px-4 py-3 truncate max-w-[200px]" }, toDisplayString(req.reason), 1),
                              createVNode("td", { class: "px-4 py-3 text-right space-x-2" }, [
                                createVNode("div", { class: "flex justify-end gap-2" }, [
                                  createVNode(_component_UiButton, {
                                    class: "bg-green-600 hover:bg-green-700 text-white py-1 px-3 text-xs h-auto",
                                    onClick: ($event) => handleApprove(req.id)
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(Check), { class: "w-4 h-4 mr-1" }),
                                      createTextVNode(" Approve ")
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"]),
                                  createVNode(_component_UiButton, {
                                    variant: "destructive",
                                    class: "py-1 px-3 text-xs h-auto",
                                    onClick: ($event) => handleReject(req.id)
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(X), { class: "w-4 h-4 mr-1" }),
                                      createTextVNode(" Reject ")
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"])
                                ])
                              ])
                            ]);
                          }), 128))
                        ])
                      ]))
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UiCardHeader, null, {
                default: withCtx(() => [
                  createVNode(_component_UiCardTitle, null, {
                    default: withCtx(() => [
                      createTextVNode("Pending Requests")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_UiCardContent, null, {
                default: withCtx(() => [
                  createVNode("div", { class: "overflow-x-auto" }, [
                    unref(loading) ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "text-center py-8"
                    }, [
                      createVNode("div", { class: "animate-spin rounded-full h-8 w-8 border-b-2 border-brand-navy mx-auto" })
                    ])) : (openBlock(), createBlock("table", {
                      key: 1,
                      class: "w-full text-sm text-left"
                    }, [
                      createVNode("thead", { class: "bg-gray-50 border-b" }, [
                        createVNode("tr", null, [
                          createVNode("th", { class: "px-4 py-3 font-medium text-gray-500" }, "Employee"),
                          createVNode("th", { class: "px-4 py-3 font-medium text-gray-500" }, "Type"),
                          createVNode("th", { class: "px-4 py-3 font-medium text-gray-500" }, "Dates"),
                          createVNode("th", { class: "px-4 py-3 font-medium text-gray-500" }, "Days"),
                          createVNode("th", { class: "px-4 py-3 font-medium text-gray-500" }, "Reason"),
                          createVNode("th", { class: "px-4 py-3 font-medium text-right text-gray-500" }, "Actions")
                        ])
                      ]),
                      createVNode("tbody", { class: "divide-y" }, [
                        requests.value.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                          createVNode("td", {
                            colspan: "6",
                            class: "p-4 text-center text-gray-500 italic"
                          }, "No pending approvals.")
                        ])) : (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(requests.value, (req) => {
                          return openBlock(), createBlock("tr", {
                            key: req.id,
                            class: "hover:bg-gray-50"
                          }, [
                            createVNode("td", { class: "px-4 py-3 font-medium text-gray-900" }, toDisplayString(req.employeeName || "Unknown"), 1),
                            createVNode("td", { class: "px-4 py-3 text-gray-600" }, toDisplayString(req.leaveTypeName), 1),
                            createVNode("td", { class: "px-4 py-3 text-gray-600" }, toDisplayString(unref(format)(new Date(req.startDate), "MMM dd")) + " - " + toDisplayString(unref(format)(new Date(req.endDate), "MMM dd, yyyy")), 1),
                            createVNode("td", { class: "px-4 py-3" }, toDisplayString(req.totalDays), 1),
                            createVNode("td", { class: "px-4 py-3 truncate max-w-[200px]" }, toDisplayString(req.reason), 1),
                            createVNode("td", { class: "px-4 py-3 text-right space-x-2" }, [
                              createVNode("div", { class: "flex justify-end gap-2" }, [
                                createVNode(_component_UiButton, {
                                  class: "bg-green-600 hover:bg-green-700 text-white py-1 px-3 text-xs h-auto",
                                  onClick: ($event) => handleApprove(req.id)
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Check), { class: "w-4 h-4 mr-1" }),
                                    createTextVNode(" Approve ")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"]),
                                createVNode(_component_UiButton, {
                                  variant: "destructive",
                                  class: "py-1 px-3 text-xs h-auto",
                                  onClick: ($event) => handleReject(req.id)
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(X), { class: "w-4 h-4 mr-1" }),
                                    createTextVNode(" Reject ")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"])
                              ])
                            ])
                          ]);
                        }), 128))
                      ])
                    ]))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[tenant_slug]/dashboard/leaves/approvals/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-D_my3QtA.mjs.map
