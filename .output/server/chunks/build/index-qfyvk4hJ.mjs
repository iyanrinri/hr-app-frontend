import { _ as _sfc_main$1 } from './Card-CVi1E1xp.mjs';
import { _ as _sfc_main$2 } from './CardContent-BE35Q-6Q.mjs';
import { _ as _sfc_main$1$1, a as _sfc_main$3 } from './CardTitle-D9AdQELc.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-DsceMx1n.mjs';
import { defineComponent, computed, mergeProps, withCtx, unref, createVNode, toDisplayString, createTextVNode, createBlock, openBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { K as useAuthStore, W as Wallet } from './server.mjs';
import { g as useMyPayrolls } from './usePayroll-BqsCAGPe.mjs';
import './index-B7s_3MI_.mjs';
import 'clsx';
import 'tailwind-merge';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';
import 'uuid';
import './fetch-VuP8VKdC.mjs';
import '@vue/shared';
import 'perfect-debounce';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const authStore = useAuthStore();
    const user = computed(() => authStore.user);
    const { data: payrolls, loading: isLoadingHistory } = useMyPayrolls();
    const formatIDR = (val) => {
      return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(Number(val));
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiCard = _sfc_main$1;
      const _component_UiCardContent = _sfc_main$2;
      const _component_UiCardHeader = _sfc_main$1$1;
      const _component_UiCardTitle = _sfc_main$3;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" }, _attrs))}><div class="md:flex md:items-center md:justify-between"><div class="flex-1 min-w-0"><h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate"> My Salary </h2><p class="mt-1 text-sm text-gray-500"> Overview of your compensation and payment history </p></div></div><div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">`);
      _push(ssrRenderComponent(_component_UiCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiCardContent, { class: "p-5 flex items-center" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                var _a, _b;
                if (_push3) {
                  _push3(`<div class="flex-shrink-0"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Wallet), { class: "h-6 w-6 text-gray-400" }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="ml-5 w-0 flex-1"${_scopeId2}><dl${_scopeId2}><dt class="text-sm font-medium text-gray-500 truncate"${_scopeId2}>Base Salary</dt><dd${_scopeId2}><div class="text-lg font-medium text-gray-900"${_scopeId2}>${ssrInterpolate(((_a = unref(user)) == null ? void 0 : _a.baseSalary) ? formatIDR(unref(user).baseSalary) : "Confidential")}</div></dd></dl></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex-shrink-0" }, [
                      createVNode(unref(Wallet), { class: "h-6 w-6 text-gray-400" })
                    ]),
                    createVNode("div", { class: "ml-5 w-0 flex-1" }, [
                      createVNode("dl", null, [
                        createVNode("dt", { class: "text-sm font-medium text-gray-500 truncate" }, "Base Salary"),
                        createVNode("dd", null, [
                          createVNode("div", { class: "text-lg font-medium text-gray-900" }, toDisplayString(((_b = unref(user)) == null ? void 0 : _b.baseSalary) ? formatIDR(unref(user).baseSalary) : "Confidential"), 1)
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
              createVNode(_component_UiCardContent, { class: "p-5 flex items-center" }, {
                default: withCtx(() => {
                  var _a;
                  return [
                    createVNode("div", { class: "flex-shrink-0" }, [
                      createVNode(unref(Wallet), { class: "h-6 w-6 text-gray-400" })
                    ]),
                    createVNode("div", { class: "ml-5 w-0 flex-1" }, [
                      createVNode("dl", null, [
                        createVNode("dt", { class: "text-sm font-medium text-gray-500 truncate" }, "Base Salary"),
                        createVNode("dd", null, [
                          createVNode("div", { class: "text-lg font-medium text-gray-900" }, toDisplayString(((_a = unref(user)) == null ? void 0 : _a.baseSalary) ? formatIDR(unref(user).baseSalary) : "Confidential"), 1)
                        ])
                      ])
                    ])
                  ];
                }),
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
                        _push4(`Recent Payments`);
                      } else {
                        return [
                          createTextVNode("Recent Payments")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiCardTitle, null, {
                      default: withCtx(() => [
                        createTextVNode("Recent Payments")
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
                  if (unref(isLoadingHistory)) {
                    _push3(`<div class="text-center py-4"${_scopeId2}>Loading...</div>`);
                  } else if (!unref(payrolls) || unref(payrolls).data.length === 0) {
                    _push3(`<div class="text-center py-4 text-gray-500"${_scopeId2}>No payment history found.</div>`);
                  } else {
                    _push3(`<div class="overflow-x-auto"${_scopeId2}><table class="min-w-full divide-y divide-gray-200"${_scopeId2}><thead${_scopeId2}><tr${_scopeId2}><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId2}>Period</th><th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId2}>Net Pay</th><th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId2}>Status</th><th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId2}>Action</th></tr></thead><tbody class="bg-white divide-y divide-gray-200"${_scopeId2}><!--[-->`);
                    ssrRenderList(unref(payrolls).data, (payroll) => {
                      _push3(`<tr class="hover:bg-gray-50"${_scopeId2}><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"${_scopeId2}>${ssrInterpolate(new Date(payroll.periodStart).toLocaleDateString())} - ${ssrInterpolate(new Date(payroll.periodEnd).toLocaleDateString())}</td><td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-brand-navy"${_scopeId2}>${ssrInterpolate(formatIDR(payroll.netSalary))}</td><td class="px-6 py-4 whitespace-nowrap text-center"${_scopeId2}><span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"${_scopeId2}>${ssrInterpolate(payroll.status)}</span></td><td class="px-6 py-4 whitespace-nowrap text-right text-sm"${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_NuxtLink, {
                        to: `/dashboard/payslips/${payroll.id}`,
                        class: "text-brand-navy hover:text-blue-900"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(` View Slip `);
                          } else {
                            return [
                              createTextVNode(" View Slip ")
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(`</td></tr>`);
                    });
                    _push3(`<!--]--></tbody></table></div>`);
                  }
                } else {
                  return [
                    unref(isLoadingHistory) ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "text-center py-4"
                    }, "Loading...")) : !unref(payrolls) || unref(payrolls).data.length === 0 ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "text-center py-4 text-gray-500"
                    }, "No payment history found.")) : (openBlock(), createBlock("div", {
                      key: 2,
                      class: "overflow-x-auto"
                    }, [
                      createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                        createVNode("thead", null, [
                          createVNode("tr", null, [
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Period"),
                            createVNode("th", { class: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Net Pay"),
                            createVNode("th", { class: "px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Status"),
                            createVNode("th", { class: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Action")
                          ])
                        ]),
                        createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(payrolls).data, (payroll) => {
                            return openBlock(), createBlock("tr", {
                              key: payroll.id,
                              class: "hover:bg-gray-50"
                            }, [
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" }, toDisplayString(new Date(payroll.periodStart).toLocaleDateString()) + " - " + toDisplayString(new Date(payroll.periodEnd).toLocaleDateString()), 1),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-brand-navy" }, toDisplayString(formatIDR(payroll.netSalary)), 1),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-center" }, [
                                createVNode("span", { class: "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800" }, toDisplayString(payroll.status), 1)
                              ]),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right text-sm" }, [
                                createVNode(_component_NuxtLink, {
                                  to: `/dashboard/payslips/${payroll.id}`,
                                  class: "text-brand-navy hover:text-blue-900"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" View Slip ")
                                  ]),
                                  _: 1
                                }, 8, ["to"])
                              ])
                            ]);
                          }), 128))
                        ])
                      ])
                    ]))
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
                      createTextVNode("Recent Payments")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_UiCardContent, null, {
                default: withCtx(() => [
                  unref(isLoadingHistory) ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "text-center py-4"
                  }, "Loading...")) : !unref(payrolls) || unref(payrolls).data.length === 0 ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "text-center py-4 text-gray-500"
                  }, "No payment history found.")) : (openBlock(), createBlock("div", {
                    key: 2,
                    class: "overflow-x-auto"
                  }, [
                    createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Period"),
                          createVNode("th", { class: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Net Pay"),
                          createVNode("th", { class: "px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Status"),
                          createVNode("th", { class: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Action")
                        ])
                      ]),
                      createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(payrolls).data, (payroll) => {
                          return openBlock(), createBlock("tr", {
                            key: payroll.id,
                            class: "hover:bg-gray-50"
                          }, [
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" }, toDisplayString(new Date(payroll.periodStart).toLocaleDateString()) + " - " + toDisplayString(new Date(payroll.periodEnd).toLocaleDateString()), 1),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-brand-navy" }, toDisplayString(formatIDR(payroll.netSalary)), 1),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-center" }, [
                              createVNode("span", { class: "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800" }, toDisplayString(payroll.status), 1)
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right text-sm" }, [
                              createVNode(_component_NuxtLink, {
                                to: `/dashboard/payslips/${payroll.id}`,
                                class: "text-brand-navy hover:text-blue-900"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" View Slip ")
                                ]),
                                _: 1
                              }, 8, ["to"])
                            ])
                          ]);
                        }), 128))
                      ])
                    ])
                  ]))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[tenant_slug]/dashboard/payroll/my/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-qfyvk4hJ.mjs.map
