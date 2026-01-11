import { _ as __nuxt_component_0 } from "./nuxt-link-DsceMx1n.js";
import { _ as _sfc_main$1 } from "./Button-gKFWS_xI.js";
import { _ as _sfc_main$2 } from "./Card-CVi1E1xp.js";
import { _ as _sfc_main$3, a as _sfc_main$4 } from "./CardTitle-D9AdQELc.js";
import { _ as _sfc_main$5 } from "./CardContent-BE35Q-6Q.js";
import { defineComponent, computed, mergeProps, unref, withCtx, createVNode, createTextVNode, createBlock, openBlock, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { g as useLeavePeriods, h as useDeleteLeavePeriod } from "./useLeaves-DMmgn55L.js";
import { format } from "date-fns";
import { u as useRoute, P as Plus, ac as Check, X, w as SquarePen, ad as Trash } from "../server.mjs";
import "/Users/iyan/NodeStudio/hr-app-frontend/node_modules/hookable/dist/index.mjs";
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
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const tenantSlug = route.params.tenant_slug;
    const { data: response, loading, refresh } = useLeavePeriods();
    const { mutate: deletePeriod, loading: isDeleting } = useDeleteLeavePeriod();
    const periods = computed(() => response.value?.data || []);
    const handleDelete = async (id) => {
      if (confirm("Are you sure you want to delete this leave period?")) {
        await deletePeriod(id);
        refresh();
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_UiButton = _sfc_main$1;
      const _component_UiCard = _sfc_main$2;
      const _component_UiCardHeader = _sfc_main$3;
      const _component_UiCardTitle = _sfc_main$4;
      const _component_UiCardContent = _sfc_main$5;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex justify-between items-center"><div><h2 class="text-2xl font-bold text-gray-900">Leave Configuration</h2><p class="text-sm text-gray-500">Manage leave periods and entitlements</p></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/${unref(tenantSlug)}/dashboard/leaves/periods/create`
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiButton, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Plus), { class: "w-4 h-4 mr-2" }, null, _parent3, _scopeId2));
                  _push3(` Create Period `);
                } else {
                  return [
                    createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                    createTextVNode(" Create Period ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UiButton, null, {
                default: withCtx(() => [
                  createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                  createTextVNode(" Create Period ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_UiCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiCardHeader, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiCardTitle, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Leave Periods`);
                      } else {
                        return [
                          createTextVNode("Leave Periods")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiCardTitle, null, {
                      default: withCtx(() => [
                        createTextVNode("Leave Periods")
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
                    _push3(`<div class="flex justify-center py-8"${_scopeId2}><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-navy"${_scopeId2}></div></div>`);
                  } else {
                    _push3(`<table class="w-full text-sm text-left"${_scopeId2}><thead class="bg-gray-50 border-b"${_scopeId2}><tr${_scopeId2}><th class="px-4 py-3 font-medium text-gray-500"${_scopeId2}>Name</th><th class="px-4 py-3 font-medium text-gray-500"${_scopeId2}>Start Date</th><th class="px-4 py-3 font-medium text-gray-500"${_scopeId2}>End Date</th><th class="px-4 py-3 font-medium text-gray-500"${_scopeId2}>Status</th><th class="px-4 py-3 font-medium text-gray-500"${_scopeId2}>Description</th><th class="px-4 py-3 font-medium text-right text-gray-500"${_scopeId2}>Actions</th></tr></thead><tbody class="divide-y"${_scopeId2}>`);
                    if (unref(periods).length === 0) {
                      _push3(`<tr${_scopeId2}><td colspan="6" class="px-4 py-6 text-center text-gray-500 italic"${_scopeId2}> No leave periods found. </td></tr>`);
                    } else {
                      _push3(`<!--[-->`);
                      ssrRenderList(unref(periods), (period) => {
                        _push3(`<tr class="hover:bg-gray-50"${_scopeId2}><td class="px-4 py-3 font-medium text-gray-900"${_scopeId2}>${ssrInterpolate(period.name)}</td><td class="px-4 py-3 text-gray-600"${_scopeId2}>${ssrInterpolate(unref(format)(new Date(period.startDate), "MMM dd, yyyy"))}</td><td class="px-4 py-3 text-gray-600"${_scopeId2}>${ssrInterpolate(unref(format)(new Date(period.endDate), "MMM dd, yyyy"))}</td><td class="px-4 py-3"${_scopeId2}>`);
                        if (period.isActive) {
                          _push3(`<span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700"${_scopeId2}>`);
                          _push3(ssrRenderComponent(unref(Check), { class: "w-3 h-3 mr-1" }, null, _parent3, _scopeId2));
                          _push3(` Active </span>`);
                        } else {
                          _push3(`<span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600"${_scopeId2}>`);
                          _push3(ssrRenderComponent(unref(X), { class: "w-3 h-3 mr-1" }, null, _parent3, _scopeId2));
                          _push3(` Inactive </span>`);
                        }
                        _push3(`</td><td class="px-4 py-3 text-gray-500 truncate max-w-[200px]"${_scopeId2}>${ssrInterpolate(period.description)}</td><td class="px-4 py-3 text-right space-x-2"${_scopeId2}>`);
                        _push3(ssrRenderComponent(_component_NuxtLink, {
                          to: `/${unref(tenantSlug)}/dashboard/leaves/periods/${period.id}`
                        }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(ssrRenderComponent(_component_UiButton, {
                                variant: "secondary",
                                class: "h-8 px-2"
                              }, {
                                default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                  if (_push5) {
                                    _push5(ssrRenderComponent(unref(SquarePen), { class: "w-4 h-4" }, null, _parent5, _scopeId4));
                                  } else {
                                    return [
                                      createVNode(unref(SquarePen), { class: "w-4 h-4" })
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent4, _scopeId3));
                            } else {
                              return [
                                createVNode(_component_UiButton, {
                                  variant: "secondary",
                                  class: "h-8 px-2"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(SquarePen), { class: "w-4 h-4" })
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                        _push3(ssrRenderComponent(_component_UiButton, {
                          variant: "destructive",
                          class: "h-8 px-2",
                          onClick: ($event) => handleDelete(period.id),
                          disabled: unref(isDeleting)
                        }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(ssrRenderComponent(unref(Trash), { class: "w-4 h-4" }, null, _parent4, _scopeId3));
                            } else {
                              return [
                                createVNode(unref(Trash), { class: "w-4 h-4" })
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                        _push3(`</td></tr>`);
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
                        class: "flex justify-center py-8"
                      }, [
                        createVNode("div", { class: "animate-spin rounded-full h-8 w-8 border-b-2 border-brand-navy" })
                      ])) : (openBlock(), createBlock("table", {
                        key: 1,
                        class: "w-full text-sm text-left"
                      }, [
                        createVNode("thead", { class: "bg-gray-50 border-b" }, [
                          createVNode("tr", null, [
                            createVNode("th", { class: "px-4 py-3 font-medium text-gray-500" }, "Name"),
                            createVNode("th", { class: "px-4 py-3 font-medium text-gray-500" }, "Start Date"),
                            createVNode("th", { class: "px-4 py-3 font-medium text-gray-500" }, "End Date"),
                            createVNode("th", { class: "px-4 py-3 font-medium text-gray-500" }, "Status"),
                            createVNode("th", { class: "px-4 py-3 font-medium text-gray-500" }, "Description"),
                            createVNode("th", { class: "px-4 py-3 font-medium text-right text-gray-500" }, "Actions")
                          ])
                        ]),
                        createVNode("tbody", { class: "divide-y" }, [
                          unref(periods).length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                            createVNode("td", {
                              colspan: "6",
                              class: "px-4 py-6 text-center text-gray-500 italic"
                            }, " No leave periods found. ")
                          ])) : (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(unref(periods), (period) => {
                            return openBlock(), createBlock("tr", {
                              key: period.id,
                              class: "hover:bg-gray-50"
                            }, [
                              createVNode("td", { class: "px-4 py-3 font-medium text-gray-900" }, toDisplayString(period.name), 1),
                              createVNode("td", { class: "px-4 py-3 text-gray-600" }, toDisplayString(unref(format)(new Date(period.startDate), "MMM dd, yyyy")), 1),
                              createVNode("td", { class: "px-4 py-3 text-gray-600" }, toDisplayString(unref(format)(new Date(period.endDate), "MMM dd, yyyy")), 1),
                              createVNode("td", { class: "px-4 py-3" }, [
                                period.isActive ? (openBlock(), createBlock("span", {
                                  key: 0,
                                  class: "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700"
                                }, [
                                  createVNode(unref(Check), { class: "w-3 h-3 mr-1" }),
                                  createTextVNode(" Active ")
                                ])) : (openBlock(), createBlock("span", {
                                  key: 1,
                                  class: "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600"
                                }, [
                                  createVNode(unref(X), { class: "w-3 h-3 mr-1" }),
                                  createTextVNode(" Inactive ")
                                ]))
                              ]),
                              createVNode("td", { class: "px-4 py-3 text-gray-500 truncate max-w-[200px]" }, toDisplayString(period.description), 1),
                              createVNode("td", { class: "px-4 py-3 text-right space-x-2" }, [
                                createVNode(_component_NuxtLink, {
                                  to: `/${unref(tenantSlug)}/dashboard/leaves/periods/${period.id}`
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_UiButton, {
                                      variant: "secondary",
                                      class: "h-8 px-2"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(SquarePen), { class: "w-4 h-4" })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }, 8, ["to"]),
                                createVNode(_component_UiButton, {
                                  variant: "destructive",
                                  class: "h-8 px-2",
                                  onClick: ($event) => handleDelete(period.id),
                                  disabled: unref(isDeleting)
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Trash), { class: "w-4 h-4" })
                                  ]),
                                  _: 1
                                }, 8, ["onClick", "disabled"])
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
                      createTextVNode("Leave Periods")
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
                      class: "flex justify-center py-8"
                    }, [
                      createVNode("div", { class: "animate-spin rounded-full h-8 w-8 border-b-2 border-brand-navy" })
                    ])) : (openBlock(), createBlock("table", {
                      key: 1,
                      class: "w-full text-sm text-left"
                    }, [
                      createVNode("thead", { class: "bg-gray-50 border-b" }, [
                        createVNode("tr", null, [
                          createVNode("th", { class: "px-4 py-3 font-medium text-gray-500" }, "Name"),
                          createVNode("th", { class: "px-4 py-3 font-medium text-gray-500" }, "Start Date"),
                          createVNode("th", { class: "px-4 py-3 font-medium text-gray-500" }, "End Date"),
                          createVNode("th", { class: "px-4 py-3 font-medium text-gray-500" }, "Status"),
                          createVNode("th", { class: "px-4 py-3 font-medium text-gray-500" }, "Description"),
                          createVNode("th", { class: "px-4 py-3 font-medium text-right text-gray-500" }, "Actions")
                        ])
                      ]),
                      createVNode("tbody", { class: "divide-y" }, [
                        unref(periods).length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                          createVNode("td", {
                            colspan: "6",
                            class: "px-4 py-6 text-center text-gray-500 italic"
                          }, " No leave periods found. ")
                        ])) : (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(unref(periods), (period) => {
                          return openBlock(), createBlock("tr", {
                            key: period.id,
                            class: "hover:bg-gray-50"
                          }, [
                            createVNode("td", { class: "px-4 py-3 font-medium text-gray-900" }, toDisplayString(period.name), 1),
                            createVNode("td", { class: "px-4 py-3 text-gray-600" }, toDisplayString(unref(format)(new Date(period.startDate), "MMM dd, yyyy")), 1),
                            createVNode("td", { class: "px-4 py-3 text-gray-600" }, toDisplayString(unref(format)(new Date(period.endDate), "MMM dd, yyyy")), 1),
                            createVNode("td", { class: "px-4 py-3" }, [
                              period.isActive ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700"
                              }, [
                                createVNode(unref(Check), { class: "w-3 h-3 mr-1" }),
                                createTextVNode(" Active ")
                              ])) : (openBlock(), createBlock("span", {
                                key: 1,
                                class: "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600"
                              }, [
                                createVNode(unref(X), { class: "w-3 h-3 mr-1" }),
                                createTextVNode(" Inactive ")
                              ]))
                            ]),
                            createVNode("td", { class: "px-4 py-3 text-gray-500 truncate max-w-[200px]" }, toDisplayString(period.description), 1),
                            createVNode("td", { class: "px-4 py-3 text-right space-x-2" }, [
                              createVNode(_component_NuxtLink, {
                                to: `/${unref(tenantSlug)}/dashboard/leaves/periods/${period.id}`
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_UiButton, {
                                    variant: "secondary",
                                    class: "h-8 px-2"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(SquarePen), { class: "w-4 h-4" })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }, 8, ["to"]),
                              createVNode(_component_UiButton, {
                                variant: "destructive",
                                class: "h-8 px-2",
                                onClick: ($event) => handleDelete(period.id),
                                disabled: unref(isDeleting)
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Trash), { class: "w-4 h-4" })
                                ]),
                                _: 1
                              }, 8, ["onClick", "disabled"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[tenant_slug]/dashboard/leaves/periods/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-Ccm00S4_.js.map
