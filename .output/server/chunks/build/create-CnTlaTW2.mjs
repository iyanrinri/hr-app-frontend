import { defineComponent, mergeProps, unref, ref, computed, watch, withCtx, createVNode, createTextVNode, createBlock, createCommentVNode, withDirectives, openBlock, Fragment, renderList, toDisplayString, vModelSelect, vModelText, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { _ as _sfc_main$2 } from './Card-CVi1E1xp.mjs';
import { _ as _sfc_main$1$1, a as _sfc_main$3 } from './CardTitle-D9AdQELc.mjs';
import { _ as _sfc_main$4 } from './CardContent-BE35Q-6Q.mjs';
import { _ as _sfc_main$5 } from './Input-CKYYc_rG.mjs';
import { f as useCreatePayroll } from './usePayroll-BqsCAGPe.mjs';
import { u as useAllEmployees } from './useEmployees-CEaIsP48.mjs';
import { u as useOvertimeRequests } from './useOvertimeCRUD-DlVHnEXn.mjs';
import { O as OvertimeStatus } from './overtime-kX-Lpsii.mjs';
import { n as useRouter, o as ArrowLeft, U as User, b as Calendar, D as DollarSign, m as Calculator, f as Clock } from './server.mjs';
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

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "CreatePayrollForm",
  __ssrInlineRender: true,
  props: {
    isSubmitting: { type: Boolean }
  },
  emits: ["success", "cancel"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const getCurrentMonthDates = () => {
      const now = /* @__PURE__ */ new Date();
      const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
      const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      };
      return {
        start: formatDate(firstDay),
        end: formatDate(lastDay)
      };
    };
    const currentMonth = getCurrentMonthDates();
    const employeeId = ref("");
    const periodStart = ref(currentMonth.start);
    const periodEnd = ref(currentMonth.end);
    const deductions = ref("0");
    const bonuses = ref("0");
    const selectedOvertimeIds = ref([]);
    const { data: employees } = useAllEmployees();
    const overtimeFilters = computed(() => {
      if (!employeeId.value || !periodStart.value || !periodEnd.value) return void 0;
      return {
        employeeId: employeeId.value,
        startDate: periodStart.value,
        endDate: periodEnd.value,
        status: OvertimeStatus.APPROVED,
        take: 100
      };
    });
    const { data: overtimeResponse, loading: isLoadingOvertime } = useOvertimeRequests(overtimeFilters);
    const overtimeRequests = computed(() => {
      const res = overtimeResponse.value;
      if (!res) return [];
      if (Array.isArray(res)) return res;
      return res.requests || [];
    });
    const selectedEmployee = computed(() => {
      var _a;
      return (_a = employees.value) == null ? void 0 : _a.find((e) => String(e.id) === employeeId.value);
    });
    watch(overtimeRequests, (newReqs) => {
      if (newReqs.length > 0) {
        selectedOvertimeIds.value = newReqs.map((r) => r.id);
      } else {
        selectedOvertimeIds.value = [];
      }
    });
    const baseSalary = computed(() => {
      var _a;
      return Number((_a = selectedEmployee.value) == null ? void 0 : _a.baseSalary) || 0;
    });
    const overtimePay = computed(() => {
      return overtimeRequests.value.filter((req) => selectedOvertimeIds.value.includes(req.id)).reduce((total, req) => total + (Number(req.calculatedAmount) || 0), 0);
    });
    const grossSalary = computed(() => baseSalary.value + overtimePay.value + Number(bonuses.value));
    const netSalary = computed(() => grossSalary.value - Number(deductions.value));
    const formatIDR = (val) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(val);
    const { loading: isSubmittingLocal } = useCreatePayroll();
    const isPending = computed(() => props.isSubmitting || isSubmittingLocal.value);
    const toggleOvertime = (id) => {
      if (selectedOvertimeIds.value.includes(id)) {
        selectedOvertimeIds.value = selectedOvertimeIds.value.filter((oid) => oid !== id);
      } else {
        selectedOvertimeIds.value.push(id);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiCard = _sfc_main$2;
      const _component_UiCardHeader = _sfc_main$1$1;
      const _component_UiCardTitle = _sfc_main$3;
      const _component_UiCardContent = _sfc_main$4;
      const _component_UiInput = _sfc_main$5;
      _push(`<form${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="grid grid-cols-1 md:grid-cols-2 gap-6">`);
      _push(ssrRenderComponent(_component_UiCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiCardHeader, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiCardTitle, { class: "flex items-center text-lg" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(User), { class: "mr-2 h-5 w-5 text-gray-500" }, null, _parent4, _scopeId3));
                        _push4(` Employee Details `);
                      } else {
                        return [
                          createVNode(unref(User), { class: "mr-2 h-5 w-5 text-gray-500" }),
                          createTextVNode(" Employee Details ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiCardTitle, { class: "flex items-center text-lg" }, {
                      default: withCtx(() => [
                        createVNode(unref(User), { class: "mr-2 h-5 w-5 text-gray-500" }),
                        createTextVNode(" Employee Details ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UiCardContent, { class: "space-y-4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div${_scopeId2}><label class="block text-sm font-bold text-gray-700 mb-1"${_scopeId2}>Select Employee</label><select class="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-cyan focus:border-brand-cyan"${_scopeId2}><option value=""${ssrIncludeBooleanAttr(Array.isArray(employeeId.value) ? ssrLooseContain(employeeId.value, "") : ssrLooseEqual(employeeId.value, "")) ? " selected" : ""}${_scopeId2}>-- Select Employee --</option><!--[-->`);
                  ssrRenderList(unref(employees), (emp) => {
                    _push3(`<option${ssrRenderAttr("value", emp.id)}${ssrIncludeBooleanAttr(Array.isArray(employeeId.value) ? ssrLooseContain(employeeId.value, emp.id) : ssrLooseEqual(employeeId.value, emp.id)) ? " selected" : ""}${_scopeId2}>${ssrInterpolate(emp.firstName)} ${ssrInterpolate(emp.lastName)} (${ssrInterpolate(emp.position)}) </option>`);
                  });
                  _push3(`<!--]--></select></div>`);
                  if (selectedEmployee.value) {
                    _push3(`<div class="bg-gray-50 p-4 rounded-md space-y-2 text-sm"${_scopeId2}><div class="flex justify-between"${_scopeId2}><span class="text-gray-500"${_scopeId2}>Department:</span><span class="font-medium"${_scopeId2}>${ssrInterpolate(selectedEmployee.value.department)}</span></div><div class="flex justify-between"${_scopeId2}><span class="text-gray-500"${_scopeId2}>Base Salary:</span><span class="font-medium"${_scopeId2}>${ssrInterpolate(formatIDR(selectedEmployee.value.baseSalary))}</span></div></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-bold text-gray-700 mb-1" }, "Select Employee"),
                      withDirectives(createVNode("select", {
                        class: "w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-cyan focus:border-brand-cyan",
                        "onUpdate:modelValue": ($event) => employeeId.value = $event
                      }, [
                        createVNode("option", { value: "" }, "-- Select Employee --"),
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(employees), (emp) => {
                          return openBlock(), createBlock("option", {
                            key: emp.id,
                            value: emp.id
                          }, toDisplayString(emp.firstName) + " " + toDisplayString(emp.lastName) + " (" + toDisplayString(emp.position) + ") ", 9, ["value"]);
                        }), 128))
                      ], 8, ["onUpdate:modelValue"]), [
                        [vModelSelect, employeeId.value]
                      ])
                    ]),
                    selectedEmployee.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "bg-gray-50 p-4 rounded-md space-y-2 text-sm"
                    }, [
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", { class: "text-gray-500" }, "Department:"),
                        createVNode("span", { class: "font-medium" }, toDisplayString(selectedEmployee.value.department), 1)
                      ]),
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", { class: "text-gray-500" }, "Base Salary:"),
                        createVNode("span", { class: "font-medium" }, toDisplayString(formatIDR(selectedEmployee.value.baseSalary)), 1)
                      ])
                    ])) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UiCardHeader, null, {
                default: withCtx(() => [
                  createVNode(_component_UiCardTitle, { class: "flex items-center text-lg" }, {
                    default: withCtx(() => [
                      createVNode(unref(User), { class: "mr-2 h-5 w-5 text-gray-500" }),
                      createTextVNode(" Employee Details ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_UiCardContent, { class: "space-y-4" }, {
                default: withCtx(() => [
                  createVNode("div", null, [
                    createVNode("label", { class: "block text-sm font-bold text-gray-700 mb-1" }, "Select Employee"),
                    withDirectives(createVNode("select", {
                      class: "w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-cyan focus:border-brand-cyan",
                      "onUpdate:modelValue": ($event) => employeeId.value = $event
                    }, [
                      createVNode("option", { value: "" }, "-- Select Employee --"),
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(employees), (emp) => {
                        return openBlock(), createBlock("option", {
                          key: emp.id,
                          value: emp.id
                        }, toDisplayString(emp.firstName) + " " + toDisplayString(emp.lastName) + " (" + toDisplayString(emp.position) + ") ", 9, ["value"]);
                      }), 128))
                    ], 8, ["onUpdate:modelValue"]), [
                      [vModelSelect, employeeId.value]
                    ])
                  ]),
                  selectedEmployee.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "bg-gray-50 p-4 rounded-md space-y-2 text-sm"
                  }, [
                    createVNode("div", { class: "flex justify-between" }, [
                      createVNode("span", { class: "text-gray-500" }, "Department:"),
                      createVNode("span", { class: "font-medium" }, toDisplayString(selectedEmployee.value.department), 1)
                    ]),
                    createVNode("div", { class: "flex justify-between" }, [
                      createVNode("span", { class: "text-gray-500" }, "Base Salary:"),
                      createVNode("span", { class: "font-medium" }, toDisplayString(formatIDR(selectedEmployee.value.baseSalary)), 1)
                    ])
                  ])) : createCommentVNode("", true)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UiCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiCardHeader, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiCardTitle, { class: "flex items-center text-lg" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Calendar), { class: "mr-2 h-5 w-5 text-gray-500" }, null, _parent4, _scopeId3));
                        _push4(` Payroll Period `);
                      } else {
                        return [
                          createVNode(unref(Calendar), { class: "mr-2 h-5 w-5 text-gray-500" }),
                          createTextVNode(" Payroll Period ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiCardTitle, { class: "flex items-center text-lg" }, {
                      default: withCtx(() => [
                        createVNode(unref(Calendar), { class: "mr-2 h-5 w-5 text-gray-500" }),
                        createTextVNode(" Payroll Period ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UiCardContent, { class: "space-y-4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiInput, {
                    type: "date",
                    label: "Period Start",
                    modelValue: periodStart.value,
                    "onUpdate:modelValue": ($event) => periodStart.value = $event,
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiInput, {
                    type: "date",
                    label: "Period End",
                    modelValue: periodEnd.value,
                    "onUpdate:modelValue": ($event) => periodEnd.value = $event,
                    min: periodStart.value,
                    required: ""
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiInput, {
                      type: "date",
                      label: "Period Start",
                      modelValue: periodStart.value,
                      "onUpdate:modelValue": ($event) => periodStart.value = $event,
                      required: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_UiInput, {
                      type: "date",
                      label: "Period End",
                      modelValue: periodEnd.value,
                      "onUpdate:modelValue": ($event) => periodEnd.value = $event,
                      min: periodStart.value,
                      required: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "min"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UiCardHeader, null, {
                default: withCtx(() => [
                  createVNode(_component_UiCardTitle, { class: "flex items-center text-lg" }, {
                    default: withCtx(() => [
                      createVNode(unref(Calendar), { class: "mr-2 h-5 w-5 text-gray-500" }),
                      createTextVNode(" Payroll Period ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_UiCardContent, { class: "space-y-4" }, {
                default: withCtx(() => [
                  createVNode(_component_UiInput, {
                    type: "date",
                    label: "Period Start",
                    modelValue: periodStart.value,
                    "onUpdate:modelValue": ($event) => periodStart.value = $event,
                    required: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_UiInput, {
                    type: "date",
                    label: "Period End",
                    modelValue: periodEnd.value,
                    "onUpdate:modelValue": ($event) => periodEnd.value = $event,
                    min: periodStart.value,
                    required: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "min"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UiCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiCardHeader, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiCardTitle, { class: "flex items-center text-lg" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(DollarSign), { class: "mr-2 h-5 w-5 text-gray-500" }, null, _parent4, _scopeId3));
                        _push4(` Adjustments `);
                      } else {
                        return [
                          createVNode(unref(DollarSign), { class: "mr-2 h-5 w-5 text-gray-500" }),
                          createTextVNode(" Adjustments ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiCardTitle, { class: "flex items-center text-lg" }, {
                      default: withCtx(() => [
                        createVNode(unref(DollarSign), { class: "mr-2 h-5 w-5 text-gray-500" }),
                        createTextVNode(" Adjustments ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UiCardContent, { class: "space-y-4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div${_scopeId2}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId2}>Bonuses</label><div class="relative rounded-md shadow-sm"${_scopeId2}><div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"${_scopeId2}><span class="text-gray-500 sm:text-sm"${_scopeId2}>Rp</span></div><input type="number"${ssrRenderAttr("value", bonuses.value)} class="block w-full rounded-md border-gray-300 pl-10 focus:border-brand-cyan focus:ring-brand-cyan sm:text-sm h-10 border" min="0"${_scopeId2}></div></div><div${_scopeId2}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId2}>Deductions</label><div class="relative rounded-md shadow-sm"${_scopeId2}><div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"${_scopeId2}><span class="text-gray-500 sm:text-sm"${_scopeId2}>Rp</span></div><input type="number"${ssrRenderAttr("value", deductions.value)} class="block w-full rounded-md border-gray-300 pl-10 focus:border-brand-cyan focus:ring-brand-cyan sm:text-sm h-10 border" min="0"${_scopeId2}></div></div>`);
                } else {
                  return [
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Bonuses"),
                      createVNode("div", { class: "relative rounded-md shadow-sm" }, [
                        createVNode("div", { class: "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3" }, [
                          createVNode("span", { class: "text-gray-500 sm:text-sm" }, "Rp")
                        ]),
                        withDirectives(createVNode("input", {
                          type: "number",
                          "onUpdate:modelValue": ($event) => bonuses.value = $event,
                          class: "block w-full rounded-md border-gray-300 pl-10 focus:border-brand-cyan focus:ring-brand-cyan sm:text-sm h-10 border",
                          min: "0"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, bonuses.value]
                        ])
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Deductions"),
                      createVNode("div", { class: "relative rounded-md shadow-sm" }, [
                        createVNode("div", { class: "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3" }, [
                          createVNode("span", { class: "text-gray-500 sm:text-sm" }, "Rp")
                        ]),
                        withDirectives(createVNode("input", {
                          type: "number",
                          "onUpdate:modelValue": ($event) => deductions.value = $event,
                          class: "block w-full rounded-md border-gray-300 pl-10 focus:border-brand-cyan focus:ring-brand-cyan sm:text-sm h-10 border",
                          min: "0"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, deductions.value]
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
              createVNode(_component_UiCardHeader, null, {
                default: withCtx(() => [
                  createVNode(_component_UiCardTitle, { class: "flex items-center text-lg" }, {
                    default: withCtx(() => [
                      createVNode(unref(DollarSign), { class: "mr-2 h-5 w-5 text-gray-500" }),
                      createTextVNode(" Adjustments ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_UiCardContent, { class: "space-y-4" }, {
                default: withCtx(() => [
                  createVNode("div", null, [
                    createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Bonuses"),
                    createVNode("div", { class: "relative rounded-md shadow-sm" }, [
                      createVNode("div", { class: "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3" }, [
                        createVNode("span", { class: "text-gray-500 sm:text-sm" }, "Rp")
                      ]),
                      withDirectives(createVNode("input", {
                        type: "number",
                        "onUpdate:modelValue": ($event) => bonuses.value = $event,
                        class: "block w-full rounded-md border-gray-300 pl-10 focus:border-brand-cyan focus:ring-brand-cyan sm:text-sm h-10 border",
                        min: "0"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, bonuses.value]
                      ])
                    ])
                  ]),
                  createVNode("div", null, [
                    createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Deductions"),
                    createVNode("div", { class: "relative rounded-md shadow-sm" }, [
                      createVNode("div", { class: "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3" }, [
                        createVNode("span", { class: "text-gray-500 sm:text-sm" }, "Rp")
                      ]),
                      withDirectives(createVNode("input", {
                        type: "number",
                        "onUpdate:modelValue": ($event) => deductions.value = $event,
                        class: "block w-full rounded-md border-gray-300 pl-10 focus:border-brand-cyan focus:ring-brand-cyan sm:text-sm h-10 border",
                        min: "0"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, deductions.value]
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
      _push(ssrRenderComponent(_component_UiCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiCardHeader, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiCardTitle, { class: "flex items-center text-lg" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Calculator), { class: "mr-2 h-5 w-5 text-gray-500" }, null, _parent4, _scopeId3));
                        _push4(` Calculated Salary `);
                      } else {
                        return [
                          createVNode(unref(Calculator), { class: "mr-2 h-5 w-5 text-gray-500" }),
                          createTextVNode(" Calculated Salary ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiCardTitle, { class: "flex items-center text-lg" }, {
                      default: withCtx(() => [
                        createVNode(unref(Calculator), { class: "mr-2 h-5 w-5 text-gray-500" }),
                        createTextVNode(" Calculated Salary ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UiCardContent, { class: "space-y-3" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex justify-between text-sm"${_scopeId2}><span class="text-gray-600"${_scopeId2}>Base Salary:</span><span${_scopeId2}>${ssrInterpolate(formatIDR(baseSalary.value))}</span></div><div class="flex justify-between text-sm"${_scopeId2}><span class="text-gray-600"${_scopeId2}>Overtime Pay:</span><span${_scopeId2}>${ssrInterpolate(formatIDR(overtimePay.value))}</span></div><div class="flex justify-between text-sm"${_scopeId2}><span class="text-gray-600"${_scopeId2}>Bonuses:</span><span class="text-green-600"${_scopeId2}>+ ${ssrInterpolate(formatIDR(Number(bonuses.value)))}</span></div><div class="flex justify-between text-sm"${_scopeId2}><span class="text-gray-600"${_scopeId2}>Deductions:</span><span class="text-red-600"${_scopeId2}>- ${ssrInterpolate(formatIDR(Number(deductions.value)))}</span></div><div class="border-t pt-3 mt-2"${_scopeId2}><div class="flex justify-between font-bold text-lg"${_scopeId2}><span${_scopeId2}>Net Salary:</span><span class="text-brand-cyan"${_scopeId2}>${ssrInterpolate(formatIDR(netSalary.value))}</span></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex justify-between text-sm" }, [
                      createVNode("span", { class: "text-gray-600" }, "Base Salary:"),
                      createVNode("span", null, toDisplayString(formatIDR(baseSalary.value)), 1)
                    ]),
                    createVNode("div", { class: "flex justify-between text-sm" }, [
                      createVNode("span", { class: "text-gray-600" }, "Overtime Pay:"),
                      createVNode("span", null, toDisplayString(formatIDR(overtimePay.value)), 1)
                    ]),
                    createVNode("div", { class: "flex justify-between text-sm" }, [
                      createVNode("span", { class: "text-gray-600" }, "Bonuses:"),
                      createVNode("span", { class: "text-green-600" }, "+ " + toDisplayString(formatIDR(Number(bonuses.value))), 1)
                    ]),
                    createVNode("div", { class: "flex justify-between text-sm" }, [
                      createVNode("span", { class: "text-gray-600" }, "Deductions:"),
                      createVNode("span", { class: "text-red-600" }, "- " + toDisplayString(formatIDR(Number(deductions.value))), 1)
                    ]),
                    createVNode("div", { class: "border-t pt-3 mt-2" }, [
                      createVNode("div", { class: "flex justify-between font-bold text-lg" }, [
                        createVNode("span", null, "Net Salary:"),
                        createVNode("span", { class: "text-brand-cyan" }, toDisplayString(formatIDR(netSalary.value)), 1)
                      ])
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
                  createVNode(_component_UiCardTitle, { class: "flex items-center text-lg" }, {
                    default: withCtx(() => [
                      createVNode(unref(Calculator), { class: "mr-2 h-5 w-5 text-gray-500" }),
                      createTextVNode(" Calculated Salary ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_UiCardContent, { class: "space-y-3" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "flex justify-between text-sm" }, [
                    createVNode("span", { class: "text-gray-600" }, "Base Salary:"),
                    createVNode("span", null, toDisplayString(formatIDR(baseSalary.value)), 1)
                  ]),
                  createVNode("div", { class: "flex justify-between text-sm" }, [
                    createVNode("span", { class: "text-gray-600" }, "Overtime Pay:"),
                    createVNode("span", null, toDisplayString(formatIDR(overtimePay.value)), 1)
                  ]),
                  createVNode("div", { class: "flex justify-between text-sm" }, [
                    createVNode("span", { class: "text-gray-600" }, "Bonuses:"),
                    createVNode("span", { class: "text-green-600" }, "+ " + toDisplayString(formatIDR(Number(bonuses.value))), 1)
                  ]),
                  createVNode("div", { class: "flex justify-between text-sm" }, [
                    createVNode("span", { class: "text-gray-600" }, "Deductions:"),
                    createVNode("span", { class: "text-red-600" }, "- " + toDisplayString(formatIDR(Number(deductions.value))), 1)
                  ]),
                  createVNode("div", { class: "border-t pt-3 mt-2" }, [
                    createVNode("div", { class: "flex justify-between font-bold text-lg" }, [
                      createVNode("span", null, "Net Salary:"),
                      createVNode("span", { class: "text-brand-cyan" }, toDisplayString(formatIDR(netSalary.value)), 1)
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
      _push(ssrRenderComponent(_component_UiCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiCardHeader, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiCardTitle, { class: "flex items-center text-lg" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Clock), { class: "mr-2 h-5 w-5 text-gray-500" }, null, _parent4, _scopeId3));
                        _push4(` Approved Overtime Requests `);
                      } else {
                        return [
                          createVNode(unref(Clock), { class: "mr-2 h-5 w-5 text-gray-500" }),
                          createTextVNode(" Approved Overtime Requests ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiCardTitle, { class: "flex items-center text-lg" }, {
                      default: withCtx(() => [
                        createVNode(unref(Clock), { class: "mr-2 h-5 w-5 text-gray-500" }),
                        createTextVNode(" Approved Overtime Requests ")
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
                  if (unref(isLoadingOvertime)) {
                    _push3(`<div class="text-center py-4 text-gray-500"${_scopeId2}>Loading overtime requests...</div>`);
                  } else if (overtimeRequests.value.length === 0) {
                    _push3(`<div class="text-center py-4 text-gray-500"${_scopeId2}>${ssrInterpolate(employeeId.value && periodStart.value && periodEnd.value ? "No approved overtime requests found for this period." : "Select Employee and Period to view overtime requests.")}</div>`);
                  } else {
                    _push3(`<div class="overflow-x-auto"${_scopeId2}><table class="min-w-full divide-y divide-gray-200"${_scopeId2}><thead${_scopeId2}><tr${_scopeId2}><th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"${_scopeId2}>Include</th><th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"${_scopeId2}>Date</th><th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"${_scopeId2}>Hours</th><th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"${_scopeId2}>Amount</th><th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"${_scopeId2}>Reason</th></tr></thead><tbody class="divide-y divide-gray-200"${_scopeId2}><!--[-->`);
                    ssrRenderList(overtimeRequests.value, (req) => {
                      _push3(`<tr class="hover:bg-gray-50"${_scopeId2}><td class="px-4 py-2"${_scopeId2}><input type="checkbox"${ssrIncludeBooleanAttr(selectedOvertimeIds.value.includes(req.id)) ? " checked" : ""} class="h-4 w-4 text-brand-cyan focus:ring-brand-cyan border-gray-300 rounded"${_scopeId2}></td><td class="px-4 py-2 text-sm text-gray-900"${_scopeId2}>${ssrInterpolate(new Date(req.date).toLocaleDateString())}</td><td class="px-4 py-2 text-sm text-gray-900"${_scopeId2}>${ssrInterpolate((req.totalMinutes / 60).toFixed(1))} hrs </td><td class="px-4 py-2 text-sm text-gray-900"${_scopeId2}>${ssrInterpolate(formatIDR(Number(req.calculatedAmount) || 0))}</td><td class="px-4 py-2 text-sm text-gray-500 truncate max-w-xs"${_scopeId2}>${ssrInterpolate(req.reason)}</td></tr>`);
                    });
                    _push3(`<!--]--></tbody></table></div>`);
                  }
                } else {
                  return [
                    unref(isLoadingOvertime) ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "text-center py-4 text-gray-500"
                    }, "Loading overtime requests...")) : overtimeRequests.value.length === 0 ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "text-center py-4 text-gray-500"
                    }, toDisplayString(employeeId.value && periodStart.value && periodEnd.value ? "No approved overtime requests found for this period." : "Select Employee and Period to view overtime requests."), 1)) : (openBlock(), createBlock("div", {
                      key: 2,
                      class: "overflow-x-auto"
                    }, [
                      createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                        createVNode("thead", null, [
                          createVNode("tr", null, [
                            createVNode("th", { class: "px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase" }, "Include"),
                            createVNode("th", { class: "px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase" }, "Date"),
                            createVNode("th", { class: "px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase" }, "Hours"),
                            createVNode("th", { class: "px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase" }, "Amount"),
                            createVNode("th", { class: "px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase" }, "Reason")
                          ])
                        ]),
                        createVNode("tbody", { class: "divide-y divide-gray-200" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(overtimeRequests.value, (req) => {
                            return openBlock(), createBlock("tr", {
                              key: req.id,
                              class: "hover:bg-gray-50"
                            }, [
                              createVNode("td", { class: "px-4 py-2" }, [
                                createVNode("input", {
                                  type: "checkbox",
                                  checked: selectedOvertimeIds.value.includes(req.id),
                                  onChange: ($event) => toggleOvertime(req.id),
                                  class: "h-4 w-4 text-brand-cyan focus:ring-brand-cyan border-gray-300 rounded"
                                }, null, 40, ["checked", "onChange"])
                              ]),
                              createVNode("td", { class: "px-4 py-2 text-sm text-gray-900" }, toDisplayString(new Date(req.date).toLocaleDateString()), 1),
                              createVNode("td", { class: "px-4 py-2 text-sm text-gray-900" }, toDisplayString((req.totalMinutes / 60).toFixed(1)) + " hrs ", 1),
                              createVNode("td", { class: "px-4 py-2 text-sm text-gray-900" }, toDisplayString(formatIDR(Number(req.calculatedAmount) || 0)), 1),
                              createVNode("td", { class: "px-4 py-2 text-sm text-gray-500 truncate max-w-xs" }, toDisplayString(req.reason), 1)
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
                  createVNode(_component_UiCardTitle, { class: "flex items-center text-lg" }, {
                    default: withCtx(() => [
                      createVNode(unref(Clock), { class: "mr-2 h-5 w-5 text-gray-500" }),
                      createTextVNode(" Approved Overtime Requests ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_UiCardContent, null, {
                default: withCtx(() => [
                  unref(isLoadingOvertime) ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "text-center py-4 text-gray-500"
                  }, "Loading overtime requests...")) : overtimeRequests.value.length === 0 ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "text-center py-4 text-gray-500"
                  }, toDisplayString(employeeId.value && periodStart.value && periodEnd.value ? "No approved overtime requests found for this period." : "Select Employee and Period to view overtime requests."), 1)) : (openBlock(), createBlock("div", {
                    key: 2,
                    class: "overflow-x-auto"
                  }, [
                    createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", { class: "px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase" }, "Include"),
                          createVNode("th", { class: "px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase" }, "Date"),
                          createVNode("th", { class: "px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase" }, "Hours"),
                          createVNode("th", { class: "px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase" }, "Amount"),
                          createVNode("th", { class: "px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase" }, "Reason")
                        ])
                      ]),
                      createVNode("tbody", { class: "divide-y divide-gray-200" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(overtimeRequests.value, (req) => {
                          return openBlock(), createBlock("tr", {
                            key: req.id,
                            class: "hover:bg-gray-50"
                          }, [
                            createVNode("td", { class: "px-4 py-2" }, [
                              createVNode("input", {
                                type: "checkbox",
                                checked: selectedOvertimeIds.value.includes(req.id),
                                onChange: ($event) => toggleOvertime(req.id),
                                class: "h-4 w-4 text-brand-cyan focus:ring-brand-cyan border-gray-300 rounded"
                              }, null, 40, ["checked", "onChange"])
                            ]),
                            createVNode("td", { class: "px-4 py-2 text-sm text-gray-900" }, toDisplayString(new Date(req.date).toLocaleDateString()), 1),
                            createVNode("td", { class: "px-4 py-2 text-sm text-gray-900" }, toDisplayString((req.totalMinutes / 60).toFixed(1)) + " hrs ", 1),
                            createVNode("td", { class: "px-4 py-2 text-sm text-gray-900" }, toDisplayString(formatIDR(Number(req.calculatedAmount) || 0)), 1),
                            createVNode("td", { class: "px-4 py-2 text-sm text-gray-500 truncate max-w-xs" }, toDisplayString(req.reason), 1)
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
      _push(`<div class="flex justify-end space-x-4"><button type="button" class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"> Cancel </button><button type="submit"${ssrIncludeBooleanAttr(isPending.value || !employeeId.value) ? " disabled" : ""} class="px-4 py-2 text-sm font-medium text-white bg-brand-navy rounded-md hover:opacity-90 disabled:opacity-50 flex items-center">`);
      if (isPending.value) {
        _push(`<span class="mr-2">...</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(` ${ssrInterpolate(isPending.value ? "Creating Payroll..." : "Create Payroll")}</button></div></form>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/payroll/CreatePayrollForm.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "create",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter();
    const handleSuccess = () => {
      router.push({ path: "." });
    };
    const handleCancel = () => {
      router.back();
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" }, _attrs))}><div class="md:flex md:items-center md:justify-between"><div class="flex items-center min-w-0"><button class="mr-4 text-gray-400 hover:text-gray-500">`);
      _push(ssrRenderComponent(unref(ArrowLeft), { class: "w-6 h-6" }, null, _parent));
      _push(`</button><div><h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate"> Create New Payroll </h2><p class="mt-1 text-sm text-gray-500"> Calculate salary and generate payroll entry </p></div></div></div>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        onSuccess: handleSuccess,
        onCancel: handleCancel
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[tenant_slug]/dashboard/payroll/create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=create-CnTlaTW2.mjs.map
