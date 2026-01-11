import { _ as _sfc_main$1 } from './Card-CVi1E1xp.mjs';
import { _ as _sfc_main$2 } from './CardContent-BE35Q-6Q.mjs';
import { defineComponent, ref, computed, mergeProps, withCtx, unref, createVNode, withDirectives, createBlock, openBlock, Fragment, renderList, toDisplayString, vModelSelect, vModelText, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { u as useAllEmployees } from './useEmployees-CEaIsP48.mjs';
import { u as useEmployeeOvertimeHistory, a as useEmployeeTotalHours } from './useOvertime-BEYm8O2P.mjs';
import { _ as _sfc_main$3 } from './OvertimeStatusBadge-DoLs4Iy4.mjs';
import { format, startOfMonth, endOfMonth } from 'date-fns';
import { a6 as History, ae as ChartColumn, y as Search, f as Clock, D as DollarSign } from './server.mjs';
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
import './overtime-kX-Lpsii.mjs';
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
    const selectedEmployeeId = ref("");
    const activeTab = ref("history");
    const startDate = ref(format(startOfMonth(/* @__PURE__ */ new Date()), "yyyy-MM-dd"));
    const endDate = ref(format(endOfMonth(/* @__PURE__ */ new Date()), "yyyy-MM-dd"));
    const { data: employees } = useAllEmployees();
    const historyFilters = computed(() => ({
      take: 50,
      startDate: activeTab.value === "history" ? startDate.value : void 0,
      endDate: activeTab.value === "history" ? endDate.value : void 0
    }));
    const { data: historyData, loading: isLoadingHistory } = useEmployeeOvertimeHistory(selectedEmployeeId, historyFilters);
    const historyRequests = computed(() => {
      if (!historyData.value) return [];
      if (Array.isArray(historyData.value)) return historyData.value;
      return historyData.value.requests || [];
    });
    const totalHoursFilters = computed(() => ({
      startDate: startDate.value,
      endDate: endDate.value,
      status: void 0
    }));
    const { data: totalHoursData, loading: isLoadingTotal } = useEmployeeTotalHours(selectedEmployeeId, totalHoursFilters);
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(Number(amount));
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c;
      const _component_UiCard = _sfc_main$1;
      const _component_UiCardContent = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" }, _attrs))}><div class="md:flex md:items-center md:justify-between"><div class="flex-1 min-w-0"><h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate"> Overtime Administration </h2><p class="mt-1 text-sm text-gray-500"> Monitor and report on employee overtime </p></div></div>`);
      _push(ssrRenderComponent(_component_UiCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiCardContent, { class: "p-6" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="grid grid-cols-1 md:grid-cols-3 gap-6"${_scopeId2}><div class="space-y-2"${_scopeId2}><label class="text-sm font-medium text-gray-700"${_scopeId2}>Select Employee</label><select class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy focus:ring-offset-2"${_scopeId2}><option value=""${ssrIncludeBooleanAttr(Array.isArray(selectedEmployeeId.value) ? ssrLooseContain(selectedEmployeeId.value, "") : ssrLooseEqual(selectedEmployeeId.value, "")) ? " selected" : ""}${_scopeId2}>-- Select Employee --</option><!--[-->`);
                  ssrRenderList(unref(employees), (emp) => {
                    _push3(`<option${ssrRenderAttr("value", emp.id)}${ssrIncludeBooleanAttr(Array.isArray(selectedEmployeeId.value) ? ssrLooseContain(selectedEmployeeId.value, emp.id) : ssrLooseEqual(selectedEmployeeId.value, emp.id)) ? " selected" : ""}${_scopeId2}>${ssrInterpolate(emp.name || emp.firstName + " " + emp.lastName)} (${ssrInterpolate(emp.position)}) </option>`);
                  });
                  _push3(`<!--]--></select></div><div class="space-y-2"${_scopeId2}><label class="text-sm font-medium text-gray-700"${_scopeId2}>Start Date</label><input type="date" class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy"${ssrRenderAttr("value", startDate.value)}${_scopeId2}></div><div class="space-y-2"${_scopeId2}><label class="text-sm font-medium text-gray-700"${_scopeId2}>End Date</label><input type="date" class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy"${ssrRenderAttr("value", endDate.value)}${_scopeId2}></div></div><div class="flex border-b border-gray-200 mt-6 gap-8"${_scopeId2}><button class="${ssrRenderClass([activeTab.value === "history" ? "text-brand-navy border-b-2 border-brand-navy" : "text-gray-500 hover:text-gray-700", "pb-3 text-sm font-medium transition-colors relative"])}"${_scopeId2}><span class="flex items-center gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(History), { class: "w-4 h-4" }, null, _parent3, _scopeId2));
                  _push3(` Request History </span></button><button class="${ssrRenderClass([activeTab.value === "total" ? "text-brand-navy border-b-2 border-brand-navy" : "text-gray-500 hover:text-gray-700", "pb-3 text-sm font-medium transition-colors relative"])}"${_scopeId2}><span class="flex items-center gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(ChartColumn), { class: "w-4 h-4" }, null, _parent3, _scopeId2));
                  _push3(` Total Hours Analysis </span></button></div>`);
                } else {
                  return [
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-6" }, [
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode("label", { class: "text-sm font-medium text-gray-700" }, "Select Employee"),
                        withDirectives(createVNode("select", {
                          class: "flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy focus:ring-offset-2",
                          "onUpdate:modelValue": ($event) => selectedEmployeeId.value = $event
                        }, [
                          createVNode("option", { value: "" }, "-- Select Employee --"),
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(employees), (emp) => {
                            return openBlock(), createBlock("option", {
                              key: emp.id,
                              value: emp.id
                            }, toDisplayString(emp.name || emp.firstName + " " + emp.lastName) + " (" + toDisplayString(emp.position) + ") ", 9, ["value"]);
                          }), 128))
                        ], 8, ["onUpdate:modelValue"]), [
                          [vModelSelect, selectedEmployeeId.value]
                        ])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode("label", { class: "text-sm font-medium text-gray-700" }, "Start Date"),
                        withDirectives(createVNode("input", {
                          type: "date",
                          class: "flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy",
                          "onUpdate:modelValue": ($event) => startDate.value = $event
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, startDate.value]
                        ])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode("label", { class: "text-sm font-medium text-gray-700" }, "End Date"),
                        withDirectives(createVNode("input", {
                          type: "date",
                          class: "flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy",
                          "onUpdate:modelValue": ($event) => endDate.value = $event
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, endDate.value]
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "flex border-b border-gray-200 mt-6 gap-8" }, [
                      createVNode("button", {
                        onClick: ($event) => activeTab.value = "history",
                        class: ["pb-3 text-sm font-medium transition-colors relative", activeTab.value === "history" ? "text-brand-navy border-b-2 border-brand-navy" : "text-gray-500 hover:text-gray-700"]
                      }, [
                        createVNode("span", { class: "flex items-center gap-2" }, [
                          createVNode(unref(History), { class: "w-4 h-4" }),
                          createTextVNode(" Request History ")
                        ])
                      ], 10, ["onClick"]),
                      createVNode("button", {
                        onClick: ($event) => activeTab.value = "total",
                        class: ["pb-3 text-sm font-medium transition-colors relative", activeTab.value === "total" ? "text-brand-navy border-b-2 border-brand-navy" : "text-gray-500 hover:text-gray-700"]
                      }, [
                        createVNode("span", { class: "flex items-center gap-2" }, [
                          createVNode(unref(ChartColumn), { class: "w-4 h-4" }),
                          createTextVNode(" Total Hours Analysis ")
                        ])
                      ], 10, ["onClick"])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UiCardContent, { class: "p-6" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-6" }, [
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode("label", { class: "text-sm font-medium text-gray-700" }, "Select Employee"),
                      withDirectives(createVNode("select", {
                        class: "flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy focus:ring-offset-2",
                        "onUpdate:modelValue": ($event) => selectedEmployeeId.value = $event
                      }, [
                        createVNode("option", { value: "" }, "-- Select Employee --"),
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(employees), (emp) => {
                          return openBlock(), createBlock("option", {
                            key: emp.id,
                            value: emp.id
                          }, toDisplayString(emp.name || emp.firstName + " " + emp.lastName) + " (" + toDisplayString(emp.position) + ") ", 9, ["value"]);
                        }), 128))
                      ], 8, ["onUpdate:modelValue"]), [
                        [vModelSelect, selectedEmployeeId.value]
                      ])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode("label", { class: "text-sm font-medium text-gray-700" }, "Start Date"),
                      withDirectives(createVNode("input", {
                        type: "date",
                        class: "flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy",
                        "onUpdate:modelValue": ($event) => startDate.value = $event
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, startDate.value]
                      ])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode("label", { class: "text-sm font-medium text-gray-700" }, "End Date"),
                      withDirectives(createVNode("input", {
                        type: "date",
                        class: "flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy",
                        "onUpdate:modelValue": ($event) => endDate.value = $event
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, endDate.value]
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "flex border-b border-gray-200 mt-6 gap-8" }, [
                    createVNode("button", {
                      onClick: ($event) => activeTab.value = "history",
                      class: ["pb-3 text-sm font-medium transition-colors relative", activeTab.value === "history" ? "text-brand-navy border-b-2 border-brand-navy" : "text-gray-500 hover:text-gray-700"]
                    }, [
                      createVNode("span", { class: "flex items-center gap-2" }, [
                        createVNode(unref(History), { class: "w-4 h-4" }),
                        createTextVNode(" Request History ")
                      ])
                    ], 10, ["onClick"]),
                    createVNode("button", {
                      onClick: ($event) => activeTab.value = "total",
                      class: ["pb-3 text-sm font-medium transition-colors relative", activeTab.value === "total" ? "text-brand-navy border-b-2 border-brand-navy" : "text-gray-500 hover:text-gray-700"]
                    }, [
                      createVNode("span", { class: "flex items-center gap-2" }, [
                        createVNode(unref(ChartColumn), { class: "w-4 h-4" }),
                        createTextVNode(" Total Hours Analysis ")
                      ])
                    ], 10, ["onClick"])
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      if (!selectedEmployeeId.value) {
        _push(`<div class="text-center py-12 bg-white rounded-xl shadow-sm border border-dashed border-gray-300">`);
        _push(ssrRenderComponent(unref(Search), { class: "w-12 h-12 text-gray-300 mx-auto mb-3" }, null, _parent));
        _push(`<p class="text-gray-500 text-lg">Select an employee to view details</p></div>`);
      } else if (activeTab.value === "history") {
        _push(ssrRenderComponent(_component_UiCard, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UiCardContent, { class: "p-0 overflow-hidden" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="overflow-x-auto"${_scopeId2}><table class="min-w-full divide-y divide-gray-200"${_scopeId2}><thead class="bg-gray-50"${_scopeId2}><tr${_scopeId2}><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"${_scopeId2}>Date</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"${_scopeId2}>Reason</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"${_scopeId2}>Duration</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"${_scopeId2}>Amount</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"${_scopeId2}>Status</th></tr></thead><tbody class="bg-white divide-y divide-gray-200"${_scopeId2}>`);
                    if (unref(isLoadingHistory)) {
                      _push3(`<tr${_scopeId2}><td colspan="5" class="px-6 py-4 text-center"${_scopeId2}>Loading history...</td></tr>`);
                    } else if (historyRequests.value.length === 0) {
                      _push3(`<tr${_scopeId2}><td colspan="5" class="px-6 py-8 text-center text-gray-500"${_scopeId2}>No records found for this period.</td></tr>`);
                    } else {
                      _push3(`<!--[-->`);
                      ssrRenderList(historyRequests.value, (req) => {
                        _push3(`<tr class="hover:bg-gray-50"${_scopeId2}><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"${_scopeId2}>${ssrInterpolate(unref(format)(new Date(req.date), "MMM d, yyyy"))}</td><td class="px-6 py-4 text-sm text-gray-500 truncate max-w-xs"${_scopeId2}>${ssrInterpolate(req.reason)}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"${_scopeId2}>${ssrInterpolate((req.totalMinutes / 60).toFixed(1))} hrs</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"${_scopeId2}>${ssrInterpolate(req.calculatedAmount ? formatCurrency(req.calculatedAmount) : "-")}</td><td class="px-6 py-4 whitespace-nowrap"${_scopeId2}>`);
                        _push3(ssrRenderComponent(_sfc_main$3, {
                          status: req.status
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
                              createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase" }, "Date"),
                              createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase" }, "Reason"),
                              createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase" }, "Duration"),
                              createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase" }, "Amount"),
                              createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase" }, "Status")
                            ])
                          ]),
                          createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                            unref(isLoadingHistory) ? (openBlock(), createBlock("tr", { key: 0 }, [
                              createVNode("td", {
                                colspan: "5",
                                class: "px-6 py-4 text-center"
                              }, "Loading history...")
                            ])) : historyRequests.value.length === 0 ? (openBlock(), createBlock("tr", { key: 1 }, [
                              createVNode("td", {
                                colspan: "5",
                                class: "px-6 py-8 text-center text-gray-500"
                              }, "No records found for this period.")
                            ])) : (openBlock(true), createBlock(Fragment, { key: 2 }, renderList(historyRequests.value, (req) => {
                              return openBlock(), createBlock("tr", {
                                key: req.id,
                                class: "hover:bg-gray-50"
                              }, [
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" }, toDisplayString(unref(format)(new Date(req.date), "MMM d, yyyy")), 1),
                                createVNode("td", { class: "px-6 py-4 text-sm text-gray-500 truncate max-w-xs" }, toDisplayString(req.reason), 1),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-500" }, toDisplayString((req.totalMinutes / 60).toFixed(1)) + " hrs", 1),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-500" }, toDisplayString(req.calculatedAmount ? formatCurrency(req.calculatedAmount) : "-"), 1),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                  createVNode(_sfc_main$3, {
                                    status: req.status
                                  }, null, 8, ["status"])
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
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase" }, "Date"),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase" }, "Reason"),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase" }, "Duration"),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase" }, "Amount"),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase" }, "Status")
                          ])
                        ]),
                        createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                          unref(isLoadingHistory) ? (openBlock(), createBlock("tr", { key: 0 }, [
                            createVNode("td", {
                              colspan: "5",
                              class: "px-6 py-4 text-center"
                            }, "Loading history...")
                          ])) : historyRequests.value.length === 0 ? (openBlock(), createBlock("tr", { key: 1 }, [
                            createVNode("td", {
                              colspan: "5",
                              class: "px-6 py-8 text-center text-gray-500"
                            }, "No records found for this period.")
                          ])) : (openBlock(true), createBlock(Fragment, { key: 2 }, renderList(historyRequests.value, (req) => {
                            return openBlock(), createBlock("tr", {
                              key: req.id,
                              class: "hover:bg-gray-50"
                            }, [
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" }, toDisplayString(unref(format)(new Date(req.date), "MMM d, yyyy")), 1),
                              createVNode("td", { class: "px-6 py-4 text-sm text-gray-500 truncate max-w-xs" }, toDisplayString(req.reason), 1),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-500" }, toDisplayString((req.totalMinutes / 60).toFixed(1)) + " hrs", 1),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-500" }, toDisplayString(req.calculatedAmount ? formatCurrency(req.calculatedAmount) : "-"), 1),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                createVNode(_sfc_main$3, {
                                  status: req.status
                                }, null, 8, ["status"])
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
      } else {
        _push(`<div class="space-y-6"><div class="grid grid-cols-1 md:grid-cols-3 gap-6"><div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg"><div class="flex items-center justify-between mb-4"><h3 class="text-white/80 font-medium">Total Hours</h3>`);
        _push(ssrRenderComponent(unref(Clock), { class: "w-8 h-8 text-white/40" }, null, _parent));
        _push(`</div><div class="text-4xl font-bold">${ssrInterpolate(unref(isLoadingTotal) ? "..." : (_a = unref(totalHoursData)) == null ? void 0 : _a.totalHours.toFixed(1))} hrs </div><p class="text-white/60 text-sm mt-2">${ssrInterpolate((_b = unref(totalHoursData)) == null ? void 0 : _b.totalMinutes)} minutes Total</p></div><div class="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-6 text-white shadow-lg"><div class="flex items-center justify-between mb-4"><h3 class="text-white/80 font-medium">Total Compensation</h3>`);
        _push(ssrRenderComponent(unref(DollarSign), { class: "w-8 h-8 text-white/40" }, null, _parent));
        _push(`</div><div class="text-4xl font-bold">${ssrInterpolate(unref(isLoadingTotal) ? "..." : ((_c = unref(totalHoursData)) == null ? void 0 : _c.totalAmount) ? formatCurrency(unref(totalHoursData).totalAmount) : "Rp 0")}</div><p class="text-white/60 text-sm mt-2">Estimated Amount</p></div>`);
        _push(ssrRenderComponent(_component_UiCard, { class: "p-6" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            var _a2, _b2, _c2, _d, _e, _f, _g, _h;
            if (_push2) {
              _push2(`<h3 class="text-gray-500 font-medium mb-4"${_scopeId}>Request Status Breakdown</h3><div class="space-y-3"${_scopeId}><div class="flex justify-between items-center text-sm"${_scopeId}><span class="flex items-center gap-2"${_scopeId}><div class="w-3 h-3 rounded-full bg-green-500"${_scopeId}></div> Approved</span><span class="font-medium text-gray-900"${_scopeId}>${ssrInterpolate(((_b2 = (_a2 = unref(totalHoursData)) == null ? void 0 : _a2.requests) == null ? void 0 : _b2.filter((r) => r.status === "APPROVED").length) || 0)}</span></div><div class="flex justify-between items-center text-sm"${_scopeId}><span class="flex items-center gap-2"${_scopeId}><div class="w-3 h-3 rounded-full bg-yellow-400"${_scopeId}></div> Pending</span><span class="font-medium text-gray-900"${_scopeId}>${ssrInterpolate(((_d = (_c2 = unref(totalHoursData)) == null ? void 0 : _c2.requests) == null ? void 0 : _d.filter((r) => r.status === "PENDING").length) || 0)}</span></div></div>`);
            } else {
              return [
                createVNode("h3", { class: "text-gray-500 font-medium mb-4" }, "Request Status Breakdown"),
                createVNode("div", { class: "space-y-3" }, [
                  createVNode("div", { class: "flex justify-between items-center text-sm" }, [
                    createVNode("span", { class: "flex items-center gap-2" }, [
                      createVNode("div", { class: "w-3 h-3 rounded-full bg-green-500" }),
                      createTextVNode(" Approved")
                    ]),
                    createVNode("span", { class: "font-medium text-gray-900" }, toDisplayString(((_f = (_e = unref(totalHoursData)) == null ? void 0 : _e.requests) == null ? void 0 : _f.filter((r) => r.status === "APPROVED").length) || 0), 1)
                  ]),
                  createVNode("div", { class: "flex justify-between items-center text-sm" }, [
                    createVNode("span", { class: "flex items-center gap-2" }, [
                      createVNode("div", { class: "w-3 h-3 rounded-full bg-yellow-400" }),
                      createTextVNode(" Pending")
                    ]),
                    createVNode("span", { class: "font-medium text-gray-900" }, toDisplayString(((_h = (_g = unref(totalHoursData)) == null ? void 0 : _g.requests) == null ? void 0 : _h.filter((r) => r.status === "PENDING").length) || 0), 1)
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
        _push(ssrRenderComponent(_component_UiCard, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UiCardContent, { class: "p-6" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  var _a2, _b2;
                  if (_push3) {
                    _push3(`<h3 class="text-lg font-medium text-gray-900 mb-4"${_scopeId2}>Detailed Breakdown</h3><div class="overflow-x-auto"${_scopeId2}><table class="min-w-full text-sm"${_scopeId2}><thead${_scopeId2}><tr class="border-b border-gray-100"${_scopeId2}><th class="text-left py-2 font-medium text-gray-500"${_scopeId2}>Date</th><th class="text-left py-2 font-medium text-gray-500"${_scopeId2}>Hours</th><th class="text-right py-2 font-medium text-gray-500"${_scopeId2}>Rate (Multiplier)</th><th class="text-right py-2 font-medium text-gray-500"${_scopeId2}>Amount</th></tr></thead><tbody class="divide-y divide-gray-50"${_scopeId2}><!--[-->`);
                    ssrRenderList((_a2 = unref(totalHoursData)) == null ? void 0 : _a2.requests, (req) => {
                      _push3(`<tr${_scopeId2}><td class="py-3"${_scopeId2}>${ssrInterpolate(unref(format)(new Date(req.date), "dd MMM yyyy"))}</td><td class="py-3"${_scopeId2}>${ssrInterpolate((req.totalMinutes / 60).toFixed(1))}</td><td class="py-3 text-right"${_scopeId2}>${ssrInterpolate(req.overtimeRate || "1.0")}x</td><td class="py-3 text-right"${_scopeId2}>${ssrInterpolate(req.calculatedAmount ? Number(req.calculatedAmount).toLocaleString("id-ID") : "-")}</td></tr>`);
                    });
                    _push3(`<!--]--></tbody></table></div>`);
                  } else {
                    return [
                      createVNode("h3", { class: "text-lg font-medium text-gray-900 mb-4" }, "Detailed Breakdown"),
                      createVNode("div", { class: "overflow-x-auto" }, [
                        createVNode("table", { class: "min-w-full text-sm" }, [
                          createVNode("thead", null, [
                            createVNode("tr", { class: "border-b border-gray-100" }, [
                              createVNode("th", { class: "text-left py-2 font-medium text-gray-500" }, "Date"),
                              createVNode("th", { class: "text-left py-2 font-medium text-gray-500" }, "Hours"),
                              createVNode("th", { class: "text-right py-2 font-medium text-gray-500" }, "Rate (Multiplier)"),
                              createVNode("th", { class: "text-right py-2 font-medium text-gray-500" }, "Amount")
                            ])
                          ]),
                          createVNode("tbody", { class: "divide-y divide-gray-50" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList((_b2 = unref(totalHoursData)) == null ? void 0 : _b2.requests, (req) => {
                              return openBlock(), createBlock("tr", {
                                key: req.id
                              }, [
                                createVNode("td", { class: "py-3" }, toDisplayString(unref(format)(new Date(req.date), "dd MMM yyyy")), 1),
                                createVNode("td", { class: "py-3" }, toDisplayString((req.totalMinutes / 60).toFixed(1)), 1),
                                createVNode("td", { class: "py-3 text-right" }, toDisplayString(req.overtimeRate || "1.0") + "x", 1),
                                createVNode("td", { class: "py-3 text-right" }, toDisplayString(req.calculatedAmount ? Number(req.calculatedAmount).toLocaleString("id-ID") : "-"), 1)
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
                createVNode(_component_UiCardContent, { class: "p-6" }, {
                  default: withCtx(() => {
                    var _a2;
                    return [
                      createVNode("h3", { class: "text-lg font-medium text-gray-900 mb-4" }, "Detailed Breakdown"),
                      createVNode("div", { class: "overflow-x-auto" }, [
                        createVNode("table", { class: "min-w-full text-sm" }, [
                          createVNode("thead", null, [
                            createVNode("tr", { class: "border-b border-gray-100" }, [
                              createVNode("th", { class: "text-left py-2 font-medium text-gray-500" }, "Date"),
                              createVNode("th", { class: "text-left py-2 font-medium text-gray-500" }, "Hours"),
                              createVNode("th", { class: "text-right py-2 font-medium text-gray-500" }, "Rate (Multiplier)"),
                              createVNode("th", { class: "text-right py-2 font-medium text-gray-500" }, "Amount")
                            ])
                          ]),
                          createVNode("tbody", { class: "divide-y divide-gray-50" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList((_a2 = unref(totalHoursData)) == null ? void 0 : _a2.requests, (req) => {
                              return openBlock(), createBlock("tr", {
                                key: req.id
                              }, [
                                createVNode("td", { class: "py-3" }, toDisplayString(unref(format)(new Date(req.date), "dd MMM yyyy")), 1),
                                createVNode("td", { class: "py-3" }, toDisplayString((req.totalMinutes / 60).toFixed(1)), 1),
                                createVNode("td", { class: "py-3 text-right" }, toDisplayString(req.overtimeRate || "1.0") + "x", 1),
                                createVNode("td", { class: "py-3 text-right" }, toDisplayString(req.calculatedAmount ? Number(req.calculatedAmount).toLocaleString("id-ID") : "-"), 1)
                              ]);
                            }), 128))
                          ])
                        ])
                      ])
                    ];
                  }),
                  _: 2
                }, 1024)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[tenant_slug]/dashboard/overtime/admin/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-Dzg7F0yr.mjs.map
